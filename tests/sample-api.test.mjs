import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/sample.js';
import { fakeReq, fakeRes, sse, delta } from './_helpers.mjs';

const realFetch = globalThis.fetch;
test.afterEach(() => { globalThis.fetch = realFetch; delete process.env.ANTHROPIC_API_KEY; delete process.env.ANTHROPIC_MODEL; });

test('GET reports whether a key is configured', async () => {
  let res = fakeRes(); await handler(fakeReq('GET'), res);
  assert.equal(res.status, 503);
  process.env.ANTHROPIC_API_KEY = 'test-key';
  res = fakeRes(); await handler(fakeReq('GET'), res);
  assert.equal(res.status, 200);
});

test('streams model text through, sends the key only upstream', async () => {
  process.env.ANTHROPIC_API_KEY = 'test-key';
  let seen;
  globalThis.fetch = async (url, init) => {
    seen = { url, init };
    return new Response(sse([{ type: 'message_start' }, delta('{"a":'), delta('1}'), { type: 'message_stop' }]), { status: 200 });
  };
  const res = fakeRes();
  await handler(fakeReq('POST', { prompt: 'make a thing', system: 'be brief' }, {}), res);
  assert.equal(res.status, 200);
  assert.equal(res.text(), '{"a":1}');
  assert.equal(seen.url, 'https://api.anthropic.com/v1/messages');
  assert.equal(seen.init.headers['x-api-key'], 'test-key');
  const sent = JSON.parse(seen.init.body);
  assert.equal(sent.model, 'claude-sonnet-5-5');
  assert.equal(sent.stream, true);
  assert.equal(sent.system, 'be brief');
  assert.deepEqual(sent.messages, [{ role: 'user', content: 'make a thing' }]);
  assert.ok(!res.text().includes('test-key'));
});

test('the model can be overridden by env', async () => {
  process.env.ANTHROPIC_API_KEY = 'k'; process.env.ANTHROPIC_MODEL = 'some-model';
  let sent;
  globalThis.fetch = async (_u, init) => { sent = JSON.parse(init.body); return new Response(sse([delta('x')]), { status: 200 }); };
  await handler(fakeReq('POST', { prompt: 'p' }), fakeRes());
  assert.equal(sent.model, 'some-model');
});

test('maps upstream failures to the codes the Builder understands', async () => {
  process.env.ANTHROPIC_API_KEY = 'k';
  for (const [status, http, code] of [[429, 429, 'rate_limited'], [413, 413, 'prompt_too_large'], [401, 502, 'sampling_disabled'], [500, 502, 'error']]) {
    globalThis.fetch = async () => new Response('{"error":{"message":"x"}}', { status });
    const res = fakeRes(); await handler(fakeReq('POST', { prompt: 'p' }), res);
    assert.equal(res.status, http); assert.equal(res.json().error.code, code);
  }
});

test('marks a refusal and an empty answer in the stream', async () => {
  process.env.ANTHROPIC_API_KEY = 'k';
  globalThis.fetch = async () => new Response(sse([{ type: 'message_delta', delta: { stop_reason: 'refusal' } }]), { status: 200 });
  let res = fakeRes(); await handler(fakeReq('POST', { prompt: 'p' }), res);
  assert.equal(res.text(), '\u0001refused');
  globalThis.fetch = async () => new Response(sse([{ type: 'message_stop' }]), { status: 200 });
  res = fakeRes(); await handler(fakeReq('POST', { prompt: 'p' }), res);
  assert.equal(res.text(), '\u0001empty_completion');
});

test('refuses an oversized prompt before calling the model', async () => {
  process.env.ANTHROPIC_API_KEY = 'k';
  let called = false; globalThis.fetch = async () => { called = true; return new Response(''); };
  const res = fakeRes(); await handler(fakeReq('POST', { prompt: 'x'.repeat(400_001) }), res);
  assert.equal(res.status, 413); assert.equal(called, false);
});
