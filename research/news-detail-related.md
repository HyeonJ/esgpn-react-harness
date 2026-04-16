# research/news-detail-related.md — 뉴스 상세 관련 뉴스 섹션

> Phase 2 — Figma `134:4118` (list, 936×486) + `134:4081` (heading, 936×28).
> 섹션 범위: "실천의 영감을 더해줄 또 다른 이야기들" heading + 3 related news items.

## Figma 좌표 / 크기
- Heading 134:4081 — abs (18080, 2181.12) 936×28
- List 134:4118   — abs (18080, 2233.12) 936×486
- gap heading→list: 2233.12 − 2181.12 − 28 = **24px**
- 섹션 전체: 936 × (28 + 24 + 486) = **936×538**
- 페이지 내부 좌표: page 상단 기준 (492, ~1517) — plan의 wrapper width 936, mx-auto 정렬

## 노드 구조 (134:4118 children)
- 134:4119 wrapper flex-col (3 articles, border-b 사이 구분)
- 134:4086  item 1 (SDGs) → title 134:4089, summary 134:4090, source 134:4092 "이투데이", dot 134:4093 (Ellipse5), date 134:4094 "2026-01-19", thumb 134:4095 (Rectangle17)
- 134:4096  item 2 (ESG 정착) → title 134:4099, summary 134:4100, source 134:4102 "한국대학신문", dot 134:4103, date 134:4104 "2022-01-18", thumb 134:4105 (Rectangle18)
- 134:4106  item 3 (정부차원 ESG창업) → title 134:4109 (w=424), summary 134:4110, source 134:4112 "한국대학신문", dot 134:4113, date 134:4114 "2022-01-18", thumb 134:4115 (Rectangle17)

## 디자인 토큰 (이미 프로젝트에 존재)
- `--color-gray-300` #c6cdcc (border-b)
- `--color-gray-500` #97a29e (meta)
- `--color-gray-700` #5d6a66 (summary)
- `--color-gray-900` #1d2623 (title)
- `--text-xl-20b-*` / `--text-xl-20sb-*` / `--text-md-15r-*` / `--text-xs-13r-*`
- `--font-family-pretendard`
- spacing tokens 2/3/5/6 = 8/12/20/24px

## 아이템 구조 (NewsList와 동일 패턴)
```
<article flex items-center gap-5 border-b py-6>
  <div flex-1 min-w-0 gap-3 col>
    <div col gap-2>
      <h3 text-xl-20b tracking-[-0.4px] color-gray-900>{title}</h3>
      <p line-clamp-2 text-md-15r tracking-[-0.1125px] color-gray-700>{summary}</p>
    </div>
    <div meta flex gap-2 items-center>
      <span xs-13r gray-500>{source}</span>
      <img dot.svg 3×3 />
      <time xs-13r gray-500>{date}</time>
    </div>
  </div>
  <div w-140 h-100 bg-#d9d9d9 rounded-2xl overflow-hidden shrink-0>
    <img object-cover />
  </div>
</article>
```

## 에셋 목록

| 이름 | Figma Node | 동적? | 처리 | 경로 |
|---|---|---|---|---|
| thumb A (item1, item3) | 134:4095 / 134:4115 (Rectangle17) | 정적 | **재사용** | `src/assets/news-featured/thumb.jpg` |
| thumb B (item2) | 134:4105 (Rectangle18) | 정적 | **재사용** | `src/assets/news-list/thumb-b.png` |
| dot (Ellipse5) | 134:4093/4103/4113 | 정적 SVG | **재사용** | `src/assets/news-featured/dot.svg` |

캔버스 3개 썸네일 + 3개 dot 모두 NewsList에서 이미 사용 중인 자산과 동일 — **신규 다운로드 불필요**.

## baseline PNG
- `figma-screenshots/news-detail-related.png` 936×486 (list 전용, heading 제외)
- section 전체(heading+list) baseline은 별도 생성 필요 — heading은 텍스트 28px만이라 visual 비교 시 list 영역 우선

## 측정 clip
- `--clip-x 492 --clip-y {heading_y}` 전체 섹션 538px 비교
- 단순화 위해 list 영역만 비교: clip 936×486 매칭

## v4 완전 재구성 원칙
- NewsList와 동일한 HTML 구조 (article / h3 / time)
- 썸네일은 leaf nodeId로 별도 다운로드 **없이** 기존 자산 import
- 텍스트 모두 JSX literal (G8)
- border-b 구조: 마지막 아이템도 border-b 유지 (Figma 134:4106 spec)

## 다음 단계
- plan 작성 → 구현

## 통과 조건 체크
- [x] baseline PNG 저장 (flat 경로, 936×486 RGBA)
- [x] 캔버스-에셋 개수 일치 (3 thumb nodes → 2 unique files 재사용)
- [x] 동적 에셋 없음
- [x] 디자인 토큰 모두 존재
- [x] NewsList 패턴 확인 (로컬 NewsListItem 구조 유지)
