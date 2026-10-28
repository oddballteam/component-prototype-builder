# Component Builder

A prototyping workbench for VA.gov (VADS) components, pages and forms. It started as a Claude artifact and now runs as a static app plus one Vercel function. There are no accounts: everything you save stays in your own browser.

```
public/               the app (served as-is)
  index.html          markup
  styles.css          styles
  app.js              the Builder, unchanged from the artifact except two error messages
  claude-shim.js      stands in for Claude's artifact runtime
api/
  sample.js           POST: sends a prompt to the Anthropic API and streams text back. Holds the key.
                      GET: says whether generating is available.
  _lib/http.js        small response helpers
scripts/
  split-artifact.mjs  re-creates public/ from a fresh artifact export
  dev-server.mjs      local server for public/ and api/
source/               the original single-file artifact, for reference
tests/                node --test
vercel.json           output directory, function time limits, basic headers
```

## How it fits together

The only thing the server does is generate: the browser sends a prompt to this project's `/api/sample`, which adds the key and calls the Anthropic API. The app asks `window.claude.use("sample" | "db" | "user" | "downloads" | "mcp")` for what it needs, and `claude-shim.js` answers:

| The app asks for | What it gets here |
| --- | --- |
| `sample` | `/api/sample`. Unavailable (the Builder shows its "can't generate" state) if no key is set. |
| `db` | This browser's `localStorage`, one entry per collection (`cpb-db:studies` and so on). Nothing is sent to a server. Other tabs on the same browser see changes. |
| `user` | An id this browser makes for itself. You show as "You". |
| `downloads` | A normal browser download. |
| `mcp` | Nothing. "Send to Figma" falls back to downloading an SVG. |

Because saving is local: studies, records, the library and the gallery are per browser and per device. They are not shared, and clearing site data erases them. Use the Builder's downloads and Copy buttons to keep or hand off work. Browsers allow roughly 5 MB per site; if it fills, saving shows an error rather than dropping data silently.

## Run it locally

```
cp .env.example .env.local     # add ANTHROPIC_API_KEY
npm run dev                    # http://localhost:3000
npm test
```

## Deploy

Step by step: see "Component Builder: First Deploy Steps". In short: import the repo into Vercel, add `ANTHROPIC_API_KEY` (Production and Preview, Sensitive), turn on Deployment Protection, open a pull request and test the preview.

## Limits to know about

- **Anyone with the URL can generate and spend your key.** With no logins, the only gate is Vercel Deployment Protection (Settings, then Deployment Protection). Keep it on, set a spend limit on the key's workspace in the Anthropic Console, and do not share the URL widely.
- **No shared data.** Because storage is per browser, the Community tab only shows what that browser saved, and two people never see each other's studies or records.
- **Function time.** `vercel.json` asks for up to 300 seconds on `/api/sample`. Whether your Vercel plan allows that has not been checked.
- **Figma push.** Not available; SVG download is the fallback.
- **Copy.** Some messages still say "opened in Claude" or "signed in on claude.ai". They only show when generating is unavailable (or in the sharing hints). Search `app.js` for "in Claude" and "claude.ai" and reword them.
- **VA component library link.** The plan to render through `va-uswds-render` and `@department-of-veterans-affairs/component-library` (tokens, templates, Public Sans) is separate and not part of this package. See the integration plan.

## Secrets

- The Anthropic key lives only in Vercel environment variables as `ANTHROPIC_API_KEY`, and only `api/sample.js` reads it.
- Never put it in a file in this repo or in `public/`. `.env*` is git-ignored; `.env.example` is the template.
- A test fails the build if a key-shaped string appears in the repo.
