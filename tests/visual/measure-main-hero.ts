/**
 * measure-main-hero.ts — G2/G3/G4 측정.
 * 카드가 <img> 1장으로 바뀐 회차 5 이후용.
 *
 * 사용:
 *   npx tsx tests/visual/measure-main-hero.ts
 */
import { chromium } from "playwright";

const URL = "http://127.0.0.1:5173/__preview/main-hero";

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1040 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });

  const measured = await page.evaluate(`(() => {
    const pick = (sel: string) => document.querySelector(sel) as HTMLElement | null;

    const section = pick("section[aria-label='ESGPN 소개 히어로']");
    const h1 = section?.querySelector("h1") as HTMLElement | null;
    const catchphrase = section?.querySelector("p.font-\\[\\'Pretendard_Variable\\'\\]") as HTMLElement | null;
    const cards = Array.from(section?.querySelectorAll("img[alt^='ESG'], img[alt^='사회']") ?? []) as HTMLImageElement[];
    const ctaButtons = Array.from(section?.querySelectorAll("button, a") ?? []) as HTMLElement[];
    const imgs = Array.from(document.images) as HTMLImageElement[];

    const cs = (el: Element | null) => (el ? getComputedStyle(el) : null);

    const sectionCS = cs(section);
    const h1CS = cs(h1);
    const catchCS = cs(catchphrase);

    // card wrappers = direct parent of card img
    const cardRows = cards.map((img) => {
      const parent = img.parentElement as HTMLElement;
      const wrap = parent.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();
      const pcs = getComputedStyle(parent);
      return {
        alt: img.alt.slice(0, 20),
        wrapper: { w: Math.round(wrap.width), h: Math.round(wrap.height) },
        imgRendered: { w: Math.round(imgRect.width), h: Math.round(imgRect.height) },
        natural: { w: img.naturalWidth, h: img.naturalHeight },
        parentDisplay: pcs.display,
      };
    });

    // CTA measurements
    const ctas = ctaButtons.map((el) => {
      const r = el.getBoundingClientRect();
      const c = getComputedStyle(el);
      return {
        tag: el.tagName.toLowerCase(),
        text: el.textContent?.trim().slice(0, 40) ?? "",
        size: { w: Math.round(r.width), h: Math.round(r.height) },
        padding: c.padding,
        borderRadius: c.borderRadius,
        bg: c.backgroundColor,
        color: c.color,
      };
    });

    const g3 = imgs.map((i) => ({ src: i.src.split("/").pop(), natural: { w: i.naturalWidth, h: i.naturalHeight }, ok: i.naturalWidth > 0 }));

    return {
      section: {
        size: section ? { w: Math.round(section.getBoundingClientRect().width), h: Math.round(section.getBoundingClientRect().height) } : null,
        bg: sectionCS?.backgroundColor,
      },
      h1: {
        fontFamily: h1CS?.fontFamily,
        fontSize: h1CS?.fontSize,
        lineHeight: h1CS?.lineHeight,
        color: h1CS?.color,
      },
      catchphrase: {
        fontSize: catchCS?.fontSize,
        fontWeight: catchCS?.fontWeight,
        lineHeight: catchCS?.lineHeight,
        letterSpacing: catchCS?.letterSpacing,
        color: catchCS?.color,
      },
      cards: cardRows,
      ctas,
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
