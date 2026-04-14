# research/about-organization-panorama.md — About 조직도 페이지 파노라마 섹션

> Phase 3 단계 1. 페이지 `/about/organization` 4번째(마지막) 섹션.
> 상위 page research: `research/about-organization.md`. 선행: `research/about-organization-chart.md`, `plan/about-organization-chart.md`.
> 공통 규칙: `CLAUDE.md` / `docs/section-implementation.md` §2.4 / §2.5 / §2.6 / §6.1 / §6.4.

## 1. Figma 노드 재조사

`89:1295`는 본문 전체 flatten 단일 이미지. Panorama 섹션 전용 노드 **없음**. `get_design_context` 호출 의미 없음. 스펙은 baseline PNG crop + 픽셀 행/열 스캔 + about-vision panorama 픽셀 비교로 확보 (about-organization.md §1과 동일 flatten 상황).

## 2. 베이스라인 crop + 경계 실측

### 2.1 source / target
- source: `figma-screenshots/about-organization-full.png` (1920×2019, 8-bit RGBA)
- target: **`figma-screenshots/about-organization-panorama.png` — 1920×440 RGBA (생성 완료)**
- crop box: `(0, 880, 1920, 1320)` — height 440 px (chart 섹션 끝 y=880 ~ Footer 시작 y=1320 직전)

### 2.2 세로 경계 확정 (full.png y축 기준)

full.png 행 스캔 결과 (연속 pure-white gap 없음, tapered edge):

| y (full) | 관찰 |
|----------|------|
| 862 | chart 섹션 Tier3 Row3 하단 (last text baseline) — non-white x=836..1852 |
| 863~870 | **파노라마 우측 빌딩 top tapered 시작** — non-white x=~1705..1853 (빌딩 꼭대기 윤곽) |
| 871~879 | 좌/우 빌딩 추가 등장 — non-white x=~550..1850 (양측 빌딩 실루엣) |
| **880** | panorama section 경계 시작 (본 섹션 y=0) — non-white x=545..1843, white ratio 0.879 |
| ~950 | 좌측/우측 빌딩 full — nw x=[517..1856] |
| ~1000 | 언덕 등장 — nw x=[348..1856] |
| ~1100 | 풀-width 근접 — nw x=[230..1884] |
| **1200~1319** | 잔디/도로 풀블리드 — nw x=[0..1919] ratio_nw 1.000 |
| 1320 | **Footer 시작** (RGB 12,12,12) — 섹션 경계 종료 |

- **y-start = 880, y-end = 1320, height = 440 px** ✓
- 파노라마 탑 edge가 y=863부터 tapered이지만 chart 섹션 하단 padding(862~879, 공식 research에서 chart 섹션 bottom 여백)과 겹치므로 **chart에서 880까지 포함**, panorama는 880부터 시작. chart.png baseline(1920×390, crop y=490..880)과 정합 ✓.

### 2.3 Tapered top 경계 확인

- y=880에서 이미 빌딩 실루엣 시작 (non-white x=545..1843). 흰 하늘 영역과 tapered 빌딩이 섞여 있어 `white ratio ≈ 0.88`.
- 섹션 처음 40 px (y=880..920)는 주로 흰 하늘 + 좌/우 빌딩 꼭대기.

## 3. About Vision panorama 픽셀 비교 ⭐

### 3.1 비교 방법

- vision panorama: `src/assets/about-vision/panorama.png` (1920×631 RGBA)
- organization panorama: `about-organization-full.png` 의 y=880..1320 crop (1920×440)
- 가설: organization panorama는 vision panorama의 수직 offset 일치 부분 crop일 가능성 (about-vision.md §3.2 동일 Figma 출처 가능).

### 3.2 offset 스캔 결과

모든 vision[off:off+440] vs organization[0:440] 의 mean_abs_diff 측정:

| offset | mean_abs_diff (RGB, 0-255) |
|--------|----------------------------|
| 0  | 45.86 |
| 30 | 30.09 |
| 40 | 23.38 |
| **48** | **2.790** ← 최소 |
| 50 | 14.40 |
| 60 | 27.95 |
| 100 | 49.87 |

→ **최적 정렬 offset = 48**. mean_abs_diff 2.79는 JPEG/quantize 압축 변동 수준.

### 3.3 정밀 일치도 (offset=48 고정)

- 픽셀 ±3 차 이내: **74.1%**
- 픽셀 ±10 차 이내: **91.8%**
- 나머지 ~8% 차이는 baseline PNG / vision panorama 저장 시 quantize/압축 아티팩트로 추정.

### 3.4 결론

**동일 원본 파노라마**. organization panorama는 vision panorama의 `y=48..488` 구간 crop.

- vision panorama 전체 (1920×631)에서 상단 48 px, 하단 143 px (48+440=488, 631-488=143) 를 제거한 center 부분.
- 단, Figma canvas 상 두 섹션의 panorama **표시 영역 offset이 서로 다름** — vision은 tapered top이 y=0에서 시작(하늘 많이 보임), organization은 y=0이 이미 빌딩 탑 등장(상단 48 px 하늘 생략).

### 3.5 에셋 재사용 전략 (채택)

- **에셋 재사용** — `@/assets/about-vision/panorama.png` import.
- vision 전체 1920×631 이미지를 그대로 import 하되, organization 섹션에서는 **수직 `object-position: top -48px`** (혹은 `margin-top: -48px` + `overflow: hidden`) 형태로 상단 48 px 숨김. 하단 143 px도 `height: 440px` + `overflow: hidden`으로 자연스럽게 잘림.
- 핵심 구현: `<div class="relative w-[1920px] h-[440px] overflow-hidden"><img src={panorama} class="absolute top-[-48px] left-0 w-[1920px] h-[631px]" /></div>`
- G1 차이: 압축 아티팩트 수준 (±3 차 74%, ±10 차 92%) → baseline crop과 img 렌더는 거의 동일.

### 3.6 대안 평가

| 옵션 | 평가 |
|------|------|
| 독립 crop (`src/assets/about-organization-panorama/panorama.png` 1920×440 저장) | 에셋 중복 (2.5 MB × 2). vision panorama와 99% 동일 → **불필요**. |
| **vision panorama 재사용 + offset 크롭 (채택)** | 에셋 1개. vision 섹션과 동일 import. G1 영향 무시 가능. |
| object-position 대신 background-image + background-position | img 태그 대신 div bg로도 동일 구현 가능. React 패턴은 `<img>` + absolute top 권장 (visible img 요소 유지, a11y/SEO 영향 없음). |

## 4. 시각 요소 상세

### 4.1 파노라마 이미지 (섹션의 유일한 시각 요소)

| 항목 | 값 |
|------|---|
| 캔버스 위치 | y=880..1319 (section 내부 y=0..439), x=0..1919 풀블리드 |
| 섹션 bbox | 1920×440 |
| 이미지 소스 | `@/assets/about-vision/panorama.png` (1920×631 RGBA, 재사용) |
| 이미지 내부 crop | y=48..488 (offset top -48px, overflow hidden, section h=440) |
| 이미지 내용 | 자연+도시 파노라마: 녹색 언덕 2봉 + 수직정원 빌딩 클러스터 좌/우, 하단 잔디 + 중앙 도로 (vision 섹션과 동일 원본) |

### 4.2 텍스트 요소

**없음.** 섹션 내부 행 스캔 결과 텍스트 없음 (전체 이미지 영역). vision 섹션이 상단에 "감사합니다" 등 텍스트를 가졌던 것과 달리 organization panorama는 **순수 이미지만** 배치됨.

### 4.3 HatchedDivider

**없음.** chart 섹션 ("설립 구조" divider 사용) 종료 후 공백 없이 panorama 시작. y=862(chart 하단) → y=863(panorama tapered top) 바로 붙음.

### 4.4 기타 요소

없음.

### 4.5 Canvas-Asset 개수 일치 검증

| 항목 | 개수 |
|------|------|
| Canvas 가시 요소 | 1 (파노라마 이미지) |
| 다운로드 대상 | 0 (vision panorama 재사용) |
| 재구성 | img 태그 + absolute offset |

**일치 ✓** (1 이미지 요소, 0 신규 다운로드, 1 재사용 import).

## 5. 디자인 토큰 매핑

- 배경: `bg-white` (section 외곽 — 단, 파노라마가 풀블리드라 실제 배경 가시 영역 없음)
- 신규 토큰 **없음**.

## 6. 신규 공통 컴포넌트 결정

| 후보 | 결정 |
|------|------|
| `HatchedDivider` | **사용하지 않음** (이 섹션 내 divider 없음) |
| `SectionPanorama` 신규 | △ — vision + organization 둘이 같은 panorama 사용. Rule of Three 미달(2곳). 로컬 div+img로 유지. 3번째 사용처 발생 시 공통화 |

→ 본 섹션 **로컬 전용, 신규 공통 컴포넌트 0**.

## 7. clip 파라미터 (단계 5 G1 측정용)

- 풀폭 1920×440 블록 → preview 라우트 뷰포트 1920×440 렌더 → `scripts/compare-section.sh about-organization-panorama` 기본 호출 충분.
- `--clip-*` **불필요**.

## 8. 추출 텍스트

없음.

## 9. 에셋 목록

| # | 이름 | 처리 | 동적? | 경로 |
|---|------|------|-------|------|
| 1 | panorama | vision 에셋 재사용 (`@/assets/about-vision/panorama.png`, 1920×631 RGBA) | No | import 재사용, 신규 다운로드 없음 |

**정적 raster 다운로드 0 / 재사용 1.**

## 10. 리스크 (섹션 고유)

1. **offset 정확도**: vision panorama 대비 organization crop 오프셋 = **48 px** (스캔 최적). 1~2 px 오차 시 G1 ±0.3% 수준 예상. plan에서 `top-[-48px]` 확정. G1 악화 시 ±1 px 조정 여지.
2. **width 배율 차이 없음**: 두 panorama 모두 1920 폭 동일, 수평 스케일 불필요.
3. **quantize 아티팩트 허용**: ±3 diff 내 74% 픽셀 일치. 이 수준이 baseline PNG 저장 시 quantize(256) 유래로 추정되며, React 렌더 img는 원본 1920×631 RGBA 그대로 표시 → baseline이 실제 렌더보다 약간 더 압축됨. G1 diff 증가 요인이나 <5% 충분 달성 예상.
4. **overflow clipping**: wrapper `h-[440px] overflow-hidden`. img 자체 height 631. top offset -48 → bottom은 자연 cut (631-48=583, wrapper 440, 잘림 143). React 정적 렌더라 clipping 성능 이슈 없음.
5. **object-position 대 absolute top**: 두 방식 모두 가능. `<img>` + `absolute` + `top-[-48px]`가 명시적. `object-fit: cover + object-position: 0 -48px`는 object-position 단위 계산 비표준. **absolute 방식 채택**.
6. **vision panorama 의존성 결합도**: about-vision 섹션 변경 시 organization도 영향. 현 시점 두 섹션 모두 stable, 동일 Figma 원본이므로 허용. 미래 디자인 변경 시 독립 분리 검토.
7. **baseline 정렬**: `about-organization-panorama.png` (1920×440)이 crop from y=880. compare-section.sh는 preview viewport 1920×440 렌더 후 비교 — preview 라우트는 파노라마 섹션만 렌더하고 wrapper 바깥 bg 없음 (bg-white 동일). §6.1 Preview bg-white 준수.

## 11. 단계 1 산출 파일

- `figma-screenshots/about-organization-panorama.png` (1920×440 RGBA, baseline crop 생성 완료)
- 본 파일 `research/about-organization-panorama.md`

## 12. 측정 요약 (단계 2 plan 입력)

| 구분 | 값 |
|------|---|
| 섹션 범위 (full.png canvas y) | 880..1320 |
| 섹션 크기 | 1920×440 |
| 파노라마 이미지 소스 | `@/assets/about-vision/panorama.png` (1920×631 RGBA, 재사용) |
| 파노라마 top offset (img 내) | -48 px (= vision y=48 이 section y=0 대응) |
| 파노라마 wrapper h | 440 |
| 파노라마 wrapper overflow | hidden |
| 텍스트 요소 | 없음 |
| HatchedDivider | 없음 |
| 예상 G1 | **0.5~2.0%** (baseline crop 대 재사용 img, quantize 차이만) |
| 에셋 수 (신규) | 0 |
| 에셋 수 (재사용) | 1 |

---

## 멈춤 지점

단계 1 완료. 이어서 `plan/about-organization-panorama.md` 작성 후 단계 2 승인 게이트에서 멈춤.
