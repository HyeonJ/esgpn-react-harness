# plan/news-detail-breadcrumb.md

> Figma `134:4156` / 936×24 / 캔버스 (492, 140) / 라우트 `/news/:id`

## 노드 트리 (design_context)

```
Frame (134:4156) — flex gap-1 items-center 936×24
├─ Arrow Type 4 (134:4124) — 24×24, -rotate-90
│   └─ Icon Stroke 11×6 (chevron down → -90° = left)
└─ Text (134:4155) — "이전으로" — text-sm/14M gray-500
```

**중요**: 오케스트레이터 힌트는 "뉴스"였으나 design_context/baseline 실제 텍스트는 "이전으로". 실제 디자인 채택 (사용자 힌트 < Figma 진실).

## 컴포넌트 설계

- 파일: `src/components/sections/NewsDetailBreadcrumb/NewsDetailBreadcrumb.tsx` + `index.ts`
- 라우트: `/__preview/news-detail-breadcrumb` (Preview 래퍼)
- 시맨틱:
  - `<nav aria-label="breadcrumb">` 래퍼
  - `<Link to="/news">` 내부에 chevron SVG + "이전으로" 텍스트
  - 단일 링크 (breadcrumb 트레일이 아닌 "이전으로" 버튼형 링크) → `<ol>` 대신 단일 Link가 더 정확
- chevron: inline SVG (24px 내부 6×11 stroke, -rotate-90)
  - `currentColor`로 텍스트 색상에 따라감
  - design_context의 `imgIconStroke`는 URL이지만 inline SVG로 변환 (일관성 + leaf 원칙 + stroke=currentColor 유연)

## 토큰 매핑

| 항목 | 값 | 토큰 |
|---|---|---|
| font-family | Pretendard | `--font-family-pretendard` |
| font-size | 14 | `--text-sm-14m-size` |
| font-weight | 500 | `--text-sm-14m-weight` |
| line-height | 1.5 | `--text-sm-14m-line-height` |
| letter-spacing | -0.5 | `--text-sm-14m-letter-spacing` |
| color | #97a29e | `--color-gray-500` |
| gap | 4px | `var(--spacing-1)` |

## 에셋
- 인라인 SVG (외부 파일 없음) — 24×24 컨테이너 + 11×6 path (-90도 회전 적용)
- path d: `M5.14645 0.146447C5.34171 -0.0488155 5.65829 -0.0488155 5.85355 0.146447L10.8536 5.14645C11.0488 5.34171 11.0488 5.65829 10.8536 5.85355C10.6583 6.04882 10.3417 6.04882 10.1464 5.85355L5.5 1.20711L0.853553 5.85355C0.658291 6.04882 0.341709 6.04882 0.146447 5.85355C-0.0488155 5.65829 -0.0488155 5.34171 0.146447 5.14645L5.14645 0.146447Z`
- viewBox: `0 0 11 6` (원본 stroke 박스)

## 라우트 clip 파라미터

- Preview wrapper: `w-[1920px] mx-auto bg-white` (NewsTitle 전례)
- 캔버스 좌표 (492, 140), 사이즈 936×24
- clip: `--clip-x 492 --clip-y 0 --clip-w 936 --clip-h 24`

## 단계 4.5 측정 (round 1)

- G5 eslint jsx-a11y: **PASS** (0 errors)
- G6 text ratio: **PASS** (15.80, raster-heavy=false)
- G8 literal text: **PASS** ("이전으로" literal 존재)
- check-tailwind-antipatterns: **PASS** (음수 width / 정수 반올림 없음)
- check-baked-in-png: **PASS** (inline SVG — PNG 중첩 없음)

## 단계 5 측정 (round 1 — 최종)

- **G1 diff**: **1.20%** (269/22464px) < 5% **PASS**
- **G2 치수**:
  - link x=492, h=24 (기대 492/24 ±2) ✓
  - fontSize 14px, fontWeight 500, lineHeight 21px, letterSpacing -0.5px ✓
  - arrow 24×24, gap 4px ✓
  - **PASS**
- **G3 에셋 무결성**: inline SVG DOM 존재 확인 ✓ **PASS**
- **G4 색상**: rgb(151,162,158) = #97a29e = --color-gray-500 ✓ **PASS**

### 육안 semantic 검증
- baseline/capture/diff 3종 육안 비교 완료
- 텍스트 "이전으로" 위치·chevron 방향·색상 semantic 일치
- diff는 안티엘리어싱 정도의 미세 편차 — swap/flip/reverse 없음
- **semantic OK**

## 구조 지표
- token_ratio: 6 var() 사용 (font 5 + color 1 + spacing 1=7 tokens) > 0.2 ✓
- absolute count: 0 / file ≤ 5 ✓
- semantic_score: nav + a + span×2 ≥ 2 ✓

## 최종 판정
차단 게이트 G5/G6/G8/G2/G4 **전부 PASS**. G1/G3/G7/구조지표 **전부 PASS**. 자동 커밋 진행.

## 자율 판단

- 섹션 간단 (1줄 텍스트+아이콘). 회차 1회로 충분 예상
- chevron은 inline SVG로 — 부모 composite 방지 + G6 raster-heavy 회피
- `<Link to="/news">` react-router 사용 (이미 프로젝트 표준)
