# main-programs-card2 — 계획

- 리서치: `research/main-programs-card2.md`
- baseline: `figma-screenshots/main-programs-card2.png` (실측 **1405×805**)
- Figma 노드 `252:1066` (Group 14) / 캔버스 (252, 4494) / 사이즈 1416×805

---

## 1. 최종 결정 요약

| 항목 | 결정 |
|------|------|
| 컴포넌트 위치 | `src/components/sections/MainProgramsCard2/` |
| 라우트 | `/__preview/main-programs-card2` (격리 프리뷰, 1416×805 단독) |
| 격리 프리뷰 레이아웃 | **좌측정렬** (1416 mx-auto, 바디 흰색). clip은 단계 5 스윕 |
| ProgramCard 공통화 | **card2도 로컬**. **card3 워커에서 `src/components/ui/ProgramCard.tsx` 승격** (Rule of Three 확정 시점) |
| card1 재사용 | **없음**. `MainProgramsCard1/` 파일 import 금지. **참고만** (파일 구조·패턴 차용) |
| 신규 공통 컴포넌트 | **없음** (이번 섹션) |
| 새 npm 패키지 | **없음** |
| 새 `@theme` 토큰 | **없음** — `#0C173B`/`#A5D9FF`/`#2D7EFF`/`#3F9FFF` 전부 raw hex (card3에서 토큰 승격 재평가) |

---

## 2. 컴포넌트 구조 (로컬)

```
src/components/sections/MainProgramsCard2/
  ├─ MainProgramsCard2.tsx       ── 섹션 루트 (1416×805 relative, 4 layer)
  ├─ ProgramCard.tsx             ── 가운데 네이비 카드 (outer+inner+divider+CTA)
  ├─ CardHeader.tsx              ── progress bar + 타이틀 + 체크리스트 2줄
  ├─ CardPoints.tsx              ── 3 포인트 행 (blue check + 텍스트)
  ├─ CardTargets.tsx             ── "주요 대상" 라벨 + ul 3개
  ├─ CardCtaBar.tsx              ── 하늘 CTA bar + chevron 3겹
  ├─ FloatingCityLeft.tsx        ── 좌측 큰 city (wrapper=AABB + inner=native)
  ├─ FloatingCityMidRight.tsx    ── 우측 중간 city 타일 (직립)
  ├─ FloatingCityTopRight.tsx    ── 우측 상단 작은 city 타일 (직립)
  └─ index.ts                    ── named export
```

**DOM 순서 (design_context 따라가되 최종 렌더):**
```
<MainProgramsCard2 className="relative w-[1416px] h-[805px] mx-auto">
  <FloatingCityLeft />        ← absolute left-0 top-[168.81px] (530.209×578.029 wrapper)
  <FloatingCityMidRight />    ← absolute left-[948px] top-[454px] w-[315px] h-[351px]
  <ProgramCard />             ← absolute left-[400px] top-0 (616×732)
  <FloatingCityTopRight />    ← absolute left-[1231px] top-[218px] w-[185px] h-[193px]
</MainProgramsCard2>
```

DOM 순서를 Figma와 맞추면:
1. Rectangle 18 (city-left) — 첫번째
2. Rectangle 23 (city-mid-right) — 두번째
3. Frame 12 (card) — 세번째
4. Rectangle 22 (city-top-right) — 네번째

→ 카드가 city-mid-right 앞에 오지만 (카드 끝 x=1016, city-mid x=948~1263 → **68px 오버랩**), 카드가 위에 렌더되어야 자연스러움. Figma 순서 그대로 두면 카드 뒤에 city-mid가 반쯤 가려진 상태. baseline 확인 시 **card가 city-mid의 좌측 일부를 덮는 배치가 맞음** → DOM 순서 Figma 준수.

---

## 3. Props 시그니처

모든 서브컴포넌트 props 없음 (presentational, 하드코딩). card1과 동일 방침.

```ts
interface MainProgramsCard2Props {
  className?: string;
}
export function MainProgramsCard2({ className }: MainProgramsCard2Props) { ... }
```

---

## 4. 에셋 매핑

리서치 §4의 7개 파일을 `src/assets/main-programs-card2/`로 배치.

```
src/assets/main-programs-card2/
  ├─ raw/                            (다운로드 원본 보관)
  ├─ city-left-rendered.png          (1015×1111 native, wrapper AABB 530.209×578.029에 중앙 배치)
  ├─ city-mid-right.png              (630×702 = 315×351@2x, AABB 일치)
  ├─ city-top-right.png              (370×386 = 185×193@2x, AABB 일치)
  ├─ progress-bar.svg                (520×20)
  ├─ icon-point.svg                  (20×20, 3개 인스턴스 공용. raw/icon-point-2.svg 기반)
  ├─ divider-dashed.svg              (600×2, blue dashed)
  └─ arrow-chevron.svg               (32×32, 3개 인스턴스 공용. card1과 내용 동일할 수 있음)
```

**제외:**
- `raw/icon-point-1.svg`, `raw/icon-point-3.svg` — `icon-point.svg`로 통합 (§4.3)

**import 규약:** card1과 동일 (Vite `import src from '@/assets/main-programs-card2/xxx.png'`).

---

## 5. 레이아웃 구현 매핑

design_context의 Tailwind 클래스를 **거의 그대로 복사**. 치환만 적용:

### 5.1 색상 치환
- `bg-[#0C173B]` — card outer, CTA text color
- `bg-[#A5D9FF]` — CTA bg
- `bg-[#3F9FFF]` — 체크리스트 2줄 bullet
- `bg-[#2D7EFF]` — 주요 대상 bullet + (SVG에 내장된 아이콘 색)

### 5.2 폰트 패밀리
card1 선례 그대로: `font-['Pretendard:Bold',sans-serif]` / `font-['Pretendard:Medium',sans-serif]` / `font-['Pretendard:Regular',sans-serif]` / `font-['Pretendard:SemiBold',sans-serif]` 유지. 프로젝트 통일 variable 폰트가 등록돼 있으면 단계 4 구현 시 통일.

### 5.3 transform (큰 city) — card1 leaf 패턴 적용
```tsx
// FloatingCityLeft
<div
  className="absolute flex h-[578.029px] items-center justify-center left-0 top-[168.81px] w-[530.209px]"
  data-node-id="252:1067"
  data-floating="city-left"
>
  <img
    src={cityLeftRendered}
    alt=""
    className="flex-none block w-[507.5px] h-[555.5px]"
  />
</div>
```
- **CSS rotate 절대 금지** (PNG baked-in -16deg + 이미지 합성 완료).
- inner native 사이즈(507.5×555.5)는 PNG 실측. 단계 5에서 G1 diff 확인 후 미세 조정.

### 5.4 우측 city 2장 (직립)
```tsx
<img
  src={cityMidRight}
  alt=""
  className="absolute block left-[948px] top-[454px] w-[315px] h-[351px]"
  data-node-id="252:1068"
/>
<img
  src={cityTopRight}
  alt=""
  className="absolute block left-[1231px] top-[218px] w-[185px] h-[193px]"
  data-node-id="252:1118"
/>
```

### 5.5 progress bar
card1과 동일:
```tsx
<div className="flex gap-[4px] h-[20px] items-center w-full" data-node-id="252:1072">
  <img src={progressBar} alt="" className="h-[20px] w-full object-contain" />
</div>
```

### 5.6 dashed divider
```tsx
<div className="h-0 relative shrink-0 w-full px-[12px]" data-node-id="252:1110">
  <div className="absolute inset-[-1px_12px]">
    <img src={dividerDashed} alt="" className="block w-full h-[2px]" />
  </div>
</div>
```

### 5.7 CTA arrow 3겹
card1 방식 그대로 — `mr-[-16px]` 각 화살표, `pr-[16px]` 컨테이너. rotate-90 inner 유지 (card1에서 통과 확인됨).

### 5.8 ul (주요 대상 3항목)
design_context 원본 구조 유지. card1에서 통과한 `list-disc / leading-[0] / whitespace-nowrap` 패턴 그대로 복사.

---

## 6. 라우트 및 프리뷰

```tsx
// src/routes/MainProgramsCard2Preview.tsx
import { MainProgramsCard2 } from '@/components/sections/MainProgramsCard2';

export function MainProgramsCard2Preview() {
  return (
    <div className="bg-white">
      <MainProgramsCard2 />
    </div>
  );
}
```

`App.tsx` 라우터에 `/__preview/main-programs-card2` 등록 (card1과 동일 방식).

### 6.1 측정 스크립트
`tests/visual/measure-main-programs-card2.ts` (page.evaluate 순수 JS):
```ts
import { test } from '@playwright/test';

test('main-programs-card2 measure', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('http://localhost:5173/__preview/main-programs-card2');
  const data = await page.evaluate(() => {
    const pick = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height, font: cs.fontSize, lh: cs.lineHeight, ls: cs.letterSpacing, color: cs.color, bg: cs.backgroundColor };
    };
    return {
      title: pick('[data-node-id="252:1078"]'),
      cta: pick('[data-node-id="252:1112"]'),
      ctaText: pick('[data-node-id="252:1113"]'),
      targets: pick('[data-node-id="252:1108"]'),
      cityLeft: pick('[data-floating="city-left"]'),
      cityMidRight: pick('[data-node-id="252:1068"]'),
      cityTopRight: pick('[data-node-id="252:1118"]'),
      images: Array.from(document.querySelectorAll('img')).map(i => ({ src: i.src, natW: i.naturalWidth, natH: i.naturalHeight })),
    };
  });
  console.log(JSON.stringify(data, null, 2));
});
```

### 6.2 compare-section.sh 호출 (clip 파라미터 제안)
1회차 예상 (baseline 1405 → card1과 동일 265 오프셋 가정):
```bash
bash scripts/compare-section.sh main-programs-card2 --clip-x 265 --clip-y 0 --clip-w 1405 --clip-h 805
```
스윕 후보: `--clip-x 263, 264, 265, 266, 267`. 단계 5에서 최적값 확정.

---

## 7. 구현 순서 (단계 4 — 승인 후)

1. `src/assets/main-programs-card2/` 디렉토리 정리 (raw→최종명)
2. `MainProgramsCard2.tsx` 스캐폴드 (1416×805 relative + 4 layer)
3. `FloatingCityLeft.tsx` (wrapper=AABB + inner=native 중앙 배치)
4. `FloatingCityMidRight.tsx` / `FloatingCityTopRight.tsx` (단순 absolute img)
5. `ProgramCard.tsx` + 4 서브 블록 (Header → Points → Targets → Cta)
6. `MainProgramsCard2Preview.tsx` + 라우터 등록
7. 빌드·린트·타입체크 통과 확인
8. 측정 스크립트 작성

---

## 8. 트레이드오프

| 결정 | 이유 | 대안 | 미택 사유 |
|------|------|------|----------|
| ProgramCard card3 시점 공통화 | Rule of Three, card1·2 비교로 차이 파악 완료. card3로 최종 확정 | card2 시점에 공통화 | card3 구조 미확인 — 과잉 추상화 위험 |
| 아이콘 1파일 통합 (point-1/2/3) | 시각 diff 육안 구분 불가, 파일 점 좌표 1~2px 차이 | 3개 개별 사용 | 단계 5 G1 실패 시만 point-1 개별 복원 |
| 큰 city PNG native 507.5×555.5 중앙 배치 | card1 leaf 패턴. Framelink가 AABB보다 작게 export하는 경향 | AABB 크기로 늘림 (w-[530.209] h-[578.029]) | 늘리면 이미지 왜곡 + baseline과 크기 불일치 |
| raw hex 3종 유지 (#0C173B / #A5D9FF / #2D7EFF) | card1 패턴 — 다른 섹션 재사용 확인 전까지 토큰화 금지 | 즉시 토큰 등록 | card3에서 같은 색 안 쓰면 토큰 낭비 |
| card1 파일 재사용 금지 | 섹션 격리 원칙 (한 섹션=한 브랜치=한 커밋). card1 수정 리스크 | card1 컴포넌트 import | 다른 섹션 파일 건드리면 규칙 위반 |
| 격리 프리뷰 좌측정렬 1416 | card1과 동일 — baseline 직매핑 | 1920 중앙정렬 후 clip 전환 | 섹션 단독 검증 목적이면 불필요 |
| CTA arrow rotate-90 유지 | card1에서 PASS (설계적으로 inner rotate 후 `containerType:size` 이용하는 Figma 패턴) | rotate-90 제거 | card1 검증 결과 유지 |

---

## 9. 리스크 대응 체크리스트 (단계 5)

- **R1 city-left rotation baked-in**: CSS rotate 없이 렌더 → G1 diff 확인. 이중 회전 전례 없음.
- **R2 native vs AABB 크기**: measure script로 inner `<img>` bounding.width 확인. native(507.5)과 baseline 일치 확인.
- **R3 우측 2 city 직립**: 각 img x/y/w/h 확인.
- **R4 divider 색상**: `divider-dashed.svg` SVG 열어 stroke 색 확인. blue(#2D7EFF 또는 #3F9FFF) 예상.
- **R5 progress bar 내부**: 파일 직접 열어서 색·형태 확인.
- **R6 3아이콘 통합**: G1 diff 확인. point-1 차이 미미 가정.
- **R7 CTA arrow rotate-90**: card1 방식 유지 → 단계 5 diff.
- **R8 clip-x 스윕**: 263~267 5개 시도 후 최적값 기록.
- **R9 raw hex 색 확정**: G4 게이트 computed style `rgb(12,23,59)` / `rgb(165,217,255)` 등 확인.
- **R10 공통화 금지**: 코드 리뷰.
- **R11 ul 구조 유지**: design_context 그대로.

---

## 10. 단계 2 통과 체크

- [x] 컴포넌트 트리 (10파일)
- [x] props 시그니처 (하드코딩)
- [x] 에셋 매핑 (7파일)
- [x] 부유 장식 처리 전략 (1 baked-in rotation + 2 직립)
- [x] progress bar / divider / CTA / ul 구현 방식
- [x] 라우트 및 측정 스크립트
- [x] clip 파라미터 제안 (263~267 스윕)
- [x] Rule of Three 명시 (card3 승격 계획 + 승격 시 props 구조)
- [x] 신규 공통 컴포넌트 없음 확정
- [x] 새 npm 패키지 없음
- [x] 트레이드오프 7건
- [x] 리스크 11건 대응 계획

→ **사용자 승인 대기** (단계 3 에셋 정리 → 단계 4 구현 승인 필요).

---

## 11. 측정 섹션 (단계 5 결과)

### 11.1 4 게이트 측정값 — **1회차 통과 ✅**

| 게이트 | 기준 | 1회차 결과 |
|--------|------|-----------|
| G1 시각 diff | < 5% | **2.69%** (30422/1131025px) ✅ @ clip-x=263 |
| G2 치수 | font ±1, 나머지 ±2 | outer 616×732 @ (400,0) ✅, inner 600×620 @ (408,8) ✅, title 36/46.8px/-1.08px ✅, cta 600×64 ✅, cta span 20/-0.4px ✅, label 18/ls 반영 ✅, ul 16/24px/72h 3 li ✅, points 253×104 rows=3 ✅, divider 600×0 (408,640) ✅, city-left AABB 530.2×578.02 @ (0,168.8) + inner 507.5×555.5 중앙 ✅, city-mid 315×351 @ (948,454) ✅, city-top 185×193 @ (1231,218) ✅, arrows 3× 32×32 @ x=920/936/952 (delta 16) ✅ |
| G3 에셋 | 모든 img naturalWidth>0 | **11/11** ✅ (city-left 1015×1111, city-mid 630×702, city-top 370×386, progress 520×20, icon-point ×3 20×20, divider 600×2, arrow ×3 9×16) |
| G4 색상 | hex 일치 | outer bg `rgb(12,23,59)` = #0C173B ✅, inner bg `rgb(255,255,255)` ✅, cta bg `rgb(165,217,255)` = #A5D9FF ✅, cta text `rgb(12,23,59)` = #0C173B ✅, title `rgb(29,38,35)` = #1d2623 ✅ |
| 육안 semantic | PASS/FAIL | **PASS** — city-left -16deg baked-in 방향 일치, 우측 2 city 직립, 컬러 전환 완전(녹색 흔적 0), 체크리스트 bullet blue, 3포인트 아이콘 동일, 주요 대상 3항목, CTA 3겹 화살표, radius/그림자, 텍스트 줄바꿈 전부 baseline과 일치 |

### 11.2 수정 이력

- **1회차 (G1 2.69% ✅ 즉시 통과)**: card1 3회차 교훈을 plan에 이미 반영 — (a) Framelink PNG baked-in rotation, CSS rotate 금지; (b) wrapper=AABB + inner=native 중앙 배치; (c) clip-x 스윕. 우측 2 city는 직립이라 단순 absolute. 1회차에 통과.

### 11.3 clip 파라미터

- clip-x 스윕 결과: **clip-x=263** 최적 (2.69%)
- 스윕 테이블:
  | clip-x | diff % |
  |--------|--------|
  | 260 | 10.25% |
  | 261 | 8.84% |
  | 262 | 6.73% |
  | **263** | **2.69% ✅** |
  | 264 | 4.58% |
  | 265 | 7.59% |
  | 266 | 9.33% |
  | 267 | 10.57% |
  | 268 | 11.59% |
- card1은 265 최적 (baseline 1404), card2는 263 (baseline 1405) — Framelink 트림 오프셋 미세 차이
- 최종 명령: `bash scripts/compare-section.sh main-programs-card2 --clip-x 263 --clip-y 0 --clip-w 1405 --clip-h 805`

### 11.4 ProgramCard 공통화 plan (card3용)

card1+card2 구조 실증 완료. card3 워커 시작 시 `src/components/ui/ProgramCard.tsx` 승격. 흡수할 props:
- `outerBg` (#0c3b0e | #0C173B | card3 TBD)
- `ctaBg`, `ctaTextColor`
- `checklistBulletColor` (#4fb654 | #3F9FFF)
- `pointsBulletColor` (#4fb654 | #2D7EFF)
- `title`, `checklist: string[]` (2개)
- `points: { icon, text }[]` (3개)
- `pointsLabel` ("필수 역량" | "주요 대상")
- `pointsItems: string[]` (6 | 3)
- `progressBarSvg`, `dividerSvg`, `pointIconSvg`
- decoration 레이아웃은 섹션 루트(MainProgramsCard*)에서 별도 관리 (Card*별 고유 부유 요소 상이).
