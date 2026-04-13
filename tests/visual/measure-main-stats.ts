/**
 * measure-main-stats.ts — G2/G3/G4 측정.
 * page.evaluate 인자는 순수 JS (TS 타입 주석 금지).
 *
 * 사용:
 *   npx tsx tests/visual/measure-main-stats.ts
 */
import { chromium } from "playwright";

const URL = "http://127.0.0.1:5173/__preview/main-stats";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1920, height: 1040 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });

  const measured = await page.evaluate(`(() => {
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const rect = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: +r.x.toFixed(2), y: +r.y.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2) };
    };
    const txtStyle = (el) => {
      if (!el) return null;
      const s = cs(el);
      return { fs: s.fontSize, fw: s.fontWeight, lh: s.lineHeight, ls: s.letterSpacing, color: s.color };
    };

    const section = document.querySelector("section[aria-label='ESG 중요성 스탯']");
    const sectionCS = cs(section);

    const heading = section ? section.querySelector("h2") : null;
    const labelP = section ? section.querySelector("p") : null; // 첫 p = "ESG가 왜 중요할까?"

    // stat 4개
    const statContainers = section ? Array.from(section.querySelectorAll("div.flex.items-center")).filter((d) => {
      // gap 32 items-center flex — stat 그룹 찾기
      const s = cs(d);
      return s.gap === "32px" && d.children.length === 4;
    }) : [];
    const statGroup = statContainers[0] || null;
    const stats = statGroup ? Array.from(statGroup.children).map((item) => {
      const numP = item.querySelector("p");
      const allP = item.querySelectorAll("p");
      const capP = allP[allP.length - 1];
      const numSpans = numP ? numP.querySelectorAll("span") : [];
      return {
        rect: rect(item),
        numberStyle: numSpans.length >= 1 ? txtStyle(numSpans[0]) : txtStyle(numP),
        unitStyle: numSpans.length >= 2 ? txtStyle(numSpans[1]) : null,
        caption: capP ? { text: capP.textContent, ...txtStyle(capP) } : null,
      };
    }) : [];

    // ESG 원 3개 — rounded-full div 200×200
    const esgCircles = section ? Array.from(section.querySelectorAll("div.rounded-full")).filter((d) => {
      const r = d.getBoundingClientRect();
      return Math.abs(r.width - 200) < 1;
    }) : [];
    const circleMeasure = esgCircles.map((c) => {
      const s = cs(c);
      const titleP = c.querySelector("p");
      return {
        rect: rect(c),
        bg: s.backgroundColor,
        title: titleP ? { text: titleP.textContent, ...txtStyle(titleP) } : null,
      };
    });

    // WHY? pill
    const whyPill = section ? Array.from(section.querySelectorAll("div.rounded-full")).find((d) => {
      const p = d.querySelector("p");
      return p && p.textContent === "WHY?";
    }) : null;
    const whyMeasure = whyPill ? {
      rect: rect(whyPill),
      bg: cs(whyPill).backgroundColor,
      textStyle: txtStyle(whyPill.querySelector("p")),
      textColor: cs(whyPill.querySelector("p")).color,
    } : null;

    // 설명 3컬럼 — flex gap 16 items-start with width 678
    const descRoot = section ? Array.from(section.querySelectorAll("div.flex.items-start")).find((d) => {
      const r = d.getBoundingClientRect();
      return Math.abs(r.width - 678) < 1;
    }) : null;
    const descriptions = descRoot ? Array.from(descRoot.children).map((col) => {
      const ps = col.querySelectorAll("p");
      return {
        rect: rect(col),
        title: ps[0] ? { text: ps[0].textContent, ...txtStyle(ps[0]) } : null,
        body: ps[1] ? { ...txtStyle(ps[1]), textPreview: ps[1].textContent.slice(0, 30) } : null,
      };
    }) : [];

    // connector SVG paths
    const svg = section ? section.querySelector("svg") : null;
    const paths = svg ? Array.from(svg.querySelectorAll("path[data-node-id]")).map((p) => ({
      nodeId: p.getAttribute("data-node-id"),
      d: p.getAttribute("d"),
      stroke: p.getAttribute("stroke"),
      strokeComputed: cs(p).stroke,
      markerEnd: p.getAttribute("marker-end"),
    })) : [];

    // G3 — 모든 img naturalWidth > 0 (img 0개 예상 — vacuous PASS)
    const allImgs = Array.from(document.images);
    const g3 = {
      total: allImgs.length,
      passing: allImgs.filter((i) => i.naturalWidth > 0).length,
      details: allImgs.map((i) => ({ src: i.src.split("/").pop(), nw: i.naturalWidth })),
      svgPathCount: paths.length,
    };

    // 인디케이터 점 2개
    const indicators = section ? Array.from(section.querySelectorAll("div.rounded-full")).filter((d) => {
      const r = d.getBoundingClientRect();
      return (Math.abs(r.width - 16) < 1 || Math.abs(r.width - 6) < 1);
    }) : [];

    return {
      section: { rect: rect(section), bg: sectionCS ? sectionCS.backgroundColor : null },
      heading: heading ? { text: heading.textContent, ...txtStyle(heading) } : null,
      labelP: labelP ? { text: labelP.textContent, ...txtStyle(labelP) } : null,
      stats,
      esgCircles: circleMeasure,
      whyPill: whyMeasure,
      descriptions,
      connectors: paths,
      indicators: indicators.map((i) => ({ rect: rect(i), bg: cs(i).backgroundColor, border: cs(i).borderColor })),
      g3,
    };
  })()`);

  console.log(JSON.stringify(measured, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
