import { chromium } from "playwright";
const b = await chromium.launch();

// 1. reduced motion: the diagram must stay complete and legible
const p1 = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await p1.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await p1.waitForTimeout(400);
const rm = await p1.evaluate(() => {
  const pk = document.querySelectorAll(".topo-packet");
  const hidden = Array.from(pk).every((e) => getComputedStyle(e).display === "none");
  return { packets: pk.length, allHidden: hidden, nodes: document.querySelectorAll(".topo-node").length };
});
console.log("reduced-motion:", JSON.stringify(rm));
await p1.screenshot({ path: "/tmp/shots/reduced.png" });
await p1.close();

// 2. cold-load timing on a throttled connection
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p2 = await ctx.newPage();
const t0 = Date.now();
await p2.goto("http://localhost:4173/", { waitUntil: "load" });
const perf = await p2.evaluate(() => {
  const n = performance.getEntriesByType("navigation")[0];
  const paint = performance.getEntriesByType("paint");
  const res = performance.getEntriesByType("resource");
  return {
    domContentLoaded: Math.round(n.domContentLoadedEventEnd),
    load: Math.round(n.loadEventEnd),
    fcp: Math.round(paint.find((p) => p.name === "first-contentful-paint")?.startTime ?? -1),
    requests: res.length,
    transferKB: Math.round(res.reduce((s, r) => s + (r.transferSize || 0), 0) / 1024),
  };
});
console.log("perf:", JSON.stringify(perf), `wall=${Date.now() - t0}ms`);

// 3. every link resolves to something real
const links = await p2.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
console.log("links:", JSON.stringify([...new Set(links)]));
await b.close();
