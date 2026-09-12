import { chromium } from "playwright";

const BASE = process.env.BASE || "http://localhost:4173";
const OUT = process.env.OUT || "/tmp/shots";
const views = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch();
for (const v of views) {
  const page = await browser.newPage({ viewport: { width: v.width, height: v.height }, deviceScaleFactor: 2 });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(BASE + (process.env.PATHNAME || "/"), { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/${v.name}-fold.png` });
  await page.screenshot({ path: `${OUT}/${v.name}-full.png`, fullPage: true });
  const m = await page.evaluate(() => ({
    h: document.documentElement.scrollHeight,
    overflow: document.documentElement.scrollWidth > window.innerWidth,
    sw: document.documentElement.scrollWidth,
    iw: window.innerWidth,
  }));
  console.log(`${v.name}: height=${m.h}px h-overflow=${m.overflow} (scrollW ${m.sw} vs ${m.iw}) errors=${errors.length}`);
  errors.slice(0, 5).forEach((e) => console.log("   ERR", e.slice(0, 160)));
  await page.close();
}
await browser.close();
