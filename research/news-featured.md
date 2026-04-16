# research/news-featured.md — /news Featured 섹션 (v4)

> Figma `129:2560`, **937×569** (baseline PNG: 938×569)

캔버스 좌표: (492, 397). Phase 2 분할표의 사이즈와 1px 차이 (938 vs 937) — baseline이 실측 기준.

---

## 1. 노드 트리 요약

```
Frame2043686121 (129:2560) — content-stretch flex flex-col gap-[20] items-center w=full
├─ Hatched Divider Bar (129:2561) — h=8 flex gap-[8] items-center w=full
│   ├─ 좌측 해치 (129:2562) — 36×8 static asset imgFrame2043685982
│   ├─ 중앙 실선 (129:2569) — flex-1 h=0 static asset imgVector8
│   └─ 우측 해치 (129:2570) — 36×8 (imgFrame2043685982 재사용)
└─ 메인 컨텐츠 (129:2577) — flex-col gap-[32] items-center w=full
    ├─ 2열 카드 그리드 (129:2578) — flex gap-[24] items-center w=full
    │   ├─ Card A (129:2579) — flex-1 flex-col gap-[24]
    │   │   ├─ 이미지 (129:2580) aspect-[456/280] rounded-16 (imgRectangle17)
    │   │   └─ 텍스트 블록 (129:2581) col gap-[24] pr-[16]
    │   │       ├─ 타이틀+요약 (129:2582) col gap-[16]
    │   │       │   ├─ 타이틀 24B LH1.4 tracking-[-0.6] #1d2623
    │   │       │   └─ 요약 15R LH1.5 tracking-[-0.1125] ellipsis 3-line
    │   │       └─ 메타 (129:2585) flex gap-[8] items-center
    │   │           ├─ 출처 14R #97a29e "이투데이"
    │   │           ├─ 점 (3×3 imgEllipse5)
    │   │           └─ 날짜 14R #97a29e "2026-01-19"
    │   └─ Card B (129:2589) — 동일 구조 (같은 텍스트/이미지 중복)
    └─ 페이지네이션 컨트롤 (129:2599) — flex gap-[16] items-center
        ├─ 좌 화살표 버튼 (129:2600) — 40×40 rounded-full border-gray-300 bg-white (ArrowType4 icon 28)
        ├─ 도트 4개 (129:2602) — flex gap-[6]
        │   ├─ active: 32×6 rounded-[24] bg-black
        │   └─ 3×inactive: 6×6 bg-[#d9d9d9]
        └─ 우 화살표 버튼 (129:2607) — 40×40 rounded-full border-gray-300
```

## 2. baseline 실측 (§2.6)

- 경로: `figma-screenshots/news-featured.png`
- native 크기: **938 × 569** (RGBA, non-interlaced)
- spec 937×569와 1px 차이 (허용 범위). clip 좌표: (492, 397) + 카드 polish 기준 섹션 단독 측정 권장

## 3. 레이아웃 디테일

### 3.1 루트 컨테이너 (129:2560)

- `flex flex-col gap-[20px] items-center justify-center size-full` — 자체 높이 없음, 내용에 의해 569
- mx-auto 내장 필요 (페이지 통합 시)

### 3.2 해치 구분선 (129:2561)

- `flex gap-[8px] h-[8px] items-center w-full`
- 좌/우 해치: **36×8** native, inset `-9.38% -2.08%` (bleed), `imgFrame2043685982` PNG
- 중앙: **flex-1 h-0** (빈 div), inset `-0.75px 0` 로 1.5px 높이 line, `imgVector8` (실선 SVG/PNG)
- 기존 `HatchedDivider` 컴포넌트와 구조는 유사하나 **해치 스타일이 다름** — Featured는 8px 높이 bar 형태, About는 10px viewBox에 6-slash. 재사용하면 semantic 변경 위험 → **로컬 렌더 권장**
- 대안: `HatchedDivider` 확장하기보다 Figma asset 그대로 img로 배치

### 3.3 카드 그리드 (129:2578)

- `flex gap-[24px] items-center w-full`
- 각 카드 `flex-1 flex-col gap-[24px] min-w-px` → (936 - 24) / 2 = **456px** width
- 이미지 `aspect-[456/280]` → 456×280 (Figma rounded-16, object-cover)
- 텍스트 블록 `pr-[16px]` (우측만 padding) col gap-[24]
- 타이틀: 24B LH1.4 tracking `-0.6` color `#1d2623` — **1줄, 오버플로 없음** (baseline 확인)
- 요약 컨테이너: `leading-[0] overflow-hidden text-ellipsis` + 내부 `<p leading-[1.5]>` + 빈 p — CSS multi-line ellipsis는 line-clamp로 구현해야 baseline의 3줄 ellipsis 효과 재현
- 메타 paragraph: `flex gap-[8] items-center` — 출처 14R / 점 3px / 날짜 14R

### 3.4 페이지네이션 (129:2599)

- `flex gap-[16] items-center`
- 화살표 버튼 40×40, `rounded-full`, border `#d3d8de` (gray-300), bg white. 내부 아이콘 wrapper 28×28, `ArrowType4` (inset-[27.08%..] + rotate-90 / -rotate-90 composite)
- **실측**: 아이콘은 Figma의 `ArrowType4` composite. 단순 chevron 대신 rotate inset wrapper 사용
- 도트 4개: 첫번째 `active 32×6 rounded-[24] bg-black`, 나머지 `6×6 rounded-full bg-[#d9d9d9]`

### 3.5 letter-spacing & fonts

| 용도 | size | weight | tracking |
|------|------|--------|----------|
| 카드 타이틀 | 24 | 700 | `-0.6px` |
| 카드 요약 | 15 | 400 | `-0.1125px` |
| 메타 텍스트 | 14 | 400 | `-0.07px` |

`get_variable_defs`에는 **Text-2xl/24B: letterSpacing: -2.5** 로 기록됐으나, design_context가 내려준 실제 tracking은 `-0.6px`(=24×-2.5%). percent 함정 없음 — design_context 값 채택.

## 4. 디자인 토큰

기존 tokens.css 참조:
- `--gray-scale/gray-500` = `#97a29e` (tokens.css에 `--color-gray-500` 있음)
- `--gray-scale/gray-900-(dark-bg,-text)` = `#1d2623` (tokens.css `--color-gray-900`)
- `--gray-scale/gray-300` = `#d3d8de` — **기존 tokens.css 값은 `#c6cdcc`** (about-organization-chart 카드 border) 와 다름. Figma 변수가 2가지 gray-300 사용 → Featured는 `#d3d8de` 직접 하드코딩
- `--spacing-2/4/6` = 8/16/24 ✓
- `--text-2xl-24b-*` / `--text-md-15r-*` / `--text-sm-14r-*` ✓ — tokens.css 존재
- `--border-radius-full` = 9999 (tokens.css에 있는지 확인 필요 — 없으면 `rounded-full`)

## 5. 에셋 목록 & 캔버스-에셋 일치 검증

| # | 에셋 const | 용도 | 형식 | 동적 | 사용 횟수 |
|---|------------|------|------|------|-----------|
| 1 | `imgFrame2043685982` | 좌/우 해치 (36×8 PNG) | PNG | 정적 | 2 (좌+우 재사용) |
| 2 | `imgVector8` | 중앙 실선 | SVG/PNG | 정적 | 1 |
| 3 | `imgRectangle17` | 카드 썸네일 | PNG | 정적 | 2 (카드A+B 재사용) |
| 4 | `imgEllipse5` | 메타 점 구분자 (3px) | SVG/PNG | 정적 | 2 (카드당 1개 × 2) |
| 5 | `imgIconStroke` | 좌 chevron | SVG | 정적 | 1 |
| 6 | `imgIconStroke1` | 우 chevron | SVG | 정적 | 1 |

**고유 에셋 파일 수 = 6**. 동적 에셋 없음.

### 다운로드 URL
```
https://www.figma.com/api/mcp/asset/14ca60c3-c580-4760-a77f-33cc95723dca  imgIconStroke (좌)
https://www.figma.com/api/mcp/asset/d05b2c30-bfba-4aac-951f-fcaac9871255  imgIconStroke1 (우)
https://www.figma.com/api/mcp/asset/5f5880d6-6162-47e5-bdba-29c08612e8ab  imgRectangle17
https://www.figma.com/api/mcp/asset/8f3e6514-0058-4441-9b3b-c609e8b0422c  imgFrame2043685982 (해치)
https://www.figma.com/api/mcp/asset/f06514eb-eedd-4301-873d-e085f007da10  imgVector8 (실선)
https://www.figma.com/api/mcp/asset/ccb45ab2-ab1f-41f1-8abd-499cfbe7c504  imgEllipse5 (점)
```

### 캔버스 육안 확인
- 상단 해치 구분선 (좌우 해치 + 중앙 실선) ✓
- 좌우 2카드 (이미지 + 제목 + 요약 + 출처·점·날짜) ✓
- 하단 페이지네이션 (좌화살표 / 도트 4개 / 우화살표) ✓

**개수 일치 확인 완료** (6 고유 에셋 URL).

## 6. transform·rotation

- Chevron 아이콘: `ArrowType4` 내부에 `rotate-90` / `-rotate-90` inset wrapper
  - 정확히 ±90° (소수점 없음). §2.4 이슈 없음
- 외곽 회전 요소 없음

## 7. 리스크

1. **기존 HatchedDivider 재사용 vs 로컬 구현**: 구조가 다름 (8px bar 형태 vs 10px dash-dot 형태). Figma asset 2개 (imgFrame2043685982, imgVector8) 직접 사용이 baseline 충실도 높음. 공통 컴포넌트화는 2회 이상 반복될 때 (현재는 1회)
2. **3줄 ellipsis**: design_context는 `leading-[0] overflow-hidden text-ellipsis` + inner `leading-[1.5]` 방식인데 이는 single-line ellipsis. 실제 baseline은 multi-line fade → `-webkit-line-clamp` 필요
3. **카드 중복 텍스트**: Figma가 Card A/B 모두 같은 SDGs 뉴스. 실무에선 data array로 교체하지만 baseline diff 통과 위해 **동일 2개 하드코딩**
4. **NewsCard 공통화**: 워커 입력에서 "NewsCard 공통 컴포넌트 후보" 언급. 그러나 featured용(456w + image 280 + 텍스트 gap24)과 list용(936w horizontal layout + 140×100 right thumb)은 구조가 완전 다름 — Rule of Three (3회 이상 반복) 적용. **현 섹션은 로컬 inline 2회 반복**, list 섹션 구현 시 공통화 판단
5. **active dot 위치는 첫 번째**: baseline 확인 (첫 번째 카드/페이지가 1/4 표시)

## 8. 구현 예상 위험도

**중간.** 패턴은 단순하나 에셋 6개 / 2카드 반복 / 페이지네이션 커스텀 아이콘 등 요소 많음.

- 회전/블렌드 없음
- 동적 에셋 없음
- 예상 G1 diff: 5~10% (텍스트 rendering + 해치 composite PNG alpha 경계)

## 9. 단계별 메모

1. 에셋 6개 다운로드 (정적)
2. 카드 inline 2회 반복 (로컬 map 데이터 배열)
3. HatchedDivider는 **로컬 3-div 구조**로 재현 (asset img 2개 + flex-1 실선 img)
4. Chevron 버튼: 40×40 rounded-full + 28×28 ArrowType4 composite (rotate-90 inset)
5. 도트 4개: 첫 번째 32×6 active, 3개 6×6 inactive

baseline `figma-screenshots/news-featured.png` 938×569 저장 완료.
