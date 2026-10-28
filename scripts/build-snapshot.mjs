// Builds public/va-render-snapshot.json from a checkout of va-uswds-render plus the VA css-library.
// Needs Node 22.18+ (it imports the repo's TypeScript entries directly) and, unless --css-library is given, npm access.
//
// Usage:
//   node scripts/build-snapshot.mjs --render-repo ../va-uswds-render [--css-library <unpacked package dir>] [--out public/va-render-snapshot.json]
//
// The Builder cannot read the repo live. To refresh it: run this, run `npm test`, commit, deploy.
import { readFileSync, writeFileSync, mkdtempSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';

const arg = (name, dflt) => { const i = process.argv.indexOf(`--${name}`); return i > 0 ? process.argv[i + 1] : dflt; };
const repo = resolve(arg('render-repo', process.env.VA_USWDS_RENDER || '../va-uswds-render'));
const out = resolve(arg('out', 'public/va-render-snapshot.json'));
const read = (p) => readFileSync(join(repo, p), 'utf8');
const sh = (cmd, args, opts = {}) => execFileSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], ...opts }).trim();
const tryOr = (fn, dflt = null) => { try { return fn(); } catch { return dflt; } };

if (!existsSync(join(repo, 'examples/uswds-playground/lib/va-components.ts'))) {
  console.error(`Cannot find the render repo's entries under ${repo}. Pass --render-repo <path>.`);
  process.exit(1);
}

// 1. The Va* entries, exactly as the repo's registry uses them.
const { vaEntries } = await import(pathToFileURL(join(repo, 'examples/uswds-playground/lib/va-components.ts')).href);
const entries = vaEntries.map((e) => ({
  key: e.key, tagName: e.tagName, description: e.description, example: e.example,
  ...(e.propDescriptions ? { propDescriptions: e.propDescriptions } : {}),
  ...(e.slots ? { slots: e.slots } : {}),
}));

// 2. VA design tokens from css-library (flattened name -> value).
let cssDir = arg('css-library');
let cssVersion;
if (!cssDir) {
  const tmp = mkdtempSync(join(tmpdir(), 'css-library-'));
  const tgz = sh('npm', ['pack', '@department-of-veterans-affairs/css-library', '--silent'], { cwd: tmp }).split('\n').pop();
  sh('tar', ['xzf', tgz], { cwd: tmp });
  cssDir = join(tmp, 'package');
}
cssVersion = JSON.parse(readFileSync(join(cssDir, 'package.json'), 'utf8')).version;
const vads = {};
(function walk(o) {
  if (o && typeof o === 'object') {
    if (typeof o.name === 'string' && 'value' in o) vads[`--${o.name}`] = String(o.value);
    else Object.values(o).forEach(walk);
  }
})(JSON.parse(readFileSync(join(cssDir, 'dist/tokens/json/variables.json'), 'utf8')));

// 3. The repo's own token file (USWDS theme variables, font stacks).
const repoTokens = {};
for (const m of read('examples/uswds-playground/app/tokens/index.css').matchAll(/^\s*(--[A-Za-z0-9-]+)\s*:\s*([^;]+);/gm)) repoTokens[m[1]] = m[2].trim();

// 4. Templates: the demo's preset specs. (VA-specific page templates such as a form intro do not exist in the repo yet.)
const presetSrc = read('examples/uswds-demo/src/specs/index.ts');
const templates = [...presetSrc.matchAll(/["']?([\w-]+)["']?:\s*\{\s*label:\s*"([^"]+)",\s*spec:\s*(\w+)/g)].map(([, id, label, v]) => {
  const file = presetSrc.match(new RegExp(`import ${v} from "\\./([^"]+)"`))[1];
  return { id, label, source: `examples/uswds-demo/src/specs/${file}`, spec: JSON.parse(read(`examples/uswds-demo/src/specs/${file}`)) };
});

// 4b. The few USWDS primitives that Va* entries rely on for their body content (Section, GridContainer, Grid, Heading, Text), read from the catalog.
const catalogSrc = read('packages/uswds/src/catalog.ts');
const primitives = ['Section', 'GridContainer', 'Grid', 'Heading', 'Text'].map((key) => {
  const block = catalogSrc.match(new RegExp(`\\n  ${key}: \\{[\\s\\S]*?\\n  \\},`))?.[0];
  if (!block) throw new Error(`Could not find ${key} in packages/uswds/src/catalog.ts`);
  const description = (block.match(/description:\s*\n?\s*"((?:[^"\\]|\\.)*)"/) || [])[1];
  const exampleSrc = (block.match(/example:\s*(\{[^\n]*\})/) || [])[1];
  return { key, description, example: exampleSrc ? Function(`return (${exampleSrc})`)() : {}, slots: ['default'] };
});

// 5. Versions.
const pkg = JSON.parse(read('examples/uswds-playground/package.json'));
const lock = tryOr(() => read('pnpm-lock.yaml'), '');
const installedWc = (lock.match(/@department-of-veterans-affairs\/web-components@(\d+\.\d+\.\d+)'/) || [])[1] || null;
const snapshot = {
  schema: 1,
  generatedAt: new Date().toISOString(),
  source: {
    repo: tryOr(() => sh('git', ['-C', repo, 'remote', 'get-url', 'origin']).replace(/\/\/[^@/]+@/, '//')),
    commit: tryOr(() => sh('git', ['-C', repo, 'rev-parse', 'HEAD'])),
  },
  versions: {
    webComponentsRange: pkg.dependencies?.['@department-of-veterans-affairs/web-components'] ?? null,
    webComponentsInstalled: installedWc,
    componentLibraryLatest: tryOr(() => sh('npm', ['view', '@department-of-veterans-affairs/component-library', 'version'])),
    cssLibrary: cssVersion,
    jsonRender: pkg.dependencies?.['@json-render/core'] ?? null,
  },
  styling: {
    font: 'Public Sans',
    fontStack: vads['--vads-font-family-sans'] || "'Public Sans', 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif",
    headingFontStack: vads['--vads-font-family-heading'] || null,
    libraryCss: '@department-of-veterans-affairs/web-components/dist/component-library/component-library.css',
    iconSprite: '/img/sprite.svg',
    colorScheme: 'light',
  },
  entries,
  primitives,
  tokens: { vads, repo: repoTokens },
  templates,
};
writeFileSync(out, JSON.stringify(snapshot, null, 1) + '\n');
console.log(`Wrote ${out}: ${entries.length} entries, ${primitives.length} primitives, ${Object.keys(vads).length} VA tokens, ${Object.keys(repoTokens).length} repo tokens, ${templates.length} templates`);
