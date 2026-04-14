#!/usr/bin/env bash
# Framelink baked-in PNG 재적용 CSS 검출.
#
# Framelink download_figma_images가 반환한 PNG는 회전/블렌드/배경이 baked-in 된 "완성된 합성 사진".
# 그 위에 CSS rotate()/mix-blend-mode/bg-color를 추가하면 이중 적용 → G1 폭증.
#
# 이 스크립트는 src/assets/ 하위 PNG의 import 경로를 찾고, 사용처 JSX에서
# rotate-[ / mix-blend- / bg-[ 같은 클래스가 같이 붙어있으면 경고.
#
# docs/section-implementation.md §2.5 규칙을 자동화.
#
# Usage:
#   bash scripts/check-baked-in-png.sh [section-name]
#   bash scripts/check-baked-in-png.sh          # 전체
#   bash scripts/check-baked-in-png.sh main-hero  # 특정 섹션

set -u

FAIL=0
WARNS=0
section="${1:-}"

if [ -n "$section" ]; then
  scope="src/components/sections/*${section}*/"
else
  scope="src/"
fi

# PNG import 패턴
while IFS= read -r line; do
  file="${line%%:*}"
  rest="${line#*:}"

  # import 한 줄 안에 png 경로 있음 → 같은 파일에서 해당 변수 사용처 rotate/blend/bg 검사
  varname=$(echo "$rest" | sed -n 's/^import[[:space:]]*\([A-Za-z_][A-Za-z0-9_]*\).*/\1/p')
  [ -z "$varname" ] && continue

  # 같은 파일에서 변수 사용처 검사
  uses=$(grep -n "$varname" "$file" || true)
  while IFS= read -r uline; do
    [ -z "$uline" ] && continue
    # className에 rotate-[ / mix-blend / bg-[#  패턴 검출
    if echo "$uline" | grep -qE 'className.*(rotate-\[|mix-blend-|bg-\[#)'; then
      echo "⚠ $file: '$varname' (baked-in PNG) + CSS rotate/blend/bg 동시 적용 의심"
      echo "   $uline"
      echo "   → docs/section-implementation.md §2.5 참조"
      WARNS=$((WARNS+1))
    fi
  done <<< "$uses"

done < <(grep -rn "import .* from .*\.png" $scope 2>/dev/null || true)

if [ "$WARNS" -gt 0 ]; then
  echo ""
  echo "총 $WARNS 건 의심. 이중 적용 여부 확인 필요."
  # 경고만. 블록은 하지 않음 (false positive 가능성 — 일부 PNG는 실제로 rotate 필요할 수도)
  exit 0
fi

echo "✓ baked-in PNG 중첩 적용 없음 (scope: $scope)"
exit 0
