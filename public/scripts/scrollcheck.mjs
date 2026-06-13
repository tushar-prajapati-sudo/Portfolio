import { chromium } from "playwright";
const b = await chromium.launch();
const p = await (await b.newContext({ viewport:{width:1440,height:900}})).newPage();
await p.goto("http://localhost:5173/", { waitUntil: "load" });
await p.waitForTimeout(4000);
const y = await p.evaluate(() => window.scrollY);
console.log("scrollY after load:", y, y < 20 ? "TOP ✓" : "NOT TOP ✗");
await b.close();
