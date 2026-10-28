import { bodyOf, fail, send } from './_lib/http.js';

const MARK = '\u0001'; // the client treats everything after this as an error code
const MAX_PROMPT_CHARS = 400_000;

export default async function handler(req, res) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (req.method === 'GET') {
    return key ? send(res, 200, { ok: true }) : fail(res, 503, 'sampling_disabled', 'No API key is configured');
  }
  if (req.method !== 'POST') return fail(res, 405, 'error', 'Use POST');
  if (!key) return fail(res, 503, 'sampling_disabled', 'No API key is configured');

  const b = bodyOf(req);
  if (!b || typeof b.prompt !== 'string' || !b.prompt.trim()) return fail(res, 400, 'error', 'Expected { prompt }');
  const system = typeof b.system === 'string' && b.system ? b.system : undefined;
  if (b.prompt.length + (system ? system.length : 0) > MAX_PROMPT_CHARS) return fail(res, 413, 'prompt_too_large', 'That prompt is too large');

  const ac = new AbortController();
  res.on('close', () => { if (!res.writableEnded) ac.abort(); });

  let upstream;
  try {
    upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: ac.signal,
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5',
        max_tokens: Number(process.env.ANTHROPIC_MAX_TOKENS) || 16000,
        stream: true,
        ...(system ? { system } : {}),
        messages: [{ role: 'user', content: b.prompt }],
      }),
    });
  } catch (e) {
    if (ac.signal.aborted) return;
    console.error('sample: upstream unreachable:', e && e.message);
    return fail(res, 502, 'error', 'Could not reach the model');
  }

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => '');
    console.error('sample: upstream', upstream.status, detail.slice(0, 300)); // never logs the key
    if (upstream.status === 429) return fail(res, 429, 'rate_limited', 'Too many requests right now');
    if (upstream.status === 413) return fail(res, 413, 'prompt_too_large', 'That prompt is too large');
    if (upstream.status === 401 || upstream.status === 403) return fail(res, 502, 'sampling_disabled', 'The server could not use the model');
    return fail(res, 502, 'error', 'The model could not answer');
  }

  res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store', 'x-accel-buffering': 'no' });
  const reader = upstream.body.getReader();
  const dec = new TextDecoder();
  let buf = '';
  let wrote = false;
  let failed = false;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      let i;
      while ((i = buf.indexOf('\n\n')) >= 0) {
        const evt = buf.slice(0, i);
        buf = buf.slice(i + 2);
        const line = evt.split('\n').find((l) => l.startsWith('data:'));
        if (!line) continue;
        let j;
        try { j = JSON.parse(line.slice(5).trim()); } catch { continue; }
        if (j.type === 'content_block_delta' && j.delta?.type === 'text_delta' && j.delta.text) { res.write(j.delta.text); wrote = true; }
        else if (j.type === 'message_delta' && j.delta?.stop_reason === 'refusal') { res.write(`${MARK}refused`); failed = true; }
        else if (j.type === 'error') { console.error('sample: stream error', j.error?.type); failed = true; res.write(`${MARK}${j.error?.type === 'overloaded_error' ? 'rate_limited' : 'error'}`); }
      }
    }
    if (!wrote && !failed) res.write(`${MARK}empty_completion`);
  } catch (e) {
    if (!ac.signal.aborted && !failed) { console.error('sample: stream failed:', e && e.message); res.write(`${MARK}error`); }
  } finally {
    res.end();
  }
}
