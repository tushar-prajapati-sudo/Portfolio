import { chromium } from "playwright";

/** Wheel must move the page from anywhere it isn't deliberately captured. */
const b = await chromium.launch();
const cases = [
  [20, 400, "far left gutter"],
  [70, 400, "left panel edge"],
  [300, 400, "left panel centre"],
  [560, 400, "panel / stream seam"],
  [1100, 400, "right stream"],
  [1400, 400, "right edge"],
];

for (const [x, y, label] of cases) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("http://localhost:4173/", { waitUntil: "networkidle" });
  await p.waitForTimeout(350);
  await p.mouse.move(x, y);
  await p.mouse.wheel(0, 600);
  await p.waitForTimeout(450);
  const sy = await p.evaluate(() => Math.round(window.scrollY));
  console.log(`${label.padEnd(22)} (${String(x).padStart(4)},${y}) -> scrollY ${String(sy).padStart(4)} ${sy > 100 ? "ok" : "STUCK"}`);
  await p.close();
}

// With a record open the panel should scroll itself, then hand back to the page.
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await p.evaluate(() => document.querySelector("#systems")?.scrollIntoView({ block: "start" }));
await p.waitForTimeout(500);
await p.click(".row");
await p.waitForTimeout(500);
const before = await p.evaluate(() => {
  const h = document.querySelector(".home");
  return { panelTop: h.scrollTop, overflows: h.scrollHeight > h.clientHeight, page: Math.round(window.scrollY) };
});
await p.mouse.move(300, 500);
await p.mouse.wheel(0, 500);
await p.waitForTimeout(450);
const after = await p.evaluate(() => ({
  panelTop: Math.round(document.querySelector(".home").scrollTop),
  page: Math.round(window.scrollY),
}));
console.log("record open — panel overflows:", before.overflows);
console.log("  panel scrollTop", before.panelTop, "->", after.panelTop, "| page", before.page, "->", after.page);
await b.close();
