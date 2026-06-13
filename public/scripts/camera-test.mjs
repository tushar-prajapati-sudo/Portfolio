import { chromium } from "playwright";

const browser = await chromium.launch({
  args: [
    "--use-fake-ui-for-media-stream",
    "--use-fake-device-for-media-stream",
  ],
});
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  permissions: ["camera"],
});
const page = await ctx.newPage();
await page.goto("http://localhost:5173/", { waitUntil: "load" });
await page.waitForTimeout(3000);

await page.getByRole("button", { name: "Open camera" }).click({ force: true });
await page.waitForTimeout(2000);

// Is the feed live? (the REC indicator appears only when live)
const live = await page.getByText("rec", { exact: true }).count();
console.log("camera live (rec shown):", live > 0 ? "YES ✓" : "NO ✗");

// Switch a filter.
await page.getByRole("button", { name: "amber", exact: true }).click({ force: true });
await page.waitForTimeout(400);
await page.screenshot({ path: "/tmp/shots/camera.png" });

// Capture -> download (wait for the event the click triggers).
const [download] = await Promise.all([
  page.waitForEvent("download", { timeout: 5000 }).catch(() => null),
  page.getByRole("button", { name: /capture/i }).click({ force: true }),
]);
console.log("capture download:", download ? download.suggestedFilename() : "NONE");

await browser.close();
