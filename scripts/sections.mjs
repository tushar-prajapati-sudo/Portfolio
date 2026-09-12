import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await page.waitForTimeout(500);
for (const sel of ["#systems", "#record", "#stack", ".sandbox-section", "#contact"]) {
  const el = await page.$(sel);
  if (!el) { console.log("missing", sel); continue; }
  const name = sel.replace(/[#.]/g, "");
  await el.screenshot({ path: `/tmp/shots/sec-${name}.png` });
  const box = await el.boundingBox();
  console.log(sel, "->", Math.round(box.height), "px");
}
await browser.close();
