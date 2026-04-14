# research/about-organization-tabs.md — About 조직도 페이지 탭 섹션

> Phase 3 단계 1. 페이지 `/about/organization` 첫 섹션.
> 상위 page research: `research/about-organization.md`. 전략 **[A] 완전 HTML 재구성** (flatten PNG).
> 공통 규칙: `CLAUDE.md` / `docs/section-implementation.md` §2.4 / §2.5 / §2.6 / §6.1 / §6.4.

## 1. Figma 노드 재조사

`research/about-organization.md` §1에서 확정된 대로 `89:1295`는 flatten 단일 이미지, 하위 노드 없음. 이 섹션의 Figma 스펙은 **baseline PNG crop + 육안 + 픽셀 측정**으로 확보한다. design_context·variable_defs 호출 의미 없음.

본 섹션의 **컨텐츠**는 `/about` 페이지 `about-header` 섹션의 탭과 동일 레이아웃 (SectionTabs 재사용 — Rule of Three 2/3, active 상태만 다름).

## 2. 베이스라인 crop + 행 스캔 실측

### 2.1 source / target
- source: `figma-screenshots/about-organization-full.png` (1920×2019, 8-bit RGBA)
- target: `figma-screenshots/about-organization-tabs.png` — **1920×102, 8-bit RGBA** (생성 완료, 3,870 bytes)
- crop box: `(0, 88, 1920, 190)` — height 102px (tabs 텍스트 + underline + 상하 여백 일부 포함)

### 2.2 행 스캔 결과 (full.png y축)

```
y=60~71    Top Nav 잔여 (무시, y=88에서 섹션 시작)
y=88~166   공백 (섹션 내 top padding, 78px)
y=167      탭 글리프 시작 (1 픽셀, dot 부분)
y=168~179  탭 텍스트 row (h=12)
           x 범위 846~1072 (탭 클러스터)
y=180      descender 1 px
y=181~187  공백
y=188~189  active underline (solid, x=829~1090, w=261, h=2)
y=190~273  공백 (→ 다음 섹션 logos 상단 padding으로 귀속)
y=274~     logos 섹션 HatchedDivider "운영조직" 시작
```

### 2.3 섹션 경계 확정
- **y-start = 88** (Top Nav 끝, `research/about-organization.md` §1 기준)
- **y-end = 190** (active underline 하단 포함)
- **height = 102px**
- baseline 파일 실측 `file` 결과: 1920×102 ✓

> research/about-organization.md §2 테이블의 "(0, 88, 1920, 100)" 추정치와 거의 일치 (+2px, underline 포함 여부 차이). 섹션 분할 변경 없음.

## 3. 시각 요소 상세 (육안 판독 + 픽셀 측정)

baseline `figma-screenshots/about-organization-tabs.png` Read 도구로 판독. **about-header 섹션 탭과 완전히 동일 스타일, active 탭만 "개요 & 철학" → "조직도"로 이동.**

### 3.1 탭 3개 스펙

| # | 라벨 | 상태 | x 범위 (full canvas) | w | 폰트/weight 추정 | 색상 hex 추정 |
|---|------|------|---------------------|---|------------------|--------------|
| 1 | 개요 & 철학 | inactive | ≈ 829~924 영역 | ~60 | Pretendard Medium 14px | Gray 500 `#97a29e` |
| 2 | 조직도 | **active** | ≈ 953~976 영역 | ~24 | Pretendard Bold 14px | Gray 900 `#1d2623` |
| 3 | 운영계획 | inactive | ≈ 1028~1072 영역 | ~45 | Pretendard Medium 14px | Gray 500 `#97a29e` |

### 3.2 active underline
- y=188~189 (h=2)
- x=829~1090 (w=261) — **주의: 탭 3개 전체를 가로지르는 것이 아니라 "조직도" 탭만 덮는 짧은 underline이어야 함**. 행 스캔에서 x=829~1090이 나온 건 이 row에 탭 3개 하단 선이 아니라 **조직도 탭 밑줄 + 인접 탭 내려오는 글리프 잔여**일 가능성. 단계 2에서 baseline을 육안으로 재확인 후 underline 범위 확정.
  - 가능성 A: "조직도" 라벨 폭 정확히 덮는 짧은 underline (예 x=953~976, w=24 + padding)
  - 가능성 B: about-header에서는 "개요 & 철학" 밑줄이었고 라벨 폭 60 + padding으로 ~96px 폭이었음 (plan/about-header.md §1.3). 이번은 "조직도" 밑줄이면 폭이 더 짧아야 함 (~40~50)
  - 현 SectionTabs 구현(`textDecoration: "underline"`)은 **라벨 텍스트 폭 자동 맞춤** — 이 동작이 baseline과 일치하면 OK. 단계 5 측정에서 확인
- 결론: SectionTabs 현 구현이 이미 text-decoration underline을 사용 → active 탭 라벨 글자 폭에 자동 맞춤됨. 재확장 불필요.

### 3.3 canvas-asset 개수 일치 검증
- Canvas 에셋 = 0 (텍스트 전용)
- 다운로드 대상 = 0
- **일치 (0 = 0).**

## 4. 현 SectionTabs 컴포넌트 현황 (확장 필요 여부)

### 4.1 현 시그니처 (`src/components/ui/SectionTabs.tsx` 실측)

```ts
export type SectionTabItem = {
  label: string;
  href: string;
  active?: boolean;
};

export interface SectionTabsProps {
  tabs: SectionTabItem[];
  className?: string;
}
```

구현 상세:
- `react-router-dom`의 `<Link to={href}>` 사용 → **이미 라우팅 지원**
- active 상태: `font-weight 700` + `color --color-gray-900` + `textDecoration: underline` + `textUnderlineOffset: 6px` + `textDecorationThickness: 2px`
- inactive 상태: `font-weight 500` + `color --color-gray-500`
- 탭 간 gap: `52px` (style inline)
- 정렬: `flex items-center justify-center`

### 4.2 확장 필요 여부: **불필요**

본 섹션(`about-organization-tabs`) 요구사항:
- 탭 3개 렌더 ✓ (props)
- active="조직도" ✓ (active prop)
- 링크 라우팅 ✓ (href via `<Link>`)
  - 개요 & 철학 → `/about`
  - 조직도 → `/about/organization`
  - 운영계획 → `/about/operation` 또는 `#` 폴백 (routing에 존재하지 않음)

> `plan/about-header.md` §1.2에서 운영계획 href를 `/about/operation`으로 설정 → 본 섹션도 동일 href 유지하여 **일관성 확보.** `/about/operation`은 현재 라우트에 없지만 `<Link>`는 404로 이동하므로 폴백 동작 자연스러움. `#` 사용 금지(페이지 점프 부작용).

**결론: SectionTabs 수정 없이 그대로 소비. about-header G1(3.40%) regression 0% 위험.**

## 5. 추출 텍스트 (육안 판독)

```
탭 3개 (중앙정렬):
  [개요 & 철학]  [조직도]  [운영계획]
  (회색)         (active,  (회색)
                 밑줄)
```

- 특수문자 `&`는 ASCII ampersand (about-header와 동일)
- 공백: "개요 & 철학" (ampersand 양쪽 공백), "조직도", "운영계획"

## 6. 디자인 토큰 매핑 (기존 재사용)

- active tab color: `--color-gray-900` (`#1d2623`) — plan/about-header.md §7 G4 실측 확정
- inactive tab color: `--color-gray-500` (`#97a29e`) — 동일
- font-size 14px / line-height 20px / letter-spacing 0 — SectionTabs 내장
- font-family: Pretendard Variable — SectionTabs 내장

신규 토큰 **없음**. §2.4 정밀 수치 규칙: SectionTabs 내부 수치는 이미 소수점 없는 정수(14/20/52/6/2)라 반올림 이슈 없음.

## 7. clip 파라미터 (단계 5 G1 측정용)

floating/중앙정렬 요소(탭 클러스터)가 풀폭 섹션 안에 존재하나, preview 라우트를 1920×102 전체로 렌더하면 baseline과 풀폭 비교 가능 → `scripts/compare-section.sh about-organization-tabs` 기본 호출로 충분. `--clip-*` **불필요**.

## 8. 리스크 (이 섹션 고유)

1. **Underline 폭 차이:** baseline underline x=829~1090(w=261)이 단일 탭을 넘어 넓다면 SectionTabs의 `textDecoration: underline` (라벨 텍스트 폭에만 적용) 동작과 어긋날 수 있음. 단계 5에서 G1 diff가 underline 영역에서 크게 나올 경우 확대된 underline 대응 필요. 가능성은 낮음(about-header에서 동일 구현으로 3.40% 달성).
2. **SectionTabs 공유 수정 금지 사수:** 이 섹션에서 불가피하게 SectionTabs 수정해야 하면 **backward-compatible + optional prop**으로만 확장. about-header regression 검증도 필요.
3. **섹션 높이 102px:** about-header 탭 영역보다 작음 (about-header는 454px 섹션에 탭 포함, 이 섹션은 tabs-only). preview 라우트 bg-white wrapper 높이 102px로 맞춤.
4. **G1 기대치:** about-header 탭 부분만 분리 측정하면 더 낮은 diff(텍스트만) 가능. serif antialias 없음 → **목표 < 3%** 가능. 3~4%면 통과.

## 9. 단계 1 산출 파일

- `figma-screenshots/about-organization-tabs.png` (1920×102, baseline, 3,870 bytes)
- 본 파일 `research/about-organization-tabs.md`

---

## 멈춤 지점

단계 1 완료. 단계 2 plan 작성으로 이어짐.
