import { chromium } from "playwright";
const modes = ["stars","rings","wave","plasma","comets","prism","lines","paper","paths","boxes"];
const b = await chromium.launch();
for (const m of modes) {
  const ctx = await b.newContext({ viewport:{width:1440,height:900}});
  await ctx.addInitScript((mm)=>localStorage.setItem("bg",mm), m);
  const p = await ctx.newPage();
  const warns=[];
  p.on("console", c=>{ const t=c.text(); if(/ShaderCanvas|shader|WebGL|GL_|ERROR/i.test(t)) warns.push(t.slice(0,90)); });
  await p.goto("http://localhost:5173/", { waitUntil:"load" });
  await p.waitForTimeout(2500);
  await p.screenshot({ path:`/tmp/shots/v_${m}.png` });
  console.log(m.padEnd(8), warns.length? "WARN: "+warns[0] : "ok");
  await ctx.close();
}
await b.close();
