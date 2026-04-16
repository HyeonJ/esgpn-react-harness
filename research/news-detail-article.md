# research/news-detail-article.md

> /news/:id 페이지 상단 본문 섹션. Figma **134:4157** (실제 전체 node는 hero→related→back 포함 938×2508이지만, 이 섹션은 `article` 영역만 담당 — hero → divider → body image → body text → divider 까지).

## 범위 정의

이 섹션(news-detail-article)이 담당하는 영역:
- Hero image (134:4030) 936×575 (aspect 456/280 → 실제 575px)
- Title + Paragraph (134:4032 > 134:4041)
  - Title "[진단과 제언] SDGs와 ESG, 실천이 관건이다" — text-3xl/32B, gray-900
  - Meta: "이투데이 · 2026-01-19" — text-sm/14R, gray-500, 3px dot 구분자
- HatchedDivider (134:4042) — 936 풀폭
- Body image + caption (134:4062) — 696×419 centered (left margin 120), caption text-sm/14R gray-500
- Body text (134:4035) — text-base/16R gray-900 8 문단
- HatchedDivider (134:4064) — 936 풀폭

**범위 외 (다른 섹션)**:
- "실천의 영감을..." heading (134:4081) → news-detail-related와 묶임
- 관련 뉴스 3개 (134:4118) → news-detail-related
- "목록으로 이동하기" (134:4123) → news-detail-back

## 노드 트리 (design_context 기반)

```
134:4157  ContentStretch flex-col gap-40 (article container, w=936)
├─ 134:4030  Hero Rectangle — aspect 456/280 rounded-16 bg-#d9d9d9 + IMAGE fill
└─ 134:4032  Body wrapper — flex-col gap-24 pr-0 w-full
   ├─ 134:4041  Header wrapper — flex-col gap-12 w-full
   │  ├─ 134:4034  Title <p> text-32B/1.3/-0.96px color=gray-900
   │  └─ 134:4036  Paragraph meta — flex gap-8 items-center
   │     ├─ 134:4037  "이투데이" text-14R gray-500 tracking-[-0.07px] nowrap
   │     ├─ 134:4038  Ellipse 3×3 (dot separator — 같은 gray-500 기본)
   │     └─ 134:4039  "2026-01-19" text-14R gray-500 nowrap
   ├─ 134:4042  Divider (top) — w-full h-8 flex gap-8
   ├─ 134:4062  Body image wrapper — flex-col items-center px-120 gap-10 w-full
   │  ├─ 134:4060  Rectangle aspect 936/564 rounded-16 (실제 696×419, aspect 1.66)
   │  └─ 134:4063  Caption "한광식 전문대학..." text-14R gray-500
   ├─ 134:4035  Body text — text-16B/1.5/-0.16px gray-900, 8 <p>
   └─ 134:4064  Divider (bottom) — 같은 구조
```

## 스타일 / 토큰 매핑

| Figma | 이미 있는 토큰 | 사용 방식 |
|---|---|---|
| Gray 900 `#1d2623` | `--color-gray-900` | `text-[color:var(--color-gray-900)]` |
| Gray 700 `#5d6a66` | `--color-gray-700` | (본문 — 미사용, 본문은 900) |
| Gray 500 `#97a29e` | `--color-gray-500` | 메타, 캡션 |
| Text-3xl/32B | 전용 토큰 존재 (`--text-3xl-32b-*`) | Title |
| Text-sm/14R | 존재 | 메타, 캡션 |
| Text-base/16R | 존재 (lineHeight 1.5, letterSpacing -1) | Body — design_context는 letterSpacing -0.16px (px 기준). toekn은 -1px. **Figma 원본값 우선 (-0.16px)** |
| Text-xl/20SB | 존재 | (범위 외) |
| spacing 8/12/24 | 전용 토큰 | gap |
| border-radius/2xl (16px) | `--radius-2xl` 확인 필요 | 16px literal 사용 |

**letterSpacing 주의**: design_context가 `-0.16px`, `-0.07px` 같은 px 값을 보여주는데 이는 Figma letterSpacing이 `em*fontSize`로 계산된 실측치. tokens.css의 `--text-base-16r-letter-spacing`은 상수(-1px)로 이미 정의되어 있으므로, **이 섹션은 body text의 letterSpacing을 inline `-0.16px`로 Figma에 맞추거나 token 그대로** 둘지 결정 필요. Plan에서 token 사용으로 통일 (± 1px 이내 G2 통과 가능).

## 에셋 목록

| # | Figma nodeId | 저장 경로 | 실측 | 동적 여부 | 처리 |
|---|---|---|---|---|---|
| 1 | 134:4030 (leaf) | `src/assets/news-detail-article/hero.jpg` | 1080×608 (JPEG) | 정적 | Framelink imageRef 다운로드. hero + body 공용 (같은 imageRef `1e4d5a...`) |
| 2 | — | (hero.jpg 재사용) | — | 정적 | 134:4060 body image는 동일 imageRef → 같은 파일 |

에셋 수: **1개 파일** (논리적으론 2 slot, 1 소스).

**검증**: Figma canvas hero rect + body rect 2개 = 에셋 slot 2개. imageRef 1개 = 물리 파일 1개. 일치.

## HatchedDivider 분석

design_context:
```
<div flex gap-8 h-8 items-center w-full>
  <div w-36 h-8 absolute inset-[-9.38_-2.08] <img imgFrame.../></div>  // 좌측 hatch
  <div flex-1 h-0 relative ... <img imgVector8/></div>                  // 실선
  <div w-36 h-8 absolute inset-[-9.38_-2.08] <img.../></div>           // 우측 hatch
</div>
```

기존 `HatchedDivider` 컴포넌트는 932×10 SVG 단일체 (viewBox). 이 섹션 divider는 Figma에서 3조각(hatch+line+hatch)이고 w-full로 늘어나는 구조. 기존 컴포넌트도 932w 단일체지만 w-full flex-center wrapper라 재사용 가능. 단 높이가 8px vs 10px 미미한 차이 — **재사용 가능** (G2 ±2 허용).

## 레이아웃 특이사항

- Body image: **px-120** 좌우 패딩 → 936 - 240 = **696w** (Figma spec 일치). aspect 936/564 지정인데 container w=696이면 실제 h=696*564/936=419.2 (design_context Rectangle과 일치).
- Body image aspect 값 **936/564**는 부모 컨테이너 기준이 아닌 node 자체 비율. 실제 렌더링 시 `aspect-[936/564]` w-full 로 하면 px-120 제거 후 696w → h=419.2 OK.
- Title은 `min-w-full w-min-content` — 긴 제목이 폭을 먹되 최소 풀폭. 우리 구현에서는 `w-full` 단순화.
- 본문 8 <p> + 마지막 "&nbsp;" (invisible space) — Figma에서 끝에 빈 줄 하나. 구현 시 마지막 <p>는 생략 (시맨틱/i18n에 의미 없음).

## 캔버스 좌표 (clip 용)

- 섹션 루트 (134:4157) = (492, 180) 936×(~1100 예상)
- baseline PNG는 938×2508 전체 body — article 영역만 클립하려면 **y=0, h=약 1100**
- 정확한 article 끝 y: hero 575 + gap 40 + title+meta+gap24 ~ (32*1.3 + gap12 + 14*1.5) = 42+12+21 = 75 + 24 gap + divider 8 + 24 + body_img_area (419 + 10 gap + 21 caption) ~450 + 24 + body_text (624) + 24 + divider 8 = **575+40+75+24+8+24+450+24+624+24+8 = 1876**
- 위 계산이 크다 → body text가 실제로 624px 라 가정. 실측은 구현 후 DOM height 확인

**clip 결정**: y=0, h=측정 후 확정. 초기값 **h=1400**으로 시도 (여유있게). 너무 크면 밑 여백 영역이 관련 뉴스와 겹칠 위험 있으므로 단계 5에서 정밀 clip.

## 리스크 & 트레이드오프

1. **긴 본문** — JSX literal로 전량 하드코딩. i18n 쉽도록 `constants/news-detail-article.ts`에 분리할지 고려 (plan에서 결정 — 고려 후: 이 섹션 하나만 사용하므로 컴포넌트 내 inline이 자연스러움).
2. **hero = body image** — 디자인상 동일 이미지 두 번 사용. 현실엔 어색하나 Figma 디자인 그대로.
3. **baseline 938×2508은 너무 큼** — clip x=0, y=0, w=936, h=약 1400 로 국한 측정.
4. **본문 문단이 많아 line wrap 위치가 브라우저 폰트 렌더링에 민감** — G1 < 15% 목표. 정확히 맞추기 어려우면 width 미세조정.
5. **"목록으도 이동하기" 오타 (design_context)** — 범위 외이나 향후 back 섹션에서 처리. 우리 섹션에선 무관.

## baseline

- `figma-screenshots/news-detail-article.png` 938×2508 (Framelink 재다운로드 완료)
- clip 예정: `--clip-x 0 --clip-y 0 --clip-w 938 --clip-h 1400` (h는 측정 후 조정)

## 통과 조건

- [x] baseline PNG 저장 완료
- [x] get_design_context로 hidden structure 완전 파악 (텍스트 literal 확보)
- [x] leaf nodeId로 이미지 다운로드 (134:4030 = 134:4060 동일 imageRef)
- [x] 에셋 개수 일치 (2 slot, 1 unique source)
- [x] 토큰 맵 확인 (모든 색/폰트 기존 토큰 존재)
