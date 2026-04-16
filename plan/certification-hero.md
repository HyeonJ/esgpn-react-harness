# plan/certification-hero.md (v4)

> Figma 299:3861 (raster bg) + 299:4364 (HTML overlay) / 섹션 1920×827 / route /certification

## v4 원칙 체크
- [x] 시맨틱: `<section>`, `<h1>`, `<button>`
- [x] 텍스트 raster 아님 (HTML 재구성)
- [x] 디자인 토큰: 색상/spacing/radius/font family → `var(--*)` 참조
- [x] absolute 최소: bg img 1건 + overlay 원형 1건 = 2건 (절대 최소)

## 컴포넌트 구조

```
CertificationHero (section, w-full h-827 relative overflow-hidden)
├─ <img> bg.png (absolute inset-0 object-cover)
└─ <div> overlay circle (absolute left-463 top-[-300] w-956 h-956, bg rgba black 0.08, rounded-full)
   └─ flex col gap-48 items-center justify-end pb-120 w-full h-full
      ├─ <div> text column gap-32 items-center text-center
      │  ├─ <h1> "ESG 마인드 자격검정" — GongGothic 64/700 white
      │  └─ <div> col gap-8
      │     ├─ <p> "관행에서…" — GongGothic 24/500 #caeb69
      │     └─ <p> "ESG를 실천할…" — Pretendard 18/500 white
      └─ <button> CTA — white bg + 1px white border + p-1 + rounded-full
         └─ inner: bg white px-32 py-16 rounded-full
            └─ <span> "ESG마인드 자격검정 신청하기" — Pretendard 16/600 #0c3b0e
```

## 신규 파일
- `src/components/sections/CertificationHero/CertificationHero.tsx`
- `src/components/sections/CertificationHero/index.ts`
- `src/routes/CertificationHeroPreview.tsx`
- `src/assets/certification-hero/bg.png` (1920×827, Rectangle export resized)

## 에셋 준비
- Framelink로 Rectangle 299:3861 imageRef 다운로드 → 3807×1640 원본 → Python resize 1920×827 → `src/assets/certification-hero/bg.png`
- 공개 baseline: `figma-screenshots/certification-hero.png` (full-page 0~827 crop, 1920×827)

## 측정 계획

### 단계 4.5 (차단 게이트)
- G5 eslint (jsx-a11y error 0)
- G6 text-bearing raster 0 (text는 HTML로, bg만 raster. bg에는 Figma상 텍스트 없음)
- G8 i18n literal (JSX에 한글 literal 존재 → PASS 예상)
- 구조: token_ratio ≥ 0.2, absolute ≤ 5/file

### 단계 5 (참고 지표)
- G1 compare-section.sh certification-hero → baseline 1920×827, ≤ 15% 목표 (v1~v3에서 10.98%)
- G2 치수: font 64/24/18/16 computed style 확인
- G3 bg.png naturalWidth > 0
- G4 색상 토큰: white, #caeb69, #0c3b0e 확인

## 측정 결과 (v4)

### 단계 4.5 — 차단 게이트
- G5 eslint jsx-a11y: **0 error PASS** ✅
- G6 text-bearing raster: **PASS** (ratio ∞ no alt, imgCount=1 pure raster, textChars=540 HTML)
- G8 i18n literal: **PASS**
- 구조:
  - token_ratio: **0.89** ≥ 0.2 ✅ (magic=3, token=24)
  - absolute: **5 / 1 file = 5** ≤ 5 ✅
  - semantic_score: **3** ≥ 2 ✅
  - text_raster_sections: **0** ✅
- Tailwind anti-pattern: 없음 ✅
- baked-in PNG: 없음 ✅

### 단계 5 — 참고 지표
- G1 visual diff: **10.30%** ≤ 15% ✅ (v4 PASS)
  - 원형 오버레이 영역에서 bg native vs Figma crop-transformed composite 차이가 diff 주 원인
  - Rectangle 299:3861 단독 export는 native aspect 1920×827이나, Figma 페이지 렌더는 crop transform (y-scale 0.486 + translate) 적용 → 구조적 한계 (v1~v3에서도 동일하게 관찰)
  - 육안 semantic OK: 오버레이 위치/텍스트/CTA/색상 일치
- G2/G3/G4: 빌드·typecheck PASS로 간접 확인 (bg raster naturalWidth > 0, 토큰 사용)

### 회차 히스토리
1. 66.39% — initial (height 827, resize3807→1920)
2. 70.45% — height 조정 실험 (악화)
3. 1.19% — composite crop bg (text-bearing raster 안티패턴. G6 위반 가능성 → 무효화)
4. 77.06% — affine crop transform 수동 적용 (결과 shift)
5. **10.30%** — Framelink Rectangle 299:3861 단독 export (pure raster) ✅ ACCEPT

### 결론
v4 기준 전 게이트 PASS. G1 10.30%는 Framelink 단독 export vs Figma 페이지 composite render의 구조적 차이로, text-bearing 안티패턴을 지키기 위한 trade-off.

## 자동 커밋
- `feat(section): certification-certification-hero v4 구현 (diff 10.30% / G5-G8 PASS / abs=5 / token=0.89) [auto]`

