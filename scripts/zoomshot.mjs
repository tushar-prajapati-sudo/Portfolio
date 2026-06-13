import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = process.argv[2] || "http://localhost:5173/";
const tag = process.argv[3] || "zoom";
const outDir = "/tmp/shots";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
await page.goto(url, { waitUntil: "load" });
await page.waitForTimeout(4000);

// Top of page.
await page.screenshot({ path: `${outDir}/${tag}-top.png` });
console.log("shot", `${tag}-top`);

// Drive Lenis (it listens for wheel) toward ~mid-scroll, where scale peaks.
const max = await page.evaluate(
  () => document.documentElement.scrollHeight - window.innerHeight
);
const target = max * 0.45;
await page.mouse.move(1000, 450);
for (let i = 0; i < 60; i++) {
  const y = await page.evaluate(() => window.scrollY);
  if (y >= target) break;
  await page.mouse.wheel(0, 320);
  await page.waitForTimeout(110);
}
// Let the scale/y springs settle.
await page.waitForTimeout(1400);
const y = await page.evaluate(() => window.scrollY);
console.log("scrollY", Math.round(y), "of", Math.round(max), `(${(y / max).toFixed(2)})`);
await page.screenshot({ path: `${outDir}/${tag}-mid.png` });
console.log("shot", `${tag}-mid`);

await browser.close();
console.log("done");
