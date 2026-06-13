import { chromium } from "playwright";
const b = await chromium.launch();
// Switcher open (desktop)
const c1 = await b.newContext({ viewport:{width:1440,height:900}});
const p1 = await c1.newPage();
await p1.goto("http://localhost:5173/",{waitUntil:"load"});
await p1.waitForTimeout(2500);
await p1.getByRole("button",{name:/^BG:/i}).click({force:true}).catch(()=>{});
await p1.waitForTimeout(500);
await p1.screenshot({path:"/tmp/shots/switcher.png"});
const opts = await p1.locator("nav, div").evaluate(()=>0).catch(()=>0);
await c1.close();
// tablet + mobile default
for (const [w,h,name] of [[768,1024,"tablet"],[375,812,"mobile"]]) {
  const c = await b.newContext({ viewport:{width:w,height:h}});
  const p = await c.newPage();
  await p.goto("http://localhost:5173/",{waitUntil:"load"});
  await p.waitForTimeout(2800);
  await p.screenshot({path:`/tmp/shots/fc_${name}.png`});
  await c.close();
  console.log("shot",name);
}
await b.close();
console.log("done");
