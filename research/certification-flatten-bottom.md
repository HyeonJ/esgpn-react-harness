# research/certification-flatten-bottom.md

> v4 재탐색. Figma 299:4002 / 1920×2148 / `/certification` 마지막 섹션.
> **이전 판정 수정**: get_metadata는 자식 0으로 반환하지만 `get_design_context`는 **완전한 노드 트리 + 모든 텍스트/에셋**을 반환. Frame 자체가 flatten이 아니라 MCP metadata만 flat.

## 1. 재탐색 결과 (전략 b 성공)

`get_design_context(299:4002)` 호출 시 Process/Schedule/CTA 3 서브블록이 모두 살아있는 노드 트리로 나옴.

```
299:4002  Frame 2043686092               1920×2148  (dark bg + 3 overlay)
├─ (배경 3 레이어)
│  ├─ rectangle bg #014527               inset-0
│  ├─ imgFrame2043686092 (mix-blend-overlay)  h47% left-25% top62%
│  ├─ imgFrame2043686093 (mix-blend-overlay)  h55% left70% top44%
│  └─ imgFrame2043686094 (mix-blend-multiply) size-full object-cover
├─ 299:4003 Process Block                 w-full py-64
│  ├─ 299:4004 heading cluster w-[364px]
│  │  ├─ 299:4005 icon 120×120 (mix-blend-hard-light, imgRectangle23 189%×107%)
│  │  ├─ "응시방법 및 절차 안내" (32B)
│  │  └─ "간편한 온라인 신청으로 ESG마인드 자격검정에 도전하세요" (16R)
│  └─ 299:4009 steps
│     ├─ 299:4010 arrow line 936×23.5 (imgFrame12)
│     └─ 299:4015 steps row gap-72 (1단계 | 2단계 | 3단계 | 4단계)
│        ├─ 299:4016 Step 1 "접수"
│        │  ├─ pill "1단계" (caeb69 bg, 15SB) + 화살표 3개
│        │  ├─ "접수" (24B) + "접수 및 응시료 납부" (16M)
│        │  └─ 3 bullets (2px bar brand-500 + 14R)
│        ├─ 299:4040 Step 2 "시험 응시" + 3 bullets
│        ├─ 299:4064 Step 3 "결과 확인" + 3 bullets
│        └─ 299:4088 Step 4 "자격증 발급" + 3 bullets
├─ 299:4105 Schedule Block                 w-full py-64
│  ├─ 299:4106 heading cluster w-[364px]
│  │  ├─ same icon 120×120 (mix-blend-hard-light, imgRectangle23 동일 에셋 재사용)
│  │  ├─ "2026년 시험 일정" (32B)
│  │  └─ 동일 서브타이틀 (16R)
│  └─ 299:4111 Table + Pagination
│     ├─ 299:4112 Table border 1.5 rgba(255,255,255,0.08) rounded 20
│     │  ├─ Header row (bg caeb69, 회차 80px / 접수기간/시험일/발표일 flex-1 / 진행상태 140px)
│     │  └─ 5 Body rows (zebra: odd=#014527 solid, even=gradient 4% white overlay)
│     └─ 299:4168 Pagination (chevron-double-left, chevron-left, 1~10, chevron-right, chevron-double-right)
└─ 299:4184 CTA Container                  w-full h-[320px] rounded-[20px]
   ├─ bg #005c33 + imgContainer (mix-blend-luminosity, h294% left-25% top-32% w132%)
   ├─ "지금 바로 신청하세요" (32B white) + 서브타이틀 (16R white-a600) w-[454px]
   └─ Button "경진대회 참가하기" (18B brand-700) + icon 24
```

**중요**: CTA의 버튼 텍스트가 **"경진대회 참가하기"** — 자격검정 페이지인데 버튼이 contest로 유도. 오타/placeholder 가능성 **높음**. 디자이너 원본 텍스트 그대로 유지하되 주석에 플래그.

## 2. 섹션 분할 여부

- 이질 에셋: 배경 overlay 3장 + icon 1 + arrow 1 + vector 3(step arrow 조각) + pagination chevron 4 + CTA city + CTA arrow = **~10+장**, 분할 규칙 3+ 초과
- 반복 자식: Process step 4 + Schedule row 5 + Pagination 10 = **다수**
- 예상 토큰: design_context 전체 ≈ 17K 토큰 (이미 초과)

**분할 전략**: 섹션을 3 서브컴포넌트로 **파일 내 분할** (별도 섹션으로는 분리하지 않음 — 하나의 긴 flat 컨테이너 배경 공유). 각 서브컴포넌트는 단일 파일.
- `ProcessBlock.tsx` — 4 step + heading
- `ScheduleBlock.tsx` — table + pagination + heading
- `CtaBlock.tsx` — CTA card
- `CertificationFlattenBottom.tsx` — 위 3을 wrapping + 배경

## 3. 에셋 목록

| # | 키 | Figma 노드/이미지 URL | 용도 | 동적? | 처리 |
|---|---|---|---|---|---|
| 1 | bg-overlay-left | imgFrame2043686092 | 배경 좌측 overlay | X | 정적 PNG |
| 2 | bg-overlay-right | imgFrame2043686093 | 배경 우측 overlay | X | 정적 PNG |
| 3 | bg-noise | imgFrame2043686094 | 배경 전면 multiply | X | 정적 PNG |
| 4 | heading-icon | imgRectangle23 (299:4005 / 299:4107) | 녹색 3D 산 아이콘 (2회 재사용, mix-blend-hard-light) | X | 정적 PNG |
| 5 | step-arrow-line | imgFrame12 (299:4010) | step 가로 화살표 선 936×23.5 | X | 정적 PNG/SVG |
| 6 | step-pill-arrow | imgVector21/22/23 (3조각, 조합 = 화살표 ">>>"  모양) | step pill 옆 화살표 3조각 | X | 3조각 각 PNG (또는 SVG 인라인) |
| 7 | pagination-chevrons | imgVector/1/2/3 | pagination L/LL/R/RR | X | SVG 인라인 (표준 아이콘) |
| 8 | cta-city | imgContainer (299:4184) | CTA 배경 city (mix-blend-luminosity) | X | 정적 PNG |
| 9 | cta-arrow | imgIcon (302:6618) | CTA 버튼 → icon 24 | X | 정적 PNG |

**중요 최적화**: step-pill-arrow(#6)는 작은 ">>>"  arrow 3조각 반복 — SVG 인라인 1개(path)로 표현 후 재사용 권장. 각각 h=18 w=9 조각을 합치면 standard chevron-right triple. 같은 pagination chevron(#7)도 SVG 인라인 처리하여 raster 의존 최소화.

**Framelink 미사용 — REST API로 다운로드**:
- design_context의 `imgXxx`는 MCP asset URL (`figma.com/api/mcp/asset/...`). MCP 세션 내에서 download 필요.
- 또는 각 이미지가 Figma 파일의 IMAGE fill인 경우 REST `/images` endpoint가 아닌 `imageRef`로 접근 (복잡).
- **대안**: MCP asset URL을 curl로 직접 다운로드 가능 (7일 유효 public URL). 시도.

## 4. Baseline PNG
- `figma-screenshots/certification-flatten-bottom.png` — **1920×2149** (REST API로 획득, RGBA, non-interlaced, spec 2148 +1px)
- 합성 전체 PNG — 육안 검증 + G1 비교 기준

## 5. 리스크

1. **레이아웃 복잡도 최고치** — 배경 3 overlay + blend mode 2종, Step 4개 (마지막 1개는 화살표 선 없음), Table 5행, Pagination 10개 → 토큰/absolute 많아질 위험
2. **블렌드 모드 엔진 차이** (mix-blend-overlay ×2 + multiply ×1 + hard-light 아이콘 ×2 + luminosity ×1) — **G1 diff 12~15% 예상**, 참고 지표라 차단 아님
3. **CTA 버튼 텍스트 "경진대회 참가하기"** — 디자이너 카피 오류 가능성. 원본 유지 + FIXME 주석
4. **icon 2회 사용** (imgRectangle23) — 한 번 다운받아 재사용
5. **step 4번째 arrow line 없음** — 디자인에 의도적. arrow는 왼쪽 3 step 위에만
6. **Table zebra** — odd는 bg #014527 solid, even은 linear-gradient(rgba(255,255,255,0.04) + #014527). CSS로 직접 표현
7. **절대 금지**: 전체를 단일 img + alt 2000자로 박제하는 v1~v3 방식 (T-008 ACCEPTED). v4에서는 fully decomposed HTML.

## 6. 구조 지표 목표
- token_ratio ≥ 0.2 (디자인 토큰 다수 활용 가능 — bg-brand-700, text-white, gap-*, p-* 전부 매핑)
- absolute/file ≤ 5 — 배경 overlay 3장 + bg wrapper 1 = 섹션 컨테이너 ~4 absolute 예상 (파일 4개 분할 시 avg 1~2)
- semantic_score ≥ 2 — section + h2 + h3 + table + thead/tbody + ul/li + button

## 7. 구현 순서
1. 에셋 다운로드 (MCP asset URL curl)
2. `CertificationFlattenBottom.tsx` 루트 + 배경 레이어
3. `ProcessBlock.tsx` (step 4)
4. `ScheduleBlock.tsx` (table + pagination)
5. `CtaBlock.tsx`
6. Route + App.tsx 등록
7. G5~G8 + 구조 게이트 → 통과 → G1~G4
