# docs/responsive-guide.md — 반응형 구현 가이드

> v3 Phase 1~8에서 적용할 반응형 패턴. Figma가 1920 데스크탑만 제공하므로 **데스크탑 퍼스트 + 브레이크포인트별 단순화** 전략.

## 브레이크포인트

Tailwind 기본값 그대로:

| prefix | min-width | 용도 |
|---|---|---|
| (없음) | < 640px | Mobile (375~) |
| `sm:` | ≥ 640px | 큰 폰 |
| `md:` | ≥ 768px | 태블릿 세로 |
| `lg:` | ≥ 1024px | 태블릿 가로 / 작은 노트북 |
| `xl:` | ≥ 1280px | 데스크탑 |
| `2xl:` | ≥ 1536px | 큰 데스크탑 |

**1920 native**: viewport 1920 이상이면 Figma 치수 그대로 렌더 (기존 G1 baseline 유지 목적).

## 핵심 변환 패턴

### 1. 섹션 wrapper width

| before (fixed) | after (fluid) |
|---|---|
| `w-[1920px]` (풀폭 섹션) | `w-full` |
| `w-[1416px]` (중앙 정렬) | `w-full max-w-[1416px] mx-auto px-6 lg:px-12 xl:px-[252px]` |
| `w-[936px]` | `w-full max-w-[936px] mx-auto px-6` |

### 2. 수직 padding (Header clearance)

Figma page-y 값은 그대로 `pt-[값px]` 유지. 단 모바일에선 Header 폭이 작아져 clearance 값도 줄일 수 있음:
- `pt-[180px]` → `pt-[88px] md:pt-[140px] xl:pt-[180px]` (Header 크기 → 비율 축소)

### 3. Flex layout 방향

| before | after |
|---|---|
| `flex gap-[N]` (row) | `flex flex-col md:flex-row gap-4 md:gap-[N]` |
| `grid grid-cols-3` | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |
| `grid grid-cols-2` | `grid-cols-1 md:grid-cols-2` |

### 4. 폰트 크기 (desktop-first 축소)

| desktop | mobile 맵핑 권장 |
|---|---|
| text 100+ (Yeseva hero) | `text-[48px] md:text-[72px] xl:text-[100px]` |
| text 64 (Gong Gothic) | `text-[36px] md:text-[48px] xl:text-[64px]` |
| text 48 | `text-[32px] md:text-[40px] xl:text-[48px]` |
| text 32 (섹션 헤딩) | `text-[24px] md:text-[28px] xl:text-[32px]` |
| text 24 (카드 제목) | `text-[18px] md:text-[20px] xl:text-[24px]` |
| text 16~18 본문 | 그대로 유지 (읽기 최소) |
| text 14 meta | 그대로 |

대안: `clamp(min, preferred, max)` — 예 `text-[clamp(36px,5vw,64px)]`. 더 부드럽지만 디버깅 어려움. **Tailwind 프리픽스 선호**.

### 5. 이미지/고정 크기 요소

| 패턴 | 변환 |
|---|---|
| `w-[320px] h-[340px]` 카드 | `w-full max-w-[320px] aspect-[320/340]` 또는 `w-[280px] md:w-[320px]` |
| `h-[827px]` Hero | `h-[400px] md:h-[600px] xl:h-[827px]` |
| 배경 이미지 absolute 퍼센트 | 그대로 유지 (percentage 기반이면 viewport 따라 자동) |

### 6. Preview 라우트

Preview는 G1 측정 전용 → **데스크탑 1920 viewport 기준**으로 baseline과 1:1 비교. 반응형 변환 후에도 1920 viewport에서는 기존 baseline 유지돼야 함.

Preview에서 responsive prefix 쓸 때 `xl:` 이상 값이 1920 baseline과 일치하도록 확인.

### 7. Header (floating pill)

- 기존: `w-[1416px]` 고정, left/right `mx-auto`
- 변환: `max-w-[1416px] w-[calc(100%-32px)] md:w-[calc(100%-64px)]` — viewport보다 32~64px 작게
- 내부 nav: 모바일에선 햄버거만 표시, md 이상은 풀 메뉴

## 변환 체크리스트 (섹션별)

각 섹션 변환 시:

- [ ] Wrapper width: `w-[N]` → `w-full max-w-[N]`
- [ ] Horizontal padding: `px-6 md:px-8 xl:px-[N]` (N은 Figma 원본 좌우 여백)
- [ ] Flex/grid 방향: mobile stack → desktop side-by-side
- [ ] 폰트 크기: breakpoint별 축소
- [ ] 절대 포지셔닝 요소: 반응형 재배치 또는 숨김
- [ ] 이미지: object-fit + aspect-ratio
- [ ] 1920 viewport에서 기존 G1 baseline 유지 확인

## 테스트 viewport

각 Phase 완료 시 audit-routes로 스크린샷:
- 375 (iPhone SE)
- 768 (iPad)
- 1440 (laptop)
- 1920 (desktop — G1 baseline)

## 주의사항

- **G1 깨지는 건 정상** — 이 작업은 데스크탑 pixel-perfect를 유지하면서 모바일을 추가하는 것. 1920 viewport에서는 기존 G1 값 유지돼야 함
- **Figma에 mobile 디자인 없음** — 모바일 레이아웃은 본 가이드 + 현장 판단
- **페이지 통합 육안 게이트** (docs/section-implementation.md §6.5) 유지 — 각 viewport에서 가로 스크롤 없음 확인
