# research/contest-about.md — 경진대회 About 섹션

> Phase 3 단계 1. 페이지 `/contest` 두 번째 섹션 (Node `302:4977`). 상위 페이지 research: `research/contest.md` §3·§5.
> 공통 규칙: `CLAUDE.md` / `docs/section-implementation.md` §2.4~§2.6, §6.1, §6.4.

## 1. Figma 노드 트리 (공식 MCP `get_design_context` + `get_figma_data` 교차검증)

**노드 살아있음 — flatten 아님.** 전략 [A] HTML 재구성.

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
│  │  │  scaleMode: STRETCH, needsCropping: true
│  │  │  cropTransform = [[0.4062, 0, 0.2969], [0, 0.7447, 0.0582]]
│  │  │  filenameSuffix: "273e38"
│  │  │
│  │  └─ 302:4981 TEXT "ESG 실천 아이디어 경진대회란?"
│  │     style Text-3xl/32B: Pretendard Bold 32 / 1.3em / -3% / LEFT
│  │     color fill_01MLP1 = #0A0A0A
│  │
│  └─ 302:4982 Frame 2043685981   IMAGE-SVG (HatchedDivider 전체)
│     layout: row items-center gap 8, sizing fill(936)×fixed h=8
│     ※ get_design_context는 3 sub-component(좌해치+라인+우해치)로 복원해서 보여주지만
│       get_figma_data에서는 단일 IMAGE-SVG 노드로 렌더됨.
│       구조·치수가 기존 HatchedDivider(932×10)와 동일. **재사용 결정 가능.**
│
└─ 302:4998 Frame 2043686158   Body 블록
   layout: column, gap 20, w=fill h=hug
   │
   ├─ 302:4999 TEXT (938×24) — intro 한 줄 (mixed-run rich text)
   │  노드 이름은 잘려있음(placeholder). 실제 `text` 필드:
   │    "ESG를\u00a0아이디어 → 실행 → 사회적 가치로 연결하는 실천형 프로그램 입니다."
   │  (\u00a0 = non-breaking space)
   │  구성:
   │    run 1 "ESG를 "               Pretendard Medium 16/1.5/-1%  #000000
   │    run 2 "아이디어 → 실행 → 사회적 가치"  Pretendard **Bold**  16/1.5/-1%  **#4fb654**
   │    run 3 "로 연결하는 실천형 프로그램 입니다."  Pretendard Medium 16/1.5/-1%  #000000
   │  style Text-base/16M: Pretendard Medium 16 / 1.5em / -1% / LEFT
   │  fill_SH1LO7 = #000000 (base), run 2 override = #4fb654 (Brand 500)
   │
   └─ 302:5158 Frame 2043686161   2-column 카드 row
      layout: row, gap 16, w=fill h=hug, both columns flex-1
      │
      ├─ 302:5000 Frame 2043686033   "핵심 특징" 카드
      │  layout: column, gap 20, padding 24, flex-1, h=196 FIXED
      │  fill #EFF0F0 (Gray Scale/Gray 100), borderRadius 20
      │  │
      │  ├─ 302:5001 TEXT "핵심 특징"
      │  │  Text-xl/20SB: Pretendard SemiBold 20 / 1.4em / -2% / LEFT  #0A0A0A
      │  │
      │  └─ 302:5002 Frame 2043686032   불릿 리스트
      │     layout: column, gap 12, w=246 FIXED
      │     │
      │     ├─ 302:5003 row gap 12 items-center
      │     │  ├─ 302:5004 12×12 Ellipse (IMAGE-SVG) — 녹색 원 (#4fb654 로 보임)
      │     │  │  fill src: imgEllipse6 (Figma SVG export)
      │     │  └─ 302:5005 TEXT "SDGs・ESG 기반 현장 문제해결"
      │     │     Text-base/16R: Pretendard Regular 16 / 1.5em / -1%  #1E2939 (gray-800)
      │     │
      │     ├─ 302:5006 row … "대학・청년・지역 연계 팀 프로젝트"
      │     └─ 302:5009 row … "대회로 끝나지 않고 실천과제로 연결"
      │
      └─ 302:5146 Frame 2043686034   "주요 대상" 카드   (302:5000과 동일 구조)
         ├─ 302:5147 TEXT "주요 대상"  (20SB #0A0A0A)
         └─ 302:5148 Frame 2043686032  col gap 12 w=246
            ├─ 302:5149 … "대학생・청년"
            ├─ 302:5152 … "대학・지역 혁신 조직"
            └─ 302:5155 … "ESG에 관심 있는 기업・기관"
```

**주요 치수 검증:**
- root padding 64 240 → 내부 content 폭 1416 − 480 = **936** (contest.md §3 카드 내부 폭 936과 일치)
- root h 측정 = padding-top 64 + heading(Text-3xl h≈42 + gap 21 + divider 8 = 71) + gap 20 + body(intro 24 + gap 20 + cards 196 = 240) + padding-bottom 64 = **459** (spec 일치)
- 2-column gap 16, flex-1 두 카드 → 각 카드 (936 − 16) / 2 = **460**
- 카드 내부 padding 24 → 내부 content 폭 460 − 48 = 412, 불릿 리스트 w=246 FIXED (좌측 정렬)

## 2. 폰트·색상·letter-spacing 스펙 (Figma variable 기반)

| style | family | weight | size | lineHeight | letterSpacing | 사용처 |
|-------|--------|--------|------|------------|---------------|---------|
| Text-3xl/32B | Pretendard | 700 (Bold) | 32 | 1.3em (41.6px) | **-3%** (-0.96px) | Heading "ESG 실천 아이디어 경진대회란?" |
| Text-base/16M | Pretendard | 500 (Medium) | 16 | 1.5em (24px) | **-1%** (-0.16px) | intro 평문 run |
| Text-base/16M Bold override | Pretendard | **700** | 16 | 1.5em | -1% | intro 강조 run ("아이디어 → 실행 → 사회적 가치") |
| Text-xl/20SB | Pretendard | 600 (SemiBold) | 20 | 1.4em (28px) | **-2%** (-0.4px) | 카드 제목 "핵심 특징" / "주요 대상" |
| Text-base/16R | Pretendard | 400 (Regular) | 16 | 1.5em (24px) | -1% (-0.16px) | 불릿 텍스트 |

> `letterSpacing`은 percent 표기. Tailwind arbitrary로 `tracking-[-0.96px]`, `tracking-[-0.16px]`, `tracking-[-0.4px]` 직접 사용 (docs §2.4).

### 색상

| Figma variable | hex | 용도 |
|----------------|-----|------|
| fill_01MLP1 | `#0A0A0A` | Heading + 카드 제목 (near-black) |
| fill_SH1LO7 | `#000000` | intro 기본 런 (black) |
| Brand/Brand 500 | `#4FB654` | intro 강조 런 + (추정) 불릿 원형 색 |
| Gray Scale/Gray 100 (Light BG) | `#EFF0F0` | 카드 배경 |
| `#1E2939` (gray-800) | `#1E2939` | 불릿 텍스트 (Figma raw, variable 없음) |
| Gray Scale/Gray 500 | `#97A29E` | HatchedDivider 해치 (기존 공통) |

## 3. 에셋 목록 (동적 여부 포함)

| # | 에셋명 | 노드 | 타입 | 동적? | 처리 방식 | 목적지 파일 |
|---|---------|------|------|-------|-----------|-------------|
| 1 | 지구본 아이콘 (40×40) | 302:4980 Rectangle 23 | IMAGE (PNG) + cropTransform | No | Framelink `download_figma_images`, `imageRef=e0323828...`, `needsCropping:true`, `filenameSuffix:"273e38"` | `src/assets/contest-about/heading-icon.png` |
| 2 | HatchedDivider | 302:4982 Frame 2043685981 | IMAGE-SVG (full) | No | **기존 `@/components/ui/HatchedDivider`(932×10) 재사용** (다운로드 불필요) | — |
| 3 | 불릿 Ellipse (12×12) | 302:5004 외 6곳 | IMAGE-SVG (단색 녹색 원으로 추정) | No | **CSS로 재구성** 가능 (`bg-[#4FB654] rounded-full size-3`). 안전한 baked-in 경로가 필요하면 SVG 다운로드도 가능 → plan에서 결정 | (옵션 A) 없음 / (옵션 B) `src/assets/contest-about/bullet.svg` |

**캔버스-에셋 개수 검증:**
- 캔버스 이미지/SVG 참조: Rectangle23 (1) + Frame2043685981 divider (1) + Ellipse6 (6회 동일 에셋 재사용) = **3종**
- 처리 후 파일: 아이콘 1 + HatchedDivider 재사용(0) + 불릿 재구성(0 또는 1) = **1~2개**
- 논리적 일치 OK (재사용/재구성은 §2.5 허용 범위, baked-in 원칙 비위반 — 단일 토큰 색상 + 원형 geometry)

**rotation/transform/blend 요소:** 없음. 모두 정렬된 block layout. 소수점 회전값 없음.

## 4. 추출 한글 텍스트 원문 (모두 실제 `text` 필드에서 획득)

| 위치 | 원문 |
|------|------|
| Heading (302:4981) | `ESG 실천 아이디어 경진대회란?` |
| Intro (302:4999) | `ESG를\u00A0아이디어 → 실행 → 사회적 가치로 연결하는 실천형 프로그램 입니다.` (중간 "아이디어 → 실행 → 사회적 가치" 구간은 Bold + #4fb654) |
| 카드 제목 1 | `핵심 특징` |
| 카드 제목 2 | `주요 대상` |
| 핵심 특징 불릿 1 (302:5005) | `SDGs・ESG 기반 현장 문제해결` |
| 핵심 특징 불릿 2 (302:5008) | `대학・청년・지역 연계 팀 프로젝트` |
| 핵심 특징 불릿 3 (302:5011) | `대회로 끝나지 않고 실천과제로 연결` |
| 주요 대상 불릿 1 (302:5151) | `대학생・청년` |
| 주요 대상 불릿 2 (302:5154) | `대학・지역 혁신 조직` |
| 주요 대상 불릿 3 (302:5157) | `ESG에 관심 있는 기업・기관` |

> 중간점 `・` (U+30FB Katakana Middle Dot)로 통일 (Figma 원문 일치). `→` (U+2192)·`\u00A0` 보존.

## 5. baseline 시각 확인 (Read)

`figma-screenshots/contest-about.png` — `file` 실측 **1416×459 RGBA non-interlaced**, spec 일치. 육안으로 다음을 확인:

- 좌측 상단: 40px 지구본 아이콘 + 32Bold 제목 "ESG 실천 아이디어 경진대회란?"
- 그 아래: HatchedDivider (좌·우 짧은 해치 + 중앙 긴 실선), 전체 폭 약 936
- 그 아래: intro 한 줄 — "ESG를 **아이디어 → 실행 → 사회적 가치**로 연결하는 실천형 프로그램 입니다." (가운데 텍스트만 녹색·bold)
- 하단: 2-column 라이트그레이 카드 (rounded, padding). 각 카드 상단 20SB 제목 + 12×12 녹색 원 불릿 3개 + 16R 텍스트
- 카드 배경 균질한 `#eff0f0`, 그림자·테두리 없음

**육안 semantic 검증 후보 (§6.4 단계 5 대비):**
- 불릿 3개 순서가 좌↔우 카드에서 뒤바뀌지 않았는지
- 아이콘 위치(제목 왼쪽), divider 위치(제목 아래)
- intro 문장 중 녹색·bold 되는 구간이 "아이디어 → 실행 → 사회적 가치" 정확히인지 (span split 위치)
- 카드 gap 16, 카드 padding 24 시각 일치
- 불릿 원형 색상이 균일한 녹색 (#4FB654)인지 — baseline과 match

## 6. Preview 라우트 & clip 계획

- 라우트: `/__preview/contest-about`
- 섹션 폭 1416 (부모 1920 가정 시 중앙정렬, 좌우 각 252 margin). Preview 래퍼는 `w-[1416px] mx-auto bg-white`로 두고 섹션 자체를 1416 content로 렌더
- 캡처 viewport: **1416×459**
- baseline: `figma-screenshots/contest-about.png` (1416×459)
- **clip 파라미터 불필요** (Preview가 1416 풀폭이면 baseline과 1:1 비교 가능, floating/overflow 요소 없음)
- 대안: 페이지 실제 레이아웃처럼 1920 wrapper + 252 padding으로 띄우는 경우 `--clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 459` 필요 → plan에서 결정 (1920 래퍼 채택 시)

## 7. 리스크

1. **intro mixed-run rich text**: 한 `<p>` 내부 Pretendard Medium(#000) → Pretendard Bold(#4FB654) → Medium(#000) 3개 span. weight/color 전환. `<span className="font-bold text-[#4fb654]">` 중첩으로 해결. 구간 경계 오류 시 G1 semantic 실패.
2. **Ellipse6 단색 원 가정**: baseline 육안으로는 균일 녹색이나 Figma에서 SVG 에셋으로 내보내므로 미세 안티에일리어싱/그라디언트 가능성 0%는 아님. 단계 3에서 **옵션 A (CSS 재구성)** 진행 후 G1 미통과 시 **옵션 B (SVG 다운로드)** 로 전환 가능. (에셋 절감 vs baked-in 충실도 트레이드오프)
3. **HatchedDivider 폭 932 vs Figma 936**: 기존 컴포넌트 고정 932×10. Figma divider는 fill 폭 936. 약 **4px 차이**가 G1에 기여 가능. 수용치 내면 재사용, 초과 시 컴포넌트 prop 확장(`width?`) 또는 섹션 로컬 SVG 사용. plan에서 결정.
4. **16px tracking -1%**: 계산값 -0.16px. 기존 about 섹션 코드 패턴과 일치해야 함. `tracking-[-0.16px]` 사용 — 정수 반올림(0) 금지 (§2.4).
5. **지구본 아이콘 cropTransform**: Framelink가 `needsCropping: true` + `filenameSuffix` 지원 확인됨(contest-hero 선례). 크롭 실패 시 이미지가 shift.
6. **카드 height 196 FIXED**: 내부 콘텐츠가 196px에 정확히 맞도록 디자인됨(20SB 28 + gap 20 + 불릿 3×24 + gap 12×2 = 148 + padding 48 = 196). 폰트 메트릭 미세 차이로 overflow 가능성 → `h-[196px]` 고정 적용 (Figma 지시 그대로).
7. **intro 940×24 FIXED height**: 한 줄로 들어갈 것으로 가정된 박스. 실제 폰트 렌더가 24를 초과하면 카드가 밀림. Pretendard Medium 16 @ 1.5em = 24px로 정확히 일치 → OK.

## 8. 신규 공통 컴포넌트 후보

| 후보 | 이번 섹션 | 다음 섹션 | Rule of Three 상태 | 결정 |
|------|----------|----------|---------------------|------|
| `HatchedSectionHeading` (40px 원 + 32B 제목 + HatchedDivider) | ○ | ○ (contest-benefits 302:5068 동일 구조) | 2/3 — About에서 로컬 시작 후 Benefits에서 승격 or 즉시 승격 | **plan §2에서 결정.** 보수 루트: About 로컬 → Benefits 때 `ui/HatchedSectionHeading.tsx`로 승격. 과감 루트: 지금 즉시 승격 (Benefits 워커 중복 작업 제거). 사용자 선호 확인 필요. |
| `BulletList` (12×12 녹색 원 + 16R 텍스트) | ○ (2회) | △ (자격검정·뉴스 등 재등장 가능) | 1/3 — 섹션 로컬 시작 | **plan 기본**: `ContestAbout/BulletList.tsx` 로컬로 만들고 재사용 확인 후 승격. 섹션 내 2회 사용은 로컬 컴포넌트 충분 근거. |
| `HatchedDivider` | ○ (재사용) | 기 재사용 | 기존 | prop 확장 불필요. className만 전달. |

## 9. 단계 1 통과 조건 체크

- [x] baseline PNG 존재 + `file` 실측 (1416×459, RGBA non-interlaced)
- [x] 노드 트리 확보 (flatten 아님 확정)
- [x] 모든 한글 텍스트 원문 추출 (mixed-run 구간 포함)
- [x] 폰트·색상·letterSpacing 모두 variable에서 획득
- [x] 에셋 목록 + 동적 여부 컬럼
- [x] 캔버스-에셋 개수 검증
- [x] rotation/transform/blend 요소 없음 확정 (소수점 대상 없음)
- [x] baseline 육안 semantic 포인트 기록
- [x] Preview route / clip 계획
- [x] 신규 공통 컴포넌트 후보 정리 + plan에서 결정할 항목 표시
- [x] 리스크 기록
