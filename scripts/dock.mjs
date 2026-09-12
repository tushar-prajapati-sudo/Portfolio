import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const errs = [];
p.on("pageerror", (e) => errs.push(String(e).slice(0, 140)));
await p.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await p.waitForTimeout(500);
await p.screenshot({ path: "/tmp/shots/dock-0.png" });
for (const [y, name] of [[140, "mid"], [600, "docked"], [2600, "deep"]]) {
  await p.evaluate((v) => window.scrollTo(0, v), y);
  await p.waitForTimeout(450);
  await p.screenshot({ path: `/tmp/shots/dock-${name}.png` });
  const st = await p.evaluate(() => {
    const sh = document.querySelector(".shell");
    return { p: getComputedStyle(sh).getPropertyValue("--p").trim(), docked: sh.dataset.docked };
  });
  console.log(name, "y=" + y, JSON.stringify(st));
}
console.log("errors:", errs.length, errs.slice(0, 2));
await b.close();
