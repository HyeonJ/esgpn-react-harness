# plan/gallery-activities.md

> Figma 314:7103 / 936×519 (실측 baseline 937×519) / 페이지 좌표 (492, 1432, 936, 519)

## 컴포넌트 구조

```
GalleryActivities (section, w-936 mx-auto, pb-40)
├─ <h2 sr-only>관련 활동 및 수상</h2>
├─ HatchedInlineHeading "관련 활동 및 수상"  ← ui/ 재사용
└─ row items-center justify-center
   └─ MouCard (image=award.png, "COLiVE_한국ESG대상 수상", "사회공헌부문 단체")  ← ui/ 재사용
```

## 신규 파일

- `src/components/sections/GalleryActivities/GalleryActivities.tsx`
- `src/components/sections/GalleryActivities/index.ts`
- `src/routes/GalleryActivitiesPreview.tsx`
- `src/assets/gallery-activities/award.png` (Framelink, 912×604 @ 2x)

## ui/ 승격 (gallery-agreements와 동시)

- `src/components/ui/MouCard.tsx` (이전 위치: GalleryAgreements/) — 사용처 2 (agreements 4×, activities 1×)
- `src/components/ui/HatchedInlineHeading.tsx` (동) — Rule of Three 충족 (agreements + activities)

## 측정 결과 (1회차 통과)

### 단계 4.5 (구조·품질)
- G5 시맨틱 HTML: eslint 0 error ✅
- G6 텍스트:이미지 비율: 4.90 (text=98/alt=20) ✅
- G7 Lighthouse: SKIP (lhci 미설치)
- G8 i18n 가능성: PASS ✅

### 단계 5 (픽셀·치수)
- G1: **1.34%** ✅ (clip 491,0,937,519)
- G2 치수: heading 16/24/500 LS -0.16 ✅, cardTitle 24/33.6/600 ✅, cardDesc 14/21/400 LS 0.28 ✅
- G3 에셋: 1/1 (award.png naturalWidth 912) ✅
- G4 색상: heading #000 ✅, title/desc #1d2623 ✅
- 육안 semantic: diff 매우 faint (sub-pixel AA만). 카드 1개 중앙정렬 정상, 이미지 표시 정상 ✅

### 회귀 검증
- gallery-agreements 재측정: **5.72% (변화 없음)** — ui/ 이전이 G1 영향 0%p ✅

## 자동 커밋
- `feat(section): gallery-activities 구현 + ui/MouCard·HatchedInlineHeading 승격 (diff 1.34%) [auto]`
- 전부 PASS — 부채 등록 없음
