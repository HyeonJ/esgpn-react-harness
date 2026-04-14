# plan/about-organization-panorama.md — About 조직도 페이지 파노라마 섹션 구현 계획

> Phase 3 단계 2. `/about/organization` 4번째(마지막) 섹션. 전략 **[A] 완전 HTML 재구성 + vision panorama 에셋 재사용**.
> 선행: `research/about-organization-panorama.md`. baseline `figma-screenshots/about-organization-panorama.png` (1920×440 RGBA).
> 공통 규칙: `CLAUDE.md` / `docs/section-implementation.md` §2.4 / §2.5 / §2.6 / §6.1 / §6.4.

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

### 2.2 컴포넌트 트리

```
<section className="relative w-[1920px] h-[440px] bg-white overflow-hidden mx-auto">
  <div className="absolute inset-0 overflow-hidden">
    <img
      src={panorama}            // @/assets/about-vision/panorama.png
      alt=""                    // decorative
      width={1920}
      height={631}
      className="absolute left-0 top-[-48px] block"
    />
  </div>
</section>
```

### 2.3 핵심 치수

| 속성 | 값 | 근거 |
|------|---|------|
| section w | 1920 | full.png 풀블리드 |
| section h | 440 | baseline crop height |
| section bg | `bg-white` | chart 섹션 하단 padding과 동일 (y=880 전 몇 행은 white) |
| img src | `@/assets/about-vision/panorama.png` | research §3.5 재사용 결정 |
| img w × h | 1920 × 631 | vision panorama 원본 크기 |
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

## 9. 측정 기록 (단계 5/6 완료 후 채움)

| 회차 | 일시 | G1 diff% | G2 | G3 | G4 | 비고 |
|------|------|---------|----|----|----|------|
| 1 | 2026-04-14 | **1.18%** (9938/844800px) | PASS (section 1920×440, img render 1920×631, top -48, left 0, position absolute) | PASS (naturalWidth=1920, naturalHeight=631 — vision panorama 재사용 로드 확인) | PASS (section bg rgb(255,255,255) = white, 텍스트 0) | 1회차 PASS. 예상 범위 (0.5~2.0%) 내. offset 48 유지. 육안 semantic 검증: 도시 실루엣/언덕/수목 배치 baseline과 일치, 방향 반전 없음, overflow-hidden 하단 cut 자연스러움 → PASS |

**최종 offset**: -48 px (초기값 유지, 조정 없음).
**육안 검증**: PASS 0건 오류.

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
