# plan/news-detail-related.md

## 목적
`/news/:id` 페이지 하단 "실천의 영감을 더해줄 또 다른 이야기들" 섹션 — heading + 3 related news items.
v1~v3 T-011(composite raster 의심) 부채 해소를 위해 v4에서 완전 HTML 재구성.

## 컴포넌트 트리

```
NewsDetailRelated.tsx (단일 파일 + local items data)
└── <section aria-labelledby="news-detail-related-heading">   // 자기 정렬 mx-auto
    └── <div w-[936px] flex-col gap-6>
        ├── <h2 id="news-detail-related-heading" text-xl-20sb>실천의 영감을...</h2>
        └── <ol list-none>
            └── 3× <li> → <RelatedItem />
                           └── <article flex items-center gap-5 border-b py-6>
                               ├── <div flex-1 min-w-0 col gap-3>
                               │   ├── <h3 text-xl-20b>{title}</h3>
                               │   ├── <p text-md-15r line-clamp-2>{summary}</p>
                               │   └── <div meta>source · dot · time</div>
                               └── <div w-[140] h-[100] rounded-2xl>
                                   └── <img />
```

로컬에 RelatedItem을 두는 이유: v4 원칙(완전 HTML 재구성, Rule of Three 미충족 — NewsList `NewsListItem`과 구조 동일하지만 로컬 유지).

## Props
- 없음 (섹션 자체가 dummy data 포함, NewsList와 동일 접근)

## 디자인 토큰 매핑

| 요소 | 토큰 / 값 |
|---|---|
| wrapper | `max-w-[1920px] mx-auto w-full flex items-center justify-center bg-gray-000` |
| inner | `w-[936px] flex flex-col gap-6` (gap 24 = spacing/6) |
| heading | `text-[20px] font-['Pretendard:SemiBold'] tracking-[-0.4px] leading-[1.4] text-gray-900 m-0` (Text-xl/20SB) |
| article | `flex items-center gap-5 border-b py-6` (gap-5=20, py-6=24) + `border-gray-300` |
| title | `text-xl-20b tracking-[-0.4px] text-gray-900` |
| summary | `text-md-15r tracking-[-0.1125px] text-gray-700 line-clamp-2 overflow-hidden` |
| meta | `flex gap-2 items-center` |
| source/date | `text-xs-13r whitespace-nowrap text-gray-500` |
| dot | `h-[3px] w-[3px]` (dot.svg) |
| thumbnail | `w-[140px] h-[100px] shrink-0 rounded-2xl overflow-hidden` + bg `#d9d9d9` |

## 에셋 매핑 (재사용)

| 아이템 | title | source | date | thumb |
|---|---|---|---|---|
| 1 | `[진단과 제언] SDGs와 ESG, 실천이 관건이다` | 이투데이 | 2026-01-19 | thumb (news-featured/thumb.jpg) |
| 2 | `[수요논단] ESG 정착은 우리의 새로운 미래` | 한국대학신문 | 2022-01-18 | thumb-b (news-list/thumb-b.png) |
| 3 | `[수요논단] 정부차원에서 ESG창업 붐(boom) 조성해야` | 한국대학신문 | 2022-01-18 | thumb (news-featured/thumb.jpg) |

## 파일 추가
- `src/components/sections/NewsDetailRelated/NewsDetailRelated.tsx`
- `src/components/sections/NewsDetailRelated/data.ts` (interface + RELATED_NEWS)
- `src/components/sections/NewsDetailRelated/index.ts`
- `src/routes/NewsDetailRelatedPreview.tsx`
- App.tsx에 preview route 추가 + `/news/:id` 라우트에 `<NewsDetailRelated />` 추가

## 시맨틱 HTML (G5)
- `<section aria-labelledby>` root
- `<h2>` heading (페이지 내 h1 = article title이므로 h2)
- `<ol>` + `<li>` + `<article>`
- `<h3>` per item title
- `<time datetime>` per item date

## i18n 가능성 (G8)
- 모든 텍스트 JSX literal (heading / title / summary / source / date)
- alt 텍스트 한국어 literal

## 측정 전략
- baseline: `figma-screenshots/news-detail-related.png` (936×486, list only)
- preview url: `/__preview/news-detail-related`
- clip: `--clip-x` 체크 필요 (PreviewWrapper bg-white 1920 중앙 배치 → list 시작은 x=492)
- bake-from-full 옵션 사용 여부: 단순 list라 불필요

## 트레이드오프
- Heading + list를 한 섹션으로 묶음 — Figma에서 별도 노드지만 논리적으로 묶는게 자연스러움
- RelatedItem을 NewsList의 NewsListItem과 구조 중복 — v4 격리 원칙 준수 (로컬 유지)
- 썸네일 자산 재사용 — NewsList에서 이미 사용 중, 동일 내용이라 신규 다운로드 불필요

## 새 npm 패키지 필요 여부
- 없음

## 측정 섹션 (단계 5/6 결과 기록)

### 단계 4.5 (G5~G8) — 차단 게이트
- G5 eslint: **PASS** (0 errors, 0 warnings)
- G6 text:image: **PASS** (ratio ∞, alt=0자, text=531자, 2 imgs. rasterHeavy=false)
- G7 Lighthouse: N/A (참고 게이트, lhci 미실행)
- G8 i18n literal: **PASS** (모든 텍스트 JSX literal)
- 자동 가드: tailwind-antipatterns 0건, baked-in-png 0건

### 단계 5 (G1~G4) — 1회차
- G1 pixel diff: **10.97%** (49889/454896px) — 참고 게이트 ≤15% **PASS**
- G2 dimensions:
  - h2 20px / 600 / 28px line / -0.4 letter — Text-xl/20SB spec ✓
  - h3 20px / 700 / 28px line / -0.4 letter — Text-xl/20B spec ✓
  - p 15px / 400 / 22.5px line / -0.1125 letter — Text-md/15R spec ✓
  - time 13px / 400 / 19.5px line — Text-xs/13R spec ✓
  - article 3개, each width 936 ✓, section height 537 (Figma 538, ±1) ✓
- G3 naturalWidth: 6 imgs 모두 > 0 (thumb.jpg 1080×608, thumb-b.png 280×200, dot.svg 3개)
- G4 colors:
  - h2/h3 rgb(29,38,35) = #1d2623 ✓
  - p rgb(93,106,102) = #5d6a66 ✓
  - time rgb(151,162,158) = #97a29e ✓
  - article border rgb(198,205,204) = #c6cdcc ✓

### 육안 semantic check
- 3 related items 배치 맞음 ✓
- 썸네일 우측 위치 맞음 ✓
- 제목→요약→meta 순서 ✓
- border-b 구분선 3개 ✓
- dot 점 meta 사이 ✓
- 텍스트 내용 baseline 일치 ✓
- 방향/SVG flip/color 반전 없음 ✓
- T-011 composite raster 패턴 없음 (완전 HTML 재구성) ✓

### 결론
차단 게이트(G5/G6/G8/G2/G4) 전부 PASS. 참고 게이트 G1 10.97% (≤15%). 자동 커밋 진입.
