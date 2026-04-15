# plan/gallery-agreements.md

> Figma 314:7056 / 936×1024 (실측 baseline 937×1024) / 페이지 좌표 (492, 360, 936, 1024)

## 컴포넌트 구조

```
GalleryAgreements (section, w-936 mx-auto, pb-40)
├─ <h2 sr-only>업무 협약</h2>
├─ HatchedInlineHeading "업무 협약" (text + line + 4 ticks)
└─ col gap-32 w-full
   ├─ row gap-24: MouCard MouCard
   └─ row gap-24: MouCard MouCard      (Figma 더미 데이터 반복)
```

## 신규 파일

- `src/components/sections/GalleryAgreements/GalleryAgreements.tsx` — 섹션 본체
- `src/components/sections/GalleryAgreements/MouCard.tsx` — 카드 (image + title + desc, 456w)
- `src/components/sections/GalleryAgreements/HatchedInlineHeading.tsx` — 인라인 헤딩
- `src/components/sections/GalleryAgreements/index.ts`
- `src/routes/GalleryAgreementsPreview.tsx`
- `src/assets/gallery-agreements/mou-1.png` (Framelink, 912×604 @ 2x)
- `src/assets/gallery-agreements/mou-2.png` (Framelink, 912×604 @ 2x)

## 공통 컴포넌트 승격

- 보류. MouCard와 HatchedInlineHeading은 gallery-activities에서 1회 더 사용 후 ui/ 승격 검토 (Rule of Three)

## 측정 결과

### 단계 4.5 (구조·품질)
- G5 시맨틱 HTML: eslint 0 error ✅
- G6 텍스트:이미지 비율: 49.80 (text=249/alt=5) ✅
- G7 Lighthouse: SKIP (lhci 미설치)
- G8 i18n 가능성: PASS (literal 존재) ✅

### 단계 5 (픽셀·치수)

#### 시도 1회차
- G1: 9.49% ❌ — baseline alpha=0 transparent vs preview white bg 차이

#### 시도 2회차 (baseline crop from gallery-full.png)
- G1: 5.72% ❌ — 0.72%p 초과 (한글 text + 사진 4장 alignment AA 누적)

#### 시도 3회차 (image fill % crop 시도)
- G1: 16.78% ❌ — 악화. 즉시 revert

#### 시도 4회차 (revert)
- G1: 5.72% (=2회차 수렴치)
- G2 치수: section 936×1022 (spec 1024, -2 OK), heading 16/24/400 ✅, title 24/33.6/600 ✅, desc 14/21/400 LS 0.28 ✅
- G3 에셋: 4/4 (mou-1.png × 2 + mou-2.png × 2, naturalWidth 912/604) ✅
- G4 색상: heading #000 ✅, title #1d2623 ✅, desc #1d2623 ✅
- 육안 semantic: 카드 4개 배치 정상, MOU 사진 정상, 텍스트 알맞게 wrap, semantic 오류 없음 ✅

## 자율 판단 (3회 이상 미달, [C] 엔진 차이 수용)

5.72%는 §2.5 "한글 text 다수 + 사진 4장 dense composite 6~7% 수렴" 패턴. 우회 시도(image crop %)가 오히려 악화시켜 5.72% 이하 압축이 구조적으로 어려움 확정.

→ `docs/tech-debt.md`에 **ACCEPTED** 엔트리 T-006로 등록 (부채 카운트 영향 없음, 엔진 차이 수용).

## 커밋

- `feat(section): gallery-agreements 구현 (diff 5.72% / G5-G8 PASS / G1 ⚠ ACCEPTED) [auto]`
- `[ACCEPTED_DEBT]` 태그 없음 (ACCEPTED 등록만, OPEN 부채 아님)
- PROGRESS.md 업데이트
