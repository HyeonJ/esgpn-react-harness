# research/certification-stats.md

> Figma 299:3862 / 자격검정 페이지 91:1903 / y=633 h=194 / 풀폭 1920×194

## 섹션 개요
자격검정 페이지 CertificationHero 직하단 통계 bar. 3개 stat(숫자+설명) + 2개 세로 divider. 텍스트 흰색, 섹션 자체 배경 투명(Hero 배경 위에 overlay되는 영역, y=633~827).

v4 기준 구조:
- 최상위 `<section>` — `mx-auto w-full max-w-[1920px]`, 높이 194px
- 레이아웃: flex-row, gap 16, padding 48 0, items/justify center
- 배경 없음 (섹션 자체는 투명. Hero raster가 뒷면에 있지만 stats 섹션은 자체 배경 없음)
- 텍스트 `var(--color-gray-000)` (흰색)

## Figma 노드 트리
```
299:3862 Frame "stats bar" (1920×194, flex-row gap-16 items/justify center py-48)
├─ 299:3863 Frame "stat1" (240×hug, flex-col gap-12 items-center)
│  ├─ 299:3864 "1,500+" — Pretendard Bold 48 / lh 1.3 / ls -1.92 / white
│  └─ 299:3865 "자격 취득자" — Pretendard Medium 16 / lh 1.5 / ls -0.16 / white
├─ 299:3866 Vector 19 (w:0 h:64 stroke #C6CDCC 1px) — 좌측 divider
├─ 299:3867 Frame "stat2" (240×hug)
│  ├─ 299:3868 "이론부터 실행" — Pretendard Bold **40** / lh 1.3 / ls -1.6 / white
│  └─ 299:3869 "체계적 과정" — Pretendard Medium 16
├─ 299:3870 Vector 20 (w:0 h:64 stroke #C6CDCC 1px) — 우측 divider
└─ 299:3871 Frame "stat3" (240×hug)
   ├─ 299:3872 "100%" — Pretendard Bold 48 / ls -1.92
   └─ 299:3873 "온라인 응시" — Pretendard Medium 16
```

## 치수 실측
- baseline PNG: **1920×194** (Framelink scale=1 확인)
- 섹션 height 194 = 2 × py-48 + stat content hug(stat1의 big 라인 48*1.3=62.4 ≈ 62 + gap 12 + small 16*1.5=24 ≈ 98 floor) 와 일치 여부 → Figma 높이 고정이므로 `h-[194px]` 강제

## 디자인 토큰 매핑
| Figma | 프로젝트 토큰 |
|-------|--------------|
| Pretendard Bold 48 / 1.3 / -1.92 | `font-family: var(--font-family-pretendard)` + inline `text-[48px] leading-[1.3] tracking-[-1.92px] font-bold` (display-01 48B는 weight/lh 유사하나 letter-spacing 0이라 inline 유지) |
| Pretendard Bold 40 / 1.3 / -1.6 | `var(--text-4xl-40b-size/weight/line-height)` + `letter-spacing: -1.6px` (토큰 -4px와 다르므로 inline override) |
| Pretendard Medium 16 / 1.5 / -0.16 | `var(--text-base-16m-*)` — letter-spacing 토큰 -1px와 다르므로 inline `tracking-[-0.16px]` |
| #FFFFFF 텍스트 | `var(--color-gray-000)` |
| #C6CDCC stroke | `var(--color-gray-300)` |
| gap 16/12, py 48 | `var(--spacing-4)` / `var(--spacing-3)` / `var(--spacing-12)` |

## 에셋 목록
| 이름 | 소스 | 타입 | 동적 여부 | 처리 |
|------|------|------|-----------|------|
| (없음) | — | — | — | divider는 SVG가 아니라 1px 세로선이므로 `<span role="separator">` + CSS `border-left`로 처리 |
| baseline PNG | 299:3862 | raster | no | `figma-screenshots/certification-stats.png` (1920×194) — Framelink 저장 완료 |

**결정**: Vector 19/20은 Figma에서 개별 IMAGE-SVG 노드지만 실제 값은 "w:0 h:64 stroke #C6CDCC 1px" 단순 1px 세로선 → SVG 다운로드 불필요, CSS 구현(`w-px h-16 bg-gray-300` 대응)이 더 토큰 친화적. v4 구조 점수에 유리.

## 캔버스-에셋 개수 일치
- baseline 1장 다운로드 완료
- 개별 에셋 raster 없음 (텍스트 + CSS divider만)
- ✅ 일치

## floating/clip 좌표
- 풀폭 섹션이므로 clip 불필요. `compare-section.sh` 기본 1920×194로 캡처.

## transform 가진 요소
- 없음 (회전/scale 0건)

## baseline 특이사항
- **텍스트 색이 흰색**이므로 Figma baseline PNG에서도 텍스트가 거의 보이지 않는 상태 (흰 배경 위 흰 글씨). diff는 1px divider(회색 #C6CDCC) 2줄만 비교 대상 → **G1 매우 낮을 것으로 예상** (~1%)
- 이 상태에서 G1만으로 "제대로 렌더링됨" 확인 불가 → 단계 5에서 diff PNG 육안 확인 + 실제 Figma 페이지 컨텍스트(Hero 배경 위) 시각 재현을 위해 Preview에 **임시 dark bg**(#0C3B0E brand-700 또는 중간 회색) 깔아서 시각 검증

## 리스크
1. 흰 텍스트 + 흰 baseline → G1 수치는 낮게 나오지만 semantic 오류 못 잡음. 수동 육안 검증 필수
2. 폰트 letter-spacing이 Figma variable 토큰과 살짝 다름 (Bold 48 → -1.92px는 design_context 명시, 토큰 `--text-4xl-40b-letter-spacing: -4px`는 40B용) → inline arbitrary 유지
3. 48px bold 큰 숫자 + Korean 혼합 텍스트 → leading 1.3 underrun 주의 (최소 높이 계산)

## 단계 1 통과 조건
- [x] baseline PNG 1920×194 저장
- [x] 노드 트리 + 토큰 매핑 완료
- [x] 에셋 0개 (CSS divider) 결정
- [x] risk 기록
