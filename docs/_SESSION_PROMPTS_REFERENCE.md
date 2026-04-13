# ESGPN 프로젝트 세션별 프롬프트 가이드

이 문서는 ESGPN(ESG 실천네트워크) Figma → React 프로젝트를 Claude Code로 진행할 때 **각 세션마다 사용할 프롬프트**를 모아둔 것이다.

## 사용 원칙

- **한 세션 = 명확한 목표 한 가지**. 신나서 다음 단계로 달려가지 않게 함
- 각 세션 시작 시 아래 프롬프트를 그대로 복사해서 첫 메시지로 사용
- Claude가 plan을 작성하면 → 검토 → 메모 추가 → "메모 반영, 아직 구현 금지" → 만족 시 "구현 시작"
- 모든 세션은 김플립 5단계(리서치 → 계획 → 주석 반영 → 구현 → 피드백)를 따른다

## 사전 준비

작업 폴더에 다음 구조로 문서가 배치되어 있어야 한다:
```
프로젝트루트/
├─ CLAUDE.md
└─ docs/
   ├─ figma-workflow.md
   ├─ section-implementation.md
   ├─ figma-project-context.md
   ├─ frontend.md
   └─ react.md
```

---

## 세션 1: Phase 1 — 프로젝트 셋업

**목표**: Vite + React + TypeScript + Tailwind 셋업, 디자인 토큰 추출, 한국어 폰트, 에셋 파이프라인, 시각 회귀 인프라까지. **실제 페이지 구현은 안 한다.**

**예상 소요**: 길다 (1~2시간). 한 번만 하면 되는 투자.

```
ESGPN(ESG 실천네트워크) Figma → React 프로젝트를 시작한다.
Figma URL: https://www.figma.com/design/qhrMiGVfoSQ1QMFhVN8z78/ESG-실천네트워크

작업 시작 전에 다음 문서를 순서대로 읽고, 읽었다는 것을 한 줄씩 보고해라:
1. CLAUDE.md
2. docs/figma-workflow.md
3. docs/section-implementation.md
4. docs/figma-project-context.md
5. docs/frontend.md
6. docs/react.md

문서를 다 읽었으면 CLAUDE.md 9번 모드 판별 가이드에 따라 어느 모드로 진행할지 보고해라.

이번 세션의 목표는 docs/figma-workflow.md의 Phase 1(프로젝트 셋업)만 끝내는 것이다.
Phase 2(페이지 리서치)와 Phase 3(섹션 구현)은 절대 시작하지 마라. 이번 세션 범위 밖이다.

Phase 1을 시작하기 전에 먼저 plan/phase1-setup.md를 작성해라.
plan에는 다음을 포함해라:
- Phase 1의 5개 하위 작업 각각에 대해:
  - 2.1 디자인 토큰 추출
  - 2.2 한국어 폰트 셋업
  - 2.3 에셋 후처리 파이프라인 (4개 스크립트)
  - 2.4 시각 회귀 인프라 (Playwright + compare-section.sh)
  - 2.5 PROGRESS.md 초기 템플릿 생성
- 각 작업마다:
  - 어떤 명령/스크립트로 진행할지
  - 어떤 파일이 생성될지
  - 통과 조건을 어떻게 측정할지
- 사용할 도구/라이브러리 (새 npm 패키지가 필요하면 반드시 명시)
- 트레이드오프와 결정 사항

plan/phase1-setup.md를 작성한 후 멈춰라. 내가 검토하고 승인하기 전까지 어떤 명령도 실행하지 마라.
```

### 세션 1 진행 패턴
1. Claude가 문서 읽고 보고
2. Claude가 `plan/phase1-setup.md` 작성 후 멈춤
3. 본인이 plan 검토, 메모 추가
4. "문서에 메모 추가했어. 모든 메모 반영해서 업데이트해. 아직 구현 금지"
5. 만족하면 "이제 plan대로 전부 구현해라. 각 작업 완료 시 plan의 체크박스 갱신하고, any/unknown 타입 금지, 지속적으로 typecheck 실행"
6. 완료 후 본인이 직접 검증 (`research/project-setup.md` 확인, 스크립트 동작 확인)
7. git commit + push로 세션 종료

---

## 세션 2: 공통 컴포넌트 — Header (GNB)

**목표**: Header 컴포넌트 1개 구현 + 4개 게이트 통과. **이것 하나만.**

**예상 소요**: 중간 (30분~1시간)

```
이전 세션에서 Phase 1(프로젝트 셋업)을 완료했다.
먼저 다음 문서를 다시 읽고 한 줄씩 보고해라:
1. CLAUDE.md
2. docs/figma-workflow.md
3. docs/section-implementation.md
4. docs/figma-project-context.md
5. research/project-setup.md (Phase 1 결과)

Phase 1이 정상적으로 완료되었는지 research/project-setup.md를 기반으로 확인해라.
누락된 것이 있으면 보고하고 멈춰라.

이번 세션의 목표는 공통 컴포넌트 Header(GNB) 1개 구현이다.
- Figma Node ID: 52:1379 (figma-project-context.md 2.1 참조)
- 사이즈: 1416x72
- 다른 컴포넌트나 페이지는 절대 건드리지 마라

docs/section-implementation.md의 7단계를 그대로 따라라:
1. 섹션 리서치 → research/header.md
2. 섹션 계획 → plan/header.md (작성 후 멈춤, 내 승인 필요)
3. 에셋 수집
4. 구현
5. 측정 (4 게이트)
6. 수정 루프 (최대 3회)
7. 커밋

먼저 단계 1(리서치)부터 시작해라.
research/header.md를 작성한 후 멈춰라. 단계 2로 자동으로 넘어가지 마라.
```

### 세션 2 진행 패턴
1. Claude가 문서 다시 읽고 보고
2. 단계 1 리서치 → `research/header.md` 작성 후 멈춤
3. 본인이 리서치 검토 → "OK, 다음 단계 진행해" 또는 메모 추가
4. 단계 2 계획 → `plan/header.md` 작성 후 멈춤 (사용자 승인 게이트)
5. 본인이 plan 검토, 메모 추가, "메모 반영, 아직 구현 금지"
6. 만족하면 "단계 3부터 7까지 진행해라. 각 단계 통과 조건 만족할 때까지 다음 단계 금지. 단계 5의 4개 게이트 측정값을 plan/header.md에 반드시 숫자로 기록해라"
7. 게이트 통과 시 커밋, PROGRESS.md 갱신

---

## 세션 3: 공통 컴포넌트 — Footer

**목표**: Footer 컴포넌트 1개 구현 + 4개 게이트 통과.

**예상 소요**: 중간 (30분~1시간)

```
이전 세션에서 Header 컴포넌트를 완료했다.
먼저 다음 문서를 다시 읽고 한 줄씩 보고해라:
1. CLAUDE.md
2. docs/section-implementation.md
3. docs/figma-project-context.md
4. PROGRESS.md (이전 진행 상황)

이번 세션의 목표는 공통 컴포넌트 Footer 1개 구현이다.
- Figma Node ID: 299:2094 (figma-project-context.md 2.1 참조)
- 사이즈: 1920x708
- 다크 배경 + 대형 ESGPN 워터마크
- Header와 다른 컴포넌트나 페이지는 절대 건드리지 마라

docs/section-implementation.md의 7단계를 그대로 따라라.
단계 1 리서치부터 시작하고, research/footer.md 작성 후 멈춰라.

주의: ESGPN 대형 워터마크 타이포그래피가 핵심이다. 폰트 사이즈/letter-spacing/색상이 정확히 일치해야 한다.
폰트 보정값(Phase 1에서 설정)을 사용해라.
```

### 세션 3 진행 패턴
세션 2와 동일.

---

## 세션 4: 메인페이지 Phase 2 — 페이지 분해

**목표**: 메인페이지를 섹션으로 분할하고 사용자 승인까지. **실제 섹션 구현은 안 한다.**

**예상 소요**: 짧다 (15~30분). 분할만 하는 거라서.

```
이전 세션들에서 Header와 Footer 공통 컴포넌트를 완료했다.
먼저 다음 문서를 다시 읽고 한 줄씩 보고해라:
1. CLAUDE.md
2. docs/figma-workflow.md
3. docs/figma-project-context.md
4. PROGRESS.md

이번 세션의 목표는 메인페이지(/)의 Phase 2(페이지 리서치)만 수행하는 것이다.
실제 섹션 구현(Phase 3)은 다음 세션부터다. 절대 시작하지 마라.

메인페이지 정보:
- Figma Node ID: 12:2324
- 사이즈: 1920x10077
- 라우트: /

Phase 2 작업:
1. Figma MCP get_metadata로 메인페이지의 자식 노드(섹션) 트리 추출
2. 각 섹션의 예상 토큰 크기 파악, 12K 이하로 분할
3. figma-project-context.md 4.1의 사전 추정 섹션 표(Hero, Intro, Stats, ...)와 대조
4. get_screenshot으로 페이지 전체 + 각 섹션 베이스라인 캡처 → figma-screenshots/main/
5. 페이지 안에서 새로 만들어야 하는 공통 컴포넌트 식별
6. research/main-page.md에 결과 정리
7. 내가 분할 결과를 승인한 후, PROGRESS.md의 "메인페이지 (/)" 섹션에 확정된 섹션 목록을 추가 (각 섹션은 빈 체크박스로)

research/main-page.md에는 다음을 포함해라:
- 확정된 섹션 목록 (Node ID, 예상 토큰, Figma 사이즈, 비고)
- figma-project-context.md 4.1의 사전 추정과의 차이점
- 신규 공통 컴포넌트 목록 (StatCard, BenefitCard 등)
- 메인페이지의 리스크 메모 (figma-project-context.md 7번 참조)

작성 후 멈춰라. 내가 분할 결과를 검토하고 승인하기 전까지 어떤 섹션 구현도 시작하지 마라.
```

### 세션 4 진행 패턴
1. Claude가 페이지 분해 → `research/main-page.md` 작성 후 멈춤
2. 본인이 분할 결과 검토:
   - 섹션이 너무 크진 않은지
   - 의미상 합쳐야 할 섹션이 분리되어 있진 않은지
   - 사전 추정과 큰 차이가 있으면 왜인지
3. 메모 추가 후 "메모 반영해서 research/main-page.md 업데이트해"
4. 만족하면 "분할 승인. 다음 세션에서 첫 섹션부터 시작한다. 이번 세션은 여기서 종료. PROGRESS.md에 메인페이지 섹션 목록을 추가해라"
5. git commit + push

---

## 세션 5~N: 메인페이지 섹션별 구현 (반복)

**목표**: 한 세션에 한 섹션. 절대 두 개 이상 욱여넣지 않는다.

**예상 소요**: 섹션마다 30분~1시간

각 섹션마다 동일한 패턴의 프롬프트를 사용한다. 아래는 첫 섹션(Hero) 예시이며, **섹션명만 바꿔서 재사용**한다.

### 세션 5: 메인페이지 — Hero 섹션

```
이전 세션에서 메인페이지의 섹션 분할을 완료했다.
먼저 다음 문서를 다시 읽고 한 줄씩 보고해라:
1. CLAUDE.md
2. docs/section-implementation.md
3. research/main-page.md (메인페이지 분할 결과)
4. PROGRESS.md

이번 세션의 목표는 메인페이지의 Hero 섹션 1개 구현이다.
- 섹션명: Hero
- Figma Node ID: research/main-page.md에서 확인
- 다른 섹션이나 페이지는 절대 건드리지 마라

docs/section-implementation.md의 7단계를 그대로 따라라:
1. 섹션 리서치 → research/main-hero.md
2. 섹션 계획 → plan/main-hero.md (작성 후 멈춤, 내 승인 필요)
3. 에셋 수집
4. 구현
5. 측정 (4 게이트)
6. 수정 루프 (최대 3회)
7. 커밋

Hero 섹션의 리스크:
- 큰 합성 이미지(자연/도시) — 검정 배경 이슈 가능성
- "Environmental" 대형 타이포그래피 — 폰트 정확도 중요
- 풀스크린 레이아웃 — 1920px → 1440/768/375px 적응

먼저 단계 1(리서치)부터 시작해라.
research/main-hero.md를 작성한 후 멈춰라. 단계 2로 자동으로 넘어가지 마라.
```

### 세션 5 이후 진행 패턴 (모든 섹션 동일)
1. 리서치 → 멈춤 → 검토
2. 계획 → 멈춤 → 검토 → 메모 → 반영 → 승인
3. "단계 3부터 7까지 진행. 4 게이트 측정값을 plan에 숫자로 기록. 게이트 미통과 시 최대 3회 시도 후 보고하고 멈춰라"
4. 통과 시 커밋, PROGRESS.md 갱신

### 세션 6 이후: 다른 섹션
**세션 5의 프롬프트 템플릿에서 다음만 바꾼다:**
- "Hero 섹션" → "Intro 섹션" / "Stats 섹션" / 등
- "research/main-hero.md" → "research/main-intro.md" 등
- "plan/main-hero.md" → "plan/main-intro.md" 등
- 리스크 메모를 해당 섹션에 맞게 수정

#### 메인페이지 섹션 순서 (권장)
1. Hero
2. Intro (ESGPN이란?)
3. Stats (통계 카드)
4. Gallery (이미지 콜라주) ← 이미지 누락 주의
5. Programs (자격검정/경진대회/사회공헌 카드)
6. Activities (우리는 이렇게 활동합니다)
7. News (뉴스 카드 리스트)
8. Partners (협력기관 로고)
9. CTA (행동 유도)

(Footer는 세션 3에서 이미 완료)

---

## 세션 N+1: 메인페이지 Phase 4 — 통합 검증

**목표**: 모든 섹션을 통합하고 페이지 전체 검증.

**예상 소요**: 짧다 (30분 내외)

```
메인페이지의 모든 섹션이 완료되었다.
먼저 다음 문서를 다시 읽고 한 줄씩 보고해라:
1. CLAUDE.md
2. docs/figma-workflow.md (특히 Phase 4)
3. PROGRESS.md

이번 세션의 목표는 메인페이지의 Phase 4(통합 검증)다.
다른 페이지는 절대 건드리지 마라.

작업:
1. PROGRESS.md에서 메인페이지의 모든 섹션이 체크되어 있는지 확인
2. 모든 섹션 브랜치를 feat/page-main에 머지 (또는 main 브랜치 직접 머지)
3. 섹션 간 간격/연결부 CSS 조정 (있다면)
4. 페이지 전체 스크린샷 캡처 → figma-screenshots/main/full.png와 pixelmatch 비교
5. 통과 기준: 전체 페이지 diff < 8%
6. 반응형 검증: 1440px / 768px / 375px 3가지 뷰포트
7. 크로스 브라우저 검증: Chrome / Firefox / Safari (가능한 만큼)
8. 결과를 research/main-page.md 하단에 "통합 검증 결과" 섹션으로 추가

먼저 PROGRESS.md 확인부터 보고하고 멈춰라.
```

### 세션 N+1 진행 패턴
1. Claude가 PROGRESS.md 확인 보고
2. 본인이 "진행해라" 승인
3. Claude가 통합/검증 작업 수행
4. 게이트 미통과 시 보고하고 멈춤 (임의 우회 금지)
5. 통과 시 본인에게 측정값 + 스크린샷 보고
6. 본인 최종 확인 후 PROGRESS.md에 메인페이지 완료 표시 + 커밋

---

## 세션 N+2 이후: 다른 페이지 (About, 경진대회, 자격검정, ...)

각 페이지마다 다음 패턴을 반복한다:
1. **세션 A**: Phase 2 페이지 분해 (세션 4 프롬프트 변형)
2. **세션 B~M**: 섹션별 구현 (세션 5 프롬프트 변형)
3. **세션 N**: Phase 4 통합 검증 (세션 N+1 프롬프트 변형)

### 페이지 진행 순서 (권장)
1. ✅ Header / Footer (공통)
2. ✅ 메인페이지 (`/`)
3. About - 개요 (`/about`)
4. About - 조직도 (`/about/organization`)
5. 경진대회 (`/contest`)
6. 자격검정 (`/certification`) ← 4910px + 다수 테이블, 더 작게 분할
7. 뉴스 목록 (`/news`)
8. 뉴스 상세 (`/news/:id`) ← 동적 라우트, 더미 데이터 우선
9. 갤러리 (`/gallery`)
10. 고객센터 (`/contact`) ← 폼 4가지 상태 처리

---

## 세션 마지막: 프로젝트 최종 검증

**목표**: 전체 프로젝트 품질 점검 + 90% 정확도 달성 여부 판정.

```
모든 페이지의 구현이 완료되었다.
먼저 다음 문서를 다시 읽고 한 줄씩 보고해라:
1. CLAUDE.md
2. docs/figma-workflow.md
3. PROGRESS.md (전체 진행 상황)
4. docs/frontend.md
5. docs/react.md

이번 세션의 목표는 프로젝트 최종 품질 검증이다. 새 기능 구현은 하지 마라.

작업:
1. PROGRESS.md 전체 점검 — 모든 페이지의 모든 섹션이 완료되었는지
2. 각 섹션의 측정값(diff %)을 모아서 통계 작성:
   - 평균 diff
   - 최대 diff
   - 5% 초과한 섹션 개수
3. 모든 페이지를 1440 / 768 / 375 뷰포트에서 캡처 후 점검
4. 모든 페이지를 Chrome / Firefox / Safari에서 점검
5. Lighthouse 점수 측정 (Performance / Accessibility)
6. axe-core 또는 Lighthouse Accessibility 점검
7. 빌드/린트/타입 체크 최종 통과 확인
8. 결과를 docs/result-report.md에 작성:
   - 전체 페이지/섹션 수
   - 평균 diff %, 최대 diff %
   - 90% 정확도 달성 여부 (전체 페이지 평균 diff < 10% 기준)
   - 발견한 문제와 조치 사항
   - 추가 작업이 필요한 항목

작성 후 보고하고 멈춰라.
```

---

## 세션 간 공통 규칙

### 매 세션 시작 시
- 관련 문서를 다시 읽게 한다 (Claude는 세션마다 컨텍스트가 리셋됨)
- "한 줄씩 보고해라"로 실제로 읽었는지 확인
- 이전 세션의 산출물(PROGRESS.md, research/, plan/)을 먼저 확인하게 한다

### 매 세션 종료 시
- 작업 결과를 PROGRESS.md에 기록
- git commit + push (커밋 메시지에 diff % 포함)
- "이번 세션은 여기서 종료한다"라고 명시 — Claude가 다음 단계로 자동 진행하지 않도록

### 세션 중 Claude가 점프하려고 할 때
다음 패턴을 즉시 사용:
- "멈춰라. 이번 세션의 목표는 X다. Y는 다음 세션이다"
- "단계 N으로 자동으로 넘어가지 마라. 내 승인 필요"
- "측정값을 plan에 숫자로 기록하지 않았다. 측정 후 기록 먼저"

### 게이트 미통과 시
- 3회 시도 후에도 미통과면 Claude가 자동으로 보고하게 되어 있음
- 보고 받으면: (a) 게이트 기준 완화 / (b) 다른 접근 시도 / (c) 사용자가 직접 디버깅 중에서 선택
- "거의 다 됐으니 넘어가자"는 말은 절대 하지 말 것 — 한 번 허용하면 모든 섹션에서 우회됨

---

## 빠른 참조: 모든 세션 한눈에

| # | 세션 목표 | 예상 시간 | 결과물 |
|---|-----------|-----------|--------|
| 1 | Phase 1 — 프로젝트 셋업 | 1~2시간 | research/project-setup.md, 4개 스크립트 |
| 2 | Header 컴포넌트 | 30~60분 | src/components/layout/Header.tsx |
| 3 | Footer 컴포넌트 | 30~60분 | src/components/layout/Footer.tsx |
| 4 | 메인페이지 Phase 2 (분해) | 15~30분 | research/main-page.md |
| 5 | 메인페이지 Hero | 30~60분 | Hero 섹션 + 게이트 통과 |
| 6 | 메인페이지 Intro | 30~60분 | Intro 섹션 + 게이트 통과 |
| 7~13 | 메인페이지 나머지 섹션 | 각 30~60분 | 각 섹션 + 게이트 통과 |
| 14 | 메인페이지 Phase 4 (통합) | 30분 | 페이지 전체 diff < 8% |
| 15+ | About 페이지 (Phase 2 → 섹션들 → Phase 4) | 페이지당 4~6세션 | |
| ... | 나머지 페이지들 동일 패턴 | | |
| 마지막 | 프로젝트 최종 검증 | 30~60분 | docs/result-report.md |

---

## 한 가지 마지막 조언

이 가이드를 따를 때 가장 어려운 건 **"한 세션 = 한 섹션" 규칙을 지키는 것**이다. Claude가 잘 따라오면 "다음 섹션도 계속 가자"라고 말하고 싶어진다. 하지만 그게 60% 결과의 원인이었다.

세션을 짧게 유지하고, 각 섹션 사이에 본인이 직접 결과를 눈으로 확인하는 시간을 가져라. 이 짧은 검토 시간이 문서의 어떤 게이트보다도 강력한 품질 보증 장치다.
