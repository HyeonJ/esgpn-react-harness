import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 375, height: 1400 } });
await p.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
await p.waitForTimeout(400);
await p.screenshot({ path: "docs/v3-refactor-screenshots/hero-375-viewport.png", fullPage: false });
await b.close();
