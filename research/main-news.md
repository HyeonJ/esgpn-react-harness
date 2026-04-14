# research/main-news.md

메인페이지 News 섹션 — "지속 가능한 내일을 설계하는 ESGPN 뉴스룸"
(Figma `43:315` "Frame 2043685959", 1920×1040, 캔버스 좌표 (0, 6450))

---

## 1. Figma 메타

- 파일: `qhrMiGVfoSQ1QMFhVN8z78` (ESG 실천네트워크)
- 섹션 노드: `43:315` (type=FRAME)
- dimensions: 1920×1040
- 배경: **`#f3f3f3` (밝은 회색)** — 사전 리스크 메모의 "다크 그린 BG"는 **오류**. 헤딩/본문 텍스트 모두 `#1d2623` (Gray 900 Dark text). 실제로는 밝은 섹션이다
- `get_metadata`: 자식 0 반환 (flattened). `get_design_context`로 내부 구조 완전 확보 성공
- 내부 루트 컨테이너: `40:1420` (좌/우 2열 flex-between)

## 2. baseline PNG 실측 (§2.6)

- 경로: `figma-screenshots/main-news.png`
- **native 크기: 1920 × 1040** (file 명령 확인, 8-bit/color RGBA, non-interlaced)
- spec과 일치. clip 불필요 (`scripts/compare-section.sh main-news`로 풀폭 측정)

## 3. 레이아웃

### 3.1 외곽 Frame (43:315)

- `flex flex-col items-start justify-center`
- padding: `py-[120px] px-[252px]` (좌우 252 → 콘텐츠 폭 1920−504 = **1416**)
- 내부 높이 = 1040 − 240 = **800px**
- `position: relative` + 배경 장식 레이어 3개 (뒤에 깔림, pointer-events-none, overflow-hidden)

### 3.2 배경 장식 이미지 (3 floating decorations)

모두 absolute inset-0 overflow-hidden 컨테이너에 담김. **Framelink PNG = 합성 사진**. CSS 재적용 금지.

| # | 노드 | 에셋 | % 좌표 (left, top, w, h) | 용도 |
|---|------|------|-------------------------|------|
| 1 | - | `imgFrame2043685959` | left 41.11%, top 47.91%, w **-51.57%**, h 70.16% | 중앙-좌하 대형 식물/건축 사진 (음수 w → 좌상단 기준으로 좌측으로 확장) |
| 2 | - | `imgFrame2043685960` | left 80.16%, top 61.94%, w 42.53%, h 59.16% | 우측 하단 식물 이미지 |
| 3 | - | `imgFrame2043685960` (재사용) | left 97.33%, top 83.85%, w **-29.61%**, h 41.19% | 화면 우하단 잘림 (음수 w) |

베이스라인 썸네일을 보면 좌측 하단에 large 녹색 식물/건축 이미지가 헤딩 하단에 깔림. 이것이 #1. #2/#3은 우측 영역 합성.

### 3.3 메인 컨텐츠 (40:1420)

좌측 576px 헤딩 블록 + 우측 748px 뉴스 리스트.

#### 좌측 헤딩 블록 `40:1329` (w=576, gap=24, py=24)

- Eyebrow `40:1331`: "ESGPN 뉴스룸" — 14R, `#97a29e` (Gray 500), tracking `-0.07px`
- Title `40:1332`: "지속 가능한 내일을 설계하는\nESGPN 뉴스룸" — **48B, line-height 56px**, `#1d2623`, `<br>` 의도적 보존
- Body `40:1333`: "뉴스 이상의 가치를 발견하세요. 실질적인 변화를 이끌어낼 수 있는\n인사이트와 지식이 당신의 성장을 든든하게 뒷받침합니다." — 16R, `#1d2623`, tracking `-0.16px`, leading 1.5, `<br>` 보존

#### 우측 뉴스 리스트 `40:1418` (w=748, gap=8, py=24, h=full)

- **상단 컨트롤 바** `40:963` (h=24, flex between):
  - 좌: "총 24개" — 14R, Gray 500, tracking `-0.07px`
  - 우: 페이지 "1/4" + 좌/우 화살표 아이콘 2개
    - `1/4` — 15M, Gray 500, tracking `-0.1125px`
    - Arrow Type 4 (좌, `40:969`): 24×24, `imgIconStroke` 내부 `-rotate-90` container
    - Arrow Type 5 (우, `40:970`): 24×24, `imgIconStroke1` 내부 `rotate-90` container
- **뉴스 카드 리스트** `43:336`: flex-col, 상단 border 없음, 카드별 `border-b border-[#c6cdcc]` (Gray 300)

##### 5개 카드 (동일 구조)

| # | 노드 | 타이틀 | 출처 | 날짜 | 썸네일 |
|---|------|--------|------|------|--------|
| 1 | `43:283` | [진단과 제언] SDGs와 ESG, 실천이 관건이다 | 이투데이 | 2026-01-19 | `imgRectangle17` |
| 2 | `40:1410` | [수요논단] ESG 정착은 우리의 새로운 미래 | 한국대학신문 | 2022-01-18 | `imgRectangle18` |
| 3 | `43:293` | [수요논단] 정부차원에서 ESG창업 붐(boom) 조성해야 | 한국대학신문 | 2022-01-18 | `imgRectangle17` (재사용) |
| 4 | `43:316` | [수요논단] 지자체(광역·기초) 중심의 ESG 스타트업 생태계 조성 필요하다 | 한국대학신문 | 2024-05-29 | `imgRectangle17` (재사용) |
| 5 | `243:769` | [수요논단] 지자체(광역·기초) 중심의 ESG 스타트업 생태계 조성 필요하다 (카드4 중복) | 한국대학신문 | 2024-05-29 | `imgRectangle17` (재사용) |

**카드 구조 동일**: gap=20, items-center, py=24, border-b. 내부:
- 좌측 flex-1 col, gap=12
  - 헤딩 블록 col gap=8:
    - 타이틀: 20B, `#1d2623`, leading 1.4, **tracking `-0.4px`** (§§ letter-spacing rule)
    - 본문: 15R, `#5d6a66` (Gray 700), leading 1.5, tracking `-0.1125px`, overflow-hidden ellipsis
  - 메타 Paragraph flex gap=8 items-center:
    - 출처: 13R, `#97a29e`, leading 1.5
    - 점(3px size): `imgEllipse5` (원형 svg/image)
    - 날짜: 13R, `#97a29e`, leading 1.5
- 우측 썸네일: **140×100, rounded-16, object-cover**

> **5 카드 구조 동일** (title / body / source / dot / date / thumbnail). 변형 없음. NewsCard 로컬 컴포넌트로 뽑기 적합.

### 3.4 transform/rotation 요소

- Arrow Type 4: inner div `-rotate-90` (정확히 -90deg, 반올림 아님)
- Arrow Type 5: inner div `rotate-90` (정확히 90deg)
- 본문 텍스트/카드/썸네일 — **회전 없음**
- §2.4 정밀 수치 이슈 없음 (소수점 rotation 없음)

## 4. 디자인 토큰 (from get_variable_defs)

| 토큰 | 값 |
|------|----|
| Gray Scale/Gray 300 | `#c6cdcc` (카드 border-b) |
| Gray Scale/Gray 500 | `#97a29e` (eyebrow, 출처, 날짜, 페이지, "총 N개") |
| Gray Scale/Gray 700 | `#5d6a66` (카드 본문) |
| Gray Scale/Gray 900 | `#1d2623` (헤딩, 섹션 본문, 카드 타이틀) |
| spacing/1 | 4 |
| spacing/2 | 8 |
| spacing/3 | 12 |
| spacing/5 | 20 |
| spacing/6 | 24 |
| BG (hardcoded) | `#f3f3f3` (토큰 없음, 섹션 배경) |

## 5. 폰트 letter-spacing (Figma percent → px 변환, §letter-spacing rule)

`get_design_context`가 이미 **tracking-[...] 에 계산된 px 값을 내려줌** (percent 함정 회피됨). 그대로 채택:

| 용도 | size | tracking (px) |
|------|------|---------------|
| Eyebrow / "총 24개" / 출처 / 날짜(13) | 14/13 | `-0.07px` (14), 13은 0 |
| 본문 (section) | 16 | `-0.16px` |
| "1/4" | 15M | `-0.1125px` |
| 카드 타이틀 | 20 | `-0.4px` |
| 카드 본문 | 15R | `-0.1125px` |
| 헤딩 48B | 48 | 0 (leading 56px 고정) |

## 6. 에셋 목록 & 캔버스-에셋 일치 검증

| # | 에셋 const | 용도 | 형식 | 동적 여부 | 사용 횟수 | 비고 |
|---|-----------|------|------|-----------|-----------|------|
| 1 | `imgFrame2043685959` | 좌/중앙 배경 식물 사진 | PNG (raster) | **정적** | 1 | 음수 width → Framelink에서 rendered composite로 받음. imageRef 없이 nodeId만으로 다운로드 |
| 2 | `imgFrame2043685960` | 우측 배경 식물 | PNG | 정적 | 2 (재사용) | 단일 파일 저장 후 2곳에서 공유 |
| 3 | `imgRectangle17` | 뉴스 썸네일 A | PNG | 정적 | 4 (card 1,3,4,5) | rounded-16 object-cover |
| 4 | `imgRectangle18` | 뉴스 썸네일 B | PNG | 정적 | 1 (card 2) | 위와 같음 |
| 5 | `imgIconStroke` | 좌 화살표 (pagination) | SVG | 정적 | 1 | `-rotate-90` wrapper — Framelink SVG는 display-ready. CSS rotate는 wrapper에만 (이미 inner container에 있음) |
| 6 | `imgIconStroke1` | 우 화살표 | SVG | 정적 | 1 | `rotate-90` wrapper |
| 7 | `imgEllipse5` | 점 구분자 (3px 원) | SVG/PNG | 정적 | 5 (각 카드) | 단일 파일 5곳 재사용 |

**고유 에셋 파일 수 = 6** (2종 배경 + 2종 썸네일 + 2종 화살표 + 1 dot = 7이지만, 배경 #2가 재사용이므로 PNG 4 + SVG/PNG 3 = 7 URL, 고유 6 파일).

→ **동적 에셋 없음** (모두 정적 PNG/SVG). GIF/MP4 노드 없음.

### 캔버스 육안 확인 (baseline 스캔)
- 헤딩 좌측 / 뉴스 리스트 우측 ✓
- 배경 식물 이미지: 중앙-하단 좌측 녹색 식물이 헤딩 문장 일부와 겹침 ✓
- 5개 카드: 썸네일이 모두 한 가지 톤으로 보이지만 Figma에서 Rectangle17/18 두 종만 사용 (4+1 분포)
- 좌/우 화살표 visible ✓

**개수 일치 확인 완료** (화면상 8개 슬롯: 5 썸네일 + 2 화살표 + 1 dot × 5(작음) + 배경 3; 고유 에셋 7 URL — 일치).

## 7. transform·rotation 정리

회전 요소 2개 (Arrow wrapper -90° / 90°). 둘 다 **정확히 90 배수** (소수점 없음). §2.4 반올림 이슈 없음.

## 8. 리스크 정리

1. **사전 리스크 메모의 "다크 그린 BG"는 오류** — 실제 `#f3f3f3` 밝은 회색. Preview 라우트 외곽 `bg-white` 규칙과 자연스럽게 조화 (alpha-0 blend 이슈 없음)
2. **5번째 카드가 4번째와 내용 중복** — 디자인 의도적으로 보이며 실무에선 실제 뉴스 데이터로 교체될 placeholder. **데이터 배열로 관리** 하되 Figma와 동일하게 중복 5개 유지해야 baseline diff 통과
3. **배경 장식 이미지의 음수 width** (`w-[-51.57%]`, `w-[-29.61%]`) — Tailwind arbitrary 그대로 사용 가능. 브라우저는 음수 width를 render할 때 img가 flipped/위치 offset으로 해석. baseline PNG에 baked-in 이므로 **CSS도 동일 수치 그대로 적용** 해야 동일 결과
4. **img의 source가 하나(Frame2043685960)를 2번 사용** — 다운로드 1회 후 2 img 태그에서 같은 파일 참조
5. **카드 5번째 타이틀이 `w-full` 로 지정돼 Figma에서 2줄 wrap 발생 가능** vs 4번째는 같은 타이틀이지만 `w-full`. 실제론 같은 폭, 같은 타이틀 → 두 카드 2줄 wrap 동일
6. **카드 썸네일 rounded-16 / object-cover** — naturalWidth>0 (G3) 확보 필요. PNG 직접 다운로드
7. **페이지네이션은 static** — "1/4", "총 24개"는 Figma 값 그대로 하드코딩 (interaction 없음)
8. **letter-spacing percent 함정 회피 완료** — `tracking-[-0.07px]`, `-0.16px`, `-0.1125px`, `-0.4px` 모두 design_context 그대로 사용

## 9. 구현 예상 위험도

**낮음.** Programs Card 시리즈보다 단순:
- 회전/블렌드/transform 없음
- 동적 에셋 없음
- 공통 컴포넌트(NewsCard)는 5회 반복이라 처음부터 로컬 컴포넌트로 추출하면 됨
- baseline 크기 spec 일치

예상 G1 diff: 2~3% (텍스트 안티앨리어싱 + 배경 식물 PNG alpha 경계).

---

## 10. 다음 단계

- 단계 2 plan 작성 → 승인 대기
