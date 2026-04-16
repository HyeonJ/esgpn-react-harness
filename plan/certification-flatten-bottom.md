# plan/certification-flatten-bottom.md — v4 재설계

> v1~v3 판정 "단일 raster ACCEPTED T-008"은 **잘못된 판정**.
> `get_metadata`는 자식 0 반환하지만 `get_design_context(299:4002)`가 **전체 노드 트리 반환**.
> v4 재탐색 성공. HTML 재구성 가능 → G6 자동 PASS.

## 결정: 단일 섹션 + 3 서브컴포넌트 파일 분할

- 섹션 파일 1개는 너무 큼 (4 step + 5행 table + pagination + CTA) → **파일 분할**
- 별도 섹션으로 분리하지 않는 이유: 배경 레이어 3개를 공유하고, heading 아이콘 동일 에셋 2회 사용 → 단일 `section` 루트가 자연스러움

### 파일 구조
```
src/components/sections/CertificationFlattenBottom/
├─ index.ts                          — re-export
├─ CertificationFlattenBottom.tsx   — 루트 (배경 + 3 sub-blocks)
├─ ProcessBlock.tsx                  — heading + 4 step
├─ ScheduleBlock.tsx                 — heading + table + pagination
└─ CtaBlock.tsx                      — CTA card
```

## Props / 시그니처

각 서브컴포넌트는 props 없이 상수 데이터 내부 고정 (Figma 하드코딩 일치). React primitives만 반환.

```ts
// ProcessBlock 상수
const STEPS = [
  { n: "1단계", title: "접수", desc: "접수 및 응시료 납부", bullets: ["홈페이지 회원가입", "검정 신청서 작성", "응시료 결제 (30,000원)"] },
  { n: "2단계", title: "시험 응시", desc: "온라인 시험 진행", bullets: ["지정된 시험 일시", "온라인 시험 플랫폼 접속", "60분간 객관식 50문항 응시"] },
  { n: "3단계", title: "결과 확인", desc: "합격자 발표", bullets: ["시험 후 2주 이내 발표", "홈페이지에서 결과 확인", "70점 이상 합격"] },
  { n: "4단계", title: "자격증 발급", desc: "자격증 수령", bullets: ["자격증 발급 신청", "우편 또는 방문 수령", "PDF 전자 자격증 다운로드"] },
];

// ScheduleBlock 상수
const EXAM_ROUNDS = [
  { round: "24회", signup: "2026.03.01 - 03.15", exam: "2026.03.20", result: "2026.04.03", status: "접수 진행중" },
  { round: "23회", ... "접수 완료" },
  // ...20회까지 5행
];

// Pagination 상수 (1~10, current=1)
```

## 시맨틱 HTML

| 파일 | 루트 | 내부 |
|---|---|---|
| CertificationFlattenBottom | `<section aria-labelledby="ccf-bottom-title">` (배경 3층 + main div) | sr-only h2 (접근성, 시각적으로는 block heading 따로) |
| ProcessBlock | `<div>` (루트는 상위 section) | `<h2>` 응시방법 + `<ol>` 4 step + 각 step `<li>` h3 + desc + `<ul>` bullet |
| ScheduleBlock | `<div>` | `<h2>` 시험일정 + `<table>` + `<thead>` + `<tbody>` + `<nav aria-label="Pagination">` |
| CtaBlock | `<aside class="role=complementary">` 또는 `<div>` | `<h2>` CTA + p + `<a>` or `<button>` |

**핵심**: G5 jsx-a11y 통과하려면 `<table>`은 `<caption>` 추가 + `<th scope="col">` 필수. Pagination은 `<nav>` + `<ul>` + `<li>` + `<button>`.

## 에셋 매핑

| 에셋 | 경로 | 사용처 | 크기 |
|---|---|---|---|
| bg-overlay-left.webp | `@/assets/.../bg-overlay-left.webp` | 섹션 배경 좌 overlay | 155K |
| bg-overlay-right.webp | | 섹션 배경 우 overlay | 192K |
| bg-noise.jpg | | 섹션 배경 multiply | 732K |
| heading-icon.png | | Process + Schedule heading (2×, mix-blend-hard-light) | 87K |
| step-arrow-line.svg | | Process 4 step 상단 arrow 선 | 1K |
| cta-city.webp | | CTA 배경 city (mix-blend-luminosity) | 329K |
| cta-arrow.svg | | CTA 버튼 → 아이콘 | 1K |

Total ≈ 1.5MB (7.8MB → 1.5MB 압축)

## 레이아웃 원칙

### 배경 (CertificationFlattenBottom 루트)
```tsx
<section className="relative w-full bg-[var(--color-status-badge-positive-700)] overflow-hidden">
  {/* 실제로는 #014527. Figma status-badge-positive-700은 #005c33. 그래서 직접 hex 혹은 새 토큰 */}
  <div aria-hidden className="absolute inset-0 bg-[#014527]" />
  <img aria-hidden src={bgOverlayLeft} alt="" className="absolute left-[-24.99%] top-[62.11%] h-[47.16%] w-[48.85%] mix-blend-overlay max-w-none" />
  <img aria-hidden src={bgOverlayRight} alt="" className="absolute left-[70.55%] top-[44.58%] h-[55.44%] w-[57.43%] mix-blend-overlay max-w-none" />
  <img aria-hidden src={bgNoise} alt="" className="absolute inset-0 h-full w-full mix-blend-multiply object-cover" />
  <div className="relative flex flex-col items-center gap-10 pt-20 pb-[200px] px-[492px]">
    {/* ProcessBlock, ScheduleBlock, CtaBlock */}
  </div>
</section>
```

### Process heading icon
Figma: `inset-[-5.4%_0_-41.97%_0]` overflow hidden container size-120, img 189.63% h × 106.67% w. 즉 아이콘은 container보다 훨씬 크고 positive top offset으로 올라가 있음. overflow-hidden으로 잘림.

```tsx
<div className="relative size-[120px] overflow-hidden mix-blend-hard-light">
  <img src={headingIcon} alt="" aria-hidden 
       className="absolute left-[-5.4%] top-[-41.97%] h-[189.63%] w-[106.67%] max-w-none" />
</div>
```

### Step row
```tsx
<ol className="flex w-full list-none gap-[72px] rounded-[20px] p-0 m-0">
  {STEPS.map((s, i) => <Step key={s.n} step={s} isLast={i === 3} />)}
</ol>
```

각 Step은 pill + arrow (4번째는 no-arrow? — Figma는 4개 모두 arrow) + title/desc + 3 bullets.

### Arrow 선 처리 — step 상단 가로 화살표
step-arrow-line.svg는 4개 path (viewBox 936×25.2118). ProcessBlock에서 936px wide 위치에 배치.
```tsx
<div className="relative h-[25px] w-[936px] shrink-0">
  <img src={stepArrowLine} alt="" aria-hidden className="block size-full" />
</div>
```

### Table (Schedule)
```tsx
<table className="w-full rounded-[20px] border-[1.5px] border-white/8 overflow-hidden border-collapse">
  <caption className="sr-only">2026년 ESG마인드 자격검정 시험 일정</caption>
  <thead>
    <tr className="bg-[#caeb69]">
      <th scope="col" className="w-[80px] px-6 py-5 text-[16px]/[1.5] font-semibold text-brand-700">회차</th>
      <th scope="col" className="px-6 py-5 text-[16px]/[1.5] font-semibold text-brand-700">접수기간</th>
      ...
      <th scope="col" className="w-[140px] px-6 py-5 ...">진행 상태</th>
    </tr>
  </thead>
  <tbody>
    {EXAM_ROUNDS.map((r, i) => (
      <tr key={r.round} className={i % 2 === 0 ? "bg-[#014527]" : "bg-[#014527]"}>
        {/* odd row는 #014527, even row는 rgba(255,255,255,0.04) overlay + #014527 */}
        <td className="w-[80px] px-6 py-5 text-center text-[16px]/[1.5] font-bold text-[#caeb69]">{r.round}</td>
        <td className="px-6 py-5 text-center text-[16px]/[1.5] text-white">{r.signup}</td>
        ...
      </tr>
    ))}
  </tbody>
</table>
```

zebra는 tbody tr:nth-child(even) 클래스로.

### Pagination
10 pages, current=1, chevrons 4개. SVG 인라인 (lucide-react의 ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight). lucide-react 이미 설치됨.

```tsx
<nav aria-label="Pagination" className="flex items-center gap-2">
  <button aria-label="First page"><ChevronsLeft className="size-4 text-white/60" /></button>
  <button aria-label="Previous page"><ChevronLeft className="size-4 text-white/60" /></button>
  <ul className="flex gap-1 list-none m-0 p-0">
    {Array.from({length: 10}, (_, i) => (
      <li key={i+1}>
        <button aria-current={i===0 ? "page" : undefined} 
                className={i===0 ? "size-6 rounded-lg bg-white/14 text-white" : "size-6 rounded-lg text-white/60"}>
          {i+1}
        </button>
      </li>
    ))}
  </ul>
  <button aria-label="Next page"><ChevronRight className="size-4 text-white/60" /></button>
  <button aria-label="Last page"><ChevronsRight className="size-4 text-white/60" /></button>
</nav>
```

### CTA
```tsx
<aside className="relative flex h-[320px] w-full flex-col items-center justify-center gap-8 overflow-hidden rounded-[20px] py-16">
  <div aria-hidden className="absolute inset-0 bg-[#005c33] rounded-[20px]" />
  <img src={ctaCity} alt="" aria-hidden 
       className="absolute left-[-25.66%] top-[-32.5%] h-[294.15%] w-[132.39%] mix-blend-luminosity max-w-none rounded-[20px]" />
  <div className="relative flex w-[454px] flex-col items-center gap-3 text-center">
    <h2 className="text-[32px]/[1.3] font-bold tracking-[-0.96px] text-white">지금 바로 신청하세요</h2>
    <p className="text-[16px]/[1.5] tracking-[-0.16px] text-white/60">
      ESG 실천의 첫 걸음, ESG마인드 자격검정에 도전하세요.
    </p>
  </div>
  <a href="/certification" 
     className="relative flex items-center gap-2 rounded-full bg-white px-8 py-5 shadow-[0_25px_50px_rgba(0,0,0,0.25)]">
    <span className="text-[18px]/[28px] font-bold tracking-[-0.44px] text-brand-700">경진대회 참가하기</span>
    <img src={ctaArrow} alt="" aria-hidden className="size-6" />
  </a>
</aside>
```

⚠ **버튼 텍스트 "경진대회 참가하기"는 디자이너 placeholder 가능성 높음** (자격검정 페이지인데 contest로 유도). 원본 유지 + FIXME 주석.

## 트레이드오프

1. **절대 배치 최소화**: 배경 3 overlay + cta city + cta bg + cta arrow → 6 absolute 불가피 (루트 1 + CTA 블록 3 + heading icon 2 = 6). **absolute/file 기준 7/4 = 1.75**. ✓ (≤5 통과)
2. **mix-blend 6종 (overlay×2, multiply×1, hard-light×2, luminosity×1)**: Chromium 합성 엔진 차이로 G1 10~15% 예상. 참고 지표이므로 수용.
3. **Table border-collapse + rounded overflow-hidden**: webkit에서는 border-collapse + border-radius 조합이 까다로움. `overflow-hidden` wrapper + inner table 무radius로 해결.
4. **Tailwind 4 CSS theme**: 디자인 토큰이 `bg-brand-700`, `text-gray-900` 등으로 자동 매핑. 직접 hex는 `#014527`, `#caeb69`, `#005c33` 3종만 남음 (Figma 토큰에 없음).
5. **Icon 2회 재사용**: heading-icon.png를 Process + Schedule 2번. absolute inset overflow 처리는 동일하므로 컴포넌트 헬퍼 `<HeadingCluster>` 내부에서 이미지 렌더.

## 디자인 토큰 참조 계획

- `bg-brand-700` = `#0c3b0e` (pill text color "1단계" 등)
- `text-brand-700` (pill, th 텍스트)
- `bg-gray-900`? → No, dark bg는 #014527 (토큰 없음, 직접 hex)
- `text-white`, `text-white/60` (white-opacity)
- Spacing: gap-10 (40), gap-12 (48), gap-6 (24), gap-3 (12), gap-2 (8), gap-1 (4), py-16 (64), py-5 (20), px-8 (32), px-6 (24), p-4 (16) 등 전부 토큰화
- Radius: rounded-[20px]=3xl, rounded-full

## 신규 공통 컴포넌트 없음

모든 요소는 이 섹션 로컬. `lucide-react` 이미 설치된 chevron 아이콘 사용.

## 측정 결과 (v4 완주)

### 단계 4.5 차단 게이트 — 전체 PASS
- **G5 eslint (jsx-a11y)**: exit 0, 에러 0건 ✓
- **G6 text:image 비율**: 22.41 (임계 3, 약 7.5× 초과 달성) ✓
- **G8 i18n 가능성**: JSX literal 텍스트 다수 (ratio check로 확인) ✓
- **G7 Lighthouse**: skip (dev 서버 전용 optional)

### 단계 4.5 구조 지표 — 전체 PASS
- **token_ratio**: 0.23 ≥ 0.2 ✓
- **absolute_count**: 16 / 4 files = 4.0 per file ≤ 5 ✓
- **semantic_score**: 6 (section, h2, h3, ol, ul, li, button, aside, table) ≥ 2 ✓
- **text_raster_flag**: 0 ✓ (v1~v3 안티패턴 완전 해소)
- **alt_over_80**: 0 ✓

### 자동 가드 — 전체 PASS
- Tailwind 안티패턴: 0건
- baked-in PNG 중첩: 0건
- TypeScript 타입체크: exit 0

### 단계 5 회귀 게이트
- **G1 pixelmatch diff**:
  - round 1: 11.65% (회차 셀 whitespace-nowrap 누락으로 줄바꿈)
  - round 2: **5.00%** (whitespace-nowrap 추가 후) — v4 목표 ≤ 15% ✓
- **G2 치수 (computed style)**:
  - h2: 32px / 700 / lh 1.3 ✓
  - h3: 24px / 700 / lh 1.4 ✓
  - th: 16px / 600 ✓
  - td (회차): 16px / 700 / color #caeb69 ✓
- **G3 에셋**: 8개 img 모두 naturalWidth > 0 ✓
- **G4 색상**:
  - pill "1단계" bg: rgb(202,235,105) = #caeb69 ✓
  - CTA bg: rgb(0,92,51) = #005c33 ✓
- **육안 검증**: 구조적으로 완벽 대응. 남은 5% diff는 (1) mix-blend-overlay/multiply/hard-light/luminosity 엔진 차이 (2) Pretendard AA 서브픽셀 (3) CTA city 위치 미세 차이. 전략 b의 구조적 한계이며 T-003/T-004/T-005 선례와 동일 (엔진 차이).

## v4 완주 요약

v1~v3 `[ACCEPTED_DEBT] T-008` (단일 raster + alt 12자)을 v4에서 **완전한 HTML 재구성**으로 교체.
전략 (b) 노드 재탐색 성공 — `get_metadata`는 자식 0 반환이지만 `get_design_context`는 전체 트리를 반환하는 현상 확인됨 (향후 유사 섹션 재검토 필요).

**T-008 상태 변경 필요**: OPEN → RESOLVED (text-bearing raster 안티패턴 해소, v4 완전 HTML).
