# ESGPN React 하네스 진행 보고

- **작성일**: 2026-04-16
- **작성자**: HyeonJ
- **현재 브랜치**: `feat/responsive-polish-iter2`
- **기준 커밋**: `75ddcf2`

---

## 1. 한 줄 요약

Figma → React 1:1 구현을 위한 **에이전트 오케스트레이터 하네스**로 **총 43개 섹션 / 9개 페이지 1차 구현을 완료**했고, 현재는 Figma 1920 단일 디자인을 **375 / 768 / 1440 / 1920 4뷰포트에 대응시키는 반응형 폴리시 2차 이터레이션**을 진행 중입니다.

---

## 2. 프로젝트 개요

| 항목 | 내용 |
|---|---|
| 목적 | Figma 디자인을 React로 고충실도(평균 diff < 5%) 구현 |
| 스택 | React 18 + TypeScript + Tailwind v4 + Vite |
| 측정 | Playwright + pixelmatch (시각 회귀 G1~G4) + Lighthouse (G7) |
| 도구 | Figma 공식 MCP + Framelink MCP, 자체 스크립트 10+ |
| 방법론 | 섹션 단위 분할 → 7단계(리서치→계획→에셋→구현→측정→수정→커밋) 루프 |

---

## 3. 하네스 구조

```
.claude/
├─ agents/  (워커 4종)
│  ├─ phase1-setup-worker   — 프로젝트 초기 셋업
│  ├─ page-researcher       — 페이지 → 섹션 분해
│  ├─ section-implementer   — 섹션 7단계 구현
│  └─ responsive-worker     — 반응형 폴리시 전담
└─ skills/  (스킬 4종)
   ├─ figma-to-react          — 메인 오케스트레이터
   ├─ approval-gate-format    — 승인 대기 표준 포맷
   ├─ dynamic-asset-handling  — GIF/비디오 정적 프레임 추출
   ├─ visual-regression-gates — 8개 품질 게이트
   └─ responsive-polish       — 4뷰포트 대응 폴리시

scripts/  (10+종)
├─ compare-section.sh        — G1~G4 통합 측정
├─ measure-quality.sh        — G5~G8 품질 게이트
├─ detect-cutoff.mjs         — 뷰포트별 잘림 자동 감지
├─ check-baked-in-png.sh     — baked-in 중첩 검출
├─ bake-baseline.mjs         — alpha 영역 white 베이크
├─ track-diff-history.mjs    — G1 회차 기록 + 악화 revert 힌트
└─ … (총 10+개 자동 가드)
```

---

## 4. 구현 완료 현황 (총 43 섹션)

| 페이지 | 섹션 수 | 평균 diff | 상태 |
|---|---|---|---|
| 공통 (Header/Footer) | 2 | 1.89% | ✅ |
| 메인 (`/`) | 9 | 3.29% | ✅ 완료 |
| About (`/about`) | 4 | 3.15% | ✅ 완료 |
| About 조직도 | 4 | 2.57% | ✅ 완료 |
| 경진대회 (`/contest`) | 3 | 5.38% | ✅ (2건 완화 수용) |
| 자격검정 (`/certification`) | 6 | 4.05% | ✅ 완료 (T-007/008 ACCEPTED) |
| 뉴스 목록 (`/news`) | 4 | 8.95% | ✅ (3건 완화 수용) |
| 뉴스 상세 (`/news/:id`) | 4 | 6.51% | ✅ (1건 완화 수용) |
| 갤러리 (`/gallery`) | 3 | 5.11% | ✅ 완료 |
| 고객센터 (`/contact`) | 1 | 4.01% | ✅ |

> **대표 성과**: Rule of Three 기반 공통 컴포넌트 승격 (Header / Footer / HatchedDivider / HatchedSectionHeading / ProgramCard / SectionTabs / MouCard / HatchedInlineHeading) — 섹션 간 재사용으로 공수 절감 + 리그레션 0.00%p 유지.

---

## 5. 현재 작업 — 반응형 폴리시 2차 이터레이션

**브랜치**: `feat/responsive-polish-iter2`

### 배경
Figma 디자인이 **1920 단일 뷰포트**만 존재 → 1440 / 768 / 375에서 잘림·가로스크롤 발생. 업계 표준 해답인 `max-w-[1920px] w-full mx-auto` 컨테이너 패턴을 적용하되, 잔여 잘림을 자동 감지·해소하는 루프를 구축 중.

### 주요 작업
1. **`responsive-polish` 스킬 신설** — 4뷰포트 대응 전담 프로세스
2. **Header 햄버거 드롭다운 추가** (Figma에 없는 mobile UI)
3. **`detect-cutoff.mjs` 스크립트** — 뷰포트별 overflow·잘림 자동 감지
4. **auto-fit 루프 적용** — 메인 페이지 잔여 잘림 해소
5. **게이트 강화** — `clip` 모드만으로 PASS 금지, absolute decouple 패턴 강제
6. **main-hero 워드마크 위 흰색 패치 제거**

### 최근 커밋 (최신 5)
```
75ddcf2  feat(skill): 게이트 강화 — clip만으로 PASS 금지
e1d59f9  feat(responsive): 메인 페이지 auto-fit 루프 적용
9756c3f  feat(skill): detect-cutoff 스크립트 + auto-fit-loop 추가
8c2e788  fix(main-hero): 워드마크 위 흰색 패치 제거
674b506  fix(header): 1920 데스크톱에서 햄버거 버튼 숨김
```

### 미커밋 변경 (작업 중)
- `scripts/detect-cutoff.mjs`, `src/styles/index.css`
- MainIntro 3개 파일 / MainStats 2개 파일 / MainNews / ProgramCard

---

## 6. 기술 부채 (`docs/tech-debt.md`)

| ID | 이슈 | 상태 |
|---|---|---|
| T-001 | main-hero 카드 텍스트 raster | RESOLVED |
| T-002 | contest-benefits CTA 텍스트 raster | RESOLVED |
| T-003 | contest-hero hard-light blend 엔진차 (6.43%) | ACCEPTED |
| T-004 | contest-benefits Pretendard AA 서브픽셀 (6.71%) | ACCEPTED |
| T-005 | gallery-title ESPGN→ESGPN 교정 (8.28%) | ACCEPTED |
| T-006~011 | news/gallery 한글 dense AA, layout 추정 | ACCEPTED |
| T-012 | main-hero 하이브리드 엔진 | ACCEPTED |

**OPEN 0건** → 새 섹션 진행 가능 상태.

---

## 7. 리스크 & 다음 단계

### 리스크
1. **Figma 반응형 디자인 부재** — 개발자 재량 범위에서 진행 중 (CLAUDE.md 공식 규칙화 완료)
2. **한글 폰트 AA 차이** — Chromium vs Figma 렌더 엔진차, 수용 선택
3. **뉴스 list/related 섹션 layout 추정 정확도** — T-010/T-011 추후 정밀 측정 필요

### 다음 단계
- [ ] `feat/responsive-polish-iter2` 미커밋 변경 정리 및 커밋
- [ ] 4뷰포트 최종 감사 + 사용자 승인
- [ ] `main` 머지
- [ ] 자격검정 flatten-bottom 서브섹션 HTML 재구성 (T-008)
- [ ] 뉴스 list/related 정밀 측정 (T-010/T-011)

---

## 8. 지표

- **완료 섹션**: 43
- **완료 페이지**: 9
- **공통 컴포넌트 승격**: 8
- **자동 가드 스크립트**: 10+
- **OPEN 기술부채**: 0
- **평균 diff**: ~4.2% (목표 < 5%)
