/* Replaces Claude's artifact runtime. The Builder calls use("sample" | "db" | "user" |
   "downloads" | "mcp") and expects back the same objects the artifact host used to give it.
   Generating goes to this project's /api/sample (no key in the browser). Everything the Builder saves
   stays in this browser's localStorage: no accounts, no shared database. */
(function () {
  'use strict';
  var root = globalThis;
  
  function err(code, message) { var e = new Error(message || code); e.code = code; return e; }

  /* ---------- a local id for this browser (not an account) ---------- */
  function uid() {
    try {
      var v = localStorage.getItem('cpb-uid');
      if (!v) { v = (crypto.randomUUID && crypto.randomUUID()) || String(Date.now()) + '-' + Math.random().toString(16).slice(2); localStorage.setItem('cpb-uid', v); }
      return v;
    } catch (e) { return root.__cpbUid || (root.__cpbUid = 'anon-' + Math.random().toString(16).slice(2, 12)); }
  }
  function headers() { return { 'content-type': 'application/json' }; }

  /* ---------- sample: Claude generation through /api/sample ---------- */
  var MARK = '\u0001';
  function parseJsonText(text) {
    var t = String(text || '').trim();
    if (!t) throw err('empty_completion');
    var fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fence) t = fence[1].trim();
    try { return JSON.parse(t); } catch (e) { /* fall through to brace slice */ }
    var a = t.indexOf('{'), b = t.lastIndexOf('}');
    if (a >= 0 && b > a) { try { return JSON.parse(t.slice(a, b + 1)); } catch (e2) { /* invalid below */ } }
    throw err('invalid_json');
  }
  async function readError(res) {
    var j = null; try { j = await res.json(); } catch (e) { /* no body */ }
    var code = j && j.error && j.error.code;
    if (!code) code = res.status === 401 ? 'session_expired' : res.status === 429 ? 'rate_limited' : res.status === 413 ? 'prompt_too_large' : 'error';
    return err(code, j && j.error && j.error.message);
  }
  var sample = {
    json: async function (prompt, opts) {
      opts = opts || {};
      var body = typeof prompt === 'string' ? { prompt: prompt } : { prompt: prompt.prompt, system: prompt.system };
      var res;
      try { res = await fetch('/api/sample', { method: 'POST', headers: headers(), body: JSON.stringify(body), signal: opts.signal }); }
      catch (e) { throw e && e.name === 'AbortError' ? err('cancelled') : err('error', 'Could not reach the server'); }
      if (!res.ok) throw await readError(res);
      var reader = res.body.getReader(), dec = new TextDecoder(), acc = '';
      try {
        for (;;) {
          var r = await reader.read();
          if (r.done) break;
          acc += dec.decode(r.value, { stream: true });
          var m = acc.indexOf(MARK);
          if (m >= 0) throw err(acc.slice(m + 1).trim() || 'error');
          if (opts.onText) opts.onText({ text: acc });
        }
        acc += dec.decode();
      } catch (e) {
        if (e && e.name === 'AbortError') throw err('cancelled');
        throw e;
      }
      var mk = acc.indexOf(MARK);
      if (mk >= 0) throw err(acc.slice(mk + 1).trim() || 'error');
      return parseJsonText(acc);
    }
  };

  /* ---------- db: this browser's own storage (no server, no accounts) ---------- */
  var mem = {};
  function lsGet(k) { try { var v = localStorage.getItem(k); return v === null ? (mem[k] === undefined ? null : mem[k]) : v; } catch (e) { return mem[k] === undefined ? null : mem[k]; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); delete mem[k]; } catch (e) { if (e && /quota/i.test(String(e.name) + String(e.message))) throw err('storage_full', 'This browser is out of storage'); mem[k] = v; } }
  function readCol(c) { try { return JSON.parse(lsGet('cpb-db:' + c) || '{}'); } catch (e) { return {}; } }
  function writeCol(c, o) { lsSet('cpb-db:' + c, JSON.stringify(o)); notify(c); }
  var watchers = {};
  function notify(c) { (watchers[c] || []).slice().forEach(function (f) { f(); }); }
  if (root.addEventListener) root.addEventListener('storage', function (e) { if (e.key && e.key.indexOf('cpb-db:') === 0) notify(e.key.slice(7)); });
  function clone(x) { return x === undefined ? x : JSON.parse(JSON.stringify(x)); }
  function split(path) { var p = String(path).split('/'); return { c: p[0], id: p.slice(1).join('/') }; }
  function docSnap(id, d) { return { id: id, exists: d != null, data: function () { return d == null ? undefined : clone(d); } }; }
  function listSnap(o) {
    var docs = Object.keys(o).map(function (id) { return docSnap(id, o[id]); });
    return { docs: docs, size: docs.length, empty: !docs.length };
  }
  var db = {
    doc: function (path) {
      var r = split(path);
      return {
        id: r.id,
        get: async function () { return docSnap(r.id, readCol(r.c)[r.id]); },
        set: async function (d) { var o = readCol(r.c); o[r.id] = clone(d); writeCol(r.c, o); },
        update: async function (d) {
          var o = readCol(r.c);
          if (o[r.id] === undefined) throw err('not_found', 'No such document');
          o[r.id] = Object.assign({}, o[r.id], clone(d)); writeCol(r.c, o);
        },
        delete: async function () { var o = readCol(r.c); delete o[r.id]; writeCol(r.c, o); }
      };
    },
    collection: function (name) {
      return {
        add: async function (d) {
          var o = readCol(name), id = (crypto.randomUUID && crypto.randomUUID()) || String(Date.now()) + Math.random().toString(16).slice(2);
          o[id] = clone(d); writeCol(name, o); return { id: id };
        },
        get: async function () { return listSnap(readCol(name)); },
        onSnapshot: function (cb) {
          var stopped = false;
          function fire() { if (!stopped) cb(listSnap(readCol(name))); }
          (watchers[name] = watchers[name] || []).push(fire);
          Promise.resolve().then(fire);
          return function () { stopped = true; watchers[name] = (watchers[name] || []).filter(function (f) { return f !== fire; }); };
        }
      };
    }
  };

  /* ---------- user, downloads, mcp ---------- */
  var user = {
    id: async function () { return uid(); },
    profiles: async function (ids) { var out = {}; (ids || []).forEach(function (i) { out[i] = { name: i === uid() ? 'You' : 'A teammate' }; }); return out; }
  };
  var downloads = {
    save: async function (o) {
      var blob = o.data instanceof Blob ? o.data : new Blob([String(o.data)], { type: 'text/plain;charset=utf-8' });
      var url = URL.createObjectURL(blob), a = document.createElement('a');
      a.href = url; a.download = o.filename || 'download'; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }
  };

  /* ---------- the use() seam ---------- */
  async function ok(url, init) { try { var r = await fetch(url, init); return r.ok; } catch (e) { return false; } }
  var cache = {};
  root.claude = {
    use: function (name) {
      if (name === 'sample') return cache.sample || (cache.sample = ok('/api/sample').then(function (y) { return y ? sample : null; }));
      if (name === 'db') return Promise.resolve(db);
      if (name === 'user') return Promise.resolve(user);
      if (name === 'downloads') return Promise.resolve(downloads);
      /* mcp (Figma push) is not available here, so the Builder falls back to an SVG download. */
      return Promise.resolve(null);
    }
  };
  root.__claudeShim = { parseJsonText: parseJsonText };
})();
