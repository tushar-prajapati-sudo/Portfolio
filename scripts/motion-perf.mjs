import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await p.waitForTimeout(600);

// Record frame intervals while scrolling through the whole dock range.
const res = await p.evaluate(async () => {
  const frames = [];
  let last = performance.now();
  let stop = false;
  const tick = (t) => { frames.push(t - last); last = t; if (!stop) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
  for (let y = 0; y <= 340; y += 4) {
    window.scrollTo(0, y);
    await new Promise((r) => requestAnimationFrame(r));
  }
  stop = true;
  await new Promise((r) => setTimeout(r, 60));
  const f = frames.slice(3);
  f.sort((a, c) => a - c);
  return {
    frames: f.length,
    median: +f[Math.floor(f.length / 2)].toFixed(1),
    p95: +f[Math.floor(f.length * 0.95)].toFixed(1),
    worst: +f[f.length - 1].toFixed(1),
    over20ms: f.filter((x) => x > 20).length,
  };
});
console.log("scroll frame intervals (ms):", JSON.stringify(res));
await b.close();
