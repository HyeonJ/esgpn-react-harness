# main-stats — 섹션 리서치

- Figma 노드: `26:273` (Frame 2042062941), 1920×1040
- 페이지: 메인페이지 (`/`), 캔버스 좌표 (0, 2080)
- Baseline: `figma-screenshots/main-stats.png` (1920×1040, pngScale 1) — 확보 완료
- 데이터 소스: 공식 `get_metadata` + `get_design_context` + `get_variable_defs`

---

## 1. 섹션 개요 (실제 디자인)

**좌측**: 헤딩 "ESG가 왜 중요할까?" + 본문 2줄 + stat 4개(97%/85%/70%/2028) 가로 배치 + 좌단 페이지 인디케이터 점 2개.
**우측**: ESG 3원(Environmental/Social/Governance) 겹치는 원 + "WHY?" pill + 설명 3컬럼(자본시장/소비/법적) + 원과 설명을 잇는 6개 connector line.
**BG**: 화이트 (root frame fill 없음).

**리스크 메모와의 차이 (정정)**:
| 메모 | 실제 |
|------|------|
| "4개 stat 97%/85%/70%/2028" | 정확. `29:381`/`29:380`/`29:379`/`29:378` 가로 flex gap 32 |
| "ESG 3원 다이어그램" | 정확. 200×200 원 3개를 `mr-[-12px]`로 12px 겹치게 배치. 각 원은 brand-500 투명도 0.16/0.28/0.4 (E/S/G) 계단식 |
| "WHY? 노드" | `29:330` 98.145×44 그린 pill, 텍스트 "WHY?" 20B white. inline-grid 3번째 셀로 `ml-[289.43px] mt-[280px]` |
| "6개 connector" | **Figma `<connector>` 노드 6개** (SVG가 아닌 네이티브 커넥터). vector가 metadata에 포함되지만 design_context엔 렌더 코드 없음 → inline SVG로 재구성 필요. w=0인 수직선 2개, w>0인 꺾은선 4개 |

---

## 2. 컴포넌트 구조 (Figma DOM 그대로)

```
26:273 Frame 2042062941 (1920×1040, root, white BG)
└─ flex gap-[63px] items-center px-[252px] py-[200px]  (좌 716 + gap 63 + 우 678, 1920 풀폭)
   ├─ 26:274 좌측 컬럼 (675×437, x=252 y=301.5)
   │  flex gap-[72px] items-start
   │  ├─ 26:275 인디케이터 (24×437) — col flex, gap-16
   │  │  ├─ 26:277 Ellipse 2 (6×6, y=199.5 안의 중앙)
   │  │  └─ 26:276 Ellipse 1 (16×16, y=221.5) ※baseline 순서는 Ellipse1 위 Ellipse2 아래 아님 — Figma는 small(6) 위, large(16) 아래
   │  └─ 26:279 텍스트+stat 컬럼 (579×437, ml=96)
   │     flex col gap-[112px]
   │     ├─ 26:280 헤딩 블록 (579×213) gap-24
   │     │  ├─ 26:281 헤딩 그룹 (579×141) gap-8
   │     │  │  ├─ 26:282 "ESG가 왜 중요할까?" (112×21, 14R, #97a29e, tracking -0.07)
   │     │  │  └─ 26:283 "단순한 트렌드를 넘어, <br> 모두의 새로운 생존 문법" (579×112, 48B, #1d2623, lh 56px)
   │     │  └─ 26:284 본문 "이제 ESG는 기업의 성적표가 아닙니다. 우리가 살아가는<br>사회와 지구를 지키기 위한 가장 현실적인 행동 지침이자 약속입니다." (579×48, 16R, #1d2623, tracking -0.16)
   │     └─ 29:382 stat 4개 (494×112, y=325)
   │        flex gap-[32px] items-center
   │        ├─ 29:381 "97%" + "ESG를 고려하는<br>글로벌 투자자" (94×112)
   │        ├─ 29:380 "85%" + "ESG를 중시하는 소비자" (94×112)
   │        ├─ 29:379 "70%" + "구직자<br>기업 ESG 확인" (94×112)
   │        └─ 29:378 "2028" + "ESG 공시<br>의무화 시작" (116×112, % 없음)
│
└─ 29:351 Group 10 우측 (678×535, x=990 y=252.5)
   inline-grid place-items-start leading-[0]
   ├─ (cell row-1 col-1) 29:299 ESG 3원 (576×200, ml=51 mt=0)
   │  flex items-center pr-[12px] — 각 원은 mr-[-12px]로 오버랩
   │  ├─ 29:300 E원 (200×200, bg rgba(79,182,84,0.16), rounded-full)
   │  │  └─ 29:301 내부 gap-5 items-center
   │  │     ├─ 29:302 "Environmental" (156×34, 24B, #1d2623, tracking -0.6)
   │  │     └─ 29:303 "환경" (156×27, 18R, text-center, tracking -0.27)
   │  ├─ 29:304 S원 (200×200, bg rgba(79,182,84,0.28))
   │  │  └─ "Social" / "사회"
   │  └─ 29:308 G원 (200×200, bg rgba(79,182,84,0.4))
   │     └─ "Governance" / "지배구조"
   ├─ (cell row-1 col-1) 29:312 설명 3컬럼 (678×131, ml=0 mt=404)
   │  flex gap-[16px] items-start
   │  ├─ 29:313 "자본시장의 필수 요건" (215×131, 20B + 14R 3줄)
   │  ├─ 29:316 "소비 트렌드의 변화" (215×131)
   │  └─ 29:319 "법적 공시 의무화" (215×131)
   ├─ (cell row-1 col-1) 29:330 WHY? pill (98.145×44, ml=289.43 mt=280)
   │  bg-brand-500, rounded-full, px-20 py-8
   │  └─ 29:329 "WHY?" (58×28, 20B, white)
   └─ (connector 6개는 inline-grid의 자식이 아니라 29:351 Group 10 자식이지만 design_context에 미노출 → inline SVG로 별도 레이어)
```

> **inline-grid place-items-start**: 3원, 설명 3컬럼, WHY? pill이 모두 동일 셀(row-1/col-1)에 겹쳐있고 ml/mt로 오프셋. 캔버스 절대 좌표로 풀면 명확함 (아래 §5).

---

## 3. 토큰 (변경/신규)

| Figma 토큰 | 값 | tokens.css 매핑 |
|-----------|-----|------------------|
| Gray Scale/Gray 900 | `#1d2623` | `--color-gray-900` ✅ |
| Gray Scale/Gray 500 | `#97a29e` | `--color-gray-500` ✅ |
| Gray Scale/Gray 000 | `#ffffff` | `--color-gray-000` ✅ |
| Brand/Brand 500 | `#4fb654` | `--color-brand-500` ✅ |
| Brand/Brand 700 | `#0c3b0e` | `--color-brand-700` ✅ (connector 색 후보, baseline에서 다크 그린 확인됨) |
| Text-sm/14R | Pretendard Regular 14 / lh 1.5 / ls -0.5 → **CSS -0.07px** | (arbitrary) |
| Text-base/16R | Pretendard Regular 16 / lh 1.5 / ls -1 → **CSS -0.16px** | |
| Text-lg/18R | Pretendard Regular 18 / lh 1.5 / ls -1.5 → **CSS -0.27px** | (ESG 3원 내부 한글 "환경" 등) |
| Text-xl/20B | Pretendard Bold 20 / lh 1.4 / ls -2 → **-0.4px** | (설명 타이틀, WHY?) |
| Text-2xl/24B | Pretendard Bold 24 / lh 1.4 / ls -2.5 → **-0.6px** | (Environmental 등) |
| Text-3xl/32B | Pretendard Bold 32 / lh 1.3 / ls -3 → **-0.96px** | (stat 숫자 부모 tracking, `text-[0px]` 트릭과 함께) |
| P/display/01 48 B | Pretendard Bold 48 / lh 56px / ls 0 | (헤딩 + stat 숫자) |
| border-radius/full | 9999 | `rounded-full` |
| spacing/2 | 8 | `--space-2` / `gap-2` |
| spacing/4 | 16 | `--space-4` / `gap-4` |
| spacing/5 | 20 | `--space-5` / `gap-5` |

**신규 토큰 추가 불필요.**

> **letter-spacing 단위 함정 (main-intro 교훈)**: Figma 토큰 `letterSpacing: -0.5`는 **percent** (14px × -0.5% = -0.07px). `get_design_context`가 이미 `tracking-[-0.07px]` 등 올바르게 변환해준 값을 **그대로 사용**하고 토큰의 원시 숫자를 쓰지 않는다.

### design_context의 tracking 값 (채택)
- 14px → `tracking-[-0.07px]`
- 16px → `tracking-[-0.16px]`
- 18px → `tracking-[-0.27px]` (0.18 × -1.5% = -0.27)
- 20px → `tracking-[-0.4px]`
- 24px → `tracking-[-0.6px]`
- 48px → `tracking-[-1.92px]` (48 × -4%) — **주의: 토큰은 ls 0인데 design_context는 -1.92px**. 이유: stat 숫자 `text-[0px]` 부모에 `tracking-[-0.96px]` + 자식 `text-[48px]` span에 `tracking-[-1.92px]`로 override. 부모 이유는 아래 §4.
- 48B 헤딩(`26:283`): tracking 없음 (0), lh 56px 고정

### stat 숫자 `text-[0px]` 트릭 해석
`29:355` "97%": 부모 p가 `text-[0px] tracking-[-0.96px]` (0 px에서 96/100 = -0.96px ≈ 32px × -3% = -0.96px이니 실은 Text-3xl/32B 토큰을 따름). 자식 span "97"은 `text-[48px] tracking-[-1.92px]`, 자식 span "%"는 `text-[14px] tracking-[-0.07px] font-regular`.

→ 숫자 48Bold와 단위 14Regular을 한 줄 baseline에 inline 배치하면서 부모 p는 빈 공간 줄이기 위해 `text-[0px]`로 둔 Figma 패턴. **그대로 복제한다.**

---

## 4. 에셋 목록 + 동적/정적 판정

design_context에 등장하는 image 상수는 **딱 2개** (좌측 인디케이터 2원):

| # | 변수명 | 노드 ID | 타입 | 인스턴스 수 | 동적 여부 | 처리 방식 | 파일명 |
|---|--------|---------|------|-------------|-----------|-----------|---------|
| 1 | imgEllipse2 | `26:277` | ELLIPSE 6×6 | 1 | 정적 | **CSS div 대체** (main-intro 교훈 R7과 동일) | 없음 |
| 2 | imgEllipse1 | `26:276` | ELLIPSE 16×16 | 1 | 정적 | **CSS div 대체** | 없음 |

**connector 6개 (`29:347`, `29:343`, `29:339`, `29:335`, `29:331`, `29:324`)**: Figma `<connector>` 네이티브 타입. design_context에 코드 없음. metadata에서 bbox만 알 수 있음. **inline SVG로 재구성** (꺾은선 path). 색상은 baseline에서 채취 → 예상 #0c3b0e (brand-700) 또는 #1d2623 (gray-900).

**캔버스-에셋 일치 검증**:
- design_context 이미지 변수: 2개 (Ellipse1/Ellipse2)
- 캔버스 IMAGE/ELLIPSE 인스턴스: 2개 (동일)
- connector: metadata에만 등장, 코드/이미지 asset 아님 → inline SVG로 처리
- **다운로드 필요 에셋: 0개** (둘 다 CSS div로 처리, connector inline SVG로 재구성)

→ **일치 ✅** (불일치 없음)

### connector 6개 각각 방향·flip 여부 (metadata 기준)

metadata `<connector id="..." x="..." y="..." width="..." height="...">` 기준 (root 26:273 좌표계):

| # | Node ID | x (root) | y (root) | width | height | 방향 해석 | 연결 추정 |
|---|---------|----------|----------|-------|--------|-----------|-----------|
| 1 | 29:324 | 1141 | 455.75 | 187.50 | 73.5 | ㄱ자 (왼쪽-아래→오른쪽-위) | WHY? 위쪽 중앙 → E원 아래 (x=1141은 E원(x=1041, w=200) 중앙) |
| 2 | 29:331 | 1328.5 | 455.75 | 0 | 73.5 | 수직 세로선 (위↓아래) | WHY? 위 → S원 아래 (x=1328.5는 S원(x=1229, w=200) 중앙) |
| 3 | 29:335 | 1328.5 | 455.75 | 188.5 | 73.5 | ㄴ자 (왼쪽-위→오른쪽-아래)... 아니 정확히는 WHY? 중앙(x=1328.5)에서 G원 중앙(x=1517)으로 | WHY? → G원 (x=1517은 G원(x=1417, w=200) 중앙) |
| 4 | 29:339 | 1328.5 | 579.75 | 231.0 | 73.5 | WHY? 아래에서 법적 공시(x=1559.5 중앙? — 29:319 x=1452+215/2=1559.5) | WHY? → 법적(3번 설명) |
| 5 | 29:343 | 1328.5 | 579.75 | 0 | 73.5 | 수직 세로선 | WHY? 아래 → 소비(2번 설명, 29:316 x=1221+107.5=1328.5 중앙) |
| 6 | 29:347 | 1097.5 | 579.75 | 231.0 | 73.5 | WHY?→자본시장(1번, 29:313 x=990+107.5=1097.5) | WHY? → 자본시장 |

**flip/scale 반전 없음** (Figma 네이티브 connector는 position + end 좌표로 그려짐). **baseline에서 화살표 머리 방향 육안 확인 필요**:
- baseline 이미지상: 원에서 WHY?로 향하는 화살표(↓)+ WHY?에서 설명박스로 향하는 화살표(↓)? 또는 WHY?가 중심 질문이므로 원들이 WHY?를 **유발**하고 WHY?가 설명으로 **귀결**하는 흐름일 가능성
- main-intro 교훈: **SVG flip transform 금지**. inline SVG path는 원본 좌표대로 그린다.

**connector 좌표 기하 분석 (선 그리기용)**:
- `29:324` (WHY?→E원): start (1141+187.5, 455.75+73.5) = (1328.5, 529.25) ≈ WHY? 상단 중앙 | end (1141, 455.75) ≈ E원 하단 중앙 → **왼쪽-위로 꺾이는 ㄱ자** (수평→수직)
- `29:331` (WHY?→S원): x=1328.5 w=0 → 순수 수직선, y 455.75~529.25
- `29:335` (WHY?→G원): start (1328.5, 529.25) → end (1517, 455.75) → **오른쪽-위로 꺾이는 ㄴ자**
- `29:339` (WHY?→법적): start (1328.5, 579.75) → end (1559.5, 653.25) → **오른쪽-아래로 꺾이는**
- `29:343` (WHY?→소비): x=1328.5 w=0 → 순수 수직선 아래로
- `29:347` (WHY?→자본시장): start (1328.5, 579.75) → end (1097.5, 653.25) → **왼쪽-아래로 꺾이는**

→ 6개 모두 WHY? 중심에서 방사형. 위 3개는 ESG 원으로, 아래 3개는 설명 박스로.

> **구현 시 inline SVG로 꺾은선(polyline) 그리기**: 수직선은 `<line>` 또는 `<path d="M x1,y1 V y2">`, 꺾은선은 `<path d="M x1,y1 V midY H x2 V y2">` (수직→수평→수직 ㄷ자 패턴). 선 끝 화살표 머리는 baseline에서 존재 여부 확인 후 결정.

---

## 5. 정밀 수치 (소수점 보존, §2.4)

### 좌측 컬럼 (`26:274`) 캔버스 좌표
- bbox: x=252 y=301.5 w=675 h=437
- 내부 레이아웃: flex gap 72 items-start
  - 인디케이터 (24×437): x=252 y=301.5
  - 텍스트 컬럼 (579×437): x=252+24+72=348 y=301.5

### 인디케이터 점 (`26:275` 내부)
- Ellipse 2 (6×6): `26:277` x=252+9=261 y=301.5+199.5=501 ~ 507
- Ellipse 1 (16×16): `26:276` x=252+4=256 y=301.5+221.5=523 ~ 539
- 두 점 간 간격: Ellipse2 끝 y=507, Ellipse1 시작 y=523 → gap 16 (토큰 --space-4)
- 색: baseline 채취 필요. main-intro와 일관성 위해 `#c6cdcc` (gray-300) 예상

### 헤딩 (`26:280`)
- 헤딩 블록 x=348 y=301.5 w=579 h=213
- gap 24 내부
- "ESG가 왜 중요할까?" (`26:282`): 14R, #97a29e, ls -0.07px, whitespace-nowrap
- "단순한 트렌드를 넘어, <br> 모두의 새로운 생존 문법" (`26:283`): 48B, #1d2623, lh 56px, 2줄 → h=112
- 본문 (`26:284`): "이제 ESG는 기업의 성적표가 아닙니다. 우리가 살아가는<br>사회와 지구를 지키기 위한 가장 현실적인 행동 지침이자 약속입니다." 16R, #1d2623, ls -0.16px, 2줄 lh 1.5 → h=48

### Stat 4개 (`29:382`)
- 그룹 bbox: x=348 y=301.5+325=626.5 w=494 h=112
- flex gap 32 items-center

| Stat | Node | x (그룹기준) | w | h | 숫자 + 단위 | 부제 |
|------|------|--------------|---|---|-------------|------|
| 1 | 29:381 | 0 | 94 | 112 | "97" 48B + "%" 14R | "ESG를 고려하는 <br>글로벌 투자자" 14R gray-500 |
| 2 | 29:380 | 126 | 94 | 112 | "85" 48B + "%" 14R | "ESG를 중시하는 소비자" 14R gray-500 (1줄) |
| 3 | 29:379 | 252 | 94 | 112 | "70" 48B + "%" 14R | "구직자<br>기업 ESG 확인" 14R gray-500 |
| 4 | 29:378 | 378 | 116 | 112 | "2028" 48B | "ESG 공시<br>의무화 시작" 14R gray-500 |

> 폭 차이: stat 1/2/3은 94 고정, stat 4(2028)는 116. 2028은 % 단위 없이 연도. 숫자 fs 48이 4자리라 넓음.
> 내부: col flex gap-8 items-start (`justify-center` 있으나 stat은 fixed h=112 → 센터 정렬).
> 숫자 p 트릭: `text-[0px] tracking-[-0.96px]` 부모 + 숫자 span `text-[48px]` + 단위 span `text-[14px]`. stat 4(2028)만 단위 없어 단순 `text-[48px] tracking-[-1.92px]`.

### 우측 그룹 (`29:351`, Group 10)
- bbox: x=990 y=252.5 w=678 h=535
- inline-grid place-items-start leading-[0] (모든 자식이 row-1/col-1 셀에 겹침)

자식 4개 각각 `ml/mt` 로 셀 내부 오프셋. 캔버스 절대 좌표로 풀면:

| 자식 | Node | ml | mt | w | h | 캔버스 x | 캔버스 y |
|------|------|-----|-----|---|---|----------|----------|
| ESG 3원 묶음 | 29:299 | 51 | 0 | 576 | 200 | 1041 | 252.5 |
| 설명 3컬럼 | 29:312 | 0 | 404 | 678 | 131 | 990 | 656.5 |
| WHY? pill | 29:330 | 289.43 | 280 | 98.145 | 44 | 1279.43 | 532.5 |

**ESG 3원 내부** (29:299 w=576 h=200, flex items-center pr-[12px]):
- E원 (29:300): ml=0 내부, 200×200, mr=-12
  - 캔버스 x=1041 y=252.5, bg `rgba(79,182,84,0.16)`
- S원 (29:304): 200×200 (실제 visible w는 188 due to overlap), mr=-12
  - 캔버스 x=1041+200-12=1229 y=252.5, bg `rgba(79,182,84,0.28)`
- G원 (29:308): 200×200 (실제 visible w=188), mr=-12
  - 캔버스 x=1229+200-12=1417 y=252.5, bg `rgba(79,182,84,0.4)`
- pr-[12px]는 부모 컨테이너에 12px 우측 padding → 묶음 total w = 200 + 188 + 188 = 576 ✅

**ESG 원 텍스트 중앙 정렬**:
- 각 원 내부 flex col items-center justify-center, pt-8
- `29:301` (E): "Environmental" 24B (156×34) + "환경" 18R (156×27), gap 5, text color #1d2623
  - Environmental은 한 단어로 whitespace-nowrap (폭 156 계산됨)
- `29:305` (S): "Social" 24B (66×34) + "사회" 18R (66×27)
- `29:309` (G): "Governance" 24B (132×34) + "지배구조" 18R (132×27)

**WHY? pill** (`29:330`, 98.145×44):
- 캔버스 x=1279.43 y=532.5
- bg brand-500 (#4fb654), rounded-full, px-20 py-8
- 텍스트 "WHY?" 20B white, tracking -0.4px, lh 1.4

**설명 3컬럼** (`29:312` 678×131, 캔버스 x=990 y=656.5):
- flex gap 16 items-start, color #1d2623 text-center w-678
- 각 열 215×131: pb-8 pt-16 gap-4
  - 타이틀 20B, tracking -0.4, w-full
  - 본문 14R, tracking -0.07, w-full, 3줄 (br 2개 강제)

| 설명 | Node | x (그룹기준) | 캔버스 x | 타이틀 | 본문 (3줄) |
|------|------|--------------|----------|--------|------------|
| 자본시장 | 29:313 | 0 | 990 | "자본시장의 필수 요건" | "이제 ESG는 투자자의 의사결정 시<br>기업 가치에 영향을 미치는<br>핵심 비재무적 요소입니다." |
| 소비 트렌드 | 29:316 | 231 | 1221 | "소비 트렌드의 변화" | "소비자들은 세상에 유익을 주는<br>기업을 응원하며, 가치 소비가<br>확산되고 있습니다." |
| 법적 공시 | 29:319 | 462 | 1452 | "법적 공시 의무화" | "2030년부터 모든 코스피 상장사는<br>ESG 정보를 의무적으로 공시해야<br>하는 규제 환경에 직면해 있습니다." |

### Connector 6개 (29:351 그룹 기준 + 캔버스)

| # | Node | 캔버스 x | 캔버스 y | w | h | 그룹 상대 (x-990, y-252.5) |
|---|------|----------|----------|---|---|-----------------------------|
| 1 | 29:324 | 1141 | 455.75 | 187.50084 | 73.5 | (151, 203.25) |
| 2 | 29:331 | 1328.5 | 455.75 | 0 | 73.5 | (338.5, 203.25) |
| 3 | 29:335 | 1328.5 | 455.75 | 188.49916 | 73.5 | (338.5, 203.25) |
| 4 | 29:339 | 1328.5 | 579.75 | 230.99916 | 73.5 | (338.5, 327.25) |
| 5 | 29:343 | 1328.5 | 579.75 | 0 | 73.5 | (338.5, 327.25) |
| 6 | 29:347 | 1097.5 | 579.75 | 231.00084 | 73.5 | (107.5, 327.25) |

> 좌표계 정밀도: design_context에 `width: 231.00083923339844` 등 소수점 10자리 정밀. **Tailwind arbitrary에 `w-[231.00083923339844px]`로 그대로 기록하거나, inline SVG viewBox에 반영**. 그러나 시각적 차이는 육안으로 불가 → 구현 시 `w-[231.00084px]` (소수점 5자리 유지) 정도로 라운드.

---

## 6. 폰트 / 글꼴

- **Pretendard Variable** 단일 패밀리. weight Regular(400)/Bold(700) 사용.
- 신규 폰트 도입 없음. ✅ (main-intro와 동일)

---

## 7. StatItem 공통화 평가 (Rule of Three)

**사용 내역**:
- main-stats: 4회 (이번 섹션)
- main-hero: 0회
- main-intro: 0회
- 경진대회 페이지 (`/contest`): 사전 추정 시 "1,500+ / 이론부터 실행 / 100%" 3개 stat 있음 (docs/figma-project-context.md §4.4)
- 자격검정 페이지 (`/certification`): "1,500+ / 이론부터 실행 / 600+" 3개 stat 있음 (§4.5)

**총 예상 사용**: 4 + 3 + 3 = **10회** (3개 페이지)

**골격 일관성 예상**:
- 숫자 48B + 단위(% 또는 +) 14R
- 부제 14R gray-500 (1~2줄)
- col flex gap-8 items-start
- width 94 (단위 있는 경우) or auto

**결정**: **공통 컴포넌트로 승격** (`src/components/ui/StatItem.tsx` 신설, Rule of Three 명백히 충족).

그러나 **이 세션 이번 워커의 실제 작업**에선 세 가지 시나리오 고민:
| 옵션 | 장점 | 단점 |
|------|------|------|
| A) 지금 StatItem 공통화 | Rule of Three 충족, 추후 페이지 작업 단순화 | 스펙이 경진대회/자격검정 페이지 디자인 미확인. API 추측 기반 → 나중 재설계 가능성 |
| B) 로컬 유지 (main-stats 전용) | 안전. main-stats만 고려. | 경진대회/자격검정 작업 시 또 만들기 |
| C) 페이지 로컬 컴포넌트 + 다음 페이지 작업 시 공통화 | 현재 스펙 기반 구현 + Rule of Three 완전 증명 후 공통화 | 다음 섹션 워커가 공통화 필요 |

**권장: 옵션 B → C 경로** — main-stats 안에서 `StatItem` 로컬 컴포넌트로 구현하고, 경진대회 페이지 작업 시점에 공통화 리팩토링. 사유: (1) 경진대회 stat의 실제 Figma 구조 미확인 상태에서 공통 API 결정은 위험, (2) main-intro처럼 의도적으로 공통화 보류한 선례 존재 (D7), (3) Rule of Three의 정확한 해석은 "세 번째 사용 **시점**에 공통화" — 지금은 첫 번째 사용이다.

→ 단계 2에서 **로컬 StatItem으로 결정**. 플랜의 D항목에 명시.

---

## 8. 리스크 (단계 2에서 대응)

| # | 리스크 | 영향 | 대응 방향 |
|---|--------|------|-----------|
| R1 | connector 6개 inline SVG 재구성 — Figma 네이티브 connector는 path 직접 제공하지 않음 | G1 시각, G2 위치 | 각 connector의 (x, y, w, h) + 방향 분석으로 `<path d="M...">` 수동 작성. 수직선 2개(w=0)는 `<line>`. 꺾은선 4개는 ㄱ/ㄴ자 `<path>`. 선 색/stroke-width는 baseline 채취. 선 끝 화살표 머리 여부도 baseline 확인. |
| R2 | connector 화살표 머리 방향 (육안 semantic 검증 대상) | G1 semantic | baseline 이미지상 WHY? 중심부 방사형이지만 "원→WHY?→설명" 플로우인지 "WHY?→원" 플로우인지 확인 필요. Read 도구로 baseline 픽셀 확인. |
| R3 | ESG 3원 overlap 순서 (z-index) | G1 | flex 순서대로 E → S → G. 뒤에 오는 자식이 CSS 기본상 뒤 레이어. mr-[-12] 음수 마진으로 12px 오버랩. 오버랩 영역은 두 알파 합성(0.16+0.28=0.44; 0.28+0.4=0.68) → baseline 확인. |
| R4 | WHY? pill이 3원과 설명박스 사이 중앙에 떠있음 (mt=280, 3원 h=200 end=200, 설명 start=404 → pill이 y=280~324, 3원과 설명 사이 공백 80~324에 중앙 배치) | G2 위치 | inline-grid ml/mt 그대로 재현. Tailwind `ml-[289.43px] mt-[280px]`. |
| R5 | stat 숫자 `text-[0px]` 트릭의 baseline 정렬 | G1 숫자 위치 | design_context 그대로 복제. `text-[0px]` 부모 p에 48 span + 14 span 배치 시 baseline은 48 기준. 테스트 시 숫자 top 좌표가 Figma 62 h와 일치하는지 측정. |
| R6 | ESG 3원 알파 투명도 HTML 재현 시 white BG 위에서만 정확 | G4 색상 | section root `bg-white` 필수. body/html도 white 필수. `rgba(79,182,84,0.16)` 등 그대로 사용. |
| R7 | connector 색상 baseline 채취 필요 | G4 | baseline 이미지에서 connector 픽셀 색 읽기. 후보: #0c3b0e (brand-700), #1d2623 (gray-900), 혹은 더 연한 회색. |
| R8 | inline-grid + leading-[0] 조합 — Group 10 자식 4개 모두 같은 셀 | G1 오버랩 | design_context 구조 그대로 복제. `place-items-start`가 각 자식의 자체 정렬 무시하고 top-left 원점에서 ml/mt 오프셋 적용. |
| R9 | connector SVG viewBox/크기 — w=0 (수직선)일 때 브라우저 렌더 이슈 | G3 | w=0 SVG는 1px width 컨테이너 + vertical `<line>`로 처리 (또는 div with `border-left`). |
| R10 | 풀폭 1920 섹션 — 좌측 252 컨텐츠 + gap 63 + 우측 컨텐츠. 우측 끝 x=1668 (=990+678) + root pr-252 → 1920 OK. 검증됨. | G2 | px-[252px] py-[200px] + gap-[63px] root 유지. |

---

## 9. 캔버스 좌표 (G5 측정용)

main-stats는 **풀폭** 섹션. compare-section.sh 표준 사용:
- 캔버스 (절대) x=0 y=2080 w=1920 h=1040
- baseline `figma-screenshots/main-stats.png`은 단일 섹션 export (1920×1040)
- preview 라우트 `/__preview/main-stats` (Header 없음)에서 1920×1040 viewport 캡처

clip 인자 불필요 (전체 비교).

---

## 10. 단계 1 통과 체크

- [x] Figma 메타 (get_metadata) — frame 구조·connector 6개 bbox 확보
- [x] 디자인 컨텍스트 (get_design_context) — 텍스트·배치·tracking 값 확보
- [x] 토큰 검사 (get_variable_defs) — 신규 0, 모두 tokens.css 존재
- [x] 에셋 목록 (**다운로드 0개**, 모두 CSS div 또는 inline SVG)
- [x] 동적 여부 확정 (전부 정적, 애초에 raster 없음)
- [x] 캔버스-에셋 일치 검증 (design_context 2 이미지 = metadata 2 ellipse, 둘 다 CSS div 대체)
- [x] connector 6개 각 방향·좌표 기록 (w=0 수직 2개 + 꺾은선 4개, flip 없음)
- [x] transform 요소: **회전·scale 변형 없음**. inline-grid ml/mt 오프셋만.
- [x] StatItem 공통화 평가 (로컬 유지, 경진대회 작업 시 공통화)
- [x] 리스크 R1~R10 식별
- [x] 캔버스 좌표 (풀폭, clip 미사용)

→ **단계 2 진입.**
