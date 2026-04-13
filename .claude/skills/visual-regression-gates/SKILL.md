---
name: visual-regression-gates
description: Figma→React 섹션 구현 품질을 검증하는 4게이트 측정 절차. pixelmatch diff, 치수 정확도, 에셋 무결성, 색상 정확도 측정 작업 시 반드시 사용. "측정", "게이트 검증", "pixelmatch", "diff 확인", "시각 회귀" 요청에 트리거.
---

# Visual Regression Gates

섹션 구현 후 반드시 4가지 게이트를 **숫자로** 측정한다. 눈대중 금지. 측정값이 plan에 기록되지 않은 섹션은 미완료.

## 게이트 정의

| # | 게이트 | 측정 항목 | 통과 기준 | 측정 방법 |
|---|--------|----------|-----------|-----------|
| G1 | 시각 일치 | pixelmatch diff % | **< 5%** | `scripts/compare-section.sh {섹션명}` |
| G2 | 치수 정확도 | font-size, margin, padding, gap | font **±1px**, 나머지 **±2px** | Playwright computed style |
| G3 | 에셋 무결성 | 모든 `<img>` `naturalWidth > 0` | 전부 통과 | Playwright DOM 검사 |
| G4 | 색상 정확도 | 주요 텍스트/배경 색상 | Figma spec hex와 **완전 동일** | Playwright computed style |

## baseline PNG 확보

**Framelink MCP** `mcp__figma-framelink__download_figma_images` 로 섹션 노드를 `figma-screenshots/{섹션명}.png`(flat)에 저장. 공식 MCP `get_screenshot`은 inline 전용이라 사용 금지. Framelink 미등록 상태면 `docs/figma-workflow.md` Phase 0 먼저 수행.

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

## plan 측정 섹션 포맷

`plan/{섹션명}.md` 하단에 추가:

```markdown
## 측정 결과 (시도 1회차)
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

**임의로 우회 금지.** 사용자에게 다음 포맷으로 보고:

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
