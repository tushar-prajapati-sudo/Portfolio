import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = process.argv[2] || "http://localhost:5173/";
const tag = process.argv[3] || "shot";
const outDir = "/tmp/shots";
mkdirSync(outDir, { recursive: true });

const sizes = [
  [1440, 900, "desktop"],
  [768, 1024, "tablet"],
  [375, 812, "mobile"],
];

const browser = await chromium.launch();
for (const [width, height, name] of sizes) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  await page.goto(url, { waitUntil: "load" });
  // Let Spline / shaders / animations settle.
  await page.waitForTimeout(3500);
  await page.screenshot({ path: `${outDir}/${tag}-${name}.png` });
  await page.close();
  console.log(`shot ${tag}-${name}`);
}
await browser.close();
console.log("done");
