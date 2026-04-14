# research/main-programs-card3.md

메인페이지 Programs Card #3 — "ESG 실천 네트워크(ESGPN) 사회공헌활동"
(Figma 252:1119 "Group 15", 1416×805, 캔버스 좌표 (252, 5439))

---

## 1. Figma 메타

- 파일: `qhrMiGVfoSQ1QMFhVN8z78` (ESG 실천네트워크)
- 섹션 노드: `252:1119` (type=GROUP, layout_JQNGBE)
- 프레임 dimensions: 1416×805 (고정)
- 배경: 없음 (페이지 본문 검정 배경 그대로)
- 캔버스 좌표: (252, 5439) — metadata는 (0, 1890) 기준 local frame이지만 페이지 1920 중 (252, 5439)로 이미 research/메인페이지.md에 기록됨
- card1(252:1013)·card2(252:1066) 동일 패턴 3번째 인스턴스 — Rule of Three 확정 지점

## 2. baseline PNG 실측 (§2.6 규칙)

- 경로: `figma-screenshots/main-programs-card3.png`
- 저장 방식: Framelink (Phase 2 사전 저장 완료)
- **native 크기: 1406 × 805** (`file` 명령 확인, 8-bit/color RGBA, non-interlaced)
- spec 1416과 10px 차이 — card1(1404), card2(1405)와 유사한 Framelink 우측 여백 트림. **clip-w=1406** 사용
- card1=265 / card2=263 기준 → card3 clip-x 스윕 후보: **262, 263, 264, 265, 266** (단계 5에서 최적값 확정)

## 3. 레이아웃 (design_context + metadata 기반)

### 3.1 3 데코레이션 타일 (floating)

| ID | 명 | AABB x,y,w,h (frame 기준) | 회전 | native Framelink (@2x → scale ÷2) | 처리 |
|----|----|---------------------------|------|------------------------------------|------|
| 252:1121 | 좌상 city-tile (rotated) | (0, 18, 360.228, 392.718) | **−16deg baked-in** | 280.675 × 328.062 (non-rotated tile) | wrapper=AABB + inner=native center (card1/card2 패턴) |
| 252:1120 | 좌하 city-tile (upright) | (256, 594, 195, 211) | 직립 | 195 × 211 | absolute 그대로 |
| 252:1122 | 우측 city-tile (upright) | (1058, 100, 358, 390) | 직립 | 358 × 390 | absolute 그대로 |

**카드 본체** `252:1123` "Frame 12":
- AABB (400, 0, 616, 732)
- bg `#3b1a0c` (어두운 갈색 — 3번째 테마, card1=#0c3b0e 녹색 / card2=#0C173B 남색과 대비)
- rounded-48, padding `8/8/16/8` (pt/px/pb/px), gap 12, flex-col

**inner white 카드** `252:1124`:
- size 600×620, bg white, rounded-48, padding 40, gap 48, flex-col
- 3 블록 세로 배치:
  1. `252:1125` 헤더 블록 (520×170) — progress/timeline row + h1 + **description row (신규)**
  2. `258:1375` 중간 블록 (236×104) — 아이콘+텍스트 3행
  3. `258:1392` 하단 블록 (520×109) — 라벨 + ul 3 items

**divider** `252:1164`: 600×0, img 2px dasharray (SVG)

**CTA bar** `252:1166`:
- bg `#ff842d` (주황), rounded-48, h=64, w=600, py=16 px=24
- 좌: "자세히 보기" 20B **white** (card1/2는 어두운색) — card3은 bar 자체가 주황이라 흰 텍스트
- 우: 화살표 3겹 오버랩 (동일 패턴)

### 3.2 헤더 "progress / timeline" row (`252:1126`, 520×20, gap=4)

card1/2가 **단일 progress-bar.svg 520×20**을 쓰는 것과 달리, card3는 **구조 분해**:
- 좌: `252:1127` Frame 9 (20×20) — 내부에 `252:1128` Vector 9 (13.85×17.95) — 잎 모양 아이콘 SVG (imgFrame9)
- 중앙: `252:1129` Frame (496×6) — 내부에 `252:1130` Vector 8 (490×0, line-dashed?) + `252:1131` Ellipse 4 (6×6) 우측 끝
- **시각적으로는 card1/2의 progress bar와 동일한 "녹색 잎 + 대시선 + 우측 동그라미" 타임라인 형태** — Figma가 card1/2에서 하나의 SVG로 납작화했을 뿐 내부 구조는 동일

**결정**: card3도 동일하게 **단일 SVG `progress-bar.svg` (520×20)** 로 다운로드·배치. card1/2와 구조적으로 일치.

### 3.3 타이틀 (`252:1132`, h1)

```
ESG 실천 네트워크(ESGPN)
사회공헌활동
```
- 36B, color `#1d2623`, lh 1.3, letterSpacing `-1.08px` (-3% of 36)
- **첫 줄**: "ESG 실천 네트워크(ESGPN)" (검정)
- `<br>` 보존
- **둘째 줄**: "사회공헌활동" — **색상 `#ff8521`** (별도 span)
- card1(단일색) / card2(단일색)과 다른 특징. `<br>` + accent-span 패턴

### 3.4 Description row (`252:1133`, **card3 신규**)

card1/2에 없던 블록:
- bullet 3×16 rounded-24 `#ff842d`
- 텍스트 "ESG실천네트워크의 사회공헌활동은 일회성 봉사가 아닌 문제해결형 프로젝트"
- 16M, `#1d2623`, lh 1.5, tracking -0.16px
- 구조: bullet wrapper py=4 + text paragraph (card1/card2의 체크리스트 row와 동일 형식)

**즉 card3 헤더는 card1/2의 "2-line 체크리스트" 대신 "1-line description + 3-line icon list"로 분할됨.**

### 3.5 중간 아이콘 3행 (`258:1375`, 236×104, gap=16)

card1의 `CardChecklist3`와 동일 구조:
- 3행, 각 행 `아이콘 20×20 + gap 12 + 텍스트 16M`
- 행1 (258:1376): icon `imgIcon` (체크 원형 filled?) + "전문가 재능나눔 활동 전개"
- 행2 (258:1381): icon `imgIcon1` + "평생직업교육 공로상 수상"
- 행3 (258:1386): icon `imgIcon1` + "로컬크리에이터"
- 행1과 행2·3이 다른 아이콘 (card1 동일 패턴: 첫 행만 filled, 나머지는 stroke)

### 3.6 하단 "사회공헌활동 특징" 블록 (`258:1392`, 520×109, gap=12)

card1의 `CardCompetencies` / card2의 `CardTargets`와 동일 구조:
- 라벨 row (`258:1393`): bullet 3×17 rounded-24 `#ff8521` + "사회공헌활동 특징" 18SB `#1d2623` lh 1.4 ls -0.27px
- ul 3 items (`258:1397`): 16R `#1d2623`, lh 1.5, tracking -0.16px, `list-disc ms-24`
  1. "대학의 교육 역량 활용"
  2. "지역 일자리 · 서비스 연계"
  3. "ESG 성과를 사회적 가치로 환원"

### 3.7 divider + CTA

- divider (252:1164): 600×0, SVG dasharray (card1/2는 각각 고유 색, card3는 브라운 배경 위 어떤 색일지 에셋 다운로드 후 확정 — 아마도 주황)
- CTA (252:1166): bg `#ff842d`, 좌 "자세히 보기" 20B **white** (#ffffff), 우 arrow chevron (stroke `imgIconStroke`, 흰색) 3겹

## 4. 에셋 목록 (동적 여부 검증 완료)

| # | 파일명 | Figma 노드 | type | 용도 | 동적? | 처리 |
|---|--------|-----------|------|------|-------|------|
| 1 | `city-left-rotated.png` | 252:1121 (Rectangle 18) | IMAGE-SVG (rotated) | 좌상 회전 photo tile | N (static PNG) | Framelink `download_figma_images` (baked-in composite) |
| 2 | `city-bottom-left.png` | 252:1120 (Rectangle 19) | IMAGE-SVG | 좌하 upright photo tile | N | Framelink download |
| 3 | `city-right.png` | 252:1122 (Rectangle 19) | IMAGE-SVG | 우측 upright photo tile | N | Framelink download |
| 4 | `progress-bar.svg` | 252:1126 (Frame 13, 520×20) | vector group | 헤더 타임라인 | N | Framelink download (svg) |
| 5 | `icon-description-bullet` | — | 인라인 div | description 3×16 주황 bullet | N | CSS (이미지 아님) |
| 6 | `icon-check-filled.svg` | 258:1377 (Icon, 20×20) | IMAGE-SVG | 행1 filled check | N | Framelink svg |
| 7 | `icon-check-stroke.svg` | 258:1382 / 258:1387 (동일) | IMAGE-SVG | 행2·3 stroke check | N | Framelink svg (1회만 다운로드) |
| 8 | `divider-dashed.svg` | 252:1164 (Frame 12, 600×0) | IMAGE-SVG | 카드 중간 점선 divider | N | Framelink svg |
| 9 | `arrow-chevron.svg` | 11:10987 인스턴스 (252:1169/1170/1171) | IMAGE-SVG | CTA 화살표 | N | Framelink svg (1회 다운로드 + 3회 반복 렌더) |

**캔버스 요소 수**: 3 photo + 1 progress-bar + 2 check-icon + 1 divider + 1 arrow = **8종 에셋** (파일). ul marker·bullet div·텍스트는 CSS.

**GIF/비디오 없음 → 동적 에셋 처리 불요.**

**캔버스-에셋 개수 일치**: 8종 모두 목록 반영. ✅

## 5. transform·소수점 원본 수치 (§2.4 규칙)

- 좌상 city AABB: x=0, y=18 (정수), width=**360.228120633833**, height=**392.71756613907655** — wrapper Tailwind arbitrary: `w-[360.228px] h-[392.718px] top-[18px]`
- 좌상 city 회전: `-16deg` (정수, design_context의 `-rotate-16`). baked-in이므로 CSS rotate 적용 **금지**
- 좌상 city inner native: 280.675 × 328.062 (rounded-43.2px) — baked-in wrapper 중앙에 `flex-none` 이미지로 native 크기 배치
- tracking 값 원본:
  - 36B title: `letterSpacing: '-3%'` = -1.08px @ 36px
  - 16M: `-1%` = -0.16px
  - 18SB: `-1.5%` = -0.27px
  - 20B: `-2%` = -0.4px
- lineHeight: 1.2999999788072374 (≈1.3) / 1.4 / 1.5

모든 값 소수점 원본 유지, 반올림 없음.

## 6. 색상 (§G4 gate용)

| 요소 | hex |
|------|-----|
| outer card bg | `#3b1a0c` (진한 갈색) |
| inner card bg | `#ffffff` |
| CTA bar bg | `#ff842d` (주황) |
| CTA 텍스트 | `#ffffff` |
| 본문 텍스트 | `#1d2623` (Gray 900) |
| 타이틀 accent ("사회공헌활동") | `#ff8521` |
| description bullet | `#ff842d` |
| 하단 라벨 bullet | `#ff8521` |

※ `#ff842d` (CTA·desc bullet) vs `#ff8521` (title accent·하단 bullet) **두 색 미세 차이 확인** — Figma metadata에 그대로 명시되어 있으므로 정확히 반영.

## 7. card1·card2·card3 구조 비교

| 요소 | card1 (252:1013) | card2 (252:1066) | card3 (252:1119) |
|------|-------------------|-------------------|-------------------|
| outer bg | `#0c3b0e` (녹색) | `#0C173B` (남색) | `#3b1a0c` (갈색) |
| CTA bg | `#caeb69` (연두) | `#A5D9FF` (하늘) | `#ff842d` (주황) |
| CTA 텍스트 | `#0c3b0e` 어두운 | `#0C173B` 어두운 | `#ffffff` **흰색** |
| 테마 accent | green `#4fb654` | blue `#3F9FFF`/`#2D7EFF` | orange `#ff8521`/`#ff842d` |
| progress bar | 단일 svg 520×20 | 단일 svg 520×20 | 단일 svg 520×20 (구조는 분해된 group) |
| 타이틀 | 단일색 1줄 | 단일색 1줄 | **2줄, 2째줄 orange accent span** |
| description row | ❌ 없음 | ❌ 없음 | ✅ **bullet + 16M 1줄 (신규)** |
| 체크리스트 2줄 (헤더 내부) | ✅ 2줄 | ✅ 2줄 | ❌ description row로 대체 |
| 중간 아이콘 블록 | 3행 (filled+stroke+stroke) | 3행 (icon-point 3개 동일) | 3행 (filled+stroke+stroke, card1과 동일 패턴) |
| 하단 ul 라벨 | "필수 역량" 6 items | "주요 대상" 3 items | "사회공헌활동 특징" 3 items |
| divider dashed | ✅ 600×2 | ✅ 600×2 | ✅ 600×2 |
| floating deco (좌) | leaf-top + leaf-bottom (-12/-24deg) | city-left (-16deg) | **city-top-left (-16deg) + city-bottom-left (upright)** |
| floating deco (우) | city-right (upright) | city-mid-right + city-top-right (upright) | city-right (upright) |
| 좌/우 모두 floating | ✅ | ✅ (좌 1, 우 2) | ✅ (좌 2, 우 1) |

**공통점 (공통화 근거)**:
- outer frame 616×732 + inner 600×620 구조 동일
- inner 3-block 세로 레이아웃: 헤더 / 아이콘 3행 / 라벨+ul
- divider + CTA 하단 2요소
- CTA 화살표 3겹 오버랩 패턴

**차이점 (props로 흡수 필요)**:
- 색상 5종 (outer/cta-bg/cta-text/bullet colors)
- 헤더 내부 구조 — card1/2는 "progress+title+checklist(2줄)" | card3는 "progress+title(2줄accent)+description(1줄)"
  - → `headerVariant?: 'checklist' | 'description'` 또는 `<CardHeader>`를 slot(children)으로 노출
- 중간 아이콘 블록 — card1·3는 filled/stroke/stroke 조합, card2는 동일 icon 3회
  - → `iconRows: { icon, text }[]` 배열로 통일 가능
- 하단 블록 label/items 모두 data로 주입 가능
- **decoration(부유 요소)은 섹션별 완전히 상이** → 공통 컴포넌트 밖에서 섹션 루트 자체가 관리 (children injection)

## 8. 리스크 (card3 고유)

- **R1**: 좌상 city 회전 baked-in — card1 leaf-top, card2 city-left에서 3회 실패 끝에 확립한 wrapper=AABB + inner=native 패턴 재사용. 동일 원리.
- **R2**: Framelink baseline 1406 (spec 1416 대비 −10) — card1(1404), card2(1405) 경향. clip-w=1406, clip-x 스윕 262~266.
- **R3**: 타이틀 2줄 + accent span — `<br>`·색상 span 패턴. card1/2와 달리 텍스트 구조 분기 처리 필요.
- **R4**: description row bullet color `#ff842d` vs title accent `#ff8521` — 미세 hex 차이 혼동 주의 (각각 정확히 다름).
- **R5**: CTA 텍스트 흰색 — card1/2와 반대. 공통 컴포넌트 props `ctaTextColor`로 흡수.
- **R6**: card3 중간 블록 236px 너비 (card1=236, card2=253) — 동일 공통 API 수용 가능.
- **R7**: ProgramCard 공통화 시 card1·2 리팩터에서 기존 G1 수치 유지 검증 필요 (plan §C에서 절차 명시).

## 9. 단계 1 통과 조건 자체 점검

- [x] baseline PNG Framelink 저장 완료 (1406×805 실측)
- [x] 에셋 목록 8종 + 동적 여부 확인 (모두 정적)
- [x] 캔버스-에셋 개수 일치 (8종 ↔ 8에셋)
- [x] transform·소수점 원본 기록
- [x] 색상 8종 hex 추출
- [x] card1·2·3 구조 비교표
- [x] 공통화 가능 여부 판단 (헤더 분기 포함)

→ 단계 2 (plan) 진입 준비 완료.
