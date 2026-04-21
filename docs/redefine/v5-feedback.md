# v5 Feedback Log

> **목적**: v4 수동 refinement 중 발견된 문제를 v5 개선 연료로 축적.
> **원칙**: 증상 → 원인 → v5 개선안 3줄로 간결하게. 나중에 패턴별로 묶어 v5 설계 근거로.
> **사용**: 수정할 때마다 새 F-XXX 엔트리 추가. 분류는 나중에.

---

## 분류 카테고리 (사후 정리용)

- **P**: Page-researcher (Phase 2 리서치 단계)
- **I**: Section-implementer (Phase 3 구현 단계)
- **S**: Skill (figma-to-react / visual-regression / responsive)
- **G**: Gate (품질 게이트 정의)
- **T**: Tool/Script (detect-cutoff, check-* 등)
- **W**: Workflow (자율 모드 / 세션 간 교훈 전파)

---

## 2026-04-21 — 세션 4 (수동 refinement 시작)

### F-001 (P, W) — Flatten 판정 과신
- **섹션**: AboutMission, About 페이지 전체
- **증상**: Figma는 flex-col (text 상단 / image 하단) 레이아웃인데 우리 코드는 flex-row (text 좌 / image 우)로 오해
- **원인**: page-researcher가 parent node `52:624` flatten 판정 후 subnode 탐색 포기. 실제로는 하위 노드 `86:1163`가 살아있어서 `get_design_context` 가능
- **교훈 시점**: 세션 2 중반 `certification-flatten-bottom`에서 같은 함정 발견 → 소급 재검토 없이 완주
- **v5 개선**:
  1. page-researcher prompt에 "flatten 판정 시 `get_design_context(parent, depth=3)` 재시도 강제" 추가
  2. 세션 간 교훈 전파 메커니즘: 새 교훈 발견 시 기존 섹션 재검수 트리거

### F-002 (I, S) — SVG marker orient 기본값 오용
- **섹션**: MainStats (ESG 다이어그램 connector)
- **증상**: 세로선 끝 화살표가 옆으로 회전(`<`) 렌더
- **원인**: 워커가 SVG `<marker orient="auto">` 그대로 사용. `auto`는 선 방향(세로↓)에 맞춰 90° 회전
- **v5 개선**: visual-regression-gates 스킬에 "SVG marker orient 결정 가이드" 추가
  - 수직선 (고정 방향) → `orient="0"`
  - 사선/곡선 (가변 방향) → `orient="auto"` + path를 "오른쪽 향함"으로 그림

### F-003 (I, S) — Image crop을 negative-offset + oversize로 번역
- **섹션**: MainIntro globe 이미지
- **증상**: 이미지가 컨테이너 밖 위치(`left: -22%`, `width: 162%`), 잘림/비율 안 맞음
- **원인**: Figma `cropTransform` 행렬을 1:1 CSS 좌표로 번역. AI가 "확대 + 음수 offset" 패턴 선택 (취약)
- **대안**: `object-fit: cover/contain` + `object-position` (단순, 견고)
- **v5 개선**: section-implementer prompt에 "Figma cropTransform 발견 시 `object-fit` 우선 사용, negative-offset 금지" 규칙

### F-004 (I, S) — items-center on grid cell이 레이어 침범
- **섹션**: MainStats EsgDiagram (원 + 화살표 레이어)
- **증상**: 원이 화살표 레이어 영역을 덮음 (cell 중앙으로 밀림)
- **원인**: 워커가 "시각적으로 원이 중앙에 있어 보여서" `items-center` 선택. 같은 grid cell에 다른 레이어(화살표)가 있는 상황 놓침
- **v5 개선**: "grid cell에 여러 레이어 있을 때 `items-start` 기본, `items-center`는 단일 레이어일 때만"

### F-005 (I) — justify-between이 요소를 양 끝으로 분리
- **섹션**: AboutMission (text + image)
- **증상**: 텍스트 좌측 끝, 이미지 우측 끝, 가운데 큰 빈 공간
- **원인**: 워커가 Figma 좌표만 보고 "한쪽 끝에 A, 다른 쪽 끝에 B" 해석 → `justify-between` 선택. 실제로는 두 요소가 자연스럽게 붙어야 하는 경우
- **v5 개선**: `justify-between`은 **의도적인 양 끝 배치**일 때만 (예: header with logo + nav). 가운데 gap이 400px 이상 생기면 `gap-N`으로 바꿀 것

### F-006 (I) — 고정 height가 content 넘침 시 overflow
- **섹션**: AboutHeader (`height: 454`)
- **증상**: `pt-160` 추가 시 다음 section 침범
- **원인**: `style={{ height: 454 }}` 고정. content 넘쳐도 box 유지
- **v5 개선**: section root에 고정 height 금지, `min-height` 우선. Hero 등 "풀 배경" 목적일 때만 예외

### F-007 (I) — Tab 디자인 완전 커스텀 누락
- **섹션**: MainPrograms (Figma 탭 디자인 252:993)
- **증상**: 탭 없이 3개 카드 모두 렌더됨. 디자인에는 dot+text+underline 탭 구조 있음
- **원인**: page-researcher가 탭 구조 없다고 판단 (MainProgramsHeader 내부에서 탭 노드 발견 못함). 실제로는 별도 노드(252:993)에 탭 존재
- **v5 개선**: page-researcher가 "탭/슬라이더 키워드" 감지 시 하위 노드 전수 탐색. 섹션 분할 시 interactive UI 요소 체크리스트

---

## 패턴 요약 (적재 중, 5개 이상 누적 시 분석)

- **[레이아웃 해석 오류]**: F-001, F-005 — 2D 좌표를 1D flex 해석으로 번역할 때 발생
- **[시각 해석 vs 구조]**: F-004, F-005 — "어떻게 보이나"를 "어떻게 구성하나"로 번역할 때 단계 누락
- **[CSS 패턴 취약]**: F-002, F-003 — 1:1 수학적 번역이 CSS 렌더 현실과 안 맞음
- **[고정 크기 함정]**: F-006 — 크기 고정은 특수 목적일 때만
- **[노드 탐색 깊이 부족]**: F-001, F-007 — parent만 보고 subnode 가능성 놓침

---

## v5 설계 방향 (수집 완료 후 작성)

_TBD — F 엔트리 20+ 누적 후 패턴 기반으로 작성_

---

## 변경 이력

| 날짜 | 내용 |
|---|---|
| 2026-04-21 | 초안 작성. 세션 4 수동 refinement 첫 4시간 발견 7개 엔트리. |
