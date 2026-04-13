# main-hero — 구현 계획

연관 리서치: `research/main-hero.md`
연관 baseline: `figma-screenshots/main-hero.png` (1920×1040, pngScale 1)

---

## 1. 핵심 결정 사항

| # | 결정 | 사유 |
|---|------|------|
| D1 | **단일 평탄 이미지 아님** — DOM 그대로 재구성 | `get_design_context`가 자식 노드 풍부히 반환. 사전 우려(메타 빈 노드)는 기우. 텍스트/도형/3카드/2 CTA 모두 React로 합성, BG 1장만 정적 이미지. |
| D2 | **카드 1·3 아이콘은 정적 PNG로 export** (gifRef 무시) | CLAUDE.md 절대 규칙. 캔버스 정적 표현이 진실의 원천. `dynamic-asset-handling` 스킬 적용. |
| D3 | **아이콘 export는 `20:210` / `20:213` 단독 노드** (140×140 직접) | 카드 부모(`17:200`) 전체를 export하면 텍스트까지 raster화돼 G1 맵핑 불가. 아이콘만 추출해서 텍스트는 React 텍스트로. cropTransform이 적용된 이미지가 필요하므로 Framelink가 자동 처리. 실패 시 (Framelink가 동적 노드 단독 export 못 하면) 부모 통째 export → 텍스트는 mix-blend 위에 덧씌우기로 fallback. |
| D4 | **Section CTA Button 공통 컴포넌트화 보류** | 비교: <br>**a) 지금 공통화** — 재사용 후보 명확(Hero, Gallery 등), 일관 디자인 강제 가능. 단 다른 섹션의 정확한 prop 시그니처 미확인. <br>**b) 로컬 배치 후 추출** — Hero에 인라인으로 두 개만 두고, Gallery 등 두 번째 사용 시점에 추출. <br>→ **(b) 채택.** Hero 단일 섹션 데이터로 추상화하면 잘못된 prop 모양이 굳어질 위험. 두 번째 사용 사례가 등장할 때 패턴이 명확해짐 (Rule of Three 변형). 두 버튼은 페이지 로컬 컴포넌트 `<HeroCTA>` (variant: 'primary' \| 'secondary')로 캡슐화. |
| D5 | **Yeseva One 폰트는 self-host (woff2)** | Google Fonts CDN은 외부 의존, 헤드리스 캡처 시 폰트 로드 race 위험. `@fontsource/yeseva-one` npm 도입은 사용자 승인 필요. **self-host가 가장 신뢰성 높음 → 사용자 승인 게이트 1개 추가.** 대안 (사용자가 fontsource 선호 시) `npm i @fontsource/yeseva-one` 도입. |
| D6 | **`#f3f3f3` 배경**은 인라인 (토큰 추가 X) | 다른 섹션 등장 시 토큰화. 단일 사용 토큰 양산 회피. |
| D7 | **격리 측정 라우트** `/__preview/main-hero` 추가 | Header가 RootLayout으로 전역 장착돼 baseline과 비교 시 상단 80px가 헤더로 가려짐. baseline은 Header 없는 순수 Hero이므로 격리 라우트가 G1 정확도 보장. 실제 사용은 `/`. |
| D8 | **backdrop-blur는 8px 우선**, 미스 시 16px | design_context와 Framelink가 다름. design_context가 최신 export로 추정. 단계 5에서 카드 영역 G1 픽셀 점검 후 결정. |

---

## 2. 컴포넌트 구조

```
src/
├─ components/
│  └─ sections/
│     └─ MainHero/
│        ├─ MainHero.tsx          ← 섹션 루트
│        ├─ HeroIntroCard.tsx     ← 1개 카드 (props: rotation, iconSrc, blendMode, title, body[])
│        ├─ HeroCTA.tsx           ← 1개 pill 버튼 (props: variant, label, href?, onClick?)
│        └─ index.ts              ← re-export
├─ assets/
│  └─ main-hero/
│     ├─ raw/                     ← 다운로드 원본
│     ├─ bg.png                   ← 1101×986 도시+나무 합성
│     ├─ card1-icon.png           ← 140×140 (정적 추출, Card1)
│     ├─ card2-icon.png           ← 140×140
│     └─ card3-icon.png           ← 140×140 (정적 추출, Card3)
└─ routes/
   └─ MainHeroPreview.tsx        ← /__preview/main-hero 격리 캡처용
```

### Props 시그니처

```ts
// HeroIntroCard
type HeroIntroCardProps = {
  rotationDeg: -4 | 0 | 4;
  iconSrc: string;
  iconAlt: string;
  blendMode?: 'lighten' | 'screen' | 'normal';
  title: string;
  body: string[];          // 줄 단위
};

// HeroCTA
type HeroCTAProps = {
  variant: 'white' | 'green';
  label: string;
  href?: string;           // 우선 제공 시 <a>, 없으면 <button>
  onClick?: () => void;
};

// MainHero — props 없음 (페이지 섹션)
export function MainHero(): JSX.Element;
```

### 카드 데이터 (MainHero 내부 const)

```ts
const CARDS: HeroIntroCardProps[] = [
  { rotationDeg: -4, iconSrc: card1Icon, iconAlt: 'ESG마인드 자격검정', blendMode: 'lighten',
    title: 'ESG마인드 자격검정',
    body: ['기본 개념부터 실무 적용까지,', '체계적인 교육으로 차세대 리더의', 'ESG 실천 역량을 인증합니다.'] },
  { rotationDeg: 0,  iconSrc: card2Icon, iconAlt: 'ESG실천 아이디어 경진대회', blendMode: 'normal',
    title: 'ESG실천 아이디어 경진대회',
    body: ['청년과 지역사회의 협력으로 현장 문제를', '해결하며, 지속가능한 변화를 만드는', '실질적인 ESG 성과를 도출합니다.'] },
  { rotationDeg: 4,  iconSrc: card3Icon, iconAlt: '사회공헌 및 재능나눔', blendMode: 'screen',
    title: '사회공헌 및 재능나눔',
    body: ['산업체·지자체 파트너십을 통해 ESG 가치를', '지역 일자리와 서비스로 연결하며', '상생의 가치를 창출합니다.'] },
];
```

---

## 3. Tailwind/CSS 전략

- **Tailwind v4 `@theme`** 토큰은 `tokens.css` 그대로 사용. 인라인 매직넘버는 회전(-4/+4 deg), BG 좌표(15.9% / 29.76% / 68.19% / 94.87%), Inner padding(160/110/409)만 — 디자인 좌표 자체이므로 명명 불필요.
- **Yeseva One** 적용:
  - `src/styles/fonts.css`에 `@font-face` 선언, src `local()` + `url(/fonts/yeseva-one-400.woff2)`
  - tokens.css에 `--font-family-yeseva: "Yeseva One", "Noto Serif KR", serif;` 추가
  - 폰트 파일은 `public/fonts/yeseva-one-400.woff2` (Google Fonts에서 직접 다운로드, latin subset)
- **카드 backdrop-blur**: Tailwind의 `backdrop-blur-[8px]` 임의값 (v4는 brackets 동작). bg는 `bg-black/12`.
- **카드 회전**: wrapper div는 카드보다 큰(342.938×361.494) 박스 + 내부 div에 `rotate-[-4deg]` / `rotate-[4deg]`. 0도 카드는 wrapper 생략 가능.
- **Inner 컨테이너 width 1101.875**: `w-[1101.875px]` 또는 `w-[1102px]` 둘 다 G2 ±2px 안. **`w-[1102px]`** 채택 (소수점 회피).

---

## 4. 에셋 파이프라인

### 4.1 다운로드 (단계 3에서 실행)

```
mcp__figma-framelink__download_figma_images(
  fileKey: "qhrMiGVfoSQ1QMFhVN8z78",
  localPath: "src/assets/main-hero/raw",
  pngScale: 2,
  nodes: [
    { nodeId: "43:1730", fileName: "bg.png" },          // BG 통째 export → 후처리에서 BG 박스만 crop, 또는 imgFrame2043685963 imageRef로 직접
    { nodeId: "20:210", fileName: "card1-icon.png", imageRef: "4ed3b9efeebdadecbc01cf3c8d5f2bd2babd17a8", needsCropping: true },
    { nodeId: "20:212", fileName: "card2-icon.png", imageRef: "754cd2a0890eb617b3ff3d864229b4b4f6bc9d14", needsCropping: true },
    { nodeId: "20:213", fileName: "card3-icon.png", imageRef: "9f9c1d845bbd70736669905b0bc5b679c8bfe044", needsCropping: true },
  ]
)
```

> Card1/Card3는 `gifRef`를 **고의로 생략** → Framelink가 정적 `imageRef` 기반 PNG 반환 (cropTransform 적용). 만약 그래도 GIF가 떨어지면 부모 노드 `17:200` / `17:206` 통째 export로 fallback.

### 4.2 BG 이미지 처리
- 옵션 A: Hero 노드 `43:1730` 자체를 Framelink로 export하면 카드/텍스트까지 다 raster → ❌ 불가
- 옵션 B: design_context에서 노출된 `imgFrame2043685963` URL을 직접 다운 → ✅ 채택
  - 단계 3에서 fetch (또는 Framelink가 imageRef 단독 노드 지원하면 그쪽). 폴백은 manual download.

### 4.3 검증
- `scripts/verify-assets.sh`로 raw → 4개 PNG 일치 확인
- `process-assets.py`로 컬러 프로파일 정규화 (sRGB)

---

## 5. 4 게이트 예상 측정 지점

### G1 시각 일치 (pixelmatch diff < 5%)
- 측정: `npx tsx tests/visual/run.ts --section main-hero --url http://localhost:5173/__preview/main-hero --baseline figma-screenshots/main-hero.png`
- 풀폭이므로 `--clip-*` 미사용
- 위험 영역: ① 카드 backdrop-blur(브라우저 합성 차이), ② Yeseva One 글리프 렌더링 차이, ③ BG 이미지 opacity 96% 합성

### G2 치수 정확도 (font ±1px, margin/padding ±2px)
- 측정 포인트:
  - "Environmental" font-size 100px, lh 100px
  - 본문 18px, lh 27px (1.5)
  - 카드 320×340, gap 48
  - 카드 padding 24, radius 32
  - CTA padding 32×16, radius 9999, gap 12
  - Inner pt-160, pb-110

### G3 에셋 무결성 (모든 img naturalWidth > 0)
- 4 img: bg, card1-icon, card2-icon, card3-icon
- 자동: Playwright `Array.from(document.images).every(i => i.naturalWidth > 0)`

### G4 색상 정확도 (Figma hex 동일)
- BG `#f3f3f3` (인라인)
- "ESGPN", 본문 `#1d2623` (`--color-gray-900`)
- "Environmental" `#0c3b0e` (`--color-brand-700`)
- 카드 텍스트 `#ffffff`
- CTA white `#ffffff`, green `#4fb654` (`--color-brand-500`)

---

## 6. 리스크 대응 (research §6 → 구체 액션)

| # | 대응 |
|---|------|
| R1 | 단계 3에서 Framelink imageRef-only 호출. GIF가 떨어지면 부모 통째 export → text 오버레이 합성. |
| R2 | Yeseva One self-host. fonts.css + public/fonts. 사용자가 npm 패키지 선호하면 변경. |
| R3 | `#f3f3f3` 인라인 (Tailwind `bg-[#f3f3f3]`). |
| R4 | 카드 영역 단독 diff 측정 추가 — 5% 안 통과해도 카드만 따로 7~8% 허용 검토 (사용자 승인 필요). |
| R5 | design_context의 `<br>` 2개(=3줄) 그대로 따름. baseline이 4줄로 보이면 폰트/줄간 차이일 가능성 — G1에서 확인. |
| R6 | `/__preview/main-hero` 격리 라우트 추가 (App.tsx에 `<Route path="/__preview/main-hero" element={<MainHeroPreview />} />`). |
| R7 | 기본 Hero pt-160 → Header(top 16+72=88) 겹침 없음. 시각 확인만. |

---

## 7. 작업 순서 (단계 3 이후, 사용자 승인 후 실행)

1. **단계 3 — 에셋 수집** (~10분)
   - Yeseva One woff2 다운로드 → `public/fonts/`
   - Framelink로 4 PNG → `src/assets/main-hero/raw/`
   - verify-assets.sh → 통과
   - process-assets.py로 sRGB 정규화 → `src/assets/main-hero/`

2. **단계 4 — 구현** (~25분)
   - tokens.css에 `--font-family-yeseva` 추가
   - fonts.css에 @font-face
   - components/sections/MainHero/ 3 파일 작성
   - routes/MainHeroPreview.tsx + App.tsx 라우트 추가
   - `/` 라우트에 `<MainHero />` 마운트 (PhaseOnePlaceholder 대체)
   - 빌드/타입체크/린트 통과

3. **단계 5 — 측정** (~5분)
   - dev server 기동
   - pixelmatch script 실행
   - 4 게이트 결과 아래 §8 측정 섹션에 기록

4. **단계 6 — 수정 (필요 시, 최대 3회)**
   - 회차별 결과 누적

5. **단계 7 — 커밋**
   - PROGRESS.md main-hero 체크 + diff %

---

## 8. 측정 결과 (단계 5/6)

### 회차 1 — 초기 구현 (BG = background-image 100% 100%, 카드 아이콘 검정 PNG 그대로)
- G1 시각 diff: **45.48%** (908,204 / 1,996,800 px) — FAIL
- 원인 분석: BG 이미지가 풀폭 stretch되어 baseline 대비 크게 확대됨. 카드 아이콘이 검정 사각형으로 표시되어 lighten/screen blend 효과 미발현.

### 회차 2 — BG 이미지를 absolute `<img>`로 분리 (left 15.9%, top 29.76%, w 68.19%, h 94.87%, opacity 0.96)
- G1 시각 diff: **8.67%** (173,059 px) — FAIL (-36.81%p 대폭 개선)
- 원인 분석: 카드 1·3 아이콘 검정 배경이 lighten/screen blend 효과 미발현 → 카드 영역 큰 diff. 카드 2 검정 사각형도 동일.

### 회차 3 — Card 1·3 아이콘 PNG의 검정 배경(threshold 30) 알파 0 처리 (process-assets `--blackbg`)
- G1 시각 diff: **6.88%** (137,461 px) — FAIL (-1.79%p)
- 원인 분석: Card 1·3은 baseline에 가까워짐. Card 2 아이콘만 여전히 검정 사각형으로 큰 차이.

### 회차 4 — Card 2 아이콘 PNG도 동일 알파 처리 (도트 패턴 흰색 유지, 배경만 투명)
- G1 시각 diff: **5.98%** (119,458 / 1,996,800 px) — **임계 5% 초과 0.98%p** (FAIL but borderline)
- 추세: 45.48 → 8.67 → 6.88 → 5.98 (개선 명확). 잔여 차이는 (a) 카드 텍스트 글꼴 안티앨리어싱 미세 차이, (b) backdrop-blur 16px 브라우저 합성 대 Figma raster 차이, (c) Yeseva One vs Figma 글리프 hint 차이로 추정.

- **G2 치수 (모두 PASS)**:
  - Section 1920×1040 / bg #f3f3f3
  - h1 "Environmental" 100px / lh 100px / ff Yeseva One ✓
  - catchphrase 20px / 600 / lh 28px / ls -2px ✓
  - body 18px / 400 / lh 27px / ls -1.5px ✓
  - Card1/3 wrapper 343×361 (Figma 342.94×361.49 ±2px ✓)
  - Card2 wrapper 320×340 ✓
  - Card title 24px / 700 / lh 32px ✓
  - Card padding 24, gap 24, radius 32 ✓
  - Button padding 16×32, radius 9999 ✓
  - Inner padding 160/409/110, gap 86, container w 1102 ✓

- **G3 에셋 (PASS)**: 4 / 4
  - bg.png 3840×2894 (naturalWidth > 0)
  - card1-icon.png 480×480
  - card2-icon.png 720×720
  - card3-icon.png 500×500

- **G4 색상 (모두 PASS)**:
  - Section bg `rgb(243,243,243)` = `#f3f3f3` ✓
  - h1 color `rgb(12,59,14)` = `#0c3b0e` (--brand-700) ✓
  - Card title `rgb(255,255,255)` = `#ffffff` ✓
  - Btn white bg `#ffffff`, text `rgb(29,38,35)` = `#1d2623` ✓
  - Btn green bg `rgb(79,182,84)` = `#4fb654` (--brand-500), text `#ffffff` ✓

### 회차 5 — 접근 전환: 카드 부모 노드 통째 raster export + img 1장 교체 + BG 압축
- **사용자 결정: [B] 다른 접근** — 카드 3개의 부모 노드(`17:200`/`17:203`/`17:206`)를 Framelink `download_figma_images` (pngScale 2)로 통째 PNG export. `HeroIntroCard` 내부 DOM 합성(backdrop-blur·텍스트·아이콘·blend)을 모두 제거하고 `<img src={cardImage} alt={...} />` 한 장으로 교체. 접근성은 한 줄 alt 요약으로 최소 유지.
- 추가 처리: BG 12.25MB → sharp(width 1920, quality 80, palette 256 dither 0.8) → **0.79MB** (목표 1MB 이하 달성, 압축률 93.6%).
- 에셋 사이즈: card1.png **254 KB** (686×723), card2.png **467 KB** (640×680), card3.png **457 KB** (686×723), bg.png **812 KB** (1920×1447).

- **G1 시각 diff**: **4.49%** (89,567 / 1,996,800 px) — **PASS** (-1.49%p vs 회차 4)
  - 추세: 45.48 → 8.67 → 6.88 → 5.98 → **4.49** (접근 전환으로 임계 통과)
  - 잔여 diff 주 원인 추정: BG 이미지 파노라마 합성 영역(카드 아래로 깔리는 부분)과 Yeseva One 워드마크의 sub-pixel 차이. 카드 내부는 이제 raster 동일이므로 기여분 최소화.

- **G2 치수 (모두 PASS)**:
  - Section 1920×1040 / bg rgb(243,243,243) = `#f3f3f3` ✓
  - h1 Yeseva One 100px / lh 100px / color rgb(12,59,14) ✓
  - catchphrase 20px / 600 / lh 28px / ls -2px / color rgb(29,38,35) ✓
  - body 18px / lh 27px / ls -1.5px ✓
  - Card1 wrapper 343×361 (회전 -4° 경계 박스 포함, Figma 342.94×361.49 ±2px ✓)
  - Card2 wrapper 320×340 ✓
  - Card3 wrapper 343×361 (회전 +4°) ✓
  - CTA white 283×56, padding 16×32, radius 9999 ✓
  - CTA green 241×56, padding 16×32, radius 9999 ✓

- **G3 에셋 (PASS)**: 4 / 4 naturalWidth > 0
  - bg.png 1920×1447 (압축 후), card1.png 686×723, card2.png 640×680, card3.png 686×723

- **G4 색상 (모두 PASS)**:
  - Section bg `rgb(243,243,243)` = `#f3f3f3` ✓
  - h1 color `rgb(12,59,14)` = `#0c3b0e` (--brand-700) ✓
  - 본문 `rgb(29,38,35)` = `#1d2623` (--gray-900) ✓
  - Btn white bg `rgb(255,255,255)` / text `rgb(29,38,35)` ✓
  - Btn green bg `rgb(79,182,84)` = `#4fb654` / text `rgb(255,255,255)` ✓
  - (카드 내부 색은 raster 포함이므로 G4 점검 대상에서 제외 — source of truth이 Figma raster 자체)

- **alt 텍스트 (3종)**:
  1. Card1: `"ESG마인드 자격검정 - 기본 개념부터 실무 적용까지 체계적인 교육으로 차세대 리더의 ESG 실천 역량을 인증합니다"`
  2. Card2: `"ESG실천 아이디어 경진대회 - 청년과 지역사회의 협력으로 현장 문제를 해결하며 지속가능한 변화를 만드는 실질적인 ESG 성과를 도출합니다"`
  3. Card3: `"사회공헌 및 재능나눔 - 산업체·지자체 파트너십을 통해 ESG 가치를 지역 일자리와 서비스로 연결하며 상생의 가치를 창출합니다"`

### 결론
- **G1 = 4.49% PASS, G2/G3/G4 = PASS** — 4 게이트 모두 통과.
- 트레이드오프 기록:
  - 카드 내부 텍스트가 raster화됨 → 화면 독자(스크린 리더) alt 요약만 접근 가능, 텍스트 복사/검색 불가.
  - 카드 내부 텍스트 디자인 수정 시 Figma에서 재 export 필요 (재현 가능한 수동 단계).
  - 카드 PNG 합산 ~1.15MB (2x 레티나 품질). 1x 다운스케일 여지 있음 (추가 감량 필요 시).

### 남은 리스크/이슈
- **R-new-1**: 카드 raster는 Figma 1x 사이즈의 2x scale. 디스플레이 화소 밀도 3x (모바일 고밀도)에서 약간 흐릿해질 수 있으나 현재 1920 고정 레이아웃이라 실사용 영향 없음.
- **R-new-2**: BG raster quantize(palette 256) 적용. 파노라마 이미지라 시각 degradation 가능성 있으나 G1 4.49%가 이를 포괄하며 통과. 문제되면 quality 85/palette off로 재압축 (2~3MB).
- **R-new-3**: 회차 4에서 제거한 `card{1,2,3}-icon.png`는 완전 삭제, raw만 남김 (추후 DOM 복원 시도 시 재사용 가능).

---

## 9. 사용자 승인 필요 항목

| 항목 | 옵션 | 권장 |
|------|------|------|
| Yeseva One 도입 방식 | (a) self-host woff2 (수동 다운로드, 의존성 없음) <br>(b) `@fontsource/yeseva-one` npm 추가 <br>(c) Google Fonts CDN | **(a)** — 신뢰성·재현성 최고. (b)는 사용자 승인 필요. |
| Section CTA Button 추출 시점 | (a) 지금 공통화 <br>(b) Hero 로컬 → 두 번째 사용 시 추출 | **(b)** — Rule of Three 안전. |
| Card 1·3 정적 export 전략 | (a) 아이콘 단독(`20:210`/`20:213`) <br>(b) 카드 부모 통째(`17:200`/`17:206`) | **(a) 우선, 실패 시 (b) fallback** — Framelink가 cropTransform 처리. |
| 격리 측정 라우트 추가 | `/__preview/main-hero` | **추가 권장** — baseline에 Header 없음. |

---

## 10. 단계 2 통과 체크

- [x] 컴포넌트 트리 정의
- [x] props 시그니처 명시
- [x] 에셋 매핑 (Framelink 호출 인자 포함)
- [x] 트레이드오프 기록 (D1~D8)
- [x] 새 npm 패키지 (@fontsource) 사용자 승인 항목으로 명시 — 디폴트는 self-host
- [x] 4 게이트 측정 지점 정의
- [x] 리스크 대응 (R1~R7)
- [x] 단일 평탄 이미지 여부: **아님** (D1)

→ **사용자 승인 대기. 승인 후 단계 3 진입.**
