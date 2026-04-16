# research/certification-intro.md

> Figma 299:3875 / 1416×291 / /certification 페이지 내 (252, 851)
> v4 재구현 (이전 v3 plan 존재, 실구현 파일 없음)

## Figma 구조 (get_figma_data depth=1 + get_design_context)

```
Frame 2043686020 (299:3875) — column, items-end, gap 20, padding 64x240, fill horizontal
├─ Frame 2043686019 (299:3876) — column gap 21, fill (HatchedSectionHeading)
│  ├─ Frame 299:3877 — row, gap 12, center
│  │  ├─ Rectangle 23 (299:3878) — 40×40 crop image (아이콘)
│  │  └─ Text "자격검정의 필요성" — Pretendard Bold 32 / 1.3em / -3% → #0A0A0A
│  └─ HatchedDivider (299:3880) — 8px row, vector 8
└─ Frame 2043686017 (299:3896) — row, gap 32, fill (3-col body)
   ├─ p (299:3897) — flex-1, 16M / 1.5 / -1%, #000, center
   ├─ p (299:3898) — flex-1
   └─ p (299:3899) — flex-1
```

## 디자인 토큰 (get_variable_defs)

- Text-3xl/32B = Pretendard Bold 32 / 1.3 / -3% (letterSpacing -0.96px)
- Text-base/16M = Pretendard Medium 16 / 1.5 / -1% (letterSpacing -0.16px)
- Gray Scale/Gray 500 = #97A29E (divider stroke)
- spacing/2 = 8
- 텍스트 색: #0A0A0A (heading), #000000 (body) — near-black, 토큰 없음 (프로젝트 합의)

## 텍스트 콘텐츠

**제목**: "자격검정의 필요성"

**본문 (3-column)**:
1. 지속가능한 미래를 위해 산업체가 요구하는 ESG 기본원칙과 핵심역량을 발전시키고\n이를 알상과 직장생활에서 실천한다.
2. 지역사회와 직장에서 긍정적인 변화를\n이끌어내는 실천가가 되어 큰 변화를\n만드는 데 기여한다.
3. ESG 원칙을 실천하여 지속가능한\n미래를 위한 일에 참여할 수 있는 기회를 만들고 다음세대에도 긍정적인 영향을 미친다.

## 에셋

| 파일 | 노드 | 크기 | 동적 여부 | 비고 |
|------|------|-----|---------|-----|
| heading-icon.png | 299:3878 | 40×40 (crop, @2x=80×80) | 정적 | contest-about/heading-icon.png와 imageRef+cropTransform 동일 → 복사 재사용 |

- imageRef: `e0323828d272debafbaef51af08c8a79feec0462`
- cropTransform: `[[0.406, 0, 0.297], [0, 0.745, 0.058]]`, filenameSuffix `273e38`
- Framelink leaf nodeId export 예정 (부모 frame 금지)

## 공통 컴포넌트 재사용

- `src/components/ui/HatchedSectionHeading.tsx` — iconSrc, title, titleId props
- `src/components/ui/HatchedDivider.tsx` — HatchedSectionHeading 내부 사용

## Baseline PNG

- `figma-screenshots/certification-intro.png` — 1416×291, PNG RGBA
- Framelink 299:3875 @ pngScale 1 export
- 섹션은 /certification 페이지 내 (x=252, y=851)에 위치 → visual 측정 시 clip 필요
- clip: --clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 291 (페이지 전체 스크린샷 기준 아님 / baseline 자체 매칭이므로 full-section compare)

## v4 게이트 예상

- G5 시맨틱: `<section aria-labelledby>` + `<h2 id>` (HatchedSectionHeading에서 처리) + `<p>` 3개
- G6 텍스트비율: raster 1개 (heading-icon 40×40), 텍스트는 JSX literal — PASS 예상
- G8 i18n: 한글 literal 4개 (제목 + 본문 3개) — PASS
- G2 치수: padding 64x240, gap 20/21/32, font 32B / 16M
- G4 색상: #0A0A0A (heading), #000 (body), #97A29E (divider) — 모두 디자인 토큰 기반은 아님, near-black 예외 유지
- 구조 지표:
  - token_ratio: heading-icon 임포트 + flex/gap 유지로 ≥ 0.2 달성 가능
  - absolute/file: **0** (전부 flex)
  - semantic_score: section + h2 + 3× p = 높음

## 리스크

1. **한글 dense 폰트 AA** — Pretendard 한글이 Chromium에서 살짝 condensed 렌더링 (docs §2.5). G1 수치 영향 가능. G1은 참고 지표라 차단 아님
2. **heading icon AA** — 40×40 작은 raster. 약간의 subpixel 차이 예상
3. **HatchedDivider** — 내부 Vector 8이 SVG stroke(#97A29E, 1.5px dashed). 기존 HatchedDivider 구현이 이미 사용 중 → 그대로 재사용
4. clip 파라미터는 full-section compare이므로 불필요 (1416×291 baseline 그대로 매칭)

## Framelink pulse (단계 1)

get_figma_data(299:3875, depth=1) 완료 — children 2개(header+body row), layout mode column gap 20 padding 64x240 확인
