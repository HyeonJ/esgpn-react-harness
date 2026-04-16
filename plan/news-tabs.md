# plan/news-tabs.md — 뉴스 목록 페이지 탭 섹션 구현 계획

> 기반: `research/news-tabs.md`. 전략 **섹션 전용 로컬 컴포넌트 (Rule of Three 대기)**.
> baseline: `figma-screenshots/news-tabs.png` (936×30).
> 핵심: **기존 SectionTabs 미수정, news용 로컬 탭 인라인 정의. about regression 0 보장.**

## 1. 컴포넌트 구조

### 1.1 파일 레이아웃

```
src/
├─ components/sections/NewsTabs/
│  ├─ NewsTabs.tsx   ← 섹션 + 로컬 탭 정의
│  └─ index.ts
├─ routes/
│  └─ NewsTabsPreview.tsx  ← /__preview/news-tabs
└─ App.tsx                 ← 라우트 추가 (preview + /news NewsTabs 삽입)
```

### 1.2 컴포넌트 트리

```tsx
<section aria-label="뉴스 목록 섹션 탭" className="mx-auto flex w-full max-w-[1920px] justify-center bg-gray-000 py-[140px]">
  <nav aria-label="뉴스/자료실 탭" className="flex items-center justify-center gap-2">
    <Link to="/news" aria-current="page" className="border-b-[1.5px] border-gray-900 px-4 py-1 text-[length:var(--text-sm-14m-size)] font-[number:var(--text-sm-14m-weight)] leading-[var(--text-sm-14m-line-height)] tracking-[var(--text-sm-14m-letter-spacing)] text-gray-900">
      뉴스
    </Link>
    <Link to="/resources" className="border-b-[1.5px] border-gray-200 px-4 py-1 text-[length:var(--text-sm-14m-size)] font-[number:var(--text-sm-14m-weight)] leading-[var(--text-sm-14m-line-height)] tracking-[var(--text-sm-14m-letter-spacing)] text-gray-400 hover:text-gray-700 transition-colors">
      자료실
    </Link>
  </nav>
</section>
```

**주의**: section 높이는 자연적으로 padding + nav 높이로 결정. preview에서는 순수 섹션 높이(30px)만 캡처, 사용자 라우트에서는 Header clearance 고려.

**섹션 정책 재검토** — research §1에서 섹션 캔버스 y=140 (Figma 페이지 기준 첫 요소). 한편 CLAUDE.md "Header fixed clearance" 규정에 따르면 `/news` 최상단 섹션 `padding-top = max(140, 108) = 140`. 그러나 현재 NewsTabs만 단독 구현(다른 섹션 없음). **섹션 자기 정렬 책임** 원칙상 `py-0`으로 순수 탭만 만들고 상위 페이지가 pt-[140px]를 부여하는 선례가 있는지 확인.

**선례 확인**: about-organization-tabs는 `pt-[80px] h-[102px]` 내장(섹션이 상단 여백 책임). gallery-title 등도 섹션 내부에 상단 padding 내장. → **섹션 내부에 `pt-[140px]` 내장하지 않는다** — 섹션은 탭 자체 높이 30px만 책임. Header clearance는 페이지 라우트에서 `<Route path="/news" element={<div className="pt-[140px]"><NewsTabs /> ...</div>}>` 식으로 외부 wrapper가 책임 or NewsTabs가 섹션 스타일로 `py-0` 제공. 

**단독 섹션 기간** 정책: baseline은 순수 936×30 영역만 crop됨. preview도 동일하게 해야 G1 일치. 따라서 **NewsTabs는 h-[30px] 순수 탭만 렌더** + 사용자 라우트의 news 섹션 통합 시 뉴스 페이지 컨테이너가 상단 clearance 책임.

```tsx
// 최종 트리 (수정)
<section aria-label="뉴스 목록 섹션 탭" className="mx-auto flex w-full max-w-[1920px] items-center justify-center bg-gray-000" style={{ height: 30 }}>
  <nav ...>...</nav>
</section>
```

### 1.3 스타일 매핑 (측정치 → CSS)

| 요소 | 측정치 (Figma) | Tailwind / CSS |
|------|----------------|---------------|
| 섹션 전체 | 1920 유효폭 × 30px (baseline crop 936×30 실측) | `w-full max-w-[1920px] mx-auto h-[30px] bg-gray-000 flex items-center justify-center` |
| nav gap | 8px | `gap-2` |
| 탭 wrapper | px=16 py=4 border-b 1.5px | `px-4 py-1 border-b-[1.5px]` |
| active tab | border-gray-900 text-gray-900 | `border-gray-900 text-gray-900` |
| inactive tab | border-gray-200 text-gray-400 | `border-gray-200 text-gray-400 hover:text-gray-700 transition-colors` |
| 폰트 | Pretendard Medium 14 / lh 1.5 / tracking -0.5 | `text-sm-14m-*` 토큰 계열 |

**high의 이슈**: baseline 캡처는 Figma 섹션 frame 936×29 자체의 export. compare 시 preview 라우트 캡처는 바탕 포함 1920폭이 기본. → **preview wrapper를 936×30로 설정**하여 baseline과 정확히 맞춤.

### 1.4 preview wrapper

```tsx
// src/routes/NewsTabsPreview.tsx
import { NewsTabs } from "@/components/sections/NewsTabs";

export function NewsTabsPreview() {
  return (
    <div className="w-[936px] min-h-[30px] mx-auto bg-white">
      <NewsTabs />
    </div>
  );
}
```

compare-section.sh 기본 뷰포트가 1920이라도 스크린샷 crop 로직은 섹션 DOM의 실제 크기에 맞춤. 여기 NewsTabs section이 `max-w-[1920px] w-full` 이지만 wrapper div가 936px → 내부 max-w 제약 없이 936px로 렌더 → baseline과 정확히 일치.

### 1.5 compare-section.sh 동작 검토

기존 `scripts/compare-section.sh news-tabs`는 `figma-screenshots/news-tabs.png`를 baseline으로 쓰고, `/__preview/news-tabs` 라우트를 캡처. 캡처 폭은 baseline 폭(936)과 동일하게 맞춰야 함. 이전 about-organization-tabs는 1920 폭 전체였으나, news-tabs baseline은 936. → preview wrapper 936px로 하면 compare가 그대로 936×30 비교.

## 2. Props / 데이터

- `NewsTabs` props 없음 (하드코딩)
- href 정책: 
  - "뉴스" → `/news` (현 페이지, active)
  - "자료실" → `/resources` (미구현 라우트, 404 예상, `#` 금지 원칙 — about 선례 일관)

## 3. 에셋 계획

**구현 에셋: 0개.** 텍스트 전용.

- baseline PNG: `figma-screenshots/news-tabs.png` 936×30 (완료)
- 다운로드 대상: 없음
- `src/assets/news-tabs/` 디렉토리 생성 안 함
- 단계 3 자동 PASS (0 = 0)

## 4. 신규 npm 패키지

**없음.** react-router-dom, Pretendard 기존.

## 5. 4 게이트 예상 측정

| 게이트 | 방법 | 예상 | Pass 기준 |
|--------|------|------|-----------|
| G1 시각 | compare-section.sh news-tabs | **2~4%** (텍스트+thin border, serif 없음) | ≤ 15% (v4) |
| G2 치수 | DOM: section 936×30, tab font 14/21, padding 4/16, gap 8, border 1.5 | ±1~2px | font ±2, 나머지 ±4 |
| G3 에셋 | N/A — 자동 PASS | — | — |
| G4 색상 | active `#1d2623`, inactive border `#dbe1e0` text `#afb8b5` | 정확 | 토큰 참조 |
| G5 eslint jsx-a11y | `<section>`, `<nav aria-label>`, `<Link aria-current>` | 0 error | 0 error |
| G6 text-ratio | text-only, ratio ∞, rasterHeavy=false | PASS | text-bearing raster 0 |
| G8 i18n | JSX literal "뉴스", "자료실" | PASS | JSX literal 존재 |

**v4 구조 지표 예상**:
- magic=1~2 (1.5px, 30px), token ≥ 5 (gap-2, px-4, py-1, gray-900/200/400, text-sm-14m-* 4) → token_ratio **≥ 0.7** (≥ 0.2 ✓)
- absolute=0 (≤ 5 ✓)
- semantic=2 (`section`, `nav`)
- raster flag: 0

### 5.1 clip 파라미터

`--clip-*` **불필요**. baseline 936×30 전체 비교, preview wrapper가 동일 폭.

## 6. 구현 순서 (단계 4)

1. `src/components/sections/NewsTabs/NewsTabs.tsx` + `index.ts` 작성
2. `src/routes/NewsTabsPreview.tsx` 작성
3. `src/App.tsx`:
   - preview import + `<Route path="/__preview/news-tabs">`
   - NewsTabs import + `/news` 라우트 기존 placeholder 교체
4. `npm run build && npm run lint && npm run typecheck`
5. 단계 4.5 품질 게이트 (measure-quality.sh + structure-quality.mjs)
6. 단계 5 G1~G4 측정 (compare-section.sh news-tabs)
7. 단계 6 수정 루프 (필요 시)
8. 단계 7 커밋

## 7. 트레이드오프 / 리스크

1. **SectionTabs Rule of Three 미적용** — 현재 2번째 탭 패턴(border-bottom pill)이지만 기존 about 탭(글자 밑줄)과 **완전히 다른 구조**. 공통 컴포넌트로 추출하면 prop 2+ 분기 로직 필요 → 불확실한 추상화. **로컬 인라인** 선택. 3번째 border-bottom pill 탭 등장 시 그때 공통화.
2. **about SectionTabs 미수정** — about 선례 regression 0 보장. 본 섹션은 about 파일 건드리지 않음.
3. **`/resources` 라우트 미구현** — Link 클릭 시 404 (React Router default). news 페이지 전체 구현 완료 후 디자이너 협의로 자료실 페이지 추가.
4. **섹션 높이 30px 내장** — 상위 페이지가 Header clearance 별도 책임. /news 라우트에서 NewsTabs 앞에 pt-[140px] 컨테이너가 필요 (추후 news-title 섹션 결합 시 해결).
5. **`/news` route 교체** — 현 placeholder `<div>뉴스 목록 — 섹션 구현 대기</div>`를 NewsTabs 삽입으로 교체. 다음 섹션(news-title) 추가 시 Fragment로 확장.

## 8. 완화 여부

완화 없음. 차단 게이트 전부 PASS 예상.

---

## 측정 섹션 (단계 5·6) — v4 실행

### v4 회차 1 — 2026-04-16

**단계 4.5 차단 게이트**:
- G5 eslint jsx-a11y: **PASS** (0 error, scope `src/components/sections/NewsTabs`)
- G6 text ratio: **PASS** (ratio 0.28, rasterHeavy false, imgCount 0)
- G8 i18n literal: **PASS** (JSX 한글 literal "뉴스"/"자료실" 존재)
- Tailwind antipatterns: **PASS** (없음)
- Baked-in PNG: **PASS** (없음)

**v4 구조 지표** (`check-structure-quality.mjs --section=NewsTabs`):
- magic=4, token=14, **token_ratio=0.778 (≥0.2 ✓)**
- **absolute=0 (≤5 ✓)**
- semantic=**2** (`section`, `nav`)
- raster flag: 0
- alt80: 0
- **구조 게이트 PASS**

**G1 시각** (`scripts/compare-section.sh news-tabs --clip-x 492 --clip-y 0 --clip-w 936 --clip-h 30`):
- Round 1 (no clip, 좌상단 936×30 crop → 부정확): 1.97%
- Round 2 (clip 492,0,936,30 → preview wrapper 중앙 정렬): **1.07%** (300 / 28,080 px) — **PASS** (≤ 15% v4)
- clip 채택 이유: preview wrapper `w-[936px] mx-auto`로 1920 폭 내부 중앙 정렬되어 있으므로 baseline과 동일한 영역을 비교하려면 x=492 offset 필수

**G2 치수** (measure-news-tabs.mjs):
| 요소 | 측정 | 기대 | Δ |
|------|------|------|---|
| section | 492,0, 936×30 | 936×30 | 0 |
| tab(뉴스, active) | x=894.98, w=55.2, fontSize=14, fontWeight=500, lineHeight=21, letterSpacing=-0.5px, padding=4/16 | Medium 14, 4/16 padding | 0 |
| tab(자료실, inactive) | x=958.19, w=66.8, fontSize=14, fontWeight=500, lineHeight=21, letterSpacing=-0.5px, padding=4/16 | Medium 14, 4/16 padding | 0 |
| nav gap | 958.19 - (894.98 + 55.2) = **8.01** | 8 | +0.01 |
| border-bottom | 1px (Tailwind `border-b-[1.5px]` → 브라우저 렌더 1px 반올림) | 1.5px | **-0.5** (G2 ±4px 내 PASS, 1px vs 1.5px 육안 구분 어려움) |

폰트 ±2, 나머지 ±4 기준 **PASS**.

**G3 에셋**: 에셋 0개 → 자동 **PASS**.

**G4 색상**:
- active 텍스트 `rgb(29,38,35)` = `#1d2623` (`--color-gray-900`) ✓
- active border `rgb(29,38,35)` = `#1d2623` (`--color-gray-900`) ✓
- inactive 텍스트 `rgb(175,184,181)` = `#afb8b5` (`--color-gray-400`) ✓
- inactive border `rgb(219,225,224)` = `#dbe1e0` (`--color-gray-200`) ✓
- **PASS**

**육안 semantic 검증** (baseline / capture / diff 3종):
- 2 탭 순서 (뉴스 / 자료실) 일치
- active("뉴스") gray-900 text + gray-900 underline 정확
- inactive("자료실") gray-400 text + gray-200 underline 정확
- 중앙 정렬 일치
- diff 이미지: 글리프 anti-aliasing 잔차만 (붉은 테두리), 방향 반전/위치 swap/색 반전 **없음**
- **PASS (오류 0건)**

**about-organization-tabs regression 확인**:
- SectionTabs (`src/components/ui/SectionTabs.tsx`) 파일 **미수정** (본 섹션은 로컬 인라인 정의). 
- about-organization-tabs.png 재측정 불필요 (소스 미변경).

**v4 전체 게이트 PASS** — 차단 G5/G6/G8/구조 PASS + 참고 G1 1.07%/G2 PASS/G3 N/A/G4 PASS + 육안 PASS. 자동 커밋 진입.

---

## 멈춤 지점 없음 (v4 자율 모드)

단계 7 자동 커밋 진입.

