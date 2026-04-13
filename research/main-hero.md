# main-hero — 섹션 리서치

- **Figma Node**: `43:1730` (Frame 2043685963)
- **Figma file**: `qhrMiGVfoSQ1QMFhVN8z78`
- **사이즈**: 1920×1040
- **캔버스 좌표**: x=0 y=0 w=1920 h=1040 (풀폭, 페이지 최상단)
- **라우트**: `/` (RootLayout 안, Header/Footer 자동 적용)
- **baseline**: `figma-screenshots/main-hero.png` (이미 존재, Framelink pngScale 1)

> 메타가 "비어있을" 거란 사전 우려와 달리, `get_design_context`가 자식 풍부히 반환함. 단일 평탄 이미지 아님 — DOM 그대로 재구성 가능. Figma BG 이미지 1장만 정적 에셋이고, 나머지는 텍스트/도형/CSS로 합성된 카드.

---

## 1. 시각 구조 (위 → 아래)

```
Hero (1920×1040, bg #f3f3f3)
├─ BG layer (opacity 96%, overflow-hidden)
│  └─ <img imgFrame2043685963> (도시+나무 합성 파노라마)
│     position: absolute, left 15.9% top 29.76% w 68.19% h 94.87%
│
└─ Inner container (1101.875 wide, padding pt-160 pb-110, 좌우 margin auto via px-409)
   ├─ Text block (gap 32, w-full)
   │  ├─ Heading group (gap 4, items-center)
   │  │  ├─ White rect 286×27 absolute (x=408 y=1) — 워드마크 위 흰색 패치
   │  │  ├─ "세상을 아름답게 만드는 힘, ESGPN" (Pretendard SemiBold 20, #1d2623, ls -2%)
   │  │  └─ "Environmental" (Yeseva One Regular 100, #0c3b0e, lh 1em)
   │  └─ Body 2-line (Pretendard Regular 18, #1d2623, ls -1.5%, lh 1.5)
   │     "대학·기업·지역사회가 함께 지속가능한 미래를 행동으로 구현하는 연대 플랫폼"
   │     "알고 있는 사람이 아닌, 실천할 수 있는 ESG 인재를 인증합니다."
   │
   └─ Cards + CTA group (gap 48, items-center)
      ├─ 3 cards (gap 48, justify-center)
      │  ├─ Card 1 (회전 -4°, wrapper 342.938×361.494)
      │  │  └─ 320×340, bg rgba(0,0,0,0.12), backdrop-blur 8px (Framelink 16px 표시 — 디자인 토큰 차이),
      │  │     rounded 32, p 24, flex col gap 24 items-center justify-end
      │  │     ├─ 140×140 icon, mix-blend-lighten, img Rectangle14 cropped
      │  │     │  → IMAGE+gifRef (동적!) — 정적 PNG 추출 필요
      │  │     └─ Text block (gap 12)
      │  │        - "ESG마인드 자격검정" (Bold 24, lh 32, white)
      │  │        - 본문 3줄 (Regular 15, lh 24, white)
      │  ├─ Card 2 (회전 0°, 320×340)
      │  │  └─ 동일 카드 골격
      │  │     ├─ 140×140 icon, (블렌드 모드 미지정), img Rectangle14(node 20:212) cropped
      │  │     │  → IMAGE only (정적, gifRef 없음)
      │  │     └─ "ESG실천 아이디어 경진대회" + 본문 3줄
      │  └─ Card 3 (회전 +4°, wrapper 342.938×361.494)
      │     └─ 320×340 골격
      │        ├─ 140×140 icon, mix-blend-screen, img Rectangle15 cropped
      │        │  → IMAGE+gifRef (동적!) — 정적 PNG 추출 필요
      │        └─ "사회공헌 및 재능나눔" + 본문 3줄
      │
      └─ CTA pair (gap 12)
         ├─ White pill: bg #fff, px 32 py 16, radius 9999
         │  "ESG 실천 아이디어 경진대회 참여하기" (SemiBold 16, #1d2623, ls -1px)
         └─ Green pill: bg #4fb654, px 32 py 16, radius 9999
            "ESG 마인드 자격검정 신청하기" (SemiBold 16, white, ls -1px)
```

---

## 2. 토큰 매핑 (전부 기존 `tokens.css`로 커버됨)

| Figma | tokens.css 변수 | 값 |
|------|---------------|----|
| Brand/Brand 500 | `--color-brand-500` | #4fb654 |
| Brand/Brand 700 | `--color-brand-700` | #0c3b0e |
| Gray Scale/Gray 000 | `--color-gray-000` | #ffffff |
| Gray Scale/Gray 900 | `--color-gray-900` | #1d2623 |
| Text-xl/20SB | `--text-xl-20sb-*` | 20/600/lh1.4/ls-2px |
| Text-lg/18R | `--text-lg-18r-*` | 18/400/lh1.5/ls-1.5px |
| P/Heading/01 24 B | `--text-heading-01-*` | 24/700/lh32/ls0 |
| Text-base/16SB | `--text-base-16sb-*` | 16/600/lh1.5/ls-1px |
| spacing/3 | `--spacing-3` | 12 |
| spacing/4 | `--spacing-4` | 16 |
| spacing/8 | `--spacing-8` | 32 |
| border-radius/full | `--radius-full` | 9999 |

**신규 토큰 필요 없음.** Yeseva One 100px만 인라인으로 처리 (Display 토큰 미존재 — 추가 검토는 plan에서).

---

## 3. 에셋 목록 (캔버스 표시 ↔ 다운로드 매핑)

| # | 영역 | 노드 ID | imageRef | gifRef | 캔버스 표시 | 동적 여부 | 처리 방식 |
|---|------|---------|----------|--------|-----------|---------|-----------|
| 1 | Hero BG (도시+나무 파노라마) | 43:1730 (fill via `imgFrame2043685963`) | (URL only) | — | 정적 | **정적** | Framelink BG export → `bg.png` |
| 2 | Card 1 아이콘 (140×140) | 20:210 | `4ed3b9efeebdadecbc01cf3c8d5f2bd2babd17a8` | `3ad4734f522f8750cfb0f748d58e5cd0dfab3ab5` | 정적 한 프레임 | **동적** | 부모 노드 `17:200` (320×340) Framelink download_figma_images로 정적 PNG 추출 → `card1.png` 또는 카드별 아이콘만 격리 export |
| 3 | Card 2 아이콘 (140×140) | 20:212 | `754cd2a0890eb617b3ff3d864229b4b4f6bc9d14` | — | 정적 | **정적** | Framelink imageRef + cropTransform 다운로드 → `card2-icon.png` |
| 4 | Card 3 아이콘 (140×140) | 20:213 | `9f9c1d845bbd70736669905b0bc5b679c8bfe044` | `6ed522921e2bcaf65b21b9038c8ddeb3ece125f2` | 정적 한 프레임 | **동적** | 부모 노드 `17:206` (320×340) Framelink로 정적 PNG 추출 → `card3.png` |

**총 에셋 4개 (BG 1 + 카드 아이콘 3).**

> ⚠️ Card 1 / Card 3 아이콘은 캔버스에서 정적으로 표시되지만 Figma 데이터 상 GIF 참조가 있음. CLAUDE.md 절대 규칙 + `dynamic-asset-handling` 스킬 + `docs/figma-project-context.md §1` 진실의 원천 원칙: **GIF 그대로 사용 금지, 정적 PNG로 export.** plan에서 두 가지 추출 전략(아이콘 단독 vs 카드 통째) 비교 후 결정.

### 3.1 캔버스-에셋 개수 검증

- 캔버스에서 식별되는 시각 자산: BG 합성 이미지 1장 + 카드 아이콘 3개 = **4개**
- 위 표 행 수: **4개**
- ✅ **일치.**

---

## 4. 레이아웃 디테일

### 4.1 BG 이미지 위치 (Hero 박스 1920×1040 기준)
- left: 15.9% × 1920 = **305px**
- top: 29.76% × 1040 = **310px**
- width: 68.19% × 1920 = **1309px**
- height: 94.87% × 1040 = **987px**
- opacity: **0.96**
- BG 컬러: `#f3f3f3` (gray-100과 다름 — 별도 처리, plan에서 토큰 추가 검토)

### 4.2 Inner 컨테이너 위치
- horizontal padding: 409 → 1920-409*2 = 1102 (1101.875와 일치)
- top padding 160, bottom padding 110
- 컨테이너 자체는 flex column, gap 86 (header text block ↔ cards block)

### 4.3 카드 회전
- Card 1: `rotate(-4deg)` — wrapper가 더 큼(342.938×361.494)으로 회전 후 잘림 없도록 여유 박스
- Card 2: 회전 없음 — wrapper = 카드 = 320×340
- Card 3: `rotate(+4deg)` — wrapper 342.938×361.494

### 4.4 흰 박스 (Rectangle 16, 워드마크 위)
- `26:90`, 286×27, position absolute, x=408 y=1 (text block 부모 1102 width 기준)
- 헤딩 텍스트 뒤로 깔린 흰색 띠 (워드마크 보더 효과? baseline 확인 결과 시각적으로는 거의 안 보임 — Inner BG가 #f3f3f3이라 흰 박스가 살짝 도드라짐)
- **저우선순위 디테일**, G1/G2 통과에 영향 미미할 가능성. 단계 5에서 확인.

### 4.5 백드롭 블러
- design_context: `backdrop-blur-[8px]` → 카드 블러 8px
- Framelink: `backdropFilter: blur(16px)` (Card 2)
- 둘이 다름. **8px 우선 적용** (design_context가 최신 export로 추정), G1 미스 시 16px로 시도.

---

## 5. 폰트

- **Pretendard** — 기존 셋업 완료 (`tokens.css` `--font-family-pretendard`)
- **Yeseva One** — 신규! 워드마크 "Environmental" 전용. plan에서 처리 결정:
  - (a) Google Fonts CDN 임포트 (가장 빠름)
  - (b) `@fontsource/yeseva-one` npm 패키지 (사용자 승인 필요)
  - (c) self-host (woff2 다운로드)

---

## 6. 리스크 메모

| # | 리스크 | 영향 | 대응 |
|---|------|------|------|
| R1 | Card 1, Card 3 아이콘이 GIF 참조 (gifRef 존재) — 캔버스 정적 한 프레임이 진실의 원천 | 그대로 GIF 다운로드 시 G1/G3 모두 위반 | **Framelink `download_figma_images`로 카드 부모 노드(`17:200`/`17:206`) 정적 PNG export**. plan 단계에서 아이콘 단독(`20:210`/`20:213`) export도 시도 비교. |
| R2 | Yeseva One 폰트 신규 도입 | 폰트 미로드 시 fallback → 워드마크 시각 차이 큼 (G1 위반 확실) | plan 단계에서 도입 방법 결정. 사용자 승인 필요. |
| R3 | BG 컬러 `#f3f3f3` ↔ `--color-gray-100` `#eff0f0` 차이 | G4 색상 정확도 | tokens.css에 `--color-hero-bg: #f3f3f3` 추가 또는 인라인 처리 |
| R4 | backdrop-filter 브라우저 지원 (Chromium 기반은 OK), Playwright 헤드리스 캡처 시 일부 환경 무시 | G1 카드 영역 diff 가능 | 측정 시 카드 영역 diff %를 별도 추적, 기준 5% 안에 들면 통과 |
| R5 | 카드 2 본문은 4줄로 보이지만 design_context는 3줄 (`<br>` 2개) | G1 텍스트 영역 미세 차이 | design_context 스펙 따르기 — Figma의 진실. baseline diff에서 확인. |
| R6 | Header가 RootLayout으로 전역 적용됨 (top-16 floating pill) — Hero 상단과 겹침 | 시각상 의도된 디자인. G1 측정 시 baseline에는 Header 없음, 구현에는 있음 | **plan에서 측정 라우트를 `/__preview/main-hero` (Header 없음)로 격리.** 실제 라우트 `/`는 Header 포함. |
| R7 | Header 적용 시 Hero 상단 텍스트가 가려질 수 있음 — Hero pt-160이 Header(top 16+72=88px)보다 충분히 크므로 OK | 검토만 | plan 단계에서 확인 |

---

## 7. 단계 1 통과 체크

- [x] baseline 존재 확인 (`figma-screenshots/main-hero.png`)
- [x] `get_design_context` 호출 (메타가 평탄하지 않음 확인)
- [x] `get_variable_defs` — 신규 토큰 0건
- [x] `get_metadata` — 사이즈 1920×1040 검증
- [x] Framelink로 자식 노드 5개 (`17:203`, `20:210`, `20:212`, `20:213`, `26:90`, `12:2332`) 추가 조회 — gifRef 식별
- [x] 에셋 표 작성 + 동적 여부 칸 + 처리 방식 명시
- [x] 캔버스-에셋 개수 일치 (4=4)
- [x] 토큰 매핑 표
- [x] 리스크 7건 식별
- [x] floating/중앙정렬 좌표는 풀폭이라 N/A (clip 0,0,1920,1040)

→ **단계 2 (계획) 진입 준비 완료.**
