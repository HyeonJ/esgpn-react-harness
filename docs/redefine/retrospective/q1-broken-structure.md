# Q1 — 픽셀 <5%인데 구조가 망가진 섹션은?

> 측정일: 2026-04-16
> 데이터 소스: `docs/redefine/structure-report.csv` (39 섹션) + `PROGRESS.md` (G1 수치)
> 작성 원칙: 광역 정의(philosophy.md §2 "편집 가능" 5요소)로 재해석 — text-raster 1요소만으로는 1막 회고 목적에 부족하다고 판단

---

## 0. 핵심 결론 (TL;DR)

- **좁은 정의(text-raster) → 자동 측정 0건.** 휴리스틱 사각지대(alt < 80자) 존재하나 알려진 위반 2건은 코드 직접 읽어 v3 리팩터 완료 확인 (§2 참조).
- **넓은 정의(philosophy 5요소 종합) → 광범위.** 30/39(77%)가 디자인 토큰 0개. 평균 마법 숫자 14.6개. 평균 시맨틱 태그 1.87종.
- **"겉 멀쩡 / 속 만성염증" 5섹션 식별** (per-file 정규화 후): MainGallery, MainNews, AboutOrganizationChart, AboutMission, AboutValues. G1 < 5% PASS인데 구조 망가짐 ≥ 3점.
- 즉 **"G1 < 5%" 게이트는 골절(text-raster)은 막았으나 만성염증(token/semantic/absolute)은 못 막았다.**
- 이는 2막 게이트 재설계 시 **token_ratio·semantic_score·absolute/file을 차단 게이트로 단계적 승격**해야 한다는 정량 근거 (§6 단계 표 참조).

---

## 1. 두 정의의 분리

`philosophy.md §2`의 "편집 가능" 5요소 ↔ 측정 지표 매핑:

| philosophy 5요소 | 측정 지표 | 정의 분류 |
|---|---|---|
| 시맨틱 HTML | `semantic_score` | (b) |
| 디자인 토큰 참조 | `token_ratio` | (b) |
| **텍스트는 텍스트로** | **`text_raster_flag`** | **(a)** |
| 반응형 가능 구조 | `absolute_count` (역지표) | (b) |
| 리팩터 가능 계층 | `magic_number_count` (역지표) | (b) |

(a)는 1요소만 본다 → 골절(이진). (b)는 4요소를 본다 → 만성염증(연속). 둘은 다른 병이고 둘 다 측정해야 한다.

---

## 2. 좁은 정의 결과 — text-raster

- **자동 측정: 39/39 PASS.** 단, **휴리스틱에 명백한 사각지대 존재** — 아래 경고 참조.
- 휴리스틱 (`scripts/check-structure-quality.mjs:131`): `img≥1 ∧ alt 총합≥80 ∧ jsx_text < alt/2`
- **사각지대**: 텍스트가 박힌 composite PNG를 넣고 alt를 빈/짧게(< 80자) 적으면 통과. 즉 가장 흔한 안티패턴(alt 무성의)을 못 잡음. 자동 측정값 0은 "위반 없음"이 아니라 **"휴리스틱이 잡을 수 있는 위반 없음"**.
- **수동 보완 검증** (코드 직접 읽음): 과거 위반으로 식별됐던 2건은 v3 리팩터 완료 확인.
  - `src/components/sections/MainHero/HeroIntroCard.tsx:14-32` — 주석 "T-001 리팩터 (v3)" + 코드 본문 HTML + leaf icon 구조 확인
  - `src/components/sections/ContestBenefits/CtaBanner.tsx:7-13` — 주석 "T-002 리팩터 (v3)" + 코드 본문 bg/blend/HTML 분리 구조 확인
- **PROGRESS.md L77~98 tech-debt 섹션은 stale.** 별건 PR로 RESOLVED 표기 필요.
- **2막 후속 작업**: 휴리스틱 보강 — `img_count ≥ 1 ∧ jsx_text_chars == 0 ∧ 파일명에 card/cta/hero/banner` 같은 alt-독립 시그널 추가. 보강 후 전수 재측정 필요.

---

## 3. 넓은 정의 결과 — token / semantic / absolute / magic

### 3.1 token_ratio 분포 (디자인 토큰 참조율)

| 구간 | 섹션 수 | 비율 |
|---|---|---|
| 0.0 (토큰 0개) | 30 | 77% |
| 0.2 ~ 0.67 | 5 | 13% |
| 0.82 ~ 1.0 | 4 | 10% |

**평균 0.13** = 전체 "수치/색상 결정"의 87%가 마법 숫자, 13%만 토큰 참조.

token_ratio 1.0인 4섹션(`ContestHero`, `MainPrograms`, `MainProgramsHeader`, `MainPrograms`)도 사실 magic_number 분모가 작아서(0~2) 발생한 비율 환상 — **"토큰 잘 쓴 모범"이 아니라 "코드량 자체가 적음"**. 진짜 모범은 `MainIntro (0.667, magic 14 / token 28)`, `MainStats (0.605, magic 17 / token 26)` 둘뿐.

### 3.2 magic_number_count 상위 10

| 섹션 | magic | token | G1 |
|---|---|---|---|
| MainGallery | 77 | 0 | 4.05% |
| MainNews | 77 | 0 | 4.60% |
| ContactForm | 38 | 0 | 4.01% |
| AboutOrganizationChart | 36 | 0 | 3.55% |
| AboutMission | 32 | 0 | 4.23% |
| NewsFeatured | 22 | 0 | 6.63% ⚠ |
| MainHero | 21 | 12 | 2.24% |
| NewsList | 21 | 0 | 20.37% ⚠ |
| NewsDetailArticle | 19 | 0 | 4.27% |
| AboutValues | 18 | 0 | 4.28% |

**관찰**: G1 < 5% PASS 섹션 다수가 magic_number 20~80개 보유. 즉 **G1 게이트는 마법 숫자 폭발을 전혀 견제하지 못했다.**

### 3.3 semantic_score 분포

| 점수 (시맨틱 태그 종 수) | 섹션 수 | 비율 |
|---|---|---|
| 1 | 18 | 46% |
| 2 | 12 | 31% |
| 3 | 7 | 18% |
| 4~5 | 2 | 5% |

**46%가 단일 시맨틱 태그(대개 `<section>` 하나)** — heading 위계, `<nav>`, `<article>`, `<button>` 등 부재. 평균 1.87.

### 3.4 absolute_count 상위 5 (반응형 적대)

| 섹션 | absolute | G1 |
|---|---|---|
| MainIntro | 22 | 2.36% |
| MainGallery | 16 | 4.05% |
| MainNews | 15 | 4.60% |
| MainStats | 10 | 1.92% |
| MainProgramsCard1 | 7 | 2.67% |

`MainIntro`는 token 28개로 모범 사례인데 동시에 absolute 22개로 반응형 최악 — **단일 지표로는 못 잡는 트레이드오프 사례.**

---

## 4. 종합 판정 — 망가짐 매트릭스 (정규화 적용)

> **선행 교훈**: 1차 매트릭스는 절대 개수(`magic ≥ 20`, `abs ≥ 5`)로 채점했으나, 이는 **섹션 크기에 비례해 부풀려진다** (파일 7개인 `MainGallery`와 1개인 `AboutVision`을 동일 절대치로 비교는 불공정). 아래는 **per-file 정규화** 후 재채점 결과.

각 섹션 채점 기준:
- **MAGIC**: magic_number / files ≥ 10 → 1점 (1차 ≥ 20 → 정규화)
- **NO_TOKEN**: token_ratio < 0.1 → 1점 (비율이라 정규화 불요)
- **THIN_SEMANTIC**: semantic_score ≤ 2 → 1점 (DOM 종 수, 크기에 약하게 비례하므로 절대치 유지)
- **ABSOLUTE_HEAVY**: absolute_count / files ≥ 2.5 → 1점 (1차 ≥ 5 → 정규화)

**"구조 망가짐 점수" = 0~4점.** 3점 이상이면 "G1 PASS인데 구조 망가짐" 후보.

### 정규화 후 3점 이상 + G1 < 5% PASS (= "겉은 멀쩡, 속은 만성염증")

| 섹션 | G1 | files | magic/file | abs/file | NO_TOKEN | THIN_SEM | 합 |
|---|---|---|---|---|---|---|---|
| MainGallery | 4.05% | 7 | 11.0 ✓ | 2.3 | 1 | 1 | **3** |
| MainNews | 4.60% | 5 | 15.4 ✓ | 3.0 ✓ | 1 | 1 | **4** |
| AboutOrganizationChart | 3.55% | 3 | 12.0 ✓ | 2.0 | 1 | 1 | **3** |
| AboutMission | 4.23% | 1 | 32.0 ✓ | 5.0 ✓ | 1 | 1 | **4** |
| AboutValues | 4.28% | 2 | 9.0 | 3.0 ✓ | 1 | 1 | **3** |

### 1차에서 ≥3점이었으나 정규화로 탈락 (= 부당하게 표집된 케이스)

| 섹션 | G1 | files | magic/file | abs/file | 1차 점수 | 정규화 후 |
|---|---|---|---|---|---|---|
| MainProgramsCard1 | 2.67% | 4 | 1.0 | 1.75 | 3 | 2 |
| MainProgramsCard3 | 4.55% | 4 | 0.5 | 1.25 | 3 | 2 |

**해석**: ProgramCard ui 컴포넌트로 분리·조립한 덕에 파일이 4개로 늘었고, 그 결과 절대 개수만 보면 abs ≥ 5에 걸렸지만 **파일당으로 보면 평균 이하**. 즉 **공통화 리팩터가 절대치 매트릭스를 속였던 것**. 정규화로 정정.

### 1차 누락 → 정규화 후 신규 발견

없음. 정규화는 기존 식별을 정정만 하고 새 케이스를 추가하지는 않았다.

→ **최종 "겉 멀쩡 / 속 만성염증" = 5섹션** (1차 6 → 정규화 5).
이들이 1막의 **진짜 발견**. G1 게이트로는 잡지 못한 만성염증 환자들.

### Caveat — 매트릭스 단순 합산의 함정

> **단, 매트릭스 총점이 낮아도 단일 지표가 극단적이면 실제 유지보수 비용은 폭발한다.**
> 예: `MainIntro`는 token_ratio 0.667(모범)·magic 14(보통)·semantic 2로 총점 2점에 그쳐 매트릭스에서 빠졌으나, **Q2의 실측 cross-cutting 비용에서는 단일 섹션 최다 라인(60줄) 재작성 outlier**. 원인은 `absolute 22개`라는 단일 극단치. 4지표 합산이 이를 희석했다. 2막 게이트 설계 시 단일 지표 hard cap 필요.

### Caveat — 측정의 한계

- **교란변수(UI 복잡도) 통제 부재**. files/magic/abs 모두 "복잡한 섹션이라 어쩔 수 없다"는 가능성을 완전히 배제하지 못함. 정규화는 1차 근사일 뿐이고, 진정한 통제는 "DOM 노드 수 / 디자인 복잡도 점수" 같은 별도 메트릭이 필요. → **2막 후속 분석으로 이연.**
- **임계값(magic/file ≥ 10, abs/file ≥ 2.5)은 39섹션 분포의 ~75th percentile** 부근으로 잡았다. 다른 데이터셋(다른 프로젝트)에서는 재검정 필요.

---

## 4.5 왜 "만성염증"인가 — 사례 + 변경 시나리오

> "겉 멀쩡 / 속 만성염증" 비유를 데이터로 풀어본다.
> **G1은 결과물(픽셀)을 보고, 만성염증 지표는 과정(코드 구조)을 본다.** 같은 픽셀을 만드는 방법이 무한해서, G1 PASS만으로는 둘을 구별 못한다.

### 사례 — `AboutOrganizationChart` (4/4점, 가장 극단)

```tsx
<section className="relative max-w-[1920px] w-full h-[390px] bg-white mx-auto">
  <div className="absolute top-0 left-1/2 -translate-x-1/2"><HatchedDivider /></div>
  <div className="absolute top-[50px] left-[491px] flex gap-[17px]">...</div>
  <div className="absolute top-[100px] left-[957px]">...</div>
  <div className="absolute top-[100px] left-[1275px]">...</div>
  <div className="absolute top-[164px] left-[809px] flex flex-col gap-[19px]">...</div>
  <div className="absolute top-[164px] left-[1127px] flex flex-col gap-[19px]">...</div>
</section>
```

증상: magic 36 / token 0 / abs 6 / `<section>` 단일 시맨틱. **9개 박스가 모두 raw 좌표로 박혀 있고, 트리 구조라는 의미가 코드에 없다.**

### 변경 시나리오 — 비용 비교

| 디자이너 요청 | 건강한 코드 (`<ul><li>` flex) | 현 코드 (absolute 좌표) |
|---|---|---|
| **Tier 2에 박스 1개 추가** | `<li>` 1줄 추가, 끝 | left=491/810/1129 재계산 + connector x좌표 재계산 + 시각 회귀 |
| **768px 모바일 세로 stack** | `flex-row md:flex-col` 1줄 | absolute 6개 좌표 폐기 → flex 재구성 → top 좌표 폐기 → **사실상 재작성** |
| **전 사이트 gap 16→20 통일** | `--space-4` 토큰 1줄 | `gap-[17px]` 검색에 안 잡힘 (16과 다름) → 39섹션 × 14.6 마법숫자 = **~570번 사람 판단** |

**핵심**: 세 요청 모두 발주처가 흔히 던지는 "사소한 수정". 건강한 코드는 분~시간 단위, 현 코드는 일~주 단위. 이게 **만성염증의 실체**.

### 다른 4섹션 — 1줄 요약 (정규화 후 5섹션 중 OrgChart 제외)

| 섹션 | 핵심 증상 (정규화) | 변경 취약 지점 |
|---|---|---|
| MainGallery | magic 11.0/file · abs 2.3/file — 픽셀 박제 끝판 | 좌우 padding·카드 추가·반응형 모두 고비용 |
| MainNews | magic 15.4/file · abs 3.0/file — 동일 패턴 | 동일 |
| AboutMission | magic 32.0/file · abs 5.0/file (단일 파일) | 사진 교체 시 좌표 재계산, 분할 리팩터 우선 후보 |
| AboutValues | abs 3.0/file · semantic 2 | 4개 value 카드 재배열·추가 시 좌표 재계산 |

### 공통 원인 (가설)

Figma `get_design_context` 출력의 **absolute 좌표를 의미 추론 없이 그대로 코드로 옮긴 것**.

- design_context는 디자인 도구의 상대좌표 모델이라, flex/grid 의도가 명시되지 않으면 `(491,50)/(810,50)/(1129,50)` 같은 좌표 매트릭스로만 표현됨.
- 디자이너 의도가 "Tier 2 가로 3개 균등배치"였어도 코드는 그걸 모름.
- **AI(나)가 좌표를 받아 적기만 하고 `<ul class="flex justify-between">`로 의미를 복원하는 단계가 없었다** → 1막의 가장 큰 시스템적 결함.

→ 2막 게이트 신설 시 **"absolute_count ≤ 3" 같은 hard cap**으로 강제 의미 추론을 유도해야 함. 픽셀이 비슷해도 `absolute` 좌표 매트릭스면 자동 반려.

---

## 5. 가설 검증 — G1 vs 구조 지표 상관관계

| G1 구간 | 섹션 수 | 평균 magic | 평균 token_ratio | 평균 semantic |
|---|---|---|---|---|
| < 3% | 9 | 11.6 | 0.27 | 2.0 |
| 3~5% | 22 | 16.5 | 0.10 | 1.9 |
| ≥ 5% (완화) | 8 | 9.0 | 0.13 | 2.5 |

**관찰**:
- G1 < 3% 그룹의 token_ratio가 가장 높은데(0.27), 이는 `MainPrograms`/`MainStats`/`MainProgramsHeader`처럼 코드량 적은 단순 섹션이 우연히 분모 작아서 그런 것.
- G1 < 5% 그룹이 magic_number는 최고(16.5) — **"픽셀 맞추려 마법 숫자 박았다"는 가설을 약하게 지지.**
- semantic_score는 G1 구간과 거의 무관 (1.9~2.5) — 구조 결정은 G1과 독립적으로 이루어짐.

**결론**: G1 최소화가 구조 품질에 **직접적인 악영향은 약하지만**, 적어도 **"G1 PASS = 구조 OK"가 거짓**이라는 것은 명확히 입증.

---

## 6. 2막 시사점

1. **차단 게이트 승격 후보 — 단계적 도입**:
   현 평균(token_ratio 0.13, magic 14.6, semantic 1.87)에서 한 번에 점프하면 2막 작업 마비. 1막→2막→3막 단계적 목표:
   | 지표 | 1차 (2막 진입) | 2차 (2막 중반) | 3차 (3막) |
   |---|---|---|---|
   | token_ratio | ≥ 0.2 | ≥ 0.3 | ≥ 0.4 |
   | semantic_score | ≥ 2 | ≥ 2 | ≥ 3 |
   | absolute/file | ≤ 5 | ≤ 3 | ≤ 2 |
2. **개수 cap 대신 속성 기반 규칙** — `magic_number_count ≤ N` 같은 절대 cap은 복잡한 그리드에서 달성 불가. 대신 **"색상·폰트사이즈는 토큰 강제, 간격·치수는 magic 허용"** 같은 속성별 규칙으로 전환. linter로 자동 검출 가능.
3. **2막 First-batch 리팩터 타겟 (Q1·Q2·Q3 통합 제안)**: `MainIntro` (Q2 실측 비용 1위, abs 22) + `AboutMission` (Q1 만성염증 극단, magic 32/file·abs 5/file 단일 파일). **이 2개로 압축**해 실행. 나머지 3 만성염증(MainGallery/MainNews/AboutOrganizationChart/AboutValues)은 first-batch 결과 평가 후 second-batch 결정.
4. **휴리스틱 보강 작업** (2막 초입):
   - text-raster: alt-독립 시그널 추가 (§2 참조)
   - 정규화 임계값 재검정: 다른 프로젝트 데이터 들어오면 percentile 재계산
5. **교란변수 통제 분석** — UI 복잡도(DOM 노드 수 등) 메트릭 추가 후 Q1·Q3 재집계. 2막 후속 분석.
6. **PROGRESS.md tech-debt 섹션 갱신** — T-001/T-002 RESOLVED 표기 (별건 PR).

---

## 변경 이력

| 날짜 | 내용 |
|---|---|
| 2026-04-16 | 초안 작성. text-raster 0건 발견 후 광역 정의로 재해석. 구조 망가짐 매트릭스 도입. |
| 2026-04-16 | Gemini 리뷰 반영(b안). 변경: (1) text-raster 휴리스틱 한계 명시 + 수동 검증 표기, (2) §4 매트릭스 per-file 정규화 (6→5섹션, ProgramCard 1·3 부당 표집 정정), (3) §6 게이트 단계적 도입 + 속성 기반 규칙 전환, (4) 교란변수 통제 한계 명시. |
| 2026-04-16 | Batch 리뷰 반영. 변경: (1) §4 매트릭스 단순 합산 함정 caveat (MainIntro 사례 — Q2 충돌 해소), (2) §6.3 2막 First-batch 타겟 통합 (MainIntro + AboutMission 2개 압축). |
