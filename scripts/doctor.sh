#!/usr/bin/env bash
# doctor.sh — 새 PC 환경 세팅 체크.
#
# docs/setup.md 기준으로 다음을 점검:
#   1. Node.js / Claude CLI / Git / Git Bash 버전
#   2. MCP 서버 연결 (공식 Figma + Framelink)
#   3. Playwright 크로미움 바이너리 설치 여부
#   4. TypeScript 컴파일 가능 여부
#
# 모두 통과하면 오케스트레이터 세션 시작 가능 상태.
# 실패 시 docs/setup.md 해당 섹션 안내.

set -u

PASS_MARK="✓"
FAIL_MARK="✗"
WARN_MARK="!"

fail_count=0
warn_count=0

report_pass() { echo "  ${PASS_MARK} $1"; }
report_fail() { echo "  ${FAIL_MARK} $1"; fail_count=$((fail_count+1)); }
report_warn() { echo "  ${WARN_MARK} $1"; warn_count=$((warn_count+1)); }

echo ""
echo "== ESGPN doctor: 환경 점검 (docs/setup.md 기준) =="
echo ""

# ---------- 1. 시스템 도구 ----------
echo "[1/4] 시스템 도구"

if command -v node >/dev/null 2>&1; then
  node_ver=$(node -v)
  major=$(echo "$node_ver" | sed 's/^v\([0-9]*\).*/\1/')
  if [ "$major" -ge 20 ]; then
    report_pass "Node.js $node_ver (>= 20 OK)"
  else
    report_fail "Node.js $node_ver — 20 LTS 이상 필요 (docs/setup.md §1)"
  fi
else
  report_fail "Node.js 미설치 (docs/setup.md §1)"
fi

if command -v git >/dev/null 2>&1; then
  report_pass "Git $(git --version | awk '{print $3}')"
else
  report_fail "Git 미설치 (docs/setup.md §1)"
fi

if command -v claude >/dev/null 2>&1; then
  report_pass "Claude Code CLI $(claude --version 2>/dev/null || echo 'version ?')"
else
  report_fail "Claude Code CLI 미설치 (docs/setup.md §1)"
fi

if command -v bash >/dev/null 2>&1; then
  report_pass "bash (Git Bash on Windows OK)"
else
  report_fail "bash 없음 — Windows는 Git Bash 필요 (docs/setup.md §1)"
fi

echo ""

# ---------- 2. MCP 서버 ----------
echo "[2/4] MCP 서버 연결"

if command -v claude >/dev/null 2>&1; then
  mcp_out=$(claude mcp list 2>&1 || true)

  if echo "$mcp_out" | grep -q "plugin:figma:figma.*Connected"; then
    report_pass "plugin:figma:figma ✓ Connected"
  else
    report_fail "공식 Figma MCP 연결 안 됨 — Claude 계정에서 Figma 연동 필요 (docs/setup.md §4.1)"
  fi

  if echo "$mcp_out" | grep -q "figma-framelink.*Connected"; then
    report_pass "figma-framelink ✓ Connected"
  else
    report_fail "Framelink MCP 미등록 또는 연결 끊김 (docs/setup.md §4.2). 'claude mcp add figma-framelink ...' 필요"
  fi
else
  report_warn "claude CLI 없어 MCP 상태 건너뜀"
fi

echo ""

# ---------- 3. Playwright ----------
echo "[3/4] Playwright 브라우저 바이너리"

# Playwright는 캐시 디렉터리에 브라우저 저장. OS별 경로 다름.
# Windows: ~/AppData/Local/ms-playwright
# macOS/Linux: ~/.cache/ms-playwright (또는 Library/Caches)
pw_cache_candidates=(
  "$HOME/AppData/Local/ms-playwright"
  "$HOME/Library/Caches/ms-playwright"
  "$HOME/.cache/ms-playwright"
)

pw_found=false
for d in "${pw_cache_candidates[@]}"; do
  if [ -d "$d" ] && ls "$d" 2>/dev/null | grep -q "^chromium"; then
    pw_found=true
    report_pass "Playwright 크로미움 설치됨 ($d)"
    break
  fi
done

if [ "$pw_found" = false ]; then
  report_fail "Playwright 크로미움 미설치 — 'npx playwright install chromium' 실행 (docs/setup.md §3)"
fi

echo ""

# ---------- 4. 프로젝트 컴파일 ----------
echo "[4/4] 프로젝트 컴파일"

if [ ! -d "node_modules" ]; then
  report_fail "node_modules 없음 — 'npm install' 먼저 실행"
elif ! command -v npx >/dev/null 2>&1; then
  report_warn "npx 없음 — compile 건너뜀"
else
  # typecheck 빠른 체크
  if npm run typecheck >/dev/null 2>&1; then
    report_pass "npm run typecheck 통과"
  else
    report_fail "npm run typecheck 실패 — 'npm run typecheck' 실행해서 에러 확인"
  fi
fi

echo ""

# ---------- 결과 ----------
echo "=================================="
if [ "$fail_count" -eq 0 ] && [ "$warn_count" -eq 0 ]; then
  echo "${PASS_MARK} 전체 통과. 오케스트레이터 세션 시작 가능."
  echo "  다음 프롬프트 예: 'PROGRESS.md 확인 후 다음 섹션 진행해줘'"
  exit 0
elif [ "$fail_count" -eq 0 ]; then
  echo "${WARN_MARK} 경고 ${warn_count}건. 진행은 가능하나 확인 권장."
  exit 0
else
  echo "${FAIL_MARK} 실패 ${fail_count}건, 경고 ${warn_count}건."
  echo "  docs/setup.md 참조해서 누락된 항목 설정 후 재실행: npm run doctor"
  exit 1
fi
