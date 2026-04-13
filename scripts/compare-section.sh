#!/usr/bin/env bash
# compare-section.sh — Figma 베이스라인 vs 브라우저 렌더 픽셀 비교.
#
# 사용법:
#   scripts/compare-section.sh <섹션명> [url]
#     섹션명: figma-screenshots/<섹션명>.png 와 매칭.
#     url:    기본 http://127.0.0.1:5173/__preview/<섹션명>
#
# 절차:
#   1. dev 서버 응답 확인 (http://127.0.0.1:5173)
#   2. tests/visual/run.ts 에 capture+compare 위임
#   3. diff % 출력, 5% 초과 시 exit 1

set -u
set -o pipefail

if [[ $# -lt 1 ]]; then
  echo "usage: $0 <section-name> [url]" >&2
  exit 2
fi

SECTION="$1"
URL="${2:-http://127.0.0.1:5173/__preview/$SECTION}"
BASELINE="figma-screenshots/${SECTION}.png"

if [[ ! -f "$BASELINE" ]]; then
  echo "error: baseline not found: $BASELINE" >&2
  exit 2
fi

code=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:5173" || echo "000")
if [[ "$code" != "200" ]]; then
  echo "error: dev server not reachable at http://127.0.0.1:5173 (got $code). 먼저 'npm run dev' 실행." >&2
  exit 2
fi

npx tsx tests/visual/run.ts --section "$SECTION" --url "$URL" --baseline "$BASELINE"
