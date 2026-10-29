// Captures real screenshots of the Component Prototype Builder for the demo deck.
// Usage (from the repo root, on your own computer):
//   npm i --no-save playwright && npx playwright install chromium
//   node scripts/capture-demo.mjs                       # captures the Vercel site
//   node scripts/capture-demo.mjs http://localhost:3000 # or a local dev server
//   node scripts/capture-demo.mjs --generate            # also runs live generation (spends API key)
// Output: demo-captures/*.png (git-ignored scratch; the deck inlines what it needs).
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const args = process.argv.slice(2);
const GENERATE = args.includes("--generate");
const BASE = args.find((a) => a.startsWith("http")) || "https://component-prototype-builder.vercel.app/";
const OUT = new URL("../demo-captures/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1.5 });
const page = await ctx.newPage();
page.setDefaultTimeout(10000);
if (args.includes("--block-external")) {
  // Test aid only: skip fonts and CDN scripts so the run works without internet access.
  const origin = new URL(BASE).origin;
  await page.route("**/*", (r) => (r.request().url().startsWith(origin) ? r.continue() : r.abort()));
}
const done = [];
const failed = [];

async function shot(name, fn, opts = {}) {
  try {
    await fn();
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}${name}.png`, fullPage: Boolean(opts.fullPage) });
    done.push(name);
  } catch (e) {
    failed.push(`${name}: ${String(e.message).split("\n")[0]}`);
  }
}
const sub = (label) => page.locator("[role=tab], button").filter({ hasText: new RegExp(`^\\s*${label}\\s*$`) }).first();

await page.goto(BASE, { waitUntil: "load" });
await page.waitForTimeout(2000);

// Pages > Compose, starting from a template
await shot("01-pages-compose", async () => {
  await page.getByRole("button", { name: "Benefits dashboard" }).first().click();
  await page.waitForTimeout(2500);
}, { fullPage: true });

// Components: the example card, or a live generation with --generate
await shot("02-components", async () => {
  await page.getByText("Components", { exact: true }).nth(1).click();
  await page.waitForTimeout(2000);
  if (GENERATE) {
    await page.getByRole("button", { name: "Claim status", exact: true }).click();
    await page.getByRole("button", { name: "Generate", exact: true }).click();
    await page.waitForFunction(() => !document.body.innerText.includes("EXAMPLE"), null, { timeout: 150000 });
    await page.waitForTimeout(2500);
  }
});

// Forms
await shot("03-forms", async () => {
  await page.getByText("Forms", { exact: true }).nth(1).click();
  await page.waitForTimeout(1500);
  await page.getByRole("button", { name: "Load example" }).click();
  await page.waitForTimeout(2500);
});

// Reference panel (live VA components load from the network)
await shot("04-reference", async () => {
  await page.getByText("Reference", { exact: true }).nth(1).click();
  await page.waitForTimeout(4000);
});

// Back to Pages so the composed page is selected, then Review and export
await page.getByText("Review and export", { exact: true }).first().click();
await page.waitForTimeout(1500);
await shot("05-review-overview", async () => {});
for (const [file, label] of [
  ["06-review-snapshot", "Snapshot"],
  ["07-review-specs", "Specs"],
  ["08-review-data", "Data dependencies"],
  ["09-review-flows", "Process flows"],
  ["10-review-questions", "Questions"],
  ["11-review-bundle", "Bundle files"],
]) {
  await shot(file, async () => {
    await sub(label).click();
    await page.waitForTimeout(1200);
  });
}

// Send for engineer review (stays in this browser's storage), then the Engineer view
await shot("12-engineer-review", async () => {
  await sub("Overview").click();
  await page.waitForTimeout(600);
  await page.getByRole("button", { name: "Send for engineer review" }).click();
  await page.locator("#cs-subnote").fill("Ready for a feasibility check before user testing.");
  await page.locator("#cs-subsend").click();
  await page.waitForTimeout(2500);
  await sub("Engineer").click();
  await page.waitForTimeout(2000);
  await page.getByText("Waiting for you").first().click();
  await page.waitForTimeout(2000);
});

await browser.close();
console.log(`Saved ${done.length} screenshots to ${OUT}`);
console.log(done.join("\n"));
if (failed.length) console.log(`\nCould not capture ${failed.length}:\n` + failed.join("\n"));
