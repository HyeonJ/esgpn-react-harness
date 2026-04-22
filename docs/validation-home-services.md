# v5 하네스 실전 검증 — Home Services UI Kit

> ESGPN에서 도출한 v5 하네스 (F-001 ~ F-015) 가 **새 Figma 프로젝트**에서 깔끔히 구동되는지 검증.
> 본 문서는 새 Claude Code 세션의 출발점. 진행 중 F-log 추가 시 `docs/redefine/v5-feedback.md`에 기록.

---

## 1. 검증 대상

| 항목 | 값 |
|---|---|
| Figma 파일 | Home Services - Website - UI Kit (Community) |
| URL | https://www.figma.com/design/7X964y4dde6h4XUoVPxk9X/Home-Services---Website---UI-Kit--Community-?node-id=0-1 |
| fileKey | `7X964y4dde6h4XUoVPxk9X` |
| 루트 nodeId | `0:1` |
| 페이지 수 | Phase 2에서 확정 — 초기 탐색 결과 multi-page |

### 초기 탐색 결과 (2026-04-22 세션)
- `get_metadata(0:1)` 성공 — 75KB metadata 반환 → 파일 크기 큼. 페이지 하나씩 metadata 호출 필요
- `/design/` 타입 (정상) — MCP 접근 권한 확인됨

---

## 2. 제약 조건

### 쿼터
- 사용자 Figma 플랜: **Starter** — 공식 Figma MCP read tool **월 6 tool call 쿼터**
- 오늘 세션에서 이미 1~2회 소진 (get_metadata 성공 + 실패 1회)
- 남은 예산: **3~5 tool call**
- Framelink MCP 사용 금지 (F-015 영구 폐기)

### 사용 채널
| 용도 | 도구 | 쿼터 |
|---|---|---|
| Baseline PNG / composed frame / leaf asset | `scripts/figma-rest-image.sh` | REST API, 실질 무제한 |
| 노드 tree 탐색 | `curl GET /v1/files/{key}?ids=...&depth=N` | REST, 무제한 |
| 페이지 구조 초기 1회 | `get_metadata` (공식 MCP) | 월 6 중 1개 소비 |
| 디자인 토큰 (최소) | `get_variable_defs` (공식 MCP) | 월 6 중 1개 소비 |
| 세부 코드 힌트 (최소) | `get_design_context` (공식 MCP) | 섹션당 0~1회만 |

### Variables API 경계선
- `GET /v1/files/{key}/variables/local` — **Enterprise plan 전용**. Starter 접근 불가
- Home Services가 variables 쓰면: nodes 응답의 fill/stroke hex 직접 수집 → tokens.css 수동 구성
- Community 템플릿은 variables 사용 적을 가능성

---

## 3. 작업 위치

**권장: 현 레포 `validation/home-services` 브랜치**

```bash
git checkout -b validation/home-services
```

이유:
- F-015 업데이트 파일들이 `experiment/redefine-rebuild`에 있음 — 즉시 활용 가능
- `esgpn-harness-template` GitHub 레포는 F-015 반영 안 됨 (검증 후 업데이트 예정)
- ESGPN 자산(src/components/sections/**, research/, plan/)은 페이지 prefix(`main-`, `about-`, `contest-` 등) 사용 → Home Services와 섹션명 충돌 가능성 낮음
- git history에 ESGPN 산출물 보존 → 브랜치에서 덮어써도 손실 없음

### 덮어쓸 파일 (Home Services 기반으로 재작성)
- `PROGRESS.md` — 새 진행 추적
- `docs/figma-project-context.md` — Home Services Node ID / 페이지 / 리스크

### ESGPN 유지 파일 (충돌 없이 병행 가능)
- `src/components/sections/**` (기존 ESGPN 섹션들은 남겨두고 Home Services 섹션 추가)
- `src/components/layout/**` (Header/Footer는 Home Services용으로 **새로 만들기** — ESGPN 것 재사용 금지)
- `src/styles/tokens.css` — **이 부분 주의**: ESGPN 토큰과 Home Services 토큰이 다름. Phase 1에서 교체 여부 결정

### Home Services 섹션명 규약 (충돌 회피)
- 페이지 prefix 필수: `home-hero`, `home-services`, `home-pricing` 등
- ESGPN이 쓰는 `main-*`, `about-*`, `contest-*`, `certification-*`, `news-*`, `gallery-*`, `contact-*` 회피

---

## 4. 검증 성공 기준

### 필수 (검증 통과)
- [ ] **Framelink 에러 0** — 끝까지 REST API 경로로 구동
- [ ] **공식 MCP 쿼터 위반 0** — 예산 내 완료 (또는 Pro 업그레이드)
- [ ] **Phase 1 완료** — 토큰/폰트/에셋 파이프라인/VR 인프라 (Home Services용)
- [ ] **Phase 2 완료** — 최소 1 페이지 분할
- [ ] **Phase 3 최소 3 섹션 완주** — 차단 게이트 (G2/G4/G5/G6/G8) PASS

### 부가 (v5 규칙 작동 검증)
- [ ] PR-1 (Flatten 재탐색) 동작
- [ ] SI-A1 (REST API 단일 채널) 동작
- [ ] SI-B2 (min-height) 적용
- [ ] SI-C1 (design_context 명시 추출) 적용
- [ ] SI-D1/D2 (SVG 함정) 회피

### 산출
- [ ] **F-016+ 신규 F-log 엔트리** — Home Services에서 발견된 새 함정·개선점
- [ ] **v5 → v6 개선 방향** — 수렴 후 docs/redefine/v6-design.md 초안

---

## 5. 단계별 순서 (Phase 0 → 3)

### Phase 0 — 컨텍스트 확인
1. `git checkout -b validation/home-services`
2. `FIGMA_TOKEN` env var 확인: `powershell -Command "[Environment]::GetEnvironmentVariable('FIGMA_TOKEN', 'User')"`
3. Smoke test: `scripts/figma-rest-image.sh 7X964y4dde6h4XUoVPxk9X 0:1 /tmp/test.png --scale 1`
4. 본 문서(`docs/validation-home-services.md`) 읽기

### Phase 1 — 프로젝트 셋업
`phase1-setup-worker` 에이전트 1회 호출.
- `get_variable_defs(0:1)` → `src/styles/tokens.css` (ESGPN 것은 백업 후 교체 또는 파일 분리)
- 폰트 감지 후 `src/styles/fonts.css`
- 에셋 파이프라인 확인 (`scripts/figma-rest-image.sh` + `download-assets.sh`)
- VR 인프라 (Playwright fresh 상태 확인)

### Phase 2 — 페이지 분해
- **첫 페이지만 먼저**: `get_metadata(<pageNodeId>)` 1회
- `page-researcher` 에이전트 스폰
- 결과를 `research/home-{페이지명}.md`에 기록
- 섹션 분할 규칙 (이질 에셋 3+ / 반복 자식 3+ / 토큰 >10K) 적용

### Phase 3 — 섹션 구현 (최소 3개)
- `section-implementer` 7단계 자율 모드
- 각 섹션 baseline PNG: `scripts/figma-rest-image.sh ... figma-screenshots/home-{페이지}-{섹션}.png --scale 2`
- 4 게이트 PASS → 자동 커밋
- 3 섹션 완주 후 중간 리뷰

### 완료 후
- `docs/redefine/v5-feedback.md`에 F-016+ 엔트리 추가
- `esgpn-harness-template` GitHub 레포에 F-015 + v6 개선 반영 push

---

## 6. 새 세션 시작 프롬프트

**다음 입력을 새 Claude Code 세션에 그대로 붙여넣기**:

```
v5 하네스 실전 검증 시작 — Home Services UI Kit 사용.

## 컨텍스트
이전 세션에서 v5 하네스 Framelink 제거 + REST API 단일화 완료 (F-015 / 커밋 3f27bc5).
docs/validation-home-services.md 에 검증 계획서 있음 — 반드시 먼저 읽기.

## 대상 Figma
- Home Services - Website - UI Kit (Community)
- fileKey: 7X964y4dde6h4XUoVPxk9X
- 루트 nodeId: 0:1
- URL: https://www.figma.com/design/7X964y4dde6h4XUoVPxk9X/Home-Services---Website---UI-Kit--Community-?node-id=0-1

## 제약
- Figma Starter 플랜 월 6 tool call 쿼터 — 공식 MCP 최소 사용
- Framelink MCP 절대 호출 금지 (F-015 영구 폐기)
- 모든 PNG: scripts/figma-rest-image.sh 한 채널

## 작업 위치
현 레포에 validation 브랜치 파서 진행. ESGPN 자산은 페이지 prefix로 구분 — Home Services는 "home-*" prefix 사용.

## 첫 단계
1. git checkout -b validation/home-services
2. docs/validation-home-services.md 전체 읽기
3. FIGMA_TOKEN env var 확인 + scripts/figma-rest-image.sh smoke test
4. figma-to-react 스킬 활성화 → Phase 0 체크리스트 진행
5. PROGRESS.md 와 docs/figma-project-context.md 를 Home Services 기반으로 재작성 (ESGPN 내용은 git history에 보존됨)
6. phase1-setup-worker 스폰

## 성공 기준
docs/validation-home-services.md §4 참조. 핵심: Framelink 에러 0 + Phase 1+2 완료 + Phase 3 최소 3 섹션 완주 + F-log 신규 엔트리 수집.

준비됐으면 Phase 0부터 시작해.
```

---

## 7. 참조 문서

- `CLAUDE.md` — Figma 모드 규칙 (F-015 반영 완료)
- `docs/figma-workflow.md` Phase 0 — FIGMA_TOKEN env var 세팅
- `docs/section-implementation.md` — 섹션 7단계
- `docs/redefine/philosophy.md` — "편집 가능한 고충실도" north star
- `docs/redefine/v5-feedback.md` — F-001 ~ F-015 전체 F-log
- `.claude/agents/page-researcher.md`, `section-implementer.md` — 워커 규칙 (F-015 반영 완료)
- `scripts/figma-rest-image.sh --help` — REST API 래퍼 사용법
