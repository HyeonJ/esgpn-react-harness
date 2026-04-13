# docs/figma-workflow.md — Figma → React 변환 워크플로우

이 문서는 Figma 디자인을 React 코드로 변환할 때 따라야 할 **전체 작업 흐름**을 정의한다.
한 섹션 내부의 절차는 `docs/section-implementation.md`를, 프로젝트 노드 정보는 `docs/figma-project-context.md`를 참조한다.

작업 시작 전 반드시 `CLAUDE.md`의 5단계 워크플로우를 따른다.

---

## 0. 핵심 원칙 (먼저 읽고 내재화할 것)

이전 작업이 60% 정확도에서 멈춘 원인은 다음 세 가지였다. **이 문서는 이 세 가지를 막기 위해 존재한다.**

1. **작업 단위가 너무 컸다** — 한 번에 페이지 전체(10000px+)를 시켰고, 후반부로 갈수록 디테일이 무너졌다
2. **검증이 "원칙"으로만 존재했다** — diff 측정을 건너뛰면 5% 룰은 작동하지 않는다
3. **리서치를 건너뛰었다** — 에셋 URL을 그대로 다운로드하지 않고 CSS로 대체, SVG 부모 컨테이너 무시

### 절대 규칙
- **작업 단위 = 페이지가 아니라 섹션이다.** 한 섹션 = 한 브랜치 = 한 PR
- **측정값을 `plan.md`에 기록하지 않은 섹션은 "완료"가 아니다.** 눈대중 금지
- **MCP가 준 에셋 URL은 무조건 다운로드한다.** CSS 대체 절대 금지
- **목표는 섹션별 pixelmatch diff < 5%, 전체 페이지 < 8%** (Figma 90% 정확도)

---

## 1. 4단계 작업 흐름

```
[Phase 1] 프로젝트 셋업       ← 1회만
    ↓
[Phase 2] 페이지 리서치       ← 페이지 시작 시
    ↓
[Phase 3] 섹션 루프           ← 섹션마다 반복 (가장 중요)
    ↓
[Phase 4] 페이지 통합 검증     ← 페이지 종료 시
```

각 Phase는 명확히 분리되며, **이전 Phase의 산출물 없이 다음 Phase로 진행하지 않는다.**

---

## 2. Phase 1 — 프로젝트 셋업 (1회)

프로젝트 시작 시 한 번만 수행한다. 결과물은 `research/project-setup.md`에 기록.

### 2.1 디자인 토큰 추출
- Figma MCP `get_variable_defs` 호출 → 색상/간격/타이포/radius 토큰 전부 추출
- `src/styles/tokens.css`에 CSS 변수로 정의
- Tailwind config(`@theme` 또는 `tailwind.config.js`)에 연결
- **검증**: Figma 토큰 목록 vs CSS 변수 1:1 매칭. 누락 0개를 `research/project-setup.md`에 명시

### 2.2 한국어 폰트 셋업
- Pretendard 가변폰트 설치, `font-display: swap`
- Figma vs 브라우저 line-height/letter-spacing 보정값을 CSS 변수로 정의
- 한글 텍스트 샘플(헤딩/본문/캡션)로 Figma 스크린샷과 ±1px 이내 확인
- **검증**: 보정 전/후 스크린샷을 `research/font-calibration/`에 저장

### 2.3 에셋 후처리 파이프라인
다음 스크립트를 미리 만든다 (섹션 작업마다 재사용):

```
scripts/
├─ download-assets.sh       # MCP 에셋 URL 일괄 다운로드
├─ verify-assets.sh         # 모든 에셋의 file 타입 vs 확장자 검증, 불일치 시 rename
├─ process-assets.py        # 검정 배경 → 투명, GIF→APNG, Video→WebM
└─ compare-section.sh       # Playwright 캡처 + pixelmatch 비교 (한 줄 실행)
```

- **검증**: 테스트 에셋(SVG/PNG/GIF) 3개로 파이프라인 동작 확인 → `research/project-setup.md`에 결과 기록

### 2.4 시각 회귀 인프라
- Playwright 설치
- `scripts/compare-section.sh <섹션명>` 한 줄로 다음을 수행:
  1. dev 서버 기동 확인
  2. 지정 URL 캡처
  3. `figma-screenshots/{섹션명}.png`와 pixelmatch 비교
  4. diff 이미지 + 차이 % 출력
- **검증**: 의도적으로 색상 하나 틀리게 한 후 스크립트 실행 → diff 정확히 검출되는지 확인

### 2.5 PROGRESS.md 초기 생성
프로젝트 루트에 빈 진행 추적 파일을 생성한다. 이 파일이 앞으로 모든 섹션 진행 상황의 진실의 원천이 된다.

`PROGRESS.md` 초기 템플릿:
```markdown
# ESGPN 프로젝트 진행 상황

> 각 섹션 완료 시 diff %와 함께 체크. 형식: `- [x] 섹션명 (diff X.X%)`

## Phase 1: 프로젝트 셋업
- [ ] 디자인 토큰 추출
- [ ] 한국어 폰트 셋업
- [ ] 에셋 파이프라인 (4개 스크립트)
- [ ] 시각 회귀 인프라

## 공통 컴포넌트
- [ ] Header (GNB)
- [ ] Footer

## 메인페이지 (/)
> 섹션 목록은 Phase 2 페이지 분해 후 추가됨

## About - 개요 (/about)
## About - 조직도 (/about/organization)
## 경진대회 (/contest)
## 자격검정 (/certification)
## 뉴스 목록 (/news)
## 뉴스 상세 (/news/:id)
## 갤러리 (/gallery)
## 고객센터 (/contact)
```

각 페이지의 섹션 목록은 해당 페이지의 Phase 2(페이지 분해)에서 확정된 후 PROGRESS.md에 추가한다.

### Phase 1 완료 조건 (모두 체크되어야 다음 Phase로)
- [ ] `tokens.css` 정의 + Tailwind 연결 완료
- [ ] 한국어 폰트 보정값 적용 + 샘플 검증 통과
- [ ] 에셋 후처리 파이프라인 4개 스크립트 작동 확인
- [ ] `compare-section.sh` 작동 확인
- [ ] `PROGRESS.md` 초기 템플릿 생성 완료
- [ ] `research/project-setup.md`에 위 결과 모두 기록

---

## 3. Phase 2 — 페이지 리서치

새 페이지 작업 시작 시 수행한다. 결과물은 `research/{페이지명}.md`에 기록.

### 3.1 페이지 분해
- `docs/figma-project-context.md`에서 해당 페이지의 Node ID 확인
- Figma MCP `get_metadata`로 페이지의 자식 노드(섹션) 트리 추출
- **섹션 단위로 분할**: 각 섹션이 12K MCP 토큰 이하인지 확인. 초과하면 더 작게 나눈다
- 결과를 표로 정리:

```markdown
| # | 섹션명 | Node ID | 예상 토큰 | Figma 사이즈 | 비고 |
|---|--------|---------|-----------|--------------|------|
| 1 | Hero   | 12:2325 | ~8K       | 1920x827     | 풀스크린 이미지 |
| 2 | Intro  | 12:2400 | ~5K       | 1920x600     | 좌측 타임라인 |
```

### 3.2 페이지 전체 베이스라인 확보
- `get_screenshot`으로 페이지 전체 스크린샷 캡처 → `figma-screenshots/{페이지명}/full.png`
- 각 섹션별 스크린샷 캡처 → `figma-screenshots/{페이지명}/{섹션명}.png`
- **모든 베이스라인이 저장되기 전에는 어떤 섹션도 구현 시작 금지**

### 3.3 공통 컴포넌트 식별
- 페이지 안에서 반복되는 컴포넌트(카드, 버튼, 뱃지 등)를 식별
- 이미 `src/components/ui/`에 있는 것 vs 새로 만들어야 하는 것 구분
- 새로 만들어야 하는 컴포넌트는 별도 섹션으로 취급 (Phase 3에서 먼저 구현)

### Phase 2 완료 조건
- [ ] 페이지가 N개의 섹션으로 분할됨 (각 12K 토큰 이하)
- [ ] 모든 섹션의 Figma 베이스라인 스크린샷 저장됨
- [ ] 새로 만들 공통 컴포넌트 목록 확정
- [ ] `research/{페이지명}.md`에 위 결과 기록
- [ ] **사용자 승인**: 분할된 섹션 목록을 사용자에게 보여주고 승인받는다 ("이대로 진행해도 될까요?")

---

## 4. Phase 3 — 섹션 루프 (가장 중요)

**한 섹션 = 한 브랜치 = 한 커밋 단위.** 절대로 여러 섹션을 한 번에 작업하지 않는다.

각 섹션의 내부 절차는 `docs/section-implementation.md`를 따른다. 여기서는 섹션 간 흐름만 정의한다.

### 4.1 섹션 진행 순서
1. **공통 컴포넌트 먼저** — Phase 2에서 식별된 신규 공통 컴포넌트
2. **레이아웃 컴포넌트** — Header(GNB), Footer 같은 페이지 공통
3. **페이지 섹션** — 위→아래 순서로

### 4.2 각 섹션 시작 시
```
git checkout main
git pull
git checkout -b feat/section-{페이지}-{섹션명}
```

### 4.3 각 섹션 종료 시 (4가지 게이트)
다음 4가지가 모두 통과되어야 다음 섹션으로 넘어갈 수 있다. **하나라도 미달이면 그 섹션에 머무른다.**

| 게이트 | 측정 방법 | 통과 기준 |
|--------|-----------|-----------|
| G1. 시각 일치 | `compare-section.sh` 실행 | pixelmatch diff < 5% |
| G2. 치수 정확도 | Playwright computed style | font-size ±1px, margin/padding ±2px |
| G3. 에셋 무결성 | Playwright `naturalWidth > 0` 검사 | 모든 img 로드 성공 |
| G4. 색상 정확도 | computed style hex 비교 | Figma spec과 동일 |

**측정값은 반드시 그 섹션의 `plan.md`에 기록한다.** 측정값이 없는 섹션은 미완료로 간주한다.

### 4.4 섹션 게이트 미통과 시
- 최대 3회 수정 시도 (`section-implementation.md` 5단계 참조)
- 3회에도 미달이면 **사용자에게 보고하고 멈춘다.** 임의로 우회 금지
- 보고 형식: 현재 diff %, 어느 부분이 차이나는지, 시도한 수정 내역

### 4.5 섹션 완료 시
```
git add .
git commit -m "feat(section): {페이지}-{섹션명} 구현 (diff X.X%)"
git push
```
커밋 메시지에 측정된 diff %를 포함한다 — 나중에 추적 가능하도록.

---

## 5. Phase 4 — 페이지 통합 검증

페이지의 모든 섹션이 완료된 후 수행한다.

### 5.1 통합
- 모든 섹션 브랜치를 페이지 통합 브랜치(`feat/page-{페이지명}`)에 머지
- 섹션 간 간격/연결부 CSS 조정

### 5.2 페이지 전체 검증
- `compare-section.sh` 페이지 전체 버전 실행
- **통과 기준: 전체 페이지 pixelmatch diff < 8%** (섹션별 5%보다 약간 느슨 — 섹션 경계 누적 차이 감안)
- 측정값을 `research/{페이지명}.md`에 기록

### 5.3 반응형 검증
- 모바일(375px) / 태블릿(768px) / 데스크탑(1440px) 3개 뷰포트
- 각 뷰포트에서 레이아웃 깨짐, 가로 스크롤, 오버플로우 없는지 확인
- Figma에 반응형 디자인이 있으면 각 뷰포트 베이스라인과 비교

### 5.4 크로스 브라우저
- Chrome / Firefox / Safari (WebKit) 최소 3개
- backdrop-filter, mix-blend-mode, WebM 등 호환성 이슈 확인

### Phase 4 완료 조건
- [ ] 전체 페이지 diff < 8% 측정값 기록
- [ ] 3개 뷰포트 정상
- [ ] 3개 브라우저 정상
- [ ] **사용자에게 페이지 완료 보고** (측정값과 스크린샷 첨부)

---

## 6. Figma MCP 사용 규칙

### 6.1 호출 단위
- `get_design_context`는 **섹션 단위**로만 호출. 페이지 전체 호출 금지
- 각 호출은 12K 토큰 이하 — 초과 시 더 작은 노드로 분할
- Free 플랜이면 호출 횟수 절약 전략(아래 6.3) 따르기

### 6.2 에셋 추출 규칙
- **에셋 URL을 받으면 즉시 다운로드한다. CSS로 대체하지 않는다.**
- 다운로드 후 `file` 명령으로 실제 타입 확인 → 확장자 불일치 시 rename
- SVG는 **부모 컨테이너 노드 ID로 추출** (내부 Vector 노드 추출 금지)
- SVG 배치 패턴: `<div w-[부모px] h-[부모px] flex items-center justify-center><img w-[원본px] h-[원본px] /></div>`

### 6.3 호출 횟수 절약 (Free 플랜 기준)
페이지당 권장 호출 분배:
1. `get_metadata` 1회 — 전체 구조
2. `get_variable_defs` 1회 — 토큰 (Phase 1에서 1회로 끝)
3. `get_screenshot` 섹션 수만큼 — 베이스라인
4. `get_design_context` 섹션 수만큼 — 코드/에셋

### 6.4 금지사항
- ❌ 페이지 전체를 한 번에 `get_design_context`로 가져오기
- ❌ 에셋 URL 무시하고 CSS/유니코드 문자로 대체
- ❌ SVG에 임의 width/height 클래스 부여
- ❌ 서브에이전트로 분할 (메인 세션에서 직접 작업)

---

## 7. 진행 상황 추적

프로젝트 루트에 `PROGRESS.md`를 두고 다음 형식으로 갱신한다:

```markdown
# 진행 상황

## 메인페이지 (/)
- [x] Hero (diff 3.2%)
- [x] Intro (diff 4.1%)
- [ ] Stats — 진행 중 (diff 6.8%, 수정 2회차)
- [ ] Gallery
...

## About (/about)
- [ ] (대기)
```

각 섹션 완료 시 diff %를 함께 기록한다. 이 파일이 곧 프로젝트 상태의 진실의 원천이다.

---

## 8. 자주 발생하는 실패와 대응

| 실패 양상 | 원인 | 대응 |
|----------|------|------|
| 레이아웃이 엉성 | 섹션 단위가 너무 큼 | 더 작게 분할, Phase 2로 돌아가서 재분할 |
| 에셋 깨짐/누락 | 에셋 다운로드 스킵 | Phase 3에서 G3 게이트로 차단됨 — 통과 못 하면 진행 금지 |
| diff가 5% 근처에서 안 줄어듦 | 토큰/폰트 미스매치 | Phase 1로 돌아가 토큰/폰트 보정 재확인 |
| 후반부 섹션 품질 하락 | 한 호흡에 너무 많이 시킴 | 무조건 한 섹션 = 한 커밋. 중간에 새 대화 시작 가능 |
| Figma와 미묘하게 다른데 어디인지 모름 | diff 이미지 안 봄 | `compare-section.sh`의 diff 이미지를 직접 열어볼 것 |

---

## 9. 작업 시작 시 Claude에게

이 문서를 읽었다면 Figma → React 작업 시작 시 다음을 수행한다:

1. `CLAUDE.md`의 5단계 워크플로우를 따른다
2. `docs/figma-project-context.md`에서 작업할 페이지의 Node ID 확인
3. Phase 1이 완료되어 있는지 `research/project-setup.md` 확인 — 없으면 Phase 1부터
4. Phase 2의 페이지 리서치를 수행하고 사용자 승인을 받는다
5. **승인 전까지 어떤 섹션도 구현 시작 금지**
6. 섹션 구현은 `docs/section-implementation.md`의 절차를 한 단계도 빠뜨리지 않고 따른다
7. 각 섹션의 4가지 게이트(G1~G4) 측정값을 반드시 `plan.md`에 기록
8. 게이트 미통과 시 사용자에게 보고하고 멈춘다 — 임의 우회 금지

`CLAUDE.md`의 4단계 방어 체계는 이 문서와 함께 작동한다.
