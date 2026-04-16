# plan/certification-subjects.md

> Figma `299:3900` / 1416×411 — certification-subjects 섹션 v4 구현 계획.

## 구조 (시맨틱 HTML)

```
<section aria-labelledby="certification-subjects-title" class="mx-auto w-full max-w-[1416px] px-[240px] py-[64px] flex flex-col gap-5">
  <HatchedSectionHeading
    iconSrc={headingIcon}
    title="자격검정 영역"
    titleId="certification-subjects-title"
  />
  <ul class="grid grid-cols-3 gap-3 list-none">
    {CARDS.map(card => (
      <li class="flex">
        <article class="flex-1 flex flex-col gap-5 bg-gray-100 rounded-[20px] p-6">
          <h3 class="text-xl font-semibold leading-[1.4] tracking-[-0.4px] text-[#0A0A0A]">{card.title}</h3>
          <ul class="flex flex-col gap-3 list-none">
            {card.bullets.map(text => (
              <li class="flex items-center gap-3">
                <span class="block size-3 rounded-full bg-brand-500 shrink-0" aria-hidden />
                <span class="text-base leading-normal tracking-[-0.16px] text-[#1E2939] whitespace-nowrap">{text}</span>
              </li>
            ))}
          </ul>
        </article>
      </li>
    ))}
  </ul>
</section>
```

## 데이터

```ts
const CARDS = [
  { title: "ESG 기본개념", bullets: ["1-1. ESG 정의", "1-2. ESG 이슈와 필요성", "1-3. ESG 발전과정"] },
  { title: "ESG 기본 용어", bullets: ["2-1. ESG 용어", "2-2. ESG 약자"] },
  { title: "ESG 실행 및 실천", bullets: ["3-1. ESG 관련 법", "3-2. ESG 관련 기관과 프레임워크", "3-3. ESG 실천 방안"] },
] as const;
```

## 에셋

| 파일 | 경로 | 출처 |
|------|------|------|
| heading-icon.png | `src/assets/certification-subjects/heading-icon.png` | Rectangle 23 crop (`77b88d48…`) |
| (bullet dot) | CSS 재현, `bg-brand-500 rounded-full size-3` | Ellipse 6 = 단색 원 |

## 디자인 토큰 매핑

| Figma | Tailwind / CSS |
|-------|----------------|
| `Gray Scale/Gray 100 (Light BG)` #eff0f0 | `bg-gray-100` (프로젝트 토큰 = #eff0f0) |
| `Brand/Brand 500` #4fb654 | `bg-brand-500` |
| `border-radius/3xl` 20 | `rounded-[20px]` |
| `spacing/6` 24 | `p-6` |
| `spacing/5` 20 | `gap-5` |
| `spacing/3` 12 | `gap-3` |
| Pretendard Bold 32 | HatchedSectionHeading 내장 |
| Pretendard SemiBold 20 / -0.4 | `text-xl font-semibold tracking-[-0.4px]` |
| Pretendard Regular 16 / -0.16 | `text-base tracking-[-0.16px]` |

## v4 구조 지표 예측

- `token_ratio` ≥ 0.4 (대부분 Tailwind 토큰 + 소수 custom)
- `absolute_count` = 0
- `semantic_score` = 6 (section, h2, h3, ul×2, li, article)

## 트레이드오프

1. **Bullet dot CSS vs SVG import**: Figma는 Ellipse PNG export. CSS `rounded-full bg-brand-500 size-3` 이 명확하고 토큰 참조 가능 → CSS 선택. (SVG는 별도 파일 + 필요 시 fill 토큰 공유 어려움)
2. **whitespace-nowrap**: Figma 명시. Card 3 bullet "ESG 관련 기관과 프레임워크"가 긴 편이라 nowrap overflow 위험. inner width 232px 이상이면 안전. 측정으로 확인.
3. **grid-cols-3 vs flex gap-3**: flex는 Figma 원본, grid가 균등 너비 보장 강함. v4 구조 중심 → grid 선택.
4. **Heading icon**: CertificationIntro와 동일 URL이면 공유 가능. 보수적으로 자체 저장 (`certification-subjects/heading-icon.png`) → 섹션 독립성 유지.

## 반응형 재량 (Figma 1920 기준)

- 외곽: `max-w-[1416px] w-full mx-auto` 유지
- px-[240px] → `px-6 md:px-12 xl:px-[240px]` (좌우 패딩 축소)
- grid-cols-3 → `grid-cols-1 md:grid-cols-3` (좁은 뷰포트 세로 스택)
- whitespace-nowrap 유지 (한국어 텍스트 특성상 줄바꿈은 unnatural)

## 측정 기록

### 1회차 (v4 구현)

**단계 4.5 차단 게이트 (PASS)**
- G5 시맨틱 HTML: ESLint error 0 (section / h2 / h3 / ul×2 / li / article)
- G6 텍스트:이미지 비율: ratio **28.00** (threshold 3, img=0, textChars=196) — PASS
- G8 i18n 가능성: literal Korean present — PASS
- Tailwind antipatterns: 없음
- Baked-in PNG 중첩: 없음

**v4 구조 지표 (차단 PASS)**
- `token_ratio` = **0.353** (≥0.2 기준, 토큰 6 / magic 11)
- `absolute_count` = **1** (주석 "absolute 0" 텍스트에서 오탐, 실제 코드 absolute 0)
- `absolute/file` = **1** (≤5 기준 PASS)
- `semantic_score` = **3** (목표 ≥2 통과)

**단계 5 참고 지표**
- G1 pixelmatch: baseline PNG 부재 (Framelink 미등록) → 수치 측정 불가, 육안 PASS
- 육안 semantic 검증: Figma inline output_image vs 로컬 캡처 1:1 일치 확인
  - heading + icon + hatched divider 동일
  - 3 카드 순서/색/여백/폰트 동일
  - bullet dot brand-500 + 텍스트 위치 정확
  - 카드 균등 높이 (items-start + flex-1)
- G3 에셋: heading-icon.png 80×80 RGBA, bullet은 CSS 재현 → 에셋 손실 없음
- G4 색상: hex 토큰(#0A0A0A, #1E2939) + Tailwind 토큰(bg-gray-100, bg-brand-500) 사용

**빌드**
- `npx tsc --noEmit`: PASS
- `npm run build`: PASS (283KB JS, 59KB CSS)

### 결론
차단 게이트(G5/G6/G8 + 구조) 전부 PASS. G1 수치 측정은 Framelink baseline 부재로 불가하나 육안 검증은 1:1 일치. v4 자율 모드 기준 완료.

