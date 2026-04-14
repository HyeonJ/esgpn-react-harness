# main-gallery — 단계 2 계획

- Figma: `43:545` 1920×1888, 캔버스 (0, 7490)
- baseline: `figma-screenshots/main-gallery.png` (1920×1888)
- 라우트: `/__preview/main-gallery` (격리, bg-white wrapper) + `/` 하단 장착
- 배포 위치: `src/components/sections/MainGallery/`

---

## A. 컴포넌트 구조

```
MainGallery (43:545)               ─ 섹션 루트 (1920×1888, BG + heading + 2 blocks)
├─ GalleryBackground               ─ aria-hidden, 3 layer (greenBase, cityscape luminosity, overlay multiply)
├─ GalleryHeading (43:546)         ─ "ESGPN Gallery" + main heading + sub desc
├─ GalleryBlock (43:1851)          ─ 업무 협약 블록 (3-column grid)
│  ├─ DividerLabel                 ─ 좌우 SVG 가로줄 + 중앙 라벨 "업무 협약"
│  ├─ div.cards (gap-24, flex row)
│  │  └─ GalleryCard × 3           ─ thumb + title + desc
│  └─ ViewAllButton                ─ "전체보기" + arrow pill
└─ GalleryBlock (43:1880)          ─ 관련 활동 및 수상 블록 (1 card 중앙 456px)
   ├─ DividerLabel (재사용)        ─ "관련 활동 및 수상"
   ├─ 456px 중앙정렬 래퍼
   │  └─ GalleryCard (variant="award", 2겹 썸네일)
   └─ ViewAllButton (재사용)
```

### 파일 분해

```
src/components/sections/MainGallery/
├─ MainGallery.tsx           — 섹션 루트, 아래 3 자식 합성
├─ GalleryBackground.tsx     — 3 layer BG (brand-700 base + cityscape luminosity + overlay multiply)
├─ GalleryHeading.tsx        — eyebrow/main/sub 3 단 heading
├─ DividerLabel.tsx          — 중앙 라벨 + 좌우 SVG line (props: label, svgSrc)
├─ GalleryCard.tsx           — 카드 1개 (props: thumbSrc, title, desc, variant?: "default" | "award", awardBacking?)
├─ ViewAllButton.tsx         — 전체보기 pill CTA (props: href?)
├─ data.ts                   — Partnership 3개 + Award 1개 카드 데이터 배열
└─ index.ts                  — barrel export
```

### GalleryCard props 시그니처

```ts
interface GalleryCardProps {
  /** 카드 썸네일 PNG src */
  thumbSrc: string;
  /** 썸네일 내부 img 위치/크기 (Figma crop 표현) */
  thumbInner: {
    top: string;      // e.g. "-2.62%"
    left: string;     // e.g. "-1.45%"
    width: string;    // e.g. "102.9%"
    height: string;   // e.g. "107.29%"
  };
  /** 카드 너비 (기본 flex-1, award variant은 456px 고정) */
  widthClass?: string;
  /** 타이틀 ReactNode (br 포함 가능) */
  title: ReactNode;
  /** 설명 ReactNode (br, whitespace-pre 보존) */
  desc: ReactNode;
  /** Award variant일 때 백플레이트 썸네일 추가 */
  awardBacking?: {
    src: string;
    inner: { top: string; left: string; width: string; height: string };
  };
  /** data-node-id */
  nodeId: string;
}
```

**Rule of Three 평가:** 카드는 4번 등장 → 내부 공통 컴포넌트로 추출. 단, `ui/` 승격은 다른 페이지에서 동일 구조 확인 후 (현 단계는 섹션 로컬).

**NewsCard 재사용 불가:** NewsCard는 좌(텍스트) / 우(썸네일 100×140) 수평 레이아웃이고 라이트 BG용. Gallery는 상(썸네일 full-width 302) / 하(center 텍스트). 구조 완전 상이.

**ProgramCard 재사용 불가:** ProgramCard는 progress bar + checklist + 아이콘 3행 + 하단 라벨·리스트 등 프로그램 소개 전용. Gallery 카드와 무관.

## B. 에셋 매핑 (단계 3에서 이 계획대로 정리)

| research # | raw 파일 | 최종 경로 | 용도 |
|------------|----------|-----------|------|
| 1 | `raw/bg-cityscape.png` (2825×4096) | `src/assets/main-gallery/bg-cityscape.jpg` (process-assets로 JPG 변환 권장 — 용량 11MB → ~1MB) | 섹션 BG luminosity layer |
| 2 | `raw/bg-overlay.png` (2392×1792) | `src/assets/main-gallery/bg-overlay.jpg` (동일 이유) | 섹션 BG multiply overlay |
| 3 | `raw/card1-thumb.png` | `src/assets/main-gallery/card1-thumb.png` | 업무협약 카드1 썸네일 |
| 4 | `raw/card2-thumb.png` | `src/assets/main-gallery/card2-thumb.png` | 업무협약 카드2 + Award 백플레이트 (공용) |
| 5 | `raw/card3-thumb.png` | `src/assets/main-gallery/card3-thumb.png` | 업무협약 카드3 |
| 6 | `raw/award-thumb.png` | `src/assets/main-gallery/award-thumb.png` | Award 카드 메인 (ESG 대상 상장) |
| 7 | `raw/divider-partnership.svg` | `src/assets/main-gallery/divider-partnership.svg` | "업무 협약" 좌우 가로줄 (657×2) |
| 8 | `raw/divider-award.svg` | `src/assets/main-gallery/divider-award.svg` | "관련 활동 및 수상" 좌우 가로줄 (628×2) |
| 9 | `raw/arrow-icon.svg` | `src/assets/main-gallery/arrow-icon.svg` | CTA 우측 화살표 (rotate-90) |

**단계 3에서:**
- `verify-assets.sh` 통과 확인 (9개)
- `process-assets.py`로 대용량 2개 PNG→JPG 변환 + 품질 85 압축 (BG이라 손실 허용)
- JPG 변환 시 Tailwind src 경로 `.jpg` 반영

## C. Tailwind 전략

- 모든 spacing/size는 Figma 토큰 참조. spacing/2=8, spacing/4=16, spacing/6=24, spacing/8=32, spacing/10=40, spacing/12=48 (수동으로 `px-[252px]`/`gap-[48px]` arbitrary)
- letter-spacing: design_context `tracking-[-0.07px]`, `tracking-[-0.16px]`, `tracking-[-0.4px]`, `tracking-[0.28px]` **그대로 사용**
- CTA `rgba(255,255,255,0.14)` → `bg-[rgba(255,255,255,0.14)]`
- heading color `#caeb69` → 섹션 로컬 arbitrary
- `whitespace-pre` 보존 (desc 들여쓰기)
- BG 이미지 %는 design_context 그대로: `h-[75.92%] left-[0.17%] top-[60.28%] w-[99.65%]`
- mix-blend: `mix-blend-luminosity`, `mix-blend-multiply` (Tailwind 기본 지원)

## D. 배경 레이어 구현 상세 (§2.5 원칙)

```tsx
// GalleryBackground.tsx
<div aria-hidden className="absolute inset-0 pointer-events-none">
  <div className="absolute bg-[#0c3b0e] inset-0" />
  <div className="absolute inset-0 mix-blend-luminosity overflow-hidden">
    <img
      alt=""
      src={bgCityscape}
      className="absolute h-[75.92%] left-[0.17%] max-w-none top-[60.28%] w-[99.65%]"
    />
  </div>
  <img
    alt=""
    src={bgOverlay}
    className="absolute inset-0 max-w-none mix-blend-multiply object-cover size-full"
  />
</div>
```

- cityscape 이미지는 raw imageRef raster 원본 → CSS blend 적용 가능 (§2.5는 Framelink 합성 PNG에 재적용 금지; 개별 imageRef는 raw 이므로 허용)
- overlay도 동일. `needsCropping` cropTransform은 **미적용** (§2.5 규칙 #5 raw JPEG 함정)

## E. 음수 width / SVG flip

- **해당 없음.** 모든 thumbnail 내부 img의 width는 양수(`102.9%`, `104.96%`, `104.19%`). left가 음수지만 브라우저 유효.
- SVG flip 없음.

## F. 토큰 및 색상 스펙

| 용도 | 값 | 적용 |
|------|-----|------|
| BG base | `#0c3b0e` | `bg-[#0c3b0e]` |
| Brand lime | `#caeb69` | heading main + divider label |
| White | `#ffffff` | heading sub + card title/desc + CTA text |
| Gray-300 | `#c6cdcc` | eyebrow "ESGPN Gallery" |
| Divider line | `white/0.28` | SVG stroke (이미 SVG에 박힘) |
| CTA bg | `rgba(255,255,255,0.14)` | `bg-[rgba(255,255,255,0.14)]` |

## G. 예상 게이트

- G1 diff <5% — 대용량 BG PNG/overlay blend가 baseline과 정확히 매칭되는가가 핵심. 실패 시:
  - 원인 A: overlay가 baseline엔 거의 안 보이는데 구현에선 강하게 곱해짐 → `opacity-*` 조정 또는 제거
  - 원인 B: cityscape % 위치 어긋남 → design_context 값 재확인 (이미 0.17/60.28/99.65/75.92 원본 적용)
  - 원인 C: Award 카드 백플레이트가 baseline에 없음 → 제거
- G2 치수 — font ±1, spacing ±2. `gap-[48px]`/`py-[24px]`/`pb-[40px]`/`pt-[120px]`/`pb-[200px]`/`px-[252px]` 정확 기입
- G3 에셋 — 9개 모두 `naturalWidth > 0` 확인 (import 경로 맞으면 OK)
- G4 색상 — 위 F 표의 hex 정확

## H. 라우트 등록

`src/App.tsx`:
1. import: `MainGalleryPreview` + `MainGallery`
2. 격리: `<Route path="/__preview/main-gallery" element={<MainGalleryPreview />} />`
3. 메인 `/` 트리에 `<MainGallery />` 추가 (MainNews 아래)

`src/routes/MainGalleryPreview.tsx`:
```tsx
export function MainGalleryPreview() {
  return (
    <div className="bg-white">
      <MainGallery />
    </div>
  );
}
```

## I. 측정 계획

- `scripts/compare-section.sh main-gallery` (1920 풀폭 — clip 불필요)
- `tests/visual/measure-main-gallery.ts` — page.evaluate 순수 JS (타입 주석 금지). 측정 항목:
  - section bounding box (1920×1888)
  - heading sizes (14/48/16)
  - 카드 썸네일 302 height
  - CTA pill radius 9999
  - BG base color hex (computed-style)
- **긴 섹션이라 캡처 시간 길 수 있음 — 정상, 타임아웃 여유**

## J. 추후 리팩토링 / 미결

- GalleryCard는 페이지 로컬. `/gallery` 페이지 구현 시 동일 구조 확인되면 `ui/` 승격 (Rule of Three 적용 대기).
- Award 카드 백플레이트 (card2 이미지를 상장 뒤에 깔기) — baseline에서 실제 보이는지 단계 5에서 판정. 안 보이면 제거.
- Figma 오탈자 "Impacrt" 그대로 보존 (디자인 우선).

## K. 이번 단계 완료 조건 (단계 2 게이트)

- [x] research 완료 (`research/main-gallery.md`)
- [x] plan 완료 (본 문서)
- [ ] 사용자 승인 — **여기서 멈춤**
- 승인 후 단계 3 → 4 → 5 진행

## L. 측정 결과

### 회차 1 — BG 파일 매핑 오류
- 초기 구현: `bg-cityscape` (실제 = paper texture) → luminosity 레이어, `bg-overlay` (실제 = 건물+언덕+잔디) → multiply 레이어
- 결과: **DIFF 61.87%** — 캡처 바닥에 cityscape 잔디 필드가 크게 표시, 톤 매우 다름
- 원인: 실제 파일 내용과 research/plan의 네이밍이 반대. design_context 힌트대로 적용했으나 육안으로 명백히 틀림

### 회차 2 — import 매핑 스왑 (JPG 버전)
- `bg-overlay.jpg` → luminosity (cityscape), `bg-cityscape.jpg` → multiply (paper)
- 결과: **DIFF 20.91%** — 상단/중단 거의 일치. 하단 Award 영역 BG에 black void 출현 (baseline은 dark green)
- 원인: `bg-overlay.png` 원본은 RGBA (투명 배경), JPEG로 변환하면서 alpha → 검정으로 채워짐

### 회차 3 — PNG alpha 보존 (최종)
- `bg-overlay.png` 재압축 (sharp PNG palette 85, 7.45MB → 1.41MB), alpha 유지
- `bg-cityscape.jpg` 유지 (paper texture, 10.58MB → 0.86MB)
- 결과: **DIFF 4.05% — G1 PASS** (<5% 기준)

### 4 게이트 최종 결과

**G1 시각 일치: PASS (4.05%)**
- 146,729 / 3,624,960 픽셀 diff
- 남은 diff: 대부분 텍스트 서브픽셀 렌더링 + 카드 썸네일 원본 해상도 차이 (baseline 912→304 축소 vs 브라우저 자체 스케일)

**G2 치수 정확도: PASS**
- Section 1920×1888 (spec 일치, 실측 일치)
- 타이포
  - eyebrow 14px/400/lh21/ls-0.07px/color rgb(198,205,204) = #c6cdcc ✓
  - headingMain 48px/700/lh56px/color rgb(202,235,105) = #caeb69 ✓
  - headingSub 16px/400/lh24/ls-0.16px/color white ✓
  - divider labels 20px/600/lh28/ls-0.4px/color #caeb69 ✓
- 카드 3×456×451.19 (업무협약), 456×430.19 (Award), 모든 썸네일 456×302 r24 ✓
- Gap 24px, pt-120, pb-200, px-252 exact ✓
- CTA 119.69×48, radius 9999px ✓

**G3 에셋 무결성: PASS (13/13)**
- bg-overlay.png 1920×1438 (alpha 유지)
- bg-cityscape.jpg 1920×2784
- card1/2/3-thumb 912×604 × 3
- award-thumb 912×604
- divider-partnership 657×2 × 2 (좌우 재사용)
- divider-award 628×2 × 2
- arrow-icon 6×11 × 2

**G4 색상 정확도: PASS**
- #0c3b0e (BG base) ✓
- #caeb69 (heading main, divider labels) ✓
- #c6cdcc (eyebrow) ✓
- white (sub heading, card text, CTA) ✓
- rgba(255,255,255,0.14) (CTA pill bg) ✓

### 육안 semantic 검증: PASS
- 다크 그린 BG + luminosity cityscape 블렌드 효과 ✓
- multiply paper texture 효과 ✓ (살짝 따뜻한 톤 추가)
- 업무협약 3열 grid + 3 카드 썸네일 정상 ✓
- Award 1 중앙 456px + 이중 이미지 (card2 백플레이트 + award-thumb overlay) ✓ — baseline에서도 오른쪽에 사람 얼굴 보임 → **유지 확정**
- CTA pill 2개 (업무협약 + Award) + arrow 우향 (rotate-90) ✓
- 텍스트 줄바꿈, 들여쓰기, 오탈자 "Impacrt" 모두 그대로 보존 ✓

### BG 압축 결과
| 파일 | 전 | 후 | 포맷 |
|------|----|----|------|
| bg-overlay.png (cityscape) | 7.45MB | 1.41MB | PNG (alpha 보존) |
| bg-cityscape.jpg (paper) | 10.58MB | 0.86MB | JPG quality 85 |


---

## 변경 이력

| 날짜 | 변경 | 사유 |
|------|------|------|
| 2026-04-14 | 초기 plan 작성 | 단계 2 산출 |
