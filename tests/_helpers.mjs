import { EventEmitter } from 'node:events';

export function fakeReq(method, body, headers = {}) {
  return { method, body, headers };
}

export function fakeRes() {
  const r = new EventEmitter();
  r.status = 0; r.headers = {}; r.chunks = []; r.writableEnded = false;
  r.writeHead = (s, h) => { r.status = s; r.headers = h || {}; };
  r.write = (c) => { r.chunks.push(String(c)); return true; };
  r.end = (c) => { if (c) r.chunks.push(String(c)); r.writableEnded = true; r.emit('close'); };
  r.text = () => r.chunks.join('');
  r.json = () => JSON.parse(r.text());
  return r;
}

export function sse(events) {
  const enc = new TextEncoder();
  return new ReadableStream({
    start(c) { for (const e of events) c.enqueue(enc.encode(`event: ${e.type}\ndata: ${JSON.stringify(e)}\n\n`)); c.close(); },
  });
}

export const delta = (text) => ({ type: 'content_block_delta', index: 0, delta: { type: 'text_delta', text } });
