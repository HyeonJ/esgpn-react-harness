# research/contest-about.md — 경진대회 About 섹션 (v4)

> Phase 3 단계 1. 페이지 `/contest` 두 번째 섹션 (Node `302:4977`). v4 기준 구조 중심 재편.
> 공통 규칙: `CLAUDE.md` (v4 하네스) / `docs/section-implementation.md` §2.4~§2.6.

## 1. Figma 노드 트리 (Figma MCP + REST API 교차검증)

**노드 살아있음** — flatten 아님. 전략 [A] HTML 재구성.

```
302:4977 Frame 2043686024 (root)
  layout: column, padding 64 240, gap 20, w=fill(1416 부모) h=hug
  측정상 h=459 (spec 일치, baseline 1416×459 RGBA)
│
├─ 302:4978 Frame 2043686019  Heading 블록
│  layout: column, gap 21, w=fill h=hug
│  │
│  ├─ 302:4979 Frame 2043686018  아이콘 + 제목 row
│  │  layout: row, gap 12, items-center, hug
│  │  │
│  │  ├─ 302:4980 Rectangle 23   40×40 IMAGE (지구본)
│  │  │  fill: IMAGE, imageRef e0323828d272debafbaef51af08c8a79feec0462
│  │  │  scaleMode: STRETCH, needsCropping: true, filenameSuffix: "273e38"
│  │  │  (Figma REST export로 crop 적용된 PNG 80×80 획득)
│  │  │
│  │  └─ 302:4981 TEXT "ESG 실천 아이디어 경진대회란?"
│  │     Text-3xl/32B: Pretendard Bold 32 / 1.3em / -3% / color #0A0A0A
│  │
│  └─ 302:4982 HatchedDivider SVG (기존 `ui/HatchedDivider` 재사용)
│
└─ 302:4998 Frame 2043686158   Body 블록
   layout: column, gap 20, w=fill h=hug
   │
   ├─ 302:4999 TEXT (mixed-run rich text)
   │  "ESG를\u00a0아이디어 → 실행 → 사회적 가치로 연결하는 실천형 프로그램 입니다."
   │  base: Pretendard Medium 16 / 1.5em / -1% / #000
   │  run 2 override ("아이디어 → 실행 → 사회적 가치"): Bold / #4FB654
   │
   └─ 302:5158 2-column 카드 row
      layout: row, gap 16, w=fill h=hug, both cards flex-1
      │
      ├─ 302:5000 "핵심 특징" 카드
      │  layout: column, gap 20, padding 24, flex-1, h=196 FIXED
      │  fill Gray-100 #EFF0F0, radius 20
      │  ├─ 302:5001 TEXT "핵심 특징" Text-xl/20SB Pretendard 600 20/1.4/-2%
      │  └─ 302:5002 불릿 ul (col gap 12, w=246 FIXED)
      │     - "SDGs・ESG 기반 현장 문제해결"
      │     - "대학・청년・지역 연계 팀 프로젝트"
      │     - "대회로 끝나지 않고 실천과제로 연결"
      │  불릿 원: 12×12 bg-brand-500 rounded-full
      │  불릿 텍스트: Pretendard 400 16/1.5/-1% #1E2939
      │
      └─ 302:5146 "주요 대상" 카드 (동일 구조)
         ├─ 302:5147 "주요 대상"
         └─ 302:5148 ul
            - "대학생・청년"
            - "대학・지역 혁신 조직"
            - "ESG에 관심 있는 기업・기관"
```

**주요 치수 검증:**
- root padding 64 240 → content 폭 1416 − 480 = 936
- root h = 64 + (42 + 21 + 8) + 20 + (24 + 20 + 196) + 64 = 459 (spec 일치)
- 2-column gap 16, flex-1 두 카드 → 각 카드 (936 − 16) / 2 = 460
- 카드 h 196 = padding 24×2 + (28 + 20 + 96) = 196

## 2. 폰트·색상·letter-spacing 스펙 (토큰 매핑 포함)

| style | family | weight | size | LH | letterSpacing | Figma color | v4 token | 사용처 |
|-------|--------|--------|------|----|---------------|-------------|----------|--------|
| Text-3xl/32B | Pretendard | 700 | 32 | 1.3em (41.6) | -3% (-0.96) | #0A0A0A | near-black (gray-900 #1D2623 Δ≈29 너무 큼 → 원본 hex 사용) | Heading |
| Text-base/16M | Pretendard | 500 | 16 | 1.5em (24) | -1% (-0.16) | #000 (base) | gray-900 변종? (Δ29) → 원본 hex | intro base |
| Text-base/16M Bold | Pretendard | 700 | 16 | 1.5em | -1% | **#4FB654** | `var(--color-brand-500)` ✓ | intro 강조 run |
| Text-xl/20SB | Pretendard | 600 | 20 | 1.4em (28) | -2% (-0.4) | #0A0A0A | 원본 hex | 카드 제목 |
| Text-base/16R | Pretendard | 400 | 16 | 1.5em (24) | -1% (-0.16) | #1E2939 | — (tailwind gray-800 구 팔레트) → 원본 hex | 불릿 텍스트 |

### 토큰 매핑 현황
- **#4FB654** → `var(--color-brand-500)` ✓ 토큰
- **#EFF0F0** → `var(--color-gray-100)` ✓ 토큰
- **#0A0A0A, #000, #1E2939** → Figma raw hex (near-black 3종, 토큰 없음)
  - v4 구조 지표용: 이 3 hex는 구조 지표의 magic number 리스트에 포함됨. token_ratio 계산 시 분모에 포함. 3/전체 색상사용 비율 허용.
  - **대안 평가**: 모두 `var(--color-gray-900) #1D2623`로 근사하면 토큰 ratio 개선되나 G4 색상 FAIL 위험 (near-black 차이 시각에 반영 안 돼도 테스트는 hex 비교). **원칙**: Figma 원본 hex 유지 (디자인 충실도 우선). magic number 카운트에서는 색상은 제외하는 게 일반적이지만, `check-structure-quality.mjs` 실행 결과 확인 후 조정.

## 3. 에셋 목록

| # | 에셋명 | 노드 | 타입 | 동적? | 처리 방식 | 목적지 |
|---|--------|------|------|-------|-----------|--------|
| 1 | 지구본 아이콘 | 302:4980 | IMAGE PNG + cropTransform | No | Figma REST Images API `/images?ids=302:4980&format=png&scale=2` (Framelink 미활성, REST 폴백 — baseline 획득과 동일 경로) | `src/assets/contest-about/heading-icon.png` (80×80 cropped) |
| 2 | HatchedDivider | 302:4982 | SVG | No | 기존 `@/components/ui/HatchedDivider` (932×10) 재사용, prop 없음 버전 | — |
| 3 | 불릿 Ellipse (6회 반복) | 302:5004 외 | SVG (단색 원) | No | CSS 재구성 `span.bg-brand-500.rounded-full.size-3` | — |

**캔버스-에셋 검증:**
- Figma 참조: Rectangle23(1) + divider(1) + Ellipse6(6회) = 3 종
- 처리 후: 아이콘 PNG 1 + 기존 재사용 0 + CSS 재구성 0 = **1 파일**
- 논리적 일치 OK (SVG 단색 원형 재구성은 §2.5 허용)

**baseline PNG:** `figma-screenshots/contest-about.png` 1416×459 RGBA non-interlaced ✓

**rotation/transform/blend:** 없음. 모두 정렬된 block layout.

## 4. 추출 한글 텍스트 원문 (모두 Figma `text` 필드 직접 획득)

| 위치 | 원문 |
|------|------|
| Heading | `ESG 실천 아이디어 경진대회란?` |
| Intro | `ESG를\u00A0아이디어 → 실행 → 사회적 가치로 연결하는 실천형 프로그램 입니다.` (중간 "아이디어 → 실행 → 사회적 가치" 구간 Bold + #4FB654) |
| 카드 제목 1 | `핵심 특징` |
| 카드 제목 2 | `주요 대상` |
| 핵심 특징 불릿 | `SDGs・ESG 기반 현장 문제해결` / `대학・청년・지역 연계 팀 프로젝트` / `대회로 끝나지 않고 실천과제로 연결` |
| 주요 대상 불릿 | `대학생・청년` / `대학・지역 혁신 조직` / `ESG에 관심 있는 기업・기관` |

> 중간점 U+30FB (`・`), 화살표 U+2192 (`→`), \u00A0 non-breaking space 보존.

## 5. v4 구조 설계 (absolute 최소화)

| 요소 | 레이아웃 | 시맨틱 | absolute? |
|------|----------|--------|-----------|
| root | `<section>` flex col | section | ✗ |
| heading block | flex col gap-[21px] | div | ✗ |
| icon+title row | flex row items-center gap-3 | div | ✗ |
| title | h2 | h2 | ✗ |
| divider | `<HatchedDivider>` | div | ✗ |
| body block | flex col gap-5 | div | ✗ |
| intro | p | p | ✗ |
| cards row | flex row gap-4 | div | ✗ |
| card | flex col gap-5 p-6 | article | ✗ |
| card title | h3 | h3 | ✗ |
| bullet list | flex col gap-3 | ul | ✗ |
| bullet | flex row items-center gap-3 | li | ✗ |
| bullet dot | span | span | ✗ |

**absolute 사용 0회 목표.** (v4 구조 지표 absolute/file ≤ 5)

## 6. Preview 라우트 & clip

- 라우트: `/__preview/contest-about`
- Preview wrapper: `w-[1920px] mx-auto bg-white` (다른 섹션 패턴 일치)
- Section 내부: `mx-auto max-w-[1416px]` + `px-[240px] py-[64px]` (Figma root padding 64 240)
- **clip: `--clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 459`** (1920 viewport 중앙 1416 영역 크롭)
- baseline: `figma-screenshots/contest-about.png` (1416×459)

## 7. 리스크

1. **intro mixed-run rich text**: `<p>` 내부 `<span>` 중첩 3-run (base / brand-500 bold / base). 경계 오류 시 G1 semantic 실패.
2. **HatchedDivider 폭 932 vs Figma fill 936**: 4px 차이 수용 (기존 컴포넌트 재사용, G1 기여 <0.1%p).
3. **#0A0A0A / #000 / #1E2939 near-black 3종**: 디자인 토큰 없음. 원본 hex 유지. G4는 hex 일치 확인만 하므로 문제 없음. token_ratio 영향은 구조 지표 측정 후 판단.
4. **불릿 원형 CSS 재구성**: Figma SVG export는 단색 원형. 시각상 재구성 OK. 미세한 안티에일리어싱 차이 가능.
5. **letterSpacing 정수 반올림 금지**: `-0.96px / -0.16px / -0.4px` Tailwind arbitrary 유지 (§2.4).

## 8. 신규 공통 컴포넌트 후보

| 후보 | 평가 |
|------|------|
| `HatchedSectionHeading` (아이콘 + h2 + divider) | contest-about + contest-benefits (302:5068) 확정 2회. Rule of Three 2/3. **Option A 채택**: 이번 섹션 로컬 `./HeadingWithIcon.tsx`로 구현, benefits 워커에서 구조 대조 후 승격. 과한 추상화 방지. |
| `BulletList` (12×12 원 + 16R 텍스트) | 섹션 내 2회만 재사용. 로컬 유지. |

## 9. 단계 1 통과 체크

- [x] baseline PNG 1416×459 획득 + 육안 확인
- [x] 노드 트리 확보 (flatten 아님)
- [x] 한글 텍스트 원문 추출 (mixed-run 포함)
- [x] 폰트·색·letterSpacing Figma 변수에서
- [x] 에셋 목록 + 동적 여부 + 캔버스-에셋 일치 검증
- [x] rotation/transform/blend 없음 확정
- [x] v4 구조 설계 (absolute 0 목표)
- [x] 토큰 매핑 현황 기록
- [x] Preview + clip 계획
- [x] 리스크 기록
