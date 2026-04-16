# plan/about-organization-panorama.md — About 조직도 페이지 파노라마 섹션 구현 계획 (v4 재작성)

> Phase 3 단계 2. `/about/organization` 4번째(마지막) 섹션. 전략 **[A] 완전 HTML 재구성 + vision panorama 에셋 재사용**.
> 선행: `research/about-organization-panorama.md`. baseline `figma-screenshots/about-organization-panorama.png` (1920×440 RGBA, crop 재생성 완료).
> 공통 규칙: `CLAUDE.md` (v4 차단/참고 게이트) / `docs/section-implementation.md` §2.4 / §2.5 / §2.6 / §6.1 / §6.4.
> v2~v3 plan 잔존 기록: 이미 G1 1.18% 예상 확인. v4는 구조 지표 강화(`token_ratio ≥ 0.2`, `absolute/file ≤ 5`, G5~G8 차단 게이트) 적용.

## 0. v4 변경 요점

| 항목 | v2/v3 | v4 |
|------|-------|-----|
| 차단 게이트 | G1 <5% 필수 | G5/G6/G8/G2/G4 차단, G1 ≤15% 참고 |
| 디자인 토큰 | bg-white만 | bg-white + `var(--color-gray-*)` 가능하면 활용 (본 섹션은 white만) |
| absolute 최소화 | 명시 없음 | 1회 (panorama offset -48 crop 수단) |
| 시맨틱 HTML | section + img | section + `h2 sr-only` + `figure > img` |
| JSX literal (G8) | 없음 | "ESGPN 자연과 도시의 공존 비전" sr-only h2 추가 |
| img native 크기 | 631 (stale 기록) | **628** (실측 파일 확인 — `src/assets/about-vision/panorama.png` 1920×628) |

## 1. 목표

- baseline crop 1920×440과 1:1 일치하는 React 컴포넌트.
- **G1 <5%** (예상 0.5~2.0%, 압축 아티팩트 수준).
- vision panorama 에셋 재사용 (신규 다운로드 0).

## 2. 컴포넌트 구조

### 2.1 신규 파일

```
src/components/sections/AboutOrganizationPanorama/
├─ AboutOrganizationPanorama.tsx   (section body)
└─ index.ts                         (re-export)

src/routes/
└─ AboutOrganizationPanoramaPreview.tsx  (/__preview/about-organization-panorama)
```

### 2.2 컴포넌트 트리 (v4 최종)

```tsx
<section
  aria-labelledby="about-organization-panorama-title"
  className="relative mx-auto flex h-[440px] w-full max-w-[1920px] flex-col overflow-hidden bg-white"
>
  <h2 id="about-organization-panorama-title" className="sr-only">
    ESGPN 자연과 도시의 공존 비전
  </h2>
  <figure className="relative m-0 h-full w-full">
    <img
      src={panorama}
      alt=""
      aria-hidden="true"
      width={1920}
      height={628}
      className="absolute left-0 top-[-48px] block h-[628px] w-full"
    />
  </figure>
</section>
```

### 2.3 핵심 치수

| 속성 | 값 | 근거 |
|------|---|------|
| section w | 1920 | full.png 풀블리드 |
| section h | 440 | baseline crop height |
| section bg | `bg-white` | chart 섹션 하단 padding과 동일 (y=880 전 몇 행은 white) |
| img src | `@/assets/about-vision/panorama.png` | research §3.5 재사용 결정 |
| img w × h | 1920 × 628 | vision panorama 원본 파일 실측 (`file` 결과) |
| img top offset | **-48 px** | research §3.2 offset 스캔 최적값 (mean_abs_diff 2.79) |
| img left | 0 | 풀블리드 |
| wrapper overflow | hidden | 631px 이미지 중 48~488 구간만 표시, 상단 48 / 하단 143 잘림 |

### 2.4 왜 wrapper `div overflow-hidden`를 추가로 씌우나

- `<section>` 자체에 `overflow-hidden`을 주고 img에 `absolute top-[-48px]`를 쓰면 충분하다. 그러나 section 자체의 `absolute` 자식 positioning 유연성 확보 차원에서 명시적 wrapper 사용. (미래 텍스트/overlay 추가 가능성 0에 가까우나 패턴 통일.)
- 실제로 한 층 제거해도 동일 렌더. 단순성 우선 **section 내부에 wrapper 제거하고 section만 overflow-hidden 적용** 채택 (옵션 B). 최종 코드:

```tsx
<section className="relative w-[1920px] h-[440px] bg-white overflow-hidden mx-auto">
  <img
    src={panorama}
    alt=""
    width={1920}
    height={631}
    className="absolute left-0 top-[-48px] block"
  />
</section>
```

→ **옵션 B 채택**. 레이어 최소.

## 3. 에셋 계획

### 3.1 재사용 에셋

| # | import | source | 신규 다운로드 |
|---|--------|--------|---------------|
| 1 | `import panorama from "@/assets/about-vision/panorama.png"` | 기존 vision 에셋 (1920×631 RGBA) | **없음** |

- **신규 폴더 생성하지 않음** (`src/assets/about-organization-panorama/` 미생성).
- `scripts/download-assets.sh` / `verify-assets.sh` / `process-assets.py` **스킵**.

### 3.2 Canvas-Asset 개수 일치

- Canvas 가시 요소: 1 (파노라마)
- 신규 다운로드: 0
- 재사용: 1
- 합계 1 = 1 ✓

## 4. 라우트 (preview + main)

### 4.1 Preview 라우트

```tsx
// src/routes/AboutOrganizationPanoramaPreview.tsx
import { AboutOrganizationPanorama } from "@/components/sections/AboutOrganizationPanorama";

export function AboutOrganizationPanoramaPreview() {
  return (
    <div className="w-[1920px] min-h-[440px] mx-auto bg-white">
      <AboutOrganizationPanorama />
    </div>
  );
}
```

- `src/App.tsx`에 `<Route path="/__preview/about-organization-panorama" element={<AboutOrganizationPanoramaPreview />} />` 추가.
- bg-white 래퍼 (§6.1 준수).

### 4.2 Main 페이지 조립

- `src/routes/AboutOrganization.tsx` (또는 동등) 에 `<AboutOrganizationPanorama />`를 chart 섹션 다음에 배치. 페이지 조립은 전체 섹션 완성 후 통합 단계에서 확인.

## 5. 4 게이트 예상 측정

| 게이트 | 예상 값 | 근거 |
|--------|---------|------|
| G1 시각 diff | **0.5~2.0%** | vision panorama 원본 img vs baseline crop(quantize). ±3 diff 74% 일치, ±10 diff 92% 일치. 압축 아티팩트만 차이 |
| G2 치수 | font 해당 없음(텍스트 0), img 1920×631 naturalSize 정확, 섹션 440 | 수치 고정 |
| G3 에셋 무결성 | img naturalWidth=1920, naturalHeight=631 | vision과 동일 에셋 로드 확인 |
| G4 색상 | 배경 white, 텍스트 없음 | arbitrary hex 사용 없음 |

**예상 1회차 PASS 확률 매우 높음** (가장 단순한 구조).

## 6. clip 파라미터 (단계 5 G1 측정)

- 풀폭 1920×440 → `scripts/compare-section.sh about-organization-panorama` 기본 호출로 충분.
- `--clip-*` **불필요**.
- preview URL: `http://localhost:5173/__preview/about-organization-panorama` (viewport 1920×440).
- baseline: `figma-screenshots/about-organization-panorama.png` (1920×440 RGBA).

## 7. 구현 단계 (단계 4 기계적 변환)

1. `src/components/sections/AboutOrganizationPanorama/AboutOrganizationPanorama.tsx` 작성
2. `src/components/sections/AboutOrganizationPanorama/index.ts` re-export
3. `src/routes/AboutOrganizationPanoramaPreview.tsx` 작성
4. `src/App.tsx`에 preview Route 추가 + import
5. 빌드/타입체크/린트 통과 확인
6. 단계 5: `scripts/compare-section.sh about-organization-panorama` 실행 후 측정값 본 파일 §9에 기록

## 8. 리스크 & 완화

1. **offset 48 px 정확도**
   - 스캔 최적값. 1 px 오차 예상 G1 ±0.3%.
   - 완화: 1회차 측정 후 diff 이미지에서 상단 edge가 밀리면 47 or 49로 조정 (최대 1 px).

2. **quantize 아티팩트**
   - baseline crop PNG와 React img 렌더 품질 차이 (±3 diff 26% 픽셀).
   - 완화: baseline도 vision 섹션과 동일한 저장 파이프라인 통과 → quantize 동일 적용됨을 재확인. 필요 시 baseline을 raw RGBA로 재저장하여 비교.

3. **바닥 풀블리드 자연 잘림 (y=488 이후 143 px)**
   - vision panorama의 하단 143 px은 section 440 기준 아래로 밀려나 overflow-hidden으로 cut.
   - 완화: section h=440 고정, img h=631 자연 노출, overflow 작동 확인.

4. **vision 에셋 의존성**
   - vision panorama가 교체되면 organization도 영향.
   - 완화: 현 시점 양쪽 모두 Figma 원본 동일. 미래 디자인 변경 시 독립 분리 재평가.

5. **§2.5 규칙 (RGBA PNG → JPG 금지)**
   - 재사용 에셋이 이미 RGBA PNG. 이슈 없음.

## 9. 측정 기록 (v4)

### 회차 1 — 2026-04-16 (v4 재구현)

- **G1 시각 diff**: **1.18%** (9938/844800px) — baseline 1920×440, capture 상단 440 crop, threshold 0.1. v4 참고 기준 (≤15%) 통과. 압축 아티팩트 수준.
- **G2 치수**: PASS — section 1920×440 (computed 440px), figure 1920×440 (h-full), img 1920×628 at top=-45, position absolute. DOM 측정:
  ```
  sectionRect: 1920×440
  figureRect: 1920×440
  imgRect: 1920×628 @ top=-45
  imgComputed: h=628px, w=1920px, top=-45px, position=absolute
  ```
- **G3 에셋 무결성**: PASS — img naturalWidth=1920, naturalHeight=628 (vision panorama 재사용 로드 확인)
- **G4 색상 토큰**: PASS — `bg-[var(--color-gray-000)]` (= #ffffff), `text-[var(--color-gray-900)]`. hex 직접 사용 0
- **G5 jsx-a11y**: PASS (eslint 0 error)
- **G6 텍스트비율**: PASS (textChars=19, imgCount=1, rasterHeavy=false)
- **G7 Lighthouse**: SKIP (lhci 미설치)
- **G8 i18n**: PASS (JSX literal "ESGPN 자연과 도시의 공존 비전" 존재)

### v4 구조 지표

| 지표 | 값 | 기준 | 결과 |
|------|---|------|------|
| token_ratio | 0.444 (4 token / 9 total) | ≥ 0.2 | PASS |
| absolute_count / file | 2 / 1 | ≤ 5 | PASS |
| semantic_score | 3 (section + h2 + figure) | ≥ 2 | PASS |
| magic_number_count | 5 (h-[440px], max-w-[1920px], top-[-45px], h-[628px], w-[1920px] wrapper) | - | - |
| text_raster_flag | 0 | 0 | PASS |

### offset 탐색 기록

1. 초기값 `-48px` (research 예측): diff 21.04% — 실제 렌더링과 baseline 사이 수직 3px misalign
2. `-51px` 시도: diff 26.68% — 악화
3. `-45px`: **diff 1.18%** — best. 최종 채택

**최종 offset**: `top-[-45px]` (research 예측 -48에서 3 px 조정).
**육안 semantic 검증**: PASS (0건 오류) — 건물/언덕/잔디 배치 baseline 일치, 방향 반전 없음, overflow-hidden 자연 clip 확인.
**페이지 통합 검증**: `/about/organization` 1920 뷰포트 캡처 (`docs/width-audits/about-organization-1920-integrated.png`) — Tabs/Logos/Chart/Panorama 순차 배치 정상.

## 10. 새 npm 패키지

없음. 기존 의존성 (React + Tailwind + Vite)만 사용.

## 11. 새 공통 컴포넌트

없음. 로컬 단일 컴포넌트.

## 12. 커밋 메시지 (단계 7)

```
feat: about-organization-panorama 섹션 (G1 X.XX%, vision panorama 재사용 0 신규 에셋)
```

PROGRESS.md의 About 조직도 항목 4/4 체크 + diff % 기록.

---

## 멈춤 지점

단계 2 완료. **사용자 승인 대기** (approval-gate-format 적용 보고는 오케스트레이터가 담당).
