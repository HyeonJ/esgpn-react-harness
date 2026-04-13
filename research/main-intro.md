# main-intro — 섹션 리서치

- Figma 노드: `26:272` (Frame 2042062940), 1920×1040
- 페이지: 메인페이지 (`/`), 캔버스 좌표 (0, 1040)
- Baseline: `figma-screenshots/main-intro.png` (1920×1040, pngScale 1) — 확보 완료
- 데이터 소스: 공식 Figma MCP `get_design_context` + `get_metadata` + `get_variable_defs`, Framelink `get_figma_data`(globe fill 검사)

---

## 1. 섹션 개요 (실제 디자인)

좌측 텍스트 블록 + "주요사업" 3개 행 + 우측 부유 globe(지구) 이미지 + 4개 라벨(교육/자격/참여/사회공헌) + 4개 점선 connector vector.

**리스크 메모와의 차이 (정정)**:
| 메모 | 실제 |
|------|------|
| "다크 BG" | **백색 BG** (root frame `26:272`에 fill 없음. baseline PNG 좌측 영역 흰색 확인). |
| "주요사업 01/02/03 3개 행" | 실제로는 좌측이 (a) ESGPN이란? heading + body + (b) 3개 사업 항목(라벨+제목+점선+설명) 두 영역. 라벨은 `주요사업 01/02/03` 그린 pill. |
| "globe가 회전 GIF/비디오 가능성" | **정적 IMAGE fill** 확정. `gifRef` 없음. cropTransform 적용된 raster. 단순 `<img>`로 렌더 가능. |
| "4개 connector vector" | 정확. Vector 4/5/6/7. 그중 둘은 `-scale-y-100` 수직 반전. |

---

## 2. 컴포넌트 구조 (Figma DOM 그대로)

```
26:272 Frame 2042062940 (1920×1040, root)
└─ 26:217 Frame 2042062935 (716×545, x=250.5 y=247.5) — 좌측 컬럼 묶음
   ├─ 26:131 Frame 2042062925 (24×545) — 페이지 진행 점 indicator
   │  ├─ 26:128 Ellipse 1 (16×16, x=4 y=253.5) — 큰 원 (현재 페이지)
   │  └─ 26:129 Ellipse 2 (6×6, x=9 y=285.5) — 작은 점
   └─ 26:216 Frame 2042062934 (620×545, x=96) — 텍스트+사업 묶음 (gap 112)
      ├─ 12:2353 Frame 2042062907 (620×181) — 헤딩 그룹
      │  ├─ 26:215 Frame (620×85)
      │  │  ├─ 26:214 "ESGPN이란?" (76×21, 14R, #97a29e)
      │  │  └─ 12:2354 "ESG 실천을 위한 연대 플랫폼" (620×56, 48B, #1d2623, lh 56)
      │  └─ 12:2355 본문 (620×72) — "ESG실천네트워크(ESGPN : ESG Practice Network)는 ESG **교육, 자격, 참여, 사회공헌**을…" (16R, #1d2623, "교육,자격,참여,사회공헌" Bold #4fb654)
      └─ 26:213 Group 8 (620×252, y=293) — 사업 3행 + 라벨 컬럼 두 그리드 셀
         ├─ 26:203 Frame 2042062929 (600×226, ml=20 mt=26) — 사업 본문 3행 (gap 32)
         │  ├─ 26:188 Row1 (600×54) "ESG 실천방안 발굴" + 점선(91×34) + 본문(308×54)
         │  ├─ 26:191 Row2 (600×54) "ESG 창업 프로그램" + 점선 + 본문
         │  └─ 26:197 Row3 (600×54) "ESG 자격 및 교육" + 점선(106×34) + 본문
         │     - 타이틀: 24B, #1d2623, lh 1.4, ls -2.5 (가변)
         │     - 점선(`Frame 8`): SVG `Vector 3` 점선 (각 다른 너비, raster export)
         │     - 본문: 14R, #1d2623, lh 1.5, ls -0.5
         └─ 26:210 Frame 2042062932 (94×199, gap 56) — 그린 pill 3개
            ├─ 26:205 "주요사업 01" (94×29, radius 24, BG #4fb654, text 14SB white)
            ├─ 26:206 "주요사업 02" (94×29)
            └─ 26:208 "주요사업 03" (94×29)
            ※ 좌측 컬럼: 26:213은 사업 그리드. pill 컬럼은 사업 본문(26:203)과 같은 row에 겹쳐 배치(`grid-cols-[max-content] grid-rows-[max-content] inline-grid`). pill 컬럼은 ml=0 mt=0이고 본문 컬럼은 ml=20 mt=26. 즉 pill이 본문보다 26px 위, 20px 좌측에 배치.

26:271 Group 9 (640×633, x=1029.5 y=203.5) — 우측 globe 묶음
├─ 26:226 Frame (181.85×78, x=1109.88 y=203.5) — 라벨1: 교육
│  ├─ 26:227 (63×28) "교육"(20B 35×28) + Frame9(24×24, arrow icon)
│  └─ 26:233 본문 (181×42) — 14R, #97a29e, text-right
├─ 26:234 Frame (181.85×78, x=1029.5 y=388.5) — 라벨2: 자격
├─ 26:218 Frame (181.85×78, x=1029.5 y=573.5) — 라벨3: 참여
├─ 26:257 Frame (181.85×78, x=1109.88 y=758.5) — 라벨4: 사회공헌
├─ 26:92 image 17 (419.99×404.95, x=1249.51 y=289.02) — globe raster
├─ 26:266 Vector 4 (152.21×105, x=1307.80 y=667.5) — connector → 사회공헌
├─ 26:269 Vector 7 (199.94×109, x=1307.80 y=327.5) — connector → 교육 (`-scale-y-100` 수직 반전)
├─ 26:267 Vector 5 (63.30×39, x=1227.43 y=547.5) — connector → 참여
└─ 26:268 Vector 6 (74.35×37, x=1227.43 y=439.5) — connector → 자격 (`-scale-y-100` 수직 반전)
```

> 우측 4 라벨은 globe 주변에 절대 배치된 fixed 좌표. ml/mt 값은 grid 셀 내부 `place-items-start` 기준 offset이므로 캔버스 좌표(x,y)를 직접 사용 권장.

---

## 3. 토큰 (변경/신규)

`get_variable_defs` 결과 (전부 기존 tokens.css에 존재):

| Figma 토큰 | 값 | tokens.css 매핑 |
|-----------|-----|------------------|
| Gray Scale/Gray 900 (Dark BG, Text) | `#1d2623` | `--color-gray-900` |
| Gray Scale/Gray 500 | `#97a29e` | `--color-gray-500` |
| Gray Scale/Gray 300 | `#c6cdcc` | `--color-gray-300` |
| Gray Scale/Gray 000 | `#ffffff` | `--color-gray-000` |
| Brand/Brand 500 | `#4fb654` | `--color-brand-500` |
| spacing/1 | 4 | `--space-1` |
| spacing/2 | 8 | `--space-2` |
| spacing/3 | 12 | `--space-3` |
| Text-sm/14R | Pretendard Regular 14 / lh 1.5 / ls -0.5 | (font-style 클래스 없음 — Tailwind arbitrary) |
| Text-sm/14SB | Pretendard SemiBold 14 / lh 1.5 / ls -0.5 | 동일 |
| Text-base/16R | Pretendard Regular 16 / lh 1.5 / ls -1 | 동일 |
| Text-xl/20B | Pretendard Bold 20 / lh 1.4 / ls -2 | 동일 |
| Text-2xl/24B | Pretendard Bold 24 / lh 1.4 / ls -2.5 | 동일 |
| P/display/01 48 B | Pretendard Bold 48 / lh 56 / ls 0 | 동일 |

**신규 토큰 추가 불필요.**

---

## 4. 에셋 목록 + 동적/정적 판정

`get_design_context` 기준 10개 image 상수. 캔버스 인스턴스 수와 매칭 검증:

| # | 변수명 | 노드 ID (대표) | 타입 | 인스턴스 수 (캔버스) | 동적 여부 | 처리 방식 | 다운로드 파일명 |
|---|--------|---------------|------|----------------------|-----------|-----------|------------------|
| 1 | imgImage17 | `26:92` | RECTANGLE w/ IMAGE fill, cropTransform | 1 | **정적** (imageRef만, gifRef 없음) | Framelink `download_figma_images` (imageRef + cropTransform + needsCropping:true). pngScale 2. | `globe.png` |
| 2 | imgEllipse1 | `26:128` | ELLIPSE (img tag) | 1 | 정적 | SVG 또는 1x PNG | `dot-large.svg` (or `dot-large.png`) |
| 3 | imgEllipse2 | `26:129` | ELLIPSE (img tag) | 1 | 정적 | SVG | `dot-small.svg` |
| 4 | imgFrame8 | `26:190`, `26:193` (line shorter), `26:199`(line longer) | Vector 3 점선 | 3 (※ design_context는 `imgFrame8` 2회+`imgFrame9` 1회로 분리. row1·row2가 동일 길이 91px이라 동일 ref, row3는 106px 별 ref) | 정적 | SVG | `dotted-line-91.svg`, `dotted-line-106.svg` |
| 5 | imgFrame9 | `26:199` | Vector 3 점선 (긴 버전) | 1 | 정적 | SVG | (위에 포함) |
| 6 | imgGroup6 | `26:243`, `26:248`, `26:253`, `26:261` | 화살표 아이콘 16×20.88 (4개 라벨) | 4 | 정적 | SVG | `arrow-right-green.svg` |
| 7 | imgVector4 | `26:266` | connector → 사회공헌 152.21×105 | 1 | 정적 | SVG | `connector-bottom-right.svg` |
| 8 | imgVector7 | `26:269` | connector → 교육 199.94×109 (-scale-y-100) | 1 | 정적 | SVG | `connector-top-right.svg` |
| 9 | imgVector5 | `26:267` | connector → 참여 63.30×39 | 1 | 정적 | SVG | `connector-bottom-left.svg` |
| 10 | imgVector6 | `26:268` | connector → 자격 74.35×37 (-scale-y-100) | 1 | 정적 | SVG | `connector-top-left.svg` |

**캔버스-에셋 일치 검증**:
- design_context 변수 10개 (imgImage17, 2개 ellipse, 2개 line, 1개 arrow×4사용, 4개 vector)
- 캔버스 인스턴스: 1 globe + 2 dot + 2 line(같은 91 ref 2회 + 다른 106 ref 1회 = 2 unique refs) + 4 arrow(같은 ref) + 4 vector
- 다운로드 대상 파일 = **8개 unique** (globe + dot-large + dot-small + line91 + line106 + arrow + vec4 + vec5 + vec6 + vec7 = 10? 다시 카운트) → **10 unique 파일** (재사용은 코드에서 import 1회로 처리, 파일은 변수당 1개)

> 정정: design_context의 `imgFrame8`가 row1·row2에서 재사용되므로 unique URL = 1개. row3의 `imgFrame9`는 별도. 따라서 **다운로드 파일 = 9개**:
>   1. globe.png (raster)
>   2. dot-large.svg
>   3. dot-small.svg
>   4. dotted-line-short.svg (91 너비)
>   5. dotted-line-long.svg (106 너비)
>   6. arrow-right-green.svg (4회 재사용)
>   7. connector-vec4.svg
>   8. connector-vec5.svg
>   9. connector-vec6.svg
>  10. connector-vec7.svg → **10 unique URL**, **0 동적 에셋**

검증: 캔버스 IMAGE/VECTOR/ELLIPSE 인스턴스 14개 = (1 globe + 2 ellipse + 3 line + 4 arrow + 4 connector). URL unique = 10 (위 10개). ✅ 일치.

---

## 5. 정밀 수치 (소수점 보존, §2.4)

floating 요소 캔버스 절대 좌표 + 자연 사이즈 (반올림 금지):

### 우측 그룹 `26:271` (root 기준)
- 그룹 bbox: x=1029.5 y=203.5 w=639.9998779296875 h=633

### 라벨 4개 (`26:271` 자식 frame)
| 라벨 | x (root) | y (root) | width | height | 내부 텍스트 정렬 |
|------|----------|----------|-------|--------|------------------|
| 교육 (26:226) | 1109.8767623901367 | 203.5 | 181.85243225097656 | 78 | items-end (right) |
| 자격 (26:234) | 1029.5 | 388.5 | 181.85243225097656 | 78 | items-end |
| 참여 (26:218) | 1029.5 | 573.5 | 181.85243225097656 | 78 | items-end |
| 사회공헌 (26:257) | 1109.8767623901367 | 758.5 | 181.85243225097656 | 78 | items-end |

라벨 내부:
- 헤더 컴포넌트 (예: "교육 →"): 라벨 우측에 배치 (gap 4, 헤더 width 변동: 교육 63, 자격 63, 참여 63, 사회공헌 96)
- 본문 (text 42 height): 우정렬, 14R, color #97a29e
- 화살표 아이콘: width 16, height 20.88 (소수점). 아이콘 컨테이너 24×24, items-center justify-center.

### globe (image 17, 26:92)
- 캔버스 좌표: x=1249.514404296875 y=289.02490234375
- bbox: 419.9855041503906 × 404.9502258300781
- IMAGE fill cropTransform:
  - row1: [0.6160910129547119, 0, 0.13691511750221252]
  - row2: [0, 0.8854487538337708, 0.05647930130362511]
  - 의미: 이미지 source의 약 61.6% width × 88.5% height 영역만 노출 (offsetX 13.69%, offsetY 5.65%)
- design_context 표현: `<img class="absolute h-[112.94%] left-[-22.22%] max-w-none top-[-6.38%] w-[162.31%]">` 컨테이너 inset-0 overflow-hidden 안에서 확대.
  - 1/0.6160910 = 1.6231..., 1/0.8854488 = 1.1294..., offset 비율도 일치 → design_context 값 그대로 사용 가능.

### Connector vectors (캔버스 절대 좌표)
| Vector | 노드 | x (root) | y (root) | width | height | 변형 |
|--------|------|----------|----------|-------|--------|------|
| Vec4 (BR→사회공헌) | 26:266 | 1307.8045654296875 | 667.5 | 152.2135009765625 | 105 | 없음 |
| Vec7 (TR→교육) | 26:269 | 1307.8045654296875 | 327.5 | 199.9372100830078 | 109 | `-scale-y-100` (Y축 반전) |
| Vec5 (BL→참여) | 26:267 | 1227.4277801513672 | 547.5 | 63.29670333862305 | 39 | 없음 |
| Vec6 (TL→자격) | 26:268 | 1227.4277801513672 | 439.5 | 74.3485107421875 | 37 | `-scale-y-100` |

> **transform 보존**: rotation은 없고 scale 반전(`scaleY(-1)`)만 존재. CSS는 `transform: scaleY(-1)` 또는 Tailwind `-scale-y-100`. Vector SVG로 export하면 path 자체가 baked되므로 SVG `<svg style="transform:scaleY(-1)">`로 처리해도 동일.

### 좌측 컬럼 (`26:217`)
- bbox: x=250.5 y=247.5 w=716 h=545
- 내부 padding/gap (design_context 추출): root flex `gap-[63px] items-center justify-center px-[252px] py-[200px]` — 즉 1920 좌우 패딩 252, 상하 200.
  - 검증: 252+716+63+639.9999+? = 1920? 252+716+63+640=1671. 좌우 252×2=504, 컨텐츠 1416. 좌측 716 + gap 63 + 우측 640 = 1419. **3px 차이** — root frame y=1040 기준 컨텐츠 약간 우측 시프트. 캔버스 좌표(x=1029.5)가 진실. inline-grid 라벨 셀의 `place-items-start`가 보정 가능.

### 좌측 진행 점 indicator (`26:131`)
- Frame 24×545 (좌측 컬럼 좌단). 큰 원 16×16 (y=253.5 내부) + 작은 원 6×6 (y=285.5).
- ml/mt 절대값: indicator는 `26:217`의 첫 자식, 부모 flex(items-start, gap 72)에서 좌단.

### 좌측 텍스트 그룹 (`26:216`)
- bbox: x=346.5 (= 250.5+96) y=247.5 w=620 h=545
- 자식 gap: 112px (헤딩 그룹 ↔ 사업 그룹)
- 헤딩 그룹 (`12:2353`) 자체 gap 24, 내부 `26:215` gap 8 (heading label 14 ↔ display 48)
- 본문(`12:2355`): 14R 본문 내 컬러 강조 — `text-[#4fb654]`+Bold span 1개 (교육·자격·참여·사회공헌)

### 사업 3행 (`26:203`)
- 부모: ml=20 mt=26 within `26:213` grid → 캔버스 x = 346.5+0+20=366.5, y=247.5+293+26=566.5
- gap 32 (행간), w=600
- 각 행: gap 12 (타이틀↔점선↔본문), 타이틀 24B Bold, 본문 14R Regular
- 점선(`26:190` 등) 박스 91×34, 내부 inset(`absolute inset-[0_-2.93%]`) — 음수 inset은 점선 양옆 살짝 확장. row3는 `inset-[0_-2.52%]` (다른 너비 보정).

### 그린 pill 3개 (`26:210`)
- bbox: x=346.5 (= 좌측 컬럼 좌단 그리드 셀, ml=0) y=247.5+293+0=540.5 w=94 h=199 (gap 56)
- pill 1: y=540.5 (z=top), pill 2: y=540.5+56+29=625.5, pill 3: y=710.5
- 각 pill: bg `#4fb654`, padding x=12 y=4, radius 24, font 14SB, color white, whitespace-nowrap

> pill 컬럼이 사업 본문 컬럼(`26:203` ml=20 mt=26)과 겹치는 inline-grid 구조. 캔버스에서 pill은 본문 위 26px, 좌측 20px (정확히 사업 행 라벨 기능). 즉 pill이 각 행의 좌측 라벨처럼 보임.

---

## 6. 폰트 / 글꼴

- **Pretendard Variable** 단일 패밀리. weight Regular/SemiBold/Bold 사용 (이미 `fonts.css` 등록됨, main-hero 사용 패턴 동일).
- 신규 폰트 도입 없음. ✅

---

## 7. 리스크 (단계 2에서 대응)

| # | 리스크 | 영향 | 대응 방향 |
|---|--------|------|-----------|
| R1 | globe raster cropTransform 처리 | G1 픽셀 정확도 | Framelink `needsCropping: true` + `cropTransform` 인자 사용해서 잘린 PNG 받기. 또는 design_context의 `inset` 트릭(`inset-0 overflow-hidden` + `<img class="left-[-22.22%] top-[-6.38%] w-[162.31%] h-[112.94%]">`) 그대로 적용. **전자가 안전** (브라우저 합성 차이 0). |
| R2 | 4 connector SVG 포함 시 stroke/dasharray 차이 | G1 점선 영역 diff | SVG 그대로 export → `<img>` 사용. inset 음수(`-0.92%~-13.68%`) 보정값 design_context 그대로 적용. |
| R3 | inline-grid 겹침 (pill ↔ 사업 본문) | G2 위치 정확도 | 캔버스 x/y 절대 좌표로 직접 배치 (absolute positioning) 권장. flex/grid 재현은 마진 계산 복잡. 단, 좌측 컬럼은 내부 gap 일관(112/32/56)이라 flex 재현 가능. |
| R4 | 우측 4 라벨 + globe 절대 위치 (계산 상 컨텐츠 너비 1419 vs 디자인 1416) | G2 ±2px 안 통과 가능 | `26:271`을 `relative` 컨테이너로 두고 자식 4 라벨 + globe + 4 connector 모두 `absolute` + 캔버스 좌표 그대로. left/top은 caller 컨테이너 기준 상대값 (label.x - 1029.5). |
| R5 | 본문(`12:2355`) span 컬러 강조 — "교육,자격,참여,사회공헌" 8글자 Bold #4fb654 | G4 색상 | 단일 span으로 처리. design_context 그대로 (br 1개 포함, 3줄 표시). |
| R6 | 라벨 본문 14R color `#97a29e` 우정렬, br 강제 1개 | G2 줄바꿈 정확도 | design_context 그대로 (`<br aria-hidden="true">`) |
| R7 | 큰 원 16×16 안에 작은 점 6×6이 있는 인디케이터 (`26:128` `26:129`) | 미세 정렬 | SVG 1개로 합치거나 div 2개 절대 배치. CSS `border-radius:50%; border:1px solid` + 내부 dot로 대체 가능 (raster 회피, 픽셀 정확). |
| R8 | 캔버스 width 일관성: globe 영역 cropTransform PNG가 큰 사이즈로 export 시 G3 통과는 OK이나 파일 크기 우려 | 빌드 사이즈 | pngScale 2 (≈840×810), <500KB 예상. 초과 시 sharp로 압축. |
| R9 | rotation 없음 — main-hero식 `rotate-[Xdeg]` 회피, scale 반전만 사용 | 단순화 | 4개 connector의 `-scale-y-100`만 적용. 이중 변형 위험 없음. |
| R10 | baseline `figma-screenshots/main-intro.png` 1920×1040 vs 실제 콘텐츠 (좌측 250.5~966.5, 우측 1029.5~1669.5) — 전체 풀폭이지만 콘텐츠는 컨테이너 내. 풀폭 비교 권장 | G1 측정 | `scripts/compare-section.sh main-intro` 표준 비교. clip 미사용. |

---

## 8. 캔버스 좌표 (G5 측정용)

main-intro는 **풀폭** 섹션. compare-section.sh 표준 사용:
- 캔버스 (절대) x=0 y=1040 w=1920 h=1040
- baseline `figma-screenshots/main-intro.png`은 단일 섹션 export (1920×1040)
- preview 라우트 `/__preview/main-intro` (Header 없음)에서 1920×1040 viewport 캡처

clip 인자 불필요 (전체 비교).

---

## 9. 단계 1 통과 체크

- [x] Figma 메타·디자인 컨텍스트 추출
- [x] 토큰 검사 (신규 0)
- [x] 에셋 목록 작성, 동적 여부 명시 (전부 정적)
- [x] globe fill 검사 (gifRef 없음 → 정적 확정)
- [x] 캔버스-에셋 unique URL 일치 검증 (10 = 10)
- [x] floating/scaleY 요소 정밀 좌표·변형 기록 (소수점 보존)
- [x] 리스크 R1~R10 식별
- [x] 캔버스 좌표 (풀폭, clip 미사용)

→ **단계 2 진입.**
