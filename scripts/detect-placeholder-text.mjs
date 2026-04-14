#!/usr/bin/env node
/**
 * detect-placeholder-text.mjs — get_design_context 결과에서 영문 placeholder 문자열 감지.
 *
 * 자율 모드에서 news-title에서 발견: Figma 원본이 "Amazon bets $233M on India..."
 * 같은 영문 Lorem 대용 텍스트인데 한국 페이지라 무의미 → 사전 추정 카피로 대체 필요.
 *
 * 감지 시그널:
 *   - 영문 문자 70% 이상 + 한글 거의 없음 (한국어 웹사이트 컨텍스트)
 *   - 유명 placeholder pattern ("Lorem ipsum", "Amazon bets", "amazon Is fast tracking")
 *
 * 사용:
 *   cat design_context.txt | node scripts/detect-placeholder-text.mjs
 *   node scripts/detect-placeholder-text.mjs <file.tsx>
 *
 * 출력 (stdout JSON):
 *   { suspects: [{ text, reason, suggest: "사전 추정 카피로 대체 권장" }] }
 */

import { readFileSync } from "node:fs";

const KNOWN_PLACEHOLDERS = [
  /Amazon bets \$\d+M/i,
  /amazon Is fast tracking/i,
  /Lorem ipsum/i,
  /From cloud to fulfillment/i,
  /From cloud to/i,
  /in Venture/i,
  /Tech\s*[&|]\s*Logistics facelift/i,
];

function analyze(text) {
  const suspects = [];

  // 1. 알려진 placeholder 패턴 매칭
  for (const pattern of KNOWN_PLACEHOLDERS) {
    const m = text.match(pattern);
    if (m) {
      suspects.push({
        text: m[0].slice(0, 80),
        reason: `알려진 placeholder 패턴: ${pattern.source}`,
        suggest: "사전 추정 카피로 대체 (docs/figma-project-context.md §4.N 참조)",
      });
    }
  }

  // 2. 긴 영문 문자열 (한글이 거의 없고 영문 다수)
  const strings = text.match(/"([^"]{40,})"/g) ?? [];
  for (const raw of strings) {
    const s = raw.slice(1, -1);
    const korean = (s.match(/[가-힣]/g) ?? []).length;
    const english = (s.match(/[a-zA-Z]/g) ?? []).length;
    const total = korean + english;
    if (total === 0) continue;
    const englishRatio = english / total;
    if (englishRatio >= 0.7 && s.length >= 40) {
      // 이미 알려진 패턴에 포함됐으면 스킵
      const already = suspects.some((sus) => s.includes(sus.text));
      if (already) continue;
      suspects.push({
        text: s.slice(0, 80),
        reason: `영문 비율 ${(englishRatio * 100).toFixed(0)}%, 길이 ${s.length}자 (한국어 사이트 placeholder 의심)`,
        suggest: "실제 카피 확인 후 대체",
      });
    }
  }

  return { suspects };
}

function main() {
  let input = "";
  if (process.argv[2]) {
    input = readFileSync(process.argv[2], "utf8");
  } else {
    input = readFileSync(0, "utf8");
  }

  const result = analyze(input);
  console.log(JSON.stringify(result, null, 2));

  if (result.suspects.length > 0) {
    console.error(
      `\n⚠ placeholder 의심 ${result.suspects.length}건. ` +
        `research/{page}.md 리스크 메모에 "실제 카피 확정 필요" 항목 추가 권장.`,
    );
    process.exit(1);
  }
  process.exit(0);
}

main();
