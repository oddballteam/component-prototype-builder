import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

const code = readFileSync(new URL('../public/claude-shim.js', import.meta.url), 'utf8');

function load(fetchImpl) {
  const store = {};
  const ctx = {
    fetch: fetchImpl, console, setInterval, clearInterval, setTimeout, TextDecoder, Blob, URL,
    localStorage: { getItem: (k) => store[k] ?? null, setItem: (k, v) => { store[k] = v; } },
    crypto: { randomUUID: () => 'uuid-1234-5678' },
    document: { hidden: false },
  };
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  vm.runInContext(code, ctx);
  return ctx;
}

// Objects built inside the vm context have a different Object.prototype; compare plain copies.
const plain = (x) => JSON.parse(JSON.stringify(x));

const streamOf = (...parts) => { const enc = new TextEncoder(); return new ReadableStream({ start(c) { parts.forEach((p) => c.enqueue(enc.encode(p))); c.close(); } }); };

test('parseJsonText handles plain, fenced and chatty JSON, and fails clearly', () => {
  const { parseJsonText } = load(async () => {}).__claudeShim;
  assert.deepEqual(plain(parseJsonText('{"a":1}')), { a: 1 });
  assert.deepEqual(plain(parseJsonText('```json\n{"a":1}\n```')), { a: 1 });
  assert.deepEqual(plain(parseJsonText('Here you go: {"a":1} Hope it helps')), { a: 1 });
  assert.throws(() => parseJsonText('not json'), { code: 'invalid_json' });
  assert.throws(() => parseJsonText('  '), { code: 'empty_completion' });
});

test('sample.json streams text to onText and returns parsed JSON', async () => {
  const ctx = load(async (url, init) => {
    if (url === '/api/sample' && init?.method === 'POST') {
      assert.equal(init.headers['x-builder-user'], undefined);
      assert.equal(JSON.parse(init.body).prompt, 'go');
      return new Response(streamOf('{"a":', '1}'), { status: 200 });
    }
    return new Response('{}', { status: 200 });
  });
  const sample = await ctx.claude.use('sample');
  const seen = [];
  const out = await sample.json('go', { onText: ({ text }) => seen.push(text) });
  assert.deepEqual(plain(out), { a: 1 });
  assert.deepEqual(seen, ['{"a":', '{"a":1}']);
});

test('sample.json turns server errors and stream markers into the Builder\'s error codes', async () => {
  let mode = 'http429';
  const ctx = load(async (url, init) => {
    if (init?.method !== 'POST') return new Response('{}', { status: 200 });
    if (mode === 'http429') return new Response('{"error":{"code":"rate_limited"}}', { status: 429 });
    if (mode === 'marker') return new Response(streamOf('{"a"', '\u0001refused'), { status: 200 });
    if (mode === 'abort') { const e = new Error('x'); e.name = 'AbortError'; throw e; }
  });
  const sample = await ctx.claude.use('sample');
  await assert.rejects(sample.json('p'), { code: 'rate_limited' });
  mode = 'marker'; await assert.rejects(sample.json('p'), { code: 'refused' });
  mode = 'abort'; await assert.rejects(sample.json('p'), { code: 'cancelled' });
});

test('use("sample") is null when no key is configured; db always exists; mcp is null', async () => {
  const ctx = load(async () => new Response('{}', { status: 503 }));
  assert.equal(await ctx.claude.use('sample'), null);
  assert.ok(await ctx.claude.use('db'));
  assert.equal(await ctx.claude.use('mcp'), null);
});

test('db keeps documents in this browser, never calls the server', async () => {
  let fetched = 0;
  const ctx = load(async () => { fetched++; return new Response('{}'); });
  const db = await ctx.claude.use('db');
  await db.doc('studies/s1').set({ name: 'A', n: 1 });
  let snap = await db.doc('studies/s1').get();
  assert.equal(snap.exists, true); assert.deepEqual(plain(snap.data()), { name: 'A', n: 1 });
  await db.doc('studies/s1').update({ n: 2 });
  assert.deepEqual(plain((await db.doc('studies/s1').get()).data()), { name: 'A', n: 2 });
  await assert.rejects(db.doc('studies/none').update({ a: 1 }), { code: 'not_found' });
  assert.equal((await db.doc('studies/none').get()).exists, false);
  const { id } = await db.collection('notes').add({ read: false });
  const list = await db.collection('notes').get();
  assert.equal(list.docs.length, 1); assert.equal(list.docs[0].id, id);
  await db.doc('versions/abc__v2').set({ ok: true }); // the artifact's id style
  assert.equal((await db.doc('versions/abc__v2').get()).exists, true);
  await db.doc('studies/s1').delete();
  assert.equal((await db.doc('studies/s1').get()).exists, false);
  assert.equal(fetched, 0);
});

test('data persists across a reload of the page (same localStorage)', async () => {
  const shared = {};
  const mk = () => { const c = load(async () => new Response('{}')); c.localStorage.getItem = (k) => shared[k] ?? null; c.localStorage.setItem = (k, v) => { shared[k] = v; }; return c; };
  const a = await mk().claude.use('db'); await a.doc('records/r1').set({ title: 'kept' });
  const b = await mk().claude.use('db');
  assert.deepEqual(plain((await b.doc('records/r1').get()).data()), { title: 'kept' });
});

test('onSnapshot fires at once, again after each write to that collection, and stops on unsubscribe', async () => {
  const ctx = load(async () => new Response('{}'));
  const db = await ctx.claude.use('db');
  const seen = [];
  const off = db.collection('studies').onSnapshot((s) => seen.push(s.docs.length));
  await new Promise((r) => setTimeout(r, 5));
  await db.doc('studies/a').set({ n: 1 });
  await db.doc('other/x').set({ n: 1 }); // different collection: no callback
  await db.doc('studies/b').set({ n: 2 });
  assert.deepEqual(seen, [0, 1, 2]);
  off();
  await db.doc('studies/c').set({ n: 3 });
  assert.deepEqual(seen, [0, 1, 2]);
});

test('a full browser store raises storage_full instead of losing data silently', async () => {
  const ctx = load(async () => new Response('{}'));
  ctx.localStorage.setItem = () => { const e = new Error('The quota has been exceeded.'); e.name = 'QuotaExceededError'; throw e; };
  const db = await ctx.claude.use('db');
  await assert.rejects(db.doc('studies/a').set({ n: 1 }), { code: 'storage_full' });
});

test('the local id is stable and names are only You or A teammate', async () => {
  const ctx = load(async () => {});
  const user = await ctx.claude.use('user');
  assert.equal(await user.id(), 'uuid-1234-5678');
  assert.deepEqual(plain(await user.profiles(['u1', 'uuid-1234-5678'])), { u1: { name: 'A teammate' }, 'uuid-1234-5678': { name: 'You' } });
});
