# v4 Rebuild 세션 인수인계 문서

> 브랜치: `experiment/redefine-rebuild`
> 작성일: 2026-04-16
> 목적: 이 세션 종료 후 다음 세션이 작업을 이어받기 위한 상태 스냅샷

---

## 0. 즉시 시작하는 법

다음 세션에서 이렇게만 해:

```
experiment/redefine-rebuild 브랜치 이어받아서 나머지 섹션 완주해줘.
먼저 docs/redefine/HANDOFF.md 읽고 현재 상태 파악한 다음 news-list부터 시작.
```

---

## 1. 현재 완료 상태

**완료: 25/43 섹션**

### 페이지별 진척도
| 페이지 | 진행 | 비고 |
|---|---|---|
| 메인페이지 `/` | 9/9 ✅ | 완료 |
| About 개요 `/about` | 4/4 ✅ | 완료 |
| About 조직도 `/about/organization` | 4/4 ✅ | 완료 |
| 경진대회 `/contest` | 3/3 ✅ | 완료 |
| 자격검정 `/certification` | 6/6 ✅ | 완료. T-008 flatten-bottom도 v4로 부활 성공 |
| 뉴스 목록 `/news` | 3/4 | **news-list만 남음** |
| 뉴스 상세 `/news/:id` | 0/4 | 미시작 |
| 갤러리 `/gallery` | 0/3 | 미시작 |
| 고객센터 `/contact` | 0/1 | 미시작 |

### 남은 14섹션 (구현 순서)
1. **news-list** (`/news`) — Figma 129:2609, 936×1416, v1~v3 G1 20.37% ⚠ ACCEPTED였음
2. news-detail-breadcrumb (`/news/:id`)
3. news-detail-article
4. news-detail-related — v1~v3 T-011 ⚠
5. news-detail-back
6. gallery-title — v1~v3 T-005 8.28% ACCEPTED (ESPGN→ESGPN 교정)
7. gallery-agreements — v1~v3 T-006 5.72% ACCEPTED
8. gallery-activities
9. contact-form

---

## 2. v4 하네스 핵심 요약

### North Star
**"편집 가능한 고충실도"** — `docs/redefine/philosophy.md` 참조.
- **차단 게이트** = 구조 (G5/G6/G8/G2/G4)
- **참고 지표** = G1 시각 diff ≤15%, G3 에셋, G7 Lighthouse

### 구조 지표 1차 목표 (차단)
- `token_ratio ≥ 0.2` (디자인 토큰 참조율)
- `absolute/file ≤ 5` (absolute 좌표 밀도)
- `semantic_score ≥ 2` (권고)

### 자율 모드 (v4 핵심)
- 사용자 개입 0. 완주까지 멈추지 않음.
- 3회 실패 시 AI 자체 판단 (완화는 최후)
- 자동 커밋 `[auto]` 태그

---

## 3. Framelink MCP 이슈 — ⚠️ 중요

### 확정된 원인 (Gemini 분석 + `mcp-error.log` 검증)
**Claude Code sub-agent lifecycle cleanup 버그.**
- 워커 종료 시 Claude Code가 부모 세션의 MCP stdin을 닫아버림
- 로그 증거: `PARENT STDIN ENDED — likely Claude Code closing the MCP pipe` → `CHILD EXITED code=0`
- node 직접 실행, env var, 래퍼 스크립트 모두 해결 불가

### 대응 전략 (v4에서 채택)
**Framelink 포기 → REST API 기본 사용**. 잃는 것 없음:
- Framelink = Figma REST API의 편의 wrapper (YAML 포맷 + crop 자동화)
- REST API로도 baseline PNG / 노드 데이터 모두 획득 가능
- 워커들이 이미 REST fallback 검증 완료 (contest-about, certification-subjects, certification-flatten-bottom 등)

### 워커 프롬프트 template (다음 세션에서 그대로 사용)
```
## ⚠️ Framelink MCP 불안정 — REST API 기본
- Framelink MCP는 Claude Code sub-agent cleanup 버그로 자주 끊김. 호출 시 deferred tool 안 뜨면 바로 REST API 사용
- Figma token: 로컬 MCP 설정에서 확인 (`claude mcp list | grep figma`)
- 이미지: curl "https://api.figma.com/v1/images/qhrMiGVfoSQ1QMFhVN8z78?ids={nodeId}&format=png&scale=1" -H "X-Figma-Token: ..."
- 노드: curl "https://api.figma.com/v1/files/qhrMiGVfoSQ1QMFhVN8z78/nodes?ids={nodeId}" -H "X-Figma-Token: ..."
- design_context는 공식 Figma MCP (plugin:figma:figma__get_design_context) 사용 — 안정적
- baseline은 figma-screenshots/{섹션명}.png 저장
```

---

## 4. 성과 요약 (v1~v3 vs v4)

### 전 섹션 평균 구조 품질
| 지표 | v1~v3 (43섹션) | v4 (25섹션 현재) |
|---|---|---|
| token_ratio | 0.13 | **~0.45** (3.5배↑) |
| semantic_score | 1.87 | **~3.5** (거의 2배) |
| absolute/file | 미산출 | ~2.0 (목표 ≤5 충족) |
| G1 평균 | 4.2% | ~4.5% (비슷) |

### 주요 승리
1. **main-intro**: absolute 22 → 1 (95% 감소). v1~v3 만성염증 4/4점 → v4 건강
2. **main-gallery**: magic 77 → 57, abs 16 → 8. v1~v3 최악 → v4 회복
3. **certification-flatten-bottom**: v1~v3 T-008 ACCEPTED (단일 raster) → v4 완전 HTML 재구성 (get_design_context로 숨은 구조 발견)
4. **HatchedSectionHeading**, **SectionTabs**, **HatchedDivider** 공통 컴포넌트 Rule of Three 승격

---

## 5. 남은 작업 체크리스트

### 5.1 섹션 구현 (14개)
- [ ] news-list (`/news` 완성)
- [ ] news-detail-breadcrumb
- [ ] news-detail-article
- [ ] news-detail-related
- [ ] news-detail-back (`/news/:id` 완성)
- [ ] gallery-title
- [ ] gallery-agreements
- [ ] gallery-activities (`/gallery` 완성)
- [ ] contact-form (`/contact` 완성)

### 5.2 완주 후 측정
- [ ] `scripts/check-structure-quality.mjs` 전수 실행 → v4 구조 지표 CSV
- [ ] v1~v3 `docs/redefine/structure-report.csv`와 비교
- [ ] 9페이지 × 4뷰포트(375/768/1440/1920) 스크린샷 dump
- [ ] 43섹션 게이트 수치 CSV (G1 평균, G5~G8 pass률)
- [ ] 총 소요 시간 + 섹션별 breakdown (PROGRESS.md 시작 timestamp 1776304559)

### 5.3 산출물 문서
- [ ] `docs/redefine/v4-completion-report.md` — v1~v3 대비 정량 비교
- [ ] 2막 리팩터 타겟 재평가 (Q1이 지정한 MainIntro/AboutMission — v4에서 이미 해결됨)

---

## 6. 진입 시 참고 커맨드

```bash
# 브랜치 확인
git branch --show-current  # experiment/redefine-rebuild

# 현재까지 커밋
git log --oneline main..HEAD

# MCP 상태 확인 (끊어져 있을 수 있음, 신경쓰지 말고 REST 사용)
claude mcp list 2>/dev/null | grep figma

# 남은 섹션 확인
cat PROGRESS.md | grep -E "^\s*-\s*\[" | wc -l  # 완료 수
```

---

## 7. 미커밋 untracked 파일 (푸시 전 정리됨)

다음 파일은 `.gitignore` 추가 또는 커밋 결정 필요:
- `.claude/settings.local.json` (로컬 설정)
- `.tmp/` (임시 파일)
- `scripts/mcp-wrapper.cjs` (Framelink 진단용 — 이번 푸시에 포함)
- `src/assets/*/raw/` (워커 중간 산출물 — gitignore 권장)
- `tests/visual/capture-only/`, `capture-subjects.mjs`, `measure-news-tabs.mjs` (워커 1회성 산출물)

## 변경 이력

| 날짜 | 내용 |
|---|---|
| 2026-04-16 | 초안 작성. 25/43 섹션 완료 시점 스냅샷. Framelink 이슈 원인 확정 + REST 전환 전략 문서화. |
