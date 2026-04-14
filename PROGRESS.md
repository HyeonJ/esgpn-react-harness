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
- [x] main-programs-header (diff 2.57% / G2 exact / G3 vacuous PASS / G4 PASS / 육안 PASS — 1회차)
- [x] main-programs-card1 (diff 2.67% / G2 PASS / G3 11/11 / G4 PASS / 육안 PASS, 3회차 완통과. R1 실증: leaf 2개 Framelink baked-in 회전, clip-x=265. 공통화 리팩터 후 유지: ProgramCard ui 승격 + 로컬 5파일 삭제, G1 악화 0.00%p)
- [x] main-programs-card2 (diff 2.69% / G2 PASS / G3 11/11 / G4 PASS / 육안 PASS — 1회차 완통과, clip-x=263. card1 교훈 선반영 성공. 공통화 리팩터 후 유지: 로컬 5파일 삭제, G1 악화 0.00%p)
- [x] main-programs-card3 (diff 4.55% / G2 PASS / G3 11/11 / G4 PASS / 육안 PASS — Rule of Three 확정 지점. ProgramCard ui/ 승격 + card1/2 리팩터 + card3 구현 원자 커밋. clip-x=262, 4회차 통과)
- [x] main-news (diff 4.60% / G2 PASS / G3 15/15 / G4 PASS / 육안 PASS — 풀폭 1920, 음수 width 배경 PNG는 `-scale-x-100` + 양수 width 폴백 사용, 2회차 통과)
- [ ] main-gallery

## About - 개요 (/about)
## About - 조직도 (/about/organization)
## 경진대회 (/contest)
## 자격검정 (/certification)
## 뉴스 목록 (/news)
## 뉴스 상세 (/news/:id)
## 갤러리 (/gallery)
## 고객센터 (/contact)
