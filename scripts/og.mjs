import { chromium } from "playwright";
import { writeFileSync } from "fs";

// The share card is drawn in the site's own language: graphite field,
// Archivo display, mono readouts with their units split off.
const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..125,400..700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0}
  body{width:1200px;height:630px;background:#12161C;color:#fff;
       font-family:Archivo,system-ui;display:flex;flex-direction:column;
       justify-content:space-between;padding:64px;
       background-image:linear-gradient(to right,#1c222b 1px,transparent 1px),
                        linear-gradient(to bottom,#1c222b 1px,transparent 1px);
       background-size:32px 32px}
  .top{display:flex;align-items:center;gap:14px}
  .dot{width:9px;height:9px;border-radius:50%;background:#5FCF96}
  .kicker{font-family:"JetBrains Mono",monospace;font-size:15px;letter-spacing:.18em;
          text-transform:uppercase;color:#5FCF96}
  h1{font-size:104px;line-height:.9;letter-spacing:-.035em;font-weight:700;font-stretch:105%}
  .role{font-family:"JetBrains Mono",monospace;font-size:19px;letter-spacing:.12em;
        text-transform:uppercase;color:#9AA3AF;margin-top:22px}
  .rule{height:1px;background:#2C3441;margin:34px 0 26px}
  .row{display:flex;gap:56px}
  .m .v{font-family:"JetBrains Mono",monospace;font-size:40px;font-weight:500;
        font-variant-numeric:tabular-nums;line-height:1}
  .m .v span{font-size:.5em;color:#9AA3AF;margin-left:.12em}
  .m .l{font-size:14px;color:#9AA3AF;margin-top:8px}
  .foot{display:flex;justify-content:space-between;align-items:flex-end;
        font-family:"JetBrains Mono",monospace;font-size:15px;color:#9AA3AF;letter-spacing:.06em}
</style></head><body>
  <div>
    <div class="top"><span class="dot"></span><span class="kicker">Open to work</span></div>
    <div class="rule" style="margin:26px 0 30px"></div>
    <h1>Tushar<br>Prajapati</h1>
    <p class="role">AI Engineer &amp; Full Stack Developer</p>
  </div>
  <div>
    <div class="rule"></div>
    <div class="row">
      <div class="m"><p class="v">200<span>K+</span></p><p class="l">Users served</p></div>
      <div class="m"><p class="v">130<span>ms</span></p><p class="l">Avg. API response</p></div>
      <div class="m"><p class="v">99.97<span>%</span></p><p class="l">Uptime / 30d</p></div>
      <div class="m"><p class="v">29</p><p class="l">Findings closed</p></div>
    </div>
    <div class="rule" style="margin:26px 0 0"></div>
    <div class="foot" style="margin-top:20px">
      <span>tusharprt5@gmail.com</span><span>github.com/tushar-prajapati-sudo</span>
    </div>
  </div>
</body></html>`;

writeFileSync("/tmp/og.html", html);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await p.goto("file:///tmp/og.html", { waitUntil: "networkidle" });
await p.waitForTimeout(1200);
await p.screenshot({ path: "public/og.png" });
await b.close();
console.log("wrote public/og.png");
