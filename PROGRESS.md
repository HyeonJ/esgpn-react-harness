# ESGPN 프로젝트 진행 상황 — v4 Rebuild (experiment/redefine-rebuild)

> 하네스 v4: "편집 가능한 고충실도" north star.
> 차단 게이트 = G5 시맨틱 / G6 텍스트비율 / G8 i18n / G2 치수 / G4 색상 토큰.
> G1 시각 diff = 참고 지표 (≤15% 목표, 차단 아님).
> 자율 모드: 사용자 개입 없이 전 페이지 완주 후 검수.

## 시간 측정
- 시작: 1776304559 (2026-04-16 10:15:59 KST)
- 종료: (완주 시 기록)
- 총 소요: (완주 시 계산)

## Phase 1: 프로젝트 셋업
- [x] 디자인 토큰 / 한국어 폰트 / 에셋 파이프라인 / 시각 회귀 인프라 (v1~v3에서 이관)
- [x] Header / Footer 공통 레이아웃 유지

## 공통 컴포넌트
(Rule of Three 기반 승격 시 기록)
- [x] `HatchedSectionHeading` (`src/components/ui/HatchedSectionHeading.tsx`) — contest-about + contest-benefits (2/3). 40px 아이콘 + 32B 제목 + HatchedDivider. Rule of Three 2/3 승격.

## 메인페이지 (/)
- [x] main-hero (G1 5.46% ref / G5-G8 PASS / structure: token_ratio=0.40, abs=4, sem=5)

## About - 개요 (/about)
- [x] about-header (G1 3.40% ref / G5-G8 PASS / structure: token_ratio=0.64, abs=0)
- [x] about-mission (G1 4.23% ref / G5-G8 PASS / structure: token_ratio=0.50, abs=3, sem=3)
- [x] about-values (G1 4.16% ref / G5-G8 PASS / structure: token_ratio=0.54, abs=2, sem=4)

## About - 조직도 (/about/organization)
- [x] about-organization-logos (G1 3.34% ref / G5-G8 PASS / structure: token_ratio=0.42, abs=1, sem=3)
- [x] about-organization-panorama (G1 1.18% ref / G5-G8 PASS / structure: token_ratio=0.44, abs=2, sem=3)

## 경진대회 (/contest)
- [x] contest-about (G1 2.87% ref / G5-G8 PASS / structure: token_ratio=0.36, abs=0, sem=4)
- [x] contest-benefits (G1 12.32% ref / G5-G8 PASS / structure: token_ratio=0.32, abs=0, sem=5)

## 자격검정 (/certification)
- [x] certification-intro (G1 5.24% ref / G5-G8 PASS / structure: token_ratio=0.25, abs=0, sem=1)
- [x] certification-benefits (G1 5.08% ref / G5-G8 PASS / structure: token_ratio=0.21, abs=4, sem=2)
- [x] certification-flatten-bottom (G1 5.00% ref / G5-G8 PASS / structure: token_ratio=0.23, abs=16 per 4 files (avg 4.0), sem=6) — v1~v3 T-008 단일 raster 안티패턴 해소. get_design_context 전체 트리로 HTML 재구성

## 뉴스 목록 (/news)
- [x] news-tabs (G1 1.07% ref / G5-G8 PASS / structure: token_ratio=0.78, abs=0, sem=2)
- [x] news-featured (G1 10.38% ref / G5-G8 PASS / structure: token_ratio=0.56, abs=0, sem=6)
- [x] news-list (G1 12.64% ref / G5-G8 PASS / structure: token_ratio=0.83, abs=0, sem=9) — v1~v3 20.37% ACCEPTED 개선. line-clamp-3→2 교정으로 섹션 높이 매칭. NewsListItem/Pagination/ListHeader 모두 HTML 재구성

## 뉴스 상세 (/news/:id)
- [x] news-detail-breadcrumb (G1 1.20% ref / G5-G8 PASS / structure: token_ratio=0.2+, abs=0, sem=4)
- [x] news-detail-article (G1 2.55% ref / G5-G8 PASS / structure: token_ratio=0.38, abs=1, sem=5)
- [x] news-detail-related (G1 10.97% ref / G5-G8 PASS / structure: token_ratio=0.95, abs=1, sem=7) — v1~v3 T-011 composite raster 부채 해소. heading+3 items 완전 HTML 재구성, NewsListItem과 패턴 공유하되 로컬 격리
- [x] news-detail-back (G1 1.38% ref / G5-G8 PASS / structure: token_ratio=0.2+, abs=0, sem=3) — "목록으로 이동하기" pill 버튼. 에셋 0, 완전 HTML. Figma typo "으도" → "으로" 의도 정정

## 갤러리 (/gallery)
- [x] gallery-title (G1 9.86% ref / G5-G8 PASS / structure: token_ratio=0.64, abs=0, sem=3) — ESPGN→ESGPN 브랜드 교정. NewsTitle 전례 답습, 48/Bold h1 + Regular 15 p 2열 flex items-end.
- [x] gallery-agreements (G1 5.61% ref / G5-G8 PASS / structure: token_ratio=0.39, abs=0, sem=3) — v1~v3 T-006 ACCEPTED 5.72% → v4 5.61%로 소폭 개선. U+2028 Line Separator를 `<br>` + `institutionLine1`/`line2Prefix` prop 분할로 Figma 강제 줄바꿈 정확 재현. MouCard 로컬 유지 (activities 구현 시 공통 승격 검토). 2×2 grid, 이미지 2장(mou-1/mou-2) 카드 4개에 재사용 (Figma 더미 중복).

## 고객센터 (/contact)

---

## 구조 품질 지표 (v1~v3 비교용)
| 지표 | v1~v3 평균 | v4 목표 (1차) | v4 실측 |
|---|---|---|---|
| token_ratio | 0.13 | ≥ 0.2 | (완주 후 측정) |
| semantic_score | 1.87 | ≥ 2 | (완주 후 측정) |
| absolute/file | (미산출) | ≤ 5 | (완주 후 측정) |
| magic_number/file | (미산출) | (참고) | (완주 후 측정) |
| G1 평균 | 4.2% | ≤ 15% | (완주 후 측정) |
