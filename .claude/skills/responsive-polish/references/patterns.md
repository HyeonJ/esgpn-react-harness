# Responsive Polish — 패턴 카탈로그

각 패턴은 실제 ESGPN 프로젝트 작업에서 검증된 형태. 새 패턴 발견 시 하단에 추가.

## §1. Overflow 해소 (가로스크롤 제거)

### 1-1. 섹션 루트 고정폭 → 표준 컨테이너
```diff
- className="relative w-[1920px] h-[1040px] mx-auto"
+ className="relative max-w-[1920px] w-full mx-auto"
```
- `h-` 는 그대로 유지 가능 (내부 % 기반이면)
- 이미 ESGPN 24개 섹션 적용 완료 (feat/width-1920-fixed 머지)

### 1-2. 큰 좌우 패딩 responsive 축소
```diff
- className="px-[252px]"
+ className="px-6 md:px-12 xl:px-[252px]"
```
- 375: 24px / 768: 48px / 1280+: 252px (Figma)
- `py-[120px]` 도 동일 패턴: `py-16 md:py-24 xl:py-[120px]`

### 1-3. `whitespace-nowrap` 긴 한글
```diff
- className="text-[20px] whitespace-nowrap"
+ className="text-[20px] xl:whitespace-nowrap"
```
- 또는 `line-clamp-2 xl:line-clamp-none` 로 제한

### 1-4. 내부 고정폭 블록
```diff
- className="w-[576px]"
+ className="w-full xl:w-[576px]"
```

### 1-5. 부모 overflow-hidden으로 clip (Figma 원본 intentional overflow 보존)
자식이 `absolute left-[Npx] w-[Mpx]` (픽셀 고정) 로 1920 기준 배치돼서 좁은 뷰포트에서 삐져나갈 때, 자식을 건드리지 않고 부모에서 clip:
```diff
- className="relative ..."  (섹션 base)
+ className="relative overflow-hidden xl:overflow-visible ..."
```
- 좁은 뷰포트: `overflow-hidden` 으로 삐져나간 부분 시각적으로 자름 (가로스크롤 방지)
- 1920: `xl:overflow-visible` 로 원본 디자인 복원 (디자이너가 intentional 로 그린 경우)
- ESGPN MainProgramsCard1/2/3 에서 적용됨 (FloatingCity 가 left=861 w=555 = right=1416)

### 1-6. nav / 링크 list 가 nowrap 으로 overflow
Footer / Header 의 `flex h-[21px]` 가로 링크들이 whitespace-nowrap 이라 좁은 뷰포트에서 넘침:
```diff
- className="flex items-center gap-4"
+ className="flex flex-wrap xl:flex-nowrap items-center gap-y-2 gap-x-4"
```
- 좁은 뷰포트: 2-3줄로 줄바꿈
- 1920: 원본 1줄 유지

### 1-7. Overflow 감지 스크립트
`tests/visual/find-overflow.ts` 실행 — 뷰포트 초과 요소 찾아줌

---

## §2. Stacking (2컬럼 → 1컬럼)

### 2-1. 좌우 분할 → 상하 분할
```diff
- className="flex gap-[40px] items-start"
+ className="flex flex-col xl:flex-row gap-8 xl:gap-[40px] items-start"
```
- gap도 `gap-8 xl:gap-[40px]` 식으로 반응형
- 자식 너비는 `w-full xl:w-[576px]` 로 함께 수정

### 2-2. 4카드 grid
```diff
- className="flex gap-6"
+ className="grid grid-cols-1 md:grid-cols-2 xl:flex xl:gap-6"
```

### 2-3. 텍스트-이미지 병렬
이미지 먼저 보여주고 싶으면 `flex-col-reverse xl:flex-row`

### 2-4. Equal-weight 3+ cards (Hero feature, 주요사업 3-column 패턴)
3개 이상 **동등한 중요도** 카드가 `flex-row` 인데 모바일/태블릿 viewport 합계 초과 시 **mobile~tablet 전부 stack**:
```diff
- <div className="flex flex-row justify-center gap-6">  (3 cards)
+ <div className="flex flex-col xl:flex-row justify-center items-center gap-6">
```
- **`md:flex-row` 넣지 말 것**: 768에서도 3카드 × 280px = 840 > 768 → 잘림 재발
- 디자이너가 "다 보여줘야 한다"고 명시한 경우에만 stack. 대부분 1920 Hero/Feature 3-column은 동등 중요도라 stack이 기본
- 대안: Horizontal snap scroll — 더 모바일다움. 단, 힌트(peek) 필수. 기본은 stack 권장 (NN/G: 2%만 carousel 넘어감)

---

## §3. 타이포 스케일

### 3-1. 큰 헤딩 축소
```diff
- style={{ fontSize: "100px" }}
+ className="text-[48px] md:text-[72px] xl:text-[100px]"
```

### 3-2. 본문은 대체로 그대로
14~18px 본문은 모든 뷰포트에서 유지 가능. 줄 길이만 관리

---

## §4. 내부 절대위치 — 조건부 decouple 허용

### 4-1. 유지할 것 (% 기반)
`absolute left-[X%] top-[Y%] w-[Z%]` 같은 **Figma 원본 퍼센트 기반 위치는 비율 유지되므로 수정 금지**.

### 4-2. decouple 해야 할 것 (px 고정 + 실 컨텐츠)
`absolute left-[408px] w-[620px]` 같은 **픽셀 고정 + 실제 텍스트/이미지가 들어있는** 블록은 좁은 뷰포트에서 잘리면 UX 문제. Figma 원본 유지하되 좁은 뷰포트에선 decouple:

```diff
- <div className="absolute left-[408px] top-[120px] w-[620px] flex flex-col">
+ <div className="relative xl:absolute xl:left-[408px] xl:top-[120px] w-full xl:w-[620px] flex flex-col">
```
- 좁은 뷰포트(<xl): `relative` + `w-full` 로 normal flow에 정상 진입
- xl 이상: 원본 Figma 절대위치 그대로 복원

### 4-3. clip만 쓰면 안 되는 이유
`overflow-hidden xl:overflow-visible` 으로 clip만 하면 `document.scrollWidth === clientWidth` PASS 하지만, **내부 컨텐츠가 오른쪽으로 잘려 사라짐 → 실제 UX 실패**. 이 경우 §4-2 decouple 패턴 필수.

### 4-4. clip 여전히 유효한 케이스
자식이 **장식 요소**(blob, 배경 이미지, 그라디언트)인 경우엔 `overflow-hidden xl:overflow-visible` 로 clip OK. 실 컨텐츠 있으면 §4-2 필수.

### 판별 기준
- `detect-cutoff.mjs` 의 `h-overflow` (UNCLIPPED) → §1 패턴
- `h-overflow-clipped` + 실제 텍스트/이미지 포함 → §4-2 decouple
- `h-overflow-clipped` + 장식만 → §1-5 clip 유지 OK

---

## §5. Header / Footer — 특수 케이스

Header fixed floating pill: `references/hamburger-without-design.md` 참조

Footer 큰 좌우 패딩 `px-[252px]`: `px-6 md:px-12 xl:px-[252px]` + 2컬럼 → `flex-col xl:flex-row`

---

## §8. Fixed-height 섹션의 반응형 대응

Figma 1920 디자인은 섹션 높이가 픽셀 고정 (`h-[1040px]`, `h-[1888px]`). 좁은 뷰포트에서 stack 적용 후 세로로 늘어난 콘텐츠가 고정 높이를 초과 → `overflow-hidden` 이면 아래쪽 잘림.

### 패턴
```diff
- className="relative w-full h-[1040px] overflow-hidden"
+ className="relative w-full min-h-[1040px] xl:h-[1040px] overflow-visible xl:overflow-hidden"
```
- 좁은 뷰포트: `min-h` 로 최소 보장 + `overflow-visible` 로 콘텐츠 따라 자람
- 1920: `xl:h` 로 원본 고정 + `xl:overflow-hidden` 으로 장식/배경 clip 복원

### 더 느슨하게 (좁은 뷰포트 min-h 도 풀기)
```diff
- className="h-[1040px] overflow-hidden"
+ className="xl:h-[1040px] overflow-visible xl:overflow-hidden"
```
- 좁은 뷰포트: 콘텐츠 크기 그대로 (min-h 강제 X)
- 1920: 원본 유지

### 감지
`detect-cutoff.mjs` 의 `v-overflow-clipped-content` — 자식 bottom > 부모 height 이고 본문 포함 시 리포트

### 주의
- `xl:h-[Npx]` 중요 — 1920에선 원본 높이 유지해야 픽셀 매칭
- 같은 섹션에 `overflow-hidden` 없이 `absolute` 배치 자식이 있으면 좁은 뷰포트에서 튀어나갈 수 있음 → §4-2 decouple 병행
- Hero 같이 배경 이미지가 섹션 bottom 에 뿌리박힌 디자인은 min-h 없이 단순 `xl:h-` 만 적용 권장 (배경은 `xl:overflow-hidden` 으로 clip)

## §6. 금지 패턴

- `hidden md:block` 로 모바일 전용 요소 만들기 — 디자이너 승인 필요
- `md:text-xl` 같은 Tailwind preset — arbitrary `text-[Npx]` 로 Figma 값 그대로 쓰기
- 요소 순서 재배열 (`order-1`) — 스크린 리더 / SEO 영향
- 아이콘 → 텍스트 치환 (ex. 모바일엔 "메뉴" 텍스트 표시) — 디자이너 영역

---

## 새 패턴 추가 가이드

여기에 패턴 추가 시:
1. Before/After 코드 diff 포함
2. 어느 뷰포트에서 적용되는지 명시
3. Figma 원본 영향 없는지 확인 (xl 이상에서 원본 유지)
4. 한 줄 "왜" 설명
