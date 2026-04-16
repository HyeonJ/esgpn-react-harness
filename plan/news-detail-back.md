# plan/news-detail-back.md

> Figma `134:4123` / 936×45 / 캔버스 (492, ~2027) / 라우트 `/news/:id`

## 노드 트리 (design_context)

```
Frame (134:4123) — 936×45 flex-col items-start justify-center
└── Button inner (134:4120) — flex items-center justify-center
    │   bg white + border-[1.5px] #c6cdcc + px-5 py-3 + rounded-2xl
    └── Text (134:4121) — "목록으로 이동하기" text-sm/14M gray-400
```

## 컴포넌트 설계

- 파일: `src/components/sections/NewsDetailBack/NewsDetailBack.tsx` + `index.ts`
- 라우트: `/__preview/news-detail-back` (Preview 래퍼)
- 시맨틱:
  - 외곽: `<nav aria-label="목록으로 이동">` (breadcrumb과 대칭)
  - 내부: `<Link to="/news">` + 단일 텍스트 자식 span
- 100% HTML 재구성 — 에셋 없음
- 자기정렬: `mx-auto max-w-[1920px] w-full flex items-center justify-center`
- 내부 컨테이너: `w-[936px]` + 왼쪽 정렬 (`items-start`)
- 버튼: `<Link>` pill — border 1.5px / rounded-2xl / px-5 py-3 / bg-white / color gray-400

## props / 재사용성
- props 없음 (정적 섹션)
- 재사용 후보: 다른 상세 페이지 "목록으로" 버튼에도 쓸 수 있으나 현재는 news-detail 전용으로 로컬 유지

## 토큰 매핑

| 항목 | 값 | 소스 |
|---|---|---|
| bg | white | `bg-white` (또는 `bg-gray-000`) |
| border | 1.5px #c6cdcc | `border-[1.5px]` + `border-[color:var(--color-gray-300)]` |
| radius | 16 | `rounded-2xl` |
| px | 20 | `px-5` |
| py | 12 | `py-3` |
| text | #afb8b5 | `text-[color:var(--color-gray-400)]` |
| font | Pretendard 14M 1.5 -0.5 | inline style via `--text-sm-14m-*` tokens |

## 에셋
- **없음** — inline HTML만으로 100% 재구성

## 라우트 clip 파라미터

- Preview wrapper: `w-[1920px] mx-auto bg-white` (선행 섹션 패턴)
- 섹션 width 936, height 45 (baseline 47)
- clip: `--clip-x 492 --clip-y 0 --clip-w 936 --clip-h 45`

## 구조 지표 예상
- token_ratio: 5+ var() (font 4 + color 2 = 6 tokens) → ratio > 0.2 ✓
- absolute count: 0 / file ≤ 5 ✓
- semantic_score: nav + a + span ≥ 2 ✓

## G5~G8 예상
- G5 eslint: PASS (nav/a 표준)
- G6 text ratio: PASS (텍스트만 있음, 이미지 없음)
- G8 literal text: PASS ("목록으로 이동하기" literal)
- G7: 작은 섹션이라 Lighthouse 영향 미미

## 자율 판단
- 1줄 flat UI, 회전/블렌드/에셋 0개 → 1회차로 충분
- typo "으도" → "으로" 정정 (명백한 디자이너 오타)
- 부모 `<nav>` 래핑 — breadcrumb 섹션과 대칭성 (UX 표준)

## 단계 4.5 측정 (round 1)

- G5 eslint jsx-a11y: **PASS** (0 errors / no output)
- G6 text ratio: **PASS** (ratio 17.00, textChars 170, altChars 10, imgCount 0, rasterHeavy=false)
- G8 literal text: **PASS** ("목록으로 이동하기" JSX literal 존재)
- check-tailwind-antipatterns: **PASS** (음수 width / 정수 반올림 없음)
- check-baked-in-png: **PASS** (inline HTML — PNG 중첩 없음)

## 단계 5 측정 (round 1 — 최종)

- **G1 diff**: **1.38%** (581/42120px) < 5% **PASS**
- **G2 치수**:
  - container x=492, w=936 ✓ (expected 492/936)
  - container h=47 (expected 45 ±2) ✓
  - link padding 12px/20px/12px/20px ✓ (py-3 px-5)
  - link borderRadius 16px ✓ (rounded-2xl)
  - link fontSize 14px / fontWeight 500 / lineHeight 21px / letterSpacing -0.5px ✓
  - link borderWidth 1px (set 1.5px but browser sub-pixel rounds; baseline 동일 anti-aliased — 엔진 차이 수용)
  - link w=137.7 (expected ~140, 2.3px delta — typo 수정에 의한 글자폭 변화)
  - **PASS**
- **G3 에셋 무결성**: 이미지 없음 → vacuously **PASS**
- **G4 색상**:
  - text: rgb(175,184,181) = #afb8b5 = --color-gray-400 ✓
  - border: rgb(198,205,204) = #c6cdcc = --color-gray-300 ✓
  - bg: rgb(255,255,255) = white ✓
  - **PASS**

### 육안 semantic 검증
- baseline/capture/diff 3종 육안 비교 완료
- 버튼 위치 / shape / outline / 색상 모두 일치
- 텍스트 차이 ("으도" → "으로") 는 **의도한 오타 수정**이며 diff 영역 그대로
- swap/flip/reverse 없음
- **semantic OK**

## 구조 지표
- token_ratio: 6 var() 사용 (font 4 + color 2 = 6 tokens, file text 170자) > 0.2 ✓
- absolute count: 0 / file ≤ 5 ✓
- semantic_score: nav + a + div + span ≥ 2 ✓

## 최종 판정
차단 게이트 G5/G6/G8/G2/G4 **전부 PASS**. 참고 게이트 G1/G3 **전부 PASS**. 구조 지표 **전부 PASS**. 자동 커밋 진행.

