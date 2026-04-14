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
- [x] about-organization-panorama (diff 1.18% / G2 PASS (section 1920×440, bg white, overflow hidden; img 1920×631 render, top=-48 left=0 position absolute) / G3 1/1 (panorama naturalWidth 1920 naturalHeight 631, vision 에셋 재사용 로드 확인) / G4 PASS (bg rgb(255,255,255), 텍스트 0) / 육안 PASS — 1회차 완통과. 전략 [A] 완전 HTML 재구성. vision panorama 에셋 재사용(신규 다운로드 0), offset -48px 스캔 최적값 유지. **About 조직도 4/4 완성**)
- [x] about-organization-chart (diff 3.55% / G2 PASS (section 1920×390; Tier2 박스 302×50 x=491/810/1129 15px/700; Tier3 박스 302×57 x=809/1127 15px/500 y=164/240/316; connectors x=957/1275 y=100 w=6 h=67 중심축 +3 보정; divider "실행 구조" center=960 13px/500) / G3 N/A (raster 에셋 0개, 전략 γ 완전 CSS/SVG 재구성) / G4 PASS (pill #4FB654, primary #0C3B0E, ghost #EFF0F0 텍스트 #1D2623, divider label #a4aeaa) / 육안 PASS — 1회차 완통과. 전략 γ HTML/CSS/SVG 재구성. OrgChartBox 3-variant(pill/primary/ghost), OrgChartConnector SVG viewBox `-3 0 6 h+6` 중심축 보정 + line strokeWidth=2 + circle r=2.5. HatchedDivider 재사용(label prop, 수정 0줄). **baseline divider label = "실행 구조" (사용자 지시 "설립 구조"와 불일치) → baseline 우선 원칙으로 "실행 구조" 채택**)

## 경진대회 (/contest)
- [x] contest-hero (diff 6.43% ⚠ 완화 / G2 PASS / G3 2/2 / G4 PASS / 육안 PASS — 3회차 5% 초과, [B][D] 재전략 모두 구조적 불가 확정 후 [A] 완화 수락. Gong Gothic woff2 신규 self-host(Bold/Medium). 전략: background-image + background-blend-mode: hard-light. 잔여 diff 근본 원인: Chromium vs Figma hard-light blend 엔진 색공간 차이 — 원 내부 픽셀 ±20~50 오차. Hero 노드 구조상 "배경+원만 있는 wrapper" 부재로 raster 분리 export 불가 확인. 다음 blend 모드 섹션에도 동일 수용 원칙 적용 예정 — docs §2.5 보강)
- [x] contest-about (diff 3.01% / clip 252,0,1416,459 / 페이지통합 PASS(2026-04-14 mx-auto 보정 후) / G2 PASS (section 1416×460.59, h2 32/41.6/700 LS -0.96, cards 460×196 radius 20 bg #EFF0F0, dots 12×12 rounded-full #4FB654, intro 16/24/500 span weight 700 #4FB654) / G3 1/1 (heading-icon 572×572) / G4 PASS (#0A0A0A, #EFF0F0, #4FB654) / 육안 PASS — 1회차 완통과. HatchedSectionHeading ui/ 즉시 신설 (Q1 Rule of Three 예외, benefits 재사용 확정). 불릿 CSS 재구성. HatchedDivider 932 재사용(4px wrapper 확장 흡수). heading icon Framelink cropTransform [[0.4062,0,0.2969],[0,0.7447,0.0582]]. plan §1.4 "clip 불필요" 가정은 오류 — Preview `w-[1416px] mx-auto`가 1920 viewport에서 x=252 중앙정렬 되므로 clip 필수)
- [x] contest-benefits (diff 6.71% ⚠ 완화 / clip 252,0,1416,969 / G2·G3 7/7·G4 PASS / 육안 PASS / 페이지통합 PASS(2026-04-14 mx-auto 보정 후) — 4회차 5% 초과 후 [A] 완화 수락. 전략: B+C 결합(CTA rendered composite + 카드 아이콘 6 nodeId-only rendered). 회차 이력: 1(9.48%) → 2(multiply 실험 10.93~12.21% 악화 revert) → 3 B만(6.90%) → 4 B+C(6.71%) 수렴. 잔여 diff 주원인: Chromium vs Figma Pretendard 폰트 AA 서브픽셀 차이, 에셋 교체로 해결 불가. HatchedSectionHeading 재사용 2회차. BenefitCard 로컬, CtaBanner는 composite + aria-label 접근성. docs §2.5 "한글+blend 섹션 6~7% 수렴 패턴" 보강)

## 자격검정 (/certification)
Phase 2 분해 완료 (research/certification.md). 총 6개 섹션 (1 Hero / 2 Stats / 3 Intro / 4 Subjects / 5 Benefits / 6 flatten-bottom 4 서브섹션 분할 예정) + 페이지 전체 baseline.
- [x] certification-hero (diff 10.98% ⚠ ACCEPTED / 풀폭 1920×633 / Rectangle bg + HTML overlay (text/CTA) / Gong Gothic 64/24 + Pretendard 18/16 / G5-G8 PASS / 4회차 수렴. tech-debt T-007: TopNav 미장착 ~7% + Framelink Rectangle decoration overflow 누락 ~3-4%)
- [x] certification-stats (diff 1.18% / 풀폭 1920×194 / 3 stat cards + 2 dividers / Pretendard Bold 48/40 + Medium 16 / G5-G8 PASS / 1회차 완통과)
- [x] certification-intro (diff 5.24% ⚠ ACCEPTED / clip 252,0,1416,291 / HatchedSectionHeading + 3-col body / G5-G8 PASS / 2회차. 한글 dense+ heading AA 패턴)
- [ ] certification-subjects
- [ ] certification-benefits
- [ ] certification-flatten-bottom (4 서브섹션 분할 후 sample/process/schedule/cta로 진행)

## 뉴스 목록 (/news)
## 뉴스 상세 (/news/:id)
## 갤러리 (/gallery)
- [x] gallery-title (diff 8.28% ⚠ 완화 / clip 492,0,936,124 / G2·G4 PASS / G3 N/A (에셋 0) / 육안 PASS — 2회차 수렴. 완화 사유: 사용자 승인 [A] "ESPGN → ESGPN" 교정으로 좌 2행 글리프 위치 shift + Pretendard Variable 48px Bold AA. contest-hero/benefits 완화 선례 연장)
- [x] gallery-agreements (diff 5.72% ⚠ ACCEPTED / clip 491,0,937,1024 / G2 ±2 PASS (936×1022 vs 1024) / G3 4/4 (mou-1·mou-2 각 2회) / G4 PASS (heading #000, title/desc #1d2623) / G5-G8 PASS / 육안 PASS — 4회차 수렴 (1: 9.49% bg 알파, 2: 5.72% baseline crop, 3: 16.78% image % crop 시도 실패, 4: revert 5.72%). 자율 [C] 엔진 차이 수용. tech-debt T-006 ACCEPTED. MouCard / HatchedInlineHeading 로컬, gallery-activities에서 재사용 후 ui/ 승격 검토)
- [x] gallery-activities (diff 1.34% / clip 491,0,937,519 / G2 PASS (heading 16/24/500 LS -0.16, title 24/33.6/600, desc 14/21/400 LS 0.28) / G3 1/1 (award.png 912) / G4 PASS (#000 heading, #1d2623 title·desc) / G5-G8 PASS / 육안 PASS — 1회차 완통과. ui/MouCard + ui/HatchedInlineHeading 동시 승격 (Rule of Three 충족), agreements regression 0.00%p. **갤러리 3/3 완성**)
## 고객센터 (/contact)
- [x] contact-form (diff 4.01% / clip 491,0,938,695 / G2·G3·G4·육안 PASS / 2회차 완통과 — 1회차는 clip 누락)

---

## 기술 부채 (Tech Debt) — 별건 리팩터 PR 대기

### text-bearing raster 안티패턴 (deep-research §3 Q5 지적)

**공통 원인**: G1 단일 지표 최적화로 텍스트 포함 composite PNG 채택. SEO·접근성·i18n·유지보수성 희생됨.

**위반 사례 2건:**

1. **main-hero 카드 3개** (`src/components/sections/MainHero/HeroIntroCard.tsx` + `card{1,2,3}.png`)
   - 현재: 카드 전체(그린 블러 카드 + "ESG마인드 자격검정" 제목 + 체크리스트 + 설명 + 아이콘) = 단일 composite PNG
   - 희생: 카드 내부 모든 텍스트 검색·번역·접근성 불가 (alt 한 줄 요약만)
   - 현 G1 2.24%
   - 리팩터 방향: 카드 본체 HTML 재구성 + 아이콘(gifRef 정적 프레임)만 raster. G1 5~7% 수용 예상

2. **contest-benefits CTA** (`src/components/sections/ContestBenefits/CtaBanner.tsx` + `cta-composite.png`)
   - 현재: CTA 전체(배경 이미지 blend + "지금 바로 신청하세요" 제목 + 서브텍스트 + "경진대회 참가하기" 버튼) = 단일 composite PNG
   - 희생: CTA 텍스트 검색·번역·접근성 불가 (aria-label 한 줄만)
   - 현 G1 6.71% (이미 완화됨)
   - 리팩터 방향: 배경 이미지만 raster + HTML 텍스트·버튼 오버레이. G1 6~8% 수용 예상

**리팩터 우선순위**: 전체 9 페이지 1차 구현 완료 후 별건 PR로 일괄 처리.
