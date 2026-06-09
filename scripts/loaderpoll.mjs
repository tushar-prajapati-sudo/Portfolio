import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900}});
const p = await ctx.newPage();
await p.goto("http://localhost:5173/", { waitUntil: "commit" });
const seen = [];
for (let t=0; t<2600; t+=130){
  const n = await p.locator('text=booting cybercafe').count().catch(()=>0);
  seen.push(`${t}ms:${n}`);
  if (t===520) await p.screenshot({ path:"/tmp/shots/loader_520.png" });
  await p.waitForTimeout(130);
}
console.log(seen.join("  "));
await b.close();
