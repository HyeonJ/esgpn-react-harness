---
name: visual-regression-gates
description: Figma→React 섹션 구현 품질을 검증하는 8게이트 측정 절차. 시각(G1)·치수(G2)·에셋(G3)·색상(G4) + 시맨틱 HTML(G5)·텍스트비율(G6)·Lighthouse(G7)·i18n(G8). "측정", "게이트 검증", "pixelmatch", "diff 확인", "시각 회귀", "품질 게이트" 요청에 트리거.
---

# Visual Regression Gates — 8 게이트

섹션 구현 후 반드시 8가지 게이트를 **숫자로** 측정한다. 눈대중 금지. 측정값이 plan에 기록되지 않은 섹션은 미완료.

**측정 순서 중요**: G5~G8(구조·품질)을 **단계 4.5**에 먼저 측정하고 통과해야 G1~G4(픽셀) 측정으로 진입. 구조 망가진 코드를 픽셀 측정 단계까지 들이지 말 것.

## 게이트 정의

### 단계 4.5 (구조·품질)
| # | 게이트 | 측정 항목 | 통과 기준 | 측정 방법 |
|---|--------|----------|-----------|-----------|
| G5 | 시맨틱 HTML | eslint-plugin-jsx-a11y + heading 순차성 | error 0 | `npx eslint {섹션 디렉토리}` |
| G6 | 텍스트:이미지 비율 | Σ JSX text / Σ img.alt (alt ≥ 80자일 때만) | ratio ≥ 3:1 | `node scripts/check-text-ratio.mjs {디렉토리}` |
| G7 | Lighthouse a11y/SEO | preview 라우트 실행 | a11y ≥ 95, SEO ≥ 90 | `scripts/measure-quality.sh` (lhci 설치 시) |
| G8 | i18n 가능성 | JSX에 literal text 존재 (alt/aria 외) | 존재하면 PASS | check-text-ratio.mjs g8 필드 |

**G5~G8 umbrella 실행**: `bash scripts/measure-quality.sh <섹션명> <섹션 디렉토리>`

### 단계 5 (픽셀·치수)
| # | 게이트 | 측정 항목 | 통과 기준 | 측정 방법 |
|---|--------|----------|-----------|-----------|
| G1 | 시각 일치 | pixelmatch diff % | **< 5%** | `scripts/compare-section.sh {섹션명}` |
| G2 | 치수 정확도 | font-size, margin, padding, gap | font **±1px**, 나머지 **±2px** | Playwright computed style |
| G3 | 에셋 무결성 | 모든 `<img>` `naturalWidth > 0` | 전부 통과 | Playwright DOM 검사 |
| G4 | 색상 정확도 | 주요 텍스트/배경 색상 | Figma spec hex와 **완전 동일** | Playwright computed style |

## G5~G8의 존재 이유

**4 게이트만으로는 main-hero 카드 raster, contest-benefits CTA composite 같은 안티패턴이 "전부 PASS"로 통과**했다. G1 PASS(픽셀 닮음) + G2 N/A(img 한 장) + G3 PASS(로드 OK) + G4 N/A(색 baked-in) = 네 게이트 모두 통과인데 결과물은 `<img alt="...">` 한 장. SEO·a11y·i18n·검색 전부 파괴.

**G6이 핵심 방어**: main-hero 카드 3장 alt 합 ~500자 + 실제 JSX text 0자 = ratio 0:1 → FAIL. "픽셀이 닮을수록 G6이 나빠지는 설계" — 완화로 탈출 불가능한 게이트.

**G5/G7는 교차 검증**: jsx-a11y 위반과 Lighthouse 점수는 독립 소스이므로 G6이 false negative여도 잡힌다.

**G8은 i18n 예비 방어**: 다국어 확장 시 Figma 재export 강제되는 raster 접근 차단.

## baseline PNG 확보

**Framelink MCP** `mcp__figma-framelink__download_figma_images` 로 섹션 노드를 파일 저장. 공식 MCP `get_screenshot`은 inline 전용이라 사용 금지. Framelink 미등록 상태면 `docs/figma-workflow.md` Phase 0 먼저 수행.

**경로 규약:**
- 공통 컴포넌트: `figma-screenshots/{section}.png` (예: `header.png`, `footer.png`)
- 페이지 섹션: `figma-screenshots/{page}-{section}.png` (예: `main-hero.png`)
- 페이지 전체: `figma-screenshots/{page}-full.png`

섹션명은 baseline 파일명과 동일하게 사용 (공통은 `header`, 페이지는 `main-hero` 같이 접두사 포함).

## baseline PNG 확보

**Framelink MCP** `mcp__figma-framelink__download_figma_images` 로 섹션 노드를 파일 저장. 공식 MCP `get_screenshot`은 inline 전용이라 사용 금지. Framelink 미등록 상태면 `docs/figma-workflow.md` Phase 0 먼저 수행.

**경로 규약:**
- 공통 컴포넌트: `figma-screenshots/{section}.png` (예: `header.png`, `footer.png`)
- 페이지 섹션: `figma-screenshots/{page}-{section}.png` (예: `main-hero.png`)
- 페이지 전체: `figma-screenshots/{page}-full.png`

섹션명은 baseline 파일명과 동일하게 사용 (공통은 `header`, 페이지는 `main-hero` 같이 접두사 포함).

## 측정 실행

**풀폭 섹션:**
```bash
scripts/compare-section.sh {섹션명}
```

**floating/중앙정렬 요소(예: Header GNB, 1416×72 pill)**: 뷰포트 전체가 아니라 요소 영역만 캡처해야 baseline과 크기가 일치한다.
```bash
npx tsx tests/visual/run.ts --section {섹션명} --url http://127.0.0.1:5173/__preview/{섹션명} --baseline figma-screenshots/{섹션명}.png --clip-x {x} --clip-y {y} --clip-w {width} --clip-h {height}
```
clip 값은 Figma 캔버스에서의 좌표(research에 기록). 예: Header는 `--clip-x 252 --clip-y 16 --clip-w 1416 --clip-h 72`.

두 방식 모두 수행하는 일:
1. dev 서버에서 해당 섹션 URL 캡처 (clip 지정 시 해당 영역만)
2. **`figma-screenshots/{섹션명}.png`**(flat)과 pixelmatch 비교
3. diff 이미지 → `tests/visual/diffs/{섹션명}.diff.png`
4. diff % 출력
5. Playwright로 computed style 측정 → JSON 출력

## 육안 semantic 검증 (필수, G1 수치와 별개)

pixelmatch는 픽셀 밀도만 본다. 다음 류는 **수치로 못 잡는다** — 반드시 3종 이미지 육안 비교:

- `figma-screenshots/{section}.png` (baseline)
- `tests/visual/captures/{section}.png` (우리 구현)
- `tests/visual/diffs/{section}.diff.png` (차이)

semantic 오류 체크 리스트:
- 화살표/커넥터 방향 반전 (`-scale-y`/`-scale-x` 오적용 포함)
- 요소 좌우/상하 swap
- 배경 색 반전 (다크 ↔ 라이트)
- 아이콘 모양 불일치
- 텍스트 줄바꿈 위치 (`<br>` 누락)

**G1 PASS + 육안 OK** 둘 다 만족해야 커밋. 육안에서 오류 발견 시 수치 PASS여도 수정 후 재측정.

## plan 측정 섹션 포맷

`plan/{섹션명}.md` 하단에 추가:

```markdown
## 측정 결과 (시도 1회차)

### 단계 4.5 (구조·품질)
- G5 시맨틱 HTML: eslint 0 error ✅
- G6 텍스트:이미지 비율: 4.89 (text=186/alt=38) ✅
- G7 Lighthouse: a11y=97, seo=100 ✅
- G8 i18n 가능성: PASS (literal 존재) ✅

### 단계 5 (픽셀·치수)
- G1 시각 일치: 7.2% ❌ (목표 < 5%)
- G2 치수:
  - title font-size 32px (Figma 36px) ❌
  - 나머지 OK ✅
- G3 에셋: 5/5 ✅
- G4 색상:
  - primary #2D5A27 ✅
  - accent #5A7D52 ❌ (Figma #5A7E50)
```

수정 루프 돌 때마다 2회차, 3회차 결과를 누적 기록.

## 단계 4.5 미통과 시 대응 (G5~G8 실패)

**G5~G8은 완화 금지.** G1/G4 같은 픽셀 게이트와 달리 구조적 결함이므로 완화해도 가치가 없다.

대응:
- **G5 FAIL**: eslint 에러 수정. landmark 태그 누락이면 `<section>/<nav>/<main>` 추가, role/aria 오용이면 교정
- **G6 FAIL**: 텍스트 baked-in raster 가능성 높음. 해당 컴포넌트를 HTML 재구성. alt가 문장형으로 과도하게 길면 실제 텍스트가 PNG에 박혔을 시그널
- **G7 FAIL**: Lighthouse 리포트 열고 개별 audit 수정. 이미지 alt, heading 순차성, color contrast 우선
- **G8 FAIL**: JSX 안에 literal 텍스트가 없음. 텍스트가 data·alt에만 존재 → 실제 렌더 검토

**단계 4.5 실패 시 단계 5(픽셀 측정)로 진입 금지.** 단계 4(구현)로 반송.

## 미통과 시 수정 절차 (최대 3회)

1. **diff 이미지 직접 확인** — `tests/visual/diff/{섹션명}.png`를 열어 차이 부위 식별
2. **원인 분류**
   - 위치/크기 차이 → 패딩/마진/사이즈 클래스 수정
   - 색상 차이 → 토큰 매칭 재확인 (Phase 1까지 거슬러 올라갈 수도)
   - 폰트 차이 → line-height/letter-spacing 보정값 재확인
   - 에셋 차이 → 에셋 단계로 돌아가 재확인
3. **해당 부분만 수정** — 다른 부분 건드리지 않기
4. **재측정** → plan에 N회차 결과 추가

## 3회 후에도 미통과 시 (중요)

**임의로 우회 금지.** 선택지 순서는 **재분할 → 다른접근 → 엔진차이 수용 → 되돌리기 → 완화(최후)**. 사용자에게 다음 포맷으로 보고:

```markdown
## 섹션 [섹션명] 게이트 미통과 보고
- 시도 횟수: 3회
- 미통과 게이트: G1 (현재 6.8%, 목표 < 5%)

### diff 분석
- 우측 상단 아이콘 영역: 약 3% 차이
- 본문 텍스트 줄간격: 약 1.5% 차이

### 시도한 수정
1. 1회차: 패딩 조정 → 7.2% → 6.9%
2. 2회차: 폰트 line-height → 6.9% → 6.8%
3. 3회차: 아이콘 사이즈 → 6.8% (변화 없음)

### 의심 원인
- Figma SVG의 viewBox 불일치 의심
- 사용자 결정 필요: (a) 기준 완화 (b) 다른 접근 (c) 추가 디버깅
```

보고 후 `approval-gate-format` 스킬의 포맷으로 승인 대기.

## 커밋 조건

4 게이트 모두 통과 + 빌드/린트/타입체크 통과 + dev 서버 로드 정상 → 커밋.

커밋 메시지에 diff % 포함:
```
feat(section): main-hero 구현 (diff 3.2%)
```

PROGRESS.md 업데이트:
```
- [x] Hero (diff 3.2%)
```

## 페이지 통합 검증 (Phase 4)

개별 섹션 < 5%, 페이지 전체 < 8%.
`compare-section.sh`의 페이지 전체 모드로 실행 후 `research/{페이지명}.md` 하단에 기록.
