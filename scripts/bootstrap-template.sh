#!/usr/bin/env bash
# bootstrap-template.sh — v5 하네스를 새 프로젝트 디렉토리로 추출.
#
# Usage:
#   scripts/bootstrap-template.sh <target-dir> [--project-name <name>] [--force]
#
# 동작:
#   1. 하네스 파일만 선별 복사 (agents, skills, scripts, docs 공통, 런타임 skeleton)
#   2. 프로젝트별 스켈레톤 파일로 스텁 교체 (App.tsx, tokens.css, CLAUDE.md 등)
#   3. package.json 프로젝트명 치환
#   4. git init + 초기 커밋 전 상태로 남김
#
# Windows/Git Bash, macOS, Linux 모두 호환 (POSIX cp/mkdir/rm만 사용).

set -euo pipefail

# ---------- 인자 파싱 ----------
TARGET_DIR=""
PROJECT_NAME=""
FORCE=0

while [ $# -gt 0 ]; do
  case "$1" in
    --project-name)
      PROJECT_NAME="$2"
      shift 2
      ;;
    --force)
      FORCE=1
      shift
      ;;
    -h|--help)
      cat <<EOF
Usage: $(basename "$0") <target-dir> [--project-name <name>] [--force]

  <target-dir>       새 프로젝트 경로. 비어있거나 존재하지 않아야 함 (--force로 덮어쓰기)
  --project-name     package.json "name" 필드 (기본: target-dir basename)
  --force            target-dir에 내용 있어도 강제 진행

예시:
  $(basename "$0") ../my-figma-project
  $(basename "$0") ../harness-template --project-name esgpn-harness-template
EOF
      exit 0
      ;;
    -*)
      echo "Unknown option: $1" >&2
      exit 2
      ;;
    *)
      if [ -z "$TARGET_DIR" ]; then
        TARGET_DIR="$1"
      else
        echo "Too many positional args: $1" >&2
        exit 2
      fi
      shift
      ;;
  esac
done

if [ -z "$TARGET_DIR" ]; then
  echo "ERROR: target-dir 인자 필수. --help 참고." >&2
  exit 2
fi

SRC_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
if [ ! -f "$SRC_ROOT/CLAUDE.md" ] || [ ! -d "$SRC_ROOT/.claude/agents" ]; then
  echo "ERROR: 스크립트를 ESGPN 하네스 레포 안에서 실행해야 합니다." >&2
  echo "       감지한 SRC_ROOT=$SRC_ROOT" >&2
  exit 2
fi

# TARGET_DIR 절대경로 변환
mkdir -p "$TARGET_DIR"
TARGET_DIR="$(cd "$TARGET_DIR" && pwd)"

if [ "$TARGET_DIR" = "$SRC_ROOT" ]; then
  echo "ERROR: target-dir가 소스와 동일합니다. 별도 디렉토리 지정하세요." >&2
  exit 2
fi

# 이미 내용이 있으면 차단 (--force 제외)
if [ "$FORCE" -eq 0 ] && [ -n "$(ls -A "$TARGET_DIR" 2>/dev/null)" ]; then
  echo "ERROR: $TARGET_DIR 가 비어있지 않습니다. --force로 덮어쓰거나 다른 경로를 지정하세요." >&2
  exit 2
fi

if [ -z "$PROJECT_NAME" ]; then
  PROJECT_NAME="$(basename "$TARGET_DIR")"
fi

echo "[bootstrap] SRC_ROOT = $SRC_ROOT"
echo "[bootstrap] TARGET   = $TARGET_DIR"
echo "[bootstrap] NAME     = $PROJECT_NAME"
echo

# ---------- 유틸 ----------
copy_dir() {
  # copy_dir <relative-src-dir> <relative-dst-dir>
  # src-dir 전체 재귀 복사. dst 부모 디렉토리 자동 생성.
  local src="$SRC_ROOT/$1"
  local dst="$TARGET_DIR/$2"
  if [ ! -e "$src" ]; then
    echo "  [skip] $1 (없음)"
    return
  fi
  mkdir -p "$(dirname "$dst")"
  cp -R "$src" "$dst"
  echo "  [copy] $1 -> $2"
}

copy_file() {
  # copy_file <relative-src> <relative-dst>
  local src="$SRC_ROOT/$1"
  local dst="$TARGET_DIR/$2"
  if [ ! -e "$src" ]; then
    echo "  [skip] $1 (없음)"
    return
  fi
  mkdir -p "$(dirname "$dst")"
  cp "$src" "$dst"
  echo "  [copy] $1 -> $2"
}

# ---------- 1. 하네스 인프라 (에이전트 + 스킬) ----------
echo "[1/6] .claude/ (에이전트 + 스킬)"
copy_dir ".claude/agents" ".claude/agents"
copy_dir ".claude/skills" ".claude/skills"
# responsive-worker 제외 여부: 일단 포함 — 반응형 폴리시 전용 (ESGPN 무관)
# .claude/settings.local.json 은 .gitignore 대상, 복사 안 함
echo

# ---------- 2. scripts/ (하네스 공통 도구만) ----------
echo "[2/6] scripts/"
# 화이트리스트: 하네스 공통 도구
HARNESS_SCRIPTS=(
  "bake-baseline.mjs"
  "bootstrap-template.sh"
  "check-baked-in-png.sh"
  "check-composite-diff.mjs"
  "check-figma-export-targets.mjs"
  "check-spacing-audit.mjs"
  "check-structure-quality.mjs"
  "check-tailwind-antipatterns.sh"
  "check-text-ratio.mjs"
  "compare-section.sh"
  "detect-cutoff.mjs"
  "detect-placeholder-text.mjs"
  "doctor.sh"
  "download-assets.sh"
  "measure-quality.sh"
  "process-assets.py"
  "rembg-icon.py"
  "track-diff-history.mjs"
  "verify-assets.sh"
)
# 제외: capture-all-pages.mjs, compress-main-gallery-bg.mjs, measure-contact-form.mjs,
#       mcp-wrapper.cjs, compress-bg.mjs — ESGPN/MCP 연결 실험 전용
for s in "${HARNESS_SCRIPTS[@]}"; do
  copy_file "scripts/$s" "scripts/$s"
done
echo

# ---------- 3. docs/ (공통 가이드만) ----------
echo "[3/6] docs/"
HARNESS_DOCS=(
  "figma-workflow.md"
  "section-implementation.md"
  "frontend.md"
  "react.md"
  "backend.md"
  "spring.md"
  "setup.md"
  "tech-debt.md"
)
for d in "${HARNESS_DOCS[@]}"; do
  copy_file "docs/$d" "docs/$d"
done
# redefine/ 하위: philosophy (north star) + v5-feedback (F-log) + v5-design만
copy_file "docs/redefine/philosophy.md" "docs/redefine/philosophy.md"
copy_file "docs/redefine/v5-feedback.md" "docs/redefine/v5-feedback.md"
copy_file "docs/redefine/v5-design.md" "docs/redefine/v5-design.md"
# 제외: HANDOFF*, act1-plan, contest-hero-structure.csv, structure-report.csv,
#       v4-completion-report.md, retrospective/ — ESGPN 세션 산출물
# 제외: figma-project-context.md — 프로젝트별로 새로 작성해야 함 (템플릿은 스텁 생성)
echo

# ---------- 4. src/ skeleton + tests/visual 인프라 ----------
echo "[4/6] src/ + tests/"
# src/styles는 전부 복사 (tokens.css, fonts.css, index.css)
copy_dir "src/styles" "src/styles"
# src/routes: PreviewWrapper, FontCalibration만 — 섹션별 preview는 제외
copy_file "src/routes/PreviewWrapper.tsx" "src/routes/PreviewWrapper.tsx"
copy_file "src/routes/FontCalibration.tsx" "src/routes/FontCalibration.tsx"
copy_file "src/vite-env.d.ts" "src/vite-env.d.ts"
copy_file "src/main.tsx" "src/main.tsx"

# tests/visual: 런너 + capture/compare 유틸만. measure-* 는 섹션별이라 제외
TESTS_VISUAL=(
  "run.ts"
  "capture.ts"
  "compare.ts"
  "capture-4vp.ts"
  "capture-calibration.ts"
  "audit-routes.ts"
  "verify-no-hscroll.ts"
  "find-1920-overflow.ts"
)
for t in "${TESTS_VISUAL[@]}"; do
  copy_file "tests/visual/$t" "tests/visual/$t"
done
copy_dir "tests/visual/fixtures" "tests/visual/fixtures"
echo

# ---------- 5. 루트 설정 파일 ----------
echo "[5/6] 루트 설정"
copy_file "vite.config.ts" "vite.config.ts"
copy_file "tsconfig.json" "tsconfig.json"
copy_file "tsconfig.node.json" "tsconfig.node.json"
copy_file "eslint.config.js" "eslint.config.js"
copy_file ".gitignore" ".gitignore"
echo

# ---------- 6. 스텁 파일 생성 (프로젝트별로 교체해야 하는 부분) ----------
echo "[6/6] 스텁 파일 생성"

# --- 6a. package.json ---
cat > "$TARGET_DIR/package.json" <<EOF
{
  "name": "$PROJECT_NAME",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .ts,.tsx",
    "typecheck": "tsc --noEmit",
    "test:visual": "tsx tests/visual/run.ts --self-test",
    "doctor": "bash scripts/doctor.sh",
    "check:antipatterns": "bash scripts/check-tailwind-antipatterns.sh",
    "check:baked-png": "bash scripts/check-baked-in-png.sh",
    "check:quality": "bash scripts/measure-quality.sh",
    "bake:baseline": "node scripts/bake-baseline.mjs",
    "check:composite": "node scripts/check-composite-diff.mjs",
    "check:placeholder": "node scripts/detect-placeholder-text.mjs",
    "check:export-targets": "node scripts/check-figma-export-targets.mjs",
    "check:spacing": "node scripts/check-spacing-audit.mjs",
    "rembg:icon": "python scripts/rembg-icon.py"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^0.468.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0"
  },
  "devDependencies": {
    "@babel/parser": "^7.26.0",
    "@babel/traverse": "^7.26.0",
    "@eslint/js": "^9.15.0",
    "@playwright/test": "^1.49.0",
    "@tailwindcss/vite": "^4.0.0",
    "@types/node": "^22.10.0",
    "@types/pixelmatch": "^5.2.6",
    "@types/pngjs": "^6.0.5",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@typescript-eslint/eslint-plugin": "^8.15.0",
    "@typescript-eslint/parser": "^8.15.0",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.15.0",
    "eslint-plugin-jsx-a11y": "^6.10.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "pixelmatch": "^6.0.0",
    "pngjs": "^7.0.0",
    "sharp": "^0.34.5",
    "tailwindcss": "^4.0.0",
    "tsx": "^4.19.2",
    "typescript": "^5.7.2",
    "vite": "^6.0.0"
  }
}
EOF
echo "  [stub] package.json"

# --- 6b. .gitattributes (CRLF/LF 통일) ---
cat > "$TARGET_DIR/.gitattributes" <<'EOF'
* text=auto

*.ts    text eol=lf
*.tsx   text eol=lf
*.js    text eol=lf
*.mjs   text eol=lf
*.cjs   text eol=lf
*.json  text eol=lf
*.css   text eol=lf
*.html  text eol=lf
*.md    text eol=lf
*.sh    text eol=lf
*.yml   text eol=lf

*.png   binary
*.jpg   binary
*.jpeg  binary
*.webp  binary
*.woff2 binary
*.ico   binary
EOF
echo "  [stub] .gitattributes"

# --- 6c. index.html ---
cat > "$TARGET_DIR/index.html" <<EOF
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>$PROJECT_NAME</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF
echo "  [stub] index.html"

# --- 6d. src/App.tsx (최소 스켈레톤) ---
mkdir -p "$TARGET_DIR/src"
cat > "$TARGET_DIR/src/App.tsx" <<'EOF'
import { Routes, Route } from "react-router-dom";
import { FontCalibration } from "@/routes/FontCalibration";

/*
 * App.tsx — Phase 1 초기 skeleton.
 *
 * Phase 2 이후 섹션이 만들어지면:
 *   1. import { MySectionPreview } from "@/routes/MySectionPreview";
 *   2. <Route path="/__preview/my-section" element={<MySectionPreview />} />
 *   3. 사용자 라우트 블록에 <MySection /> 추가
 *
 * RootLayout 은 Phase 2 헤더/푸터 섹션 구현 후 활성화.
 */
export function App() {
  return (
    <Routes>
      <Route path="/__calibration" element={<FontCalibration />} />
      <Route path="/" element={<Landing />} />
    </Routes>
  );
}

function Landing() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4">하네스 템플릿</h1>
        <p className="text-gray-700 mb-6">
          Figma→React 변환 하네스 v5. 새 프로젝트를 시작하려면 CLAUDE.md를 읽으세요.
        </p>
        <ul className="text-left text-sm space-y-1">
          <li><code>/__calibration</code> — 폰트 보정 확인</li>
          <li><code>/__preview/&lt;section&gt;</code> — 섹션 격리 프리뷰 (Phase 2 이후)</li>
        </ul>
      </div>
    </main>
  );
}
EOF
echo "  [stub] src/App.tsx"

# --- 6e. src/styles/tokens.css (PLACEHOLDER) ---
cat > "$TARGET_DIR/src/styles/tokens.css" <<'EOF'
/*
 * tokens.css — Figma 디자인 토큰 → CSS 변수 1:1 매핑.
 *
 * Phase 1 2.2 단계에서 Figma MCP get_variable_defs 추출 후 이 파일을 교체한다.
 * 원칙: 누락 0건. Figma 변수명을 kebab-case로 직역.
 *
 * PLACEHOLDER — 현재는 Tailwind 기본 유지를 위한 최소 값만 선언.
 */
:root {
  /* 여기에 --color-*, --spacing-*, --radius-*, --text-* 변수를 선언 */
  --placeholder-brand: #4fb654;
}
EOF
echo "  [stub] src/styles/tokens.css"

# --- 6f. src/styles/fonts.css (PLACEHOLDER) ---
cat > "$TARGET_DIR/src/styles/fonts.css" <<'EOF'
/*
 * fonts.css — 프로젝트별 폰트 @font-face 선언.
 *
 * Phase 1 2.3 단계에서 Figma typography 분석 후 이 파일을 교체한다.
 * 로컬 호스팅 권장 (public/fonts/*.woff2).
 * FOIT 방지: font-display: swap.
 *
 * PLACEHOLDER — 시스템 폰트만 사용.
 */

/* 예시:
@font-face {
  font-family: "Pretendard Variable";
  font-weight: 45 920;
  font-style: normal;
  font-display: swap;
  src: url("/fonts/PretendardVariable.woff2") format("woff2-variations");
}
*/
EOF
echo "  [stub] src/styles/fonts.css"

# --- 6g. src/styles/index.css (토큰 참조 최소화) ---
cat > "$TARGET_DIR/src/styles/index.css" <<'EOF'
@import "tailwindcss";
@import "./tokens.css";
@import "./fonts.css";

/*
 * Tailwind v4 @theme — tokens.css 변수를 Tailwind 유틸리티로 노출.
 * Phase 1 2.2 단계에서 Figma 변수 추출 후 이 블록을 채운다.
 */
@theme {
  --font-sans: system-ui, -apple-system, "Segoe UI", sans-serif;
}

html,
body,
#root {
  height: 100%;
}

body {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
EOF
echo "  [stub] src/styles/index.css"

# --- 6h. docs/figma-project-context.md (PLACEHOLDER) ---
cat > "$TARGET_DIR/docs/figma-project-context.md" <<EOF
# Figma 프로젝트 컨텍스트 — $PROJECT_NAME

> 이 파일은 프로젝트별로 작성한다. 하네스가 참조하는 진실의 원천.
> Phase 1 1단계(킥오프) 때 Figma 루트 탐색하며 채운다.

---

## 1. Figma 메타

- **파일 key**: (Figma URL에서 추출)
- **루트 Node ID**: (보통 Pages 프레임)
- **Canvas 폭**: (예: 1440, 1920)
- **브랜딩 톤**: (예: 다크 / 미니멀 / 고콘트라스트)

## 2. 페이지 Node ID 마스터 테이블

| # | 페이지명 | Node ID | 라우트 | Canvas 크기 | 비고 |
|---|---------|---------|--------|-------------|------|
| 1 | Landing | ? | / | ? | |

## 3. 토큰

- 색상: tokens.css 반영 후 링크
- 폰트: fonts.css 반영 후 링크
- spacing scale: (Figma 변수 확인)

## 4. 사전 추정 섹션 구성

각 페이지를 처음 훑고 섹션 후보를 미리 적어둔다. page-researcher가 Phase 2에서 재검증.

### 페이지 1 (Landing)
- section-1
- section-2

## 5. 공통 컴포넌트 카탈로그

페이지 간 반복 사용되는 컴포넌트. section-implementer가 이 목록을 참조하여 중복 구현을 피한다.

- TBD

## 6. 에셋 파이프라인 메모

- raw 에셋 위치:
- 변환 스크립트:
- CDN 정책:

## 7. 리스크 메모

- 사전에 알고 있는 함정 / 접근 주의점
EOF
echo "  [stub] docs/figma-project-context.md"

# --- 6i. CLAUDE.md (프로젝트 진입점) ---
cat > "$TARGET_DIR/CLAUDE.md" <<EOF
# $PROJECT_NAME — Figma → React 하네스

v5 하네스 템플릿에서 부트스트랩. 새 Figma 프로젝트를 **AI 자율 모드**로 섹션별 구현한다.

**핵심 원칙: 모든 페이지를 사용자 개입 없이 끝까지 완주한다. 사용자는 완주 후 검수.**

작업은 항상 다음 5단계: **리서치 → 계획 → 에셋 → 구현 → 측정**

---

## 하네스 트리거

Figma URL 제공, "디자인 구현", "섹션 진행", "페이지 구현" 관련 작업 시 **\`figma-to-react\` 스킬을 반드시 사용하라.**

이 스킬은 오케스트레이터로 동작하며, 워커 에이전트(\`phase1-setup-worker\`, \`page-researcher\`, \`section-implementer\`, \`responsive-worker\`)를 스폰하여 작업을 분담한다. 모든 Agent 호출은 \`model: "opus"\`.

---

## 시작 체크리스트 (Phase 0)

1. \`docs/figma-project-context.md\` 열어서 Figma 파일 key, 페이지 목록, 토큰 원본 채우기
2. \`npm install\` 후 \`npm run dev\` 로 skeleton 페이지 확인
3. \`npm run doctor\` 로 환경 점검 (Playwright, Python, ImageMagick 등)
4. Figma MCP 연결 확인 (Framelink MCP — docs/figma-workflow.md Phase 0 참조)
5. Phase 1 (프로젝트 셋업) — \`phase1-setup-worker\` 에이전트 스폰

---

## Figma 모드 절대 규칙 (워커에도 강제됨)

> **철학**: 실패는 "자동 가드"로 막는다. 새 함정 발견 시 텍스트 규칙 추가보다 lint/스크립트 이식 우선.

### 구조 규칙
- **작업 단위 = 섹션 (페이지 아님).** 한 섹션 = 한 브랜치 = 한 커밋
- **섹션이 이질적 에셋 3+ / 반복 자식 3+ / 예상 토큰 >10K 중 하나라도 해당하면 서브섹션으로 쪼갠다**
- **섹션은 자기 정렬 책임을 진다** — 섹션 루트에 \`mx-auto\` 내장

### 품질 게이트 (v5)

**차단 게이트**:
| G | 항목 | 기준 | 자동화 |
|---|---|---|---|
| G5 | 시맨틱 HTML | eslint jsx-a11y error 0 | \`npm run lint\` |
| G6 | 텍스트:이미지 비율 | text-bearing raster 0 | \`scripts/check-text-ratio.mjs\` |
| G8 | i18n 가능성 | JSX에 literal text 존재 | \`scripts/check-text-ratio.mjs\` |
| G2 | 치수 | font±2, 나머지±4 | Playwright computed style |
| G4 | 색상 토큰 일치 | 디자인 토큰 참조 (hex 직접 사용 최소화) | Playwright computed style |

**참고 지표**:
| G | 항목 | 목표 | 자동화 |
|---|---|---|---|
| G1 | 시각 diff | ≤ 15% | \`scripts/compare-section.sh\` |
| G3 | 에셋 존재 | naturalWidth > 0 | Playwright DOM |
| G7 | a11y/SEO | Lighthouse a11y≥95, SEO≥90 | \`scripts/measure-quality.sh\` |

### 에셋 규칙
- **에셋 URL 무조건 다운로드.** CSS/유니코드 대체 금지
- **Framelink는 leaf nodeId로 호출** — 부모 프레임 ID 금지 (text-bearing raster 안티패턴의 주 원인)
- **동적 에셋(GIF/비디오) 원본 사용 금지** — 부모 노드를 Framelink로 정적 PNG 추출 (\`dynamic-asset-handling\` 스킬)
- **baseline PNG 경로 규약**:
  - 공통: \`figma-screenshots/{section}.png\`
  - 페이지 섹션: \`figma-screenshots/{page}-{section}.png\`

### 실패 처리
- **게이트 미통과 시 최대 3회 수정.** 3회에도 미달이면 사용자 보고 + 멈춤
- **3회 실패 시 선택지 순서: (a)재분할 → (b)다른접근 → (c)엔진차이 수용 → (d)되돌리기 → (e)완화**
- \`(e)완화\` 선택 시 커밋 메시지에 \`[ACCEPTED_DEBT]\` 태그 + \`docs/tech-debt.md\` 엔트리 필수
- **\`docs/tech-debt.md\`의 \`OPEN\` 부채 3건 이상이면 새 섹션 진행 차단**

### 섹션 파일 편집 위임 규칙
- \`src/components/sections/**\`, \`src/components/ui/\` 파일 수정은 \`section-implementer\` 워커로 위임. 직접 편집 금지
- 예외 존: \`src/components/layout/\`, \`src/styles/\`, \`src/App.tsx\`, \`src/routes/\`, \`tests/\`, \`scripts/\` — 직접 편집 OK

### 변경 후 시각 검증 의무
- 섹션 파일 수정 시 4뷰포트(375/768/1440/1920) 스크린샷 + Figma 원본 비교 필수

---

## 모드 판별

1. **Figma URL** 또는 "디자인 구현" 키워드 → **Figma 모드** (\`figma-to-react\` 스킬)
2. **백엔드 키워드**(Spring, API, DB 등) → \`docs/backend.md\` + \`docs/spring.md\`
3. **프론트 일반 작업** → \`docs/frontend.md\` + \`docs/react.md\`
4. **모호 시** → 사용자에게 영역 확인

---

## 참조 문서

| 파일 | 역할 |
|------|------|
| \`docs/redefine/philosophy.md\` | north star — "편집 가능한 고충실도" |
| \`docs/figma-workflow.md\` | 4 Phase 전체 흐름 + Phase 2 섹션 분할 규칙 |
| \`docs/section-implementation.md\` | 섹션 7단계 절차 |
| \`docs/figma-project-context.md\` | **프로젝트별 작성** — Figma Node ID, 페이지 구성, 토큰 |
| \`docs/redefine/v5-feedback.md\` | F-log — 누적 피드백 및 규칙 근거 |
| \`docs/redefine/v5-design.md\` | v5 규칙 리팩터 배경 |
| \`docs/tech-debt.md\` | 기술부채 트래커 (Phase 0 차단 체크 대상) |
| \`docs/frontend.md\`, \`docs/react.md\` | 코드 컨벤션 |
| \`docs/setup.md\` | 새 PC 환경 세팅 절차 |
| \`PROGRESS.md\` | 진행 상황 진실의 원천 (비어있음 — Phase 1에서 채움) |

---

## 하네스 구성

\`\`\`
.claude/
├─ agents/
│  ├─ phase1-setup-worker.md    — Phase 1 프로젝트 셋업 전담
│  ├─ page-researcher.md        — Phase 2 페이지 분해 (서브섹션 분할 포함)
│  ├─ section-implementer.md    — Phase 3 섹션 7단계 전담
│  └─ responsive-worker.md      — 반응형/overflow/모바일 폴리시 전담
└─ skills/
   ├─ figma-to-react/           — 메인 오케스트레이터 (진입점)
   ├─ approval-gate-format/     — 승인 대기 표준 보고 포맷
   ├─ dynamic-asset-handling/   — GIF/비디오 정적 프레임 추출
   ├─ responsive-polish/        — 반응형 폴리시 가이드
   └─ visual-regression-gates/  — 8 게이트 측정 절차
\`\`\`

---

## 변경 이력

| 날짜 | 변경 내용 |
|------|---------|
| $(date +%Y-%m-%d) | v5 하네스 템플릿에서 \`$PROJECT_NAME\` 부트스트랩 |
EOF
echo "  [stub] CLAUDE.md"

# --- 6j. PROGRESS.md (빈 템플릿) ---
cat > "$TARGET_DIR/PROGRESS.md" <<EOF
# PROGRESS — $PROJECT_NAME

> 진행 상황 진실의 원천. 섹션/페이지 완료 시 여기에 기록.

## Phase 0 — Bootstrap
- [ ] Figma 파일 key 확정
- [ ] \`docs/figma-project-context.md\` 페이지 테이블 작성
- [ ] \`npm install\` + \`npm run dev\` 동작 확인
- [ ] \`npm run doctor\` 통과

## Phase 1 — 프로젝트 셋업
- [ ] 디자인 토큰 추출 → \`src/styles/tokens.css\`
- [ ] 폰트 등록 → \`src/styles/fonts.css\` + \`public/fonts/\`
- [ ] 에셋 파이프라인 확립

## Phase 2 — 페이지 리서치
- [ ] page-researcher 호출 (페이지 N개)

## Phase 3 — 섹션 구현
(섹션 하나씩 체크)

## Phase 4 — 페이지 통합 + 반응형
- [ ] /페이지1 통합 확인
- [ ] 4 뷰포트 스크린샷

## 시간 측정
- 시작:
- 종료:
- 총 소요:
EOF
echo "  [stub] PROGRESS.md"

# --- 6j.2. docs/tech-debt.md 리셋 (새 프로젝트는 부채 0) ---
cat > "$TARGET_DIR/docs/tech-debt.md" <<'EOF'
# 기술 부채 (Tech Debt) 트래커

> "완화"로 통과한 섹션 + 안티패턴으로 판정된 구현의 진실의 원천.
> 미해결 부채 **3건 이상 시 새 섹션 진행 차단** (`.claude/skills/figma-to-react` Phase 0 체크).

## 상태 정의

| 상태 | 의미 |
|---|---|
| `OPEN` | 미해결. 3건 이상 시 새 섹션 차단 |
| `ACCEPTED` | 엔진 차이 등 구조적 불가피 → 수용 확정, 부채 카운트에서 제외 |
| `RESOLVED` | 리팩터 완료 |

## 작성 규약

섹션 완료 후 `[ACCEPTED_DEBT]` 태그로 커밋할 때 이 파일에 엔트리 추가:

```
### T-NNN <섹션 or 영역 요약>
- **상태**: `OPEN` | `ACCEPTED` | `RESOLVED`
- **파일**: src/components/sections/...
- **증상**: <관찰한 현상>
- **수용 근거**: <왜 완화가 최선이었는지>
- **추후 조치**: <해소 시 해야 할 일>
```

## 현재 부채

_(부트스트랩 직후 — 아직 기록 없음)_
EOF
echo "  [stub] docs/tech-debt.md"

# --- 6j.2.5. PreviewWrapper — Header/Footer 미구현 상태에서도 typecheck 통과하도록 스텁 ---
cat > "$TARGET_DIR/src/routes/PreviewWrapper.tsx" <<'EOF'
import type { ReactNode } from "react";

/**
 * PreviewWrapper — Preview 라우트에 Layout 일부를 선택적으로 마운트.
 *
 * Phase 1 레이아웃(Header/Footer) 구현 후 아래 import를 활성화하여 실 컴포넌트로 교체:
 *   import { Header } from "@/components/layout/Header";
 *   import { Footer } from "@/components/layout/Footer";
 *
 * 용도: baseline이 full-page crop(TopNav 포함)인데 preview는 standalone이라
 * TopNav 영역이 diff로 잡혀 G1이 손해 보는 경우 — Preview에도 동일 chrome 마운트.
 */
export interface PreviewWrapperProps {
  children: ReactNode;
  withHeader?: boolean;
  withFooter?: boolean;
}

export function PreviewWrapper({
  children,
  withHeader: _withHeader = false,
  withFooter: _withFooter = false,
}: PreviewWrapperProps) {
  // STUB — Header/Footer 구현 후 조건부 마운트로 교체
  return <>{children}</>;
}
EOF
echo "  [stub] src/routes/PreviewWrapper.tsx"

# --- 6j.3. ESGPN 레퍼런스 sanitize ---
# docs/figma-workflow.md: ESGPN 절대경로 + PROGRESS.md 템플릿 헤더
sed -i \
  -e "s|C:/Dev/Workspace/esgpn-react-harness|C:/절대/경로/프로젝트|g" \
  -e "s|# ESGPN 프로젝트 진행 상황|# $PROJECT_NAME 프로젝트 진행 상황|g" \
  "$TARGET_DIR/docs/figma-workflow.md"

# docs/setup.md: ESGPN 상수 → 플레이스홀더
sed -i \
  -e "s|docs/setup.md — 새 PC에서 ESGPN 하네스 환경 세팅|docs/setup.md — 새 PC에서 하네스 환경 세팅|g" \
  -e "s|esgpn-react-harness|$PROJECT_NAME|g" \
  -e "s|ESGPN 하네스|하네스|g" \
  -e "s|C:/절대/경로/esgpn-react-harness|C:/절대/경로/프로젝트|g" \
  "$TARGET_DIR/docs/setup.md"

# src/routes/FontCalibration.tsx: ESGPN 샘플 텍스트 → 일반 한글 샘플
sed -i \
  -e "s|2024년 11월 · ESGPN 공식 발표|본문 Caption 14 — 14px Regular|g" \
  -e "s|지속 가능한 내일을 함께|디자인 시스템 보정 샘플|g" \
  -e "s|ESG 실천네트워크는 대학, 학회, 산업체, 지역사회가 함께 지속 가능한 미래를 행동으로 구현합니다.|이곳은 본문 크기와 행간을 확인하는 샘플 텍스트입니다. 한글 렌더링 품질을 점검하세요.|g" \
  "$TARGET_DIR/src/routes/FontCalibration.tsx"

echo "  [sanitize] ESGPN 레퍼런스 제거"

# --- 6k. README.md ---
cat > "$TARGET_DIR/README.md" <<EOF
# $PROJECT_NAME

ESGPN v5 하네스 템플릿에서 부트스트랩한 프로젝트.

## 시작

\`\`\`bash
npm install
npm run dev
\`\`\`

브라우저에서 \`http://localhost:5173\` 확인.

## 다음 단계

1. **\`CLAUDE.md\`** 읽기 — 하네스 사용 규칙
2. **\`docs/figma-project-context.md\`** 채우기 — Figma 파일 key, 페이지 Node ID
3. Claude Code 세션 시작 — "Figma URL 제공하며 Phase 1 킥오프"

## 하네스 도구

\`\`\`bash
npm run doctor              # 환경 점검
npm run lint                # G5 시맨틱 HTML 검사
npm run check:quality       # G5~G8 umbrella
npm run check:antipatterns  # Tailwind 음수 width 등 검출
npm run check:baked-png     # Framelink baked-in 중첩 검출
npm run check:spacing       # Spacing audit (F-011)
\`\`\`

## 디렉토리 구조

- \`.claude/agents/\` — AI 워커 에이전트 (phase1-setup / page-researcher / section-implementer / responsive-worker)
- \`.claude/skills/\` — 오케스트레이터 스킬
- \`scripts/\` — 자동화 도구
- \`docs/\` — 하네스 가이드 + 프로젝트 문서
- \`src/\` — 애플리케이션 코드 (Phase 2 이후 섹션 추가)
- \`tests/visual/\` — Playwright 기반 시각 회귀 인프라

## 라이센스

MIT (또는 프로젝트에 맞게 변경)
EOF
echo "  [stub] README.md"

# --- 6l. tests/visual에 필요한 하위 디렉토리 생성 (gitignore 대상이라 비어서 복사됨) ---
mkdir -p "$TARGET_DIR/tests/visual/captures"
mkdir -p "$TARGET_DIR/tests/visual/diffs"
mkdir -p "$TARGET_DIR/tests/visual/self-test"
mkdir -p "$TARGET_DIR/tests/visual/quality"

# --- 6m. src/components 디렉토리 구조 (빈 폴더 + .gitkeep) ---
mkdir -p "$TARGET_DIR/src/components/layout"
mkdir -p "$TARGET_DIR/src/components/sections"
mkdir -p "$TARGET_DIR/src/components/ui"
mkdir -p "$TARGET_DIR/src/assets"

cat > "$TARGET_DIR/src/components/layout/.gitkeep" <<EOF
Phase 1 이후 Header/Footer/RootLayout 섹션 구현 시 여기 배치
EOF
cat > "$TARGET_DIR/src/components/sections/.gitkeep" <<EOF
Phase 3 섹션 구현 결과물 배치
EOF
cat > "$TARGET_DIR/src/components/ui/.gitkeep" <<EOF
공통 UI 컴포넌트 (여러 섹션에서 재사용되는 카드, divider 등)
EOF
cat > "$TARGET_DIR/src/assets/.gitkeep" <<EOF
Phase 1 이후 Figma 에셋 다운로드 결과 배치
EOF

# figma-screenshots 디렉토리
mkdir -p "$TARGET_DIR/figma-screenshots"
cat > "$TARGET_DIR/figma-screenshots/.gitkeep" <<EOF
Phase 2 baseline + Phase 3 섹션 스크린샷 배치
EOF

echo

# ---------- 완료 ----------
echo "=========================================="
echo "[bootstrap] 완료: $TARGET_DIR"
echo "=========================================="
echo ""
echo "다음 단계:"
echo "  cd $TARGET_DIR"
echo "  npm install"
echo "  npm run dev"
echo ""
echo "그다음:"
echo "  1. CLAUDE.md 읽기"
echo "  2. docs/figma-project-context.md 채우기"
echo "  3. git init && git add . && git commit -m 'chore: bootstrap from harness template'"
echo "  4. Claude Code 세션에서 Figma URL 제공하며 Phase 1 시작"
