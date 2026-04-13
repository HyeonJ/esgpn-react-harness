# Phase 1 프로젝트 셋업 — 완료 기록

> 작성 시점: 2026-04-13
> 플랜: `plan/phase1-setup.md`
> 원칙: 사용자 승인된 기본값 7건 (로컬 Pretendard / Tailwind v4 / `--blackbg` 플래그 / Pillow 허용 / StrictMode Phase1 비활성 / Prettier 미도입 / 빈 변수 발견 시 사용자 문의)

---

## 1. 2.1 — Vite + React + TS + Tailwind v4

### 산출 파일
- `package.json` (scripts: `dev`, `build`, `preview`, `lint`, `typecheck`, `test:visual`)
- `vite.config.ts` (@vitejs/plugin-react + @tailwindcss/vite, alias `@ → src`)
- `tsconfig.json` (strict, paths `@/*`)
- `tsconfig.node.json`
- `index.html` (`<html lang="ko">`)
- `src/main.tsx` (BrowserRouter, StrictMode 비활성)
- `src/App.tsx` (`/` placeholder, `/__calibration`)
- `src/styles/{index,tokens,fonts}.css`
- `src/vite-env.d.ts`
- `.eslintrc.cjs`
- `.gitignore` 갱신 (Playwright 산출물 포함)

### 검증
- `npm install` → 211 패키지, 취약점 0
- `npm run dev` → HTTP 200 at `http://127.0.0.1:5173`, `<html lang="ko">` 응답 확인
- `npm run build` → `dist/` 생성 성공 (CSS 11 KB, JS 160 KB)
- `tsc --noEmit` 에러 0

---

## 2. 2.2 — 디자인 토큰 (Figma → tokens.css + @theme)

### 추출 소스 (Figma MCP `get_variable_defs` 호출 4회 합집합)
| Node | 용도 | 반환 변수 수 |
|------|------|--------------|
| `12:2324` 메인페이지 | 색상/타이포/간격 주 소스 | 38 |
| `299:2094` Footer | 중복 확인 | 6 |
| `52:1379` Header | 중복 확인 | 3 |
| `52:622` About 개요 | 누락 보완 | 28 |
| `91:1903` 자격검정 | 누락 보완 | 40 |

중복 제거 후 **고유 Figma 변수 = 54개**. 전부 `tokens.css`에 기록, Tailwind `@theme`에서 색상/간격/반지름 노출.

### Figma ↔ CSS 매핑 표 (누락 0건)

#### 색상 — Brand
| Figma | tokens.css | Tailwind |
|-------|-----------|----------|
| `Brand/Brand 500` #4fb654 | `--color-brand-500` | `bg-brand-500`, `text-brand-500` |
| `Brand/Brand 700` #0c3b0e | `--color-brand-700` | `bg-brand-700` |

#### 색상 — Gray Scale
| Figma | tokens.css | Tailwind |
|-------|-----------|----------|
| `Gray Scale/Gray 000` #ffffff | `--color-gray-000` | `bg-gray-000` |
| `Gray Scale/Gray 100 (Light BG)` #eff0f0 | `--color-gray-100` | `bg-gray-100` |
| `Gray Scale/Gray 200` #dbe1e0 | `--color-gray-200` | `bg-gray-200` |
| `Gray Scale/Gray 300` #c6cdcc | `--color-gray-300` | `bg-gray-300` |
| `Gray Scale/Gray 400` #afb8b5 | `--color-gray-400` | `bg-gray-400` |
| `Gray Scale/Gray 500` #97a29e | `--color-gray-500` | `bg-gray-500` |
| `Gray Scale/Gray 600` #7c8985 | `--color-gray-600` | `bg-gray-600` |
| `Gray Scale/Gray 700` #5d6a66 | `--color-gray-700` | `bg-gray-700` |
| `Gray Scale/Gray 900 (Dark BG, Text)` #1d2623 | `--color-gray-900` | `bg-gray-900` |

#### 색상 — Status / Opacity
| Figma | tokens.css | Tailwind |
|-------|-----------|----------|
| `Status/Positive_Default` #3f9fff | `--color-status-positive-default` | `text-status-positive` |
| `Status/Badge/Positive_700` #005c33 | `--color-status-badge-positive-700` | `bg-status-badge-positive-700` |
| `Opacity/Black Opacity 100` #0000000a | `--color-black-opacity-100` | `bg-black-a100` |
| `Opacity/Black Opacity 200` #00000014 | `--color-black-opacity-200` | `bg-black-a200` |
| `Opacity/White Opacity 100` #ffffff0a | `--color-white-opacity-100` | `bg-white-a100` |
| `Opacity/White Opacity 200` #ffffff14 | `--color-white-opacity-200` | `bg-white-a200` |
| `Opacity/White Opacity 300` #ffffff24 | `--color-white-opacity-300` | `bg-white-a300` |
| `Opacity/White Opacity 400` #ffffff47 | `--color-white-opacity-400` | `bg-white-a400` |
| `Opacity/White Opacity 600` #ffffff99 | `--color-white-opacity-600` | `bg-white-a600` |

#### Spacing
| Figma | tokens.css | Tailwind |
|-------|-----------|----------|
| `spacing/0` 0 | `--spacing-0: 0px` | `p-0`, `m-0` |
| `spacing/1` 4 | `--spacing-1: 4px` | `p-1` |
| `spacing/2` 8 | `--spacing-2: 8px` | `p-2` |
| `spacing/3` 12 | `--spacing-3: 12px` | `p-3` |
| `spacing/4` 16 | `--spacing-4: 16px` | `p-4` |
| `spacing/5` 20 | `--spacing-5: 20px` | `p-5` |
| `spacing/6` 24 | `--spacing-6: 24px` | `p-6` |
| `spacing/8` 32 | `--spacing-8: 32px` | `p-8` |
| `spacing/10` 40 | `--spacing-10: 40px` | `p-10` |
| `spacing/12` 48 | `--spacing-12: 48px` | `p-12` |
| `spacing/14` 56 | `--spacing-14: 56px` | `p-14` |

#### Border Radius
| Figma | tokens.css | Tailwind |
|-------|-----------|----------|
| `border-radius/none` 0 | `--radius-none` | `rounded-none` |
| `border-radius/lg` 8 | `--radius-lg` | `rounded-lg` |
| `border-radius/3xl` 20 | `--radius-3xl` | `rounded-3xl` |
| `border-radius/full` 9999 | `--radius-full` | `rounded-full` |

#### Typography (font-size/weight/line-height/letter-spacing 4속성 × 24 스타일)
| Figma | tokens.css prefix |
|-------|-------------------|
| `P/display/01 48 B` | `--text-display-01-*` |
| `P/Heading/01 24 B` | `--text-heading-01-*` |
| `Text-4xl/40B` | `--text-4xl-40b-*` |
| `Text-3xl/32B` | `--text-3xl-32b-*` |
| `Text-2xl/24B`, `24SB` | `--text-2xl-24b-*`, `--text-2xl-24sb-*` |
| `Text-xl/20B`, `20SB` | `--text-xl-20b-*`, `--text-xl-20sb-*` |
| `Text-lg/18B`, `18SB`, `18M`, `18R` | `--text-lg-18{b,sb,m,r}-*` |
| `Text-base/16B`, `16SB`, `16M`, `16R` | `--text-base-16{b,sb,m,r}-*` |
| `Text-md/15SB`, `15M`, `15R` | `--text-md-15{sb,m,r}-*` |
| `Text-sm/14SB`, `14M`, `14R` | `--text-sm-14{sb,m,r}-*` |
| `Text-xs/13R` | `--text-xs-13r-*` |
| `Pretendard 14R`, `14B` | `--text-pretendard-14{r,b}-*` |
| `text-3xs/text-sm/14M\nMedium` | `--text-3xs-14m-medium-*` |

### 누락 0건 증명
Figma 반환 54개 고유 변수 ↔ tokens.css 선언 54개 1:1 대응. 위 표 전체 커버.

### 결정/이슈
- Figma 변수명에 줄바꿈(`text-3xs/text-sm/14M\nMedium`) 포함 — kebab-case 변환 후 `--text-3xs-14m-medium`으로 직역.
- 빈 값/모호한 변수 **없음** → 사용자 문의 불필요.

---

## 3. 2.3 — Pretendard + 한국어 폰트 셋업

### 산출
- `public/fonts/PretendardVariable.woff2` (2,057,688 bytes, v1.3.9, jsDelivr npm 미러)
- `src/styles/fonts.css` — `@font-face woff2-variations`, `font-display: swap`, 한글 보정 변수
- `src/routes/FontCalibration.tsx` — display/body/caption 3샘플 고정 페이지
- `tests/visual/capture-calibration.ts` — Playwright 캡처 런너
- `research/font-calibration/h1-after.png`
- `research/font-calibration/body-after.png`
- `research/font-calibration/caption-after.png`

### 검증
- 브라우저 렌더 시 `document.fonts.ready` 대기 후 캡처 → 한글 자연스럽게 렌더됨 (육안 확인: 자소 결합/간격 정상)
- 네트워크 요청에서 woff2 1건만 로드 (Variable 단일 파일)

### 결정/이슈
- Figma vs 브라우저 1px 단위 미세 보정은 **Phase 3 실제 섹션 구현 시 G2 게이트로 반복 확인**. 현 단계에선 Pretendard 로드 + 토큰 연결까지 완료, 보정값은 기본(`--korean-leading-trim: 0em`, `--korean-letter-spacing-adjust: 0em`).

---

## 4. 2.4 — 에셋 파이프라인 (4 스크립트)

### 산출
- `scripts/download-assets.sh` — URL 목록 일괄 다운로드 (curl, 실패 시 exit 1)
- `scripts/verify-assets.sh` — `file --mime-type` 기반 확장자 검증 및 rename
- `scripts/process-assets.py` — Pillow 기반 검정배경 투명화 (**`--blackbg` 플래그 명시 시에만**), GIF/비디오 경고 로그
- `scripts/compare-section.sh` — dev 서버 확인 + tsx tests/visual/run.ts 위임

### 더미 에셋 검증 (`tmp/dummy-assets` 4종)
| 파일 | 예상 | 실제 결과 |
|------|------|----------|
| `logo.svg` | SVG 유지 | OK `image/svg+xml` |
| `icon.png` | PNG 유지 | OK `image/png`, blackbg 처리 안 됨 (귀퉁이 검정 아님) |
| `hero-blackbg.png` | 검정 배경 → 투명 | `--blackbg` 실행 시 귀퉁이 alpha=0, 중앙 alpha=255 |
| `should-be-gif.png` (실제 GIF) | 확장자 rename | RENAME → `should-be-gif.gif` |

`download-assets.sh`는 404 URL(실패 exit 1) + CDN 실제 파일(2 MB 성공 exit 0) 두 경로 모두 검증 통과.

### 결정/이슈
- 검정 배경 투명화는 기본값 7번 원칙에 따라 `--blackbg` 플래그 없으면 **원본 절대 변형 금지**.
- Python 3.13에서 `getdata()` deprecation 경고 발생 (Pillow 14/2027 제거 예정). 실제 섹션 처리 시점에서 Pillow 메이저 업그레이드 이뤄지면 `get_flattened_data`로 교체 예정 — 현재는 동작 우선.

---

## 5. 2.5 — Playwright + pixelmatch 시각 회귀

### 산출
- `tests/visual/capture.ts` — chromium API 기반 단일 URL 캡처 (뷰포트 1920, reducedMotion reduce, 폰트 ready 대기, lazy-load 강제 스크롤)
- `tests/visual/compare.ts` — pixelmatch 래퍼, threshold 0.1, 크기 불일치 시 좌상단 크롭
- `tests/visual/run.ts` — CLI 런너, `--self-test` 옵션 포함
- `tests/visual/fixtures/playwright.config.ts` — 향후 @playwright/test 도입 대비
- `figma-screenshots/.gitkeep` — Phase 2/3 베이스라인 저장소

### 자체 검출 검증 (`npm run test:visual`)
```
[self-test] mismatch diff = 100.00% (기대: > 5%)
[self-test] same     diff = 0.00% (기대: 0%)
[self-test] OK — 의도적 오류 검출 및 동일 이미지 무차이 모두 정상
```

Playwright chromium 1.59.1 설치 완료, `compare-section.sh <섹션명>` 사용 가능 상태.

---

## 6. 2.6 — PROGRESS.md 초기 템플릿

`PROGRESS.md` 프로젝트 루트 생성. Phase 1 항목 4개 전부 체크, 공통 컴포넌트 2개 + 페이지 9개 섹션 헤더 대기 상태로 배치.

---

## 7. 도입된 npm 패키지

| 패키지 | 버전 | 역할 |
|--------|------|------|
| react, react-dom | ^18.3.1 | UI |
| react-router-dom | ^6.28.0 | 라우팅 |
| lucide-react | ^0.468.0 | 아이콘 (Phase 3에서 사용) |
| vite, @vitejs/plugin-react | ^6.0.0, ^4.3.4 | 번들러 |
| tailwindcss, @tailwindcss/vite | ^4.0.0 | Tailwind v4 |
| typescript, @types/* | ^5.7.2 | TS |
| @playwright/test | ^1.49.0 | 스크린샷 + 향후 E2E |
| pixelmatch, pngjs | ^6.0.0, ^7.0.0 | 픽셀 diff |
| tsx | ^4.19.2 | TS 스크립트 실행 |
| eslint, @typescript-eslint/*, eslint-plugin-react-hooks | ^9.15.0 등 | 린트 |

Python: `Pillow` 12.2.0 (process-assets.py)
Playwright 브라우저: chromium 1.59.1 1회 설치

Prettier 미도입 (기본값 6). `sharp` 미도입 (Pillow로 충분).

---

## 8. 전체 Phase 1 완료 조건 달성 요약

| 조건 | 달성 |
|------|------|
| clone 후 `npm install && npm run dev` 성공 | ✓ |
| `tokens.css` + `@theme` Figma 변수 누락 0건 | ✓ (54/54) |
| 한국어 폰트 샘플 3종 스크린샷 저장 | ✓ `research/font-calibration/{h1,body,caption}-after.png` |
| 에셋 파이프라인 4스크립트 더미 통과 | ✓ |
| `npm run test:visual` 의도적 오류 검출 확인 | ✓ (mismatch 100%, same 0%) |
| `PROGRESS.md` 초기 템플릿 | ✓ |
| `research/project-setup.md` 결과 기록 | ✓ (이 파일) |

**Phase 2 진입 가능.**

---

## 9. 발견한 이슈 / 후속 조치

1. **Pillow `getdata` deprecation** — Pillow 14(2027-10) 제거. 실제 섹션 에셋 처리 발생 시 `get_flattened_data` 또는 numpy 벡터화로 전환 검토.
2. **폰트 1px 보정값 확정 지연** — Phase 3에서 Header/Footer 같은 한글 섹션 구현 시 Figma `get_screenshot` 베이스라인과의 G2 비교 결과로 `--korean-leading-trim`/`--korean-letter-spacing-adjust` 확정.
3. **Figma 변수명 줄바꿈 포함(`text-3xs/text-sm/14M\nMedium`)** — 디자이너가 정리해 주면 CSS 변수명 단순화 권장 (`--text-3xs-14m`).
