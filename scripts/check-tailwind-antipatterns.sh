#!/usr/bin/env bash
# Tailwind arbitrary value 안티패턴 검출.
#
# 자동 가드 대상 (docs/section-implementation.md §2.4):
#   1. 음수 width/height:   w-[-...], h-[-...]    → ERROR (CSS 유효하지 않음)
#   2. 정수 회전/변형:       rotate-[{정수}deg]    → WARN (Figma 수치 반올림 금지)
#   3. 정수 letter-spacing:  tracking-[{정수}px]   → WARN (소수점 원본값 권장)
#
# Usage:
#   bash scripts/check-tailwind-antipatterns.sh
#   bash scripts/check-tailwind-antipatterns.sh src/components/sections/MainHero

set -u

scope="${1:-src/}"
ERRORS=0
WARNS=0

# 1) 음수 width/height (ERROR)
while IFS= read -r line; do
  echo "❌ ${line}"
  echo "   음수 width/height는 CSS invalid. Framelink PNG metadata 그대로 복사한 흔적 — AABB 양수로 보정 필요."
  ERRORS=$((ERRORS+1))
done < <(grep -rnE "(className|class)=.*[wh]-\[-[0-9]" "$scope" --include="*.tsx" --include="*.jsx" 2>/dev/null || true)

# 2) 정수 회전 (rotate-[Ndeg] with no decimal)
while IFS= read -r line; do
  echo "⚠ ${line}"
  echo "   회전 값에 소수점 없음. Figma 원본이 정수일 가능성 있지만, 변형 요소는 보통 소수점 포함 — docs §2.4 확인"
  WARNS=$((WARNS+1))
done < <(grep -rnE 'rotate-\[-?[0-9]+deg\]' "$scope" --include="*.tsx" --include="*.jsx" 2>/dev/null || true)

# 3) 정수 letter-spacing (tracking-[Npx])
while IFS= read -r line; do
  echo "⚠ ${line}"
  echo "   letter-spacing 정수. Figma 토큰이 percent 단위일 가능성 — docs §2.4 letter-spacing percent 함정 확인"
  WARNS=$((WARNS+1))
done < <(grep -rnE 'tracking-\[-?[0-9]+px\]' "$scope" --include="*.tsx" --include="*.jsx" 2>/dev/null || true)

echo ""
if [ "$ERRORS" -gt 0 ]; then
  echo "총 ${ERRORS} 에러 / ${WARNS} 경고. 에러는 수정 필수."
  exit 1
fi
if [ "$WARNS" -gt 0 ]; then
  echo "총 ${WARNS} 경고. 원본 Figma 수치 확인 필요 (의도적이면 주석 추가)."
  exit 0
fi
echo "✓ Tailwind arbitrary 안티패턴 없음 (scope: $scope)"
exit 0
