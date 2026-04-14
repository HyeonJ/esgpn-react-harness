#!/usr/bin/env bash
# G5~G8 품질 게이트 측정 — 섹션 구현 직후 (단계 4.5).
#
# G5 시맨틱 HTML    — eslint jsx-a11y
# G6 텍스트/이미지 비율 — check-text-ratio.mjs
# G7 Lighthouse a11y/SEO — @lhci/cli (preview 라우트)
# G8 i18n 가능성     — check-text-ratio.mjs 의 g8 필드
#
# Usage:
#   bash scripts/measure-quality.sh <섹션명> <섹션 디렉토리>
#   예: bash scripts/measure-quality.sh main-hero src/components/sections/MainHero
#
# 종료 코드:
#   0: G5~G8 전부 PASS
#   1: 하나라도 FAIL
#   2: 사용법 오류
#
# 출력:
#   tests/visual/quality/{섹션명}.json — 측정 결과 JSON
#   stdout — 요약

set -u

section="${1:-}"
dir="${2:-}"

if [ -z "$section" ] || [ -z "$dir" ]; then
  echo "usage: measure-quality.sh <section-name> <section-dir>"
  echo "  예: measure-quality.sh main-hero src/components/sections/MainHero"
  exit 2
fi

if [ ! -d "$dir" ]; then
  echo "❌ section dir not found: $dir"
  exit 2
fi

OUT_DIR="tests/visual/quality"
mkdir -p "$OUT_DIR"
OUT="$OUT_DIR/${section}.json"

FAIL=0
G5_STATUS="SKIP"
G6_STATUS="SKIP"
G7_STATUS="SKIP"
G8_STATUS="SKIP"

# ---------- G5 시맨틱 HTML (eslint jsx-a11y) ----------
echo "[G5/8] 시맨틱 HTML (eslint jsx-a11y)"
if npx eslint "$dir" --no-warn-ignored 2>&1 | tee /tmp/g5.log | tail -5; then
  G5_STATUS="PASS"
  echo "  ✓ G5 PASS"
else
  G5_STATUS="FAIL"
  FAIL=1
  echo "  ❌ G5 FAIL"
fi

# ---------- G6/G8 텍스트/이미지 비율 ----------
echo ""
echo "[G6/G8] 텍스트:이미지 비율 + i18n 가능성"
G68_JSON=""
if G68_JSON=$(node scripts/check-text-ratio.mjs "$dir" 2>/tmp/g68.err); then
  G6_STATUS="PASS"
  G8_STATUS="PASS"
  echo "  ✓ G6/G8 PASS"
else
  # stderr에 FAIL 이유 있음. stdout에 JSON.
  G68_JSON=$(node scripts/check-text-ratio.mjs "$dir" 2>/dev/null || echo "{}")
  # g6, g8 필드 개별 파싱 (jq 없으면 grep으로)
  if echo "$G68_JSON" | grep -q '"g6":[[:space:]]*"PASS"'; then
    G6_STATUS="PASS"
  else
    G6_STATUS="FAIL"
    FAIL=1
  fi
  if echo "$G68_JSON" | grep -q '"g8":[[:space:]]*"PASS"'; then
    G8_STATUS="PASS"
  else
    G8_STATUS="FAIL"
    FAIL=1
  fi
  cat /tmp/g68.err
fi

# ---------- G7 Lighthouse (선택 — 환경 갖춰진 경우만) ----------
echo ""
echo "[G7] Lighthouse a11y/SEO"
if ! command -v npx >/dev/null 2>&1; then
  echo "  ⚠ npx 없음 → G7 SKIP"
elif ! npx --no-install lhci --version >/dev/null 2>&1; then
  echo "  ⚠ @lhci/cli 미설치 → G7 SKIP (설치: npm install -D @lhci/cli)"
else
  url="http://127.0.0.1:5173/__preview/${section}"
  if curl -sSf -o /dev/null "$url"; then
    # Lighthouse 실행 (간이)
    lh_out=$(npx --no-install lighthouse "$url" --only-categories=accessibility,seo \
      --output=json --output-path=/tmp/lh.json --chrome-flags="--headless" \
      --quiet 2>/dev/null || true)
    a11y=$(node -e "try{const j=require('/tmp/lh.json');console.log(Math.round(j.categories.accessibility.score*100))}catch(e){console.log('N/A')}")
    seo=$(node -e "try{const j=require('/tmp/lh.json');console.log(Math.round(j.categories.seo.score*100))}catch(e){console.log('N/A')}")
    if [ "$a11y" != "N/A" ] && [ "$a11y" -ge 95 ] && [ "$seo" -ge 90 ]; then
      G7_STATUS="PASS (a11y=$a11y, seo=$seo)"
      echo "  ✓ G7 PASS (a11y=$a11y, seo=$seo)"
    else
      G7_STATUS="FAIL (a11y=$a11y, seo=$seo)"
      FAIL=1
      echo "  ❌ G7 FAIL (a11y=$a11y, seo=$seo, 기준: a11y≥95, seo≥90)"
    fi
  else
    echo "  ⚠ dev 서버 미기동 ($url 접근 실패) → G7 SKIP"
  fi
fi

# ---------- JSON 결과 저장 ----------
cat > "$OUT" <<EOF
{
  "section": "$section",
  "dir": "$dir",
  "G5_semantic_html": "$G5_STATUS",
  "G6_text_image_ratio": "$G6_STATUS",
  "G7_lighthouse": "$G7_STATUS",
  "G8_i18n": "$G8_STATUS"
}
EOF

echo ""
echo "=================================="
echo "결과 저장: $OUT"
if [ "$FAIL" -eq 0 ]; then
  echo "✓ G5~G8 전체 PASS"
  exit 0
else
  echo "❌ 품질 게이트 미통과. 단계 4로 반송 (G1~G4 측정 진입 금지)."
  exit 1
fi
