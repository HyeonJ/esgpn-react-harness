# plan/gallery-agreements.md (v4)

> Figma 314:7056 / 936×1024 / 페이지 좌표 (492, 360, 936, 1024) / baseline 937×1024

## 컴포넌트 구조

```
GalleryAgreements <section aria-labelledby="gallery-agreements-heading">
  ├─ <div data-node-id="314:7091">  ← 헤딩 바 (flex items-center gap-[8px])
  │    <h2 id="gallery-agreements-heading">업무 협약</h2>  (16/500/LH24/LS -0.16)
  │    <HatchedInlineDecor />  ← line 825 + 6 ticks SVG
  │
  └─ <ul data-node-id="314:7144">  ← 2×2 grid (grid-cols-2 gap-x-[24px] gap-y-[32px])
       <li><MouCard image={mou1} alt="" institution="COLiVE, CSR Impacrt(주), ㈜소프트퍼즐" date="2025. 8. 5." description="..." /></li>
       <li><MouCard image={mou2} ... /></li>
       <li><MouCard image={mou1} ... /></li>   ← Figma 더미 중복 재현
       <li><MouCard image={mou2} ... /></li>
```

MouCard 내부:
```
<article> (w-[456px])
  <div className="h-[302px]"><img src={image} alt={alt} width={456} height={302} className="block h-full w-full object-cover" /></div>
  <div className="pt-[24px] flex flex-col gap-[5px] px-... items-center">
    <p className="font-semibold text-[24px] leading-[33.6px] text-center text-[#1d2623]">{institution} (<time>{date}</time>)</p>
    <p className="font-normal text-[14px] leading-[21px] tracking-[0.28px] text-center text-[#1d2623]">{description}</p>
  </div>
</article>
```

## 날짜 포맷

- 표시: `(2025. 8. 5.)` (Figma 원문)
- `<time datetime="2025-08-05">2025. 8. 5.</time>` ISO 속성 + 사람용 텍스트

## 신규 파일

- `src/components/sections/GalleryAgreements/GalleryAgreements.tsx` — 섹션 본체
- `src/components/sections/GalleryAgreements/MouCard.tsx` — 카드 (로컬, 승격 보류)
- `src/components/sections/GalleryAgreements/HatchedInlineDecor.tsx` — 인라인 헤딩 데코 (line + 6 ticks SVG)
- `src/components/sections/GalleryAgreements/index.ts`
- `src/routes/GalleryAgreementsPreview.tsx`
- `src/assets/gallery-agreements/mou-1.png` (이미 다운로드, 456×302)
- `src/assets/gallery-agreements/mou-2.png` (이미 다운로드, 456×302)

## App.tsx 변경

- `/gallery` 라우트에 `GalleryAgreements` 추가: `<div className="pt-[180px]"><GalleryTitle /><GalleryAgreements /></div>`
- preview 라우트: `/__preview/gallery-agreements` → `GalleryAgreementsPreview`

## 공통 컴포넌트 승격 결정

- **MouCard**: `gallery-activities` 구현 시점에 실제 구조 일치 확인 후 `src/components/ui/MouCard.tsx`로 승격. 현 단계는 **로컬 유지**. Rule of Three 2/3 진행 중.
- **HatchedInlineDecor**: 섹션 전용. `gallery-activities`에서 동일 패턴("관련 활동 및 수상" 텍스트 + 더 짧은 line + 6 ticks) 등장 예정 → 그때 폭 prop화 승격 후보. 현 단계 로컬.

## 디자인 토큰 매핑

- 헤딩 color: `text-black` (Figma fills 기본 black 가정. 실제 `#000` 또는 near-black. 정확한 style 확인 결과 color spec 없어 검정 fallback).
- 본문 color: `text-[#1d2623]` (기존 프로젝트 확인된 near-black 토큰; v1~v3 동일 사용)
- font-family: `var(--font-family-pretendard)`
- heading line stroke: `var(--color-gray-500)` → `#97A29E`
- tick stroke: `var(--color-gray-500)` → `#97A29E`

## 반응형

- Figma 1920 단일 디자인 기준. 섹션 `w-[936px] mx-auto`. 하위 뷰포트 축소는 별건 PR 이월 (CLAUDE.md §재량 범위).

## 금지 사항 재확인

- 다른 섹션 파일 수정 금지 → 준수
- 텍스트 포함 composite PNG 사용 금지 → 준수 (텍스트 전부 HTML literal)
- 부모 nodeId로 export 금지 → 준수 (314:7063, 314:7068 leaf 사용)

## 측정 계획

### 단계 4.5 (구조·품질 게이트, 차단)
- G5 eslint jsx-a11y
- G6 text/alt 비율 ≥ 3:1
- G7 lhci skip (미설치)
- G8 literal text 존재 확인

### 단계 5 (픽셀·치수)
- G1 `scripts/compare-section.sh gallery-agreements` + clip `492,0,936,1024` (baseline 937×1024)
- G2 computed style: h2=16/Medium, institution=24/SemiBold, description=14/Regular+LS0.28
- G3 naturalWidth: 4 img 모두 >0
- G4 heading=#000, body=#1d2623

### v4 차단 게이트
- G5/G6/G8/G2/G4 = PASS 필수
- G1 ≤ 15%, G3/G7 참고
- 구조 지표: token_ratio ≥ 0.2, absolute/file ≤ 5, semantic_score ≥ 2

## 측정 결과 (v4 자율 모드)

### 단계 4.5 (구조·품질)
- G5 eslint jsx-a11y: 0 error ✓
- G6 텍스트:이미지 비율: alt="" (이미지에 설명 없음) → text 270chars/alt 0, rasterHeavy=false, PASS ✓
- G7 Lighthouse: SKIP (lhci 미설치)
- G8 i18n literal text: 존재 ✓

### 구조 지표
- token_ratio 0.391 (≥ 0.2) ✓
- absolute/file 0 (≤ 5) ✓
- semantic_score 3 (≥ 2) ✓

### 단계 5 (픽셀·치수)

#### 회차 1 (초기 구현, gap 5px)
- G1: 15.58% — text block 내부 gap-[5px]이 Figma 내부 gap 16과 불일치. 카드 높이 440 vs 452, 누적 12px 차이로 row 2 전체 벗어남.

#### 회차 2 (gap → 16px, 카드 h 451)
- G1: 6.92% — 카드 높이 거의 맞춤. 남은 diff는 텍스트 줄바꿈 위치 불일치 (institution + date 한 줄 → Figma는 U+2028로 2줄 강제).

#### 회차 3 (U+2028 hard break 적용 — `institutionLine1`/`line2Prefix`/`dateDisplay` 구조)
- G1: 5.61% — Figma 줄바꿈 정확 재현. 남은 5.61%는 row 2 이미지 1px 수직 오프셋 + 텍스트 anti-alias 엔진 차이.
- G2 치수:
  - h2 16px / 500 / LH 24 / LS −0.16 ✓
  - institution 24px / 600 / LH 33.6 ✓
  - description 14px / 400 / LH 21 / LS 0.28 ✓
  - section h = 1022 (Figma 1024, ±2 OK)
- G3 에셋: mou-1.png × 2, mou-2.png × 2, 4개 모두 naturalWidth 456 ✓
- G4 색상: h2 #000000 ✓, body #1D2623 ✓
- 육안 semantic: 4 카드 배치/이미지/텍스트 줄바꿈 모두 baseline과 일치 ✓

#### 회차 4 (`--bake-from-full gallery:492,360,936,1024` baked baseline)
- G1: 5.61% (변화 없음) — baseline alpha=0 이슈는 원래 없었음 (section 단독 export가 RGBA white bg). bake 후에도 동일.

### v4 차단 게이트 판정
| 게이트 | 결과 | 비고 |
|--------|------|------|
| G5 semantic HTML | PASS | eslint 0 |
| G6 text/image ratio | PASS | no alt, no rasterHeavy |
| G8 i18n literal | PASS | 문자열 존재 |
| G2 치수 | PASS | 모든 값 ±1~2 이내 |
| G4 색상 | PASS | exact match |
| **차단 게이트 전체 PASS** | ✓ | **자동 커밋 진행** |

### 참고 게이트
- G1 5.61% (≤ 15%) ✓ — v1~v3 ACCEPTED T-006 수렴 수준 유지 (5.72% → 5.61%로 0.11%p 개선). 엔진 차이 수용 범주.
- G3 PASS
- G7 SKIP

### MouCard 승격 판단
- 현 섹션 4회 사용 + gallery-activities (미구현) 예정 1회 = 5회 잠재. Rule of Three 2/3.
- gallery-activities 구현 시점에 실 구조 일치 확인 후 `src/components/ui/MouCard.tsx`로 승격. 현 단계 로컬 유지.
- activities 카드는 `dateDisplay`·`institutionLine2Prefix` 일부 비어있는 케이스로 prop 호환성 테스트 겸 활용 예정.

## 커밋

- `feat(section): /gallery-agreements 구현 (diff 5.61% / G5-G8 PASS / G1 ≤15% ref) [auto]`
- PROGRESS.md 업데이트 (32/43)
