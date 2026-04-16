# plan/contest-about.md — 경진대회 About 섹션 구현 계획 (v4)

> Phase 3 단계 2. `research/contest-about.md` 기반. 전략: **[A] HTML 재구성** (노드 트리 살아있음, v4 구조 중심).

## 1. v4 차이점 요약

- 차단 게이트: G5 시맨틱 / G6 텍스트비율 / G8 i18n / G2 치수 / G4 색상 / 구조 지표 (token_ratio ≥ 0.2, absolute/file ≤ 5)
- G1 (시각 diff) = 참고 지표 (≤ 15%, 차단 아님)
- 섹션 자기정렬: `mx-auto max-w-[1416px]` section 루트 (Preview wrapper 의존 금지)
- 디자인 토큰 우선: `brand-500`, `gray-100`, `var(--spacing-*)`, `var(--text-*)` 참조

## 2. 컴포넌트 구조

```
src/components/sections/ContestAbout/
├─ ContestAbout.tsx              — 섹션 entry
├─ HeadingWithIcon.tsx           — 로컬 (아이콘 + h2 + HatchedDivider)
├─ BulletCard.tsx                — 로컬 (article + h3 + ul)
└─ index.ts                      — barrel
```

### 2.1 `HeadingWithIcon.tsx` (로컬, Rule of Three 2/3 — benefits 때 승격)

```tsx
import { HatchedDivider } from "@/components/ui/HatchedDivider";

export function HeadingWithIcon({
  iconSrc,
  iconAlt = "",
  title,
  titleId,
}: {
  iconSrc: string;
  iconAlt?: string;
  title: string;
  titleId?: string;
}) {
  return (
    <div className="flex flex-col gap-[21px]">
      <div className="flex items-center gap-3">
        <img
          src={iconSrc}
          alt={iconAlt}
          aria-hidden={iconAlt === "" ? true : undefined}
          className="block size-10 shrink-0 object-contain"
        />
        <h2
          id={titleId}
          className="text-[32px] font-bold leading-[1.3] tracking-[-0.96px] text-[#0A0A0A]"
          style={{ fontFamily: "var(--font-family-pretendard)" }}
        >
          {title}
        </h2>
      </div>
      <HatchedDivider className="w-full" />
    </div>
  );
}
```

### 2.2 `BulletCard.tsx` (로컬)

```tsx
export function BulletCard({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <article className="flex h-[196px] flex-1 flex-col gap-5 rounded-[20px] bg-gray-100 p-6">
      <h3
        className="text-[20px] font-semibold leading-[1.4] tracking-[-0.4px] text-[#0A0A0A]"
        style={{ fontFamily: "var(--font-family-pretendard)" }}
      >
        {title}
      </h3>
      <ul className="flex w-[246px] flex-col gap-3">
        {items.map((text) => (
          <li key={text} className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block size-3 shrink-0 rounded-full bg-brand-500"
            />
            <span
              className="whitespace-nowrap text-[16px] font-normal leading-[1.5] tracking-[-0.16px] text-[#1E2939]"
              style={{ fontFamily: "var(--font-family-pretendard)" }}
            >
              {text}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
```

### 2.3 `ContestAbout.tsx`

```tsx
import { HeadingWithIcon } from "./HeadingWithIcon";
import { BulletCard } from "./BulletCard";
import headingIcon from "@/assets/contest-about/heading-icon.png";

const CORE_FEATURES = [
  "SDGs・ESG 기반 현장 문제해결",
  "대학・청년・지역 연계 팀 프로젝트",
  "대회로 끝나지 않고 실천과제로 연결",
] as const;

const TARGETS = [
  "대학생・청년",
  "대학・지역 혁신 조직",
  "ESG에 관심 있는 기업・기관",
] as const;

export function ContestAbout() {
  return (
    <section
      aria-labelledby="contest-about-title"
      className="mx-auto flex w-full max-w-[1416px] flex-col gap-5 px-[240px] py-[64px]"
    >
      <HeadingWithIcon
        iconSrc={headingIcon}
        iconAlt=""
        title="ESG 실천 아이디어 경진대회란?"
        titleId="contest-about-title"
      />
      <div className="flex flex-col gap-5">
        <p
          className="text-[16px] font-medium leading-[1.5] tracking-[-0.16px] text-black"
          style={{ fontFamily: "var(--font-family-pretendard)" }}
        >
          {"ESG를\u00A0"}
          <span className="font-bold text-brand-500">
            아이디어 → 실행 → 사회적 가치
          </span>
          로 연결하는 실천형 프로그램 입니다.
        </p>
        <div className="flex items-start gap-4">
          <BulletCard title="핵심 특징" items={CORE_FEATURES} />
          <BulletCard title="주요 대상" items={TARGETS} />
        </div>
      </div>
    </section>
  );
}
```

**매핑 요약:**
- root `px-[240px] py-[64px]` ≡ Figma `padding: 64 240`
- root `gap-5` ≡ 20
- heading internal `gap-[21px]` ≡ 21
- body `gap-5` ≡ 20
- card row `gap-4` ≡ 16
- card internal `gap-5` ≡ 20, padding `p-6` ≡ 24
- bullet `gap-3` ≡ 12

### 2.4 `index.ts`

```ts
export { ContestAbout } from "./ContestAbout";
```

## 3. 에셋 계획

| # | 소스 | 목적지 | 상태 |
|---|------|--------|------|
| 1 | Figma REST Images API `302:4980 scale=2` (cropTransform 자동 적용) | `src/assets/contest-about/heading-icon.png` | **다운로드 완료** (80×80 RGBA) |

baseline도 **다운로드 완료**: `figma-screenshots/contest-about.png` 1416×459 RGBA.

## 4. 라우트

### 4.1 `src/routes/ContestAboutPreview.tsx`

```tsx
import { ContestAbout } from "@/components/sections/ContestAbout";

export function ContestAboutPreview() {
  return (
    <div className="w-[1920px] mx-auto bg-white">
      <ContestAbout />
    </div>
  );
}
```

### 4.2 `src/App.tsx`

- import `ContestAboutPreview` + route `/__preview/contest-about`
- import `ContestAbout` — `/contest` 라우트에 `<ContestHero />` 뒤에 추가

## 5. v4 구조 지표 예상

| 지표 | 목표 | 예상 |
|------|------|------|
| token_ratio | ≥ 0.2 | bg-brand-500 / bg-gray-100 / var(--font-family-pretendard) / var(--spacing-*) → 약 0.3~0.4 (near-black 3개 hex 제외하고) |
| absolute/file | ≤ 5 | **0** (전부 flex) |
| semantic_score | ≥ 2 | section + h2 + h3 + article + ul + li + p → 6+ |

## 6. 측정 계획

### 차단 게이트 (단계 4.5)
- G5 eslint jsx-a11y: 0 error
- G6/G8 text ratio + i18n: `scripts/check-text-ratio.mjs src/components/sections/ContestAbout`
- 구조 지표: `node scripts/check-structure-quality.mjs --section=contest-about`
- 자동 가드: `scripts/check-tailwind-antipatterns.sh`, `scripts/check-baked-in-png.sh`

### 참고 지표 (단계 5)
- G1: `scripts/compare-section.sh contest-about --clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 459`
- G2/G3/G4: Playwright computed style (compare-section.sh 내장)

## 7. 육안 semantic 검증 (단계 5.5)

- [ ] 아이콘 제목 왼쪽
- [ ] HatchedDivider 제목 아래
- [ ] intro 녹색·bold = "아이디어 → 실행 → 사회적 가치" 정확
- [ ] 카드 좌=핵심특징, 우=주요대상
- [ ] 핵심 특징 불릿 순서: SDGs → 대학・청년 → 대회로...
- [ ] 주요 대상 불릿 순서: 대학생・청년 → 대학・지역 → ESG에 관심...
- [ ] 불릿 원 균일 #4FB654
- [ ] 카드 배경 #EFF0F0, 테두리/그림자 없음

## 8. 측정 기록

### 회차 1 (2026-04-16, v4)

**명령:** `bash scripts/compare-section.sh contest-about --clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 459`

#### 차단 게이트 (단계 4.5)
- **G5 eslint jsx-a11y**: 0 error ✓ PASS
- **G6 텍스트:이미지 비율**: ratio 8.82, rasterHeavy=false ✓ PASS
- **G8 i18n literal text**: Korean JSX 리터럴 존재 ✓ PASS
- **check-tailwind-antipatterns**: ✓ PASS (음수 width 없음, 정수 반올림 없음)
- **check-baked-in-png**: ✓ PASS (Framelink PNG 위 CSS 재적용 없음)

#### 구조 지표 (v4)
- **token_ratio: 0.361** ≥ 0.2 ✓ PASS
- **absolute_count: 0** (≤ 5/file) ✓ PASS
- **semantic_score: 4** (section, h2, h3, article) ≥ 2 ✓ PASS
- **text_raster_flag: 0** ✓ PASS
- **literal_korean_count: >0** ✓
- **magic_number_count: 23** (near-black 3개 hex + px-[240px] + 각종 arbitrary 치수. 토큰 없는 디자인 값들)

#### 참고 지표 (단계 5)

**G1 시각 diff (참고):**
- **DIFF: 2.87%** (18,666 / 649,944 px) — ≤ 15% PASS (목표), ≤ 5% (v3 이전 기준)
- 차이 원인: 폰트 anti-aliasing + HatchedDivider 4px 폭 차이. semantic 오류 없음

**G2 치수 정확도 (Playwright computed style):**
- section: 1416×460.59, padding 64/240, gap 20 ✓
- headingIcon: 40×40 at (492, 64.8), naturalWidth=80 ✓
- h2: 32px / LH 41.6 / LS -0.96px / weight 700 ✓
- divider: 932×10 at (494, 126.59) — HatchedDivider 932w 고정 (Figma 936, -4 수용) ✓
- intro: 16/24/500/-0.16px ✓
- introSpan: 16/24/700/-0.16px #4FB654 ✓
- cards: 460×196, padding 24, gap 20, radius 20, bg #EFF0F0 ✓
- card title: 20/28/600/-0.4px #0A0A0A ✓
- 6 bullets: 16/24/400, dot 12×12 rounded-full #4FB654 ✓
- PASS (모든 값 ±1 이내)

**G3 에셋 무결성:** headingIcon naturalWidth=80 > 0 ✓ PASS (1/1)

**G4 색상:**
- h2 #0A0A0A ✓
- 카드 bg #EFF0F0 ✓
- 카드 title #0A0A0A ✓
- 불릿 dot #4FB654 ✓ (토큰 참조 `bg-brand-500`)
- intro span #4FB654 ✓ (토큰 참조 `text-brand-500`)
- PASS

#### 육안 semantic 검증 (§6.4)
- [x] 지구본 아이콘 제목 왼쪽
- [x] HatchedDivider 제목 아래
- [x] intro 녹색·bold = "아이디어 → 실행 → 사회적 가치" 정확 (span 경계 OK)
- [x] 카드 좌=핵심특징, 우=주요대상 (swap 없음)
- [x] 핵심 특징 불릿 순서 정확 (SDGs → 대학・청년・지역 → 대회로)
- [x] 주요 대상 불릿 순서 정확 (대학생・청년 → 대학・지역 혁신 → ESG 관심)
- [x] 불릿 원형 균일 #4FB654
- [x] 카드 배경 #EFF0F0, 테두리/그림자 없음
- [x] 카드 rounded 20 적절
- **PASS** (방향 반전·swap·색 반전·줄바꿈 오류 없음)

### 결과
**1회차 완통과.**
- 차단 게이트 G5/G6/G8/구조지표 전부 PASS
- 구조 지표: token_ratio 0.361 (목표 0.2+), absolute 0/3 files (목표 ≤5), semantic 4 (목표 ≥2)
- 참고 지표: G1 2.87% (목표 ≤15%), G2/G3/G4 전부 PASS
- 육안 semantic OK

수정 루프 진입 불필요.
