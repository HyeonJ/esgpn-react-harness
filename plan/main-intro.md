# main-intro — 구현 계획

연관 리서치: `research/main-intro.md`
연관 baseline: `figma-screenshots/main-intro.png` (1920×1040, pngScale 1)

---

## 1. 핵심 결정 사항 (D1~D8)

| # | 결정 | 사유 |
|---|------|------|
| D1 | **DOM 그대로 재구성** (단일 평탄 이미지 X) | `get_design_context` 풍부, globe만 raster. 텍스트/벡터/도형은 React 합성. main-hero 회차 5처럼 카드 raster 통째 export 불필요 — main-intro는 transform·blend 없음, sub-pixel 위험 낮음. |
| D2 | **globe (`26:92`)는 cropTransform 적용 PNG 1장**으로 export | Framelink가 `cropTransform`+`needsCropping` 인자 지원. 잘린 raster 받으면 inset/overflow 트릭 불필요해 픽셀 정확도 ↑. fallback: 비크롭 raster + design_context의 inset/scale CSS. |
| D3 | **connector 4개·점선 2개·화살표 아이콘 1개·dot 2개는 SVG** | Figma `download_figma_images`는 vector 노드를 SVG로 export 가능. raster보다 픽셀 정확. 단, fileName extension `.svg`로 지정. |
| D4 | **우측 그룹은 absolute 절대 좌표 배치** | 캔버스 x/y 직접 사용 (R3·R4 대응). flex/grid로 ml/mt 재현은 inline-grid 겹침 때문에 복잡. relative 컨테이너 (`Group 9`, 640×633) 안에 자식 9개 (4 라벨 + globe + 4 connector) 모두 absolute. |
| D5 | **좌측 컬럼은 flex 재현** | gap 일관(112/32/56), 절대 좌표 불필요. inline-grid 겹침(pill ↔ 사업 본문) 부분만 absolute로 처리. |
| D6 | **HeroCTA 재사용 X — main-intro는 CTA 없음** | 그린 pill(주요사업 01/02/03)은 CTA가 아닌 라벨. variant 분기 강제하면 잘못된 추상화. 로컬 `<SectionLabel>` div로 처리. |
| D7 | **공통 컴포넌트 신설 0** | 4 라벨이 동일 골격이지만 main-intro 단일 사용 → 섹션 내부 `<GlobeLabel>`로 캡슐화 (Rule of Three 위반 회피). |
| D8 | **격리 측정 라우트** `/__preview/main-intro` 추가 | Header가 RootLayout 전역 장착돼 baseline (Header 없음) 비교 시 상단 88px 침범. main-hero 패턴 일치. |

---

## 2. 컴포넌트 구조

```
src/
├─ components/
│  └─ sections/
│     └─ MainIntro/
│        ├─ MainIntro.tsx          ← 섹션 루트 (1920×1040, white BG)
│        ├─ IntroLeftColumn.tsx    ← 좌측 텍스트 + 사업 3행 + pill 컬럼
│        ├─ IntroBusinessRow.tsx   ← 사업 1행 (title + dotted line + body)
│        ├─ IntroGlobeGroup.tsx    ← 우측 globe + 4 라벨 + 4 connector (absolute)
│        ├─ IntroGlobeLabel.tsx    ← 1개 라벨 (title + arrow + body)
│        └─ index.ts               ← re-export
├─ assets/
│  └─ main-intro/
│     ├─ raw/
│     ├─ globe.png                 ← 421×405 (cropTransform 적용)
│     ├─ dotted-line-short.svg     ← 91 너비 (사업 1·2 행)
│     ├─ dotted-line-long.svg      ← 106 너비 (사업 3 행)
│     ├─ arrow-right-green.svg     ← 16×20.88 (4 라벨 공통)
│     ├─ connector-vec4.svg        ← 152.21×105 (사회공헌)
│     ├─ connector-vec5.svg        ← 63.30×39 (참여)
│     ├─ connector-vec6.svg        ← 74.35×37 (자격, scaleY -1)
│     └─ connector-vec7.svg        ← 199.94×109 (교육, scaleY -1)
└─ routes/
   └─ MainIntroPreview.tsx         ← /__preview/main-intro
```

> 좌측 인디케이터(`26:131` 큰 원 16+작은 원 6)는 raster export 회피 → CSS로 처리 (border + dot div). 16×16 outline ring + 6×6 dot, 둘 다 #c6cdcc 또는 baseline 색 채취 후 결정.

### Props 시그니처

```ts
// IntroBusinessRow
type IntroBusinessRowProps = {
  pillLabel: string;                 // "주요사업 01"
  title: string;                     // "ESG 실천방안 발굴"
  lineSrc: string;                   // dotted line SVG
  lineWidth: number;                 // 91 or 106
  body: string[];                    // 2줄 (br 강제)
};

// IntroGlobeLabel
type IntroGlobeLabelProps = {
  title: string;                     // "교육"
  body: string[];                    // 2줄
  arrowSrc: string;
  // 위치는 부모(IntroGlobeGroup)가 absolute 부여
};

// IntroGlobeGroup, IntroLeftColumn, MainIntro — props 없음
```

### 캔버스 좌표 매핑 (IntroGlobeGroup 내부, relative 컨테이너 기준)

`Group 9` bbox: x=1029.5 y=203.5 w=640 h=633 → left/top 변환 (`label.x - 1029.5`, `label.y - 203.5`):

| 요소 | left | top | width | height | transform |
|------|------|-----|-------|--------|-----------|
| 라벨 교육 | 80.376762390... | 0 | 181.852432... | 78 | — |
| 라벨 자격 | 0 | 185 | 181.852432... | 78 | — |
| 라벨 참여 | 0 | 370 | 181.852432... | 78 | — |
| 라벨 사회공헌 | 80.376762390... | 555 | 181.852432... | 78 | — |
| globe (image 17) | 220.014404... | 85.524902... | 419.985504... | 404.950226... | — |
| connector Vec4 | 278.304565... | 464 | 152.213500... | 105 | — |
| connector Vec7 | 278.304565... | 124 | 199.937210... | 109 | scaleY(-1) |
| connector Vec5 | 197.927780... | 344 | 63.296703... | 39 | — |
| connector Vec6 | 197.927780... | 236 | 74.348510... | 37 | scaleY(-1) |

> Tailwind arbitrary `left-[80.376762390137px]` `w-[181.852432251px]` 등 소수점 그대로 (§2.4 정밀 수치 규칙). 측정 시 px 단위 유지.

---

## 3. Tailwind/CSS 전략

- **BG**: section 루트 `bg-white` (Figma root frame fill 없음 → 디폴트 white). baseline 좌측 영역 색 추출로 재확인. 다크 영역 없음.
- **폰트**: `font-['Pretendard_Variable']` + weight 클래스 (Regular 400, SemiBold 600, Bold 700). main-hero와 동일 패턴.
- **letter-spacing/line-height 소수점 보존**:
  - 14R: `tracking-[-0.5px]` (Figma -0.07px ≈ -0.07/14 em → 단위는 design_context 그대로 `tracking-[-0.07px]` 사용. **px 직접 명시**)
  - 14SB: `tracking-[-0.07px]`
  - 16R: `tracking-[-0.16px]`
  - 20B: `tracking-[-0.4px]` lh `leading-[1.4]`
  - 24B: `tracking-[-0.6px]` lh `leading-[1.4]`
  - 48B: `tracking-[0]` lh `leading-[56px]`
  > design_context의 tracking 값은 (Figma 토큰의 `letterSpacing` 항목과 다소 다른 단위로 표현). **design_context를 진실의 원천으로 채택** — Figma MCP가 자동 변환한 값. 직접 사용.
- **Pill BG**: `bg-[#4fb654]` (또는 `bg-[var(--color-brand-500)]`). radius `rounded-[24px]`, padding `px-3 py-1`.
- **본문 컬러 강조**: `<span class="font-['Pretendard_Variable'] font-bold text-[#4fb654] tracking-[-0.16px]">교육, 자격, 참여, 사회공헌</span>`
- **인라인 매직넘버**: 캔버스 좌표(소수점 px), section 풀폭 1920×1040, root padding `px-[252px] py-[200px]` `gap-[63px]` (좌측 716 + 우측 640 정렬용).
- **`-scale-y-100`**: connector Vec6/Vec7. SVG에 적용. Tailwind `-scale-y-100` 사용 가능.

---

## 4. 에셋 파이프라인

### 4.1 다운로드 (단계 3)

**globe (raster + cropTransform)**:
```ts
mcp__figma-framelink__download_figma_images({
  fileKey: "qhrMiGVfoSQ1QMFhVN8z78",
  localPath: "src/assets/main-intro/raw",
  pngScale: 2,
  nodes: [{
    nodeId: "26:92",
    fileName: "globe.png",
    imageRef: "e941493385c2fa24c4f3659e36daf28d9a822fa2",
    needsCropping: true,
    cropTransform: [
      [0.6160910129547119, 0, 0.13691511750221252],
      [0, 0.8854487538337708, 0.05647930130362511]
    ]
  }]
});
```

**vector/SVG (8개)**:
```ts
mcp__figma-framelink__download_figma_images({
  fileKey: "qhrMiGVfoSQ1QMFhVN8z78",
  localPath: "src/assets/main-intro/raw",
  nodes: [
    { nodeId: "26:128", fileName: "dot-large.svg" },         // ellipse 16x16
    { nodeId: "26:129", fileName: "dot-small.svg" },         // ellipse 6x6
    { nodeId: "26:190", fileName: "dotted-line-short.svg" }, // 91x34
    { nodeId: "26:199", fileName: "dotted-line-long.svg" },  // 106x34
    { nodeId: "26:243", fileName: "arrow-right-green.svg" }, // 16x20.88
    { nodeId: "26:266", fileName: "connector-vec4.svg" },    // 152x105
    { nodeId: "26:267", fileName: "connector-vec5.svg" },    // 63x39
    { nodeId: "26:268", fileName: "connector-vec6.svg" },    // 74x37
    { nodeId: "26:269", fileName: "connector-vec7.svg" },    // 200x109
  ]
});
```

> dot-large/dot-small은 단순 원이지만 baseline 색 일치 검증을 위해 export. 단계 4에서 div CSS 대체 가능 시 raster 제거.

### 4.2 검증
- `verify-assets.sh`로 raw → 9 파일 일치
- naturalWidth > 0 (G3) — globe.png 자동 처리

### 4.3 후처리
- `process-assets.py` — sRGB 정규화 (raster만)
- SVG는 그대로 사용

---

## 5. 4 게이트 예상 측정

### G1 시각 일치 (pixelmatch diff < 5%)
- 측정: `scripts/compare-section.sh main-intro` (URL 자동 `/__preview/main-intro`)
- baseline: `figma-screenshots/main-intro.png` (1920×1040)
- clip 미사용 (풀폭)
- 위험 영역:
  - ① globe cropTransform raster 픽셀 정렬
  - ② connector SVG anti-alias
  - ③ 본문 컬러 강조 span (#4fb654 영역)
  - ④ 점선 dotted-line SVG dasharray 렌더
  - ⑤ Pretendard 글리프 (이전 main-hero에서 sub-pixel diff 확인됨, 본 섹션은 회전 없으므로 영향 미미)

### G2 치수 정확도 (font ±1px, margin ±2px)
측정 포인트 (Playwright `getBoundingClientRect`):
- Section root: w=1920 h=1040
- 좌측 컬럼 left=250.5 top=247.5 w=716 h=545
- 헤딩 "ESG 실천을 위한 연대 플랫폼": fs 48 / lh 56 / fw 700
- 헤딩 라벨 "ESGPN이란?": fs 14 / lh 21 (1.5) / fw 400 / color #97a29e
- 본문 (`12:2355`): fs 16 / lh 24 (1.5) / fw 400
- 사업 타이틀: fs 24 / lh ~33.6 (1.4) / fw 700
- 사업 본문: fs 14 / lh 21 (1.5) / fw 400
- pill: w=94 h=29 / radius 24 / padding 4×12 / fs 14 / fw 600
- 라벨 타이틀 (교육 등): fs 20 / lh 28 / fw 700
- 라벨 본문: fs 14 / lh 21 / color #97a29e
- globe: w=419.985504... h=404.950226... left+top 캔버스 절대값
- connector left/top/width/height (소수점 ±1px)

### G3 에셋 무결성
- 9 img 요소 (globe, 4 connector, arrow×4 instance, line×3 instance, dot×2)
- 자동: `Array.from(document.images).every(i => i.naturalWidth > 0)`

### G4 색상 정확도
- Section bg `#ffffff`
- 헤딩 텍스트 `#1d2623` (--color-gray-900)
- 헤딩 라벨 `#97a29e` (--color-gray-500)
- 본문 강조 span `#4fb654` (--color-brand-500)
- pill bg `#4fb654`, text `#ffffff`
- 라벨 본문 `#97a29e`
- 라벨 타이틀 `#1d2623`

---

## 6. 리스크 대응 (research §7 → 액션)

| # | 액션 |
|---|------|
| R1 | Framelink `cropTransform` + `needsCropping:true` (위 §4.1). fallback: 비크롭 raster + design_context inset CSS. |
| R2 | SVG export → `<img>` `inline-block`. design_context의 음수 inset(`inset-[-0.92%_-0.5%_-4.89%_-2.67%]`) 그대로 wrapper에 적용. |
| R3 | pill 컬럼은 사업 본문 컬럼 좌측에 absolute (left:0, top:0, w:94). 본문 컬럼은 left:114(94+20) top:26로 offset. 두 컬럼 모두 inline-grid의 자식 셀로 보이지만 React에선 absolute 분리. |
| R4 | `IntroGlobeGroup` `relative w-[640px] h-[633px]` + 자식 9개 absolute (위 §2 표). |
| R5 | 본문 `<span>` 단일, font-bold + #4fb654. |
| R6 | `<br aria-hidden="true">` 그대로. |
| R7 | 좌측 인디케이터 (`26:131`): div 2개로 처리 — `w-4 h-4 rounded-full border border-[#c6cdcc]` + `w-1.5 h-1.5 rounded-full bg-[#c6cdcc]`. baseline 색 채취 후 보정. raster export 회피. |
| R8 | globe pngScale 2 ≈ 840×810, 압축 후 <500KB 예상. 초과 시 sharp 호출 (main-hero `compress-bg.mjs` 패턴). |
| R9 | 회전 0개 — 단순. |
| R10 | 풀폭 비교, clip 미사용. |

---

## 7. 작업 순서 (단계 3 이후, 사용자 승인 후 실행)

1. **단계 3 — 에셋 수집** (~5분)
   - Framelink `download_figma_images` 1회 호출 (globe + 8 SVG, 총 9 노드)
   - verify-assets.sh
   - process-assets.py (raster만)
   - SVG inset 보정값 design_context에서 추출 정리

2. **단계 4 — 구현** (~30분)
   - `MainIntro.tsx` + 4 sub 컴포넌트 작성
   - `routes/MainIntroPreview.tsx` 추가
   - `App.tsx`에 `<Route path="/__preview/main-intro" element={<MainIntroPreview />} />` + `/`에 main-hero 다음 섹션으로 마운트 (단, **main-intro 섹션만**. 페이지 통합은 별도 단계)
   - 빌드/타입체크/린트 통과

3. **단계 5 — 측정** (~5분)
   - dev server
   - `scripts/compare-section.sh main-intro`
   - 측정 스크립트 `tests/visual/measure-main-intro.ts` 작성. **`page.evaluate()` 인자 함수에 TS 타입 주석 금지** (main-hero 교훈)
   - 4 게이트 결과 §9 측정 섹션에 기록

4. **단계 6 — 수정 (필요 시, 최대 3회)**

5. **단계 7 — 커밋**
   - `feat: main-intro 섹션 구현 (diff X.XX%)`
   - PROGRESS.md `/메인페이지` 항목 main-intro 체크 + diff %

---

## 8. 사용자 승인 필요 항목

| 항목 | 옵션 | 권장 |
|------|------|------|
| globe export 방식 | (a) cropTransform 포함 raster (잘린 PNG) <br>(b) 비크롭 raster + CSS inset/scale 트릭 | **(a)** — 픽셀 정확도 최고. fallback (b). |
| 좌측 인디케이터 처리 | (a) raster (dot-large.svg + dot-small.svg) <br>(b) CSS div 2개 | **(b)** — 단순 도형, raster 회피로 G3 검사 1건 감소. baseline 색 채취 후 적용. |
| 신규 npm 패키지 | 없음 | — |

---

## 9. 측정 결과

### 회차 1 (2026-04-13) — **PASS**

| 게이트 | 결과 | 수치 |
|--------|------|------|
| **G1 시각 일치** (<5%) | ✅ PASS | **diff 3.20%** (63,901 / 1,996,800 px). `scripts/compare-section.sh main-intro` |
| **G2 치수 정확도** (font ±1, 기타 ±2) | ✅ PASS | 아래 표 |
| **G3 에셋 무결성** (naturalWidth>0) | ✅ PASS | **12/12** 통과 |
| **G4 색상 정확도** (hex 일치) | ✅ PASS | 아래 표 |

#### G2 측정값 vs Figma 기대치

| 항목 | Figma 기대 | 실측 | 차이 |
|------|-----------|------|------|
| Section 풀폭 | 1920×1040 | 1920×1040 | 0 |
| 좌측 컬럼 left/top | 250.5 / 247.5 | 250.5 / 247.5 | 0 |
| 좌측 컬럼 size | 716×545 | 716×545 | 0 |
| 헤딩 라벨 (ESGPN이란?) fs/fw/color | 14/400/#97a29e | 14px/400/rgb(151,162,158) | 0 |
| 헤딩 (ESG 실천을…) fs/fw/lh/color | 48/700/56px/#1d2623 | 48px/700/56px/rgb(29,38,35) | 0 |
| 사업 행 size | 600×54 | 600×54 | 0 |
| 사업 타이틀 fs/fw/lh/ls | 24/700/33.6px/-0.6 | 24px/700/33.6px/-0.6px | 0 |
| 사업 본문 fs/fw | 14/400 | 14px/400 | 0 |
| 점선 (short) box w | 91 | 91 | 0 |
| 점선 (long) box w | 106 | 106 | 0 |
| pill size / radius | 94×29 / 24 | 94×29 / 24px | 0 |
| pill fs/fw | 14/600 | 14px/600 | 0 |
| 라벨 교육 left/top/w/h | 1109.877 / 203.5 / 181.852 / 78 | 1109.88 / 203.5 / 181.84 / 78 | ±0.02 |
| 라벨 자격 left/top | 1029.5 / 388.5 | 1029.5 / 388.5 | 0 |
| 라벨 참여 left/top | 1029.5 / 573.5 | 1029.5 / 573.5 | 0 |
| 라벨 사회공헌 left/top | 1109.877 / 758.5 | 1109.88 / 758.5 | 0 |
| 라벨 title fs/fw/ls | 20/700/-0.4 | 20px/700/-0.4px | 0 |
| globe box left/top/w/h | 1249.514 / 289.025 / 419.986 / 404.95 | 1249.5 / 289.02 / 419.98 / 404.94 | ±0.04 |
| globe natural (cropped raster) | 779×751 (Framelink export) | 779×751 | 0 |

모든 차이 ±2px 이내 ✅ (대부분 ±0.05 이내)

#### G3 에셋 (12개)

| 에셋 | naturalWidth × naturalHeight |
|------|------|
| dotted-line-short.svg ×2 (사업 1·2) | 97×34 |
| dotted-line-long.svg ×1 (사업 3) | 112×34 |
| arrow-right-green.svg ×4 (라벨 4개) | 16×21 |
| globe.png | 779×751 (cropped raster) |
| connector-vec4.svg | 159×112 |
| connector-vec5.svg | 70×46 |
| connector-vec6.svg | 81×44 |
| connector-vec7.svg | 207×116 |

모두 naturalWidth>0 ✅. SVG natural width은 viewBox 기준 (Figma frame box보다 약간 큼 — inset 음수 보정값으로 박스에 맞춰 렌더).

#### G4 색상

| 항목 | Figma | 실측 |
|------|-------|------|
| Section bg | #ffffff | rgba(0,0,0,0) (root layout 흰색 통과 — 정상) |
| 헤딩/사업 타이틀 color | #1d2623 | rgb(29,38,35) ✅ |
| 헤딩 라벨/사업 본문 (gray) | #97a29e (label) / #1d2623 (body) | rgb(151,162,158) / rgb(29,38,35) ✅ |
| pill bg / text | #4fb654 / #ffffff | rgb(79,182,84) / rgb(255,255,255) ✅ |
| 라벨 title color | #1d2623 | rgb(29,38,35) ✅ |

→ **회차 1에 4 게이트 모두 PASS. 단계 6 수정 불필요.**

### 회차 2 (2026-04-13) — 사용자 diff 리뷰 후 정밀화
사용자가 주요사업 3행 diff 패턴(누적 수직 오프셋) 지적. design_context 비교로 3가지 원인 확인 후 수정.

**원인:**
1. **letter-spacing 단위 오해**: Figma의 `Text-sm/14R letterSpacing: -0.5` 토큰은 **percent**(-0.5% = 14px × 0.005 = -0.07px). 우리 구현은 `-0.5px`로 처리해 **7배 과도** 자간 압축 → 한글 본문 한 줄당 글자수 증가 → 행 높이 미묘 드리프트. `Text-base/16R letterSpacing: -1`도 동일 이슈(-0.16px 맞음, 우리는 -1px 잘못).
2. **items-center vs items-start**: IntroBusinessRow가 flex items-center + 고정 height 54였으나 Figma는 items-start + 자연 높이. 본문이 2줄이면 row 높이가 달라짐.
3. **본문 폭 고정 + 명시적 `<br>` 누락**: Figma는 `w-[308px]` + 중간 `<br>` 2줄 강제. 우리는 `flex-1` 자동 줄바꿈.

**수정:**
- 14px/16px 텍스트 letter-spacing을 모두 실제 px값(-0.07px / -0.16px 등)으로 변경
- IntroBusinessRow: `items-start`, 고정 height 제거, body 2줄 `<br>`, 308px 고정
- 좌측 본문도 Figma br 위치대로 3줄 강제

**G1 결과**: 3.20% → **2.41%** (-0.79%p). 임계 5% 대비 2.59%p 여유.

### 회차 3 (2026-04-13) — SVG scaleY 반전 제거
사용자가 dev 캡처 vs Figma baseline 육안 비교로 Vec6(자격)·Vec7(교육) 커넥터가 **상하 반전돼 표시됨** 지적.

**원인**: Framelink `download_figma_images`가 export한 SVG는 **이미 display-ready 방향**. `get_design_context`의 `-scale-y-100` 지침은 Figma 내부 저장 형식 기준이지 export SVG 기준이 아님. 추가 CSS 반전 적용으로 실제 표시 방향이 뒤집힘.

**수정**: IntroGlobeGroup에서 Vec6/Vec7의 `-scale-y-100` wrapper 제거. inset top↔bottom swap (scaleY 없이 동일 시각 효과).

**G1 결과**: 2.41% → **2.36%** (-0.05%p). pixelmatch 수치 변화는 미미하지만 **시각 정합성은 크게 회복**.

**배운 점 (docs §2.4에 추가됨)**:
- Framelink SVG에는 `scaleY/scaleX` 반전 transform 금지
- design_context의 transform 지침은 Figma 내부 기준이므로 export된 에셋에 그대로 적용하면 역방향 됨

**※ 배운 점 (다음 섹션 워커에 전파):**
- Figma 토큰의 letterSpacing 숫자(예: -0.5)가 **percent 단위**인지 확인 필수. CSS px로 변환 시 `font_size × (token_value / 100)` 사용
- Figma `<br>`는 한글 텍스트 줄바꿈 위치를 디자이너가 의도적으로 설정한 것. 자동 줄바꿈 대체 금지 (G1 악화)
- `items-center` + 고정 height 조합은 flex content 자연 높이와 상충 가능. 가급적 Figma 원본의 alignment 그대로 사용

---

## 10. 단계 2 통과 체크

- [x] 컴포넌트 트리 정의 (5 파일)
- [x] props 시그니처 명시
- [x] 에셋 매핑 (Framelink 호출 인자 포함, raster 1 + SVG 8)
- [x] 트레이드오프 기록 (D1~D8)
- [x] 새 npm 패키지: 없음
- [x] 4 게이트 측정 지점 정의
- [x] 리스크 대응 (R1~R10)
- [x] 단일 평탄 이미지 여부: **아님** (D1)
- [x] HeroCTA 재사용 여부: **재사용 X — main-intro에 CTA 없음** (D6)
- [x] 신규 공통 컴포넌트 후보: **없음** (D7, Rule of Three 미충족)

→ **사용자 승인 대기. 승인 후 단계 3 진입.**
