# ESGPN 프로젝트 — Figma → React 하네스

**핵심 원칙: 내가 직접 계획을 검토하고 승인하기 전까지 절대 코드를 쓰지 마라.**

작업은 항상 다음 5단계로 진행: **리서치 → 계획 → 주석 반영 → 구현 → 피드백**
각 단계는 명확히 분리되며, 사용자 승인 없이 임의로 다음 단계로 진행하지 않는다.

---

## 하네스 트리거

Figma URL 제공, "디자인 구현", "섹션 진행", "페이지 구현", "ESGPN" 관련 작업, 혹은 "다음", "수정", "재실행", "보완" 같은 후속 요청 시 **`figma-to-react` 스킬을 반드시 사용하라.**

이 스킬은 오케스트레이터로 동작하며, 워커 에이전트(`phase1-setup-worker`, `page-researcher`, `section-implementer`)를 스폰하여 작업을 분담한다. 모든 Agent 호출은 `model: "opus"`.

---

## 모드 판별

1. **Figma URL** 또는 "디자인 구현" 키워드 → **Figma 모드** (`figma-to-react` 스킬)
2. **백엔드 키워드**(Spring, API, DB 등) → 백엔드 모드 (`docs/backend.md` + `docs/spring.md`)
3. **프론트 일반 작업** → 프론트 모드 (`docs/frontend.md` + `docs/react.md`)
4. **모호 시** → 사용자에게 영역 확인

Figma 모드 발동 시 오케스트레이터가 자동으로 `docs/figma-workflow.md`, `docs/section-implementation.md`, `docs/figma-project-context.md`를 참조하여 워커를 조율한다.

---

## Figma 모드 절대 규칙 (워커에도 강제됨)

- **작업 단위 = 섹션 (페이지 아님).** 한 섹션 = 한 브랜치 = 한 커밋
- **측정값을 숫자로 plan에 기록하지 않은 섹션은 미완료** (눈대중 금지)
- **4 게이트 통과 필수:** G1 시각(diff<5%), G2 치수(font±1, 나머지±2), G3 에셋(naturalWidth>0), G4 색상(hex 일치)
- **3회 수정 실패 시 사용자 보고 후 멈춤** — 임의 우회 금지
- **에셋 URL 무조건 다운로드.** CSS/유니코드 대체 금지
- **동적 에셋(GIF/비디오) 원본 사용 금지** — 부모 노드를 Framelink `download_figma_images`로 정적 PNG 추출
- **baseline PNG는 Framelink MCP로만 저장** — 공식 `get_screenshot`은 inline 전용이라 파일 저장 불가. 경로 규약: 공통은 `figma-screenshots/{section}.png` (예: `header.png`), 페이지는 `figma-screenshots/{page}-{section}.png` (예: `main-hero.png`), 페이지 전체는 `{page}-full.png`
- **Framelink PNG는 완성된 합성 사진** — 회전·블렌드·배경·그림자가 모두 baked-in. CSS rotate/blend/bg 추가 금지 (이중 적용). PNG native 크기 ≠ metadata AABB. 배치는 `wrapper=AABB + inner=native` 패턴 (docs §2.5). baseline PNG 크기는 spec과 다를 수 있으니 `file` 명령으로 실측 (§2.6)
- **Figma 수치는 반올림하지 않는다** — rotation·position·letter-spacing·line-height·border-radius 등 소수점 포함 원본 값을 그대로 Tailwind arbitrary(`rotate-[4.237deg]`, `left-[123.7px]`)로 사용. 정수 근사는 회전·변형 요소에서 서브픽셀 누적 오차로 반영돼 G1 게이트를 악화시킨다
- **G1 수치 PASS만으로 섹션 완료 금지** — baseline/capture/diff 3종 이미지를 반드시 육안 스캔. pixelmatch는 픽셀 밀도만 보므로 방향 반전(SVG flip), 요소 위치 swap, 색상 반전, 텍스트 줄바꿈 위치 같은 **semantic 오류는 수치로 못 잡는다**. 발견 시 수치와 무관하게 단계 6 재진입 후 수정
- **캔버스-에셋 개수 불일치 시 사용자 보고 후 멈춤**
- **한 브랜치에 여러 섹션 섞기 금지**

---

## 사용자 개입 지점 (하네스가 반드시 멈추는 곳)

| 지점 | 당신이 할 일 |
|------|-----------|
| Phase 1 plan 완료 | plan/phase1-setup.md 검토 후 승인 또는 메모 반영 |
| Phase 2 페이지 분할 완료 | research/{페이지명}.md 검토 후 승인 또는 재분할 |
| 섹션 단계 1 (리서치) 완료 | research/{섹션명}.md 검토 |
| 섹션 단계 2 (plan) 완료 | plan/{섹션명}.md 검토 후 승인 또는 메모 반영 |
| 4 게이트 통과 후 커밋 전 | 필요 시 diff 이미지 재확인 |
| 4 게이트 3회 실패 | 완화/다른접근/디버깅/되돌리기 중 선택 |
| 페이지 통합 검증 완료 | 페이지 완료 처리 |

각 지점에서 오케스트레이터가 **현재 단계 / 검토할 파일 / 결과 요약 / 다음 행동 선택지 [A][B][C][D] / 권장 / 체크리스트**를 표준 포맷으로 출력한다 (`approval-gate-format` 스킬 참조). 당신은 선택지 중 하나를 고르거나 메모를 추가하면 된다.

---

## 참조 문서

| 파일 | 역할 |
|------|------|
| `docs/figma-workflow.md` | 4 Phase 전체 흐름 |
| `docs/section-implementation.md` | 섹션 7단계 절차 + 동적 에셋 규칙 |
| `docs/figma-project-context.md` | 페이지 Node ID, 공통 컴포넌트 카탈로그, 리스크 |
| `docs/frontend.md`, `docs/react.md` | 코드 컨벤션 |
| `docs/backend.md`, `docs/spring.md` | 백엔드 작업 시 |
| `docs/_SESSION_PROMPTS_REFERENCE.md` | (참고) 이전 수동 세션 프롬프트 — 하네스가 대체함 |
| `PROGRESS.md` (프로젝트 루트) | 진행 상황 진실의 원천 |

---

## 하네스 구성

```
.claude/
├─ agents/
│  ├─ phase1-setup-worker.md    — Phase 1 프로젝트 셋업 전담
│  ├─ page-researcher.md        — Phase 2 페이지 분해 전담
│  └─ section-implementer.md    — Phase 3 섹션 7단계 전담
└─ skills/
   ├─ figma-to-react/           — 메인 오케스트레이터 (진입점)
   ├─ approval-gate-format/     — 승인 대기 표준 보고 포맷
   ├─ dynamic-asset-handling/   — GIF/비디오 정적 프레임 추출
   └─ visual-regression-gates/  — 4 게이트 측정 절차
```

---

## 변경 이력

| 날짜 | 변경 내용 | 대상 | 사유 |
|------|----------|------|------|
| 2026-04-13 | 초기 구성 | 전체 (agents 3, skills 4) | docs v2 기반 Figma→React 오케스트레이터 구축 |
| 2026-04-13 | Framelink MCP 도입 | docs/figma-workflow.md Phase 0, section-implementation.md §2.1 / §2.3 / §6.1, visual-regression-gates, section-implementer, page-researcher, figma-to-react, figma-project-context §5 | 공식 `get_screenshot` inline 제약으로 G1 baseline 수동 export 필요 → Framelink `download_figma_images`로 자동화. baseline 경로 `figma-screenshots/{섹션명}.png` flat 통일, floating 요소용 `--clip-*` 인자 추가 |
