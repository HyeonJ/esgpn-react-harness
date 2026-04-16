# research/news-tabs.md — `/news` 섹션 탭

> 기반: Figma node `129:2196`, 936×29. Parent `/news` page node `129:1756` (1920×3257).
> baseline: `figma-screenshots/news-tabs.png` (936×30, PNG 1.5KB).

## 1. 노드 구조 (from `get_design_context` 129:2196)

```
Frame 129:2196 (936×29, gap=8, center)
├─ Tab[active] 129:2199 — border-b-1.5 gray-900, px=16 py=4
│  └─ <p> 129:2200 — "뉴스", Pretendard Medium 14, gray-900, tracking -0.07 (실제 Figma: Text-sm/14M letterSpacing -0.5 per token; design_context -0.07 은 MCP 계산치. 토큰 우선)
└─ Tab[inactive] 129:2201 — border-b-1.5 gray-200, px=16 py=4
   └─ <p> 129:2202 — "자료실", Pretendard Medium 14, gray-400
```

캔버스 좌표 (부모 `/news` 1920×3257 기준):
- 섹션: (492, 140) 936×29
- clip 파라미터 (compare-section.sh 풀폭 1920×30 쓰면 되므로 불필요)

## 2. baseline 실측

- 파일: 936×30 (Figma 29 + 반올림 1px)
- 2개 탭 중앙 정렬, 탭 간 8px gap
- 첫 탭 "뉴스" bold 느낌 (실제는 Medium 500 + gray-900 dark color — 굵게 보임)
- 둘째 탭 "자료실" medium + gray-400 → 흐릿하게 보임
- 각 탭 아래 1.5px underline (active: gray-900, inactive: gray-200)

## 3. 기존 `SectionTabs` 재사용 불가

| 항목 | 기존 SectionTabs (about-organization-tabs에 사용) | news-tabs |
|------|--------------------------------------------------|-----------|
| 탭 사이 간격 | gap-52 (52px) | gap-8 (8px) |
| Active 표시 | 글자 밑에 `underline underline-offset-9 decoration-2 decoration-gray-900` (글자 폭만) | 탭 wrapper `border-b-[1.5px] border-gray-900` (wrapper 폭 전체) |
| Inactive 표시 | 없음 (gray-500 medium 색만) | 탭 wrapper `border-b-[1.5px] border-gray-200` (흐릿한 underline 존재) |
| 탭 wrapper padding | 없음 | px=16 py=4 |
| Active weight | Bold (14SB font-weight 600) | Medium (14M 500) |
| Active color | gray-900 | gray-900 |
| Inactive color | gray-500 | gray-400 |

**구조 자체가 다르다.** about 탭은 "글자 밑줄" 패턴, news 탭은 "Pill border-bottom" 패턴. 기존 SectionTabs 확장 시 prop 2+ 추가 + 분기 필요 → about regression 리스크. **섹션 전용 로컬 컴포넌트 또는 새 공통 컴포넌트**로 진행.

## 4. 에셋 목록

| # | 파일 | Figma 노드 | 사이즈 | 포맷 | 동적? | 비고 |
|---|------|-----------|--------|------|-------|------|
| — | (없음) | — | — | — | — | 텍스트 전용 섹션 |

canvas 에셋 개수 = 0, 다운로드 대상 = 0. **일치 (0=0) ✓**

## 5. 디자인 토큰 매핑

| 속성 | Figma | 토큰 (tokens.css) | Tailwind 표현 |
|------|-------|-------------------|---------------|
| 컨테이너 gap | 8px | `--spacing-2` | `gap-2` |
| 탭 padding-x | 16px | `--spacing-4` | `px-4` |
| 탭 padding-y | 4px | `--spacing-1` | `py-1` |
| 탭 border-b | 1.5px | (없음, arbitrary) | `border-b-[1.5px]` |
| Active border/text | gray-900 `#1d2623` | `--color-gray-900` | `border-gray-900 text-gray-900` |
| Inactive border | gray-200 `#dbe1e0` | `--color-gray-200` | `border-gray-200` |
| Inactive text | gray-400 `#afb8b5` | `--color-gray-400` | `text-gray-400` |
| 폰트 | Pretendard Medium 14 / lh 1.5 / tracking -0.5 | `--text-sm-14m-*` | `text-[length:var(--text-sm-14m-size)] font-[number:var(--text-sm-14m-weight)] leading-[var(--text-sm-14m-line-height)] tracking-[var(--text-sm-14m-letter-spacing)]` |

**token_ratio 예상**: 최소 5 토큰 참조 vs magic 0~2 → **≥ 0.7** (목표 0.2 충족).

## 6. 리스크

1. **SectionTabs 네이밍 혼동** — about용은 `SectionTabs`. news용 새 컴포넌트는 **섹션 전용 로컬**(`NewsTabs.tsx` 내부)로 두고 공통 컴포넌트로 올리지 않는다. 3번째 유사 패턴이 나타나면 그때 Rule of Three 적용
2. **탭 폭 계산** — px=16 py=4 border-b 1.5 → 각 탭 wrapper 높이 = 4+21(14×1.5)+4+1.5 = 30.5. 섹션 총 높이 30px 일치
3. **active 탭이 Bold처럼 보임** — 실제 Medium 500이지만 gray-900(dark)이라 대비 때문. font-weight 600으로 올리면 오히려 Figma와 달라짐. Medium 유지
4. **placeholder 노출** — 탭 텍스트 "뉴스"/"자료실"만 → placeholder 리스크 없음

## 7. 단계 1 통과 조건

- [x] baseline PNG 저장됨 (REST API, figma-screenshots/news-tabs.png 936×30)
- [x] design_context fetch 완료 (129:2196)
- [x] 에셋 목록 작성 + 캔버스 일치 (0=0)
- [x] 리스크 요약

## 8. 다음 단계 (plan)

- 전략: **섹션 전용 로컬 컴포넌트** (`NewsTabs.tsx` 자체로 완결, 별도 ui/ 없음)
- `src/components/sections/NewsTabs/NewsTabs.tsx` + `index.ts`
- `src/routes/NewsTabsPreview.tsx`
- `App.tsx` preview 라우트 + `/news` 사용자 라우트 NewsTabs 삽입
