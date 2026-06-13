import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const outDir = "/tmp/shots";
mkdirSync(outDir, { recursive: true });

const b = await chromium.launch();
const p = await b.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
await p.goto("http://localhost:5173/", { waitUntil: "load" });
await p.waitForTimeout(4000);

// Smooth-scroll to Journey via the nav anchor.
await p.click('a[aria-label="Journey"]');
await p.waitForTimeout(2600);
await p.screenshot({ path: `${outDir}/journey-rest.png` });
console.log("shot journey-rest");

// Click the bottom-most orbit node to verify the popup opens upward (not cut off).
const nodes = await p.$$("#journey button[data-cursor]");
let target = null;
let maxY = -Infinity;
for (const h of nodes) {
  const box = await h.boundingBox();
  if (box) {
    const cy = box.y + box.height / 2;
    if (cy > maxY) {
      maxY = cy;
      target = h;
    }
  }
}
if (target) {
  await target.click({ force: true });
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `${outDir}/journey-expanded.png` });
  console.log("shot journey-expanded (bottom-most node)");
} else {
  console.log("no node buttons found in #journey");
}

await b.close();
console.log("done");
