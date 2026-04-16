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

## 자격검정 (/certification)

## 뉴스 목록 (/news)

## 뉴스 상세 (/news/:id)

## 갤러리 (/gallery)

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
