import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
// Force fine-pointer so the custom cursor/spotlight engages in headless.
await ctx.addInitScript(() => {
  const orig = window.matchMedia.bind(window);
  window.matchMedia = (q) =>
    q.includes("pointer: fine")
      ? {
          matches: true,
          media: q,
          onchange: null,
          addEventListener() {},
          removeEventListener() {},
          addListener() {},
          removeListener() {},
          dispatchEvent() {
            return false;
          },
        }
      : orig(q);
});
const page = await ctx.newPage();
await page.goto("http://localhost:5173/", { waitUntil: "load" });
await page.waitForTimeout(3000);

const readSpot = () =>
  page.evaluate(() => {
    const el = document.querySelector(".mix-blend-screen");
    return el ? { filter: el.style.filter, transform: el.style.transform } : null;
  });

// Empty area (default).
await page.mouse.move(250, 300, { steps: 4 });
await page.waitForTimeout(900);
console.log("DEFAULT (empty):", JSON.stringify(await readSpot()));

// Over the "See the work" CTA (focused).
const btn = page.getByRole("link", { name: /see the work/i });
await btn.hover({ force: true });
await page.waitForTimeout(900);
console.log("FOCUSED (over CTA):", JSON.stringify(await readSpot()));

await browser.close();
