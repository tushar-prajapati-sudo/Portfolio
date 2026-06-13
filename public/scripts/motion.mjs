import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:5173/", { waitUntil: "load" });
await page.waitForTimeout(3500);

const el = page.locator('canvas[aria-label="TUSHAR"]');
const a = await el.screenshot();
await page.waitForTimeout(700);
const c = await el.screenshot();

const n = Math.min(a.length, c.length);
let diff = 0;
for (let i = 0; i < n; i++) if (a[i] !== c[i]) diff++;
console.log(
  `ball/paddle bytes differing: ${diff}/${n} => ${
    diff > 1000 ? "ANIMATING ✓" : "STATIC ✗"
  }`
);
await browser.close();
