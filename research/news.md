# research/news.md — 뉴스 목록 (`/news`)

> Phase 2. Figma `129:1756`, 1920×3257.

## 노드 트리 (요약)

- TopNav (재사용)
- 콘텐츠 wrapper 1920×2549
  - SectionTabs "뉴스 / 자료실" at (492, 140) 936×29
  - Title 2-line "Heading 3" at (492, 217) 936×124 (placeholder Amazon text — 사용자 확인 필요)
  - HatchedDivider + Featured 2-col cards at (492, 397) 936×568
    - 2 cards 456×468 (이미지 456×280 + content 456×164: title + summary + 라벨·날짜 paragraph)
    - 우측 하단 화살표 nav 180×40 (페이지 도트 4개)
  - "총 24개" + HatchedDivider + 8 list items at (492, 815) 936×1416
    - 각 list item 936×162 (title + summary + tag/date paragraph + 140×100 right thumb)
    - 하단 Pagination (24×24 페이지 13개)
- Footer 1920×708 (재사용)

## 섹션 분할 (4 + 공통 2)

| # | 섹션명 | Node | 사이즈 | 캔버스 좌표 | 비고 |
|---|---|---|---|---|---|
| 1 | news-tabs | 129:2196 | 936×29 | (492, 140) | SectionTabs (about-organization-tabs와 유사) |
| 2 | news-title | 129:2557 | 936×124 | (492, 217) | Heading3 placeholder text |
| 3 | news-featured | 129:2560 | 936×568 | (492, 397) | HatchedDivider + 2 featured cards + 페이지 nav |
| 4 | news-list | 129:2609 | 936×1416 | (492, 833) | 총 N개 + 8 list items + 13 page paginate |
| — | Footer | (re-use) | — | (0, 2549) | |
| — | TopNav | (re-use) | — | (252, 16) | |

## 사전 추정과 차이
사전 추정 §4.6은 4 섹션(Hero/Featured/List/Footer)인데 실제도 비슷하나 Hero 대신 SectionTabs+Title 분리.

## 신규 공통 컴포넌트 후보
- `NewsCard` (featured 형식): 456w + image 280h + 텍스트 영역
- `NewsListItem` (list 형식): 936w + 776 텍스트 + 140×100 right thumb
- `Pagination` (24×24 도트 페이지) — Figma instance "Pagination" 사용. 자체 구현 권장
- SectionTabs는 기존 ui/ 재사용

## 리스크
1. **Title placeholder**: Heading3에 "Amazon bets $233M..." 영문 placeholder. 실제 카피는 "지식으로 여는 지속 가능한 내일"일 가능성 (사전 추정). 사용자 확인 필요 — 자율 모드에선 placeholder 그대로 유지
2. **24개 더미 데이터 반복**: 모든 list item이 동일 텍스트 "Amazon bets $233M..." 8회 반복. 더미라 그대로 재현
3. **Featured 카드의 image fill imageRef**: 단계 1에서 download 필요
4. **Pagination instance** 13개 → 도트 13개를 instance 호출 대신 React map으로

## baseline (Framelink)

- [x] news-full.png 1920×3257
- [x] news-tabs.png 936×30
- [x] news-title.png 936×124
- [x] news-featured.png 938×569
- [x] news-list.png 937×1416

## 다음 단계
1. news-tabs (간단)
2. news-title (간단, gallery-title과 유사)
3. news-featured (NewsCard 신설)
4. news-list (NewsListItem 신설 + Pagination)
