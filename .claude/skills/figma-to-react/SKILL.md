---
name: figma-to-react
description: Figma 디자인을 React 코드로 충실도 높게 변환하는 오케스트레이터. Figma URL 제공 시, "이 디자인을 React로 구현", "Figma 페이지 만들어", "섹션 구현", "ESGPN 시작", "다음 페이지 진행", "다음 섹션 진행", "재실행", "수정", "보완" 등 Figma→React 관련 모든 요청에 반드시 사용. 오케스트레이터가 서브에이전트 워커(phase1-setup-worker / page-researcher / section-implementer)를 스폰하여 페이지 분해→섹션별 구현→측정→커밋 루프를 조율한다. 각 승인 게이트에서 approval-gate-format에 따라 사용자에게 판단 선택지를 제공하며 멈춘다.
---

# Figma → React Orchestrator

당신은 **메인 세션의 오케스트레이터**다. 직접 코드를 짜지 않는다. 대신 서브에이전트 워커를 스폰하고, 결과를 검증하고, 사용자 승인 게이트에서 멈춘다.

## 철학

사용자의 `docs/` 문서는 이전 60% 실패를 진단한 결과물이다. 핵심 원칙:

1. **작업 단위는 페이지가 아니라 섹션이다** — 한 섹션 = 한 워커 호출 = 한 커밋
2. **측정값을 숫자로 기록하지 않은 섹션은 미완료** — 눈대중 금지
3. **MCP 에셋 URL은 무조건 다운로드, 동적 에셋은 정적 프레임 추출**
4. **사용자 판단은 게이트에서 명시적으로 받는다** — 임의 진행 금지

## 참조 문서

- `CLAUDE.md` (프로젝트 루트) — 5단계 워크플로우, Figma 모드 규칙
- `docs/figma-workflow.md` — 4 Phase 흐름
- `docs/section-implementation.md` — 7단계 섹션 절차
- `docs/figma-project-context.md` — 페이지 Node ID, 공통 카탈로그, 리스크 메모
- `docs/_SESSION_PROMPTS_REFERENCE.md` — 과거 수동 프롬프트 (워커 스폰 시 참고)
- `docs/frontend.md`, `docs/react.md` — 코드 컨벤션
- 모든 Agent 호출에 `model: "opus"` 명시

## Phase 0: 컨텍스트 확인

사용자 요청 수신 후 먼저 다음을 확인하고, 판단을 사용자에게 보고:

1. `PROGRESS.md` 존재 여부
2. `research/project-setup.md` 존재 여부 (Phase 1 완료 증거)
3. `research/*.md` 중 진행 중인 페이지
4. `plan/*.md`의 미완료 섹션
5. **Framelink MCP 등록 여부** (`claude mcp list` 또는 세션 도구 목록에 `mcp__figma-framelink__download_figma_images` 존재 여부). 미등록이면 섹션 워커 스폰 전에 사용자에게 `docs/figma-workflow.md` Phase 0 안내
6. **기술부채 차단 체크** — `docs/tech-debt.md`의 `OPEN` 상태 엔트리 개수를 세어, **3건 이상이면 새 섹션 진행 차단**. 사용자에게 "현재 OPEN 부채 N건 (T-xxx, T-yyy, T-zzz). 먼저 해소 후 재진행 권장" 보고 + 해소 옵션 제시 (A: 부채 리팩터 먼저 / B: ACCEPTED로 전환 가능 여부 재검토 / C: 경고만 하고 강제 진행)

다음 실행 모드 중 하나로 분기:

| 상태 | 모드 |
|------|------|
| `PROGRESS.md` 없음 | **초기 실행** — Phase 1부터 |
| Phase 1 완료, 공통 컴포넌트(Header/Footer) 미완 | **공통 컴포넌트 모드** — Header → Footer 순 섹션 워커 스폰 |
| 공통 완료, 새 페이지 요청 | **새 페이지 모드** — Phase 2부터 |
| 페이지 분할 완료, 섹션 구현 중 | **섹션 루프 모드** — 다음 미완 섹션 워커 스폰 |
| 페이지 모든 섹션 완료 | **Phase 4 통합 검증** |
| 사용자가 "재실행", "수정" 등 후속 요청 | **부분 재실행** — 해당 섹션 워커를 수정 모드로 재호출 |

## 오케스트레이터 동작 원칙

- 직접 Figma MCP를 호출하지 않는다 (워커가 호출)
- 직접 코드 파일을 작성하지 않는다 (워커가 작성)
- 측정 스크립트 실행은 직접 해도 됨 (워커 결과 검증용)
- 워커 결과를 받으면 **검증 → 사용자에게 보고 → 다음 행동 제시**
- 모든 멈춤 지점에서 `approval-gate-format` 스킬의 표준 포맷 사용

## Phase 1: 프로젝트 셋업

`phase1-setup-worker` 1회 호출.

```
Agent({
  subagent_type: "phase1-setup-worker",
  model: "opus",
  description: "Phase 1 프로젝트 셋업",
  prompt: "ESGPN 프로젝트 Phase 1(프로젝트 셋업)을 수행하라.

Figma 파일: https://www.figma.com/design/qhrMiGVfoSQ1QMFhVN8z78/ESG-실천네트워크

참조:
- CLAUDE.md
- docs/figma-workflow.md Phase 1 §2
- docs/figma-project-context.md

작업:
1. plan/phase1-setup.md 작성 (5개 하위 작업 모두 포함: 2.1~2.5)
2. 작성 후 **멈춰서** 결과 파일 경로와 요약을 나에게 반환

구현은 내가 승인 후 다시 지시한다. 지금은 plan까지만."
})
```

워커 반환 시:
- plan 파일을 읽고 요약을 approval-gate 포맷으로 사용자에게 보고
- 사용자 승인/메모 수신
- 승인 시 워커 재호출하여 plan 실행

## Phase 2: 페이지 분해

`page-researcher` 호출 (페이지마다 1회).

```
Agent({
  subagent_type: "page-researcher",
  model: "opus",
  description: "{페이지명} 페이지 분해",
  prompt: "{페이지명}({라우트})의 Phase 2를 수행하라.

- Figma Node ID: {ID}
- 사이즈: {WxH}
- 사전 추정 섹션: docs/figma-project-context.md §4.{N}
- 리스크 메모: §7

작업:
1. get_metadata로 섹션 트리 추출
2. 12K 초과 섹션은 더 작게 분할
3. 각 섹션 + 페이지 전체 Framelink download_figma_images → figma-screenshots/{섹션명}.png (flat) + figma-screenshots/{페이지명}-full.png
4. 신규 공통 컴포넌트 식별 (§5 카탈로그 대조)
5. research/{페이지명}.md 작성 후 **멈춤**

실제 섹션 구현은 금지."
})
```

반환 후 approval-gate로 사용자에게 분할 결과 보고. 승인 시 PROGRESS.md에 섹션 목록 추가.

## Phase 3: 섹션 루프

각 섹션마다 `section-implementer` 1회 호출.

```
Agent({
  subagent_type: "section-implementer",
  model: "opus",
  description: "{페이지}-{섹션명} 구현",
  prompt: "{페이지명}의 {섹션명} 섹션을 구현하라.

- Figma Node ID: {ID} (research/{페이지명}.md 확인)
- 이 섹션 리스크: {리스크 메모}
- 신규 공통 컴포넌트 필요 여부: {yes/no} (먼저 만들어야 함)

docs/section-implementation.md의 7단계를 순서대로 수행:
단계 1(리서치) → 멈춤·보고
단계 2(계획) → 멈춤·사용자 승인 대기
단계 3~7 → 승인 후 실행, 4 게이트 측정값 plan에 숫자로 기록
단계 5 미통과 시 최대 3회 수정, 3회 후 실패면 멈추고 보고

다른 섹션 파일 절대 건드리지 마라. 이전 섹션 코드 수정 금지."
})
```

### 단계별 오케스트레이터 대응 (승인 게이트 3→1로 축소)

| 워커 반환 | 오케스트레이터 행동 |
|----------|------------------|
| 단계 1(리서치) 완료 | **통보만** — 리서치 요약 표시 후 자동으로 단계 2 진행. approval-gate 사용하지 않음 |
| 단계 2(계획) 완료 | **real gate** — approval-gate: plan 승인 요청 (섹션당 유일한 멈춤 지점) |
| 단계 4.5 (G5~G8) 통과 | 자동 진행 (단계 5 측정으로) |
| 단계 4.5 FAIL | 단계 4로 반송, 구조 수정 후 재측정. 승인 게이트 없음 |
| 단계 5 전체 게이트 통과 + 육안 OK | **자동 커밋** — 메시지에 diff % 포함, PROGRESS.md 자동 갱신, 다음 섹션 제안 표시만 |
| 단계 5/6 3회 실패 | approval-gate: 사용자 결정 요청 (재분할/다른접근/엔진차이 수용/되돌리기/완화 순서) |

승인 후 워커 재호출 시 "단계 X부터 진행" 명시.

### 자동 커밋 규칙 (단계 5 전체 PASS 시)

1. 커밋 메시지 형식: `feat(section): {페이지}-{섹션명} 구현 (diff X.X% / G5-G8 PASS) [auto]`
2. `PROGRESS.md` 자동 업데이트 (해당 섹션 체크 + 측정값 요약)
3. 사용자에게는 "커밋 {hash} 완료. 다음 섹션: {후보}. 계속 진행할까요?" 한 줄 통보만
4. 사용자가 명시적으로 "멈춰" / "확인하고 싶어" 요청 시 approval-gate 활성화

### 섹션 진행 순서

1. 공통 컴포넌트(Header/Footer) — Phase 1 완료 후 즉시
2. Phase 2에서 식별된 신규 공통 컴포넌트 (있다면)
3. 페이지 섹션 — 위→아래 순서

## Phase 4: 페이지 통합 검증

페이지의 모든 섹션 완료 후 오케스트레이터가 **직접** 수행 (별도 워커 불필요):

1. PROGRESS.md에서 섹션 체크 확인
2. `scripts/compare-section.sh` 페이지 전체 모드 실행
3. 전체 diff < 8% 확인 (실패 시 approval-gate)
4. 반응형 3 뷰포트 + 크로스 브라우저 3개 확인
5. 결과를 `research/{페이지명}.md` 하단에 "통합 검증 결과"로 기록
6. approval-gate: 페이지 완료 처리 요청

## 데이터 전달 프로토콜

| 대상 | 방식 |
|------|------|
| 워커 → 오케스트레이터 | 반환 메시지(파일 경로 + 요약) + 파일 시스템 공유 |
| 오케스트레이터 → 워커 | prompt 안에 컨텍스트 + 이전 산출물 경로 명시 |
| 오케스트레이터 → 사용자 | approval-gate-format 표준 포맷 |

모든 중간 산출물은 프로젝트 루트 기준 상대 경로로 저장:
- `research/` 리서치 문서
- `plan/` 계획 문서
- `figma-screenshots/` 베이스라인
- `src/assets/{섹션명}/` 섹션 에셋
- `tests/visual/diff/` 측정 결과
- `PROGRESS.md` 진행 상황 (진실의 원천)

## 에러 핸들링

| 상황 | 대응 |
|------|------|
| 워커 1회 실패 (도중 멈춤) | 같은 prompt로 1회 재호출 |
| 워커 재실패 | 사용자에게 실패 내역 보고, 직접 디버깅 옵션 제시 |
| 캔버스-에셋 개수 불일치 | 워커가 멈춤 → 오케스트레이터가 approval-gate로 사용자 결정 요청 |
| 4 게이트 3회 실패 | 워커 보고 → approval-gate로 (a)완화 (b)다른접근 (c)디버깅 (d)되돌리기 |
| Phase 1 미완 상태에서 섹션 요청 | "Phase 1 먼저 완료해야 함" 보고 + Phase 1 진행 제안 |
| docs/ 파일 누락 | 멈추고 사용자에게 파일 확인 요청 |

## 금지

- ❌ 사용자 승인 없이 다음 Phase로 진행
- ❌ 여러 섹션을 병렬로 워커 스폰 (순차 처리 — 의존성과 커밋 히스토리 보호)
- ❌ 워커가 반환한 결과를 검증 없이 신뢰 (측정값은 파일에서 직접 읽어 확인)
- ❌ 오케스트레이터가 직접 코드 파일 수정 (측정 스크립트 실행과 PROGRESS.md 갱신은 예외)
- ❌ 같은 대화 내에서 두 섹션을 연속 처리 (섹션 간 approval-gate 필수)

## 테스트 시나리오

**정상 흐름:** 사용자 "ESGPN 메인페이지 Hero 섹션 구현해"
1. Phase 0: PROGRESS.md 확인 → 공통 컴포넌트 완료, 메인페이지 분할 완료 상태
2. section-implementer 스폰 (Hero)
3. 단계 1 완료 → 리서치 검토 요청
4. 사용자 "승인, 다음"
5. section-implementer 재호출 (단계 2부터)
6. 단계 2 완료 → plan 승인 요청
7. 사용자 "메모 추가했어, 반영"
8. section-implementer 재호출 (plan 업데이트)
9. 사용자 "이제 구현"
10. section-implementer 재호출 (단계 3~7)
11. 4 게이트 통과 → 커밋 승인 요청
12. 사용자 "커밋"
13. PROGRESS.md 체크 → "다음 섹션은?" 제안

**오류 흐름:** 단계 5에서 3회 실패
- 워커 실패 보고 반환
- approval-gate로 4개 선택지 제시
- 사용자 "기준 완화"
- 오케스트레이터가 해당 섹션 plan의 측정 섹션에 완화 사유 기록 후 커밋
