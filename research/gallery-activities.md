# Research — gallery-activities (Node 314:7103, 936×519)

## 개요
- 페이지: `/gallery`
- Figma Node ID: `314:7103`
- 사이즈: 936×519 (실측 baseline 937×519)
- 캔버스 좌표: (492, 1432)
- 구조: 인라인 Hatched 헤딩("관련 활동 및 수상") + 단일 중앙정렬 카드 (456×431)
- baseline: `figma-screenshots/gallery-activities.png` (937×519, RGBA 1x) — **확보**
- 이 섹션이 /gallery 페이지 마지막. (2023년 수상 단일 블록)

## Figma 트리 (depth=3)

```
314:7103 FRAME "Frame 2043685971" [936×519] pb-40 gap-24 col items-center
├─ 314:7104 FRAME "Frame 2043685981" [936×24]         ← 헤딩행
│  ├─ 314:7105 TEXT "관련 활동 및 수상" [108×24]      ← Pretendard 500 16 LH24 LS-0.16
│  ├─ 314:7106 VECTOR "Vector 8" [776×0]               ← 실선 stroke #97A29E
│  └─ 314:7107 FRAME "Frame 2043685981" [36×8]        ← 6 tick stroke #97A29E 1.5w
└─ 314:7126 FRAME "Frame 2043685970" [936×431]         ← 카드 wrapper (row, justify-center)
   └─ 314:7127 FRAME "Frame 2043685691" [456×431] col gap-24
      ├─ 314:7128 FRAME "Frame 2043685689" [456×302] cornerRadius 24
      │  └─ (children: []) fills=[imageRef c0dc8d76..., imageRef 6d74731a...]
      │     ← 2 fill 합성 (blur bg + main photo)
      └─ 314:7129 FRAME "Frame 2043685692" [456×105]   text block col gap-16 items-center
         ├─ 314:7130 TEXT [456×68]  "COLiVE_한국ESG대상 수상\n(2023.12.26.)"
         │                          Pretendard 600 24 LH 33.6 center
         └─ 314:7131 TEXT [103×21]  "사회공헌부문 단체"
                                    Pretendard 400 14 LH 21 LS 0.28 center
```

## 카드 이미지 특이사항

- `314:7128`은 `children: []`, `fills=[{imageRef c0dc8d76...}, {imageRef 6d74731a...}]` — **단일 노드 2-fill 합성**
- fill 1 (아래): `c0dc8d76...` imageTransform scale ~0.95 — blur background (MOU2 이미지와 동일 imageRef! 재사용)
- fill 2 (위): `6d74731a...` scaleMode FILL — 메인 사진 (상장+시상식 2컷 composite)
- 그래서 leaf nodeId `314:7128` 하나로 export하면 두 fill이 합성된 완성본이 나옴 → **단일 PNG로 처리 OK**
- cornerRadius 24 존재 → HTML에서 `rounded-[24px] overflow-hidden`

## 텍스트 내용 (확정)

| 노드 | 내용 | 스타일 |
|------|------|--------|
| 314:7130 | `COLiVE_한국ESG대상 수상\n(2023.12.26.)` (2줄) | Pretendard 600 24 LH 33.6 LS 0 center |
| 314:7131 | `사회공헌부문 단체` (1줄, whitespace-nowrap) | Pretendard 400 14 LH 21 LS 0.28 center |

텍스트 블록 높이: 68 + 16 gap + 21 = 105. ✓ Figma 노드 높이 일치.

## 헤딩 스타일

- "관련 활동 및 수상" — Pretendard Medium 500 / 16 / LH 24 / LS -0.16 / color black
- Vector 8 line 776w × 1px (stroke #97A29E) — 텍스트 108w 때문에 agreements(825)보다 짧음
- 6 ticks 36×8 (stroke 1.5 #97A29E) — agreements와 동일 패턴
- **agreements의 `HatchedInlineDecor` 재사용 가능** — decor 자체는 flex-1로 자동 폭 조정

## 에셋 목록

| 파일 | 원본 노드 | 사이즈 | 동적? | 처리 |
|------|----------|--------|-------|------|
| `src/assets/gallery-activities/raw/award-card.png` | 314:7128 (composite fill) | 912×604 (2x) | 정적 | 본체 다운로드 완료 |
| `src/assets/gallery-activities/award-card.png` | ↑ processed | TBD | 정적 | process 후 최종 |
| `figma-screenshots/gallery-activities.png` | 314:7103 (section baseline) | 937×519 | 정적 | G1 비교 baseline 완료 |

- 캔버스 이미지 슬롯: **1개**. 에셋 파일: 1개 (composite fill이라도 단일 노드). **일치 판정 OK**.
- leaf nodeId `314:7128` 호출 (text 없음 → raster 안티패턴 아님).
- 섹션 baseline만 섹션 nodeId (314:7103).

## 레이아웃 치수 요약

- 섹션 컨테이너: 936 × 519, pb 40, gap 24 col items-center
- 상단 헤딩 바: 936 × 24 (y=0)
- 카드 wrapper: 936 × 431 (y=48, justify-center → 자연스럽게 카드 가운데)
- 카드: 456 × 431 col gap-24
  - image: 456 × 302 rounded-24
  - text: 456 × 105 col items-center gap-16

→ `48 + 431 + 40 = 519` ✓

## 중앙 정렬 방식

- Figma에서 카드는 936w wrapper 안에서 `justify-center` → x offset = (936-456)/2 = 240
- 구현: section-level `flex col items-center` + 카드는 `w-[456px]` (absolute 금지)

## MouCard 공통 승격 최종 판단

### 구조 비교

| 항목 | GalleryAgreements MouCard | GalleryActivities 카드 | 차이 |
|------|---------------------------|-------------------------|------|
| 루트 | `<article> flex w-[456px] col` | `flex w-[456px] col gap-24` | **gap 위치**: agreements는 내부 div에서 pt-24 + gap-16, activities는 부모 gap-24 + 텍스트블록 gap-16 |
| 이미지 컨테이너 | `h-[302px] w-[456px] overflow-hidden` (**no rounded**) | `h-[302px] rounded-[24px] overflow-hidden` | agreements에 rounded 누락 (Figma는 cornerRadius:24) |
| 이미지 | `<img> object-cover h-full w-full` | 동일 | 동일 |
| 텍스트 블록 | `pt-24 gap-16 col items-center` | `gap-16 col items-center` (pt 없음) | pt 유무 |
| 기관/제목 | 24 SemiBold / LH 33.6 / center | 동일 | 동일 |
| 설명 | 14 Regular / LH 21 / LS 0.28 / center, **2줄** (line1+br+line2) | 동일 스타일 / **1줄** (whitespace-nowrap) | 줄 수 가변 |

### 판단: **(A) 공통 승격**

**근거**:
1. 구조·타이포·색상 모두 동일
2. 차이 3가지는 모두 **props 추가로 흡수 가능**:
   - `rounded?: boolean` — 이미지 모서리 (Figma 실제로는 항상 24이므로 기본값 `true`, 기존 agreements도 함께 수정)
   - `descriptionLine2?: string` — undefined일 때 `<br>`과 함께 생략
   - `pt-24`는 부모 container gap으로 흡수 가능. 통일 제안: **MouCard 자체는 pt 없이 `flex col gap-24`로 설계**, 부모는 section-level로 wrapper 없음
3. Rule of Three: 4(agreements) + 1(activities) = 5회 충족
4. GalleryAgreements 수정 허용 (이번 커밋 내 — 공통화 목적)

### 구현 계획
- `src/components/ui/MouCard.tsx` 신설 (기존 로컬 파일 로직 그대로 + `rounded` + `descriptionLine2?` props)
- `src/components/sections/GalleryAgreements/GalleryAgreements.tsx` import 경로 변경 (`./MouCard` → `@/components/ui/MouCard`)
- `src/components/sections/GalleryAgreements/MouCard.tsx` **삭제**
- rounded 기본 `true`로 하되, agreements MouCard가 `cornerRadius:24`로 확인됐으므로 그대로 적용 — baseline diff 재측정 시 agreements도 개선될 가능성

## clip 좌표 (단계 5 측정용)

- Preview 라우트 (1920 기준): section 자기정렬 후 좌표
  - `--clip-x 492 --clip-y 0 --clip-w 936 --clip-h 519`
- baseline 실측: 937×519

## 리스크 / 주의

1. **이미지 composite 해석**: 314:7128은 2-fill (blur BG + 메인 사진). Figma export가 두 fill을 합쳐준 PNG 반환 — 그대로 `<img>`로 처리. BG blur 효과를 CSS로 재현할 필요 **없음** (이미 baked in).
2. **한글 텍스트 AA 엔진 차이**: v4 agreements 결과 6~7% 수렴. activities도 유사 수렴 예상 → G1 참고용, ≤15% 차단
3. **공통 승격 파급**: GalleryAgreements 파일 동시 수정. 이번 커밋 내 모두 포함. 커밋 메시지에 명시.
4. **2023.12.26. 날짜**: agreements와 달리 activities는 "COLiVE_한국ESG대상 수상" + "(2023.12.26.)" 형식. `institutionLine1="COLiVE_한국ESG대상 수상"`, `institutionLine2Prefix=""`, `dateDisplay="(2023.12.26.)"`, `dateIso="2023-12-26"`.
5. **Frame 2043685691 내부 padding 32**: `314:7128`에는 `paddingLeft/Right/Top/Bottom=32`가 있지만 `children: []` 이므로 무시 — padding은 자식 배치용, 단일 raster fill에 영향 없음

## 단계 1 통과 조건

- [x] baseline PNG 확보 (937×519)
- [x] Figma 트리 depth=3 스캔 완료 (get_design_context)
- [x] 텍스트 2블록 content 확정
- [x] 이미지 1장 leaf로 다운로드 (912×604 2x)
- [x] 헤딩 구조 agreements HatchedInlineDecor 재사용 확정
- [x] MouCard 공통 승격 판단 완료 (A)
- [x] 리스크 5종 명시
