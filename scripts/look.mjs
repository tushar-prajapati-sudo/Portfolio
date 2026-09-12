import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const errs = [];
p.on("pageerror", (e) => errs.push(String(e).slice(0, 140)));
await p.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await p.mouse.move(980, 430);
await p.waitForTimeout(700);
await p.screenshot({ path: "/tmp/shots/x-top.png" });
for (const [sel, name] of [["#about", "about"], ["#sandbox", "sandbox"], ["#systems", "systems"]]) {
  await p.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: "start" }), sel);
  await p.waitForTimeout(700);
  await p.mouse.move(1100, 500);
  await p.waitForTimeout(400);
  await p.screenshot({ path: `/tmp/shots/x-${name}.png` });
}
console.log("errors:", errs.length, errs.slice(0, 3));
await b.close();
