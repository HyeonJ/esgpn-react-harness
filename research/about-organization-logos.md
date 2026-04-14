# research/about-organization-logos.md — About 조직도 페이지 운영주체 로고 섹션

> Phase 3 단계 1. 페이지 `/about/organization` 2번째 섹션.
> 상위 page research: `research/about-organization.md`. 전략 **[A] 완전 HTML 재구성 + 로고 baseline crop**.
> 공통 규칙: `CLAUDE.md` / `docs/section-implementation.md` §2.4 / §2.5 / §2.6 / §6.1 / §6.4.

## 1. Figma 노드 재조사

`89:1295`는 flatten 단일 이미지이며 하위 노드 없음 (§research/about-organization.md §1). design_context·variable_defs 호출은 의미 없음. 스펙은 **baseline PNG crop + 육안 + 픽셀 행/열 스캔**으로 확보.

## 2. 베이스라인 crop + 행/열 스캔 실측

### 2.1 source / target
- source: `figma-screenshots/about-organization-full.png` (1920×2019, 8-bit RGBA)
- target: `figma-screenshots/about-organization-logos.png` — **1920×300, 8-bit RGBA (생성 완료)**
- crop box: `(0, 190, 1920, 490)` — height 300px (tabs 끝 직후 ~ chart 섹션 divider 직전)

### 2.2 행 스캔 결과 (full.png y축, 범위 y=180~500)

```
y=188~189  tabs active underline (= tabs 섹션 끝)
y=190~273  공백 (logos 섹션 top padding, 84px)
y=274~288  HatchedDivider "운영주체"
           - y=280~281 solid line 854 px (풀 라인)
           - "운영주체" 텍스트 y≈276~286
           - hatched dashes 좌/우 (회색)
y=289~328  공백 (divider ↔ 로고 row gap, 40px)
y=329~392  로고 row (ESPGN + pipe + Colive + 전문대학평생직업교육협회)
           - Korean label 진한 블랙 y=341~361
           - subtitle (영문) y=385~392 (회색)
y=393~489  공백 (bottom padding, 97px → 다음 섹션 시작 직전까지)
y=490~     chart 섹션 HatchedDivider 시작
```

### 2.3 섹션 경계 확정

- **y-start = 190** (tabs 끝 직후)
- **y-end = 490** (chart divider 직전)
- **height = 300px**
- baseline 실측 `file` 결과: 1920×300 ✓

## 3. 시각 요소 상세 (열 스캔 + 색상 샘플)

### 3.1 HatchedDivider "운영주체" (y=274~288)

열 스캔 결과 (y=274~289 union):

| 요소 | x 범위 | width | 비고 |
|------|--------|-------|------|
| 왼쪽 해치 (`//////`) | 491~528 | 38 | gray `#cfd4d2` 추정 |
| 왼쪽 solid line | 535~925 | 391 | 1px 수평선 (y=280~281) |
| 텍스트 "운영주체" | 933~986 | 54 | gray `#a4aeaa` 계열, 중앙 정렬 (center ≈ 960) |
| 오른쪽 solid line | 994~1384 | 391 | 1px 수평선 |
| 오른쪽 해치 | 1391~1428 | 38 | 대칭 |

- 총 divider 가시 폭: 491~1428 (w=938), center x=960 (페이지 중앙 1920/2 = 960 ✓)
- **공통 컴포넌트 `HatchedDivider` 재사용** (label="운영주체"). 기존 prop shape 확인 필요 (about-values, about-mission 사용 선례).

### 3.2 ESPGN 로고 (y=329~392, x=519~809)

- 크기: **w=291, h=64**
- 색상 샘플 `im[355, 600]` = `[29, 38, 35]` → `#1d2623` (Gray 900)
- 글꼴: Serif (Playfair Display 계열 추정 — about-header ESPGN 로고와 동일할 가능성 농후)
  - **검증:** About Header ESPGN 로고 에셋(`src/assets/about-header/...` 또는 `about-header-espgn.png`) 재사용 여부는 plan 단계에서 결정. 스타일이 완전 동일하면 재사용, 아니면 신규 crop
- 포맷: PNG alpha 불필요 (배경 흰색과 동일) — **JPG도 가능하나 RGBA PNG 유지**
- 추출 텍스트: `ESPGN` (대문자, serif)

### 3.3 pipe divider (y=338~383, x=836~840)

- **수직 구분선 (|)**: w=2~4px, h≈46px (ESPGN 로고와 Colive 로고 사이)
- 색상 추정: Gray 300 `#d6dad8` 계열 (육안)
- **CSS 재구성 가능** (div `w-[2px] h-[46px] bg-gray-300`) — 별도 에셋 불필요

### 3.4 Colive 로고 (y=329~392, x=866~1084)

- 크기: **w=219, h=64**
- 컬러풀 그라디언트 로고 (보라·분홍·오렌지 — "CoLive" 스타일 디자인)
- **baked-in 컬러 로고** → 별도 PNG crop 필수 (HTML 재구성 불가)
- 포맷: **RGBA PNG (alpha 필요)** — baseline 배경이 흰색이지만 그라디언트 엣지 smooth blend 위해 alpha 유지
- 추출 텍스트: 없음 (로고 자체, alt 텍스트만 필요)

### 3.5 전문대학평생직업교육협회 로고 (y=335~392, x=1100~1400)

- 크기: **w=301, h=58**
- 구성:
  - 좌측: "사단법인" 2줄 작은 레이블 (x=1100~1150, y≈340~362) — 검정, 작은 굴림/돋움체
  - 중앙: **"전문대학평생직업교육협회"** 한글 (x=1152~1400, y=341~361) — Pretendard Bold (추정), 진한 `#1d2623`
  - 밑줄 수평선 (y=372~374 추정, x=1152~1400)
  - 하단: "Council for Lifelong Vocational Education of University College" 영문 (y=385~392, 회색 `#c8c8ca`)
- **baked-in 복합 로고** → 별도 PNG crop 권장 (재구성 비용 대비 G1 효율 고려)
  - 대안: 사단법인+한글 + 영문을 전부 HTML 재구성. 폰트/줄간격/굴림체 정확도 확보 어려움. **crop 우선**
- 포맷: **RGBA PNG** (alpha 필요)

### 3.6 canvas-asset 개수 일치 검증

| 항목 | 개수 |
|------|------|
| Canvas 로고 요소 (이미지성) | 3 (ESPGN, Colive, Assoc) + pipe(CSS) |
| crop 다운로드 대상 | 3 PNG (ESPGN 재사용 여부에 따라 2~3) |
| HTML 재구성 요소 | HatchedDivider, pipe, "운영주체" label(HatchedDivider 내장) |

ESPGN 로고 재사용 판정은 plan에서 결정. **일치 확인 후 단계 3 진입.**

## 4. 전체 배치 측정 (중앙 정렬 row)

- 섹션 내 horizontal 배치 중심: 페이지 1920 중앙 960
- 로고 row 전체 span: x=519 ~ 1400 (w=881)
  - row center = (519 + 1400) / 2 = **959.5 ≈ 960** ✓ (페이지 정중앙)
- 각 로고와 pipe 간격 (baseline 그대로):
  - ESPGN 끝(809) → pipe 시작(836) = **27 px 좌 여백**
  - pipe 끝(840) → Colive 시작(866) = **26 px 우 여백**
  - Colive 끝(1084) → Assoc 시작(1100) = **16 px 여백**
- 전체 row는 `flex items-center justify-center gap-*` 패턴으로 재구성. 정확 gap은 plan 단계 2에서 산출.

## 5. 추출 텍스트

```
Divider: 운영주체
Logo 1: ESPGN (serif, bold)
Logo 2: Colive (로고 이미지만 — alt="Colive")
Logo 3 (상단 소): 사단법인 (2줄)
Logo 3 (중앙): 전문대학평생직업교육협회
Logo 3 (하단 영문): Council for Lifelong Vocational Education of University College
```

## 6. 디자인 토큰 매핑

- ESPGN 텍스트 / Assoc 한글: `--color-gray-900` `#1d2623`
- Assoc 영문 subtitle: Gray 300~400 (`#c8c8ca` 추정)
- Divider line/hatched: 기존 HatchedDivider 토큰 재사용
- pipe divider: Gray 300 `#d6dad8`
- font: Pretendard Variable (한글), Serif for ESPGN (about-header ESPGN과 동일한 처리)

신규 토큰 **없음**. §2.4 정밀 수치: 모든 좌표 정수값 (소수점 없음).

## 7. clip 파라미터 (단계 5 G1 측정용)

섹션 자체가 1920×300 풀폭 블록. preview 라우트를 1920×300로 렌더 → `scripts/compare-section.sh about-organization-logos` 기본 호출로 충분. `--clip-*` **불필요**.

## 8. 리스크 (이 섹션 고유)

1. **ESPGN 로고 재사용 vs 신규 crop:** about-header에 ESPGN 타이포 로고가 이미 존재할 경우 크기/색상/자간이 동일한지 plan에서 확인. 다르면 별도 crop. (w=291, h=64 기준)
2. **Colive 로고 alpha edge:** 그라디언트 로고의 anti-alias가 baseline 흰색과 섞여 있어 crop 시 halo 발생 가능. `process-assets.py` 단계에서 alpha 보존 확인. JPG 압축 **금지** (§2.5).
3. **Assoc 복합 로고 정확도:** "사단법인"+"전문대학..."+영문 3요소가 한 crop 안에 들어감. 각 요소 간 정확한 비율이 baked-in이므로 crop 위치만 정확하면 G1 자동 PASS.
4. **pipe divider 픽셀 좌표:** 폭 2~4px, CSS 재구성 시 w=2 또는 3px 선택. baseline과 픽셀 위치가 정확히 맞지 않으면 G1 diff 발생 가능. plan에서 CSS vs img crop 선택.
5. **HatchedDivider 재사용:** 기존 컴포넌트의 label prop이 "운영주체"에 그대로 들어가는지 확인. about-values/about-mission에서 사용된 label width 처리 방식 그대로 따라감.
6. **`_tmp_*.png` 생성 금지:** 이전 about-values 워커 위반 선례. 본 리서치는 crop 스캔 후 `_tmp_*` 삭제 확인 완료.

## 9. 단계 1 산출 파일

- `figma-screenshots/about-organization-logos.png` (1920×300, baseline, 생성 완료)
- 본 파일 `research/about-organization-logos.md`

---

## 멈춤 지점

단계 1 완료. 단계 2 plan 작성으로 이어짐.
