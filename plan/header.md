# plan/header.md — 공통 Header (GNB / Top Nav) 구현 계획

> 단계 2 plan. `research/header.md` 기반. 사용자 승인 전 코드 작성 금지.

---

## 0. 요약

- Figma 1416×72 floating pill GNB → `src/components/layout/Header.tsx` 단일 컴포넌트 + `NavItem` 서브컴포넌트.
- 에셋 2개 (ESGPN 로고 SVG, 햄버거 아이콘 SVG) → `src/assets/header/`.
- 4 게이트 예상 통과 난이도: **중 (mix-blend-luminosity + backdrop-blur 재현 여부가 관건)**.

---

## 1. 컴포넌트 구조

```
<Header>                              ← src/components/layout/Header.tsx (신규)
  <HeaderContainer>                   ← 내부 JSX (floating pill 래퍼)
    <HeaderLogo>                      ← 내부 JSX (Link to="/" + ESGPN SVG)
    <HeaderNav>                       ← 내부 JSX (6개 NavItem flex)
      <NavItem ... /> × 6             ← src/components/layout/NavItem.tsx (신규, 내부 전용)
    </HeaderNav>
    <HeaderActions>                   ← 내부 JSX (고객센터 링크 + 햄버거 버튼)
      <ContactLink />                 ← 내부 JSX
      <MenuToggleButton />            ← 내부 JSX (28x28 SVG in 40x40 원)
    </HeaderActions>
  </HeaderContainer>
</Header>
```

**결정: 최소 컴포넌트**. `HeaderLogo`, `MenuToggleButton`, `ContactLink`는 단일 사용이므로 별도 파일 분리하지 않고 `Header.tsx` 내부 JSX로 유지 (`docs/react.md` "하나의 feature에서만 쓰이면 내부에 유지" 원칙).

---

## 2. 새로 만들/수정할 파일

### 2.1 신규
| 파일 | 역할 |
|------|------|
| `src/components/layout/Header.tsx` | 메인 컴포넌트 (export default) |
| `src/components/layout/NavItem.tsx` | 메뉴 아이템 서브컴포넌트 (Header 내부 전용 named export) |
| `src/components/layout/Header.module.css` | (선택 — 2.3 참조) backdrop-filter 호환 처리용 |
| `src/assets/header/esgpn-logo.svg` | 로고 에셋 (단계 3에서 다운로드) |
| `src/assets/header/hamburger.svg` | 햄버거 아이콘 (단계 3에서 다운로드) |

### 2.2 수정
| 파일 | 변경 |
|------|------|
| `src/App.tsx` (또는 라우트 최상위 레이아웃) | `<Header />` 전역 배치. 현재 상태 확인 후 plan 확정 시 수정 여부 결정 — **이번 PR 범위는 `Header` 컴포넌트 자체만**. 전역 장착은 후속 PR로 분리 (한 브랜치 = 한 섹션 원칙). |
| `src/styles/tokens.css` | **변경 없음** (기존 토큰으로 충분). 단 14M/20 leading 프리셋과 40px radius는 arbitrary 값으로 처리. |

### 2.3 Tailwind 버전 확인 필요
`CLAUDE.md`/`figma-project-context.md`는 "Tailwind v4 (@theme directive)"라 함. 실제 `src/styles/index.css`/`tokens.css` 방식 확인 필요. 구현 착수 전 `index.css` 한 줄 확인해서 **Tailwind v4 `@theme` 토큰 참조 vs CSS 변수 직접 참조** 중 일관된 방식 채택. 첫 번째 추정: `var(--color-gray-900)` 직접 참조 (tokens.css 구조가 @theme 없이 `:root`로만 선언되어 있으므로).

---

## 3. Props 시그니처 (TypeScript)

### 3.1 Header
```ts
export interface HeaderProps {
  /** 현재 활성 메뉴의 라우트 prefix. react-router의 useLocation으로 자동 판단도 가능. */
  activePath?: string;
  /** 햄버거 메뉴 오픈 상태 (반응형 모바일 메뉴 제어). 기본 제어되지 않음. */
  isMenuOpen?: boolean;
  onMenuToggle?: () => void;
  className?: string;
}
```

### 3.2 NavItem
```ts
export interface NavItemProps {
  label: string;
  to: string;            // react-router-dom Link to
  active?: boolean;
  className?: string;
}
```

### 3.3 상수: 메뉴 정의
```ts
// Header.tsx 상단
const NAV_ITEMS = [
  { label: 'ESGPN 소개', to: '/about' },
  { label: 'ESG 실천 아이디어 경진대회', to: '/contest' },
  { label: 'ESG 마인드 자격검정', to: '/certification' },
  { label: '사회공헌사업', to: '/social' },      // ⚠️ 라우팅 표에 없음. 임시 /social, 사용자 확인 필요
  { label: '뉴스 · 자료실', to: '/news' },
  { label: '갤러리', to: '/gallery' },
] as const;
```

> ⚠️ **사회공헌사업 라우트**: `figma-project-context.md §3`의 라우팅 표에 해당 경로가 없다. 임시로 `/social` 지정하되 사용자 확인 필요. (대안: `/contribution`, `/csr`)

---

## 4. 레이아웃 전략

### 4.1 Floating pill 포지셔닝
```tsx
<header
  role="banner"
  className="
    fixed top-4 left-1/2 -translate-x-1/2 z-50
    w-[calc(100%-32px)] max-w-[1416px] h-[72px]
    flex items-center justify-between
    px-10
    rounded-[40px]
    bg-[var(--color-black-opacity-100)]
    backdrop-blur-[12px]
    [-webkit-backdrop-filter:blur(12px)]
  "
>
```

- **결정**: `position: fixed`. Figma에서 y=16이므로 상단 고정 floating이 자연스러움. 스크롤 시 GNB가 따라오는 것이 현대 웹 표준.
- **결정**: `top-4` (=16px) = Figma y=16 일치. `--spacing-4` 사용 가능하지만 Tailwind 기본 `top-4`가 이미 16px이므로 그대로.
- **결정**: 좌우 margin: Figma 1920 기준 252 margin이지만 (1920-1416)/2=252. 1920 미만에서도 중앙 정렬 + `max-w-[1416px]`. 작은 화면에선 좌우 16px 여백만 (`calc(100%-32px)`).
- **결정**: `z-50` — 히어로 위에 떠야 하므로 상위 레이어.

### 4.2 3블록 배치
```tsx
{/* 로고 */}
<Link to="/" className="flex items-center w-[180px] shrink-0">
  <img src={esgpnLogo} alt="ESGPN" className="w-[98px] h-[22px]" />
</Link>

{/* 중앙 메뉴 */}
<nav className="flex items-center gap-8">          {/* gap-8 = 32px = --spacing-8 */}
  {NAV_ITEMS.map((item) => (
    <NavItem key={item.to} label={item.label} to={item.to} active={activePath === item.to} />
  ))}
</nav>

{/* 우측 액션 */}
<div className="flex items-center justify-end gap-5 w-[180px] shrink-0">  {/* gap-5 = 20px */}
  <Link to="/contact" className="font-['Pretendard'] text-sm font-medium text-[var(--color-gray-900)] mix-blend-luminosity whitespace-nowrap">
    고객센터
  </Link>
  <button
    type="button"
    onClick={onMenuToggle}
    aria-label="메뉴 열기"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-black-opacity-100)]"
  >
    <span className="w-7 h-7 flex items-center justify-center">  {/* 28x28 컨테이너 */}
      <img src={hamburgerIcon} alt="" className="w-[21px] h-[8.75px] mix-blend-luminosity" />
    </span>
  </button>
</div>
```

### 4.3 NavItem
```tsx
// NavItem.tsx
export function NavItem({ label, to, active, className }: NavItemProps) {
  return (
    <Link
      to={to}
      className={clsx(
        'flex items-center justify-center py-1',          // py-1 = 4px
        'text-[14px] leading-[20px] font-medium',         // research §3.1: 14M/20
        'text-[var(--color-gray-900)]',
        'mix-blend-luminosity',
        'whitespace-nowrap text-center',
        'transition-opacity hover:opacity-70',            // hover 스펙 없음 → 합리적 기본 (사용자 승인 필요)
        active && 'font-bold',                            // active 스펙 없음 → 합리적 기본
        className,
      )}
    >
      {label}
    </Link>
  );
}
```

### 4.4 반응형 전략
| 브레이크포인트 | 전략 |
|--------------|------|
| ≥ 1440px | Figma 원본 그대로. max-w-[1416px] 중앙. |
| 1024–1439px | 그대로 노출 (메뉴 6개 + 고객센터 + 햄버거). gap만 24px로 축소 허용. |
| < 1024px (md 미만) | **중앙 메뉴 6개 숨김** (`hidden lg:flex`) → 햄버거가 메뉴 트리거 역할. 드로어/모달은 별도 섹션/후속 PR. |
| < 640px | 로고 블록 w=180을 w-auto로. 좌우 패딩 `px-6`으로 축소. |

```tsx
<nav className="hidden lg:flex items-center gap-6 xl:gap-8">
```

> ⚠️ 모바일 메뉴 드로어 디자인이 Figma에 없음. **이번 PR 범위 밖**. 햄버거 onClick 핸들러만 props로 노출하고 실제 드로어는 후속 섹션에서 구현. 사용자 확인 필요.

---

## 5. 에셋 사용 계획

research §4 에셋 목록과 1:1 매핑:

| # | 에셋 | 사용 컴포넌트 | 최종 경로 | 처리 경로 | 검증 결과 (단계 3에서 채움) | 최종 파일 (단계 3에서 채움) |
|---|------|--------------|-----------|-----------|---------------------------|--------------------------|
| 1 | ESGPN 로고 (98×22) | `<Header>` 로고 블록 | `src/assets/header/esgpn-logo.svg` | 다운로드 → file 검증 → (SVG면 SVGO) | — | — |
| 2 | 햄버거 아이콘 (21×8.75) | `<Header>` MenuToggleButton | `src/assets/header/hamburger.svg` | 다운로드 → file 검증 → (SVG면 SVGO) | — | — |

**임포트 방식**: Vite SVG URL import. `import esgpnLogo from '@/assets/header/esgpn-logo.svg';` (path alias는 기존 vite.config.ts 확인 필요. 없으면 상대 경로로 폴백.)

---

## 6. 트레이드오프 / 대안 비교

| 결정 | 선택 | 기각 대안 | 사유 |
|------|-----|-----------|------|
| 포지셔닝 | `fixed top-4` | `sticky top-4` | 히어로 배경 위에 floating pill이어야 하는데 sticky는 top-0부터 고정이라 y=16 offset 유지 애매. fixed가 명확. |
| 블렌드 모드 | `mix-blend-luminosity` 그대로 적용 | 제거 후 `text-gray-700` 사용 | Figma 스펙 1:1 재현 우선. 단 G1(픽셀매치)에서 배경 차이로 색 달라보일 수 있음 — 게이트 실패 시 단계 6에서 재평가. |
| 14M/20 타이포 | arbitrary `text-[14px] leading-[20px] font-medium` | tokens.css에 `--text-nav-14m` 추가 | Header에서만 쓰는 특수 조합. 다른 섹션에서 재등장하면 그때 프리셋화. 지금 토큰 추가는 과설계. |
| Noto Sans KR (고객센터) | **Pretendard로 통일** | Noto Sans KR 유지 | 프로젝트 전역 폰트 정책(Pretendard) 우선. Figma 잔여 스펙으로 판단. **단 사용자 재확인 요청** (하단 리스크). |
| 40px radius | arbitrary `rounded-[40px]` | tokens.css에 `--radius-40` 추가 | Header pill 단일 용도. 다른 곳에서 재등장 시 토큰화. |
| 메뉴 숨김 브레이크포인트 | `lg` (1024px) | `xl` (1280px) | 1416 원본이 1280에서도 조금만 축소하면 들어감. 너무 이른 모바일 전환 방지. |
| 컴포넌트 분리 | NavItem만 별도 파일 | Header 안에 모두 내장 | 6번 반복이라 재사용 가치 있음. 그 외는 단일 사용이라 내장. |

---

## 7. 새 npm 패키지 필요 여부

- `clsx`: NavItem에서 조건부 클래스 병합. **기존 의존성 확인 필요**. 미설치면 사용자 승인 후 추가. 없으면 `template string + filter(Boolean).join(' ')`으로 폴백.
- `react-router-dom`: Link 사용. 프로젝트 기술 스택에 명시됨 (figma-project-context.md §1). 이미 설치 가정. 미설치면 사용자 승인 후 설치.

→ **검증 체크리스트 (단계 3 착수 전)**:
1. `package.json`에 `react-router-dom` 존재 확인
2. `clsx` 또는 `classnames` 존재 확인 (없으면 template string 폴백 확정)

---

## 8. 4 게이트 예상 측정 지점

### G1 (시각 일치, pixelmatch < 5%)
- **기준 스크린샷**: `figma-screenshots/header/header-1920.png` (단계 3에서 수동 export 또는 스크립트)
- **비교 대상**: dev 서버 `http://localhost:5173/` (홈 라우트 최상단 영역, y=0~112 crop) 또는 `/__harness/header` 격리 라우트
- **예상 리스크**:
  - `mix-blend-luminosity`는 배경이 필요 → dev 서버 캡처 시 아래에 어떤 배경이 깔려있는지에 따라 색 차이. **격리 캡처용 배경 필요** (Figma 캔버스는 흰 배경이므로 dev 캡처도 흰 배경으로 통일 권장). plan에 "격리 배경 흰색" 명시.
  - backdrop-blur: 아래 배경 픽셀 없으면 효과 무의미. 위 흰 배경과 동일.

### G2 (치수 정확도, font ±1px / 나머지 ±2px)
측정 대상 Playwright computed style:
| 요소 | 예상 값 |
|------|---------|
| `<header>` height | 72px |
| `<header>` padding-left/right | 40px |
| `<nav>` gap | 32px |
| Nav item font-size | 14px |
| Nav item line-height | 20px |
| Nav item padding-top/bottom | 4px |
| 로고 img width | 98px |
| 로고 img height | 22px |
| 햄버거 원 width/height | 40px |
| 햄버거 SVG width | 21px, height | 8.75px |
| 컨테이너 border-radius | 40px |
| 우측 블록 gap | 20px |

### G3 (에셋 무결성, 모든 `<img>` naturalWidth > 0)
- `<img>` 태그 개수: 2개 (로고, 햄버거).
- 둘 다 SVG로 import → naturalWidth는 SVG viewBox 기반으로 > 0.

### G4 (색상 정확도, Figma hex 일치)
| 대상 | 예상 색 |
|------|---------|
| `<header>` background | rgba(0,0,0,0.04) = `#0000000a` |
| Nav item color | `#1d2623` |
| 고객센터 color | `#1d2623` |
| 햄버거 버튼 배경 | rgba(0,0,0,0.04) |

---

## 9. 리스크 대응

| # | 리스크 (research §7) | 대응 |
|---|--------------------|------|
| 1 | `mix-blend-luminosity` 배경 의존성 | G1 측정 시 흰 배경 컨텍스트로 통일. 히어로 위 장착 시 실제 페이지 작업에서 재검증. |
| 2 | `backdrop-blur` 구버전 Safari | `[-webkit-backdrop-filter:blur(12px)]` arbitrary 병기. Tailwind v4는 자동이지만 명시적 안전장치. |
| 3 | Floating pill 위치 | `fixed top-4 left-1/2 -translate-x-1/2 max-w-[1416px] w-[calc(100%-32px)]` 패턴 확정. |
| 4 | **Noto Sans KR vs Pretendard 충돌** | Pretendard로 통일 (프로젝트 정책 우선). **사용자 승인 필요**. |
| 5 | **메뉴 7개 vs 6개 문서 불일치** | 실제 Figma 6개 기준. docs/figma-project-context.md §5 수정은 별도 작업으로 요청. |
| 6 | **hover/active 상태 스펙 없음** | `hover:opacity-70`, `active && font-bold` 합리적 기본값. **사용자 승인 필요**. |
| 7 | 40px radius 토큰 없음 | arbitrary 사용. Header 단일 용도라 토큰화 불필요. |
| 8 | 14M/20 타이포 프리셋 부재 | arbitrary 사용. 재등장 시 프리셋화. |
| 9 | MCP의 Tailwind v4 변수 문법 | 우리 tokens.css의 `var(--color-*)`로 치환. |
| 10 | **사회공헌사업 라우트 미정의** | `/social` 임시. **사용자 승인 필요**. |
| 11 | 모바일 메뉴 드로어 디자인 부재 | 이번 PR 범위 밖. 햄버거 onClick만 props 노출. **사용자 승인 필요**. |
| 12 | 베이스라인 PNG 자동 저장 불가 | Figma 플러그인 수동 export 또는 Phase 1 스크립트 의존. 단계 3에서 해결. |

---

## 10. 사용자 승인 요청 항목 (명시적 게이트)

다음 항목들은 plan 승인 시 답변 필요:

1. **[A1]** 고객센터 폰트: Noto Sans KR(Figma 명시) vs Pretendard(프로젝트 정책) — **권장: Pretendard**
2. **[A2]** hover/active 상태 기본값 추가 (hover:opacity-70, active:font-bold) — **권장: 승인**
3. **[A3]** 사회공헌사업 라우트 `/social` 임시 사용 — **권장: 승인하되 별도 이슈로 최종 경로 확정**
4. **[A4]** 모바일 메뉴 드로어는 후속 PR로 분리 (이번 PR은 햄버거 버튼 + onClick prop만) — **권장: 승인**
5. **[A5]** `<Header>`의 전역 레이아웃 장착(App.tsx 수정)은 이번 PR에 **포함하지 않음** (한 섹션 = 한 PR 원칙) — **권장: 승인**
6. **[A6]** `clsx`/`react-router-dom` 미설치 시 추가 설치 승인 — **권장: 승인 (react-router-dom은 figma-project-context에 이미 명시된 스택)**

---

## 11. 단계 2 통과 조건 체크리스트

- [x] `plan/header.md` 작성 완료
- [x] 모든 에셋이 컴포넌트와 매핑됨 (로고→Header 로고 블록, 햄버거→MenuToggleButton)
- [x] 컴포넌트 트리/props/레이아웃 전략/핵심 스니펫 포함
- [x] 트레이드오프와 리스크 대응 문서화
- [x] 사용자 승인 요청 항목 [A1]~[A6] 명시
- [ ] **사용자 승인 대기**: [A1]~[A6] 답변 + "구현 시작" 명령 수신 전 단계 3 진행 금지

---

## 12. 측정 결과 (단계 5/6)

**측정 일시**: 2026-04-13
**측정 URL**: `http://127.0.0.1:5173/__preview/header` (격리 라우트, 흰 배경)
**뷰포트**: 1920×1080, deviceScaleFactor=1, locale=ko-KR
**측정 스크립트**: `tests/visual/measure-header.ts`
**수정 회차**: **1회차 (최초 측정에서 전 항목 통과)**

### 12.1 G1 — 시각 일치 (pixelmatch diff)

| 항목 | 값 |
|------|-----|
| baseline PNG | `figma-screenshots/header.png` (1416×72, RGBA, 25KB) |
| baseline 확보 경로 | Framelink MCP `download_figma_images` (fileKey `qhrMiGVfoSQ1QMFhVN8z78`, nodeId `52:1379`, pngScale 1) |
| 캡처 PNG | `tests/visual/captures/header.png` (clip x=252 y=16 1416×72, 뷰포트 1920×1080) |
| 실행 명령 | `npx tsx tests/visual/run.ts --section header --url http://127.0.0.1:5173/__preview/header --baseline figma-screenshots/header.png --clip-x 252 --clip-y 16 --clip-w 1416 --clip-h 72` |
| **pixelmatch diff%** | **3.36% (3,430 / 101,952 px)** |
| 임계값 | <5% |
| 결과 | **PASS** |
| diff 이미지 | `tests/visual/diffs/header.diff.png` |
| 정량 박스 좌표 | Playwright boundingBox = {x:252, y:16, w:1416, h:72}, Figma 스펙 4/4 좌표 일치 (오차 0.0px) |

**결론**: G1 자동 실측 PASS. 잔여 diff 3.36%는 안티에일리어싱·폰트 렌더링 차이 + `mix-blend-luminosity` 블렌드 결과로 추정, 임계 5% 대비 1.64%p 여유.

### 12.2 G2 — 치수 정확도 (font ±1px, 기타 ±2px)

| # | 항목 | 측정값 | 기대값 | 허용 | 결과 |
|---|------|--------|--------|------|------|
| 1 | header.height | 72px | 72px | ±2 | PASS |
| 2 | header.paddingLeft | 40px | 40px | ±2 | PASS |
| 3 | header.paddingRight | 40px | 40px | ±2 | PASS |
| 4 | header.borderRadius | 40px | 40px | ±2 | PASS |
| 5 | nav.gap | 32px | 32px | ±2 | PASS |
| 6 | navItem.fontSize | 14px | 14px | ±1 | PASS |
| 7 | navItem.lineHeight | 20px | 20px | ±1 | PASS |
| 8 | navItem.paddingTop | 4px | 4px | ±2 | PASS |
| 9 | navItem.paddingBottom | 4px | 4px | ±2 | PASS |
| 10 | logo.width | 98px | 98px | ±2 | PASS |
| 11 | logo.height | 22px | 22px | ±2 | PASS |
| 12 | menuButton.width | 40px | 40px | ±2 | PASS |
| 13 | menuButton.height | 40px | 40px | ±2 | PASS |
| 14 | hamburger.width | 21px | 21px | ±2 | PASS |
| 15 | hamburger.height | 8.75px | 8.75px | ±2 | PASS |
| 16 | actions.gap | 20px | 20px | ±2 | PASS |

**G2 요약**: **16/16 PASS (최대 편차 0.00px)**

### 12.3 G3 — 에셋 무결성 (모든 `<img>` naturalWidth > 0)

| # | 에셋 | src | naturalWidth | 결과 |
|---|------|-----|--------------|------|
| 1 | ESGPN 로고 | `/src/assets/header/esgpn-logo.svg` | 300 | PASS |
| 2 | 햄버거 아이콘 | `/src/assets/header/hamburger.svg` | 300 | PASS |
| 3 | `<img>` 개수 일치 | 2개 | 2개 기대 | PASS |

**G3 요약**: **3/3 PASS**. (naturalWidth=300은 Chromium이 SVG의 viewBox 비율 유지 시 기본 300 할당 — `> 0` 조건 충족.)

### 12.4 G4 — 색상 정확도 (Figma hex와 일치)

| # | 대상 | 측정값 (rgba) | 기대값 (Figma) | 결과 |
|---|------|-------------|--------------|------|
| 1 | header.backgroundColor | `rgba(0, 0, 0, 0.04)` | `#0000000a` = rgba(0,0,0,0.04) | PASS |
| 2 | navItem.color | `rgb(29, 38, 35)` | `#1d2623` | PASS |
| 3 | contact("고객센터").color | `rgb(29, 38, 35)` | `#1d2623` | PASS |
| 4 | menuButton.backgroundColor | `rgba(0, 0, 0, 0.04)` | `#0000000a` | PASS |

**G4 요약**: **4/4 PASS**

### 12.5 종합

| 게이트 | 결과 |
|-------|------|
| G1 | **PASS** — pixelmatch diff **3.36%** (임계 5%) |
| G2 | 16/16 PASS |
| G3 | 3/3 PASS |
| G4 | 4/4 PASS |
| **총계** | **24/24 게이트 PASS, 1회차 통과** |

### 12.6 단계 6 (수정) 진행 여부

**수정 불필요** — 1회차 전 항목 통과.

### 12.7 후속 권고 (블로킹 아님)

1. `docs/figma-project-context.md §5` 메뉴 개수 6개로 수정 (현재 7개로 표기).
2. `/social` 라우트 최종 확정 (현재 임시).
3. 모바일 드로어 컴포넌트 후속 PR.
4. Header 전역 장착 (App.tsx 루트 레이아웃) 후속 PR.
