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

### 1-5. Overflow 감지 스크립트
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

## §4. 내부 절대위치 — 건드리지 말 것

`absolute left-[X%] top-[Y%] w-[Z%]` 같은 Figma 원본 퍼센트 기반 위치는 **좁은 뷰포트에서도 비율 유지되니 수정 금지**.

예외: `absolute left-[408px] width-[286px]` 처럼 px 고정 + 부모 overflow-hidden 없음 → 좁은 뷰포트에서 밖으로 튀어나감. 이때만 container에 `overflow-hidden` 추가 (좁을 때만 잘라내기).

---

## §5. Header / Footer — 특수 케이스

Header fixed floating pill: `references/hamburger-without-design.md` 참조

Footer 큰 좌우 패딩 `px-[252px]`: `px-6 md:px-12 xl:px-[252px]` + 2컬럼 → `flex-col xl:flex-row`

---

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
