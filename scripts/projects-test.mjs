import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const outDir = "/tmp/shots";
mkdirSync(outDir, { recursive: true });

const b = await chromium.launch();
const p = await b.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
await p.goto("http://localhost:5173/", { waitUntil: "load" });
await p.waitForTimeout(4000);

await p.locator('a[aria-label="Work"]').click({ force: true });
await p.waitForTimeout(2500);
// Give the embedded live sites time to load.
await p.waitForTimeout(6000);
await p.screenshot({ path: `${outDir}/projects-live.png` });
console.log("shot projects-live");

// Scroll down to the QSpace plan tree (just below the live previews).
await p.mouse.move(720, 450);
for (let i = 0; i < 3; i++) {
  await p.mouse.wheel(0, 230);
  await p.waitForTimeout(140);
}
await p.waitForTimeout(1500);
await p.screenshot({ path: `${outDir}/projects-qspace.png` });
console.log("shot projects-qspace");

await b.close();
console.log("done");
