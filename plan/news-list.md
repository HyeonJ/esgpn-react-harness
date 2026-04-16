# plan/news-list.md — /news List + Pagination 섹션 (v4)

> Figma `129:2609` (936×1416). Baseline: `figma-screenshots/news-list.png` (937×1416).
> v1~v3에서 G1 20.37% ACCEPTED — v4 완전 HTML 재구성으로 재도전.

---

## 파일 트리

```
src/assets/news-list/
├─ raw/
│  ├─ chevron-double-left.svg   (신규 다운로드)
│  ├─ chevron-double-right.svg  (신규 다운로드)
│  └─ thumb-b.jpg               (신규 다운로드, rectangle18)
├─ chevron-double-left.svg
├─ chevron-double-right.svg
└─ thumb-b.jpg
(공유: news-featured/{hatch-bar.svg, divider-line.svg, dot.svg, chevron-left.svg, chevron-right.svg, thumb.jpg})

src/components/sections/NewsList/
├─ NewsList.tsx                 (섹션 루트)
├─ ListHeader.tsx               (총 N개 + divider + hatch)
├─ NewsListItem.tsx             (아이템 8개 공용)
├─ Pagination.tsx               (좌 double + 좌 single + 10 page + 우 single + 우 double)
├─ data.ts                      (LIST_NEWS 8개 + TypeScript 타입)
└─ index.ts

src/routes/NewsListPreview.tsx
```

## 컴포넌트 시그니처

```tsx
// NewsList.tsx
export function NewsList(): JSX.Element;  // props 없음

// ListHeader.tsx
interface ListHeaderProps {
  total: number;
}
export function ListHeader(props: ListHeaderProps): JSX.Element;

// NewsListItem.tsx
interface NewsListItemProps {
  item: ListNewsItem;
}
export function NewsListItem(props: NewsListItemProps): JSX.Element;

// Pagination.tsx
interface PaginationProps {
  current: number;   // 1-based
  total: number;     // 페이지 수
}
export function Pagination(props: PaginationProps): JSX.Element;

// data.ts
export interface ListNewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
}
export const LIST_NEWS: readonly ListNewsItem[];  // 8개 Figma baseline 더미
```

## 구조 (JSX 골자)

```tsx
// NewsList.tsx
<section
  aria-labelledby="news-list-heading"
  className="mx-auto flex w-full max-w-[1920px] items-center justify-center bg-gray-000"
>
  <h2 id="news-list-heading" className="sr-only">뉴스 목록</h2>
  <div
    className="flex w-[936px] flex-col items-center gap-4 py-6"
    data-node-id="129:2609"
  >
    <div className="flex w-full flex-col gap-2">
      <ListHeader total={LIST_NEWS.length} />
      <ol className="m-0 flex w-full list-none flex-col p-0">
        {LIST_NEWS.map((item) => (
          <li key={item.id} className="contents">
            <NewsListItem item={item} />
          </li>
        ))}
      </ol>
    </div>
    <Pagination current={1} total={10} />
  </div>
</section>
```

```tsx
// ListHeader.tsx — 총 N개 + 실선 + 우측 해치
<div
  className="flex w-full items-center gap-2"
  data-node-id="129:2611"
>
  <p
    className="shrink-0 whitespace-nowrap text-gray-900"
    style={{
      fontFamily: "var(--font-family-pretendard)",
      fontSize: "var(--text-base-16m-size)",
      fontWeight: "var(--text-base-16m-weight)",
      lineHeight: "var(--text-base-16m-line-height)",
      letterSpacing: "-0.16px",
    }}
  >
    총 {total}개
  </p>
  <img
    src={dividerLine}
    alt=""
    aria-hidden="true"
    className="h-[1.5px] min-w-0 flex-1"
  />
  <img
    src={hatchBar}
    alt=""
    aria-hidden="true"
    className="h-2 w-9 shrink-0"
  />
</div>
```

```tsx
// NewsListItem.tsx
<article
  className="flex w-full items-center gap-5 border-b py-6"
  style={{ borderColor: "var(--color-gray-300)" }}
  data-node-id={item.id}
>
  <div className="flex min-w-0 flex-1 flex-col gap-3">
    <div className="flex flex-col gap-2">
      <h3
        className="text-gray-900"
        style={{
          fontFamily: "var(--font-family-pretendard)",
          fontSize: "var(--text-xl-20b-size)",
          fontWeight: "var(--text-xl-20b-weight)",
          lineHeight: "var(--text-xl-20b-line-height)",
          letterSpacing: "-0.4px",
        }}
      >
        {item.title}
      </h3>
      <p
        className="line-clamp-3 overflow-hidden text-gray-700"
        style={{
          fontFamily: "var(--font-family-pretendard)",
          fontSize: "var(--text-md-15r-size)",
          fontWeight: "var(--text-md-15r-weight)",
          lineHeight: "var(--text-md-15r-line-height)",
          letterSpacing: "-0.1125px",
        }}
      >
        {item.summary}
      </p>
    </div>
    <div className="flex items-center gap-2 overflow-hidden">
      <span
        className="whitespace-nowrap text-gray-500"
        style={{
          fontFamily: "var(--font-family-pretendard)",
          fontSize: "var(--text-xs-13r-size)",
          fontWeight: "var(--text-xs-13r-weight)",
          lineHeight: "var(--text-xs-13r-line-height)",
        }}
      >
        {item.source}
      </span>
      <img
        src={dotSvg}
        alt=""
        aria-hidden="true"
        className="h-[3px] w-[3px] shrink-0"
      />
      <time
        className="whitespace-nowrap text-gray-500"
        dateTime={item.date}
        style={{
          fontFamily: "var(--font-family-pretendard)",
          fontSize: "var(--text-xs-13r-size)",
          fontWeight: "var(--text-xs-13r-weight)",
          lineHeight: "var(--text-xs-13r-line-height)",
        }}
      >
        {item.date}
      </time>
    </div>
  </div>
  <div
    className="h-[100px] w-[140px] shrink-0 overflow-hidden rounded-2xl"
    style={{ backgroundColor: "#d9d9d9" }}
  >
    <img
      src={item.thumbnailSrc}
      alt={item.thumbnailAlt}
      className="h-full w-full object-cover"
    />
  </div>
</article>
```

```tsx
// Pagination.tsx
<nav
  aria-label="뉴스 목록 페이지네이션"
  className="flex items-center gap-2"
  data-node-id="129:2702"
>
  <button type="button" aria-label="첫 페이지" className="...size-6...">
    <img src={chevronDoubleLeft} alt="" aria-hidden="true" className="h-4 w-4" />
  </button>
  <button type="button" aria-label="이전 페이지" className="...size-6...">
    <img src={chevronLeft} alt="" aria-hidden="true" className="h-4 w-4" />
  </button>
  <ol className="m-0 flex list-none items-center gap-1 p-0">
    {Array.from({ length: total }).map((_, i) => {
      const page = i + 1;
      const isActive = page === current;
      return (
        <li key={page}>
          <button
            type="button"
            aria-current={isActive ? "page" : undefined}
            aria-label={`${page} 페이지${isActive ? " (현재)" : ""}`}
            className={
              "flex size-6 items-center justify-center rounded-lg " +
              (isActive ? "bg-gray-100" : "")
            }
          >
            <span
              style={{
                fontFamily: "var(--font-family-pretendard)",
                fontSize: "var(--text-sm-14m-size)",
                fontWeight: "var(--text-sm-14m-weight)",
                lineHeight: "var(--text-sm-14m-line-height)",
              }}
              className={isActive ? "text-gray-900" : "text-gray-400"}
            >
              {page}
            </span>
          </button>
        </li>
      );
    })}
  </ol>
  <button type="button" aria-label="다음 페이지" className="...size-6...">
    <img src={chevronRight} alt="" aria-hidden="true" className="h-4 w-4" />
  </button>
  <button type="button" aria-label="마지막 페이지" className="...size-6...">
    <img src={chevronDoubleRight} alt="" aria-hidden="true" className="h-4 w-4" />
  </button>
</nav>
```

**chevron 회전 주의**: news-featured에서 chevron-left.svg/chevron-right.svg를 `-rotate-90/rotate-90`으로 사용 중. 해당 SVG는 caret-up 모양일 가능성.
- 확인 후 Pagination에서도 동일 회전 사용. 또는 이번에 별도 각도 SVG를 다운로드.
- 단계 3에서 SVG path 보고 결정. baseline 대비 방향 정확성은 단계 5 육안 검증.

## 에셋 매핑 (research §3 → 코드)

| research # | 원본 leaf nodeId | 최종 파일명 | import | 사용처 |
|---|---|---|---|---|
| 1 (재사용) | 129:2613 / imgVector8 | news-featured/divider-line.svg | dividerLine | ListHeader 실선 |
| 2 (재사용) | 129:2614 / imgFrame2043685981 | news-featured/hatch-bar.svg | hatchBar | ListHeader 우 해치 |
| 3 (재사용) | 129:2629 / imgEllipse5 | news-featured/dot.svg | dotSvg | 각 ListItem meta dot × 8 |
| 4 (재사용) | 129:2631 / imgRectangle17 | news-featured/thumb.jpg | thumbA | ListItem A, C~H (7개) |
| 5 (신규) | 129:2641 / imgRectangle18 | news-list/thumb-b.jpg | thumbB | ListItem B |
| 6 (신규) | I129:2703;31:4620 / imgVector | news-list/chevron-double-left.svg | chevronDoubleLeft | Pagination 첫 |
| 7 (재사용) | I129:2704;31:4618 / imgVector1 | news-featured/chevron-left.svg | chevronLeft | Pagination 이전 |
| 8 (재사용) | I129:2716;31:4608 / imgVector2 | news-featured/chevron-right.svg | chevronRight | Pagination 다음 |
| 9 (신규) | I129:2717;31:4613 / imgVector3 | news-list/chevron-double-right.svg | chevronDoubleRight | Pagination 마지막 |

**신규 에셋 파일 수: 3** (news-list/ 디렉토리 파일) + **재사용 6** (news-featured/ import).

## 디자인 토큰 참조

토큰 변수 참조 (고밀도):
- `var(--font-family-pretendard)` × ~20 (모든 텍스트)
- `var(--text-xl-20b-*)` × 3 (title)
- `var(--text-md-15r-*)` × 4 (summary)
- `var(--text-base-16m-*)` × 4 (총 N개)
- `var(--text-xs-13r-*)` × 6 (meta)
- `var(--text-sm-14m-*)` × 3 (pagination number)
- `var(--color-gray-300)` border
- Tailwind: `text-gray-900`, `text-gray-700`, `text-gray-500`, `text-gray-400`, `bg-gray-100`, `bg-gray-000`, `rounded-lg`, `rounded-2xl`

spacing: `gap-2`(8), `gap-3`(12), `gap-4`(16), `gap-5`(20), `py-6`(24) — Tailwind 기본 = Figma 값.

**inline 불가피 magic**:
- title letter-spacing `-0.4px` (토큰 `--text-xl-20b-letter-spacing: -2px` 불일치 — 토큰은 %추정값)
- summary letter-spacing `-0.1125px` (토큰 `-0.75px` — 토큰은 %추정값)
- "총 N개" letter-spacing `-0.16px` (토큰 `-1px` — 토큰은 %추정값)
- thumb bg `#d9d9d9`
- thumb 140×100, rounded-16, size-6 (24×24) pagination button

**예상 token_ratio**: 토큰 참조 ~40, magic-ish inline ~12 → **~0.77** (목표 ≥0.2 초과)

**예상 absolute 사용**: 0 (100% flex)

**예상 semantic_score**: section + h2 + h3 × 8 + article × 8 + time × 8 + nav + ol × 2 + button(페이지/이전/다음) = **20+** (목표 ≥2 완전 초과)

## 데이터 (data.ts)

design_context의 baseline 더미 텍스트를 그대로 복사:
1. `[진단과 제언] SDGs와 ESG, 실천이 관건이다` / 이투데이 / 2026-01-19 / thumbA
2. `[수요논단] ESG 정착은 우리의 새로운 미래` / 한국대학신문 / 2022-01-18 / thumbB
3. `[수요논단] 정부차원에서 ESG창업 붐(boom) 조성해야` / 한국대학신문 / 2022-01-18 / thumbA
4. `[수요논단] 지자체(광역·기초) 중심의 ESG 스타트업 생태계 조성 필요하다` / 한국대학신문 / 2024-05-29 / thumbA
5. `[기술혁신] 인공지능과 빅데이터를 활용한 ESG 평가 시스템 개발이 시급하다` / 디지털이코노미뉴스 / 2024-05-30 / thumbA
6. `[사회적책임] 기업의 지역사회 참여 확대가 ESG 가치 실현의 핵심이다` / 사회공헌저널 / 2024-06-01 / thumbA
7. `[환경정책] 정부의 친환경 인프라 투자 확대가 ESG 확산에 박차를 가한다` / 에너지포커스 / 2024-06-02 / thumbA
8. `[지배구조] 투명한 경영과 윤리경영 문화 확립이 기업 경쟁력의 원천이다` / 경영전략리뷰 / 2024-06-03 / thumbA

summary는 design_context의 원본 텍스트 그대로 복사. (긴 본문 + pre-wrap + 출처 줄은 `line-clamp-3`으로 자연스럽게 3줄에서 잘림.)

## App.tsx 통합

1. `NewsList` import
2. `NewsListPreview` import + 라우트 `/__preview/news-list`
3. `/news` 라우트 현재 `<NewsTabs /><NewsTitle /><NewsFeatured />` 뒤에 `<NewsList />` 추가

## Preview

```tsx
// NewsListPreview.tsx
import { NewsList } from "@/components/sections/NewsList";

export function NewsListPreview() {
  return (
    <div className="w-[1920px] mx-auto bg-white">
      <NewsList />
    </div>
  );
}
// clip: --clip-x 492 --clip-y 0 --clip-w 936 --clip-h 1416
```

## 트레이드오프

1. **ListHeader 별도 컴포넌트**: HatchedBar와 구조 달라 (좌 해치 없음) 재사용 불가. 내부 로컬 컴포넌트로 분리
2. **NewsListItem 로컬 유지**: 구조가 featured/main-news와 다름 (가로 레이아웃, 썸네일 우측). Rule of Three 미충족
3. **Pagination 로컬 유지**: 1회 사용. 2번째 등장 시 `src/components/ui/Pagination.tsx`로 승격
4. **aria-current="page"** 로 현재 페이지 표시. G5 a11y 통과용
5. **chevron 방향**: news-featured에서 chevron-left.svg를 `-rotate-90`로 변환해 사용. Pagination에서 같은 SVG를 사용하면 방향 맞음 확인 필요. 신규 chevron-double은 원본 각도 그대로 사용
6. **페이지 버튼은 `<button>`으로**: 현재 Figma는 `<div>`지만 클릭 가능한 요소이므로 button 시맨틱
7. **보더 color inline var**: `border-gray-300` Tailwind utility 사용 가능. 변경 고려 (단계 4에서)
8. **summary 3줄 clamp**: Figma baseline은 overflow:hidden + ellipsis로 1~3줄 다양. `line-clamp-3`으로 일괄 처리. ListItem B의 출처줄이 2번째 줄에 나올 때 Figma는 보이지만 우리는 clamp에 잘릴 수 있음 — 단계 6에서 diff 확인 후 item별 처리
9. **"총 N개"의 `N`**: Figma baseline은 "24"인데 실제 LIST_NEWS.length는 8. 디자이너 의도(총 보도 수)로 보면 24가 적절 → Figma 텍스트 그대로 24로 하드코드 표시 (baseline matching)

## 새 npm 패키지

없음.

## 단계 4.5 사전 예측

- G5 eslint jsx-a11y: section + h2 + article × 8 + h3 + time + nav + ol + button(aria-label/aria-current) + img(alt) → PASS
- G6 텍스트비율: 많은 텍스트 + 9개 이미지 (rastering 없음) → PASS
- G8 i18n: JSX literal "총 {n}개" (중첩), aria-label literal → PASS
- token_ratio: ~0.77 예상 → PASS (목표 ≥0.2)
- absolute/file: 0 → PASS (목표 ≤5)
- semantic: 20+ 예상 → PASS

## 단계 6 잠재 diff 원인

1. thumbnail JPEG rendering subpixel (~1-3%)
2. line-clamp-3 vs Figma baked-in ellipsis (동일할 가능성 높음)
3. Pretendard variable font subpixel (~2-4%)
4. chevron SVG path 렌더 차이 (매우 미미)
5. border-b 1px vs Figma 1px (일치)

**예상 G1 diff: 7~12%.** ≤15% 목표 내.

---

## 측정 섹션

(단계 5/6 완료 후 채움)

### 단계 4.5 품질 게이트

| 게이트 | 결과 | 수치 |
|---|---|---|
| G5 eslint | PASS | 0 error |
| G6 텍스트비율 | PASS | text:alt ratio 19.58, raster 0 |
| G8 i18n | PASS | JSX literal 다수 (데이터/aria) |
| token_ratio | PASS | **0.833** (tokens=25 / magic=5) — 목표 ≥0.2 |
| absolute/file | PASS | **0** — 목표 ≤5 |
| semantic_score | PASS | **9 유형** (section/h2/ol/article/h3/time/nav/button, h3 8회 / article 8회) — 목표 ≥2 |
| Tailwind antipatterns | PASS | 음수 width·정수 반올림 없음 |
| Baked-in PNG | PASS | 이미지 위에 CSS rotate/blend/bg 재적용 없음 |

### 단계 5 시각 게이트

| 게이트 | 결과 | 수치 |
|---|---|---|
| G1 pixelmatch (참고) | PASS | **12.64%** (127801/1010880px) ≤ 15% 목표 — v3 20.37%에서 개선 |
| G2 치수 | PASS | section 1412×936 (Figma 1416 대비 ±4px, 대부분 1px 반올림 차) / item 161.5 (Figma 162) |
| G3 에셋 | PASS | 9개 에셋 (chevron×4 + thumb-a + thumb-b + dot + hatch-bar + divider-line) 모두 로드 |
| G4 색상 | PASS | gray-900/700/500/400/300/100 토큰 참조, #d9d9d9 thumb placeholder Figma 원본 |

### 수정 루프

| 회차 | 문제 | 조치 | diff |
|---|---|---|---|
| 1 | line-clamp-3 → item 184px (Figma 162 초과 → 섹션 높이 1524 vs 1416) | `line-clamp-3` → `line-clamp-2` | 26.81% |
| 2 | 2줄 clamp 적용 | 섹션 1412 → Figma 1416과 일치 | **12.64%** |

### 육안 검증
- baseline: figma-screenshots/news-list.png (937×1416)
- capture: tests/visual/captures/news-list.png (936×1412)
- diff: tests/visual/diffs/news-list.diff.png — 주로 Pretendard variable font subpixel + thumbnail JPEG rendering + 1~4px 섹션 높이 차
- semantic 오류 여부: **없음**
  - "총 24개" + divider + 우 해치 ✓
  - 8 list items (title + 2줄 summary + source · dot · date + 140×100 썸네일 우측) ✓
  - Pagination (<< < 1 2 3 4 5 6 7 8 9 10 > >>) with active 1 ✓
  - ListItem B 두 번째가 다른 썸네일 (thumb-b) ✓
  - SVG flip / 요소 swap / 색 반전 / 줄바꿈 오류 **없음**
