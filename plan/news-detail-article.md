# plan/news-detail-article.md

## 파일 구조

```
src/components/sections/NewsDetailArticle/
├─ NewsDetailArticle.tsx  — 메인 (article 시맨틱 + hero + header + body + dividers)
└─ index.ts
src/assets/news-detail-article/
├─ hero.jpg (공용, hero + body image 동일 소스)
└─ raw/hero.png (원본, gitignored by convention)
src/routes/NewsDetailArticlePreview.tsx
```

## 컴포넌트 시그니처

```tsx
export function NewsDetailArticle(): JSX.Element
```

props 없음. 단일 article 데이터는 컴포넌트 내부 static literal (Figma 디자인과 동일). 실제 API 연동은 /news/:id 페이지가 데이터 주입하는 시점(추후 리팩터)에서 props로 승격.

## HTML 시맨틱 (G5)

```
<section mx-auto max-w-[1920px] flex-center bg-gray-000>
  <article w-[936px] flex flex-col gap-10>
    <figure ...>                         // hero
      <img src=hero.jpg alt=...>
    </figure>
    <div flex flex-col gap-6>
      <header flex flex-col gap-3>
        <h1 text-3xl/32B>[진단과 제언]...</h1>
        <p class=meta>
          <span>이투데이</span>
          <span aria-hidden="true" class=dot></span>
          <time dateTime="2026-01-19">2026-01-19</time>
        </p>
      </header>
      <HatchedDivider />
      <figure px-120>
        <img src=hero.jpg alt=caption>
        <figcaption>한광식 전문대학...</figcaption>
      </figure>
      <div class=body-text>
        <p>...</p>×8
      </div>
      <HatchedDivider />
    </div>
  </article>
</section>
```

`<article>` 전체 감싸기, 제목은 `<h1>` (페이지 최상위 제목이므로). 메타는 `<p>` 안에 `<time datetime>`. 이미지 둘 다 `<figure>`.

## Tailwind 매핑

### 루트
- `mx-auto flex w-full max-w-[1920px] items-center justify-center bg-[color:var(--color-gray-000)]`
- article: `w-[936px] flex flex-col gap-[40px]`

### Hero
- `<figure className="relative w-full aspect-[456/280] rounded-[16px] overflow-hidden bg-[#d9d9d9]">`
- `<img className="absolute inset-0 size-full object-cover" src={hero} alt="SDGs와 ESG 관련 사진" />`

### Body wrapper (134:4032 after hero)
- `flex flex-col gap-[24px] w-full` (pr-0 무시 — 의미 없음)

### Header (134:4041)
- `flex flex-col gap-[12px] w-full`
- Title: `<h1 className="text-[color:var(--color-gray-900)] font-bold text-[32px] leading-[1.3] tracking-[-0.96px]" style={{ fontFamily: "var(--font-family-pretendard)" }}>...`  
  (토큰 `--text-3xl-32b-*`는 letterSpacing -3px — Figma 원본은 -0.96px = -0.03em*32. 일관성 위해 raw 값 사용)
- Meta `<p className="flex items-center gap-[8px] text-[14px] text-[color:var(--color-gray-500)] leading-[1.5] tracking-[-0.07px]">`
  - `<span>이투데이</span>`
  - `<span aria-hidden className="inline-block size-[3px] rounded-full bg-[color:var(--color-gray-500)]" />` (Ellipse 5 dot — 3px 원)
  - `<time dateTime="2026-01-19">2026-01-19</time>`

### HatchedDivider
- `<HatchedDivider />` — 기존 ui/HatchedDivider (w-full auto). 상/하 각 1회.

### Body image figure (134:4062)
- `<figure className="flex w-full flex-col items-center gap-[10px] px-[120px]">`
- `<img className="w-full aspect-[936/564] rounded-[16px] object-cover bg-[#d9d9d9]" ... />`
- `<figcaption className="text-[14px] text-[color:var(--color-gray-500)] leading-[1.5] tracking-[-0.07px] whitespace-nowrap" style=pretendard>한광식 ...</figcaption>`

### Body text (134:4035)
- `<div className="flex flex-col gap-0 text-[16px] text-[color:var(--color-gray-900)] leading-[1.5] tracking-[-0.16px] w-full" style=pretendard>`
  - 8개 `<p className="m-0">...</p>`
  - 마지막 &nbsp; 문단은 생략 (시맨틱 불필요)

## 본문 텍스트 (JSX literal, G8)

design_context 8 문단을 그대로 사용. 약간의 unicode(특수 bullet △) 포함. HTML 엔티티 미사용, Korean literal 그대로.

## data-node-id 삽입

- 섹션 루트: `134:4157`
- Hero: `134:4030`
- Header wrapper: `134:4041`
- Title: `134:4034`
- Meta: `134:4036`, children 4037/4038/4039
- Divider (top): `134:4042`
- Body figure: `134:4062`, inner 4060, caption 4063
- Body text: `134:4035`
- Divider (bottom): `134:4064`

## 재사용 컴포넌트

- `HatchedDivider` (ui/) — 그대로 2회 사용 (라벨 없음 분기)

신규 공통 컴포넌트 없음. Rule of Three 미충족 (article figcaption, time-dot-meta 패턴 등).

## 라우팅

1. `NewsDetailArticlePreview.tsx` 추가:
   ```tsx
   export function NewsDetailArticlePreview() {
     return (
       <div className="w-[1920px] mx-auto bg-white">
         <NewsDetailArticle />
       </div>
     );
   }
   ```
2. `App.tsx`:
   - import 추가
   - `/__preview/news-detail-article` Route 추가
   - `/news/:id` 실제 라우트에 섹션 삽입 (breadcrumb 다음): `<NewsDetailBreadcrumb /><NewsDetailArticle />`

## 차단 게이트 예상

- **G5** 시맨틱: article + header + h1 + time + figure + figcaption 완비 → PASS 예상
- **G6** 텍스트/이미지 비율: 본문 2000+ 글자 + hero/body image alt 짧게 → 비율 충분 PASS
- **G8** i18n: 모든 텍스트 JSX literal → PASS
- **G2** 치수: font 32/14/16 정확. gap 40/24/12 정확. 단 letterSpacing `-0.96px` vs token `-3px` 차이 존재 — **Figma raw 값 적용** (G2 font ±1px 통과)
- **G4** 색상: gray-900/500 토큰 그대로 → PASS

## 참고 게이트

- **G1** 시각 diff: 긴 본문 → wrap 위치 브라우저 의존성 때문에 ~10% 내외 예상. 목표 ≤15%.
- **G3** 에셋: img naturalWidth > 0 → hero.jpg 1080×608 PASS
- **G7** Lighthouse: a11y/seo 95/90 → figure+figcaption+h1+time 다 있으므로 PASS 예상

## 측정 계획

단계 4.5: `bash scripts/measure-quality.sh news-detail-article src/components/sections/NewsDetailArticle`  
단계 5: `npx tsx tests/visual/run.ts --section news-detail-article --url http://localhost:5173/__preview/news-detail-article --baseline figma-screenshots/news-detail-article.png --clip-x 0 --clip-y 0 --clip-w 938 --clip-h 1400`

clip-h는 실제 article 렌더 높이에 맞춰 재조정 (dev server 실측).

## 측정 섹션

### 1차 (단계 4.5 / 5 — 2026-04-16)

**자동 가드**
- `eslint src/components/sections/NewsDetailArticle/`: 에러 0 → **G5 PASS**
- `check-text-ratio`: 텍스트 1954자, alt 49자, 2 img, ratio 39.88:1, rasterHeavy=false → **G6/G8 PASS**
- `check-tailwind-antipatterns`: 경고 0
- `check-baked-in-png`: 중첩 적용 없음

**G1 시각 diff**
- clip: `--clip-x 491 --clip-y 0 --clip-w 938 --clip-h 1856`
- 결과: **2.55%** (25822/1013040px) → **PASS** (목표 ≤15%)
- article 실제 렌더 높이: **1855.7px** (baseline 상단 ~1856px과 일치)

**G2 치수 (Playwright computed style)**
- H1: 32px/700/41.6px lineHeight/-0.96px letterSpacing — Figma Text-3xl/32B 일치
- body p: 16px/24px/-0.16px — Figma 일치
- meta p: 14px/21px — Figma 일치
- figcaption: 14px — Figma 일치
→ **PASS**

**G3 에셋 무결성**
- hero: naturalWidth 1080 > 0, 936×575 display
- body img: naturalWidth 1080 > 0, 696×419 display
→ **PASS**

**G4 색상**
- gray-900 → rgb(29, 38, 35) = #1D2623 정확
- gray-500 → rgb(151, 162, 158) = #97A29E 정확
→ **PASS**

**v4 구조 지표** (`check-structure-quality`)
- magic_numbers: 26, tokens: 16, token_ratio: 0.381 (≥0.2 PASS)
- absolute: 1 (≤5 PASS)
- semantic_score: 5 (≥2 PASS, `<article><header><h1><figure><figcaption><time>`)
- literal_korean 분리: alert 없음
→ **모든 지표 PASS**

**육안 semantic 검증**
- baseline/capture 비교: hero 사진 / 제목 / 메타 위치 / body image(centered px-120) / 본문 문단 / 해치 divider 모두 일치
- diff 이미지: 텍스트 안티앨리어싱 + 이미지 JPEG 압축 미세차이. semantic 오류 없음
→ **PASS**

**페이지 통합**
- `/news/:id` 라우트에서 breadcrumb 다음에 article 정상 렌더. pt-[140px] clearance 유지

**빌드/타입체크**
- `tsc --noEmit`: 에러 0
- `npm run build`: 성공 (1.02s)

### 결론

1차에 모든 차단 게이트 (G5/G6/G8/G2/G4) + 참고 게이트 (G1/G3) PASS. 수정 루프 불필요. 자동 커밋 진행.

## 자율 모드 결정

단계 2(plan) 완료, 자율 모드이므로 승인 대기 없이 단계 3(에셋 수집 확정) → 단계 4 (구현) 진행.
