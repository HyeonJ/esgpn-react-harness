# Plan — gallery-activities (Node 314:7103)

> Figma 314:7103 / 936×519 (실측 baseline 937×519) / 페이지 좌표 (492, 1432, 936, 519)
> v4 자율 모드 재실행 (이전 v3 완료 이력은 아래 "v3 이전 이력" 섹션)

## 공통 승격 판단: (A) 승격

### 구조 비교 결과
- GalleryAgreements MouCard (로컬 4회) vs GalleryActivities 카드 (1회) = Rule of Three 5회 충족
- 차이 3가지 모두 props로 흡수 가능:
  1. `rounded-[24px]` — Figma가 agreements·activities 모두 cornerRadius:24 (기존 agreements에 누락됨, 수정 필요)
  2. `descriptionLine2?: string` — undefined 시 1줄 `whitespace-nowrap`
  3. 카드 내부 gap — `flex col gap-[24px]`로 통일 (pt-24 제거)

### 파급 범위 (같은 커밋)
- `src/components/ui/MouCard.tsx` 신설
- `src/components/sections/GalleryAgreements/MouCard.tsx` 삭제
- `src/components/sections/GalleryAgreements/GalleryAgreements.tsx` import 변경 + 추가 props 전달

## 컴포넌트 트리

```
<section aria-labelledby="gallery-activities-heading">        ← mx-auto w-full max-w-[1920px] justify-center
  <div w-[936px] col items-center gap-24 pb-40>
    <div flex items-center gap-8 w-full>                      ← 헤딩행
      <h2 id="gallery-activities-heading">관련 활동 및 수상</h2>
      <HatchedInlineDecor>                                    ← GalleryAgreements/ 재사용
    <div flex justify-center w-full>
      <MouCard                                                ← src/components/ui/MouCard
        image={awardCard}
        alt=""
        institutionLine1="COLiVE_한국ESG대상 수상"
        institutionLine2Prefix=""
        dateDisplay="(2023.12.26.)"
        dateIso="2023-12-26"
        descriptionLine1="사회공헌부문 단체"
        nodeId="314:7127"
      />
```

## MouCard props (승격 후)

```ts
export type MouCardProps = {
  image: string;
  alt: string;
  institutionLine1: string;
  institutionLine2Prefix: string;
  dateDisplay: string;
  dateIso: string;
  descriptionLine1: string;
  descriptionLine2?: string;  // undefined → 1줄 whitespace-nowrap
  nodeId?: string;
};
```

## 신규 / 수정 파일

| 파일 | 동작 |
|---|---|
| `src/components/ui/MouCard.tsx` | **신규** (로컬 MouCard 로직 + rounded + descriptionLine2 optional) |
| `src/components/sections/GalleryAgreements/MouCard.tsx` | **삭제** |
| `src/components/sections/GalleryAgreements/GalleryAgreements.tsx` | import 경로 변경 (`@/components/ui/MouCard`) |
| `src/components/sections/GalleryActivities/GalleryActivities.tsx` | **신규** |
| `src/components/sections/GalleryActivities/index.ts` | **신규** |
| `src/preview/PreviewGalleryActivities.tsx` | **신규** (라우트 컴포넌트) — 기존 구조 확인 필요 |
| `src/assets/gallery-activities/award-card.png` | **신규** (Figma 314:7128 2x export, 912×604) |
| `src/routes.tsx` 또는 App | Preview 라우트 등록 |

## 에셋

| 파일 | 크기 | 처리 |
|---|---|---|
| `src/assets/gallery-activities/raw/award-card.png` | 912×604 PNG | 원본 보존 (완료) |
| `src/assets/gallery-activities/award-card.png` | 912×604 PNG | 압축 (oxipng 등) — raw에서 복사 후 최적화 |

- leaf nodeId `314:7128` (no text) — text-bearing raster 위험 없음
- composite fill (blur BG + 메인 photo) 이미 Figma export에서 합성됨 → HTML에서는 단일 `<img>`

## 측정 계획

- clip: `--clip-x 492 --clip-y 0 --clip-w 936 --clip-h 519`
- baseline: `figma-screenshots/gallery-activities.png` (937×519)

### 차단 게이트
- G5 eslint jsx-a11y 0 error
- G6 text/alt ratio (alt<80자면 자동 PASS)
- G8 i18n (JSX literal text 존재)
- G2 치수 ±2 (font ±1)
- G4 색상 hex 일치

### 참고 게이트
- G1 ≤15% (완화 한계는 15%, 이상적으로 ≤7%)
- G3 모든 img naturalWidth > 0
- G7 Lighthouse (lhci 설치 시만)

### 구조 지표
- token_ratio ≥ 0.2
- absolute/file ≤ 5 (이 섹션은 absolute 없음 예상)
- semantic_score ≥ 2 (section, h2, article, img, time, p)

## 자동 커밋

- 전부 PASS 시: `feat(section): gallery-activities 구현 + MouCard ui 승격 (diff X.X% / G5-G8 PASS) [auto]`
- PROGRESS.md 33/43 → 체크

## v3 이전 이력 (참고)

- v3 단계 5 G1: **1.34%** (clip 491,0,937,519) — PASS
- v3에서 ui/MouCard, ui/HatchedInlineHeading 2개 승격했으나 v4 브랜치에서는 아직 미실행
- v4에서는 MouCard만 승격 (HatchedInlineDecor는 2회 사용 → Rule of Three 미충족, 로컬 유지)

## 단계별 측정 (v4 기록)

### 단계 4.5 (구조·품질)
- G5 eslint: 0 error PASS
- G6 text/alt ratio: ∞ (no alt, alt=0) PASS
- G7 Lighthouse: SKIP (lhci 미설치)
- G8 i18n: PASS (JSX literal text 50자)
- Tailwind 안티패턴: 없음
- Baked-in PNG 중첩: 없음

### 단계 5 회차 1 (픽셀·치수)
- G1: **1.15%** (5591/485784px) ✅ (clip 492,0,936,519) — 참고 ≤15%
- G2 치수: heading 16/500/LH24/LS-0.16 ✅, cardTitle 24/600/LH33.6 ✅, cardDesc 14/400/LH21/LS0.28 ✅, article 456×430 ✅, 중앙정렬 x=732 (완벽 중앙)
- G3 에셋: award-card.png naturalWidth 912 ✅
- G4 색상: heading rgb(0,0,0) ✅, title/desc rgb(29,38,35) = #1d2623 ✅
- 육안 semantic: capture/diff 확인. 카드 rounded 24 정상, 이미지·텍스트 배치 baseline과 일치. diff는 한글 AA 서브픽셀만
- 구조 지표: token_ratio 0.40, absolute 0/2 files = 0/file, semantic_score 6 (section, h2, article, img, p, time)

### 회귀 검증
- gallery-agreements 재측정: 5.62% (기존 5.61% → +0.01%p 유의미하지 않음)
- gallery 페이지 통합: 3섹션 정상 stacking (y=180/304/1327), 가로스크롤 없음, activities 높이 518 ≈ Figma 519

### 자동 커밋
- 모든 차단 게이트 PASS
- 부채 등록 없음
- 커밋 메시지: `feat(section): gallery-activities 구현 + ui/MouCard 공통 승격 (diff 1.15% / G5-G8 PASS) [auto]`
