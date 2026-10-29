import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const html = readFileSync(join(root, 'public/index.html'), 'utf8');

test('index.html loads local files that exist, with the shim before the app', () => {
  const srcs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]).filter((u) => !u.startsWith('http') && !u.startsWith('#'));
  for (const s of srcs) assert.ok(existsSync(join(root, 'public', s)), `${s} is missing`);
  assert.ok(html.indexOf('claude-shim.js') > 0 && html.indexOf('claude-shim.js') < html.indexOf('app.js'));
});

test('the app still reaches Claude only through window.claude.use', () => {
  const app = readFileSync(join(root, 'public/app.js'), 'utf8');
  assert.match(app, /window\.claude\.use\(n\)/);
  assert.doesNotMatch(app, /api\.anthropic\.com|x-api-key|ANTHROPIC_API_KEY/);
});

test('vercel.json parses and points at public/', () => {
  const v = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8'));
  assert.equal(v.outputDirectory, 'public');
});

test('no secrets in tracked source', () => {
  const bad = /sk-ant-[A-Za-z0-9_-]{10,}|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{20,}/;
  const walk = (d) => readdirSync(d).flatMap((n) => {
    if (['.git', 'node_modules', '.vercel'].includes(n)) return [];
    const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p];
  });
  for (const f of walk(root)) {
    if (!['.js', '.mjs', '.html', '.json', '.md', '.css', '.yml', '.example'].includes(extname(f)) && !f.endsWith('.env.example')) continue;
    assert.doesNotMatch(readFileSync(f, 'utf8'), bad, `${f} looks like it holds a secret`);
  }
});

test('footer holds the "how this tool works" accordion and the header button targets it', () => {
  assert.match(html, /<footer[^>]*id="site-foot"/);
  assert.match(html, /id="how-btn"[^>]*aria-expanded="false"[^>]*aria-controls="how-panel"/);
  assert.match(html, /<div class="how-panel" id="how-panel"[^>]*hidden>/);
  const nav = html.slice(html.indexOf('<nav'), html.indexOf('</nav>'));
  assert.match(nav, /id="how-jump"[^>]*href="#how-it-works"/);
  assert.ok(html.indexOf('id="how-it-works"') > html.indexOf('</nav>'));
  assert.ok(html.indexOf('how-it-works.js') > html.indexOf('app.js'));
});
