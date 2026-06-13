import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const outDir = "/tmp/shots";
mkdirSync(outDir, { recursive: true });
const URL = process.argv[2] || "http://localhost:5174/";

const b = await chromium.launch();
const p = await b.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
await p.goto(URL, { waitUntil: "load" });
await p.waitForTimeout(4000);

// Jump to Projects, screenshot the click-to-load posters.
await p.locator('a[aria-label="Work"]').click({ force: true });
await p.waitForTimeout(2600);
await p.screenshot({ path: `${outDir}/perf-projects.png` });
console.log("shot perf-projects");

// Measure frame intervals while scrolling down through the lower sections.
await p.evaluate(() => {
  window.__f = [];
  let last = performance.now();
  const loop = (t) => {
    window.__f.push(t - last);
    last = t;
    window.__raf = requestAnimationFrame(loop);
  };
  window.__raf = requestAnimationFrame(loop);
});
await p.mouse.move(720, 450);
for (let i = 0; i < 36; i++) {
  await p.mouse.wheel(0, 220);
  await p.waitForTimeout(70);
}
const stats = await p.evaluate(() => {
  cancelAnimationFrame(window.__raf);
  const f = window.__f.slice(5); // drop warm-up
  const long = f.filter((x) => x > 32).length;
  const avg = f.reduce((a, b) => a + b, 0) / f.length;
  return {
    frames: f.length,
    avgMs: Math.round(avg * 10) / 10,
    jankPct: Math.round((100 * long) / f.length),
  };
});
console.log("SCROLL", JSON.stringify(stats));

await b.close();
console.log("done");
