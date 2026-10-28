// Splits the single-file Claude artifact into public/index.html, styles.css and app.js.
// Usage: node scripts/split-artifact.mjs [source.html] [outDir]
// Run it once to create public/, or again on a fresh artifact export (it overwrites
// index.html, styles.css and app.js, so re-apply any edits afterwards).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const src = resolve(process.argv[2] ?? 'source/component-builder.artifact.html');
const out = resolve(process.argv[3] ?? 'public');
const html = readFileSync(src, 'utf8');

const must = (i, what) => { if (i < 0) throw new Error(`Could not find ${what} in ${src}`); return i; };

// 1. The reset style the artifact host injects in <head> (first <style>).
const resetStart = must(html.indexOf('<style>'), 'the host reset <style>');
const resetEnd = must(html.indexOf('</style>', resetStart), 'end of the host reset <style>');
const reset = html.slice(resetStart + 7, resetEnd).trim();

// 2. The page title.
const t0 = must(html.indexOf('<title>'), '<title>');
const title = html.slice(t0 + 7, must(html.indexOf('</title>', t0), '</title>')).trim();

// 3. The Builder's own stylesheet (the <style> after the title).
const cssOpen = must(html.indexOf('<style>', t0), 'the Builder <style>');
const cssClose = must(html.indexOf('</style>', cssOpen), 'end of the Builder <style>');
const css = html.slice(cssOpen + 7, cssClose).trim();

// 4. Body markup: everything between that stylesheet and the first <script>.
const jszipTag = must(html.indexOf('<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/'), 'the JSZip <script>');
const markup = html.slice(cssClose + 8, jszipTag).trim();
const jszipEnd = must(html.indexOf('</script>', jszipTag), 'end of the JSZip <script>') + 9;
const jszip = html.slice(jszipTag, jszipEnd);

// 5. The application script: from the next <script> to the last </script>.
const appOpen = must(html.indexOf('<script>', jszipEnd), 'the application <script>');
const appClose = must(html.lastIndexOf('</script>'), 'the closing </script>');
const app = html.slice(appOpen + 8, appClose).trim();

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
${markup}
${jszip}
<script src="claude-shim.js"></script>
<script src="app.js"></script>
</body>
</html>
`;

mkdirSync(out, { recursive: true });
writeFileSync(resolve(out, 'index.html'), page);
writeFileSync(resolve(out, 'styles.css'),
  `/* Host reset carried over from the artifact wrapper. */\n${reset}\n\n/* Component Builder */\n${css}\n`);
writeFileSync(resolve(out, 'app.js'), `${app}\n`);
console.log(`Wrote ${out}/index.html, styles.css, app.js (title: ${title})`);
