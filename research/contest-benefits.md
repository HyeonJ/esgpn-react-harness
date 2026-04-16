# research/contest-benefits.md — 경진대회 Benefits 섹션 (v4)

> Phase 3 단계 1. 페이지 `/contest` 세 번째 섹션 (Node `302:5067`).
> 상위 페이지 research: `research/contest.md` §3·§5.
> **v4 기준**: 구조 중심. G5~G8 차단, G1 참고. `docs/redefine/philosophy.md` "편집 가능한 고충실도".
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
│  │  │  filenameSuffix "273e38"   ※ contest-about과 동일 imageRef — 에셋 재사용
│  │  │
│  │  └─ 302:5071 TEXT "ESG 실천 아이디어 경진대회의 특별한 혜택"
│  │     Text-3xl/32B: Pretendard Bold 32 / 1.3em / -3% / LEFT
│  │     fill_5CFO88 = #0A0A0A
│  │
│  └─ 302:5072 Frame 2043685981  IMAGE-SVG (HatchedDivider 재사용)
│
└─ 302:6515 Frame 2043686168 (Body 래퍼)
   layout_JHODBY: column, gap 12, fill×hug
   │
   ├─ 302:5088 Frame 2043686042 (6카드 그리드)
   │  layout_5MDMJZ: row wrap, gap 12, fill×hug
   │  │
   │  ├─ 302:5089 Card-1 "실전 중심 프로젝트"
   │  ├─ 302:5094 Card-2 "네트워킹 기회"
   │  ├─ 302:5099 Card-3 "상금 및 시상"
   │  ├─ 302:5104 Card-4 "사업화 지원"
   │  ├─ 302:5109 Card-5 "멘토링 제공"
   │  └─ 302:6490 Card-6 "지역사회 연계"
   │
   │  각 카드 공통 구조 (layout_1YD3UK):
   │     column, justify-center, items-center, gap 16, padding 16
   │     sizing: fixed w=304, hug h (자식 기반 ≈203)
   │     fill_65STE1 = #EFF0F0 (gray-100 토큰 매칭)
   │     borderRadius 20 (radius-3xl 토큰 매칭)
   │  └─ Rectangle 24  80×80 IMAGE (아이콘, imageRef 각각 다름)
   │  └─ Frame (layout_BGOLAZ: column gap 8 fill)
   │     ├─ TEXT 제목 (Text-lg/18SB)
   │     └─ TEXT 설명 (Text-sm/14M) — `\L` = U+2028 = <br>
   │
   └─ 302:6592 Container (CTA, 936×320 FIXED)
      layout_RADHZN: column, justify-center, items-center, gap 32, padding 64 0
      fill_9CB6V9 = [IMAGE(imageRef 83ba43ed..., isBackground:true, cropTransform),
                     '#005C33']
      borderRadius 20
      │
      ├─ 302:6593 Frame 2043686105 (텍스트 블록, column items-center gap 12, fixed w=454)
      │  ├─ 302:6594 TEXT "지금 바로 신청하세요" / Text-3xl/32B / #FFFFFF
      │  └─ 302:6615 TEXT "아이디어에서 실천으로, ESG 실천 아이디어 경진대회에 참여하세요."
      │     Text-base/16R / rgba(255,255,255,0.6)
      │
      └─ 302:6596 Button (Frame)
         layout_D89GFQ: row items-center gap 8, padding 20 32, hug
         fill_ZCLBAZ = #FFFFFF
         effect_7H3OG2: boxShadow 0px 25px 50px -12px rgba(0,0,0,0.25)
         borderRadius 16777200  → `rounded-full` pill
         │
         ├─ 302:6597 TEXT "경진대회 참가하기" / Inter 700 18 / 1.5556em / -2.44140625% / #0C3B0E
         │  ※ plan: Pretendard 통일 (font-bold, brand-700 토큰)
         │
         └─ 302:6598 Icon (IMAGE-SVG, 24×24 arrow-right) — 인라인 SVG
```

**치수 교차검증:**
- root padding 64 240 → content 폭 1416 − 480 = **936** OK
- heading block: 32B×1.3 (41.6) + gap 21 + divider 8 = **70~71** (spec 71)
- card 304×(16+80+16+text≈75+16) ≈ 203 (spec)
- card row: 304×3 + gap 12×2 = **936** ✓
- 2행 카드 래퍼: 203×2 + gap 12 = **418** ✓
- 카드+CTA gap 12: 418 + 12 + 320 = **750** ✓
- 총 섹션 h: padding 64 + heading 71 + gap 20 + body 750 + padding 64 = **969** ✓

## 2. 폰트·색상·토큰 매핑 (v4 핵심)

| style | family | weight | size | lineHeight | letterSpacing | 사용처 | 토큰 가능 |
|-------|--------|--------|------|------------|---------------|--------|-----------|
| Text-3xl/32B | Pretendard | 700 | 32 | 1.3em | -3% (-0.96px) | Heading + CTA 제목 | — (inline) |
| Text-lg/18SB | Pretendard | 600 | 18 | 1.4em | -1.5% (-0.27px) | 카드 제목 6개 | — |
| Text-sm/14M | Pretendard | 500 | 14 | 1.5em | -0.5% (-0.07px) | 카드 설명 6개 | — |
| Text-base/16R | Pretendard | 400 | 16 | 1.5em | -1% (-0.16px) | CTA 서브텍스트 | — |
| style_1C4U4S | Inter→Pretendard | 700 | 18 | 1.556em | -2.44140625% (-0.4395px) | 버튼 | — |

### 색상 → 토큰 매핑 (v4 G4 차단 기준)

| Figma hex | 용도 | 토큰 |
|-----------|------|------|
| `#0A0A0A` | Heading + 카드 제목 | **near-black raw** (토큰 없음, contest-about 선례) |
| `#EFF0F0` | 카드 배경 | **`bg-gray-100`** (토큰 매칭) |
| `#4A5565` | 카드 설명 | **raw** (gray-700=#5d6a66 불일치. -0.5% 차이로 raw 유지) |
| `#FFFFFF` | CTA 제목 + 버튼 배경 | **`text-white` / `bg-white`** (기본 Tailwind) |
| `rgba(255,255,255,0.6)` | CTA 서브텍스트 | **`text-white/60`** (Tailwind opacity) |
| `#005C33` | CTA 배경 딥그린 | **`bg-[var(--color-status-badge-positive-700)]`** (토큰 매칭!) |
| `#0C3B0E` | 버튼 텍스트 | **`text-[var(--color-brand-700)]`** (토큰 매칭!) |

→ **token_ratio 기여**: 7개 색상 중 5개 토큰 사용 (71%). near-black/설명색만 raw.

## 3. 에셋 목록 (동적 여부 포함)

| # | 에셋명 | 노드 | 타입 | 동적? | 처리 방식 | 목적지 |
|---|--------|------|------|-------|-----------|--------|
| 1 | heading icon 지구본 40×40 | 302:5070 | IMAGE PNG + crop | No | **contest-about/heading-icon.png 재사용** | — (import 재사용) |
| 2 | Card1 "실전 중심 프로젝트" 80×80 | 302:5090 | IMAGE PNG + crop | No | Framelink | `src/assets/contest-benefits/icon-1-project.png` |
| 3 | Card2 "네트워킹 기회" 80×80 | 302:5095 | IMAGE PNG + crop | No | Framelink | `src/assets/contest-benefits/icon-2-network.png` |
| 4 | Card3 "상금 및 시상" 80×80 | 302:5100 | IMAGE PNG + crop | No | Framelink | `src/assets/contest-benefits/icon-3-prize.png` |
| 5 | Card4 "사업화 지원" 80×80 | 302:5105 | IMAGE PNG + crop | No | Framelink | `src/assets/contest-benefits/icon-4-business.png` |
| 6 | Card5 "멘토링 제공" 80×80 | 302:5110 | IMAGE PNG + crop | No | Framelink | `src/assets/contest-benefits/icon-5-mentor.png` |
| 7 | Card6 "지역사회 연계" 80×80 | 302:6491 | IMAGE PNG + crop | No | Framelink | `src/assets/contest-benefits/icon-6-community.png` |
| 8 | CTA 배경 이미지 (도시 일러스트) | 302:6592 | IMAGE PNG + crop | No | Framelink | `src/assets/contest-benefits/cta-bg.png` |
| 9 | HatchedDivider | 302:5072 | IMAGE-SVG | No | **기존 `@/components/ui/HatchedDivider` 재사용** | — |
| 10 | 버튼 arrow-right 24×24 | 302:6598 | IMAGE-SVG | No | **인라인 SVG 재구성** | (인라인) |

**imageRef 6개 카드 아이콘 + CTA 배경 (downloadFigmaImages 인자):**
```
Card1: imageRef=ee861b065d9f1a4426dced9c4511df03266d497a  suffix=297809
       crop=[[0.9088,0,0.0456],[0,0.9088,0.0440]]
Card2: imageRef=3977f9d2778c4153475c29834bd81c015a708757  suffix=46909d
       crop=[[0.8768,0,0.0616],[0,0.8768,0.0906]]
Card3: imageRef=1a2f471e4409cc52ef4f8b21473165e00f2c2c9f  suffix=cb5ad8
       crop=[[0.4709,0,0.2645],[0,0.8626,0.1078]]
Card4: imageRef=77c7263b6ec993e447f8627cf4efa4c7ca0e9794  suffix=55c029
       crop=[[0.4940,0.0066,0.2513],[-0.0121,0.9050,0.0203]]
Card5: imageRef=6553b3dc5ce0921fde8f78b7c02e85f72f41fced  suffix=3b44f2
       crop=[[0.5000,0,0.2500],[0,0.9159,0.0658]]
Card6: imageRef=8e9ea7479ac67b2d60c1cdc779eded9edfe82ed0  suffix=675f27
       crop=[[0.1987,0,0.7777],[0,0.9002,0.0343]]
CTA-BG: imageRef=83ba43ed8a18d434a6b11648086ee3ab88676cb5  suffix=5421ad
        crop=[[0.7554,0,0.1938],[0,0.3400,0.1105]]
```

**캔버스-에셋 개수 검증:**
- IMAGE refs 캔버스상 8개 (heading 1 + 카드 6 + CTA bg 1)
- 다운로드: heading 재사용(0) + 카드 6 + CTA bg 1 = **7개 신규**
- SVG refs: HatchedDivider 1 재사용 + arrow icon 1 인라인 → 0개 신규
- 일치 OK

**rotation/transform/blend 요소:** 없음 (CTA 배경은 Figma 자체 블렌드인데, CSS 재현 시 `mix-blend-mode` 대신 `#005C33` 색상 위에 이미지 깔고 `opacity` 조정)

## 4. 추출 한글 텍스트 원문

| 위치 | 원문 |
|------|------|
| Heading | `ESG 실천 아이디어 경진대회의 특별한 혜택` |
| Card1 제목 | `실전 중심 프로젝트` |
| Card1 설명 | `이론이 아닌 실제 현장의 문제를 해결하는\L실전형 프로젝트로 진행됩니다.` |
| Card2 제목 | `네트워킹 기회` |
| Card2 설명 | `다양한 분야의 전문가, 기업, 기관과의\L네트워킹 기회를 제공합니다.` |
| Card3 제목 | `상금 및 시상` |
| Card3 설명 | `우수한 아이디어에는 상금과\L다양한 혜택을 제공합니다.` |
| Card4 제목 | `사업화 지원` |
| Card4 설명 | `수상작은 실제 사업화 및 프로젝트 실행을\L위한 지원을 받을 수 있습니다.` |
| Card5 제목 | `멘토링 제공` |
| Card5 설명 | `ESG 전문가의 1:1 맞춤형 멘토링으로\L아이디어를 구체화합니다.` |
| Card6 제목 | `지역사회 연계` |
| Card6 설명 | `지역사회와 연계하여 실질적인\L사회적 가치를 창출합니다.` |
| CTA 제목 | `지금 바로 신청하세요` |
| CTA 서브텍스트 | `아이디어에서 실천으로, ESG 실천 아이디어 경진대회에 참여하세요.` |
| 버튼 라벨 | `경진대회 참가하기` |

> `\L` = U+2028 → **`<br />` 치환** (JSX 튜플 `[string, string]` 방식, §5 plan)

## 5. baseline 시각 확인 (Read)

`figma-screenshots/contest-benefits.png` — `file` 실측 **1416×969 RGBA**, spec 일치.

육안 확인 내용:
- 상단: 지구본 아이콘 + 32B "ESG 실천 아이디어 경진대회의 특별한 혜택" + HatchedDivider
- 3×2 카드 그리드 — 각 카드 연회색 배경(#EFF0F0), rounded 20, 상단 80×80 녹색 일러스트 아이콘, 가운데 18SB 제목, 하단 14M 2줄 설명(회색 #4A5565)
- CTA Container: 딥 그린(#005C33) 배경 + 도시 실루엣 일러스트 오버레이 (톤온톤 녹색), 흰색 32B 제목, 반투명 흰색 16R 서브텍스트, 흰색 pill 버튼 "경진대회 참가하기 →"

육안 semantic 검증 후보 (§6.4 단계 5 대비):
- 카드 6개 순서: 실전 → 네트워킹 → 상금 → 사업화 → 멘토링 → 지역사회
- 카드 아이콘-제목 매칭
- 카드 설명 2줄 줄바꿈 위치
- CTA 배경 녹색 톤 + 도시 실루엣
- 버튼 pill, arrow 우측

## 6. v4 구조 설계 — 시맨틱 HTML 트리

```
<section aria-labelledby="contest-benefits-title"
         className="mx-auto flex w-full max-w-[1416px] flex-col gap-5 px-[240px] py-[64px]">
  <HeadingWithIcon title=... />   (공통 승격 → ui/HatchedSectionHeading.tsx)
  <div className="flex flex-col gap-3">
    <ul className="flex flex-wrap gap-3">  ← G5: ul/li 시맨틱
      {BENEFITS.map(b => (
        <li>
          <article className="flex w-[304px] flex-col ...">
            <img /> <h3 /> <p />
          </article>
        </li>
      ))}
    </ul>
    <aside className="rounded-[20px] bg-[var(--color-status-badge-positive-700)] ...">
      <h3 /> <p /> <Link>경진대회 참가하기 ...</Link>
    </aside>
  </div>
</section>
```

**G5 시맨틱 판단:**
- `section` + `h2` (heading) + `ul/li` + `article` + `h3` + `aside` + `Link`(Router)
- 카드 내부 제목 18SB는 **`h3`** (섹션 h2 하위). CTA 제목도 `h3`.
- CTA는 섹션 본문 보조 정보 → **`aside`** 시맨틱 (링크 호출이라 `section`+`role="complementary"`도 가능, aside 채택)
- 에셋 이미지 alt="" (장식) + aria-hidden

**G6/G8:**
- 모든 텍스트 JSX literal (한글). i18n 가능.
- raster 0 — 카드 아이콘/CTA 배경은 일러스트, **텍스트 baked-in 없음**. 헤딩 지구본도 순수 지구본 이미지.

**G2/G4 기준:**
- 폰트 ±2px, 나머지 ±4px
- 토큰 적극 사용: gray-100, brand-700, status-badge-positive-700, white

## 7. Preview 라우트 & clip 계획

- 라우트: `/__preview/contest-benefits`
- 섹션 자기정렬: `mx-auto max-w-[1416px] w-full`
- Preview 래퍼 `w-full bg-white` (섹션이 자체 중앙정렬)
- 캡처 viewport: 1920×969 (compare-section 기본)
- baseline 1416×969 비교에 **`--clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 969` 필수**

## 8. 신규 공통 컴포넌트 승격 결정

### 8.1 `HatchedSectionHeading` → **지금 승격** (Rule of Three 2/3이지만 contest-about 구현에서 "Benefits 구현 시 승격" 명시)
- 현재 `sections/ContestAbout/HeadingWithIcon.tsx` 로컬.
- Benefits에서 재사용 → `src/components/ui/HatchedSectionHeading.tsx`로 이동.
- API: `{ iconSrc, iconAlt, title, titleId }` (그대로).
- ContestAbout 기존 import path 갱신.

### 8.2 `BenefitCard` → **로컬 유지** (Rule of Three 1/3, 섹션 내 6회)
- `sections/ContestBenefits/BenefitCard.tsx` 로컬.
- 자격검정·메인 재등장 확인 후 승격.

### 8.3 `CtaBanner` → **로컬 유지** (1/3)
- `sections/ContestBenefits/CtaBanner.tsx` 로컬.

## 9. v4 구조 지표 예상

| 지표 | 예상 | 목표 |
|------|------|------|
| token_ratio | ≥ 0.40 | ≥ 0.2 |
| semantic_score | 4+ (section, ul/li, article, aside, h2/h3) | ≥ 2 |
| absolute/file | 0 (flex 전용) | ≤ 5 |

## 10. 리스크 (v4 관점)

1. **CTA 배경 블렌드 재현** (v3 회귀 분석 §3회차) — Framelink PNG가 이미 녹색 톤 합성된 상태인지, 원본 도시 일러스트인지 확인 필요. 받은 뒤 Read로 육안 검증. 녹색 톤이면 바로 사용, 원색이면 CSS overlay 또는 `mix-blend-mode: multiply` 적용
2. **카드 설명 `\L`** — 튜플 `[string, string]` + `<br />` 치환 (esbuild 안전)
3. **버튼 Inter → Pretendard 통일** — 시각 차이 <0.1% 예상
4. **아이콘 cropTransform 6종** — needsCropping/cropTransform은 Framelink가 처리
5. **heading 아이콘 재사용** — contest-about/heading-icon.png 존재 확인 필요. 없으면 다운로드
6. **공통 승격 이름 결정** — `HatchedSectionHeading` vs `HeadingWithIcon`. 현재 이름 `HeadingWithIcon` 유지 결정 (파일명만 `ui/` 하위로 이동. API 변경 없음). 전환 비용 최소화

## 11. 단계 1 통과 조건 체크

- [x] baseline PNG 1416×969 실측 OK
- [x] 노드 트리 flatten 아님 확정
- [x] 한글 텍스트 16개 추출
- [x] 폰트·색상·letterSpacing 확보 + 토큰 매핑표 작성
- [x] 에셋 목록 8개 (7 신규 + 1 재사용) + 동적 여부 (모두 No)
- [x] 캔버스-에셋 개수 검증 (8 IMAGE → 7 신규 + 1 재사용)
- [x] rotation/transform/blend 요소 없음
- [x] baseline 육안 semantic 포인트 기록
- [x] Preview route + clip 계획 (필수)
- [x] 신규 공통 컴포넌트 승격 결정 (HeadingWithIcon → ui/)
- [x] v4 구조 지표 예상 (token_ratio 0.40+, abs 0, sem 4+)
- [x] 리스크 6개 기록
