# plan/contest-benefits.md — 경진대회 Benefits 섹션 구현 계획

> Phase 3 단계 2. `research/contest-benefits.md` 기반. 전략: **[A] HTML 재구성** (CTA 포함 전체 노드 살아있음).

## 1. 중요 결정 (사용자 확인 필요)

### 1.1 `BenefitCard` 공통 컴포넌트 승격 타이밍

- 304×203, 80px 아이콘 + 18SB 제목 + 14M 2줄 설명 카드. 이번 섹션 **6회 사용**.
- **옵션 A (권장·보수)**: `ContestBenefits/BenefitCard.tsx` **로컬** 구현. 다른 페이지(자격검정/메인)에서 재등장 확인 후 `src/components/ui/BenefitCard.tsx`로 승격. Rule of Three 엄격 준수 (섹션 내 N회는 기존 프로젝트 선례상 로컬 유지, `BulletCard`·`BulletList`와 동일 패턴).
- **옵션 B (과감)**: 즉시 `src/components/ui/BenefitCard.tsx`로 생성. 섹션 내 6회 사용 + 명확한 props 경계가 승격 정당화.
- **기본 계획: 옵션 A** — plan/contest-about §9가 "재등장 시 승격" 패턴으로 `BulletCard` 로컬 유지. 일관성.

### 1.2 CTA Container 분리 vs 통합

- Figma 트리상 `302:6592`는 `302:6515` (Benefits Body 래퍼) 자식. Benefits 섹션의 논리적 구성요소.
- **옵션 A (권장·통합)**: `ContestBenefits.tsx` 내부에 `<CtaBanner />` (로컬 컴포넌트)로 렌더. 한 라우트에서 측정. baseline `figma-screenshots/contest-benefits.png`에 CTA 포함되어 있어 **섹션 단위 게이트 측정 정합성 최고**.
- **옵션 B (분리)**: 별도 섹션 `contest-cta`로 split. baseline `figma-screenshots/contest-cta.png`(936×320) 별도 측정. Benefits는 CTA 제외. 장점: 재사용 용이. 단점: (a) baseline 2개 관리 (b) Benefits baseline에 CTA 포함되어 있어 clip 혹은 bg 추가 합성 필요.
- **기본 계획: 옵션 A (통합)** — 현 baseline 구조와 일치, 1회 측정. 재등장 시 컴포넌트 추출 가능.

### 1.3 버튼 폰트 (Inter vs Pretendard)

- style_1C4U4S는 **Inter 700 18px** 유일 지정.
- **옵션 A (권장)**: **Pretendard 통일** (프로젝트 전역 폰트 스택). 시각 차이 미미. fonts.css 수정 불필요.
- **옵션 B**: Inter 로딩 (fonts.css 추가).
- **기본 계획: 옵션 A** — G1 5% 초과 시 B로 전환.

### 1.4 버튼 arrow-right 아이콘

- 302:6598 IMAGE-SVG (24×24). 내부 primitive 2개(수평선+수직선 또는 꺾쇠).
- **옵션 A (권장)**: **인라인 SVG 재구성** (`<svg viewBox="0 0 24 24">` + 표준 arrow-right path). dependency 0.
- **옵션 B**: `lucide-react` `ArrowRight` (이미 프로젝트에 포함되어 있다면).
- **기본 계획: 옵션 A (인라인)** — 에셋·dep 최소화. Figma 렌더와 0.1px 오차 가능하나 24×24 소형이라 G1 영향 <0.05%p.

### 1.5 카드 설명 `\L` (U+2028) 처리

- Figma `text`에 라인 분리자 `\u2028` 포함. JSX 직접 사용은 esbuild/lint 경고 위험.
- **기본 계획**: 데이터 상수에 한글 원문을 **"앞줄|뒷줄"** 구분자로 저장 후 컴포넌트에서 `split('|').map((line, i) => (<>{line}{i===0 && <br />}</>))`. 또는 `lines: [string, string]` 튜플로 저장. **튜플 방식 채택** (안전).

### 1.6 Preview 래퍼 전략

- **옵션 A (권장)**: `w-[1416px] mx-auto bg-white` + clip `--clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 969`. (contest-about 선례)
- **옵션 B**: `w-[1920px] bg-white` + 섹션 내부 `mx-auto` → clip 불필요. 단 Preview가 1920 폭을 가져야 함.
- **기본 계획: 옵션 A** — 일관성 유지.

## 2. 컴포넌트 구조

```
src/components/sections/ContestBenefits/
├─ ContestBenefits.tsx    — 섹션 entry (노드 302:5067)
├─ BenefitCard.tsx        — 로컬 (304×203 카드, 타 페이지 재등장 시 ui/ 승격)
├─ CtaBanner.tsx          — 로컬 (CTA Container, 재등장 시 ui/ 승격)
└─ index.ts
```

### 2.1 `BenefitCard.tsx` 시그니처

```tsx
export interface BenefitCardProps {
  icon: string;            // /src/assets/contest-benefits/icon-*.png
  iconAlt?: string;        // 빈 문자열 → 장식
  title: string;
  /** 두 줄 설명 (Figma \L 기준 분리) */
  lines: readonly [string, string];
}

export function BenefitCard({ icon, iconAlt = "", title, lines }: BenefitCardProps) {
  return (
    <div className="flex w-[304px] flex-col items-center justify-center gap-4 rounded-[20px] bg-[#EFF0F0] p-4">
      <img
        src={icon}
        alt={iconAlt}
        aria-hidden={iconAlt === "" ? true : undefined}
        className="block size-[80px] shrink-0 object-cover"
      />
      <div className="flex w-full flex-col items-stretch gap-2">
        <h3
          className="text-center font-semibold text-[18px] leading-[1.4] tracking-[-0.27px] text-[#0A0A0A]"
        >
          {title}
        </h3>
        <p
          className="text-center font-medium text-[14px] leading-[1.5] tracking-[-0.07px] text-[#4A5565]"
        >
          {lines[0]}
          <br />
          {lines[1]}
        </p>
      </div>
    </div>
  );
}
```

- `w-[304px]` 고정 (Figma fixed).
- `gap-4` = 16, `p-4` = 16, `gap-2` = 8 (inner block `layout_BGOLAZ`).
- letterSpacing: 18×-1.5% = -0.27, 14×-0.5% = -0.07 (§2.4 소수점 보존).
- lineHeight 1.4 / 1.5 em 비율로 적용.

### 2.2 `CtaBanner.tsx` 시그니처

```tsx
import ctaBg from "@/assets/contest-benefits/cta-bg.png";

export function CtaBanner() {
  return (
    <div
      className="flex h-[320px] w-[936px] flex-col items-center justify-center gap-8 rounded-[20px] px-0 py-16"
      style={{
        backgroundColor: "#005C33",
        backgroundImage: `url(${ctaBg})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex w-[454px] flex-col items-center gap-3">
        <h3 className="text-center font-bold text-[32px] leading-[1.3] tracking-[-0.96px] text-white">
          지금 바로 신청하세요
        </h3>
        <p
          className="text-center font-normal text-[16px] leading-[1.5] tracking-[-0.16px]"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          아이디어에서 실천으로, ESG 실천 아이디어 경진대회에 참여하세요.
        </p>
      </div>
      <button
        type="button"
        className="flex items-center gap-2 rounded-full bg-white px-8 py-5 font-bold text-[18px] leading-[1.5556] tracking-[-0.4395px] text-[#0C3B0E]"
        style={{ boxShadow: "0px 25px 50px -12px rgba(0,0,0,0.25)" }}
      >
        경진대회 참가하기
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
```

- `w-[936px] h-[320px]` 고정 (Figma layout_RADHZN fixed).
- `gap-8` = 32, `py-16` = 64 (padding 64 0), `gap-3` = 12 (내부 텍스트 블록 gap).
- 버튼 `px-8 py-5 gap-2` = padding 20 32 + gap 8.
- 버튼 Pretendard 통일 (§1.3 옵션 A). Inter 지정값 letterSpacing -2.44140625% = `-0.4395px`.
- `rounded-full` (borderRadius 16777200 → pill).
- 버튼 shadow: Figma effect_7H3OG2 그대로.
- `backgroundColor: #005C33` + `backgroundImage: url(...)` 중첩. PNG가 반투명/색감 영역이면 녹색 하단이 비침. Figma 시각 테스트 완료.

### 2.3 `ContestBenefits.tsx` 본체

```tsx
import { HatchedSectionHeading } from "@/components/ui/HatchedSectionHeading";
import { BenefitCard } from "./BenefitCard";
import { CtaBanner } from "./CtaBanner";
import headingIcon from "@/assets/contest-about/heading-icon.png";  // 재사용
import icon1 from "@/assets/contest-benefits/icon-1-project.png";
import icon2 from "@/assets/contest-benefits/icon-2-network.png";
import icon3 from "@/assets/contest-benefits/icon-3-prize.png";
import icon4 from "@/assets/contest-benefits/icon-4-business.png";
import icon5 from "@/assets/contest-benefits/icon-5-mentor.png";
import icon6 from "@/assets/contest-benefits/icon-6-community.png";

const BENEFITS = [
  { icon: icon1, title: "실전 중심 프로젝트",
    lines: ["이론이 아닌 실제 현장의 문제를 해결하는", "실전형 프로젝트로 진행됩니다."] },
  { icon: icon2, title: "네트워킹 기회",
    lines: ["다양한 분야의 전문가, 기업, 기관과의", "네트워킹 기회를 제공합니다."] },
  { icon: icon3, title: "상금 및 시상",
    lines: ["우수한 아이디어에는 상금과", "다양한 혜택을 제공합니다."] },
  { icon: icon4, title: "사업화 지원",
    lines: ["수상작은 실제 사업화 및 프로젝트 실행을", "위한 지원을 받을 수 있습니다."] },
  { icon: icon5, title: "멘토링 제공",
    lines: ["ESG 전문가의 1:1 맞춤형 멘토링으로", "아이디어를 구체화합니다."] },
  { icon: icon6, title: "지역사회 연계",
    lines: ["지역사회와 연계하여 실질적인", "사회적 가치를 창출합니다."] },
] as const;

export function ContestBenefits() {
  return (
    <section
      aria-labelledby="contest-benefits-title"
      className="flex w-[1416px] flex-col items-stretch gap-5 px-[240px] py-[64px]"
    >
      <HatchedSectionHeading
        icon={headingIcon}
        iconAlt=""
        title="ESG 실천 아이디어 경진대회의 특별한 혜택"
        titleId="contest-benefits-title"
      />
      <div className="flex flex-col items-stretch gap-3">
        <div className="flex flex-wrap gap-3">
          {BENEFITS.map((b) => (
            <BenefitCard key={b.title}
              icon={b.icon} iconAlt="" title={b.title} lines={b.lines} />
          ))}
        </div>
        <CtaBanner />
      </div>
    </section>
  );
}
```

**매핑 요약:**
- root `px-[240px] py-[64px] gap-5` ≡ padding 64 240, gap 20
- body wrapper `gap-3` = 12 (layout_JHODBY)
- 카드 그리드 `flex-wrap gap-3` = row wrap gap 12 (layout_5MDMJZ). 6카드 × 304 + 2 gap × 12 = 912+24=936, 3장씩 줄바꿈
- CTA 위 카드 그리드 한 블록 → `flex flex-col gap-3` (12)

### 2.4 `index.ts`

```ts
export { ContestBenefits } from "./ContestBenefits";
```

## 3. 에셋 계획

### 3.1 Framelink `download_figma_images` 호출 (7개 신규)

```
mcp__figma-framelink__download_figma_images(
  fileKey: "qhrMiGVfoSQ1QMFhVN8z78",
  localPath: "src/assets/contest-benefits",
  pngScale: 2,
  nodes: [
    { nodeId: "302:5090", fileName: "icon-1-project.png",
      imageRef: "ee861b065d9f1a4426dced9c4511df03266d497a",
      needsCropping: true, filenameSuffix: "297809",
      cropTransform: [[0.9088,0,0.0456],[0,0.9088,0.0440]] },
    { nodeId: "302:5095", fileName: "icon-2-network.png",
      imageRef: "3977f9d2778c4153475c29834bd81c015a708757",
      needsCropping: true, filenameSuffix: "46909d",
      cropTransform: [[0.8768,0,0.0616],[0,0.8768,0.0906]] },
    { nodeId: "302:5100", fileName: "icon-3-prize.png",
      imageRef: "1a2f471e4409cc52ef4f8b21473165e00f2c2c9f",
      needsCropping: true, filenameSuffix: "cb5ad8",
      cropTransform: [[0.4709,0,0.2645],[0,0.8626,0.1078]] },
    { nodeId: "302:5105", fileName: "icon-4-business.png",
      imageRef: "77c7263b6ec993e447f8627cf4efa4c7ca0e9794",
      needsCropping: true, filenameSuffix: "55c029",
      cropTransform: [[0.4940,0.0066,0.2513],[-0.0121,0.9050,0.0203]] },
    { nodeId: "302:5110", fileName: "icon-5-mentor.png",
      imageRef: "6553b3dc5ce0921fde8f78b7c02e85f72f41fced",
      needsCropping: true, filenameSuffix: "3b44f2",
      cropTransform: [[0.5000,0,0.2500],[0,0.9159,0.0658]] },
    { nodeId: "302:6491", fileName: "icon-6-community.png",
      imageRef: "8e9ea7479ac67b2d60c1cdc779eded9edfe82ed0",
      needsCropping: true, filenameSuffix: "675f27",
      cropTransform: [[0.1987,0,0.7777],[0,0.9002,0.0343]] },
    { nodeId: "302:6592", fileName: "cta-bg.png",
      imageRef: "83ba43ed8a18d434a6b11648086ee3ab88676cb5",
      needsCropping: true, filenameSuffix: "5421ad",
      cropTransform: [[0.7554,0,0.1938],[0,0.3400,0.1105]] }
  ]
)
```

### 3.2 heading-icon.png 재사용

`src/assets/contest-about/heading-icon.png` 존재 확인 완료. Benefits는 import만.

### 3.3 verify

- `scripts/verify-assets.sh`로 파일 존재/크기 확인 (7개 + 기존 1개 = 8개 load)
- naturalWidth > 0 G3 자동 통과 예상

## 4. 라우트 설정

### 4.1 `src/routes/ContestBenefitsPreview.tsx`

```tsx
import { ContestBenefits } from "@/components/sections/ContestBenefits";

/**
 * __preview/contest-benefits — G1 픽셀 비교용 격리 라우트.
 * baseline: figma-screenshots/contest-benefits.png (1416×969).
 * 섹션 1416 content, 1920 viewport 중앙정렬 → clip 필수
 *   --clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 969
 */
export function ContestBenefitsPreview() {
  return (
    <div className="w-[1416px] mx-auto bg-white">
      <ContestBenefits />
    </div>
  );
}
```

### 4.2 `src/App.tsx`

- `import { ContestBenefitsPreview }` 추가
- route `{ path: "/__preview/contest-benefits", element: <ContestBenefitsPreview /> }` 추가

## 5. 측정 계획 (4 게이트)

| 게이트 | 내용 | 예상 |
|--------|------|------|
| G1 | pixelmatch diff vs `figma-screenshots/contest-benefits.png` (1416×969) | **≤ 5%** 목표. 노드 기반 HTML 재구성, blend 없음, CTA 배경 이미지 1장만 평면 합성 → **예상 2~4%**. CTA bg 이미지 crop·scale 미세 편차가 최대 리스크 |
| G2 | 치수 (font ±1, padding/margin ±2) | PASS 고신뢰 (Figma variable 값 그대로 반영) |
| G3 | naturalWidth > 0 | 8장 (heading 1 + 카드 6 + cta-bg 1). Framelink `needsCropping` 결과 naturalWidth 각 500~800 예상 |
| G4 | hex 정확 | #0A0A0A, #EFF0F0, #4A5565, #FFFFFF, #005C33, #0C3B0E, rgba(255,255,255,0.6) |

**측정 명령:**
```
bash scripts/compare-section.sh contest-benefits --clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 969
```

- baseline: `figma-screenshots/contest-benefits.png` (1416×969)
- Preview URL: `http://localhost:{port}/__preview/contest-benefits`
- 캡처 viewport: 1920×969 → clip 1416×969로 정규화

## 6. 육안 semantic 검증 (§6.4 단계 5)

- [ ] 카드 6개 순서 (좌→우, 위→아래): 실전 중심 → 네트워킹 → 상금 → 사업화 → 멘토링 → 지역사회 (swap 없음)
- [ ] 각 카드 아이콘이 제목과 매칭 (Framelink suffix로 6개 파일명 관리)
- [ ] 카드 설명 2줄 줄바꿈 위치 정확 (Figma `\L` 경계와 일치)
- [ ] HatchedSectionHeading이 카드 그리드 **위**
- [ ] CTA가 카드 그리드 **아래** (Benefits 섹션 하단)
- [ ] CTA 배경 = 딥그린(#005C33) + 도시 실루엣 이미지 오버레이 (단색만 X)
- [ ] CTA 제목 흰색, 서브텍스트 반투명 흰색(40% 투명)
- [ ] 버튼 흰색 pill (완전 원형 모서리), 텍스트 #0C3B0E 딥그린
- [ ] 버튼 화살표 아이콘 **우측** (방향 반전 X), 텍스트 뒤에 위치
- [ ] 카드 배경 균질 #EFF0F0 (테두리/그림자 없음)

## 7. 트레이드오프·리스크

1. **BenefitCard 로컬 유지 (§1.1)**: 6회 사용이지만 섹션 단일 스코프. 재등장 시 승격.
2. **CTA 통합 (§1.2)**: baseline·측정 정합성 우선. 재사용 시 추출 간단 (파일 이동 + ui/로 promote).
3. **버튼 Pretendard 통일 (§1.3)**: Inter 로딩 생략. G1 5% 초과 시 Inter 재도입.
4. **arrow 인라인 SVG (§1.4)**: stroke 기반 심플 path. 24×24라 G1 영향 미미.
5. **CTA 배경 이미지 cropTransform**: Framelink가 Figma 내부 crop 반영 → crop 실패 시 도시 실루엣 위치가 어긋남. 1회차 실패 시 pngScale 증가 or crop 값 재검증.
6. **카드 2행 높이 동일성**: flex-wrap + hug 높이라 6 카드 각자 hug. Figma에서도 hug이나 한글 렌더 메트릭 차이로 row alignment 어긋나면 grid 균형 깨짐. `items-start`로 기본 정렬 유지.
7. **HatchedSectionHeading 공통 첫 재사용**: import path `@/components/ui/HatchedSectionHeading` OK. title만 교체. icon은 heading-icon.png 재사용.
8. **Preview clip 함정 방지**: contact-form·contest-about에서 재발한 오류. plan §4 코멘트와 측정 명령 둘 다 clip 명시 — 측정 세션 잊으면 허수 diff.

## 8. 빌드 확인 계획

- `npm run build` → TypeScript strict 통과 (readonly 튜플, Props 정확)
- `npm run lint` → 경고 0
- `npm run dev` → `/__preview/contest-benefits` 200 + 8 에셋 200

## 9. 새 공통 컴포넌트 승격 제안

**이번 섹션에서는 없음.** `BenefitCard` / `CtaBanner`는 다른 페이지(자격검정·메인 등) 재등장 확인 후 승격.

## 10. 단계 3 진입 전 사용자 승인 필요 사항

- [ ] **§1.1** `BenefitCard` 로컬 유지 (옵션 A) 수락
- [ ] **§1.2** CTA Banner 통합 (옵션 A) 수락
- [ ] **§1.3** 버튼 Pretendard 통일 (옵션 A) 수락
- [ ] **§1.4** arrow-right 인라인 SVG (옵션 A) 수락
- [ ] **§1.5** 설명 `lines: [string, string]` 튜플 방식 수락
- [ ] **§1.6** Preview 래퍼 1416 + clip 필수 수락
- [ ] §3.1 Framelink 7개 에셋 다운로드 수락

## 11. 측정값 기록 섹션

### 회차 1 (초기 구현, multiply 없음)
- G1: **9.48%** (130080/1372104px) — FAIL (>5%)
- G2/G3/G4: PASS (치수·에셋·색상 Figma 값 그대로)
- 육안: CTA 배경이 baseline의 녹색 모노크롬과 달리 원색 도시 사진 그대로 표시.

### 회차 2 (CtaBanner `mix-blend-mode: multiply` + position:absolute 재구성)
- 2a: multiply + object-cover → **12.13%** (악화. cropTransform 미적용으로 이미지 프레이밍 전혀 다름)
- 2b: multiply + cropTransform 역해석 scale(1239.7×941.4, -240.5,-103.6) → **10.93%** (crop 해석 오해 — 이미지가 box 전체가 아닌 일부에 들어가야 함)
- 2c: multiply + STRETCH 100%×100% (Figma scaleMode=STRETCH 그대로) → **12.21%** (육안으로는 baseline과 가장 유사. 도시+녹 톤 재현. 하지만 pixelmatch diff는 증가)

### 근본 분석
- **Framelink baseline PNG의 전체 배경이 RGBA(0,0,0,0) — 완전 투명**. Read 뷰어가 검정으로 렌더해 "다크 배경 오인" 유발. 실제로는 투명 = 흰색 배경이 정답 (Figma root 노드 fill 없음).
- 실제 G1 diff 주원인: (1) CTA 배경 이미지 합성 차이 (multiply 모드 재현 한계), (2) 텍스트 1~2px shift (pixelmatch가 AA 차이에 민감), (3) 카드 아이콘 PNG의 cropTransform 미적용 여부.
- Figma `fill_L65LFV = [IMAGE, #005C33]` 구조는 CSS `mix-blend-mode: multiply`로 근사 가능하나 Figma의 실제 블렌드는 다를 수 있음 (PASS-THROUGH 또는 커스텀). pixelmatch diff 5% 미만은 이 섹션 구조상 난이도 높음.

### 회차 3 (CTA raster 전환 — Framelink rendered composite PNG)

**전략:** CTA Container(302:6592)를 `mcp__figma-framelink__download_figma_images` nodeId만으로 export하여 Figma가 자체 합성한 composite PNG 1장을 얻음. CSS blend 포기.

**구현:**
- `CtaBanner.tsx`에서 `<img src={ctaComposite}>` + 투명 오버레이 `<button>` (aria-label만)
- composite PNG가 **텍스트·버튼까지 포함된 완전 raster** (Read 육안 확인) → 2a 전략 채택 (raster only)
- pngScale 1 (936×320), pngScale 2 (1872×640) 둘 다 실험

**측정:**
- 3a (pngScale 1): **G1 6.90%** (94607/1372104px) — 회차 1(9.48%) 대비 **27% 감축**, 목표(<5%) 여전히 초과
- 3b (pngScale 2): **G1 6.89%** (94571/1372104px) — 사실상 동일, scale 영향 거의 없음

**diff 분석:**
- CTA composite 전환은 성공. 회차 1~2의 CTA blend 재현 실패 문제 해결
- 남은 diff ≈ 6.9% 주원인:
  1. 카드 아이콘 6종 — Framelink cropTransform 결과 PNG가 baseline과 미세 frame 차이 (이미 회차 1부터 존재)
  2. 한글 폰트 AA — Chromium Pretendard 렌더 vs Figma 렌더 서브픽셀 차이 (전 섹션 공통)
  3. CTA composite 텍스트 AA — composite PNG의 텍스트도 raster AA로 baseline과 서브픽셀 단위 미스매치
- 즉 CTA는 **더 이상 diff 주원인 아님**. 카드·폰트 AA가 잔여 ~7%의 주역.

**판단:**
- 지침 "G1 ≥5% 시 revert 후 [A] 폴백" 규칙 적용
- 회차 3 파일 revert → 회차 1 상태(9.48%) 복원 확인 완료
- cta-composite.png는 향후 재시도용 보존

### 상태
- **3회 시도 소진. G1 목표(<5%) 미달성.**
- 최저 diff 9.48%(회차 1, multiply 없음).
- 최종 현재 구현: 회차 2c (multiply + STRETCH). 육안 최근접.
- 단계 6 규칙상 3회차 가능. 사용자 판단 필요:
  - [A] multiply 제거하고 회차 1 상태로 복귀 (9.48%)
  - [B] 회차 3에서 다른 blend mode(overlay/soft-light) 시도
  - [C] CTA 배경을 수동으로 녹색 monochrome PNG로 전처리 후 사용
  - [D] 현재 9% 수준을 수용하고 다음 섹션으로 (본 섹션 특성상 CTA bg image 탓 5% 달성 현실적 어려움)
