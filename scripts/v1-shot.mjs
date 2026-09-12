import { chromium } from "playwright";
/** Grabs a real frame of the /v1 build for the sandbox panel. */
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 760 }, deviceScaleFactor: 2 });
await p.goto(process.env.V1 || "http://localhost:4173/v1/", { waitUntil: "domcontentloaded" });
// Spline streams its scene; give it room to actually arrive.
await p.waitForTimeout(14000);
await p.evaluate(() => window.scrollTo(0, 260));
await p.waitForTimeout(3500);
await p.screenshot({ path: "public/sandbox.png" });
const info = await p.evaluate(() => ({ canvases: document.querySelectorAll("canvas").length }));
console.log("captured public/sandbox.png", JSON.stringify(info));
await b.close();
