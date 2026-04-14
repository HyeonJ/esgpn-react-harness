# research/about-vision.md — About 개요 Vision 섹션

> Phase 3 단계 1. 페이지 `/about` 네 번째(마지막) 섹션. 전략 **[A] 완전 HTML 재구성 + 단일 파노라마 에셋**.
> 상위 page research: `research/about.md`. 선행: `research/about-values.md`, `plan/about-values.md`.
> 공통 규칙: `CLAUDE.md` / `docs/section-implementation.md` §2.4~§2.6, §6.1, §6.4.

## 1. Figma 노드 재조사

`52:624`는 본문 전체 flatten 단일 이미지. Vision 섹션 전용 text/frame 노드 **없음**. `get_design_context` 호출 의미 없음. 텍스트·폰트·색·파노라마 경계 전부 baseline PNG 육안 + 픽셀 측정으로 확보. (about-header/mission/values와 동일 상황.)

## 2. 섹션 경계 실측 (행 스캔)

`figma-screenshots/about-full.png` (1920×3499 RGBA). near-white(RGB>240, ratio>0.995) 기반 이벤트 스캔.

| 이벤트 | canvas y | vision 내부 offset |
|-------|----------|----|
| **상단 HatchedDivider (values와 공유)** | 2016~2017 (두께 2px) | — (crop 직전) |
| 공백 | 2022~2081 | 5~64 |
| body 행1 | 2082~2096 (cap 15) | 65~79 |
| gap | 2097~2105 (line gap) | 80~88 |
| body 행2 | 2106~2120 (cap 15) | 89~103 |
| 공백 (단락 gap) | 2121~2144 (h=24) | 104~127 |
| **"감사합니다."** | 2145~2161 (cap 15) | 128~144 |
| 공백 | 2162~2168 | 145~151 |
| **파노라마 이미지** (탑 tapered) | 2169~2799 | 152~782 |

→ **about-vision 섹션 범위 확정: y = 2017 ~ 2800, height = 783px.** (footer 2800 직전까지)

> 상단 divider는 values 섹션에서 이미 렌더됨(바닥). vision은 divider 직후 공백부터 시작 → **vision 내부 divider 불필요**. 상단 y=0 근방은 values divider 끝단 antialias(2 row)만 포함. plan에서 vision에 divider 추가하지 않음.
> 하단 divider 없음 — Footer가 바로 붙는다 (y=2800부터 footer RGB(12,12,12) 실측 확인).

### 2.1 baseline PNG 생성

- crop `about-full.png` → `(0, 2017, 1920, 2800)` → `figma-screenshots/about-vision.png`
- **실측: 1920×783 RGBA** (file 확인, PIL open 재확인). 모든 픽셀 alpha=255 (반투명 없음 — 흰 하늘은 opaque white).

## 3. 요소별 상세 스펙

### 3.1 본문 텍스트 (3줄)

**내용 (육안 판독):**
```
[단락 1, 2줄 중앙정렬]
ESG실천네트워크는 여러분의 든든한 파트너로서, 청년이 주체가 되고 사회가 함께 성장하며
더 지속가능한 내일을 만들어가는 여정을 이어가겠습니다.

[강조 한 줄]
감사합니다.
```

**수직 스펙:**

| 요소 | vision offset y | cap 높이 |
|------|-----------------|----------|
| body 행1 | 65~79 | 15 |
| body 행2 | 89~103 | 15 |
| line-height pitch (행1 center→행2 center) | 72 → 96 | **24px** |
| body 바닥 → 감사합니다 탑 | 103 → 128 | **25px gap** (단락 break) |
| 감사합니다 | 128~144 | 17 (행 높이 포함) — 실제 cap 15 |

- font-size 추정: **16px** (cap 15 → Pretendard 16) — about-values 설명 규격과 동일.
- line-height: **24px** (values 설명과 동일).
- 단락 gap 25px = 단순 `mt-[24px]` 또는 `<p>` 블록 분리.

**수평 스펙 (모두 canvas x=960 중앙정렬):**

| 요소 | x 범위 | 폭 | center x |
|------|--------|---|---------|
| body 행1 | 681..1237 | 557 | 959 ✓ |
| body 행2 | 786..1133 | 348 | 959.5 ✓ |
| 감사합니다 | 920..998 | 79 | 959 ✓ |

→ 레이아웃: 3행 `text-center`, 중앙정렬 한 블록.

**color 측정 (픽셀 샘플):**

| 요소 | RGB | hex |
|------|-----|-----|
| body 행1 (darkest) | (29,38,35) | `#1d2623` ✓ (Gray 900) |
| 감사합니다 (darkest) | (29,38,35) | `#1d2623` ✓ |

**weight:**
- body: Regular (glyph 두께 정상)
- 감사합니다: Bold 가능성 (카피 단독 강조) — 글리프 두께 비교 시 body와 유사해 보이나 **약간 두꺼움**. `font-bold` 적용 후 G1에서 보정 예정 (미세 차이 예상).

> 검증: body 2줄(단락1) + 감사합니다 1줄 = 총 3 text line. 카피 단독 강조는 단락 break만 있는 Regular일 수도 있음 → **Bold로 시작하고 G1 diff 심하면 Regular로 전환** (§9 리스크).

### 3.2 파노라마 이미지 (메인 시각 요소)

| 항목 | 값 |
|------|---|
| 캔버스 위치 (vision offset) | y=152..782, x=0..1919 |
| 실측 bbox | **1920×631** (풀블리드 x, 하단까지) |
| 탑 edge | tapered (빌딩 top이 y=152에 먼저 등장, 언덕은 y=195~) |
| 바닥 edge | 풀-width 1920 (y=782 완전 non-white) |
| 이미지 내용 | 자연+도시 파노라마: 녹색 언덕 2봉 + 수직정원 빌딩 클러스터 좌/우, 하단 풀블리드 잔디 + 중앙 도로 |
| 하늘 영역 | opaque white (alpha=255) — 진짜 transparent 아님 |

**처리 전략 — baseline crop 단일 PNG:**
- 개별 빌딩/언덕 노드 없음, Figma에 단일 composite. SVG 재생성 불가.
- 파노라마는 **크고(1920×631) 복잡한 렌더링 + antialias edge**.
- RGBA 유지하지만 alpha=255 전역이라 실질 RGB. 그러나 **§2.5 규칙에 따라 RGBA → JPG 변환 금지**. PNG로 저장.
- 용량 최적화: main-gallery 선례대로 palette PNG (256색) 또는 pngquant. 단계 3에서 `process-assets.py` 또는 PIL `quantize(256)`.

| 파일명 | crop from `about-full.png` | 출력 크기 | 포맷 | 배치 |
|--------|---------------------------|-----------|------|------|
| `panorama.png` | (0, 2169, 1920, 2800) | 1920×631 | PNG (RGBA 유지, palette 최적화 시도) | absolute y=152 x=0 (풀블리드) |

> crop 영역은 파노라마 bbox 정확히. 탑 edge가 tapered이지만 y=152 row는 흰 배경 + 빌딩 4px 정도만 → 포함 OK (흰 배경은 시각 영향 0).

### 3.3 Canvas-Asset 개수 일치 검증

- Canvas visible 요소:
  - body text 2줄 (HTML)
  - 감사합니다 1줄 (HTML)
  - **파노라마 이미지 × 1 (에셋 필요)**
- **다운로드(crop) 대상 = 1**
- Canvas 이미지 = 1. **일치 (1 = 1). ✓**

## 4. baseline 실측 (§2.6 필수)

- `figma-screenshots/about-vision.png` = **1920×783 RGBA** (file + PIL open 양쪽 확인)
- alpha 전역 255 (진짜 transparent 픽셀 없음)
- clip 파라미터 불필요 — 풀폭 1920. `compare-section.sh about-vision` 기본 호출 가능.
- preview viewport: 1920×783

## 5. 에셋 crop 계획 (src/assets/about-vision/)

| 파일명 | crop from `about-full.png` | 크기 | 포맷 | 설명 |
|--------|---------------------------|------|------|------|
| `panorama.png` | (0, 2169, 1920, 2800) | 1920×631 | PNG | 단일 파노라마 |

- Python PIL 단계 3에서 생성
- RGBA 유지 (§2.5 "RGBA PNG → JPG 금지")
- 최적화: `im.quantize(256, method=Image.Quantize.MEDIANCUT)` 또는 `pngquant` — main-gallery 선례 재사용
- **대안(검토):** `panorama.jpg` (RGB로 저장) — 크기 1/3~1/5로 감소 가능하지만 §2.5 규칙 준수 위해 **PNG 고정**

## 6. 디자인 토큰 매핑 후보

- 본문 다크: `--color-gray-900 = #1d2623` ✓ (기존)
- 배경: `bg-white`
- 폰트: `font-sans` (Pretendard) + Regular/Bold
- 녹색 강조: 없음 (모든 텍스트 다크)

## 7. 신규 공통 컴포넌트 결정

| 후보 | 결정 |
|------|------|
| `HatchedDivider` | **사용하지 않음** (vision 섹션 내부에는 divider 없음. 상단 divider는 values의 bottom divider로 이미 렌더됨, 하단은 Footer가 붙음) |
| `ValueCard` 등 | 불필요 |

→ 이 섹션은 **로컬 전용, 신규 공통 컴포넌트 0**.

## 8. SectionTabs 여부

- about-header 전용. vision 미사용.

## 9. 리스크 (섹션 고유)

1. **"감사합니다." weight 판정:** Bold 또는 Regular + 단락 gap만. 육안으로 미세 두께 차이. **Bold로 시작, G1 diff 악화 시 Regular 전환**. 1~2px 조정 영향.

2. **파노라마 crop edge antialias:** 탑이 tapered (흰 하늘이 빌딩/언덕 edge와 점진 섞임). baseline crop 영역은 full 1920×631이라 edge 자체가 포함됨 → G1 미영향. 다만 저장 시 quantize 256색으로 압축할 경우 미세 색차 가능. **첫 시도는 quantize 없이 원본 PNG 저장 → G1 측정 → 통과 시 optimize**. main-gallery 선례와 동일 순서.

3. **파노라마 파일 크기:** 1920×631 RGB PNG는 대략 1~3MB 예상. 초기 렌더 느릴 수 있음 (단, 프리뷰 라우트라 무관). 필요 시 `loading="eager"` 또는 `fetchpriority="high"`.

4. **텍스트 줄바꿈 위치 정확도:** body 2줄 break는 baseline에 의해 고정. `whitespace-nowrap` + `<br>` 수동 삽입 (§2.4 `<br>` 보존 규칙).

5. **body 단락 gap 25px:** `<br><br>` 또는 `mt-[25px]`. `<p>` 블록 분리 시 margin 충돌 방지 위해 **`mt-[24px]` 사용** (line-height 값과 동일).

6. **G1 예상:** 파노라마 이미지는 baseline crop이므로 거의 완벽 일치 (~0.5%), 텍스트 antialias 0.8~1.5% 더해 **총 1.5~3.0%** 예상. 가장 쉬운 섹션. <5% 안정 목표.

## 10. 단계 1 산출 파일

- `figma-screenshots/about-vision.png` (1920×783 RGBA, baseline crop — 생성 완료)
- 본 파일 `research/about-vision.md`
- (진단 tmp 파일 `_tmp_vision_*.png` 생성 후 단계 1 종료 시 삭제)

## 11. 측정 요약 (단계 2 plan 입력)

| 구분 | 값 |
|------|---|
| 섹션 범위 (canvas y) | 2017..2800 |
| 섹션 크기 | 1920×783 |
| 본문 중앙정렬 x | canvas x=960 |
| body 행1 top offset | y=65 |
| body 행2 top offset | y=89 |
| 감사합니다 top offset | y=128 |
| 파노라마 top offset | y=152, 크기 1920×631 |
| body font-size | 16px |
| body line-height | 24px |
| body 단락 gap | 24~25px |
| 감사합니다 weight | **Bold (초기), G1 평가 후 조정** |
| 텍스트 색상 | `#1d2623` |
| 에셋 수 | 1 (panorama.png) |

---

## 멈춤 지점

단계 1 완료. 이어서 `plan/about-vision.md` 작성 후 단계 2 승인 게이트에서 멈춤.
