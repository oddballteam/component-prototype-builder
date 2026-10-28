export function send(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(JSON.stringify(body));
}

export function fail(res, status, code, message) {
  send(res, status, { error: { code, message } });
}

// Vercel parses JSON bodies into req.body; the local dev server does the same.
export function bodyOf(req) {
  const b = req.body;
  if (b && typeof b === 'object') return b;
  if (typeof b === 'string') { try { return JSON.parse(b); } catch { return null; } }
  return null;
}
