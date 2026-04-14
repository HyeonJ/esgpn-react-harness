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
- [x] main-gallery (diff 4.05% / G2 PASS / G3 13/13 / G4 PASS / 육안 PASS — 3회차 통과. BG 파일 매핑이 research와 반대임을 시각으로 확정 후 import 스왑, cityscape PNG RGBA alpha 보존(JPG로 변환하면 black void 발생)이 핵심 해결점. **메인페이지 9/9 완성**)

## About - 개요 (/about)
- [x] about-header (diff 3.40% / G2 PASS ±2 / G3 N/A 텍스트전용 / G4 PASS all 토큰 일치 / 육안 PASS — 3회차 통과. 전략 [A] 완전 HTML 재구성. SectionTabs 공통 컴포넌트 신설(ui/). Yeseva One 재사용, font-size 144→152 조정으로 글리프 폭 baseline 일치. line-height "120px"로 cap 높이 제어)
- [x] about-mission (diff 4.23% / G2 PASS (section 1920×754, h2 28/33/700, p 16/24, photos 357×359 + 145×161) / G3 2/2 (photo-large naturalWidth 357, photo-small 145) / G4 PASS (#4FB654 green #1D2623 gray-900 일치) / 육안 PASS — 1회차 통과. 전략 [A] 완전 HTML 재구성. HatchedDivider 로컬 SVG 컴포넌트 신설(Values/Vision 등장 시 ui/ 승격 예정). 사진 2장은 about-full.png baseline crop. 본문 `<br>` 수동 줄바꿈. brand-500 토큰 재사용. **HatchedDivider 공통 승격 후 유지: import 경로만 변경, regression 재측정 4.23% 동일. HatchedDivider `label?` prop 확장 후 유지: 2026-04-14 재측정 4.23% (0.00%p)**)
- [x] about-values (diff 4.28% / G2 PASS (section 1920×722, icons 144×141/138×141/131×150/151×150, centerX 714/1205, titles 22px/700, descs 16px/24px) / G3 4/4 (icon-1~4 naturalWidth 144/138/131/151) / G4 PASS (#1d2623 다크, divider #B1B9B6/#97A29E) / 육안 PASS — 2회차 통과. 전략 [A] 완전 HTML 재구성. HatchedDivider 공통 승격 (Rule of Three 4회 사용 충족 → ui/). ValueCard 로컬 첫 카운트. 4 아이콘 about-full.png baseline crop 10px 여유, top=85/385 보정으로 여유 offset 상쇄. clip 불필요 풀폭 1920. HatchedDivider `label?` prop 확장 후 유지: 2026-04-14 재측정 4.28% (0.00%p))
- [x] about-vision (diff 0.70% / G2 PASS (section 1920×783, body 16/24 400 centerX 960 top 65, 감사합니다 16/24 700 top 137, panorama 1920×631 top 152) / G3 1/1 (panorama naturalWidth 1920) / G4 PASS (#1d2623 gray-900) / 육안 PASS — 1회차 완통과. 전략 [A] 완전 HTML 재구성. 파노라마 1장 about-full.png crop(0,2169,1920,2800), RGBA PNG alpha 보존(JPG 전환 금지 §2.5), 1.78MB optimize. 감사합니다 Bold 유지 결정. HatchedDivider 미사용(상단 divider는 values bottom, 하단 Footer 직결). **About 4/4 완성**)
## About - 조직도 (/about/organization)
- [x] about-organization-tabs (diff 0.71% / G2 PASS (section 1920×102, font 14/20, y=80, gap 52px) / G3 vacuous (텍스트 전용) / G4 PASS (active #1d2623, inactive #97a29e) / 육안 PASS — 1회차 완통과. SectionTabs 재사용, 파일 수정 0줄. about-header G1 3.40% 유지 확인)
- [x] about-organization-logos (diff 4.84% / G2 PASS (section 1920×300, ESPGN 310×83 x=510.5, Colive 238×83 x=855.5, Assoc 320×77 x=1089.5, label "운영주체" center=960 fontSize=13 weight=500) / G3 3/3 (ESPGN 310, Colive 238, Assoc 320) / G4 PASS (pipe #d6dad8, label #a4aeaa) / 육안 PASS — 1회차 완통과. 전략 [A] 완전 HTML 재구성 + 로고 3개 baseline crop. HatchedDivider `label?` prop 확장 (backward-compatible, label 미제공 시 기존 동작). pipe divider CSS `w-[2px] h-[46px] bg-[#d6dad8]`. **HatchedDivider label 확장 후 유지: mission 4.23%, values 4.28% regression 0.00%p**)
- [x] about-organization-chart (diff 3.55% / G2 PASS (section 1920×390; Tier2 박스 302×50 x=491/810/1129 15px/700; Tier3 박스 302×57 x=809/1127 15px/500 y=164/240/316; connectors x=957/1275 y=100 w=6 h=67 중심축 +3 보정; divider "실행 구조" center=960 13px/500) / G3 N/A (raster 에셋 0개, 전략 γ 완전 CSS/SVG 재구성) / G4 PASS (pill #4FB654, primary #0C3B0E, ghost #EFF0F0 텍스트 #1D2623, divider label #a4aeaa) / 육안 PASS — 1회차 완통과. 전략 γ HTML/CSS/SVG 재구성. OrgChartBox 3-variant(pill/primary/ghost), OrgChartConnector SVG viewBox `-3 0 6 h+6` 중심축 보정 + line strokeWidth=2 + circle r=2.5. HatchedDivider 재사용(label prop, 수정 0줄). **baseline divider label = "실행 구조" (사용자 지시 "설립 구조"와 불일치) → baseline 우선 원칙으로 "실행 구조" 채택**)

## 경진대회 (/contest)
## 자격검정 (/certification)
## 뉴스 목록 (/news)
## 뉴스 상세 (/news/:id)
## 갤러리 (/gallery)
## 고객센터 (/contact)
