# Research — gallery-agreements (Node 314:7056, 936×1024)

## 개요
- 페이지: `/gallery`
- Figma Node ID: `314:7056`
- 사이즈: 936×1024 (실측 baseline 937×1024)
- 캔버스 좌표: (492, 360)
- 구조: 인라인 Hatched 헤딩("업무 협약") + 2×2 MOU 카드 그리드
- baseline: `figma-screenshots/gallery-agreements.png` (937×1024, RGBA 1x)

## Figma 트리 (depth=4)

```
314:7056 FRAME "Frame 2043685969" [936×1024]
├─ 314:7091 FRAME "Frame 2043685981" [936×24]      ← 헤딩행
│  ├─ 314:7092 TEXT "업무 협약" [59×24]
│  ├─ 314:7093 VECTOR "Vector 8" [825×0]            ← 실선 (stroke #97A29E)
│  └─ 314:7094 FRAME "Frame 2043685981" [36×8]      ← 6개 tick
│     └─ 314:7095~314:7100 VECTOR [6×8 each]         ← 대각 stroke #97A29E 1.5w
└─ 314:7144 FRAME "Frame 2043686170" [936×936]       ← 카드 그리드 (y=408)
   ├─ 314:7061 FRAME "Frame 2043685968" [936×452]    ← row 1 (y=408)
   │  ├─ 314:7062 FRAME [456×452 @x=21212]
   │  │  ├─ 314:7063 FRAME [456×302]  imageRef aeccce78...
   │  │  └─ 314:7064 FRAME [456×126]   text block 1
   │  └─ 314:7067 FRAME [456×452 @x=21692]
   │     ├─ 314:7068 FRAME [456×302]  imageRef c0dc8d76...
   │     └─ 314:7069 FRAME [456×126]   text block 2
   └─ 314:7133 FRAME "Frame 2043685982" [936×452 @y=892]  ← row 2
      ├─ 314:7134 FRAME [456×452] → 314:7135 image (imageRef aeccce78...) + 314:7136 text
      └─ 314:7139 FRAME [456×452] → 314:7140 image (imageRef c0dc8d76...) + 314:7141 text
```

- 헤딩 y=360, height=24. 카드 그리드 y=408 → gap=24 (384→408).
- 두 행 간격: row1 y=408+452=860, row2 y=892 → gap=32.
- 카드 사이 gap: 456×2=912, 두 카드 x=21212, x=21692 → 간격 24. row gap=32, col gap=24.

## 이미지 중복

- **cards 1 & 3** (314:7063, 314:7135): imageRef `aeccce78e4dfa7db186266e0d0246ae3519ebee3` 공유
- **cards 2 & 4** (314:7068, 314:7140): imageRef `c0dc8d76e6ae0209228a7f98239c873fc942977a` 공유
- Figma 더미 데이터 중복. 실제 **유니크 이미지 2장**만 있음 → `mou-1.png`, `mou-2.png` 2회씩 재사용.

## 텍스트 내용 (확정)

| 카드 | 기관명/날짜 (24B) | 설명 (14R) |
|------|------------------|-----------|
| 1 (314:7065/7066) | `COLiVE, CSR Impacrt(주), ㈜소프트퍼즐 (2025. 8. 5.)` | `ESG실천 프로젝트의 공동 기획 수행을 위한 인력, 교육콘텐츠, IT 기술 협력` |
| 2 (314:7070/7071) | `COLiVE, 한국공공ESG학회 (2025. 9. 17.)` | `지역 ESG 인재양성의 체계적 지원을 위한 사업 협력, 지역발전 및 ESG경영 도입에 필요한 상호 협력 사업 추진` |
| 3 (314:7137/7138) | cards 1과 동일 (Figma 더미 복제) | cards 1과 동일 |
| 4 (314:7142/7143) | cards 2와 동일 | cards 2와 동일 |

- Figma 원문에 `\u0020\u0020\u0020\u0020\u0020\u0020` 연속 공백이 존재 (예: `인력,      교육콘텐츠`). 실 데이터 렌더에서는 자연 줄바꿈 기대 — **HTML 구현에서는 단일 공백으로 정상화** (렌더 로직 동일).
- 기관명 style: Pretendard 600 / 24 / LH 33.6 / LS 0 / center
- 설명 style: Pretendard 400 / 14 / LH 21 / LS 0.28 / center

## 헤딩 스타일 (314:7092)

- text: "업무 협약"
- font: Pretendard Medium 500
- size: 16, LH 24, LS -0.16
- color: 기본 text (검정 계열). Figma fills 기본값 사용 — 실제 `#000` 또는 `near-black`. 
- 그 옆 Vector 8 라인 (825w, 1 stroke, `#97A29E`) + 6 ticks (1.5w, `#97A29E`).

**주의**: 이것은 공통 `HatchedSectionHeading` (40px 아이콘 + 32B 제목)과 **다르다**. 공통 컴포넌트 재사용 **불가** — 로컬 `HatchedInlineHeading` 재구축 필요 (v1~v3도 동일 판단).

## 에셋 목록

| 파일 | 원본 노드 | 사이즈 | 동적? | 처리 |
|------|----------|--------|-------|------|
| `src/assets/gallery-agreements/mou-1.png` | 314:7063 (imageRef aeccce78...) | 456×302 | 정적 | 카드 1,3에서 재사용 |
| `src/assets/gallery-agreements/mou-2.png` | 314:7068 (imageRef c0dc8d76...) | 456×302 | 정적 | 카드 2,4에서 재사용 |
| `figma-screenshots/gallery-agreements.png` | 314:7056 (section baseline) | 937×1024 | 정적 | G1 비교 baseline |

- 캔버스 상 카드 이미지 4개 슬롯, 에셋 파일은 유니크 2장 (Figma 더미 중복). **일치 판정**: 유니크 에셋 개수 = 2 ↔ 파일 2개. OK.
- leaf nodeId로 호출함 (314:7063, 314:7068). 섹션 baseline만 섹션 nodeId.

## 레이아웃 치수 요약

- 섹션 컨테이너: 936 × 1024
- 상단 헤딩 바: 936 × 24 (y=0)
- 헤딩~그리드 간격: 24px (y=24 → y=48)
- 카드 그리드: 936 × 936 (y=48)
- 카드: 456 × 452 (이미지 302h + 텍스트 126h, gap 24)
- 행 사이 gap: 32px (row1 bottom y=500 → row2 top y=532)
- 열 사이 gap: 24px

> 실제로는 Frame 2043685969 총높이 1024 = 24(heading) + 24(gap) + 936(cards grid) + 40(남은 여백) 이렇게 떨어짐. 정확히는 `heading+24+grid=984` → 바닥 40 여백은 section container가 936×1024를 차지하는 형태. 구현 시 section `h-[1024px]` 또는 flex에 `pb-40` 조절.

## 리스크 / 주의

1. **V1~V3 T-006 ACCEPTED 이력**: G1 5.72% 수렴. 한글 텍스트 다수 + 사진 4장 dense composite의 엔진 차이가 구조적. v4는 동일 패턴 예상 → G1 차단 게이트 아님, 참고 지표(≤15%).
2. **`HatchedSectionHeading`(공통) 미사용**: 이 섹션의 헤딩은 16/500/LH24 인라인 + line + ticks. 공통 컴포넌트(40px 아이콘 + 32B 제목)와 구조 다름. 로컬 `HatchedInlineHeading` 필요.
3. **MouCard 공통 승격 후보**: gallery-agreements 4회 + gallery-activities 1회 = 5회 사용. Rule of Three 충족. gallery-activities가 아직 미구현이므로 현 섹션에서 로컬로 만들고, activities 진행 시점에 실구조 일치 확인 후 `src/components/ui/MouCard.tsx`로 승격 판단. **이번 섹션에서 승격 보류** (1회차에는 로컬 유지, `/gallery-activities` 구현 후 실제 lift).
4. **이미지 중복 렌더링**: 카드 1=3, 2=4 동일 이미지. `mou-1.png`를 두 번 `<img>`로 render해도 브라우저가 동일 리소스 캐시 — 성능 문제 없음.
5. **Figma 텍스트에 연속 공백**: `인력,      교육콘텐츠` 같은 6공백은 Figma 내부 줄바꿈 꼼수 (width 281 안에 강제 wrap). HTML에서는 자연 wrap에 맡기고 단일 공백 정상화 (CSS `white-space: normal`).

## clip 좌표 (단계 5 측정용)

- Preview 라우트 (1920 기준): section 자기정렬 후 좌표
  - `--clip-x 492 --clip-y 0 --clip-w 936 --clip-h 1024`
- baseline 실측: 937×1024 → baseline과 capture 사이 1px 폭 차이 발생 가능 (pixelmatch가 937×1024 기준 비교)

## 단계 1 통과 조건

- [x] baseline PNG 확보 (937×1024)
- [x] Figma 트리 depth=4 스캔 완료
- [x] 텍스트 4블록 × 2행 content 확정
- [x] 이미지 2장 leaf로 개별 다운로드
- [x] 헤딩 구조 (inline, not HatchedSectionHeading) 확정
- [x] 리스크 5종 명시
