# research/certification.md — 자격검정 (`/certification`) 페이지 리서치

> Phase 2 페이지 분해. Figma Node `91:1903`, 페이지 사이즈 1920×4910, 라우트 `/certification`.

## 1. Figma 노드 트리 구조

`get_metadata(91:1903)` 결과 — **부분 hybrid 페이지**. 상단(Hero+Stats+Intro+Subjects+Benefits)은 노드 구조 살아있고, 하단 큰 영역(2148px)은 flatten.

```
91:1903  ESPGN_ESG 마인드 자격검정     1920x4910
├─ 91:2046, 91:2047, 91:2048   (hidden 참고 에셋, 무시)
├─ 91:2050  Frame 2 (Top Nav)            1920x88   y=0
└─ 299:3860 Frame 2043686150             1920x4932 (메인 컨테이너, 22px overflow)
   ├─ 299:3861 Rectangle 461566311        1920x827  y=0    (Hero 배경 raster)
   ├─ 299:4364 Group 16                   956x956   x=463 y=-300  (Hero 콘텐츠 overlay)
   │  └─ 299:4366 Title + Sub + CTA Button
   ├─ 299:3862 Frame 2043686014 Stats     1920x194  y=633  (3 stat cards + 2 dividers)
   ├─ 299:3874 Frame 2043686037           1920x1245 y=827  (콘텐츠 wrapper, 3 sub-sections)
   │  ├─ 299:3875 자격검정의 필요성        1416x291  y=24   (HatchedSectionHeading + 3-column 본문)
   │  ├─ 299:3900 자격검정 영역            1416x411  y=315  (Heading + 3-column 과목 카드)
   │  └─ 299:3955 필수역량                 1416x399  y=726  (Heading + 5 카드)
   ├─ 299:4002 Frame 2043686092 ⚠ FLATTEN  1920x2148 y=2076  (Sample / Process / Schedule / CTA 4 sub-sections 추정 baked-in)
   └─ 299:4193 Footer                     1920x708  y=4224
```

**핵심 발견:**
- **Hero가 raster + overlay 하이브리드** — Hero 배경 PNG(`299:3861`) + 오버레이 그룹(`299:4364`)에 텍스트/CTA. 텍스트는 노드로 살아있어 HTML 재구성 가능
- **Stats 노드 살아있음** — 3 stat cards (1,500+ / 이론부터 실행 / 100%) + Vector divider 2개
- **Intro / Subjects / Benefits**: 표준 7단계 절차로 구현 가능. HatchedSectionHeading + 본문 패턴
- **하단 flatten 2148px** — 사전 추정 §4.5의 Sample / Process / Schedule / CTA 4 섹션이 모두 baked-in. **육안 확인 후 단계 2 plan에서 분할 전략 결정**. 텍스트 baked 위험 (G6 잠재 FAIL)
- **Subjects 카드 3개**: 304×192, 각 카드 = 제목 + 점·텍스트 불릿 2~3개. ESG 기본개념(3 불릿) / ESG 기본 용어(2 불릿) / ESG 실행 및 실천(3 불릿)
- **Benefits 카드 5개**: 177.6×180 (작은 카드), 80×80 원형 + 텍스트 + 숫자 1~5

## 2. 섹션 분할 결과

| # | 섹션명 | Node ID | 예상 토큰 | Figma 사이즈 | 캔버스 좌표 (x,y,w,h) | 비고 |
|---|--------|---------|-----------|--------------|-----------------------|------|
| 1 | certification-hero | `299:3861` + `299:4364` | ~6K | 1920×827 | (0, 0, 1920, 827) | Hero 배경 raster + overlay HTML 텍스트/CTA. main-hero 패턴 참조 |
| 2 | certification-stats | `299:3862` | ~3K | 1920×194 | (0, 633, 1920, 194) | 반복 자식 3 (3 stat cards) → 분할 가능하지만 Stats=강결합 패턴, single 섹션 적절 |
| 3 | certification-intro | `299:3875` | ~5K | 1416×291 | (252, 851, 1416, 291) | HatchedSectionHeading "자격검정의 필요성" + 3-column 텍스트 |
| 4 | certification-subjects | `299:3900` | ~7K | 1416×411 | (252, 1142, 1416, 411) | HatchedSectionHeading "자격검정 영역" + 3-column 카드 (304w each, 8 불릿) |
| 5 | certification-benefits | `299:3955` | ~6K | 1416×399 | (252, 1553, 1416, 399) | HatchedSectionHeading "지속가능한 미래를 이끄는 필수역량" + 5 카드 (177.6w each) |
| 6 | certification-flatten-bottom | `299:4002` | ~2K (baked) | 1920×2148 | (0, 2076, 1920, 2148) | ⚠ **FLATTEN**. Sample/Process/Schedule/CTA 4 섹션 추정 baked. 단계 2 plan에서 (a) 단일 raster (b) 부분 분리 (c) 하이브리드 결정. **G6 위험 — 텍스트 baked 가능성** |
| — | Footer | `299:4193` / `299:2094` | — | 1920×708 | (0, 4224, 1920, 708) | 기존 재사용 |
| — | TopNav | `91:2051` / `52:1379` | — | 1416×72 | (252, 16, 1416, 72) | 기존 재사용 |

### 서브섹션 분할 판단

- certification-flatten-bottom (#6): 2148px의 거대 flatten. 하네스 v2 분할 규칙 "이질 에셋 3+ / 반복 자식 3+" 적용 시 4 서브섹션 후보. 단, 노드가 flatten이라 자식 metadata 없음 → **육안+Figma Dev Mode 교차검증 필요**. 단계 2 plan에서 결정.
- certification-stats (#2): 반복 자식 3개지만 stat divider 인접 패턴이라 단일 섹션 유지 권장 (서브섹션 분리 시 divider 처리 모호)
- certification-subjects (#4): 3-column 카드 패턴. 카드 3개 = 반복 자식 3 → BulletList 공통화 후보 (gallery-agreements MouCard 패턴 참고)
- certification-benefits (#5): 5 카드 = 반복 자식 5+ → 카드 컴포넌트 공통화 강력 권장. 메인 hero/contest-benefits 카드와 별개 디자인이라 신규

## 3. 사전 추정과의 차이

`docs/figma-project-context.md` §4.5 예상과 비교:

| 항목 | 사전 추정 | 실측 |
|------|-----------|------|
| Hero | "ESG 마인드 자격검정 + 나무/도시 합성" | Rectangle bg + overlay 텍스트/CTA |
| Stats | "1,500+ / 이론부터 실행 / 600+" | "1,500+ / 이론부터 실행 / 100%" (마지막 다름) |
| Classification | 시험 등급별 안내 테이블 | **노드에 없음** — flatten-bottom 영역에 baked 가능성 |
| Subjects | ESG 분야별 과목/범위 테이블 | 정확히 일치 (3-column 카드, 8 불릿) |
| Sample | 자격증 샘플 이미지 | flatten-bottom에 baked 가능성 |
| Process | 접수 → 시험 → 발표 플로우 | flatten-bottom에 baked 가능성 |
| Schedule | 회차별 일정 테이블 | flatten-bottom에 baked 가능성 |
| CTA | "ESG 자격 신청하기" 버튼 | flatten-bottom에 baked 가능성 |

**가장 큰 차이:** (1) Sample/Process/Schedule/CTA 4 섹션이 단일 flatten으로 묶임 (2) Classification 섹션은 별도 노드 없음

## 4. 신규 공통 컴포넌트 후보

| 후보 | 사용처 | 비고 |
|------|--------|------|
| `BulletList` (12×12 ellipse + 텍스트) | Subjects 8 불릿 + 향후 페이지 가능 | research/contest §5에서도 후보였으나 보류됐음. 자격검정에서 8 등장 → 강력 승격 권장 |
| `CapabilityCard` (작은 80×80 원형 + 텍스트) | Benefits 5 카드 | 신규. 메인 ProgramCard와 다른 패턴 |
| `StatTriad` (3 숫자 + divider) | certification-stats (3) + main-stats(?) | 메인 stats와 비교 후 결정 |
| `HatchedSectionHeading` | Intro/Subjects/Benefits 3회 | 기존 ui/ 재사용 |

## 5. 리스크 메모

### 5.1 페이지 고유 리스크

1. **flatten-bottom 2148px 처리 전략:** Sample/Process/Schedule/CTA 4 섹션이 baked. 단순 `<img>` 한 장이면 G6 FAIL 확실 (텍스트 baked-in raster). 옵션:
   - (A) 4 서브섹션으로 강제 분할 후 각각 Figma Dev Mode 재검증 (시간↑, 품질↑)
   - (B) 하이브리드 — 배경/이미지만 raster + 텍스트는 OCR 또는 디자이너 원본 후 HTML
   - (C) 단일 raster + tech-debt T-007 OPEN 등록 (단, OPEN 부채 3건 도달로 차단됨)
   - **권장**: (A). main-hero/contest-benefits 안티패턴 재발 방지
2. **Hero overlay 좌표 음수:** Group 16이 `x=463 y=-300` (페이지 위로 overflow). overflow-hidden 필요할 수 있음
3. **Stats divider Vector 19/20:** 단순 vertical line. SVG로 재구성 권장
4. **Intro 본문 잘림:** "ESG 기본원칙과 핵심역량을 발전시키고 이를 알상" → "일상" 오타 가능성 (contest-about와 동일 패턴). `get_design_context(299:3897)`로 원문 확보
5. **Subjects 카드 ESG 약자 텍스트 짧음:** "2-1. ESG 용어" / "2-2. ESG 약자" 등 — 디자이너 placeholder 가능성
6. **Benefits 카드 텍스트 매우 길음 (4줄):** 카드 너비 145.6px에 한글 4줄 wrap. 폰트 크기·line-height 정밀 측정 필요
7. **메인페이지 Stats(`main-stats`)와 certification-stats 디자인 차이:** 메인 stats는 별도 디자인. 공통화 시도 시 회귀 위험

### 5.2 §7 테이블 공통 리스크

- 4910px + 다수 테이블 → 분할 잘 되어있음. 다만 flatten-bottom이 위험
- 1920 고정. 반응형 별건 PR

## 6. 베이스라인 스크린샷 확보 (Framelink, pngScale=1, 모두 RGBA)

`file` 실측:

- [x] `figma-screenshots/certification-full.png` — 1920×4910 (spec 일치)
- [x] `figma-screenshots/certification-hero.png` — 1920×827 (spec 일치, 단 overlay 그룹 미포함 — Hero 배경만)
- [x] `figma-screenshots/certification-stats.png` — 1920×194 (spec 일치)
- [x] `figma-screenshots/certification-intro.png` — 1416×291 (spec 일치)
- [x] `figma-screenshots/certification-subjects.png` — 1416×411 (spec 일치)
- [x] `figma-screenshots/certification-benefits.png` — 1416×399 (spec 일치)
- [x] `figma-screenshots/certification-flatten-bottom.png` — 1920×2149 (spec 2148, +1px)

> ⚠ certification-hero baseline은 배경만 — 실제 Hero 시각은 overlay 콘텐츠 포함. 단계 1에서 overlay 포함 baseline 별도 export 또는 full-page에서 0~827 crop 권장. main-hero baseline 패턴 참조 (full-page crop이 일반적으로 더 정확)

## 7. Phase 3 진입 전 체크리스트

- [ ] implementer: certification-hero baseline을 full-page 0~827 crop으로 재생성 (overlay 포함 + 배경 white)
- [ ] implementer: `get_design_context(299:4364)` Hero 오버레이 텍스트/CTA 추출
- [ ] implementer: `get_design_context(299:3897)` Intro 본문 원문 확보 ("알상" 오타 확인)
- [ ] implementer: certification-flatten-bottom 단계 2 plan에서 분할 전략 결정 (권장 A — 4 서브섹션 분할)
- [ ] implementer: BulletList ui/ 승격 또는 섹션 로컬 시작 결정
- [ ] implementer: CapabilityCard (Benefits 5 카드) 디자인 이름 결정
- [ ] OPEN 부채 카운트 모니터링 — flatten-bottom 처리 시 새 OPEN 등록 시 3건 도달 가능

## 8. 다음 단계 제안

섹션 구현 순서:
1. certification-hero (Hero overlay HTML 재구성)
2. certification-stats (3 stat cards + divider)
3. certification-intro (HatchedSectionHeading + 3-column 본문)
4. certification-subjects (3-column 카드 + BulletList 공통화)
5. certification-benefits (5 CapabilityCard)
6. certification-flatten-bottom — **단계 2 plan에서 4 서브섹션 분할 결정 후 sample/process/schedule/cta 순차 구현**
