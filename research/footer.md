# research/footer.md — 공통 Footer

> 단계 1 리서치. 이 문서는 단계 2 plan 작성 전 **진실의 원천**이다.
> Header 리서치(`research/header.md`) 패턴을 따름.

---

## 1. 섹션 메타

| 항목 | 값 |
|------|-----|
| Figma Node ID | `299:2094` (인스턴스) / `299:2093` (원본 컴포넌트, `data-node-id`로 확인) |
| Figma 파일 | `qhrMiGVfoSQ1QMFhVN8z78` (ESG 실천네트워크) |
| 컨테이너 사이즈 | **1920 × 708 px** (풀폭, 풀 베이스라인과 동일) |
| 캔버스 절대 좌표 | x=1880, y=9378 (메인페이지 최하단) — 풀폭이므로 clip 불필요 |
| 부모 페이지 | 공통 컴포넌트 (모든 라우트 최하단 고정) |
| 라우트 | 전역 (`Footer` 레이아웃 컴포넌트, `RootLayout`에 장착) |
| 권장 구현 위치 | `src/components/layout/Footer.tsx` (figma-project-context.md §5 카탈로그) |

### 1.1 baseline 저장 확인
- **파일**: `figma-screenshots/footer.png` (flat 경로, `compare-section.sh` 규약)
- **메타**: PNG 1920×708, RGBA, 41KB
- **저장 방식**: 이 워커 세션에서 Framelink MCP 스키마가 deferred 상태로 노출되지 않아 직접 호출 불가 → **Figma REST API** `/v1/images?ids=299:2094&format=png&scale=1`로 S3 URL 취득 후 `curl`로 다운로드. 결과물은 Framelink `download_figma_images`와 동일한 풀폭 PNG.
- **후속 권고**: 다음 워커 호출 시 Framelink 도구 스키마를 `ToolSearch` 인덱스에 등록하거나, 오케스트레이터가 baseline을 대신 저장하는 방식 권장. 이번에는 REST API 폴백으로 Phase 0 의도를 충족.

---

## 2. 레이아웃 구조 (Figma 원본)

최상위 컨테이너 `299:2093` "Footer" (1920×708):
- **flex column, items-start, gap 80px**
- `padding-top: 48px`
- `background: #0c0c0c` (Gray Scale Gray 900 근사치. Figma 실제값 `#0c0c0c`은 raw hex, 변수 미바인딩)
- 자식 2블록:

```
<Footer 1920×708 bg=#0c0c0c pt=48 gap=80>
├─ [Top Row 1920×? px-252 gap-40 items-start]  (299:2058 "Frame 2042062659")
│   ├─ [Left col flex-1 flex-col gap-48 min-h/w-0]  (299:2059)
│   │   ├─ [Info block flex-col gap-8 w-full]  (299:2060)
│   │   │   ├─ [Line1 flex gap-8 h-21 items-center w-full]  (299:2061)
│   │   │   │   ├─ "상호 : Colive" (14R white)  (299:2062)
│   │   │   │   ├─ [divider w=10 h=0 rotate-90]  (299:2063) → imgLine10
│   │   │   │   ├─ "대표이사 : 구현우" (14R white)  (299:2064)
│   │   │   │   ├─ [divider]  (299:2065) → imgLine10
│   │   │   │   └─ "사업자등록번호 : " (14R white)  (299:2066)
│   │   │   ├─ [Line2 flex items-center w-full]  (299:2067)
│   │   │   │   └─ "주소 : " (14R white)  (299:2068)
│   │   │   └─ [Line3 flex gap-8 items-center w-full]  (299:2069)
│   │   │       ├─ "고객센터 : " (14R white)  (299:2070)
│   │   │       ├─ [divider w=10 h=0 rotate-90]  (299:2071) → imgLine8
│   │   │       └─ "개인정보관리책임자 : " (14R white)  (299:2072)
│   │   └─ [Copyright] "COPYRIGHTⓒ2026 Aqu.ALL  RIGHTS  RESERVED." (14R gray-600 #7c8985)  (299:2073)
│   └─ [Right nav flex gap-16 h-21 items-center]  (299:2074 "right")
│       ├─ "1:1문의" (14B white)  (299:2075)
│       ├─ [divider]  (299:2076) → imgLine10
│       ├─ "이용약관" (14B white)  (299:2077)
│       ├─ [divider]  (299:2078) → imgLine10
│       ├─ "개인정보취급방침" (14B white)  (299:2079)
│       ├─ [divider]  (299:2080) → imgLine10
│       └─ "위치서비스이용약관" (14B white)  (299:2081)
└─ [Watermark 1920×432 w-full]  (299:2087 "ESGPN" GROUP)
    └─ <img src=imgEsgpn class="absolute inset-0 size-full" />  (299:2088~ 5개 VECTOR을 MCP가 합성 이미지 1개로 export)
```

### 2.1 주요 치수
- Footer 전체: **1920 × 708**
- `pt=48`, `gap=80` (top row와 watermark 사이)
- Top row: `px-252` (좌우 252), `gap-40` (좌/우 칼럼 사이)
- Info block 내부: `gap=8` (각 라인 사이)
- Left col: `gap=48` (Info block ↔ Copyright)
- Right nav: `gap=16`, `h=21`
- Watermark: `1920 × 432`
- 수직 합: 48(pt) + top_row_h + 80(gap) + 432(watermark) = 708 → top_row_h = 148 (= info_h 101 + gap48 + copyright_h 21 = 170? — 아래 재검증)
  - 실제: left col = info(3lines×21 + 2×8 = 79) + gap48 + copyright(21) = 79+48+21 = **148**. 708−48−80−432 = **148** ✅
- Right nav h = 21 (`items-start`로 top row에 붙음)

### 2.2 디바이더 사이즈
- `imgLine10`: w=10 h=0 (실제 VECTOR 스트로크, `rotate-90`으로 세로 |). `h-10` 컨테이너 내부 `w-10 h-0` + 1px border로 렌더됨 → 실제 시각은 **1px × 10px 세로선**.
- `imgLine8`: w=10 h=0 스트로크 (Line2 고객센터 구분자) — 현재 코드상 `w-[10px]`로 되어 있어 **실측 상 10px짜리. 노드 이름이 Line8이지만 크기는 10px.** 처리 방식 동일.

> ⚠️ MCP 코드는 divider를 `<img src={imgLine10} class="size-full" />`(10×0 canvas) 방식으로 export. 실전 구현 시 **SVG 다운로드 없이 CSS 세로선(`border-l` 또는 `w-px h-[10px]`)으로 구현 가능**하지만, **CLAUDE.md 절대 규칙 "에셋 URL 무조건 다운로드. CSS 대체 금지"**에 따라 **SVG 파일로 내려받아야 함**. plan에서 결정.

---

## 3. 사용된 디자인 토큰 (tokens.css 매칭)

`get_variable_defs(299:2094)` 결과 6개 변수:

| Figma 변수 | 값 | tokens.css 변수 | 상태 |
|-----------|----|----|------|
| `Gray Scale/Gray 000` | `#ffffff` | `--color-gray-000` | ✅ 존재 |
| `Gray Scale/Gray 600` | `#7c8985` | `--color-gray-600` | ✅ 존재 |
| `spacing/12` | `48` | `--spacing-12` | ✅ 존재 |
| `Brand/Brand 700` | `#0c3b0e` | `--color-brand-700` | ✅ 존재 (워터마크 fill) |
| `Pretendard 14R` | 14/400/1.5/0 | `--text-pretendard-14r-*` | ✅ 존재 |
| `Pretendard 14B` | 14/700/1.5/0 | `--text-pretendard-14b-*` | ✅ 존재 |

### 3.1 미바인딩 값 (hardcoded hex)
- **Footer 배경 `#0c0c0c`**: Figma 토큰 변수 미바인딩. Gray 900(`#1d2623`)과 다른 **더 진한 블랙**. tokens.css에 대응 변수 **없음**.
  - **권장**: arbitrary `bg-[#0c0c0c]`로 1:1 재현. 공통 푸터 외엔 미사용이므로 토큰 추가 보류. plan에서 재확인.
- **구분자 선 색**: MCP 응답에 stroke 색 없음 → Figma 이미지 export로 해결 (SVG 다운로드).

### 3.2 타이포그래피
- **정보 라인/연락처 텍스트** (7개): Pretendard Regular 14 / lh 1.5 / ls 0 / `color-gray-000` (#ffffff)
  - → `--text-pretendard-14r-*` 프리셋 1:1 매칭
- **Copyright**: Pretendard Regular 14 / lh 1.5 / color **gray-600** (#7c8985) / `whitespace-pre` (공백 보존)
- **우측 네비** (4개): Pretendard **Bold** 14 / lh 1.5 / color white
  - → `--text-pretendard-14b-*` 프리셋 1:1 매칭

### 3.3 색상
- 배경: `#0c0c0c` (하드코딩, 토큰 없음)
- 주 텍스트: `#ffffff` (gray-000)
- Copyright: `#7c8985` (gray-600)
- 워터마크: `#0c3b0e` (brand-700)
- 디바이더 선: 흰색 추정 (MCP stroke 속성 미반환. 단계 3에서 SVG 파일 검사로 확정)

---

## 4. 에셋 목록 (가장 중요)

MCP 응답 기준 **이미지 URL 3개** (+ 동일 URL `imgLine10` 재사용 5회 = DOM `<img>` 총 7개).

| # | 종류 | MCP asset URL | Figma 노드 ID | 부모 사이즈 | 원본 사이즈 | 동적 여부 | 처리 방식 |
|---|------|---------------|---------------|-------------|-------------|-----------|-----------|
| 1 | SVG/PNG (divider) | https://www.figma.com/api/mcp/asset/6c9c887d-79ae-4982-95b9-3de3e293a732 (`imgLine10`) | `299:2063` 외 5개(같은 VECTOR 공유) | 10×10 컨테이너 (h-10 rotate-90) | 10×1px (세로선) | **정적** | 단계 3: 다운로드 → `file` 검증 → `src/assets/footer/divider-10.svg` |
| 2 | SVG/PNG (divider) | https://www.figma.com/api/mcp/asset/7d53d9dc-1607-4b0a-971f-9f0738dd6a6d (`imgLine8`) | `299:2071` | 10×10 컨테이너 | 10×1px (세로선) | **정적** | 단계 3: 다운로드 → `file` 검증 → `src/assets/footer/divider-8.svg` (노드명 Line8이라 구분) |
| 3 | SVG/PNG (ESGPN 워터마크) | https://www.figma.com/api/mcp/asset/e2d0ffe1-acd2-4150-9fb4-de5697f6d02f (`imgEsgpn`) | `299:2087` GROUP (5개 VECTOR 합성) | 1920×432 | 1920×432 | **정적** (5개 VECTOR는 모두 SOLID fill, 애니메이션/블러 없음) | 단계 3: 다운로드 → `file` 검증 → `src/assets/footer/esgpn-watermark.svg` (SVG 예상, VECTOR 그룹이므로) |

### 4.1 동적 여부 판정 근거 (3가지 식별)
1. **확장자 검사**: MCP URL 확장자 없음 (Figma MCP 공통). 단계 3에서 `file` 명령으로 강제 판정.
2. **파일 타입 검사**: 단계 3에서 수행.
3. **노드 타입 검사** (Figma REST API 확인):
   - `imgLine10`/`imgLine8` → VECTOR 노드 (1D 라인). 동적 불가.
   - `imgEsgpn` → 5개 VECTOR 노드(SOLID fill, Brand 700)의 GROUP. 움직임/비디오 없음.
   - **VIDEO 타입 0개.** 모두 정적 벡터.
- **결론**: 3개 모두 **정적**. 정적 프레임 추출 절차 불필요. `verify-assets.sh`로 최종 확정.

### 4.2 캔버스-에셋 일치 검증 ✅
Figma 캔버스(baseline PNG) 시각 요소:
- (a) 상단 좌측 정보 텍스트 7개 — **텍스트 노드** (에셋 아님)
- (b) 정보 블록 세로 구분자 3개 (Line1의 "상호", "대표이사" 사이 × 2개 + Line3의 "고객센터" ↔ "개인정보관리책임자" × 1개) — **이미지**
- (c) 우측 상단 메뉴 텍스트 4개 ("1:1문의", "이용약관", "개인정보취급방침", "위치서비스이용약관") — **텍스트 노드** (에셋 아님)
- (d) 우측 메뉴 세로 구분자 3개 — **이미지**
- (e) Copyright 텍스트 — **텍스트 노드**
- (f) 대형 ESGPN 워터마크 — **이미지 1개** (5 글자 합성 SVG)

**캔버스 이미지 요소 개수** = divider 6개(Line10 공유) + divider 1개(Line8) + watermark 1개 = **8개 DOM `<img>`**
**MCP 고유 에셋 URL 개수** = 3개 (`imgLine10` × 6 + `imgLine8` × 1 + `imgEsgpn` × 1 = 8개 `<img>` 중 고유 파일 3개)

→ **고유 에셋 3개 = research 행 3개 ✅.** DOM `<img>` 8개 = MCP 생성 코드 `<img>` 8개 ✅. 멈춤 조건 미발동.

> ⚠️ **재확인 필요 항목**: MCP 코드에는 Line1 Divider 2개(299:2063, 299:2065)가 모두 `imgLine10`을 쓰지만 Line3의 첫 divider(299:2071)는 `imgLine8`. 시각적으로 동일한 선일 가능성 높음 → **단계 3에서 두 파일 다운로드 후 `sha256sum` 비교하여 동일하면 하나로 병합, 다르면 둘 다 보존**. 이 결정은 plan에 반영.

---

## 5. 반복되는 요소 (컴포넌트화 후보)

- **`FooterDivider`**: 세로 `|` 구분자 (1px × 10px). Footer 내부 7회 반복.
  - props: 없음 (prop-less presentational).
  - 결정: **Footer 내부 JSX 함수로만 분리** (별도 파일 불필요). 다른 섹션에서도 쓰일 가능성 낮음.
- **정보 라인 텍스트**: 7개가 모두 `Pretendard 14R white`. 컴포넌트화 불필요 — 그냥 `<p>` 태그 배치.
- **우측 네비 링크**: 4개가 모두 `Pretendard 14B white`. `<a href>` 또는 `<Link>` 리스트로. 링크 타겟은 **Figma에 명시 없음** (plan에서 임시 경로 지정 + 사용자 확인).

---

## 6. 반응형 단서

- Figma는 **1920 데스크탑 1개 레이아웃만 존재**. 태블릿/모바일 디자인 없음.
- Header와 동일 이슈: 1920 미만에서 어떻게?
  - `px-252`는 1920 전용 (양쪽 여백 252). 1440에서는 좁아져야 함.
  - ESGPN 워터마크 432px 높이는 viewport 비율에 맞게 스케일?
- **plan에서 결정할 것**:
  - 1440 이하: `px-*` 축소 (예: `px-16 md:px-24 xl:px-[252px]`)
  - ESGPN 워터마크: `w-full h-auto` 유지 (원본 비율 1920:432 = 40:9) → 작은 화면에서 자동 축소
  - 우측 네비: 작은 화면에서는 줄바꿈 허용? 사용자 확인 필요

---

## 7. 특이 사항 / 리스크

1. **Footer 배경 `#0c0c0c`가 토큰 미바인딩**: Header는 투명 pill이지만 Footer는 불투명 검정. tokens.css에 해당 hex 없음. arbitrary 사용 불가피 (리스크 낮음).
2. **ESGPN 워터마크가 단일 이미지로 export**: 5개 VECTOR 노드(E,S,G,P,N 각 글자)를 MCP가 합성해 1개 에셋으로 제공. 장점: 구현 간단. 단점: 글자 개별 제어 불가 — 하지만 Figma에도 개별 애니메이션 없음이므로 문제 없음.
3. **워터마크 사이즈**: 1920×432 원본. 단계 3에서 다운로드 후 `file` 명령으로 SVG/PNG 판정. **SVG면 용량 작고 스케일 자유**, **PNG면 리사이즈 시 흐려짐** — plan에서 후처리 계획.
4. **divider 파일 중복 가능성**: `imgLine10`과 `imgLine8`이 같은 비주얼이면 단일 에셋으로 통합 (단계 3에서 해시 비교).
5. **우측 네비 링크 타겟 미정의**: `/terms`, `/privacy`, `/location-terms`, `/contact` 등 라우트가 `figma-project-context.md §3`에 부재. **사용자 확인 필요** (plan 리스크).
6. **"1:1문의" 굵은 처리**: Header의 "고객센터"와 역할 유사하지만 Bold 14. Header 우측 Medium 14와 시각 차이 인지.
7. **Copyright 문자열 `COPYRIGHTⓒ2026 Aqu.ALL  RIGHTS  RESERVED.`**: 공백이 2칸씩 들어가 있고 `whitespace-pre`로 보존됨. 구현 시 템플릿 리터럴 공백 주의. (`ALL` 앞뒤로 더블스페이스.)
8. **모든 텍스트가 `whitespace-nowrap`**: 좁은 viewport에서 overflow 가능. 반응형 대응 plan에서 결정.
9. **Line1의 "사업자등록번호 : "가 값 없이 끝남**: Figma 자체가 placeholder (콜론+공백만). 실데이터 주입은 나중. plan에 주입 포인트 명시.
10. **`--color-brand-700` 참조 시점**: 워터마크가 SVG인 경우 fill 색이 inline일 것. tokens.css 변수로 재바인딩하려면 SVG 편집 필요. plan에서 결정.

---

## 8. 베이스라인 스크린샷

- **파일**: `figma-screenshots/footer.png` ✅ (1920×708 PNG, RGBA, 41KB)
- **저장 방식**: Figma REST API `/v1/images` → S3 URL → `curl`. Framelink와 동일 결과.
- 추후 오케스트레이터 세션에서 Framelink 툴 스키마가 노출되면 재저장 불필요 (동일 파일).

---

## 9. 단계 1 통과 조건 체크리스트

- [x] `research/footer.md` 작성 완료
- [x] 에셋 목록의 모든 행이 채워짐 (3행, 빈 칸 없음)
- [x] 모든 에셋의 "동적 여부" 칸 채워짐 (3개 모두 "정적")
- [x] 동적 에셋 없음 → 정적 프레임 추출 불필요
- [x] 캔버스-에셋 일치 검증 완료 (고유 3개 = 3개, DOM `<img>` 8개 = 8개)
- [x] Figma 베이스라인 스크린샷: `figma-screenshots/footer.png` (flat 경로)

**→ 단계 2 (plan) 진행 가능**
