#!/usr/bin/env node
/**
 * 구조 품질 전수 측정 (1막 회고용).
 *
 * "편집 가능한 고충실도"를 얼마나 달성했는지 구조 기준으로 점수화한다.
 * 기존 G5~G8 스크립트(check-text-ratio 등)와 다른 점:
 *   - 섹션 1개가 아니라 "전 섹션 일괄" 리포트
 *   - CSV 출력으로 회고·상관분석 가능
 *   - G1(시각 diff)는 수집하지 않는다 — 이 스크립트는 구조 품질만 본다
 *
 * 측정 항목 (섹션별):
 *   1. text_raster_flag        — text-bearing raster 안티패턴 여부 (0/1)
 *   2. magic_number_count      — Tailwind arbitrary value 개수 (px-[23px], top-[173px] 등)
 *   3. token_ref_count         — design token 참조 개수 (brand-*, var(--*))
 *   4. token_ratio             — token_ref / (token_ref + magic_number)
 *   5. absolute_count          — "absolute" 클래스 사용 개수
 *   6. semantic_score          — 시맨틱 태그 사용 점수 (0~5)
 *   7. alt_over_80_count       — alt 길이 80자+ 개수 (텍스트 alt 박제 안티패턴)
 *   8. literal_korean_count    — JSX 내 한글 리터럴 개수 (i18n 가능성 역지표)
 *   9. img_count               — <img> 태그 개수
 *
 * Usage:
 *   node scripts/check-structure-quality.mjs
 *   node scripts/check-structure-quality.mjs --out=docs/redefine/structure-report.csv
 *   node scripts/check-structure-quality.mjs --section=MainHero       # 특정 섹션만
 */

import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { join, extname, dirname, basename } from "node:path";
import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";

const traverse = traverseModule.default ?? traverseModule;

const SECTIONS_DIR = "src/components/sections";
const DEFAULT_OUT = "docs/redefine/structure-report.csv";

const SEMANTIC_TAGS = new Set(["section", "header", "footer", "nav", "main", "article", "aside", "h1", "h2", "h3", "h4", "h5", "h6", "button", "figure"]);
const TOKEN_PREFIXES = ["brand-", "gray-", "var(--"];
const MAGIC_NUMBER_RE = /\b(?:px|py|pt|pb|pl|pr|p|mx|my|mt|mb|ml|mr|m|w|h|top|bottom|left|right|gap|rounded|text|leading|tracking)-\[[^\]]+\]/g;
const ABSOLUTE_RE = /\babsolute\b/g;
const KOREAN_RE = /[\uAC00-\uD7AF]+/g;

function parseArgs(argv) {
  const args = { out: DEFAULT_OUT, section: null };
  for (const a of argv.slice(2)) {
    if (a.startsWith("--out=")) args.out = a.slice(6);
    else if (a.startsWith("--section=")) args.section = a.slice(10);
  }
  return args;
}

function walkTsx(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walkTsx(full, out);
    else if (extname(full) === ".tsx" || extname(full) === ".jsx") out.push(full);
  }
  return out;
}

function analyzeSection(sectionDir) {
  const files = walkTsx(sectionDir);
  const metrics = {
    section: basename(sectionDir),
    files: files.length,
    text_raster_flag: 0,
    magic_number_count: 0,
    token_ref_count: 0,
    absolute_count: 0,
    semantic_tags: new Set(),
    alt_over_80_count: 0,
    literal_korean_count: 0,
    img_count: 0,
    jsx_text_chars: 0,
    total_alt_chars: 0,
  };

  for (const file of files) {
    const code = readFileSync(file, "utf8");

    // 텍스트 매칭 기반 지표
    metrics.magic_number_count += (code.match(MAGIC_NUMBER_RE) || []).length;
    metrics.absolute_count += (code.match(ABSOLUTE_RE) || []).length;
    for (const prefix of TOKEN_PREFIXES) {
      const re = new RegExp(prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
      metrics.token_ref_count += (code.match(re) || []).length;
    }

    // AST 기반 지표
    let ast;
    try {
      ast = parse(code, {
        sourceType: "module",
        plugins: ["typescript", "jsx"],
      });
    } catch {
      continue;
    }

    traverse(ast, {
      JSXOpeningElement(path) {
        const name = path.node.name;
        const tagName = name.type === "JSXIdentifier" ? name.name : null;
        if (!tagName) return;
        if (tagName === "img") metrics.img_count += 1;
        if (SEMANTIC_TAGS.has(tagName)) metrics.semantic_tags.add(tagName);

        for (const attr of path.node.attributes) {
          if (attr.type !== "JSXAttribute") continue;
          if (attr.name.name !== "alt" && attr.name.name !== "aria-label") continue;
          let value = "";
          if (attr.value?.type === "StringLiteral") value = attr.value.value;
          else if (attr.value?.type === "JSXExpressionContainer" && attr.value.expression.type === "StringLiteral") value = attr.value.expression.value;
          metrics.total_alt_chars += value.length;
          if (value.length >= 80) metrics.alt_over_80_count += 1;
        }
      },
      JSXText(path) {
        const text = path.node.value.trim();
        if (text.length === 0) return;
        metrics.jsx_text_chars += text.length;
        metrics.literal_korean_count += (text.match(KOREAN_RE) || []).length;
      },
    });
  }

  // text-bearing raster 휴리스틱: img ≥ 1 이고 alt 총합 ≥ 80 인데 jsx_text < alt의 절반
  // (즉, 눈에 보이는 텍스트를 alt에 밀어넣은 의심)
  if (metrics.img_count >= 1 && metrics.total_alt_chars >= 80 && metrics.jsx_text_chars < metrics.total_alt_chars / 2) {
    metrics.text_raster_flag = 1;
  }

  // 파생 지표
  metrics.token_ratio = metrics.token_ref_count + metrics.magic_number_count === 0
    ? 1
    : +(metrics.token_ref_count / (metrics.token_ref_count + metrics.magic_number_count)).toFixed(3);
  metrics.semantic_score = metrics.semantic_tags.size;
  metrics.semantic_tags_list = [...metrics.semantic_tags].join("|");

  return metrics;
}

function toCsv(rows) {
  const cols = [
    "section", "files",
    "text_raster_flag", "img_count",
    "magic_number_count", "token_ref_count", "token_ratio",
    "absolute_count",
    "semantic_score", "semantic_tags_list",
    "alt_over_80_count", "literal_korean_count",
    "jsx_text_chars", "total_alt_chars",
  ];
  const header = cols.join(",");
  const lines = rows.map((r) => cols.map((c) => {
    const v = r[c] ?? "";
    const s = String(v);
    return s.includes(",") || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
  }).join(","));
  return [header, ...lines].join("\n") + "\n";
}

function summarize(rows) {
  const n = rows.length;
  const sum = (k) => rows.reduce((a, r) => a + (r[k] || 0), 0);
  const avg = (k) => (sum(k) / n).toFixed(2);
  const count = (pred) => rows.filter(pred).length;

  return {
    total_sections: n,
    text_raster_sections: count((r) => r.text_raster_flag === 1),
    avg_magic_numbers: avg("magic_number_count"),
    avg_token_ratio: avg("token_ratio"),
    avg_absolute: avg("absolute_count"),
    avg_semantic_score: avg("semantic_score"),
    sections_with_alt_over_80: count((r) => r.alt_over_80_count > 0),
    sections_with_zero_literal_korean: count((r) => r.literal_korean_count === 0 && r.jsx_text_chars > 0),
  };
}

function main() {
  const args = parseArgs(process.argv);

  let sectionDirs = readdirSync(SECTIONS_DIR)
    .map((name) => join(SECTIONS_DIR, name))
    .filter((p) => statSync(p).isDirectory());

  if (args.section) {
    sectionDirs = sectionDirs.filter((p) => basename(p) === args.section);
    if (sectionDirs.length === 0) {
      console.error(`섹션을 찾을 수 없음: ${args.section}`);
      process.exit(1);
    }
  }

  const rows = sectionDirs.map(analyzeSection).sort((a, b) => a.section.localeCompare(b.section));

  // 콘솔 테이블 (핵심 지표만)
  console.table(rows.map((r) => ({
    section: r.section,
    raster: r.text_raster_flag ? "⚠" : "",
    magic: r.magic_number_count,
    token: r.token_ref_count,
    ratio: r.token_ratio,
    abs: r.absolute_count,
    sem: r.semantic_score,
    alt80: r.alt_over_80_count,
  })));

  // 요약
  const summary = summarize(rows);
  console.log("\n=== Summary ===");
  console.log(summary);

  // CSV 출력
  mkdirSync(dirname(args.out), { recursive: true });
  writeFileSync(args.out, toCsv(rows), "utf8");
  console.log(`\nCSV 저장: ${args.out}`);
}

main();
