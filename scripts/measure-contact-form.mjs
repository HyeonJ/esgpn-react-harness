import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1200 } });
await p.goto("http://127.0.0.1:5173/__preview/contact-form", { waitUntil: "networkidle" });

const data = await p.evaluate(() => {
  const get = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      rect: { w: Math.round(r.width * 100) / 100, h: Math.round(r.height * 100) / 100 },
      font: {
        size: cs.fontSize,
        lh: cs.lineHeight,
        ls: cs.letterSpacing,
        weight: cs.fontWeight,
        align: cs.textAlign,
      },
      color: cs.color,
      bg: cs.backgroundColor,
      border: cs.border,
      radius: cs.borderRadius,
      padding: cs.padding,
    };
  };
  const imgs = Array.from(document.querySelectorAll("img")).map((i) => ({
    src: (i.getAttribute("src") || "").slice(0, 60),
    nw: i.naturalWidth,
    nh: i.naturalHeight,
  }));
  const wrapperOfName = (() => {
    const el = document.querySelector("#contact-name")?.parentElement;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      rect: { w: Math.round(r.width), h: Math.round(r.height) },
      bg: cs.backgroundColor,
      borderColor: cs.borderColor,
      borderWidth: cs.borderWidth,
      radius: cs.borderRadius,
      padding: cs.padding,
    };
  })();
  return {
    section: get("section"),
    h1: get("h1"),
    p: get("section p"),
    label_name: get('label[for="contact-name"]'),
    input_name: get("#contact-name"),
    wrapper_name: wrapperOfName,
    textarea: get("#contact-message"),
    placeholderImg: get('section [aria-hidden="true"][class*="rounded-[32px]"]'),
    button: get('button[type="submit"]'),
    imgs,
    imgCount: imgs.length,
    imgAllOk: imgs.every((i) => i.nw > 0),
  };
});

console.log(JSON.stringify(data, null, 2));
await b.close();
