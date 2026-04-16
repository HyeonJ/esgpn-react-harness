# Plan — gallery-title (Node 314:6837, v4 자율 모드)

> v4 north star: **편집 가능한 고충실도**. 순수 HTML 텍스트 2열 플렉스 타이포 섹션. 이미지/SVG 0개.
> 차단 게이트 = G5/G6/G8/G2/G4. 참고 = G1 ≤15%/G3/G7.

## 1. 확정 사항

1. **좌측 H1 카피**: "실천이 만든 변화의 순간들, / **ESGPN** 아카이브"
   - Figma 원본의 "ESPGN" 오타는 프로젝트 공식 표기 "ESGPN"으로 교정 (v4 지시사항 ⚠2-1)
   - baseline 대비 1글자(P↔G) 형상 차이 → G1 영향 극소
2. **우측 본문 카피** (Figma 원본 2줄 유지):
   - "이론에 머물지 않고 현장에서 발로 뛰며 만들어낸 실천의 기록입니다."
   - "우리가 함께 그려온 지속 가능한 미래의 조각들을 소개합니다."
3. **에셋 0개** — 단계 3 에셋 수집 스킵.
4. **신규 npm 패키지 없음**.
5. **새 공통 컴포넌트 없음**.

## 2. 파일 구조

```
src/components/sections/GalleryTitle/
├─ GalleryTitle.tsx     # 본체
└─ index.ts

src/routes/
└─ GalleryTitlePreview.tsx

src/App.tsx             # /__preview/gallery-title + /gallery 라우트 장착
```

## 3. 컴포넌트 설계 (NewsTitle 전례 답습)

### `GalleryTitle.tsx`

```tsx
export function GalleryTitle() {
  return (
    <section
      aria-labelledby="gallery-title-heading"
      className="mx-auto flex w-full max-w-[1920px] items-center justify-center bg-gray-000"
    >
      <div
        className="flex w-[936px] items-end justify-center gap-[var(--spacing-8)]"
        data-node-id="314:6837"
      >
        <h1
          id="gallery-title-heading"
          className="shrink-0 font-bold leading-[1.3] text-black whitespace-nowrap"
          style={{
            fontFamily: "var(--font-family-pretendard)",
            fontSize: 48,
            letterSpacing: "-1.92px",
          }}
          data-node-id="314:6838"
        >
          실천이 만든 변화의 순간들,
          <br aria-hidden="true" />
          ESGPN 아카이브
        </h1>
        <p
          className="flex-1 min-w-0 text-right text-black"
          style={{
            fontFamily: "var(--font-family-pretendard)",
            fontSize: "var(--text-md-15r-size)",
            fontWeight: "var(--text-md-15r-weight)",
            lineHeight: "var(--text-md-15r-line-height)",
            letterSpacing: "var(--text-md-15r-letter-spacing)",
          }}
          data-node-id="314:6839"
        >
          이론에 머물지 않고 현장에서 발로 뛰며 만들어낸 실천의 기록입니다.
          <br aria-hidden="true" />
          우리가 함께 그려온 지속 가능한 미래의 조각들을 소개합니다.
        </p>
      </div>
    </section>
  );
}
```

### 시맨틱
- `<section>` + `aria-labelledby` → `<h1 id>`
- 페이지 최상단 타이틀이므로 `<h1>` (/gallery 내 첫 heading)
- 우측 보조 카피는 `<p>` (heading 아님)

### 디자인 토큰 매핑

| Figma 값 | 토큰 | 적용 |
|---------|------|------|
| Pretendard family | `--font-family-pretendard` | h1, p |
| gap 32 | `--spacing-8` | container gap |
| bg white | `--color-gray-000` (`bg-gray-000`) | section |
| 우 15/400/1.5/-0.75 | `--text-md-15r-size/weight/line-height/letter-spacing` | p |
| 좌 48/Bold/1.3/-1.92 | 전용 토큰 없음 → inline (48, -1.92) | h1 (NewsTitle 전례 동일) |

### GalleryTitlePreview
```tsx
export function GalleryTitlePreview() {
  return (
    <div className="w-[1920px] mx-auto bg-white">
      <GalleryTitle />
    </div>
  );
}
```

### App.tsx 라우트 변경
- `/__preview/gallery-title` → `<GalleryTitlePreview />`
- `/gallery` placeholder `<div>갤러리 — 섹션 구현 대기</div>` → `<div className="pt-[180px]"><GalleryTitle /></div>` (Header fixed clearance y=180, news와 동일 패턴)

## 4. 트레이드오프

1. **ESPGN → ESGPN 교정**: Figma 원본 오타 채택 대신 프로젝트 브랜드 통일 우선 (v4 지시). baseline 대비 1글자 형상 차이로 G1 미세 상승.
2. **H1 인라인 48/-1.92**: 전용 토큰 없음. Rule of Three 2/3 (NewsTitle + GalleryTitle). 향후 `text-5xl-48b-*` 토큰 승격 검토.
3. **섹션 루트 mx-auto 내장**: 프로젝트 표준 §6.5. Preview wrapper 의존 금지.
4. **G1 5% 상회 가능성 수용**: v1~v3 측정 기록상 8.28% 기록. v4는 G1 ≤15% 참고 지표이므로 차단 아님. 텍스트 교정 + 폰트 AA 차이는 구조적 한계.

## 5. v4 예상 게이트

| 게이트 | 종류 | 예상 | 근거 |
|-------|-----|-----|------|
| G5 시맨틱 | 차단 | PASS | h1 id/aria-labelledby, jsx-a11y 0 |
| G6 텍스트:이미지 | 차단 | PASS | 이미지 0, 한글 텍스트 80+자 |
| G8 i18n | 차단 | PASS | JSX literal 한글 4문장 |
| G2 치수 | 차단 | PASS | font 48/15 정확, gap 32 |
| G4 색상 | 차단 | PASS | text-black, bg-gray-000 |
| G1 시각 | 참고 | ~8% (<15%) | 텍스트 교정 + 폰트 엔진 AA |
| G3 에셋 | 참고 | N/A | 이미지 0 |
| G7 a11y | 참고 | PASS | 기동 시 |

### 구조 지표 예상
- **token_ratio**: Pretendard + spacing-8 + gray-000 + text-md-15r 4종 = 7개 var usage vs 11개 style prop → **~0.6** (≥0.2)
- **absolute/file**: 0 (flex only) ≤5
- **semantic_score**: section/h1/p = **3** (≥2)

## 6. 구현 순서
1. 디렉토리 `src/components/sections/GalleryTitle/` 생성
2. `GalleryTitle.tsx` + `index.ts` 작성
3. `GalleryTitlePreview.tsx` 작성
4. `App.tsx`에 preview 라우트 + `/gallery` 실라우트 장착
5. 빌드/타입체크/lint
6. G5/G6/G8 측정 (단계 4.5)
7. Playwright 4뷰포트 캡처 + G1~G4 (단계 5)
8. 전부 PASS → 자동 커밋 `[auto]` + PROGRESS.md 갱신

---

## 측정 결과 (v4 자율 모드, 1회차)

### 단계 4.5 품질 게이트
- **G5 시맨틱 HTML**: PASS (`npx eslint src/components/sections/GalleryTitle src/routes/GalleryTitlePreview.tsx` → 0 에러. section + h1 + aria-labelledby)
- **G6 텍스트:이미지**: PASS (`node scripts/check-text-ratio.mjs` → textChars=271, imgCount=0, ratio ∞ (no alt), rasterHeavy=false)
- **G8 i18n**: PASS (JSX literal 한글 4문장 존재)
- 보조 가드:
  - `bash scripts/check-tailwind-antipatterns.sh` → 0 안티패턴
  - `bash scripts/check-baked-in-png.sh gallery-title` → 0 중첩 (이미지 자체 없음)
- TS `npx tsc --noEmit` → 0 에러

### 단계 5 시각/치수 게이트
- **G1 diff**: 9.86% (11439/116064px) — v4 기준(≤15%) 참고 지표 PASS
  - 캡처: `tests/visual/captures/gallery-title.png`, diff: `tests/visual/diffs/gallery-title.diff.png`
  - 원인: ① ESPGN→ESGPN 교정 2글자 형상 차이, ② Pretendard 서브픽셀 AA 엔진 차이 (contest-hero/contest-benefits 전례 동류)
  - 육안 검증: baseline/capture/diff 3종 Read 비교 완료. 줄바꿈(2/2) · 정렬(items-end) · 색 · 방향 모두 일치. diff 이미지의 빨강은 글자 외곽선 AA + ESGPN↔ESPGN 2글자 블록. semantic 오류 **0건**.
- **G2 치수** (Playwright computed style 측정):
  - h1: fontSize 48px ✓, letter-spacing -1.92px ✓, line-height 62.4px (=1.3) ✓, whiteSpace nowrap ✓, width 474.6 (Figma 477, 오차 2.4px — 폰트 서브픽셀 범위), height 124.8 (Figma 124, +0.8) ✓
  - p: fontSize 15px ✓, letter-spacing -0.75px ✓, line-height 22.5px (=1.5) ✓, text-align right ✓, width 429.4 (Figma 427, +2.4), height 45.0 (Figma 46, -1) ✓
  - container: gap 32px ✓, alignItems flex-end ✓, justifyContent center ✓, width 936 ✓
  - section: bg rgb(255,255,255) ✓, maxWidth 1920px ✓
  - → 전 항목 ±2.5px 이내. **PASS**
- **G3 에셋**: PASS (N/A, 이미지 0개)
- **G4 색상**:
  - h1/p color `rgb(0, 0, 0)` = `#000000` (Figma 일치) ✓
  - section bg `rgb(255, 255, 255)` = `#ffffff` = `--color-gray-000` ✓
  - → **PASS**

### 구조 지표 (v4 신규)
- **token_ratio**: **0.64** (7/11 var(--...) / inline style+arbitrary) ≥ 0.2 ✓
- **absolute_count**: **0** ≤ 5 ✓
- **semantic_score**: **3** (section/h1/p) ≥ 2 ✓

### 4 뷰포트 가로 overflow 점검 (`/gallery` 실라우트)
- 1920: no overflow ✓
- 1440: no overflow ✓
- 768: no overflow ✓
- 375: scrollW 448 > clientW 375 (48px over) — 좌측 48px Bold nowrap 때문. **v4 범위 외 (responsive-polish 별건 PR)**. 데스크톱 1440+ 픽셀 정확도가 현재 과업 타겟이므로 **기록만 하고 차후 처리**.

### 최종 게이트 결과 요약
| 게이트 | 종류 | 결과 |
|-------|-----|------|
| G5 시맨틱 | 차단 | PASS |
| G6 텍스트:이미지 | 차단 | PASS |
| G8 i18n | 차단 | PASS |
| G2 치수 | 차단 | PASS |
| G4 색상 | 차단 | PASS |
| G1 시각 | 참고 | PASS (9.86% ≤15%) |
| G3 에셋 | 참고 | N/A |
| G7 a11y | 참고 | SKIP (lhci 미설치) |
| 구조 지표 | 차단 | token 0.64 / abs 0 / sem 3 — 전부 충족 |

**차단 게이트 전체 PASS → 자동 커밋 진입** (v4 `[auto]` 태그).

### 소요 시간
- 단계 1 research: 기존 문서 확인 (v1~v3 이관) + baseline 다운로드 (REST API) ~5분
- 단계 2 plan: v4 원칙 재작성 ~5분
- 단계 4 구현: GalleryTitle.tsx + index.ts + Preview + App.tsx ~5분
- 단계 4.5/5 측정: G5~G8 umbrella + G1~G4 Playwright + 4뷰포트 ~5분
- 합계: **~20분**

