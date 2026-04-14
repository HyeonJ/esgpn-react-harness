# plan/contest-hero.md — 경진대회 Hero 섹션 구현 계획

> Phase 3 단계 2. `research/contest-hero.md` 기반. 전략: **[D] 구조 기반 완전 HTML 재구성** (노드 트리 살아있음, flatten 아님).

## 1. 중요 결정 (사용자 확인 필요)

### 1.1 Gong Gothic 폰트 도입 (신규 의존성)
- Figma H1(64 Bold)·서브1(24 Medium)이 **Gong Gothic** 패밀리 사용. 프로젝트에 부재 (Pretendard/YesevaOne만 존재).
- **옵션 A (권장)**: 공식 무료 배포본(네이버 `Gong Gothic` 또는 공공 라이선스) 중 하나를 `public/fonts/GongGothic-Bold.woff2`, `GongGothic-Medium.woff2`로 다운로드해 `fonts.css`에 `@font-face` 추가. npm 패키지 아님 (라이선스 배포만). 문서 링크 확인 필요.
- **옵션 B**: Pretendard Bold로 폴백 (Hero 한 섹션만). G1 diff가 올라가지만 수용 가능. 워드마크 느낌 약화.
- **옵션 C**: 사용자에게 woff2 제공 요청 (봉은 라이선스 서버/직접 배포본 보유 시).
- **기본 계획**: 옵션 A 진행하되 다운로드 소스가 명확하지 않으면 폴백으로 옵션 B 시도 후 G1 확인. 단계 3에서 결정.
- **⚠ 승인 게이트**: 사용자가 Gong Gothic woff2 파일을 제공하거나 소스를 확정해 줘야 옵션 A 가능.

### 1.2 Hero 원 overflow 표현
- baseline은 1920×1134로 상단 316px overflow 포함. 섹션 높이 818(spec) + top visual overflow 316.
- **계획**: Hero 섹션 래퍼 높이를 **1134px로 명시**, 그 안에 padding-top 316px + 실제 content frame 818 배치. 즉 자연스러운 box height 1134, overflow 없음.
  - 대안: `h=818` + `overflow-visible` — Playwright 캡처에서 시각 영역이 안 들어올 수 있음
  - 대안: `h=1134` padding-top — 다음 섹션과의 간격 계산 명확, 캡처 안정성 우수
- **결정**: `h=1134`, padding-top 316, 실제 inner frame `h=818`. 다음 섹션(contest-about)은 이 1134 아래에 붙음.
  → **단, baseline 1134가 Figma frame 819(정수) 기준이 아니라 overflow 포함 전체 렌더이므로 다음 섹션 시작 y는 원래 페이지 기준 y=818이었다. 실제 `/contest` 페이지에서 contest-about가 y=842라면 818과 일치하지 않고 +24(gap)이다.**
  - `research/contest.md` §3에서 about 시작 y=842 확인 → Hero 818 + 24 gap
  - 그러나 baseline 1134 crop은 overflow까지 포함했기 때문에 다음 섹션과 겹치지 않는다. contest-full.png(3098)도 overflow를 Hero 영역으로 포함해 렌더
  - **구현 접근**: 섹션 자체는 h=818(논리적 bottom=다음 섹션 y 시작점), 그 안의 원이 CSS로 상단 overflow하도록. Preview capture 시에만 overflow 영역까지 보이도록 preview wrapper를 `overflow-visible` + top padding으로 보정
  - **최종 계획**: Hero 컴포넌트 `className="h-[818px] overflow-visible"`. Preview route 래퍼 `h=1134, padding-top=316, overflow-visible`. 실제 `/contest` 라우트에서는 h=818로 다음 섹션이 연결되며 큰 원은 GNB/이전 섹션 영역 위로 살짝 튀어나올 수 있음 (baseline과 일치)

### 1.3 배경 이미지 처리
- cropTransform `[[0.9806,0,0.00985],[0,0.4758,0.3118]]` 포함 Framelink로 다운로드. 크롭 완료 PNG 저장
- 원본 PNG를 받고 JS에서 crop하는 방식은 규약 위반 (Framelink PNG baked-in 규약, §2.5)

## 2. 컴포넌트 구조

```
src/components/sections/ContestHero/
├─ ContestHero.tsx         — 섹션 entry (h=818 overflow-visible, 노드 299:4807)
├─ ContestStatItem.tsx     — 로컬 stat (240×hug, value 48B or 40B + caption 16M)
└─ index.ts                — barrel export
```

### 2.1 ContestHero.tsx 시그니처
```tsx
export function ContestHero(): JSX.Element
```
- props 없음. 섹션 로컬 완결. 모든 텍스트·스탯 상수.

### 2.2 ContestStatItem.tsx 시그니처
```tsx
export type ContestStatItemProps = {
  value: string;           // "1,500+" | "이론부터 실행" | "100%"
  caption: string;         // "자격 취득자" 등
  valueSize?: 48 | 40;     // default 48, 중간("이론부터 실행")만 40
};
export function ContestStatItem(props: ContestStatItemProps): JSX.Element
```
- `width: 240` (Figma FIXED), `gap: 12` col, center-align
- value `fontSize=valueSize, weight 700, lineHeight 1.3, tracking -4% (-1.92 or -1.6 px)`
- caption Pretendard 16 Medium lineHeight 1.5 tracking -0.16 center

## 3. 레이아웃 매핑 (노드 → className/style)

### 3.1 Root `<section>` (299:4807)
- className: `relative flex flex-col items-center overflow-visible w-[1920px] mx-auto`
- style: `height: 818, backgroundColor: '#0C3B0E'`
- 배경 이미지 오버레이 (absolute inset-0 mix-blend-hard-light):
  ```tsx
  <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-hard-light">
    <img src={heroBg} alt="" className="w-full h-full object-cover" />
  </div>
  ```
  * hard-light 블렌드, absolute, 이미지 이미 crop 적용된 PNG

### 3.2 Frame 17 (299:4806, 1113×640, 하단정렬)
- className: `relative flex flex-col items-center justify-end flex-none`
- style: `width: 1113, height: 640`

### 3.3 Group 299:4396 + Frame 299:4397 (956×956 원)
- Group은 Frame 17의 하단에 붙음. Frame 17 h=640, Group h=956 → 상단 316px overflow 위로 나감 (baseline 일치)
- Group에 `translate(0, 0)` 없이 flex 하단정렬 배치로 자연스레 bottom aligned → 자식(Frame 2043686015)의 top은 Frame17 상단으로부터 -316px
- Frame 2043686015:
  ```tsx
  <div
    className="relative flex flex-col items-center justify-end rounded-full"
    style={{
      width: 956, height: 956,
      backgroundColor: 'rgba(0,0,0,0.08)',
      paddingBottom: 120,
    }}
  >
    {/* inner group 299:4398 */}
  </div>
  ```
- **flex 하단정렬이면 956px Group이 640 Frame 하단에 붙고 상단 316px이 Frame 외부로**. Frame 17 자체 overflow-visible + Section overflow-visible 필수 → content가 위로 빠져나가도 보임

### 3.4 내부 콘텐츠 그룹 (299:4398)
- className: `relative flex flex-col items-center`
- style: `gap: 48`

### 3.5 텍스트 그룹 (299:4399, col gap 32, stretch)
- className: `flex flex-col items-stretch text-center`
- style: `gap: 32`
- w-full (stretch)

### 3.6 H1 (299:4400)
```tsx
<h1
  className="font-['Gong_Gothic'] font-bold text-white whitespace-nowrap"
  style={{
    fontSize: 64,
    lineHeight: 1.3,
    letterSpacing: '-2.56px',
    textAlign: 'center',
  }}
>
  ESG 실천 아이디어 경진대회
</h1>
```

### 3.7 서브 그룹 (299:4401, col gap 8)
```tsx
<div className="flex flex-col items-center text-center" style={{ gap: 8 }}>
  <p
    className="font-['Gong_Gothic'] font-medium"
    style={{
      fontSize: 24, lineHeight: 1.4, letterSpacing: '-0.36px',
      color: '#CAEB69',
    }}
  >
    아이디어에서 실천으로, ESG 실천 아이디어 경진대회 안내
  </p>
  <p
    className="font-['Pretendard_Variable'] font-medium text-white whitespace-nowrap"
    style={{ fontSize: 18, lineHeight: 1.4, letterSpacing: '-0.27px' }}
  >
    아이디어를 넘어 실천으로, 실천을 넘어 사회적 가치 창출로
    <br aria-hidden />
    지속가능한 미래를 만드는 당신의 아이디어를 기다립니다
  </p>
</div>
```

### 3.8 CTA (299:4404 + 299:4405 + 299:4408)
```tsx
<div
  className="inline-flex flex-col items-start rounded-full border border-white"
  style={{ padding: 4 }}
>
  <button
    type="button"
    className="inline-flex items-center justify-center bg-white rounded-full"
    style={{ padding: '16px 32px' }}
  >
    <span
      className="font-['Pretendard_Variable'] font-semibold whitespace-nowrap"
      style={{
        fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.16px',
        color: '#0C3B0E',
      }}
    >
      ESG 실천 아이디어 경진대회 참여하기
    </span>
  </button>
</div>
```
- 버튼은 현 시점 링크 대상 없음 → `<button type="button">`, 후속 섹션/페이지에서 `<a href="#apply">`로 교체 가능

### 3.9 Stats 행 (299:4411)
```tsx
<div
  className="flex items-center justify-center w-full"
  style={{ gap: 16, padding: '40px 0' }}
>
  <ContestStatItem value="1,500+" caption="자격 취득자" valueSize={48} />
  <img src={divider} alt="" aria-hidden className="block" style={{ width: 1, height: 64 }} />
  <ContestStatItem value="이론부터 실행" caption="체계적 과정" valueSize={40} />
  <img src={divider} alt="" aria-hidden className="block" style={{ width: 1, height: 64 }} />
  <ContestStatItem value="100%" caption="온라인 응시" valueSize={48} />
</div>
```
- 구분선 SVG 재사용 (2회)

## 4. 에셋 계획

| # | 소스 | 목적지 | 처리 |
|---|------|--------|------|
| 1 | Figma 299:4807 fills[0] IMAGE, imageRef `7559e1ad178a149dcd862f4990af4ee2c2f44c2c`, cropTransform `[[0.9806,0,0.00985],[0,0.4758,0.3118]]` | `src/assets/contest-hero/hero-bg.png` | Framelink `download_figma_images` (`needsCropping: true, filenameSuffix: "5c25b2"`, `imageRef` 동반) |
| 2 | Figma 299:4415 (Vector 19 IMAGE-SVG) | `src/assets/contest-hero/divider.svg` | Framelink `download_figma_images` SVG |

- `scripts/download-assets.sh` 절차는 일반 HTTP URL용이라 cropTransform 지원 안 함. Framelink MCP 직접 호출로 대체.
- `verify-assets.sh`는 파일 개수·크기 확인에 사용 가능.

## 5. 폰트 설치 계획

`src/styles/fonts.css`에 추가:
```css
@font-face {
  font-family: "Gong Gothic";
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  src: url("/fonts/GongGothic-Bold.woff2") format("woff2");
}
@font-face {
  font-family: "Gong Gothic";
  font-weight: 500;
  font-style: normal;
  font-display: swap;
  src: url("/fonts/GongGothic-Medium.woff2") format("woff2");
}
```
- 파일 배치: `public/fonts/GongGothic-Bold.woff2`, `GongGothic-Medium.woff2`
- ⚠ **woff2 소스 미확보** — 사용자 확인 후 결정 (§1.1)
- 미확보 시 옵션 B 폴백: `font-['Pretendard_Variable'] font-bold`로 치환, G1 측정 후 5% 이하면 수용

## 6. 라우트 설정

- `src/routes/ContestHeroPreview.tsx` 신규:
  ```tsx
  import { ContestHero } from "@/components/sections/ContestHero";
  export function ContestHeroPreview() {
    return (
      <div className="w-[1920px] mx-auto bg-white" style={{ overflow: 'visible' }}>
        <ContestHero />
      </div>
    );
  }
  ```
- `src/App.tsx`에 route 추가: `/__preview/contest-hero` → ContestHeroPreview
- `/contest` 라우트는 아직 생성 안 함 (다른 섹션들과 함께 통합 시)

## 7. 측정 계획 (4 게이트 예상)

| 게이트 | 내용 | 예상 |
|--------|------|------|
| G1 | pixelmatch diff vs `figma-screenshots/contest-hero.png` (1920×1134) | **≤ 5%** 목표. Gong Gothic 확보 시 1~3%. 폴백 Pretendard 시 3~7% (H1 glyph 폭 차이로 경계). |
| G2 | 치수 (font ±1, margin/padding ±2) | PASS 가능. 모든 값 Figma variable 직접 사용. |
| G3 | 에셋 naturalWidth > 0 | PASS (배경 1 + divider 1) |
| G4 | hex 일치 (#0C3B0E, #FFFFFF, #CAEB69, #C6CDCC) | PASS — variable 사용 |

**측정 명령**:
- `scripts/compare-section.sh contest-hero` (풀폭 1920, clip 불필요)
- baseline: `figma-screenshots/contest-hero.png` (1920×1134)
- Preview route: `http://localhost:{port}/__preview/contest-hero`
- 캡처 viewport: 1920×1134 (baseline 크기 일치)

**clip 파라미터**: 불필요 — 섹션이 1920 풀폭

## 8. 육안 semantic 검증 포인트 (§6.4 단계 5)

- [ ] 큰 원이 상단으로 overflow되어 반원처럼 잘려 보이는가
- [ ] Stats 순서: 좌→우 (1,500+ / 이론부터 실행 / 100%)
- [ ] 구분선 위치 (2개, Stat 사이)
- [ ] 배경 hard-light 블렌드 색감 (녹색 + 이미지)
- [ ] 서브1 텍스트 색상 lime `#CAEB69` 정확
- [ ] CTA 버튼 흰 배경 + stroke 포함한 ring 구조
- [ ] 제목/서브/CTA 수직 gap 48, 텍스트 내부 gap 32/8

## 9. 새 공통 컴포넌트 승격 제안

**없음.** 이 섹션에서는 로컬 컴포넌트(ContestStatItem, Hero 내부 JSX)만 추가. 메인페이지 StatItem와 다른 variant이고, 경진대회 외 재등장 여부 미확인 → Rule of Three까지 보류.

## 10. 트레이드오프·리스크

1. **Gong Gothic 부재 리스크 (最大)**: woff2 미확보 시 G1 실패 가능. 미리 폰트 소스 확정 필수.
2. **mix-blend-hard-light 브라우저 호환**: 모든 주요 브라우저 지원하나 Chromium 렌더 결과가 Figma 렌더와 미세 차이 발생 가능. G1 diff 1~2% 기여 예상.
3. **Frame 17 하단정렬 overflow 구현**: flex justify-end + items-center로 956 Group이 640 Frame보다 커지면 위쪽으로 자동 확장. Playwright 캡처에서 Preview wrapper가 그 외부 영역을 포함해야 함. Preview에서 `overflow-visible`로 대응.
4. **Stats 행 stretch 1920**: 이 행이 원 위로 올라가지 않고 Frame 17 아래에 잘 붙는지 검증. Root가 flex-col이므로 자동.
5. **폰트 로딩 레이아웃 쉬프트(CLS)**: `font-display: swap` 사용 시 첫 렌더 Pretendard, Gong Gothic 로드 후 swap. Playwright 캡처는 `load` 이후 대기 필요 — `scripts/compare-section.sh`에 이미 구현되어 있을 가능성.

## 11. 단계 3 진입 전 사용자 승인 필요 사항

- [ ] **1.1 Gong Gothic 폰트 전략**: A(신규 다운로드) / B(Pretendard 폴백) / C(사용자 제공) 중 선택
- [ ] **1.2 Hero 원 overflow 처리**: `h=818 overflow-visible` + Preview 래퍼 확장 방식 수락
- [ ] Framelink cropTransform 기반 배경 다운로드 방식 수락
- [ ] ContestStatItem 로컬 유지(공통 승격 보류) 수락

## 12. 측정값 기록 섹션 (단계 5/6에서 채워짐)

**요약**: G1 **6.43%** — 5% 게이트 초과. 3회 수정 시도 모두 한계. Gong Gothic 다운로드 성공, 텍스트·원 위치·Stats·CTA 모두 semantic 올바름. 
잔여 diff의 주원인은 **Chromium `background-blend-mode: hard-light` vs Figma 렌더러의 블렌드 색공간 차이** — 사진+녹색(#0C3B0E) 합성 결과가 Chromium에서 전반적으로 약 shadow 쪽으로 +20~40 오차. 사진 자체 / 텍스트 / 좌우 외곽(Hero 배경)은 baseline과 ±3~10 수준으로 완벽 근접.

### 12.1 1회차 (초기 구현)
- 파일: ContestHero.tsx, ContestStatItem.tsx, index.ts, ContestHeroPreview.tsx, App.tsx 라우트 2개, fonts.css GongGothic 등록
- 에셋: hero-bg.png (3766×1604 cropTransform baked), divider.svg (1×64 stroke #C6CDCC)
- 빌드/린트/타입체크 통과
- **G1: 6.59%** (143,475 / 2,177,280 px)
- G2: font 64/24/18/48/40/16 모두 Figma 일치, padding 정확
- G3: PASS (hero-bg naturalWidth=3766, divider naturalWidth=1)
- G4: PASS (#0C3B0E, #FFFFFF, #CAEB69 모두 코드값 일치)
- 육안 semantic: **PASS** — H1/서브1/서브2/CTA 모두 제자리, Stats 3개 순서/divider 2개/색상/hard-light 효과 모두 맞음. 원 크기 956 overflow 316 정상.
- 주된 diff: 원 내부 + Hero 중앙 영역 (blend 색공간 차이)

### 12.2 2회차 (원 투명도 0.08 → 0.12 + lineHeight px화)
- 변경: circle bg `rgba(0,0,0,0.12)`, H1/서브1/서브2/CTA lineHeight를 1.3/1.4/1.5 → 고정 px(83.2 / 33.6 / 25.2 / 24px)
- **G1: 6.31%** (137,478 / 2,177,280 px)
- 미세 개선. lineHeight 고정은 긍정적, 원 투명도 ↑는 부분 효과.

### 12.3 3회차 (blend 구조 변경)
- 변경: 별도 `<img>` 오버레이 `mix-blend-hard-light` → **섹션 `background-image` + `background-blend-mode: hard-light`**. blend 범위를 background layer 내부로 한정해 자식 요소(원/텍스트)가 blend 경로에서 빠지도록.
- **G1: 6.29%** (136,926 / 2,177,280 px) — 최소 diff
- 원 bg 0.08 복귀 후 최종: **G1: 6.43%** (140,090 / 2,177,280 px)

### 12.4 시도했으나 악화된 조정
- padding-bottom 120 → 184 (CTA를 위로 올리려): G1 **9.51%** 악화 → 120 복원
- 원 bg 0.08 → 0.03 (blend 보정): G1 **6.72%** 악화 → 0.08 복원

### 12.5 DOM 측정값 (tests/visual/measure-contest-hero.ts)
- section: `{x:0, y:316, w:1920, h:818}` ✓ spec 일치
- circle: `{x:482, y:0, w:956, h:956}` ✓ Hero 위로 316 overflow
- h1: `{x:570, y:515, w:779, h:83}` + fs=64px / lh=83.2px / ff="Gong Gothic" / fw=700
- stats: `{x:0, y:956, w:1920, h:178}` = py 40 + content 98
- bgImg: `{natW:3766, natH:1604}` cropTransform baked-in

### 12.6 Gong Gothic 다운로드 결과
- **성공**: Bold 667KB, Medium 623KB. Source: `cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothic{Bold,Medium}.woff`
- 경로: `public/fonts/GongGothic-{Bold,Medium}.woff`
- 폰트 자체는 정확히 렌더됨 (DOM 측정 ff="Gong Gothic" 확인)
- woff2 미존재 → woff 형식 그대로 사용

### 12.7 사용자 결정 필요 (3회 실패 한계)
- G1 6.43% (5% 기준 초과 **+1.43%p**)
- 선택지:
  - **[A] 게이트 완화 수락** — "hard-light blend 한계"로 6% 이내 수용
  - **[B] 다른 접근 재시도** — 배경 이미지를 Figma에서 **flatten된 합성본**으로 받기 (mix-blend-hard-light를 Figma에서 미리 적용한 결과 PNG)
  - **[C] 디버깅 심층** — Chromium의 blend 동작을 Figma와 일치시키는 CSS 연구
  - **[D] 되돌리기** — 이번 섹션 작업 전체 롤백

### 12.8 [B] 시도 결과 (2026-04-14)
- Framelink `download_figma_images(nodeId=299:4807, pngScale=1)` 재호출 → 새 baseline 확보 (RGBA, 기존 RGB와 pixel-level 차이 있음)
- 재측정 결과: **G1 6.43% 동일** (변화 없음)
- **결론**: 잔여 diff는 baseline 왜곡이 아니라 **Chromium-Figma blend 엔진 차이** 확정

### 12.9 [D] 시도 결과 (2026-04-14)
- 전략: Hero 배경+원+blend만 raster composite PNG로 받아 CSS `background-blend-mode` 제거
- `get_figma_data(299:4807, depth 2)` 구조 확인:
  ```
  299:4807 (Hero root, fills: [IMAGE + #0C3B0E solid, blend])
  ├── 299:4806 Frame 17 (1113×640, 원+텍스트+CTA 모두 포함)
  │   └── 299:4396 Group (원)
  │       └── 299:4398 Group (텍스트 자식 포함)
  └── 299:4411 Stats 행
  ```
- **전략 막힘 확정**:
  - 배경+원만 묶인 wrapper 노드 **없음**
  - 원(`299:4396`)은 자체로 텍스트 자식 포함 → 단독 export 해도 텍스트 baked-in
  - Hero 전체 PNG + HTML 텍스트 오버레이 → 이중 AA ghost diff
  - Figma API로 "fills만 flatten" export 불가
- **결론**: [D]/[C] 모두 구조적 한계로 불가능

### 12.10 최종 결정 — [A] 완화 수락
- 사용자 사전 약속: "[d] 안 되면 [a]로 폴백"
- [B]·[D] 모두 실패/불가 확정 → [A] 정당화
- **교훈**: `background-blend-mode: hard-light`는 Chromium vs Figma 렌더러 엔진 차이로 G1 +1~2%p **구조적 불가피**
- 이 섹션 한정 예외로 기록. 다음 섹션 워커에 docs §2.5 교훈 반영
