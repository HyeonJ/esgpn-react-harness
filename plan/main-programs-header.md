# main-programs-header — 구현 계획

연관 리서치: `research/main-programs-header.md`
baseline: `figma-screenshots/main-programs-header.png` (1416×261, Framelink pngScale 1)

---

## 1. 핵심 결정 사항 (D1~D6)

| # | 결정 | 사유 |
|---|------|------|
| D1 | **DOM 그대로 재구성**, 래스터 0 | design_context = 순수 텍스트 3스택. 이미지/벡터/아이콘 전무. |
| D2 | **탭 UI 없음** 확정 | 메타에 `252:993` 없음, baseline 육안에도 탭 없음. 사전 리스크는 무효 (research §2). |
| D3 | **로컬 컴포넌트** `MainProgramsHeader.tsx` 단일 파일 | 내부 구조 단순(3 `<p>`). 공통 `SectionHeader` 승격은 3번째 등장 시점(다음 페이지 헤더)에 진행. |
| D4 | **letter-spacing**: design_context px 절대값 그대로 (`-0.07px`, `-0.16px`, `0`) | percent 단위 오해 방지. CLAUDE.md §규칙(반올림 금지) 준수. |
| D5 | **격리 측정 라우트** `/__preview/main-programs-header` | main-stats 패턴 일치. 1416×261 단독 렌더 → clip 불필요. |
| D6 | **섹션 배경**: 투명(`bg-transparent`) | 노드에 fill 없음. Programs 영역 공통 BG(흰색 or 회색)는 상위 컨테이너 결정. 현재 `/` 페이지의 직전 섹션이 `MainStats`(white) → 현재도 white 페이지 BG 상에 얹힘. `bg-transparent` 유지가 안전. |

---

## 2. 컴포넌트 구조

```
src/
├─ components/
│  └─ sections/
│     └─ MainProgramsHeader/
│        ├─ MainProgramsHeader.tsx   ← 섹션 루트 (1416×261, flex-col gap-24 py-24)
│        └─ index.ts                  ← re-export
└─ routes/
   └─ MainProgramsHeaderPreview.tsx  ← /__preview/main-programs-header (단독 1416×261)
```

> 에셋 폴더 **불필요** (래스터 0). `src/assets/main-programs-header/` **생성 안 함**.

### Props 시그니처
```ts
// MainProgramsHeader — props 없음 (텍스트 고정, Figma 기준)
```

---

## 3. Tailwind/CSS 전략

### 섹션 루트
```tsx
<section
  className="relative mx-auto w-[1416px] h-[261px] flex flex-col items-center text-center"
  style={{ gap: 24, paddingTop: 24, paddingBottom: 24 }}
  aria-label="ESGPN 핵심 프로그램 소개"
  data-node-id="252:987"
>
```

- `mx-auto` + 고정 1416 폭 → `/` 페이지 내에서 중앙정렬 (페이지 컨테이너가 1920 또는 가변).
- **단독 preview route**에서는 `<div className="w-[1416px] h-[261px] mx-auto"><MainProgramsHeader/></div>` 래퍼로 baseline과 1:1 비교.
- `h-[261px]` 명시하여 flex 자식 합산 결과(24+141+24+48+24=261)와 일치 검증.
- `overflow-hidden` 미사용 (텍스트 잘림 방지, h 정확히 맞음).

### 252:988 헤딩 블록
```tsx
<div
  className="flex flex-col items-center justify-center w-full"
  style={{ gap: 8 }}
  data-node-id="252:988"
>
  {/* eyebrow 252:989 */}
  <p
    className="font-['Pretendard_Variable'] font-normal whitespace-nowrap"
    style={{
      fontSize: 14,
      lineHeight: 1.5,
      letterSpacing: "-0.07px",
      color: "var(--color-gray-500)",
    }}
    data-node-id="252:989"
  >
    ESGPN 핵심 프로그램
  </p>

  {/* title 252:990 */}
  <h2
    className="font-['Pretendard_Variable'] font-bold"
    style={{
      fontSize: 48,
      lineHeight: "56px",
      letterSpacing: "0px",
      color: "var(--color-gray-900)",
    }}
    data-node-id="252:990"
  >
    ESG를 배우고, 실천하고,
    <br aria-hidden="true" />
    성장하는 여정
  </h2>
</div>
```

### 252:991 본문
```tsx
<p
  className="font-['Pretendard_Variable'] font-normal w-full"
  style={{
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: "-0.16px",
    color: "var(--color-gray-900)",
  }}
  data-node-id="252:991"
>
  이론 교육부터 자격 인증, 실제 프로젝트 참여까지, ESG를 실천할 수 있는
  <br aria-hidden="true" />
  핵심 역량을 기르고 사회적 가치를 함께 창출해 나갑니다.
</p>
```

### 폰트 패밀리
- 프로젝트 일관성: `font-['Pretendard_Variable']` (main-hero/intro/stats 선례).
- font-weight은 className의 `font-normal`/`font-bold` 로 제어 (Variable 폰트의 axis).

### 색상 토큰
- `var(--color-gray-500)` = `#97a29e` (기존)
- `var(--color-gray-900)` = `#1d2623` (기존)

---

## 4. Preview 라우트

```tsx
// src/routes/MainProgramsHeaderPreview.tsx
import { MainProgramsHeader } from "@/components/sections/MainProgramsHeader";

/**
 * __preview/main-programs-header — G1 픽셀 비교용 격리 라우트.
 * 1416×261 단독 렌더 → baseline(figma-screenshots/main-programs-header.png) 1:1.
 * clip 파라미터 불필요.
 */
export function MainProgramsHeaderPreview() {
  return (
    <div className="w-[1416px] min-h-[261px] mx-auto">
      <MainProgramsHeader />
    </div>
  );
}
```

### App.tsx 패치
```tsx
// import 추가
import { MainProgramsHeaderPreview } from "@/routes/MainProgramsHeaderPreview";
import { MainProgramsHeader } from "@/components/sections/MainProgramsHeader";

// 격리 라우트 추가
<Route path="/__preview/main-programs-header" element={<MainProgramsHeaderPreview />} />

// `/` 페이지에 마운트 (MainStats 다음, MainIntro-MainStats와 같은 계층)
<Route element={<RootLayout />}>
  <Route
    path="/"
    element={
      <>
        <MainHero />
        <MainIntro />
        <MainStats />
        <MainProgramsHeader />  {/* 추가 */}
      </>
    }
  />
</Route>
```

---

## 5. 에셋 파이프라인

### 5.1 다운로드 (단계 3)
**스킵.** 래스터/SVG 0개.

### 5.2 검증
- `src/assets/main-programs-header/` 생성 X
- `verify-assets.sh` 불필요

---

## 6. 4 게이트 예상 측정

### G1 시각 일치 (pixelmatch diff < 5%)
- 측정 명령: `scripts/compare-section.sh main-programs-header`
  - 기본 URL: `http://127.0.0.1:5173/__preview/main-programs-header`
  - baseline: `figma-screenshots/main-programs-header.png` (1416×261)
  - **clip 불필요** (preview route가 단독 1416×261 렌더)
- **예상 diff**: 0.5~1.5% (텍스트 3줄만, anti-alias 미세 오차만 산재)

### G2 치수 정확도 (font ±1px, 기타 ±2px)
측정 포인트 (Playwright `getBoundingClientRect` + `getComputedStyle`):
- Section (252:987) bbox: 1416 × 261
- eyebrow (252:989) fs/fw/lh/ls/color: 14 / 400 / 21px(=14×1.5) / -0.07px / rgb(151,162,158)
- title (252:990) fs/fw/lh/color: 48 / 700 / 56px / rgb(29,38,35)
- body (252:991) fs/fw/lh/ls/color: 16 / 400 / 24px(=16×1.5) / -0.16px / rgb(29,38,35)
- eyebrow bbox w≈124, h≈21
- title bbox w=1416, h=112
- body bbox w=1416, h=48
- 루트 gap(252:988→252:991): 24px (252:988 bottom + 24 = 252:991 top)
- 252:988 내부 gap(252:989→252:990): 8px

### G3 에셋 무결성
- `document.images.length === 0` → 자동 PASS (vacuous truth).
- 측정 스크립트에서 이 조건을 명시 체크.

### G4 색상 정확도
- Section bg: transparent (페이지 BG 흰색 상)
- eyebrow color: `rgb(151, 162, 158)` (= #97a29e)
- title color: `rgb(29, 38, 35)` (= #1d2623)
- body color: `rgb(29, 38, 35)` (= #1d2623)

---

## 7. 측정 스크립트

`tests/visual/measure-main-programs-header.ts` 신규 (main-stats 패턴 참고):
```ts
// page.evaluate 인자는 순수 JS (TS 타입 단언 금지, CLAUDE.md 규칙)
```

측정 항목: section bbox / 3개 텍스트 노드 각각 fs/fw/lh/ls/color/bbox.

---

## 8. 리스크 대응 (research §8 → 액션)

| # | 액션 |
|---|------|
| R1 | 탭 없음 확정. 오케스트레이터 보고. 본 plan에서 탭 관련 구현 **0**. |
| R2 | 252:990/252:991은 `<br aria-hidden="true" />` 고정 줄바꿈. `whitespace` 기본(normal) + `text-center`. 단계 5 육안 점검에서 브라우저 줄바꿈이 Figma와 동일한지 확인. |
| R3 | letter-spacing px 절대값 명시 (style prop 문자열). `tracking-[...]` Tailwind arbitrary 대신 style prop 사용 — 기존 main-stats 패턴 일치. |
| R4 | preview route 단독 1416 렌더로 해결. 페이지 통합 시 Programs 영역 컨테이너는 **이 섹션 범위 외**. |
| R5 | compare-section.sh 기본 URL 사용. clip 파라미터 불필요. |
| R6 | 루트 `h-[261px]` 명시 + `py-[24px]`로 상하 여백 확보. flex col 자식 합 정확히 261px. |
| R7 | 루트 `items-center` + 자식 `w-full text-center` (title/body). eyebrow는 `whitespace-nowrap`으로 자체 폭 유지. |

---

## 9. 사용자 승인 필요 항목

| 항목 | 옵션 | 권장 |
|------|------|------|
| 섹션 배경 | (a) 투명 (기본) (b) white 명시 | **(a) 투명** — Programs 영역 전체 BG는 후속 Cards 섹션 설계 시 일괄 결정. 지금은 transparent 유지가 리스크 낮음. |
| SectionHeader 공통화 | (a) 지금 `src/components/ui/SectionHeader.tsx` 신설 (b) 로컬 MainProgramsHeader만 구현 | **(b)** — Rule of Three, 3번째 사용 시점에 승격. 경진대회/자격검정 페이지 헤더 스펙 미확인. |
| preview 캡처 방식 | (a) 단독 1416×261 (clip 없음) (b) `/` 풀폭 + clip (252,3240,1416,261) | **(a)** — 기존 main-stats·main-intro와 동일 패턴. 섹션 독립 검증. |
| 신규 공통 컴포넌트 | 없음 | — |
| 신규 npm 패키지 | 없음 | — |
| 신규 CSS 토큰 | 없음 | — |

---

## 10. 작업 순서 (승인 후)

1. **단계 3** — **스킵** (래스터 0)
2. **단계 4 구현** (~15분)
   - `MainProgramsHeader.tsx` + `index.ts`
   - `routes/MainProgramsHeaderPreview.tsx`
   - `App.tsx` 패치 (import + 격리 라우트 + `/` 페이지 마운트)
   - 빌드 / 타입체크 / 린트
3. **단계 5 측정** (~5분)
   - dev server
   - `scripts/compare-section.sh main-programs-header`
   - `tests/visual/measure-main-programs-header.ts` 작성 (page.evaluate 순수 JS)
   - G1~G4 + **육안 semantic 검증** (baseline/capture/diff 3종 Read)
   - §11 측정 섹션에 기록
4. **단계 6 수정 (필요 시, 최대 3회)**
5. **단계 7 커밋**: `feat: main-programs-header 섹션 구현 (diff X.XX%)`
   - PROGRESS.md 체크 + diff %

---

## 11. 측정 결과

### 회차 1 (2026-04-13)

**초기 실행 (clip 없음)**
- `bash scripts/compare-section.sh main-programs-header` → **DIFF 9.21%** (FAIL)
- 원인: run.ts 기본값은 `fullPage:true, viewportWidth:1920`. 섹션이 1416 mx-auto 중앙정렬이라 1920×1080 풀페이지 캡처되어 baseline 1416×261과 크기 불일치.
- 해결: `--clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 261`로 섹션 영역만 캡처 (1920 뷰포트에서 섹션 x=(1920-1416)/2=252).

**재실행 (clip 적용)**
```
npx tsx tests/visual/run.ts --section main-programs-header \
  --url http://127.0.0.1:5173/__preview/main-programs-header \
  --baseline figma-screenshots/main-programs-header.png \
  --clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 261
```
→ **DIFF 2.57%** (9497/369576 px), PASS (<5%).

### G1 시각 일치
- **diff 2.57% — PASS**
- diff 패턴: 텍스트 엣지 안티앨리어싱 미세 빨간선만 산재. semantic 오류 없음.

### G2 치수 정확도

| 항목 | Figma | 측정값 | 결과 |
|------|-------|--------|------|
| section bbox | 1416×261 | 1416×261 | PASS |
| section gap | 24px | 24px | PASS |
| section py | 24px/24px | 24px/24px | PASS |
| headingBlock bbox | 1416×141 @ (0,24) | 1416×141 @ (0,24) | PASS |
| headingBlock gap | 8px | 8px | PASS |
| eyebrow bbox | ≈124×21 @ (646,24) | 123.61×21 @ (646.19,24) | PASS (±1) |
| eyebrow fs/fw/lh/ls | 14/400/21/-0.07px | 14/400/21/-0.07px | PASS |
| title bbox | 1416×112 @ (0,53) | 1416×112 @ (0,53) | PASS |
| title fs/fw/lh | 48/700/56px | 48/700/56px | PASS |
| body bbox | 1416×48 @ (0,189) | 1416×48 @ (0,189) | PASS |
| body fs/fw/lh/ls | 16/400/24/-0.16px | 16/400/24/-0.16px | PASS |

**G2 PASS (전 항목 ±1/±2 이내, 대부분 exact match)**

### G3 에셋 무결성
- `document.images.length === 0` → **vacuous PASS** (이미지 노드 0개)
- svgPath / img 전무. 확정.

### G4 색상 정확도

| 요소 | Figma hex | 측정 rgb | 결과 |
|------|-----------|----------|------|
| section bg | transparent | rgba(0,0,0,0) | PASS |
| eyebrow color | #97a29e | rgb(151,162,158) | PASS |
| title color | #1d2623 | rgb(29,38,35) | PASS |
| body color | #1d2623 | rgb(29,38,35) | PASS |

**G4 PASS**

### 육안 semantic 검증 (docs §6.4)
- baseline `figma-screenshots/main-programs-header.png` + capture `tests/visual/captures/main-programs-header.png` + diff `tests/visual/diffs/main-programs-header.diff.png` 3종 Read로 육안 비교.
- 점검 항목:
  - [x] eyebrow 위치·폰트·색 일치
  - [x] title 2줄 줄바꿈 위치 "ESG를 배우고, 실천하고," / "성장하는 여정" 정확
  - [x] body 2줄 줄바꿈 위치 "… 실천할 수 있는" / "핵심 역량을 기르고 …" 정확
  - [x] 수직 spacing (eyebrow→title 8px, title→body 24px + py 24px) 일치
  - [x] BG transparent (흰 페이지 위) 일치
  - [x] 방향 반전 / 위치 swap / 색 반전 / 줄바꿈 오류 **없음**
- **육안 검증: PASS (0건)**

### 최종
- **4 게이트 + 육안 PASS. 1회 완료 (회차 1).**
- 주의: `scripts/compare-section.sh`는 clip 미지원 → 본 섹션은 `tests/visual/run.ts`를 clip 인자와 함께 직접 호출해야 정확. 페이지 통합 회귀 시 같은 clip 좌표 사용.

---

## 12. 단계 2 통과 체크

- [x] 컴포넌트 트리 정의 (1 파일 + index + preview route + App.tsx 패치)
- [x] props 시그니처 명시 (없음)
- [x] 에셋 매핑 (0개)
- [x] 트레이드오프 기록 (D1~D6)
- [x] 새 npm 패키지: 없음
- [x] 4 게이트 측정 지점 정의
- [x] 리스크 대응 (R1~R7)
- [x] 단일 평탄 이미지 여부: **아님** (D1 — DOM 재구성)
- [x] 신규 공통 컴포넌트 후보: **없음** (D3, SectionHeader는 3번째 등장 시 승격)
- [x] 탭 UI: **없음** (D2)
- [x] clip 파라미터: **불필요**

→ **사용자 승인 대기. 승인 후 단계 4 직행 (단계 3 스킵, 래스터 0).**
