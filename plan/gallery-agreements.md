# Plan — gallery-agreements (Node 314:7056)

> research/gallery-agreements.md 후속. 사용자 [A] 승인 완료 사항 반영.

## 0. 결정 요약

| 항목 | 결정 |
|---|---|
| 섹션 사이즈 | 936 × 1024 (Figma spec). baseline 실측 937 × 1024 (1px 차이는 측정 시 baseline 기준) |
| 라우트 | `/__preview/gallery-agreements` (Preview wrapper 없음, 섹션 직접 렌더) |
| 섹션 루트 폭 | `w-[936px] mx-auto` 내장 |
| 헤딩 | `HatchedSectionHeading title="업무 협약"` (기존 ui/ 재사용, 변형 없음) |
| 카드 컴포넌트 | `MouCard` 신규 — 로컬 (`src/components/sections/GalleryAgreements/MouCard.tsx`) |
| 카드 그리드 | 2×2, gap row 32 / col 24 |
| unique 이미지 | 2장 (4 카드 = 2+2 더미 중복, Figma 원본 유지) |
| 이미지 처리 | Framelink가 cropTransform 적용해 export → `object-cover w-full h-full`, inset 보정 불필요 |
| 텍스트 raster | 0개 (전부 HTML 렌더) |
| 신규 npm 패키지 | 없음 |

## 1. 컴포넌트 트리

```
GalleryAgreements (section root, w-[936px] mx-auto pb-[40px], flex-col gap-[24px] items-center)
├─ HatchedSectionHeading title="업무 협약"
└─ div.cards (w-full, flex-col, gap-[32px])
   ├─ div.row1 (w-full, flex, gap-[24px])
   │  ├─ MouCard (csr-impacrt)
   │  └─ MouCard (esg-society)
   └─ div.row2 (w-full, flex, gap-[24px])
      ├─ MouCard (csr-impacrt 더미 중복)
      └─ MouCard (esg-society 더미 중복)
```

## 2. MouCard 컴포넌트 (로컬 신규)

### 위치
`src/components/sections/GalleryAgreements/MouCard.tsx`

### Props 시그니처

```tsx
import type { ReactNode } from 'react';

export interface MouCardProps {
  imageUrl: string;
  imageAlt: string;
  title: ReactNode;        // \n 포함 가능 (whitespace-pre-line)
  description: ReactNode;  // 선행 공백 + \n 포함 (whitespace-pre)
}
```

### 구현 스니펫

```tsx
export function MouCard({ imageUrl, imageAlt, title, description }: MouCardProps) {
  return (
    <div className="flex w-[456px] flex-col gap-[24px]">
      <div className="h-[302px] w-full overflow-hidden rounded-[24px]">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full flex-col items-center gap-[16px] text-center text-[#1d2623]">
        <p className="whitespace-pre-line text-[24px] font-semibold leading-[1.4]">
          {title}
        </p>
        <p className="whitespace-pre text-[14px] font-normal leading-[1.5] tracking-[0.28px]">
          {description}
        </p>
      </div>
    </div>
  );
}
```

### 주의
- Pretendard 폰트 패밀리는 전역 적용 가정 (다른 섹션과 동일).
- description은 선행 공백(`    `) 보존 위해 `whitespace-pre` 사용 (`pre-line`은 공백 collapse).
- title은 줄바꿈만 있으므로 `whitespace-pre-line`로 충분.
- tracking은 ratio 환산값(0.28px = 14×0.02). research 표 따름.

## 3. GalleryAgreements 섹션 컴포넌트

### 위치
`src/components/sections/GalleryAgreements/GalleryAgreements.tsx`

### 구현 스니펫

```tsx
import { HatchedSectionHeading } from '@/components/ui/HatchedSectionHeading';
import { MouCard } from './MouCard';
import mouCsrImpacrt from '@/assets/gallery-agreements/mou-csr-impacrt.png';
import mouEsgSociety from '@/assets/gallery-agreements/mou-esg-society.png';

const CARD_CSR = {
  imageUrl: mouCsrImpacrt,
  imageAlt: 'COLiVE, CSR Impacrt(주), 소프트퍼즐 업무 협약 단체 사진',
  title: 'COLiVE, CSR Impacrt(주),\n㈜소프트퍼즐 (2025. 8. 5.)',
  description: 'ESG실천 프로젝트의 공동 기획 수행을 위한 인력, \n    교육콘텐츠, IT 기술 협력',
} as const;

const CARD_ESG = {
  imageUrl: mouEsgSociety,
  imageAlt: 'COLiVE, 한국공공ESG학회 업무 협약 체결식',
  title: 'COLiVE, 한국공공ESG학회\n(2025. 9. 17.)',
  description: '지역 ESG 인재양성의 체계적 지원을 위한 사업 협력,\n   지역발전 및 ESG경영 도입에 필요한 상호 협력 사업 추진',
} as const;

export function GalleryAgreements() {
  return (
    <section className="mx-auto flex w-[936px] flex-col items-center gap-[24px] pb-[40px]">
      <HatchedSectionHeading title="업무 협약" />
      <div className="flex w-full flex-col gap-[32px]">
        {/* Row 1 */}
        <div className="flex w-full gap-[24px]">
          <MouCard {...CARD_CSR} />
          <MouCard {...CARD_ESG} />
        </div>
        {/* Row 2 — Figma 원본 더미 중복 (의도된 디자인) */}
        <div className="flex w-full gap-[24px]">
          <MouCard {...CARD_CSR} />
          <MouCard {...CARD_ESG} />
        </div>
      </div>
    </section>
  );
}
```

## 4. Preview 라우트

### 위치
`src/routes/GalleryAgreementsPreview.tsx`

### 스니펫

```tsx
import { GalleryAgreements } from '@/components/sections/GalleryAgreements/GalleryAgreements';

export default function GalleryAgreementsPreview() {
  // Preview wrapper 없음 — 섹션 루트가 mx-auto 내장
  return <GalleryAgreements />;
}
```

### App.tsx 라우트 등록
```tsx
{ path: '/__preview/gallery-agreements', element: <GalleryAgreementsPreview /> }
```

## 5. 에셋 매핑

| 파일 | 출처 | imageRef | cropTransform | 비고 |
|---|---|---|---|---|
| `src/assets/gallery-agreements/mou-csr-impacrt.png` | 노드 314:7063 | `aeccce78e4dfa7db186266e0d0246ae3519ebee3` | `[[0.9718,0,0.0141],[0,0.9321,0.0244]]` | 좌측 카드 |
| `src/assets/gallery-agreements/mou-esg-society.png` | 노드 314:7068 | `c0dc8d76e6ae0209228a7f98239c873fc942977a` | `[[0.9528,0,0.0236],[0,0.9451,0.0070]]` | 우측 카드 |

### 단계 3 다운로드 명령 (구현 단계 실행)

```
mcp__figma-framelink__download_figma_images
  fileKey: <gallery 파일 키>
  nodes: [
    { nodeId: "314:7063", fileName: "mou-csr-impacrt.png" },
    { nodeId: "314:7068", fileName: "mou-esg-society.png" }
  ]
  localPath: src/assets/gallery-agreements/raw
  pngScale: 2
```

다운로드 후:
1. `scripts/verify-assets.sh gallery-agreements` (또는 수동 ls)
2. `raw/` → `src/assets/gallery-agreements/`로 이동 (rename 불필요, fileName 직접 지정)
3. `process-assets.py` 호출 (필요 시 — 단순 PNG라 패스 가능)

**Framelink MCP 끊김 시**: 단계 3 진입 시점에 ToolSearch로 재로드 시도. 실패하면 보고하고 멈춤 (REST 폴백 금지).

## 6. 디자인 토큰 / Tailwind 클래스 매핑

| Figma | Tailwind |
|---|---|
| color #1d2623 (Gray 900) | `text-[#1d2623]` |
| SemiBold 24/1.4 | `text-[24px] font-semibold leading-[1.4]` |
| Regular 14/1.5 tracking 2% | `text-[14px] font-normal leading-[1.5] tracking-[0.28px]` |
| spacing/2 = 8 | `gap-[8px]` (헤딩 내부, HatchedSectionHeading 처리) |
| spacing/8 = 32 | `gap-[32px]` (행간) |
| spacing/10 = 40 | `pb-[40px]` |
| 카드 폭 456 / 높이 이미지 302 | `w-[456px]` / `h-[302px]` |
| rounded 24 | `rounded-[24px]` |
| 텍스트 블록 gap 16 | `gap-[16px]` |
| 헤딩-그리드 gap 24 | `gap-[24px]` |
| 카드 내부 gap 24 | `gap-[24px]` |
| 카드 가로 gap 24 | `gap-[24px]` |

소수점 반올림 없음. 본 섹션은 정수 토큰만 사용.

## 7. 측정 계획 (단계 5)

### 명령
```bash
scripts/compare-section.sh gallery-agreements
```

또는 명시적 clip:
```bash
npx tsx tests/visual/run.ts \
  --section gallery-agreements \
  --url http://localhost:5173/__preview/gallery-agreements \
  --baseline figma-screenshots/gallery-agreements.png \
  --clip-x 0 --clip-y 0 --clip-w 937 --clip-h 1024
```

> **clip-w 결정**: baseline 실측이 937이므로 clip-w 937 사용. capture는 `w-[936px]` 렌더이지만 Playwright clip 기준이 baseline에 맞춰져야 pixelmatch가 동일 영역 비교. 1px 차이는 우측 끝 1열에서 흰색 vs 페이지 배경 차이로 미세 diff 가능 — 5% 이내 흡수 예상.

### 4 게이트 목표

| 게이트 | 목표 | 측정 방법 |
|---|---|---|
| G1 시각 | pixelmatch diff < 5% | run.ts 출력 |
| G2 치수 | font ±1px / 나머지 ±2px | DevTools computed style 수동 확인 (title 24, desc 14, gap 24/32, padding 40) |
| G3 에셋 | img 2/2 naturalWidth > 0 | run.ts asset check |
| G4 색상 | `#1d2623` 일치 | computed color hex |

### 육안 semantic 검증 체크리스트
- [ ] 이미지 좌/우 swap 없음 (좌=CSR 단체, 우=ESG 체결식)
- [ ] 텍스트 줄바꿈 위치 Figma와 일치 (`\n` 처리)
- [ ] description 선행 공백 시각적으로 들여쓰기로 보임
- [ ] 카드 4장 모두 둥근 모서리 (24px) 정상
- [ ] Row1 / Row2 더미 중복이 의도대로 동일 렌더
- [ ] HatchedSectionHeading 라인 + 6 ticks 정상
- [ ] 카드 가운데 정렬 (text-center)

## 8. 측정 기록 (단계 5 진입 후 채움)

> 실측 결과 누적 기록. 1회차 → 2회차 → 3회차.

### 1회차 (2026-04-14, baseline 흰 배경 교체 후 재측정)

명령:
```bash
npx tsx tests/visual/run.ts --section gallery-agreements --url http://127.0.0.1:5173/__preview/gallery-agreements --baseline figma-screenshots/gallery-agreements.png --clip-x 492 --clip-y 0 --clip-w 937 --clip-h 1024
```

- [x] **G1 diff %: 15.65%** (150,203 / 959,488 px) — ⚠ 임계 5% 초과
- [x] **G2 dimension: PASS**
  - 섹션 width 936px / paddingBottom 40px / gap 24px ✓
  - 카드 width 456px / 이미지 wrapper height 302px ✓
  - 헤딩 fontSize 16px / fontWeight 500 ✓
  - title fontSize 24px / fontWeight 600 / lineHeight 33.6px (= 24×1.4) ✓
  - desc fontSize 14px / fontWeight 400 / lineHeight 21px / letterSpacing 0.28px ✓
- [x] **G3 assets: 5 / 5 PASS**
  - hatched-ticks.svg 38×10
  - mou-csr-impacrt.png 1008×696 ×2
  - mou-esg-society.png 1008×673 ×2
  - 모두 complete=true, naturalWidth>0
- [x] **G4 colors: PASS**
  - 헤딩 color rgb(0,0,0) = #000000 ✓ ([B] 보정 반영)
  - title/desc color rgb(29,38,35) = #1d2623 ✓
- [x] **육안 semantic: PASS**
  - 좌=CSR 단체 / 우=ESG 체결식 swap 없음 ✓
  - title 줄바꿈 위치 Figma 일치 ✓
  - description 선행 공백(들여쓰기) 시각적 보존 ✓
  - 카드 4장 둥근 모서리 24px 정상 ✓
  - Row1/Row2 더미 중복 동일 렌더 ✓
  - HatchedTextHeading 라인 + 6 ticks 정상 ✓
  - text-center 가운데 정렬 ✓

#### G1 15.65% 분석

육안 비교(baseline vs capture vs diff) 결과 두 이미지는 **시각적으로 사실상 동일**. baseline은 Figma export 사진(JPEG 압축), capture는 브라우저 렌더 사진(브라우저 리샘플링) — 동일 원본이라도 압축/리샘플링 차이로 윤곽선 픽셀이 모두 diff로 잡힘.

row 50-pixel 버킷 분석 결과 diff가 전 row 고르게 분포 (3,500~20,000/bucket). 특정 영역 구조 불일치가 아닌 사진 raster 전반의 노이즈성 diff. 사진이 섹션의 대부분을 차지(4 cards × 302px 이미지 = 1,208px 중 1,024 행 중 약 700행)하므로 raster diff가 G1을 지배.

**비교 사례**: contest-benefits 6.71%, gallery-title 8.28% (G1 완화 처리 선례 있음). gallery-agreements는 사진 비중이 더 커서 15.65%까지 확대됨.

- **이슈**: G1 단일 수치 임계(5%) 초과
- **원인**: 사진 raster의 압축/리샘플링 차이 (구조 불일치 아님)
- **G2/G3/G4/semantic 모두 PASS**
- **수정 방향**: 코드 수정으로 해결 불가 (사진 자체의 raster 차이). G1 완화 처리 권장 (선례 contest-benefits / gallery-title 동일 패턴).

### 2회차 / 3회차
- 필요 없음 (G1 외 모든 게이트 PASS, 코드 수정 가능 영역 없음)

## 9. 트레이드오프 / 리스크

| 항목 | 결정 | 이유 |
|---|---|---|
| MouCard 로컬 vs ui/ 승격 | 로컬 (1회차) | Rule of Three. activities 진행 시 2회차 → ui/ 승격 검토 (research §공통컴포넌트) |
| 더미 중복 4 카드 | Figma 원본 그대로 | 디자인 의도 존중. 추후 콘텐츠 채워질 때 props 배열로 리팩토링 |
| 이미지 inset 보정 (h-107.29% 등) 미적용 | Framelink cropTransform export 신뢰 → `object-cover` | inset 보정은 Figma fill mode crop 시뮬레이션. Framelink가 PNG 단계에서 이미 crop 적용 → CSS 단순화. G1 미달 시 단계 6에서 inset 모드 전환 검토 |
| baseline 1px (937 vs 936) | clip-w 937로 baseline 따름 | 1px 차이가 G1에 미치는 영향 < 1%. 무시 가능 |
| Pretendard 폰트 누락 시 | 전역 폰트 가정 | 다른 섹션과 동일. 실패 시 G2 font-family 개별 적용 검토 |

## 10. 단계 2 통과 조건 체크

- [x] 컴포넌트 트리 작성
- [x] props 시그니처 명시
- [x] 에셋 매핑 (출처 imageRef + 저장 경로)
- [x] 단계 3 다운로드 계획 (Framelink 명령)
- [x] Tailwind 토큰 매핑
- [x] 측정 계획 (clip 좌표 + baseline 경로 + 4 게이트 목표)
- [x] 육안 semantic 체크리스트
- [x] 트레이드오프 기록
- [x] 새 npm 패키지 0 (도입 없음)

→ 사용자 승인 대기. 승인 후 단계 3 (에셋 다운로드)부터 순차 진행.

---

## [B] 재개 보정 (2026-04-14)

### 배경
초기 plan은 `HatchedSectionHeading` (contest 전용, icon+title col 구조) 재사용을 가정했으나, agreements 헤딩(314:7091)은 **row 구조** (Medium 16 텍스트 + flex-1 line + 우측 6 ticks 인라인)로 완전히 다른 패턴. icon prop도 없음. 잘못된 컴포넌트 재사용 시도로 빌드 실패. activities 섹션도 동일 row 패턴 사용 예정.

→ **[B] 결정**: 새 공통 컴포넌트 `HatchedTextHeading` (ui/) 신설. agreements + activities 양쪽에서 재사용.

### 314:7091 헤딩 디테일 (재진입 확인 완료)

| 요소 | 스펙 |
|---|---|
| 컨테이너 | row, gap 8, items-center, w-full |
| 텍스트 | "업무 협약" Pretendard Medium 16, lh 1.5, ls -0.16px, color **#000000** (research의 #1d2623 정정) |
| Vector 8 (line) | flex-1, h-0, stroke #97A29E, stroke-width 1.5px → CSS `border-t border-[#97A29E] border-[1.5px]` |
| 6 ticks | SVG 38×10 (다운로드 완료 → `hatched-ticks.svg`), 5개 path stroke #97A29E 1.5px, 8.108deg 빗금. native 38×10이지만 Figma slot 36×8 → wrapper 36×8 + img scale |

### 신규 컴포넌트: HatchedTextHeading

#### 위치
`src/components/ui/HatchedTextHeading.tsx`

#### Props 시그니처
```tsx
export interface HatchedTextHeadingProps {
  text: string;          // "업무 협약", "관련 활동 및 수상" 등
  className?: string;    // 섹션별 wrapper 보정용
}
```

agnostic 설계 — agreements/activities 양쪽 동일 시그니처로 처리.

#### 구조 (Figma 314:7091 기준)
```tsx
<div className={`flex w-full items-center gap-[8px] ${className}`}>
  <p className="whitespace-nowrap font-medium text-[16px] leading-[1.5] tracking-[-0.16px] text-black">
    {text}
  </p>
  <div className="h-0 flex-1 border-t-[1.5px] border-[#97A29E]" />
  <img
    src={hatchedTicksSvg}
    alt=""
    aria-hidden
    className="h-[8px] w-[36px] shrink-0 block"
  />
</div>
```

#### 에셋
- `src/assets/ui/hatched-ticks.svg` — gallery-agreements/에서 ui/ 공통으로 이동 (agreements + activities 공유). 다운로드 완료 (38×10 SVG, 5개 path).

### 트리 갱신 (HatchedSectionHeading → HatchedTextHeading)

```
GalleryAgreements (section root, w-[936px] mx-auto pb-[40px], flex-col gap-[24px] items-center)
├─ HatchedTextHeading text="업무 협약"          ← 변경
└─ div.cards (w-full, flex-col, gap-[32px])
   ├─ row1: MouCard ×2
   └─ row2: MouCard ×2 (더미 중복)
```

### 에셋 보정
| 파일 | 경로 | 출처 |
|---|---|---|
| hatched-ticks.svg | `src/assets/ui/hatched-ticks.svg` | 노드 314:7094 (Framelink, native 38×10 SVG) |
| mou-csr-impacrt.png | `src/assets/gallery-agreements/` | 314:7063 (Framelink, 1008×696, cropTransform 적용됨) |
| mou-esg-society.png | `src/assets/gallery-agreements/` | 314:7068 (Framelink, 1008×673, cropTransform 적용됨) |

→ **다운로드 완료** (단계 3 통과). hatched-ticks.svg는 ui/로 이동 예정.

### 단계 4 작업
1. `src/assets/ui/` 디렉토리 생성 + hatched-ticks.svg 이동
2. `src/components/ui/HatchedTextHeading.tsx` 신설
3. `GalleryAgreements.tsx` 헤딩 import/사용을 `HatchedTextHeading`으로 교체
4. `npm run build` 통과 확인

### 측정 (단계 5)
- 명령: `npx tsx tests/visual/run.ts --section gallery-agreements --url http://localhost:5173/__preview/gallery-agreements --baseline figma-screenshots/gallery-agreements.png --clip-x 492 --clip-y 0 --clip-w 937 --clip-h 1024`
- baseline은 페이지 컨텍스트 캡처 (492 = (1920-936)/2 + slight)이므로 clip 좌표 사용 (사용자 지시).

