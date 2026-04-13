# main-programs-header — 리서치

- Figma 노드: `252:987` (Frame 2042062907)
- 사이즈: **1416×261** (풀폭 아님, 중앙정렬)
- 페이지 캔버스 좌표: (252, 3240) @ 1920 × 10077
- 섹션 내부 좌표계: (0, 0) 기준. 탑-레벨 section 좌표는 0,0
- baseline: `figma-screenshots/main-programs-header.png` (1416×261, Framelink `download_figma_images` pngScale 1)
- 연관 페이지 리서치: `research/메인페이지.md` #4 행

---

## 1. 메타 (get_metadata)

```
<frame 252:987 name="Frame 2042062907" x=0 y=0 width=1416 height=261>
  <frame 252:988 name="Frame 2042062933" x=0 y=24 width=1416 height=141>
    <text 252:989 "ESGPN 핵심 프로그램" x=646 y=0 width=124 height=21>
    <text 252:990 "ESG를 배우고, 실천하고, 성장하는 여정" x=0 y=29 width=1416 height=112>
  </frame>
  <text 252:991 "이론 교육부터 자격 인증, 실제 프로젝트 참여까지, ESG를 실천할 수 있는 핵심 역량을 기르고 사회적 가치를 함께 창출해 나갑니다." x=0 y=189 width=1416 height=48>
</frame>
```

**자식 노드: 총 3개 텍스트만.** 프레임·벡터·아이콘·이미지 **없음**.

---

## 2. 사전 리스크 vs 실제 (중요)

메인페이지 리서치 `research/메인페이지.md` #4에서 "탭 3개 (`252:993`)" 리스크가 적혀 있었으나 **실제 메타데이터에 `252:993` 자식 노드가 존재하지 않는다**. baseline PNG(1416×261)를 직접 Read로 확인한 결과에도 **탭 UI는 보이지 않는다** — 단순 3-스택 텍스트만 존재.

**결론**: 탭 3개는 이 섹션(`252:987`)의 하위 요소가 아니라, Programs 영역의 **다음 형제 노드**일 가능성이 높음 (카드 3개 각각이 "탭 역할"일 수도). main-programs-card1/2/3 섹션 리서치 때 재검증. 현 섹션은 **탭 없음**으로 확정.

→ 오케스트레이터 전달 리스크 메모의 "탭 active/inactive 상태" 체크 포인트는 **N/A**.

---

## 3. 구조 (get_design_context)

```tsx
// root 252:987 — flex col gap-24 items-center, py=24 (spacing/6)
<div className="flex flex-col gap-[24px] items-center py-[24px] text-center" data-node-id="252:987">

  {/* 252:988 — flex col gap-8 items-center justify-center w-full */}
  <div className="flex flex-col gap-[8px] items-center justify-center w-full" data-node-id="252:988">

    {/* 252:989 — 아이브로 14R gray-500 */}
    <p className="font-['Pretendard:Regular'] leading-[1.5] text-[14px] text-[#97a29e] tracking-[-0.07px] whitespace-nowrap" data-node-id="252:989">
      ESGPN 핵심 프로그램
    </p>

    {/* 252:990 — 타이틀 48B gray-900, lh 56px, tracking 0 */}
    <p className="font-['Pretendard:Bold'] leading-[56px] text-[48px] text-[#1d2623] text-center min-w-full w-[min-content]" data-node-id="252:990">
      ESG를 배우고, 실천하고,<br/>성장하는 여정
    </p>
  </div>

  {/* 252:991 — 서브 본문 16R gray-900, lh 1.5, tracking -0.16px, center */}
  <p className="font-['Pretendard:Regular'] leading-[1.5] text-[16px] text-[#1d2623] tracking-[-0.16px] w-full text-center" data-node-id="252:991">
    이론 교육부터 자격 인증, 실제 프로젝트 참여까지, ESG를 실천할 수 있는<br/>
    핵심 역량을 기르고 사회적 가치를 함께 창출해 나갑니다.
  </p>
</div>
```

### 세로 흐름 (y 좌표 검증)
- 루트 py=24 → 내부 컨텐츠 y=24~(261-24)=237
- 252:988 block: y=24~(24+141)=165 (height 141)
- 252:989 eyebrow: y=24, h=21 → 끝 y=45
- 252:988 gap=8 → 252:990 y=24+21+8=53
- 252:990 title: y=53, h=112 → 끝 y=165
- 루트 gap=24 → 252:991 y=165+24=189 (✅ 메타와 일치)
- 252:991 body: y=189, h=48 → 끝 y=237
- 루트 py=24 하단 → y=237+24=261 (✅)

**완벽 검증. 레이아웃은 `flex-col gap-24 py-24`로 단순 스택.**

---

## 4. 디자인 토큰 (get_variable_defs)

| 변수 | 값 |
|-----|-----|
| `Gray Scale/Gray 500` | `#97a29e` |
| `Gray Scale/Gray 900 (Dark BG, Text)` | `#1d2623` |
| `Text-sm/14R` | Pretendard Regular 14 / lh 1.5 / ls **-0.5%** (design_context 기준 `-0.07px` = 14×-0.005) |
| `Text-base/16R` | Pretendard Regular 16 / lh 1.5 / ls **-1%** (design_context 기준 `-0.16px` = 16×-0.01) |
| `P/display/01 48 B` | Pretendard Bold 48 / lh **56px** / ls 0 |
| `spacing/2` | 8 |
| `spacing/6` | 24 |

**letter-spacing**: 메인페이지의 CLAUDE.md 규칙대로 **percent 단위(em)** 대신 design_context에 명시된 **px 절대값(-0.07px / -0.16px)** 을 그대로 사용 (다른 섹션과 일관성).

기존 프로젝트 토큰 (`src/styles/*.css`):
- `--color-gray-500: #97a29e` ✅
- `--color-gray-900: #1d2623` ✅

→ 신규 토큰 **필요 없음**. 전부 기존 변수 재사용.

---

## 5. 에셋

### 5.1 캔버스-에셋 개수 검증

| 유형 | Figma 개수 | 비고 |
|------|-----------|------|
| 이미지 fill (`image`) | **0** | get_design_context에 이미지 상수 없음 |
| 벡터 SVG | **0** | — |
| 아이콘 | **0** | — |
| 동적 에셋 (GIF/MP4/WebM) | **0** | — |
| 텍스트 | **3** | 252:989 / 252:990 / 252:991 |

**에셋 다운로드 파일 수: 0개.** → `src/assets/main-programs-header/` 폴더 생성 **불필요**. `scripts/download-assets.sh`, `verify-assets.sh` **불필요**.

### 5.2 동적 여부
- 동적 에셋 0 → 별도 처리 없음.

---

## 6. 타이포그래피 상세

| 노드 | 텍스트 | 폰트 | 크기 | 웨이트 | line-height | letter-spacing | 색상 |
|-----|-------|------|-----|-------|-------------|-----------------|------|
| 252:989 | "ESGPN 핵심 프로그램" | Pretendard Regular | 14 | 400 | 1.5 | -0.07px | #97a29e |
| 252:990 | "ESG를 배우고, 실천하고,\n성장하는 여정" | Pretendard Bold | 48 | 700 | **56px** (= lh 1.1667) | 0 | #1d2623 |
| 252:991 | "이론 교육부터 자격 인증,...\n...창출해 나갑니다." | Pretendard Regular | 16 | 400 | 1.5 | -0.16px | #1d2623 |

**프로젝트 폰트 패밀리**: `font-['Pretendard_Variable']` (main-hero/main-intro/main-stats 선례 일치).

**정렬**: 모두 `text-center`.

**252:990 줄바꿈**: `<br />` 고정. "ESG를 배우고, 실천하고, / 성장하는 여정" 2줄.

**252:991 줄바꿈**: `<br />` 고정. 2줄 h=48 (lh 1.5 × 16 = 24px × 2줄 = 48px). ✅

---

## 7. 캔버스 좌표 (측정 시)

- 섹션 내부 기준점: **x=0, y=0** (섹션 자체의 bounding box)
- baseline PNG: 1416×261 — 노드 bbox 그대로 Framelink export
- 풀폭 페이지 기준: x=252, y=3240, w=1416, h=261

**측정 전략** (단계 5에서 결정):
- **옵션 A** (권장): preview route에서 `<section>` 단독 렌더 (1416×261). clip 파라미터 **불필요**. URL: `/__preview/main-programs-header`, capture 뷰포트도 1416×261로. compare-section.sh 기본값 그대로 사용 가능.
- **옵션 B**: 풀폭 `/` 페이지에서 clip 캡처 (clip-x=252 clip-y=3240 clip-w=1416 clip-h=261). 구현 섹션 통합 후 회귀용.

→ **단계 5 = 옵션 A**. 옵션 B는 페이지 통합 검증 단계에서만.

---

## 8. 리스크 메모

| # | 리스크 | 대응 |
|---|-------|------|
| R1 | 사전 리스크 "탭 3개"가 실제 존재하지 않음 | **탭 없음** 확정. 본 리서치 §2. 오케스트레이터에 보고. |
| R2 | 252:990 Figma 폭 1416에 2줄 텍스트 — 브라우저 줄바꿈이 Figma와 정확히 일치하지 않을 수 있음 | design_context 원본 그대로 `<br />` 고정. `whitespace` 기본(normal) + `text-center`. 폰트 지연 로딩 리스크 낮음 (이미 Pretendard Variable preload). |
| R3 | letter-spacing을 percent로 오해할 위험 | design_context의 **절대 px 값** 채택 (`-0.07px`, `-0.16px`, `0px`). CSS style prop에 문자열로 명시. |
| R4 | 섹션이 풀폭이 아니라 1416 중앙 정렬 | preview route는 단독 1416×261 렌더. `/` 페이지 통합 시 Programs 섹션군이 공통 컨테이너 처리 필요할 수 있음 (Cards 섹션과 같이 고려) — **이 섹션 범위 외**. |
| R5 | baseline 1416×261 (Framelink bbox export) | `scripts/compare-section.sh`의 기본 URL `/__preview/main-programs-header`가 맞음. clip 불필요. |
| R6 | `py-[24px]` 루트 패딩 → section 루트는 h=261로 고정되어야 함 | 루트에 `h-[261px]` 명시. 내부 flex 자식이 자연 높이로 쌓여 24+141+24+48+24=261 정확히 맞음. |
| R7 | text-center + w-full로 인해 252:990이 1416 전폭 차지 — padding 0 | design_context 패턴 그대로. 중앙정렬은 루트 `items-center`가 담당. |

---

## 9. 신규 공통 컴포넌트 후보

- **SectionHeader** (eyebrow + title + description 3스택 센터 레이아웃) — main-intro 섹션에 유사 패턴 존재. 향후 Programs / About / News 등 다수 페이지에서 반복될 가능성 높음.
- **권장**: **지금은 로컬 컴포넌트로 구현** (Rule of Three: 3번째 시점에 공통화). Programs 헤더가 2번째 사용 시점. 3번째 등장(예: About 헤더) 시 `src/components/ui/SectionHeader.tsx`로 승격.

---

## 10. 단계 1 통과 체크

- [x] baseline PNG 저장 완료 (`figma-screenshots/main-programs-header.png`, 1416×261)
- [x] get_design_context 확보 (~1K 토큰, 작음)
- [x] get_variable_defs 확보
- [x] get_metadata 확보 (자식 3개 텍스트만)
- [x] 에셋 목록 + 동적 여부 칸 기입 (모두 0)
- [x] 캔버스-에셋 개수 일치 검증 (0 = 0)
- [x] 캔버스 좌표 기록 (x=252 y=3240 w=1416 h=261 @ 1920 페이지 / x=0 y=0 w=1416 h=261 @ 섹션 단독)
- [x] transform(rotation) 요소 없음 — 소수점 좌표 보존 이슈 없음
- [x] 사전 리스크("탭 3개") 검증 → **실제 없음**
- [x] 에셋 다운로드 불필요 확정

→ 단계 2(계획) 진입 준비 완료.
