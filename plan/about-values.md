# plan/about-values.md — About Values 섹션 구현 계획

> 기반: `research/about-values.md`. 전략 **[A] 완전 HTML 재구성**.
> baseline: `figma-screenshots/about-values.png` (1920×722). 선례: `plan/about-mission.md`, `plan/about-header.md`.

## 1. 컴포넌트 구조

### 1.1 파일 레이아웃

```
src/
├─ components/
│  ├─ ui/
│  │  └─ HatchedDivider.tsx            ← 공통 승격 (from AboutMission)
│  └─ sections/AboutValues/
│     ├─ AboutValues.tsx               ← 섹션 엔트리 (export default)
│     ├─ ValueCard.tsx                 ← 로컬 (Rule of Three 첫 카운트)
│     └─ index.ts
├─ assets/about-values/
│  ├─ icon-1.png                       ← crop 144×141 톱니바퀴
│  ├─ icon-2.png                       ← crop 138×141 캡슐
│  ├─ icon-3.png                       ← crop 131×150 화살표
│  └─ icon-4.png                       ← crop 151×150 지구본
├─ routes/
│  └─ AboutValuesPreview.tsx           ← /__preview/about-values
└─ App.tsx                              ← 라우트 추가 + AboutMission import 경로 수정 (공통 승격 반영)
```

### 1.2 HatchedDivider 공통 승격 작업

**변경 파일 3개:**
1. **신규** `src/components/ui/HatchedDivider.tsx` ← AboutMission/HatchedDivider.tsx 내용 그대로 복사 (import 없음, 순수 SVG 컴포넌트)
2. **삭제** `src/components/sections/AboutMission/HatchedDivider.tsx`
3. **수정** `src/components/sections/AboutMission/AboutMission.tsx` import 1줄:
   ```tsx
   import { HatchedDivider } from "@/components/ui/HatchedDivider";
   ```

**범위 확인:**
- 시각·기능 변경 0. import 경로만 변경. docs §9 "다른 섹션 코드 수정 금지" 규칙의 예외에 해당 (공통 리팩토링/승격).
- 안전 검증: 이 plan 구현 후 `scripts/compare-section.sh about-mission` 재측정하여 diff 변화 없음을 추가 증명 (단계 6에서 수행 — 단계 5 측정에 포함).

### 1.3 AboutValues 트리

```tsx
<section className="relative w-[1920px] h-[722px] bg-white">
  <HatchedDivider className="absolute top-0 left-1/2 -translate-x-1/2" />

  {/* 2x2 grid — 카드 중심은 x=714, x=1205 */}
  <ValueCard
    icon={icon1} iconW={144} iconH={141}
    className="absolute left-[714px] top-[95px] -translate-x-1/2"
    title="선언을 넘어선 실천의 축적"
    descLine1="지속가능성은 구호가 아닌 교육과 실천의 반복으로 완성됩니다."
    descLine2="실천 방안을 발굴하고 행동으로 옮기는 프로세스를 구축합니다."
  />
  <ValueCard
    icon={icon2} iconW={138} iconH={141}
    className="absolute left-[1205px] top-[95px] -translate-x-1/2"
    title="차세대 ESG 전문인력 양성"
    descLine1="청년을 ESG 실천의 출발점이자 확산 주체로 세우고,"
    descLine2="체계적인 교육 및 프로그램을 통해 전문성을 갖춘 인재를 양성합니다."
  />
  <ValueCard
    icon={icon3} iconW={131} iconH={150}
    className="absolute left-[714px] top-[395px] -translate-x-1/2"
    title="사회의 새로운 행동기준 정립"
    descLine1="ESG를 기업만의 평가 지표가 아닌, 우리 사회 전체가 지켜야 할"
    descLine2="행동 기준으로 정의하고 이를 위한 활동 프로그램을 지원합니다."
  />
  <ValueCard
    icon={icon4} iconW={151} iconH={150}
    className="absolute left-[1205px] top-[395px] -translate-x-1/2"
    title="실천적 연대 플랫폼 구축"
    descLine1="대학, 산업체, 지역사회가 지속가능한 미래를 현실로 만들어가는"
    descLine2="네트워크 허브 역할을 수행하며, 사회공헌 모델을 제시합니다."
  />

  <HatchedDivider className="absolute bottom-0 left-1/2 -translate-x-1/2" />
</section>
```

### 1.4 ValueCard 구현

```tsx
type ValueCardProps = {
  icon: string;
  iconW: number;
  iconH: number;
  title: string;
  descLine1: string;
  descLine2: string;
  className?: string;
};

export function ValueCard({ icon, iconW, iconH, title, descLine1, descLine2, className = "" }: ValueCardProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* icon wrapper: fixed height (122 or 131 — 행별로 다름. 아이콘 native height 사용) */}
      <div className="flex items-end justify-center" style={{ height: iconH }}>
        <img src={icon} alt="" width={iconW} height={iconH} className="block" />
      </div>
      {/* icon → title gap */}
      <h3 className="mt-[33px] text-[22px] leading-[22px] font-bold text-[var(--color-gray-900)] whitespace-nowrap">
        {title}
      </h3>
      {/* title → desc gap */}
      <p className="mt-[22px] text-[16px] leading-[24px] text-[var(--color-gray-900)] text-center whitespace-nowrap">
        {descLine1}<br />{descLine2}
      </p>
    </div>
  );
}
```

- `whitespace-nowrap`: 줄바꿈을 `<br>`만으로 제어 (baseline line break 정확 일치)
- `text-center`: 설명 2줄 중앙정렬
- `items-center`: 아이콘·제목·설명 모두 카드 중심선 기준 정렬
- 카드 최상단은 아이콘 top이고, 카드 래퍼는 `-translate-x-1/2`로 centerX 기준 배치

## 2. Props / 데이터

- `AboutValues`: props 없음, 4 카드 데이터 하드코딩
- `ValueCard`: icon·크기·텍스트·className
- `HatchedDivider`: 기존 (className)

## 3. 스타일 매핑 (측정치 → CSS)

| 요소 | 측정치 | Tailwind |
|------|-------|---------|
| section | 1920×722 | `w-[1920px] h-[722px] bg-white relative` |
| top divider | offset y=0 | `absolute top-0 left-1/2 -translate-x-1/2` |
| bottom divider | offset y=721 | `absolute bottom-0 left-1/2 -translate-x-1/2` |
| 카드1 (좌상) | centerX=714, top=95 | `absolute left-[714px] top-[95px] -translate-x-1/2` |
| 카드2 (우상) | centerX=1205, top=95 | `absolute left-[1205px] top-[95px] -translate-x-1/2` |
| 카드3 (좌하) | centerX=714, top=395 | `absolute left-[714px] top-[395px] -translate-x-1/2` |
| 카드4 (우하) | centerX=1205, top=395 | `absolute left-[1205px] top-[395px] -translate-x-1/2` |
| 아이콘→제목 gap | 33px | `mt-[33px]` |
| 제목→설명 gap | 22px | `mt-[22px]` |
| 제목 | cap 18 → 22px Bold | `text-[22px] leading-[22px] font-bold` |
| 설명 | cap 15 → 16px Regular | `text-[16px] leading-[24px]` |
| 제목·설명 색 | `#1d2623` | `text-[var(--color-gray-900)]` |

### 3.1 카드 top offset 계산 검증

- 행1 아이콘 top = 95 (research §2)
- 행2 아이콘 top = 395 (research §2)
- 차이 = 300px. 행1 총 높이(95→328 = 233 end offset) + gap(66) = 299 ≈ 300 ✓

## 4. 에셋 계획 (Canvas-Asset 일치 4=4)

**구현 에셋: 4개 (crop PNG).**

| 파일 | crop from `about-full.png` | 크기 |
|------|---------------------------|------|
| `src/assets/about-values/icon-1.png` | (642, 1380, 786, 1521) | 144×141 |
| `src/assets/about-values/icon-2.png` | (1136, 1380, 1274, 1521) | 138×141 |
| `src/assets/about-values/icon-3.png` | (653, 1680, 784, 1830) | 131×150 |
| `src/assets/about-values/icon-4.png` | (1130, 1680, 1281, 1830) | 151×150 |

**생성 스크립트 (단계 3):**
```python
from PIL import Image
im = Image.open('figma-screenshots/about-full.png')
im.crop((642, 1380, 786, 1521)).save('src/assets/about-values/icon-1.png')
im.crop((1136, 1380, 1274, 1521)).save('src/assets/about-values/icon-2.png')
im.crop((653, 1680, 784, 1830)).save('src/assets/about-values/icon-3.png')
im.crop((1130, 1680, 1281, 1830)).save('src/assets/about-values/icon-4.png')
```

- RGBA 유지 (PIL crop default는 모드 유지). JPG 압축 금지 (§2.5)
- 단계 4에서 import: `import icon1 from "@/assets/about-values/icon-1.png?url"` (Vite) — 기존 project 패턴 따름 (mission 방식과 동일)

## 5. 신규 npm 패키지

**없음.**

## 6. 격리 라우트 (G1 캡처용)

```tsx
// src/routes/AboutValuesPreview.tsx
import { AboutValues } from "@/components/sections/AboutValues";

export function AboutValuesPreview() {
  return (
    <div className="w-[1920px] min-h-[722px] mx-auto bg-white">
      <AboutValues />
    </div>
  );
}
```

- `App.tsx`에 `<Route path="/__preview/about-values" element={<AboutValuesPreview />} />` 추가
- bg-white wrapper (§6.1 필수)
- Header/Footer 제외

## 7. 4 게이트 예상 측정

| 게이트 | 방법 | 예상 | Pass 기준 |
|--------|------|------|----------|
| G1 시각 | `scripts/compare-section.sh about-values` | **3.0~4.5%** (아이콘 crop edge + 텍스트 antialias) | <5% |
| G2 치수 | DOM: section 1920×722, 카드 centerX (714/1205), font 22/16, 아이콘 w/h | ±1~2px | font±1, 그 외 ±2 |
| G3 에셋 | 4 img `naturalWidth>0` | 144/138/131/151 | >0 |
| G4 색상 | computed rgb: 다크 #1d2623, divider #B1B9B6/#97A29E | 일치 | hex 일치 |

### 7.1 G1 regression 보호 (공통 승격 인한 mission 영향)

- HatchedDivider 공통 승격 후 `scripts/compare-section.sh about-mission` 재실행 → 기존 4.23% 이내 유지 확인 (변화 없어야 함, import 경로만 변경)
- 변화 있으면 즉시 롤백 후 재검토

### 7.2 clip 파라미터

floating 요소 없음 (풀폭 1920). `--clip-*` 불필요.

## 8. 구현 순서 (단계 4)

1. **공통 승격**: `src/components/ui/HatchedDivider.tsx` 신설 + 기존 파일 삭제 + AboutMission import 수정
2. `src/assets/about-values/` crop 생성 (Python PIL 4 파일)
3. `src/components/sections/AboutValues/ValueCard.tsx`
4. `src/components/sections/AboutValues/AboutValues.tsx` + `index.ts`
5. `src/routes/AboutValuesPreview.tsx`
6. `src/App.tsx` preview 라우트 추가
7. `npm run build && npm run lint`
8. 단계 5 측정 (values + mission 재측정)

## 9. 트레이드오프 / 리스크

1. **font-size 22/16 근사:** mission(28/16) 대비 제목이 작음 (cap 18 vs 22). 22px 시작, G1 불일치 시 20/24 후보 조정. About-header 선례 (140→152)처럼 글리프 폭 실측으로 역산 가능.

2. **아이콘 crop edge:** 10px 여유 포함했으나 baseline과 2~3px 어긋날 가능성. 미세 offset 조정은 `top-[{n}px]`로 카드별 시프트 가능.

3. **whitespace-nowrap + `<br>` 수동:** 설명 각 카드가 2줄 — 정확한 줄 경계에 `<br>` 삽입. baseline과 줄바꿈 위치 일치 목표.

4. **HatchedDivider 공통 승격의 regression risk:** import 경로만 변경이므로 시각 동일. 단계 5에서 mission 재측정으로 검증. 만약 variance 발생 시 즉시 복원.

5. **ValueCard 로컬 유지 (YAGNI):** 경진대회/자격검정에서 icon+title+desc 카드가 재등장할 가능성은 있으나 레이아웃·스타일 상이할 가능성 → 첫 카운트만 등록. Rule of Three 충족 시 승격.

6. **G1 <5% 규율:** 3회 수정 안에 통과. 미통과 시 즉시 사용자 보고.

## 10. 사용자 승인 요청 항목

- [ ] **`HatchedDivider` 공통 승격** (mission/values 동시 사용, Rule of Three 충족) — AboutMission import 1줄 수정 포함 OK?
- [ ] **`ValueCard`는 AboutValues 로컬로 시작** (Rule of Three 첫 카운트, 다음 페이지 등장 시 승격 평가) OK?
- [ ] 아이콘 4개 **baseline crop PNG 전략** (SVG 재생성 불가) OK? 10px 여유 포함.
- [ ] 제목 `22px Bold` / 설명 `16px Regular`, 줄바꿈 **`<br>` 수동** OK?
- [ ] 예상 G1 **< 5% (3.0~4.5% 기대)** 동의?
- [ ] 단계 5에서 **mission regression 재측정** 포함 OK?

---

## 측정 섹션 (단계 5·6에서 채워짐)

### 1회차 (2026-04-14)

- **about-values G1: 5.95%** (FAIL, 5% 초과)
- 육안 진단: 행2 카드 위치가 baseline 대비 내려감. 아이콘 crop 10px 여유로 아이콘 top이 baseline보다 10px 아래 렌더됨.
- **about-mission G1: 4.23%** (regression 0, HatchedDivider 공통 승격 안전 확인)

### 2회차 (2026-04-14) — 수정: 카드 top 보정

- 행1 top 95→85, 행2 top 395→385 (crop 10px 여유 위쪽 보정).
- **about-values G1: 4.28% PASS** (<5%)
- **G2 PASS**: 섹션 1920×722, 아이콘 centerX 714/1205 정확, render=native.
- **G3 PASS**: 4/4 img naturalWidth > 0 (144, 138, 131, 151).
- **G4 PASS**: color `rgb(29, 38, 35)` = #1d2623, divider 932×10 × 2 (top=0 / top=712).
- **육안 PASS**: 2×2 그리드 배치, 아이콘 매핑(톱니바퀴/캡슐/화살표/지구본) 정확, 방향 반전 없음, divider 상하 정상.

### HatchedDivider 공통 승격 영향
- `src/components/sections/AboutMission/HatchedDivider.tsx` → `src/components/ui/HatchedDivider.tsx` 이동
- AboutMission import 경로 1줄 변경
- **about-mission 재측정: 4.23%** (변동 0.00%p, 시각 완전 동일)

---

## 멈춤 지점

**단계 2 완료. 단계 3~7은 사용자 승인 후 별도 지시를 기다림.**
