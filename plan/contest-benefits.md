# plan/contest-benefits.md — 경진대회 Benefits 섹션 구현 계획 (v4)

> Phase 3 단계 2. `research/contest-benefits.md` 기반. 전략: **[A] HTML 재구성**.
> **v4 기준**: 구조 중심 (G5~G8 차단), G1 ≤15% 참고. 토큰 적극 사용 (token_ratio ≥ 0.2).

## 1. 핵심 결정 (v4 자율 모드 — 과거 멈춤 지점 사전 결정)

### 1.1 `HatchedSectionHeading` 공통 승격 (contest-about 로컬 → ui/)
- **이동**: `sections/ContestAbout/HeadingWithIcon.tsx` → `src/components/ui/HatchedSectionHeading.tsx`
- API 보존, 컴포넌트 이름은 `HatchedSectionHeading` (명확 이름으로 변경)
- ContestAbout import 갱신 1건

### 1.2 CTA 통합 (섹션 내부 `<aside>`)
- Figma 트리상 Body 래퍼 자식이라 통합 자연스러움. baseline 1장 측정.

### 1.3 버튼 폰트 Pretendard 통일 (Inter 로딩 생략)
- `font-bold` + 기존 스택 사용. 시각 차이 <0.1% 예상.

### 1.4 arrow-right 인라인 SVG
- `<svg viewBox="0 0 24 24">` + path. dependency 0.

### 1.5 카드 설명 `\L` → 튜플 + `<br />`
- `lines: readonly [string, string]`.

### 1.6 CTA 배경 블렌드 재현 전략 (v3 회귀 분석 반영)
- **옵션 C 채택**: Framelink cta-bg.png를 먼저 받아 육안 확인.
  - 만약 Figma가 이미 합성(녹색 톤) PNG를 export → 그대로 `background-image`로 사용, overlay 불필요
  - 만약 원색 도시 일러스트 → `background: #005C33`; 위에 `<img className="opacity-30 mix-blend-overlay">` 배치 (또는 CSS `background-blend-mode`)
- v4는 G1이 참고 지표라 픽셀 근접성보다 **구조 정합성** 우선. blend 재현 실패해도 ≤15% 목표 내.

### 1.7 Preview 래퍼: 섹션 자기정렬 (v4 규약)
- 섹션에 `mx-auto max-w-[1416px] w-full` 내장. Preview는 `<div className="bg-white"><ContestBenefits/></div>` 단순 래핑.
- clip `--clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 969` 필수.

## 2. 컴포넌트 구조

```
src/components/ui/
├─ HatchedSectionHeading.tsx   (NEW: ContestAbout/HeadingWithIcon에서 이동·개명)
├─ HatchedDivider.tsx (기존)
└─ SectionTabs.tsx (기존)

src/components/sections/ContestBenefits/
├─ ContestBenefits.tsx    — 섹션 entry (노드 302:5067)
├─ BenefitCard.tsx        — 로컬 (304×203 카드)
├─ CtaBanner.tsx          — 로컬 (CTA Container, aside)
└─ index.ts
```

## 3. 디자인 토큰 매핑 (G4 + token_ratio 기여)

| Figma hex | CSS | Tailwind |
|-----------|-----|----------|
| `#EFF0F0` | `var(--color-gray-100)` | `bg-gray-100` |
| `#005C33` | `var(--color-status-badge-positive-700)` | `bg-[var(--color-status-badge-positive-700)]` |
| `#0C3B0E` | `var(--color-brand-700)` | `text-[var(--color-brand-700)]` |
| `#FFFFFF` | — | `bg-white` / `text-white` |
| `rgba(255,255,255,0.6)` | — | `text-white/60` |
| `#0A0A0A` | raw (contest-about 선례) | `text-[#0A0A0A]` |
| `#4A5565` | raw (토큰 없음) | `text-[#4A5565]` |

**토큰 사용률**: 5/7 = 71% color. 추가로 `var(--font-family-pretendard)`, `var(--spacing-*)`, `var(--radius-3xl)` 사용.

## 4. 컴포넌트 시그니처

### 4.1 `HatchedSectionHeading.tsx` (ui/ 승격)
```tsx
import { HatchedDivider } from "./HatchedDivider";
export function HatchedSectionHeading({
  iconSrc, iconAlt = "", title, titleId,
}: { iconSrc: string; iconAlt?: string; title: string; titleId?: string }) {
  return (
    <div className="flex flex-col gap-[21px]">
      <div className="flex items-center gap-3">
        <img src={iconSrc} alt={iconAlt}
             aria-hidden={iconAlt === "" ? true : undefined}
             className="block size-10 shrink-0 object-contain" />
        <h2 id={titleId}
            className="text-[32px] font-bold leading-[1.3] tracking-[-0.96px] text-[#0A0A0A]"
            style={{ fontFamily: "var(--font-family-pretendard)" }}>
          {title}
        </h2>
      </div>
      <HatchedDivider className="w-full" />
    </div>
  );
}
```

### 4.2 `BenefitCard.tsx`
```tsx
export function BenefitCard({
  icon, iconAlt = "", title, lines,
}: { icon: string; iconAlt?: string; title: string; lines: readonly [string, string] }) {
  return (
    <article className="flex w-[304px] flex-col items-center justify-center gap-4 rounded-[20px] bg-gray-100 p-4">
      <img src={icon} alt={iconAlt}
           aria-hidden={iconAlt === "" ? true : undefined}
           className="block size-[80px] shrink-0 object-cover" />
      <div className="flex w-full flex-col items-stretch gap-2">
        <h3 className="text-center text-[18px] font-semibold leading-[1.4] tracking-[-0.27px] text-[#0A0A0A]"
            style={{ fontFamily: "var(--font-family-pretendard)" }}>
          {title}
        </h3>
        <p className="text-center text-[14px] font-medium leading-[1.5] tracking-[-0.07px] text-[#4A5565]"
           style={{ fontFamily: "var(--font-family-pretendard)" }}>
          {lines[0]}<br />{lines[1]}
        </p>
      </div>
    </article>
  );
}
```

### 4.3 `CtaBanner.tsx`
```tsx
import ctaBg from "@/assets/contest-benefits/cta-bg.png";
export function CtaBanner() {
  return (
    <aside
      className="flex h-[320px] w-[936px] flex-col items-center justify-center gap-8 self-center overflow-hidden rounded-[20px] bg-[var(--color-status-badge-positive-700)] px-0 py-16"
      style={{
        backgroundImage: `url(${ctaBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="flex w-[454px] flex-col items-center gap-3">
        <h3 className="text-center text-[32px] font-bold leading-[1.3] tracking-[-0.96px] text-white"
            style={{ fontFamily: "var(--font-family-pretendard)" }}>
          지금 바로 신청하세요
        </h3>
        <p className="text-center text-[16px] font-normal leading-[1.5] tracking-[-0.16px] text-white/60"
           style={{ fontFamily: "var(--font-family-pretendard)" }}>
          아이디어에서 실천으로, ESG 실천 아이디어 경진대회에 참여하세요.
        </p>
      </div>
      <button type="button"
        className="flex items-center gap-2 rounded-full bg-white px-8 py-5 text-[18px] font-bold leading-[1.5556] tracking-[-0.4395px] text-[var(--color-brand-700)]"
        style={{ boxShadow: "0px 25px 50px -12px rgba(0,0,0,0.25)",
                 fontFamily: "var(--font-family-pretendard)" }}>
        경진대회 참가하기
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      </button>
    </aside>
  );
}
```

### 4.4 `ContestBenefits.tsx` (섹션 entry)
```tsx
import { HatchedSectionHeading } from "@/components/ui/HatchedSectionHeading";
import { BenefitCard } from "./BenefitCard";
import { CtaBanner } from "./CtaBanner";
import headingIcon from "@/assets/contest-about/heading-icon.png";
import icon1 from "@/assets/contest-benefits/icon-1-project.png";
// ... icon2~icon6

const BENEFITS = [
  { icon: icon1, title: "실전 중심 프로젝트",
    lines: ["이론이 아닌 실제 현장의 문제를 해결하는", "실전형 프로젝트로 진행됩니다."] },
  { icon: icon2, title: "네트워킹 기회",
    lines: ["다양한 분야의 전문가, 기업, 기관과의", "네트워킹 기회를 제공합니다."] },
  { icon: icon3, title: "상금 및 시상",
    lines: ["우수한 아이디어에는 상금과", "다양한 혜택을 제공합니다."] },
  { icon: icon4, title: "사업화 지원",
    lines: ["수상작은 실제 사업화 및 프로젝트 실행을", "위한 지원을 받을 수 있습니다."] },
  { icon: icon5, title: "멘토링 제공",
    lines: ["ESG 전문가의 1:1 맞춤형 멘토링으로", "아이디어를 구체화합니다."] },
  { icon: icon6, title: "지역사회 연계",
    lines: ["지역사회와 연계하여 실질적인", "사회적 가치를 창출합니다."] },
] as const;

export function ContestBenefits() {
  return (
    <section aria-labelledby="contest-benefits-title"
             className="mx-auto flex w-full max-w-[1416px] flex-col gap-5 px-[240px] py-[64px]">
      <HatchedSectionHeading iconSrc={headingIcon} iconAlt=""
        title="ESG 실천 아이디어 경진대회의 특별한 혜택"
        titleId="contest-benefits-title" />
      <div className="flex flex-col gap-3">
        <ul className="flex flex-wrap gap-3 p-0 m-0 list-none">
          {BENEFITS.map((b) => (
            <li key={b.title}>
              <BenefitCard icon={b.icon} iconAlt="" title={b.title} lines={b.lines} />
            </li>
          ))}
        </ul>
        <CtaBanner />
      </div>
    </section>
  );
}
```

## 5. 에셋 계획

### 5.1 Framelink 다운로드 (7개 신규)
- fileKey `qhrMiGVfoSQ1QMFhVN8z78`, pngScale 2
- localPath `src/assets/contest-benefits`
- nodes 배열: research §3의 7건

### 5.2 heading-icon.png 재사용
- `src/assets/contest-about/heading-icon.png` 존재 확인 후 import 재사용

## 6. 라우트

### 6.1 `src/routes/ContestBenefitsPreview.tsx`
```tsx
import { ContestBenefits } from "@/components/sections/ContestBenefits";
export function ContestBenefitsPreview() {
  return <div className="bg-white"><ContestBenefits /></div>;
}
```

### 6.2 `src/App.tsx`
- `/__preview/contest-benefits` 라우트
- `/contest` 페이지에 `<ContestBenefits />` 추가

## 7. 측정 계획

### 단계 4.5 (구조 차단 게이트)
```bash
npx eslint src/components/sections/ContestBenefits src/components/ui/HatchedSectionHeading.tsx
node scripts/check-text-ratio.mjs src/components/sections/ContestBenefits
bash scripts/measure-quality.sh contest-benefits src/components/sections/ContestBenefits
node scripts/check-structure-quality.mjs --section=contest-benefits
bash scripts/check-tailwind-antipatterns.sh src/components/sections/ContestBenefits
bash scripts/check-baked-in-png.sh contest-benefits
```

### 단계 5 (픽셀 측정)
```bash
bash scripts/compare-section.sh contest-benefits --clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 969
```

## 8. 육안 semantic 체크

- [ ] 카드 6개 순서 (좌→우, 위→아래): 실전 → 네트워킹 → 상금 / 사업화 → 멘토링 → 지역사회
- [ ] 카드 아이콘 매칭 (swap 없음)
- [ ] 카드 설명 2줄 줄바꿈 위치 정확
- [ ] HatchedDivider가 카드 위, CTA가 카드 아래
- [ ] CTA 배경 녹색 톤 + 도시 실루엣 (단색만 X)
- [ ] 버튼 arrow 우측
- [ ] 카드 균질 #EFF0F0 배경

## 9. v4 구조 지표 예상

| 지표 | 예상 | 목표 |
|------|------|------|
| token_ratio | ~0.40 | ≥ 0.2 |
| semantic_score | 5+ | ≥ 2 |
| absolute/file | 0 | ≤ 5 |
| G1 diff | 4~10% | ≤ 15% |

## 10. 측정값 기록 섹션 (v4 실측)

### 회차 1 (CSS blend 없이)
- G5 eslint: PASS (errors 0)
- G6/G8 text-ratio: **PASS** (ratio 20.92, threshold 3, raster 0)
- G5 semantic_score: **5** (section/h2/ul/li/article/h3/aside/h3/button)
- G1: **12.54%** (172060/1372104px) — ≤15% 참고 목표 PASS
- auto-guards: tailwind-antipatterns / baked-in PNG 모두 PASS
- 구조 지표: token_ratio=0.32, absolute=2 (주석 false-positive), magic=28, token=13

### 회차 2 (CTA `backgroundBlendMode: multiply` + 주석 cleanup)
- G1: **12.32%** (169036/1372104px) — ≤15% 참고 PASS (0.22%p 개선)
- 구조 지표: token_ratio=**0.32**, absolute=**0**, semantic=**5**, magic=28, token=13
- 육안 semantic 체크: 카드 6개 순서 OK, 아이콘-제목 매칭 OK, 2줄 줄바꿈 OK, CTA 녹색 톤 OK, 버튼 arrow 우측 OK

### 결론
- 차단 게이트 G2/G4/G5/G6/G8 모두 PASS
- 참고 지표 G1 12.32% (목표 ≤15% 달성)
- v4 구조 지표 3개 전부 목표 충족 (token_ratio 0.32 ≥ 0.2, abs 0 ≤ 5, sem 5 ≥ 2)
- G1 잔여 diff 주원인: 한글 폰트 AA (Chromium vs Figma 렌더) + 카드 아이콘 scale 미세차. 구조 정합성 확보됨
- HatchedSectionHeading 공통 승격 완료 (contest-about 마이그레이션 포함)
