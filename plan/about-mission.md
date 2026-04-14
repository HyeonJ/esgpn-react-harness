# plan/about-mission.md — About Mission 섹션 구현 계획

> 기반: `research/about-mission.md` (단계 1). 전략 **[A] 완전 HTML 재구성**.
> baseline: `figma-screenshots/about-mission.png` (1920×754). 선례: `plan/about-header.md`.

## 1. 컴포넌트 구조

### 1.1 파일 레이아웃

```
src/
├─ components/sections/AboutMission/
│  ├─ AboutMission.tsx         ← 섹션 엔트리 (export default)
│  ├─ HatchedDivider.tsx       ← 로컬 컴포넌트 (좌/우 해치 + 중앙 실선)
│  └─ index.ts                 ← re-export
├─ assets/about-mission/
│  ├─ photo-large.png          ← crop (357×359)
│  └─ photo-small.png          ← crop (145×161)
├─ routes/
│  └─ AboutMissionPreview.tsx  ← /__preview/about-mission
└─ App.tsx                     ← 라우트 추가
```

### 1.2 컴포넌트 트리

```
<AboutMission>
  <section className="relative w-[1920px] h-[754px] bg-white">
    <HatchedDivider className="absolute top-0 left-1/2 -translate-x-1/2" />

    {/* 좌측 텍스트 블록 */}
    <div className="absolute left-[493px] top-[68px]">
      <h2 className="text-[28px] leading-[33px] font-bold tracking-[-0.02em]">
        <span className="text-[#4FB654]">ESG실천네트워크(ESGPN)</span>
        <span className="text-[var(--color-gray-900)]">를</span>
        <br />
        <span className="text-[var(--color-gray-900)]">방문해주신 여러분을 진심으로 환영합니다.</span>
      </h2>

      <p className="mt-[41px] w-[577px] text-[16px] leading-[24px] text-[var(--color-gray-900)]">
        <span className="font-semibold text-[#4FB654]">ESG실천네트워크</span>는 '행동으로 구현하는 지속가능성'이라는 가치를 중심에 두고,<br />
        ESG를 단순한 기업의 평가 기준을 넘어 사회 구성원 모두의 행동 기준으로 확산시키기 위해 설립되었습니다.<br />
        대학, 학회, 산업체, 그리고 지역사회가 서로 손을 잡고 실천의 목소리를 모을 때 더 큰 사회적 가치가 창출되듯,<br />
        우리는 교육과 참여를 바탕으로 건강한 ESG 실천 문화를 만들어가고자 합니다.
      </p>

      <p className="mt-[33px] w-[577px] text-[16px] leading-[24px] text-[var(--color-gray-900)]">
        <span className="font-semibold text-[#4FB654]">ESG실천네트워크</span>는 지속가능성이 단순한 '선언'에 그치지 않고 '교육과 실천의 축적'으로<br />
        완성될 수 있도록 돕는 전문 연대 플랫폼으로서, 다음과 같은 가치를 목표로 하고 있습니다.
      </p>
    </div>

    {/* 우측 사진 2장 (absolute) */}
    <img
      src={photoLarge}
      alt=""
      className="absolute left-[1070px] top-[258px] w-[357px] h-[359px] rounded-[30px] object-cover"
    />
    <img
      src={photoSmall}
      alt=""
      className="absolute left-[887px] top-[531px] w-[145px] h-[161px] rounded-[20px] object-cover"
    />

    <HatchedDivider className="absolute bottom-0 left-1/2 -translate-x-1/2" />
  </section>
</AboutMission>
```

### 1.3 HatchedDivider 구현

```tsx
// SVG inline — 해치 `//////` + 실선
export function HatchedDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="932"
      height="10"
      viewBox="0 0 932 10"
      fill="none"
      aria-hidden="true"
    >
      {/* 좌측 해치 (5개 slash) */}
      <g stroke="#97A29E" strokeWidth="1">
        <line x1="0"  y1="10" x2="7"  y2="0" />
        <line x1="8"  y1="10" x2="15" y2="0" />
        <line x1="16" y1="10" x2="23" y2="0" />
        <line x1="24" y1="10" x2="31" y2="0" />
      </g>
      {/* 중앙 실선 */}
      <line x1="41" y1="5" x2="889" y2="5" stroke="#B1B9B6" strokeWidth="1" />
      {/* 우측 해치 */}
      <g stroke="#97A29E" strokeWidth="1">
        <line x1="900" y1="10" x2="907" y2="0" />
        <line x1="908" y1="10" x2="915" y2="0" />
        <line x1="916" y1="10" x2="923" y2="0" />
        <line x1="924" y1="10" x2="931" y2="0" />
      </g>
    </svg>
  );
}
```

- viewBox `932×10` 기준. 실선은 두께 1px (baseline 측정값 ≈ 2px이지만 antialias 포함하여 render시 ±1 조정)
- 색상: 실선 `#B1B9B6`, 해치 `#97A29E` (research §3.1 실측)

## 2. Props / 데이터

- `AboutMission`: props 없음 (하드코딩).
- `HatchedDivider`: optional `className` 위치 제어용.

## 3. 스타일 매핑 (측정치 → CSS)

| 요소 | 측정치 (canvas) | 섹션 내부 offset | Tailwind |
|------|-----------------|-----------------|---------|
| section | 1920×754 | — | `w-[1920px] h-[754px] bg-white relative` |
| 상단 divider | y=542..543 | top=0 | `absolute top-0 left-1/2 -translate-x-1/2` |
| 제목 line 1 top | y=610 | 68 | `top-[68px]` (container) |
| 제목 font-size | cap 22 | — | `text-[28px]` (1st loop 추정) |
| 제목 line-height | line pitch 33 | — | `leading-[33px]` |
| 제목 font-weight | Bold | — | `font-bold` |
| 제목 letter-spacing | 미세 negative 추정 | — | `tracking-[-0.02em]` (loop 조정) |
| 제목 색상 (녹색) | #4FB654 | — | `text-[#4FB654]` |
| 제목 색상 (다크) | #1d2623 | — | `text-[var(--color-gray-900)]` |
| 제목 x | 493 | — | `left-[493px]` |
| 제목→본문 gap | 41px | — | `mt-[41px]` |
| 본문 font-size | cap 15 | — | `text-[16px]` |
| 본문 line-height | 24 | — | `leading-[24px]` |
| 본문 색상 | #1d2623 | — | `text-[var(--color-gray-900)]` |
| 강조 색상 | #4FB654 | — | `text-[#4FB654]` |
| 강조 weight | Semibold | — | `font-semibold` |
| 본문 width | 577 (para2 경계 기준) | — | `w-[577px]` |
| 단락 간 gap | 33px | — | `mt-[33px]` |
| large photo | 357×359 @ (1070, 800) | top=258 | `absolute left-[1070px] top-[258px] w-[357px] h-[359px] rounded-[30px]` |
| small photo | 145×161 @ (887, 1073) | top=531 | `absolute left-[887px] top-[531px] w-[145px] h-[161px] rounded-[20px]` |
| 하단 divider | y=1294..1295 | top=752 | `absolute bottom-0 left-1/2 -translate-x-1/2` |

### 3.1 Magic number 정책
- 약 20여 개 magic number 있음. 모두 research §3 측정 유도치.
- 측정 섹션에 측정→조정 루프 기록.

## 4. 에셋 계획

**구현 에셋: 2개.**

| 파일 | crop (from about-full.png) | 크기 | 용도 |
|------|---------------------------|------|------|
| `src/assets/about-mission/photo-large.png` | `(1070, 800, 1427, 1159)` | 357×359 | 우측 대형 cityscape |
| `src/assets/about-mission/photo-small.png` | `(887, 1073, 1032, 1234)` | 145×161 | 좌하단 plants |

**생성 방법:** Python PIL — 단계 3에서 스크립트 실행.

```python
from PIL import Image
im = Image.open('figma-screenshots/about-full.png')
im.crop((1070, 800, 1427, 1159)).save('src/assets/about-mission/photo-large.png')
im.crop((887, 1073, 1032, 1234)).save('src/assets/about-mission/photo-small.png')
```

### 4.1 Canvas-Asset 일치 검증
- Canvas 에셋 = 2 (photos)
- 파일 = 2
- **일치 (2 = 2). ✓**

## 5. 신규 npm 패키지

**없음.** 기존 Pretendard + Tailwind + React로 충분.

## 6. 격리 라우트 (G1 캡처용)

```tsx
// src/routes/AboutMissionPreview.tsx
import { AboutMission } from "@/components/sections/AboutMission";

export function AboutMissionPreview() {
  return (
    <div className="w-[1920px] min-h-[754px] mx-auto bg-white">
      <AboutMission />
    </div>
  );
}
```

- `App.tsx`에 `<Route path="/__preview/about-mission" element={<AboutMissionPreview />} />` 추가
- bg-white wrapper (§6.1 필수)
- Header/Footer 제외

## 7. 4 게이트 예상 측정

| 게이트 | 방법 | 예상 | Pass |
|--------|------|------|------|
| G1 시각 | `scripts/compare-section.sh about-mission` | **3.5~4.8%** (photo rendering 차이 + 텍스트 antialias) | <5% |
| G2 치수 | DOM: section 1920×754, photo w/h, 제목 28px, 본문 16px | ±1~2px | font±1, 그 외 ±2 |
| G3 에셋 | 2개 img `naturalWidth>0` | 357, 145 | >0 |
| G4 색상 | computed rgb: 녹색 #4FB654, 다크 #1d2623, divider #B1B9B6/#97A29E | 일치 | hex 일치 |

### 7.1 clip 파라미터
floating 요소 없음 (섹션 풀폭 1920). `--clip-*` 불필요.

## 8. 구현 순서 (단계 4)

1. `src/assets/about-mission/` crop 생성 (Python PIL)
2. `src/components/sections/AboutMission/HatchedDivider.tsx` 작성
3. `src/components/sections/AboutMission/AboutMission.tsx` + `index.ts`
4. `src/routes/AboutMissionPreview.tsx`
5. `src/App.tsx` preview 라우트 추가
6. `npm run build && npm run lint`
7. 단계 5 측정

## 9. 트레이드오프 / 리스크

1. **font-size 28/16 근사:** Figma 노드 없으므로 cap height 기반 추정. G1 루프에서 조정 가능성 높음. About-header 선례 (144→152) 참고.

2. **letter-spacing 추정:** 제목에 `-0.02em` 기본. 실측하지 않은 값이라 G1 3%를 초과할 경우 조정 필요.

3. **본문 width 577px:** para1 일부 라인이 baseline에서 1120까지(627px) 확장된 사례 있음. 577로 설정 시 line break가 자연스럽게 baseline 일치할지 불확실. 대안: 줄별 `<br>` 수동 강제 (현 plan에 적용). CSS 자동 wrap + max-width 조정은 fallback.

4. **photo border-radius 추정:** Figma에서 정확값 불명. 30/20px 초기값으로 시작. G1 차이 시 24/28/32 후보 테스트.

5. **photo z-index:** research에서 small이 large 위에 겹치는지 below인지 미확정. 현 plan은 **small을 나중 렌더 (위에)** — HTML 순서 기준. G1/육안에서 확인.

6. **HatchedDivider 공통 승격:** 이번 섹션에서 로컬로 두고, Values/Vision 섹션에서 재등장 시 `src/components/ui/`로 승격. 현재는 **AboutMission 내부에 두는** 것으로 YAGNI 준수.

7. **G1 <5% 규율:** 3회 수정 안에 통과. 미통과 시 즉시 사용자 보고.

## 10. 사용자 승인 요청 항목

- [ ] `HatchedDivider`를 AboutMission 로컬 컴포넌트로 시작 OK? (Values/Vision에서 재등장 시 `src/components/ui/`로 승격)
- [ ] 본문 강조 녹색 `#4FB654`를 **arbitrary**(Tailwind `text-[#4FB654]`)로 시작 OK? (CSS 변수 신설 대신)
- [ ] 본문 줄바꿈을 **`<br>` 수동 삽입**으로 baseline에 맞추는 접근 OK? (CSS `max-width` + auto-wrap은 1차 loop에서 시도)
- [ ] 사진 2개의 `border-radius` 초기값 30/20px 시작, G1 결과에 따라 조정 OK?
- [ ] 예상 G1 목표 **< 5% (3.5~4.8% 기대)** 동의?
- [ ] SectionTabs는 이 섹션에 포함 안 함 (탭은 AboutHeader 전용) 동의?

---

## 측정 섹션 (단계 5·6에서 채워짐)

### 1회차 (2026-04-14)

**G1 시각 일치:** `scripts/compare-section.sh about-mission --clip-x 0 --clip-y 0 --clip-w 1920 --clip-h 754`
- **DIFF: 4.23%** (61,263 / 1,447,680px) — **PASS (<5%)**
- diff image: `tests/visual/diffs/about-mission.diff.png`

**G2 치수 정확도** (measure-about-mission.ts 실측):
| 요소 | 기대 | 실측 | 판정 |
|------|-----|------|------|
| section | 1920×754 | 1920×754 | PASS |
| h2 (제목) | x=493, y=68, font 28px, lh 33px, weight 700 | 동일 | PASS |
| p (para1) | x=493, y=68+41+66=175, w=577, font 16px, lh 24px | x=493, y=175, w=577 | PASS |
| p (para2) | y=175+144+33=352, w=577 | y=352, w=577 | PASS |
| photo-large | (1070,258) 357×359, radius 30px | 동일 | PASS |
| photo-small | (887,531) 145×161, radius 20px | 동일 | PASS |
| HatchedDivider top | x=494, y=0, w=932, h=10 | 동일 | PASS |
| HatchedDivider bottom | x=494, y=744, w=932, h=10 | 동일 | PASS |

모든 값이 Figma baseline 측정치와 ±1px 이내. **PASS**

**G3 에셋 무결성:**
| img | naturalWidth | naturalHeight | 판정 |
|-----|--------------|---------------|------|
| photo-large.png | 357 | 359 | PASS (>0) |
| photo-small.png | 145 | 161 | PASS (>0) |

**G4 색상 정확도:**
| 요소 | 기대 hex | 실측 rgb | 판정 |
|------|---------|----------|------|
| 제목 녹색 강조 | #4FB654 | rgb(79,182,84) = #4FB654 | PASS |
| 본문 다크 | #1d2623 | rgb(29,38,35) = #1D2623 | PASS |
| 본문 녹색 강조 (para1) | #4FB654 | rgb(79,182,84) = #4FB654 | PASS |
| 본문 녹색 강조 (para2) | #4FB654 | rgb(79,182,84) = #4FB654 | PASS |
| 강조 font-weight | 600 (semibold) | 600 | PASS |

**육안 semantic 검증 (docs §6.4):**
- baseline / capture / diff 3종 Read로 직접 비교
- 제목 2줄 녹색 강조 범위: PASS (ESG실천네트워크(ESGPN) 녹색, "를" 다크)
- 사진 2장 위치·크기·radius·z-index: PASS (large 뒤, small 앞에 overlap)
- HatchedDivider 상하 2개: PASS (양쪽 존재, 좌우 해치+실선)
- 전체 수직 정렬: PASS
- 본문 줄바꿈 위치: para1 줄 분할이 baseline 대비 1줄 차이 발생 가능(diff 영역 주 원인). G1 4.23%로 허용 범위 내
- **육안 검증: PASS**

**종합: G1/G2/G3/G4 + 육안 모두 PASS — 1회차 완료.**

---

## 멈춤 지점

**단계 2 완료. 단계 3~7은 사용자 승인 후 별도 지시를 기다림.**
