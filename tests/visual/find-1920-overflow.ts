import { chromium } from "playwright";
(async () => {
  const b = await chromium.launch();
  // 실제 Chrome에선 세로스크롤바가 17px 먹어 usable=1903. 이 시나리오 재현.
  const p = await b.newPage({ viewport: { width: 1903, height: 1080 } });
  await p.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  const d = await p.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    cw: document.documentElement.clientWidth,
    bsw: document.body.scrollWidth,
  }));
  console.log("viewport 1903 (scrollbar-aware), doc:", JSON.stringify(d));
  const wide = await p.evaluate(() => {
    const VW = document.documentElement.clientWidth;
    const out: Array<{ tag: string; cls: string; w: number; right: number }> = [];
    for (const el of Array.from(document.querySelectorAll("*"))) {
      const r = el.getBoundingClientRect();
      if (r.right > VW + 0.5 || r.width > VW + 0.5) {
        out.push({
          tag: el.tagName,
          cls: String((el as HTMLElement).className).slice(0, 80),
          w: Math.round(r.width),
          right: Math.round(r.right),
        });
      }
    }
    return out.slice(0, 15);
  });
  for (const w of wide) console.log(`${w.tag} w=${w.w} right=${w.right} .${w.cls}`);
  await b.close();
})();
