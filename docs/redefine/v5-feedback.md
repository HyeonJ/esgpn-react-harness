# v5 Feedback Log

> **목적**: v4 수동 refinement 중 발견된 문제를 v5 개선 연료로 축적.
> **원칙**: 증상 → 원인 → v5 개선안 3줄로 간결하게. 나중에 패턴별로 묶어 v5 설계 근거로.
> **사용**: 수정할 때마다 새 F-XXX 엔트리 추가. 분류는 나중에.

---

## 분류 카테고리 (사후 정리용)

- **P**: Page-researcher (Phase 2 리서치 단계)
- **I**: Section-implementer (Phase 3 구현 단계)
- **S**: Skill (figma-to-react / visual-regression / responsive)
- **G**: Gate (품질 게이트 정의)
- **T**: Tool/Script (detect-cutoff, check-* 등)
- **W**: Workflow (자율 모드 / 세션 간 교훈 전파)

---

## 2026-04-21 — 세션 4 (수동 refinement 시작)

### F-001 (P, W) — Flatten 판정 과신
- **섹션**: AboutMission, About 페이지 전체
- **증상**: Figma는 flex-col (text 상단 / image 하단) 레이아웃인데 우리 코드는 flex-row (text 좌 / image 우)로 오해
- **원인**: page-researcher가 parent node `52:624` flatten 판정 후 subnode 탐색 포기. 실제로는 하위 노드 `86:1163`가 살아있어서 `get_design_context` 가능
- **교훈 시점**: 세션 2 중반 `certification-flatten-bottom`에서 같은 함정 발견 → 소급 재검토 없이 완주
- **v5 개선**:
  1. page-researcher prompt에 "flatten 판정 시 `get_design_context(parent, depth=3)` 재시도 강제" 추가
  2. 세션 간 교훈 전파 메커니즘: 새 교훈 발견 시 기존 섹션 재검수 트리거

### F-002 (I, S) — SVG marker orient 기본값 오용
- **섹션**: MainStats (ESG 다이어그램 connector)
- **증상**: 세로선 끝 화살표가 옆으로 회전(`<`) 렌더
- **원인**: 워커가 SVG `<marker orient="auto">` 그대로 사용. `auto`는 선 방향(세로↓)에 맞춰 90° 회전
- **v5 개선**: visual-regression-gates 스킬에 "SVG marker orient 결정 가이드" 추가
  - 수직선 (고정 방향) → `orient="0"`
  - 사선/곡선 (가변 방향) → `orient="auto"` + path를 "오른쪽 향함"으로 그림

### F-003 (I, S) — Image crop을 negative-offset + oversize로 번역
- **섹션**: MainIntro globe 이미지
- **증상**: 이미지가 컨테이너 밖 위치(`left: -22%`, `width: 162%`), 잘림/비율 안 맞음
- **원인**: Figma `cropTransform` 행렬을 1:1 CSS 좌표로 번역. AI가 "확대 + 음수 offset" 패턴 선택 (취약)
- **대안**: `object-fit: cover/contain` + `object-position` (단순, 견고)
- **v5 개선**: section-implementer prompt에 "Figma cropTransform 발견 시 `object-fit` 우선 사용, negative-offset 금지" 규칙

### F-004 (I, S) — items-center on grid cell이 레이어 침범
- **섹션**: MainStats EsgDiagram (원 + 화살표 레이어)
- **증상**: 원이 화살표 레이어 영역을 덮음 (cell 중앙으로 밀림)
- **원인**: 워커가 "시각적으로 원이 중앙에 있어 보여서" `items-center` 선택. 같은 grid cell에 다른 레이어(화살표)가 있는 상황 놓침
- **v5 개선**: "grid cell에 여러 레이어 있을 때 `items-start` 기본, `items-center`는 단일 레이어일 때만"

### F-005 (I) — justify-between이 요소를 양 끝으로 분리
- **섹션**: AboutMission (text + image)
- **증상**: 텍스트 좌측 끝, 이미지 우측 끝, 가운데 큰 빈 공간
- **원인**: 워커가 Figma 좌표만 보고 "한쪽 끝에 A, 다른 쪽 끝에 B" 해석 → `justify-between` 선택. 실제로는 두 요소가 자연스럽게 붙어야 하는 경우
- **v5 개선**: `justify-between`은 **의도적인 양 끝 배치**일 때만 (예: header with logo + nav). 가운데 gap이 400px 이상 생기면 `gap-N`으로 바꿀 것

### F-006 (I) — 고정 height가 content 넘침 시 overflow
- **섹션**: AboutHeader (`height: 454`)
- **증상**: `pt-160` 추가 시 다음 section 침범
- **원인**: `style={{ height: 454 }}` 고정. content 넘쳐도 box 유지
- **v5 개선**: section root에 고정 height 금지, `min-height` 우선. Hero 등 "풀 배경" 목적일 때만 예외

### F-007 (I) — Tab 디자인 완전 커스텀 누락
- **섹션**: MainPrograms (Figma 탭 디자인 252:993)
- **증상**: 탭 없이 3개 카드 모두 렌더됨. 디자인에는 dot+text+underline 탭 구조 있음
- **원인**: page-researcher가 탭 구조 없다고 판단 (MainProgramsHeader 내부에서 탭 노드 발견 못함). 실제로는 별도 노드(252:993)에 탭 존재
- **v5 개선**: page-researcher가 "탭/슬라이더 키워드" 감지 시 하위 노드 전수 탐색. 섹션 분할 시 interactive UI 요소 체크리스트

### F-011 (I, S) — Figma padding/spacing 값 번역 부정확 (범용 패턴, 가장 자주 발생)
- **범위**: **섹션 전반.** divider 주변만이 아니라 카드 내부, section content 상하/좌우, 요소 간 gap 등 **모든 spacing** 해당
- **증상**:
  - Figma spec 값과 코드 값이 어긋남 (예: Figma 56, 우리 66)
  - padding이 있어야 할 쪽이 누락 (pt만 있고 pb 없음, 또는 그 반대)
  - 중복 padding (부모 + 자식 모두 padding → 누적)
  - 시각 추정으로 부정확 (baseline PNG 눈대중)
- **원인**:
  1. Figma design_context의 auto-layout padding이 CSS로 1:1 번역 시 손실
  2. nested padding 구조 (wrapper + inner + content) 해석 오류로 중복/누락
  3. 시각 추정 의존 (design_context 값 확인 안 하고 픽셀 추측)
  4. 섹션 경계 spacing이 "이전 섹션 bottom vs 현 섹션 top" 분리 구현돼 일관성 깨짐
- **v5 규칙 (V5-9 신규)**: **모든 spacing은 design_context에서 명시적 확보**
  - Figma design_context fetch 시 각 layout object의 `padding-top/right/bottom/left`, `gap` 값 **숫자로 기록**
  - 시각 추정 (baseline PNG 눈대중) **금지** — 반드시 design_context 값 사용
  - 의심 시 design_context 재fetch로 확인
  - 구현 후 DOM 측정(`getComputedStyle`)으로 각 요소 padding 값이 Figma spec과 일치하는지 검증
- **v5 규칙 (V5-10 신규)**: **component-level 기본 spacing**
  - 반복 등장하는 element (divider, heading 등)는 **component가 자체 기본 spacing 보유**
  - 예: `<HatchedDivider />` 기본 `my-[56px]`, override 가능
  - 이유: 섹션별로 값을 외부에서 주입하면 불일치 발생. component 기본 spacing으로 통일
- **실증 해결 1**: AboutMission/Values/Vision HatchedDivider를 `my-[56px]`로 통일 + 섹션 content의 `pt-[66px] pb-[71px]` 제거 (spacing 책임을 divider에 위임)
- **실증 해결 2 (권장)**: section-implementer prompt에 "단계 2 plan 작성 시 모든 spacing 값을 design_context에서 추출한 numbered list로 명시" 추가

### F-013 (I, S) — 페이지 content-Footer 사이 pb 누락
- **섹션**: /contact route wrapper (다른 페이지도 가능성 높음)
- **증상**: ContactForm 섹션 끝과 Footer 시작 사이 공백 없음. Figma는 200px
- **원인**:
  1. CLAUDE.md "Header fixed clearance" 가이드는 `pt-top` 값만 명시 (pt-180 /contact, pt-140 /news 등)
  2. **Footer clearance 가이드 부재** — `pb-bottom` 관련 규칙 없음
  3. Worker가 guideline 없는 부분은 **시각 추정 + 생략** 경향
  4. 결과: pt만 구현, pb 누락 (F-011 ASYMMETRIC_PADDING 변형)
- **v5 규칙 (V5-13 신규)**: 페이지 content wrapper의 **pt + pb 모두** 명시 강제
  - CLAUDE.md "Header clearance"를 "**Page content clearance**"로 확장
  - `pt-[top]` / `pb-[bottom]` 값을 Figma spec(134:3696 같은 content wrapper)에서 추출
  - Footer 직전 섹션 항상 pb 확인 의무화
- **실증 해결**: /contact route의 `<div pt-[180px]>` → `<div pt-[180px] pb-[200px]>` (Figma 134:3696 = pt-[180px] pb-[200px])
- **예상 재발**: 다른 페이지(home/about/contest/certification/news/gallery)도 pb 누락 가능성. 전수 확인 필요

### F-014 (I, S) — Figma `-scale-y-100` wrapper 번역 함정
- **섹션**: MainIntro IntroGlobeGroup Vec7/Vec6 connector
- **증상**: Figma의 `-scale-y-100 flex-none` wrapper 패턴을 번역할 때 위치/방향 오류. v4 worker는 top에 height 더하는 방식(top+h)으로 시각적 상쇄 시도 → 위치 틀림. CSS `scaleY(-1)` 추가 시 이중 flip → 방향 틀림
- **원인**: Figma SVG export는 **최종 시각 결과를 pre-flipped 상태로 저장**. `-scale-y-100`은 design_context 코드에만 남고 SVG 파일에는 반영 X
- **v5 규칙 (V5-12 신규)**: Figma `-scale-y-100` wrapper 발견 시
  - SVG 파일이 이미 post-flip 상태일 가능성 높음 → **wrapper transform 무시**
  - SVG 파일 + Figma top/left 값 **그대로** 사용. CSS transform 추가 금지
  - 판별: SVG path 직접 읽어서 "원/시작점이 어디 있는지" 확인 → 시각 기대와 일치 = raw 사용
- **실증 해결**: Vec7 `marginTop: 124 → 15`, `transform: scaleY(-1)` 제거 (SVG pre-flipped)

### F-012 (I, S) — Figma negative margin overlap 패턴 CSS 1:1 번역 오류 (누적 발생)
- **섹션**: AboutMission 이미지 그룹
- **증상**: Figma의 `pb-[87px]` + last child `mb-[-87px]` 패턴을 그대로 번역하면, CSS flex에서는 상쇄되지 않고 **87px 잔여 공간** 발생. 다음 섹션 divider의 `my-[56px]`와 **누적되어 87+56=143px의 예상 밖 공간** 생성
- **원인**:
  - Figma auto-layout의 abstract 모델: parent pb-N + last child mb-(-N) 이 서로 **상쇄** (overlap 의도 표현)
  - CSS flex의 실제 동작: parent `padding-bottom`은 항상 실재. last child `margin-bottom`은 parent 내부 공간에 영향 X
  - 결과: Figma에서는 0이던 공간이 CSS에서는 N px 실재
- **v5 규칙 (V5-11 신규)**: **Figma auto-layout overlap 패턴 CSS-aware 번역**
  - Figma에서 `cropTransform` 없이 `pb-[N]` + last child `mb-[-N]` 발견 시:
    - 둘 중 **하나만 CSS에 옮김** (pb-[N] 제거 권장, mb-(-N)만 유지하여 overlap 효과 보존)
    - 둘 다 옮기면 N px 잔여 공간 누적 → 인접 섹션과 충돌
  - 특히 마지막 자식의 `mb-[-N]` + 부모 `pb-[N]` 조합 주의
- **실증 해결**: AboutMission image group wrapper `pb-[87px]` 제거 → big figure의 `mb-[-87px]` overlap 효과만 유지 → 87px 잔여 공간 사라짐

### F-010 (I, S) — 섹션 독립 구현 시 divider 중복
- **섹션**: AboutMission, AboutValues (하단 divider + 다음 섹션 top divider = 2개 겹침)
- **증상**: 섹션 경계에 HatchedDivider가 2줄 겹쳐서 렌더
- **원인**: 섹션마다 독립적으로 "top divider + content + bottom divider" 패턴 구현. 인접 섹션 합쳐지면 boundary에 2개 divider
- **v5 규칙 (V5-8 신규)**: **top-only 규칙 채택**
  - 각 섹션은 **상단 divider만** 가짐 (필요 시)
  - 첫 섹션(페이지 header 직후)은 divider 생략 가능
  - 마지막 섹션도 top 유지 (페이지 하단 자연 종료)
  - 예외: 단일 섹션 페이지거나 명확한 "외곽선" 필요한 경우만 양쪽
- **대상**: `section-implementer` prompt에 V5-8 추가
- **실증 해결**: AboutMission/Values bottom divider 제거, AboutVision top divider 추가 → 모든 경계 1개

### F-009 (I, S) — Figma 복잡 compositing 이미지 재현 한계
- **섹션**: AboutValues (4개 아이콘)
- **증상**: rounded frame은 맞지만 아이콘 내부가 왜곡돼 "green blob"으로 보임
- **원인**: Figma가 단순 crop이 아닌 **복합 compositing** 사용
  - 예: Card 1 icon = `h:91%, left:105.93%, w:-126.33%` (**음수 width = 수평 flip**)
  - 예: Card 2 icon = Rectangle22 원본 1개 + 축소·flip된 복사본 1개 overlay (2-layer composite)
- **원천적 한계**: 단일 `<img object-fit>` CSS로 재현 **구조적 불가**. Figma는 이미지를 "조립 요소"로 사용
- **임시 해결**: pre-cropped 아이콘을 natural 크기로 frame에 중앙 배치 (object-cover 포기). 시각 diff 있지만 왜곡은 방지
- **근본 해결 옵션**:
  1. Framelink로 141×141 rendered composition을 flat PNG로 export (v1~v3 방식, 단순하지만 text-bearing raster 위험)
  2. Figma SVG export 후 CSS 재구성 (복잡 compositing이면 어려움)
  3. 원본 이미지 + 정확한 flip/scale transform CSS 재구성 (가장 정확, 가장 복잡)
- **v5-3-b 권고**: section-implementer prompt에 "Figma image transform 중 음수 width/height (flip) 발견 시 복합 compositing 판정. 단일 img+object-fit 금지. Framelink flat PNG export 권장"

### F-008 (I, S) — Figma cropTransform 영역 불일치 (V5-3 강화 필요)
- **섹션**: AboutMission (photoLarge, photoSmall)
- **증상**: 이미지 자체는 정상이지만 Figma 의도된 crop 영역이 아닌 다른 부분만 보임
- **원인**:
  1. Pre-cropped 에셋 사용 (357×359, 145×161) — Figma 원본이 아닌 이미 잘린 파일
  2. Figma 의도: 원본 `imgRectangle19/20`에 cropTransform `h:177%, top:-53%` 지정 → 원본의 **하단 60% 영역만** 보여주려 했음
  3. 우리 구현: pre-cropped + `object-cover` 단독 → Figma crop 영역 정보 유실
- **V5-3 현재 한계**: "negative-offset 금지, object-fit 우선"은 맞추고 있으나, **crop 영역 정확도는 다루지 않음**. 단순 `object-cover`로는 Figma 의도 재현 불가
- **v5 개선 (V5-3-a 신규)**: Figma에서 cropTransform 발견 시
  1. 원본 이미지(imgRectangleN) full-resolution 다운로드 필수
  2. cropTransform 행렬 → `object-position` CSS로 번역 (예: `h:177% top:-53%` → `object-position: center 70%`)
  3. Pre-cropped asset 생성·사용 금지
- **영향**: 이 패턴은 Figma에서 image + crop 조합 거의 모든 곳에 나타남. v5 보강 후 효과 클 예정
- **대상 파일**: `section-implementer` prompt V5-3 섹션 + `visual-regression-gates` 안티패턴 체크리스트

---

## 패턴 요약 (적재 중, 5개 이상 누적 시 분석)

- **[레이아웃 해석 오류]**: F-001, F-005 — 2D 좌표를 1D flex 해석으로 번역할 때 발생
- **[시각 해석 vs 구조]**: F-004, F-005 — "어떻게 보이나"를 "어떻게 구성하나"로 번역할 때 단계 누락
- **[CSS 패턴 취약]**: F-002, F-003, F-008 — 1:1 수학적 번역이 CSS 렌더 현실과 안 맞음. crop 영역 정확도까지 확장 필요
- **[고정 크기 함정]**: F-006 — 크기 고정은 특수 목적일 때만
- **[노드 탐색 깊이 부족]**: F-001, F-007 — parent만 보고 subnode 가능성 놓침
- **[에셋 파이프라인]**: F-008 — pre-cropped asset 사용 시 Figma crop 의도 유실

---

## v5 설계 방향 (수집 완료 후 작성)

_TBD — F 엔트리 20+ 누적 후 패턴 기반으로 작성_

---

## F-008/F-009 실전 해결책 (2026-04-21)

### 근본 해결: Figma REST Images API로 frame composition 직접 export

Pre-cropped Framelink 에셋의 문제 (잘못된 crop 영역 / 복잡 compositing 재현 불가)를 근본 해결.

**방법**:
```bash
TOKEN=$(powershell -Command "[Environment]::GetEnvironmentVariable('FIGMA_TOKEN', 'User')")
# 1. 노드 id들로 rendered PNG URL 받기
curl "https://api.figma.com/v1/images/{fileKey}?ids={n1,n2,n3}&format=png&scale=2" \
  -H "X-Figma-Token: $TOKEN"
# 2. 반환 JSON의 images.{nodeId} S3 URL에서 PNG 다운로드
curl "$s3_url" -o src/assets/.../icon.png
```

**특징**:
- `scale=2` 권장 (retina/고해상도). 141 frame → 282×282 PNG
- Figma가 직접 rendering해서 반환 — **cropTransform/flip/multi-layer 모두 baked**
- alpha 채널에 `rounded-[N]` 포함 (wrapper 불필요)
- 코드 단순화: `<img src={asset} className="size-[141px]" />` 한 줄

**실증 케이스**:
- AboutValues 4 아이콘 (89:1236/1241/1247/1252): pre-cropped 124×122 잘린 → REST export 282×282 완성 composition
- AboutMission 2 사진 (86:1157/1165): pre-cropped 357×359/145×161 잘못된 영역 → REST export 720×720/324×324 완성 composition

**v5-3-c 권고 (section-implementer prompt)**:
- Framelink `download_figma_images`는 **leaf asset 용도만** (raw Rectangle image 등)
- **composed frame** (rounded + crop transform + flip 포함된 경우)은 **Figma REST Images API 직접 사용**
  - endpoint: `https://api.figma.com/v1/images/{fileKey}?ids={nodeId}&format=png&scale=2`
  - 결과: cropTransform/flip/multi-layer 모두 baked된 flat PNG
- 판별 기준: Figma design_context에 `cropTransform` 또는 **음수 width/height** 발견 시 REST API 우선

---

## V5 MVP 검증 결과 (2026-04-21)

### V5-1 Flatten 재탐색 검증 — **PASS 🎯**
- 대상: About 페이지 `52:624` (이전에 "flatten" 판정됨)
- 절차: `get_design_context(52:624)` 재호출 (기존엔 skip했던 단계)
- 결과: **완벽한 subnode 트리 반환**
  - 탭: `86:1116`
  - ESGPN 타이포: `299:2050` (SVG)
  - 미션 텍스트: `78:606/607/610`
  - Values 4 카드: `89:1235/1240/1246/1251`
  - Vision closing: `89:1276`
- **v4가 놓친 스펙 예시 (Values 카드)**:
  - 아이콘 141×141 통일 (v4: 144/138/131/151)
  - rounded-[24px] 프레임 (v4: 둥근 모서리 없음)
  - title 20px SemiBold (v4: 22px Bold)
- **결론**: V5-1 규칙이 실제로 대폭적인 정확도 향상 제공 확인

### V5-2~V5-7 검증
prompt 변경만 있어 실제 섹션 실행으로 검증 필요. 다음 refinement 진행 중 자연스럽게 검증됨.

---

## 변경 이력

| 날짜 | 내용 |
|---|---|
| 2026-04-21 | 초안 작성. 세션 4 수동 refinement 첫 4시간 발견 7개 엔트리. |
| 2026-04-21 | v5 MVP 적용 + V5-1 검증 결과 추가 (About flatten → subnode 트리 발견 확인). |
