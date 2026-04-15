# Card 리사이즈 규칙

1920 기준 디자인 카드가 375/768에서 너무 크거나 깨질 때 적용할 규칙.

## 1. 우선순위

1. **카드 내부 비율 유지** (aspect-ratio / padding 비율)
2. **고정 aspect ratio로 width 축소** — height는 자동 따라감
3. **폰트·아이콘은 2단계 스케일 이상 금지** — mobile/desktop 2단계면 충분

## 2. 패턴

### 2-1. 가로 카드 stretch → 최대폭 제한
```diff
- className="w-[456px] h-[302px]"
+ className="w-full max-w-[456px] aspect-[456/302] sm:h-[302px]"
```
- aspect-ratio 로 비율 유지. 폭은 부모 컨테이너에 맞춰 축소
- sm:640 이상에서 원본 height 고정

### 2-2. 세로 카드 (세로 길이 가변)
```diff
- className="w-[320px] h-[400px]"
+ className="w-full max-w-[320px]"
```
- height 는 콘텐츠 따라가게 두기

### 2-3. 그리드 내 카드
```diff
- <div className="flex gap-6">  (4카드)
+ <div className="grid grid-cols-1 md:grid-cols-2 xl:flex xl:gap-6">
```
- mobile: 1열 스택
- md: 2×2 grid
- xl: Figma 원본 4열 flex

### 2-4. 카드 내부 패딩
```diff
- className="p-[40px]"
+ className="p-6 md:p-8 xl:p-[40px]"
```

### 2-5. 카드 내부 아이콘 크기
아이콘 크기는 2단계:
```diff
- className="w-[100px] h-[100px]"
+ className="w-[64px] h-[64px] xl:w-[100px] xl:h-[100px]"
```

## 3. 안 건드릴 것

- 카드 내부 **절대위치 장식 요소** (`absolute left-[X%]`) — 비율 기반이면 자동 대응
- 카드 boarder / radius — Figma 값 유지
- 카드 그림자 / 블렌드 모드 — Figma 값 유지

## 4. 검증

카드 변경 후 375/768/1920 캡처 필수. 특히 375에서:
- 텍스트 잘림 여부
- 버튼 터치 영역 최소 44px (WCAG 2.5.5)
- 이미지 aspect-ratio 유지되는지
