# docs/setup.md — 새 PC에서 ESGPN 하네스 환경 세팅

이 저장소를 **새 로컬 머신**에 내려받아 **오케스트레이터(Claude Code 세션)**로 작업을 이어가려면 아래 절차를 따른다. 대부분의 규칙·워커·스킬·산출물은 git에 들어있어 **자동 전달**되며, PC-local 설정만 수동으로 해주면 된다.

---

## 0. TL;DR 체크리스트

```bash
# 1) 저장소
git clone <repo-url> esgpn-react-harness
cd esgpn-react-harness

# 2) Node 의존성
npm install

# 3) Playwright 브라우저 바이너리 (❗ 필수, 자주 잊음)
npx playwright install chromium

# 4) Figma Personal Access Token 발급 후

# 5) Framelink MCP 등록 (한 줄, 줄바꿈 금지)
claude mcp add figma-framelink --scope user -- npx -y figma-developer-mcp --figma-api-key=figd_토큰 --stdio --image-dir=$(pwd)

# 6) 환경 점검 (한 번에 전부 검증)
npm run doctor

# → "✓ 전체 통과" 나오면 끝. 나오지 않으면 실패 메시지 따라 해결.
```

---

## 1. 전제(기계 레벨)

| 도구 | 버전 | 확인 |
|---|---|---|
| Node.js | 20 LTS 이상 | `node -v` |
| npm | 최신 | `npm -v` |
| Git | 최신 | `git --version` |
| **Git Bash** (Windows 전용) | 최신 | `bash --version` — `scripts/*.sh` 실행에 필수. cmd/PowerShell은 못 돌림 |
| Claude Code CLI | 최신 | `claude --version` |

macOS/Linux는 bash 기본 내장이라 Git Bash 불필요.

---

## 2. 저장소 및 Node 의존성

```bash
git clone <repo-url> esgpn-react-harness
cd esgpn-react-harness
npm install
```

`package.json`이 처리하는 것:
- React 18, React Router, TypeScript, Vite
- Tailwind v4 + `@tailwindcss/vite`
- `clsx`, `lucide-react`
- `sharp` (BG 이미지 압축)
- `@playwright/test` (시각 회귀)
- `tsx` (TS 런너)
- ESLint v9 flat config

`npm install`이 **처리하지 않는 것**(수동 필요):
- **Playwright 크로미움 바이너리** (아래 §3)
- **Pretendard/Yeseva woff2** — git 커밋돼 있어서 clone으로 자동 확보

---

## 3. Playwright 브라우저 바이너리 (필수)

`@playwright/test`는 라이브러리만 깔고 **브라우저 바이너리는 별도 설치**해야 한다. 안 깔면 `compare-section.sh` 실행 시:

```
Error: Executable doesn't exist at ...chromium-xxxx\chrome-win\chrome.exe
```

**해결:**

```bash
npx playwright install chromium
```

Firefox/WebKit은 본 프로젝트에서 불필요 (`chromium`만).

---

## 4. MCP 서버

### 4.1 공식 Figma MCP (`plugin:figma:figma`) — 필수
Claude 계정에서 Figma 연동. Claude Desktop/CLI의 계정 설정에서 처리. HTTP 서버라 설치 파일 없음. `claude mcp list`에 `plugin:figma:figma ... ✓ Connected` 보이면 됨.

제공 도구:
- `get_design_context`, `get_metadata`, `get_variable_defs` (메타/코드/토큰 전용)
- `get_screenshot` — inline 전용이라 **파일 저장 불가 → 사용 금지** (docs/figma-workflow.md Phase 0 참조)

### 4.2 Framelink MCP (`figma-framelink`) — 필수
baseline PNG 저장 + 동적 에셋 정적 프레임 추출 전용.

**Figma Personal Access Token 발급:**
1. figma.com 로그인
2. Settings → Security → Personal access tokens → "Generate new token"
3. 파일 읽기 권한만 필요
4. 토큰(`figd_...`) 복사 — 다시 표시 안 되므로 즉시 저장

**등록 (한 줄, 줄바꿈 절대 금지):**
```bash
claude mcp add figma-framelink --scope user -- npx -y figma-developer-mcp --figma-api-key=figd_발급토큰 --stdio --image-dir=C:/절대/경로/esgpn-react-harness
```

플래그 의미:
- `--stdio` — MCP 클라이언트 모드 (필수)
- `--image-dir` — 다운로드 경로 제한 (프로젝트 루트 **절대 경로**, forward slash). Windows에서 backslash(`\`) 쓰면 bash가 escape 처리해서 경로 깨짐
- `--scope user` — 전역 등록, 다른 프로젝트에서도 재사용 가능

**확인:**
```bash
claude mcp list
# figma-framelink: ... --stdio ... - ✓ Connected
```

**Claude Code 세션 재시작 필요** — 새 MCP 도구 스키마는 세션 시작 시에만 로드됨. `claude --continue`로 재시작하면 대화 컨텍스트 유지.

### 4.3 보안 주의
PAT은 `C:\Users\<user>\.claude.json`에 평문 저장된다. 개발 PC 이외 환경에 `.claude.json` 공유 시 반드시 토큰 제거.

---

## 5. 선택 도구 (현재 미사용, 미래 대비)

### 5.1 Python + Pillow
`scripts/process-assets.py`가 `--blackbg` 옵션으로 검정 배경 투명화할 때 필요. 현재 프로젝트에서 **한 번도 안 씀** (Framelink가 투명 배경 포함 합성본 반환).

```bash
python3 --version           # 3.10+ 권장
python3 -m pip install Pillow
```

### 5.2 ffmpeg / apngasm
`dynamic-asset-handling` 스킬이 GIF/비디오를 APNG/PNG로 변환할 때 사용. Framelink `download_figma_images`가 부모 노드 정적 PNG로 대체 처리해서 **현재 안 씀**.

설치 필요 시:
- ffmpeg: https://ffmpeg.org/download.html
- apngasm: `npm install -g apngasm` (또는 시스템 패키지)

---

## 6. 하네스 자동 전달 (git 포함)

아래는 git clone만 하면 **자동 확보**되므로 별도 설치 불필요.

| 범주 | 위치 |
|---|---|
| 하네스 절대 규칙 | `CLAUDE.md` |
| 워크플로우 | `docs/figma-workflow.md`, `docs/section-implementation.md`, `docs/figma-project-context.md` |
| 워커 에이전트 | `.claude/agents/phase1-setup-worker.md`, `page-researcher.md`, `section-implementer.md` |
| 스킬 | `.claude/skills/figma-to-react/`, `visual-regression-gates/`, `approval-gate-format/`, `dynamic-asset-handling/` |
| 섹션 산출물 | `research/*.md`, `plan/*.md` |
| baseline | `figma-screenshots/*.png` |
| 진행 상태 | `PROGRESS.md` |
| 측정 인프라 | `scripts/compare-section.sh`, `tests/visual/*.ts` |
| 한국어 폰트 | `public/fonts/PretendardVariable.woff2`, `YesevaOne.woff2` |
| 디자인 토큰 | `src/styles/tokens.css`, `fonts.css` |

---

## 7. 무관한 플러그인 (설치 불필요)

아래는 이 프로젝트에서 **전혀 사용하지 않는다**. 다른 프로젝트용 전역 도구일 뿐.

- **superpowers** — 범용 개발 워크플로우 스킬(brainstorming, TDD, debugging 등). ESGPN 하네스는 프로젝트 전용 스킬로 자급자족하므로 불필요. 본인이 다른 프로젝트에서 쓴다면 별도 설치.
- **Gmail / Google Calendar MCP** — 본 프로젝트 무관.
- **Pencil** 등 다른 디자인 MCP — 본 프로젝트는 Figma 전용.

---

## 8. 동작 확인 (세팅 완료 후)

### 8.1 빠른 환경 점검: `npm run doctor`

```bash
npm run doctor
```

`scripts/doctor.sh`가 다음 4가지를 자동 점검:
1. 시스템 도구 (Node 20+, Git, Claude CLI, Git Bash)
2. MCP 서버 연결 (공식 Figma + Framelink 둘 다 `✓ Connected`)
3. Playwright 크로미움 바이너리 설치 여부
4. `npm run typecheck` 통과 여부

모두 통과하면 `✓ 전체 통과. 오케스트레이터 세션 시작 가능.` 출력.
실패 시 해당 docs/setup.md 섹션 안내 + 구체 명령 제시.

### 8.2 실측 검증 (선택, 더 확실)

기존 섹션을 재측정해서 전체 인프라가 정상 작동하는지 검증.

```bash
npm run dev          # 백그라운드 권장
# 다른 셸에서:
bash scripts/compare-section.sh main-stats
```

**기대 결과:** `DIFF: 1.92%` 근처 (원본 세션 값). 이 수치가 나오면 baseline 파일·dev 서버·Playwright·pixelmatch 전 체인이 정상 작동한다는 뜻.

---

## 9. 새 세션 시작 시

Claude Code에서 프로젝트 디렉터리로 진입 후:

```bash
claude
```

첫 메시지 예시:
```
PROGRESS.md 현재 상태 확인 후 다음 미완 섹션 진행해줘
```

오케스트레이터(`figma-to-react` 스킬)가 자동으로:
1. `PROGRESS.md` 읽어 현재 진척 파악
2. 다음 섹션 판정 (예: `main-programs-card2`)
3. Framelink MCP 스키마 로드 시도
4. 필요 시 세션 재시작(`claude --continue`) 안내

---

## 10. 트러블슈팅

### Framelink가 `✓ Connected`인데 스키마가 안 잡힘
**원인:** MCP stdio 연결이 idle/crash로 drop됐지만 세션이 tool catalog를 재협상 못 함. Claude Code의 알려진 한계.
**해결:** `/exit` → `claude --continue`로 재시작 (대화 컨텍스트 유지).
**상세:** 약 20~55분 간격으로 재발 가능. 장기 해결책은 Framelink `notifications/progress` 메시지 호환성 패치 필요 (본 프로젝트 범위 외).

### `scripts/compare-section.sh: command not found`
**원인:** Windows에서 cmd/PowerShell로 실행. Git Bash 필요.
**해결:** Git Bash 실행 후 재시도.

### baseline PNG와 capture PNG 크기 불일치
**원인:** Framelink가 Figma spec 치수와 다른 크기로 export (docs §2.6 참조).
**해결:** `file figma-screenshots/{section}.png`로 실제 크기 확인 후 clip 파라미터 조정.

### `Executable doesn't exist at ... chromium ...`
**원인:** Playwright 브라우저 바이너리 미설치.
**해결:** `npx playwright install chromium`.

---

## 11. 최소 숙지 사항 (새 오케스트레이터가 알아야 할 규칙)

새 세션의 Claude Code는 `CLAUDE.md`를 자동 로드하지만, 핵심 규칙을 빠르게 훑으려면:

- `CLAUDE.md` — 5단계 워크플로우, Figma 모드 절대 규칙
- `docs/section-implementation.md §2.4` — 정밀 수치 규칙 (반올림 금지)
- `docs/section-implementation.md §2.5` — Framelink PNG는 완성된 합성 사진 (CSS rotate/blend/bg 재적용 금지)
- `docs/section-implementation.md §2.6` — baseline PNG 실측 (spec과 다를 수 있음)
- `docs/section-implementation.md §6.4` — G1 육안 semantic 검증 의무화
- `docs/figma-workflow.md` Phase 0 — Framelink 설치 절차

이 규칙들이 누적된 교훈이라 무시하면 이전에 겪은 버그 재발(이중 회전, scaleY 반전, letter-spacing percent 등).
