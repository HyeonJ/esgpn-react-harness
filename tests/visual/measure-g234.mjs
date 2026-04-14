import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1280 } });
await page.goto('http://127.0.0.1:5173/__preview/gallery-agreements', { waitUntil: 'networkidle' });

const result = await page.evaluate(() => {
  const out = {};
  // section root
  const section = document.querySelector('section');
  if (section) {
    const cs = getComputedStyle(section);
    out.section = { width: cs.width, paddingBottom: cs.paddingBottom, gap: cs.gap };
  }
  // 헤딩 텍스트
  const h = document.querySelector('section p');
  if (h) {
    const cs = getComputedStyle(h);
    out.heading = { fontSize: cs.fontSize, fontWeight: cs.fontWeight, color: cs.color };
  }
  // 카드 title (두번째 p — flex inside MouCard)
  const ps = document.querySelectorAll('section p');
  out.totalP = ps.length;
  if (ps[1]) {
    const cs = getComputedStyle(ps[1]);
    out.title = { fontSize: cs.fontSize, fontWeight: cs.fontWeight, color: cs.color, lineHeight: cs.lineHeight };
  }
  if (ps[2]) {
    const cs = getComputedStyle(ps[2]);
    out.desc = { fontSize: cs.fontSize, fontWeight: cs.fontWeight, color: cs.color, lineHeight: cs.lineHeight, letterSpacing: cs.letterSpacing };
  }
  // 이미지 4개
  const imgs = document.querySelectorAll('section img');
  out.imgs = Array.from(imgs).map(i => ({ src: i.src.split('/').pop(), nW: i.naturalWidth, nH: i.naturalHeight, complete: i.complete }));
  // card 폭/높이
  const cards = document.querySelectorAll('section [class*="w-[456px]"]');
  out.cardCount = cards.length;
  if (cards[0]) {
    const cs = getComputedStyle(cards[0]);
    out.card = { width: cs.width };
    const imgWrap = cards[0].querySelector('div');
    if (imgWrap) out.imgWrap = getComputedStyle(imgWrap).height;
  }
  return out;
});

console.log(JSON.stringify(result, null, 2));
await browser.close();
