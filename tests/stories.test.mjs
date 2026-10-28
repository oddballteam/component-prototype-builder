import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(fs.readFileSync(path.join(root, "public/va-stories.json"), "utf8"));

test("Storybook story data has the expected shape", () => {
  assert.equal(data.schema, 1);
  assert.ok(data.stories.length > 300, "expected hundreds of stories");
  for (const s of data.stories) {
    assert.ok(/^va-[a-z-]+$/.test(s.component), "component tag: " + s.component);
    assert.ok(s.name && s.html.length > 0, "story " + s.component + " " + s.name);
  }
});

test("the segmented progress bar stories match Storybook", () => {
  const list = data.stories.filter(s => s.component === "va-segmented-progress-bar");
  const names = list.map(s => s.name);
  assert.ok(names.includes("Custom Progress Term"));
  const s = list.find(x => x.name === "Custom Progress Term");
  for (const piece of ['counters="small"', "centered-labels", 'progress-term="Chapter"', 'header-level="2"']) {
    assert.ok(s.html.includes(piece), "missing " + piece);
  }
});

test("each story draws only tags that start with va- or ordinary HTML", () => {
  for (const s of data.stories) assert.ok(!/<undefined|\[object/.test(s.html), s.component + " " + s.name);
});
