# main-programs-card1 — 계획

- 리서치: `research/main-programs-card1.md`
- baseline: `figma-screenshots/main-programs-card1.png`
- Figma 노드 `252:1013` (Group 13) / 캔버스 (252, 3549) / 사이즈 1416×805

---

## 1. 최종 결정 요약

| 항목 | 결정 |
|------|------|
| 컴포넌트 위치 | `src/components/sections/MainProgramsCard1/` |
| 라우트 | `/__preview/main-programs-card1` (격리 프리뷰, 1416×805 단독 렌더) |
| 격리 프리뷰 레이아웃 | **좌측정렬** (1416 그대로, baseline과 직매핑). clip **사용 안 함** (capture 뷰포트 1416×805) |
| ProgramCard 공통화 | **card1 로컬**. card2에서 평가, card3에서 확정 (Rule of Three) |
| 신규 공통 컴포넌트 | **없음** |
| 새 npm 패키지 | **없음** |
| 새 `@theme` 토큰 | **없음** (`#caeb69`만 raw hex, 재사용 시점에 토큰화) |

---

## 2. 컴포넌트 구조 (로컬)

```
src/components/sections/MainProgramsCard1/
  ├─ MainProgramsCard1.tsx       ── 섹션 루트 (1416×805 relative, 3 layer 스택)
  ├─ ProgramCard.tsx             ── 가운데 그린 카드 (outer+inner+divider+CTA)
  ├─ CardHeader.tsx              ── progress bar + 타이틀 + 체크리스트 2줄 (Frame 2043686138)
  ├─ CardChecklist3.tsx          ── 검사 포인트 3열 (Frame 2043685926)
  ├─ CardCompetencies.tsx        ── 필수 역량 + ul 6개 (Frame 2043685931)
  ├─ CardCtaBar.tsx              ── 연두색 CTA bar + chevron 3겹
  ├─ FloatingCity.tsx            ── 우측 city 타일 (absolute, 회전 없음)
  ├─ FloatingLeafBottom.tsx      ── 좌하단 leaf 타일 (−24deg wrapper flex-center)
  └─ FloatingLeafTop.tsx         ── 좌상단 leaf 타일 (−12deg wrapper, brand-700 BG + mix-blend-hard-light)
  └─ index.ts                    ── `export { MainProgramsCard1 } from './MainProgramsCard1'`
```

**트리**:
```
<MainProgramsCard1 className="relative w-[1416px] h-[805px] mx-auto">
  <FloatingCity />         ← 우측 city (absolute left-[861] top-[125] 555×680)
  <ProgramCard>            ← absolute left-[400] top-[0] (그린 outer 616×732)
    <CardHeader />
    <CardChecklist3 />
    <CardCompetencies />
    ── dashed divider ──
    <CardCtaBar />
  </ProgramCard>
  <FloatingLeafBottom />   ← absolute left-0 top-[234.39] (227.494×241.508 wrapper, -24deg inner)
  <FloatingLeafTop />      ← absolute left-[149.07] top-[53.94] (166.048² wrapper, -12deg inner)
</MainProgramsCard1>
```

**DOM 순서**: city → card → leaf-bottom → leaf-top. design_context와 동일. z-index 없이 DOM 순서만으로 쌓임. (leaf는 카드와 시각적으로 겹치지 않음 x≤315 vs card x≥400, city는 카드 뒤로 보이지만 DOM 순서상 먼저)

---

## 3. Props 시그니처

모든 서브컴포넌트는 props 없음 (순수 presentational, 하드코딩 텍스트). 향후 card2·3 공통화 시 `{ title, eyebrow, rows, competencies, ctaText }` props로 추출.

```ts
// MainProgramsCard1.tsx
interface MainProgramsCard1Props {
  className?: string;
}
export function MainProgramsCard1({ className }: MainProgramsCard1Props) { ... }
```

---

## 4. 에셋 매핑

리서치 §3 에셋 8개를 `src/assets/main-programs-card1/`로 이동 (raw → 최종). SVG 5개는 그대로, PNG 3개도 background 처리 불필요 (투명 배경 확인됨) → `process-assets.py` **skip**.

```
src/assets/main-programs-card1/
  ├─ raw/                    (다운로드 원본, 참고용 보관)
  ├─ city-right.png          (1024×1024, 555×680로 렌더)
  ├─ leaf-bottom.png         (404×432, wrapper 191.441×163.788에 inner로 렌더)
  ├─ leaf-top.png            (309×309, wrapper 140×140에 inner로 렌더)
  ├─ progress-bar.svg        (520×20)
  ├─ icon-check-filled.svg   (= icon-check1.svg, 20×20)
  ├─ icon-check-stroke.svg   (= icon-check2.svg, 20×20, 3번째용으로 재사용)
  ├─ divider-dashed.svg      (600×2, dasharray 12 12)
  └─ arrow-chevron.svg       (32×32)
```

**import 방식**: Vite `import cityRight from '@/assets/main-programs-card1/city-right.png?url'` 같은 기존 프로젝트 패턴 준수 (단계 4 구현 시 다른 섹션 패턴 확인). 단순 `import url from '...'` 기본 Vite 설정이면 충분.

**체크 아이콘 매핑**:
- 검사 포인트 1번 "ESG 개념 / 용어 / 실천 전반" → `icon-check-filled.svg` (1번째만 약간 다른 clip path, 디자인 실수로 보이나 baseline과 일치하기 위해 유지)
- 2번 "온라인 시험 진행", 3번 "공식 자격증 발급" → `icon-check-stroke.svg`
- baseline 육안 확인: 3개 아이콘 모두 **동일한 녹색 원 + 체크** (파일 2종이지만 시각상 동일). 단계 5에서 diff로 검증.

---

## 5. 레이아웃 구현 매핑

design_context 출력을 기반으로 Tailwind 클래스 거의 **그대로 복사**하되 아래 변환만 적용:

### 5.1 폰트 패밀리 통일
- design_context `font-['Pretendard:Bold',sans-serif]` → 프로젝트 관례 `font-['Pretendard_Variable']` + `font-bold` 등 weight 클래스 (main-hero/main-intro/main-stats/main-programs-header 선례 일치)
- **리스크**: 기존 섹션 구현이 `Pretendard:Bold` 그대로를 쓰는지 `Pretendard_Variable`을 쓰는지 확인 → **단계 4 구현 시 `MainProgramsHeader.tsx` 실제 확인** 후 통일

### 5.2 디자인 토큰 치환
- `bg-[var(--brand\/brand-700,#0c3b0e)]` → `bg-[#0c3b0e]` (raw) 또는 기존 토큰 클래스 (프로젝트 Tailwind config 확인 필요)
- 단계 4 시점에 `src/styles/*.css` 확인하여 `--color-brand-700`이 Tailwind에 노출되었는지 확인 → `bg-brand-700` 사용 가능하면 교체, 아니면 raw hex.

### 5.3 구조 축약 금지
design_context에 보이는 `content-stretch`, `shrink-0`, `flex-[1_0_0]`, `min-h-px min-w-px`, `h-full w-[3px] rounded-[24px]` 같은 디테일 **전부 유지**. 임의 단순화 시 G2 게이트(치수 ±2px) 탈락 위험.

### 5.4 transform 요소 정확한 배치
```tsx
// FloatingLeafBottom
<div className="absolute flex h-[241.508px] items-center justify-center left-0 top-[234.39px] w-[227.494px]">
  <div className="rotate-[-24deg] flex-none">
    <div className="h-[191.441px] relative rounded-[40px] w-[163.788px] overflow-hidden">
      <img src={leafBottom} alt="" className="absolute inset-0 size-full object-cover" />
    </div>
  </div>
</div>
```
- `-rotate-24` (Tailwind 기본 없음) → `rotate-[-24deg]` arbitrary
- PNG **3장 중첩(Rectangle 18/20/21)**은 Framelink가 이미 합성해 내보내서 단일 PNG. design_context의 3장 <img> 중첩은 **불필요**. 단일 `<img>`로 단순화 — 이는 **렌더 결과 동등성 검증을 단계 5에서 G1으로 판정**.
- 만약 단일 PNG가 Figma 3중첩의 최종 합성본이 아니라 마지막 1개만 반영된다면 → 리팩토링 필요. 단계 5에서 확인.

```tsx
// FloatingLeafTop
<div className="absolute flex items-center justify-center left-[149.07px] size-[166.048px] top-[53.94px]">
  <div className="rotate-[-12deg] flex-none">
    <div className="relative rounded-[32px] size-[140px] overflow-hidden">
      <div className="absolute inset-0 bg-[#0c3b0e] rounded-[32px]" />
      <img src={leafTop} alt="" className="absolute inset-0 size-full object-cover mix-blend-hard-light rounded-[32px]" />
    </div>
  </div>
</div>
```
- brand-700 solid BG + `mix-blend-hard-light` 순서 중요 (design_context 그대로)

### 5.5 progress bar SVG 처리
```tsx
<div className="flex gap-[4px] h-[20px] items-center w-full" data-node-id="252:1018">
  <img src={progressBar} alt="" className="h-[20px] w-full object-contain" />
</div>
```
- SVG 자체가 leaf + line + dot을 내장 → 단일 `<img>` 사용
- viewBox preserveAspect로 520 → 520 이상일 때 stretch. 실제 카드 inner w=520 → SVG 원본 폭과 **정확 일치**. object-contain 생략 가능.
- **대안**: inline SVG로 넣으면 색상 변경 가능하지만 불필요.

### 5.6 dashed divider
```tsx
<div className="h-0 relative shrink-0 w-full px-[12px]" data-node-id="252:1056">
  <div className="absolute inset-[-1px_12px]">
    <img src={dividerDashed} alt="" className="block w-full h-[2px]" />
  </div>
</div>
```
- design_context 패딩 처리 검토 필요 — inner Frame 2043686139 padding 40 + divider wrapper `px-[12px]`가 겹치는지. metadata로는 divider가 outer 카드 바로 안에 (inner 카드와 동급) `x=8 y=640 w=600 h=0`. outer padding 8 감안하면 divider는 outer inner 폭 600 차지. padding 12px(내부) → 실제 line 576px.

### 5.7 ul 필수 역량
design_context 원본 그대로 복사 — `block font-['Pretendard:Regular'] leading-[0] list-disc min-w-full not-italic relative shrink-0 text-[16px] tracking-[-0.16px] w-[min-content]` + li `mb-0 ms-[24px]` + span `leading-[1.5]`.

marker color fix: 외부 `text-[#1d2623]` + `marker:text-[#1d2623]` 명시.

---

## 6. 라우트 및 프리뷰

```tsx
// src/routes/MainProgramsCard1Preview.tsx
import { MainProgramsCard1 } from '@/components/sections/MainProgramsCard1';

export function MainProgramsCard1Preview() {
  return (
    <div className="bg-white">
      <MainProgramsCard1 />
    </div>
  );
}
```

- body 기본 배경 흰색 (baseline 배경과 일치).
- `App.tsx` 또는 `main.tsx` 라우터에 `/__preview/main-programs-card1` 등록.
- **뷰포트**: Playwright 캡처 시 `--viewport-width 1416 --viewport-height 805` (혹은 `scripts/compare-section.sh` 내부 기본).

### 6.1 measure 스크립트
`tests/visual/measure-main-programs-card1.ts`:
```ts
// 순수 JS page.evaluate (TS 타입 금지)
import { test } from '@playwright/test';

test('main-programs-card1 measure', async ({ page }) => {
  await page.setViewportSize({ width: 1416, height: 805 });
  await page.goto('http://localhost:5173/__preview/main-programs-card1');
  const data = await page.evaluate(() => {
    const pick = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height, font: cs.fontSize, lh: cs.lineHeight, ls: cs.letterSpacing, color: cs.color, bg: cs.backgroundColor };
    };
    return {
      title: pick('[data-node-id="252:1024"]'),
      eyebrow: pick('[data-node-id="252:1018"]'),
      cta: pick('[data-node-id="252:1058"]'),
      competencies: pick('[data-node-id="252:1054"]'),
      leafBottom: pick('[data-leaf="bottom"]'),
      leafTop: pick('[data-leaf="top"]'),
      cityRight: pick('[data-node-id="252:1014"]'),
      images: Array.from(document.querySelectorAll('img')).map(i => ({ src: i.src, natW: i.naturalWidth, natH: i.naturalHeight })),
    };
  });
  console.log(JSON.stringify(data, null, 2));
});
```

### 6.2 compare-section.sh 호출
```bash
bash scripts/compare-section.sh main-programs-card1
```
clip 파라미터 **없이** 실행. baseline 1404×805 vs capture 1416×805 차이는 `scripts/compare-section.sh`가 resize/align하거나 오케스트레이터가 재 export 지시. 초기 시도 결과에 따라:
- 만약 baseline 재 export 필요: Framelink `download_figma_images` 재호출하여 `figma-screenshots/main-programs-card1.png` 덮어쓰기 (pngScale 1 + node `252:1013`).

대안으로 오케스트레이터 지시 형태:
```bash
bash scripts/compare-section.sh main-programs-card1 --clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 805
```
단, 이건 `/` 페이지 통합 시 의미. 현재는 격리 프리뷰라 `--clip-x 0 --clip-y 0 --clip-w 1416 --clip-h 805` 가 실효.

→ **단계 5 실행 시 baseline 크기 확인 → 필요 시 재 export**. 이 판단은 구현 완료 후.

---

## 7. 구현 순서 (단계 4)

1. `src/assets/main-programs-card1/` 디렉토리 정리 (raw → 최종 파일명)
2. `MainProgramsCard1.tsx` 스캐폴드 (1416×805 relative 컨테이너 + 3 layer)
3. `FloatingCity.tsx` (단순 absolute + img)
4. `ProgramCard.tsx` + 4 서브 블록 (Header → Checklist3 → Competencies → Cta)
5. `FloatingLeafBottom.tsx`, `FloatingLeafTop.tsx`
6. `MainProgramsCard1Preview.tsx` + 라우터 등록
7. 빌드·린트·타입체크 통과 확인
8. `tests/visual/measure-main-programs-card1.ts` 작성

---

## 8. 트레이드오프

| 결정 | 이유 | 대안 | 미택 사유 |
|------|------|------|----------|
| ProgramCard 공통화 미시행 | Rule of Three | card1부터 공통 컴포넌트로 설계 | card2·3 미확인 상태 → 과잉 추상화 위험 (card3가 좌우 모두 city로 구조가 다를 가능성) |
| leaf PNG 단일 img (3중첩 무시) | Framelink가 합성본을 줌 (추정) | 3장 img 중첩 | 단계 5에서 diff 검증 후 불일치 시 전환 |
| 화살표 SVG `rotate-90` 제외 | 파일 path가 이미 chevron-right 방향 | design_context 그대로 rotate-90 | SVG 실제 방향 육안 확인 — 이미 우향 |
| CSS rotate 수동 적용 | Framelink PNG가 원본 정면 export | 회전 baked-in PNG export | Framelink는 node bbox로 자르지만 내용은 원본. main-hero 이중 회전 방지 위해 확인됨 |
| 격리 프리뷰 좌측정렬 (1416 그대로) | baseline과 직매핑 | 1920 중앙정렬 후 clip | 섹션 단독 검증이므로 1416로 충분, clip 불필요 |
| `#caeb69` raw hex | 다른 섹션 재사용 미확인 | `--color-brand-accent-500` 신규 토큰 | card2·3에서 동일 등장 시 한 번에 토큰화 (Rule of Three) |
| ul 원본 구조 유지 (leading-0 외곽 + span leading-1.5) | design_context 패턴 보존 | 단순화 (ul text-[16px] leading-[1.5]) | 임의 단순화 → 폭·줄 간격 어긋남 위험 |

---

## 9. 리스크 대응 계획 (단계 5 체크리스트)

리서치 §7 R1~R11에 대한 대응:

- **R1 회전 방향**: 단계 5 육안 검증 — baseline과 비교하여 leaf-bottom `-24deg`, leaf-top `-12deg` 방향 일치. 반대 방향이면 `rotate-[24deg]`로 전환.
- **R2 city object-cover**: 캡처 후 img `naturalWidth>0` + 렌더 555×680 확인.
- **R3 z-index**: baseline에서 city가 카드 뒤로 보이는지 확인 (DOM order로 달성).
- **R4 arrow overlap**: 33개 화살표 x 좌표가 +16씩 증가하는지 측정.
- **R5 ul marker**: 육안 검증.
- **R6 ul 구조**: 단계 5에서 필수 역량 텍스트 박스 크기·줄수 diff 확인.
- **R7 letter-spacing**: measure script에서 `letterSpacing` 값 `-1.08px`/`-0.27px`/`-0.4px`/`-0.16px` 확인.
- **R8 divider**: line 좌우 끝 x좌표가 outer 카드 기준 12px inset인지.
- **R9 inner h=620**: 측정 `bounding.height`가 620 ± 2.
- **R10 공통화 금지**: 코드 리뷰로 확인.
- **R11 baseline 크기**: `file figma-screenshots/main-programs-card1.png`로 실측 → 필요 시 Framelink 재 export.

---

## 10. 단계 2 통과 체크

- [x] 컴포넌트 트리 정의 (9개 파일)
- [x] props 시그니처 (하드코딩 섹션, 향후 공통화 시 props 설계)
- [x] 에셋 매핑 (src/assets/main-programs-card1/, 8 파일)
- [x] 부유 장식 처리 전략 (leaf raster + CSS rotate, city cover)
- [x] progress bar 방식 (SVG 단일 img)
- [x] `/__preview/main-programs-card1` 격리 라우트 + 1416 단독
- [x] clip 파라미터 결정 (격리 프리뷰 → clip 없음, 페이지 통합 시 x=252 y=3549 w=1416 h=805)
- [x] Rule of Three 명시 (card1 로컬, card2·3에서 공통화 평가)
- [x] 신규 공통 컴포넌트 없음 확정
- [x] 새 npm 패키지 없음
- [x] 트레이드오프 7건 기록
- [x] 단계 5 리스크 대응 체크리스트

→ **사용자 승인 대기** (단계 3 에셋 정리 → 단계 4 구현 진행 승인 필요)

---

## 11. 측정 섹션 (단계 5에서 채움)

### 11.1 4 게이트 측정값

| 게이트 | 기준 | 1회차 | 2회차 (leaf baked-in + city rendered export) | 3회차 (leaf centered-native + clip-x=265) |
|--------|------|-------|------|------|
| G1 시각 diff | < 5% | 22.82% (naive clip 252,0,1404) | 7.55% (leaf rotation 제거, city rendered tile) | **2.67%** (clip-x=265, leaf native size centered in AABB) ✅ |
| G2 치수 | font ±1, 나머지 ±2 | — | — | CTA 600×64 ✅, title 36/1.3/-1.08px ✅, ul 16/1.5/-0.16px ✅, 18SB -0.27px ✅, CTA span 20B -0.4px ✅ |
| G3 에셋 | 모든 img naturalWidth>0 | 11/11 ✅ | 11/11 ✅ | 11/11 ✅ |
| G4 색상 | Figma hex 일치 | outer #0c3b0e ✅, CTA #caeb69 ✅ | — | outer bg `rgb(12,59,14)` ✅, CTA bg `rgb(202,235,105)` ✅, CTA text `rgb(12,59,14)` ✅, body text `rgb(29,38,35)` ✅, bullet `#4fb654` ✅ |
| 육안 semantic | PASS/FAIL | leaf 이중회전 의심 | 검증 | **PASS** (leaf 2개 방향/내용·CTA 3겹 arrow·체크리스트·ul 6항목·divider·city 전부 baseline과 일치) |

### 11.2 수정 이력

- **1회차 (G1 22.82%)**: Plan 그대로 구현 (leaf CSS rotate -24/-12deg, leaf-top brand-700 bg + mix-blend-hard-light). 원인: (a) 클립 오프셋 미적용(capture 1920 뷰포트 중앙정렬 1416 → baseline 1404는 12px 트림됨), (b) leaf PNG 회전 **baked-in**이므로 CSS rotate 적용 시 이중 회전, (c) city 원본 PNG는 1024² square (비율 잘못), (d) leaf 사이즈 metadata AABB(166/227) vs Framelink 네이티브(154.5/202) 불일치.
- **2회차 (G1 7.55%)**: (a) clip-x=264 적용(baseline 12px 좌측 트림 보정), (b) `city-right-rendered.png` (1110×1360 = 555×680 @2x, Figma fill 렌더된 정확한 tile) 사용, (c) leaf top/bottom의 CSS rotate/blend/bg 전부 제거 — PNG가 이미 회전+blend+bg 합성 완료된 상태였음. 잔여 원인: (d) leaf 네이티브 사이즈 불일치 — baseline은 AABB(166/227)로 표시, 내 render는 네이티브(154.5/202).
- **3회차 (G1 2.67% ✅)**: (a) leaf wrapper를 Figma AABB(166.048 / 227.494×241.508)로 유지하되, 내부에 `flex items-center justify-center` + `flex-none` 이미지로 네이티브 크기(154.5 / 202×216) **중앙 정렬**. 이렇게 하면 baseline에서 관찰된 AABB 내부 레이아웃 정확히 재현, (b) clip-x 스윕(262~266)으로 최적값 **265** 발견 (dev 서버 뷰포트 정확한 픽셀 경계 포착). 육안 semantic 전 항목 PASS.

### 11.3 R1 (leaf rotation) 실증 결론

- **leaf-top.png** (309×309): Framelink export가 **이미 회전 + brand-700 bg + mix-blend-hard-light 합성 완료 상태**. 네이티브 크기 154.5×154.5 (AABB 166.048이 아닌 실제 렌더 크기). CSS rotate/blend/bg 추가 절대 금지.
- **leaf-bottom.png** (404×432): Framelink export가 **이미 회전 + 이미지 합성 완료**. 네이티브 202×216. CSS rotate 금지.
- **main-hero와 동일한 baked-in 패턴**. 리서치 §3/§7-R1 작성 시 "회전 전 정면" 추정이 **오판** (→ 플랜 §5.4의 `rotate-[-24deg]` 지시도 오류). 단계 4 구현 중 **실제 capture와 baseline 육안 비교**로 교정.
- 교훈: Framelink `download_figma_images`는 항상 **AABB 기준 최종 렌더 합성본**을 반환한다. CSS transform/blend 가정 금지.

### 11.4 clip 파라미터

- 격리 프리뷰 URL: `http://127.0.0.1:5173/__preview/main-programs-card1`
- viewport: 1920×1080 (fullPage capture)
- clip: `--clip-x 265 --clip-y 0 --clip-w 1404 --clip-h 805` (baseline 실제 크기 1404×805에 맞춤)
- 원인: baseline PNG가 1416×805 spec에서 **좌측 12px 트림**되어 1404로 export됨 (Framelink 내부 처리). 뷰포트 1920 중앙정렬 1416 섹션은 x=252에서 시작, 여기에 12 오프셋 더해 x=264, 다시 +1 AA 보정으로 x=265가 최적.
