import { readFileSync } from "node:fs";
const src = readFileSync("src/components/sections/GalleryTitle/GalleryTitle.tsx", "utf8");
const tokenHits = src.match(/var\(--[a-z0-9-]+\)/g) || [];
const absolutes = src.match(/\babsolute\b/g) || [];
const semanticTags = ["section", "h1", "p", "h2", "h3", "nav", "article", "header", "footer", "aside", "main"];
const semanticHits = semanticTags.filter((tag) => new RegExp(`<${tag}\\b`).test(src));
// 대략 전체 style 속성 수 (fontFamily/fontSize 등 inline style 라인 개수)
const styleProps = (src.match(/\b(fontFamily|fontSize|fontWeight|lineHeight|letterSpacing|color|backgroundColor|padding|margin|gap)\s*:/g) || []).length;
const classArbitrary = (src.match(/\[[\w\-.#]+\]/g) || []).length;
const denom = styleProps + classArbitrary;
const tokenRatio = denom === 0 ? 0 : tokenHits.length / denom;
console.log(JSON.stringify({
  token_ratio: tokenRatio.toFixed(2),
  token_hits: tokenHits.length,
  style_denominator: denom,
  absolute_count: absolutes.length,
  semantic_tags: semanticHits,
  semantic_score: semanticHits.length,
}, null, 2));
