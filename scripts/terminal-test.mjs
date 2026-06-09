import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:5173/", { waitUntil: "load" });
await page.waitForTimeout(3000);

await page.getByRole("button", { name: "Open terminal" }).click({ force: true });
await page.waitForTimeout(600);

const input = page.locator("input").first();
await input.click();

async function cmd(text) {
  await input.fill(text);
  await input.press("Enter");
  await page.waitForTimeout(300);
}

await cmd("help");
await cmd("ls");
await cmd("cd skills");
await cmd("ls");
await cmd("boguscmd");

// Screenshot just the terminal window element (avoids page-scroll artifacts).
const win = page.locator("text=tushar@cybercafe").locator("xpath=ancestor::div[1]/..");
await page.screenshot({ path: "/tmp/shots/terminal.png" });

// Dump the terminal text to confirm output rendered.
const text = await page.locator("input").first().evaluate((el) => {
  const root = el.closest("div.relative");
  return root ? root.innerText : "(not found)";
});
console.log("──── terminal output ────");
console.log(text.slice(0, 700));

let downloaded = null;
page.on("download", (d) => (downloaded = d.suggestedFilename()));
await cmd("resume.pdf");
await page.waitForTimeout(700);
console.log("──── resume download:", downloaded ?? "NONE");

await browser.close();
