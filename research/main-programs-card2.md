# main-programs-card2 — 리서치

- Figma 노드: `252:1066` (Group 14, 메인페이지 `#6` 섹션)
- 사이즈: **1416×805** (풀폭 아님, 중앙정렬 — 페이지 x=252에서 시작)
- 페이지 캔버스 좌표: **(252, 4494)** @ 1920 × 10077
- 섹션 내부 좌표계: Figma metadata 기준 (0, 945)~(1416, 1750). 구현은 (0,0) 기준으로 변환.
- baseline: `figma-screenshots/main-programs-card2.png` — **실측 1405×805** (`file` 명령)
  - card1이 1404, card2가 1405 → Framelink pngScale 1 내부 트림 차이. clip-x 보정 필요 (단계 5에서 스윕).
- 연관 페이지 리서치: `research/메인페이지.md` `#6` 행

---

## 1. 상위 구조 개요 (get_metadata)

metadata는 y좌표가 page-absolute(945 기준)라서 섹션 내부 좌표는 y-945로 변환.

```
<frame 252:1066 name="Group 14" x=0 y=0 width=1416 height=805>     ← 섹션 내부 좌표 (변환됨)
  <rounded-rect 252:1067 "Rectangle 18" x=0     y=282.68 w=530.209 h=578.029>  ← 좌측 city (AABB, -16deg 회전)
  <image-svg   252:1068 "Rectangle 23" x=948    y=454    w=315     h=351>       ← 우측 중간 city 타일
  <frame       252:1069 "Frame 12"     x=400    y=0      w=616     h=732>       ← 네이비 그린 카드 outer
    <frame 252:1070 "..."  x=8 y=8   w=600 h=620>                                ← 흰 inner
      <frame 252:1071 "..." x=40 y=40  w=520 h=159>                              ← 타이틀 블록 (progress+h1+체크리스트2)
      <frame 252:1088 "..." x=40 y=247 w=253 h=104>                              ← 3 포인트 행 (blue check icon + 텍스트)
      <frame 252:1104 "..." x=40 y=399 w=520 h=109>                              ← 주요 대상 섹션 (label + ul 3개)
    <frame 252:1110 "Frame 12" x=8  y=640  w=600 h=0>                            ← dashed divider (blue)
    <frame 252:1112 "Frame 12" x=8  y=652  w=600 h=64>                           ← 하늘 블루 CTA
  <image-svg   252:1118 "Rectangle 22" x=1231 y=218 w=185 h=193>                 ← 우측 상단 city 타일 (작은)
</frame>
```

- **카드 위치**: 카드1과 **동일** x=400~1016 (절대 미러 아님). 좌우 부유 장식의 **배치 방향**만 다름.
- **좌측 부유 city(530×578)** 가 **카드 좌측**에 있음 (card1은 우측 city였으므로 floating decoration만 좌우 스왑, 카드 자체는 동일 x).
- **우측 부유 2개** (`252:1068` 315×351 x=948 y=454, `252:1118` 185×193 x=1231 y=218) — card1의 좌측 leaf 2개 자리에 우측 city 타일 2개 배치.
- **구조 mirror 요약**: 카드 고정, 부유 요소가 "큰1 + 작은2" 배치만 좌우 스왑. card1(우큰+좌소2) ↔ card2(좌큰+우소2).

---

## 2. 카드1과의 구조 비교

| 항목 | card1 (Green 자격검정) | card2 (Blue 경진대회) | 차이 |
|------|------------------------|-------------------------|-----|
| 카드 outer 배경 | `#0c3b0e` (brand-700, 진녹) | **`#0C173B`** (navy) | ✅ 색만 다름 |
| 카드 inner 배경 | white | white | 동일 |
| 카드 크기 / 위치 | 616×732 @ x=400 y=0 | 616×732 @ x=400 y=0 | **동일** |
| 카드 내부 spacing/padding | 40px, gap 48/16/12, 48px radius | 동일 | **동일** |
| progress bar | leaf icon + green 점선 | leaf icon + **blue** 점선 (아이콘 동일해 보임) | 색만 다름 |
| 타이틀 | "ESG마인드 자격검정" | "ESG 실천 아이디어 경진대회" | 텍스트만 다름 |
| 체크리스트 bullet | `#4fb654` green vertical bar | **`#3F9FFF`** blue vertical bar | 색만 다름 |
| 체크리스트 2줄 | "ESG를 알고..." / "ESG 실천을 위한..." | "ESG를 아이디어 → 실행..." / "ESG 실천을 위한 기관의 역할..." | 텍스트만 다름 |
| 3 포인트 행 | 3개 (녹색 체크 필드 → 스트로크 체크) | **3개** (모두 blue 스트로크 체크) — 내용: SDGs/대학·청년/대회로 끝나지 않고 | 아이콘 모두 동일 파일 |
| "필수 역량" → **"주요 대상"** | 라벨 "필수 역량", 6개 ul, bullet `#4fb654` | 라벨 "주요 대상", **3개 ul**, bullet **`#2D7EFF`** | 텍스트 + 개수 + 색 다름 |
| dashed divider | `#CAEB69` (연두) dashed | **blue** dashed (색상 변수 없음 — 실물은 raw hex, SVG 파일 확인) | 색만 다름 |
| CTA bar bg | `#caeb69` | **`#A5D9FF`** (하늘 파랑) | 색만 다름 |
| CTA text | `#0c3b0e` (진녹 = outer bg 재사용) | **`#0C173B`** (navy = outer bg 재사용) | 색만 다름 |
| CTA chevron | 3겹 32×32, 같은 화살표 | 동일 SVG | 동일 |
| 좌/우 부유 decoration | 우측 city 1 + 좌측 leaf 2 | **좌측** city 1(큰) + **우측** city 타일 2(중·소) | 배치 미러, 이미지 콘텐츠도 다름 (leaf → city 타일) |
| 큰 부유 회전 각도 | city-right 회전 없음 (직립) | **city-left `-16deg`** (baked-in) | card2가 회전 baked-in |
| 작은 부유 회전 | leaf-bottom `-24`, leaf-top `-12` (baked-in) | city-mid 직립(0°), city-top 직립(0°) | card1만 회전 |

**결론**: 카드 본체 스타일은 거의 **테마 컬러 토큰만 치환**해서 재구성 가능 — Rule of Three에 한 걸음 근접. 하지만 아직 card3 미확인 → **card1/card2는 로컬 구현** 유지, card3 리서치 시점에 ProgramCard 공통 컴포넌트 승격.

---

## 3. 디자인 토큰 (get_variable_defs)

| 변수 | 값 | 용도 |
|------|-----|------|
| Status/Positive_Default | `#3F9FFF` | 체크리스트 2줄 bullet (card2에서 새로 등장) |
| Gray Scale/Gray 900 | `#1d2623` | 텍스트 |
| Gray Scale/Gray 000 | `#ffffff` | 카드 inner 배경 |
| Text-base/16M | Pretendard Medium 16, lh 1.5, ls -1% (−0.16px) | 체크리스트·3포인트·ul 본문 |
| Text-base/16R | Pretendard Regular 16, lh 1.5, ls -1% (−0.16px) | ul 주요 대상 항목 |
| Text-lg/18SB | Pretendard SemiBold 18, lh 1.4, ls -1.5% (−0.27px) | "주요 대상" 헤더 |
| Text-xl/20B | Pretendard Bold 20, lh 1.4, ls -2% (−0.4px) | "자세히 보기" CTA |
| 타이틀 style_KOJQ1X | Pretendard Bold 36, lh 1.3, ls -3% (−1.08px) | "ESG 실천 아이디어 경진대회" |
| spacing/0/1/2/3/4/6/12 | 0/4/8/12/16/24/48 | 간격/패딩 |

**토큰에 없는 raw hex (card2 고유):**
- `#0C173B` — 카드 outer bg & CTA 텍스트 (**navy 700 상당**. Tailwind/theme에 없음, raw hex 유지)
- `#A5D9FF` — CTA bg (**sky blue 200 상당**. raw hex)
- `#2D7EFF` — "주요 대상" bullet, 3포인트 아이콘 색 (**blue 500 상당**. raw hex)

**신규 `@theme` 토큰 필요?** — card1이 `#caeb69`를 raw로 두고 card3 시점에 평가했던 것과 동일 방침: **card2도 raw hex 3종으로 구현**. card3 시점에 토큰 승격 여부 재평가.

### 정밀 수치 주의 (§2.4)
- 타이틀 letter-spacing: −3% ⇒ 36×−0.03 = **−1.08px**
- 18SB: −1.5% ⇒ 18×−0.015 = **−0.27px**
- 20B: −2% ⇒ 20×−0.02 = **−0.4px**
- 16M/R: −1% ⇒ 16×−0.01 = **−0.16px**
- Rectangle 18 위치: `x=0 y=168.81` (design_context) — AABB 530.209×578.029, 내부 회전 -16deg 후 rendered 413.117×482.864 (native PNG 1015×1111/2 = **507.5×555.5** 와는 근접, Figma 내부 계산과 PNG export가 살짝 달라 단계 5에서 측정 조정)
- Rectangle 23 위치: `x=948 y=454` — 315×351 직립
- Rectangle 22 위치: `x=1231 y=218` — 185×193 직립

---

## 4. 에셋 목록

### 4.1 캔버스-에셋 개수 검증

| # | 유형 | 노드 ID | 치수 (Figma AABB) | 파일 | native PNG | 동적? | 처리 방식 |
|---|------|---------|-------------------|------|------------|-------|----------|
| 1 | 이미지 (좌측 큰 city) | `252:1067` | 530.209×578.029 (AABB) / 413.117×482.864 (회전 inner) | `city-left-rendered.png` | 1015×1111 @2x = 507.5×555.5 | **정적** | Framelink PNG 다운로드 완료. **회전 baked-in** (-16deg 이미 렌더). **CSS rotate 금지** (card1 leaf 교훈). wrapper=AABB + inner=native 패턴. 1015×1111 native ≈ AABB(530×578) → **직접 배치** 가능할지 단계 5에서 확인 |
| 2 | 이미지 (우측 중간 city) | `252:1068` | 315×351 | `city-mid-right-rendered.png` | 630×702 @2x = **315×351** (AABB와 정확 일치) | **정적** | Framelink가 AABB 그대로 export. 회전 없음. absolute left-948 top-454 w-315 h-351. `<img>` src 1장 |
| 3 | 이미지 (우측 상단 작은 city) | `252:1118` | 185×193 | `city-top-right-rendered.png` | 370×386 @2x = **185×193** (정확 일치) | **정적** | AABB 그대로. 회전 없음. absolute left-1231 top-218 w-185 h-193 |
| 4 | SVG (progress bar) | `252:1072` / children | 520×20 | `progress-bar.svg` | — | 정적 | blue 라인 + blue leaf/drop icon + end dot. 단일 SVG |
| 5 | SVG (check icon, 공용) | `252:1090` / `252:1095` / `252:1100` | 20×20 | `icon-point.svg` | — | 정적 | point 1은 clip id만 다르고 path 동일 **이전제**(§4.3 확인). 1개 파일로 3개 인스턴스 렌더 |
| 6 | SVG (dashed divider) | `252:1110` | 600×2 | `divider-dashed.svg` | — | 정적 | blue dashed (원본 SVG 확인 필요). stroke color는 파일 내장 |
| 7 | SVG (chevron arrow) | `I252:1115;11:10988` | 32×32 | `arrow-chevron.svg` | — | 정적 | card1과 동일 컴포넌트 인스턴스. 3개 렌더 (노드 252:1115/1116/1117, 동일 SVG 참조) |

**총 에셋: 7개 (PNG 3 + SVG 4)**. 텍스트/배경색은 별도 자산 없음.

### 4.2 동적 에셋 검증
- `get_figma_data` fills 확인: `fill_L6XE02` / `fill_RN97CU` / `fill_GE03K7` 전부 `type: IMAGE`, `scaleMode: STRETCH|FILL`. **gifRef 필드 없음**. 동적 에셋 **0개**.
- `dynamic-asset-handling` 스킬 불필요.

### 4.3 아이콘 중복 실증
- `raw/icon-point-1.svg` vs `icon-point-2.svg` vs `icon-point-3.svg` 파일 비교:
  - point-2와 point-3: **클립 id만 다르고 path 동일** (diff 2줄). 시각 동일.
  - point-1은 path 좌표가 살짝 다름(circle center `10.3333, 9.8333` vs `10.0, 10.0`) — **시각 차이 육안 구분 불가** (픽셀 수준 1~2 diff).
- 단계 4 구현 시 **1개 파일 (`icon-point.svg` = point-2 복사본)로 통합**. 단계 5 G1에서 차이가 보이면 point-1만 별도 복원.

### 4.4 캔버스-에셋 개수 일치 검증
- baseline 육안 렌더: city-left 1 + city-mid-right 1 + city-top-right 1 + progress 1 + 3포인트 아이콘 3개 + divider 1 + 화살표 3개 = **11 visual element**
- 다운로드 파일: 7개 (아이콘 공유 3→1, 화살표 공유 3→1 포함)
- 렌더 수 = 11, 파일 수 = 7, **공유 후 일치 ✅**.

### 4.5 Framelink SVG 규칙 준수
- SVG 4종 전부 `width`/`height` attribute 존재, display-ready. `<img>` 사용 시 scaleY/scaleX 금지.
- 단계 4 배치 시 PNG size attribute 정확히 지정.

---

## 5. transform 요소 목록 (정밀 수치)

| 요소 | 노드 | 회전 | 원본/AABB | Figma 위치 (섹션 내부) | CSS 배치 전략 |
|------|------|------|----------|----------------------|--------------|
| 좌측 큰 city | `252:1067` | **baked-in −16deg** | inner 413.117×482.864 / AABB 530.209×578.029 / native PNG 1015×1111 @2x = 507.5×555.5 | design_context `left-0 top-[168.81]` (AABB wrapper) | **card1 패턴 따름**: wrapper `absolute left-0 top-[168.81px] w-[530.209px] h-[578.029px] flex items-center justify-center` → inner=PNG native `<img>` w=507.5 h=555.5. CSS rotate **없음** (baked-in). native가 AABB보다 작아서 AABB 중앙 배치. 단계 5에서 native 사이즈 미세조정 |
| 우측 중간 city | `252:1068` | 없음 | 315×351 | x=948, y=454 | 단순 `absolute left-[948px] top-[454px] w-[315px] h-[351px]` `<img>` |
| 우측 상단 작은 city | `252:1118` | 없음 | 185×193 | x=1231, y=218 | 단순 `absolute left-[1231px] top-[218px] w-[185px] h-[193px]` `<img>` |
| CTA 화살표 (3개 겹침) | `252:1115/1116/1117` | inner `rotate-90` (card1과 동일) | 20×32 → 32×32 | 64×32 container, `gap=-16` | card1 방식 그대로 복제. SVG 파일도 동일 (design_context `rotate-90` 유지) |

**반올림 금지 확인**:
- rotation: card1 leaf와 달리 **card2 큰 city는 CSS rotation 없음** (baked-in)
- position: `168.81`, `454`, `218`, `948`, `1231` — 정수/소수 그대로
- dimensions: `530.209`, `578.029`, `413.117`, `482.864` — 소수점 유지

---

## 6. 카드 내부 구조 상세

### 6.1 outer navy card (`252:1069`)
- `bg-[#0C173B]` rounded-[48px] padding `pt-[8px] pb-[16px] px-[8px]`
- flex-col gap-12 (`12px`)
- width: hug → **616px**, height: **732px** (고정)
- 내부: white inner 카드 + dashed divider + 하늘색 CTA 3단 수직 스택

### 6.2 inner white card (`252:1070`)
- `bg-white` rounded-[48px] padding `p-[40px]`
- w=600px 고정, h=620px (hug, flex-fill)
- flex-col gap-48 (spacing/12)
- 3개 자식 수직 스택:
  1. **타이틀+체크리스트 블록 (252:1071)** h=159 — flex-col gap-16 w=520
     - progress bar row (252:1072) h=20 — flex row gap=4
       - start icon 20×20 (252:1073) — blue drop/leaf 모양 아이콘
       - 점선 flex-1 (252:1075) — blue dasharray
       - end dot 6×6 (252:1077)
       - → **SVG `progress-bar.svg` 하나로 통합**. `<img w=520 h=20>`
     - h1 "ESG 실천 아이디어 경진대회" 36B gray-900 lh 1.3 ls -1.08px, h=47
     - 체크리스트 2개 (252:1079) flex-col gap-12:
       - 행 (252:1080): bullet `w=3 h=16 rounded-[24] bg-[#3F9FFF]` + 텍스트 "ESG를 아이디어 → 실행 → 사회적 가치로 연결하는 실천형 프로그램" 16M lh 1.5 ls -0.16px
       - 행 (252:1084): 동일 구조 + "ESG 실천을 위한 기관의 역할과 ESG에 필요한 교육 생태계 구축을 목적으로 개발"
  2. **3 포인트 블록 (252:1088)** h=104 w=253 — flex-col gap-16
     - 3개 행 (252:1089/1094/1099) flex row gap=12 items-center:
       - 아이콘 20×20 (blue circle stroke + check) — `icon-point.svg` 공통
       - 텍스트 16M: "SDGs · ESG 기반 현장 문제해결" / "대학 · 청년 · 지역 연계 팀 프로젝트" / "대회로 끝나지 않고 실천과제로 연결"
  3. **주요 대상 블록 (252:1104)** h=109 w=520 — flex-col gap-12
     - 라벨 row (252:1105) flex row gap=8:
       - bullet: `w=3 h=17 rounded-[24] bg-[#2D7EFF]` (py=4)
       - "주요 대상" 18SB gray-900 lh 1.4 ls -0.27px
     - ul (252:1109) — 3 li, disc marker, 각 li `ms-[24px]`
       - 16R gray-900 lh 1.5 ls -0.16px
       - 항목: "대학생 · 청년" / "대학 · 지역 혁신 조직" / "ESG에 관심 있는 기업 · 기관"

### 6.3 dashed divider (`252:1110`)
- design_context: `h-0 w-full` + `absolute inset-[-1px_0]` + `<img>` (SVG 파일 내장)
- padding (layout_MP7QFE): `px-[12px]` → stroke 실폭 576px
- SVG 내용: 확인 예정 (dasharray 12 12 stroke blue)

### 6.4 하늘 blue CTA bar (`252:1112`)
- `bg-[#A5D9FF]` rounded-[48px] padding `py-[16px] px-[24px]` h=64
- flex row justify-between items-center w=600
- 왼쪽: "자세히 보기" 20B `text-[#0C173B]` lh 1.4 ls -0.4px
- 오른쪽: 컨테이너 64×32 `pr-[16px]` + 3 화살표 `mr-[-16px]` (card1과 동일)
  - 화살표 SVG: `rotate-90` inner + inset 스타일 design_context 그대로. card1 결론("SVG는 이미 chevron-right 방향이라 rotate-90 불필요")은 SVG path를 직접 확인해야 확정. card1에서 rotate-90 **유지**로 통과했으면 card2도 동일 유지. 단계 5에서 diff 확인.

---

## 7. baseline 실측 & clip 전략 (§2.6)

- `file figma-screenshots/main-programs-card2.png` → **1405×805**
- card1 clip-x=265 최적 (baseline 1404). card2는 1405이므로 clip-x **약 264~266** 스윕 예상.
- 격리 프리뷰 URL 기준 뷰포트 1920, `/__preview/main-programs-card2`, 섹션 1416 mx-auto → 페이지 x=252에서 시작 + Framelink 1px 트림 오프셋 = 253 근방.
- 단계 5 예상 명령:
  ```
  bash scripts/compare-section.sh main-programs-card2 --clip-x 265 --clip-y 0 --clip-w 1405 --clip-h 805
  ```

---

## 8. 리스크 메모

| # | 리스크 | 대응 |
|---|-------|------|
| R1 | 좌측 city PNG 회전 baked-in 여부 | card1 교훈: **Framelink 항상 baked-in**. CSS rotate 금지. wrapper=AABB + inner=native 크기 (`507.5×555.5` 중앙 배치) |
| R2 | native PNG 크기(507.5×555.5)와 AABB(530×578) 불일치 | card1 패턴: `flex items-center justify-center` + `flex-none` inner로 중앙 배치. 단계 5 측정으로 확정 |
| R3 | 우측 2 city 타일은 직립 (AABB = native 일치) | `<img>` 직접 배치, 회전/flex 불필요 |
| R4 | dashed divider 색상 — SVG 내장 확정 필요 | 단계 4 구현 시 `divider-dashed.svg` 직접 열어 stroke 색 확인. blue(`#2D7EFF` 예상) |
| R5 | progress bar start icon — leaf 아닌 blue drop인지 | SVG 파일 확인 예정. 내용 그대로 사용 |
| R6 | 아이콘 3개 통합 가능 여부 | §4.3 — 2·3 동일, 1도 시각 구분 불가. **1파일 통합**. 단계 5에서 G1 diff 확인, 이상 시 point-1 개별 복원 |
| R7 | CTA 화살표 SVG rotate-90 — card1과 동일 구조 | design_context 그대로 복제. card1 commit에서 검증됨 |
| R8 | baseline 1405 (card1 1404) — clip-x 오프셋 차이 | 단계 5에서 clip-x 263~267 스윕 |
| R9 | color 토큰 없음 (`#0C173B` / `#A5D9FF` / `#2D7EFF` / `#3F9FFF`) | raw hex로 구현. card3 평가 후 토큰 승격 여부 결정 |
| R10 | ProgramCard 공통화 유혹 | **card2도 로컬**. plan에 card3 시점 승격 계획 명시 (Rule of Three 준수) |
| R11 | ul 구조 (card1 복잡 구조 준수) | card1 commit 참고, design_context 그대로 복사 |

---

## 9. 신규 공통 컴포넌트 후보 (card3 시점 승격 계획)

card1+card2 동일 골격 확인 → **card3 워커 시작 시 `src/components/ui/ProgramCard.tsx`로 승격**. 차이를 props로 흡수:

```ts
interface ProgramCardProps {
  outerBg: string;              // #0c3b0e | #0C173B | (card3)
  title: string;
  checklist: string[];          // 2개
  checklistBulletColor: string; // #4FB654 | #3F9FFF
  points: { text: string }[];   // 3개
  pointsLabel: string;          // "필수 역량" | "주요 대상"
  pointsBulletColor: string;    // #4FB654 | #2D7EFF (카드별 블릿 색)
  ulItems: string[];            // 6 | 3
  ctaText: string;              // "자세히 보기"
  ctaBg: string;                // #caeb69 | #A5D9FF
  ctaTextColor: string;         // #0c3b0e | #0C173B
  dividerSvg: string;           // 각 카드별 색 다른 SVG url
  progressBarSvg: string;       // 각 카드별 색 다른 SVG url
  pointIconSvg: string;         // card1 filled+stroke, card2 stroke, card3 TBD
}
```

card2 구현 중에는 **로컬 컴포넌트**로 유지. card3에서 최종 구조 확정 후 card1/card2를 리팩토링.

---

## 10. 단계 1 통과 체크

- [x] baseline PNG 실측 (1405×805)
- [x] get_design_context 확보
- [x] get_variable_defs 확보 (9 변수)
- [x] get_metadata 확보 (좌표/치수, y 변환)
- [x] Framelink get_figma_data 확보 (fills 구조 → 동적 에셋 0)
- [x] 에셋 7개 다운로드 (`src/assets/main-programs-card2/raw/`)
- [x] 에셋 목록 + 동적 여부 칸 기입
- [x] 캔버스-에셋 개수 일치 검증 (렌더 11 = 파일 7 + 공유 4)
- [x] 캔버스 좌표 기록 (섹션 0,0,1416,805 / 페이지 252,4494,1416,805)
- [x] transform(rotation) 요소 소수점 원본 기록 (좌측 city -16deg baked-in / 나머지 0)
- [x] letter-spacing %→px 환산 (−1.08/−0.27/−0.4/−0.16)
- [x] card1과 구조 비교 표 작성
- [x] 리스크 11개 기록
- [x] Rule of Three 승격 계획 (card3)

→ 단계 2(계획) 진입 준비 완료. **사용자 승인 대기**.
