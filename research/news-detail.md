# research/news-detail.md — 뉴스 상세 (`/news/:id`)

> Phase 2. Figma `134:2911`, 1920×3339.

## 노드 트리

- TopNav (재사용)
- Content wrapper 1920×2807
  - Breadcrumb (← + "뉴스") at (492, 140) 936×24
  - Article body wrapper at (492, 180) 936×2507
    - Hero image 936×575 (Rectangle 23 fill)
    - Title (28 SB 추정) + Paragraph (label · date)
    - HatchedDivider
    - Body image (696×419 centered, 120 left margin)
    - Caption "한광식 전문대학평생직업교육협회 사무총장..." 14R center
    - Body text 936×624 (long Lorem)
    - HatchedDivider
    - "관련 뉴스" Heading 3
    - 3 related news items (936×162 each, news-list 패턴)
    - "목록으로 이동하기" 버튼 140×45
- Footer 1920×708

## 섹션 분할 (4 + 공통)

| # | 섹션명 | Node | 사이즈 | 캔버스 좌표 | 비고 |
|---|---|---|---|---|---|
| 1 | news-detail-breadcrumb | 134:4156 | 936×24 | (492, 140) | 화살표 + "뉴스" 링크 |
| 2 | news-detail-article | 134:4157 (~상단 1100) | 936×~1100 | (492, 180) | hero + title + body image + content |
| 3 | news-detail-related | 134:4118 | 936×486 | (492, ~1517) | 3 related items (news-list 패턴 재사용) |
| 4 | news-detail-back | 134:4123 | 936×45 | (492, ~2027) | "목록으로 이동하기" 버튼 |
| — | Footer | (re-use) | — | (0, 2807) | |

## 신규 / 재사용 컴포넌트
- NewsListItem (가능하면 news-list와 공통화) — 추후 ui/ 승격 후보
- HatchedDivider 재사용
- Breadcrumb (← + 텍스트) — about 페이지에도 활용 가능

## baseline (Framelink)

- [x] news-detail-full.png 1920×3339
- [x] news-detail-breadcrumb.png 936×24
- [x] news-detail-body.png 938×2508 (article + related + back 통합)

추가 다운로드 필요 시 단계 1에서 sub-section 별 download.

## 다음 진입점

- news-detail-breadcrumb (간단)
- news-detail-article (긴 body)
- news-detail-related (news-list 패턴 재사용)
- news-detail-back (작은 버튼)
