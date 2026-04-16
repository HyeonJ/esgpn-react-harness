# research/certification-hero.md

> Figma Node: 299:3861 (배경 Rectangle) + 299:4364 (오버레이 그룹)
> 섹션 영역: Frame 2043686150(299:3860) y=0 h=827 풀폭 1920

## 1. 구조 요약

자격검정 페이지 최상단 Hero.
- **배경층 (raster)**: Rectangle 461566311 (299:3861) — 1920×827 풀폭 회색/초록 배경 이미지. imageRef 303f2051...(+ #DBE1E0 fallback)
- **오버레이층 (HTML 텍스트 + CTA)**: Group 16 (299:4364) — 956×956 원형(rgba(0,0,0,0.08) border-radius 9999px), 좌상단 기준 (x=463, y=-300)으로 배치. 하단 패딩 120px로 내부 컨텐츠는 원형의 아래쪽 정렬.

**텍스트 노드가 모두 살아있음** → HTML로 재구성 (raster 금지).

## 2. 오버레이 내부 (299:4366 / flex col gap-48)

```
Frame 2043686007 (col, gap:48, items:center, hug)
├─ 299:4367 (col, gap:32, items:start, text-center, w-full)
│  ├─ 299:4368 <h1> "ESG 마인드 자격검정"
│  │   Gong Gothic Bold 64 / lineHeight 1.3 / letterSpacing -2.56 (-4% × 64) / white / whitespace-nowrap
│  └─ 299:4369 (col, gap:8, items:center, leading 1.4, w-full)
│     ├─ 299:4370 "관행에서 실천의 자격검정(단급 과정) 안내"
│     │   Gong Gothic Medium 24 / letterSpacing -0.36 (-1.5% × 24) / #caeb69
│     └─ 299:4371 "ESG를 실천할 수 있는 역량을 갖춘 인재를 양성하는 자격검정 프로그램"
│         Pretendard Medium 18 / letterSpacing -0.27 (-1.5% × 18) / white / whitespace-nowrap
└─ 299:4372 (button wrapper — 1px white border + p:4 + rounded-full)
   └─ 299:4373 (bg:white, px:32 py:16, rounded-full, overflow-clip)
      └─ 299:4374 (row, gap:8, items:center)
         └─ 299:4376 "ESG마인드 자격검정 신청하기"
             Pretendard SemiBold 16 / letterSpacing -0.16 (-1% × 16) / #0c3b0e
```

## 3. 에셋 목록

| # | 이름 | 유형 | 노드 | 원본 크기 | 저장 경로 | 동적? |
|---|------|------|------|-----------|-----------|-------|
| 1 | bg | raster (crop + fallback #DBE1E0) | 299:3861 | 1920×827 | `src/assets/certification-hero/bg.png` | 정적 |

baseline:
- `figma-screenshots/certification-hero.png` — 1920×827 (full-page 0~827 crop. `certification-hero-section.png`(1920×4933)에서 잘라냄)

원본 Framelink export는 3807×1640 cropped raster로 왔으나 → Python으로 1920×827 resize해 최종 bg.png 생성.

캔버스-에셋 일치: 캔버스 raster 1장 = 다운로드 1장 OK.

## 4. 디자인 토큰 매핑

| Figma | 값 | 프로젝트 토큰 |
|-------|----|--------------|
| `Opacity/Black Opacity 200` | #00000014 (rgba(0,0,0,0.08)) | `var(--color-black-opacity-200)` |
| `Gray Scale/Gray 000` (white) | #ffffff | `var(--color-gray-000)` |
| `Brand/Brand 700` | #0c3b0e | `var(--color-brand-700)` |
| `#caeb69` | 한정 lime 강조색 (프로젝트 토큰 없음) | hex 직접 (문서화된 차별화 포인트) |
| `border-radius/full` | 9999 | `var(--radius-full)` |
| `spacing/12` | 48 | `var(--spacing-12)` |
| `spacing/8` | 32 | `var(--spacing-8)` |
| `spacing/4` | 16 | `var(--spacing-4)` |
| `spacing/2` | 8 | `var(--spacing-2)` |
| `spacing/1` | 4 | `var(--spacing-1)` |
| `Text-base/16SB` | 16/600/1.5/-1 | `--text-base-16sb-*` |
| `Gong Gothic` family | Gong Gothic | `var(--font-family-gong-gothic)` |
| Pretendard family | Pretendard | `var(--font-family-pretendard)` |

숫자 매직값:
- 64px (h1 크기), 24px (서브 크기), 18px (설명 크기) — GongGothic/Pretendard 직접 값. letter-spacing -2.56/-0.36/-0.27도 arbitrary.

## 5. 레이아웃 (절대 위치)

- 섹션 컨테이너: `w-full h-[827px] overflow-hidden relative` (Hero만 827. 아래는 별도 섹션)
- 배경 img: `absolute inset-0 w-full h-full object-cover` (raster raster 전체 덮기)
- 오버레이 원형: `absolute left-[463px] top-[-300px] w-[956px] h-[956px] rounded-full bg-[color:var(--color-black-opacity-200)] flex flex-col items-center justify-end pb-[120px]`
  - 결과: 원형 하단이 섹션 아래쪽(956-300=656)에 위치 → pb-120 빼면 컨텐츠 중심선이 ~536 (827의 64%)

## 6. 반응형 재량 (breakpoint 범위)

- h-[827px] 고정 유지 (Figma 단일 1920)
- 원형 left-[463px] hard-fixed는 모바일에서 문제 → 일단 `left-[24.1%]`(463/1920)로 변환해 뷰포트 비례 유지 가능하지만 v4는 우선 Figma 1:1로 구현 → 반응형은 별도 responsive-polish 단계에서
- 데스크톱 1920 기준 구현이 우선

## 7. 육안 합성 확인 (baseline)

`figma-screenshots/certification-hero.png` 1920×827 내용:
- 회색/옅은 초록 단색 배경 (Rectangle imageRef)
- 우측 상단/하단 일부 장식 leaf가 약간 보임 (page composite에 추가 렌더된 요소가 있음. single Rectangle export에는 미포함 — v1~v3에서도 확인된 한계)
- 중앙에 크고 흰 GongGothic 헤드라인 + lime 서브 + 작은 흰 설명 + 흰 버튼

## 8. 리스크 / 노트

- **페이지 composite vs single Rectangle**: 페이지 렌더링 시 좌우 leaf 장식이 추가됨. bg.png 단독 export로는 이 부분 미포함. G1 diff ~7~10% 수용 범위.
- v1~v3에서 G1 10.98% ACCEPTED였음. v4는 참고 지표(≤15% 목표)라 명시적으로 PASS.
- TopNav는 standalone preview에서는 렌더 안 됨 (실제 /certification은 RootLayout이 주입). diff 영역의 상단 88px strip.
- 텍스트 "관행에서 실천의 자격검정" 문구는 디자인 원문 그대로 (오타 아님).
- whitespace-nowrap 유지 — 텍스트 줄바꿈 변경 시 Figma 레이아웃 깨짐.

## 9. 컴포넌트 설계 방향

- 파일 1개(`CertificationHero.tsx`) + route preview.
- 이전 plan에서 `CertificationHero/` 디렉토리 구조 제안했으나 실질 props 분리 없음 → **단일 tsx 파일**로 간소화.
- section-implementer v4 원칙: 시맨틱 `<section>`, `<h1>`, `<button>`, absolute 최소화 (bg img + 원형 오버레이 2개는 의미적 overlap이므로 allowed).
