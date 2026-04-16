# research/news-list.md — /news List + Pagination 섹션

> Figma `129:2609` (936×1416). 위치 (492, 833). Route `/news` 마지막 섹션.
> Baseline: `figma-screenshots/news-list.png` (937×1416) — Framelink download 성공.

---

## 1. 노드 트리 (design_context 기반)

```
Frame2043685953 (129:2609) 936×1416 flex-col gap-4 py-6 items-center
├── 129:2610 flex-col gap-2 w-full  (header + list)
│   ├── 129:2611 flex gap-2 items-center  (총 N + divider + hatch)
│   │   ├── 129:2612 p "총 24개" 16M black -0.16px
│   │   ├── 129:2613 (divider line) flex-1 h=0 — inset -0.75 img vector8
│   │   └── 129:2614 (hatch bar) 36×8 — img frame2043685981
│   └── 129:2621 flex-col items-start w-full  (8 list items)
│       ├── 129:2622 ListItem A (border-b gray-300, py-6 gap-5)
│       │   ├── content flex-1 flex-col gap-3
│       │   │   ├── 129:2624 text block (title + summary) gap-2
│       │   │   │   ├── 129:2625 h3 Pretendard Bold 20 -0.4px line-1.4 color gray-900
│       │   │   │   └── 129:2626 p Pretendard Regular 15 -0.1125px line-1.5 color gray-700 overflow-hidden ellipsis
│       │   │   └── 129:2627 Paragraph gap-2 items-center
│       │   │       ├── 129:2628 span 13R gray-500 (source)
│       │   │       ├── 129:2629 size-3 img ellipse5 (dot)
│       │   │       └── 129:2630 span 13R gray-500 (date)
│       │   └── 129:2631 thumb 140×100 rounded-16 — bg #d9d9d9 + img rectangle17 cover
│       ├── 129:2632 ListItem B (rectangle18)
│       ├── 129:2642 ListItem C
│       ├── 129:2652 ListItem D (title w-full)
│       ├── 129:2662 ListItem E (title w-full)
│       ├── 129:2672 ListItem F (title w-full)
│       ├── 129:2682 ListItem G (title w-full)
│       └── 129:2692 ListItem H (title w-full)
└── 129:2702 Pagination flex gap-2 items-center
    ├── 129:2703 button rounded-lg size-6 — chevron-double-left 16×16 (imgVector)
    ├── 129:2704 button rounded-lg size-6 — chevron-left 16×16 (imgVector1)
    ├── 129:2705 flex gap-1 items-center  (10 page numbers)
    │   ├── 129:2706 size-6 rounded-lg bg-gray-100 — p "1" 14M gray-900 center
    │   ├── 129:2707 size-6 rounded-lg — p "2" 14M gray-400
    │   ├── ... (3~10 동일 inactive 패턴)
    │   └── 129:2715 p "10" 14M gray-400
    ├── 129:2716 button rounded-lg size-6 — chevron-right 16×16 (imgVector2)
    └── 129:2717 button rounded-lg size-6 — chevron-double-right 16×16 (imgVector3)
```

**핵심 관찰**:
- Pagination이 research/news.md에서 "13 page paginate"로 기술됐으나 design_context 실제로는 **10개** 페이지 + 좌 double + 좌 single + 우 single + 우 double = **총 14개 버튼**. research가 잘못 셌음 → 실제 10으로 교정
- 리스트 아이템 첫 2개(A, B)는 썸네일이 서로 다른 imgRef (rectangle17, rectangle18). 3~8번은 모두 rectangle17 재사용
- ListItem A: 제목 `whitespace-nowrap` (1행)
- ListItem B: 제목 `whitespace-nowrap` + 요약 `whitespace-pre-wrap` (줄바꿈 포함)
- ListItem C: 제목 `w-[424px]` (2줄? Figma 기준 실제 1행+잘림)
- ListItem D~H: 제목 `w-full` + 요약 `w-full`
- 아이템별로 폭 설정이 조금씩 다르지만 **시각적으로 모두 동일한 2행 max 타이틀 + 3행 max 요약** 패턴 → 공용 컴포넌트 1개로 처리 가능

## 2. 디자인 토큰 (get_variable_defs)

| 변수 | 값 | 사용처 |
|---|---|---|
| `Gray Scale/Gray 900 (Dark BG, Text)` | `#1d2623` | title, active page text |
| `Gray Scale/Gray 700` | `#5d6a66` | summary |
| `Gray Scale/Gray 500` | `#97a29e` | source, date |
| `Gray Scale/Gray 400` | `#afb8b5` | inactive page text |
| `Gray Scale/Gray 300` | `#c6cdcc` | border-b list item |
| `Gray Scale/Gray 100 (Light BG)` | `#eff0f0` | active page bg |
| `Text-xl/20B` | Pretendard 700 20 1.4 -2 | list title |
| `Text-md/15R` | Pretendard 400 15 1.5 -0.75 | list summary |
| `Text-base/16M` | Pretendard 500 16 1.5 -1 | "총 N개" |
| `Text-xs/13R` | Pretendard 400 13 1.5 0 | source, date |
| `text-sm/14M` | Pretendard 500 14 1.5 0 | pagination numbers |
| `spacing/2` | 8 | gap |
| `spacing/3` | 12 | gap (list item content) |
| `spacing/5` | 20 | gap (list item) |
| `spacing/6` | 24 | padding-y (list item) |
| `spacing/4` | 16 | gap (section) |
| `border-radius/lg` | 8 | pagination button rounded |

**raw color/magic**:
- thumb placeholder bg `#d9d9d9` (Figma raw)
- thumb size 140×100
- thumb border-radius 16
- title letter-spacing -0.4px (Figma `-2`는 %, 20px×-2% = -0.4px)
- summary letter-spacing -0.1125px (15×-0.75% = -0.1125)
- title "총 24개" letter-spacing -0.16px (16×-1% = -0.16)

## 3. 에셋 목록

| # | 노드 | 설명 | 파일 | 동적? | 액션 |
|---|---|---|---|---|---|
| 1 | 129:2613 / imgVector8 | divider 실선 (list header) | divider-line.svg | No | **news-featured 재사용** |
| 2 | 129:2614 / imgFrame2043685981 | hatch bar 36×8 | hatch-bar.svg | No | **news-featured 재사용** |
| 3 | 129:2629 / imgEllipse5 | 3px dot 구분자 | dot.svg | No | **news-featured 재사용** |
| 4 | 129:2631 / imgRectangle17 | 리스트 썸네일 A (재사용×6) | thumb.jpg | No | **news-featured 재사용** (동일 imgRef) |
| 5 | 129:2641 / imgRectangle18 | 리스트 썸네일 B (아이템 B) | thumb-b.jpg | No | **신규 다운로드 필요** |
| 6 | I129:2703;31:4620 / imgVector | chevron-double-left 16 | chevron-double-left.svg | No | 신규 다운로드 |
| 7 | I129:2704;31:4618 / imgVector1 | chevron-left 16 | chevron-left.svg | No | **news-featured 재사용** (같은 모양 다른 스케일) |
| 8 | I129:2716;31:4608 / imgVector2 | chevron-right 16 | chevron-right.svg | No | **news-featured 재사용** |
| 9 | I129:2717;31:4613 / imgVector3 | chevron-double-right 16 | chevron-double-right.svg | No | 신규 다운로드 |

**신규 다운로드할 에셋: 3개** (thumb-b, chevron-double-left, chevron-double-right).
**재사용할 에셋: 6개** (news-featured에서 모두 확보).

**캔버스-에셋 개수 검증**:
- 캔버스 고유 리소스: 9개 (divider + hatch + dot + thumbA + thumbB + chevron-left + chevron-right + chevron-dbl-left + chevron-dbl-right)
- 계획 파일 수: 9개 일치 (3 신규 + 6 재사용)

## 4. 정적 에셋 확인

- GIF/MP4/WebM: 없음
- SVG/PNG/JPEG: 정적
- 모든 에셋 `Framelink download_figma_images` 1회 호출로 처리 가능 (pngScale=1)

## 5. 구조 분석 & 공통 컴포넌트 판단

### NewsListItem 로컬화 vs 공통화
- 사용처: news-list 내부에서 8회 반복. 다른 페이지에서는 재사용 없음
- main-news 섹션의 NewsCard는 세로 레이아웃 (이미지 상단, 텍스트 하단) — 구조 상이
- news-featured의 NewsFeaturedCard도 세로 레이아웃 — 구조 상이
- **결론: NewsListSection 내부에 로컬 `NewsListItem.tsx`로 생성**. 아직 Rule of Three 미충족

### Pagination 로컬화 vs 공통화
- 사용처: news-list 1곳만 현재 확정. news/:id 상세 페이지나 gallery에서 향후 등장 가능성은 있으나 현 시점 1회 사용
- **결론: NewsListSection 내부에 로컬 `Pagination.tsx`로 생성**. 추후 2번째 등장 시 `src/components/ui/`로 승격

### HatchedBar 재사용 검토
- news-featured에서 `HatchedBar`로 이미 구현됨. 구조: 좌 해치 36×8 + 중앙 실선 flex-1 + 우 해치 36×8
- news-list의 header는 "총 N개" + 실선 + 우측 해치 **1개만** (좌 해치 없음)
- **결론: HatchedBar 그대로 재사용 불가.** 새로운 `ListHeader.tsx` 로컬 컴포넌트 필요 (총N + divider + 우 해치)

## 6. Floating / 정렬 분석

- 섹션은 x=492부터 시작 = 일반 width 936 컨테이너 범위 내. floating/중앙정렬 요소 **없음**
- `--clip-x 492 --clip-y 0 --clip-w 936 --clip-h 1416` 예상 (섹션 단독)
- transform/rotation: **없음**
- mix-blend-mode: **없음**

## 7. Baseline PNG 실측

- Framelink로 다운로드한 `figma-screenshots/news-list.png`: **937×1416** (Figma spec 936×1416 대비 +1px 폭 — 렌더 경계)
- baked-in 여부: **정상 분리 합성** (텍스트 rastering 없음, 각 요소 별도 레이어. 위 육안 확인)
- 특이: 4번째~8번째 아이템 썸네일이 모두 동일 (rectangle17) — 섹션 3의 thumb.jpg 재사용으로 해결

## 8. 리스크 메모

1. **v1~v3 G1 20.37% ACCEPTED** — 이전 버전은 composite raster 가능성 또는 레이아웃 오류. 이번엔 완전 HTML 재구성 + baked-in PNG 금지로 대응
2. **Pagination 페이지 수 불일치**: research/news.md "13개" vs design_context "10개". design_context 우선 — **10개**로 구현. 좌 double + 좌 single + 1·2·…·10 + 우 single + 우 double = 14 버튼
3. **각 ListItem 타이틀/요약 폭 설정이 조금씩 다름** (w-full / w-[424px] / whitespace-nowrap). design_context의 variant는 따르지 않고 **공용 레이아웃 1개**로 통일 (실제 시각 결과는 동일: 타이틀 1~2줄, 요약 3줄 max clamp). baseline diff 발생 시 단계 6에서 개별화 검토
4. **summary text baked-in 위험**: Figma overflow-hidden + text-ellipsis로 잘린 텍스트가 baseline에 있음. React에서는 CSS `line-clamp-3`로 동일 처리 (text rastering 아님)
5. **thumbnail 2종 다운로드 필요**: 아이템 B만 다른 이미지. Figma imgRef rectangle18은 여성 포트레이트 → 새 파일 `thumb-b.jpg` 다운로드
6. **chevron double SVG 신규**: 기존 chevron single과 스케일 다를 수 있음 — 16×16 ViewBox로 별도 다운
7. **pagination active bg `#eff0f0`** — Gray Scale/Gray 100 토큰 매칭. 별도 hard-code 없음

## 9. 단계 1 통과 체크리스트

- [x] baseline PNG 저장 (`figma-screenshots/news-list.png` 937×1416)
- [x] design_context fetch 완료 (토큰 6500 이내)
- [x] variable_defs fetch 완료
- [x] 에셋 목록 9개 + 동적 여부 표시 (모두 정적)
- [x] 캔버스-에셋 개수 일치 검증 (9 고유 리소스 = 계획 9 파일)
- [x] transform/rotation 없음 확인
- [x] baked-in 없음 육안 확인
- [x] 공통 컴포넌트 판단 (NewsListItem + Pagination + ListHeader 모두 로컬)

## 다음 단계 (단계 2: plan 작성)
