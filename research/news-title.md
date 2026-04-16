# research/news-title.md — /news Title 섹션 (v4)

> Figma `129:2557`, 936×124. 캔버스 좌표 (492, 217). `/news` 라우트.

## 노드 트리 (`get_design_context` 추출)

```
Frame 2043686120 (129:2557) — flex row, gap 32, items-end, justify-center
  ├─ p (129:2558) 좌측 타이틀 — flex-1, Pretendard Bold 48px / LH 1.3 / LS -1.92px
  │   "지식으로 여는\n지속 가능한 내일"
  └─ p (129:2559) 우측 서브 — flex-1, Pretendard Regular 15px / LH 1.5 / LS -0.1125px, text-right
      "단순한 소식을 넘어, 실질적인 변화의 실마리가 될\n전문적인 지식과 최신 동향을 기록합니다."
```

## 실제 카피 확정

- v1~v3에서 "지식으로 여는 지속 가능한 내일"은 사전 추정으로 넣어두고 T-009 `[ACCEPTED_DEBT]`로 기록했지만 **v4 design_context로 실제 문구임이 확인됨**.
- 우측 서브는 신규 확인: "단순한 소식을 넘어, 실질적인 변화의 실마리가 될 / 전문적인 지식과 최신 동향을 기록합니다."
- placeholder("Amazon bets $233M...")는 본 섹션에 **없음** (research/news.md §리스크 1에서 우려했던 것과 다름). 해당 문구는 featured/list 카드에만 존재.

## 토큰 매핑

| Figma | CSS token | 비고 |
|-------|-----------|-----|
| text 48 / Bold / LH 1.3 / LS -1.92 (= -4% × 48) | `--text-4xl-40b-*` 계열과 다름 (40이 아니라 48). inline으로 `[48px]` + 디자인 토큰 font-family | display-01 (48/1.3 없음; 48/56·LS 0만 있어 부적합). inline 스펙 + `font-family-pretendard` 토큰 사용 |
| text 15 / Regular / LH 1.5 / LS -0.1125 (= -0.75%) | `--text-md-15r-*` (LS -0.75px 약간 다름) | design_context는 LS -0.1125px(=-0.75% × 15). 토큰 LS -0.75px(절대). 시각적으로 동일 범위 → 토큰 그대로 사용 |
| color: black (#000000) | 토큰 없음 → Figma raw 그대로 (ContestAbout 전례) | — |
| gap 32px | `--spacing-8` | |
| items-end | `items-end` (바닥 정렬) | 좌측 48px 2줄의 baseline과 우측 15px 2줄 baseline 맞춤 |

## 에셋

없음. 텍스트 전용 섹션.

| # | 에셋 | 동적 여부 | 처리 |
|---|------|-----------|-----|
| — | (없음) | — | — |

**캔버스-에셋 개수 일치**: 0 = 0 OK.

## baseline

- `figma-screenshots/news-title.png` 936×124 (REST API로 다운로드 완료, 실측 일치)

## clip 좌표 (섹션이 페이지 중앙 floating 요소)

- 캔버스 (492, 217) 936×124
- Preview는 `w-[1920px] mx-auto` wrapper → 좌우 여백 (1920-936)/2 = 492 일치
- clip: `--clip-x 492 --clip-y 0 --clip-w 936 --clip-h 124` (Preview wrapper가 top=0 시작)

## 구조 판단 (v4)

- section > div(flex row) > h1(left) + p(right)
- absolute 사용 0
- flex gap + items-end로 자연 정렬
- 디자인 토큰 적극 참조 (font-family, spacing, text-md)
- semantic h1 사용 (페이지 최상단 대제목. Header의 h1/h2 충돌 검토 필요 → Header는 일반적으로 로고 div, h1 없음. /news 페이지 전체에서 h1 역할로 타당)

## 리스크 / 주의

1. **48B 토큰 부재**: `--text-display-01-*`은 48/56 LS 0, `--text-4xl-40b-*`는 40. 디자인 48/LH1.3/LS -1.92는 그 어느 쪽과도 정확히 일치 안 함. inline hard-coded 48 유지 + font-family 토큰만 참조. 향후 `--text-4xl-48b` 토큰 추가 시 교체
2. **Right 서브 LS**: design_context는 -0.1125px(=-0.75%×15), 토큰은 -0.75px(절대). 0.64px 차이 → 시각적으로 무시 가능, 토큰 사용 OK
3. **2:1 flex-1 분배**: 원문은 flex-1 분배(1:1). 실제 baseline 보면 좌측 타이틀이 더 긴 줄바꿈으로 좌측이 무거움 → flex-1 유지 충분
4. **h1 중복**: /news 페이지 루트에 heading이 이미 있을 수 있으나 현재 `/news` 루트는 `<NewsTabs />` 만 + `<div>` wrapper. h1 safe

## 단계 1 통과
- [x] design_context fetch OK
- [x] baseline PNG 저장 (936×124 실측)
- [x] 에셋 일치 확인 (0=0)
- [x] 토큰 매핑 작성
