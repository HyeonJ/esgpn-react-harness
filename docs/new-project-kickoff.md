# 새 Figma 프로젝트 킥오프 가이드

> 템플릿에서 bootstrap한 직후 이 문서를 읽어라. 새 Claude Code 세션에서 **한 번에 Phase 0 → Phase 1 진입**까지 이어주는 가이드.

---

## 1. 사전 세팅 (1회, 사용자 수행)

### 1.1 Figma Personal Access Token
1. figma.com → Settings → Security → Personal access tokens → "Generate new token"
2. 파일 읽기 권한만 필요
3. 토큰(`figd_...`) 복사

### 1.2 환경 변수 등록

**Windows (PowerShell)**:
```powershell
[Environment]::SetEnvironmentVariable('FIGMA_TOKEN', 'figd_발급토큰', 'User')
```

**macOS / Linux**:
```bash
echo 'export FIGMA_TOKEN=figd_발급토큰' >> ~/.zshrc
source ~/.zshrc
```

### 1.3 의존성 설치
```bash
npm install
npx playwright install chromium
```

### 1.4 Smoke test
```bash
# FIGMA_TOKEN 확인
powershell -Command "[Environment]::GetEnvironmentVariable('FIGMA_TOKEN', 'User')" | head -c 20   # Windows Git Bash
# printenv FIGMA_TOKEN | head -c 20                                                              # Unix

# REST API 래퍼 smoke test (본인 Figma 파일 하나로)
scripts/figma-rest-image.sh <FILE_KEY> 0:1 /tmp/test.png --scale 1
# → "[figma-rest-image] OK /tmp/test.png (... bytes)" 보이면 성공

npm run dev    # 브라우저에서 http://localhost:5173 스켈레톤 확인
```

자세한 트러블슈팅: `docs/setup.md`.

---

## 2. 프로젝트 정보 수집 (Phase 0 전제)

아래 값을 미리 파악해둔다:

| 항목 | 수집 방법 |
|---|---|
| **Figma fileKey** | URL `figma.com/design/<FILEKEY>/...` 에서 추출 |
| **루트 nodeId** | URL `?node-id=0-1` → `0:1` 로 변환 (보통 첫 페이지) |
| **페이지 수** | Figma에서 좌측 Pages 패널 확인 |
| **Canvas 폭** | 디자인이 1440 / 1920 / other 중 어느 것인지 |
| **브랜딩 톤** | 예: 모던 레트로 / 미니멀 다크 / 고채도 등 — 섹션 구현 시 디자인 의도 판단 자료 |

---

## 3. 플랜 제약 체크

`plugin:figma:figma` MCP의 read tool 호출 쿼터:
- **Starter 플랜**: 월 6 tool call
- **Pro 플랜 (Full/Dev seat)**: 일 200
- **Enterprise**: 일 600

### Starter 플랜 권장 운용
Starter에서도 하네스 구동 가능 — 단, 공식 MCP는 **최소 사용**:
- 전체 세션 `get_metadata` 1~2회 + `get_variable_defs` 1회 정도
- 모든 PNG 에셋은 `scripts/figma-rest-image.sh` (REST API, 쿼터 무관)
- 노드 상세는 `curl GET /v1/files/{key}/nodes?ids=...` 로 대체 (쿼터 무관)
- `get_design_context`는 진짜 필요한 1~2 섹션만

### Variables API 경계선
`GET /v1/files/{key}/variables/local` = **Enterprise plan 전용**. Starter/Pro는 접근 불가.
- 디자인이 Figma Variables 쓰면 → nodes 응답의 fill/stroke hex 직접 수집 → tokens.css 수동 구성
- Community 템플릿은 variables 사용 적을 가능성

자세히: `docs/redefine/v5-feedback.md` F-015.

---

## 4. 새 Claude Code 세션 시작 프롬프트

아래 블록에서 **`{...}` 플레이스홀더 4개**만 채워서 새 세션에 붙여넣기.

```
{프로젝트명} 하네스 시작 — 새 Figma 프로젝트 구현.

## 대상 Figma
- URL: {FIGMA_URL}
- fileKey: {FILE_KEY}
- 루트 nodeId: {ROOT_NODE_ID}

## 컨텍스트
v5 하네스로 부트스트랩된 프로젝트. F-001 ~ F-015 규칙 반영 상태.
핵심 원칙: "편집 가능한 고충실도" (docs/redefine/philosophy.md).

## 제약
- Figma 플랜 쿼터 보호 — 공식 MCP read tool 최소 사용 (get_metadata 1~2, get_variable_defs 1 수준)
- Framelink MCP 절대 호출 금지 (F-015 영구 폐기)
- 모든 PNG 에셋은 scripts/figma-rest-image.sh 한 채널
- Variables API Enterprise 전용 — Starter/Pro는 nodes 응답에서 fill/stroke hex 직접 추출

## 시작 절차
1. docs/new-project-kickoff.md 전체 읽기 (본 세션 진입점)
2. docs/figma-project-context.md 를 위 Figma 정보로 채우기 (페이지 Node ID 마스터 테이블, 사전 추정 섹션 구성)
3. PROGRESS.md 초기화 (파일은 이미 빈 템플릿 상태)
4. figma-to-react 스킬 활성화 → Phase 0 체크리스트 자동 진행
5. phase1-setup-worker 에이전트 스폰 — Phase 1 (토큰 / 폰트 / 에셋 파이프라인 / VR 인프라)

## 완주 후
- Phase 2: 페이지 하나씩 page-researcher 스폰
- Phase 3: 섹션 루프 (section-implementer, v4 자율 모드)
- 발견된 새 함정은 docs/redefine/v5-feedback.md 에 F-016+ 엔트리로 기록

Phase 0부터 시작해.
```

### 플레이스홀더 채우기 가이드
- `{프로젝트명}`: 자유 — 예: "Home Services", "Beverage Brand", "SaaS Landing"
- `{FIGMA_URL}`: Figma URL 그대로
- `{FILE_KEY}`: URL `/design/<여기>/` 부분
- `{ROOT_NODE_ID}`: URL `?node-id=0-1` → `0:1` 변환

---

## 5. 프롬프트 받은 새 Claude 세션이 자동으로 할 일

위 프롬프트가 있으면 Claude가 순차적으로:

1. **이 문서(`docs/new-project-kickoff.md`) 읽기** — 본 섹션까지 체계 확인
2. **`docs/figma-project-context.md` 열기** — 템플릿 구조 확인 후 Figma 정보로 갱신
3. **`PROGRESS.md` 초기화** — Phase 0/1/2/3 체크리스트 생성
4. **`figma-to-react` 스킬 호출** — 오케스트레이터 활성화
5. **Phase 0 체크**:
   - `FIGMA_TOKEN` env var 세팅 확인
   - `docs/tech-debt.md` OPEN 부채 3건 이상이면 차단 (새 프로젝트는 0건)
   - PROGRESS.md 상태 판별 → "초기 실행" 모드
6. **`phase1-setup-worker` 스폰** — Phase 1 플랜 작성
7. 플랜 검토 승인 게이트 → 이후 자동 진행

---

## 6. 주의: 이 템플릿은 **아직 빈 상태**

Bootstrap 직후 다음 파일들은 **스텁/플레이스홀더**다. Phase 1에서 Figma 데이터로 교체된다:

| 파일 | 현재 상태 | Phase 1 교체 내용 |
|---|---|---|
| `src/styles/tokens.css` | 빈 `:root { }` | Figma `get_variable_defs` 추출 결과 |
| `src/styles/fonts.css` | 주석만 (시스템 폰트) | `@font-face` 선언 + `public/fonts/` |
| `src/App.tsx` | Landing 스켈레톤 | 섹션별 라우트 추가 |
| `src/components/layout/` | 빈 (`.gitkeep`) | Header / Footer / RootLayout 섹션 구현 |
| `src/components/sections/` | 빈 | Phase 3 섹션 결과물 |
| `src/components/ui/` | 빈 | 공통 UI 컴포넌트 (Rule of Three 승격) |
| `docs/figma-project-context.md` | 플레이스홀더 테이블 | 실제 페이지/섹션/토큰 데이터 |
| `PROGRESS.md` | 빈 체크리스트 | 실시간 진척 기록 |

자세한 스텁 구조는 `README.md` 참조.

---

## 7. 참조 문서 인덱스

| 파일 | 언제 읽나 |
|---|---|
| `CLAUDE.md` | 항상 — Figma 모드 규칙 / 게이트 / 섹션 편집 위임 |
| `docs/new-project-kickoff.md` | **지금** — 본 문서, 첫 세션 진입점 |
| `docs/setup.md` | 환경 트러블슈팅 / 새 PC 세팅 |
| `docs/figma-workflow.md` | 4 Phase 전체 흐름 |
| `docs/section-implementation.md` | 섹션 7단계 세부 (section-implementer가 참조) |
| `docs/figma-project-context.md` | **프로젝트별 작성 필수** — Phase 0에서 채움 |
| `docs/redefine/philosophy.md` | 하네스 north star ("편집 가능한 고충실도") |
| `docs/redefine/v5-feedback.md` | F-log 누적 함정/규칙 근거 |
| `docs/tech-debt.md` | 미해결 부채 (Phase 0 차단 체크) |
| `scripts/figma-rest-image.sh --help` | REST API 래퍼 사용법 |
