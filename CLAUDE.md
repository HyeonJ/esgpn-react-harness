# ESGPN 프로젝트 — Figma → React 하네스

> **🚧 진행 중: v4 Rebuild 세션 인수인계**
> 현재 `experiment/redefine-rebuild` 브랜치에서 v4 자율 모드 완주 진행 중.
> **25/43 섹션 완료**. 남은 14섹션은 `docs/redefine/HANDOFF.md` 참조 후 이어서 진행.
> 다음 섹션: **news-list** (뉴스 목록 마지막)

**핵심 원칙 (v4 자율 모드): 모든 페이지를 사용자 개입 없이 끝까지 완주한다. 사용자는 완주 후 검수.**

작업은 항상 다음 5단계로 진행: **리서치 → 계획 → 에셋 → 구현 → 측정**
각 단계는 명확히 분리되며, **자율 모드에서는 멈추지 않고 연속 진행**. 3회 실패 시에도 AI가 자체 판단 (완화는 최후).

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

### 품질 게이트 (v4 — 차단/참고 위계)

> North star: `docs/redefine/philosophy.md` — "편집 가능한 고충실도". 구조가 합격 기준, 픽셀은 증빙.

**차단 게이트 (FAIL이면 섹션 미완료)**:
| G | 항목 | 기준 | 자동화 |
|---|---|---|---|
| G5 | 시맨틱 HTML | eslint jsx-a11y error 0 | `npm run lint` |
| G6 | 텍스트:이미지 비율 | text-bearing raster 0 | `scripts/check-text-ratio.mjs` |
| G8 | i18n 가능성 | JSX에 literal text 존재 | `scripts/check-text-ratio.mjs` |
| G2 | 치수 | font±2, 나머지±4 | Playwright computed style |
| G4 | 색상 토큰 일치 | 디자인 토큰 참조 (hex 직접 사용 최소화) | Playwright computed style |

**참고 지표 (수치만 기록, 차단 아님)**:
| G | 항목 | 목표 | 자동화 |
|---|---|---|---|
| G1 | 시각 diff | ≤ 15% | `scripts/compare-section.sh` |
| G3 | 에셋 존재 | naturalWidth > 0 | Playwright DOM |
| G7 | a11y/SEO | Lighthouse a11y≥95, SEO≥90 | `scripts/measure-quality.sh` |

**v4 구조 지표 (1차 목표)**:
| 지표 | 목표 |
|---|---|
| token_ratio | ≥ 0.2 |
| semantic_score | ≥ 2 |
| absolute/file | ≤ 5 |

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
- **Framelink는 leaf nodeId로 호출** — 아이콘/장식 export 시 부모 카드/프레임 nodeId **금지**. 자식 leaf nodeId(아이콘/사진/blur 레이어)만 전달. 부모를 넘기면 자식 전체(텍스트 포함)가 단일 composite PNG 한 장으로 묶임 = text-bearing raster 안티패턴의 주 원인. 자식 nodeId 모르면 `get_figma_data(부모, depth=3)` 트리 탐색 선행. **예외**: 섹션 baseline PNG만 섹션 nodeId 그대로 사용 (비교 기준)
- **캔버스-에셋 개수 불일치 시 사용자 보고 후 멈춤** — 임의 진행 금지
- **baseline PNG는 Framelink MCP로만 저장**, 경로 규약:
  - 공통: `figma-screenshots/{section}.png`
  - 페이지 섹션: `figma-screenshots/{page}-{section}.png`
  - 페이지 전체: `figma-screenshots/{page}-full.png`

### 실패 처리
- **게이트 미통과 시 최대 3회 수정.** 3회에도 미달이면 사용자 보고 + 멈춤. 임의 우회 금지
- **3회 실패 시 선택지 순서는 `(a)재분할 → (b)다른접근 → (c)엔진차이 수용 → (d)되돌리기 → (e)완화`** — 완화는 맨 끝. `(e)완화` 선택 시 커밋 메시지에 `[ACCEPTED_DEBT]` 태그 + `docs/tech-debt.md` 엔트리 자동 추가 필수
- **`docs/tech-debt.md`의 `OPEN` 부채 3건 이상이면 새 섹션 진행 차단** (Phase 0 오케스트레이터 체크). 쌓인 부채 먼저 해소

### 섹션 파일 편집 위임 규칙 (cross-cutting 포함)
- **`src/components/sections/**`, `src/components/ui/` 파일 수정은 `section-implementer` 워커로 위임**. 직접 편집 금지
- bulk sed / find-replace 같은 cross-cutting 작업도 섹션당 워커 1개로 분할 (반응형/리네임/스타일 통일 등 포함)
- 예외 존: `src/components/layout/`, `src/styles/`, `src/App.tsx`, `src/routes/`, `tests/`, `scripts/` — 직접 편집 OK
- Why: 과거 bulk sed가 섹션 내부 절대위치 레이아웃을 무음 파괴. 워커 분할 + 섹션별 스크린샷 검증이 유일한 가드

### 변경 후 시각 검증 의무
- **섹션 파일을 수정하는 모든 작업 완료 시 4뷰포트(375/768/1440/1920) 스크린샷 + Figma 원본 비교 필수**
- 구현 완료 외에도 반응형/폭조정/리팩터/토큰치환 등 cross-cutting 작업 후에도 동일 적용
- 자동화: `scripts/compare-section.sh {섹션명}` 또는 워커가 Playwright로 4뷰포트 캡처 → docs/width-/에 저장
- "수치 PASS만으로 완료" 금지. 눈으로 확인해서 semantic 오류(요소 swap, 줄바꿈 이상, blend 모드 오작동) 없는지 검증

### 반응형 — 개발자 재량 범위 (Figma 1920 단일 디자인 기준)
- Figma에 반응형 목업이 없어도 개발자가 **표준 breakpoint (320/768/1024/1440)** 범위에서 다음은 **재량 허용**:
  - 외곽 컨테이너: `max-w-[...] w-full mx-auto` 축소 (A 머지된 표준)
  - stacking: 좁은 뷰포트에서 `flex-row` → `flex-col` 전환
  - 좌우 패딩 축소: `px-[252px]` → `px-6 md:px-12 xl:px-[252px]`
  - 텍스트 `whitespace-nowrap` 제거, 폰트 크기 비례 축소
- **디자이너 승인 필요**: 요소 숨김, 순서 재배열, 아이콘 → 텍스트 치환 같은 **레이아웃 재설계**
- Figma 디자인이 깨지지 않는 범위에서만 재량 적용. 의심 시 사용자에게 문의
- Why: 업계 표준은 개발자 재량 인정 (NN/G, Tailwind, Bootstrap). 단, "Figma 레이아웃 해석 변경"은 디자이너 영역

### Header fixed clearance
- 페이지 최상단 섹션의 `padding-top` = `max(Figma 첫 element y 좌표, 108px)` (floor = Header pill 88 + gap 20)
- Figma에서 디자이너가 이미 y 좌표에 여백을 포함시킨 경우 그대로 사용. 포함 안 시켰으면 floor 값 적용
- 적용 사례: /contact pt-[180px], /about pt-[169px], /gallery pt-[180px], /news pt-[140px], /news/:id pt-[140px]

---

## v4 자율 모드 — 사용자 개입 0

**모든 지점이 자동.** 멈추는 곳 없음. 완주 후 사용자가 검수.

| 지점 | 동작 |
|------|------|
| Phase 2 페이지 분할 | 자동 진행, 로그만 |
| 섹션 단계 1~2 (리서치/계획) | 자동 진행, 로그만 |
| 섹션 단계 3~7 (에셋~커밋) | 자동 진행, 게이트 자체 판정 |
| 차단 게이트 3회 실패 | AI 자체 판단 (재분할→다른접근→엔진차이 수용→되돌리기→완화 순) |
| 페이지 통합 검증 | 자동, 스크린샷 dump |
| **완주 후** | 9페이지 스크린샷 + 게이트 CSV + 시간 리포트 → **사용자 검수** |

### 시간 측정
- 세션 시작 시 `date +%s` 기록 → PROGRESS.md "시작" 필드
- 각 섹션 완료 시 소요 시간(초) 기록
- 완주 시 총 소요 시간 계산 → PROGRESS.md "종료" + "총 소요"
- 완주 보고에 섹션별 breakdown 포함

---

## 교훈 — 문제 해결 프레이밍

- 옵션 A/B 이분법 제시 전에 **"업계 표준 답은?"** 부터 확인. 사용자가 "둘 다 이상해"라면 프레임 자체가 틀린 것
- 규칙 위반 지적받은 반동으로 과잉 보수화 경계 — 규칙 범위를 무작정 넓히지 말고 재확인
- 사례: Figma가 1920 단일 디자인일 때 "hard-fixed 1920 + 가로스크롤" vs "ScaleFit" 이분화는 틀린 프레임. 표준 답은 `max-w-[1920px] w-full mx-auto` 컨테이너 (모든 공개 웹의 기본)

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
├─ check-figma-export-targets.mjs — 대형 composite PNG 감지 (leaf nodeId 호출 강제) (v3)
├─ rembg-icon.py                — GIF/dark-bg 아이콘 배경 제거 (birefnet-general + alpha matting) (v3)
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
