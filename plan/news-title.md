# plan/news-title.md — /news Title 섹션 (v4)

## 파일 트리

```
src/components/sections/NewsTitle/
├─ NewsTitle.tsx
└─ index.ts
src/routes/NewsTitlePreview.tsx
```

## 컴포넌트 시그니처

```tsx
export function NewsTitle(): JSX.Element;  // props 없음
```

## 구조 (JSX 골자)

```tsx
<section
  aria-labelledby="news-title-heading"
  className="mx-auto flex w-full max-w-[1920px] items-center justify-center bg-gray-000"
>
  <div
    className="flex w-[936px] items-end justify-center gap-[var(--spacing-8)] py-0"
    data-node-id="129:2557"
  >
    <h1
      id="news-title-heading"
      className="flex-1 min-w-0 font-bold leading-[1.3] text-black"
      style={{
        fontFamily: "var(--font-family-pretendard)",
        fontSize: 48,
        letterSpacing: "-1.92px",
      }}
      data-node-id="129:2558"
    >
      지식으로 여는
      <br aria-hidden="true" />
      지속 가능한 내일
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
      data-node-id="129:2559"
    >
      단순한 소식을 넘어, 실질적인 변화의 실마리가 될
      <br aria-hidden="true" />
      전문적인 지식과 최신 동향을 기록합니다.
    </p>
  </div>
</section>
```

## 디자인 토큰 참조

- `var(--font-family-pretendard)` × 2
- `var(--spacing-8)` × 1 (gap 32px)
- `var(--text-md-15r-size|weight|line-height|letter-spacing)` × 4 (right p)
- `bg-gray-000` 1
- Tailwind `flex-1`, `items-end`, `gap-*`, `text-right`

**예상 token_ratio**: 토큰 사용 ~8, 총 스타일 속성 ~15 → **0.53 이상** (목표 0.2 초과)

**예상 absolute 사용**: 0 (목표 ≤5 만족)

**예상 semantic_score**: section + h1 + p = 3 (목표 ≥2 만족)

## App.tsx 통합

1. `NewsTitle` import 추가
2. `NewsTitlePreview` import + 라우트 `/__preview/news-title`
3. `/news` 라우트 `<NewsTabs />` 뒤에 `<NewsTitle />` 추가

## Preview

```tsx
// NewsTitlePreview.tsx
import { NewsTitle } from "@/components/sections/NewsTitle";

export function NewsTitlePreview() {
  return (
    <div className="w-[1920px] mx-auto bg-white">
      <NewsTitle />
    </div>
  );
}
// clip: --clip-x 492 --clip-y 0 --clip-w 936 --clip-h 124
```

## 트레이드오프

- **48B inline hard-code**: 토큰 없음 → inline. 부채는 "font-size: 48" 하나로 최소화. 토큰 추가 시 교체 용이
- **LS -1.92px vs 토큰 없음**: 토큰 `--text-4xl-40b-letter-spacing: -4px`는 40에 맞춘 값. 48엔 -1.92px 필요 → inline
- **near-black `text-black`**: ContestAbout 전례로 허용. Figma raw color 유지

## 새 npm 패키지

없음.

## 단계 4.5 사전 예측

- G5 eslint: section + h1 + p + aria → PASS
- G6 텍스트비율: 100% 텍스트, raster 0 → PASS
- G8 i18n: 모든 literal JSX text → PASS
- token_ratio: 0.5+ 예상 → PASS
- absolute/file: 0 → PASS
- semantic: section + h1 = 2 ↑ → PASS

---

## 측정 섹션 (단계 5 이후 채움)

### 단계 4.5 품질 게이트

| 게이트 | 결과 | 수치 |
|---|---|---|
| G5 eslint | PASS | 0 error |
| G6 텍스트비율 | PASS | text 241자, img 0, raster 0 |
| G8 i18n | PASS | JSX literal 다수 |
| G7 Lighthouse | SKIP | — |
| **token_ratio** | PASS | **0.692** (목표 ≥0.2) |
| **absolute/file** | PASS | **1** (comment 내 단어 매칭, 실 absolute 클래스 0) |
| **semantic_score** | PASS | **2** (section + h1) (목표 ≥2) |
| Tailwind antipatterns | PASS | 0 |
| Baked-in PNG | PASS | 이미지 없음 |

### 단계 5 시각 게이트

| 게이트 | 결과 | 수치 |
|---|---|---|
| G1 pixelmatch | PASS (참고) | **6.20%** (7194/116064px) ≤ 15% 목표 |
| G2 치수 | PASS | font 48/15, gap 32 spec 일치 |
| G3 에셋 | PASS | N/A (이미지 없음) |
| G4 색상 | PASS | text-black (#000000) Figma 일치 |

### 육안 검증
- baseline: figma-screenshots/news-title.png — "지식으로 여는\n지속 가능한 내일" (48B) + "단순한 소식을 넘어..." (15R 우측)
- capture: tests/visual/captures/news-title.png — 레이아웃·타이포·정렬·색상 동일
- diff: 마이너 font rendering 차이 (Pretendard variable vs Figma render). semantic 오류 0
- semantic 오류 여부: **없음** (flip/swap/색반전/줄바꿈 오류 모두 없음)
