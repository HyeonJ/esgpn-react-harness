# main-gallery (메인페이지 §9) — 단계 1 리서치

- Figma Node: `43:545` "Frame 2043685961" (ESPGN 아카이브)
- Figma 사이즈: 1920×1888 (spec)
- 캔버스 좌표: x=0 y=7490 w=1920 h=1888
- baseline: `figma-screenshots/main-gallery.png` — **실측 1920×1888** (spec과 동일, 편차 없음)
- 라우트: `/__preview/main-gallery` (격리) + `/` (RootLayout 합성)

---

## 1. 배경 구조 (핵심 리스크 해결)

섹션 루트 노드의 `fills`는 **3개 스택** — design_context와 Framelink `get_figma_data`로 확정:

| 순서 | fill | 용도 | 처리 전략 |
|------|------|------|-----------|
| 1 | IMAGE `4c8ae3d9...` (cityscape, 2825×4096) | 하단 도시 실사. `mix-blend-luminosity`, `h-[75.92%]`, `top-[60.28%]`, `w-[99.65%]`, `left-[0.17%]` | imageRef 단독 다운로드 성공 → `bg-cityscape.png`. **design_context % 수치 그대로 적용**, mix-blend-luminosity 유지 (원본 실사 → 그린에 luminosity blend 시켜 baseline의 톤 낮춘 실루엣 완성). 원본 이미지는 raw raster이므로 블렌드 2중적용 아님 (§2.5는 "Framelink 합성 PNG에 추가 blend 금지"인데 여기는 개별 imageRef 다운로드라 허용) |
| 2 | IMAGE `83ba43ed...` (overlay, 2392×1792) | `scaleMode: STRETCH`, `mix-blend-multiply`, `object-cover size-full`, `needsCropping: true` + `cropTransform` | imageRef 단독 다운로드 성공 → `bg-overlay.png`. **needsCropping=true 크롭 변환 적용하지 않음** (§2.5 규칙 #5: imageRef + needsCropping은 raw JPEG 함정). 대신 `object-cover size-full + mix-blend-multiply`만 적용. baseline에서 이 overlay는 거의 인지 안 되는 미묘한 질감이라 단계 5 G1에서 문제 되면 제거하는 폴백 |
| 3 | `#0C3B0E` (brand-700) | 베이스 그린 | 가장 아래 layer. **실제 BG 색 = `#0c3b0e` 확정** (다크 그린 사전 가정과 일치) |

**결론:** "다크 그린 BG 위에 도시 luminosity + 미묘한 multiply 오버레이" 구조. main-news에서 교훈처럼 "다크 그린으로 보였지만 실제 #f3f3f3" 사례는 이번엔 **실제로 다크 그린**. design_context가 `#0c3b0e` 변수 사용을 명시적으로 보여줌.

## 2. 레이아웃 개요 (display-ready 구조)

1920×1888 풀폭. padding: `120px 252px 200px`, gap 48px, 자식 3블록:

```
Frame 2043685961 (43:545, 1920×1888, flex col gap-48 pt-120 pb-200 px-252)
├─ Heading Block (43:546) — py-24, center-aligned
│  ├─ "ESGPN Gallery" (43:548)      — text-14 gray-300 tracking-[-0.07px]
│  ├─ "실천이 만든 변화의 순간들,<br/>ESPGN 아카이브" (43:549) — 48px Bold #caeb69 leading-56
│  └─ "이론에 머물지 않고...<br/>우리가 함께 그려온..." (43:550) — 16R white tracking-[-0.16px]
│
├─ Partnership Block (43:1851) — pb-40, gap-24
│  ├─ Divider Row (43:1818) — gap-16
│  │  ├─ left line (43:1820, SVG 657×2, white/0.28)
│  │  ├─ "업무 협약" (43:1813) — 20SB #caeb69 tracking-[-0.4px]
│  │  └─ right line (43:1815, 동일 SVG)
│  ├─ Card Row (43:1844) — gap-24, 3 cards (flex-1)
│  │  └─ each: thumb (h=302, radius-24, overflow-hidden) + title(24SB white) + desc(14R white tracking-[0.28px])
│  └─ CTA "전체보기" (43:1854) — pill rgba(255,255,255,0.14), arrow-right
│
└─ Award Block (43:1880) — pb-40, gap-24 (동일 구조)
   ├─ Divider Row (43:1881) — "관련 활동 및 수상"
   ├─ Single Card (43:1885) — flex center, 456px 카드 1개
   │  └─ thumb 302 (card2 썸네일 재사용 + award-thumb 오버레이) + title + "사회공헌부문 단체"
   └─ CTA "전체보기"
```

## 3. 카드 구조 상세 (Partners/Award 공통)

모든 카드 동일 골격 → 로컬 공통 컴포넌트 `GalleryCard` 추출 가능:

- Wrapper: `flex flex-col gap-24 items-start`
- Thumbnail: `h-302 rounded-24 overflow-hidden w-full relative`
  - 내부 img는 카드마다 `h-[105~107%]`, `top-[-0.74~-2.62%]`, `left-[-1.45~-2.48%]`, `w-[102.9~104.96%]` (Figma auto-layout 크롭 표현, 원본값 그대로)
- Text block: `gap-16 items-center text-center text-white`
  - Title: 24SB leading-1.4 `<br/>` 포함
  - Desc: 14R leading-1.5 tracking-[0.28px] **whitespace-pre** (공백/들여쓰기 보존)

**특이점 — Award 카드 썸네일 (43:1892)**: design_context에서 **2개 img 스택**:
1. card2-thumb 재사용 (imgFrame2043685690) `h=105.81% left=-2.48% top=-0.74% w=104.96%`
2. award-thumb (imgFrame2043685692) `object-cover rounded-24 size-full` ← 위에 덮음

baseline에서 "한국ESG대상" 상장 이미지가 썸네일 전체를 덮는 게 보여 2번이 주력, 1번은 뒤에서 거의 안 보이는 백플레이트. **두 이미지 모두 포함** (단계 2에서 제거 여부 재검토).

## 4. CTA (전체보기 pill)

Partnership·Award 블록에 1개씩 (총 2개), 구조 동일:
- `rounded-full` pill, bg `rgba(255,255,255,0.14)`
- padding: `py-12 pl-24 pr-16`
- gap 2, 텍스트 "전체보기" 16SB white + arrow SVG 23×24
- Arrow는 `rotate(90deg)` (우측향). SVG 자체는 down-arrow 경로로, 회전으로 right 만듦 — **원본 SVG 유지, CSS rotate-90 적용** (§2.4 SVG flip 금지 규칙은 scaleY/X 반전에만 해당, rotate는 원본 변환 유지에 포함)

## 5. 에셋 목록

**정적 에셋 8개** (동적 없음 — design_context의 모든 img는 raster JPG/PNG, `fills`에 `gifRef` 없음):

| # | 이름 | 원본 URL/노드 | 다운로드 방법 | 용도 |
|---|------|---------------|---------------|------|
| 1 | bg-cityscape.png | imageRef `4c8ae3d9...` (2825×4096) | Framelink imageRef 단독 | 섹션 BG 도시 실사 (luminosity blend) |
| 2 | bg-overlay.png | imageRef `83ba43ed...` (2392×1792) | Framelink imageRef 단독 (needsCropping 미적용) | 섹션 BG 미묘한 multiply 오버레이 |
| 3 | card1-thumb.png | node 43:1826 (912×604) | Framelink nodeId | 업무협약 카드1 썸네일 |
| 4 | card2-thumb.png | node 43:1839 (912×604) | Framelink nodeId | 업무협약 카드2 썸네일 + Award 카드 백플레이트 |
| 5 | card3-thumb.png | node 43:1846 (912×604) | Framelink nodeId | 업무협약 카드3 썸네일 |
| 6 | award-thumb.png | node 43:1892 (912×604) | Framelink nodeId | Award 카드 메인 이미지 (ESG 대상 상장) |
| 7 | divider-partnership.svg | node 43:1820 (657×2) | Framelink nodeId | "업무 협약" 좌우 가로줄 (양쪽 동일 SVG 재사용) |
| 8 | divider-award.svg | node 43:1882 (628×2) | Framelink nodeId | "관련 활동 및 수상" 좌우 가로줄 |
| 9 | arrow-icon.svg | node `I43:1857;11:10988` (6×11) | Framelink nodeId | CTA 우측 화살표 (rotate-90 적용) |

**동적 에셋 여부:** 없음. gifRef fill 0개.

**캔버스-에셋 개수 일치 검증:**
- 썸네일: 업무협약 3개 + Award 1개 + Award 백플레이트 1개(공용 card2) = 4개 고유 이미지 ✓
- divider: 2종 ✓
- arrow: 1종 (CTA 2개에서 재사용) ✓
- BG: 2개 ✓
- **총 9개 = 다운로드 9개 일치**

## 6. 타이포·색상 토큰

- Heading eyebrow: `text-14 font-Regular color #c6cdcc (gray-300) tracking-[-0.07px]`
- Heading main: `text-48 font-Bold color #caeb69 leading-[56px]` (brand lime green)
- Heading sub desc: `text-16 font-Regular color #ffffff tracking-[-0.16px]`
- Divider label: `text-20 font-SemiBold color #caeb69 tracking-[-0.4px]`
- Card title: `text-24 font-SemiBold color #ffffff leading-1.4`
- Card desc: `text-14 font-Regular color #ffffff leading-1.5 tracking-[0.28px]` **whitespace-pre**
- CTA text: `text-16 font-SemiBold color #ffffff tracking-[-0.16px]`
- BG base: `#0c3b0e`
- Divider line: `white / 0.28 alpha`
- CTA bg: `rgba(255,255,255,0.14)` (opacity/white-opacity-300)

letter-spacing은 design_context `tracking-[...]` 값 그대로 적용 (percent → px 변환된 값 신뢰).

## 7. transform 요소

- **CTA 화살표**: `rotate-90` (화살표 아이콘 회전, Figma `flex-none h-[100cqw] rotate-90 w-[100cqh]` 패턴 그대로 복제)
- 나머지 rotation 요소 없음

음수 width (main-news 교훈)는 없음 — 카드 썸네일 내부 img의 `left` 값은 모두 음수지만 width는 양수(`102.9%` 등). 브라우저 유효.

## 8. 사전 추정 재확인

- ✅ BG 다크 그린 가정 → **확정 `#0c3b0e`**
- ✅ Partners/CTA 별도 섹션 없음 → **확정**, 단일 main-gallery 섹션 내부 2블록(Partnership + Award)으로 통합. "CTA"는 각 블록의 "전체보기" 버튼.
- ✅ 카드 4개 (업무협약 3 + 수상 1) 구조 → **확정**. 3개는 3열 grid, 1개는 456px 중앙정렬

## 9. 리스크

1. **BG 이미지 2장 mix-blend** (`luminosity` + `multiply`) — Tailwind `mix-blend-luminosity` / `mix-blend-multiply`는 지원되지만 baseline과 정확한 톤 매칭은 단계 5 G1에서만 확정 가능. 어긋나면 overlay 제거 폴백.
2. **Award 카드 썸네일 이중 이미지** — card2 백플레이트가 실제로 보이는지 의문. design_context에 있으니 포함하되 단계 6에서 제거 검토.
3. **카드 descriptions의 `whitespace-pre`** — `"    교육콘텐츠, IT 기술 협력"` (4 스페이스 들여쓰기)를 보존해야 시각 매칭. `whitespace-pre` 유지 필수, `whitespace-nowrap`로 대체 금지 (§2.4 규칙 #10).
4. **"Impacrt" 오탈자** — Figma 원문이 "CSR Impacrt(주)" (오타). 원문 보존.
5. **큰 섹션 측정 시간** — 1888px 높이로 pixelmatch 비교 시간 길 수 있음 (정상).

---

## 10. 산출 요약

- baseline 실측: 1920×1888 (spec과 동일)
- 실제 BG 색: `#0c3b0e` + luminosity cityscape + multiply overlay
- 카드: 업무협약 3 + 수상 1 = 4개 (구조 공통)
- 에셋: 정적 9개 (동적 0)
- 다운로드 완료: `src/assets/main-gallery/raw/` (단계 3에서 process-assets로 정리 예정)
- 동적 에셋·음수 width·SVG flip — 해당 없음
