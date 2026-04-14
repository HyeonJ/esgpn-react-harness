# 자율 모드 세션 피드백 (2026-04-14)

자율 모드 1세션 완료 후 발견한 하네스 v2 개선 후보. 다음 하네스 업데이트 시 반영.

## 발견된 한계

### 1. baseline alpha=0 transparent 자동 처리
**현상**: gallery-agreements/news-featured/news-list 등에서 Framelink 섹션 단독 export PNG는 alpha=0 transparent 영역 다수 보유. preview는 white 렌더 → 첫 측정 9~24% diff 폭증.

**현재 우회**: full-page baseline에서 해당 영역 crop → white 베이크.

**개선 제안**: `compare-section.sh`에 `--bake-bg=white|black|transparent` 옵션 추가. 또는 baseline 다운로드 단계에서 자동 베이크.

### 2. baseline TopNav 포함 vs preview 미장착
**현상**: certification-hero에서 full-page 0~633 crop은 TopNav 88px 포함. preview standalone은 TopNav 없음 → 7%p+ 손해.

**개선 제안**: Preview route에 `withRootLayout` flag option 추가. 켜면 preview에도 TopNav 마운트.

### 3. Framelink Rectangle export ≠ page composite
**현상**: certification-hero bg.png(Rectangle 단독)는 페이지 composite의 좌우 leaf decoration overflow 미포함. G1 ~3-4%p 손해.

**개선 제안**: 자동 가드 — section 구현 시 base render와 page-full crop 비교 → 차이 크면 alert.

### 4. G6 floor bypass via short alt
**현상**: certification-flatten-bottom 같은 단일 raster 섹션이 alt 12자(<floor 80) → ratio 체크 스킵 → 자동 PASS. 안티패턴 우회 가능.

**개선 제안**: G6 보강 — 섹션 컴포넌트의 raster 사용 면적이 컴포넌트 총 면적의 80% 이상이면서 visible HTML text가 N자 미만이면 추가 alert.

### 5. autonomous에서 design_context 사전 fetch 가능
**현상**: 매 섹션마다 plan 승인 게이트가 없는 autonomous에서는 plan + design_context를 한번에 처리하면 round-trip 절약.

**개선 제안**: section-implementer agent prompt에 "autonomous 모드에서는 단계 1+2 합쳐서 처리 가능" 명시.

### 6. 회차 누적 시 G1 악화 패턴
**현상**: certification-hero 1회차 10.98% → 2회차 11.54% → 3회차 14.11% → revert. 시도 자체가 성능을 떨어뜨리는 패턴.

**개선 제안**: 회차마다 best 결과 자동 revert 옵션. 또는 회차 N시 best vs current 차이 +1.5%p 이상이면 자동 revert.

### 7. 사전 추정 카피 vs Figma placeholder
**현상**: news-title이 Figma placeholder ("Amazon bets...") 대신 사전 추정 한글 카피 사용 → 6.35%.

**개선 제안**: research에서 placeholder 감지 시 (영문 무의미 텍스트 + 한국 페이지) 자동으로 사전 추정 카피로 대체 + tech-debt T-XXX 등록.

### 8. flatten 노드 자동 처리
**현상**: certification-flatten-bottom (자식 0)는 단일 raster 외 옵션 없음.

**개선 제안**: page-researcher가 자식 0 flatten 노드 발견 시 자동으로 "OCR 권장 + 단일 raster fallback" 표시.

## 이번 세션 결과

| 페이지 | 섹션 완료 | G1 평균 | 부채 |
|---|---|---|---|
| gallery (이전 세션 + 이번) | 3/3 | 5.11% | T-005,006 ACCEPTED |
| certification | 6/6 | 4.04% | T-007,008 ACCEPTED |
| news (목록) | 4/4 | 8.95% | T-009,010 ACCEPTED |
| **합계** | **13/13** | **6.03%** | **OPEN 2 / ACCEPTED 4(이번)** |

## 다음 세션 진입점

- `news-detail` Phase 2 (Node 134:2911, 1920×3339)
- 또는 OPEN 부채 해소 (T-001 main-hero raster, T-002 contest-benefits CTA)
