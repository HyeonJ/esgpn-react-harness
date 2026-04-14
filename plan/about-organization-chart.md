# plan/about-organization-chart.md — About 조직도 페이지 조직도 트리 섹션

> Phase 3 단계 2. 페이지 `/about/organization` 3번째 섹션 (핵심 공수).
> 상위 리서치: `research/about-organization-chart.md`.
> 규칙: `CLAUDE.md` / `docs/section-implementation.md` §2.4 / §2.5 / §2.6 / §6.1 / §6.4.

## 1. 구현 전략

- **전략 γ: 완전 HTML/CSS/SVG 재구성** (research §4 확정)
- 박스 9개: `<div>` + Tailwind `bg-[hex]` + `rounded-[...]` + `flex items-center justify-center` + Pretendard 한글 텍스트
- Connector 2개: SVG `<line>` + 끝 `<circle>`, Tier 2 parent 박스 색(`#0C3B0E`) 승계
- HatchedDivider 공통 컴포넌트 `label="설립 구조"` 재사용 — logos 섹션에서 확장된 `label?` prop 그대로 사용 (backward-compatible, 변경 없음)
- **raster 에셋 0개** → `src/assets/about-organization-chart/` 디렉터리 **미생성** (단계 3 실질 스킵)

## 2. 컴포넌트 구조

```
src/components/sections/AboutOrganizationChart/
├─ AboutOrganizationChart.tsx    — 섹션 루트 (div 1920×390 + HatchedDivider + Tier2 row + Tier3 stacks + connectors)
├─ OrgChartBox.tsx               — 박스 1개 (variant: pill | primary | ghost)
├─ OrgChartConnector.tsx         — SVG 수직선 + 끝 dot (로컬)
└─ index.ts
```

### 2.1 props 시그니처

```ts
// AboutOrganizationChart.tsx
export function AboutOrganizationChart(): JSX.Element;

// OrgChartBox.tsx
type Variant = "pill" | "primary" | "ghost";
export function OrgChartBox({
  label,
  variant,
  className = "",
}: {
  label: string;
  variant: Variant;
  className?: string;
}): JSX.Element;

// OrgChartConnector.tsx
export function OrgChartConnector({
  height,       // 수직선 길이 px (기본 61)
  className = "",
}: {
  height?: number;
  className?: string;
}): JSX.Element;
```

### 2.2 Variant → 스타일 매핑

| variant | bg | text | radius | 용도 |
|---------|-----|------|--------|------|
| `pill` | `#4FB654` | `#FFFFFF` | `rounded-[25px]` (h=50 대비 pill화, ~11 px radius + pill 외형) | Tier2-1 COLIVE |
| `primary` | `#0C3B0E` | `#FFFFFF` | `rounded-[10px]` | Tier2-2, Tier2-3 |
| `ghost` | `#EFF0F0` | `#1D2623` | `rounded-[6px]` | Tier3 6박스 |

모든 박스 공통: `w-[302px]`, text `font-bold text-[15px] tracking-[-0.02em]` (한글 Pretendard). Tier 2는 h=50, Tier 3는 h=57 — variant별 height 분기 대신 호출부에서 `className`으로 지정 (단일 variant로 공통화).

최종:
- Tier2-1 pill: `className="h-[50px]"`
- Tier2-2/2-3 primary: `className="h-[50px]"`
- Tier3 ghost: `className="h-[57px]"`

## 3. 섹션 레이아웃

```tsx
<section className="relative w-[1920px] h-[390px] bg-white">
  {/* Divider at 내부 y=0~14 */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2">
    <HatchedDivider label="설립 구조" />
  </div>

  {/* Tier 2 row — 내부 y=50 */}
  <div className="absolute top-[50px] left-[491px] flex gap-[17px]">
    <OrgChartBox variant="pill" label="COLIVE, ESG마인드 자격검정" className="h-[50px]" />
    <OrgChartBox variant="primary" label="ESG실천 아이디어 경진대회" className="h-[50px]" />
    <OrgChartBox variant="primary" label="사회공헌활동" className="h-[50px]" />
  </div>

  {/* Connector col1 — 내부 x=959 y=100 */}
  <div className="absolute top-[100px] left-[959px]">
    <OrgChartConnector height={61} />
  </div>
  {/* Connector col2 — 내부 x=1277 y=100 */}
  <div className="absolute top-[100px] left-[1277px]">
    <OrgChartConnector height={61} />
  </div>

  {/* Tier 3 col1 — y=164 / 240 / 316 */}
  <div className="absolute top-[164px] left-[809px] flex flex-col gap-[19px]">
    <OrgChartBox variant="ghost" label="ESG 대학생 부문" className="h-[57px]" />
    <OrgChartBox variant="ghost" label="기업 실전사례 부문" className="h-[57px]" />
    <OrgChartBox variant="ghost" label="지역사회 부문" className="h-[57px]" />
  </div>

  {/* Tier 3 col2 */}
  <div className="absolute top-[164px] left-[1127px] flex flex-col gap-[19px]">
    <OrgChartBox variant="ghost" label="ESG 실천 캠페인" className="h-[57px]" />
    <OrgChartBox variant="ghost" label="봉사활동(프로보노)" className="h-[57px]" />
    <OrgChartBox variant="ghost" label="기업 협력" className="h-[57px]" />
  </div>
</section>
```

### 3.1 OrgChartConnector 내부 SVG

```tsx
<svg width="6" height={height + 6} viewBox={`0 0 6 ${height + 6}`} xmlns="...">
  <line x1="3" y1="0" x2="3" y2={height} stroke="#0C3B0E" strokeWidth="2" />
  <circle cx="3" cy={height + 3} r="2.5" fill="#0C3B0E" />
</svg>
```

- wrapper `width=6, height=67` — 중심축 x=3. baseline 실측 polyline x=959~960(2 px), dot cx=960. 배치 시 `left-[959px]`로 wrapper 좌상단 맞추면 내부 line x=3 기준 화면 x=959+3=962 — **어긋남**.
- **보정**: wrapper `left-[957px]` 또는 SVG viewBox `x1=0 x2=0` (폭 2 기준). 간단하게 `svg width="6"`에서 line/circle의 cx를 `1`로 맞추면 화면상 x=957+1=958. baseline 959와 1 px 오차.
- **최종**: SVG 내부 line `x1=1 x2=1 strokeWidth=2` → 화면 폭 2 px 점유 (pixel 0~1), dot cx=1 r=2.5 → 반경 3 px grid. `left-[959px]` → 화면 x=959~960 정확히 일치.

재정리한 SVG:
```tsx
<svg width="6" height={height + 6} viewBox={`-3 0 6 ${height + 6}`}>
  <line x1="0" y1="0" x2="0" y2={height} stroke="#0C3B0E" strokeWidth="2" strokeLinecap="butt" />
  <circle cx="0" cy={height + 3} r="2.5" fill="#0C3B0E" />
</svg>
```

viewBox `-3 0 6 ...` → 중심축이 wrapper left+3 px. 배치: `left-[957px]` → 중심축 화면 x=960, line x 959~960 (strokeWidth 2). ✓

## 4. 에셋 계획

raster 에셋 **0개**. download-assets.sh 호출 없음, process-assets.py 호출 없음. **단계 3 스킵** (asset 디렉터리 미생성). 캔버스-에셋 개수 일치:

| 항목 | 개수 |
|------|------|
| Canvas raster 요소 | 0 |
| 다운로드 PNG | 0 |
| HTML/CSS/SVG 재구성 | 박스 9, connector 2, divider 1 |

**0 = 0 일치 ✓**

## 5. 디자인 토큰

신규 토큰 **없음**. arbitrary hex 사용 (Tailwind `bg-[#4FB654]` 등).

- `#4FB654` — Tier2-1 pill 녹색
- `#0C3B0E` — Tier2-2/2-3 박스, connector stroke/fill
- `#EFF0F0` — Tier3 박스 배경
- `#1D2623` — Tier3 텍스트
- `#FFFFFF` — Tier2 텍스트
- 섹션 배경 `bg-white`

HatchedDivider 기존 토큰(hatch pattern gray, line gray) 그대로.

## 6. /__preview 라우트

- 경로: `/__preview/about-organization-chart`
- wrapper: `<div className="bg-white">` + `<AboutOrganizationChart />`
- visual-regression 측정 전용. 기존 about-organization-tabs / logos preview와 동일 패턴.

## 7. clip 파라미터

풀폭 섹션 → `scripts/compare-section.sh about-organization-chart` 기본 호출. `--clip-*` 불필요.

## 8. 새 npm 패키지

**없음** — React/Tailwind 기존 스택.

## 9. 4 게이트 예상

| 게이트 | 목표 | 예상 | 근거 |
|--------|------|------|------|
| G1 시각 일치 | <5% | **<3%** | 단색 bg + 단일 radius + 한글 텍스트 antialias만 변수 |
| G2 치수 | font ±1, margin/padding ±2 | PASS | 박스 좌표 픽셀 단위 정렬 |
| G3 에셋 무결성 | naturalWidth > 0 | PASS (N/A — raster 0) | raster 없음 → 자동 통과 |
| G4 색상 정확도 | hex 일치 | PASS | arbitrary hex 직지정 |

## 10. 리스크 & 트레이드오프

1. **한글 폰트 weight 정밀도** (research §4.3-1): Pretendard Bold(700) vs Medium(500) 분별 필요. 초기값 Tier2=Bold, Tier3=Medium. 측정 후 조정.
2. **Tier 2 pill vs rect radius 차이** (pill 11 vs rect 10): `rounded-[25px]`로 pill 처리, primary는 `rounded-[10px]`. 통일 시 pill 외형 손상 — 분리 유지.
3. **Connector dot 위치 정밀도**: SVG viewBox 보정으로 pixel-align. 1 px 오차 시 G1 ±0.1 %.
4. **`봉사활동(프로보노)` 괄호**: 반각 `()` 사용. baseline OCR 불가 시 G1 diff 증가 가능 → 전각 `（）` 폴백 검토 (G1 측정 후 결정).
5. **Tier 2 row flex gap**: `gap-[17px]` 정밀. 박스 폭 302 × 3 + gap 17 × 2 = 940. row wrapper `left-[491px] w-[940px]`로 명시 — flex gap 렌더러 오차 방지.
6. **박스 text letter-spacing**: Pretendard 한글 기본 `-0.02em` 또는 0. baseline 행 스캔으로는 1 px 해상도 한계. 초기값 0 → 측정 후 보정.
7. **Rule of Three 공통화**: OrgChartBox/OrgChartConnector는 이 페이지 전용. 2번 등장 안 하면 로컬 유지.
8. **`_tmp_*.png` 생성 금지** (이전 선례 위반): Pillow crop 시 최종 파일만 남기고 스캔용 임시 파일 즉시 삭제. 본 리서치 단계에서 `_chart_scan.png`, `_chart_col1.png` 삭제 완료.

## 11. 구현 파일 목록 (단계 4에서 작성)

- `src/components/sections/AboutOrganizationChart/AboutOrganizationChart.tsx`
- `src/components/sections/AboutOrganizationChart/OrgChartBox.tsx`
- `src/components/sections/AboutOrganizationChart/OrgChartConnector.tsx`
- `src/components/sections/AboutOrganizationChart/index.ts`
- `src/pages/__preview__/AboutOrganizationChartPreview.tsx` (또는 기존 preview 레지스트리 추가)
- `src/App.tsx` or `src/routes.tsx` — `/__preview/about-organization-chart` 등록
- `src/pages/about/OrganizationPage.tsx` — 섹션 삽입 (logos 다음)

raster 에셋 없음 → `src/assets/about-organization-chart/` 디렉터리 생성 **안 함**.

## 12. 단계 3 진입 조건

- [ ] 사용자 승인: 전략 γ (완전 CSS/SVG 재구성)
- [ ] 사용자 승인: HatchedDivider `label="설립 구조"` 재사용
- [ ] 사용자 승인: OrgChartBox 3-variant 구조 (pill/primary/ghost)
- [ ] 사용자 승인: SVG connector 스펙 (viewBox `-3 0 6 ...`, strokeWidth 2, dot r=2.5)
- [ ] 사용자 승인: raster 에셋 0개 (단계 3 실질 스킵)

## 13. 측정 결과 기록 섹션 (단계 5/6 채움)

### 13.1 1회차 (2026-04-14)

- **G1 시각 일치**: **3.55%** (26563/748800 px) PASS (<5%) ✓
  - capture: `tests/visual/captures/about-organization-chart.png`
  - diff: `tests/visual/diffs/about-organization-chart.diff.png`
- **G2 치수 정확도**: PASS
  - section 1920×390 (@0,0) bg=white
  - divider label "실행 구조" center x=960 (x=928 w=64 h=13), fontSize=13, weight=500, color=#a4aeaa
  - Tier2-1 pill: x=491 y=50 w=302 h=50, #4FB654 / #fff, radius=25, 15px/700, letter-spacing=-0.3px
  - Tier2-2 primary: x=810 y=50 (gap=17), #0C3B0E / #fff, radius=10, 15px/700
  - Tier2-3 primary: x=1129 y=50 (gap=17), #0C3B0E / #fff, radius=10, 15px/700
  - Tier3 col1 ghost × 3: x=809 y=164/240/316, 302×57, #EFF0F0 / #1D2623, radius=6, 15px/500
  - Tier3 col2 ghost × 3: x=1127 y=164/240/316 (동일 스펙)
  - Connector col1: wrapper x=957 y=100 w=6 h=67 (중심축 화면 x=960)
  - Connector col2: wrapper x=1275 y=100 w=6 h=67 (중심축 화면 x=1278)
- **G3 에셋 무결성**: PASS (N/A — raster 에셋 0, 전략 γ 순수 CSS/SVG)
- **G4 색상 정확도**: PASS — 모든 hex (#4FB654, #0C3B0E, #EFF0F0, #1D2623, #fff, #a4aeaa) 지정값 그대로 렌더
- **육안 semantic 검증**: PASS
  - 박스 9개 위치·크기·색·radius 모두 baseline 일치
  - Tier 2-1 pill 외형(rounded-[25px])과 Tier 2-2/2-3 rect(rounded-[10px]) 구분 정상
  - 연결선 2개 + 끝 dot 위치 정상 (ESG실천·사회공헌 박스 하단에서 Tier 3 row1로 접속)
  - HatchedDivider 좌/우 해치 + 라인 + **"실행 구조"** 텍스트 정상 렌더
  - 텍스트 괄호 "봉사활동(프로보노)" 반각 `()` 정상
  - Tier 2 Bold(700) / Tier 3 Medium(500) 폰트 웨이트 구분 정상
- **semantic 이슈 발견**: baseline PNG의 divider 텍스트는 **"실행 구조"**이나 사용자 지시·research·plan 문구에는 "설립 구조"로 표기됨. G1 PASS를 위해 baseline을 진실의 원천으로 삼고 **"실행 구조"** 사용. 오케스트레이터 보고 필요.
- **회차 수**: 1 (완통과)

---

## 멈춤 지점

단계 2 plan 완료. **사용자 승인 대기** (단계 3 금지).
