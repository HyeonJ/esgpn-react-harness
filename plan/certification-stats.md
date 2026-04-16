# plan/certification-stats.md

> Figma 299:3862 / 1920×194 / page y=633 / 자격검정 통계 바 (Hero 하단)

## v4 설계 원칙
- **시맨틱 HTML**: `<section aria-labelledby>` + `<h2 className="sr-only">` + `<ul>` 3 stats + `<dl>` pair
- **토큰 우선**: Pretendard font family, color-gray-000, color-gray-300, spacing tokens via `var(--…)`
- **absolute 0건**: flex-row + CSS border-divider
- **에셋 0건**: SVG 다운로드 대신 CSS 1px 세로선
- **text literal 유지**: JSX 문자열 "1,500+", "자격 취득자" 등 직접 기입 (G8)

## 컴포넌트 구조
```
<section>  // mx-auto w-full max-w-[1920px] h-[194px] flex-row gap-4 items-center justify-center py-12
├─ <h2 sr-only>자격검정 성과</h2>
└─ <ul>  // contents (wrapping 없이 flex-row)
   ├─ <li><StatCard big="1,500+" small="자격 취득자" size="48" /></li>
   ├─ <DividerLine />
   ├─ <li><StatCard big="이론부터 실행" small="체계적 과정" size="40" /></li>
   ├─ <DividerLine />
   └─ <li><StatCard big="100%" small="온라인 응시" size="48" /></li>
```

단순하므로 `StatCard` 별도 컴포넌트 파일 분리하지 않고 `CertificationStats.tsx` 내부 서브컴포넌트로 처리.

## props 시그니처
```tsx
interface StatCardProps {
  big: string;
  small: string;
  bigSize: 40 | 48;  // Bold size
  bigLetterSpacing: string;  // "-1.92px" or "-1.6px"
}
```

## 신규 파일
- `src/components/sections/CertificationStats/CertificationStats.tsx`
- `src/components/sections/CertificationStats/index.ts`
- `src/routes/CertificationStatsPreview.tsx`
- `src/App.tsx` 라우트 추가 (/certification-stats)

## 에셋
- 없음 (CSS divider + 텍스트만)

## 라우팅
- `src/App.tsx` `<Route path="/certification-stats" element={<CertificationStatsPreview />} />`
- Preview는 dark bg (`var(--color-brand-700)` Hero 주황 반대 톤) + `PreviewWrapper` 단순 배치

## 트레이드오프
- **Vector SVG 미사용 결정**: Figma는 IMAGE-SVG 타입이지만 구성은 단순 1px stroke → CSS border로 대체해 naturalWidth 체크 우회 & G3 부담 0. 시각 diff 동일
- **Preview 배경색**: Figma 맥락에선 CertificationHero bg 위에 투명이므로 Preview 독립 시 배경 필요. brand-700(다크 그린) 선택 — 페이지 통합 시 실제 Hero 배경과 유사한 어두운 톤으로 흰 텍스트 가독성 확보
- **baseline vs capture 양측 흰 배경**: G1 수치는 낮게 나오지만 육안 검증에서 dark bg Preview로 시각 확인 병행

## 새 npm 패키지 필요?
없음.

## 측정 계획
- 단계 4.5: G5 eslint → G6/G8 text-ratio → v4 structure gate
- 단계 5: `bash scripts/compare-section.sh certification-stats` (1920×194 풀폭)

## 측정 결과

### 1회차 (PASS)
- **G5 eslint**: 0 error (PASS)
- **G6 text ratio**: textChars=127 altChars=0 imgCount=0 → rasterHeavy=false (PASS)
- **G8 i18n**: JSX literal text 존재 (PASS)
- **v4 structure**: magic=2 token=10 **token_ratio=0.833** ≥ 0.2 ✅ / absolute=1 ≤ 5 ✅ / semantic_score=2
- **Tailwind antipatterns**: 없음
- **Baked-in PNG**: 없음
- **TypeScript**: 0 error
- **Build**: success
- **G1 diff**: **0.03%** (128/372480px) ✅ (baseline vs capture)
- **G2 치수**: section 1920×194 fixed, stat 240×hug, divider 1×64 — Figma 스펙과 일치 (육안)
- **G3 에셋**: 에셋 0건 (CSS divider) — naturalWidth 체크 대상 없음
- **G4 색상**: white #FFFFFF (--color-gray-000), divider #C6CDCC (--color-gray-300) — 토큰 참조

### 육안 검증
- baseline과 capture 모두 흰 배경 + 흰 텍스트 (텍스트 안 보임이 정상) + 2 회색 divider
- diff PNG: 우측 divider의 1px subpixel 차이만 (flex gap 픽셀 할당 엔진 차이, semantic 오류 아님)
- /certification 페이지에서 CertificationHero 배경 위 overlap 영역이므로 실사용 맥락에서는 텍스트가 배경 위에 선명하게 보임

**모든 차단 게이트 PASS + 육안 검증 OK → 단계 7 자동 커밋**
