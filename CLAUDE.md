# Component Builder: working notes

- `public/` is the app and is edited directly. `source/component-builder.artifact.html` is the original single-file export, kept for reference; `npm run split` re-creates `public/` from it and overwrites edits.
- The app reaches Claude, storage, identity and downloads only through `window.claude.use(name)`. `public/claude-shim.js` provides that. Keep it the single seam; do not call `/api/*` from `app.js` directly.
- `api/sample.js` is the only code that reads `ANTHROPIC_API_KEY`. Never log it, return it, or put it in `public/`.
- There are no accounts and no server database. Saved data lives in the browser's localStorage (`cpb-db:<collection>`), implemented in the shim. Do not build features that assume users can see each other's data.
- No dependencies. Tests use Node's built-in runner: `npm test`. Local server: `npm run dev` (reads `.env.local`).
- Before changing app behavior, remember the file is ~480 KB of one script. Search for a function by name rather than reading it whole.
