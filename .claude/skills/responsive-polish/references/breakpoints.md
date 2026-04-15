# Breakpoints

## 표준 선택 (Tailwind v4 기본)

| prefix | min-width | 대상 | 이 프로젝트 사용 여부 |
|---|---|---|---|
| (none) | 0 | mobile 375 기준 | 기본 |
| `sm:` | 640 | 큰 모바일 / 작은 태블릿 | 선택적 |
| `md:` | 768 | 태블릿 세로 | **주력** |
| `lg:` | 1024 | 태블릿 가로 / 작은 랩톱 | 선택적 |
| `xl:` | 1280 | 데스크톱 / Figma 기준 | **주력** |
| `2xl:` | 1536 | 큰 데스크톱 | 미사용 |

## 실용 기본 전략

- **`md` + `xl` 2-bp 만 써도 대다수 OK.** mobile → tablet → desktop 3단계
- **Figma 1920 디자인 보존:** 반응형 스타일은 `xl:` 바로 아래 구간에서 잘 끊는다
  ```html
  <div className="px-6 md:px-12 xl:px-[252px]">
  <!-- 0~767: px-6, 768~1279: px-12, 1280+: px-[252px] (Figma 원본) -->
  ```
- **왜 `xl:1280` 인가**: Figma 1920 디자인은 보통 1280 이상에서 원본 레이아웃 기대. 1280 미만에서 축소/재배치가 자연스러움

## 3단계 이상 필요한 경우

텍스트 사이즈처럼 완만한 grad 필요 시 `md` / `lg` / `xl` 3단계:
```html
text-[28px] md:text-[36px] xl:text-[48px]
```

## 안 쓰는 prefix

- `sm:640` — 모바일 375부터 640까지 커버하기엔 중간값. 생략해도 무관
- `2xl:1536` — Figma 기준이 1920이라 2xl에 추가 스타일 불필요
- arbitrary breakpoint (`[700px]:`) — 표준 집합으로 충분, 쓰지 말 것

## 레퍼런스

- Tailwind 공식: https://tailwindcss.com/docs/responsive-design
- NN/G breakpoints: 320 / 480 / 768 / 1024 / 1200 / 1440
- 개발자가 재량으로 추가 가능 (레이아웃 재설계는 제외)
