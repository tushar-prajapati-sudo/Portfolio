import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const mode = process.argv[2] || "paper";
const tag = process.argv[3] || mode;
mkdirSync("/tmp/shots", { recursive: true });

const sizes = [
  [1440, 900, "desktop"],
  [768, 1024, "tablet"],
  [375, 812, "mobile"],
];

const browser = await chromium.launch();
for (const [width, height, name] of sizes) {
  const ctx = await browser.newContext({ viewport: { width, height } });
  await ctx.addInitScript((m) => localStorage.setItem("bg", m), mode);
  const page = await ctx.newPage();
  await page.goto("http://localhost:5173/", { waitUntil: "load" });
  await page.waitForTimeout(3500);
  await page.screenshot({ path: `/tmp/shots/${tag}-${name}.png` });
  await ctx.close();
  console.log(`shot ${tag}-${name}`);
}
await browser.close();
console.log("done " + mode);
