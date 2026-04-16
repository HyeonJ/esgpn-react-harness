# Q2 — G1 < 5% PASS가 실제 유지보수성에 얼마나 기여했나?

> 측정일: 2026-04-16
> 데이터 소스: `git log --all` (89 커밋) + `docs/redefine/structure-report.csv`
> 작성 원칙: 1막 §5 "숫자 + 3줄 해석". Q1에서 받은 Gemini 리뷰 교훈 반영 — 임계값/정규화/교란변수 caveat 명시.

---

## 0. 핵심 결론 (TL;DR)

- **직접 rework**: 39 섹션 중 5섹션만 비-초기 commit 보유. 압도적 outlier는 **`main-hero` 8 commits**(2 revert 포함) — 전부 G1 chase.
- **Cross-cutting rework 비용은 G1이 아니라 `absolute_count`에 강하게 비례.** 반응형 iter 한 번에 `MainIntro`(abs 22)는 60+ 라인 재작성, About사이드 만성염증(abs ≤ 6)은 0~1 라인.
- 즉 **"G1 < 5% PASS = 유지보수 OK"는 거짓.** 게이트는 직접 rework은 줄였지만 (a) G1 chase 자체에 sunk cost를 만들고 (b) 미래 변경 비용(absolute_count로 측정되는)에는 무력했다.
- **유일한 양성 효과**: G1 PASS 게이트가 평균적으로 "통과 후 안 만짐" 상태를 만든 건 사실. 단, 그게 "잘 만들어졌기 때문"인지 "회귀 무서워서 안 만진 것"인지는 데이터로 구분 불가 — Caveat.

---

## 1. 측정 방법

1. `git log --all --pretty="%H|%s"` 89 커밋 전수 분석.
2. 커밋 분류:
   - **초기 구현 (initial)**: `feat(section): X 구현` / `feat: X 섹션` 패턴
   - **직접 rework**: `fix(X)` 또는 X 섹션명 명시 commit (initial 이후)
   - **Cross-cutting**: 여러 섹션 동시 수정 (responsive/width-a/header clearance)
3. 각 cross-cutting commit에 대해 **변경 라인 수**를 섹션별로 카운트 (작은 1-라인 패턴 변경 vs 60+ 라인 재구성).
4. G1 / structure score와 교차 분석.

**한계 (Caveat)**:
- Commit 단위 측정은 작업 단위와 정확히 일치하지 않음. 한 commit이 여러 작업 묶을 수도 있고, 한 작업이 여러 commit으로 쪼개질 수도.
- "rework이 적다"가 "잘 만들어졌다"인지 "건드릴 일이 없었다"인지 구분 불가 (생존 편향).

---

## 2. 직접 rework 분포

| 섹션 | 직접 rework commits | G1 | 구조점수 (정규화) | 비고 |
|---|---|---|---|---|
| **MainHero** | **8** (4b55849, 43f8b2e, f3a92da, b29b80e, 61d85f4, 4e35fd4, 8c2e788, 29cb174) | 2.24% | **0** (건강) | 압도적 outlier. 7 commits가 icon 배경 제거 시도 (chroma-key/luma/rembg) |
| ContestBenefits | 2 (35882ca, 29cb174) | 6.71% ⚠ | 0 | CTA 위치 보정 + T-002 raster 리팩터 |
| ContactForm | 1 (3f75df8) | 4.01% | 0 | padding 누락 사후 보정 |
| GalleryAgreements | 1 (b2567b7) | 5.72% ⚠ | 0 | 1차 wip → 2차 baseline 교체 |
| About사이드 8섹션 | 0~1 (1b9fecb 그룹) | 다양 | 다양 | Header clearance 한 번에 묶음 |
| **5 만성염증 섹션** | **0** (개별) | <5% | **3~4 (망가짐)** | passed once, untouched |

**주요 발견 1**: `MainHero`의 8 commits 중 2개가 revert (43f8b2e 다음 f3a92da, b29b80e 다음 61d85f4). **명시적 wasted work 4 commits 분량.** 모두 G1 8.07% → 5%대로 끌어내리려는 icon 배경 제거 실험.

**주요 발견 2**: 만성염증 5섹션(MainGallery/MainNews/OrgChart/AboutMission/AboutValues)은 직접 rework 0건. **G1 PASS 후 손대지 않음 = 부채는 잠복**.

---

## 3. Cross-cutting rework — 변경 라인 수로 본 비용

반응형 iter (5 commits) + width-a (3 commits) + header clearance (2 commits) = 10 cross-cutting commits.

### 3.1 가장 비싼 cross-cutting: `e6c1d03` (메인 auto-fit v2)

| 섹션 | 변경 라인 | abs (구조 CSV) | 해석 |
|---|---|---|---|
| **MainIntro/IntroLeftColumn** | **59** | 22 | absolute 본문을 flex로 decouple. 60줄 중 사실상 재작성 |
| MainStats | 27 | 10 | EsgDiagram 17 + MainStats 27 = 44 라인 |
| MainGallery/GalleryCard | 2 | 16 | raster 위주라 layout 영향 적음 |
| MainHero | 2 | 2 | 거의 무영향 |
| MainNews/NewsCard | 4 | 15 | 비교적 적음 (내부 구조 단순) |

**핵심 상관**: `MainIntro`는 Q1에서 token_ratio 0.667(모범)이지만 absolute_count 22(최악) 양극단 사례. 반응형 iter에서 가장 큰 비용 발생. **token 잘 써도 absolute 많으면 미래 비용은 폭발.**

### 3.2 가장 싼 cross-cutting: `4c05e90` (width-a 컨테이너 패턴)

23 섹션 동시 수정, **각 1~4 라인** (`<section className="...">` 패턴 일괄 교체). 토큰화된 패턴이라 비용 균등 분산.

→ 시사점: **반복 가능한 패턴(컨테이너 wrapper)은 cross-cutting이라도 싸다.** 비싼 건 절대좌표 같은 1회성 박제.

### 3.3 변경 라인 수 vs absolute_count 상관

| absolute_count 구간 | cross-cutting 평균 변경 라인 |
|---|---|
| 0~5 | ~2 |
| 6~10 | ~10 |
| 11~16 (MainGallery/News) | ~5 (raster heavy로 보호받음) |
| 22 (MainIntro 단독) | 60 |

**해석**: absolute가 많고 + 동적 콘텐츠(이미지가 아닌 텍스트/SVG 위주)가 결합하면 미래 비용 폭발. raster 위주(MainGallery/News)는 absolute 많아도 layout 자체가 "그림 한 장"이라 변경 비용은 의외로 낮음.

> **⚠ 가짜 유지보수성 경고**: 위 raster shield 효과는 "유지보수가 잘 됐다"가 아니라 **"텍스트가 이미지로 박제되어 수정 자체를 포기한 것"**. philosophy.md §2 "텍스트는 텍스트로" 원칙 위반. 변경 비용 0은 비용 회피가 아니라 **변경 가능성을 사전 차단한 결과**. 진짜 디자인 변경(이미지 자체 교체)이 들어오면 raster 재요청 + 재export 사이클로 폭발. 비용을 디자이너 쪽에 전가한 셈.

---

## 4. G1 vs 평균 rework 비용 비교

### 4.1 직접 rework

| G1 구간 | 섹션 수 | 직접 rework commits 평균 |
|---|---|---|
| < 3% | 9 | **0.89** (MainHero 8/9 = 단독으로 평균 끌어올림) |
| 3~5% | 22 | 0.05 (1 commit / ContactForm 단독) |
| ≥ 5% (완화) | 8 | 0.50 (ContestBenefits 2 + GalleryAgreements 1 + 기타) |

**해석**: G1 < 3% 그룹의 평균이 **MainHero outlier 때문에** 가장 높음. MainHero 제외하면 0.0. 이는 "G1 강박이 sunk cost를 만든다"의 정량 증거.

### 4.2 Cross-cutting 변경 라인 (반응형 iter 합계)

| G1 구간 | 평균 라인 수 |
|---|---|
| < 5% | ~8.5 (MainIntro 60 outlier 제외시 ~3.5) |
| ≥ 5% | ~3.0 |

**G1과 cross-cutting 비용은 약한 음의 상관 또는 무상관.** G1을 잘 맞췄다고 미래 변경 비용이 줄지 않음.

### 4.3 absolute_count vs cross-cutting 변경 라인

| abs 구간 | 평균 라인 수 |
|---|---|
| 0~5 | ~2 |
| 6~10 | ~10 |
| ≥ 11 | ~12 (raster 보호 효과 포함 시 평균이 낮아 보임) |

**absolute_count는 G1보다 미래 변경 비용을 더 잘 예측**. 이는 Q1 §6의 "absolute/file ≤ 5 → 2.5 → 2 단계적 게이트" 제안의 정량 근거.

---

## 5. 수정 비용이 컸던 섹션의 공통점

1. **G1 chase에 빠진 섹션** (MainHero) — 게이트가 직접 만든 sunk cost.
2. **absolute + 텍스트/SVG 콘텐츠 결합** (MainIntro, MainStats) — 반응형 도래 시 본문 decouple 필요해 비용 폭발.
3. **Composite raster 채택 섹션** (T-001 MainHero, T-002 ContestBenefits CTA) — 사후에 텍스트/접근성 회복 필요. 큰 리팩터(29cb174) 발생.

**공통점 없음**(즉 비싸지 않은 케이스):
- About사이드 만성염증(OrgChart/Mission/Values) — passed once, 안 만짐. 미래 비용은 잠복 중이라 측정 불가. **데이터의 한계**.

---

## 6. Caveat — 측정의 한계

1. **생존 편향**: "rework 0건"이 "건강해서"인지 "건드릴 일이 안 와서"인지 구분 불가. About사이드 만성염증은 반응형 iter가 아직 안 도달함 (실제로 1막에서 반응형은 메인페이지 위주). 2막에 About 페이지 반응형 도래 시 비용 발생할 가능성 높음.
2. **Commit 단위 ≠ 작업 단위**: 한 commit에 여러 작업 묶이거나 쪼개진 경우 카운트 왜곡.
3. **변경 라인 수의 한계**: 1줄 변경이라도 의미가 큰 변경(예: 핵심 alignment 수정) 있고, 60줄이라도 단순 swap일 수도. 라인 수는 1차 근사.
4. **교란변수**: 섹션 복잡도(파일 수, DOM 노드 수)가 cross-cutting 비용에 영향. Q1 Gemini 지적 사항과 동일 — 2막 후속 분석 이연.

---

## 7. 2막 시사점

1. **`absolute_count`는 미래 변경 비용의 강한 예측 변수.** Q1에서 제안한 "absolute/file ≤ 5 → 2.5 → 2 단계적 게이트"가 실측 비용으로 뒷받침됨.
2. **G1 < 5% 게이트의 직접적 ROI는 음수 (적어도 MainHero 사례는)**. 8 commits + 2 revert = 약 1주 작업이 "G1 8.07% → 5.47%"로 끌어내리는 데 소비. 동일 시간을 구조 개선에 썼다면 5섹션 만성염증 중 1~2개 리팩터 가능했을 시간.
3. **Composite raster 안티패턴은 사후 리팩터가 필연 (29cb174)**. 처음부터 G6 차단 게이트로 막는 게 비용 효율적.
4. **About사이드 만성염증에 대한 2막 우선순위 결정**: 반응형 iter가 도달하기 전에 선제 리팩터 vs 도래 후 대응. 비용은 비슷하나 선제가 risk 낮음.

---

## 변경 이력

| 날짜 | 내용 |
|---|---|
| 2026-04-16 | 초안 작성. Q1 Gemini 리뷰 교훈(임계값 caveat, 정규화 시도, 교란변수 명시) 선제 반영. |
| 2026-04-16 | Batch 리뷰 반영. §3.3 raster shield의 "가짜 유지보수성" 경고 추가 (philosophy "텍스트는 텍스트로" 환기). |
