#!/usr/bin/env bash
# compare-section.sh — Figma 베이스라인 vs 브라우저 렌더 픽셀 비교.
#
# 사용법:
#   scripts/compare-section.sh <섹션명> [옵션]
#
# 옵션:
#   --url <url>             기본 http://127.0.0.1:5173/__preview/<섹션명>
#   --clip-x <n>            floating/중앙정렬 요소: 요소-한정 캡처 시작 x
#   --clip-y <n>            요소-한정 캡처 시작 y
#   --clip-w <n>            요소-한정 캡처 폭
#   --clip-h <n>            요소-한정 캡처 높이
#
# 예:
#   scripts/compare-section.sh main-stats                          # 1920 풀폭
#   scripts/compare-section.sh header --clip-x 252 --clip-y 16 \   # floating pill
#     --clip-w 1416 --clip-h 72
#   scripts/compare-section.sh main-programs-header \              # 1416 중앙
#     --clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 261
#
# 절차:
#   1. dev 서버 응답 확인 (http://127.0.0.1:5173)
#   2. tests/visual/run.ts 에 capture+compare 위임 (clip-* 그대로 pass-through)
#   3. diff % 출력, 5% 초과 시 exit 1

set -u
set -o pipefail

if [[ $# -lt 1 ]]; then
  echo "usage: $0 <section-name> [--url <url>] [--clip-x N --clip-y N --clip-w N --clip-h N]" >&2
  exit 2
fi

SECTION="$1"
shift
URL="http://127.0.0.1:5173/__preview/$SECTION"
BASELINE="figma-screenshots/${SECTION}.png"
CLIP_ARGS=()

BAKE_FROM=""
BAKE_XYWH=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --url)
      URL="$2"; shift 2 ;;
    --clip-x|--clip-y|--clip-w|--clip-h)
      CLIP_ARGS+=("$1" "$2"); shift 2 ;;
    --bake-from-full)
      # --bake-from-full <page-name>:<x>,<y>,<w>,<h>
      # 예: --bake-from-full news:491,833,937,1416
      BAKE_FROM="$2"; shift 2 ;;
    *)
      echo "error: unknown option: $1" >&2
      exit 2 ;;
  esac
done

# C-1: baseline alpha=0 자동 베이크 (full-page crop)
if [[ -n "$BAKE_FROM" ]]; then
  page="${BAKE_FROM%%:*}"
  xywh="${BAKE_FROM#*:}"
  IFS=',' read -r bx by bw bh <<< "$xywh"
  echo "[bake] $BASELINE ← figma-screenshots/${page}-full.png @ ($bx,$by,${bw}x${bh})"
  node scripts/bake-baseline.mjs "$SECTION" "$bx" "$by" "$bw" "$bh" --from "${page}-full.png" || exit 2
fi

if [[ ! -f "$BASELINE" ]]; then
  echo "error: baseline not found: $BASELINE" >&2
  exit 2
fi

code=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:5173" || echo "000")
if [[ "$code" != "200" ]]; then
  echo "error: dev server not reachable at http://127.0.0.1:5173 (got $code). 먼저 'npm run dev' 실행." >&2
  exit 2
fi

OUT_FILE=$(mktemp)
trap 'rm -f "$OUT_FILE"' EXIT
npx tsx tests/visual/run.ts --section "$SECTION" --url "$URL" --baseline "$BASELINE" "${CLIP_ARGS[@]}" | tee "$OUT_FILE"
rc=${PIPESTATUS[0]}

# C-6: G1 diff history 추적
diff_val=$(grep -oE 'DIFF: [0-9]+\.[0-9]+' "$OUT_FILE" | awk '{print $2}')
if [[ -n "$diff_val" ]]; then
  node scripts/track-diff-history.mjs "$SECTION" "$diff_val" || true
fi

exit "$rc"
