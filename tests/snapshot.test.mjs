import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const snap = JSON.parse(readFileSync(new URL('../public/va-render-snapshot.json', import.meta.url), 'utf8'));
const app = readFileSync(new URL('../public/app.js', import.meta.url), 'utf8');

test('snapshot has the pieces the Builder reads', () => {
  assert.equal(snap.schema, 1);
  assert.ok(snap.entries.length > 0 && snap.templates.length > 0);
  assert.equal(snap.styling.font, 'Public Sans');
  assert.match(snap.styling.fontStack, /^'?"?Public Sans/);
  assert.ok(snap.versions.webComponentsInstalled && snap.versions.cssLibrary);
  assert.ok(Object.keys(snap.tokens.vads).length > 100 && Object.keys(snap.tokens.repo).length > 0);
});

test('entries are well formed and keys are unique', () => {
  const keys = new Set();
  for (const e of snap.entries) {
    assert.match(e.key, /^Va[A-Z]/); assert.match(e.tagName, /^va-/);
    assert.ok(e.description && e.example && typeof e.example === 'object', e.key);
    assert.ok(!keys.has(e.key), `duplicate ${e.key}`); keys.add(e.key);
  }
});

test('every template is a flat spec whose children exist', () => {
  for (const t of snap.templates) {
    assert.ok(t.spec.root && t.spec.elements[t.spec.root], `${t.id} root`);
    for (const [id, el] of Object.entries(t.spec.elements)) for (const c of el.children || []) assert.ok(t.spec.elements[c], `${t.id}.${id} -> ${c}`);
  }
});

test('primitives cover the layout parts the Builder prompt tells the model to keep', () => {
  const keys = snap.primitives.map((p) => p.key);
  for (const k of ['Section', 'GridContainer', 'Grid', 'Heading', 'Text']) assert.ok(keys.includes(k), k);
});

test('the Builder no longer asks for Source Sans or Bitter in its own output', () => {
  const rest = app.replace(/const REF_CSS=.*\n/, ''); // the embedded library CSS is a vendored copy; R_FONT overrides it
  assert.doesNotMatch(rest, /Source Sans/);
  assert.doesNotMatch(rest.replace(/--font-serif:Bitter,Georgia,serif;/, ''), /Bitter/);
  assert.match(app, /const R_FONT=/);
});
