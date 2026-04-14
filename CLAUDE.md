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

> **철학**: 실패는 "자동 가드"로 막는다. 새 함정 발견 시 텍스트 규칙 추가가 아니라 lint/스크립트 이식 우선. 텍스트 규칙은 "왜 이 가드가 존재하는가" 설명용.

### 구조 규칙
- **작업 단위 = 섹션 (페이지 아님).** 한 섹션 = 한 브랜치 = 한 커밋. 한 브랜치에 여러 섹션 혼재 금지
- **섹션이 이질적 에셋 3+ / 반복 자식 3+ / 예상 토큰 >10K 중 하나라도 해당하면 서브섹션으로 쪼갠다** (Phase 2 분할 시 강제. `docs/figma-workflow.md §3` 참조)
- **섹션은 자기 정렬 책임을 진다** — 섹션 루트에 `mx-auto` 내장. Preview wrapper 의존 금지. 페이지 통합 육안 게이트(docs §6.5) 통과 필수

### 품질 게이트 (8 게이트 — 모두 통과해야 섹션 완료)
| G | 항목 | 기준 | 자동화 |
|---|---|---|---|
| G1 | 시각 diff | < 5% | `scripts/compare-section.sh` |
| G2 | 치수 | font±1, 나머지±2 | Playwright computed style |
| G3 | 에셋 | naturalWidth > 0 | Playwright DOM |
| G4 | 색상 | hex 일치 | Playwright computed style |
| G5 | 시맨틱 HTML | eslint jsx-a11y error 0 | `npm run lint` |
| G6 | 텍스트:이미지 비율 | text/alt ≥ 3:1 (alt≥80자일 때만 적용) | `scripts/check-text-ratio.mjs` |
| G7 | a11y/SEO | Lighthouse a11y≥95, SEO≥90 | `scripts/measure-quality.sh` (lhci 설치 시) |
| G8 | i18n 가능성 | JSX에 literal text 존재 | `scripts/check-text-ratio.mjs` |

- **G5~G8은 단계 4.5에서 G1~G4보다 먼저 측정** — 구조가 망가진 코드는 픽셀 측정에 도달하지 말 것
- **측정값은 숫자로 plan에 기록.** 눈대중 금지. "괜찮아 보임" 금지
- **G1 수치 PASS만으로 섹션 완료 금지** — baseline/capture/diff 3종 이미지를 반드시 육안 스캔. semantic 오류(SVG flip, 요소 swap, 색 반전, 줄바꿈 위치)는 수치로 못 잡는다

### 자동 가드 (문서 규칙에서 이식됨)
아래는 과거 문서 규칙이었으나 이제 스크립트/lint로 자동 검출된다. 수동 확인 불필요:
- 음수 width/height (`w-[-...`) → `scripts/check-tailwind-antipatterns.sh`
- 정수 회전·letter-spacing (반올림 금지) → 동 스크립트 warn
- Framelink baked-in PNG 위에 CSS rotate/blend/bg 중첩 → `scripts/check-baked-in-png.sh`
- 시맨틱 HTML 위반 → eslint jsx-a11y (G5)
- 텍스트 baked-in raster → G6/G8

여전히 사람이 판단해야 하는 규칙은 `docs/section-implementation.md §2.4/§2.5` 참조.

### 에셋 규칙
- **에셋 URL 무조건 다운로드.** CSS/유니코드 대체 금지
- **동적 에셋(GIF/비디오) 원본 사용 금지** — 부모 노드를 Framelink로 정적 PNG 추출 (`dynamic-asset-handling` 스킬)
- **캔버스-에셋 개수 불일치 시 사용자 보고 후 멈춤** — 임의 진행 금지
- **baseline PNG는 Framelink MCP로만 저장**, 경로 규약:
  - 공통: `figma-screenshots/{section}.png`
  - 페이지 섹션: `figma-screenshots/{page}-{section}.png`
  - 페이지 전체: `figma-screenshots/{page}-full.png`

### 실패 처리
- **게이트 미통과 시 최대 3회 수정.** 3회에도 미달이면 사용자 보고 + 멈춤. 임의 우회 금지
- **3회 실패 시 선택지 순서는 `(a)재분할 → (b)다른접근 → (c)엔진차이 수용 → (d)되돌리기 → (e)완화`** — 완화는 맨 끝. `(e)완화` 선택 시 커밋 메시지에 `[ACCEPTED_DEBT]` 태그 + `docs/tech-debt.md` 엔트리 자동 추가 필수
- **`docs/tech-debt.md`의 `OPEN` 부채 3건 이상이면 새 섹션 진행 차단** (Phase 0 오케스트레이터 체크). 쌓인 부채 먼저 해소

---

## 사용자 개입 지점 (축소판 — 섹션당 1회)

| 지점 | 당신이 할 일 |
|------|-----------|
| Phase 1 plan 완료 | plan/phase1-setup.md 검토 후 승인 |
| Phase 2 페이지 분할 완료 | research/{페이지명}.md 검토 후 승인 또는 재분할 |
| **섹션 단계 2 (plan) 완료** | plan/{섹션명}.md 검토 후 승인 또는 메모 (real gate, 섹션당 1회) |
| 게이트 3회 실패 | 선택지 중 결정 |
| 페이지 통합 검증 완료 | 페이지 완료 처리 |

**자동화된 지점 (통보만, 개입 불필요)**:
- 섹션 단계 1 (리서치) 완료 → 요약 통보만, 자동으로 단계 2 진행
- 단계 5 게이트 전체 PASS → 자동 커밋 (메시지에 diff % 포함) + PROGRESS.md 갱신

각 real gate에서 오케스트레이터가 `approval-gate-format` 스킬의 표준 포맷으로 출력한다.

---

## 참조 문서

| 파일 | 역할 |
|------|------|
| `docs/figma-workflow.md` | 4 Phase 전체 흐름 + Phase 2 섹션 분할 규칙 |
| `docs/section-implementation.md` | 섹션 7단계 절차 (4.5단계 품질 게이트 포함) |
| `docs/figma-project-context.md` | 페이지 Node ID, 공통 컴포넌트 카탈로그, 리스크 |
| `docs/tech-debt.md` | 기술부채 트래커 (Phase 0 차단 체크 대상) |
| `docs/frontend.md`, `docs/react.md` | 코드 컨벤션 |
| `docs/backend.md`, `docs/spring.md` | 백엔드 작업 시 |
| `docs/setup.md` | 새 PC 환경 세팅 절차 |
| `PROGRESS.md` | 진행 상황 진실의 원천 |

---

## 하네스 구성

```
.claude/
├─ agents/
│  ├─ phase1-setup-worker.md    — Phase 1 프로젝트 셋업 전담
│  ├─ page-researcher.md        — Phase 2 페이지 분해 전담 (서브섹션 분할 포함)
│  └─ section-implementer.md    — Phase 3 섹션 7단계 전담
└─ skills/
   ├─ figma-to-react/           — 메인 오케스트레이터 (진입점)
   ├─ approval-gate-format/     — 승인 대기 표준 보고 포맷
   ├─ dynamic-asset-handling/   — GIF/비디오 정적 프레임 추출
   └─ visual-regression-gates/  — 8 게이트 측정 절차

scripts/
├─ measure-quality.sh           — G5~G8 umbrella (단계 4.5)
├─ check-text-ratio.mjs         — G6/G8 텍스트/이미지 비율 + raster-heavy 감지
├─ check-baked-in-png.sh        — Framelink baked-in 중첩 검출
├─ check-tailwind-antipatterns.sh — 음수 width, 정수 반올림 검출
├─ check-composite-diff.mjs     — Framelink 단독 export vs page composite 차이 (v3)
├─ bake-baseline.mjs            — baseline alpha=0 영역 full-page crop으로 white 베이크 (v3)
├─ track-diff-history.mjs       — G1 회차 history + 악화 revert 힌트 (v3)
├─ detect-placeholder-text.mjs  — 영문 placeholder 감지 (v3)
├─ compare-section.sh           — G1~G4 통합 측정 (--bake-from-full 옵션 v3)
└─ doctor.sh                    — 환경 점검
```

---

## 변경 이력

| 날짜 | 변경 내용 | 대상 | 사유 |
|------|----------|------|------|
| 2026-04-13 | 초기 구성 | 전체 (agents 3, skills 4) | docs v2 기반 Figma→React 오케스트레이터 구축 |
| 2026-04-13 | Framelink MCP 도입 | docs/figma-workflow.md Phase 0, section-implementation.md §2.1 / §2.3 / §6.1, visual-regression-gates, section-implementer, page-researcher, figma-to-react, figma-project-context §5 | 공식 `get_screenshot` inline 제약으로 G1 baseline 수동 export 필요 → Framelink `download_figma_images`로 자동화. baseline 경로 `figma-screenshots/{섹션명}.png` flat 통일, floating 요소용 `--clip-*` 인자 추가 |
| 2026-04-14 | 하네스 v2 — 규칙→자동가드 이식 + 8게이트 | CLAUDE.md·section-implementation·figma-workflow·visual-regression·approval-gate·section-implementer·page-researcher·figma-to-react + scripts 4개 신설 + tech-debt.md 신설 | deep-research + harness-feedback 진단 반영. 핵심 변경: (1) G5~G8 품질 게이트 신설·단계 4.5 배치로 text-bearing raster 등 구조 안티패턴 재발 차단 (2) "완화" 옵션을 선택지 말단 이동 + `[ACCEPTED_DEBT]` 태그 + tech-debt.md 트래커 (OPEN 3건 시 차단) (3) 섹션 분할 기준 강화 (이질 에셋 3+ / 반복자식 3+ / 토큰 >10K) (4) 승인 게이트 3→1 축소 (섹션 단계 1/7 자동화) (5) 문서 함정 규칙 일부를 lint/스크립트로 이식 |
| 2026-04-15 | 하네스 v3 — 자율 모드 1세션 피드백 8항목 반영 | scripts 4개 신설 (bake-baseline, check-composite-diff, track-diff-history, detect-placeholder-text) + compare-section.sh `--bake-from-full` / diff history tracking + check-text-ratio raster-heavy 휴리스틱 + PreviewWrapper (withHeader/withFooter) + section-implementer 자율 모드 최적화 + page-researcher flatten/placeholder 경고 | experiment/autonomous-run 1세션 (38섹션) 회귀 분석에서 8가지 한계 식별: baseline alpha 베이크, Preview layout 옵션, composite 차이 가드, G6 floor bypass, 자율 design_context 사전 fetch, 회차 best revert 힌트, placeholder 감지, flatten 자동 경고 |
