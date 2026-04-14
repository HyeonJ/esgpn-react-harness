# plan/about-organization-logos.md — About 조직도 페이지 운영주체 로고 섹션

> Phase 3 단계 2. 페이지 `/about/organization` 2번째 섹션.
> 상위 리서치: `research/about-organization-logos.md`.
> 규칙: `CLAUDE.md` / `docs/section-implementation.md` §2.4 / §2.5 / §2.6 / §6.1 / §6.4.

## 1. 구현 전략

- **전략 [A] 완전 HTML 재구성 + 로고 raster crop** (about-values / about-mission 선례 준수)
- HatchedDivider 공통 컴포넌트 **확장** (optional `label?: string` prop) — 기존 사용처(AboutMission, AboutValues) backward-compatible. label 미제공 시 기존 동작 그대로 유지.
- ESPGN 로고: **HTML 재구성 안함 → baseline crop PNG 사용** (about-header에 자산이 없어 재사용 불가). serif 폰트 정밀 재현보다 crop이 G1 효율적.
- Colive 로고: 그라디언트 baked-in → baseline crop PNG.
- 전문대학평생직업교육협회 로고: 복합 구성(사단법인+한글+영문) baked-in → baseline crop PNG 한 장.
- Pipe divider: CSS 재구성 (`w-[2px] h-[46px] bg-gray-300`).

## 2. 컴포넌트 구조

```
src/components/sections/AboutOrganizationLogos/
├─ AboutOrganizationLogos.tsx    — 섹션 루트 (div full-width + HatchedDivider + PartnerLogoRow)
└─ PartnerLogoRow.tsx            — 3 로고 + pipe CSS (로컬, 재사용 없음)

src/components/ui/HatchedDivider.tsx
└─ label?: string prop 확장      — backward-compatible
```

### 2.1 props 시그니처

```ts
// HatchedDivider.tsx (확장)
export function HatchedDivider({
  className = "",
  label,
}: {
  className?: string;
  label?: string;
}): JSX.Element;

// AboutOrganizationLogos.tsx
export function AboutOrganizationLogos(): JSX.Element;

// PartnerLogoRow.tsx (로컬)
type LogoSpec = { src: string; alt: string; width: number; height: number };
export function PartnerLogoRow({ logos }: { logos: LogoSpec[] }): JSX.Element;
```

### 2.2 HatchedDivider 확장 상세

label이 주어지면 **중앙 실선을 좌/우 두 개로 분할**하고 그 사이에 텍스트 렌더.
- baseline 측정: 왼쪽 라인 x=535~925, 오른쪽 라인 x=994~1384, 전체 932px 폭 유지
- 텍스트 영역(932 기준 좌표): 약 `x=345~398` (총 932 기준 center=466)
- 기존 치수(932×10) 유지. label 줄은 h=10에 안 담기므로 wrapper div `flex items-center gap-[8px]` + SVG 재구성.
- **구현 방식:** 간단하게 div wrapper로 변경 (왼쪽 SVG + label span + 오른쪽 SVG). 단, 미제공 시 기존 단일 SVG 유지. 조건부 분기.

## 3. 에셋 계획

### 3.1 crop 소스 / 목적지 (Pillow python)

crop 영역은 full.png 기준 좌표. 각 로고에 ±10px 여유 추가.

| # | 이름 | source | crop box (L, T, R, B) | 예상 크기 | 목적지 파일 |
|---|------|--------|----------------------|-----------|------------|
| 1 | ESPGN | about-organization-full.png | (509, 319, 819, 402) | 310×83 | `src/assets/about-organization-logos/espgn.png` |
| 2 | Colive | about-organization-full.png | (856, 319, 1094, 402) | 238×83 | `src/assets/about-organization-logos/colive.png` |
| 3 | 전문대학평생직업교육협회 | about-organization-full.png | (1090, 325, 1410, 402) | 320×77 | `src/assets/about-organization-logos/association.png` |

### 3.2 캔버스-에셋 개수 일치

| 항목 | 개수 |
|------|------|
| Canvas raster 로고 | 3 |
| crop PNG 다운로드 | 3 |
| HTML/CSS 재구성 | HatchedDivider(+label), pipe divider |

**3 = 3 일치 ✓**

### 3.3 crop 스크립트

`scripts/download-assets.sh` 대신 **Pillow crop python 스크립트 (일회성)** — Figma URL이 아닌 이미 받은 full.png 가공이므로 `download-assets.sh` 스키마와 불일치. about-values 선례 동일 패턴.

## 4. 섹션 레이아웃

```tsx
<section className="relative w-[1920px] h-[300px] bg-white">
  {/* HatchedDivider at y=84~94 (내부 좌표) — full canvas y=274~284 */}
  <div className="absolute top-[84px] left-1/2 -translate-x-1/2">
    <HatchedDivider label="운영주체" />
  </div>

  {/* Logo row at y=139~202 (내부) — full canvas y=329~392 */}
  <div className="absolute top-[139px] left-1/2 -translate-x-1/2">
    <PartnerLogoRow logos={[...]} />
  </div>
</section>
```

### 4.1 PartnerLogoRow 내부 레이아웃

```tsx
<div className="flex items-center gap-0">
  <img src={espgn} alt="ESPGN" width={291} height={64} />
  <div className="w-[2px] h-[46px] bg-[#d6dad8] mx-[27px]" />
  <img src={colive} alt="Colive" width={219} height={64} />
  <div className="w-[16px]" /> {/* gap Colive → Assoc */}
  <img src={association} alt="사단법인 전문대학평생직업교육협회" width={301} height={58} />
</div>
```

- ESPGN(291) + ml/mr 27 + pipe(2) + 27 + Colive(219) + 16 gap + Assoc(301) = **910px row width**
- baseline 측정: 519~1400 = **881px** (차이 29px — crop box에 여유 10px 포함되어 `padding` 제외한 순수 로고 polygon은 더 좁음)
- **보정:** crop 후 실제 로고 시각 폭이 crop box 폭과 다름 → 단계 5에서 측정 후 gap 조정. 초기값은 위 수치.

## 5. 디자인 토큰

- pipe divider: `bg-[#d6dad8]` (Gray 300 계열, 공식 토큰 없으면 arbitrary)
- divider label: `text-[13px] font-medium text-[#a4aeaa]` (행 스캔 색상 근사)
- 섹션 배경: `bg-white`

신규 토큰 없음.

## 6. /__preview 라우트

- 경로: `/__preview/about-organization-logos`
- wrapper: `<div className="bg-white">` + `<AboutOrganizationLogos />`
- visual-regression 측정 전용. 기존 about-organization-tabs preview와 동일 패턴.

## 7. clip 파라미터

풀폭 섹션 → `scripts/compare-section.sh about-organization-logos` 기본 호출. `--clip-*` 불필요.

## 8. 새 npm 패키지

**없음** — Pillow(python)만 사용. React/Tailwind/react-router-dom 기존 스택.

## 9. 4 게이트 예상

| 게이트 | 목표 | 예상 | 근거 |
|--------|------|------|------|
| G1 시각 일치 | <5% | **<3%** | 로고 3개 raster crop → 변형 없음. HatchedDivider+label은 폰트 antialias만 변수 |
| G2 치수 | font ±1, margin/padding ±2 | PASS | 좌표 행/열 스캔 픽셀 단위 |
| G3 에셋 무결성 | naturalWidth > 0 | PASS | 3 PNG import |
| G4 색상 정확도 | hex 일치 | PASS | Gray 300 pipe는 arbitrary hex |

## 10. 리스크 & 트레이드오프

1. **HatchedDivider label 확장 회귀:** AboutMission/AboutValues G1 regression 방지를 위해 해당 preview도 재측정. label=undefined 분기로 기존 동작 100% 유지.
2. **Colive 로고 edge halo:** 그라디언트 alpha edge 흰 배경 섞임. `process-assets.py`에서 alpha 유지, JPG 금지.
3. **Assoc 로고 crop 정밀도:** 상단 "사단법인" 라벨(x=1100~1150, y=340~362)과 메인 한글(x=1152~1400)이 한 박스에 들어가야 함. crop box (1090, 325, 1410, 402)가 모두 포함. 영문 subtitle(y=385~392)도 포함.
4. **pipe divider 1~2px 오차:** baseline pipe 폭 2~4px. CSS w=2로 설정 후 G1 측정 결과에 따라 w=3 조정 여지.
5. **ESPGN serif 재현:** crop으로 처리하여 폰트 정확도 리스크 제거.

## 11. 구현 파일 목록 (단계 4에서 작성)

- `src/components/sections/AboutOrganizationLogos/AboutOrganizationLogos.tsx`
- `src/components/sections/AboutOrganizationLogos/PartnerLogoRow.tsx`
- `src/components/sections/AboutOrganizationLogos/index.ts`
- `src/components/ui/HatchedDivider.tsx` (label prop 확장)
- `src/assets/about-organization-logos/espgn.png`
- `src/assets/about-organization-logos/colive.png`
- `src/assets/about-organization-logos/association.png`
- `src/pages/__preview__/AboutOrganizationLogosPreview.tsx` (or 기존 preview 레지스트리)
- `src/App.tsx` or `src/routes.tsx` — `/__preview/about-organization-logos` 등록
- `src/pages/about/OrganizationPage.tsx` — 섹션 삽입 (tabs 다음)

## 12. 단계 3 진입 조건

- [ ] 사용자 승인: HatchedDivider label prop 확장 허용
- [ ] 사용자 승인: 로고 3개 crop 전략
- [ ] 사용자 승인: pipe CSS 재구성
- [ ] 사용자 승인: AboutMission/AboutValues 회귀 재측정 포함

## 13. 측정 결과 기록 섹션 (단계 5/6 채움)

### 13.1 회차 1 (2026-04-14)

**regression (HatchedDivider label 확장 영향 확인):**
- about-mission  G1 diff: **4.23%** (61263/1447680 px) — 직전 커밋 대비 0.00%p (유지 ✓)
- about-values   G1 diff: **4.28%** (59370/1386240 px) — 직전 커밋 대비 0.00%p (유지 ✓)

**about-organization-logos 신규 측정:**
- G1 diff: **4.84%** (27874/576000 px) — PASS (<5%)
- G2 치수:
  - ESPGN   img x=510.5 w=310 h=83 (crop box L=509 + 10 여유 → polygon x≈520.5, baseline polygon 519. Δ=+1.5 px, PASS ±2)
  - Colive  img x=855.5 w=238 h=83 (crop 856, polygon 865.5 ≈ baseline 866. Δ=-0.5 px, PASS)
  - Assoc   img x=1089.5 w=320 h=77 (crop 1090, polygon 1099.5 ≈ baseline 1100. Δ=-0.5 px, PASS)
  - label "운영주체" center x=960.0 (baseline 960, Δ=0, PASS)
  - label fontSize=13px weight=500 color=rgb(164,174,170)
- G3 에셋: naturalWidth ESPGN=310, Colive=238, Assoc=320 — 전부 > 0 (PASS)
- G4 색상: pipe `#d6dad8` / label `#a4aeaa` / section `bg-white` — research 측정치와 일치 (PASS)

**육안 semantic 검증:**
- mission: [PASS] — HatchedDivider label=undefined 분기 유지, 시각 불변
- values:  [PASS] — 동일
- logos:   [PASS] — "운영주체" 중앙 텍스트 / 3 로고 올바른 순서·위치 / pipe divider 2개 중 1개(ESPGN↔Colive)만 존재 (baseline도 1개. plan "pipe 2개" 가정은 research 재확인 결과 1개가 맞음) / 방향·색 반전 없음 / alpha 보존 확인

**4 게이트: ALL PASS (1회차 완통과)**

---

## 멈춤 지점

단계 2 plan 완료. 사용자 승인 대기 (단계 3 금지).
