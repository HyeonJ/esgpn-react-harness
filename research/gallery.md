# Research — /gallery (Node 302:6622, 1920x2816)

## 페이지 개요
- 라우트: `/gallery`
- Figma Node ID: `302:6622`
- 캔버스 좌표: x=20720, y=0 / 사이즈 1920x2816
- Figma 페이지 원본 프레임 이름이 `ESPGN_ESG 마인드 자격검정` — 작명 오류(실제 콘텐츠는 갤러리). 실 콘텐츠 기준으로 진행.
- 전체 구조: Header(공통) → Title → 업무 협약 섹션 → 관련 활동 및 수상 섹션 → Footer(공통)
- **콘텐츠 폭: 936px** (≠ 프로젝트 표준 1416). `x=492, width=936` 즉 좌우 492px 여백. 섹션 루트에 `mx-auto` 내장 필수.

## 섹션 분할 결과

| # | 섹션명 | Node ID | 예상 토큰 | Figma 사이즈 | 캔버스 좌표 (x,y) | 비고 |
|---|--------|---------|-----------|--------------|------------------|------|
| 1 | Header (공통) | `302:6714` | 재사용 | 1920x88 | 0, 0 | 이미 완성 `Header.tsx` 재사용 |
| 2 | gallery-title | `314:6837` | ~2K | 936x124 | 492, 180 | 2줄 Heading3 타이포. 좌 477w, 우(오프셋 509,78) 427w. 영문 placeholder("Amazon bets $233M...")일 가능성 ↔ baseline PNG 육안 확인 필요 |
| 3 | gallery-agreements (업무 협약) | `314:7056` | ~8K | 936x1024 | 492, 360 | HatchedSectionHeading("업무 협약") + 2행×2열 카드 그리드 (카드 456x452, gap 24, 이미지 302h + 텍스트 126h) |
| 4 | gallery-activities (관련 활동 및 수상) | `314:7103` | ~5K | 936x519 | 492, 1432 | HatchedSectionHeading("관련 활동 및 수상") + 1 카드 중앙정렬 (240 오프셋, 456x431, 이미지 302h + 텍스트 105h) |
| 5 | Footer (공통) | `314:6999` | 재사용 | 1920x708 | 0, 2071 | 이미 완성 `Footer.tsx` 재사용 |

> 섹션 구현 대상: `gallery-title`, `gallery-agreements`, `gallery-activities` 3개. Header/Footer는 재사용만 확인.

## 사전 추정(§4.8)과의 차이

| 사전 추정 | 실제 Figma | 반영 |
|-----------|-----------|------|
| Title: "실천이 만든 변화의 순간들, ESGPN 아카이브" | Heading3 2줄 (영문 placeholder "Amazon bets $233M on India...") | 실제 카피는 baseline PNG 육안 + 단계 2 plan에서 확인. Figma 텍스트가 복붙 placeholder일 가능성 높음 — 사용자 확인 필요 |
| Activities: "활동 갤러리 썸네일 그리드" | "업무 협약" — 2x2 MOU 카드 (로고/날짜/설명) | 네이밍을 `gallery-agreements`로 변경 |
| Press: "언론·수상" | "관련 활동 및 수상" — 단일 수상 카드 | 네이밍을 `gallery-activities`로 변경 (단독 수상 1장, 향후 확장 가능 구조) |
| 섹션 수 3개 (Title/Activities/Press) | 실제 3개 (Title/Agreements/Activities) | 개수 동일, 네이밍/성격만 조정 |
| "썸네일 그리드" 함축 (다수 이미지) | 실제는 2+1 = 3장 카드. 각 카드 = 이미지(456x302) + 텍스트 블록 | GalleryGrid 공통 컴포넌트보단 MouCard 패턴이 맞음 |

## 카드 구조 상세

**MouCard (업무 협약용, 456x452):**
- 이미지 영역: 456x302, y=0
- 텍스트 영역: 456x126, y=326 (gap 24)
  - 기관명 + 날짜: 456w × 68h (2줄 정렬)
  - 설명문: 중앙정렬, 281~329w × 42h (2줄)

**ActivityCard (수상용, 456x431):**
- 이미지 영역: 456x302
- 텍스트 영역: 456x105, y=326
  - 제목: 456w × 68h
  - 서브: 103w × 21h (중앙정렬)

→ 두 카드 구조 유사. **공통 `MouCard` 컴포넌트로 통합 가능** (desc 라인 수 optional prop).

## 신규 공통 컴포넌트 후보

- **`MouCard`** (신규): 이미지 + 기관명/날짜 + 설명 블록. 업무 협약·수상 양쪽에 재사용. `src/components/ui/MouCard.tsx` 위치 권장. desc 텍스트 1~2줄 가변, 너비 456px 고정.
- `HatchedSectionHeading` 기존 재사용 확인 — "업무 협약" / "관련 활동 및 수상" 두 헤딩 모두 동일 패턴 (헤딩 텍스트 + Vector 8 길이 라인 + 우측 6개 tick). Figma에서 텍스트 너비 59/108 → Vector8 길이 825/776로 자동 조정됨.
- `HatchedDivider`: 갤러리 페이지에서는 미사용 (섹션 사이 구분선 없음, 헤딩 자체에 라인 포함).
- `SectionTabs`: 미사용.
- `Header` / `Footer`: 재사용 확인.

## 리스크 메모

### figma-project-context.md §7 이 페이지 리스크
- "이미지 그리드 반응형 깨지기 쉬움" → 이번 프로젝트 **1920 고정**으로 반응형은 별건 PR 이월. 데스크탑 pixel-perfect만 목표.

### 이 페이지 고유 리스크
1. **Title 섹션 placeholder 텍스트 의혹**: Heading3 내용이 "Amazon bets $233M on India, Tech & Logistics facelift underway" 영문 문구 — Figma 작업 중 복붙 placeholder로 보임. 실제 카피는 사전 추정상 "실천이 만든 변화의 순간들, ESGPN 아카이브". plan 단계에서 사용자 확인 필요.
2. **프레임 이름 불일치**: Figma 최상위 프레임 이름이 `ESPGN_ESG 마인드 자격검정` (자격검정 페이지 사본에서 갈라져 나온 듯). 콘텐츠는 갤러리가 맞음. 구현 시 혼동 주의.
3. **MouCard 이미지 노드 비어있음**: 카드 이미지 영역(`Frame 2043685689`) 내부에 자식 노드 없음 — Figma 상에서 이미지 fill이 걸려 있을 가능성. 단계 2 plan에서 `get_design_context`로 fill imageRef 확인 필요.
4. **콘텐츠 폭 936 (≠1416)**: 다른 페이지는 1416이 표준이나 갤러리는 936. section-implementation.md §6.5 페이지 통합 게이트의 mx-auto 원칙은 동일 유지 — 섹션 루트에 `w-[936px] mx-auto` 내장.
5. **카드 텍스트 2곳 동일 내용 중복**: `314:7065`·`314:7137`이 "COLiVE, CSR Impacrt(주)..." 문구 완전 동일. 실제 더미 데이터 중복으로 보임. 구현은 Figma 그대로 재현하되, 실 데이터 연동 시 변경 예정이라 plan에 메모.

## 베이스라인 스크린샷 확보 (Framelink `download_figma_images`)

- [x] `figma-screenshots/gallery-full.png` (1920x2816)
- [x] `figma-screenshots/gallery-title.png` (936x124)
- [x] `figma-screenshots/gallery-agreements.png` (937x1024)
- [x] `figma-screenshots/gallery-activities.png` (937x519)
- 누락 없음.

## 다음 단계 제안

섹션 구현 순서: **gallery-title → gallery-agreements → gallery-activities**. 공통 MouCard는 agreements에서 처음 만든 뒤 activities에서 재사용.
