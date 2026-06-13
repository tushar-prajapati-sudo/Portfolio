import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const outDir = "/tmp/shots";
mkdirSync(outDir, { recursive: true });
const URL = "http://localhost:5173/";

const b = await chromium.launch();

// Wheel (up or down) until the element with `text` sits ~`target`px from top.
async function wheelToText(page, text, target = 130) {
  const loc = page.getByText(text, { exact: false }).first();
  for (let i = 0; i < 50; i++) {
    const box = await loc.boundingBox().catch(() => null);
    if (box && Math.abs(box.y - target) < 70) break;
    const dy = box ? Math.sign(box.y - target) * Math.min(320, Math.abs(box.y - target) + 40) : 320;
    await page.mouse.wheel(0, dy);
    await page.waitForTimeout(110);
  }
  await page.waitForTimeout(1100);
}

async function run(tag, width, height, steps) {
  const p = await b.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await p.goto(URL, { waitUntil: "load" });
  await p.waitForTimeout(4000);
  await p.mouse.move(width * 0.8, height * 0.5);
  for (const [name, text] of steps) {
    await wheelToText(p, text);
    await p.screenshot({ path: `${outDir}/${tag}-${name}.png` });
    console.log("shot", `${tag}-${name}`);
  }
  await p.close();
}

await run("d", 1440, 900, [
  ["about", "the long version"],
  ["cases", "more work"],
  ["qspace", "currently building"],
]);

await run("m", 390, 844, [
  ["about", "the long version"],
  ["cases", "more work"],
]);

await b.close();
console.log("done");
