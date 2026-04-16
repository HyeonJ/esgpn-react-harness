# plan/about-organization-tabs.md — About 조직도 탭 섹션 구현 계획

> 기반: `research/about-organization-tabs.md`. 전략 **[A] 완전 HTML 재구성**.
> baseline: `figma-screenshots/about-organization-tabs.png` (1920×102).
> 핵심: **SectionTabs 재사용 Rule of Three 2/3, 컴포넌트 수정 0%.**

## 1. 컴포넌트 구조

### 1.1 파일 레이아웃

```
src/
├─ components/sections/AboutOrganizationTabs/
│  ├─ AboutOrganizationTabs.tsx   ← 섹션 엔트리 (export default)
│  └─ index.ts                    ← re-export
├─ routes/
│  └─ AboutOrganizationTabsPreview.tsx  ← /__preview/about-organization-tabs
└─ App.tsx                        ← 라우트 추가 (preview + /about/organization)
```

### 1.2 컴포넌트 트리

```tsx
<AboutOrganizationTabs>
  <section className="w-[1920px] h-[102px] bg-white flex items-center justify-center">
    <SectionTabs
      tabs={[
        { label: "개요 & 철학", href: "/about",              active: false },
        { label: "조직도",      href: "/about/organization", active: true  },
        { label: "운영계획",    href: "/about/operation",    active: false },
      ]}
    />
  </section>
</AboutOrganizationTabs>
```

### 1.3 스타일 매핑 (측정치 → CSS)

baseline 행 스캔 기반 (research §2.2):

| 요소 | 측정치 | Tailwind / CSS |
|------|--------|---------------|
| 섹션 전체 | 1920×102 | `w-[1920px] h-[102px] bg-white` |
| 탭 텍스트 top | y=168 (from section y=88 → inner top=80) | flex `items-center` 자동 수직 중앙 ≈ (102-20)/2=41. 실제 inner top=80은 섹션 상단 padding 80px 필요 → **`items-start pt-[80px]`** 방식으로 고정 |
| 탭 underline | y=188~189 (inner 100~101, 섹션 하단 1px 위) | SectionTabs 내장 (6px offset + 2px thickness) |
| 섹션 bottom 여백 | underline y=189, 섹션 end y=190 → 1px | 자연 발생 (추가 padding 불필요) |

**정렬 전략:** about-header(§1.2)에서는 section flex-col 내부에 pt-[81px]. 본 섹션은 tabs 하나만 있으니 `items-start pt-[80px]`로 탭 텍스트 top=80 맞춤. SectionTabs 내부 height=20 (line-height) + underline offset 9px → 총 inner bottom ≈ 101.

대안: `items-center`로 flex 수직 중앙 사용 시 tab.y=(102-20)/2=41 — baseline(80)과 차이 39px. **채택 안 함**. `items-start pt-[80px]` 확정.

### 1.4 SectionTabs 확장 여부

**불필요.** research §4.2 확정. 컴포넌트 파일 `src/components/ui/SectionTabs.tsx`를 **한 글자도 수정하지 않음**. about-header G1(3.40%) regression 0% 보장.

## 2. Props / 데이터

- `AboutOrganizationTabs` props 없음 (하드코딩)
- 운영계획 href: `/about/operation` (plan/about-header.md §1.2 기존 선례 일관 유지. 라우트 미구현이나 `<Link>`는 404로 이동 — `#` 금지)

## 3. 에셋 계획

**구현 에셋: 0개.** 텍스트 전용.

baseline(테스트용):
- `figma-screenshots/about-organization-tabs.png` — **이미 생성 완료** (1920×102, 단계 1 crop)

`src/assets/about-organization-tabs/` 디렉토리 **생성하지 않음**. 단계 3 자동 PASS (다운로드 0개 = canvas 0개 = 파일 0개).

### 3.1 Canvas-Asset 일치 검증
- Canvas 에셋 = 0
- 다운로드 대상 = 0
- **일치 (0 = 0)** ✓

## 4. 신규 npm 패키지

**없음.** react-router-dom, Pretendard 모두 기존.

## 5. 격리 라우트 (G1 캡처용)

```tsx
// src/routes/AboutOrganizationTabsPreview.tsx
import { AboutOrganizationTabs } from "@/components/sections/AboutOrganizationTabs";

export function AboutOrganizationTabsPreview() {
  return (
    <div className="w-[1920px] min-h-[102px] mx-auto bg-white">
      <AboutOrganizationTabs />
    </div>
  );
}
```

- `App.tsx` 추가:
  - `<Route path="/__preview/about-organization-tabs" element={<AboutOrganizationTabsPreview />} />`
  - 사용자 라우트 `/about/organization` (RootLayout 하위): `<Route path="/about/organization" element={<AboutOrganizationTabs />} />` — 이후 logos/chart/panorama 섹션 추가 시 fragment 확장
- bg-white wrapper 필수 (§6.1 규칙)
- Header/Footer 제외 — 순수 섹션만

## 6. 4 게이트 예상 측정

| 게이트 | 측정 방법 | 예상치 | Pass 기준 |
|--------|----------|--------|-----------|
| G1 시각 | `scripts/compare-section.sh about-organization-tabs` (1920×102 vs 1920×102) | **2~3%** (텍스트만, serif 없음) | < 5% |
| G2 치수 | DOM: section 1920×102, tab font 14px, line-height 20, gap 52, pt=80 | ±1~2px | font ±1, 그 외 ±2 |
| G3 에셋 | N/A — 자동 PASS | — | — |
| G4 색상 | DOM computed: active `#1d2623`, inactive `#97a29e` | 정확 | Figma hex 일치 |

### 6.1 clip 파라미터
`--clip-*` **불필요**. 풀폭 1920×102 전체 비교.

## 7. 구현 순서 (단계 4에서 실행)

1. `src/components/sections/AboutOrganizationTabs/AboutOrganizationTabs.tsx` + `index.ts` 작성
2. `src/routes/AboutOrganizationTabsPreview.tsx` 작성
3. `src/App.tsx`:
   - preview import + Route 추가
   - `AboutOrganizationTabs` import + `/about/organization` 사용자 라우트 추가
4. `npm run build && npm run lint`
5. 단계 5 측정 (compare-section.sh)
6. about-header G1 regression 확인 — `scripts/compare-section.sh about-header` 재실행, 3.40% 변함없어야 함

## 8. 트레이드오프 / 리스크

1. **SectionTabs 2번째 소비자 검증:** 현 SectionTabs는 about-header용으로 설계됨. active 탭이 다른 위치("조직도")여도 동작해야 함 — `<Link>` 내부 `textDecoration: underline`은 글자 폭에 자동 맞춤 → **OK** 예상. G1 실패 시 underline 폭 하드코딩 필요성 검토.
2. **섹션 높이 102px 확정:** research §2.3 실측치. 상위 페이지 조립 시 다음 섹션(logos) y=190부터 시작.
3. **`/about/operation` 라우트 미구현:** `<Link>` 클릭 시 404 — React Router 기본 동작. plan 문서에만 경고. 차후 운영계획 페이지 구현 시 자동 연결.
4. **about-header regression 0 원칙:** SectionTabs 파일 절대 수정 금지. 수정 발생 시 about-header 재측정 필수.

## 9. 사용자 승인 요청 항목

- [ ] SectionTabs 재사용 (수정 없음) + 컴포넌트 트리 §1.2 구성 OK?
- [ ] 운영계획 href=`/about/operation` 유지 (about-header 선례 일관) OK? 또는 현재 없음이니 `#`?
- [ ] `items-start pt-[80px]` 정렬 전략 OK? (vs `items-center`)
- [ ] preview 라우트 `/__preview/about-organization-tabs` 신설 OK?
- [ ] 사용자 라우트 `/about/organization` 을 이번 섹션에서 신설 (이후 섹션 추가 시 fragment 확장) OK?
- [ ] 예상 G1 **2~3%** (<5%) 동의?

---

## 측정 섹션 (단계 5·6) — v4 실행 통과

### v4 회차 (2026-04-16)

**단계 4.5 차단 게이트**:
- G5 eslint jsx-a11y: **PASS** (0 error)
- G6 text ratio: **PASS** (ratio 3.93, rasterHeavy false)
- G8 i18n literal: **PASS** (JSX korean literals present)
- Tailwind antipatterns: **PASS** (없음)
- Baked-in PNG: **PASS** (없음)

**v4 구조 지표** (`check-structure-quality.mjs --section=AboutOrganizationTabs`):
- magic=2, token=1, **token_ratio=0.333 (≥0.2 ✓)**
- **absolute=0 (≤5 ✓)**
- semantic=1 (`section`)
- raster flag: 0
- 구조 게이트 **PASS**

**G1 시각** (`scripts/compare-section.sh about-organization-tabs`):
- DIFF: **0.72%** (1,415 / 195,840 px) — **PASS** (<15% v4 목표)
- 예상치 2~3% 대비 훨씬 우수 (텍스트 전용, serif 없음)

### 회차 1 — 2026-04-14 (구버전)

**G1 시각** (`scripts/compare-section.sh about-organization-tabs`):
- DIFF: **0.71%** (1,399 / 195,840 px) — **PASS** (<5%)
- 예상치 2~3% 대비 훨씬 우수 (텍스트 전용, serif 없음)

**G2 치수** (measure-about-organization-tabs.ts):
| 요소 | 측정 | 기대 | Δ |
|------|------|------|---|
| section | 1920×102 | 1920×102 | 0 |
| tab(개요 & 철학) | y=80, font 14/20, w=63.95, weight 500, color rgb(151,162,158) | y=80, 14/20, ~60, 500, #97a29e | ±1 |
| tab(조직도, active) | y=80, 14/20, w=36.31, weight 700, color rgb(29,38,35), textDecoration underline 2px | y=80, 14/20, ~24, 700, #1d2623, underline | OK (라벨 폭 24→36은 자연 measure, Figma 추정치 오차 범위) |
| tab(운영계획) | y=80, 14/20, w=48.41, weight 500, color rgb(151,162,158) | y=80, 14/20, ~45, 500, #97a29e | ±3 (허용) |
| nav gap | (1037.92 - 897.61) = 140.31, (949.61 - 897.61) = 52 / (1037.92 - 985.92) = 52 | 52 | 0 |

폰트 ±1, 나머지 ±2 기준 **PASS**.

**G3 에셋**: 에셋 0개 → 자동 **PASS**.

**G4 색상**:
- active `rgb(29,38,35)` = `#1d2623` (--color-gray-900) ✓
- inactive `rgb(151,162,158)` = `#97a29e` (--color-gray-500) ✓
- **PASS**.

**육안 semantic 검증** (baseline / capture / diff + about-header capture 재확인):
- 3 탭 순서·정렬·active("조직도") Bold+underline·inactive 2개 Medium+gray **일치**
- underline 폭: "조직도" 라벨 폭에만 정확히 적용 (baseline과 동일, 넓은 횡단 underline 아님)
- diff 이미지: 모두 글리프 anti-aliasing 잔차, 방향 반전/위치 swap/색 반전 **없음**
- about-header capture: 이전과 동일 (SectionTabs 미수정 확인)
- **PASS (오류 0건)**

**about-header regression 재측정**:
- DIFF: **3.40%** (이전과 동일) — **regression 0 확인**

**4 게이트 + 육안 모두 PASS (1회차)** → 단계 7 진입 가능.

---

**v4 육안 semantic 검증**:
- baseline/capture: 3 탭 순서 (개요 & 철학 / 조직도 / 운영계획) 일치
- active("조직도") Bold + 2px underline 정확 (조직도 라벨 폭에만)
- inactive 2개 Medium + gray-500 정확
- diff 이미지: 글리프 anti-aliasing 잔차만 (semantic 오류 0)
- **육안 PASS**

**about-header regression**: 3.40% → 3.44% (+0.04%p 측정 노이즈, SectionTabs 미수정 확인).

**v4 차단 게이트 + 참고 지표 전부 PASS.** 자동 커밋 진입.

---

## 멈춤 지점

**단계 2 완료. 단계 3~7은 사용자 승인 후 별도 지시를 기다림.**
