# research/header.md — 공통 Header (GNB / Top Nav)

> 단계 1 리서치. 이 문서는 단계 2 plan 작성 전 **진실의 원천**이다.

---

## 1. 섹션 메타

| 항목 | 값 |
|------|-----|
| Figma Node ID | `52:1379` (인스턴스) / `52:1378` (원본 컴포넌트, 코드의 `data-node-id`로 확인) |
| Figma 파일 | `qhrMiGVfoSQ1QMFhVN8z78` (ESG 실천네트워크) |
| 컨테이너 사이즈 | **1416 × 72 px** |
| 캔버스 위치 | x=252, y=16 (1920 부모 기준 → 좌우 252 여백, 상단 16 offset; **floating pill 스타일**) |
| 부모 페이지 | 공통 컴포넌트 (모든 라우트 상단 고정) |
| 라우트 | 전역 (`Header` 레이아웃 컴포넌트) |
| 권장 구현 위치 | `src/components/layout/Header.tsx` (figma-project-context.md §5 카탈로그 준수) |

---

## 2. 레이아웃 구조 (Figma 원본)

최상위 컨테이너 (`52:1378` "Top Nav"):
- **flex, items-center, justify-between**
- `h-[72px]`, `w-[1416px]` (고정)
- `px-[40px]` (좌우 패딩)
- `rounded-[40px]` (pill 형태)
- `bg-rgba(0,0,0,0.04)` (= `--color-black-opacity-100`, Figma 토큰)
- `backdrop-blur-[12px]` (프로스티드 글래스)

자식 3블록 (justify-between으로 분배):

```
[Top Nav 1416x72]
├─ [로고 블록 w=180] (52:1350)
│   └─ [ESGPN 이미지 98x22] (299:1969) → imgEsgpn
├─ [메뉴 블록 flex gap-32] (52:1358 "nemu")
│   ├─ 1depth "ESGPN 소개" (52:1359)
│   ├─ 1depth "ESG 실천 아이디어 경진대회" (52:1361)
│   ├─ 1depth "ESG 마인드 자격검정" (52:1363)
│   ├─ 1depth "사회공헌사업" (52:1365)
│   ├─ 1depth "뉴스 · 자료실" (52:1367)
│   └─ 1depth "갤러리" (52:1369)
└─ [프로필정보 블록 flex gap-20 w=180 justify-end] (52:1371)
    ├─ "고객센터" 텍스트 (52:1372)
    └─ [Equals 원형 버튼 40x40, rounded-full, bg-black-opacity-100] (52:1375)
        └─ [Vector 햄버거 아이콘 28x28] (I52:1376;79:6098) → imgVector
```

> ⚠️ **figma-project-context.md §5는 "메뉴 7개"라고 적혀있으나 실제 Figma는 메뉴 6개** (ESGPN 소개 / 경진대회 / 자격검정 / 사회공헌사업 / 뉴스·자료실 / 갤러리). "고객센터"는 우측 별도 블록으로 메뉴가 아니다. plan에 이 불일치 메모.

---

## 3. 사용된 디자인 토큰 (tokens.css 매칭)

`get_variable_defs(52:1379)` 결과 3개 변수 확인:

| Figma 변수 | 값 | tokens.css 변수 | 상태 |
|-----------|----|----|------|
| `Gray Scale/Gray 900 (Dark BG, Text)` | `#1d2623` | `--color-gray-900` | ✅ 이미 존재 |
| `spacing/8` | `32` | `--spacing-8` | ✅ 이미 존재 |
| `Opacity/Black Opacity 100` | `#0000000a` (rgba 0,0,0,0.04) | `--color-black-opacity-100` | ✅ 이미 존재 |

### 3.1 타이포그래피 (MCP 코드에서 파싱)
- **메뉴 1depth 텍스트** (52:1360 외 5개): `Pretendard:Medium`, **14px / line 20px**, center, `whitespace-nowrap`, `mix-blend-luminosity`, color = `gray-900`
  - → tokens.css 상 `--text-pretendard-14r/14b`는 있지만 **14M (Medium, leading 20)은 정확히 일치하는 프리셋이 없다**.
  - 가장 가까운 프리셋: `--text-sm-14m` (14px, 500, lh 1.5=21, ls -0.5px) — **leading과 letter-spacing이 불일치**.
  - **권장**: Tailwind arbitrary 값으로 `text-[14px] leading-[20px] font-medium`로 직접 지정하거나, tokens.css에 `--text-nav-14m`(14/500/20/0) 프리셋 추가. plan에서 결정 필요.
- **고객센터 텍스트** (52:1373): `Noto Sans KR:Medium`, 14px, `leading: 1.5` (=21), `mix-blend-luminosity`, color = `gray-900`
  - Pretendard가 아닌 **Noto Sans KR**. Figma에서 한글 전용 폰트를 강제한 것인지, 단순 잔여물인지 불분명.
  - `docs/figma-project-context.md §1`의 폰트 정책(Pretendard 한글)과 충돌.
  - **권장**: plan에서 Pretendard Medium으로 통일 (프로젝트 정책 우선). plan에 명시적으로 기록. 사용자 재확인 권장.

### 3.2 색상
- 배경: `rgba(0,0,0,0.04)` = `--color-black-opacity-100` ✅
- 텍스트: `#1d2623` = `--color-gray-900` ✅

### 3.3 사이즈/스페이싱
- 컨테이너 높이 72, 라운드 40 → tokens.css에 **40px radius 토큰 없음** (`--radius-3xl: 20px`, `--radius-full: 9999px`만 존재).
  - 40px는 "pill 스타일이지만 full pill은 아닌" 특수값. `rounded-[40px]` arbitrary 사용 권장 (높이 72의 딱 half 아님 → 의도된 모서리).
- 좌우 패딩 40px → tokens.css에 `--spacing-10: 40px` ✅
- 메뉴 간격 32px → `--spacing-8` ✅
- 프로필 블록 gap 20px → `--spacing-5` ✅
- 햄버거 원형 버튼 40px, 아이콘 28px, Vector 내부 사이즈: `absolute inset-[34.38%_12.5%]` → 28×28 중 가로 `28*(1-0.25)=21px`, 세로 `28*(1-0.6875)=8.75px` (햄버거 3선 그리드 비율). SVG 자체는 21×8.75로 해석.

---

## 4. 에셋 목록 (가장 중요)

| # | 종류 | Figma URL (MCP asset) | Figma 노드 ID | 부모 사이즈 | 원본 사이즈 | 동적 여부 | 처리 방식 |
|---|------|-----------|---------------|-------------|-------------|-----------|-----------|
| 1 | SVG (추정) | https://www.figma.com/api/mcp/asset/3f009969-ce85-43be-a8c9-9e44426e1d12 | `299:1969` (name: "ESGPN") | 98×22 | 98×22 (인라인 `<img>` 전체 채움) | **정적** | 단계 3에서 다운로드 → `file`로 SVG/PNG 판정 → rename → `src/assets/header/esgpn-logo.svg` |
| 2 | SVG (추정) | https://www.figma.com/api/mcp/asset/ec0ffea1-c278-4a6b-a29e-eeaa09f4585a | `I52:1376;79:6098` (name: "Vector", in "Equals" 28×28 컨테이너) | 21×8.75 (`inset-[34.38%_12.5%]` 환산) | 21×8.75 | **정적** | 단계 3에서 다운로드 → `file`로 타입 판정 → `src/assets/header/hamburger.svg` |

### 4.1 동적 여부 판정 근거
- MCP 응답 URL 확장자 없음 (Figma MCP 공통 패턴). 실제 MIME은 단계 3에서 `file` 명령으로 강제 검증.
- 노드 이름/용도: "ESGPN" 텍스트 로고, "Vector" 단일 아이콘 — **움직임 불가능한 정적 벡터**.
- Figma 노드 타입에 `VIDEO` 없음.
- **결론: 둘 다 정적 SVG/PNG. 단계 3의 `verify-assets.sh` + `file` 명령으로 최종 확정.**

### 4.2 캔버스-에셋 일치 검증 ✅
Figma 캔버스(`get_screenshot` 결과)에서 보이는 시각 요소:
- (a) "ESGPN" 워드마크 로고 — 1개 이미지
- (b) 메뉴 텍스트 6개 — 모두 **텍스트 노드** (에셋 아님)
- (c) "고객센터" 텍스트 — **텍스트 노드** (에셋 아님)
- (d) 햄버거 아이콘 (≡) — 1개 이미지

→ **이미지 에셋 2개** vs MCP 추출 에셋 2개. **개수 일치 ✅, 시각적 매핑 일치 ✅.** 멈춤 조건 미발동.

---

## 5. 반복되는 요소 (컴포넌트화 후보)

- `NavItem` (1depth 메뉴 6개가 같은 구조): `py-[4px] flex items-center justify-center` + label + 클릭 핸들러(route 이동).
  - props: `{ label: string; to: string; active?: boolean }`
  - Figma에는 hover/active 상태 디자인이 **없음** → plan에서 합리적 기본값 정의 필요 (ex. 색상만 살짝 진하게 + underline).
- 햄버거 원형 버튼: 단일 사용이므로 내부 JSX로 충분 (별도 컴포넌트 불필요).

---

## 6. 반응형 단서

- Figma는 **1920 데스크탑 1개 레이아웃만 존재**. 태블릿/모바일 디자인 없음.
- 1416px 고정 width → 1920 미만에서는 어떻게 처리? figma-project-context.md §7에 "1920 기준 → 1440/768/375로 적응" 지침만 있고 구체 디자인 없음.
- **plan에서 결정할 것**:
  - 1440 이하: `max-w-[1416px]` + 좌우 자동 여백 → 1440에서는 좌우 12px 정도 margin 확보
  - 1024 이하: 메뉴 숨기고 햄버거만 노출 (햄버거가 이미 있음 → 자연스럽게 모바일 메뉴 트리거로 재활용)
  - 모바일 메뉴 열림 상태는 Figma에 없음 → **사용자 확인 필요** (plan에 메모)

---

## 7. 특이 사항 / 리스크

1. **`mix-blend-luminosity`**: 모든 텍스트와 아이콘에 적용됨. 투명 배경 위 텍스트의 대비를 자동 조정하는 블렌드 모드. 페이지에 따라 배경이 달라지면 텍스트 색이 자동 변함. Tailwind는 `mix-blend-luminosity`를 지원하므로 그대로 적용 가능. **단 `mix-blend` 효과는 부모에 배경이 있어야 동작**하므로 페이지 히어로 위 겹쳐질 때만 의도대로 보임.
2. **`backdrop-blur-[12px]`**: 브라우저/성능 이슈 드물지만 Safari 구버전에서 `-webkit-backdrop-filter` 필요. Tailwind v4 `backdrop-blur-[12px]`가 자동 처리. 문제없음.
3. **Floating pill 레이아웃**: Top Nav는 페이지 상단에 딱 붙지 않고 `y=16 offset + 좌우 margin + rounded-[40px]`로 공중에 뜬 형태. `position: fixed; top: 16px; left: 50%; transform: translateX(-50%);` + `max-w-[1416px]` + `width: calc(100% - 504px)` 같은 전략 필요. plan에서 확정.
4. **폰트 충돌**: "고객센터"만 Noto Sans KR Medium으로 지정됨. 프로젝트 전역 폰트(Pretendard) 정책과 충돌. **사용자 확인 권장.**
5. **메뉴 개수 불일치**: figma-project-context.md §5에는 메뉴 7개라 적혀있으나 실제 Figma는 6개. docs 수정 권장 (별도 작업으로).
6. **hover/active 상태 디자인 없음**: 사용자 UX 경험상 필요한 인터랙션이지만 Figma에 스펙 없음. plan에서 합리적 기본값 제안 → 사용자 승인.
7. **40px radius**: tokens.css에 해당 토큰 없음. arbitrary `rounded-[40px]` 허용 (plan에서 재확인) 또는 토큰 추가 검토.
8. **14M (medium, leading 20) 타이포 프리셋 부재**: tokens.css에 정확히 일치하는 프리셋 없음. plan에서 prop arbitrary 사용 vs 토큰 추가 결정.
9. **MCP 코드의 `--gray-scale\/gray-900-...` 형태 Tailwind v4 변수 참조**: 그대로 못 씀. 우리 `tokens.css`의 `--color-gray-900`으로 치환해야 함 (plan 반영).

---

## 8. 베이스라인 스크린샷

- `figma-screenshots/header/` 폴더 생성 완료.
- **파일 저장 보류**: Figma MCP `get_screenshot`은 assistant inline 이미지로 반환되며, 바이트 직접 기록 경로 제한. `figma-screenshots/header/README.md`에 단계 3/5 캡처 절차 명시. 단계 5의 pixelmatch 실행 전에 반드시 확보해야 함.
- 현재 리서치에 사용한 Figma 캔버스 스크린샷은 이 turn 내 inline으로 확인했으며 **시각 요소 2개(로고+햄버거)** 확정.

---

## 9. 단계 1 통과 조건 체크리스트

- [x] `research/header.md` 작성 완료
- [x] 에셋 목록의 모든 행이 채워짐 (빈 칸 없음)
- [x] 모든 에셋의 "동적 여부" 칸 채워짐 (둘 다 "정적")
- [x] 동적 에셋 없음 → 정적 프레임 추출 불필요
- [x] 캔버스-에셋 일치 검증 완료 (2개 = 2개)
- [~] Figma 베이스라인 스크린샷: 폴더 + README 확보. 실제 PNG는 단계 3/5에서 수동 export 또는 Phase 1 스크립트로 저장 (`figma-screenshots/header/README.md` 참조)

**→ 단계 2 (plan) 진행 가능**
