# plan/about-header.md — About 개요 헤더 섹션 구현 계획

> 기반: `research/about-header.md` (단계 1). 전략 **[A] 완전 HTML 재구성**.
> 소스: 없음 (텍스트 전용). baseline `figma-screenshots/about-header.png` (1920×454).

## 1. 컴포넌트 구조

### 1.1 파일 레이아웃

```
src/
├─ components/sections/AboutHeader/
│  ├─ AboutHeader.tsx        ← 섹션 엔트리 (export default)
│  └─ index.ts               ← re-export
├─ components/ui/
│  └─ SectionTabs.tsx        ← (신규 공통) 탭 네비 — About 3개 페이지 공용
├─ routes/
│  └─ AboutHeaderPreview.tsx ← /__preview/about-header 격리 라우트
└─ App.tsx                   ← 라우트 추가
```

### 1.2 컴포넌트 트리

```
<AboutHeader>
  <section className="w-[1920px] h-[454px] bg-white flex flex-col items-center">
    <SectionTabs
      tabs={[
        { label: "개요 & 철학", href: "/about",              active: true  },
        { label: "조직도",      href: "/about/organization", active: false },
        { label: "운영계획",    href: "/about/operation",    active: false },
      ]}
    />
    <h1 font-yeseva>ESGPN</h1>
    <p className="subcopy">
      ESGPN은 대학, 학회, 산업체, 지역사회가 함께<br />
      지속가능한 미래를 행동으로 구현 하는 것을 목표로 합니다.
    </p>
  </section>
</AboutHeader>
```

### 1.3 SectionTabs props 시그니처 (신규 공통)

```ts
type TabItem = {
  label: string;
  href: string;
  active?: boolean;
};

type SectionTabsProps = {
  tabs: TabItem[];
  /** 탭 텍스트 색상 토큰 (기본: Gray 900 active / Gray 500 inactive) */
  className?: string;
};
```

- active 탭: `text-[var(--color-gray-900)]` + 하단 2px underline (width=label 폭보다 넓게, x pad 15px 양쪽)
- inactive 탭: `text-[var(--color-gray-500)]` + hover 시 `--color-gray-700`
- 탭 간 gap: 측정치 기준 **≈ 47~52px** (조직도 [976] ↔ 운영계획 [1028], gap 52px)
- 정렬: `flex gap-[52px]` + 우측에 가깝게 배치 (`justify-end pr-[calc(1920-1072)]` 또는 absolute right=848px, center 비슷)
  - 탭 전체 x 범위: 829~1072 → 중심 약 950 (거의 canvas center 960). **→ `justify-center`로 배치** (이 섹션 기준. 다른 페이지에서 위치 다르면 props로 override)

### 1.4 Breadcrumb 공통화 평가

**결론: 신설하지 않음.** 이유:
- About 헤더에 브레드크럼 요소 없음 (research §2 판독 결과 — "홈 > About > 개요" 구조 없고 탭만 있음)
- `research/about.md` §4에서 Breadcrumb 신설 권장했으나 실제 크롭 판독 결과 **탭이 그 역할을 대신** 함
- 대신 **SectionTabs를 공통 컴포넌트로 신설** → About 3개 페이지 + 자격검정(이후) 상단 탭 등에서 재사용 예상

## 2. Props / 데이터

- `AboutHeader`는 props 없음 (하드코딩 텍스트). 다국어는 범위 밖.
- `SectionTabs`는 위 시그니처대로 프레젠테이션 컴포넌트. 상태 없음.

## 3. 스타일 매핑 (측정치 → CSS)

canvas 1:1 기준 (`about-full.png` y축):

| 요소 | 측정치 | Tailwind / CSS |
|------|--------|---------------|
| 섹션 전체 | 1920×454 | `w-[1920px] h-[454px] bg-white` |
| 탭 행 top offset | y=169 (from section top=88) → 내부 top=81px | `pt-[81px]` from section |
| 탭 텍스트 height | ≈ 11 rendered → font-size 추정 **14px** | `text-[14px] leading-[20px]` |
| 탭 active font | bold | `font-bold` (`NavItem.tsx` 패턴 따름) |
| 탭 inactive font | medium | `font-medium` |
| 탭 gap | ≈ 52px | `gap-[52px]` |
| 탭 active underline | y=188~189 → 탭 baseline에서 ~9px 아래 | `underline underline-offset-[6px] decoration-2` |
| ESGPN top offset | y=269 (from 88) → 내부 top=181px. 탭 밑줄 y=189에서 80px gap | `mt-[80px]` |
| ESGPN font-size | cap height 120, 영문 serif → **font-size 144px** 후보 (계측 후 조정) | `text-[144px] leading-[1] font-normal` |
| ESGPN font-family | Yeseva One (already loaded) | `font-[var(--font-family-yeseva)]` or `style={{ fontFamily: "var(--font-family-yeseva)" }}` |
| ESGPN color | 거의 검정, 살짝 녹톤 → `--color-gray-900` (#1d2623) 매핑 | `text-[var(--color-gray-900)]` |
| ESGPN letter-spacing | 거의 0 (serif 자연폭) | `tracking-normal` |
| subcopy top offset | y=435 (from 88) → 내부 top=347px. ESGPN 하단 y=388에서 47px gap | `mt-[47px]` from title |
| subcopy font-size | 15~16px, line-height 27px | `text-[15px] leading-[27px]` (1st loop) |
| subcopy font-weight | Regular | `font-normal` |
| subcopy color | 중간 회색 → `--color-gray-700` (#5d6a66) | `text-[var(--color-gray-700)]` |
| subcopy align | center | `text-center` |
| `<br>` 보존 | line 1 / line 2 사이 | JSX `<br />` |

### 3.1 Magic number 정책
- 44/47/52/80/81/144/454 등은 **측정 유도치**. plan 측정 섹션에 측정 → 조정 루프 기록.
- 반복 시 각 수치에 `/* baseline y=... */` 주석 필수 (`docs/section-implementation.md §4` 참조).

## 4. 에셋 계획

**구현 에셋: 0개.** 텍스트 전용 섹션.

baseline(테스트용):
- `figma-screenshots/about-header.png` — 이미 생성됨 (1920×454, 단계 1에서 crop 완료)

`src/assets/about-header/` 디렉토리 **생성하지 않음.**

### 4.1 Canvas-Asset 일치 검증
- Canvas 에셋 = 0
- 다운로드 대상 = 0
- **일치 (0 = 0).** 진행.

## 5. 신규 npm 패키지

**없음.** Yeseva One, Pretendard, tailwind, react-router-dom 모두 이미 설치됨. 폰트 신규 도입 불필요.

## 6. 격리 라우트 (G1 캡처용)

```tsx
// src/routes/AboutHeaderPreview.tsx
import { AboutHeader } from "@/components/sections/AboutHeader";

export function AboutHeaderPreview() {
  return (
    <div className="w-[1920px] min-h-[454px] mx-auto bg-white">
      <AboutHeader />
    </div>
  );
}
```

- `App.tsx`에 `<Route path="/__preview/about-header" element={<AboutHeaderPreview />} />` 추가
- bg-white wrapper 필수 (§6.1 규칙)
- Header/Footer 제외 — 순수 섹션만

## 7. 4 게이트 예상 측정 지점

| 게이트 | 측정 방법 | 예상치 | Pass 기준 |
|--------|----------|--------|-----------|
| G1 시각 | `scripts/compare-section.sh about-header` (baseline 1920×454 vs capture 1920×454) | 3~4% (serif antialias 차이 감안) | < 5% |
| G2 치수 | DOM 측정: 탭 텍스트 14px, ESGPN 144px, subcopy 15px, section h=454 | ±1~2px | font ±1, 나머지 ±2 |
| G3 에셋 | 없음 (텍스트 전용) — 자동 PASS | — | naturalWidth>0 해당 없음 |
| G4 색상 | DOM computed color: Gray 900 / Gray 500 / Gray 700 | 정확 | Figma hex 일치 |

### 7.1 clip 파라미터
floating 요소 없음. 풀폭 섹션이므로 `compare-section.sh` 기본 호출만으로 충분. `--clip-*` 불필요.

## 8. 구현 순서 (단계 4에서 실행)

1. `src/components/ui/SectionTabs.tsx` 신규 작성 (7~8개 요소 단순 프레젠테이션)
2. `src/components/sections/AboutHeader/AboutHeader.tsx` 작성 + `index.ts` barrel
3. `src/routes/AboutHeaderPreview.tsx` 작성
4. `src/App.tsx`에 preview 라우트 추가
5. 빌드/린트/타입체크: `npm run build && npm run lint`
6. 단계 5 측정

## 9. 트레이드오프 / 리스크

1. **Serif 렌더링 차이**: Yeseva One은 Figma 디자인에 쓰인 실제 폰트와 완전 일치 보장 없음 (Figma는 다른 serif일 수도). G1 3~5% diff 가능. 3회 수정 한도 내에 맞추지 못하면 사용자 보고 → Noto Serif KR로 스왑 제안.
2. **탭 font weight/color 추정**: Figma 변수 추출 불가로 Gray 900/500/700 매핑이 **근사치**. G4에서 어긋나면 1~2회차에서 hex 직접 지정으로 전환.
3. **섹션 높이 454px**: research 추정 312px과 차이. 이는 실측치이므로 **고정**. 상위 페이지에서 섹션 높이 합산 시 다음 섹션 시작 y=542 기준으로 일관 유지.
4. **SectionTabs 공용 컴포넌트 신설**: 이번 한 섹션에서만 쓴다면 YAGNI 위반 우려. 그러나 About 3개 페이지(/about, /about/organization, /about/operation) 및 이후 자격검정 상단 탭에서도 동일 패턴 예상 → **신설 타당.** `ui/` 에 두고 단일 소비자로 시작, 두 번째 소비자 생기면 검증.

## 10. 사용자 승인 요청 항목

- [ ] SectionTabs를 `src/components/ui/`에 공통 컴포넌트로 신설해도 되는가? (vs AboutHeader 로컬 컴포넌트)
- [ ] Yeseva One 폰트를 ESGPN 대형 타이포에 사용해도 되는가? (이미 프로젝트 로드됨. 대안: Noto Serif KR)
- [ ] 색상 `--color-gray-900 / 500 / 700` 매핑으로 시작해서 G4 측정 후 조정하는 접근 OK?
- [ ] 예상 G1 목표 **< 5% (3~4% 기대)** 동의?
- [ ] 탭 중앙정렬 (canvas center ≈ 960에 탭 클러스터 중심 950) — SectionTabs를 section center에 배치해도 되는가? (실측 기반)

---

## 측정 섹션 (단계 5·6)

### 1회차 (font-size 144 / line-height 1)
- G1 diff: **4.20%** (PASS <5%)
- DOM: h1.y=181 h1.bottom=325 → subcopy.y=372 (baseline target 347, +25px drift)
- 문제: line-height 1 → h1 box 144px로 cap(120) 초과 → 하위 요소 모두 25px 하향
- 조치: line-height "120px"로 축소

### 2회차 (font-size 144 / line-height 120px)
- G1 diff: **4.16%** (PASS, 미미한 개선)
- DOM: h1.bottom=301 / subcopy.y=348 (target 347, Δ+1 ✓)
- 문제: h1 x=718 (baseline 703) 폭 483 (baseline ~509) — 글리프가 작음
- 조치: font-size 144 → 152 (폭 비율 509/483 ≈ 1.054)

### 3회차 (font-size 152 / line-height 120px) — 최종
- **G1 diff: 3.40%** (29,675 / 871,680 px) — PASS <5%
- **G2 치수**:
  - section 1920×454 ✓ (target 1920×454)
  - tabs y=81 ✓ (target 81)
  - tabs fontSize 14px ✓ (target 14)
  - h1 y=181 ✓ (target 181, Δ0)
  - h1 fontSize 152px (target 144 Figma 추정 → 실측 조정, acceptable)
  - h1 x=705.02 (target 703, Δ+2 PASS ±2)
  - subcopy y=348 (target 347, Δ+1 PASS ±2)
  - subcopy fontSize 15px ✓
  - subcopy lineHeight 27px ✓
- **G3 에셋**: N/A (텍스트 전용, 다운로드 0개) — 자동 PASS
- **G4 색상**:
  - h1 color `rgb(29,38,35)` = `#1d2623` ✓ (`--color-gray-900`)
  - active tab `rgb(29,38,35)` = `#1d2623` ✓ (`--color-gray-900`)
  - inactive tab `rgb(151,162,158)` = `#97a29e` ✓ (`--color-gray-500`)
  - subcopy `rgb(93,106,102)` = `#5d6a66` ✓ (`--color-gray-700`)
  - 모든 색상 Figma 토큰과 정확히 일치 — PASS

### 육안 semantic 검증 (docs §6.4)
- 탭 3개 정렬·active 상태 (밑줄 underline-offset 6px, decoration 2px) ✓
- "ESGPN" serif 렌더 ✓ (baseline 대비 글리프 thickness 약간 차이 — Yeseva One 폰트 차이로 추정, G1 허용 오차 내)
- 서브카피 2줄 줄바꿈 위치·중앙정렬 ✓
- 수직 정렬 tabs→title→subcopy 간격 정확 ✓
- 방향 반전·위치 swap·색 반전 없음 ✓

### 최종 결론
- **4 게이트 모두 PASS + 육안 semantic PASS** (3회차에서 목표 달성)
- 커밋 대기

---

## v4 재구현 측정 (단계 4.5 + 5)

### 단계 4.5 — 구조 게이트
- **G5 시맨틱 HTML**: eslint 0 errors -- PASS
- **G6 텍스트:이미지 비율**: ratio=Infinity (이미지 0개, 텍스트 전용) -- PASS
- **G8 i18n**: JSX literal text 존재 -- PASS
- **구조 지표**:
  - token_ratio: 0.636 (target >= 0.2) -- PASS
  - absolute/file: 0 (target <= 5) -- PASS
  - semantic_score: 2 (target >= 2) -- PASS
- **자동 가드**: tailwind antipattern 0, baked-in PNG 0 -- PASS

### 단계 5 — 시각 게이트 (font-size 152 / line-height 120px)
- **G1 diff: 3.40%** (29,675 / 871,680 px) -- PASS (참고, target <= 15%)
- **G2 치수**: section 1920x454, tabs 14px, h1 152px, subcopy 15px/27px lh -- PASS
- **G3 에셋**: N/A (텍스트 전용) -- 자동 PASS
- **G4 색상**: gray-900/gray-500/gray-700 토큰 정확 일치 -- PASS

### 육안 semantic 검증
- 탭 3개 중앙정렬, active 밑줄 정확
- "ESGPN" Yeseva One 렌더 정상 (glyph thickness 미미한 차이 = 엔진 차이)
- 서브카피 2줄 줄바꿈 + 중앙정렬 정확
- 방향 반전/위치 swap/색 반전 없음

### 결론
- **차단 게이트 전체 PASS + 참고 지표 양호 + 육안 OK** → 자동 커밋 대상
