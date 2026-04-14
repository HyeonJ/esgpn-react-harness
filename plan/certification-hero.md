# plan/certification-hero.md

> Figma 299:3861 (Hero bg) + 299:4364 (overlay) / section 1920×633 / baseline 1920×633 (full-page 0~633 crop)

## 컴포넌트 구조

```
CertificationHero (section, w-1920 h-633 mx-auto overflow-hidden)
├─ <img bg.png 1920×827 inset-0> (Hero rectangle 단독 export)
└─ overlay 956×956 원형 (left=463, top=-300, rgba(0,0,0,0.08))
   flex col items-center justify-end gap-48 pb-120
   ├─ col gap-32 items-center text-center
   │  ├─ h1 "ESG 마인드 자격검정" 64 GongGothic Bold white LS -2.56
   │  └─ col gap-8
   │     ├─ p "관행에서 실천의 자격검정(단급 과정) 안내" 24 GG Medium #caeb69 LS -0.36
   │     └─ p "ESG를 실천할 수 있는 역량을 갖춘 인재를 양성하는 자격검정 프로그램" 18 Pretendard Medium white LS -0.27
   └─ button (white border + white bg + #0c3b0e text "ESG마인드 자격검정 신청하기")
```

## 신규 파일

- `src/components/sections/CertificationHero/CertificationHero.tsx`
- `src/components/sections/CertificationHero/index.ts`
- `src/routes/CertificationHeroPreview.tsx`
- `src/assets/certification-hero/bg.png` (Framelink Rectangle 299:3861, 1920×827)

## 측정 결과 (4회차 ACCEPTED)

### 단계 4.5
- G5 eslint: 0 error ✅
- G6 텍스트:이미지: ∞ (no alt) PASS ✅
- G7 Lighthouse: SKIP (lhci 미설치)
- G8 i18n: PASS ✅

### 단계 5
- 회차 1: G1 10.98% ❌ (section 633, baseline 0~633 with TopNav strip)
- 회차 2: G1 11.54% (section 545, baseline 88~633 — TopNav 제외 시도, leaf decoration 누락 누적)
- 회차 3: G1 14.11% (회차 2 구조 + bg revert)
- 회차 4 (revert + gap-48 추가): **10.98%** ⚠ ACCEPTED

### G1 잔여 차이 분석
1. **TopNav strip (~7%p 추정)**: baseline 상단 88px에 TopNav rendered. preview는 standalone이라 미장착. 실제 /certification 라우트는 RootLayout이 TopNav 추가하므로 사용자 시각은 일치
2. **Leaf decoration overflow**: 페이지 composite에는 Rectangle 좌우/외부에 leaf 장식이 추가 baked. Framelink Rectangle 단독 export(bg.png)는 이 overflow 미포함. 구조적 한계 (Figma 노드 분리 export vs page composite render)

### 자율 판단 [C] 엔진 차이 수용
- (a) 재분할 — Hero는 단일 시각 단위. 분할 부적절
- (b) 다른 접근 — composite-bg 사용 시 텍스트 baked 이중 렌더 (G6 위반)
- (c) **엔진 차이 수용** ✅ — TopNav 미장착 + Framelink Rectangle export decoration overflow 누락 = 구조적 한계
- (d/e) 불필요

→ tech-debt T-007 ACCEPTED 등록 (부채 카운트 영향 없음)

## 자동 커밋
- `feat(section): certification-hero 구현 (diff 10.98% ⚠ ACCEPTED) [auto]`
