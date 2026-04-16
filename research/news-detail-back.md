# research/news-detail-back.md

> Figma `134:4123` / 936×45 / 캔버스 (492, ~2027) / 라우트 `/news/:id`

## 노드 트리 (공식 Figma MCP get_design_context)

```
Frame 12 (134:4123) — 936×45, flex-col items-start justify-center
└── Button container (134:4120) — flex items-center justify-center
    ├── bg: white (--gray-scale/gray-000)
    ├── border: 1.5px solid #c6cdcc (--gray-scale/gray-300)
    ├── px: 20 (--spacing/5), py: 12 (--spacing/3)
    ├── border-radius: 16 (--border-radius/2xl)
    └── Text (134:4121) — "목록으도 이동하기" [원본 typo, 으로 → 으도]
        ├── font: Pretendard Medium 14, line-height 1.5, letter-spacing -0.5
        └── color: #afb8b5 (--gray-scale/gray-400)
```

## baseline 실측
- `figma-screenshots/news-detail-back.png`: 937×47 (Figma export, 1px 가산)
- composite 상태: flat 버튼 + 여백. baked-in raster, text 포함 — 하지만 **한 줄 flat UI**라서 HTML 재구성이 정답 (text-bearing raster 안티패턴 안전)

## 텍스트 결정
- Figma 원본 literal: "목록으도 이동하기" (으도 = Korean typo)
- 연구 계획 및 오케스트레이터 의도: "목록으로 이동하기" (올바른 한국어)
- **채택: "목록으로 이동하기"** (명백한 Figma typo, 선행 섹션 `NewsDetailBreadcrumb` "이전으로"도 디자인 의도 반영함)
- tech-debt 후보 아님 (typo 수정은 디자이너 동의 기본 가정)

## 시맨틱 선택
- 이 섹션은 "뉴스 목록으로 이동" 링크 — 페이지 이동이므로 **`<Link to="/news">`** (react-router)
- `<button>` + navigate() 는 JS 의존 + SEO 불리. `<Link>` 가 정답
- 외부 래퍼: `<nav aria-label="back-to-list">` 또는 단일 링크라면 nav 생략도 OK
- 선행 `NewsDetailBreadcrumb`가 `<nav aria-label="breadcrumb">` 사용 → 대칭성으로 `<nav aria-label="back to news list">` 사용

## 에셋
- **아이콘 없음** (baseline 확인: 단순 pill 버튼 + 텍스트만)
- 외부 PNG/SVG 다운로드 불필요 — inline HTML만으로 100% 재구성

## 캔버스 좌표 (clip)
- 섹션 x=492, width=936, height=45 (실측 47)
- clip: `--clip-x 492 --clip-y 0 --clip-w 936 --clip-h 45`

## 토큰 매핑

| 항목 | Figma 값 | 프로젝트 토큰 |
|---|---|---|
| bg | #ffffff | `var(--color-gray-000)` 또는 white |
| border color | #c6cdcc | `var(--color-gray-300)` |
| border width | 1.5px | arbitrary `border-[1.5px]` (토큰 없음) |
| border radius | 16 | `rounded-2xl` |
| padding-x | 20 | `px-5` |
| padding-y | 12 | `py-3` |
| text color | #afb8b5 | `var(--color-gray-400)` |
| font-family | Pretendard | `var(--font-family-pretendard)` |
| font-size | 14 | `var(--text-sm-14m-size)` |
| font-weight | 500 | `var(--text-sm-14m-weight)` |
| line-height | 1.5 | `var(--text-sm-14m-line-height)` |
| letter-spacing | -0.5 | `var(--text-sm-14m-letter-spacing)` |

## 리스크
- **없음** — 1줄 flat UI, 에셋 없음, 회전/블렌드 없음
- G6 text ratio: text "목록으로 이동하기" (8자) / alt total = high text ratio 예상 PASS
- G1 diff: 소형 composite pixelmatch 편차 가능 (outline 1.5px anti-aliasing) — 허용 범위 < 5%
