# v4 Rebuild 최종 인수인계 (세션 3 → 후속)

> 브랜치: `experiment/redefine-rebuild`
> 작성일: 2026-04-21
> 상태: **구현 완료 + 반응형 범위 외 결정**. 추가 AI 작업 없이 사람 영역으로 이관.

---

## 1. 최종 상태 요약

| 항목 | 결과 |
|---|---|
| 구현 섹션 | **38 / 43** (9 페이지 전수) |
| 구조 품질 (token_ratio) | 0.13 → **0.50** (3.8×) |
| 시맨틱 (semantic_score) | 1.87 → **3.21** (1.7×) |
| absolute 밀도 | 2.55 / file (목표 ≤5 충족) |
| text-bearing raster | 다수 → **1/38** (2.6%) |
| G1 평균 (참고) | 4.2% → ~5.5% (동일 수준) |
| v1~v3 ACCEPTED 부채 | 4건 → 전부 구조적 해소 |

**North Star "편집 가능한 고충실도" 달성.** philosophy.md §2의 5요소 중 4요소 개선.

---

## 2. 중요 결정 — 반응형 폴리시 범위 외 (2026-04-21)

### 배경
세션 3에서 반응형 폴리시 (375/768/1440/1920 4뷰포트 감사 + 수정) 착수했으나 철학적 재검토 후 **중단**.

### 결정
**하네스는 Figma 1920 단일 디자인의 React 변환까지만 책임.** 다른 뷰포트 대응은 디자이너 결정 필요.

### 근거
- Figma 원본에 375/768/1440 레이아웃 부재 → 디자이너가 결정 안 한 상태
- AI가 auto-fit/stacking/숨김 자동 생성 = 디자인 결정 AI가 대행
- philosophy.md §2 "디자인 의도 담기" 원칙 위반

### 경계 재정의
| 범주 | 예시 | 담당 |
|---|---|---|
| 업계 표준 컨테이너 | `max-w-[1920px] w-full mx-auto` | **개발자 재량** (대부분 이미 적용됨) |
| 실제 overflow 버그 | max-w 누락 | **개발자 재량 (수동)** |
| 뷰포트별 레이아웃 재설계 | stacking, 폰트 비례 축소, 요소 숨김 | **디자이너 영역** |

---

## 3. 관측된 Overflow (후속 처리 정보)

세션 3에서 `scripts/detect-cutoff.mjs`로 9페이지 × 4뷰포트 감사 → `docs/responsive-audit/*.txt` 보존.

### 뷰포트별 요약
| 뷰포트 | 상태 | 비고 |
|---|---|---|
| 1920 | ✅ clean | img-shrink만 (의도적) |
| 1440 | ⚠ home 10건 | MainNews 카드 max-w 누락 (개발자 수동 수정 대상) |
| 768 | ⚠ certification 30건 | Hero absolute + Schedule table + CtaBanner (디자이너 결정 필요) |
| 375 | ❌ 전 페이지 overflow | 디자이너 결정 필요 |

### 후속 처리 가이드
1. **1440 home 버그** (개발자 수동, 30분 이내):
   - MainNews 섹션에 `max-w-[1920px] w-full mx-auto` 컨테이너 추가
   - 2~3 파일 수정으로 종료
2. **768/375 디자인** (디자이너 협의):
   - Figma에 mobile/tablet 프레임 추가 요청
   - 또는 "desktop-only 프로젝트" 명시

---

## 4. responsive-polish 스킬·에이전트 deprecation 권장

- `.claude/skills/responsive-polish/` (있다면): 제거 또는 archive
- `.claude/agents/responsive-worker.md`: 제거 또는 archive
- 이유: 과잉 자동화 (detect-cutoff + auto-fit이 디자인 결정까지 침범)
- 대안: `scripts/detect-cutoff.mjs`는 보존 (개발자 수동 감사 도구로 유효)

---

## 5. 산출물 (최종)

| 파일 | 내용 |
|---|---|
| `PROGRESS.md` | 38섹션 체크 + 구조 지표 + 반응형 결정 |
| `docs/redefine/philosophy.md` | North Star "편집 가능한 고충실도" |
| `docs/redefine/v4-completion-report.md` | v1~v3 대비 정량 비교 |
| `docs/redefine/structure-report.csv` | 38섹션 구조 지표 CSV |
| `docs/redefine/retrospective/q1-q3.md` | 1막 회고 답변 (3종) |
| `docs/screenshots-v4/` | 9페이지 × 4뷰포트 PNG (36장) |
| `docs/responsive-audit/*.txt` | detect-cutoff 전수 감사 결과 |
| `docs/tech-debt.md` | OPEN 0건 / RESOLVED 3건 / ACCEPTED 4건 |

---

## 6. 다음 세션 재개 시 (참고)

**이 브랜치는 AI 작업 완료 상태.** 추가 섹션 구현/수정 필요 시:

1. 특정 섹션 재구현: `section-implementer` 워커 1회 호출
2. 새 페이지 추가: `page-researcher` → `section-implementer` 루프
3. Figma 디자인 변경 대응: 변경된 섹션만 재호출
4. **반응형은 AI로 처리하지 말 것** — 위 § 2 참조

---

## 7. main 머지 여부

**사용자 결정 보류.** 현재 브랜치는 `origin/experiment/redefine-rebuild`에 푸시됨. 납품/릴리스 판단 후 PR 생성.

---

## 변경 이력

| 날짜 | 내용 |
|---|---|
| 2026-04-16 | HANDOFF.md (25/43 시점) |
| 2026-04-21 | HANDOFF-v2.md (38/38 완주) |
| 2026-04-21 | **HANDOFF-v3.md** 작성. 반응형 범위 외 결정 + 경계 재정의. |
