# Research — gallery-agreements (Node 314:7056)

## 섹션 개요
- 라우트: `/__preview/gallery-agreements`
- 부모 페이지: `/gallery` (Node 302:6622)
- Figma Node ID: `314:7056` (부모 302:6622)
- Figma 사이즈: **936 × 1024**
- 캔버스 좌표: x=492, y=360
- baseline: `figma-screenshots/gallery-agreements.png` (실측 **937 × 1024**, RGBA, non-interlaced)
- 내부 패딩: `pb-[40px]` (spacing/10), 헤딩과 카드그리드 사이 gap 24

## 구조 트리

```
Frame 314:7056 (936×1024, flex-col, gap 24, items-center, pb-40)
├─ Heading row 314:7091 (full-w, gap 8, items-center)  ← HatchedSectionHeading 재사용
│  ├─ <p>업무 협약</p>  (Pretendard Medium 16, leading-1.5, tracking -0.16)
│  ├─ Vector8 line (flex-1, h-0, inset -0.75px 0)
│  └─ 6 ticks (36×8, inset -9.38% -2.08%)  ← imgFrame2043685981
└─ Cards group 314:7144 (full-w, flex-col, gap 32 = spacing/8)
   ├─ Row1 314:7061 (full-w, flex, gap 24)
   │  ├─ Card 314:7062 (456 fixed, flex-col, gap 24)
   │  │  ├─ Image 314:7063 (456×302, rounded-24, overflow-hidden)
   │  │  │  └─ <img> inset 보정: h-107.29%, left -1.45%, top -2.62%, w-102.9%
   │  │  └─ Text 314:7064 (full-w, flex-col, gap 16, items-center, color #1d2623)
   │  │     ├─ Title 314:7065 SemiBold 24/1.4: "COLiVE, CSR Impacrt(주),\n㈜소프트퍼즐 (2025. 8. 5.)"
   │  │     └─ Desc 314:7066 Regular 14/1.5 tracking 0.28: "ESG실천 프로젝트의 공동 기획 수행을 위한 인력, \n    교육콘텐츠, IT 기술 협력"
   │  └─ Card 314:7067 (456) — image 314:7068 + text 314:7069 (한국공공ESG학회)
   │     └─ Title 314:7070: "COLiVE, 한국공공ESG학회\n(2025. 9. 17.)"
   │     └─ Desc 314:7071: "지역 ESG 인재양성의 체계적 지원을 위한 사업 협력,\n   지역발전 및 ESG경영 도입에 필요한 상호 협력 사업 추진"
   └─ Row2 314:7133 (full-w, flex, gap 24)
      ├─ Card 314:7134 (314:7062와 동일 더미 — 텍스트/이미지 모두 일치)
      └─ Card 314:7139 (314:7067과 동일 더미)
```

## 디자인 토큰 (`get_variable_defs` 결과)

| 토큰 | 값 |
|---|---|
| Text-base/16M | Pretendard Medium 16, lh 1.5, ls -1 (※ tracking -0.16px = -1% of 16) |
| Text-2xl/24SB | Pretendard SemiBold 24, lh 1.4, ls 0 |
| Text-sm/14R | Pretendard Regular 14, lh 1.5, ls 2 (※ tracking 0.28px = 2% of 14) |
| Gray Scale/Gray 900 | `#1d2623` (모든 텍스트 색) |
| Gray Scale/Gray 500 | `#97a29e` (헤딩 라인용, HatchedSectionHeading 내부에서 처리) |
| spacing/2 | 8 |
| spacing/8 | 32 (행간 gap) |
| spacing/10 | 40 (섹션 하단 padding) |

## 에셋 목록 (캔버스-에셋 일치 검증)

캔버스에 보이는 에셋 슬롯 6개 중 **공통/HatchedSectionHeading 내장 2개 제외**, 신규 다운로드 대상 = **2장의 unique 카드 이미지** (각 2번 등장).

| # | Figma 노드 | 자산 | imageRef / suffix | 동적? | 처리 |
|---|---|---|---|---|---|
| 1 | 314:7063 / 314:7135 | 좌측 카드 이미지 (단체 사진 - CSR Impacrt) | `aeccce78e4dfa7db186266e0d0246ae3519ebee3` / `791b70`, cropTransform [[0.9718,0,0.0141],[0,0.9321,0.0244]] | ❌ | Framelink `download_figma_images` (PNG, scale 2) → `mou-csr-impacrt.png` |
| 2 | 314:7068 / 314:7140 | 우측 카드 이미지 (체결식 - 한국공공ESG학회) | `c0dc8d76e6ae0209228a7f98239c873fc942977a` / `6f9997`, cropTransform [[0.9528,0,0.0236],[0,0.9451,0.0070]] | ❌ | Framelink → `mou-esg-society.png` |
| 3 | 헤딩 Vector8 | hatched line | `imgVector8` (HatchedSectionHeading 내장 SVG) | ❌ | **재사용 — 신규 다운로드 불필요** |
| 4 | 헤딩 6 ticks | tick marks | `imgFrame2043685981` (HatchedSectionHeading 내장) | ❌ | **재사용 — 신규 다운로드 불필요** |

**캔버스-에셋 개수 확인:** 카드 이미지 슬롯 4개(2장×2회 노출) = 2 unique 이미지. 헤딩 장식 2개는 기존 ui/HatchedSectionHeading 컴포넌트 내장. **불일치 없음.**

다운로드 위치: `src/assets/gallery-agreements/raw/` → 검증 후 `src/assets/gallery-agreements/`

## 공통 컴포넌트 사용/생성 계획

- **`HatchedSectionHeading`** (기존 ui/) 재사용 — props: `title="업무 협약"`, 변형 없음
- **`MouCard`** **신규 생성 (로컬)** — `src/components/sections/GalleryAgreements/MouCard.tsx`
  - Rule of Three: 1회차 도입. activities 진행 시 2회차 → ui/ 승격 검토
  - props: `imageUrl: string; imageAlt: string; title: ReactNode; description: ReactNode;`
    - title은 `\n` 포함 가능 → JSX `<br />` 또는 `whitespace-pre-line`로 처리 (Figma의 `<br aria-hidden>` 패턴 따름)
    - description 동일
  - 카드 내부 구조: outer `flex flex-col gap-[24px] w-[456px]` → 이미지 div (`h-[302px] rounded-[24px] overflow-hidden`) + 텍스트 div (`flex flex-col gap-[16px] items-center text-center text-[#1d2623]`)
  - 이미지 inset 보정값(`h-107.29% / left -1.45% / top -2.62% / w-102.9%`)은 **카드별로 다르므로** props로 받지 않고, 두 카드의 cropTransform이 다른 점을 처리하기 위해 다운로드 단계에서 **이미 cropped된 PNG**로 받아 단순 `object-cover w-full h-full` 처리한다 (Framelink가 cropTransform을 적용해 export하므로 inset 보정 불필요. 단계 5에서 G1 검증)

## 텍스트 (raster 금지 확인)

모두 HTML로 렌더 (raster 금지 규칙 준수):

| 노드 | 내용 | 폰트 | 비고 |
|---|---|---|---|
| 314:7092 | "업무 협약" | Medium 16, ls -0.16 | HatchedSectionHeading prop |
| 314:7065 / 314:7137 | "COLiVE, CSR Impacrt(주),\n㈜소프트퍼즐 (2025. 8. 5.)" | SemiBold 24/1.4 | 더미 중복 — Figma 그대로 재현 |
| 314:7066 / 314:7138 | "ESG실천 프로젝트의 공동 기획 수행을 위한 인력, \n    교육콘텐츠, IT 기술 협력" | Regular 14/1.5, tracking 0.28 | 선행 공백(`    `) 포함 — Figma 원본 유지. `whitespace-pre` 필요 |
| 314:7070 / 314:7142 | "COLiVE, 한국공공ESG학회\n(2025. 9. 17.)" | SemiBold 24/1.4 | |
| 314:7071 / 314:7143 | "지역 ESG 인재양성의 체계적 지원을 위한 사업 협력,\n   지역발전 및 ESG경영 도입에 필요한 상호 협력 사업 추진" | Regular 14/1.5, tracking 0.28 | 선행 공백(`   `) 포함 |

## 좌표 / 측정 파라미터

- **풀폭 섹션** (936px) — Preview에서 `mx-auto` 단독 렌더. 캔버스 floating 아님.
- 측정: `scripts/compare-section.sh gallery-agreements` 패턴 사용 가능 (clip 불필요, 스크린샷 전체)
- 또는 명시적 clip 시: baseline 937×1024 기준 `--clip-x 0 --clip-y 0 --clip-w 937 --clip-h 1024`
- 카드 4장이 동일 텍스트 더미라 G1에 영향 없음 (양쪽 동일)

## 리스크 처리 (페이지 research 매핑)

| 페이지 리스크 | 이 섹션 처리 |
|---|---|
| #3 카드 이미지 노드 비어있음 | ✅ get_design_context로 imageRef 확인 완료 (`aeccce78...` / `c0dc8d76...`). Framelink 다운로드 가능 |
| #4 콘텐츠 폭 936 (≠1416) | ✅ 섹션 루트 `w-[936px] mx-auto` 내장 |
| #5 카드 텍스트 2곳 동일 중복 | ✅ Figma 그대로 재현. MouCard 4번 호출, props 2종만 사용. plan에 더미 중복 주석 |

추가 리스크 없음. transform/blend/회전 없음 → wrapper=AABB 패턴 불필요.

## 단계 1 통과 조건 체크

- [x] baseline PNG 확보 + 실측 (937×1024)
- [x] 구조 트리 작성
- [x] 모든 텍스트 노드 식별 + raster 대상 0개
- [x] 에셋 목록 작성 (동적 여부 칸 포함, 모두 ❌)
- [x] 캔버스-에셋 개수 일치 검증 (2 unique 카드 이미지 + 2 헤딩 장식 재사용)
- [x] imageRef + cropTransform 확보 (Framelink 다운로드 준비 완료)
- [x] 디자인 토큰 매핑
- [x] 신규 컴포넌트 결정 (MouCard 로컬 도입)
- [x] 리스크 처리 방안 명시

→ 단계 2 plan 작성 진입 가능. 사용자 검토 대기.
