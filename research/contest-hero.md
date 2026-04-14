# research/contest-hero.md — 경진대회 Hero 섹션

> Phase 3 단계 1. 페이지 `/contest` 첫 섹션 (Node 299:4807). 상위 페이지 research: `research/contest.md`.
> 공통 규칙: `CLAUDE.md` / `docs/section-implementation.md` §2.4~§2.6, §6.1, §6.4.

## 1. Figma 노드 재조사 — 결정적 정정

`research/contest.md` §3·§6.1은 Hero를 **flatten (자식 0)** 으로 판정했으나, `get_design_context(299:4807)` + `get_metadata(299:4807)` + Framelink `get_figma_data(299:4807)` 교차검증 결과 **완전한 노드 트리가 살아있다.** (Phase 2 당시 get_metadata 호출 오류 또는 다른 프레임과 혼동으로 추정.)

→ **전략 [D] 구조 기반 완전 HTML 재구성** 가능. 사용자가 지시한 [A] "완전 HTML 재구성"과도 일치하며, 텍스트/버튼/Stats 모두 노드 기반으로 정확한 스펙 확보됨. flatten PNG의 baked-in 위험 없음.

### 1.1 Figma 구조 (layout_* 요약)

```
299:4807 Frame 2043686159 (root)  layout: column, items: center, size 1920×818
  fills: IMAGE(imageRef 7559e1ad178a149dcd862f4990af4ee2c2f44c2c, STRETCH,
               cropTransform = [[0.9806, 0, 0.00985], [0, 0.4758, 0.3118]],
               needsCropping: true, filenameSuffix: "5c25b2")
         + solid #0C3B0E (brand-700)  ← 이미지가 mix-blend-hard-light로 올라감
│
├─ 299:4806 Frame 17     1113×640 (flex col, justify-end, items-center, gap 10px, FIXED)
│  └─ 299:4396 Group 16  956×956 (no layout; rounded 9999) — 큰 원 래퍼 (Group)
│     └─ 299:4397 Frame 2043686015  956×956  bg: rgba(0,0,0,0.08), rounded-9999
│                                   padding: 0 0 120px, col justify-end items-center
│        └─ 299:4398 Frame 2043686007  hug, col, gap 48, items-center
│           ├─ 299:4399 Frame 2043686010  col, gap 32, w-full (stretch), left-align?
│           │  ├─ 299:4400 TEXT "ESG 실천 아이디어 경진대회"
│           │  │    style_QWT625: Gong Gothic Bold 64 / 1.3 / -2.56% / center
│           │  │    color #FFFFFF, whitespace-nowrap
│           │  └─ 299:4401 Frame 2043686009  col, gap 8, items-center, stretch
│           │     ├─ 299:4402 TEXT "아이디어에서 실천으로, ESG 실천 아이디어 경진대회 안내"
│           │     │    style_2WM5F5: Gong Gothic Medium 24 / 1.4 / -1.5% / center
│           │     │    color #CAEB69 (포인트 라임색)
│           │     └─ 299:4403 TEXT 2행 ("아이디어를 넘어 실천으로, 실천을 넘어 사회적 가치 창출로\n지속가능한 미래를 만드는 당신의 아이디어를 기다립니다")
│           │          Text-lg/18M: Pretendard Medium 18 / 1.4 / -1.5% / center
│           │          color #FFFFFF
│           └─ 299:4404 Frame 12  hug, col, padding 4, rounded-9999, stroke #FFFFFF 1px
│              └─ 299:4405 <Mui Button>  hug, col justify/items-center, padding 16 32
│                         fill #FFFFFF, rounded-9999
│                 └─ 299:4406 Base  hug, row items-center gap 8
│                    └─ 299:4408 TEXT "ESG 실천 아이디어 경진대회 참여하기"
│                         Text-base/16SB: Pretendard SemiBold 16 / 1.5 / -1% / left
│                         color #0C3B0E (brand-700)
│
└─ 299:4411 Frame 2043686014  STRETCH (1920 wide), row, center-aligned,
                              gap 16, padding 40 0, items-center
   ├─ 299:4412 Frame 2043686013   240×hug, col gap 12
   │  ├─ 299:4413 TEXT "1,500+"  Pretendard Bold 48 / 1.3 / -4% / center / #FFFFFF
   │  └─ 299:4414 TEXT "자격 취득자"  Pretendard Medium 16 / 1.5 / -1% / center / #FFFFFF
   ├─ 299:4415 Vector 19 (IMAGE-SVG)  0×64, stroke #C6CDCC 1px  ← 수직 구분선
   ├─ 299:4416 Frame 2043686012   240×hug, col gap 12
   │  ├─ 299:4417 TEXT "이론부터 실행"  Pretendard Bold 40 / 1.3 / -4% / center / #FFFFFF
   │  │     * layout_ACFZ1V: height FIXED 52px, width FILL
   │  └─ 299:4418 TEXT "체계적 과정"   Pretendard Medium 16 / 1.5 / -1% / center / #FFFFFF
   ├─ 299:4419 Vector 20 (IMAGE-SVG)  0×64, stroke #C6CDCC 1px  ← 수직 구분선 (동일 에셋)
   └─ 299:4420 Frame 2043686011   240×hug, col gap 12
      ├─ 299:4421 TEXT "100%"      Pretendard Bold 48 / 1.3 / -4% / center / #FFFFFF
      └─ 299:4422 TEXT "온라인 응시"  Pretendard Medium 16 / 1.5 / -1% / center / #FFFFFF
```

### 1.2 baseline 1920×1134 vs spec 1920×818 원인 규명

**결론: overflow-visible.** Frame 299:4807(1920×818)은 내부 Frame 299:4806(1113×640)을 `justify-end, items-center`로 배치. 그 안의 Group 299:4396(956×956)이 items-center·justify-end이므로 **Frame 17(640)보다 316px 큰 956 높이 그룹**이 위쪽으로 316px 삐져나온다 (956-640 = 316, 그리고 baseline 실측 1134 − 818 = **316 정확히 일치**).

즉 Figma frame의 bounding은 818px이지만 자식 Group이 상단으로 316px overflow하고 있다. Framelink PNG 렌더러는 overflow 포함 영역을 모두 렌더링하므로 1134px. baseline 상단에 보이는 "검정 곡선 위로 튀어나온 큰 원 일부"가 그것.

**구현 전략**:
- 섹션 래퍼 h=818 유지하되 `overflow: visible` 적용, 내부 원은 상단으로 삐져나오게 허용
- 단, 다음 섹션(contest-about y=842)과 24px 간격만 있으므로 overflow된 원이 다음 섹션을 가리면 안 된다. baseline을 보면 원의 상단이 섹션 위쪽(y<0)으로만 나가고 하단으로는 나가지 않는다 (Frame 17이 `justify-end`이므로 Group이 Frame 하단에 붙고 위로만 확장됨).
- **결론**: 섹션 자체는 h=818, `overflow: visible` (상단 overflow 허용), 실제 측정은 baseline crop 기준 1920×1134로 수행한다. Preview route에 overflow-visible + padding-top 여유를 줘서 캡처 영역에 원 상단이 포함되게 한다.

### 1.3 Stats 영역 위치

299:4411(Stats 행)은 root 299:4807의 두 번째 자식. root는 column layout (`layout_42SG9T`: mode column, items center, vertical hug). 즉:
- Row 1: 299:4806 (1113×640) — 원 영역
- Row 2: 299:4411 (1920×wrap) — Stats 행, padding 40·0 = 세로 80px 여유

Stats는 Hero 섹션 내부에 baked **노드로** 존재. `research/contest.md` §4 "Stats는 Hero 이미지에 baked-in 추정"은 "PNG baked"가 아니라 "Hero 섹션 안에 속함"으로 정정. HTML 재구성 시 완전한 접근성·SEO 확보 가능.

## 2. 에셋 목록 및 동적 여부

| # | 용도 | 노드 | 타입 | 동적? | 처리 방식 | 목적지 파일명 |
|---|------|------|------|-------|-----------|---------------|
| 1 | Hero 배경 이미지 (mix-blend-hard-light) | root 299:4807 fills[0] imageRef `7559e1ad178a149dcd862f4990af4ee2c2f44c2c` | IMAGE (PNG) | No (정적) | Framelink `download_figma_images` with `imageRef` + `cropTransform` | `src/assets/contest-hero/hero-bg.png` |
| 2 | Vector 19 수직 구분선 SVG | 299:4415 | IMAGE-SVG | No | Framelink `download_figma_images` (stroke SVG) | `src/assets/contest-hero/divider.svg` |

**캔버스-에셋 개수 검증**: 캔버스 이미지/SVG 참조 = 2종 (배경 1 + Vector19 2번 재사용). 에셋 파일 = 2 (divider.svg 1파일 2회 사용). ✓ 일치.

**rotation/transform 요소 없음** — 회전된 요소 부재. 정밀 소수점 수치는 해당 없음.

**baseline PNG 이미 저장**:
- 경로: `figma-screenshots/contest-hero.png`
- 크기: **1920×1134** (실측, spec 818 + overflow 316)
- G1 측정 baseline으로 사용. 정확한 비교를 위해 Preview route에서도 1920×1134 캡처 필요.

## 3. 텍스트 추출 (한글 원문)

| 요소 | 원문 | 비고 |
|------|------|------|
| H1 | `ESG 실천 아이디어 경진대회` | 한 줄 (whitespace-nowrap) |
| 서브1 (lime) | `아이디어에서 실천으로, ESG 실천 아이디어 경진대회 안내` | 한 줄 |
| 서브2 2행 | `아이디어를 넘어 실천으로, 실천을 넘어 사회적 가치 창출로` `<br>` `지속가능한 미래를 만드는 당신의 아이디어를 기다립니다` | `\L` = 줄바꿈 (Figma 라인브레이크) |
| CTA 버튼 | `ESG 실천 아이디어 경진대회 참여하기` | 단일 라인 |
| Stat1 value | `1,500+` | |
| Stat1 caption | `자격 취득자` | |
| Stat2 value | `이론부터 실행` | 40px (Bold) — 다른 숫자들(48)보다 작음, height FIXED 52 |
| Stat2 caption | `체계적 과정` | |
| Stat3 value | `100%` | |
| Stat3 caption | `온라인 응시` | |

## 4. 폰트·색상·스페이싱 스펙 (Figma variable 기반)

### 4.1 폰트 패밀리
- **Gong Gothic** — H1(64 Bold), 서브1(24 Medium). 프로젝트에 이미 `gong-gothic` 폰트 존재 여부 확인 필요. 없으면 Hero 자체에서 처음 사용 → 로컬 @font-face 필요. (다른 About 섹션이 Pretendard만 쓰던 것과 대비)
- **Pretendard (Variable)** — 서브2(18 Medium), CTA(16 SemiBold), Stats 모두.

### 4.2 색상 (Figma variable)
| 토큰 | hex | 용도 |
|------|-----|------|
| `Brand/Brand 700` | `#0C3B0E` | Hero 배경 솔리드, CTA 버튼 텍스트 |
| `Gray Scale/Gray 000` | `#FFFFFF` | H1/서브2/CTA 버튼 배경/버튼 stroke/Stats 텍스트 |
| `Opacity/Black Opacity 200` | `#00000014` (rgba 0,0,0,0.08) | 큰 원 배경 |
| `Gray Scale/Gray 300` | `#C6CDCC` | Vector19 구분선 stroke |
| 포인트 라임 | `#CAEB69` | 서브1 텍스트 (raw, variable 토큰 없음) |

### 4.3 폰트 스타일 (variable 전체 스펙)

| 이름 | family | weight | size | lineHeight | letterSpacing | align |
|------|--------|--------|------|------------|---------------|-------|
| H1 `style_QWT625` | Gong Gothic | 700 (Bold) | 64 | 1.3em (≈83.2px) | -4% (= -2.56px) | center |
| 서브1 `style_2WM5F5` | Gong Gothic | 500 (Medium) | 24 | 1.4em (≈33.6px) | -1.5% (= -0.36px) | center |
| 서브2 `Text-lg/18M` | Pretendard | 500 | 18 | 1.4em (≈25.2px) | -1.5% (= -0.27px) | center |
| CTA `Text-base/16SB` | Pretendard | 600 | 16 | 1.5em (24px) | -1% (= -0.16px) | left |
| Stat-big `style_P7ZLH9` | Pretendard | 700 | 48 | 1.3em (≈62.4px) | -4% (= -1.92px) | center |
| Stat-mid `Text-4xl/40B` | Pretendard | 700 | 40 | 1.3em (52px) | -4% (= -1.6px) | center |
| Stat-cap `Text-base/16M` | Pretendard | 500 | 16 | 1.5em (24px) | -1% (= -0.16px) | center |

> **letterSpacing은 percent 형식** (docs §2.4). Tailwind arbitrary로 `tracking-[-2.56px]` 변환. 각 값은 `size × percent`로 계산된 위 px 값 그대로 사용.

### 4.4 간격·치수
- Root column: items-center, 자식 세로 스택 (gap 없음, Hug 수직)
- Frame 17: 1113×640 fixed, 하단정렬 (justify-end)
- Group/Frame 2043686015: 956×956 원형 rounded-9999, bg rgba(0,0,0,0.08), pb=120
- 내부 콘텐츠 그룹(299:4398): col gap 48
- 텍스트 그룹(299:4399): col gap 32
- 서브 텍스트 그룹(299:4401): col gap 8
- CTA 래퍼 299:4404: padding 4, stroke 1 white, rounded-9999
- CTA 버튼 299:4405: padding 16 32, bg white, rounded-9999
- Stats 행 299:4411: row, gap 16, py 40, items-center, **stretch 1920px 폭**
- 각 Stat item: width 240, gap 12
- 구분선: width 0 (stroke 1px로 1px 선) × height 64

### 4.5 배경 이미지 cropTransform
```
cropTransform = [[0.9806, 0, 0.00985],
                 [0, 0.4758, 0.3118]]
```
- x 스케일 98.06%, y 스케일 47.58%, y offset 31.18% — 원본의 세로 중심부 47.6% 영역을 Hero 1920×818에 STRETCH.
- Framelink `needsCropping: true` + `filenameSuffix: "5c25b2"` + `imageRef` 동반 다운로드 → 크롭 적용된 PNG 생성

## 5. 공통 컴포넌트 사용

- **`HatchedDivider`**: 사용 안 함 (Hero에는 divider 없음)
- **`SectionTabs` / `ProgramCard`**: 사용 안 함
- **`StatItem` (MainStats 로컬)**: **재사용 불가**. MainStats의 StatItem은 "숫자+단위 inline" (예: 97%) + 작은 14px 캡션 구조. 경진대회 Hero는 "숫자 단일 48Bold" + "16Medium 캡션" 다른 레이아웃. 메인페이지 Stats와 경진대회 Hero Stats는 visual-language만 다른 별개 패턴 → `ui/` 승격 보류 (Rule of Three).
- **Hero 내 신규 로컬 컴포넌트 후보**:
  - `ContestStatItem` (local, 3회 사용): value 48/40 Bold + caption 16M 세로 스택
  - CTA 버튼은 1회 사용, inline JSX로 충분

## 6. baseline 시각 분석 (Read 확인 결과)

baseline `figma-screenshots/contest-hero.png` (1920×1134) 내용:

- 상단 y≈0~20: 검정 반원 곡선 (다음 페이지 섹션 위로 나온 원의 상단 곡선)
- y≈0~316: 큰 회색빛 반투명 원의 상단부 — baseline 1134 중 가장 위 316px는 overflow 영역
- y≈316 이하: 진짜 Hero frame (818px)
  - 녹색 배경(brand-700) + 열대 숲 사진 hard-light 합성
  - 중앙 956px 반투명 원 내부에 제목/서브/CTA
  - 하단 Stats 3개 가로 정렬 + 수직 구분선 2개
- 제목 "ESG 실천 아이디어 경진대회"는 흰색, 서브1은 라임색 `#CAEB69`, CTA는 흰 버튼+녹 텍스트
- Stats "1,500+" "이론부터 실행" "100%" 확인 ✓

**육안 semantic 검증 예비 포인트** (§6.4 단계 5 시):
- 큰 원이 상단 overflow로 잘린 반원처럼 보이는지
- Stats 3개 순서 (1,500+ / 이론부터 실행 / 100%)
- 구분선 위치 (두 번째·세 번째 Stat 사이)
- 배경 이미지 hard-light 블렌드 색감

## 7. Preview 라우트·clip 계획

- 라우트: `/__preview/contest-hero`
- 래퍼: `<div className="w-[1920px] mx-auto bg-white">` — height는 overflow 있으므로 고정하지 않음 (1920×1134 영역 전체 캡처)
- **풀폭 (1920)** → clip 파라미터 불필요. `scripts/compare-section.sh contest-hero` 직접 사용.
- baseline `figma-screenshots/contest-hero.png` (1920×1134)과 1:1 비교.
- bg-white: 배경이 녹색이긴 하나 래퍼는 white로 두고 섹션 자체가 녹색을 덮는다.

## 8. 리스크

1. **Gong Gothic 폰트 누락**: 프로젝트 전역 폰트 등록 확인 필요. 부재 시 Pretendard로 임시 폴백하면 H1 glyph 폭 달라져 G1 수치 크게 흔들림 → 폰트 등록 포함해야 함.
2. **cropTransform 적용 정확도**: Framelink가 cropTransform을 올바르게 적용하는지 확인. 실패 시 원본 PNG 받아 CSS `object-position` 수동 조정 필요.
3. **Hero 원 overflow의 다음 섹션 간섭**: `/contest` 페이지에 Hero → About을 나란히 놓으면 Hero 원이 About 위로 튀어나올 가능성. 그러나 baseline 분석상 Group이 위로만 overflow하고 아래는 frame 내부에 있음 → Hero 자체 overflow-visible은 상단만 영향. 다음 섹션 overlap 우려 낮음.
4. **mix-blend-hard-light 구현**: 프로젝트 첫 사용 가능성. Tailwind `mix-blend-hard-light` 지원됨. 블렌딩 결과 색상이 baseline과 일치하는지 G1 측정으로 검증.
5. **baseline 1134 실측 vs 구현 overflow 캡처**: Playwright 캡처 시 `overflow: visible` 설정과 `h` 없는 래퍼로 자연 높이 1134 캡처되는지 확인. Playwright 옵션 추가 필요할 수 있음.
6. **Stats stretch 너비**: 299:4411은 sizing horizontal: fill → 1920 폭 전체. py=40, items-center. 3 Stat group(240씩) + 구분선 + gap이 중앙에. 실측 확인 필요.

## 9. 단계 1 통과 조건 체크

- [x] baseline PNG 존재 및 실측 (1920×1134, RGBA) — `file` 실측 재확인
- [x] 노드 트리 확보 (flatten 아님 확정)
- [x] 모든 텍스트 원문 추출
- [x] 폰트·색·letterSpacing 전부 variable에서 획득
- [x] 에셋 목록 + 동적 여부 컬럼 포함 (모두 No)
- [x] 캔버스-에셋 개수 검증
- [x] baseline overflow 원인 규명 (316px = 956-640)
- [x] Preview route/clip 계획
- [x] 리스크 기록
