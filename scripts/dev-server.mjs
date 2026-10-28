// Local server: serves public/ and runs api/sample.js. No Vercel login needed.
// Usage: npm run dev   (reads .env.local if present; PORT defaults to 3000)
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, extname, join, normalize } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const pub = join(root, 'public');

if (existsSync(join(root, '.env.local'))) {
  for (const line of readFileSync(join(root, '.env.local'), 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !line.trim().startsWith('#') && m[2] && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
}

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json' };
const handlers = { '/api/sample': 'api/sample.js' };

export function start(port = Number(process.env.PORT) || 3000) {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    if (handlers[url.pathname]) {
      let raw = '';
      for await (const c of req) raw += c;
      if (raw && (req.headers['content-type'] || '').includes('json')) { try { req.body = JSON.parse(raw); } catch { req.body = null; } }
      const mod = await import(pathToFileURL(join(root, handlers[url.pathname])).href);
      try { await mod.default(req, res); } catch (e) { console.error(e); if (!res.headersSent) res.writeHead(500); res.end(); }
      return;
    }
    let file = normalize(join(pub, url.pathname === '/' ? 'index.html' : url.pathname));
    if (!file.startsWith(pub) || !existsSync(file) || statSync(file).isDirectory()) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' });
    res.end(readFileSync(file));
  });
  return new Promise((ok) => server.listen(port, () => { console.log(`http://localhost:${server.address().port}`); ok(server); }));
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) start();
