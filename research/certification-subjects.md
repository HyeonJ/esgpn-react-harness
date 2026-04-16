# research/certification-subjects.md

> Figma `299:3900` / 1416×411 — 자격검정 페이지의 "자격검정 영역" 섹션.

## 1. Figma 노드 트리 (get_design_context 결과)

```
299:3900  Frame 2043686021 (section root)         1416×411, px=240 py=64, gap-20, items-end
├─ 299:3901  Heading wrapper (gap-21)              full-width
│  ├─ 299:3902  Icon + Title row (gap-12, items-center)
│  │  ├─ 299:3903  IconSlot 40×40 (Rectangle 23 crop)
│  │  └─ 299:3904  Title "자격검정 영역" 32B / 1.3 / -0.96 / #0A0A0A
│  └─ 299:3905  HatchedDivider (36 hatch + flex line + 36 hatch)
└─ 299:3921  Cards row (gap-12, items-start, w-full)
   ├─ 299:3922  Card 1 "ESG 기본개념" (flex-1, bg #eff0f0, rounded-20, p-24, gap-20)
   │  ├─ 299:3923  Title 20SB / 1.4 / -0.4 / #0A0A0A
   │  └─ 299:3924  Bullet list (w-246, gap-12)
   │     ├─ 1-1. ESG 정의
   │     ├─ 1-2. ESG 이슈와 필요성
   │     └─ 1-3. ESG 발전과정
   ├─ 299:3934  Card 2 "ESG 기본 용어" (flex-1, 동일 스타일)
   │  └─ Bullets: 2-1. ESG 용어 / 2-2. ESG 약자
   └─ 299:3943  Card 3 "ESG 실행 및 실천" (flex-1, 동일 스타일)
      └─ Bullets: 3-1. ESG 관련 법 / 3-2. ESG 관련 기관과 프레임워크 / 3-3. ESG 실천 방안
```

### 타이포그래피 (`get_variable_defs`)

| 역할 | Font | Size | LineHeight | LetterSpacing | Color |
|------|------|------|------------|---------------|-------|
| Heading | Pretendard Bold | 32 | 1.3 | -0.96px (-3%) | `#0A0A0A` |
| Card title | Pretendard SemiBold | 20 | 1.4 | -0.4px (-2%) | `#0A0A0A` |
| Bullet text | Pretendard Regular | 16 | 1.5 | -0.16px (-1%) | `#1E2939` |

### 토큰

| 변수 | 값 |
|------|----|
| `Gray Scale/Gray 100 (Light BG)` | `#eff0f0` (card bg) |
| `border-radius/3xl` | 20 |
| `spacing/2` | 8 |
| `spacing/3` | 12 |
| `spacing/5` | 20 |
| `spacing/6` | 24 |
| `Brand/Brand 500` | `#4fb654` (bullet dot 색 추정) |

## 2. 에셋 목록

| # | 노드 | 역할 | URL | 동적 여부 | 저장명 |
|---|------|------|-----|-----------|--------|
| 1 | 299:3903 | Heading 아이콘 (globe emoji crop, 40×40) | `77b88d48-274b-4c67-81c6-8cf3c37742c1` (Rectangle 23) | 정적 | `heading-icon.png` |
| 2 | 299:3906, 3914 | Hatched divider 36×8 (×2) | `ad11d783-fe57-46d9-b177-5e9c02bb6d3d` | 정적 | (HatchedDivider ui/ 재사용) |
| 3 | 299:3913 | 가운데 선 (Vector 8) | `9f2c585a-e055-495d-b2f8-402140320bdf` | 정적 | (HatchedDivider ui/ 재사용) |
| 4 | 299:3926... | Bullet dot 12×12 (Ellipse 6, 8개 동일) | `91029e41-5718-4209-b9a5-80e9b5354351` | 정적 | CSS로 재현 (단색 원) — 또는 `bullet-dot.svg` |

**캔버스-에셋 개수 검증**: Figma 좌측 캔버스에 아이콘(1) + hatched(2) + line(1) + dot(8 동일) = 12개 참조, MCP 반환 4 URL. Dot 8개가 동일 ellipse ref이므로 1회 다운로드로 충분. **일치**.

### 공통 컴포넌트 재사용

- **HatchedSectionHeading (`src/components/ui/HatchedSectionHeading.tsx`)** — 기존 iconAlt="" 허용. CertificationIntro와 동일 패턴, **같은 아이콘 재사용 후보** (Rectangle 23 = contest-about/intro/subjects에서 동일 사용 추정). 실제로 CertificationIntro가 `certification-intro/heading-icon.png` 사용 중 → **재사용 가능**.
- **HatchedDivider** — 이미 HatchedSectionHeading 내부에 포함. 별도 에셋 불필요.

→ 결론: **신규 에셋 1장** (`bullet-dot.svg` 또는 Ellipse PNG) 또는 CSS 단색 원으로 대체.
Figma 원본 inspection 시 `imgEllipse6`은 Brand Green 단색 원 12×12 → **CSS 재현 채택** (vector, crisp, 토큰 `--brand-500` 참조 가능).

## 3. 레이아웃 재설계 (v4 구조 중심)

Figma code는 모두 flex 기반이며 absolute는 아이콘/divider crop에만 쓰임. 구조 결정:

- **`<section>`** — aria-labelledby
- **`<h2>`** — HatchedSectionHeading 내부 (titleId prop)
- **`<ul>`** — 3 카드 컨테이너 (grid-cols-3 또는 flex gap-3)
- **`<li><article>`** — 각 카드 (flex-1)
  - **`<h3>`** — card title
  - **`<ul>`** — bullet list
    - **`<li>`** — dot(span) + text(span)

absolute 요소: HatchedDivider 내부에만 존재 (ui 컴포넌트 내부에 한정) → 섹션 파일 absolute 0.

## 4. 캔버스 좌표

- 섹션: x=252, y=1142, w=1416, h=411 (컨텍스트에서 제공)
- clip: `--clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 411`
  → 주의: baseline export는 섹션 단독이므로 clip-y=0 기준. `figma-screenshots/certification-subjects.png` 직접 export.

## 5. 리스크

1. Framelink MCP 미등록 상태 → baseline PNG 저장이 차단. `figma-screenshots/certification-subjects.png`를 MCP 공식 screenshot으로는 저장 불가. **대안**: CertificationIntro와 동일하게 `get_design_context`의 output_image (인라인)로 육안 검증 + `figma-screenshots/certification-full.png` (이미 존재하는 1920×4910)에서 crop으로 baseline 생성.
2. Heading 아이콘 재사용 — CertificationIntro의 `heading-icon.png`와 동일 ref 확인 필요. 실측으로 새로 다운로드 + md5 비교하면 안전.
3. Card 2 (ESG 기본 용어)가 bullet 2개뿐 → flex 균등 높이 유지 확인 (items-start + self-stretch). Figma에서는 w-246 고정하지만 실제로는 flex-1 균등.
4. Bullet dot 색: 원본이 green? grey? → get_design_context는 img 참조만. Brand 500 #4fb654 토큰이 variables에 뜸 → 브랜드 그린 사용 가능성 높음. 육안 확인 필수.
5. 섹션 텍스트 whitespace-nowrap: 긴 bullet "3-2. ESG 관련 기관과 프레임워크" 21자. w-246 내부에서 nowrap이면 overflow 가능 → 실제 card width 계산: `(1416 - 240×2 - 12×2) / 3 = 304px` card, p-24 → 256px inner, bullet text 영역 = `256 - 12(dot) - 12(gap) = 232px`. "ESG 관련 기관과 프레임워크" 21자 16px Regular → 대략 200-220px. 아슬아슬. nowrap 유지하되 자간/크기 정확 맞추면 통과.

## 6. 구조 지표 예측

- `token_ratio` 목표: 20SB/16R/24/20/12 등 Figma 토큰 모두 사용 가능. `--brand-*`, gray-100, border-radius 값 모두 토큰 참조 가능. 예측 ≥ 0.4
- `absolute/file` 목표: 0 (모든 요소 flex). ui/HatchedDivider 내부 absolute는 섹션 파일 범위 밖.
- `semantic_score` 목표: section/h2/h3/ul/li/article = 6점

## 7. 구현 체크리스트

- [ ] HatchedSectionHeading 재사용 (headingIcon = 기존 `certification-intro/heading-icon.png` 공유 or 자체 보유)
- [ ] Card 3-column grid (또는 flex-1)
- [ ] Bullet dot CSS 단색 원 (brand-500)
- [ ] 한국어 bullet 8개 데이터 배열로
- [ ] nowrap 검증 후 overflow 없도록
- [ ] baseline은 공식 screenshot inline으로 육안 비교
