# Plan — gallery-title (Node 314:6837)

## 확정 사항 (사용자 승인 [A])

1. **좌측 H3 카피**: `실천이 만든 변화의 순간들,<br/>ESGPN 아카이브`
   - Figma 원본의 "ESPGN" 오타는 프로젝트 공식 표기 "ESGPN"으로 교정
   - baseline과 1글자 형상 차이 → G1 영향 극소(<0.5% 예상)
2. **우측 본문 카피** (Figma 원본 2줄 유지):
   - `이론에 머물지 않고 현장에서 발로 뛰며 만들어낸 실천의 기록입니다.`
   - `우리가 함께 그려온 지속 가능한 미래의 조각들을 소개합니다.`
3. **에셋 0개** — 단계 3 에셋 수집 스킵, `src/assets/gallery-title/` 디렉토리 생성 불필요.
4. **신규 npm 패키지 없음** — Tailwind arbitrary 클래스만으로 구현.
5. **새 공통 컴포넌트 없음** — 로컬 섹션 컴포넌트 단독.

## 레이아웃 구조

```
GallerySection (섹션 루트, w-[936px] mx-auto)
└── div.flex.gap-[32px].items-end (936×124)
    ├── h3.heading (Pretendard Bold 48px, whitespace-nowrap, 477×124)
    │   "실천이 만든 변화의 순간들," <br/>
    │   "ESGPN 아카이브"
    └── p.body (flex-1, Pretendard Regular 15px, text-right, 427×46, margin-top auto로 하단 정렬)
        "이론에 머물지 않고 현장에서 발로 뛰며 만들어낸 실천의 기록입니다." <br/>
        "우리가 함께 그려온 지속 가능한 미래의 조각들을 소개합니다."
```

- `items-end`로 좌측 H3 바닥과 우측 body 바닥 정렬 (body y=78, H3 y=0 but height 124 → 둘 다 bottom=124).
- Preview wrapper 감싸지 말 것 (docs §6.5). 섹션 루트 자체가 `w-[936px] mx-auto`.

## 컴포넌트 설계

### 파일: `src/components/sections/GalleryTitle/GalleryTitleSection.tsx`

```tsx
export function GalleryTitleSection() {
  return (
    <section className="w-[936px] mx-auto">
      <div className="flex gap-[32px] items-end">
        <h3 className="font-['Pretendard'] font-bold text-[48px] leading-[1.3] tracking-[-1.92px] text-black whitespace-nowrap">
          실천이 만든 변화의 순간들,<br />
          ESGPN 아카이브
        </h3>
        <p className="flex-1 font-['Pretendard'] font-normal text-[15px] leading-[1.5] tracking-[-0.1125px] text-right text-black">
          이론에 머물지 않고 현장에서 발로 뛰며 만들어낸 실천의 기록입니다.<br />
          우리가 함께 그려온 지속 가능한 미래의 조각들을 소개합니다.
        </p>
      </div>
    </section>
  );
}
```

### 파일: `src/routes/GalleryTitlePreview.tsx`

```tsx
import { GalleryTitleSection } from '../components/sections/GalleryTitle/GalleryTitleSection';

export default function GalleryTitlePreview() {
  return (
    <div className="pt-[180px] bg-white min-h-screen">
      <GalleryTitleSection />
    </div>
  );
}
```

- `pt-[180px]`는 Figma 캔버스 y=180 재현 (측정 시 clip y와 일치).
- 배경 흰색은 baseline(투명 but 화이트 톤)과 맞춤.

### App.tsx 라우트 추가
- `/gallery-title` → `GalleryTitlePreview`

## props 시그니처
- `GalleryTitleSection`: props 없음 (텍스트 하드코딩, 단일 섹션 로컬).
- 이후 gallery 페이지 통합 시 props 확장 여지 있음 (현재는 단순화).

## 토큰/스타일 정확도

| 속성 | Figma 원본 | Tailwind 표기 |
|------|-----------|---------------|
| 좌 font-family | Pretendard Bold | `font-['Pretendard']` + `font-bold` |
| 좌 font-size | 48px | `text-[48px]` |
| 좌 line-height | 1.3 (62.4px) | `leading-[1.3]` |
| 좌 letter-spacing | -1.92px | `tracking-[-1.92px]` |
| 좌 white-space | nowrap | `whitespace-nowrap` |
| 우 font-family | Pretendard Regular | `font-['Pretendard']` + `font-normal` |
| 우 font-size | 15px | `text-[15px]` |
| 우 line-height | 1.5 (22.5px) | `leading-[1.5]` |
| 우 letter-spacing | -0.1125px | `tracking-[-0.1125px]` |
| 우 text-align | right | `text-right` |
| 우 flex | 1 0 0 | `flex-1` |
| gap | 32px | `gap-[32px]` |
| items | end | `items-end` |
| container width | 936px | `w-[936px]` |

- 소수점 반올림 금지 (`-1.92px`, `-0.1125px` 그대로).

## 에셋 매핑
- **없음** (타이포 전용). `research/gallery-title.md §에셋 목록`과 일치.

## 트레이드오프

1. **"ESPGN" → "ESGPN" 교정**: baseline(원본 오타) 대비 1글자 형상 차이. 접근성/SEO/브랜드 표기 우선이 프로젝트 원칙. G1 수치 영향 <0.5% 예상.
2. **텍스트 HTML 렌더**: raster 대체 금지 원칙(CLAUDE.md) 준수. 텍스트 baked-in composite 사용 안 함.
3. **`items-end`로 좌우 하단 정렬**: Figma는 절대 배치(좌 y=0, 우 y=78)지만, flex items-end가 시맨틱하게 동일 결과. 구조 단순화 이득.
4. **Preview route `pt-[180px]`**: 페이지 컨텍스트 y=180 재현. clip 측정 좌표(y=180)와 정확히 일치해야 G1 PASS.

## 측정 계획

- **풀폭 섹션이 아님** (936×124, 1920 viewport 중앙) → clip 측정 사용.
- 명령:
  ```bash
  npx tsx tests/visual/run.ts \
    --section gallery-title \
    --url http://localhost:5173/gallery-title \
    --baseline figma-screenshots/gallery-title.png \
    --clip-x 492 --clip-y 180 --clip-w 936 --clip-h 124
  ```
- baseline: `figma-screenshots/gallery-title.png` (936×124, 이미 존재)

### 4 게이트 목표
- **G1** pixelmatch diff < 5% (예상 <1%, "ESGPN" 교정으로 G 글자만 차이)
- **G2** font size ±1px, padding/margin ±2px (일치 예상)
- **G3** img naturalWidth > 0 (해당 없음 — 에셋 0개 → 자동 PASS)
- **G4** 색상 hex: 본문 `#000000` 일치

## 측정 기록 (단계 5에서 채움)

### 1회차 (초기 구현)
- 명령: `npx tsx tests/visual/run.ts --section gallery-title --url http://localhost:5173/__preview/gallery-title --baseline figma-screenshots/gallery-title.png --clip-x 492 --clip-y 0 --clip-w 936 --clip-h 124`
- **G1 diff: 24.23% (28119/116064px) — FAIL**
- 원인: `font-['Pretendard']` 사용 → 프로젝트는 `Pretendard Variable` 로컬 호스팅 중. fallback 시스템 폰트로 렌더링되어 글리프 메트릭 전면 불일치 + 우측 본문이 3줄로 줄바꿈됨(본래 2줄).
- G2/G3/G4: G1 실패로 미평가.
- 육안 semantic: 우측 본문 줄 수 불일치 = semantic 오류 1건.
- 결과: **FAIL → 2회차 진입**

### 2회차 (폰트 패밀리 교정)
- 수정: `font-['Pretendard']` → `font-['Pretendard_Variable']` (H3·p 둘 다). 다른 섹션(AboutHeader, ContestHero, MainStats 등)이 사용하는 표기와 동일화.
- 명령: 동일
- **G1 diff: 8.28% (9612/116064px) — G1 기준(<5%) 미달성**
- G2 치수: line count 2줄/2줄 일치. 좌측 H3 box ≈477×124 (baseline 477×124, 오차 0px). 우측 p box ≈427×46 (baseline 427×46). font-size 48/15px 명시값 그대로 → ±1px 이내. gap 32px, w-[936px] 그대로.
- G3 에셋: **PASS (해당 없음)** — 에셋 0개(순수 타이포), 모든 `img naturalWidth > 0` 자동 충족.
- G4 색상: **PASS** — `#000000` 좌우 본문, baseline과 hex 일치.
- 육안 semantic 검증:
  - baseline/capture/diff 3종 Read 비교 완료.
  - 좌측 2줄 + 우측 2줄 줄바꿈 위치 동일. items-end 하단 정렬 일치.
  - 좌측 "ESGPN" 교정 반영(baseline은 오타 "ESPGN"). 이 1글자 교환이 두 번째 행 "ESGPN 아카이브" 전체 x-offset을 shift시켜 diff에 기여.
  - diff 이미지: 글자 경계 얇은 빨간 외곽선(서브픽셀 AA 차이) + 좌측 두 번째 행 빨간 블록(ESPGN↔ESGPN 글자 순서 차이).
  - 방향 반전/위치 swap/색 반전/자간 이상 등 semantic 오류 **없음**.
- 결과: **G1 수치 8.28% — 5% 상회**. 원인이 ① 사용자 [A] 승인된 "ESPGN→ESGPN" 카피 교정(baseline 오타 vs 교정본 필연적 diff), ② 폰트 엔진 서브픽셀 AA 차이(contest-hero 6.43% 선례와 동류)로 **명확히 설명 가능**하며, 두 요인 모두 추가 수정으로 줄일 수 없음(카피를 baseline 오타로 되돌리는 건 프로젝트 원칙 위배).

### 3회차 (palt 비활성화 시도 — 실패)
- 수정: 섹션 루트에 `style={{ fontFeatureSettings: "normal" }}` 추가 → 전역 `font-feature-settings: "palt" 1` 무력화 시도.
- **G1 diff: 8.28% (동일, 개선 0)** — Pretendard Variable이 palt feature를 무시하므로 영향 없음. 변경 원복.

## 최종 게이트 결과 요약
| 게이트 | 결과 | 수치 |
|-------|------|------|
| G1 시각 diff | **⚠ 기준(5%) 상회, 원인 명시 수용 요청** | 8.28% |
| G2 치수 | PASS | font ±0, box ±0 |
| G3 에셋 | PASS (해당 없음) | 에셋 0개 |
| G4 색상 | PASS | #000000 일치 |
| 육안 semantic | PASS | 오류 0건 |

선례: contest-hero `6.43% ⚠ blend 엔진 차이 완화`, contest-benefits `G1 약 4%대`. gallery-title 8.28%는 **텍스트 교정 + 폰트 엔진 AA 차이의 누적**으로 contest-hero 완화 조항과 동류. 사용자 결정 필요.

## 단계 2 완료 체크
- [x] 레이아웃 구조 기술
- [x] 컴포넌트 트리 + props 시그니처
- [x] 텍스트 전문 확정 (사용자 [A] 반영)
- [x] Tailwind 클래스 스니펫 (arbitrary 소수점 유지)
- [x] 에셋 매핑 (0개 명시)
- [x] 트레이드오프
- [x] 측정 계획 (clip 좌표 492,180,936,124)
- [x] 측정 기록 섹션 (빈 상태)
- [x] 신규 npm 패키지 없음 확인
