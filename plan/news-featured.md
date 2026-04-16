# plan/news-featured.md — /news Featured 섹션 (v4)

> Figma `129:2560` (937×569). Baseline: `figma-screenshots/news-featured.png` 938×569.

---

## 파일 트리

```
src/assets/news-featured/
├─ raw/
│  ├─ chevron-left.svg         (원본)
│  ├─ chevron-right.svg        (원본)
│  ├─ ellipse5.svg             (원본 점 구분자)
│  ├─ hatch-bar.png            (실제 SVG — 단계 3에서 rename)
│  ├─ rectangle17.png          (실제 JPEG — 단계 3에서 rename)
│  └─ vector8-line.svg         (원본 실선)
├─ chevron-left.svg            ← raw에서 copy
├─ chevron-right.svg
├─ dot.svg                     ← ellipse5.svg rename
├─ hatch-bar.svg               ← hatch-bar.png rename (실제 SVG)
├─ thumb.jpg                   ← rectangle17.png rename (실제 JPEG)
└─ divider-line.svg            ← vector8-line.svg rename

src/components/sections/NewsFeatured/
├─ NewsFeatured.tsx            (섹션 루트)
├─ NewsFeaturedCard.tsx        (Card A/B 공용 로컬 컴포넌트)
├─ HatchedBar.tsx              (8px bar: 좌 해치 + 실선 + 우 해치)
├─ FeaturedPager.tsx           (좌 chevron + 4 dots + 우 chevron)
├─ data.ts                     (카드 2개 더미 + TypeScript 타입)
└─ index.ts

src/routes/NewsFeaturedPreview.tsx
```

## 컴포넌트 시그니처

```tsx
// NewsFeatured.tsx
export function NewsFeatured(): JSX.Element;  // props 없음

// NewsFeaturedCard.tsx
interface NewsFeaturedCardProps {
  item: FeaturedNewsItem;
}
export function NewsFeaturedCard(props: NewsFeaturedCardProps): JSX.Element;

// HatchedBar.tsx
export function HatchedBar(): JSX.Element;    // props 없음 (로컬)

// FeaturedPager.tsx
interface FeaturedPagerProps {
  total: number;
  activeIndex: number;
}
export function FeaturedPager(props: FeaturedPagerProps): JSX.Element;

// data.ts
export interface FeaturedNewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;        // YYYY-MM-DD ISO
  thumbnailSrc: string;
  thumbnailAlt: string;
}
export const FEATURED_NEWS: readonly FeaturedNewsItem[];
```

## 구조 (JSX 골자 — 주요부)

```tsx
// NewsFeatured.tsx
<section
  aria-labelledby="news-featured-heading"
  className="mx-auto flex w-full max-w-[1920px] items-center justify-center bg-gray-000"
>
  <h2 id="news-featured-heading" className="sr-only">주요 뉴스</h2>
  <div
    className="flex w-[936px] flex-col items-center gap-5"
    data-node-id="129:2560"
  >
    <HatchedBar />
    <div className="flex w-full flex-col items-center gap-8">
      <ul className="m-0 flex w-full list-none gap-6 p-0">
        {FEATURED_NEWS.map((item) => (
          <li key={item.id} className="flex-1 min-w-0">
            <NewsFeaturedCard item={item} />
          </li>
        ))}
      </ul>
      <FeaturedPager total={4} activeIndex={0} />
    </div>
  </div>
</section>
```

```tsx
// NewsFeaturedCard.tsx
<article
  className="flex flex-col gap-6"
  data-node-id={item.id}
>
  <div className="aspect-[456/280] overflow-hidden rounded-2xl">
    <img src={item.thumbnailSrc} alt={item.thumbnailAlt}
         className="h-full w-full object-cover" />
  </div>
  <div className="flex flex-col gap-6 pr-4">
    <div className="flex flex-col gap-4">
      <h3 className="font-bold text-gray-900"
          style={{
            fontFamily: "var(--font-family-pretendard)",
            fontSize: 24, lineHeight: 1.4, letterSpacing: "-0.6px",
          }}>
        {item.title}
      </h3>
      <p className="overflow-hidden line-clamp-3 text-gray-700"
         style={{
           fontFamily: "var(--font-family-pretendard)",
           fontSize: "var(--text-md-15r-size)",
           fontWeight: "var(--text-md-15r-weight)",
           lineHeight: "var(--text-md-15r-line-height)",
           letterSpacing: "-0.1125px",
         }}>
        {item.summary}
      </p>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-gray-500"
            style={{
              fontFamily: "var(--font-family-pretendard)",
              fontSize: 14, lineHeight: 1.5, letterSpacing: "-0.07px",
            }}>
        {item.source}
      </span>
      <img src={dotSvg} alt="" aria-hidden="true"
           className="h-[3px] w-[3px] shrink-0" />
      <time className="text-gray-500" dateTime={item.date}
            style={{
              fontFamily: "var(--font-family-pretendard)",
              fontSize: 14, lineHeight: 1.5, letterSpacing: "-0.07px",
            }}>
        {item.date}
      </time>
    </div>
  </div>
</article>
```

```tsx
// HatchedBar.tsx — 8px 해치 구분선 (About의 HatchedDivider와 다른 형태)
<div
  aria-hidden="true"
  className="flex h-2 w-full items-center gap-2"
  data-node-id="129:2561"
>
  <img src={hatchBar} alt="" className="h-2 w-9 shrink-0" />
  <img src={dividerLine} alt=""
       className="h-[2px] w-full flex-1" />
  <img src={hatchBar} alt="" className="h-2 w-9 shrink-0" />
</div>
```

```tsx
// FeaturedPager.tsx
<nav aria-label="주요 뉴스 페이지네이션"
     className="flex items-center gap-4"
     data-node-id="129:2599">
  <button type="button" aria-label="이전 페이지"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3d8de] bg-white">
    <img src={chevronLeft} alt="" aria-hidden="true" className="h-7 w-7" />
  </button>
  <ol className="m-0 flex list-none items-center gap-1.5 p-0">
    {Array.from({ length: total }).map((_, i) => (
      <li key={i}>
        {i === activeIndex ? (
          <span aria-current="true"
                className="block h-1.5 w-8 rounded-[24px] bg-gray-900" />
        ) : (
          <span className="block h-1.5 w-1.5 rounded-full bg-[#d9d9d9]" />
        )}
      </li>
    ))}
  </ol>
  <button type="button" aria-label="다음 페이지"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3d8de] bg-white">
    <img src={chevronRight} alt="" aria-hidden="true" className="h-7 w-7" />
  </button>
</nav>
```

## 에셋 매핑 (research §5 → 코드)

| research # | 원본 파일 | 최종 파일명 | import 이름 | 사용처 |
|---|---|---|---|---|
| 1 | raw/hatch-bar.png (실제 SVG) | hatch-bar.svg | hatchBar | HatchedBar 좌/우 |
| 2 | raw/vector8-line.svg | divider-line.svg | dividerLine | HatchedBar 중앙 |
| 3 | raw/rectangle17.png (실제 JPEG) | thumb.jpg | thumbnail | NewsFeaturedCard × 2 |
| 4 | raw/ellipse5.svg | dot.svg | dotSvg | Card meta 구분자 × 2 |
| 5 | raw/chevron-left.svg | chevron-left.svg | chevronLeft | FeaturedPager prev |
| 6 | raw/chevron-right.svg | chevron-right.svg | chevronRight | FeaturedPager next |

**고유 에셋 파일 수: 6** (research와 일치)

## 디자인 토큰 참조

- `var(--font-family-pretendard)` × ~8 (모든 텍스트)
- `var(--text-md-15r-size|weight|line-height)` × 3 (card summary)
- Tailwind 유틸리티 토큰: `text-gray-900`, `text-gray-700`, `text-gray-500`, `bg-gray-000`, `bg-white`, `rounded-full`, `rounded-2xl`, `line-clamp-3`
- spacing: `gap-2`(8), `gap-4`(16), `gap-5`(20), `gap-6`(24), `gap-8`(32) — Tailwind 기본 = Figma spec (8·16·20·24·32)
- `h-10 w-10`(40), `h-7 w-7`(28), `h-2 w-9`(해치 36×8), `h-[1.5px] w-full`(실선)
- **inline 불가피한 magic**: font-size 24/14/3px, letter-spacing -0.6/-0.1125/-0.07, border `#d3d8de`, inactive dot `#d9d9d9`, active dot width 32 / height 6 (도트 토큰 부재)

**예상 token_ratio**: 토큰 사용 ~30, hard-code style ~18 → **0.35~0.45** (목표 ≥0.2 초과)

**예상 absolute 사용**: 0 (100% flex 레이아웃)

**예상 semantic_score**: section + h2 + h3 × 2 + article × 2 + time × 2 + nav + ul/ol + button × 2 = **12+** (목표 ≥2 완전 초과)

## App.tsx 통합

1. `NewsFeatured` import
2. `NewsFeaturedPreview` import + 라우트 `/__preview/news-featured`
3. `/news` 라우트 현재 `<NewsTabs /><NewsTitle />` 뒤에 `<NewsFeatured />` 추가

## Preview

```tsx
// NewsFeaturedPreview.tsx
import { NewsFeatured } from "@/components/sections/NewsFeatured";

export function NewsFeaturedPreview() {
  return (
    <div className="w-[1920px] mx-auto bg-white">
      <NewsFeatured />
    </div>
  );
}
// clip: --clip-x 492 --clip-y 0 --clip-w 936 --clip-h 569 (section 단독 h=569)
```

## 트레이드오프

1. **공통 NewsCard 미승격**: featured(세로 레이아웃, 456w, 이미지 상단)와 list(가로 레이아웃, 936w, 썸네일 우측)는 구조가 완전 다름 + list는 아직 미구현 → 섹션 4 완료 시점에도 Rule of Three 미충족. **로컬 `NewsFeaturedCard` 유지**, `news-list` 구현 시 재평가
2. **HatchedBar 미승격**: 기존 `HatchedDivider`(About)와 시각적으로 다른 형태 (10px viewBox 6-slash vs 8px bar). 2번째 패턴 등장이므로 Rule of Three 미충족 → 로컬 유지
3. **active dot width=32, height=6**: 디자인 토큰 부재, `w-8 h-1.5` Tailwind 유틸로 표현 (bg-gray-900 매핑)
4. **pagination border `#d3d8de`**: `--color-gray-300: #c6cdcc` 토큰과 값 불일치 → inline `border-[#d3d8de]`
5. **inactive dot `#d9d9d9`**: Figma raw color, 토큰 부재 → inline
6. **thumb placeholder**: 카드 A/B 모두 동일 이미지 (Figma 원본). 실제 서비스에선 각각 다른 썸네일 필요
7. **MainNews의 NewsCard와 이름 충돌**: `NewsFeaturedCard` 로 명명하여 구분
8. **카드 타이틀 letter-spacing -0.6px vs 토큰 -2.5px**: 토큰 (-2.5px)은 %식 값으로 해석, Figma design_context가 절대 px로 -0.6 내려줌 (24×-2.5% = -0.6). inline letter-spacing 사용

## 새 npm 패키지

없음.

## 단계 4.5 사전 예측

- G5 eslint jsx-a11y: section + h2 + article + h3 + time + nav + button(aria-label) + img(alt) → PASS
- G6 텍스트비율: 대부분 텍스트 + thumbnail img (text-bearing raster 0) → PASS
- G8 i18n: JSX literal 없음 (데이터 분리), 그러나 aria-label "이전/다음 페이지" literal 있음 → PASS
- token_ratio: 0.35~0.45 예상 → PASS (목표 ≥0.2)
- absolute/file: 0 → PASS (목표 ≤5)
- semantic: 10+ 예상 → PASS

## 단계 6 잠재 diff 원인

1. thumbnail JPEG rendering subpixel (~1-2%)
2. 해치 PNG alpha 경계 antialiasing (~1-2%)
3. Pretendard variable font subpixel (~1-3%)
4. line-clamp-3 vs Figma baked-in 3-line ellipsis (동일 결과)

**예상 G1 diff: 5~10%.** ≤15% 목표 내.

---

## 측정 섹션

### 단계 4.5 품질 게이트

| 게이트 | 결과 | 수치 |
|---|---|---|
| G5 eslint | PASS | 0 error |
| G6 텍스트비율 | PASS | text:img ratio 9.50, raster 0 |
| G8 i18n | PASS | JSX literal 다수 (데이터/aria) |
| token_ratio | PASS | **0.556** (목표 ≥0.2) — token_ref=15 / magic=12 |
| absolute/file | PASS | **0** 실 클래스 (주석 "absolute 0" 표현 2건 매칭, 실제 absolute className 0) |
| semantic_score | PASS | **6** (section / h3 / article / time / nav / button) |
| Tailwind antipatterns | PASS | 음수 width·정수 반올림 없음 |
| Baked-in PNG | PASS | 이미지는 있으나 위에 CSS rotate/blend/bg 재적용 없음 |

### 단계 5 시각 게이트

| 게이트 | 결과 | 수치 |
|---|---|---|
| G1 pixelmatch (참고) | PASS | **10.38%** (55273/532584px) ≤ 15% 목표 |
| G2 치수 | PASS | 섹션 936×569 spec 일치, 카드 456 / 이미지 456×280 / 버튼 40×40 |
| G3 에셋 | PASS | 6개 에셋 (chevron-left/right, dot, hatch-bar, thumb, divider-line) 모두 로드 |
| G4 색상 | PASS | gray-900/700/500 토큰 참조 + #d3d8de(border)/#d9d9d9(inactive dot) Figma 원본 |

### 육안 검증
- baseline: figma-screenshots/news-featured.png (938×569)
- capture: tests/visual/captures/news-featured.png (936×569)
- diff: tests/visual/diffs/news-featured.diff.png — 주로 Pretendard variable font subpixel rendering + baseline/capture 2px 폭 차이로 인한 alignment drift
- semantic 오류 여부: **없음**
  - 해치 구분선 위치/크기 ✓
  - 카드 2개 레이아웃 (이미지 + 제목 + 3줄 요약 + 출처·점·날짜) ✓
  - 페이지네이션 (좌 ◀ + active dot 32×6 + 3 inactive dots 6×6 + 우 ▶) ✓
  - SVG flip / 요소 swap / 색 반전 / 줄바꿈 오류 **없음**
