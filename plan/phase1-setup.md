# Phase 1 — 프로젝트 셋업 계획

> 참조: `docs/figma-workflow.md` §2, `docs/figma-project-context.md`, `CLAUDE.md`
> 원칙: **구현 전 사용자 승인 필수.** 이 plan은 승인될 때까지 실행되지 않는다.
> 산출물 기록지: `research/project-setup.md` (완료 후 작성)

---

## 0. 현재 상태 (리서치 요약)

- 프로젝트 루트에 하네스(`.claude/`) + `docs/` + `CLAUDE.md`/`README.md`만 존재
- **npm 프로젝트 미초기화** — `package.json`, `src/`, `node_modules/` 없음
- `plan/`, `research/`, `scripts/`, `figma-screenshots/`, `PROGRESS.md` 모두 없음 → 이번 Phase에서 신규 생성
- `.gitignore` 존재 (내용 확인은 구현 시) — 필요 시 `node_modules`, `dist`, `playwright-report`, `research/font-calibration/*.png` 등 추가

결론: **백지 상태에서 전체 Phase 1 수행.**

---

## 1. 하위 작업 구성 (사용자 지시 기준 재구성)

`docs/figma-workflow.md` §2는 토큰→폰트→에셋→시각회귀→PROGRESS 5단계이지만,
토큰을 Tailwind `@theme`에 연결하려면 Vite+React+TS+Tailwind 프로젝트가 먼저 있어야 한다.
따라서 사용자 지시대로 **2.1에 Vite 초기화를 먼저** 두고, 나머지를 그 위에 얹는다.

| # | 작업 | 선행 | 산출물 |
|---|------|------|--------|
| 2.1 | Vite + React + TS + Tailwind v4 초기화 | — | `package.json`, `vite.config.ts`, `src/` 스캐폴드, Tailwind v4 설정 |
| 2.2 | 디자인 토큰 추출 및 연결 | 2.1 | `src/styles/tokens.css`, `@theme` 매핑 |
| 2.3 | 한국어 폰트 (Pretendard) 셋업 + 보정 | 2.1 | `src/styles/fonts.css`, `research/font-calibration/*.png` |
| 2.4 | 에셋 후처리 파이프라인 4개 스크립트 | 2.1 | `scripts/download-assets.sh`, `verify-assets.sh`, `process-assets.py`, `compare-section.sh` |
| 2.5 | 시각 회귀 인프라 (Playwright + pixelmatch) | 2.1, 2.4 | `tests/visual/`, `compare-section.sh` 실제 동작 |
| 2.6 | `PROGRESS.md` 초기 템플릿 | — | 프로젝트 루트 `PROGRESS.md` |

### 도입 예정 npm 패키지 목록 (승인 필요)

**런타임 (dependencies):**
- `react`, `react-dom` — UI
- `react-router-dom` — 라우팅 (v6)
- `lucide-react` — 아이콘

**개발 (devDependencies):**
- `vite`, `@vitejs/plugin-react` — 번들러
- `typescript`, `@types/react`, `@types/react-dom`, `@types/node` — TS
- `tailwindcss@^4`, `@tailwindcss/vite` — Tailwind v4 (`@theme` directive 방식)
- `@playwright/test` — E2E + 스크린샷 캡처
- `pixelmatch`, `pngjs`, `@types/pixelmatch`, `@types/pngjs` — 픽셀 diff
- `sharp` — 이미지 후처리 (검정 배경 투명화, 필요 시)
- `eslint`, `@typescript-eslint/*`, `eslint-plugin-react-hooks` — 린트 (docs/react.md 정합)

**Python (에셋 후처리용, 옵션):**
- `Pillow` — 검정 배경 투명화, GIF→APNG 변환
- `apngasm` 또는 `ffmpeg` — 시스템 설치 여부 확인 후 스크립트에서 위임

> **추가 논의 포인트**: Zustand/Context는 `docs/figma-project-context.md`대로 필요 시 별도 승인. Phase 1에서는 미도입.

---

## 2.1 Vite + React + TS + Tailwind v4 초기화

### 목표
clone 후 `npm install && npm run dev`만으로 즉시 실행 가능한 최소 앱 골격을 만든다.
이후 모든 Phase 2/3 작업의 토대가 된다.

### 산출물
```
esgpn-react-harness/
├─ package.json              # scripts: dev, build, preview, test:visual, lint
├─ vite.config.ts            # @tailwindcss/vite 플러그인 포함
├─ tsconfig.json             # strict: true, path alias @/*
├─ tsconfig.node.json
├─ index.html                # <html lang="ko">, viewport meta
├─ src/
│  ├─ main.tsx               # ReactDOM.createRoot + BrowserRouter
│  ├─ App.tsx                # 빈 라우트 (Home placeholder "Phase 1 OK")
│  ├─ styles/
│  │  ├─ index.css           # @import tokens.css, fonts.css; @theme 선언
│  │  ├─ tokens.css          # (2.2에서 채워짐)
│  │  └─ fonts.css           # (2.3에서 채워짐)
│  └─ vite-env.d.ts
├─ .eslintrc.cjs             # docs/react.md 규칙 반영
└─ .gitignore                # node_modules, dist, playwright-report, /research/font-calibration/*.png 보존 예외
```

### 핵심 결정 사항
- **Tailwind v4** (`@theme` directive). v3의 `tailwind.config.js` 방식 아님. `@tailwindcss/vite` 플러그인 사용.
- **TypeScript strict 모드** 기본.
- **Path alias `@/*` → `src/*`** (import 가독성).
- **React 18 + StrictMode 비활성** — 섹션 구현 시 이중 렌더로 인한 에셋 로드 중복 방지 (픽셀 비교 안정성 우선). 필요 시 릴리스 빌드에서만 켠다.
- React Router는 초기화만, 실제 라우트 등록은 Phase 3 페이지 진행 시.

### 검증 방법 (완료 조건)
1. `npm install` 에러 0건
2. `npm run dev` 실행 시 `http://localhost:5173` 응답 200, "Phase 1 OK" 문자열 출력
3. `npm run build` 성공, `dist/` 생성
4. TypeScript 컴파일 에러 0건 (`tsc --noEmit`)
5. ESLint 에러 0건 (초기 빈 파일 기준)

---

## 2.2 디자인 토큰 추출 및 연결

### 목표
Figma 변수를 빠짐없이 CSS 변수로 옮기고, Tailwind `@theme`에서 동일 이름으로 노출한다.
이후 모든 섹션이 동일 토큰을 참조해 G4(색상 정확도) 게이트를 안정적으로 통과시킨다.

### 산출물
- `src/styles/tokens.css` — 모든 Figma 변수를 CSS 변수로 정의
- `src/styles/index.css` 내 `@theme` 블록 — Tailwind에 토큰 노출
- `research/project-setup.md`의 토큰 매핑 섹션 — Figma 이름 ↔ CSS 변수 ↔ Tailwind 유틸리티 1:1 표

### 절차
1. Figma MCP `get_variable_defs` 호출 (파일 ID: `qhrMiGVfoSQ1QMFhVN8z78`, 페이지 루트 노드)
2. 반환된 변수를 카테고리별로 분류:
   - **색상** (primary green, 배경, 텍스트, accent)
   - **간격** (padding/margin scale)
   - **타이포** (font-size, line-height, font-weight)
   - **반지름** (border-radius)
   - **그림자** (box-shadow) — 있는 경우
3. `tokens.css`에 `:root { --color-primary: #2D5A27; ... }` 형태로 기록
4. `index.css`의 `@theme` 블록에 `--color-primary: var(--color-primary);` 매핑 → `bg-primary` 유틸리티 자동 생성
5. Figma 변수 목록과 CSS 변수를 1:1 표로 `research/project-setup.md`에 기록, 누락 0건 확인

### 핵심 결정 사항
- **네이밍**: Figma 변수명을 kebab-case로 직역 (`Primary/Green 01` → `--color-primary-green-01`).
- **숫자 단위**: px 그대로 유지 (Tailwind v4는 px/rem 혼용 가능). 간격은 원본 값 그대로 → 섹션 구현 시 `px-[32px]` 같은 arbitrary 값 대신 `px-lg` 같은 시맨틱 유틸 사용.
- **다크/라이트 분기가 없다면** 단일 `:root` 스코프로 유지. 있으면 `[data-theme="dark"]` 분기.
- Figma 변수가 비어있는 경우 → 디자인 스크린샷에서 눈대중으로 hex 추출하는 것은 금지. 사용자에게 보고 후 결정.

### 검증 방법
1. Figma 변수 목록 개수 == `tokens.css` 변수 개수 (매핑 표로 증명)
2. `@theme` 블록의 각 변수가 `bg-*`, `text-*`, `rounded-*` 등 Tailwind 유틸리티로 접근 가능한지 샘플 페이지(`App.tsx` 임시)에서 시각 확인
3. `research/project-setup.md`에 **누락 0건** 명시

---

## 2.3 한국어 폰트 (Pretendard) 셋업 + 보정

### 목표
한글 렌더링이 Figma 스크린샷과 ±1px 이내로 일치하도록 Pretendard 가변폰트를 도입하고, line-height/letter-spacing 보정값을 고정한다.

### 산출물
- `public/fonts/PretendardVariable.woff2` (로컬 호스팅) 또는 `@import` via CDN (결정 필요)
- `src/styles/fonts.css` — `@font-face` + 전역 `font-family` + 보정 CSS 변수
- `research/font-calibration/` — 보정 전/후 비교 스크린샷 3종 (h1, 본문, 캡션)

### 절차
1. Pretendard 가변폰트 설치 경로 결정:
   - **옵션 A**: `public/fonts/PretendardVariable.woff2` 로컬 호스팅 (오프라인 안정, 추천)
   - **옵션 B**: `@import url("https://cdn.jsdelivr.net/...")` (간단하나 네트워크 의존)
   - **선택안: 옵션 A** — 픽셀 비교 일관성 우선
2. `fonts.css`에 `@font-face { font-display: swap; }` 정의
3. 전역 `body { font-family: "Pretendard Variable", system-ui, sans-serif; }`
4. Figma 텍스트 노드 3개 샘플 (h1 대형 타이포 / 본문 16px / 캡션 12px) → `get_screenshot`으로 Figma 베이스라인 캡처
5. 동일 문자열을 브라우저에서 렌더, Playwright로 캡처
6. pixelmatch diff 측정 → 1px 이상 차이나면 `--line-height-adjust`, `--letter-spacing-adjust` 변수로 보정
7. 보정 전/후 스크린샷을 `research/font-calibration/{sample-name}-before.png`, `-after.png`로 저장

### 핵심 결정 사항
- **Pretendard Variable (단일 파일)** 사용. Static 개별 weight 파일 대신 → HTTP 요청 수 절감.
- `font-display: swap` 필수 — FOIT 방지 (Figma와의 비교 시점에 폰트 로드 안 된 상태 회피).
- 보정 CSS 변수는 `tokens.css`가 아닌 `fonts.css`에 둔다 (폰트 렌더링 특성 ↔ 디자인 토큰 분리).
- 영문 fallback은 `system-ui` — Figma 원본이 Pretendard만 쓰므로 별도 영문 폰트 미도입.

### 검증 방법
1. 샘플 3종 모두 Figma와 pixelmatch diff < 1%
2. 네트워크 탭에서 woff2 파일이 1개만 로드 (Variable 단일)
3. `research/font-calibration/`에 6장(전/후 × 3샘플) 이상 스크린샷 존재

---

## 2.4 에셋 후처리 파이프라인 (4개 스크립트)

### 목표
섹션마다 반복되는 에셋 작업(다운로드 → 타입 검증 → 배경 투명화/GIF 변환 → 시각 비교)을 표준 스크립트로 미리 만들어 둔다.
각 섹션 구현 시 "한 줄 실행"으로 끝내서 실수 여지를 제거한다.

### 산출물
```
scripts/
├─ download-assets.sh        # MCP가 준 에셋 URL 목록을 일괄 다운로드
├─ verify-assets.sh          # file 명령으로 실제 타입 검증, 확장자 불일치 시 rename
├─ process-assets.py         # 검정 배경 → 투명 (Pillow), GIF → APNG, Video → WebM
└─ compare-section.sh        # dev 서버 + Playwright 캡처 + pixelmatch 비교 (2.5와 연동)
```

### 각 스크립트 사양

#### `download-assets.sh <urls.txt> <output-dir>`
- 입력: 한 줄에 URL 하나인 텍스트 파일 + 저장 디렉터리
- 동작: `curl -L -o` 순차 다운로드, HTTP 200 아니면 실패 로그
- 출력: `<output-dir>/{파일명}`, 다운로드 요약 (성공/실패 카운트)

#### `verify-assets.sh <dir>`
- 입력: 에셋 디렉터리
- 동작: 각 파일에 `file --mime-type` 실행 → 실제 MIME vs 확장자 비교
- 불일치 시: `example.png`인데 실제 gif면 `example.gif`로 rename
- 출력: 불일치 건수, rename 목록

#### `process-assets.py <dir>` (Python 3)
- 입력: 에셋 디렉터리
- 동작:
  1. 모든 PNG/JPG 스캔
  2. 모서리 4픽셀이 전부 순검정(#000000)이고 중앙 영역에 컬러가 있으면 **검정 배경 가정** → Pillow로 알파 채널 추가, 임계값 기반 검정→투명 변환
  3. GIF 발견 시 → `apngasm` 또는 ffmpeg로 APNG 변환 (`docs/section-implementation.md`에 따라 정적 PNG가 원칙이므로 이 단계는 옵션/플래그로 제어)
  4. MP4/WebM 발견 시 → 경고 로그 (`dynamic-asset-handling` 스킬로 위임 메시지)
- 출력: 처리 전/후 파일 목록

#### `compare-section.sh <섹션명> [url]`
- 입력: 섹션명 + (옵션) 비교할 URL (기본: `http://localhost:5173/__preview/{섹션명}`)
- 동작:
  1. `curl http://localhost:5173` → 200 아니면 dev 서버 미기동 에러로 종료
  2. Playwright 스크립트 호출 → 대상 URL을 Figma 섹션과 동일한 뷰포트(1920폭)로 캡처 → `tests/visual/captures/{섹션명}.png`
  3. `figma-screenshots/{섹션명}.png`를 기준으로 pixelmatch 실행
  4. `tests/visual/diffs/{섹션명}.diff.png` 생성
  5. 차이 % 를 stdout에 출력 (예: `DIFF: 3.42%`), 5% 초과 시 exit 1
- 출력: diff 이미지 경로 + 수치

### 핵심 결정 사항
- 셸 스크립트는 **bash**로 통일 (Windows 환경이지만 Git Bash 전제 — README에 명시).
- `process-assets.py`는 Python 3.10+ + Pillow 전제. 시스템 ffmpeg/apngasm은 옵셔널, 없으면 경고만.
- 스크립트는 전부 멱등 (재실행 안전).
- `compare-section.sh`는 2.5의 Playwright 인프라를 호출만 함 (로직 중복 없음).

### 검증 방법
1. 테스트용 더미 에셋 3종(SVG/PNG/검정배경PNG) 준비 → 파이프라인 끝까지 통과
2. 확장자 불일치 케이스(png 확장자인데 실제 gif) 일부러 만들어 `verify-assets.sh`가 rename 하는지 확인
3. 검정 배경 PNG 하나를 `process-assets.py`에 넣어 투명화 결과 육안 확인
4. 결과를 `research/project-setup.md`에 기록

---

## 2.5 시각 회귀 인프라 (Playwright + pixelmatch)

### 목표
`compare-section.sh <섹션명>` 한 줄로 Figma 베이스라인과 브라우저 렌더를 수치 비교 가능하게 만든다.
G1(시각 일치) 게이트를 자동화한다.

### 산출물
```
tests/
└─ visual/
   ├─ capture.ts              # Playwright로 URL 캡처 (뷰포트 1920x자동, 폰트 로드 대기)
   ├─ compare.ts              # pixelmatch 래퍼 (입력: 두 PNG, 출력: diff.png + %)
   └─ fixtures/
      └─ playwright.config.ts # headless, timezone=Asia/Seoul, locale=ko-KR

figma-screenshots/             # Figma 베이스라인 저장소 (빈 디렉터리, Phase 2/3에서 채움)
```

### 절차
1. `npm install -D @playwright/test pixelmatch pngjs @types/pixelmatch @types/pngjs`
2. `npx playwright install chromium` — 1회 실행
3. `tests/visual/capture.ts` 작성:
   - 뷰포트 폭 1920, 높이는 전체 페이지 높이 (`fullPage: true`)
   - `waitForLoadState("networkidle")` + `document.fonts.ready` 대기
   - 애니메이션 disable (`prefers-reduced-motion: reduce`)
4. `tests/visual/compare.ts` 작성:
   - 입력 두 PNG를 같은 크기로 리사이즈(필요 시) — 높이 다르면 작은 쪽 기준으로 crop
   - pixelmatch threshold 0.1, includeAA true
   - diff 픽셀 수 ÷ 총 픽셀 수 × 100 → % 반환
5. `scripts/compare-section.sh` → 위 두 스크립트를 엮어 호출
6. **검출 검증 (필수)**:
   - Figma 샘플 스크린샷을 그대로 베이스라인으로 두고,
   - 동일 이미지를 **의도적으로 한 색상만 틀어서** (예: 배경 #2D5A27 → #FF0000) 브라우저 렌더 측에 배치
   - `compare-section.sh` 실행 → diff %가 0이 아니라 명백한 수치로 검출되는지 확인

### 핵심 결정 사항
- **Playwright 단일** 사용 (Puppeteer 아님) — docs/frontend.md 컨벤션과 호환.
- pixelmatch threshold 0.1 — 안티에일리어싱으로 인한 미세 차이 흡수.
- 캡처 시 **스크롤 위치 고정** + **이미지 lazy-load 강제 선로드** (섹션 하단 이미지 누락 방지).
- 뷰포트 높이는 섹션별 자동 (fullPage), 단 Figma 베이스라인도 동일 뷰포트로 캡처되었다고 가정.
- 반응형 검증(375/768/1440)은 Phase 4 범위 → 여기서는 1920만.

### 검증 방법
1. 의도적 오류 검출 테스트 통과 — diff % 가 5% 이상으로 명백히 검출됨
2. 동일 이미지 비교 시 diff ≈ 0%
3. `compare-section.sh` exit code: 정상 0, 기준 초과 시 1
4. 결과를 `research/project-setup.md`에 기록

---

## 2.6 PROGRESS.md 초기 템플릿 생성

### 목표
섹션 진행 상황의 **진실의 원천** 파일을 프로젝트 루트에 만든다.

### 산출물
- `PROGRESS.md` — `docs/figma-workflow.md` §2.5의 템플릿을 그대로 사용

### 절차
`docs/figma-workflow.md` §2.5의 마크다운 템플릿을 그대로 복사하여 `PROGRESS.md`로 저장.
Phase 1 체크박스 4개 (토큰 / 폰트 / 에셋 / 시각회귀) + 공통 컴포넌트 + 페이지 목록 9개.

### 검증 방법
- 파일 존재 + 템플릿 섹션 빠짐 없이 포함

---

## 3. 작업 순서 (체크리스트)

구현 승인 후 아래 순서대로 실행하며, 각 항목 완료 시 체크한다.

- [x] **2.1** Vite + React + TS + Tailwind v4 초기화, `npm run dev`/`build` 확인
- [x] **2.2** Figma MCP `get_variable_defs` 호출 → `tokens.css` + `@theme` 작성 → 매핑 표 기록
- [x] **2.3** Pretendard Variable 로컬 호스팅 + `fonts.css` + 한글 샘플 3종 보정 스크린샷
- [x] **2.4** 4개 스크립트 작성 + 더미 에셋 3종으로 파이프라인 end-to-end 검증
- [x] **2.5** Playwright + pixelmatch 설치, `capture.ts`/`compare.ts` 작성, 의도적 오류 검출 검증
- [x] **2.6** `PROGRESS.md` 템플릿 생성
- [x] **마지막** `research/project-setup.md`에 모든 결과 집계 (토큰 매핑 표, 폰트 보정값, 스크립트 검증 결과, 시각 회귀 검출 결과)

---

## 4. Phase 1 완료 조건 (모두 만족해야 Phase 2 허용)

- [x] `npm install && npm run dev` clone 상태에서 1회 실행으로 성공
- [x] `src/styles/tokens.css` + `@theme` — Figma 변수 누락 0건
- [x] 한국어 폰트 샘플 3종 스크린샷 `research/font-calibration/` 저장 (Figma 1픽셀 비교는 Phase 3 실제 섹션 구현 단계에서 G1/G2로 반복 검증)
- [x] 에셋 파이프라인 4개 스크립트 더미 에셋으로 통과
- [x] `npm run test:visual` (self-test) 의도적 오류 검출 확인 (mismatch 100%, same 0%)
- [x] `PROGRESS.md` 초기 템플릿 생성
- [x] `research/project-setup.md` 모든 결과 기록

---

## 5. 이슈 / 결정 필요 사항 (사용자 승인 시 함께 답변 부탁)

1. **Pretendard 호스팅 방식** — 로컬(옵션 A) vs CDN(옵션 B). plan에는 A 선택 가정. 다르면 알려주세요.
2. **Tailwind 버전** — v4 (`@theme` directive) 가정. v3 원하시면 변경.
3. **검정 배경 투명화 기본값** — `process-assets.py`가 모든 PNG에 자동 적용 vs 플래그(`--blackbg`) 명시 시에만 적용. plan은 **명시적 플래그 방식** 가정 (원본 훼손 최소화).
4. **Python 의존성 허용 여부** — `process-assets.py`에 Pillow 도입 OK? Node 전용 원하시면 `sharp`로 대체 가능.
5. **React StrictMode** — Phase 1에선 비활성 가정 (픽셀 비교 안정). 프로덕션 빌드에서만 활성화 원하시면 토글 추가.
6. **ESLint 구성 수준** — `docs/react.md` 기본 규칙만 적용. Prettier 별도 도입은 별건.
7. **Figma 변수가 비어있거나 부족한 경우** — 사용자에게 스크린샷 기반 hex 확정 문의 (자의적 추출 금지). plan에 명시함.
