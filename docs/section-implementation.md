# docs/section-implementation.md — 섹션 구현 강제 절차

이 문서는 **한 섹션을 구현할 때** 따라야 할 단계별 강제 절차를 정의한다.
전체 워크플로우는 `docs/figma-workflow.md`를, 프로젝트 컨벤션은 `docs/react.md`와 `docs/frontend.md`를 참조한다.

---

## 0. 이 문서의 사용법

이 문서는 **체크리스트가 아니라 게이트(gate)**다. 각 단계는 다음 단계로 가기 위한 통과 조건이며, **조건을 만족하지 않으면 다음 단계로 넘어갈 수 없다.**

### 핵심 규칙
- 한 섹션 = 한 브랜치 = 한 커밋
- 단계는 **순서대로** 진행. 점프 금지
- 측정값은 반드시 **숫자로** `plan.md`에 기록. "괜찮아 보임" 같은 표현 금지
- 4회 이상 같은 게이트에서 막히면 **사용자에게 보고하고 멈춘다**

---

## 1. 단계 개요

```
[1] 섹션 리서치        → research/{섹션명}.md
[2] 섹션 계획          → plan/{섹션명}.md  ← 사용자 승인 필요
[3] 에셋 수집          → src/assets/{섹션명}/
[4] 구현               → src/...
[5] 측정 (4 게이트)    → plan/{섹션명}.md 측정 섹션
[6] 수정 루프          → 최대 3회
[7] 커밋               → diff % 포함
```

---

## 2. 단계 1 — 섹션 리서치

목적: 섹션을 코드로 옮기기 전에 **섹션의 모든 디테일을 종이 위로 꺼낸다.**

### 2.1 Figma MCP 호출
다음 순서로 호출. 결과는 모두 `research/{섹션명}.md`에 기록한다.

1. **`mcp__figma-framelink__download_figma_images`** (Framelink) — 해당 섹션 노드를 baseline PNG로 **파일 저장**
   - 파라미터: `fileKey`, `nodes: [{ nodeId, fileName: "{섹션명}.png" }]`, `localPath: "figma-screenshots"`, `pngScale: 1`
   - 결과 경로 규약:
     - **공통 컴포넌트**: `figma-screenshots/{section}.png` (예: `header.png`, `footer.png` — 페이지 종속 없음, top-level)
     - **페이지 섹션**: `figma-screenshots/{page}-{section}.png` (예: `main-hero.png`, `about-organization.png` — 다른 페이지와 섹션명 충돌 회피)
     - **페이지 전체**: `figma-screenshots/{page}-full.png`
   - 섹션명(orchestrator가 워커에 전달하는 `{섹션명}`)도 baseline 파일명과 일치시킨다: 공통은 `header`, 페이지는 `main-hero` 같은 페이지 접두사 포함
   - 이미 Phase 2에서 저장됐다면 스킵
   - Framelink 미등록 상태면 Phase 0 먼저 수행
2. **`get_design_context`** (공식 MCP) — 해당 섹션 노드
   - 토큰 12K 이하 확인. 초과 시 더 작은 노드로 분할 후 재호출
3. (필요 시) **`get_variable_defs`** (공식 MCP) — 이 섹션에서 처음 등장하는 토큰이 있을 때만
4. (참고) **`mcp__figma-framelink__get_figma_data`** — 레이아웃/fills/effects가 YAML로 필요할 때 보조 사용

### 2.2 research/{섹션명}.md 에 기록할 항목
- **섹션 메타**: Figma Node ID, 사이즈(px), 부모 페이지, 라우트
- **레이아웃 구조**: 최상위 컨테이너의 layout 모드(flex/grid/absolute), 자식 노드 트리
- **사용된 디자인 토큰**: 색상/간격/폰트/radius 목록 (Phase 1의 tokens.css와 매칭 확인)
- **에셋 목록 (가장 중요)**: 다음 표 형식으로
  ```markdown
  | # | 종류 | Figma URL | Figma 노드 ID | 부모 사이즈 | 원본 사이즈 | 동적 여부 | 처리 방식 |
  |---|------|-----------|---------------|-------------|-------------|-----------|-----------|
  | 1 | SVG  | https://... | 12:345     | 28x28       | 21x8.75     | 정적      | 부모 div + flex center |
  | 2 | PNG  | https://... | 12:346     | 1920x827    | 1920x827    | 정적      | 다운로드 후 그대로 |
  | 3 | GIF  | https://... | 12:347     | 400x400     | 400x400     | **동적**  | **정적 프레임 추출 (get_screenshot)** |
  ```
- **반복되는 요소**: 카드/버튼/뱃지 등 컴포넌트화 후보
- **반응형 단서**: Figma에 모바일 디자인이 있는지, 없으면 어떻게 처리할지
- **특이 사항**: backdrop-filter, mix-blend-mode 등 까다로운 요소

### 2.3 동적 에셋 식별 규칙 (중요)
Figma 캔버스에서는 **GIF/비디오 같은 동적 에셋도 정적인 한 프레임으로 보인다.** 디자이너가 의도한 것은 그 정적 프레임의 시각적 표현이지, 움직이는 효과가 아니다. **이 프로젝트는 Figma 캔버스에서 보이는 정적 표현을 진실의 원천으로 한다.**

따라서 다음 규칙을 따른다:

**식별 방법 (3가지 — 하나라도 해당하면 동적 에셋):**
1. **확장자 검사**: MCP 응답의 에셋 URL 확장자가 `.gif`, `.mp4`, `.webm`, `.mov`, `.apng` 중 하나
2. **파일 타입 검사**: 다운로드 후 `file` 명령 결과가 `GIF image data`, `ISO Media`, `WebM`, `QuickTime` 등
3. **노드 타입 검사**: Figma MCP `get_design_context` 결과에서 노드 타입이 `VIDEO`이거나 미디어 컨테이너인 경우

**캔버스-에셋 일치 검증 (반드시 수행):**
research의 에셋 목록을 작성한 후, **Figma 캔버스 스크린샷과 추출된 에셋 목록을 비교**한다:
- 캔버스에서 보이는 시각적 요소(아이콘, 이미지, 일러스트 등)의 개수를 센다
- 추출된 에셋 목록의 항목 개수와 비교한다
- **개수가 일치하지 않거나, 캔버스에서 정적으로 보이는 영역에 동적 에셋이 매핑되어 있으면 → 사용자에게 보고하고 멈춘다**
- 예: 캔버스에는 정적 일러스트 1개로 보이는데 MCP가 video 노드 + 정적 이미지 노드 2개를 줬다면 → 케이스 분석 필요

**동적 에셋 처리 방식:**
1. 원본 GIF/비디오를 다운로드하지 않는다 (또는 다운로드해도 사용하지 않는다)
2. 대신 **해당 노드의 부모 컨테이너 노드 ID**로 Framelink `download_figma_images`를 호출해서 **정적 PNG 한 프레임**을 저장
   - 파라미터: `nodes: [{ nodeId: "{부모 노드 ID}", fileName: "{이름}-static.png" }]`, `localPath: "src/assets/{섹션명}"`, `pngScale: 1` (또는 고해상도 필요 시 2)
   - 이유: 부모 컨테이너 단위로 떠야 캔버스에서 보이는 합성 결과(오버레이/마스크 포함)가 그대로 들어옴
   - 비디오 노드만 단독으로 캡처하면 위에 얹힌 정적 오버레이가 빠질 수 있음
3. 저장된 PNG는 곧장 `src/assets/{섹션명}/`에 있으므로 그대로 import 사용
4. 에셋 목록 표의 "처리 방식" 칸에 "정적 프레임 추출 (Framelink, 부모 노드 {ID})"으로 기록

**의심스러우면 폴백 (가장 안전한 방법):**
어떤 케이스든 시각적으로 어떻게 보여야 하는지 모호하면, **그 영역의 부모 컨테이너 노드를 통째로 `get_screenshot`으로 떠서 단일 PNG로 사용한다.** 개별 에셋을 합성하려고 시도하지 말 것. 합성 실수보다 단일 캡처가 항상 더 정확하다.

**금지사항:**
- ❌ GIF를 그대로 `<img>` 태그로 사용 (검정 배경 + 의도되지 않은 움직임)
- ❌ GIF를 APNG로 변환해서 사용 (여전히 움직임이 들어감)
- ❌ 비디오를 `<video>` 태그로 임베드 (Figma 캔버스에 비디오가 없으면 의도된 게 아님)
- ❌ video 노드 + 정적 오버레이를 코드에서 합성 시도 (부모 컨테이너 캡처로 대체)

**예외:**
- 사용자가 명시적으로 "이 부분은 움직이게 해줘"라고 지시한 경우에만 동적 에셋을 그대로 사용한다
- 예외 적용 시 plan/{섹션명}.md에 사용자 지시 내용을 명시적으로 기록한다

### 단계 1 통과 조건
- [ ] `research/{섹션명}.md` 작성 완료
- [ ] 에셋 목록의 모든 행이 채워져 있음 (빈 칸 금지)
- [ ] **모든 에셋의 "동적 여부" 칸이 채워져 있음**
- [ ] **동적 에셋이 있다면 "정적 프레임 추출"로 처리 방식이 명시되어 있음**
- [ ] **캔버스-에셋 일치 검증 완료** (개수와 시각적 매핑 모두)
- [ ] Figma 베이스라인 스크린샷이 **`figma-screenshots/{섹션명}.png`** (flat 경로, Framelink로 저장)에 존재
- [ ] **변형(transform) 가진 요소가 있다면 rotation·transform-origin·position을 소수점 포함 원본값 그대로 research에 기록** (반올림 금지 — 아래 §2.4 참조)

### 2.4 정밀 수치 규칙 (반올림 금지)

**Figma에서 추출한 수치는 반올림하지 않는다.** 특히 다음 속성들은 회전·변형 요소에서 서브픽셀 누적 오차로 G1을 악화시키므로, 소수점 포함 원본값을 그대로 CSS arbitrary 문법으로 사용:

| 속성 | 올바른 예 | 잘못된 예 |
|------|---------|----------|
| rotation | `rotate-[4.237deg]` | `rotate-[4deg]` |
| position | `left-[123.7px]` | `left-[124px]` |
| letter-spacing | `tracking-[-0.37px]` | `tracking-[-0.4px]` |
| line-height | `leading-[27.4px]` | `leading-[27px]` |
| border-radius | `rounded-[9.5px]` | `rounded-[10px]` |
| transform-origin | `origin-[50%_50%]` 또는 Figma 값 그대로 | 암묵적 default 사용 |

**연관 원칙:**
- `get_design_context`/`get_figma_data`가 반환하는 수치는 소수점이 붙어있으면 그대로 기록
- research 단계에서 transform 가진 요소는 "rotation·origin·position 3종 세트"를 반드시 추출
- plan 단계에서 CSS 값을 적을 때 **소수점 그대로 옮긴다** (편의상 "대강 4도"로 쓰지 말 것)
- 측정 단계에서 G1 diff의 잔여 오차가 카드 가장자리 빨간 띠로 나타나면 **회전/위치 정밀도 부족이 1순위 원인**
- **letter-spacing 단위 함정**: Figma 스타일 토큰의 `letterSpacing` 숫자값은 **percent 단위**일 수 있다. 예: `Text-sm/14R letterSpacing: -0.5` → 실제 CSS는 **-0.07px** (14 × 0.005). **그대로 `-0.5px`로 쓰면 7배 과도**. 반드시 `get_design_context`가 생성한 `tracking-[...]` 값을 원본으로 채택하고, 스타일 토큰 숫자만 보고 px로 오해하지 말 것 (main-intro 회차 2 G1 악화 원인)
- **`<br>` 보존**: Figma가 한글 텍스트에 명시적 `<br>`을 넣었다면 디자이너의 의도적 줄바꿈 위치. 자동 줄바꿈으로 대체하면 줄 높이·컬럼 높이가 달라져 누적 드리프트 발생 → G1 악화
- **음수 width/height 변환 규칙** (main-news 1회차 30% 악화 교훈): `get_design_context`가 `w-[-51.57%]` / `w-[-29.61%]` 같은 음수 width를 내놓을 수 있다. 이는 Figma 내부 mirror 좌표 표현이지 CSS 유효값이 아님. 브라우저는 음수 width를 auto로 처리 → 요소 **렌더 자체가 안 됨**. 변환:
  - `left: L%, width: -W%` → `left: (L-W)%, width: W%, transform: scaleX(-1)`
  - 예: `left-[41.11%] w-[-51.57%]` → `left-[-10.46%] w-[51.57%] -scale-x-100`
  - 음수 height도 동일 규칙으로 `scaleY(-1)` 변환 (height는 사례 미발견이나 원리 동일)
- **design_context의 텍스트 overflow 패턴 원본 유지** (main-news NewsCard 교훈): 카드 본문 등 다줄 텍스트는 `overflow-hidden text-ellipsis w-[min-content]` 같은 정석 패턴이 반환되는데, **`whitespace-nowrap`으로 잘못 제약하면 줄바꿈 사라져 레이아웃 깨짐**. design_context 원본 그대로 복사할 것
- **Framelink SVG에 `scaleY/scaleX` 반전 transform 금지**: `get_design_context`가 `-scale-y-100`/`-scale-x-100` 같은 반전 transform을 명시하더라도, 그건 Figma **내부 저장 형식** 기준 지침이지 Framelink `download_figma_images`가 export한 SVG 기준이 아니다. Framelink는 **display-ready 방향**으로 SVG를 저장하므로 추가 CSS 반전 적용 시 **실제 표시 방향이 뒤집힌다** (pixelmatch 수치상 차이 작지만 **시각적으로 명백한 오류**). main-intro 회차 3에서 Vec6/Vec7 커넥터 방향 반전 확인됨

### 2.5 Framelink PNG는 "완성된 합성 사진"이다 (중요)

**Framelink `download_figma_images`가 반환하는 PNG는 항상 AABB 기준 최종 합성본이다.** 회전·`mix-blend-mode`·배경 채움·알파·그림자 등이 **모두 이미지 자체에 baked-in**된 상태로 나온다. 즉 "**이미 완성된 사진**"으로 취급해야 한다.

**절대 금지:**
- CSS `rotate()` / `transform: rotate` 추가 (이중 회전)
- CSS `mix-blend-mode` 추가 (이중 블렌드)
- 부모 요소에 배경 색 추가 (이미 PNG에 포함)
- 그림자·필터 재적용 (이미 포함)

**권장 배치 패턴:**
```tsx
<div style={{ width: aabbWidth, height: aabbHeight }}  /* Figma metadata AABB */
     className="flex items-center justify-center">
  <img src={png}
       width={nativeWidth}         /* Framelink가 반환한 실제 PNG 크기 */
       height={nativeHeight}
       className="block" />
</div>
```

**왜 wrapper와 inner가 다른가:**
- **Framelink PNG native 크기 ≠ Figma metadata AABB** (차이 예: leaf-top metadata 166.048 vs native 154.5)
- Figma metadata는 canvas 상 bbox (레이아웃 공간 점유)
- Framelink PNG는 실제 렌더된 픽셀 (AABB 안의 유효 영역)
- wrapper를 AABB로 유지해야 주변 레이아웃이 Figma와 일치, inner를 native로 해야 재샘플링 품질 저하 없음

**교훈 히스토리:**
- main-hero 회차 1~6: 카드 PNG에 CSS `rotate()` 추가 → 이중 회전, G1 수렴 실패 → raster 접근 전환 + rotate 제거 후 PASS
- main-programs-card1 회차 1~3: leaf PNG에 CSS `rotate()` + `mix-blend-mode` + bg div 추가 → G1 22.82% → 제거하고 AABB wrapper + native inner 구조로 2.67% PASS

**에셋 다운로드 후 반드시 확인:**
1. `file src/assets/{section}/foo.png` — native 크기 기록
2. Figma metadata의 AABB 크기 비교 — 다르면 "wrapper=AABB, inner=native" 패턴 적용
3. PNG를 Read 도구로 직접 열어 회전·블렌드·배경이 포함된 합성본인지 확인. 포함됐으면 CSS에서 해당 효과 재적용 금지

**Framelink 호출 파라미터 주의 (main-programs-card3 교훈):**
- `nodeId`만 주기 → **AABB 기준 rendered composite PNG** 반환 (정답, 기본으로 사용)
- `imageRef` + `needsCropping: true` 주기 → **4096 raw JPEG** 반환 (cropped PNG 아님, 함정)
- 이유: `imageRef`는 이미지 원본 파일 참조라 Figma가 그대로 반환. `nodeId`는 노드 렌더링 결과.
- 회전·블렌드·배경이 baked-in된 composite이 필요한 경우는 항상 **`nodeId` 방식** 사용
- 예: card2 city-left(`city-left-rendered.png`), card3 city 3종 전부 `nodeId` 기반 rendered 방식으로 성공

**반복 SVG 인스턴스 합성 주의**:
- Figma에서 같은 SVG가 반복 배치된 경우(예: card3의 arrow-chevron 3중첩), Framelink가 **합성 상태 그대로 export**할 수 있음 (64×32 한 장으로 3개가 이미 중첩된 SVG)
- 공통 컴포넌트가 "단일 32×32 SVG를 3회 반복 렌더" 규약이면 충돌. 단일 크기로 분리해서 재생성 필요
- 다운로드 직후 SVG 실측 크기 확인 (`file`·`cat` 또는 에디터로)하고 Figma node 단일 instance 크기와 비교

**Framelink 다운로드 파일명 ≠ 디자인 내용** (main-gallery 교훈):
- design_context가 준 변수명(예: `imgFrame2043685961` → 추정 "cityscape") vs **실제 파일 내용**이 다를 수 있음
- Framelink 파일명은 노드 순서 기반이라 디자이너가 의도한 역할과 무관
- **다운로드 직후 Read 도구로 PNG 실물 확인** 필수. 이름으로 역할 가정 금지
- plan에 "BG 2종: cityscape / paper texture" 라벨 달더라도, 구현 전에 실물-라벨 매칭 재확인
- main-gallery 회차 2(20.91% 악화) 원인이 이 파일명 오인 (라벨 swap)

**RGBA PNG는 JPG로 압축 금지** (main-gallery 교훈):
- JPG는 알파 채널 미지원 → **투명 영역이 검정 픽셀로 치환됨**
- `mix-blend-mode` 적용 시 검정 void 발생 → 시각 오류 (multiply/luminosity 등 모두 영향)
- **알파 포함 PNG는 PNG 그대로 압축**: `sharp.png({ palette: true, quality: 85 })` 또는 `oxipng`
- JPG 변환 허용 조건: 알파 채널 없음 확인 (`file` 명령 출력에 `RGB` vs `RGBA` 구분)
- 예: main-gallery cityscape(JPG q85로 10.58MB→0.86MB), overlay(PNG palette q85로 7.45MB→1.41MB alpha 보존)

**`background-blend-mode: hard-light`는 G1 +1~2%p 구조적 불가피** (contest-hero 교훈):
- Chromium의 `background-blend-mode: hard-light` 합성 공식 vs Figma 렌더러 합성 공식이 다름 (색공간 차이)
- 원 내부/blend 영역에서 픽셀 ±20~50 오차 → G1에 1~2%p 기여
- **우회 전략 모두 막힘**:
  - baseline 재export (Framelink nodeId-only) → baseline 자체는 Figma blend 적용된 PNG지만 capture는 여전히 Chromium blend → 엔진 차이 유지
  - 배경만 raster로 분리 export → Figma 노드 구조상 "배경+원만 있는 wrapper" 부재. 원·배경 fill 분리 export 불가
- **수용 원칙**: `hard-light`·`multiply`·`luminosity` 등 blend 모드를 쓰는 섹션은 G1 임계 5% 초과 가능성 내포
  - 발견 시 다른 규칙(정밀 수치, 텍스트 재구성 등)은 엄격히 지켜 5~7% 선에 수렴
  - blend 모드 다른 섹션에서 재등장하면 동일 패턴 (6% 수렴 후 수용)
- 이 수용은 "코드 품질 문제"가 아니라 "브라우저-디자인툴 렌더 엔진 차이"에 기인 — 육안 검증에서 오류 없으면 OK

### 2.6 baseline PNG 실제 크기 측정 (Figma spec과 다를 수 있음)

Framelink가 반환한 baseline PNG 크기가 **Figma 노드 spec 치수와 다를 수 있다** (예: spec 1416 vs 실제 1404 — 좌측 트림).

**측정 시 실측 선행:**
```bash
file figma-screenshots/{section}.png
```
`PNG image data, WxH, ...` 에서 W·H 확인. 이를 clip 파라미터와 wrapper width에 반영.

**교훈:**
- main-programs-card1 baseline: spec 1416, 실제 1404×805 (좌 12px 트림). clip-x=265 보정 적용 후 diff 매칭.
- spec 치수 맹신하고 측정하면 클리핑 영역이 어긋나 G1 폭증.

**리서치를 건너뛰고 계획으로 가지 말 것.** 60% 결과의 가장 큰 원인이 여기였다.

---

## 3. 단계 2 — 섹션 계획

목적: 코드를 쓰기 전에 **무엇을 어떻게 구현할지 구체적으로 종이에 그린다.** 이 단계에서 코드 파일은 한 줄도 수정하지 않는다.

### 3.1 plan/{섹션명}.md 에 기록할 항목
- **컴포넌트 구조**: 트리 형태로
  ```
  <HeroSection>
    <HeroBackground />          ← 새로 만듦
    <HeroContent>
      <HeroTitle />
      <HeroSubtitle />
      <HeroCTA />               ← 기존 Button 컴포넌트 재사용
    </HeroContent>
  </HeroSection>
  ```
- **새로 만들 파일 경로 목록**
- **수정할 기존 파일 경로 목록**
- **각 컴포넌트의 props 시그니처** (TypeScript 타입)
- **레이아웃 전략**: flex/grid 어떻게 쓸 것인지, 반응형 클래스
- **에셋 사용 계획**: research의 에셋 목록과 1:1 매핑 — 어느 컴포넌트가 어느 에셋을 쓰는지
- **트레이드오프**: 고민한 대안과 선택 이유

### 3.2 코드 스니펫 포함
주요 컴포넌트의 핵심 JSX와 Tailwind 클래스를 스니펫으로 포함한다. 실제 구현 시 이 스니펫을 기반으로 확장한다.

### 단계 2 통과 조건
- [ ] `plan/{섹션명}.md` 작성 완료
- [ ] 모든 에셋이 컴포넌트와 매핑되어 있음
- [ ] **사용자 승인**: 사용자가 plan을 검토하고 메모/수정 후 "구현 시작" 명령을 내릴 때까지 코드 작성 금지
- [ ] 사용자 메모가 있으면 plan을 업데이트하고 다시 승인 요청

`CLAUDE.md`의 3단계(주석 반영)와 동일한 사이클이다.

---

## 4. 단계 3 — 에셋 수집

목적: **모든 에셋을 확보하고, 타입을 검증하고, 후처리한다.** 이 단계는 코드 구현보다 먼저 끝나야 한다.

에셋은 두 종류로 나뉘며 처리 경로가 다르다:
- **정적 에셋** (PNG, JPG, SVG): 다운로드 → 검증 → 후처리
- **동적 에셋** (GIF, MP4, WebM 등): 정적 프레임 추출 (단계 1 2.3 규칙)

### 4.1 다운로드 (정적 에셋)
- `research/{섹션명}.md`의 에셋 목록에서 **"동적 여부"가 "정적"인 행만** 다운로드
- 저장 경로: `src/assets/{섹션명}/raw/`
- **하나도 빠뜨리지 않는다.** 다운로드 누락은 단계 5의 G3 게이트에서 잡히지만, 이 단계에서 막는 게 비용이 훨씬 싸다

### 4.2 정적 프레임 추출 (동적 에셋)
research에서 "동적"으로 표시된 에셋은 다음 절차로 처리한다:

1. **원본 GIF/비디오를 다운로드하지 않는다.** (또는 다운로드해도 코드에서 사용하지 않는다)
2. 해당 노드 ID로 Figma MCP `get_screenshot` 호출:
   - 옵션: PNG 포맷, 충분히 높은 해상도(2x 또는 그 이상)
   - 배경: 투명 (가능한 경우)
3. 결과 PNG를 `src/assets/{섹션명}/`에 저장 (raw/ 하위가 아니라 바로 사용 위치로)
4. 파일명 규칙: `{원래에셋이름}-static.png` (원본과 구분하기 위해)

**검증**: 추출된 PNG를 열어 Figma 캔버스에서 보이던 정적 표현과 일치하는지 눈으로 확인. 일치하지 않으면 다시 추출 (해상도 조정, 배경 옵션 변경 등).

### 4.3 타입 검증 (정적 에셋만, 강제)
- `scripts/verify-assets.sh src/assets/{섹션명}/raw/` 실행
- 모든 정적 파일에 대해:
  ```bash
  file <파일>
  ```
  결과의 실제 타입과 확장자가 일치하는지 확인
- 불일치 시 **올바른 확장자로 rename** (예: PNG라고 받았는데 SVG면 `.svg`로)
- **만약 다운로드한 파일이 GIF/비디오로 판명되면**: 즉시 단계 1로 돌아가서 research의 "동적 여부" 칸을 갱신하고 4.2 절차로 처리

### 4.4 후처리 (정적 에셋만)
- 검정 배경 PNG → 투명: `scripts/process-assets.py`
- SVG → SVGO 최적화
- 처리된 파일은 `src/assets/{섹션명}/` 루트로

> **참고**: 기존 문서에 있던 "GIF → APNG", "Video → WebM" 항목은 제거되었다. 이 프로젝트는 Figma 캔버스의 정적 표현을 진실의 원천으로 하므로, 동적 에셋은 4.2의 정적 프레임 추출로 처리한다.

### 4.5 에셋 카탈로그 갱신
`plan/{섹션명}.md`의 에셋 매핑 표에 다음 컬럼을 추가:
```markdown
| ... | 처리 경로 | 검증 결과 | 최종 파일 |
|-----|-----------|-----------|-----------|
| ... | 다운로드  | OK (PNG)  | src/assets/hero/bg.png |
| ... | 정적 추출 | get_screenshot OK | src/assets/cert/icon-static.png |
```

### 단계 3 통과 조건
- [ ] research의 정적 에셋 행 수 = 다운로드된 파일 수 (개수 일치)
- [ ] research의 동적 에셋 행 수 = 정적 프레임 추출된 PNG 수 (개수 일치)
- [ ] `verify-assets.sh` 통과 (모든 정적 파일 타입 일치)
- [ ] 동적 에셋의 정적 프레임이 Figma 캔버스 표현과 시각적으로 일치 (눈 확인)
- [ ] 모든 에셋이 plan의 카탈로그 표에 매핑됨
- [ ] 후처리가 필요한 에셋은 후처리 완료

**누락된 에셋 1개 = 단계 3 미통과.** 코드 시작 금지.

---

## 5. 단계 4 — 구현

목적: plan을 **기계적으로** 코드로 옮긴다. 이 단계에서 새로운 결정을 만들지 않는다.

### 5.1 구현 원칙
- plan/{섹션명}.md를 정확히 따른다
- plan에 없는 컴포넌트/파일/의존성을 임의로 추가하지 않는다
- 새로운 npm 패키지가 필요하면 **멈추고 사용자에게 묻는다** (`CLAUDE.md` 5.2)
- `any`, `unknown` 타입 금지 (`react.md`의 4번 규칙)
- 디자인 토큰 CSS 변수 사용. 임의값(magic number) 금지

### 5.2 SVG 배치 패턴 (반드시)
SVG는 항상 부모 컨테이너 + 원본 사이즈 패턴으로:
```tsx
<div className="w-[28px] h-[28px] flex items-center justify-center">
  <img src={hamburgerIcon} className="w-[21px] h-[8.75px]" alt="" />
</div>
```
**금지**: SVG에 임의의 `w-7 h-7` 같은 클래스를 직접 부여하기

### 5.3 반응형 패턴
- 모바일 우선 (`px-6 md:px-12 xl:px-[252px]`)
- Figma 1920px 디자인을 1440px / 768px / 375px로 어떻게 적응시킬지 plan에 명시된 대로
- 고정 픽셀 width 금지 — `max-w-*` + `mx-auto`

### 5.4 빌드 통과 확인
구현이 끝나면 다음을 모두 통과해야 단계 5로 넘어간다:
```bash
npm run build       # 빌드 성공
npm run lint        # 린트 통과
npx tsc --noEmit    # 타입 체크 통과
```

### 단계 4 통과 조건
- [ ] plan에 명시된 모든 파일 생성/수정 완료
- [ ] plan의 체크박스 모두 체크됨
- [ ] 빌드/린트/타입 체크 통과
- [ ] dev 서버에서 해당 라우트가 에러 없이 로드됨

---

## 6. 단계 5 — 측정 (4 게이트)

**여기가 핵심이다.** 60% 결과가 나온 이유는 이 단계를 건너뛰었기 때문이다.

### 6.1 측정 실행

**기본(풀폭 섹션):**
```bash
scripts/compare-section.sh {섹션명}
```

**floating/중앙정렬 요소(예: Header GNB)**: 뷰포트 전체가 아니라 요소 영역만 캡처해야 baseline과 크기가 일치한다. `run.ts`의 clip 옵션 직접 호출:
```bash
npx tsx tests/visual/run.ts --section {섹션명} --url http://127.0.0.1:5173/__preview/{섹션명} --baseline figma-screenshots/{섹션명}.png --clip-x {x} --clip-y {y} --clip-w {width} --clip-h {height}
```
- clip 값은 research/{섹션명}.md의 "Figma 캔버스 좌표" 섹션(x, y, width, height)과 동일하게 지정
- 1920 뷰포트에서 Figma 캔버스 좌표와 DOM 좌표가 일치하도록 preview 라우트를 구성해야 함 (백그라운드 색·overflow 제거)

**Preview 라우트 배경색은 반드시 `bg-white`** (main-programs-card3 4회차 교훈):
- Framelink baseline PNG가 **alpha=0 투명 픽셀을 white로 blend**하는 렌더러 기본 동작 때문
- preview에 `bg-black` 또는 다른 색 쓰면 pixelmatch diff가 **47% 수준으로 폭증**
- 어두운 테마 섹션(card1 녹색, card2 남색, card3 갈색 등)도 **외부 wrapper는 white**, 카드 자체 bg로 어두운 색 적용
- 예: `<div className="w-[1920px] h-[1040px] mx-auto bg-white">{section}</div>` (격리 preview 라우트 표준)

**Preview 페이지 너비가 1920보다 좁으면 clip 인자 필수** (contact-form 1회차 57% 폭증 교훈):
- `compare-section.sh`의 default 동작은 **1920 viewport에서 fullPage 캡처**
- preview 라우트가 938×695처럼 작은 단독 렌더라도 캡처는 1920 viewport 전체 → baseline 938×695와 사이즈 mismatch → pixelmatch가 padding으로 대량 diff
- 해결: `--clip-x {섹션x} --clip-y 0 --clip-w {baseline_w} --clip-h {baseline_h}` 명시
  - 예: `bash scripts/compare-section.sh contact-form --clip-x 491 --clip-y 0 --clip-w 938 --clip-h 695`
  - 좌표는 preview 페이지에서 컨테이너의 실제 위치 (보통 `mx-auto`로 중앙정렬 시 `(1920 - baseline_w) / 2`)
- 풀폭 1920 섹션은 clip 불필요 (default와 일치)

이 스크립트/스크립트조합이 수행해야 할 일:
1. dev 서버에서 해당 섹션 URL 캡처 (clip 지정 시 해당 영역만)
2. **`figma-screenshots/{섹션명}.png`**(flat, Framelink 저장 경로)와 pixelmatch
3. diff 이미지 생성 → `tests/visual/diffs/{섹션명}.diff.png`
4. diff % 출력
5. Playwright로 computed style 측정 → JSON 출력

### 6.2 4가지 게이트

| 게이트 | 측정 항목 | 통과 기준 | 측정 방법 |
|--------|----------|-----------|-----------|
| **G1. 시각 일치** | pixelmatch diff | < 5% | `compare-section.sh` 출력 |
| **G2. 치수 정확도** | font-size, margin, padding, gap | font ±1px, 나머지 ±2px | Playwright computed style |
| **G3. 에셋 무결성** | 모든 `<img>` 태그 | `naturalWidth > 0` 전부 통과 | Playwright DOM 검사 |
| **G4. 색상 정확도** | 주요 텍스트/배경 색상 | Figma spec hex와 동일 | Playwright computed style |

### 6.3 측정값 기록
`plan/{섹션명}.md` 하단에 **측정 섹션**을 추가하고 결과를 적는다:

```markdown
## 측정 결과 (시도 1회차)
- G1 시각 일치: 7.2% ❌ (목표 < 5%)
- G2 치수: title font-size 32px (Figma 36px) ❌, 나머지 OK
- G3 에셋: 5/5 ✅
- G4 색상: primary #2D5A27 ✅, accent #5A7D52 ❌ (Figma #5A7E50)
```

**측정값이 기록되지 않은 섹션은 미완료다.** 눈으로 보고 "괜찮아 보임"은 측정이 아니다.

### 단계 5 통과 조건
- [ ] 4개 게이트 모두 측정 완료
- [ ] 측정값이 plan에 숫자로 기록됨
- [ ] 4개 게이트 모두 통과
- [ ] **baseline/capture/diff 3종 이미지 육안 스캔 완료** (아래 §6.4 참조) — semantic 오류 없음 확인
- [ ] 위 4조건 모두 만족 → 단계 7로
- [ ] 하나라도 미통과 → 단계 6으로

### 6.4 G1 수치 외 육안 semantic 검증 (필수)

**G1 수치 PASS = 섹션 완료가 아니다.** pixelmatch는 픽셀 단위 밀도만 비교하므로 다음 류의 **semantic 오류를 놓친다**:

| 오류 유형 | 수치상 영향 | 실제 심각도 | 원인 예시 |
|---------|------------|------------|----------|
| 방향 반전 (SVG flip) | 작음 (0.05%p 수준) | **명백한 시각 오류** | `-scale-y-100`을 Framelink SVG에 잘못 적용 |
| 요소 위치 swap | 작음~중간 | 레이아웃 의도 어긋남 | 좌우/상하 자식 순서 실수 |
| 색상 반전 (BG 다크/라이트 swap) | 중~큼 | 테마 완전 어긋남 | section 배경 처리 오류 |
| 텍스트 줄바꿈 위치 | 작음 (누적은 중간) | 레이아웃 드리프트 | `<br>` 누락 + 자동 wrap |
| 아이콘 모양 불일치 | 작음 | 브랜드 혼동 | 잘못된 에셋 매칭 |

**검증 절차 (단계 5 말미에 반드시 수행):**

1. `figma-screenshots/{section}.png` (또는 `{page}-{section}.png`) 를 이미지 뷰어로 연다
2. `tests/visual/captures/{section}.png` 를 같이 연다
3. `tests/visual/diffs/{section}.diff.png` 를 같이 연다
4. **섹션을 섹션별로 스캔** (텍스트 블록 / 이미지 / 아이콘 / 커넥터 / 버튼 각각):
   - 방향·위치·색·모양이 일치하는가?
   - diff 이미지의 빨간 영역이 sub-pixel AA 노이즈인가, 아니면 semantic 오류의 증상인가?
5. semantic 오류 발견 시 수치와 무관하게 **단계 6 재진입**. plan 측정 섹션에 "육안 검증에서 X 오류 발견, 회차 N에서 수정" 기록

**워커 책임:** 육안 검증 없이 "G1 PASS, 완료" 보고 금지. 오케스트레이터도 육안 없이 승인 게이트 처리 금지.

---

## 7. 단계 6 — 수정 루프 (최대 3회)

게이트 미통과 시 수행한다.

### 7.1 수정 절차
1. **diff 이미지 직접 확인** — `tests/visual/diff/{섹션명}.png`를 열어 차이 부위 식별
2. **차이의 원인 분류**:
   - 위치/크기 차이 → 패딩/마진/사이즈 클래스 수정
   - 색상 차이 → 토큰 매칭 재확인 (Phase 1까지 거슬러 올라갈 수도)
   - 폰트 차이 → line-height/letter-spacing 보정값 재확인
   - 에셋 차이 → 단계 3으로 돌아가서 에셋 재확인
3. **해당 부분만 수정** — 다른 부분 건드리지 않기
4. **재측정** — `compare-section.sh` 다시 실행
5. plan의 측정 섹션에 N회차 결과 추가

### 7.2 3회 시도 후에도 미통과 시
**임의로 우회하지 않는다.** 사용자에게 다음 형식으로 보고하고 멈춘다:

```markdown
## 섹션 [섹션명] 게이트 미통과 보고

- 시도 횟수: 3회
- 미통과 게이트: G1 (현재 6.8%, 목표 < 5%)

### diff 분석
- 우측 상단 아이콘 영역: 약 3% 차이
- 본문 텍스트 줄간격: 약 1.5% 차이

### 시도한 수정
1. 1회차: 패딩 조정 → 7.2% → 6.9%
2. 2회차: 폰트 line-height 조정 → 6.9% → 6.8%
3. 3회차: 아이콘 사이즈 조정 → 6.8% (변화 없음)

### 의심되는 원인
- Figma 원본의 SVG 아이콘이 viewBox와 다른 사이즈로 렌더링되는 것으로 보임
- 사용자 결정 필요: (a) 게이트 기준 완화 (b) 디자인과 다른 방식 채택 (c) 추가 디버깅
```

---

## 8. 단계 7 — 커밋

모든 게이트를 통과한 후에만 수행한다.

### 8.1 커밋 전 최종 확인
- [ ] 4개 게이트 모두 통과 (측정값이 plan에 있음)
- [ ] 빌드/린트/타입 체크 다시 한 번 통과
- [ ] dev 서버에서 깨진 곳 없음 (눈으로도 확인)

### 8.2 커밋
```bash
git add .
git commit -m "feat(section): {페이지}-{섹션명} 구현 (diff X.X%)"
git push origin feat/section-{페이지}-{섹션명}
```

커밋 메시지에 **반드시 측정된 diff %를 포함한다.** 나중에 git log로 품질 추적이 가능해진다.

### 8.3 PROGRESS.md 갱신
프로젝트 루트 `PROGRESS.md`의 해당 섹션을 체크. diff %도 함께:
```markdown
- [x] Hero (diff 3.2%)
```

### 단계 7 완료 = 섹션 완료
다음 섹션으로 넘어간다. **이전 섹션의 코드를 더 이상 건드리지 않는다.** 추가 수정이 필요하면 별도 브랜치/커밋으로.

---

## 9. 절대 하지 말 것 (요약)

- ❌ 리서치 없이 계획으로 점프
- ❌ 사용자 승인 없이 plan에서 구현으로 점프
- ❌ 에셋 다운로드를 미루고 코드부터 작성
- ❌ 에셋 URL을 CSS/유니코드로 대체
- ❌ SVG에 임의의 width/height 클래스 부여
- ❌ **GIF/비디오 같은 동적 에셋을 그대로 사용** (Figma 캔버스의 정적 표현을 따라야 함 — 단계 1 2.3 참조)
- ❌ **동적 에셋을 APNG/WebM으로 변환해서 움직임 유지** (사용자가 명시 지시한 경우 제외)
- ❌ 측정 없이 "괜찮아 보임"으로 단계 5 스킵
- ❌ 게이트 미통과 상태로 커밋
- ❌ 3회 시도 후 임의 우회 (반드시 사용자에게 보고)
- ❌ 한 브랜치에 여러 섹션 섞기
- ❌ 이전 섹션 코드를 같은 PR에서 함께 수정

---

## 10. 작업 시작 시 Claude에게

이 문서를 읽었다면 섹션 구현을 시작할 때 다음을 수행한다:

1. `docs/figma-workflow.md`의 Phase 1, 2가 완료되었는지 확인
2. 이 문서의 단계 1부터 **순서대로** 진행
3. 각 단계의 통과 조건을 만족할 때까지 다음 단계로 넘어가지 않는다
4. 단계 2 종료 시 **반드시 사용자 승인을 받는다**
5. 단계 5의 측정값은 **반드시 숫자로 plan에 기록**
6. 단계 6에서 3회 시도 후 미통과 시 **반드시 멈추고 보고**
7. 단계 7 완료 후 PROGRESS.md를 갱신하고 다음 섹션으로
