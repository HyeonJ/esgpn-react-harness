# ESGPN 프로젝트 진행 상황

> 각 섹션 완료 시 diff %와 함께 체크. 형식: `- [x] 섹션명 (diff X.X%)`

## Phase 1: 프로젝트 셋업
- [x] 디자인 토큰 추출
- [x] 한국어 폰트 셋업
- [x] 에셋 파이프라인 (4개 스크립트)
- [x] 시각 회귀 인프라

## 공통 컴포넌트
- [x] Header (GNB) (diff 3.36% / G2 16/16, G3 3/3, G4 4/4 PASS 1회차)
- [x] Footer (diff 0.41% / G2 22/22, G3 7/7, G4 4/4 PASS 1회차)

## 메인페이지 (/)
Phase 2 분해 완료 (research/메인페이지.md). 총 9개 섹션 + 페이지 전체 baseline.
- [x] main-hero (diff 2.24% / G2 PASS, G3 4/4 PASS, G4 PASS / 회차 6: 이중 회전 제거 + 정밀 수치 규칙)
- [x] main-intro (diff 2.36% / G2 PASS, G3 12/12 PASS, G4 PASS / 회차 3: letter-spacing percent + SVG scaleY 반전 제거)
- [x] main-stats (diff 1.92% / G2 PASS, G3 6 svg paths, G4 PASS / 육안 PASS — 1회차 통과)
- [ ] main-programs-header
- [ ] main-programs-card1
- [ ] main-programs-card2
- [ ] main-programs-card3
- [ ] main-news
- [ ] main-gallery

## About - 개요 (/about)
## About - 조직도 (/about/organization)
## 경진대회 (/contest)
## 자격검정 (/certification)
## 뉴스 목록 (/news)
## 뉴스 상세 (/news/:id)
## 갤러리 (/gallery)
## 고객센터 (/contact)
