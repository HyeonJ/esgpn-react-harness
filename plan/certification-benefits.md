# plan/certification-benefits.md

> Figma 299:3955 / 1416×399 / v4 자율 모드 구현

## 컴포넌트 트리

```
src/components/sections/CertificationBenefits/
├── CertificationBenefits.tsx  (섹션 루트)
├── CapabilityCard.tsx         (로컬 카드, 5회 사용)
└── index.ts                    (re-export)

src/assets/certification-benefits/
├── heading-icon.png  (80×80 native, 40px display)
├── icon-1-community.png ~ icon-4-ethics.png (160×160, 80px display)
├── badge-1.png ~ badge-5.png (48×48, 24px display)
└── raw/
```

## CertificationBenefits props
- 없음 (정적 데이터)

## CapabilityCard props
```ts
{
  index: 1 | 2 | 3 | 4 | 5;        // number badge alt 계산용
  badge: string;                   // badge-N.png
  icon?: string;                   // icon-N.png (Card 5는 undefined → placeholder)
  iconAlt?: string;                // 기본 ""
  iconBlendMultiply?: boolean;     // Card 2
  text: string | readonly [string, string];  // 2줄 튜플 or 단일 (Card 5)
}
```

## v4 구조 원칙 적용
- `section` + `h2` + `ul` + `li` + `article` + `p` 시맨틱 (G5)
- absolute positioning은 number badge (top-left -4px) 단 1곳만. 카드 본체는 flex 전용
- 디자인 토큰: `bg-gray-100`, `rounded-[20px]`, `gap-3`, `p-4` (G4)
- magic number 최소화 (w-[177.6px], h-[180px]만 Figma absolute 치수)

## HatchedSectionHeading 재사용
- iconSrc=`heading-icon.png` (certification-benefits 전용 지구본 — contest 지구본과 동일 아이콘일 가능성 있으나 일단 분리 저장)
- title="지속가능한 미래를 이끄는 필수역량"
- titleId="certification-benefits-title"

## 레이아웃
```
<section aria-labelledby max-w-[1416px] mx-auto px-[240px] py-[64px] flex-col gap-5>
  <HatchedSectionHeading ... />
  <ul flex row gap-3>
    <li> <CapabilityCard ... /> </li> * 5
  </ul>
</section>
```

## Card 레이아웃 (CapabilityCard)
```
<article w-[177.6px] h-[180px] bg-gray-100 rounded-[20px]
         flex-col items-center justify-center gap-3
         pt-4 pb-3 px-4 relative>
  {icon ? <img 80x80 rounded-[16px] mix-blend-multiply(조건)>
        : <div 80x80 rounded-[16px] bg-[#d9d9d9]>}
  <p 14M center black ls-0.5 leading-1.5>
    {lines[0]}<br/>{lines[1]}   or   {text} (Card 5 단일)
  </p>
  <img absolute left-[-4px] top-[-4px] size-6 badge-N>
</article>
```

## 데이터
```ts
const CAPABILITIES = [
  { badge: b1, icon: i1, text: ["지역사회와 상생으로", "균형잡힌 지속가능성 실현"] },
  { badge: b2, icon: i2, iconBlendMultiply: true, text: ["ESG 중심의 인재 육성과", "조직 문화 혁신"] },
  { badge: b3, icon: i3, text: ["사회적 가치 창출로 고객", "신뢰와 브랜드 가치 제고"] },
  { badge: b4, icon: i4, text: ["윤리적 의사결정과 투명한", "정보 공개로 신뢰 제고"] },
  { badge: b5, icon: undefined, text: "인간중심시대, ESG 역량강화로 새로운 성장동력 확보" },
];
```

## 트레이드오프
- **Card 5 아이콘 placeholder**: Figma 원본이 placeholder라 동일하게 빈 회색 박스 유지. 장래 디자이너가 채우면 prop으로 전환
- **Card 2 mix-blend-multiply**: Figma spec 그대로 적용. baseline에서 다소 어둡게 보이는 아이콘 때문에 G1 diff에 영향 가능성
- **number badge absolute**: 카드 외부로 -4px 넘쳐야 해서 absolute 불가피. article에 `relative` 부여, absolute 1개만 사용 → `absolute/file ≤ 5` 충족
- **Card 5 단일 줄 텍스트**: `min-w-full`이 `w-[min-content]`를 이겨서 자연 wrap되지만, 우리 구현은 `w-full` + `text-center`로 충분 (14px로 2줄 자동 wrap)

## 파일별 예상 absolute 개수
- `CertificationBenefits.tsx`: 0
- `CapabilityCard.tsx`: 1 (badge)
- 전체 2 / 2 files → `absolute/file = 1` ✅ (목표 ≤ 5)

## 토큰 비율 (목표 ≥ 0.2)
- 토큰 참조: `bg-gray-100`, `rounded-[20px]`(var), `gap-3`, `p-4`, `pt-4`, `pb-3`, `px-4`, `gap-5`, `text-black`, `size-6`, `size-[80px]` (magic)
- 비율 추정: 토큰성 8~10 / 전체 스타일 25~30 = 0.30~0.40 ✅

## 측정 (v4 자율 모드 1회차)

### 차단 게이트 (PASS)
- **G5 시맨틱 HTML**: eslint jsx-a11y 에러 0 ✅
- **G6 텍스트비율**: ratio 8.56 (≥3 threshold, text:image ratio 건강) ✅
- **G8 i18n 가능성**: JSX 한글 리터럴 존재 (PASS) ✅
- **G2 치수**: 카드 177.59×180 (Figma 177.6×180, 편차 ±0.41), 아이콘 80×80, 배지 24×24, h2 32px, padding 64/240, letterSpacing -0.96px — ±4 내 PASS ✅
- **G4 색상 토큰**: 카드 bg #EFF0F0 (gray-100 토큰), placeholder #D9D9D9, h2 #0A0A0A, 본문 black — 토큰 참조 ✅

### 참고 지표 (기록)
- **G1 시각 diff**: **5.08%** (28692/564984px, ≤15% 목표 통과) ✅
- **G3 에셋 무결성**: 10개 img 모두 naturalWidth ≥ 48 ✅

### v4 구조 지표
- **token_ratio**: 0.211 (목표 ≥ 0.2) ✅
- **absolute count**: 4 (badge img + card article + placeholder 등, 2 files → abs/file = 2) ≤ 5 ✅
- **semantic_score**: 2 (section + article) (권고 ≥ 2) ✅
- magic_number: 15, token_ref: 4

### 자동 가드
- `check-tailwind-antipatterns.sh`: PASS (음수 width/정수 반올림 없음)
- `check-baked-in-png.sh`: PASS (baked-in 중첩 없음)

### 육안 semantic 검증
- 5 카드 배치 정상 ✅
- 숫자 배지 1~5 top-left -4px 돌출 ✅
- Card 2 mix-blend-multiply 적용 ✅
- Card 5 placeholder (#D9D9D9) 재현 ✅
- Card 5 본문 "인간중심시대, ESG 역량강화로 새로운 성장동력 확보" 2줄 auto-wrap ✅
- SVG flip / 요소 swap / 색 반전 / 줄바꿈 오류 없음 ✅

### 결론
모든 차단 게이트 + 참고 지표 PASS. 구조 지표 1차 목표 달성. 자동 커밋 진행.

