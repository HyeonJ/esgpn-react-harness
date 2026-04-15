# Figma 없이 UI 추가 — 톤앤매너 추출 절차

Figma 디자인에 없는 UI (햄버거 드롭다운, 모바일 퀵 액션, 스켈레톤 등)를 추가할 때, **창작하지 말고 기존 디자인에서 샘플링**한다.

## Step 1 — 디자인 DNA 샘플링

같은 프로젝트의 기존 컴포넌트에서 아래를 추출:

| 속성 | 샘플링 대상 |
|---|---|
| 주요 색상 | Header background, Primary CTA, Link hover — 가장 자주 쓴 3가지 |
| 보더 색상 | Footer divider, 카드 경계선 |
| Radius | 버튼 / 카드 / Pill 에 쓰인 값 (보통 1~2종) |
| Shadow | 있으면 그 값, 없으면 사용 안 함 |
| 간격 스케일 | Figma spacing 토큰 (`--spacing-2` 등) |
| 폰트 패밀리 | 대부분 이미 1~2종 고정 |
| 폰트 웨이트 | heading=700, subhead=600, body=400 같은 패턴 |
| Motion | 기존 transition duration / easing |

출처를 주석에 명시: `// tone: Header pill radius + Footer gray-a100 border`

## Step 2 — 디자인 결정은 최소로

추가할 UI의 **레이아웃·상호작용**은 업계 표준을 따른다. **시각 스타일**만 Step 1 샘플에서 가져온다.

| 추가 UI | 표준 레이아웃 | 샘플링 영역 |
|---|---|---|
| Mobile hamburger menu | 우상단 아이콘 / 탭 시 풀스크린 또는 슬라이드-인 drawer / 닫기 버튼 | 색상·radius·폰트를 Header 에서 |
| 스켈레톤 | 실제 컴포넌트 크기와 동일한 영역 / shimmer | 배경 색상은 gray-100 / 200 |
| 토스트 | 화면 하단 중앙 / 3초 자동 사라짐 | 배경 = primary / error, 폰트 = body |
| 모바일 필터 버튼 | 상단 sticky 바 | 버튼 스타일 = 기존 CTA |

## Step 3 — 사용자 승인 게이트

Figma 없는 UI 구현 전에 사용자에게 미리 보여준다:
1. "햄버거 메뉴를 이런 식으로 추가할 예정"
2. 샘플링한 스타일 값 나열 (색상 hex / radius px / 폰트)
3. 표준 레이아웃 설명 (drawer / 풀스크린 / accordion 등)
4. 사용자 승인 후 구현

## Step 4 — 구현 후 스크린샷 + 기존 Header와 나란히 비교

기존 Header 스크린샷 + 햄버거 열린 상태 스크린샷을 나란히 놓고 **톤앤매너 어긋남** 확인:
- 색상 대비가 Header 보다 과도한가
- radius 값이 다른가
- 폰트 웨이트가 어색한가

3개 이상 어긋나면 revert 후 재작업.

## 예시 — ESGPN Header 햄버거

**샘플링 출처:**
- 색상: Header 배경 `var(--color-gray-000)` + pill bg `rgba(...)`
- radius: Header pill `rounded-full` (기존 값)
- 폰트: NavItem `font-semibold text-sm`
- Motion: 기존 transition (확인 필요)
- 보더: Footer divider 색상 재사용

**레이아웃 결정:**
- 우상단 아이콘 (이미 있음) 탭 시 Header 바로 아래에 드롭다운
- 드롭다운 너비: 100%
- 메뉴 아이템: 기존 NavItem 재사용 (vertical stack)
- 닫기: 외부 클릭 / ESC / 다시 아이콘 클릭

## 금지

- **"AI 스타일"** 만들지 말 것 — purple gradient, generic glassmorphism 등
- **Figma 디자이너가 나중에 고칠 여지** — 승인 받기 전엔 느낌을 최소화
- **과한 애니메이션** — 기존 프로젝트에 애니메이션이 없으면 시작하지 말 것
