# research/certification-benefits.md

> Figma 299:3955 / 1416×399 / 자격검정 페이지 (91:1903)

## 섹션 개요
"지속가능한 미래를 이끄는 필수역량" 헤딩 + 5개 이미지 카드 (각 177.6×180, 80×80 아이콘 + 2줄 본문 + 숫자 배지).
ContestBenefits와 동일 DNA: `HatchedSectionHeading` + 카드 그리드. 차이: 6카드→5카드, 304px→177.6px(더 좁음), h-203→h-180, 숫자 배지 24×24 top-left -4px offset.

## Figma 레이아웃 트리 (REST API depth=3)

### Outer frame 299:3955
- 1416×399, flex-col gap-20, px-240 py-64

### Heading block 299:3956
- 40×40 icon (299:3958, heading-icon) + 32B "지속가능한 미래를 이끄는 필수역량" (299:3959)
- gap-12
- HatchedDivider 299:3960 (36-8-line-36-8 패턴, 기존 `HatchedDivider` 재사용)

### Cards container 299:3976
- 5 카드, flex row gap-12 (row gap 12 = `spacing/3`)
- 각 카드 177.6x180, bg-gray-100 (#EFF0F0, `Gray Scale/Gray 100 (Light BG)`), rounded-20 (`border-radius/3xl`)
- flex-col items-center justify-center gap-12, pt-16 pb-12 px-16

### 카드 상세 (Figma absoluteBoundingBox)

| # | Card ID | Icon ID | 아이콘 타입 | Text ID | 본문 | Badge ID |
|---|---------|---------|-------------|---------|------|----------|
| 1 | 299:3977 | 299:3978 RECTANGLE | image (community) | 299:3979 | 지역사회와 상생으로 / 균형잡힌 지속가능성 실현 | 299:3980 |
| 2 | 299:3982 | 299:3983 RECTANGLE | image (talent, mix-blend-multiply) | 299:3984 | ESG 중심의 인재 육성과 / 조직 문화 혁신 | 299:3985 |
| 3 | 299:3987 | 299:3988 RECTANGLE | image (value) | 299:3989 | 사회적 가치 창출로 고객 / 신뢰와 브랜드 가치 제고 | 299:3990 |
| 4 | 299:3992 | 299:3993 RECTANGLE | image (ethics) | 299:3994 | 윤리적 의사결정과 투명한 / 정보 공개로 신뢰 제고 | 299:3995 |
| 5 | 299:3997 | 299:3998 RECTANGLE | **solid #d9d9d9 placeholder** (no image) | 299:3999 | 인간중심시대, ESG 역량강화로 새로운 성장동력 확보 (1줄 넘침) | 299:4000 |

- 아이콘 80×80, rounded-16
- Card 2 아이콘은 `mix-blend-multiply` (디자인 의도적 블렌드)
- Card 5 아이콘은 placeholder — 이미지 없음, `bg-[#d9d9d9]` solid. number badge는 이미지로 존재
- 본문 14 Medium, black, ls -0.5 (Figma Text-sm/14M), leading 1.5, center
- Card 5 본문은 `min-w-full` 때문에 **1줄로 표시** (145.6px 폭 넘쳐도 그냥 흐름). Figma baseline은 1줄-2줄 자동 wrap — 확인 결과 Figma에서는 단일 `<p>`에 `<br>` 없이 자연 wrap
- Number badge (24×24) top-left `-4px / -4px` 오프셋. leaf node (299:3980, ...) 1~5 숫자가 그려진 원형 PNG

## 디자인 토큰 (get_variable_defs 결과)
- `Gray Scale/Gray 100 (Light BG)`: #EFF0F0 → `bg-gray-100`
- `border-radius/3xl`: 20 → `rounded-[20px]`
- `spacing/3`: 12, `spacing/4`: 16 → `gap-3`, `p-4`
- `Text-3xl/32B`: Pretendard Bold 32 / 1.3 / ls -3
- `Text-sm/14M`: Pretendard Medium 14 / 1.5 / ls -0.5

## 에셋 목록 (10개, 동적 여부)

| 파일명 | 원본 nodeId | native × scale2 | 동적? | 처리 |
|--------|------------|-----------------|-------|------|
| heading-icon.png | 299:3958 | 40→80 | N | REST API |
| icon-1-community.png | 299:3978 | 80→160 | N | REST API |
| icon-2-talent.png | 299:3983 | 80→160 | N | REST API |
| icon-3-value.png | 299:3988 | 80→160 | N | REST API |
| icon-4-ethics.png | 299:3993 | 80→160 | N | REST API |
| badge-1.png | 299:3980 | 24→48 | N | REST API |
| badge-2.png | 299:3985 | 24→48 | N | REST API |
| badge-3.png | 299:3990 | 24→48 | N | REST API |
| badge-4.png | 299:3995 | 24→48 | N | REST API |
| badge-5.png | 299:4000 | 24→48 | N | REST API |

- Card 5 아이콘은 이미지 아님 (RECTANGLE solid fill), 에셋 목록에서 제외. `bg-[#d9d9d9]` div로 처리
- 캔버스 5 카드 × (아이콘 1 + 텍스트 1 + 배지 1) = 15 요소 중 Card 5 아이콘을 제외한 14 — 추출 9개 (아이콘 4 + 배지 5 + 헤딩 1) = 10개 ✅

## baseline 실측
- `figma-screenshots/certification-benefits.png`: 1416×399 RGBA (Figma spec과 일치)
- clip 파라미터: `--clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 399`

## transform 요소
- 없음. rotation/blend 외의 transform 없음. Card 2 mix-blend-multiply는 플랫 적용

## Framelink baked-in 위험
- 사용 안 함 (REST API 사용). 각 아이콘/배지는 leaf nodeId 개별 export — text-bearing raster 아님 (숫자 1~5는 decoration 배지라 a11y 의미 없음 → aria-hidden)

## 재사용
- `HatchedSectionHeading` (ui/) 재사용: iconSrc=heading-icon (필수역량 전용 지구본), title="지속가능한 미래를 이끄는 필수역량"
- `BenefitCard` 패턴은 유사하나 — (1) 숫자 배지 포함, (2) 크기 177.6×180 vs 304×203, (3) 제목 없이 본문만 — 이므로 **섹션 내 로컬 `CapabilityCard`** 로 구현 (Rule of Three: 1회 사용 → 승격 보류)
