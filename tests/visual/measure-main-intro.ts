/**
 * measure-main-intro.ts — G2/G3/G4 측정.
 * page.evaluate 인자는 순수 JS 함수 (TS 타입 주석 절대 금지).
 *
 * 사용:
 *   npx tsx tests/visual/measure-main-intro.ts
 */
import { chromium } from "playwright";

const URL = "http://127.0.0.1:5173/__preview/main-intro";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1920, height: 1040 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });

  // page.evaluate(): tsx transpile이 helper(__name)를 삽입하므로 함수 대신
  // 문자열 IIFE로 넘긴다. 본문은 순수 JS — TS 주석 금지.
  const measured = await page.evaluate(`(() => {
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const rect = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: +r.x.toFixed(2), y: +r.y.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2) };
    };

    const section = document.querySelector("section[aria-label='ESGPN 소개 인트로']");
    const sectionCS = cs(section);

    const heading = section ? section.querySelector("h2") : null;
    // 첫 번째 <p>가 "ESGPN이란?" heading label
    const headingLabel = section ? section.querySelector("p") : null;
    const headingCS = cs(heading);
    const labelCS = cs(headingLabel);

    // 사업 본문 3행 — 각 행 div (flex items-center gap-3)
    const businessRows = section ? Array.from(section.querySelectorAll("div.flex.items-center.gap-3")) : [];
    const rowMeasure = businessRows.slice(0, 3).map((row) => {
      const title = row.querySelector("p");
      const line = row.querySelector("img");
      const bodyEls = row.querySelectorAll("p");
      const body = bodyEls[bodyEls.length - 1];
      return {
        rowSize: rect(row),
        title: title ? { text: title.textContent, fs: cs(title).fontSize, fw: cs(title).fontWeight, color: cs(title).color, lh: cs(title).lineHeight, ls: cs(title).letterSpacing } : null,
        line: line ? { src: line.src.split("/").pop(), w: line.naturalWidth, h: line.naturalHeight, rect: rect(line) } : null,
        body: body && body !== title ? { fs: cs(body).fontSize, fw: cs(body).fontWeight, color: cs(body).color } : null,
      };
    });

    // pill 3개
    const pills = section
      ? Array.from(section.querySelectorAll("div")).filter((d) => {
          const t = d.textContent || "";
          return /^주요사업 0[123]$/.test(t.trim()) && d.children.length === 0;
        })
      : [];
    const pillMeasure = pills.map((p) => {
      const r = rect(p);
      const s = cs(p);
      return { text: p.textContent, w: r.w, h: r.h, bg: s.backgroundColor, color: s.color, fs: s.fontSize, fw: s.fontWeight, br: s.borderRadius };
    });

    // 4 라벨
    const globeLabels = section
      ? Array.from(section.querySelectorAll("div.absolute.flex.flex-col.items-end"))
      : [];
    const labelMeasure = globeLabels.map((lab) => {
      const titleP = lab.querySelector("p");
      const ts = cs(titleP);
      return {
        title: titleP ? titleP.textContent : null,
        rect: rect(lab),
        titleStyle: titleP ? { fs: ts.fontSize, fw: ts.fontWeight, color: ts.color, ls: ts.letterSpacing } : null,
      };
    });

    // globe
    const globeImg = section ? section.querySelector("img[src*='globe']") : null;
    const globeBox = globeImg ? globeImg.parentElement : null;

    // connectors
    const connectorImgs = section
      ? Array.from(section.querySelectorAll("img")).filter((i) => /connector-vec/.test(i.src))
      : [];
    const connectorMeasure = connectorImgs.map((i) => ({
      src: i.src.split("/").pop(),
      natural: { w: i.naturalWidth, h: i.naturalHeight },
      rect: rect(i),
    }));

    // G3 — 모든 img naturalWidth>0
    const allImgs = Array.from(document.images);
    const g3 = allImgs.map((i) => ({
      src: i.src.split("/").pop(),
      natural: { w: i.naturalWidth, h: i.naturalHeight },
      ok: i.naturalWidth > 0,
    }));

    return {
      section: { rect: rect(section), bg: sectionCS ? sectionCS.backgroundColor : null },
      heading: heading
        ? { text: heading.textContent, fs: headingCS.fontSize, fw: headingCS.fontWeight, lh: headingCS.lineHeight, color: headingCS.color, ls: headingCS.letterSpacing }
        : null,
      headingLabel: headingLabel
        ? { text: headingLabel.textContent, fs: labelCS.fontSize, color: labelCS.color }
        : null,
      businessRows: rowMeasure,
      pills: pillMeasure,
      globeLabels: labelMeasure,
      globe: globeImg
        ? {
            natural: { w: globeImg.naturalWidth, h: globeImg.naturalHeight },
            box: rect(globeBox),
          }
        : null,
      connectors: connectorMeasure,
      g3: { total: g3.length, passing: g3.filter((i) => i.ok).length, details: g3 },
    };
  })()`);

  console.log(JSON.stringify(measured, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
