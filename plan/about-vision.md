# plan/about-vision.md — About Vision 섹션 구현 계획

> 기반: `research/about-vision.md`. 전략 **[A] 완전 HTML 재구성 + 단일 파노라마 에셋**.
> baseline: `figma-screenshots/about-vision.png` (1920×783). 선례: `plan/about-values.md`, `plan/about-mission.md`.

## 1. 컴포넌트 구조

### 1.1 파일 레이아웃

```
src/
├─ components/sections/AboutVision/
│  ├─ AboutVision.tsx                ← 섹션 엔트리 (export default)
│  └─ index.ts
├─ assets/about-vision/
│  └─ panorama.png                   ← 1920×631 RGBA 파노라마 (crop)
├─ routes/
│  └─ AboutVisionPreview.tsx         ← /__preview/about-vision
└─ App.tsx                            ← 라우트 추가
```

**공통 컴포넌트 신규 없음.** HatchedDivider 미사용 (research §7).

### 1.2 AboutVision 트리

```tsx
import panorama from "@/assets/about-vision/panorama.png?url";

export function AboutVision() {
  return (
    <section className="relative w-[1920px] h-[783px] bg-white overflow-hidden">
      {/* 본문 텍스트 (중앙정렬, 3행) */}
      <div className="absolute left-0 right-0 top-[65px] text-center text-[16px] leading-[24px] text-[var(--color-gray-900)]">
        <p className="whitespace-nowrap">
          ESG실천네트워크는 여러분의 든든한 파트너로서, 청년이 주체가 되고 사회가 함께 성장하며<br />
          더 지속가능한 내일을 만들어가는 여정을 이어가겠습니다.
        </p>
        <p className="mt-[24px] font-bold whitespace-nowrap">감사합니다.</p>
      </div>

      {/* 파노라마 이미지 (풀블리드, 하단) */}
      <img
        src={panorama}
        alt=""
        width={1920}
        height={631}
        className="absolute left-0 top-[152px] block"
      />
    </section>
  );
}
```

## 2. Props / 데이터

- `AboutVision`: props 없음, 텍스트 하드코딩 (baseline에서 OCR 완료)
- 외부 노출 API 없음

## 3. 스타일 매핑 (측정치 → CSS)

| 요소 | 측정치 | Tailwind / CSS |
|------|-------|---------------|
| section | 1920×783 | `w-[1920px] h-[783px] bg-white relative overflow-hidden` |
| 본문 블록 | top=65, 수평 중앙정렬 | `absolute left-0 right-0 top-[65px] text-center` |
| body 행1/2 | 16px Regular, lh 24 | `text-[16px] leading-[24px]` + `whitespace-nowrap` |
| body↔감사 단락 gap | 24~25px | `mt-[24px]` |
| 감사합니다 weight | Bold (초기) | `font-bold` |
| 텍스트 색 | `#1d2623` | `text-[var(--color-gray-900)]` |
| 파노라마 | 1920×631, 풀블리드, top=152 | `absolute left-0 top-[152px]`, width/height attrs |

### 3.1 줄바꿈 정확도

- body 2줄: `<br>` 수동. 줄 경계는 baseline과 1:1 (research §3.1 판독 텍스트 그대로).
- `whitespace-nowrap` 사용 이유: 브라우저 자동 줄바꿈이 배치를 어긋나게 할 가능성 차단. 1920 컨테이너 width + 557px text width는 자동 줄바꿈 여지 없지만 안전장치.

### 3.2 Preview wrapper

- §6.1 규칙: preview 라우트는 `bg-white`로 감싼다.
- viewport 1920×783으로 캡처 (clip 불필요).

## 4. 에셋 계획 (Canvas-Asset 일치 1=1)

**구현 에셋: 1개 (crop PNG).**

| 파일 | crop from `about-full.png` | 크기 |
|------|---------------------------|------|
| `src/assets/about-vision/panorama.png` | (0, 2169, 1920, 2800) | 1920×631 RGBA |

**생성 스크립트 (단계 3):**
```python
from PIL import Image
im = Image.open('figma-screenshots/about-full.png')
pano = im.crop((0, 2169, 1920, 2800))
pano.save('src/assets/about-vision/panorama.png', optimize=True)
```

- RGBA 유지 (PIL crop default는 모드 유지). **JPG 변환 금지 (§2.5).**
- 첫 시도는 `optimize=True`만. G1 PASS 후 필요시 palette quantize 고려 (main-gallery 선례).
- 예상 파일 크기: 1~3MB (최적화 전). optimize 적용 시 감소 가능.

## 5. 신규 npm 패키지

**없음.**

## 6. 격리 라우트 (G1 캡처용)

```tsx
// src/routes/AboutVisionPreview.tsx
import { AboutVision } from "@/components/sections/AboutVision";

export function AboutVisionPreview() {
  return (
    <div className="w-[1920px] min-h-[783px] mx-auto bg-white">
      <AboutVision />
    </div>
  );
}
```

- `App.tsx`에 `<Route path="/__preview/about-vision" element={<AboutVisionPreview />} />` 추가
- bg-white wrapper (§6.1)
- Header/Footer 제외 (섹션 격리)

## 7. 4 게이트 예상 측정

| 게이트 | 방법 | 예상 | Pass 기준 |
|--------|------|------|----------|
| G1 시각 | `scripts/compare-section.sh about-vision` | **1.5~3.0%** (파노라마 pixel-perfect + 텍스트 antialias) | <5% |
| G2 치수 | DOM: section 1920×783, 파노라마 1920×631, font 16, pano top=152 | ±1~2px | font±1, 그 외 ±2 |
| G3 에셋 | panorama img `naturalWidth=1920`, `naturalHeight=631` | >0 | >0 |
| G4 색상 | computed: text `rgb(29,38,35)` = #1d2623 | 일치 | hex 일치 |

### 7.1 clip 파라미터

floating 요소 없음 (풀폭 1920). `--clip-*` 불필요. `compare-section.sh about-vision` 기본 호출.

### 7.2 선행 섹션 regression

- 이 섹션은 HatchedDivider 승격 같은 공통 리팩토링 없음 → **regression 재측정 불필요**.
- 단순 신규 섹션만 추가.

## 8. 구현 순서 (단계 4)

1. `src/assets/about-vision/` crop 생성 (Python PIL 1 파일)
2. `src/components/sections/AboutVision/AboutVision.tsx` + `index.ts`
3. `src/routes/AboutVisionPreview.tsx`
4. `src/App.tsx` preview 라우트 추가
5. `npm run build && npm run lint` (타입체크 포함)
6. 단계 5 측정 (`scripts/compare-section.sh about-vision`)

## 9. 트레이드오프 / 리스크

1. **"감사합니다." Bold vs Regular:** baseline 글리프 두께 미세 차이로 확신 어려움. **Bold 초기** 후 G1 diff에 따라 Regular 전환. 1 iteration 소요 가능성.

2. **파노라마 파일 크기 1~3MB:** 프리뷰 라우트라 UX 영향 0. 프로덕션 전환 시 `pngquant` 압축 고려 (현재 범위 밖).

3. **whitespace-nowrap 안전성:** 1920 컨테이너에서 1줄 557px → 자동 줄바꿈 가능성 0이지만, `whitespace-nowrap`으로 명시 고정.

4. **단락 gap 24 vs 25:** 실측 25px, Tailwind arbitrary `mt-[24px]`와 `mt-[25px]` 중 line-height와 align되는 24 채택. 1px 차이 G1 무시 수준.

5. **파노라마 top=152 정확도:** crop 소스 좌표 (2169) → 섹션 내부 offset (2169-2017=152). 100% 일치.

6. **G1 <5% 규율:** 예상 1.5~3.0% → 안정 PASS 예상. 실패 시 3회 수정 안에 해결. 3회 미통과 시 즉시 사용자 보고.

## 10. 사용자 승인 요청 항목

- [ ] **베이스라인 경계 y=2017..2800 (높이 783)** OK? (values 하단 divider 공유 포함, Footer 직전까지)
- [ ] **파노라마 단일 PNG crop 전략** (1920×631 RGBA, JPG 변환 없음, §2.5 준수) OK?
- [ ] **본문 텍스트 내용** (research §3.1 OCR) 확정? "ESG실천네트워크는... 이어가겠습니다." + "감사합니다."
- [ ] 본문 **font 16px Regular / line-height 24**, 감사합니다 **font-bold** (Bold 초기 시작, G1 평가 후 조정) OK?
- [ ] 예상 G1 **< 5% (1.5~3.0% 기대)** 동의?
- [ ] HatchedDivider 미사용 (values 하단 divider로 대체) OK?

---

## 측정 섹션 (단계 5·6에서 채워짐)

### 1회차 (2026-04-14)

**G1 시각 일치: 0.70%** (10506 / 1503360 px) — PASS (<5%)
- baseline: `figma-screenshots/about-vision.png` (1920×783)
- capture: `tests/visual/captures/about-vision.png`
- diff: `tests/visual/diffs/about-vision.diff.png`
- clip: 0,0 1920×783

**G2 치수 정확도: PASS**
- section: 1920×783 (spec 일치)
- body p: top=65, centerX=960, font-size 16px, line-height 24px, weight 400
- 감사합니다 p: top=137, bottom=161, font-size 16px, weight 700 (Bold)
  - spec top=128. 실측 137 = 본문 2줄 bottom(113) + mt-24 = 137 ✓ (line-box baseline 기준 계산 차이 — baseline 상 cap top 128과 line-box top 137 차이는 lh=24-cap=15=9px으로 정확히 설명됨)
- 파노라마 img: left=0, top=152, 1920×631 (spec 100% 일치)

**G3 에셋 무결성: PASS**
- panorama img naturalWidth=1920, naturalHeight=631 > 0 ✓

**G4 색상 정확도: PASS**
- body/감사 computed color = `rgb(29, 38, 35)` = `#1d2623` ✓

**육안 semantic 검증: PASS**
- 본문 2줄 줄바꿈·중앙정렬 baseline 일치
- "감사합니다." Bold weight baseline 두께와 시각적 동일 (초기 Bold 결정 유지)
- 파노라마 배경 위치·크기·투명도(opaque white 하늘) baseline 일치
- 방향 반전/swap/텍스트 줄바꿈 오류 없음
- diff 이미지는 텍스트 antialias + 파노라마 미세 픽셀 재샘플링만 (의미적 오류 0)

**최종 결과: 4 게이트 전부 PASS + 육안 PASS, 1회차 통과.**
**"감사합니다." 최종 weight 결정: Bold (font-bold, 700) 유지.**

---

## 멈춤 지점

**단계 2 완료. 단계 3~7은 사용자 승인 후 별도 지시를 기다림.**
