# plan/contest-about.md — 경진대회 About 섹션 구현 계획

> Phase 3 단계 2. `research/contest-about.md` 기반. 전략: **[A] HTML 재구성** (노드 트리 살아있음).

## 1. 중요 결정 (사용자 확인 필요)

### 1.1 `HatchedSectionHeading` 공통 컴포넌트 승격 타이밍

- 40px 원형 아이콘 + 32Bold 제목 + HatchedDivider 조합은 `contest-about`(302:4978) + `contest-benefits`(302:5068) **2개 섹션에서 확정 재사용**.
- **옵션 A (권장·보수)**: 이번 섹션은 `ContestAbout/HatchedSectionHeading.tsx` **로컬** 컴포넌트로 구현. Benefits 구현 시 동일 구조 확인 후 `src/components/ui/HatchedSectionHeading.tsx`로 승격. Rule of Three 엄격 준수. 파일 이동 1회 비용.
- **옵션 B (과감)**: 즉시 `src/components/ui/HatchedSectionHeading.tsx`로 생성. Benefits 워커 중복 작업 제거. Rule of Three 룰 완화 (명확한 2회 사용 보장이므로 허용 범위).
- **기본 계획**: **옵션 A** — 섹션 간 결합도 낮추고 benefits 구현 시 구조 차이(padding·gap) 발견 시 수정 용이. 사용자가 옵션 B 선호 시 지시.

### 1.2 불릿 원형(Ellipse6) 처리 방식

- Figma는 12×12 SVG 에셋으로 내보내나 시각은 단색 녹색 원.
- **옵션 A (권장)**: CSS 재구성 `<span className="inline-block size-3 shrink-0 rounded-full bg-[#4FB654]" />` — 에셋 0개, 토큰 일관성, 색 변경 용이.
- **옵션 B (보수)**: Framelink SVG 다운로드 → `src/assets/contest-about/bullet.svg` — baked-in 원칙 엄격 준수. G1 diff 최소화.
- **기본 계획**: **옵션 A**. G1 미통과 시 B로 전환 (단계 6 수정 루프 내).

### 1.3 HatchedDivider 폭 불일치 (932 vs Figma 936)

- 기존 `@/components/ui/HatchedDivider` 고정 932×10.
- Figma divider는 `Frame 2043685981`의 fill 폭 = root content 폭 936.
- **기본 계획**: 기존 컴포넌트 **그대로 재사용** (4px 차이는 `items-stretch` 내에서 좌우 2px씩 절댓값 미세. G1 기여 예상 <0.1%p).
- G1 실패 시 fallback: HatchedDivider prop `width?: number` 추가 또는 섹션 로컬 SVG.

### 1.4 Preview 래퍼 전략 (1416 vs 1920)

- **옵션 A (권장)**: `w-[1416px] mx-auto bg-white` — baseline 1416×459과 1:1, clip 불필요, 측정 단순.
- **옵션 B**: `w-[1920px] mx-auto bg-white` + 좌우 padding 252 → 실제 `/contest` 페이지 레이아웃과 일치하나 clip 필수 (`--clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 459`).
- **기본 계획**: **옵션 A** (섹션 단위 격리 원칙). 실제 페이지 통합은 Phase 3 후 별도.

## 2. 컴포넌트 구조

```
src/components/sections/ContestAbout/
├─ ContestAbout.tsx              — 섹션 entry (노드 302:4977)
├─ HatchedSectionHeading.tsx     — 로컬 공통 후보 (40×40 아이콘 + 32B 제목 + HatchedDivider)
├─ BulletCard.tsx                — 로컬 (20SB 제목 + BulletList)
├─ BulletList.tsx                — 로컬 (12×12 녹색 원 + 16R 텍스트 × 3)
└─ index.ts                      — barrel export
```

### 2.1 `ContestAbout.tsx` 시그니처

```tsx
export function ContestAbout(): JSX.Element
```
- props 없음. 모든 텍스트·불릿 상수. 섹션 로컬 완결.

### 2.2 `HatchedSectionHeading.tsx` (로컬, Benefits 때 `ui/`로 승격 예정)

```tsx
import { HatchedDivider } from "@/components/ui/HatchedDivider";

export type HatchedSectionHeadingProps = {
  iconSrc: string;          // /src/assets/contest-about/heading-icon.png 등
  iconAlt?: string;         // a11y 용도. 빈 문자열이면 장식
  title: string;            // "ESG 실천 아이디어 경진대회란?"
};

export function HatchedSectionHeading({
  iconSrc, iconAlt = "", title,
}: HatchedSectionHeadingProps): JSX.Element {
  return (
    <div className="flex flex-col items-stretch gap-[21px]">
      <div className="flex items-center gap-3">
        <img
          src={iconSrc}
          alt={iconAlt}
          aria-hidden={iconAlt === "" ? true : undefined}
          className="block size-[40px] shrink-0 object-cover"
        />
        <h2 className="whitespace-nowrap font-bold text-[32px] leading-[1.3] tracking-[-0.96px] text-[#0a0a0a]">
          {title}
        </h2>
      </div>
      <HatchedDivider className="w-full" />
    </div>
  );
}
```
- `<h2>` 시맨틱 사용 (섹션 heading). Hero가 `<h1>`, About section이 `<h2>`.
- `aria-hidden`: alt 빈 문자열이면 데코 처리, alt 있으면 a11y 노출.

### 2.3 `BulletList.tsx` (로컬)

```tsx
export type BulletListProps = {
  items: readonly string[];
};

export function BulletList({ items }: BulletListProps): JSX.Element {
  return (
    <ul className="flex w-[246px] flex-col gap-3">
      {items.map((text) => (
        <li key={text} className="flex items-center gap-3">
          <span
            aria-hidden
            className="inline-block size-3 shrink-0 rounded-full bg-[#4FB654]"
          />
          <span className="whitespace-nowrap font-normal text-[16px] leading-[1.5] tracking-[-0.16px] text-[#1E2939]">
            {text}
          </span>
        </li>
      ))}
    </ul>
  );
}
```
- `<ul>/<li>` 시맨틱. 원형은 CSS 재구성 (§1.2 옵션 A).

### 2.4 `BulletCard.tsx` (로컬)

```tsx
import { BulletList } from "./BulletList";

export type BulletCardProps = {
  title: string;
  items: readonly string[];
};

export function BulletCard({ title, items }: BulletCardProps): JSX.Element {
  return (
    <div className="flex h-[196px] flex-1 flex-col gap-5 rounded-[20px] bg-[#EFF0F0] p-6">
      <h3 className="whitespace-nowrap font-semibold text-[20px] leading-[1.4] tracking-[-0.4px] text-[#0A0A0A]">
        {title}
      </h3>
      <BulletList items={items} />
    </div>
  );
}
```
- `p-6` = 24px. `gap-5` = 20px. Figma 수치 정확 매칭.
- `h-[196px]` 고정 (Figma FIXED 지시).

### 2.5 `ContestAbout.tsx` 본체

```tsx
import { HatchedSectionHeading } from "./HatchedSectionHeading";
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

export function ContestAbout(): JSX.Element {
  return (
    <section
      aria-labelledby="contest-about-title"
      className="flex w-[1416px] flex-col items-stretch gap-5 px-[240px] py-[64px]"
    >
      <HatchedSectionHeading
        iconSrc={headingIcon}
        iconAlt=""
        title="ESG 실천 아이디어 경진대회란?"
      />
      <div className="flex flex-col items-stretch gap-5">
        <p
          id="contest-about-title"
          className="w-[936px] font-medium text-[16px] leading-[1.5] tracking-[-0.16px] text-black"
        >
          ESG를&nbsp;
          <span className="font-bold text-[#4FB654]">
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
- root padding `px-[240px] py-[64px]` ≡ Figma `padding: 64 240`
- root gap `gap-5` ≡ 20
- heading block internal gap 21 → `HatchedSectionHeading` 내부 `gap-[21px]`
- body block gap 20 → `gap-5`
- 2-column gap 16 → `gap-4`
- intro width 936 → `w-[936px]` (FIXED)

### 2.6 `index.ts`

```ts
export { ContestAbout } from "./ContestAbout";
```

## 3. 에셋 계획

| # | 소스 | 목적지 | 처리 |
|---|------|--------|------|
| 1 | Figma 302:4980 Rectangle 23 (IMAGE fill), `imageRef=e0323828d272debafbaef51af08c8a79feec0462`, `needsCropping:true`, `filenameSuffix:"273e38"`, cropTransform = `[[0.4062,0,0.2969],[0,0.7447,0.0582]]` | `src/assets/contest-about/heading-icon.png` | Framelink `download_figma_images` (pngScale=2 기본, 하지만 40px 원본이라 scale 1도 허용. scale 2로 고품질) |

**Framelink 호출 예시:**
```
download_figma_images(
  fileKey: "qhrMiGVfoSQ1QMFhVN8z78",
  localPath: "src/assets/contest-about",
  nodes: [{
    nodeId: "302:4980",
    fileName: "heading-icon.png",
    imageRef: "e0323828d272debafbaef51af08c8a79feec0462",
    needsCropping: true,
    filenameSuffix: "273e38",
    cropTransform: [[0.4062, 0, 0.2969], [0, 0.7447, 0.0582]]
  }],
  pngScale: 2
)
```

**HatchedDivider / 불릿**: 에셋 다운로드 없음 (기존 컴포넌트 재사용 + CSS 재구성).

`scripts/download-assets.sh`는 cropTransform 미지원이므로 Framelink MCP 직접 호출 (contest-hero 선례). `verify-assets.sh`는 파일 1개 존재·크기 >0 확인용으로만 사용.

## 4. 라우트 설정

### 4.1 `src/routes/ContestAboutPreview.tsx`

```tsx
import { ContestAbout } from "@/components/sections/ContestAbout";

/**
 * __preview/contest-about — G1 픽셀 비교용 격리 라우트.
 * baseline: figma-screenshots/contest-about.png (1416×459).
 * 섹션이 1416 너비 content이므로 그대로 렌더. clip 불필요.
 */
export function ContestAboutPreview() {
  return (
    <div className="w-[1416px] mx-auto bg-white">
      <ContestAbout />
    </div>
  );
}
```

### 4.2 `src/App.tsx`

- `import { ContestAboutPreview }` 추가
- route `{ path: "/__preview/contest-about", element: <ContestAboutPreview /> }` 추가

## 5. 측정 계획 (4 게이트)

| 게이트 | 내용 | 예상 |
|--------|------|------|
| G1 | pixelmatch diff vs `figma-screenshots/contest-about.png` (1416×459) | **≤ 5%** 목표. 노드 기반 HTML 재구성, blend 모드 없음, 텍스트 Pretendard만 → **예상 1~3%** |
| G2 | 치수 정확도 (font ±1, margin/padding ±2) | PASS 고신뢰 (모든 값 Figma variable 직접 반영) |
| G3 | 에셋 naturalWidth > 0 | heading-icon.png (1장) naturalWidth 확인 |
| G4 | hex 일치 | #0A0A0A, #4FB654, #EFF0F0, #1E2939, 그리고 HatchedDivider #97A29E/#B1B9B6 (기존 공통) |

**측정 명령:**
```
scripts/compare-section.sh contest-about
```
- baseline: `figma-screenshots/contest-about.png` (1416×459)
- Preview URL: `http://localhost:{port}/__preview/contest-about`
- 캡처 viewport: **1416×459** (baseline 일치)
- **clip 불필요** (Preview 래퍼 1416 풀폭)

## 6. 육안 semantic 검증 (§6.4 단계 5)

- [ ] 지구본 아이콘이 제목 **왼쪽** (오른쪽 아님)
- [ ] HatchedDivider가 제목 바로 **아래** (intro 위)
- [ ] intro 녹색·bold 구간이 정확히 `아이디어 → 실행 → 사회적 가치` (앞 "ESG를 ", 뒤 "로 연결하는..." 까지 안 먹음)
- [ ] 카드 좌 = 핵심 특징, 우 = 주요 대상 (swap 없음)
- [ ] 핵심 특징 불릿 순서: SDGs・ESG 기반 → 대학・청년・지역 → 대회로 끝나지 않고
- [ ] 주요 대상 불릿 순서: 대학생・청년 → 대학・지역 혁신 조직 → ESG에 관심 있는 기업・기관
- [ ] 불릿 원형 색상 균일 녹색 (#4FB654, 그라디언트 없음)
- [ ] 카드 배경 연한 회색 (#EFF0F0, 테두리/그림자 없음)
- [ ] 카드 rounded 20 (과하지도 모나지도 않음)

## 7. 트레이드오프·리스크

1. **Ellipse6 CSS 재구성 (§1.2)**: 옵션 A 선택. Figma export는 SVG이나 시각상 단색 원. 미세 그라디언트 가능성 낮음. 미통과 시 B 전환.
2. **HatchedDivider 폭 4px 차이 (§1.3)**: G1 기여 예상 <0.1%p. 초과 시 prop 확장.
3. **Pretendard Variable 로딩**: 프로젝트에 이미 등록됨. font-weight 400/500/600/700 모두 사용 → Variable 폰트 지원 확인 필요. 현재 `src/styles/fonts.css` 확인 결과 등록됨 (About 섹션들에서 동일 weight 사용).
4. **16px whitespace-nowrap**: intro 전체 `<p>`가 w=936 FIXED이므로 가로 overflow 절대 안 됨. 폰트 렌더가 Figma보다 넓으면 clip 발생 → `whitespace-nowrap` 제거 (자연 wrap) vs 유지(baseline 일치) 트레이드오프. **선택: `whitespace-nowrap` 미사용, 기본 wrap 허용** (baseline은 한 줄로 맞지만 안전 여유). Figma 측정상 936에 들어가므로 줄바꿈 없음 예상.
5. **카드 h=196 FIXED**: 내부 콘텐츠 188 + padding 48 = 236? 아니, 20SB height 28 + gap 20 + 불릿 (24×3 + gap 12×2 = 96) = 144 + padding-top/bottom 24·24 = 192. 4px 여유. 안전.
6. **시맨틱 h2/h3 선택**: Hero `<h1>` 전제. About 섹션 heading을 `<h2>`, 카드 제목을 `<h3>`. `aria-labelledby`로 섹션 접근성. 단, intro `<p>`를 `id="contest-about-title"`로 맞춘 건 오타 — 실제 id는 heading에 걸어야 함. 구현 시 `HatchedSectionHeading`의 `<h2>`에 `id` prop 전달하도록 수정 필요.

**6번 보정:**
```tsx
// HatchedSectionHeading에 id prop 추가
export type HatchedSectionHeadingProps = {
  iconSrc: string; iconAlt?: string; title: string;
  titleId?: string;  // 추가
};
// <h2 id={titleId} ...>
```
그리고 ContestAbout에서 `titleId="contest-about-title"`, intro `<p>`의 id 제거, `<section aria-labelledby="contest-about-title">`.

## 8. 빌드 확인 계획

- `npm run build` → TypeScript strict 통과
- `npm run lint` → 경고 0
- `npm run dev` → `/__preview/contest-about` 200 응답 + asset 200

## 9. 새 공통 컴포넌트 승격 제안

**이번 섹션에서는 없음.** `HatchedSectionHeading`은 `contest-benefits` 구현 시 **로컬 → `ui/`** 승격 예정 (§1.1 옵션 A).

## 10. 단계 3 진입 전 사용자 승인 필요 사항

- [ ] **1.1 `HatchedSectionHeading` 승격 타이밍**: A(로컬→후속섹션에서 승격) / B(즉시 `ui/` 신설)
- [ ] **1.2 불릿 원형 처리**: A(CSS 재구성) / B(SVG 다운로드)
- [ ] **1.3 HatchedDivider 932px 재사용** 수락 (폭 4px 차이)
- [ ] **1.4 Preview 래퍼 1416** 수락 (clip 불필요)
- [ ] Framelink cropTransform 기반 아이콘 다운로드 수락

## 11. 측정값 기록 섹션

### 회차 1 (2026-04-14)

**명령:** `bash scripts/compare-section.sh contest-about --clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 459`
(Preview 래퍼 `w-[1416px] mx-auto`가 1920 viewport에서 x=252 중앙정렬 되므로 clip 필수 — research §6 및 plan §1.4 가정 수정)

#### G1 — 시각 일치
- **DIFF: 3.01%** (19,586 / 649,944 px) — baseline 1416×459, threshold <5% PASS
- (참고) clip 없이 1차 측정 시 5.23% — 1920 viewport 좌상단 크롭이 섹션 오프셋과 어긋나 발생한 측정 artifact. clip 적용 시 실제 렌더 대비 3.01%로 정상화

#### G2 — 치수 정확도 (±1/±2)
- section: 1416×460.59, padding 64/240, gap 20 ✓
- headingIcon: 40×40 at (240, 64.8) ✓ (Figma 40×40)
- h2: 32px / LH 41.6 (1.3em) / LS -0.96px / weight 700 ✓
- divider: 936×10 at (240, 126.59) — HatchedDivider SVG는 932w, wrapper가 936으로 확장(4px 오차 계획내)
- intro: 16px / LH 24 / LS -0.16px / weight 500 ✓
- introSpan: weight 700, #4FB654, text "아이디어 → 실행 → 사회적 가치" ✓
- cards: 460×196, padding 24, gap 20, radius 20, bg rgb(239,240,240)=#EFF0F0 ✓
- card title: 20px / LH 28 (1.4em) / LS -0.4px / weight 600 / #0A0A0A ✓
- 6 bullets: text 16/24/400, dot 12×12 rounded-full bg #4FB654 ✓
- PASS

#### G3 — 에셋 무결성
- headingIcon naturalWidth=572, naturalHeight=572 > 0 ✓ PASS (1/1)

#### G4 — 색상
- h2 #0A0A0A ✓
- 카드 bg #EFF0F0 ✓
- 카드 title #0A0A0A ✓
- 불릿 dot bg #4FB654 ✓
- intro base black, intro span #4FB654 ✓
- PASS

#### 육안 semantic 검증 (§6.4)
- [x] 지구본 아이콘 제목 **왼쪽**
- [x] HatchedDivider 제목 **아래** (intro 위)
- [x] intro 녹색·bold 구간 = "아이디어 → 실행 → 사회적 가치" 정확 (span 경계 OK)
- [x] 카드 좌 = 핵심 특징, 우 = 주요 대상 (swap 없음)
- [x] 핵심 특징 불릿 순서: SDGs → 대학·청년·지역 → 대회로...
- [x] 주요 대상 불릿 순서: 대학생·청년 → 대학·지역 혁신 → ESG에 관심...
- [x] 불릿 원형 균일 녹색 (#4FB654)
- [x] 카드 배경 연한 회색 #EFF0F0, 테두리/그림자 없음
- [x] 카드 rounded 20 적절
- **육안 검증: PASS** (방향 반전·swap·색 반전·줄바꿈 오류 없음)

### 결과
**1회차 완통과 (G1 3.01% / G2·G3·G4 / 육안 PASS).** 수정 루프 진입 불필요.

### plan §1.4 보정 메모
Preview 래퍼를 1416 `mx-auto`로 두면 1920 viewport 중앙 정렬되어 baseline과 x offset 252 발생 → clip 필수. "clip 불필요"로 기술했던 §1.4 가정을 **clip 필수 (252,0,1416,459)** 로 정정. 대안은 래퍼를 `w-[1920px]` + 섹션을 `mx-auto`로 하는 형태이지만 현재 구조 유지 + clip 인자가 더 간단.
