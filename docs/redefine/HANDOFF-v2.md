# v4 Rebuild 완주 후 인수인계 (세션 2 → 세션 3)

> 브랜치: `experiment/redefine-rebuild`
> 작성일: 2026-04-21
> 상태: **전 섹션 구현 완료 (38섹션 / 9페이지)**. 검수 + 후속 작업 단계.

---

## 0. 즉시 시작하는 법

```
experiment/redefine-rebuild 브랜치 체크아웃.
docs/redefine/HANDOFF-v2.md 읽고 현재 상태 파악.
```

---

## 1. 완료 상태

**구현: 38/38 섹션 (9페이지 전부)**

| 페이지 | 섹션 수 | 상태 |
|---|---|---|
| 메인페이지 `/` | 9 | ✅ |
| About 개요 `/about` | 4 | ✅ |
| About 조직도 `/about/organization` | 4 | ✅ |
| 경진대회 `/contest` | 3 | ✅ |
| 자격검정 `/certification` | 6 | ✅ |
| 뉴스 목록 `/news` | 4 | ✅ |
| 뉴스 상세 `/news/:id` | 4 | ✅ |
| 갤러리 `/gallery` | 3 | ✅ |
| 고객센터 `/contact` | 1 | ✅ |

### 세션 2에서 구현한 9섹션
| 섹션 | 커밋 | G1 diff | token_ratio |
|---|---|---|---|
| news-list | `33e872a` | 12.64% | 0.833 |
| news-detail-breadcrumb | `3da5234` | 1.20% | 0.714 |
| news-detail-article | `aea6248` | 2.55% | 0.381 |
| news-detail-related | `f64bc80` | 10.97% | 0.781 |
| news-detail-back | `f8f289b` | 1.38% | 0.733 |
| gallery-title | `1306605` | 9.86% | 0.692 |
| gallery-agreements | `b1dae3e` | 5.61% | 0.500 |
| gallery-activities | `4984f9f` | 1.15% | 0.250 |
| contact-form | `174552f` | 4.01% | 0.159 |

---

## 2. 산출물 (모두 커밋 + 푸시 완료)

| 파일 | 내용 |
|---|---|
| `docs/redefine/v4-completion-report.md` | v1~v3 대비 정량 비교 리포트 |
| `docs/redefine/structure-report.csv` | 38섹션 구조 지표 전수 CSV |
| `docs/screenshots-v4/` | 9페이지 × 4뷰포트(375/768/1440/1920) = 36장 PNG |
| `PROGRESS.md` | 전 섹션 체크 + 종료 시간 + 구조 지표 실측값 |
| `scripts/capture-all-pages.mjs` | Playwright 일괄 캡처 스크립트 |

---

## 3. v4 핵심 수치

| 지표 | v1~v3 | v4 | 변화 |
|---|---|---|---|
| token_ratio | 0.13 | **0.50** | 3.8× |
| semantic_score | 1.87 | **3.21** | 1.7× |
| absolute/file | 미산출 | **2.55** | 목표 ≤5 충족 |
| text_raster | 다수 | **1/38** | 근절 |
| G1 평균 | 4.2% | ~5.5% | 동일 수준 |

---

## 4. 남은 후속 작업 (우선순위 순)

### 4.1 반응형 폴리시 (높음)
- 375px 스크린샷에서 overflow/잘림 가능성 높음 (gallery-title 48px 폰트 등)
- `responsive-polish` 스킬 사용
- 4뷰포트(375/768/1440/1920) 전 섹션 감사 → stacking/패딩 축소/폰트 비례 축소

### 4.2 미완 측정 보조 산출물 (낮음)
- 게이트 수치 통합 CSV (G1 + G5~G8 pass/fail 섹션별 정리)
- 섹션별 소요시간 breakdown (워커 보고값 취합)
- 둘 다 리포트에 핵심 수치가 이미 있어서 "있으면 좋은" 수준

### 4.3 2막 리팩터 후보
- MainNews (abs 12, token_ratio 0.296) — grid 레이아웃 전환
- MainProgramsCard2 (text_raster ⚠) — alt 최적화
- ContactForm (token_ratio 0.159) — 디자인 토큰 보강

### 4.4 PR 머지
- `experiment/redefine-rebuild` → `main` PR 생성
- 79+ 커밋, 리포트 포함

---

## 5. Framelink MCP 이슈 (여전히 유효)

세션 2에서도 Framelink MCP가 중간에 disconnect됨. REST API fallback으로 문제 없이 완주.

**워커 프롬프트에 항상 포함:**
```
## ⚠️ Framelink MCP 불안정 — REST API 기본
- Framelink MCP는 Claude Code sub-agent cleanup 버그로 자주 끊김
- 이미지: curl "https://api.figma.com/v1/images/qhrMiGVfoSQ1QMFhVN8z78?ids={nodeId}&format=png&scale=1" -H "X-Figma-Token: ..."
- 노드: curl "https://api.figma.com/v1/files/qhrMiGVfoSQ1QMFhVN8z78/nodes?ids={nodeId}" -H "X-Figma-Token: ..."
- design_context는 공식 Figma MCP (plugin:figma:figma__get_design_context) 사용 — 안정적
```

---

## 6. 주요 참고 파일

| 파일 | 용도 |
|---|---|
| `CLAUDE.md` | 프로젝트 규칙 (v4 자율 모드) |
| `PROGRESS.md` | 진행 상황 진실의 원천 |
| `docs/redefine/v4-completion-report.md` | 완주 정량 리포트 |
| `docs/redefine/philosophy.md` | "편집 가능한 고충실도" North Star |
| `docs/redefine/structure-report.csv` | 38섹션 구조 지표 CSV |
| `docs/screenshots-v4/` | 9페이지 × 4뷰포트 스크린샷 |
| `docs/tech-debt.md` | 기술부채 트래커 (OPEN 0건) |

---

## 변경 이력

| 날짜 | 내용 |
|---|---|
| 2026-04-16 | HANDOFF.md 초안 (25/43 시점) |
| 2026-04-21 | HANDOFF-v2.md 작성 (38/38 완주, 후속 작업 가이드) |
