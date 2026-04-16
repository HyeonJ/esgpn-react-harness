# plan/main-news.md

메인페이지 News 섹션 구현 계획 (research/main-news.md 기반)

---

## 1. 컴포넌트 구조

```
src/components/sections/MainNews/
├── MainNews.tsx              # 섹션 루트 (bg-#f3f3f3 + 배경 장식 3 + 콘텐츠 2열)
├── NewsHeading.tsx           # 좌측 헤딩 블록 (eyebrow + title + body)
├── NewsList.tsx              # 우측 뉴스 리스트 (페이지 컨트롤 + 카드 5개)
├── NewsCard.tsx              # 카드 1개 (타이틀/본문/출처/날짜/썸네일)  ← 로컬
├── NewsPager.tsx             # "총 N개" + "1/4" + 좌/우 화살표
└── data.ts                   # 5개 뉴스 데이터 배열 + 상수 (총 개수, 현재 페이지)
```

**NewsCard Rule of Three 평가:**
- 현재 1개 섹션에서 5회 사용 → 이미 반복 존재 (Rule of Three 충족)
- 그러나 **별도 페이지(`/news`)에서 레이아웃이 다를 가능성** (카드가 그리드로 12개 이상 나열될 수 있음). 현 시점 공통화하면 props 설계가 main 기준으로 고정돼 `/news` 페이지 요구사항 충돌 위험
- **결정: 본 섹션에서는 `MainNews/NewsCard.tsx` 로컬 유지**. `/news` 페이지 구현 시점에 구조 동일하면 `src/components/ui/NewsCard.tsx` 로 승격 평가
- docs/figma-project-context.md §5 공통 카탈로그에 "NewsCard 승격 후보" 메모만 추가

## 2. props 시그니처

```ts
// data.ts
export interface NewsItem {
  id: string;           // node ID
  title: string;
  body: string;         // 본문 (overflow ellipsis)
  source: string;       // 매체명
  date: string;         // "2026-01-19"
  thumbnailSrc: string; // /src/assets/main-news/... import 결과
}

export const NEWS_ITEMS: NewsItem[];  // 길이 5
export const TOTAL_COUNT = 24;
export const CURRENT_PAGE = 1;
export const TOTAL_PAGES = 4;
```

```ts
// NewsCard.tsx
interface NewsCardProps {
  item: NewsItem;
  isLast?: boolean;  // 마지막 카드는 border-b 생략 여부 (Figma는 모든 카드 border-b 있음 → unused, 하지만 확장 대비)
}
```

## 3. Tailwind 전략

- **외곽**: `bg-[#f3f3f3] relative overflow-hidden w-full h-[1040px] py-[120px] px-[252px] flex flex-col items-start justify-center`
- **배경 장식**: `absolute inset-0 pointer-events-none` wrapper 3개, 각각 `overflow-hidden` + `img absolute` + `left-[X%] top-[Y%] w-[Z%] h-[W%]` (music-level arbitrary, Figma % 보존)
- **콘텐츠 Row**: `flex items-start justify-between w-full flex-1` (760px 높이로 수직 분할)
- **헤딩 좌측**: `w-[576px] flex flex-col gap-[24px] items-start justify-center py-[24px]`
- **리스트 우측**: `w-[748px] h-full flex flex-col gap-[8px] items-start justify-center py-[24px]`
- **카드**: `w-full flex items-center gap-[20px] py-[24px] border-b border-[#c6cdcc]`
- **카드 좌측 flex-1 col gap-[12px]**, **카드 우측 `w-[140px] h-[100px] rounded-[16px] overflow-hidden`** (img object-cover)
- **화살표 wrapper**: Figma 구조 준수 — outer `size-[24px] relative` + inner `absolute inset-[...]` + `-rotate-90` / `rotate-90` flex center → inner img `size-full`

모든 수치 (폭, 패딩, gap, 폰트, tracking, border-radius) Figma 원본값 그대로. 반올림 없음.

## 4. 에셋 다운로드 계획

**스크립트**: `scripts/download-assets.sh` 활용 (기존 패턴).

다운로드 URL (7일 만료, design_context 반환):

| filename | URL const | 포맷 |
|----------|-----------|------|
| `bg-plant-left.png` | `imgFrame2043685959` | PNG |
| `bg-plant-right.png` | `imgFrame2043685960` | PNG (2곳 재사용) |
| `thumb-a.png` | `imgRectangle17` | PNG |
| `thumb-b.png` | `imgRectangle18` | PNG |
| `arrow-left.svg` | `imgIconStroke` | SVG |
| `arrow-right.svg` | `imgIconStroke1` | SVG |
| `dot.svg` | `imgEllipse5` | SVG/PNG (3×3) |

→ `src/assets/main-news/raw/` → verify → rename 시 실제 확장자 확인 (PNG/SVG 혼재 가능) → `src/assets/main-news/`로 이동.

**고유 파일 7개 (배경 2 + 썸네일 2 + 화살표 2 + dot 1).** 동적 에셋 없음.

## 5. `/__preview/main-news` 격리 라우트

`src/preview/MainNewsPreview.tsx`:
```tsx
export default function MainNewsPreview() {
  return (
    <div className="bg-white">   {/* §6.1: 외곽 wrapper는 반드시 bg-white */}
      <MainNews />                {/* 섹션 내부에서 bg-[#f3f3f3] 자체 적용 */}
    </div>
  );
}
```

`src/App.tsx` 또는 라우터에 `/__preview/main-news` 경로 추가 (기존 MainStats / MainProgramsCard 패턴 참조).

## 6. 측정 전략

- **풀폭 1920**: `bash scripts/compare-section.sh main-news` — clip 불필요
- **측정 스크립트**: `tests/visual/measure-main-news.ts`
  - `page.evaluate` 순수 JS (TS 주석 금지, 누적 규칙)
  - 측정 대상:
    - 헤딩 폰트 48px/line-height 56px (G2)
    - 카드 타이틀 20px / tracking -0.4px (G2)
    - 카드 썸네일 140×100 / rounded 16px (G2)
    - 5개 카드 naturalWidth > 0 (G3)
    - 배경 장식 3 img naturalWidth > 0 (G3)
    - 배경 hex `#f3f3f3` (G4)
    - 카드 border `#c6cdcc` (G4)
    - 본문 색 `#1d2623` / `#5d6a66` / `#97a29e` (G4)

## 7. 4 게이트 예상 결과

| 게이트 | 예상 | 비고 |
|--------|------|------|
| G1 시각 | diff 2~3% | 텍스트 안티앨리어싱 + 배경 PNG alpha 경계 |
| G2 치수 | PASS | Figma 수치 직접 arbitrary 적용 |
| G3 에셋 | PASS | 7 파일 모두 static PNG/SVG. naturalWidth>0 |
| G4 색상 | PASS | hex 직접 사용 |

**위험 요소**:
- 배경 장식 음수 width (`w-[-51.57%]`, `w-[-29.61%]`) 브라우저 렌더링이 Figma와 다를 경우 → 발생 시 overflow-hidden wrapper 내 `object-fit: contain` 또는 absolute positioning으로 대체 고려 (단계 6에서 판단)
- 5개 카드 썸네일 일부만 두 종류 — 이미 개별 import 매핑이라 이슈 없음

## 8. 공통 컴포넌트 승격 메모

**NewsCard** — 본 섹션 구현 후 뉴스 목록 페이지(`/news`, node `129:1756`) 작업 시:
1. `/news` 카드가 본 섹션 카드와 구조 동일한지 리서치
2. 동일하면 `MainNews/NewsCard.tsx` → `src/components/ui/NewsCard.tsx`로 이동
3. variant prop 추가 (썸네일 크기 변동 가능)
4. 본 섹션은 common 컴포넌트 사용하도록 리팩토링 PR 별도 진행

## 9. 작업 체크리스트 (단계 3~7)

- [ ] 단계 3: 7 에셋 다운로드 & 검증
- [ ] 단계 4: MainNews/*.tsx 구현 + preview 라우트
- [ ] 단계 4: 빌드/린트/타입체크 통과
- [ ] 단계 5: `compare-section.sh main-news` + measure 스크립트
- [ ] 단계 5: 4 게이트 측정값 기록
- [ ] 단계 5: baseline/capture/diff 3종 Read 육안 검증
- [ ] 단계 6: 3회 이내 수정 (필요 시)
- [ ] 단계 7: 커밋 + PROGRESS.md 갱신

## 10. 사용자 승인 체크포인트

- 본 plan 검토 → [A] 승인 / [B] 메모 후 재작성 / [C] 중단
- 승인 시 단계 3(에셋 수집) 진입

---

## 11. 측정 섹션 (v4 재구현)

### G5 시맨틱 HTML: PASS (eslint 0 errors)
### G6 텍스트:이미지 비율: PASS (ratio 8.50)
### G8 i18n: PASS

### 구조 지표
- token_ratio: 0.296 (>= 0.2 threshold -- PASS)
- absolute/file: 12/6 = 2.0 (<= 5 -- PASS)
- semantic_score: 6 (>= 2 -- PASS)
- magic_numbers: 76

### 자동 가드
- tailwind antipatterns: PASS
- baked-in PNG: PASS

### G2 치수 정확도

| 대상 | 측정 | Figma | 결과 |
|------|------|-------|------|
| Heading h2 fontSize | 48px | 48px | PASS |
| Heading h2 fontWeight | 700 | 700 | PASS |
| Heading h2 lineHeight | 56px | 56px | PASS |
| Eyebrow fontSize | 14px | 14px | PASS |
| Card title fontSize | 20px | 20px | PASS |
| Card title fontWeight | 700 | 700 | PASS |
| Arrow size | 24x24 | 24x24 | PASS |
| Thumbnail container | 140x100 | 140x100 | PASS |

**G2: PASS**

### G3 에셋 무결성

15 img 중 15 PASS (naturalWidth>0):
- bg-plant-left.png 1198
- bg-plant-right.png 1189 (2곳 재사용)
- thumb-a.png 1080 (4곳)
- thumb-b.png 164 (1곳)
- dot.svg / arrow-left.svg / arrow-right.svg (inlined SVG data URL)

**G3: PASS**

### G4 색상 정확도

| 대상 | 측정 | Figma hex | 결과 |
|------|------|-----------|------|
| Eyebrow | rgb(151,162,158) | #97a29e | PASS |
| Heading h2 | rgb(29,38,35) | #1d2623 | PASS |
| Card title | rgb(29,38,35) | #1d2623 | PASS |
| Card body | rgb(93,106,102) | #5d6a66 | PASS |
| Card border-bottom | rgb(198,205,204) | #c6cdcc | PASS |
| Source text | rgb(151,162,158) | #97a29e | PASS |

**G4: PASS**

### G1 시각 diff (참고 지표)
- Framelink MCP 미등록으로 baseline PNG 없음
- 육안 비교 (Figma inline screenshot vs Playwright capture): 구조/레이아웃/색상 일치
- 이전 세션 측정 참고: 4.60%

### 육안 semantic 검증

- 좌측 헤딩 2줄 레이아웃 ("지속 가능한 내일을 설계하는\nESGPN 뉴스룸") OK
- 5 뉴스 카드 동일 구조 (h3 title / p body clamp-2 / span source + time date / thumbnail) OK
- 페이지네이션 화살표 좌/우 방향 (-90/+90) OK
- 배경 plant 장식 3개 위치 크기 OK (좌하단 큰 이미지 + 우측 식물)
- BG #f3f3f3 연속성 OK
- 텍스트 줄바꿈 (본문 2줄 clamp) OK
- SVG flip, 요소 swap, 색 반전 없음

**육안: PASS**

### v4 구조 개선 (v1~v3 대비)
- v1~v3: magic 77, absolute 15, token_ratio 0 -- 만성염증
- v4: magic 76, absolute 12 (abs/file=2.0), token_ratio 0.296 -- 차단 게이트 전부 PASS
- 시맨틱 HTML: section > header > h2 + article > h3 + time
- 디자인 토큰: var(--color-gray-*), var(--spacing-*) 적극 사용
- absolute는 배경 장식 이미지 3개 + 기능적 wrapper만 (카드 내부 0개)
