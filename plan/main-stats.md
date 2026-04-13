# main-stats — 구현 계획

연관 리서치: `research/main-stats.md`
연관 baseline: `figma-screenshots/main-stats.png` (1920×1040, pngScale 1)

---

## 1. 핵심 결정 사항 (D1~D9)

| # | 결정 | 사유 |
|---|------|------|
| D1 | **DOM 그대로 재구성** (단일 평탄 이미지 X) | design_context 풍부. 텍스트/원/pill 전부 React 합성 가능. raster 자원 0. |
| D2 | **ESG 3원은 `div` + `rgba(79,182,84,0.XX)` + `rounded-full`** (raster X) | 단순 원. alpha 0.16/0.28/0.4 3개를 flex mr-[-12px] 오버랩. 브라우저 합성 정확도 높음. |
| D3 | **WHY? pill은 단순 div** | 98.145×44 rounded-full bg-brand-500, 내부 "WHY?" 20B white. |
| D4 | **connector 6개는 단일 inline SVG** (Group 10 자식, `<svg>` 1개에 6 path) | Figma 네이티브 connector는 path 미제공 → 수동 path 작성. 단일 SVG가 위치 관리 쉬움. viewBox를 Group 10 bbox(678×535)에 맞춤. |
| D5 | **좌측 인디케이터 2원은 CSS div** (raster X) | 16×16, 6×6 단순 원. `rounded-full` + `bg-[#color]` 로 충분. (main-intro R7 교훈). |
| D6 | **stat 숫자 `text-[0px]` 트릭 그대로 복제** | design_context가 해당 패턴으로 48B 숫자와 14R 단위 inline baseline 정렬 → 그대로 복제해야 G2 통과. |
| D7 | **우측 Group 10은 absolute 대신 inline-grid ml/mt** | design_context 원본 패턴. 3원 묶음 / 설명 3컬럼 / WHY? pill / connector SVG 4개 자식이 `grid-cols-[max-content] grid-rows-[max-content] inline-grid` 셀 겹침에 ml/mt로 오프셋. 캔버스 절대 좌표로 풀어쓸 수도 있으나 design_context 패턴 유지가 안전. |
| D8 | **StatItem 로컬 컴포넌트** (공통화 보류) | Rule of Three는 "세 번째 시점에 공통화". 현재는 첫 번째 사용. 경진대회·자격검정 페이지 Figma 실제 스펙 확인 전에 공통 API 결정 금지. 해당 섹션 작업 시 리팩토링. |
| D9 | **격리 측정 라우트** `/__preview/main-stats` 추가 | main-hero/main-intro 패턴 일치. Header(88px) 침범 회피. |

---

## 2. 컴포넌트 구조

```
src/
├─ components/
│  └─ sections/
│     └─ MainStats/
│        ├─ MainStats.tsx             ← 섹션 루트 (1920×1040, white BG)
│        ├─ StatItem.tsx              ← 로컬: 숫자(+단위) + 부제
│        ├─ EsgDiagram.tsx            ← 우측 Group 10 전체 (3원 + WHY? + 설명 3 + connector 6)
│        └─ index.ts                  ← re-export
└─ routes/
   └─ MainStatsPreview.tsx            ← /__preview/main-stats
```

> 에셋 폴더 불필요 (raster 0개). `src/assets/main-stats/` 생성 안 함.

### Props 시그니처

```ts
// StatItem
type StatItemProps = {
  value: string;           // "97" | "85" | "70" | "2028"
  unit?: string;           // "%" | undefined (2028은 단위 없음)
  caption: React.ReactNode; // <br> 포함 JSX
  width?: number;          // 94 (기본) | 116 (2028)
};

// EsgDiagram — props 없음 (내부에 3원 + WHY? + 설명 + connector 6개 path 고정)

// MainStats — props 없음
```

---

## 3. Tailwind/CSS 전략

### 섹션 루트
```tsx
<section className="bg-white content-stretch flex gap-[63px] items-center px-[252px] py-[200px] relative w-full h-[1040px]" data-node-id="26:273">
```

### 좌측 컬럼 (design_context 원본)
- flex gap-72 items-start
- 인디케이터: col flex gap-16 w-24
  - Ellipse2 (6×6): `w-1.5 h-1.5 rounded-full bg-[#c6cdcc]` (색은 baseline 채취 후 확정)
  - Ellipse1 (16×16): `w-4 h-4 rounded-full bg-[#c6cdcc]` 또는 outline ring
- 텍스트 컬럼 (579×437, ml-96):
  - 헤딩 그룹 (gap-24)
  - stat 그룹 (flex gap-32 items-center)

### 헤딩 타이포
```tsx
<p className="font-['Pretendard_Variable'] font-normal leading-[1.5] text-[14px] text-[#97a29e] tracking-[-0.07px] whitespace-nowrap">
  ESG가 왜 중요할까?
</p>
<p className="font-['Pretendard_Variable'] font-bold leading-[56px] text-[48px] text-[#1d2623]">
  단순한 트렌드를 넘어,<br />모두의 새로운 생존 문법
</p>
<p className="font-['Pretendard_Variable'] font-normal leading-[1.5] text-[16px] text-[#1d2623] tracking-[-0.16px]">
  이제 ESG는 기업의 성적표가 아닙니다. 우리가 살아가는<br />
  사회와 지구를 지키기 위한 가장 현실적인 행동 지침이자 약속입니다.
</p>
```

> main-intro 교훈: 프로젝트는 `font-['Pretendard']` 말고 **`font-['Pretendard_Variable']`** 사용. 기존 섹션 일관성 확인 필요 (단계 4 시작 시 main-intro 코드 확인).

### StatItem 내부 구조
```tsx
// value 있고 unit 있을 때 (97%)
<div className="content-stretch flex flex-col gap-2 items-start justify-center w-[94px]">
  <p className="font-['Pretendard_Variable'] font-bold leading-[0] text-[0px] text-[#1d2623] tracking-[-0.96px] whitespace-nowrap">
    <span className="leading-[1.3] text-[48px] tracking-[-1.92px]">{value}</span>
    <span className="font-normal leading-[1.5] text-[14px] tracking-[-0.07px]">{unit}</span>
  </p>
  <p className="font-['Pretendard_Variable'] font-normal leading-[1.5] min-w-full text-[14px] text-[#97a29e] tracking-[-0.07px] w-[min-content]">
    {caption}
  </p>
</div>

// 2028만 (unit 없음)
<div className="content-stretch flex flex-col gap-2 items-start justify-center">
  <p className="font-['Pretendard_Variable'] font-bold leading-[1.3] text-[48px] text-[#1d2623] tracking-[-1.92px] whitespace-nowrap">
    {value}
  </p>
  <p className="...">{caption}</p>
</div>
```

### EsgDiagram (우측 Group 10)
```tsx
<div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative w-[678px] h-[535px]" data-node-id="29:351">
  {/* cell 1: ESG 3원 (ml=51 mt=0) */}
  <div className="col-start-1 row-start-1 content-stretch flex items-center ml-[51px] mt-0 pr-[12px]">
    <div className="bg-[rgba(79,182,84,0.16)] content-stretch flex flex-col items-center justify-center mr-[-12px] pt-2 rounded-full size-[200px]">
      {/* "Environmental" 24B + "환경" 18R */}
    </div>
    <div className="bg-[rgba(79,182,84,0.28)] ... mr-[-12px] size-[200px]"> ... Social ... </div>
    <div className="bg-[rgba(79,182,84,0.4)] ... mr-[-12px] size-[200px]"> ... Governance ... </div>
  </div>

  {/* cell 2: 설명 3컬럼 (ml=0 mt=404) */}
  <div className="col-start-1 row-start-1 content-stretch flex gap-4 items-start ml-0 mt-[404px] text-center w-[678px]">
    <div className="w-[215px] flex flex-col gap-4 items-start pb-2 pt-4">
      <p className="text-[20px] font-bold leading-[1.4] tracking-[-0.4px]">자본시장의 필수 요건</p>
      <p className="text-[14px] font-normal leading-[1.5] tracking-[-0.07px]">
        이제 ESG는 투자자의 의사결정 시<br />
        기업 가치에 영향을 미치는<br />
        핵심 비재무적 요소입니다.
      </p>
    </div>
    {/* 2, 3 동일 골격 */}
  </div>

  {/* cell 3: WHY? pill (ml=289.43 mt=280) */}
  <div className="col-start-1 row-start-1 bg-[#4fb654] flex items-center justify-center ml-[289.43px] mt-[280px] px-5 py-2 rounded-full w-[98.145px] h-[44px]">
    <p className="font-['Pretendard_Variable'] font-bold leading-[1.4] text-[20px] text-white tracking-[-0.4px] whitespace-nowrap">WHY?</p>
  </div>

  {/* cell 4: connector SVG 6개 (absolute layer) */}
  <svg className="col-start-1 row-start-1 absolute inset-0 pointer-events-none" width="678" height="535" viewBox="0 0 678 535" fill="none">
    {/* 6 path 작성 — 아래 §4 참조 */}
  </svg>
</div>
```

> connector SVG를 inline-grid 셀 안에 두면 grid가 자식 크기로 셀을 늘릴 위험. **대안**: `absolute inset-0`로 그리드에서 빠져나오게 해서 overlay. 이 경우 SVG 좌표는 Group 10 bbox(0~678, 0~535) 기준.

---

## 4. Connector SVG 6개 path

Group 10 기준 상대 좌표 (metadata의 캔버스 좌표 − (990, 252.5)):

| # | Node | 상대 x | 상대 y | w | h | path 초안 |
|---|------|--------|--------|---|---|-----------|
| 1 | 29:324 (WHY?→E원) | 151 | 203.25 | 187.5 | 73.5 | start (338.5, 276.75 = WHY? top center) → (x=151, y=203.25 = E원 bottom center). WHY? (338.5, 276.75) → 위로 수직 → 왼쪽 수평 → E원까지 ㄱ자. `M 338.5,276.75 V 240 H 151 V 203.25` 아마? (실제 좌표는 start/end 재확인 필요) |
| 2 | 29:331 (WHY?→S원) | 338.5 | 203.25 | 0 | 73.5 | 순수 수직 `M 338.5,276.75 V 203.25` |
| 3 | 29:335 (WHY?→G원) | 338.5 | 203.25 | 188.5 | 73.5 | ㄴ자 `M 338.5,276.75 V 240 H 527 V 203.25` |
| 4 | 29:339 (WHY?→법적) | 338.5 | 327.25 | 231 | 73.5 | ㄴ자 아래 `M 338.5,327.25 V 363.75 H 569.5 V 400.75` |
| 5 | 29:343 (WHY?→소비) | 338.5 | 327.25 | 0 | 73.5 | 순수 수직 `M 338.5,327.25 V 400.75` |
| 6 | 29:347 (WHY?→자본시장) | 107.5 | 327.25 | 231 | 73.5 | ㄱ자 `M 338.5,327.25 V 363.75 H 107.5 V 400.75` |

> 각 connector bbox의 (x, y, x+w, y+h) 중 어느 게 start/end인지는 baseline 육안으로 최종 결정. 일반적 꺾은선: mid-y에서 꺾어 ㄱ/ㄴ자.
>
> **stroke**: 색상 baseline 채취 후 확정. 예상 `#0c3b0e` (brand-700) 또는 `#97a29e` (gray-500). stroke-width 1~2px 예상.
>
> **화살표 머리**: baseline에 있으면 `<marker id="arrow">` 정의 후 `marker-end="url(#arrow)"`. 없으면 생략. **단계 4 시작 시 Read로 baseline 확인하여 결정**.

---

## 5. 에셋 파이프라인

### 5.1 다운로드 (단계 3)
**없음.** 모든 요소가 CSS/inline SVG로 재현 가능.

### 5.2 검증
- `src/assets/main-stats/` 폴더 생성 X
- `verify-assets.sh` 불필요

---

## 6. 4 게이트 예상 측정

### G1 시각 일치 (pixelmatch diff < 5%)
- 측정: `scripts/compare-section.sh main-stats` (URL 자동 `/__preview/main-stats`)
- baseline: `figma-screenshots/main-stats.png` (1920×1040)
- clip 미사용 (풀폭)
- 위험 영역:
  - ① ESG 3원 overlap 알파 합성 (브라우저가 Figma와 동일하게 합성하는지)
  - ② connector stroke 렌더 (anti-alias, stroke-width 픽셀 정확도)
  - ③ connector 색상 baseline 채취 오차
  - ④ stat 숫자 `text-[0px]` baseline 정렬
  - ⑤ inline-grid ml/mt 오프셋 정확도 (WHY? pill 특히 `ml-[289.43px]` 소수점)
- **예상 diff**: 2~3% (회전 없음, raster 없음, 대부분 텍스트·도형)

### G2 치수 정확도 (font ±1px, 기타 ±2px)
측정 포인트 (Playwright `getBoundingClientRect`):
- Section: 1920×1040
- 좌측 컬럼 left/top: 252 / 301.5
- 헤딩 블록 w/h: 579 / 213
- "ESG가 왜 중요할까?" fs/fw/color: 14/400/#97a29e
- 헤딩 (단순한 트렌드…) fs/fw/lh/color: 48/700/56px/#1d2623
- 본문 fs/fw: 16/400
- stat 그룹 w/h: 494/112
- 각 stat 숫자 fs/fw: 48/700 (span)
- 각 stat 단위 fs/fw: 14/400 (span)
- 각 stat 부제 fs/fw/color: 14/400/#97a29e
- 우측 Group 10 left/top: 990 / 252.5
- E원 left/top/size: 1041/252.5/200×200
- S원 left: 1229 (=1041+188)
- G원 left: 1417 (=1229+188)
- 원 내부 "Environmental" fs/fw: 24/700
- 원 내부 "환경" fs/fw: 18/400
- 설명 3컬럼 left/top: 990/656.5
- 각 설명 타이틀 fs/fw: 20/700
- 각 설명 본문 fs/fw: 14/400
- WHY? pill left/top/w/h: 1279.43/532.5/98.145/44
- WHY? 텍스트 fs/fw/color: 20/700/#ffffff

### G3 에셋 무결성
- img 요소 0개 → `Array.from(document.images).every(...)` 자동 PASS (vacuous truth).
- 대신: SVG `<path>` 존재 확인 (connector 6개 렌더 체크)

### G4 색상 정확도
- Section bg: #ffffff
- 헤딩 텍스트: #1d2623
- 헤딩 라벨/본문: #97a29e / #1d2623
- stat 숫자: #1d2623
- stat 부제: #97a29e
- ESG 3원 bg: rgba(79,182,84,0.16 / 0.28 / 0.4)
- WHY? pill bg: #4fb654, text: #ffffff
- 설명 타이틀/본문: #1d2623
- connector stroke: baseline 채취 후 확정 (#0c3b0e 후보)
- 인디케이터 점: #c6cdcc (gray-300) 후보 — baseline 채취

---

## 7. 리스크 대응 (research §8 → 액션)

| # | 액션 |
|---|------|
| R1 | connector 6개 각 bbox로 path 작성 (위 §4 초안). start/end 방향은 baseline 육안 후 확정. stroke-width/색도 baseline 채취. |
| R2 | baseline Read로 화살표 머리 존재·방향 확인. **예상**: 방사형 WHY? 중심, 화살표 없거나 양쪽 다 있음 (inspire-style "중심 질문"). |
| R3 | design_context 순서 E→S→G (E 먼저 렌더→뒤에 S→앞에 G). CSS z-index 기본(DOM 순) → 뒤에 올수록 위. S가 E 위, G가 S 위. |
| R4 | inline-grid ml/mt 원본 그대로. WHY? pill `ml-[289.43px]`. |
| R5 | stat 숫자 구조 design_context 그대로. 단위 있는 stat 3개(97/85/70)는 `text-[0px]` 부모, 2028은 단순. |
| R6 | section root bg-white 명시. body도 RootLayout의 기본값 white 사용. |
| R7 | baseline Read로 connector 픽셀 색 채취. 3후보(#0c3b0e/#1d2623/#97a29e) 중 선택. |
| R8 | design_context 원본 구조 유지. |
| R9 | SVG `<line>` w=0 처리 (실제로 `<path d="M x,y1 V y2">` 단일 라인). |
| R10 | 풀폭 비교, clip 미사용. |

---

## 8. 작업 순서 (단계 3 이후, 사용자 승인 후)

1. **단계 3 — 에셋 수집** (~0분)
   - **스킵** (raster 0, 다운로드 없음)

2. **단계 4 — 구현** (~40분)
   - baseline Read로 connector 색상·화살표 확인 (5분)
   - `MainStats.tsx` + `StatItem.tsx` + `EsgDiagram.tsx` 작성
   - `routes/MainStatsPreview.tsx` 추가
   - `App.tsx`에 `<Route path="/__preview/main-stats" />` + `/`에 main-intro 다음 섹션으로 마운트
   - 빌드/타입체크/린트 통과

3. **단계 5 — 측정** (~5분)
   - dev server
   - `scripts/compare-section.sh main-stats`
   - `tests/visual/measure-main-stats.ts` 작성 (page.evaluate 인자 순수 JS)
   - 4 게이트 + **육안 semantic 검증** (baseline/capture/diff 3종 Read)
   - §10 측정 섹션에 기록

4. **단계 6 — 수정 (필요 시, 최대 3회)**

5. **단계 7 — 커밋**
   - `feat: main-stats 섹션 구현 (diff X.XX%)`
   - PROGRESS.md 체크 + diff %

---

## 9. 사용자 승인 필요 항목

| 항목 | 옵션 | 권장 |
|------|------|------|
| connector 6개 처리 | (a) inline SVG path 수동 작성 (단일 `<svg>`, 6 path) <br>(b) Framelink로 전체 Group 10 raster export | **(a)** — 텍스트·원·pill이 이미 DOM 재구성이고 connector만 raster하면 레이어 분리 복잡. 단일 SVG가 위치·색 제어 명확. |
| StatItem 공통화 | (a) 지금 `src/components/ui/StatItem.tsx` 신설 <br>(b) 로컬 `MainStats/StatItem.tsx` <br>(c) 인라인 JSX | **(b)** — 로컬 컴포넌트. Rule of Three는 3번째 사용 **시점**에 공통화. 경진대회/자격검정 stat 스펙 미확인 상태에서 공통 API 결정 위험. |
| 좌측 인디케이터 2원 | (a) CSS div + `rounded-full` <br>(b) SVG/raster | **(a)** — main-intro R7 선례, raster 회피. 색은 baseline 채취. |
| WHY? pill 위치 | (a) inline-grid ml/mt 원본 재현 <br>(b) absolute 캔버스 좌표 | **(a)** — design_context 패턴 유지. |
| 신규 npm 패키지 | 없음 | — |

---

## 10. 측정 결과

### 회차 1 (2026-04-13) — 1회차 통과

**baseline 육안 스캔 (단계 4 진입 전)**:
- connector stroke 색: 옅은 회색 (#c6cdcc, gray-300 계열) 확정
- stroke-width: 1px
- 화살표 머리: 상단 3개는 원 방향(위쪽 끝), 하단 3개는 설명 박스 방향(아래쪽 끝) — 작은 채움 삼각형
- → `EsgDiagram.tsx`에 `marker-end="url(#arrow-up|down)"`, stroke `var(--color-gray-300)` 반영

**G1 시각 일치 — PASS**
- `scripts/compare-section.sh main-stats`
- DIFF: **1.92%** (38,248 / 1,996,800 px) < 5% ✅

**G2 치수 정확도 — PASS**
| 측정 | 예상 | 실측 | Δ |
|------|------|------|---|
| Section bbox | 1920×1040 | 1920×1040 | 0 ✅ |
| 헤딩 h2 fs/fw/lh/color | 48/700/56px/#1d2623 | 48/700/56/(29,38,35) | 0 ✅ |
| "ESG가 왜 중요할까?" fs/fw/ls/color | 14/400/-0.07px/#97a29e | 14/400/-0.07/(151,162,158) | 0 ✅ |
| stat 1 "97" bbox | 94×112 | 94×112.39 | +0.39 ✅ (±2) |
| stat 숫자 fs/fw/ls | 48/700/-1.92 | 48/700/-1.92 | 0 ✅ |
| stat 단위 fs/fw/ls | 14/400/-0.07 | 14/400/-0.07 | 0 ✅ |
| stat 4 "2028" bbox | 116×112 | 116×112.39 | +0.39 ✅ |
| stat 간격 (1→2 left) | 126 | 126 (474-348) | 0 ✅ |
| E원 bbox | 200×200 @ (1041, 252.5) | 200×200 @ (1041, 252.5) | 0 ✅ |
| S원 left | 1229 | 1229 | 0 ✅ |
| G원 left | 1417 | 1417 | 0 ✅ |
| Environmental fs/fw/ls | 24/700/-0.6 | 24/700/-0.6 | 0 ✅ |
| WHY? pill bbox | 98.145×44 @ (1279.43, 532.5) | 98.14×44 @ (1279.42, 532.5) | 0.01 ✅ |
| WHY? text fs/fw/ls | 20/700/-0.4 | 20/700/-0.4 | 0 ✅ |
| 설명 1 bbox | 215×131 @ (990, 656.5) | 215×131 @ (990, 656.5) | 0 ✅ |
| 설명 타이틀 fs/fw/ls | 20/700/-0.4 | 20/700/-0.4 | 0 ✅ |
| 설명 본문 fs/fw/ls | 14/400/-0.07 | 14/400/-0.07 | 0 ✅ |

**G3 에셋 무결성 — PASS (vacuous)**
- img 요소: 0개 (전체 CSS div + inline SVG)
- SVG `<path>`: 6개 렌더 확인 (connector 29:324/331/335/339/343/347 모두 존재) ✅

**G4 색상 정확도 — PASS**
| 요소 | Figma | 실측 | 일치 |
|------|-------|------|------|
| Section bg | #ffffff | rgb(255,255,255) | ✅ |
| 헤딩 text | #1d2623 | rgb(29,38,35) | ✅ |
| 라벨 text | #97a29e | rgb(151,162,158) | ✅ |
| stat 부제 | #97a29e | rgb(151,162,158) | ✅ |
| E원 bg | rgba(79,182,84,0.16) | rgba(79,182,84,0.16) | ✅ |
| S원 bg | rgba(79,182,84,0.28) | rgba(79,182,84,0.28) | ✅ |
| G원 bg | rgba(79,182,84,0.4) | rgba(79,182,84,0.4) | ✅ |
| WHY? pill bg | #4fb654 | rgb(79,182,84) | ✅ |
| WHY? text | #ffffff | rgb(255,255,255) | ✅ |
| connector stroke | gray-300 | rgb(198,205,204) | ✅ |

**육안 semantic 검증 — PASS**
- baseline / capture / diff 3종 Read로 직접 비교 (docs §6.4)
- 4 stat 숫자 위치·크기·색 일치
- ESG 3원 방향·배치·알파 계단(E 연함 → G 진함) 일치, E→S→G 순서 일치
- 6 connector **화살표 머리 방향** 모두 일치:
  - 상단 3개 (WHY?→E/S/G): 화살표가 위쪽(원 방향) 가리킴 ✅
  - 하단 3개 (WHY?→자본/소비/법적): 화살표가 아래쪽(설명 박스 방향) 가리킴 ✅
  - 꺾은선 형태: ㄱ자(왼쪽)·수직(중앙)·ㄴ자(오른쪽) 모두 baseline과 동일
- 텍스트 줄바꿈 위치 일치 (헤딩 2줄, 본문 2줄, stat 부제 1~2줄, 설명 3줄)
- BG 색·테마 일치 (white)
- 인디케이터 2점 위치·순서 일치 (작은 점 위, 큰 원 아래)
- diff 이미지: sub-pixel anti-alias 차이만 산재. semantic 오류 없음

**→ 4 게이트 + 육안 semantic 모두 1회차 통과. 수정 불필요.**

---

## 11. 단계 2 통과 체크

- [x] 컴포넌트 트리 정의 (3 파일 + preview route)
- [x] props 시그니처 명시
- [x] 에셋 매핑 (다운로드 0, 모두 CSS/inline SVG)
- [x] 트레이드오프 기록 (D1~D9)
- [x] 새 npm 패키지: 없음
- [x] 4 게이트 측정 지점 정의
- [x] 리스크 대응 (R1~R10)
- [x] 단일 평탄 이미지 여부: **아님** (D1)
- [x] 신규 공통 컴포넌트 후보: **없음** (D8, StatItem은 다음 페이지 작업 시 공통화)
- [x] connector 6개 flip 전략: **flip 없음** — 수동 path `M...V...H...V...` 직접 작성 (§4)

→ **사용자 승인 대기. 승인 후 단계 4 직행 (단계 3 스킵, 에셋 없음).**
