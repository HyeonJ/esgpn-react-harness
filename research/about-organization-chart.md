# research/about-organization-chart.md — About 조직도 페이지 조직도 트리 섹션

> Phase 3 단계 1. 페이지 `/about/organization` 3번째 섹션 (핵심 공수).
> 상위 page research: `research/about-organization.md`. 전략 [A] 완전 HTML 재구성 (박스·연결선 포함).
> 공통 규칙: `CLAUDE.md` / `docs/section-implementation.md` §2.4 / §2.5 / §2.6 / §6.1 / §6.4.

## 1. Figma 노드 재조사

`89:1295` flatten 단일 프레임 (§research/about-organization.md §1). design_context·variable_defs 호출 의미 없음. 스펙은 **baseline PNG crop + 픽셀 행/열 스캔**으로 확보.

## 2. 베이스라인 crop + 행/열 스캔 실측

### 2.1 source / target
- source: `figma-screenshots/about-organization-full.png` (1920×2019, 8-bit RGBA)
- target: **`figma-screenshots/about-organization-chart.png` — 1920×390, 8-bit RGBA (생성 완료)**
- crop box: `(0, 490, 1920, 880)` — height 390 px (logos 섹션 끝 직후 ~ panorama 섹션 직전 안전 bottom padding 포함)

### 2.2 세로 경계 확정 (full.png y축 기준)

| y (full) | 요소 |
|----------|------|
| 490~504 | HatchedDivider "설립 구조" (solid line @ y=496~497 single row, 4자 텍스트 중앙) |
| 505~539 | 공백 35 px (divider → Tier2 gap) |
| 540~589 | **Tier 2 행** (h=50) — 3 박스 horizontal row |
| 590~650 | 수직 **connector** 2개 (x=959~960, x=1277~1278, h=61) |
| 651~653 | connector 끝 작은 원형 dot (지름 ~5 px, cx=960 / 1278) |
| 654~710 | **Tier 3 Row 1** (h=57) — 2 박스 |
| 711~729 | 공백 gap 19 px (Tier3 박스 간 세로 여백) |
| 730~786 | **Tier 3 Row 2** (h=57) — 2 박스 |
| 787~805 | 공백 gap 19 px |
| 806~862 | **Tier 3 Row 3** (h=57) — 2 박스 |
| 863~879 | 공백 bottom padding 17 px |
| 880+ | panorama 섹션 나무/빌딩 시작 |

- **y-start = 490**, **y-end = 880** (panorama 시작 직전), height = **390 px** ✓
- **섹션 내부 좌표** (baseline chart.png 0-기준) — 아래 §3부터 내부 좌표 사용

### 2.3 섹션 내부 좌표 환산 (baseline chart.png 0,0 기준)

| 요소 | full.png y | chart.png y (내부) |
|------|-----------|---------------------|
| divider 상단 해치 | 490 | **0** |
| divider solid line | 496~497 | 6~7 |
| Tier 2 박스 | 540~589 | **50~99** (h=50) |
| connector 수직선 | 590~650 | 100~160 (h=61) |
| connector dot | 651~653 | 161~163 |
| Tier 3 Row 1 | 654~710 | **164~220** (h=57) |
| Tier 3 Row 2 | 730~786 | **240~296** |
| Tier 3 Row 3 | 806~862 | **316~372** |

## 3. 시각 요소 상세 (열 스캔 + 색상 샘플)

### 3.1 HatchedDivider "설립 구조" (내부 y=0~14)

열 스캔 결과 (full.png y=490~505 기준):

| 요소 | x 범위 | width | 비고 |
|------|--------|-------|------|
| 왼쪽 해치 `//////` | 492~527 | 36 | gray hatched pattern |
| 왼쪽 solid line | ~535~925 | ~390 | y=496~497, 약 1.5 px |
| 텍스트 "설립 구조" | 932~987 | 55 | 4자 (한글 2자 + space + 한글 2자), center x=960 |
| 오른쪽 solid line | ~995~1385 | ~390 | 대칭 |
| 오른쪽 해치 | 1392~1427 | 36 | 대칭 |

- 총 divider 가시 폭: x=492~1427 (w=936), center x=960 (페이지 정중앙) ✓
- **공통 컴포넌트 `HatchedDivider`** (label="설립 구조") 재사용 — logos 섹션에서 확장된 `label?` prop 그대로 사용. 기존 width 932px 대비 실측 936px 차이 4px 이내 (logos "운영주체" 측정치 938과 동일 계열, hatched 길이 변동 없음. label 텍스트 길이에 따른 line span 자동 조정).

### 3.2 Tier 2 행 (내부 y=50~99)

3개 박스 horizontal 배치 (열 스캔 확정):

| # | 이름 | x (full) | w | 스타일 |
|---|------|----------|---|--------|
| 1 | **COLIVE, ESG마인드 자격검정** | 491~792 | 302 | 녹색 pill, fill `#4FB654` (79,182,84), **TL radius ~11 px** (대각 기울기 판정), text white |
| 2 | **ESG실천 아이디어 경진대회** | 809~1110 | 302 | 검정그린 rounded rect, fill `#0C3B0E` (12,59,14), **TL radius ~10 px**, text white |
| 3 | **사회공헌활동** | 1127~1428 | 302 | 박스 #2와 동일 스타일 `#0C3B0E` |

- 각 박스 높이 50 px, 박스 간 gap = 17 px (792→809, 1110→1127)
- **특이점**: Tier 2 첫 번째 "COLIVE" 박스는 **녹색 pill이며 트리와 무관한 standalone** (아래로 connector 없음). 오직 가운데(ESG실천)와 오른쪽(사회공헌활동) 2개만 Tier 3 parent로 기능.
- COLIVE 박스의 radius(~11 px)가 ESG 박스(~10 px)보다 살짝 큼 → pill-shape 강조. 단 실측 차이 미세 → 단일 CSS `rounded-[10px]` 통일도 허용 (plan 결정).

### 3.3 Tier 2 → Tier 3 Connectors (내부 y=100~163)

- **수직선 2개**:
  - Line A: x=**959~960** (w=2 px), y=590~650 full → 내부 100~160 (h=61)
  - Line B: x=**1277~1278** (w=2 px), 동일 h
- **끝 dot**: 원형, cx=960/1278, y=651~654 (지름 ~5~6 px) — 어두운 녹색/검정 톤
- 색상 추정: 검정그린 `#0C3B0E` 계열 (Tier 2 parent 박스 색과 동일)
- **SVG 재구성** 권장 (CSS div + border-radius로도 가능하나 dot 정확도 SVG 우세)

### 3.4 Tier 3 박스 (내부 y=164~220, 240~296, 316~372)

6개 박스 전부 동일 스타일:

| 스펙 | 값 |
|------|-----|
| 배경 | `#EFF0F0` (239,240,240) 라이트 그레이 |
| 텍스트 | `#1D2623` (29,38,35) Gray 900 |
| 크기 | 302 × 57 (Tier 2와 동일 폭, 7 px 더 큰 높이) |
| 코너 radius | ~6 px (대각선 6단계) |
| 위치 | col1 x=809~1110, col2 x=1127~1428 (Tier 2 박스 #2, #3과 정확히 수직 정렬) |
| 행 간격 | 19 px gap (row 끝 ~ 다음 row 시작) |

텍스트 내용 (baseline 육안 + 선행 crop 판독):

| 행 | col1 (ESG실천 아이디어 경진대회 하위) | col2 (사회공헌활동 하위) |
|----|---------------------------------------|--------------------------|
| Row 1 | ESG 대학생 부문 | ESG 실천 캠페인 |
| Row 2 | 기업 실전사례 부문 | 봉사활동(프로보노) |
| Row 3 | 지역사회 부문 | 기업 협력 |

### 3.5 캔버스-에셋 개수 일치 검증

| 항목 | 개수 |
|------|------|
| Canvas 박스 요소 | 9 (Tier2 × 3 + Tier3 × 6) |
| Canvas connector | 2 (수직선 + 끝 dot 포함) |
| raster asset 다운로드 대상 | **0** (전부 HTML/CSS 재구성 — 색/폰트/radius 단순) |
| HTML/CSS/SVG 재구성 | HatchedDivider(1), 박스(9), connector SVG(1) |

**0 raster = 0 다운로드** (일치 ✓). 박스들이 순수 CSS로 재현 가능한 단색 + 단일 radius + 한글 텍스트라 raster crop 불필요 — γ(완전 재구성)이 가장 자연스러움.

## 4. 구현 전략 최종 결정

### 4.1 전략 비교 (사용자 제시 α/β/γ)

| 옵션 | 평가 | 결론 |
|------|------|------|
| α (전체 1 PNG + overlay) | 텍스트 접근성/SEO 손실, 9개 박스 hover/focus 시맨틱 0 | **불채택** |
| β (박스별 crop + CSS 연결선) | 박스는 단순 단색 fill에 텍스트만 → crop 이득 없음. raster PNG 9장 관리 오버헤드 | **불채택** |
| **γ (완전 재구성)** | 박스 = div + bg + radius + font, connector = SVG, divider = 공통 컴포넌트. G1 <5% 충분 달성 가능 (단순 기하·단색) | **채택** |

### 4.2 근거

- Tier 2 녹색 pill: `#4FB654` 단색, 흰색 볼드 한글 텍스트 — Pretendard로 재현 가능
- Tier 2 검정 박스: `#0C3B0E` 단색, 동일 폰트 처리
- Tier 3 회색 박스: `#EFF0F0` 단색, `#1D2623` 한글 — 폰트 weight/size 정밀 측정 필요하지만 baseline baked-in 없이 재구성 자유도 확보
- 연결선: 2 px 수직선 + 5~6 px 원형 dot = SVG 10줄 이내
- **예상 G1: 2~4 %** (텍스트 antialias + dot 1~2 px 위치 오차만 변수)

### 4.3 리스크 메모

1. **한글 폰트 weight 정밀도**: Tier 2 박스 "ESG실천 아이디어 경진대회" vs Tier 3 "ESG 대학생 부문" → weight 차이(bold vs medium) 육안으로 분별 필요. plan에서 G2 fontSize/weight 측정 단계 필수.
2. **Tier 2 박스 radius 차이** (pill 11 vs rect 10): CSS `rounded-full` vs `rounded-[10px]` 분리 처리 권장. 둘 다 10 px로 통일 시 pill 손상. plan에서 확정.
3. **Connector dot 위치 정밀도**: y=651~653 dot (지름 ~5 px). SVG `<circle r=2.5 cx=0 cy=61>` 형태로 polyline 끝에 배치. 1 px 오차 시 G1 ±0.1 % 수준.
4. **텍스트 letter-spacing**: 한글은 통상 `letter-spacing: -0.02em` 범위. 실측 필요 — §2.4 정밀 수치 준수, 퍼센트/em 단위 유지.
5. **Tier 3 박스 텍스트 정확도**: "봉사활동(프로보노)" 괄호 처리. 괄호가 baseline에 정확 형태로 나타남 — 전각 괄호 아닌 **반각 `()` + 한글 "프로보노"** (육안). 원본 텍스트 리스트 확보 안 되면 반각으로 구현 후 G1 통과 여부 확인.
6. **`_tmp_*.png` 생성 금지**: 본 리서치는 작업 PNG를 모두 제거 완료 (`_chart_scan.png`, `_chart_col1.png`).

## 5. clip 파라미터 (단계 5 G1 측정용)

섹션 자체가 1920×390 풀폭 블록. preview 라우트를 1920×390로 렌더 → `scripts/compare-section.sh about-organization-chart` 기본 호출 충분. `--clip-*` **불필요**.

## 6. 에셋 목록

| # | 이름 | 처리 | 동적? |
|---|------|------|-------|
| 1 | HatchedDivider "설립 구조" | 공통 컴포넌트 재사용 (`label="설립 구조"`) | No |
| 2 | 박스 9개 | HTML `<div>` + Tailwind `bg-[...]` + `rounded-[...]` + 한글 텍스트 | No |
| 3 | Connector 2개 | SVG `<line>` + `<circle>` (로컬 `OrgChartConnector`) | No |

**정적 raster 에셋 0** — download-assets.sh / process-assets.py 실행 필요 없음. 단계 3을 실질적으로 스킵(에셋 디렉터리 미생성).

## 7. 추출 텍스트

```
Divider: 설립 구조
Tier2-1: COLIVE, ESG마인드 자격검정        (녹색 pill, 흰 텍스트)
Tier2-2: ESG실천 아이디어 경진대회          (검정 박스, 흰 텍스트)
Tier2-3: 사회공헌활동                       (검정 박스, 흰 텍스트)
Tier3 col1 r1: ESG 대학생 부문
Tier3 col1 r2: 기업 실전사례 부문
Tier3 col1 r3: 지역사회 부문
Tier3 col2 r1: ESG 실천 캠페인
Tier3 col2 r2: 봉사활동(프로보노)
Tier3 col2 r3: 기업 협력
```

## 8. 디자인 토큰 매핑

신규 토큰 **없음**. arbitrary hex 사용:

- Tier2-1 pill 배경: `#4FB654` (신규 그린. 기존 `--brand-green` 토큰과 다를 수 있으므로 plan에서 확인 후 별칭화 검토)
- Tier2-2, 2-3 박스 배경: `#0C3B0E` (기존 footer/about-header 진한 녹색 계열 재확인)
- Tier3 박스 배경: `#EFF0F0`
- Tier3 텍스트 / Tier2 흰 텍스트: `#1D2623` / `#FFFFFF`
- connector: `#0C3B0E` 동일 (Tier2 parent 색 승계)

## 9. 단계 1 산출 파일

- `figma-screenshots/about-organization-chart.png` (1920×390, baseline, **생성 완료**)
- 본 파일 `research/about-organization-chart.md`

---

## 멈춤 지점

단계 1 완료. 오케스트레이터에 리서치 완료 보고 → 단계 2 plan 작성으로 이어짐.
