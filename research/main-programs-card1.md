# main-programs-card1 — 리서치

- Figma 노드: `252:1013` (Group 13, 메인페이지 `#5` 섹션)
- 사이즈: **1416×805** (풀폭 아님, 중앙정렬 — 페이지 x=252에서 시작)
- 페이지 캔버스 좌표: **(252, 3549)** @ 1920 × 10077
- 섹션 내부 좌표계: (0, 0) 기준
- baseline: `figma-screenshots/main-programs-card1.png` (1404×805 기존 저장 — 오케스트레이터가 1416 clip 기준으로 측정 지시)
- 연관 페이지 리서치: `research/메인페이지.md` `#5` 행

---

## 1. 상위 구조 개요 (get_metadata)

```
<frame 252:1013 name="Group 13" x=0 y=0 width=1416 height=805>
  <vector 252:1014 "Rectangle 19" x=861 y=125 width=555 height=680>           ← 우측 city 타일
  <frame  252:1015 "Frame 12"    x=400 y=0  width=616 height=732>             ← 그린 카드 outer
    <frame 252:1016 "Frame..."    x=8 y=8    width=600 height=620>            ← 흰 카드 inner
      <frame 252:1017 "..."       x=40 y=40  w=520 h=159>                     ← 타이틀 블록 (progress+h2+체크리스트2)
      <frame 252:1034 "..."       x=40 y=247 w=236 h=104>                     ← 검사 포인트 3열 (아이콘+텍스트)
      <frame 252:1050 "..."       x=40 y=399 w=456 h=181>                     ← 필수 역량 + ul 6개
    <frame 252:1056 "Frame 12"    x=8 y=640  w=600 h=0>                       ← dashed divider
    <frame 252:1058 "Frame 12"    x=8 y=652  w=600 h=64>                      ← 연두색 CTA bar
  <rounded-rect 252:1064 "Rectangle 18" x=0      y=301.01 w=227.49 h=241.51>  ← 좌하단 leaf (회전 AABB)
  <rounded-rect 252:1065 "Rectangle 22" x=149.07 y=83.04  w=166.05 h=166.05>  ← 좌상단 leaf (회전 AABB)
</frame>
```

- **카드 위치**: x=400, y=0, w=616 (outer) → 카드 좌우 끝 x=400~1016. 카드 좌측 여백 400px, 카드 우측 여백 400px. 캔버스 폭 1416의 **좌측 장식 범위 0~400**, **우측 장식(city) 범위 861~1416**.
- **우측 city**가 카드(끝 x=1016)와 x=861에서 **155px 오버랩**. z-index: city < 카드 (카드가 앞에 렌더).
- **좌측 leaf 2개**도 카드보다 앞/뒤? — design_context 상 Rectangle 18/22가 카드 선언보다 뒤에 나옴 → **DOM 순서상 leaf가 카드 위**(단, 좌측 leaf는 x=0~315이고 카드 시작 x=400, 겹치지 않음).

---

## 2. 디자인 토큰 (get_variable_defs)

| 변수 | 값 | 용도 |
|------|-----|------|
| Brand/Brand 700 | `#0c3b0e` | 카드 outer/inner 배경 중 outer(진녹색), CTA 텍스트 |
| Brand/Brand 500 | `#4fb654` | progress bar 라인·노드, 체크리스트 원형 아이콘, 세로 bullet |
| Gray Scale/Gray 900 | `#1d2623` | 텍스트 |
| Gray Scale/Gray 000 | `#ffffff` | 카드 inner 배경 |
| — | `#caeb69` | CTA 배경 (토큰 없음, raw hex) |
| — | `#0c3b0e` (brand-700 재사용) | 좌상단 leaf 기반 배경 |
| spacing/0/1/2/3/4/6/12 | 0/4/8/12/16/24/48 | 간격/패딩 |
| Text-base/16M | Pretendard Medium 16, lh 1.5, ls -1% (−0.16px) | 체크리스트·검사포인트 본문 |
| Text-base/16R | Pretendard Regular 16, lh 1.5, ls -1% (−0.16px) | ul 필수 역량 항목 |
| Text-lg/18SB | Pretendard SemiBold 18, lh 1.4 (`1.399999`), ls -1.5% (−0.27px) | "필수 역량" 헤더 |
| Text-xl/20B | Pretendard Bold 20, lh 1.4, ls -2% (−0.4px) | "자세히 보기" CTA |
| 타이틀 (style_2BHWD6) | Pretendard Bold 36, lh 1.3, ls -3% (−1.08px) | "ESG마인드 자격검정" |

**기존 프로젝트 토큰과 매핑**:
- `--color-brand-700: #0c3b0e` ✅ (main-hero에서 등록됨)
- `--color-brand-500: #4fb654` ✅
- `--color-gray-900: #1d2623` ✅
- `#caeb69` → 신규 raw (토큰 등록 여부는 다른 섹션 재사용 여부에 달림 — card2/card3에서 동일 CTA 반복되면 `--color-brand-accent-500: #caeb69` 등록 제안. 지금은 **raw hex**로 구현 후 Rule of Three)

→ **신규 `@theme` 토큰 필요 없음** (기존 재사용 + raw hex 1개)

### 정밀 수치 주의 (§2.4)
- 타이틀 letter-spacing: `-3%` ⇒ 36 × −0.03 = **−1.08px** (소수점 유지)
- 18SB letter-spacing: `-1.5%` ⇒ 18 × −0.015 = **−0.27px**
- 20B letter-spacing: `-2%` ⇒ 20 × −0.02 = **−0.4px**
- 16M/16R letter-spacing: `-1%` ⇒ 16 × −0.01 = **−0.16px**
- Rectangle 18 위치: `x=0 y=301.010498046875` → design_context는 `top=[234.39]` flex wrapper (내부 중앙정렬 후 보정). metadata `top-y=301.01` 는 AABB 상단. 실제 CSS 배치는 design_context 그대로 **top-[234.39px] left-0**.
- Rectangle 22 위치: `x=149.0725860595703 y=83.0436782836914` → design_context `top-[53.94] left-[149.07]` flex wrapper. 실제 CSS는 design_context 그대로.
- **소수점 좌표/회전 절대 반올림 금지** — main-hero 이중 회전 교훈.

---

## 3. 에셋 목록

### 3.1 캔버스-에셋 개수 검증

| # | 유형 | 노드 ID | 치수 (Figma) | 파일 | scale | 동적? | 처리 방식 |
|---|------|---------|-------------|------|-------|-------|----------|
| 1 | 이미지 (우측 city) | `252:1014` (Rectangle 19) | 555×680 | `city-right.png` | 2x → 1024×1024 | **정적** (IMAGE fill) | Framelink PNG 다운로드 완료. Figma가 square(1024²)로 export했으나 원본 imageRef는 임의 비율. **렌더링 시 `w=555 h=680 object-cover rounded-[40px]`** |
| 2 | 이미지 (좌하 leaf, 3겹) | `252:1064` (Rectangle 18) | 227.49×241.51 (회전 AABB) / 191.441×163.788 (원본) | `leaf-bottom.png` | 2x → 404×432 | **정적** | Framelink PNG 다운로드 완료. Figma가 **회전 전 원본 이미지**를 node bbox로 export (404×432 ≈ 원본 202×216). **CSS `rotate-[-24deg]` 수동 적용 필요**. 내부 rectangle 191.441×163.788 w/h 유지 |
| 3 | 이미지 (좌상 leaf) | `252:1065` (Rectangle 22) | 166.05×166.05 (회전 AABB) / 140×140 (원본) | `leaf-top.png` | 2x → 309×309 | **정적** | Framelink PNG 다운로드 완료. **회전 baked-in 아님** (PNG는 회전 전 원본 정면). **CSS `rotate-[-12deg]` 수동 적용 필요**. brand-700 배경 + `mix-blend-hard-light` |
| 4 | SVG (progress bar) | `252:1018` | 520×20 | `progress-bar.svg` | — | 정적 | leaf icon + 점선 + end dot 합성. `<img>` 또는 inline SVG |
| 5 | SVG (check icon filled) | `252:1036` | 20×20 | `icon-check1.svg` | — | 정적 | "ESG 개념..." 라인 (1번째만 fill clip) |
| 6 | SVG (check icon stroke, 공용) | `252:1041`, `252:1046` | 20×20 | `icon-check2.svg` (= `icon-check3.svg`) | — | 정적 | "온라인 시험 진행", "공식 자격증 발급". **2·3번째 아이콘은 동일** — `icon-check3.svg` 실제 중복 |
| 7 | SVG (dashed divider) | `252:1056` / `252:1057` | 600×2 | `divider-dashed.svg` | — | 정적 | 필수 역량과 CTA 사이 구분선, stroke `#CAEB69` dasharray 12 12 |
| 8 | SVG (chevron arrow) | `252:1061` → `I252:1061;11:10988` Icon Stroke | 32×32 | `arrow-chevron.svg` | — | 정적 | CTA 우측 화살표. **3개 인스턴스 overlap** (252:1061 / 1062 / 1063) — **이미지 1개 재사용** |

**총 에셋: 8개 (PNG 3 + SVG 5)**. 텍스트·배경색은 별도 자산 없음.

### 3.2 동적 에셋 검증
- `get_figma_data` fills 확인: 모든 IMAGE fill이 `scaleMode: FILL` 정적. **gifRef 필드 없음**. 동적 에셋 **0개**.
- → `dynamic-asset-handling` 스킬 불필요.

### 3.3 캔버스-에셋 개수 일치
- baseline 육안: city 1 + 좌하 leaf 1 + 좌상 leaf 1 + progress 1 + 체크아이콘 3 + divider 1 + 화살표(overlap 3) = **10 visual element**
- 다운로드 파일: 8 (화살표 1개 재사용 → +2 렌더, 체크아이콘2·3 동일 → 공유)
- **일치 ✅** (중복 제거 기준 8, 렌더 수 10).

### 3.4 Framelink SVG 규칙 준수
- SVG에 width/height attribute 존재 → display-ready. 추후 `<img>`로 사용 시 **scaleY/scaleX 금지**.
- 모든 SVG는 `src/assets/main-programs-card1/raw/`에 저장 → `process-assets.py` 불필요 (SVG는 그대로 사용). PNG만 background fill 처리 여부 결정 시 process 필요할 수 있으나, baseline 확인 결과 투명 배경 PNG 정상 export.

---

## 4. transform 요소 목록 (정밀 수치)

| 요소 | 노드 | 회전 | 원본 치수 (wrapper inner) | AABB 치수 (wrapper outer) | Figma 위치 (AABB top-left) | CSS 배치 전략 |
|------|------|------|-------------------------|--------------------------|--------------------------|--------------|
| 좌하 leaf | `252:1064` | **−24deg** (`-rotate-24`) | 191.441×163.788 | 227.494×241.508 | design_context `left-0 top-[234.39]` (AABB wrapper) | wrapper `absolute left-0 top-[234.39px] w-[227.494px] h-[241.508px] flex items-center justify-center` → inner `rotate-[-24deg] w-[163.788px] h-[191.441px] rounded-[40px]` → `<img>` object-cover |
| 좌상 leaf | `252:1065` | **−12deg** (`-rotate-12`) | 140×140 | 166.048×166.048 | design_context `left-[149.07] top-[53.94]` (AABB wrapper) | wrapper `absolute left-[149.07px] top-[53.94px] w-[166.048px] h-[166.048px] flex items-center justify-center` → inner `rotate-[-12deg] size-[140px] rounded-[32px]` → brand-700 BG + `<img>` `mix-blend-hard-light` |
| CTA 화살표 (3개 겹침) | `252:1061/62/63` | inner `rotate-90` | 20×32 (path) in 32×32 frame | 32×32 | `x=512/528/544 y=16` in 64×32 container (`gap=-16`) | design_context 그대로 복제 — inner 0도 (화살표 자체는 수평), 실제 chevron path가 수직이므로 `rotate-90`으로 수평화. SVG 파일 자체에 `rotate-90`과 같은 효과 내장됐는지 단계 4에서 검증 |

**반올림 금지 확인**:
- rotation: `-24deg`, `-12deg`, `90deg` — 모두 정수 ✅
- position: `234.39`, `149.07`, `53.94` — 소수점 **그대로 유지** (Tailwind arbitrary `top-[234.39px]` 등)
- dimensions: `227.494`, `241.508`, `191.441`, `163.788`, `166.048`, `140` — **소수점 그대로** (wrapper는 `w-[227.494px]` / inner는 `w-[163.788px]`)

---

## 5. 카드 내부 구조 상세

### 5.1 outer green card (`252:1015`)
- `bg-[#0c3b0e]` rounded-[48px] padding `pt-[8px] pb-[16px] px-[8px]`
- flex-col gap-12 (`gap=12px`)
- width: hug → **616px (metadata 기준)**, height: hug
- 내부: white inner 카드 + dashed divider + 연두 CTA 3단 수직 스택

### 5.2 inner white card (`252:1016`)
- `bg-white` rounded-[48px] padding `p-[40px]`
- w=600px (fixed), h=620px (hug)
- flex-col gap-48 (spacing/12)
- 3개 자식 수직 스택:
  1. **타이틀+체크리스트 블록 (252:1017)** h=159 — flex-col gap-16 w=520
     - progress bar row (252:1018) h=20 — flex row gap=4
       - leaf start icon 20×20 (252:1019)
       - 점선 flex-1 (252:1022) — 5.999×height(effectively stroke)
       - end dot 6×6 (252:1023)
       - → **SVG `progress-bar.svg` (520×20, 내장: leaf + 점선 + 끝점)**. width=520으로 컨테이너 폭 일치
     - h1 "ESG마인드 자격검정" 36B gray-900 lh 1.3 ls -1.08px, h=47
     - 체크리스트 2개 (252:1025) flex-col gap-12:
       - 행 (252:1026) flex row gap=8:
         - bullet: w=3 h=16 rounded-[24] bg-#4fb654 (좌 세로 막대), 위아래 py=4
         - 텍스트 "ESG를 알고 있는 사람이 아니라..." 16M lh 1.5 ls -0.16px
       - 행 (252:1030) 동일 구조:
         - 텍스트 "ESG 실천을 위한 기관의 역할과..."
  2. **검사 포인트 3열 (252:1034)** h=104 w=236 — flex-col gap-16
     - 3개 행 (252:1035/40/45) flex row gap=12 items-center:
       - 아이콘 20×20 (252:1036/1041/1046)
       - 텍스트 16M lh 1.5 ls -0.16px: "ESG 개념 / 용어 / 실천 전반" / "온라인 시험 진행" / "공식 자격증 발급"
     - **아이콘 1번은 `icon-check1.svg` (clip0_252_1036), 2·3번은 `icon-check2.svg` (파일 내용 동일)** — 모두 녹색 원 + 체크. 실질 동일 아이콘 3개.
  3. **필수 역량 블록 (252:1050)** h=181 w=456 — flex-col gap-12
     - 라벨 row (252:1051) flex row gap=8:
       - bullet: w=3 h=17 rounded-[24] bg-#4fb654 (py=4)
       - "필수 역량" 18SB gray-900 lh 1.4 ls -0.27px
     - ul (252:1055) — 6 li, disc marker, **각 li `ms-[24px]`** (design_context 원본 유지)
       - 16R gray-900 lh 1.5 ls -0.16px
       - 항목: 지역사회와 상생... / 사회적 가치 창출... / 윤리적 의사결정... / 지역 사회 ESG 문제 해결 / 취약계층·청년대상 ESG 교육 / 대학·기업·지자체 협력 프로젝트
       - design_context ul 스타일: `block list-disc min-w-full text-[16px] tracking-[-0.16px] w-[min-content]` + 내부 `leading-[0]` 외곽 + `leading-[1.5]` span 내부. 이대로 복사.

### 5.3 dashed divider (`252:1056`)
- Frame 12 w=600 h=0 inside outer card, padding `0 12px` (inner stroke 576px)
- **`divider-dashed.svg` (600×2, stroke `#CAEB69` dasharray 12 12)**
- design_context: `<div className="h-0 relative shrink-0 w-full"><div className="absolute inset-[-1px_0]"><img /></div></div>`

### 5.4 연두 CTA bar (`252:1058`)
- `bg-[#caeb69]` rounded-[48px] padding `py-[16px] px-[24px]` h=64
- flex row justify-between items-center w=600
- 왼쪽: "자세히 보기" 20B `text-[#0c3b0e]` lh 1.4 ls -0.4px
- 오른쪽: 컨테이너 64×32 `gap=-16` (negative gap으로 화살표 3개 오버랩). `pr-[16px]` 있어서 design_context에 `mr-[-16px]` 포함.
  - 화살표 1 (`arrow-chevron.svg` 32×32, chevron-right) — `rotate-90`은 SVG 자체의 path 방향 보정용. SVG가 `chevron-right`(우 방향)이므로 CSS rotate 불필요 가능. design_context에는 `rotate-90` 붙어있음 — 이는 Figma 컴포넌트 안에서 path가 수직으로 저장되어 있기 때문. **단계 4에서 SVG 실제 방향 확인 필요**. 확인 결과: **arrow-chevron.svg의 path는 이미 우측 방향** (`M21.67 15.99 ... M21.47 16.47 → 14.81 23.13`). **CSS rotate 불필요**로 판단 → design_context의 `rotate-90`은 무시하고 SVG 그대로 사용.
  - 3개 화살표 오버랩 연출 (우측으로 32+16+16=64 폭) — 디자인 의도: "더 많이" 강조.

---

## 6. 측정 전략 (단계 5 준비)

- **섹션 폭 1416**, 카드 중앙정렬 (페이지 기준 x=252). 자기 자신은 0~1416 섹션 내부 좌표.
- **옵션 A (권장)**: `/__preview/main-programs-card1` 격리 라우트에서 **1416×805 단독 렌더**. clip 불필요 (baseline과 직매핑).
  - `scripts/compare-section.sh main-programs-card1` 기본으로 동작.
- **옵션 B**: `/` 페이지 통합 후 clip 캡처 (오케스트레이터 지시): `--clip-x 252 --clip-y 3549 --clip-w 1416 --clip-h 805`. 현 단계는 통합 X → **옵션 A 채택**.
- 오케스트레이터 지시 사항 "clip 파라미터 필수"는 **옵션 A에서는 clip 0/0/1416/805 의미**. 혹은 `/` 통합 후 B. → **단계 2 plan에서 결정** (격리 프리뷰 권장).

---

## 7. 리스크 메모

| # | 리스크 | 대응 |
|---|-------|------|
| R1 | 좌측 leaf 2개의 **회전 baked-in 여부 혼동** — main-hero 이중 회전 전례 | **단계 5 실증 결론**: Framelink PNG는 **회전+blend+bg까지 모두 baked-in** 상태였음. leaf-top 309×309 = 154.5@1x (AABB 166이 아닌 네이티브), leaf-bottom 404×432 = 202×216@1x. **CSS rotate/blend/bg 전부 금지**. wrapper를 Figma AABB로 유지하되 내부에 네이티브 크기 이미지를 flex-center로 배치 (baseline 실측 매칭). plan/§11.3 참조. |
| R2 | 우측 city 이미지 **square(1024²) export** — 원본 비율(555×680) 재구성 | `<img>` 컨테이너 w=555 h=680 `object-cover` → Figma가 noderef 자체를 cover로 설정했으므로 일치 |
| R3 | 우측 city **카드와 155px 오버랩** + z-index | design_context 순서: Rectangle 19가 **카드 앞** 선언 → DOM 상 카드보다 먼저 = **카드가 위에 렌더**. 그러나 canvas로는 city가 **카드 우측에 걸쳐서 뒤로 보임** (카드가 앞). OK. |
| R4 | CTA 화살표 **3겹 overlap `gap=-16`** 구현 | Tailwind `space-x-[-16px]` 불가 → flex gap에 음수 설정은 ok (`gap-[-16px]` 동작 안 함). design_context 방식: 각 화살표에 `mr-[-16px]` + 컨테이너 `pr-[16px]`. **그대로 복사** |
| R5 | ul `list-disc` 기본 marker 색상 — Tailwind 기본 검정이지만 Figma는 **gray-900 텍스트색과 동일** | 기본 marker 상속이 gray-900이 되도록 `text-[#1d2623]` 외부 설정 유지. `marker:text-[#1d2623]` 명시 권장 |
| R6 | 필수 역량 ul이 **min-w-full + w-min-content** + leading-0 외곽 + leading-1.5 span 내부 | design_context 그대로 복사. 이 희한한 구조는 Figma가 text node를 list로 flatten할 때 나오는 패턴 — 임의로 단순화 시 줄 간격/폭 틀어짐 위험 |
| R7 | letter-spacing **%→px 환산** | §2 정리한 모든 값 Tailwind arbitrary로 명시 (`tracking-[-1.08px]` 등). SVG에 font 없으므로 무관 |
| R8 | divider `w=600 h=0` + `absolute inset-[-1px_0]` | design_context 그대로. inset -1px 위아래로 stroke 2px가 line 밖으로 보이게 함 |
| R9 | inner 카드 **height hug** — Figma metadata 620px이지만 실제 콘텐츠 합계는 40+159+48+104+48+181+40=620 ✅. 변동 리스크 낮음 | hug 유지 (고정 하지 않음) |
| R10 | 공통 카드 컴포넌트 추출 유혹 (card2·3에서 미러) | **Rule of Three** — 지금 card1만 구현. 섹션 로컬 `CardShell`/`CardChecklist` 등 페이지 내부 컴포넌트로만 분리. card2 구현 시 공통화 평가, card3에서 확정. **section-implementer 단일 섹션 원칙 준수** |
| R11 | baseline 크기가 1404×805 (기존) vs 1416 spec | 오케스트레이터가 1416 기준 clip으로 측정하라 지시 — 실측 baseline이 1404×805이면 capture도 같은 1404로 맞추거나 baseline 재export. **단계 5 준비 시점에 확인 필요**. (Framelink pngScale 1이 bbox를 정확히 1416×805로 잘라주면 재 export) |

---

## 8. 신규 공통 컴포넌트 후보

1. **ProgramCard**: card1/2/3가 공유하는 구조 (outer green + inner white + dashed divider + CTA). card1은 **로컬 구현**, card2 시점 평가, card3 시점 확정.
2. **CardProgressBar**: SVG 한 장으로 끝 → 컴포넌트화 가치 낮음. 섹션 로컬 `<img>` 삽입으로 족함.
3. **CardChecklistRow** (bullet + 텍스트 행): 체크리스트와 필수 역량 라벨에서 2회 등장 → 섹션 로컬 컴포넌트 `BulletRow` 정도.
4. **CtaArrowStack** (3겹 화살표): card1/2/3 동일 예상 → card2 시점 공통화 평가.

지금은 **card1 섹션 로컬**에 모든 변형을 두고 기록만 남김.

---

## 9. 단계 1 통과 체크

- [x] baseline PNG 확인 (`figma-screenshots/main-programs-card1.png`)
- [x] get_design_context 확보 (~12K 토큰 근접)
- [x] get_variable_defs 확보 (10+ 변수)
- [x] get_metadata 확보 (정확한 좌표·치수)
- [x] Framelink get_figma_data 확보 (fills 구조 확인 → 동적 에셋 0)
- [x] 에셋 목록 + 동적 여부 칸 기입 (PNG 3 + SVG 5 = 8, 동적 0)
- [x] 캔버스-에셋 개수 일치 검증 (렌더 10 = 파일 8 + 공유 2)
- [x] 캔버스 좌표 기록 (섹션 0,0,1416,805 / 페이지 252,3549,1416,805)
- [x] transform(rotation) 요소 소수점 포함 원본 기록 (−24/−12 deg, position `234.39`/`149.07`/`53.94` 등)
- [x] letter-spacing %→px 환산 (−1.08/−0.27/−0.4/−0.16)
- [x] 에셋 다운로드 완료 (`src/assets/main-programs-card1/raw/` 9개 파일)
- [x] 리스크 11개 기록

→ 단계 2(계획) 진입 준비 완료. **사용자 승인 대기**.
