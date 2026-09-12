import { chromium } from "playwright";
const b = await chromium.launch();
const widths = [320, 375, 480, 640, 768, 900, 1024, 1180, 1280, 1440, 1920];
for (const w of widths) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto("http://localhost:4173/", { waitUntil: "networkidle" });
  await p.waitForTimeout(250);
  const r = await p.evaluate(() => {
    const de = document.documentElement;
    const over = [];
    // anything sticking out past the viewport
    for (const el of document.querySelectorAll("body *")) {
      const b = el.getBoundingClientRect();
      if (b.width && (b.right > window.innerWidth + 1 || b.left < -1)) {
        over.push(`${el.tagName}.${(el.className || "").toString().split(" ")[0]}@${Math.round(b.left)}..${Math.round(b.right)}`);
      }
    }
    // node cards that clip their own text
    const clipped = Array.from(document.querySelectorAll(".topo-node"))
      .filter((e) => e.scrollHeight > e.clientHeight + 1)
      .map((e) => e.querySelector(".topo-name")?.textContent);
    return {
      hOver: de.scrollWidth > window.innerWidth,
      sw: de.scrollWidth,
      overflow: [...new Set(over)].slice(0, 4),
      clipped,
    };
  });
  console.log(
    `${String(w).padStart(4)}px  hOverflow=${r.hOver ? "YES " + r.sw : "no "}  clippedNodes=${r.clipped.length ? JSON.stringify(r.clipped) : "none"}  ${r.overflow.length ? "OUT:" + r.overflow.join(",") : ""}`
  );
  await p.close();
}
await b.close();
