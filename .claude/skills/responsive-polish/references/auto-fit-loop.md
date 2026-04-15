# Auto-Fit Loop — 자동 감지 + 수정 반복

좁은 뷰포트에서 잘림/overflow를 자동 감지해서 패턴 카탈로그 매칭 → 최소 수정 → 재검증 하는 반복 루프.

## 사용 시점

- 메인 페이지 이미 반응형 적용했지만 잔여 잘림 있을 때
- 새 페이지를 반응형 처음 만든 후 잔여 이슈 감지
- 릴리즈 직전 최종 감사

## 실행 절차

### Step 1 — 자동 감지
```bash
node scripts/detect-cutoff.mjs <path>
# 예: node scripts/detect-cutoff.mjs /
```
4뷰포트(375/768/1440/1920) 전체 스캔. 출력 카테고리:
- `h-overflow`: 요소 right > viewport (가로 삐져나감)
- `text-clip-x`: leaf 텍스트 scrollWidth > clientWidth (잘림)
- `img-shrink`: img 렌더폭 < natural 30% (해상도 낭비)

### Step 2 — 패턴 매핑
출력 하단의 HINT 그대로 따름:

| 감지 | 원인 패턴 | 수정 패턴 |
|---|---|---|
| h-overflow 섹션 루트 | `w-[Npx]` 고정폭 | `max-w-[Npx] w-full mx-auto` |
| h-overflow 큰 패딩 | `px-[252px]` | `px-6 md:px-12 xl:px-[252px]` |
| h-overflow 내부 블록 | `w-[576px]` | `w-full xl:w-[576px]` |
| text-clip-x ws=nowrap | `whitespace-nowrap` | `xl:whitespace-nowrap` 또는 제거 |
| text-clip-x 긴 제목 | 없음 | `line-clamp-2 xl:line-clamp-none` |
| img-shrink | 고정 width | `w-full max-w-[Npx] aspect-[W/H]` |

### Step 3 — 섹션별 수정 (워커 위임)
한 번에 한 섹션만. 규칙:
1. HINT 그대로 매핑되는 것만 적용 — 창의적 해석 금지
2. `xl:` prefix 필수 (1920에서 변화 없어야)
3. 섹션 내부 절대위치는 건드리지 말 것
4. 1줄 수정 단위로 작게

### Step 4 — 재검증
```bash
node scripts/detect-cutoff.mjs <path>
```
이전 감지 건수 ↓ 확인. 1920 뷰포트 clean 유지.

### Step 5 — 3회 반복 가드
한 섹션 수정에 3회 반복해도 감지 건수 ↓ 없으면:
- `docs/tech-debt.md` 에 `[ACCEPTED_DEBT]` 로 기록
- 다음 섹션으로 이동
- 사용자 보고

## 출력 예시

```
=== mobile-375 (375×900) @ / ===
document: scrollWidth=375 clientWidth=375
[h-overflow] 3건
  DIV w=1416 right=1541 .relative w-[1416px] h-[805px] mx-auto
  IMG w=617 right=1017 .absolute h-[59.16%] left-[80.16%]
[text-clip-x] 1건
  P clientW=250 scrollW=340 ws=nowrap .text-[20px] font-bold  "이번 주 뉴스"

HINT — 패턴 매칭:
  h-overflow → responsive-polish/references/patterns.md §1
  text-clip-x → whitespace-nowrap 제거 또는 xl:whitespace-nowrap
```

## 안티패턴 — 하지 말 것

- 감지 건수 0이 될 때까지 무한 반복 → 일부 요소는 근본적으로 모바일 호환 불가 (Figma absolute 오버레이 등). 3회 반복 규칙 지킴
- HINT 무시하고 창작 → 스킬 룰 위반
- `hidden md:block` 로 요소 숨김 → 디자이너 승인 필요

## 스크립트 확장 포인트

`scripts/detect-cutoff.mjs` 에 탐지 규칙 추가 시:
- 접근성(터치 타겟 44px 미만) 체크
- 색상 대비 (WCAG AA 4.5:1)
- scroll trap (overflow-hidden 내부에서 스크롤 필요 컨텐츠)
