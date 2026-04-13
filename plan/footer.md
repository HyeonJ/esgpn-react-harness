# plan/footer.md — 공통 Footer 구현 계획

> 단계 2 plan. `research/footer.md` 기반. 사용자 승인 전 코드 작성 금지.

---

## 0. 요약

- Figma 1920×708 풀폭 푸터 → `src/components/layout/Footer.tsx` 단일 컴포넌트.
- 최상위는 `<footer>` 시맨틱 태그, 내부는 2단 (Top Row 정보/네비 + 대형 ESGPN 워터마크).
- 고유 에셋 3개 (divider-10, divider-8, ESGPN 워터마크) → `src/assets/footer/`.
- 4 게이트 예상 통과 난이도: **하~중** (Header보다 쉬움 — backdrop-filter 없음, mix-blend 없음, 고정 포지션 아님. 유일한 변수는 워터마크 SVG/PNG 판정).

---

## 1. 컴포넌트 구조

```
<Footer>                                 ← src/components/layout/Footer.tsx (신규)
  <FooterContainer> <footer>             ← 내부 JSX 1920×708 풀폭
    <FooterTopRow>                       ← px-[252px] flex gap-10 (좌/우)
      <FooterLeftColumn>                 ← flex-1 flex-col gap-12
        <FooterInfoBlock>                ← flex-col gap-2 (각 줄 gap 8px)
          <FooterInfoLine type="line1">  ← "상호 : Colive | 대표이사 : 구현우 | 사업자등록번호 : "
          <FooterInfoLine type="line2">  ← "주소 : "
          <FooterInfoLine type="line3">  ← "고객센터 : | 개인정보관리책임자 : "
        </FooterInfoBlock>
        <FooterCopyright />              ← "COPYRIGHTⓒ2026 Aqu..."
      </FooterLeftColumn>
      <FooterNav>                        ← flex gap-4 items-center (h=21)
        <FooterNavLink to="/contact">1:1문의</FooterNavLink>
        <FooterDivider />
        <FooterNavLink to="/terms">이용약관</FooterNavLink>
        <FooterDivider />
        <FooterNavLink to="/privacy">개인정보취급방침</FooterNavLink>
        <FooterDivider />
        <FooterNavLink to="/location-terms">위치서비스이용약관</FooterNavLink>
      </FooterNav>
    </FooterTopRow>
    <FooterWatermark>                    ← w-full h=[432px]
      <img src={esgpnWatermark} />
    </FooterWatermark>
  </FooterContainer>
</Footer>
```

**결정: 최소 컴포넌트**. Header와 동일 정책 — 단일 파일 내부 JSX + 로컬 헬퍼 함수(`FooterDivider`, `FooterInfoLine`)로 가독성 확보. 별도 파일 분리하지 않음(`docs/react.md` "하나의 feature에서만 쓰이면 내부 유지" 원칙).

---

## 2. 새로 만들/수정할 파일

### 2.1 신규
| 파일 | 역할 |
|------|------|
| `src/components/layout/Footer.tsx` | 메인 컴포넌트 (export default + named) |
| `src/assets/footer/divider-10.svg` | 세로 구분자 SVG (단계 3 다운로드) |
| `src/assets/footer/divider-8.svg` | 세로 구분자 SVG (노드명 Line8, 단계 3에서 Line10과 해시 비교 후 동일하면 통합) |
| `src/assets/footer/esgpn-watermark.svg` (또는 `.png`) | ESGPN 대형 워터마크 (단계 3 `file` 명령으로 타입 확정 후 결정) |
| `src/routes/FooterPreview.tsx` | 격리 프리뷰 라우트 (Header 패턴 따름: `/__preview/footer`, 1920×708 캡처용) |
| `tests/visual/measure-footer.ts` | Playwright 치수/색상 측정 스크립트 (Header 패턴 복제) |

### 2.2 수정
| 파일 | 변경 |
|------|------|
| `src/App.tsx` | **제외 (이번 PR 범위 밖)**. 전역 `RootLayout` 장착은 Header처럼 **후속 PR**. 이번 PR은 컴포넌트 + preview 라우트만. `d728c47`에서 Header 전역 장착이 끝났으므로 같은 패턴으로 후속 PR에서 Footer도 `RootLayout`에 추가. |
| `src/styles/tokens.css` | **변경 없음**. `#0c0c0c`는 arbitrary로. (대안: `--color-footer-bg: #0c0c0c` 추가 검토 — 기각. 푸터 단독 사용.) |

### 2.3 의존성 체크
- `react-router-dom`: Header에서 이미 사용. 그대로 활용 (`<Link to>`). **추가 설치 불필요.**
- `clsx`: Header에서 설치 완료 (`package.json` 확인 필요하나 `Header.tsx`가 import 중이므로 확실). **추가 설치 불필요.**
- **새 npm 패키지 없음.**

---

## 3. Props 시그니처 (TypeScript)

### 3.1 Footer
```ts
export interface FooterProps {
  /** 보충 스타일 (전역 장착 시 조정용). */
  className?: string;
}
```

**prop 최소주의**: 콘텐츠는 전부 Figma 스펙 고정값으로 하드코딩. 실데이터(사업자번호, 주소 등) 주입은 후속 PR에서 props 확장으로 처리.

### 3.2 내부 상수
```ts
// Footer.tsx 상단
const COMPANY_INFO = {
  name: "Colive",
  ceo: "구현우",
  bizNumber: "", // placeholder, 실데이터 후속 주입
  address: "",
  customerPhone: "",
  privacyOfficer: "",
} as const;

const FOOTER_NAV = [
  { label: "1:1문의", to: "/contact" },
  { label: "이용약관", to: "/terms" },
  { label: "개인정보취급방침", to: "/privacy" },
  { label: "위치서비스이용약관", to: "/location-terms" },
] as const;

const COPYRIGHT_TEXT = "COPYRIGHTⓒ2026 Aqu.ALL  RIGHTS  RESERVED.";
// ⚠️ "Aqu.ALL" 사이 점 1개, "ALL  RIGHTS" 사이 공백 2개, "RIGHTS  RESERVED" 사이 공백 2개 — Figma 원문 보존.
```

---

## 4. 레이아웃 전략

### 4.1 Footer 컨테이너
```tsx
<footer
  role="contentinfo"
  className={clsx(
    "relative w-full bg-[#0c0c0c]",
    "flex flex-col items-start gap-20",  // gap-20 = 80px (spacing-20 없음 → 기본 Tailwind)
    "pt-12",                             // pt-12 = 48px
    className,
  )}
>
```
- `w-full` + `max-w-none` (1920 풀폭. Figma 고정 width 대신 상위 컨테이너 너비 따르기. 1920보다 좁은 viewport에서는 자동 축소 — 반응형 §4.4 참조)
- `bg-[#0c0c0c]`: arbitrary. 토큰 없음(research §7.1).
- `gap-20` (Tailwind 기본 80px = 20×4px). **주의**: Tailwind v4 기본 스케일. 커스텀 spacing 프리셋(`--spacing-*`)과 다름. 명시적으로 arbitrary `gap-[80px]`이 안전. → **arbitrary 사용 결정**.
- `pt-12` → arbitrary `pt-[48px]`로 통일 권장 (tokens.css `--spacing-12: 48px` 참조하려면 `pt-[var(--spacing-12)]`).
- **결정**: 모든 spacing을 Header 스타일(arbitrary) 또는 `var(--spacing-*)`로 명시 — tokens.css 참조가 일관성에 유리. 아래 스니펫은 `var(--spacing-*)` 사용:

```tsx
<footer
  role="contentinfo"
  className={clsx(
    "relative w-full bg-[#0c0c0c]",
    "flex flex-col items-start",
    "gap-[var(--spacing-20,80px)]",   // spacing-20 토큰 없음 → 폴백 80px
    "pt-[var(--spacing-12)]",          // 48px
    className,
  )}
>
```
- `--spacing-20` 토큰은 tokens.css에 없음 (spacing-14가 최대). **결정**: arbitrary `gap-[80px]`로 폴백 (토큰 추가하지 않음).

### 4.2 Top Row
```tsx
<div className="flex w-full items-start gap-[var(--spacing-10)] px-[252px]">
  {/* 좌측 */}
  <div className="flex min-w-0 flex-1 flex-col gap-[var(--spacing-12)]">
    {/* Info Block */}
    <div className="flex flex-col gap-[var(--spacing-2)] w-full">
      <FooterInfoLine1 />
      <FooterInfoLine2 />
      <FooterInfoLine3 />
    </div>
    {/* Copyright */}
    <p
      className="whitespace-pre font-[var(--font-family-pretendard)] text-[14px] leading-[1.5] font-normal text-[var(--color-gray-600)]"
    >
      {COPYRIGHT_TEXT}
    </p>
  </div>
  {/* 우측 */}
  <nav
    aria-label="푸터 메뉴"
    className="flex h-[21px] items-center gap-[var(--spacing-4)]"
  >
    {FOOTER_NAV.map((item, idx) => (
      <Fragment key={item.to}>
        {idx > 0 && <FooterDivider />}
        <Link
          to={item.to}
          className="font-[var(--font-family-pretendard)] text-[14px] leading-[1.5] font-bold text-[var(--color-gray-000)] whitespace-nowrap transition-opacity hover:opacity-70"
        >
          {item.label}
        </Link>
      </Fragment>
    ))}
  </nav>
</div>
```

**결정 메모**:
- `px-[252px]`: 1920 풀폭 전제. 반응형 대응은 §4.4에서 미디어쿼리로 축소.
- `gap-[var(--spacing-10)]` = 40 (top row 좌우 gap) ✅ 토큰 매칭.
- `gap-[var(--spacing-12)]` = 48 (left col 내부) ✅.
- `gap-[var(--spacing-2)]` = 8 (info block 라인 간격) ✅.
- `gap-[var(--spacing-4)]` = 16 (우측 네비) ✅.
- `h-[21px]`: 우측 네비 높이 고정 (Figma 명시).
- `min-w-0`: flex-1 자식의 텍스트 overflow 방지 (Tailwind 표준 팁).

### 4.3 FooterInfoLine / FooterDivider 헬퍼
```tsx
// Footer.tsx 내부
function FooterDivider() {
  return (
    <span
      aria-hidden="true"
      className="flex h-[10px] w-0 shrink-0 items-center justify-center"
    >
      <img
        src={dividerSvg}
        alt=""
        className="block h-[10px] w-[1px] shrink-0"
      />
    </span>
  );
}

// Info line 텍스트 공통 스타일
const infoTextClass =
  "font-[var(--font-family-pretendard)] text-[14px] leading-[1.5] font-normal text-[var(--color-gray-000)] whitespace-nowrap";

function FooterInfoLine1() {
  return (
    <div className="flex h-[21px] w-full items-center gap-[var(--spacing-2)]">
      <p className={infoTextClass}>상호 : Colive</p>
      <FooterDivider />
      <p className={infoTextClass}>대표이사 : 구현우</p>
      <FooterDivider />
      <p className={infoTextClass}>사업자등록번호 :{" "}</p>
    </div>
  );
}
// Line2 / Line3 동일 패턴
```

**결정**: MCP 원본의 `<div w=10 h=0 rotate-90>` 트릭(0px VECTOR를 90도 회전해 세로선으로 보이게)은 구현/가독성 나쁘고 SVG 사이즈도 1px 보정 필요. 대신 **SVG 파일 자체를 세로 1×10 픽셀로 export된 것으로 취급**해서 `<img w-[1px] h-[10px]>`로 그대로 배치. 단계 3에서 SVG 내용 확인 후 필요 시 CSS `border-l` 폴백도 준비 (단, CLAUDE.md 규칙 상 SVG 다운로드는 필수 — CSS 대체는 금지).

### 4.4 Watermark
```tsx
<div
  aria-hidden="true"
  className="relative h-[432px] w-full shrink-0"
>
  <img
    src={esgpnWatermark}
    alt=""
    className="absolute inset-0 block h-full w-full object-cover"
  />
</div>
```
- `h-[432px]`: 1920 뷰포트 기준 고정. 반응형 대응 시 `h-auto + aspect-[1920/432]`로 변경 검토.
- `object-cover`: 작은 화면에서 잘림 방지. 단, 원본 비율 40:9가 유지되면 `object-contain` 또는 `h-auto` 선호. **결정**: Figma와 1:1 맞추려면 1920에서는 `h-[432px] w-full object-cover`, 반응형에서는 `w-full h-auto + 비율 유지`. 단계 4 구현에서 재검토.
- **대안**: `object-cover` 대신 `<div>` 없이 `<img className="w-full h-auto" />`로 단순화 (워터마크가 SVG라면 스케일 자유). 단계 3 `file` 결과에 따라 결정.

### 4.5 반응형 전략
| 브레이크포인트 | 전략 |
|--------------|------|
| ≥ 1920px | Figma 원본 그대로 (`px-[252px]`, `h-[432px]`). |
| 1440–1919px | `px-[calc(50%-708px)]` 또는 `max-w-[1416px] mx-auto`? → **결정**: `px-[252px]`를 유지하되 `max-w-full`. 1440에서 좌우 여백이 좁아지는 건 자연스러움 — Figma 원본 의도를 최대한 보존. 단 `px`가 viewport 대비 과하면 컨텐츠가 잘림 → 중간 브레이크: `xl:px-[252px] px-[60px]` |
| 1024–1439px (`lg`) | `px-[60px]`, 워터마크 `h-auto aspect-[1920/432]` |
| <1024px | 우측 네비를 info block 아래로 줄바꿈 (`flex-col` 또는 `flex-wrap`). 워터마크 `aspect-[1920/432]` 유지. **사용자 확인 필요** (Figma 모바일 디자인 부재). |

**이번 PR 범위**: 1920 기준 1:1 재현 우선. 1440 이하 반응형은 G1/G2 통과 이후 후속 작업 — plan §4.5 규칙만 구현(1920에서 완벽, 하위 viewport는 깨지지 않기만 하면 OK). 반응형 diff 측정은 이번 섹션 범위 밖.

---

## 5. 에셋 사용 계획

research §4 에셋 목록과 1:1 매핑:

| # | 에셋 | 사용 위치 | 최종 경로 | 처리 경로 | 검증 결과 (단계 3 채움) | 최종 파일 (단계 3 채움) |
|---|------|----------|-----------|-----------|------------------------|--------------------------|
| 1 | divider (Line10) | FooterDivider × 6 (Line1 ×2, 우측 네비 ×3, Line3 ×1 **중복 시**) | `src/assets/footer/divider-10.svg` | 다운로드 → `file` → SVG면 SVGO | — | — |
| 2 | divider (Line8) | Line3의 1개 divider (Line10과 동일 해시면 통합) | `src/assets/footer/divider-8.svg` 또는 divider-10.svg로 통합 | 다운로드 → sha256 비교 → (동일 시 파일 1개로 병합) | — | — |
| 3 | ESGPN 워터마크 | FooterWatermark `<img>` | `src/assets/footer/esgpn-watermark.{svg,png}` | 다운로드 → `file` → SVG면 SVGO, PNG면 2x 보관 | — | — |

**임포트 방식**: Vite SVG URL import (Header와 동일).
```ts
import divider10 from "@/assets/footer/divider-10.svg";
import divider8 from "@/assets/footer/divider-8.svg";  // 통합 시 제거
import esgpnWatermark from "@/assets/footer/esgpn-watermark.svg";  // 또는 .png
```

### 5.1 divider 중복 판정 시나리오 (단계 3)
```bash
sha256sum src/assets/footer/raw/divider-10-raw divider-8-raw
# 같으면: rm divider-8-raw → FooterDivider 단일 import
# 다르면: 둘 다 보존 → Line3 divider만 divider-8 사용
```

---

## 6. 트레이드오프 / 대안 비교

| 결정 | 선택 | 기각 대안 | 사유 |
|------|-----|-----------|------|
| 컨테이너 | `<footer role="contentinfo">` 시맨틱 | `<div>` | 접근성 + HTML5 표준 |
| 배경 토큰화 | arbitrary `bg-[#0c0c0c]` | `tokens.css`에 `--color-footer-bg` 추가 | 단독 사용. 다른 섹션에서 재등장 시 토큰화. |
| Watermark 타입 | 단계 3 `file` 판정에 따라 SVG 또는 PNG | - | 우선 SVG 기대 (VECTOR 그룹이므로). PNG여도 1920×432 원본 해상도로 대응 가능. |
| divider 구현 | `<img>` 태그 + SVG 에셋 | CSS `border-left` 또는 `w-px h-[10px] bg-white` | CLAUDE.md "에셋 URL 무조건 다운로드. CSS/유니코드 대체 금지" 규칙. |
| divider 두 파일 병합 | 단계 3에서 해시 비교 후 결정 | 처음부터 `divider.svg` 1개 | MCP가 다른 URL로 export한 이유 확인 필요 (stroke-width/opacity 미세 차이 가능). |
| 우측 네비 링크 | `<Link to="/...">` 4개 (임시 경로) | `<a href="#">` placeholder | react-router 일관성 (Header와 동일). 임시 경로는 추후 확정. |
| 반응형 1차 범위 | 1920에서만 1:1, 하위는 깨지지 않기만 | 전체 브레이크포인트 적응 | 섹션 단위로 집중 — diff 측정은 1920만. 후속 PR에서 반응형. |
| Copyright 공백 처리 | `whitespace-pre` + 원문 그대로 | 공백 정규화 | Figma 스펙 1:1 재현 (더블스페이스 보존). |
| Info line placeholder | 빈 문자열 유지 (`"사업자등록번호 : "`) | 더미 데이터 채움 | Figma 그대로. 실데이터는 후속 PR props로. |
| 전역 장착 | **이번 PR 범위 밖** | 동일 PR에서 `RootLayout` 수정 | 한 섹션 = 한 PR 원칙 (Header 전례 동일). |

---

## 7. 새 npm 패키지 필요 여부

- `clsx`, `react-router-dom`: Header에서 확보 완료. **추가 없음.**
- **신규 패키지 0개.** 사용자 승인 불필요.

---

## 8. 4 게이트 예상 측정 지점

### G1 (시각 일치, pixelmatch < 5%)
- **baseline**: `figma-screenshots/footer.png` (1920×708 PNG) ✅ 저장 완료.
- **비교 대상**: dev 서버 `/__preview/footer` 격리 라우트, viewport 1920×1080, clip 불필요 (풀폭).
- **실행 명령 (예상)**:
  ```bash
  scripts/compare-section.sh footer
  # 또는 clip 없이
  npx tsx tests/visual/run.ts --section footer --url http://127.0.0.1:5173/__preview/footer --baseline figma-screenshots/footer.png
  ```
- **예상 리스크**:
  - **워터마크 안티앨리어싱**: SVG vs Figma 렌더링 미세 차이 (Header 3.36% 수준 예상).
  - **폰트 렌더링 차이**: Pretendard 14R/14B × 한글. Header와 동일 이슈.
  - **`#0c0c0c` 순 검정에 가까움** → diff 영역 자체는 아주 작은 비율만 차지. 유리함.
  - **divider 1px 선**: 서브픽셀 정렬 차이 가능. 영향 미미.
  - **예상 diff: 2~4%** (Header 3.36% 대비 mix-blend 없고 backdrop-blur 없어 유리).

### G2 (치수 정확도, font ±1px / 기타 ±2px)
측정 대상 Playwright computed style (신규 `tests/visual/measure-footer.ts`):

| # | 요소 | 기대값 | 허용 |
|---|------|--------|------|
| 1 | footer.height | 708px | ±2 |
| 2 | footer.width | 1920px | ±2 |
| 3 | footer.paddingTop | 48px | ±2 |
| 4 | footer rowGap (flex gap) | 80px | ±2 |
| 5 | topRow.paddingLeft | 252px | ±2 |
| 6 | topRow.paddingRight | 252px | ±2 |
| 7 | topRow.gap | 40px | ±2 |
| 8 | leftCol.gap | 48px | ±2 |
| 9 | infoBlock.gap | 8px | ±2 |
| 10 | infoLine.height | 21px | ±2 |
| 11 | infoText.fontSize | 14px | ±1 |
| 12 | infoText.lineHeight | 21px (1.5 × 14) | ±1 |
| 13 | infoText.fontWeight | 400 | ±0 |
| 14 | copyright.fontSize | 14px | ±1 |
| 15 | copyright.color | rgb(124, 137, 133) (=#7c8985) | - |
| 16 | rightNav.gap | 16px | ±2 |
| 17 | rightNav.height | 21px | ±2 |
| 18 | navLink.fontWeight | 700 | ±0 |
| 19 | watermark.height | 432px | ±2 |
| 20 | watermark.width | 1920px | ±2 |

### G3 (에셋 무결성, 모든 `<img>` naturalWidth > 0)
- DOM `<img>` 개수 기대: **7~8개** (divider 6~7 + 워터마크 1) — divider 통합 여부에 따라 변동. **단계 3 결정 후 plan 업데이트**.
- 모두 SVG/PNG → `naturalWidth > 0` 통과 예상.

### G4 (색상 정확도, Figma hex 일치)
| # | 대상 | 기대값 |
|---|------|-------|
| 1 | footer.backgroundColor | rgb(12, 12, 12) = `#0c0c0c` |
| 2 | infoText.color | rgb(255, 255, 255) = `#ffffff` |
| 3 | copyright.color | rgb(124, 137, 133) = `#7c8985` |
| 4 | navLink.color | rgb(255, 255, 255) = `#ffffff` |
| 5 | (참고) 워터마크 fill (SVG inline) | `#0c3b0e` — SVG 내부 값이므로 measure 대상 아님 |

---

## 9. 리스크 대응

| # | 리스크 (research §7) | 대응 |
|---|--------------------|------|
| 1 | `#0c0c0c` 토큰 미바인딩 | arbitrary `bg-[#0c0c0c]`. 재사용 0회 예상. |
| 2 | 워터마크 단일 이미지 | SVG 기대. PNG여도 2x 원본 사용. |
| 3 | 워터마크 파일 타입 미확정 | 단계 3에서 `file` 명령으로 확정 후 plan의 import 경로 업데이트. |
| 4 | divider 중복 가능성 | 단계 3 sha256 비교 → 동일 시 파일 1개로 통합, 코드 import도 1개. |
| 5 | **우측 네비 링크 타겟 미정의** | 임시 경로 지정 (`/terms`, `/privacy`, `/location-terms`). **사용자 승인 필요**. 확정 전까지는 임시 유지. |
| 6 | "1:1문의" Bold 처리 | Figma 스펙 그대로 Pretendard 14B. 다른 네비와 동일 weight. |
| 7 | Copyright 공백 보존 | `whitespace-pre` + 원문 문자열. 편집기 자동 정규화 금지 (ESLint 규칙 확인). |
| 8 | 텍스트 `whitespace-nowrap` overflow | 1920에서는 여유. 1440 이하에서는 `overflow-hidden` 또는 줄바꿈 허용. 후속 PR. |
| 9 | "사업자등록번호 : " placeholder | 빈 값 유지. 후속 PR에서 props 주입. |
| 10 | 워터마크 fill 재바인딩 | SVG 내부 inline fill 유지. tokens.css 참조 불가능(SVG spec). 브랜드 색 변경 시 에셋 재다운로드. |
| 11 | 전역 장착 후속 PR | Header `d728c47` 패턴 답습. 이번 PR은 컴포넌트 + preview 라우트만. |
| 12 | Framelink 스키마 미노출 (이 세션 한정) | REST API 폴백으로 baseline 확보 완료. 기능적 차이 없음. |

---

## 10. 사용자 승인 요청 항목 (명시적 게이트)

다음 항목들은 plan 승인 시 답변 필요:

1. **[A1]** 우측 네비 링크 임시 경로 (`/contact`, `/terms`, `/privacy`, `/location-terms`) — **권장: 승인하되 후속 PR에서 최종 경로 확정**
2. **[A2]** Footer 전역 장착(App.tsx `RootLayout` 수정)은 이번 PR **범위 밖** — **권장: 승인 (Header와 동일 원칙)**
3. **[A3]** 반응형 적응(<1920px)은 이번 PR 범위 밖. 1920 1:1 재현만 게이트 적용 — **권장: 승인**
4. **[A4]** 워터마크가 PNG로 판명될 경우 2x 해상도로 보관 — **권장: 승인**
5. **[A5]** divider 2개가 동일 해시면 `divider.svg` 1파일로 통합 — **권장: 승인**
6. **[A6]** "사업자등록번호 / 주소 / 고객센터 / 개인정보관리책임자" 값은 Figma와 동일하게 빈 placeholder 유지 (후속 PR에서 실데이터 주입) — **권장: 승인**

---

## 11. 단계 2 통과 조건 체크리스트

- [x] `plan/footer.md` 작성 완료
- [x] 모든 에셋이 컴포넌트와 매핑됨 (divider-10 → FooterDivider, divider-8 → Line3 divider(통합 검토), ESGPN → FooterWatermark)
- [x] 컴포넌트 트리/props/레이아웃 전략/핵심 스니펫 포함
- [x] 트레이드오프와 리스크 대응 문서화
- [x] 사용자 승인 요청 항목 [A1]~[A6] 명시
- [ ] **사용자 승인 대기**: [A1]~[A6] 답변 + "구현 시작" 명령 수신 전 단계 3 진행 금지

---

## 12. 측정 결과 (단계 5/6)

### 12.1 단계 3 에셋 결과 (A5 적용)
- divider SVG 2개 다운로드 후 sha256 비교: **해시 다름** (`5f6d2e…` vs `b5a3229…`)
  - 차이는 `id="Line 10"` vs `id="Line 8"` 메타뿐, **stroke / viewBox / 좌표 동일** (`<line y1=0.5 x2=10 y2=0.5 stroke=#7C8985>`).
  - 시각적 동일 → **A5 권장값에 따라 1파일(`divider.svg`)로 통합**, `divider-8.svg` 폐기.
- 워터마크: **SVG로 판명** (4.7KB, viewBox 1920×432, fill `#0C3B0E`). PNG 아님 → A4 2x 보관 불필요.
- divider stroke 색이 흰색 추정이었으나 실제 `#7C8985` (gray-600). 코드 영향 없음 (SVG inline fill).
- 최종 에셋 (`src/assets/footer/`):
  - `divider.svg` (257 B, image/svg+xml)
  - `esgpn-watermark.svg` (4.77 KB, image/svg+xml)
- SVGO 미설치 → 후처리 스킵 (CLAUDE.md 허용).

### 12.2 측정 결과 (시도 1회차) — 모두 통과 ✅

**G1 — 시각 일치 (pixelmatch)**
- diff: **0.41 %** (5538 / 1359360 px), 목표 < 5 % → **PASS**
- diff 이미지: `tests/visual/diffs/footer.diff.png`

**G2 — 치수 정확도 (Playwright computed style)**

| # | 항목 | actual | expected | tol | 결과 |
|---|------|--------|----------|-----|------|
| 1 | footer.width | 1920 | 1920 | ±2 | PASS |
| 2 | footer.height | 708 | 708 | ±2 | PASS |
| 3 | footer.paddingTop | 48 | 48 | ±2 | PASS |
| 4 | footer.rowGap | 80 | 80 | ±2 | PASS |
| 5 | topRow.paddingLeft | 252 | 252 | ±2 | PASS |
| 6 | topRow.paddingRight | 252 | 252 | ±2 | PASS |
| 7 | topRow.columnGap | 40 | 40 | ±2 | PASS |
| 8 | leftCol.rowGap | 48 | 48 | ±2 | PASS |
| 9 | infoBlock.rowGap | 8 | 8 | ±2 | PASS |
| 10 | infoLine.height | 21 | 21 | ±2 | PASS |
| 11 | infoLine.columnGap | 8 | 8 | ±2 | PASS |
| 12 | infoText.fontSize | 14 | 14 | ±1 | PASS |
| 13 | infoText.lineHeight | 21 | 21 | ±1 | PASS |
| 14 | infoText.fontWeight | 400 | 400 | 0 | PASS |
| 15 | copyright.fontSize | 14 | 14 | ±1 | PASS |
| 16 | copyright.fontWeight | 400 | 400 | 0 | PASS |
| 17 | rightNav.columnGap | 16 | 16 | ±2 | PASS |
| 18 | rightNav.height | 21 | 21 | ±2 | PASS |
| 19 | navLink.fontWeight | 700 | 700 | 0 | PASS |
| 20 | navLink.fontSize | 14 | 14 | ±1 | PASS |
| 21 | watermark.height | 432 | 432 | ±2 | PASS |
| 22 | watermark.width | 1920 | 1920 | ±2 | PASS |

→ **22 / 22 PASS**

**G3 — 에셋 무결성**
- DOM `<img>` 개수: **7** (divider 6 + 워터마크 1) — 기대 7개 일치
- 모든 `naturalWidth` > 0 (모두 300) → **7 / 7 PASS**

**G4 — 색상 정확도**

| 대상 | actual | expected | 결과 |
|------|--------|----------|------|
| footer.backgroundColor | rgb(12, 12, 12) | #0c0c0c | PASS |
| infoText.color | rgb(255, 255, 255) | #ffffff (gray-000) | PASS |
| copyright.color | rgb(124, 137, 133) | #7c8985 (gray-600) | PASS |
| navLink.color | rgb(255, 255, 255) | #ffffff | PASS |

→ **4 / 4 PASS**

### 12.3 종합
- **시도 횟수: 1회차에 모든 게이트 통과** (단계 6 수정 루프 불필요)
- summary: **34 / 34 측정 항목 PASS**
- diff 0.41 %는 Header(3.36 %) 대비 매우 양호 — 예상대로 mix-blend / backdrop-blur 부재 + 단색 배경 유리.
