#!/usr/bin/env node
/*
 * Reads the VA component-library Storybook story files and writes
 * public/va-stories.json: one entry per story, with the markup the story draws.
 *
 *   node scripts/build-stories.mjs --stories <path to packages/storybook/stories>
 *                                  [--typescript <path to typescript.js>] [--out public/va-stories.json]
 *
 * How it works: each story file is compiled with the TypeScript compiler, run in a
 * sandbox with its imports replaced by stand-ins, and each story's render function is
 * called with the story's args. The JSX it returns is written out as HTML.
 * Stories that need a browser (hooks, document access) are listed under "skipped".
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = n => { const i = process.argv.indexOf("--" + n); return i > -1 ? process.argv[i + 1] : null; };
const dir = arg("stories");
if (!dir) { console.error("Usage: node scripts/build-stories.mjs --stories <packages/storybook/stories>"); process.exit(1); }
const out = path.resolve(arg("out") || path.join(root, "public/va-stories.json"));

function loadTypescript() {
  const tries = [arg("typescript"), "typescript", path.join(dir, "../node_modules/typescript/lib/typescript.js")].filter(Boolean);
  const req = createRequire(import.meta.url);
  for (const t of tries) { try { return req(t); } catch (e) { /* try the next location */ } }
  console.error("TypeScript was not found. Pass --typescript <path to typescript.js>, or run npm install typescript."); process.exit(1);
}
const ts = loadTypescript();

/* ---------- JSX to HTML ---------- */
const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = s => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const kebab = s => String(s).replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z])([A-Z][a-z])/g, "$1-$2").toLowerCase();
const Frag = Symbol("fragment");
function h(tag, props, ...kids) { return { tag, props: props || {}, kids }; }
function styleText(o) { return Object.keys(o).map(k => kebab(k) + ":" + o[k]).join(";"); }
function attrs(props) {
  let s = "";
  for (const k of Object.keys(props)) {
    let v = props[k];
    if (k === "children" || k === "key" || k === "ref" || k === "dangerouslySetInnerHTML" || /^on[A-Z]/.test(k)) continue;
    if (v === undefined || v === null || v === false || typeof v === "function") continue;
    const name = k === "className" ? "class" : k === "htmlFor" ? "for" : k === "tabIndex" ? "tabindex" : k;
    if (v === true) { s += " " + name; continue; }
    if (name === "style" && typeof v === "object") v = styleText(v);
    else if (typeof v === "object") v = JSON.stringify(v);
    s += " " + name + '="' + escAttr(v) + '"';
  }
  return s;
}
function render(node) {
  if (node === null || node === undefined || node === false || node === true) return "";
  if (Array.isArray(node)) return node.map(render).join("");
  if (typeof node === "string") return esc(node);
  if (typeof node === "number") return String(node);
  if (typeof node !== "object" || !("tag" in node)) return "";
  const { tag, props, kids } = node;
  const children = kids.length ? kids : (props.children !== undefined ? [props.children] : []);
  if (tag === Frag) return render(children);
  if (typeof tag === "function") {
    if (typeof tag.__tag === "string") return render(h(tag.__tag, props, ...children));
    if (tag.__stub) return "";
    return render(tag(Object.assign({}, props, { children: children.length === 1 ? children[0] : children })));
  }
  const open = "<" + tag + attrs(props) + ">";
  if (VOID.has(tag)) return open;
  const inner = props.dangerouslySetInnerHTML ? String(props.dangerouslySetInnerHTML.__html || "") : render(children);
  return open + inner + "</" + tag + ">";
}

/* ---------- Stand-ins for imports ---------- */
function anything(name) {
  const f = () => anything(name + "()");
  return new Proxy(f, {
    get(_, k) {
      if (k === Symbol.toPrimitive) return () => "";
      if (k === "then") return undefined;
      if (k === Symbol.iterator) return function* () { };
      if (k === "length") return 0;
      return anything(name + "." + String(k));
    },
    apply() { return anything(name + "()"); },
    ownKeys() { return []; },
    getOwnPropertyDescriptor() { return undefined; },
  });
}
function bindings() {
  return new Proxy({}, {
    get(_, k) {
      if (typeof k !== "string") return undefined;
      const f = () => null; f.__tag = kebab(k); return f;
    },
  });
}
const reactStub = {
  default: undefined,
  Fragment: Frag, createElement: (t, p, ...k) => h(t, p, ...k),
  useState: v => [typeof v === "function" ? v() : v, () => { }],
  useEffect() { }, useLayoutEffect() { }, useRef: v => ({ current: v === undefined ? null : v }),
  useCallback: f => f, useMemo: f => f(), useId: () => "id", useContext: () => ({}),
  createContext: () => ({}), forwardRef: f => f, memo: f => f,
};
const docsPath = arg("docs");
let componentDocs = null;
function loadDocs(dirOfStories) {
  if (componentDocs) return componentDocs;
  const tries = [docsPath, path.join(dirOfStories, "../../web-components/component-docs.json")].filter(Boolean);
  for (const t of tries) { try { componentDocs = JSON.parse(fs.readFileSync(t, "utf8")); return componentDocs; } catch (e) { /* try the next file */ } }
  console.error("component-docs.json was not found. Pass --docs <path> (the npm package @department-of-veterans-affairs/web-components includes one)."); process.exit(1);
}
const cache = new Map();
function resolveLocal(from, spec) {
  const base = path.resolve(path.dirname(from), spec);
  for (const ext of ["", ".tsx", ".ts", ".jsx", ".js", "/index.tsx", "/index.ts", "/index.js"]) {
    const f = base + ext;
    if (fs.existsSync(f) && fs.statSync(f).isFile()) return f;
  }
  return null;
}
function makeRequire(file) {
  return function (spec) {
    if (spec === "react" || spec === "react/jsx-runtime") return reactStub;
    if (/react-bindings/.test(spec)) return bindings();
    if (/component-docs\.json$/.test(spec)) return loadDocs(dir);
    if (/^\.{1,2}\//.test(spec)) {
      const f = resolveLocal(file, spec);
      if (!f) return anything(spec);
      if (/\.json$/.test(f)) return JSON.parse(fs.readFileSync(f, "utf8"));
      if (!/\.(tsx|ts|jsx|js)$/.test(f)) return anything(spec);
      if (cache.has(f)) return cache.get(f);
      let exp;
      try { exp = runFile(f); } catch (e) { exp = anything(spec); }
      cache.set(f, exp);
      return exp;
    }
    return anything(spec);
  };
}

/* ---------- Run one file ---------- */
function compile(file) {
  const src = fs.readFileSync(file, "utf8");
  const r = ts.transpileModule(src, {
    fileName: file,
    compilerOptions: {
      jsx: ts.JsxEmit.React, jsxFactory: "__h", jsxFragmentFactory: "__Frag",
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, allowJs: true, esModuleInterop: true,
    },
  });
  return r.outputText;
}
const startCase = s => String(s).replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").replace(/^./, c => c.toUpperCase());
function tagFor(file, meta) {
  const sub = meta && meta.parameters && meta.parameters.componentSubtitle;
  const m = (sub && String(sub).match(/\b(va-[a-z-]+)\b/)) || path.basename(file).match(/^(va-[a-z]+(?:-[a-z]+)*?)(?:-uswds)?\.stories/);
  return m ? m[1] : null;
}
function runFile(file) {
  const code = compile(file);
  const mod = { exports: {} };
  const sandbox = {
    module: mod, exports: mod.exports, require: makeRequire(file), __h: h, __Frag: Frag,
    console: { log() { }, warn() { }, error() { } }, setTimeout() { }, clearTimeout() { },
    document: undefined, window: undefined,
    JSON, Math, Date, Object, Array, String, Number, Boolean, Symbol, Promise, Map, Set, RegExp, Error, parseInt, parseFloat, structuredClone, URL, URLSearchParams, Intl, encodeURIComponent, decodeURIComponent, isNaN,
  };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: file, timeout: 5000 });
  return mod.exports;
}

const files = fs.readdirSync(dir).filter(f => /\.stories\.(tsx|jsx|ts|js)$/.test(f)).sort();
const stories = [], skipped = [];
for (const f of files) {
  const file = path.join(dir, f);
  let ex;
  try { ex = runFile(file); } catch (e) { skipped.push({ file: f, reason: "could not run: " + String(e.message).slice(0, 120) }); continue; }
  const meta = ex.default || {};
  const tag = tagFor(file, meta);
  for (const name of Object.keys(ex)) {
    if (name === "default" || name === "__esModule") continue;
    const st = ex[name];
    const args = Object.assign({}, meta.args, st && st.args);
    const fn = typeof st === "function" ? st : (st && typeof st.render === "function" ? st.render : (typeof meta.render === "function" && st && typeof st === "object" ? meta.render : null));
    if (!fn) { skipped.push({ file: f, story: name, reason: "no render function" }); continue; }
    try {
      const html = render(fn(args, { args, argTypes: meta.argTypes || {}, parameters: {}, globals: {}, viewMode: "story" })).trim();
      if (!html) { skipped.push({ file: f, story: name, reason: "drew nothing" }); continue; }
      stories.push({
        component: tag, group: meta.title || null, file: f, export: name,
        name: (st && (st.storyName || (st.name && st.name !== "bound Template" && !/^bound /.test(st.name) ? null : null))) || startCase(name),
        html,
      });
    } catch (e) { skipped.push({ file: f, story: name, reason: "render failed: " + String(e.message).slice(0, 100) }); }
  }
}
const byTag = {};
stories.forEach(s => { const k = s.component || "other"; byTag[k] = (byTag[k] || 0) + 1; });
fs.mkdirSync(path.dirname(out), { recursive: true });
const names = {};
((loadDocs(dir).components) || []).forEach(c => { const t = (c.docsTags || []).find(x => x.name === "componentName"); if (t && byTag[c.tag]) names[c.tag] = t.text; });
fs.writeFileSync(out, JSON.stringify({ schema: 1, generatedAt: new Date().toISOString(), source: { files: files.length }, counts: byTag, names, skipped, stories }) + "\n");
console.log("Wrote " + path.relative(process.cwd(), out) + ": " + stories.length + " stories from " + files.length + " files, " + skipped.length + " skipped.");
