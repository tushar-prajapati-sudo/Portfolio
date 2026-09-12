import { chromium } from "playwright";
const b = await chromium.launch();

// /v1 must still boot the original build
const p1 = await b.newPage({ viewport: { width: 1280, height: 800 } });
const errs = [];
p1.on("pageerror", (e) => errs.push(String(e).slice(0, 120)));
await p1.goto("http://localhost:4173/v1/", { waitUntil: "domcontentloaded" });
await p1.waitForTimeout(6000);
const v1 = await p1.evaluate(() => ({
  root: document.getElementById("root")?.children.length ?? 0,
  title: document.title,
  canvas: document.querySelectorAll("canvas").length,
  text: (document.body.innerText || "").slice(0, 60).replace(/\n/g, " "),
}));
console.log("/v1 :", JSON.stringify(v1), "errors:", errs.length, errs.slice(0, 2));
await p1.screenshot({ path: "/tmp/shots/v1.png" });
await p1.close();

// main page: keyboard, landmarks, alt text, contrast-relevant structure
const p2 = await b.newPage({ viewport: { width: 1280, height: 800 } });
await p2.goto("http://localhost:4173/", { waitUntil: "networkidle" });
const a11y = await p2.evaluate(() => {
  const q = (s) => Array.from(document.querySelectorAll(s));
  const h = q("h1,h2,h3,h4").map((e) => +e.tagName[1]);
  let bad = [];
  for (let i = 1; i < h.length; i++) if (h[i] - h[i - 1] > 1) bad.push(`${h[i-1]}->${h[i]}`);
  return {
    h1: q("h1").length,
    headingJumps: bad,
    imgsNoAlt: q("img:not([alt])").length,
    linksNoText: q("a").filter((a) => !a.textContent.trim() && !a.getAttribute("aria-label")).length,
    landmarks: { main: q("main").length, header: q("header").length },
    focusable: q("a[href],button,input").length,
    langSet: document.documentElement.lang || "(none)",
  };
});
console.log("a11y:", JSON.stringify(a11y));

// tab order sanity
await p2.keyboard.press("Tab");
const first = await p2.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 30));
console.log("first tab stop:", JSON.stringify(first));
await b.close();
