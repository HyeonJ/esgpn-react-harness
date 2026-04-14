# research/contest-benefits.md — 경진대회 Benefits 섹션

> Phase 3 단계 1. 페이지 `/contest` 세 번째 섹션 (Node `302:5067`).
> 상위 페이지 research: `research/contest.md` §3·§5.
> 공통 규칙: `CLAUDE.md` / `docs/section-implementation.md` §2.4~§2.6, §6.1, §6.4.
> 전략: **[A] HTML 재구성** (노드 트리 살아있음, CTA 포함 전체 재구성 가능).

## 1. Figma 노드 트리 (Framelink `get_figma_data` 결과)

**노드 살아있음 — flatten 아님.** 6 BenefitCard + CTA Container 모두 자식 노드 존재.

```
302:5067 Frame 2043686026 (root, 1416×969)
  layout_OAMIVB: column, padding 64 240, gap 20, fill×hug
│
├─ 302:5068 Frame 2043686019 (Heading 블록)
│  layout_CDPYGN: column, gap 21, fill×hug
│  │
│  ├─ 302:5069 Frame 2043686018 (아이콘+제목 row, hug)
│  │  layout_65GSYA: row, items-center, gap 12
│  │  │
│  │  ├─ 302:5070 Rectangle 23  40×40 IMAGE (지구본 재사용)
│  │  │  imageRef e0323828d272debafbaef51af08c8a79feec0462
│  │  │  needsCropping:true, cropTransform=[[0.4062,0,0.2969],[0,0.7447,0.0582]]
│  │  │  filenameSuffix "273e38"   ※ contest-about과 동일 imageRef — 에셋 재사용 가능
│  │  │
│  │  └─ 302:5071 TEXT "ESG 실천 아이디어 경진대회의 특별한 혜택"
│  │     Text-3xl/32B: Pretendard Bold 32 / 1.3em / -3% / LEFT
│  │     fill_5CFO88 = #0A0A0A
│  │
│  └─ 302:5072 Frame 2043685981  IMAGE-SVG (HatchedDivider 재사용)
│     fill-width ×8h, 기존 HatchedDivider(932×10)와 동일 구조
│
└─ 302:6515 Frame 2043686168 (Body 래퍼)
   layout_JHODBY: column, gap 12, fill×hug
   │
   ├─ 302:5088 Frame 2043686042 (6카드 그리드)
   │  layout_5MDMJZ: row wrap, gap 12, fill×hug
   │  → 3×2 그리드 달성 (각 카드 304px × 3 + gap 12 × 2 = 936)
   │  │
   │  ├─ 302:5089 Card-1 "실전 중심 프로젝트"   (노드 Frame 12)
   │  ├─ 302:5094 Card-2 "네트워킹 기회"       (Frame 2043686038)
   │  ├─ 302:5099 Card-3 "상금 및 시상"        (Frame 2043686039)
   │  ├─ 302:5104 Card-4 "사업화 지원"         (Frame 2043686040)
   │  ├─ 302:5109 Card-5 "멘토링 제공"         (Frame 2043686041)
   │  └─ 302:6490 Card-6 "지역사회 연계"       (Frame 2043686042')
   │
   │  각 카드 공통 구조 (layout_1YD3UK):
   │     column, justify-center, items-center, gap 16, padding 16
   │     sizing: fixed w=304, hug h (자식 기반 추정 h≈203 — spec 일치)
   │     fill_65STE1 = #EFF0F0 (Gray 100)
   │     borderRadius 20
   │  └─ Rectangle 24  80×80 IMAGE (아이콘, imageRef 각각 다름, needsCropping:true)
   │  └─ Frame (layout_BGOLAZ: column gap 8 fill)
   │     ├─ TEXT 제목 (Text-lg/18SB — Pretendard 600 18 / 1.4em / -1.5% / CENTER, #0A0A0A)
   │     └─ TEXT 설명 (Text-sm/14M — Pretendard 500 14 / 1.5em / -0.5% / CENTER, #4A5565)
   │                    설명은 `\L` 포함 = line separator U+2028 → <br> 로 처리
   │
   └─ 302:6592 Container (CTA, 936×320 FIXED)
      layout_RADHZN: column, justify-center, items-center, gap 32, padding 64 0, fixed 936×320
      fill_9CB6V9 = [IMAGE(imageRef 83ba43ed..., isBackground:true, cropTransform, suffix '5421ad'),
                     '#005C33']  ← 이미지+배경 색 복합 레이어
      borderRadius 20
      │
      ├─ 302:6593 Frame 2043686105  (텍스트 블록, column items-center gap 12, fixed w=454)
      │  ├─ 302:6594 TEXT "지금 바로 신청하세요"
      │  │  Text-3xl/32B (17:142): Pretendard Bold 32 / 1.3em / -3% / CENTER
      │  │  fill_ZCLBAZ = #FFFFFF
      │  └─ 302:6615 TEXT "아이디어에서 실천으로, ESG 실천 아이디어 경진대회에 참여하세요."
      │     Text-base/16R: Pretendard 400 16 / 1.5em / -1% / CENTER
      │     fill_DHCJJC = rgba(255,255,255,0.6)
      │
      └─ 302:6596 Button (Frame)
         layout_D89GFQ: row items-center gap 8, padding 20 32, hug
         fill_ZCLBAZ = #FFFFFF
         effect_7H3OG2: boxShadow 0px 25px 50px -12px rgba(0,0,0,0.25)
         borderRadius 16777200  → 완전 pill (Tailwind `rounded-full`)
         │
         ├─ 302:6597 TEXT "경진대회 참가하기"
         │  style_1C4U4S: **Inter** 700 18 / 1.5556em (28px) / -2.44140625% / CENTER
         │  fill_8J3XBT = #0C3B0E  (딥 그린)
         │  ※ 유일하게 Inter 폰트 사용 (다른 모든 Pretendard). 구현 시 `font-sans` 대신 Pretendard로 통일할지 plan에서 결정
         │
         └─ 302:6598 Icon (IMAGE-SVG, 24×24)
            arrow-right 아이콘. layout_8YFI04 (내부 세로선 5,12 14×0) + layout_DVF0BC (가로선 12,5 7×14)
            → 표준 arrow-right SVG. 섹션 로컬 `arrow-right.svg` 또는 lucide `ArrowRight` 사용
```

**치수 교차검증:**
- root padding 64 240 → 내부 content 폭 1416 − 480 = **936** (OK)
- heading block: Text-3xl(h≈41.6) + gap 21 + divider 8 = **70~71** (spec 71 일치)
- card 304×(16+80+16+textblock≈75+16) ≈ 203 (spec 일치 가정)
- card row: 304×3 + gap 12×2 = 912+24 = **936** ✓
- 2행 카드 래퍼: 203×2 + gap 12 = **418** (§research/contest §1 "936×418" 일치)
- 카드+CTA gap 12 (302:6515 layout_JHODBY gap 12) → 418 + 12 + 320 = **750** (§3 "936×750" 일치)
- 총 섹션 h: padding 64 + heading 71 + gap 20 + body 750 + padding 64 = **969** ✓ (spec 일치, baseline 1416×969 일치)

## 2. 폰트·색상·letter-spacing 스펙

| style | family | weight | size | lineHeight | letterSpacing | 사용처 |
|-------|--------|--------|------|------------|---------------|---------|
| Text-3xl/32B | Pretendard | 700 | 32 | 1.3em (41.6px) | **-3%** (-0.96px) | Heading + CTA "지금 바로 신청하세요" |
| Text-lg/18SB | Pretendard | 600 | 18 | 1.4em (25.2px) | **-1.5%** (-0.27px) | 카드 제목 6개 |
| Text-sm/14M | Pretendard | 500 | 14 | 1.5em (21px) | **-0.5%** (-0.07px) | 카드 설명 6개 |
| Text-base/16R | Pretendard | 400 | 16 | 1.5em (24px) | **-1%** (-0.16px) | CTA 서브텍스트 |
| style_1C4U4S | **Inter** | 700 | 18 | 1.556em (28px) | **-2.44140625%** (-0.4395px) | 버튼 "경진대회 참가하기" |

### 색상

| variable | hex | 용도 |
|----------|-----|------|
| fill_5CFO88 | `#0A0A0A` | Heading + 카드 제목 |
| fill_65STE1 | `#EFF0F0` | 카드 배경 |
| fill_CK62CE | `#4A5565` | 카드 설명 (gray-700 계열) |
| fill_ZCLBAZ | `#FFFFFF` | CTA 제목 + 버튼 배경 |
| fill_DHCJJC | `rgba(255,255,255,0.6)` | CTA 서브텍스트 |
| fill_9CB6V9 | `#005C33` + IMAGE overlay | CTA 배경 (딥 그린 + 도시 이미지) |
| fill_8J3XBT | `#0C3B0E` | 버튼 텍스트 (딥 그린) |

## 3. 에셋 목록 (동적 여부 포함)

| # | 에셋명 | 노드 | 타입 | 동적? | 처리 방식 | 목적지 |
|---|--------|------|------|-------|-----------|--------|
| 1 | heading icon 지구본 40×40 | 302:5070 | IMAGE PNG + cropTransform | No | **contest-about/heading-icon.png 재사용** (동일 imageRef `e0323828...`, 동일 suffix `273e38`) | `src/assets/contest-about/heading-icon.png` (기존 파일 import) |
| 2 | Card1 "실전 중심 프로젝트" 80×80 | 302:5090 | IMAGE PNG + crop | No | Framelink `download_figma_images` | `src/assets/contest-benefits/icon-1-project.png` |
| 3 | Card2 "네트워킹 기회" 80×80 | 302:5095 | IMAGE PNG + crop | No | Framelink | `src/assets/contest-benefits/icon-2-network.png` |
| 4 | Card3 "상금 및 시상" 80×80 | 302:5100 | IMAGE PNG + crop | No | Framelink | `src/assets/contest-benefits/icon-3-prize.png` |
| 5 | Card4 "사업화 지원" 80×80 | 302:5105 | IMAGE PNG + crop | No | Framelink | `src/assets/contest-benefits/icon-4-business.png` |
| 6 | Card5 "멘토링 제공" 80×80 | 302:5110 | IMAGE PNG + crop | No | Framelink | `src/assets/contest-benefits/icon-5-mentor.png` |
| 7 | Card6 "지역사회 연계" 80×80 | 302:6491 | IMAGE PNG + crop | No | Framelink | `src/assets/contest-benefits/icon-6-community.png` |
| 8 | CTA 배경 이미지 (도시 일러스트) | 302:6592 | IMAGE PNG + crop, isBackground:true | No | Framelink | `src/assets/contest-benefits/cta-bg.png` |
| 9 | HatchedDivider | 302:5072 | IMAGE-SVG | No | **기존 `@/components/ui/HatchedDivider` 재사용** (다운로드 불필요) | — |
| 10 | 버튼 arrow-right 24×24 | 302:6598 | IMAGE-SVG (vector primitives) | No | **인라인 SVG 재구성** (표준 → 화살표). 에셋 다운로드 생략 또는 lucide `ArrowRight` 사용 | (인라인) |

**imageRef 6개 카드 아이콘 (downloadFigmaImages 인자):**
```
Card1: imageRef=ee861b065d9f1a4426dced9c4511df03266d497a  suffix=297809  crop=[[0.9088,0,0.0456],[0,0.9088,0.0440]]
Card2: imageRef=3977f9d2778c4153475c29834bd81c015a708757  suffix=46909d  crop=[[0.8768,0,0.0616],[0,0.8768,0.0906]]
Card3: imageRef=1a2f471e4409cc52ef4f8b21473165e00f2c2c9f  suffix=cb5ad8  crop=[[0.4709,0,0.2645],[0,0.8626,0.1078]]
Card4: imageRef=77c7263b6ec993e447f8627cf4efa4c7ca0e9794  suffix=55c029  crop=[[0.4940,0.0066,0.2513],[-0.0121,0.9050,0.0203]]
Card5: imageRef=6553b3dc5ce0921fde8f78b7c02e85f72f41fced  suffix=3b44f2  crop=[[0.5000,0,0.2500],[0,0.9159,0.0658]]
Card6: imageRef=8e9ea7479ac67b2d60c1cdc779eded9edfe82ed0  suffix=675f27  crop=[[0.1987,0,0.7777],[0,0.9002,0.0343]]
CTA-BG: imageRef=83ba43ed8a18d434a6b11648086ee3ab88676cb5  suffix=5421ad  crop=[[0.7554,0,0.1938],[0,0.3400,0.1105]]
```

**캔버스-에셋 개수 검증:**
- IMAGE refs 캔버스상 8개 (heading 1 + 카드 6 + CTA bg 1)
- 다운로드 파일: heading 재사용(0) + 카드 6 + CTA bg 1 = **7개 신규**
- SVG refs: HatchedDivider 1 (재사용) + arrow icon 1 (인라인 재구성) → **0개 신규**
- 논리적 일치 OK (§2.5 baked-in 원칙: PNG 전부 다운로드, SVG는 재사용/재구성 허용)

**rotation/transform/blend 요소:** 없음. 소수점 회전값 대상 없음.

## 4. 추출 한글 텍스트 원문 (Framelink `text` 필드 실측)

| 위치 | 원문 |
|------|------|
| Heading (302:5071) | `ESG 실천 아이디어 경진대회의 특별한 혜택` |
| Card1 제목 (302:5091) | `실전 중심 프로젝트` |
| Card1 설명 (302:6495) | `이론이 아닌 실제 현장의 문제를 해결하는\L실전형 프로젝트로 진행됩니다.` |
| Card2 제목 (302:5096) | `네트워킹 기회` |
| Card2 설명 (302:6496) | `다양한 분야의 전문가, 기업, 기관과의\L네트워킹 기회를 제공합니다.` |
| Card3 제목 (302:5101) | `상금 및 시상` |
| Card3 설명 (302:6497) | `우수한 아이디어에는 상금과\L다양한 혜택을 제공합니다.` |
| Card4 제목 (302:5106) | `사업화 지원` |
| Card4 설명 (302:6498) | `수상작은 실제 사업화 및 프로젝트 실행을\L위한 지원을 받을 수 있습니다.` |
| Card5 제목 (302:5111) | `멘토링 제공` |
| Card5 설명 (302:6499) | `ESG 전문가의 1:1 맞춤형 멘토링으로\L아이디어를 구체화합니다.` |
| Card6 제목 (302:6492) | `지역사회 연계` |
| Card6 설명 (302:6500) | `지역사회와 연계하여 실질적인\L사회적 가치를 창출합니다.` |
| CTA 제목 (302:6594) | `지금 바로 신청하세요` |
| CTA 서브텍스트 (302:6615) | `아이디어에서 실천으로, ESG 실천 아이디어 경진대회에 참여하세요.` |
| 버튼 라벨 (302:6597) | `경진대회 참가하기` |

> `\L` = Line Separator (U+2028). `<br>` 로 치환. 좌우 분리 지점 정확히 2줄 구성.
> Card4 설명만 `사업화 및 프로젝트 실행을 / 위한 지원을 받을 수 있습니다.`로 라인 분할. 다른 카드는 "~는/과의/과/로 / ~" 형식 공통.

## 5. baseline 시각 확인 (Read)

`figma-screenshots/contest-benefits.png` — `file` 실측 **1416×969 RGBA non-interlaced**, spec 일치.

Read 렌더 시 배경이 어둡게 보이지만 **노드 자체 fill 없음** = transparent. `figma-screenshots/contest-full.png`에서 해당 구간은 **흰색 배경**으로 확인. Preview는 `bg-white`로 적용 필요.

육안 확인 내용:
- 상단: 지구본 아이콘 + 32B "ESG 실천 아이디어 경진대회의 특별한 혜택" + HatchedDivider
- 3×2 카드 그리드 — 각 카드 연회색 배경(#EFF0F0), rounded 20, 상단 80×80 녹색 일러스트 아이콘(카드별 다름), 가운데 18SB 제목, 하단 14M 2줄 설명(회색 #4A5565)
- 카드 내부 요소 **중앙 정렬** (justify-center items-center). 카드 전체 높이는 내용 hug이나 6개 모두 동일한 203px
- CTA Container: 딥 그린(#005C33) 배경 + 도시 실루엣 일러스트 오버레이, 흰색 32B "지금 바로 신청하세요", 그 아래 반투명 흰색 16R 서브텍스트, 아래 흰색 pill 버튼 "경진대회 참가하기 →" (텍스트 #0C3B0E 딥그린)

**육안 semantic 검증 후보 (§6.4 단계 5 대비):**
- 카드 6개 순서(좌→우, 위→아래): 실전 중심 → 네트워킹 → 상금 → 사업화 → 멘토링 → 지역사회
- 각 카드 아이콘이 제목과 매칭되는지 (swap 없음)
- 각 카드 제목 아래 설명이 2줄 줄바꿈 위치 정확
- CTA 배경에 도시 일러스트 baked 있음 (그린 단색 아님)
- 버튼 pill 완전 원형 (rounded 16777200 → `rounded-full`)
- 버튼 arrow-right 아이콘 우측에 있음 (방향 반전 금지)

## 6. Preview 라우트 & clip 계획

- 라우트: `/__preview/contest-benefits`
- 섹션 폭 1416 (부모 1920 가정 시 중앙정렬, 좌우 각 252 margin)
- **Preview 래퍼 `w-[1416px] mx-auto bg-white`** → 1920 viewport에서 x=252 중앙 정렬
- 캡처 viewport: **1920×969** (Preview 기본). baseline 1416×969 비교에 `--clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 969` **필수** (contact-form·contest-about 함정 재발 방지)
- baseline: `figma-screenshots/contest-benefits.png` (1416×969)

**측정 명령 예상:**
```
bash scripts/compare-section.sh contest-benefits --clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 969
```

## 7. 리스크

1. **HatchedSectionHeading 공통 승격 완료** — plan/contest-about §9 명시대로 이미 `src/components/ui/HatchedSectionHeading.tsx` 존재. Benefits에서는 **import 재사용** (첫 승격 후 첫 재사용 시점).
2. **BenefitCard 공통화 결정 필요 (plan §1)** — 이번 섹션 6회 사용. 자격검정 등 다른 페이지에서 유사 패턴 재등장 가능. 옵션 A (섹션 로컬 `ContestBenefits/BenefitCard.tsx`) vs 옵션 B (즉시 `src/components/ui/BenefitCard.tsx`). Rule of Three는 "섹션 내 6회"는 다른 페이지 확인 후 승격이 보수적. **plan 기본: 섹션 로컬, 타 페이지 확인 후 승격.**
3. **CTA 분리 여부 결정 필요 (plan §1)** — Figma 트리상 `302:6592`는 `302:6515`의 자식(Benefits 본문 래퍼 내부). 분리 섹션(3a)로 `<ContestCta />` 만들지, Benefits에 내장할지. **plan 기본: Benefits 내부 통합** (같은 플롯의 아토믹 빌드, 분리 시 props/styling 중복 비용). 사용자 지시 있으면 분리.
4. **CTA 배경 이미지 + #005C33 단색 레이어** — fill_9CB6V9는 [IMAGE, color] 복합. CSS로 `background-image: url()` + `background-color: #005C33`. 투명도 있는 PNG면 중첩 OK. 단색이 뒤(fallback)에 깔려야 함 (CSS는 나중 선언이 위, 즉 `background: #005C33 url() ...` 또는 stacking context 주의).
5. **Card 설명 `\L` (U+2028)** — JSX에 직접 U+2028 쓰면 lint/esbuild 경고 가능. `<br />` 치환 또는 `.split('\L')` 후 map. **plan에서 `<br />` 치환 결정.**
6. **버튼 Inter 폰트 (style_1C4U4S)** — 유일하게 Inter. 프로젝트 기본 폰트 Pretendard. 옵션 A: Inter 그대로 (fonts.css 추가 필요) / 옵션 B: Pretendard로 통일 (시각 미세 차이). baseline 육안으로는 구분 어려움. **plan 기본: Pretendard 통일** (기존 프로젝트 폰트 스택 + Inter loading 비용 회피). G1 5% 초과 시 Inter 도입 검토.
7. **아이콘 cropTransform 6종** — 각 카드마다 crop 파라미터 다름. Framelink `download_figma_images` 한 번 호출에 6개 nodes 배열로 처리. 파일명 suffix 각각 달라 파일명 충돌 없음.
8. **버튼 arrow-right (302:6598)** — `get_figma_data` 상 2개 내부 primitive (layout_8YFI04, layout_DVF0BC)로 구성된 SVG. 재구성하려면 정확한 geometry 필요. 간단히 **lucide-react `ArrowRight`(size 24)** 또는 **인라인 SVG (`M 5 12 H 19 M 13 6 L 19 12 L 13 18`)** 사용. **plan 기본: 인라인 SVG** (dependency 최소화).
9. **카드 내부 height 계산 검증** — 아이콘 80 + gap 16 + 제목 25.2 + gap 8 + 설명 42 + padding 16+16 = 203.2. hug 모드라 폰트 메트릭 편차로 미세 shift 가능. 6개 카드 높이가 동일해지는지 확인 (2행 2열 이상 불균형 시 grid 불일치 G1 악화).
10. **Preview clip 필수 (contact-form·contest-about 함정)** — 래퍼 `w-[1416px] mx-auto`는 1920 viewport 기준 중앙 정렬되어 x=252 오프셋 발생. clip 없이 측정 시 허수 diff 발생 (contest-about에서 5.23% → 3.01% 정상화 선례). **clip 파라미터 누락 금지.**

## 8. 신규 공통 컴포넌트 후보

| 후보 | 이번 섹션 | 다음 섹션 | Rule of Three 상태 | 결정 |
|------|----------|----------|---------------------|------|
| `HatchedSectionHeading` | ○ 재사용 (첫 공통 재사용) | 기타 섹션 후보 | 2/3 (contest-about + contest-benefits) | 재사용 — prop 변경 없음 |
| `BenefitCard` (304×203, 80px 아이콘 + 18SB 제목 + 14M 2줄 설명) | ○ 6회 | 자격검정/메인 등 재등장 가능 | 1/3 (단일 섹션 내 6회) | **plan §1**에서 로컬 vs 승격 결정. 기본: 섹션 로컬 |
| `CtaBanner` (배경이미지 + 32B 제목 + 16R 서브 + pill 버튼) | ○ 1회 | 메인/자격검정 재등장 가능 | 1/3 | 섹션 내장(통합) 기본. 재등장 시 승격 |

## 9. 단계 1 통과 조건 체크

- [x] baseline PNG 존재 + `file` 실측 (1416×969, RGBA)
- [x] 노드 트리 확보 (flatten 아님 확정, CTA Container 자식 살아있음 확정)
- [x] 모든 한글 텍스트 원문 추출 (카드 6+ CTA 3 = 16개 문자열)
- [x] 폰트·색상·letterSpacing 모두 variable에서 획득
- [x] 에셋 목록 + 동적 여부 컬럼 (전 에셋 No-dynamic)
- [x] 캔버스-에셋 개수 검증 (PNG 8→7 신규, SVG 2→0 신규)
- [x] rotation/transform/blend 요소 없음 확정
- [x] baseline 육안 semantic 포인트 기록
- [x] Preview route / clip 계획 (clip 필수)
- [x] 신규 공통 컴포넌트 후보 정리 (plan에서 결정할 항목 표시)
- [x] 리스크 10개 기록
