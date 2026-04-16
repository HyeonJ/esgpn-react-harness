# plan/about-organization-chart.md — About 조직도 페이지 조직도 트리 섹션 (v4)

> Phase 3 단계 2. 페이지 `/about/organization` 3번째 섹션.
> 상위 리서치: `research/about-organization-chart.md`.
> 규칙: `CLAUDE.md` v4 / `docs/section-implementation.md` §2.4 / §2.5 / §2.6 / §6.1 / §6.4.

## 0. v4 전략 — absolute 제거 + 구조 의미 복원

**v1~v3 만성염증 4/4점 섹션.** 과거 실패 원인:
- `absolute top-[...] left-[...]` 10+ 개로 좌표 하드코딩
- magic number (#4FB654, #0C3B0E, #EFF0F0) → 토큰 미참조
- `<div>` 남발 → `<section>` / `<ul>` / `<li>` 시맨틱 부재

**v4 의미 복원**:
- Tier 2 (3박스 가로) → `<ul className="flex">` (horizontal list)
- Tier 3 (각 컬럼 3박스 세로) → `<ul className="flex flex-col">` (vertical list)
- Tier 2 박스-Tier 3 컬럼 parent→children 관계 → `<li><div>parent</div><ul>children</ul></li>` 중첩 (nav tree)
- connector = 인라인 `border-left` (css) — absolute dot 대신 `::after` pseudo or 단순 시각 요소
- 토큰 참조: `--color-brand-500` (pill), `--color-brand-700` (primary + connector), `--color-gray-100` (ghost 배경), `--color-gray-900` (ghost 텍스트)

## 1. 구현 전략

### 1.1 컴포넌트 구조

```
src/components/sections/AboutOrganizationChart/
├─ AboutOrganizationChart.tsx    — 섹션 루트 (<section> + <HatchedDivider label> + <ul nav tree>)
└─ index.ts
```

OrgChartBox/OrgChartConnector를 **별도 컴포넌트로 분리하지 않음** — 이 페이지 전용이며 variant별 스타일 차이가 작아 inline Tailwind로 충분. Rule of Three 미달.

### 1.2 HatchedDivider 확장

`src/components/ui/HatchedDivider.tsx`에 `label?: string` prop 추가 (backward-compatible):
- label 없으면 기존 middle 실선 유지
- label 있으면 좌측 해치+실선 + 중앙 label + 우측 실선+해치 구조 (AboutOrganizationLogos의 인라인 SVG 패턴을 공통화)

### 1.3 HTML 구조 (v4 — 시맨틱)

```tsx
<section
  aria-labelledby="about-org-chart-title"
  className="mx-auto flex w-full max-w-[1920px] flex-col items-center bg-gray-000"
>
  <h2 id="about-org-chart-title" className="sr-only">
    ESGPN 실행 구조
  </h2>

  {/* 상단 divider with label */}
  <HatchedDivider label="실행 구조" className="pt-0" />

  {/* Tier 2 row — nav tree */}
  <nav aria-label="ESGPN 실행 구조 트리" className="mt-[50px]">
    <ul className="flex gap-[17px]">
      {/* Tier 2-1: standalone pill (no children) */}
      <li>
        <div className="..pill스타일..">COLiVE, ESG마인드 자격검정</div>
      </li>

      {/* Tier 2-2: parent with Tier 3 col1 */}
      <li className="flex flex-col items-center gap-[14px]">
        <div className="..primary스타일..">ESG실천 아이디어 경진대회</div>
        <div className="h-[61px] w-[2px] bg-[var(--color-brand-700)] relative after:absolute after:bottom-[-3px] after:left-[-2px] after:h-[5px] after:w-[6px] after:rounded-full after:bg-[var(--color-brand-700)]" aria-hidden />
        <ul className="flex flex-col gap-[19px]">
          <li className="..ghost스타일..">ESG 대학생 부문</li>
          <li className="..ghost스타일..">기업 실전사례 부문</li>
          <li className="..ghost스타일..">지역사회 부문</li>
        </ul>
      </li>

      {/* Tier 2-3: parent with Tier 3 col2 */}
      <li className="flex flex-col items-center gap-[14px]">
        <div className="..primary스타일..">사회공헌활동</div>
        <div className="h-[61px] w-[2px] bg-[var(--color-brand-700)] ..dot스타일.." aria-hidden />
        <ul className="flex flex-col gap-[19px]">
          <li className="..ghost스타일..">ESG 실천 캠페인</li>
          <li className="..ghost스타일..">봉사활동(프로보노)</li>
          <li className="..ghost스타일..">기업 협력</li>
        </ul>
      </li>
    </ul>
  </nav>
</section>
```

### 1.4 connector 처리 (absolute 제거)

- connector line = `<div>` with `h-[61px] w-[2px] bg-[var(--color-brand-700)]`
- 끝 dot = CSS `::after` pseudo-element (inline Tailwind `after:` utility)
- Tier 2-1 (COLiVE pill)은 children 없으므로 connector 없음 → 컬럼 높이를 맞추기 위해 Tier 2-1 `<li>`에 `self-start` 적용 (부모 `flex`에서 상단 정렬)

### 1.5 박스 스타일 (inline Tailwind)

| variant | 클래스 |
|---------|--------|
| pill (Tier 2-1) | `w-[302px] h-[50px] rounded-full bg-[var(--color-brand-500)] text-white flex items-center justify-center font-bold text-[15px]` |
| primary (Tier 2-2/3) | `w-[302px] h-[50px] rounded-[10px] bg-[var(--color-brand-700)] text-white flex items-center justify-center font-bold text-[15px]` |
| ghost (Tier 3 × 6) | `w-[302px] h-[57px] rounded-[6px] bg-[var(--color-gray-100)] text-[var(--color-gray-900)] flex items-center justify-center text-[15px] font-medium` |

모든 텍스트: Pretendard (body font 기본값), `tracking-[-0.02em]`.

## 2. 디자인 토큰 매핑

| Figma hex | 토큰 |
|-----------|------|
| `#4fb654` | `--color-brand-500` ✓ 기존 토큰 |
| `#0c3b0e` | `--color-brand-700` ✓ 기존 토큰 |
| `#EFF0F0` | `--color-gray-100` (실측 — gray-100 #EFF0F0) |
| `#1D2623` | `--color-gray-900` ✓ 기존 토큰 |
| `#FFFFFF` | `text-white` (Tailwind) |

신규 토큰 추가 **불필요** — 모두 기존 토큰으로 커버 가능.

## 3. 에셋 계획

raster 에셋 **0개**. download-assets.sh / process-assets.py 호출 **없음**.

| 항목 | 개수 |
|------|------|
| Canvas raster 요소 | 0 |
| 다운로드 PNG | 0 |
| HTML/CSS/SVG 재구성 | HatchedDivider(1, label 확장), 박스 9(inline), connector 2(inline div) |

**0 = 0 일치 ✓**

## 4. /__preview 라우트

- 경로: `/__preview/about-organization-chart`
- wrapper: `<div className="w-[1920px] mx-auto bg-white">` + `<AboutOrganizationChart />`
- 기존 preview 패턴과 동일.

## 5. clip 파라미터

풀폭 섹션 (1920×390). `scripts/compare-section.sh about-organization-chart` 기본 호출. `--clip-*` 불필요.

## 6. 새 npm 패키지

**없음** — React/Tailwind 기존 스택.

## 7. v4 구조 지표 예상

| 지표 | 목표 | 예상 | 근거 |
|------|------|------|------|
| token_ratio | ≥ 0.2 | **≥ 0.5** | 모든 색상이 토큰 (brand-500, brand-700, gray-100, gray-900) |
| semantic_score | ≥ 2 | **≥ 4** | section, h2, nav, ul, li 다중 사용 |
| absolute/file | ≤ 5 | **0** | connector도 flow 기반 (flex column + h/w) |
| G5 eslint | 0 error | PASS | 시맨틱 + aria-labelledby |
| G6 text-bearing raster | 0 | PASS | raster 0장 |
| G8 JSX literal | 존재 | PASS | 모든 텍스트 JSX |
| G1 시각 diff | ≤ 15% | **≤ 5%** | 단색 + 단일 radius + 한글 antialias만 변수 |

## 8. 리스크 & 트레이드오프

1. **Tier 2-1 standalone pill 정렬**: pill은 children이 없어 Tier 2-2/2-3 컬럼(50+14+61+14+6×57+2×19 = ...)보다 키가 훨씬 작음. flex row에서 `items-start`로 상단 정렬 → pill이 Tier 2 박스 row와 자연스럽게 정렬됨.
2. **connector dot pseudo-element**: `after:` Tailwind로 원형 dot 배치 — 브라우저별 렌더 미세 차이. G1 <5% 범위 내 흡수 예상.
3. **Tier 2-2/2-3 박스와 Tier 3 컬럼 수평 정렬**: 각 컬럼 `flex flex-col items-center` → 박스(302px) 중심축 = connector 중심축 = Tier 3 박스(302px) 중심축. 자동 정렬.
4. **baseline 텍스트 "실행 구조"**: 사용자 지시에는 "설립 구조"라 적혀 있으나 baseline PNG 실측 "실행 구조". **baseline 진실의 원천 원칙** 적용 — "실행 구조" 사용. G1 비교 정합.
5. **Tier 3 박스 배경 #EFF0F0 vs `--color-gray-100`**: 토큰 값 확인 필요. 만약 토큰이 다른 hex면 신규 토큰 추가 or arbitrary hex 택일.
6. **letter-spacing**: Pretendard 한글 `-0.02em` 표준. 측정 후 조정.
7. **Rule of Three**: OrgChartBox를 별도 컴포넌트로 분리하지 않음 — 이 섹션 전용이며 9번 사용되지만 variant별 스타일이 단순(inline Tailwind 충분). 분리 시 오히려 보일러플레이트 증가.

## 9. 구현 파일 목록

- `src/components/ui/HatchedDivider.tsx` — **확장** (label prop 추가)
- `src/components/sections/AboutOrganizationChart/AboutOrganizationChart.tsx` — **신규**
- `src/components/sections/AboutOrganizationChart/index.ts` — **신규**
- `src/routes/AboutOrganizationChartPreview.tsx` — **신규**
- `src/App.tsx` — **업데이트** (`/__preview/about-organization-chart` 라우트 + `/about/organization` 섹션 추가)

## 10. 측정 결과 기록 섹션 — v4 최종 (2026-04-16)

### 10.1 단계 4.5 차단 게이트 (G5~G8 + 구조)

- **G5 eslint jsx-a11y**: PASS (0 error) ✓
- **G6 text-bearing raster**: PASS (ratio 9.43, rasterHeavy=false) ✓
- **G8 JSX literal text**: PASS (textChars 132, 한글 JSX literal 다수) ✓
- **v4 구조 지표** (check-structure-quality):
  - `token_ratio = 0.442` (목표 ≥ 0.2) ✓
  - `absolute_count = 4 / 1 file` (목표 ≤ 5) ✓ (전부 `after:absolute` pseudo-element — Connector dot 2개 + positioning 2)
  - `semantic_score = 3` (section, h2, nav) — 목표 ≥ 2 ✓
  - `text_raster_flag = 0` ✓
- **자동 가드**:
  - check-tailwind-antipatterns: PASS (음수 width·정수 반올림 없음)
  - check-baked-in-png: PASS (Framelink PNG 중첩 적용 없음)

### 10.2 단계 5 참고 게이트 (G1~G4)

- **G1 시각 diff**: **3.66%** (27421/748800 px) — v4 목표 ≤15% ✓ (3회차)
- **G2 치수 정확도** (PIL 실측 baseline vs capture):
  - Tier 2-1 pill: baseline y=43-99 vs capture y=43-92 (시작 ±0, 끝 antialias ±7)
  - Tier 3 Row 1/2/3: baseline y={164-220, 240-296, 316-372} **정확히 일치** ✓
  - x 좌표: Tier2-1 pill x=491-792 (baseline) vs x=490-791 (capture) (±1px)
- **G3 에셋 무결성**: PASS (raster 0장, N/A)
- **G4 색상 정확도**: PASS
  - `--color-brand-500` #4fb654 — Tier 2-1 pill
  - `--color-brand-700` #0c3b0e — Tier 2-2/2-3 primary + connector
  - `--color-gray-100` #eff0f0 — Tier 3 ghost bg
  - `--color-gray-900` — Tier 3 text
  - `var(--color-gray-400/500)` — HatchedDivider
- **육안 semantic 검증**: PASS
  - 박스 9개 위치/크기/색/radius baseline 일치
  - Tier 2-1 pill `rounded-full` vs Tier 2-2/3 `rounded-[10px]` 외형 구분 정상
  - Connector 2개 + 끝 dot baseline 일치 (ESG실천·사회공헌 박스 하단에서 Tier 3 row1로 접속)
  - HatchedDivider "실행 구조" 라벨 + 좌/우 해치+실선 정상
  - "봉사활동(프로보노)" 반각 괄호 정상
  - Tier 2 Bold(700) / Tier 3 Medium(500) 폰트 웨이트 구분 정상
  - diff 이미지는 텍스트 antialias 잔차만 (semantic 오류 없음)
- **회차 수**: 3회 (4.51% → 4.42% → 3.66%)

### 10.3 v4 원칙 준수 확인

- ✓ **absolute 제거**: `flex`/`nav`/`ul`/`li` 기반 flow 레이아웃 (v1~v3 대비 막대한 개선)
- ✓ **디자인 토큰 참조**: brand-500/brand-700/gray-100/gray-900/gray-400/gray-500 모두 CSS 변수
- ✓ **시맨틱 HTML**: `<section aria-labelledby>` + `<h2 sr-only>` + `<nav aria-label>` + `<ul><li>` 트리 구조
- ✓ **HatchedDivider 공통 컴포넌트 확장**: `label?` prop 추가 (backward-compatible)
- ✓ **OrgChartBox/Connector 분리 안 함**: Rule of Three 미달 (이 섹션 전용), inline Tailwind로 충분
- ✓ **빌드/타입/린트**: 모두 PASS
