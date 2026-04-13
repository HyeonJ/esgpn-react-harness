# esgpn-react-harness

Figma → React 고충실도 구현을 위한 Claude Code 오케스트레이터 하네스.

## 목적

이전 수동 Figma→React 작업이 60% 정확도에서 막힌 원인(큰 호흡, 측정 부재, 에셋 무시)을 구조적으로 방어하는 에이전트 팀 하네스. 섹션 단위 작업 + 4 게이트 수치 측정 + 사용자 승인 게이트를 강제한다.

## 구성

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

docs/                           — 규칙 문서 원본 (하네스가 참조)
CLAUDE.md                       — 하네스 트리거 + 모드 판별
```

## 동작 원리

1. 사용자가 Figma URL 또는 "섹션 구현" 같은 요청
2. `figma-to-react` 스킬이 트리거 (오케스트레이터)
3. 오케스트레이터가 상황에 맞는 서브에이전트 워커 스폰
4. 워커가 섹션 작업 후 결과 반환
5. 오케스트레이터가 표준 포맷으로 사용자에게 승인 요청
6. 사용자 판단 → 오케스트레이터가 다음 워커 스폰

## 4 게이트 (모든 섹션 강제)

| # | 게이트 | 기준 |
|---|--------|------|
| G1 | 시각 일치 (pixelmatch) | diff < 5% |
| G2 | 치수 정확도 | font ±1px, margin/padding ±2px |
| G3 | 에셋 무결성 | 모든 `<img>` naturalWidth > 0 |
| G4 | 색상 정확도 | Figma hex와 동일 |

측정값이 `plan/{섹션명}.md`에 숫자로 기록되지 않은 섹션은 미완료.

## 사용자 개입 지점

Phase 1 plan / Phase 2 페이지 분할 / 섹션 리서치 / 섹션 plan / 게이트 통과 / 게이트 3회 실패 / 페이지 통합. 각 지점에서 하네스가 멈추고 [A][B][C][D] 선택지를 제시한다.

## 주의

- 하네스는 **초기 스캐폴드(v0.1)** 이며 실행 검증 전.
- 서브에이전트의 Figma MCP 권한 전파 여부는 첫 섹션에서 실증 필요.
- 승인 게이트 자동 진행 방지는 프롬프트 복종에 의존함 — 오케스트레이터가 승인 없이 넘어가면 즉시 교정 필요.

## 출발점 문서

`docs/` 폴더의 문서가 하네스의 설계 원천. 특히:
- `docs/figma-workflow.md` — 4 Phase 전체 흐름
- `docs/section-implementation.md` — 섹션 7단계 (동적 에셋 규칙 포함)
- `docs/figma-project-context.md` — 페이지 Node ID, 공통 컴포넌트 카탈로그
