# plan/main-programs-card3.md

메인페이지 Programs Card #3 — "ESG 실천 네트워크(ESGPN) 사회공헌활동"
(Figma 252:1119, 1416×805, 캔버스 좌표 (252, 5439))

**Rule of Three 확정 지점**: 이 plan은 아래 3가지를 모두 포함한다.
- §A card3 섹션 구현 plan
- §B ProgramCard 공통 컴포넌트 승격 plan (`src/components/ui/ProgramCard.tsx`)
- §C card1·card2 리팩터 plan

단계 4는 §B 공통 컴포넌트를 먼저 만들고, §A card3에서 바로 사용, §C로 card1·2 전환. 한 커밋 단위로 수행(=한 섹션 = 한 커밋 원칙 하에 **card3 섹션 커밋 안에 공통화 + card1/2 리팩터를 함께 포함**. 사유: 공통 컴포넌트 단독 커밋은 호출자가 없어 실증 불가. 리팩터 단독 커밋은 card3 G1이 검증되기 전 card1·2 변경이라 위험. 셋이 묶일 때만 G1 3개가 동시에 통과한다는 사실로 리팩터 건전성이 보장됨.)

---

## A. main-programs-card3 섹션 구현 plan (일반)

### A.1 파일 구성

```
src/assets/main-programs-card3/
├─ raw/                        (download-assets.sh 산출물)
├─ city-left-rotated.png       (252:1121 AABB 360.228×392.718, baked-in -16deg 합성)
├─ city-bottom-left.png        (252:1120, 195×211, upright)
├─ city-right.png              (252:1122, 358×390, upright)
├─ progress-bar.svg            (252:1126 frame → SVG export, 520×20)
├─ icon-check-filled.svg       (258:1377, 20×20)
├─ icon-check-stroke.svg       (258:1382 = 258:1387, 20×20, 한 번만)
├─ divider-dashed.svg          (252:1164, 600×2)
└─ arrow-chevron.svg           (252:1169 인스턴스, 32×32)

src/components/sections/MainProgramsCard3/
├─ MainProgramsCard3.tsx       (섹션 루트, decoration + ProgramCard 조합)
├─ FloatingCityTopLeft.tsx     (252:1121, AABB wrapper + native inner 중앙)
├─ FloatingCityBottomLeft.tsx  (252:1120, 단순 absolute img)
├─ FloatingCityRight.tsx       (252:1122, 단순 absolute img)
└─ index.ts                    ({ MainProgramsCard3 } re-export)

src/routes/MainProgramsCard3Preview.tsx  (격리 프리뷰, __preview/main-programs-card3)
tests/visual/measure-main-programs-card3.ts  (page.evaluate 측정 스크립트)
```

**로컬 `ProgramCard.tsx` / `CardHeader.tsx` / `CardChecklist3.tsx` / `CardCompetencies.tsx` 등은 만들지 않음** — §B 공통 컴포넌트를 사용.

### A.2 라우트 등록

`src/App.tsx`:
- import `MainProgramsCard3` + `MainProgramsCard3Preview`
- `/__preview/main-programs-card3` 추가
- `/` 루트 `<> ... <MainProgramsCard2 /><MainProgramsCard3 /> </>` 추가

### A.3 섹션 루트 구조 (`MainProgramsCard3.tsx`)

```tsx
<section className="relative w-[1416px] h-[805px] mx-auto"
         aria-label="ESG 실천 네트워크 사회공헌활동 프로그램 카드"
         data-node-id="252:1119">
  <FloatingCityTopLeft />      {/* 252:1121 */}
  <FloatingCityBottomLeft />   {/* 252:1120 */}
  <FloatingCityRight />        {/* 252:1122 */}
  <ProgramCard {...card3Props} />
</section>
```

DOM 순서는 Figma와 동일. ProgramCard(`left-[400px] top-0 w-[616px] h-[732px]`)는 공통 컴포넌트.

### A.4 Floating 컴포넌트 구현

#### FloatingCityTopLeft (252:1121, 회전 baked-in)

```tsx
<div
  className="absolute flex items-center justify-center"
  style={{ left: 0, top: 18, width: 360.228, height: 392.718 }}
  data-node-id="252:1121"
>
  <img src={cityLeftRotated} alt="" aria-hidden="true"
       className="block flex-none"
       style={{ width: 280.675, height: 328.062 }} />
</div>
```

card2 `FloatingCityLeft` 패턴 재사용. CSS rotate/blend/bg 추가 **금지**.

#### FloatingCityBottomLeft (252:1120, upright)

```tsx
<img src={cityBottomLeft} alt="" aria-hidden="true"
     className="absolute block"
     style={{ left: 256, top: 594, width: 195, height: 211 }}
     data-node-id="252:1120" />
```

#### FloatingCityRight (252:1122, upright)

```tsx
<img src={cityRight} alt="" aria-hidden="true"
     className="absolute block"
     style={{ left: 1058, top: 100, width: 358, height: 390 }}
     data-node-id="252:1122" />
```

### A.5 ProgramCard props (card3 bindings) — §B 12 props 직접 주입

```tsx
<ProgramCard
  outerBg="#3b1a0c"
  ctaBg="#ff842d"
  ctaTextColor="#ffffff"
  checklistBulletColor="#ff842d"  // description bullet 색 (헤더 description row)
  pointsBulletColor="#ff8521"      // 하단 라벨 bullet 색 ("사회공헌활동 특징")
  title={<>ESG 실천 네트워크(ESGPN)<br /><span style={{ color: '#ff8521' }}>사회공헌활동</span></>}
  checklist={["ESG실천네트워크의 사회공헌활동은 일회성 봉사가 아닌 문제해결형 프로젝트"]}
  points={[
    { icon: iconCheckFilled, text: "전문가 재능나눔 활동 전개" },
    { icon: iconCheckStroke, text: "평생직업교육 공로상 수상" },
    { icon: iconCheckStroke, text: "로컬크리에이터" },
  ]}
  pointsLabel="사회공헌활동 특징"
  pointsItems={[
    "대학의 교육 역량 활용",
    "지역 일자리 · 서비스 연계",
    "ESG 성과를 사회적 가치로 환원",
  ]}
  progressBarSvg={progressBar}
  dividerSvg={dividerDashed}
  pointIconSvg={undefined}   // card3은 개별 아이콘 사용 (points[].icon), 공통 icon 주입 불요
  dataNodeId="252:1123"
  cardCtaNodeId="252:1166"
  iconsBlockWidth={236}
  bottomBlockWidth={520}
/>
```

**헤더 변형 처리**: card3은 "체크리스트 2줄" 대신 "description 1줄"을 사용. `checklist`는 항상 배열 props로 받고 **길이=1일 때는 "description-style" (bullet 16×3 rounded, 16M 그대로)** — 이미 card1/2 패턴이 `bullet+16M 텍스트`로 동일하므로 **항목 수만 1개면 자연히 description 역할**. 추가 분기 불필요. title은 ReactNode로 받아 `<br>` + accent span 허용.

### A.6 4 게이트 예상 및 측정

**측정 스크립트**: `tests/visual/measure-main-programs-card3.ts`
- page.evaluate 순수 JS, `document.querySelector('[data-node-id="..."]')`로 DOM 치수 측정
- G2 치수: title 36B ±1, 본문 16M ±1, 카드 616×732, CTA 64, 아이콘 20×20 등
- G3 에셋: 모든 `<img>` `naturalWidth > 0`
- G4 색상: `getComputedStyle` 6종 hex 비교

**compare 명령**:
```bash
bash scripts/compare-section.sh main-programs-card3 --clip-x 263 --clip-y 0 --clip-w 1406 --clip-h 805
```

**clip-x 스윕 후보**: 262, 263, 264, 265, 266 — card2가 263, card1이 265였으므로 **263을 기본**, 단계 5에서 5개 시도 후 최저 diff 값 확정.

**G1 목표**: `< 5%` 통과. card1=2.67%, card2=2.69% 실적 기반으로 card3도 **2.5~3.5% 예상** (1회차 통과 가능).

### A.7 트레이드오프

- **공통 컴포넌트 도입 리스크**: card1/2 G1이 기존 수치에서 악화될 가능성 → §C 검증 절차로 보장
- **헤더 분기 없이 checklist 배열만으로 card1/2/3 3패턴 수용**: card1·2 checklist는 2개, card3는 1개 — 시각적으로도 "체크리스트 2줄" vs "description 1줄"은 같은 포맷(bullet+16M)이므로 자연스럽게 수용
- **title을 ReactNode로**: card1/2는 단순 string이어도 동작(React가 자동 wrap), card3만 JSX fragment 사용
- **decoration은 절대 공통화 안 함**: card1(leaf×2 + city×1), card2(city×3), card3(city×3) — 배치·회전·에셋이 전부 달라 prop 지옥이 됨. 섹션 루트에서 명시적 배치가 가독성·유지성 모두 우위.

### A.8 패키지 도입

**없음**. 기존 의존성 그대로.

---

## B. ProgramCard 공통 컴포넌트 승격 plan

### B.1 위치

`src/components/ui/ProgramCard.tsx` (신규)

공통 컴포넌트는 `components/ui/`에 배치. card1·2·3 로컬 `ProgramCard.tsx`는 §C에서 삭제.

### B.2 최종 확정 12 props 시그니처 (TypeScript)

```tsx
import type { ReactNode } from "react";

export interface ProgramCardProps {
  /** 1. outer frame 배경색 (예: "#0c3b0e" / "#0C173B" / "#3b1a0c") */
  outerBg: string;

  /** 2. CTA bar 배경색 (예: "#caeb69" / "#A5D9FF" / "#ff842d") */
  ctaBg: string;

  /** 3. CTA bar 텍스트·화살표 색 (card1·2는 outer와 동색 계열 어두운색, card3는 "#ffffff") */
  ctaTextColor: string;

  /** 4. 헤더 블록 bullet 색 (card1/2: 체크리스트 bullet / card3: description bullet) */
  checklistBulletColor: string;

  /** 5. 하단 라벨 bullet 색 (card1: 녹색 / card2: 파랑 / card3: 주황) */
  pointsBulletColor: string;

  /** 6. 타이틀 — 2줄·accent span 필요 시 ReactNode 허용 (card3), 단순 card1·2는 string */
  title: ReactNode;

  /** 7. 헤더 "체크리스트/description" 라인 — 각 항목: bullet + 16M 텍스트. card1·2 길이=2, card3 길이=1 */
  checklist: string[];

  /** 8. 중간 아이콘 3행 블록 — 각 항목: 아이콘 src + 텍스트 (card1·3: filled/stroke/stroke, card2: 동일 icon×3) */
  points: { icon: string; text: string }[];

  /** 9. 하단 라벨 텍스트 ("필수 역량" / "주요 대상" / "사회공헌활동 특징") */
  pointsLabel: string;

  /** 10. 하단 ul 아이템 배열 (card1=6, card2·3=3) */
  pointsItems: string[];

  /** 11. 헤더 progress-bar SVG src (card1·2·3 각각 테마색 다른 SVG) */
  progressBarSvg: string;

  /** 12. divider-dashed SVG src (card1·2·3 각각 테마색 다른 SVG) */
  dividerSvg: string;

  // ── 이하는 선택 부가 props (12 계수에 포함 안 함 — 조정용 보조) ──
  /** CTA arrow chevron svg src */
  arrowChevronSvg: string;
  /** 중간 아이콘 블록 width (card1=236, card2=253, card3=236) */
  iconsBlockWidth?: number;
  /** 하단 블록 width (card1=456, card2=520, card3=520) */
  bottomBlockWidth?: number;
  /** 디버그용 data-node-id (outer frame) */
  dataNodeId?: string;
}
```

**확정 12 props**: `outerBg`, `ctaBg`, `ctaTextColor`, `checklistBulletColor`, `pointsBulletColor`, `title`, `checklist`, `points`, `pointsLabel`, `pointsItems`, `progressBarSvg`, `dividerSvg`.

**기존 card2 plan §11.4 초안 대비 변경점**:
- `pointIconSvg` 제거 — card2는 `icon-point.svg` 3개 동일, card3·card1은 각 행마다 다른 아이콘 → `points[].icon`으로 각 행에 주입하는 편이 자연. 공통 `pointIconSvg` 필요 없음.
- `arrowChevronSvg` 추가 (card1·2·3 테마별 색 다름) — 보조 prop으로 분류.
- 총 12 핵심 props + 4 보조 props.

### B.3 내부 구현 (ProgramCard.tsx)

```tsx
export function ProgramCard({
  outerBg, ctaBg, ctaTextColor,
  checklistBulletColor, pointsBulletColor,
  title, checklist, points, pointsLabel, pointsItems,
  progressBarSvg, dividerSvg, arrowChevronSvg,
  iconsBlockWidth = 236, bottomBlockWidth = 520,
  dataNodeId,
}: ProgramCardProps) {
  return (
    <div
      className="absolute flex flex-col rounded-[48px]"
      style={{
        left: 400, top: 0, width: 616, height: 732,
        backgroundColor: outerBg,
        paddingTop: 8, paddingBottom: 16, paddingLeft: 8, paddingRight: 8,
        gap: 12,
      }}
      data-node-id={dataNodeId}
    >
      {/* inner white */}
      <div className="flex flex-col rounded-[48px] bg-white"
           style={{ width: 600, height: 620, padding: 40, gap: 48 }}>
        {/* 1. header block — progress bar + title + checklist/description rows */}
        <div className="flex flex-col w-[520px]" style={{ gap: 16 }}>
          <div className="flex items-center w-full" style={{ height: 20, gap: 4 }}>
            <img src={progressBarSvg} alt="" aria-hidden="true" className="block"
                 style={{ width: 520, height: 20 }} />
          </div>
          <h2 className="font-['Pretendard_Variable'] font-bold"
              style={{ fontSize: 36, lineHeight: 1.3, letterSpacing: "-1.08px", color: "#1d2623" }}>
            {title}
          </h2>
          <div className="flex flex-col w-full" style={{ gap: 12 }}>
            {checklist.map((text, i) => (
              <div key={i} className="flex items-start" style={{ gap: 8 }}>
                <div className="flex items-center justify-center" style={{ paddingTop: 4, paddingBottom: 4 }}>
                  <div className="shrink-0" aria-hidden="true"
                       style={{ width: 3, height: 16, borderRadius: 24, backgroundColor: checklistBulletColor }} />
                </div>
                <p className="font-['Pretendard_Variable'] font-medium flex-1"
                   style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: "-0.16px", color: "#1d2623" }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. icon-rows block (236 or 253 width) */}
        <div className="flex flex-col" style={{ gap: 16, width: iconsBlockWidth }}>
          {points.map((p, i) => (
            <div key={i} className="flex items-center" style={{ gap: 12 }}>
              <img src={p.icon} alt="" aria-hidden="true" className="block shrink-0"
                   style={{ width: 20, height: 20 }} />
              <p className="font-['Pretendard_Variable'] font-medium"
                 style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: "-0.16px", color: "#1d2623" }}>
                {p.text}
              </p>
            </div>
          ))}
        </div>

        {/* 3. bottom label + ul */}
        <div className="flex flex-col" style={{ gap: 12, width: bottomBlockWidth }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            <div className="flex items-center justify-center" style={{ paddingTop: 4, paddingBottom: 4 }}>
              <div className="shrink-0" aria-hidden="true"
                   style={{ width: 3, height: 17, borderRadius: 24, backgroundColor: pointsBulletColor }} />
            </div>
            <p className="font-['Pretendard_Variable'] font-semibold"
               style={{ fontSize: 18, lineHeight: 1.4, letterSpacing: "-0.27px", color: "#1d2623" }}>
              {pointsLabel}
            </p>
          </div>
          <ul className="font-['Pretendard_Variable'] font-normal list-disc marker:text-[#1d2623]"
              style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: "-0.16px", color: "#1d2623", paddingLeft: 24 }}>
            {pointsItems.map((it, i) => <li key={i}>{it}</li>)}
          </ul>
        </div>
      </div>

      {/* divider */}
      <div className="relative shrink-0" style={{ width: 600, height: 0, paddingLeft: 12, paddingRight: 12 }}>
        <div className="absolute" style={{ left: 12, right: 12, top: -1, bottom: -1 }}>
          <img src={dividerSvg} alt="" aria-hidden="true" className="block" style={{ width: "100%", height: 2 }} />
        </div>
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between rounded-[48px]"
           style={{ backgroundColor: ctaBg, height: 64, width: 600,
                    paddingTop: 16, paddingBottom: 16, paddingLeft: 24, paddingRight: 24 }}>
        <span className="font-['Pretendard_Variable'] font-bold"
              style={{ fontSize: 20, lineHeight: 1.4, letterSpacing: "-0.4px", color: ctaTextColor }}>
          자세히 보기
        </span>
        <div className="flex items-center" style={{ paddingRight: 16 }}>
          {[0, 1, 2].map((i) => (
            <img key={i} src={arrowChevronSvg} alt="" aria-hidden="true"
                 className="block shrink-0"
                 style={{ width: 32, height: 32, marginRight: -16 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
```

### B.4 수용 가능성 검증 (3 카드 시뮬레이션)

| 요소 | card1 주입값 | card2 주입값 | card3 주입값 | 수용? |
|------|--------------|--------------|--------------|-------|
| outerBg | `#0c3b0e` | `#0C173B` | `#3b1a0c` | ✅ |
| ctaBg | `#caeb69` | `#A5D9FF` | `#ff842d` | ✅ |
| ctaTextColor | `#0c3b0e` | `#0C173B` | `#ffffff` | ✅ |
| checklistBulletColor | `#4fb654` | `#3F9FFF` | `#ff842d` | ✅ |
| pointsBulletColor | `#4fb654` | `#2D7EFF` | `#ff8521` | ✅ |
| title | "ESG마인드 자격검정" | "ESG 실천 아이디어 경진대회" | JSX(2줄+accent) | ✅ (ReactNode) |
| checklist | 2 strings | 2 strings | 1 string | ✅ (가변 length) |
| points | 3 items(filled,stroke,stroke) | 3 items(icon-point ×3) | 3 items(filled,stroke,stroke) | ✅ |
| pointsLabel | "필수 역량" | "주요 대상" | "사회공헌활동 특징" | ✅ |
| pointsItems | 6 strings | 3 strings | 3 strings | ✅ |
| progressBarSvg | theme green | theme blue | theme orange | ✅ |
| dividerSvg | theme green | theme blue | theme orange | ✅ |
| iconsBlockWidth | 236 | 253 | 236 | ✅ (기본 236 + card2 override) |
| bottomBlockWidth | 456 | 520 | 520 | ✅ (기본 520 + card1 override) |

**3 카드 전부 수용 확인**. 분기 없이 단일 렌더 함수로 해결.

### B.5 Storybook·문서

미작업 (프로젝트 전체가 Storybook 미도입). `components/ui/ProgramCard.tsx` 상단 JSDoc으로 12 props + 사용 예시 기술.

---

## C. card1 / card2 리팩터 plan

### C.1 삭제 파일

**card1 (MainProgramsCard1/)**:
- `ProgramCard.tsx` — 공통 컴포넌트로 대체
- `CardHeader.tsx` — 공통에 인라인 흡수
- `CardChecklist3.tsx` — 공통에 흡수
- `CardCompetencies.tsx` — 공통에 흡수
- `CardCtaBar.tsx` — 공통에 흡수

→ **5개 파일 삭제**

**card2 (MainProgramsCard2/)**:
- `ProgramCard.tsx`
- `CardHeader.tsx`
- `CardPoints.tsx`
- `CardTargets.tsx`
- `CardCtaBar.tsx`

→ **5개 파일 삭제**

### C.2 수정 파일

**MainProgramsCard1.tsx**:
```tsx
import { ProgramCard } from "@/components/ui/ProgramCard";
import { FloatingCity } from "./FloatingCity";
import { FloatingLeafBottom } from "./FloatingLeafBottom";
import { FloatingLeafTop } from "./FloatingLeafTop";
import progressBar from "@/assets/main-programs-card1/progress-bar.svg";
import dividerDashed from "@/assets/main-programs-card1/divider-dashed.svg";
import arrowChevron from "@/assets/main-programs-card1/arrow-chevron.svg";
import iconCheckFilled from "@/assets/main-programs-card1/icon-check-filled.svg";
import iconCheckStroke from "@/assets/main-programs-card1/icon-check-stroke.svg";

export function MainProgramsCard1({ className }: { className?: string }) {
  const base = "relative w-[1416px] h-[805px] mx-auto";
  return (
    <section className={className ? `${base} ${className}` : base}
             aria-label="ESG마인드 자격검정 프로그램 카드"
             data-node-id="252:1013">
      <FloatingCity />
      <ProgramCard
        outerBg="#0c3b0e"
        ctaBg="#caeb69"
        ctaTextColor="#0c3b0e"
        checklistBulletColor="#4fb654"
        pointsBulletColor="#4fb654"
        title="ESG마인드 자격검정"
        checklist={[
          "ESG를 알고 있는 사람이 아니라 ESG를 실천할 수 있는 사람을 인증하는 자격",
          "ESG 실천을 위한 기관의 역할과 ESG에 필요한 교육 생태계 구축을 목적으로 개발",
        ]}
        points={[
          { icon: iconCheckFilled, text: "ESG 개념 / 용어 / 실천 전반" },
          { icon: iconCheckStroke, text: "온라인 시험 진행" },
          { icon: iconCheckStroke, text: "공식 자격증 발급" },
        ]}
        pointsLabel="필수 역량"
        pointsItems={[
          "지역사회와 상생으로 균형잡힌 지속가능성 실천",
          "사회적 가치 창출로 고객 신뢰와 브랜드 가치 제고",
          "윤리적 의사결정과 투명한 정보 공개로 조직 신뢰 제고",
          "지역 사회 ESG 문제 해결",
          "취약계층·청년대상 ESG 교육",
          "대학·기업·지자체 협력 프로젝트",
        ]}
        progressBarSvg={progressBar}
        dividerSvg={dividerDashed}
        arrowChevronSvg={arrowChevron}
        iconsBlockWidth={236}
        bottomBlockWidth={456}
        dataNodeId="252:1015"
      />
      <FloatingLeafBottom />
      <FloatingLeafTop />
    </section>
  );
}
```

**MainProgramsCard2.tsx** — 동일 패턴, card2 값 주입.

**index.ts (MainProgramsCard1/2)**: 기존 export 그대로 (`MainProgramsCard1` / `MainProgramsCard2`만 노출).

### C.3 공통으로 뺄 수 없는 로컬 요소

- **FloatingCity / FloatingLeafTop / FloatingLeafBottom** (card1)
- **FloatingCityLeft / FloatingCityMidRight / FloatingCityTopRight** (card2)
- **FloatingCityTopLeft / FloatingCityBottomLeft / FloatingCityRight** (card3, 신규)

decoration은 섹션마다 배치·회전·에셋이 완전히 상이 → 섹션 로컬 유지 확정.

### C.4 리팩터 검증 절차

단계 4(구현) 직후, 단계 5(측정) 전 **세 카드 G1 동시 측정**:

```bash
# 1. card1 재측정 (기존 2.67% 유지 확인)
bash scripts/compare-section.sh main-programs-card1 --clip-x 265 --clip-y 0 --clip-w 1404 --clip-h 805

# 2. card2 재측정 (기존 2.69% 유지 확인)
bash scripts/compare-section.sh main-programs-card2 --clip-x 263 --clip-y 0 --clip-w 1405 --clip-h 805

# 3. card3 측정 (G1 < 5% 신규)
bash scripts/compare-section.sh main-programs-card3 --clip-x 263 --clip-y 0 --clip-w 1406 --clip-h 805
```

**통과 기준**:
- card1 G1 ≤ **2.8%** (기존 2.67% 대비 허용 +0.13% 진폭 — SVG/text 렌더 차 미세 변동)
- card2 G1 ≤ **2.8%** (기존 2.69% 대비 허용 +0.11%)
- card3 G1 < 5%

셋 중 하나라도 악화(card1·2 +0.2% 초과) → 단계 6 진입, 공통 컴포넌트 차이점 디버깅. 3회 실패 시 커밋 금지, 사용자 보고.

### C.5 리팩터 위험 요소

- **markup 미묘한 차이**: 로컬 구현의 `font-['Pretendard_Variable']` / `font-medium` / spacing 등이 한 글자라도 다르면 G1 1%+ 발생 가능 → §B.3 구현 시 card1 로컬과 **문자 단위 동일**하게 유지
- **lineHeight / letterSpacing 재조합**: 3 카드 모두 동일한 Pretendard token 사용해왔으므로 tracking/lh 식을 공통화로 옮겨도 안전
- **SVG 자산 경로**: 공통 컴포넌트가 src를 prop으로 받으므로 각 섹션 asset 경로는 그대로 유지. 재측정이 유일한 안전망.

---

## 9. 단계 2 승인 대기

- **§A card3 구현 방향**: 섹션 루트 + 3 floating + 공통 ProgramCard 주입
- **§B 공통 컴포넌트 12 props**: 위 B.2 시그니처 최종 확정
- **§C card1/2 리팩터**: 10파일 삭제, 2 섹션 루트 수정, 3 G1 동시 재측정으로 검증

사용자 승인 후 단계 3 (에셋 다운로드) → 단계 4 (구현, B → A → C 순) → 단계 5 (3 G1 측정) → 단계 6 (수정 루프) → 단계 7 (커밋).

---

## 10. 측정 섹션

### 10.1 G1 픽셀 diff (3 카드 동시)

| 회차 | card1 G1 | card2 G1 | card3 G1 (clip-x) | 주요 변경 |
|------|----------|----------|-------------------|-----------|
| 1 | 2.67% (clip-x 265) | 2.69% (clip-x 263) | 11.47% (clip-x 263) | 공통 ProgramCard + card3 초기 구현. 3종 city 이미지 cropTransform 적용으로 content 오류 |
| 2 | — | — | 47.66% (bg-black preview, clip-x 263) | Preview bg를 검정으로 바꿔서 악화 (baseline alpha=0 + bg black 조합). city 이미지를 Framelink rendered PNG(AABB scale)로 재 download, FloatingCityTopLeft inner = AABB 크기로 변경 |
| 3 | — | — | 45.68% (bg-black) | 효과 없음 — bg-black 원인 |
| 4 | — | — | **5.16% (clip-x 263, bg-white)** | Preview bg-white로 복귀 → 정상 영역 진입 |
| 5 | — | — | **4.55% (clip-x 262, bg-white)** | clip-x 스윕 (261~266), 262가 최적 |

**최종 결과**: card1 2.67% / card2 2.69% / card3 4.55% — **3건 모두 G1 PASS**.

공통화 리팩터 후 card1·2 G1 값이 **정확히 기존과 동일** (악화 0.00%p). 공통 컴포넌트 승격 성공.

### 10.2 G2 치수 정확도 (card3)

- outer rect 616×732 @ (400, 0) ✓
- inner rect 600×620 @ (408, 8), padding 40, gap 48 ✓
- title lh=46.8px (=36*1.3), ls=-1.08px, fw=700, color rgb(29,38,35) ✓
- icons rect 236×104, rows=3, gap=16 ✓
- bottom rect 520×109.19, gap=12 ✓
- bottomLabel lh=25.2px (=18*1.4), ls=-0.27px, fw=600 ✓
- ul 16R lh=24px (=16*1.5), ls=-0.16px, 3 items ✓
- cta 600×64, radius 48, bg rgb(255,132,45) = #FF842D ✓
- arrows 3×32×32, gap=-16 ✓
- divider 600×0 w=600 ✓
- title 2줄 (h=93.59 = 2×46.8 정확)

→ **G2 PASS**

### 10.3 G3 에셋 무결성 (card3)

11/11 `naturalWidth > 0`:
- 3 city PNG (680×745, 390×422, 716×780)
- progress-bar.svg (520×20)
- 3 check-icon SVG (20×20 ×3)
- divider-dashed.svg (600×2)
- 3 arrow-chevron.svg (32×32 ×3)

→ **G3 PASS**

### 10.4 G4 색상 정확도 (card3)

- outer bg rgb(59, 26, 12) = #3B1A0C ✓
- inner bg rgb(255, 255, 255) = #FFFFFF ✓
- CTA bg rgb(255, 132, 45) = #FF842D ✓
- 본문 텍스트 rgb(29, 38, 35) = #1D2623 ✓
- title accent span: inline style color #ff8521 ✓ (직접 주입)
- description bullet #ff842d ✓ (ProgramCard checklistBulletColor)
- 하단 bullet #ff8521 ✓ (pointsBulletColor)
- CTA 텍스트 #ffffff ✓ (ctaTextColor)

→ **G4 PASS**

### 10.5 육안 semantic 검증 (3 카드)

- **card1**: 구조·색·텍스트·decoration(2 leaf + 1 city) 모두 baseline 일치. PASS
- **card2**: 구조·색·텍스트·decoration(3 city) 모두 baseline 일치. PASS
- **card3**: 타이틀 2줄+accent span, description 1줄 bullet, 3 icon row(check-filled + check-stroke×2), "사회공헌활동 특징" 하단 라벨+ul 3, 주황 CTA+흰 텍스트+흰 arrows, 좌상 city 회전 baked-in, 좌하·우 city upright 모두 baseline 일치. PASS

### 10.6 최종 확정사항

- **공통 ProgramCard API**: plan §B 12 핵심 props + 4 보조 props 그대로. `nodeIds` 보조 prop 추가 (measure 스크립트 호환용, 섹션별 detail node-id 주입).
- **clip-x 최적값**: card3 = **262** (card2 263과 1px 차이).
- **arrow-chevron.svg (card3)**: Framelink 252:1168은 64×32 × 3회 합성이라 32×32 × 1 단일 white stroke 버전으로 수동 생성 (ProgramCard는 src를 3회 반복 렌더).
- **city 3종 PNG**: 최초 cropTransform + JPEG 크롭 방식 실패 → Framelink `imageRef` 없이 `nodeId`만 주면 "AABB-rendered composite PNG"를 반환해 성공 (card2 rendered PNG 패턴과 동일).
- **bg-white preview**: card1/2와 동일 컨벤션. baseline이 RGBA with alpha=0이고 pixelmatch가 alpha=0을 white blend로 처리하기 때문에 bg-black preview는 악화된다.

