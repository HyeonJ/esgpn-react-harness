# Harness v5 — MVP 설계

> 근거: `docs/redefine/v5-feedback.md` F-001 ~ F-007 중 **확신 있는 4개 패턴** 반영.
> 범위: page-researcher + section-implementer agent 규칙 강화 + figma-to-react 스킬 체크리스트.
> 비범위: 새 agent/skill 신규 작성 X. 기존 자산 prompt/규칙만 개선.

---

## 1. 우선순위 개선 (확신 패턴 4개)

### V5-1: Flatten 재탐색 강제 (from F-001)
**대상**: `page-researcher` 에이전트
**문제**: `get_metadata` 결과가 자식 0이면 flatten 판정 후 포기. 실제로는 `get_design_context` 호출하면 subnode 살아있는 경우 많음.
**개선**:
- page-researcher prompt에 flatten 재탐색 절차 추가
- "자식 0 노드 발견 시 **반드시** `get_design_context(nodeId, depth=3)` 1회 호출"
- 트리 살아있으면 섹션별 subnode ID 기록
- flatten이 진짜로 확정된 경우만 baseline crop 전략

### V5-2: Image crop은 object-fit 우선 (from F-003)
**대상**: `section-implementer` 에이전트
**문제**: Figma `cropTransform` 행렬을 `left: -22% width: 162%` 같은 negative-offset 패턴으로 번역 → 에셋 크기 바뀌면 깨짐
**개선**:
- section-implementer prompt에 "Figma image crop 패턴 발견 시" 규칙:
  1. **1순위**: `object-fit: cover/contain` + `object-position` 사용
  2. **2순위**: `background-image` + `background-size/position`
  3. **금지**: `position: absolute; left: -X%; width: >100%` 패턴 (취약)
- visual-regression-gates 스킬에 안티패턴 검출 추가 예정 (v6)

### V5-3: items-center on grid cell 경고 (from F-004)
**대상**: `section-implementer` 에이전트
**문제**: grid cell에 여러 레이어 overlay 될 때 `items-center`가 한 레이어를 cell 중앙으로 밀어 다른 레이어 침범
**개선**:
- section-implementer prompt 규칙:
  - `grid` + 같은 cell (`col-start-1 row-start-1`)에 형제 요소 있을 때 → `items-start` 기본
  - `items-center`는 단일 레이어일 때만
  - 단일 cell overlay 패턴 발견 시 주석으로 경고

### V5-4: 고정 height 금지, min-height 우선 (from F-006)
**대상**: `section-implementer` 에이전트
**문제**: `style={{ height: Npx }}` 또는 `h-[Npx]`가 content 늘어나면 overflow → 다음 섹션 침범
**개선**:
- section-implementer prompt:
  - **section root의 고정 height 금지**
  - `min-height` 우선 ("최소 N px 보장, content에 맞춰 늘어남")
  - 예외: Hero 섹션처럼 "풀 배경 이미지 cover" 명확한 의도일 때만 고정 허용
- 체크리스트에 "section root height 속성 검사" 추가

---

## 2. 2순위 개선 (경고 수준)

### V5-5: SVG marker orient 가이드 (from F-002)
**대상**: `visual-regression-gates` 스킬
**개선**: 스킬 문서에 SVG marker 패턴 섹션 추가
- 수직선 (고정 방향) → `orient="0"`
- 사선/곡선 (가변) → `orient="auto"` + path를 "오른쪽 향함"으로

### V5-6: justify-between 의도 검증 (from F-005)
**대상**: `section-implementer` 에이전트
**개선**: prompt에 한 줄 규칙 추가
- `justify-between`은 **의도적 양 끝 배치**일 때만 (header logo + nav 등)
- 가운데 gap > 200px이면 `gap-[N]` 고정값 권장

### V5-7: Tab/slider 키워드 탐색 (from F-007)
**대상**: `page-researcher` 에이전트
**개선**: prompt에 "interactive UI 키워드 체크리스트" 추가
- 섹션 이름/design_context에 "탭/tab/슬라이더/carousel" 감지 시 subnode 전수 탐색
- 발견 시 섹션 분할 시 wrapper 추가 (`MainPrograms` 같은 상태 보유 컴포넌트)

---

## 3. 변경 파일 목록

| 파일 | 변경 |
|---|---|
| `.claude/agents/page-researcher.md` | V5-1 + V5-7 prompt 규칙 추가 |
| `.claude/agents/section-implementer.md` | V5-2, V5-3, V5-4, V5-6 prompt 규칙 추가 |
| `.claude/skills/visual-regression-gates/SKILL.md` | V5-5 SVG marker 가이드 추가 |
| `CLAUDE.md` | 상단 배너 → v5 MVP 적용 표시 |
| `docs/redefine/v5-feedback.md` | V5 적용된 F- 엔트리 "RESOLVED" 표기 |

---

## 4. 검증 계획

v5 적용 후 **1 섹션에서 실전 테스트**:
- 대상 섹션: 아직 수동 수정 안 한 섹션 중 예상 리스크 있는 것
- 후보: `AboutValues` 또는 `AboutVision` — About 페이지 flatten 섹션이라 V5-1 검증 적절
- 확인 항목:
  1. flatten 재탐색이 실제 동작 (subnode 발견 여부)
  2. image crop 대신 object-fit 사용
  3. items-center 적절 판단
  4. height 대신 min-height

---

## 5. v5 스코프 명시 (NOT v6)

v5는 **"v4 확장"** 이지 재설계 아님. 다음은 **v6 후보 (데이터 수집 후)**:
- 자율 모드에서 세션 간 교훈 자동 전파 (discovered lesson → previous sections 재검수)
- 시각 semantic gate 신설 (수치로 못 잡는 레이아웃 해석 오류 자동 검출)
- Rule of Three 공통 승격 자동화
- responsive-polish 스킬 archive (하네스 범위 외 결정 반영)

---

## 변경 이력

| 날짜 | 내용 |
|---|---|
| 2026-04-21 | v5 MVP 설계. F-001/003/004/006 확신 패턴 + F-002/005/007 보조 패턴. |
