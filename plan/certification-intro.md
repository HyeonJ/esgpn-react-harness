# plan/certification-intro.md

> Figma 299:3875 / 1416×291 / /certification (252, 851)
> v4 재구현 — 구조 중심, token_ratio ≥ 0.2, absolute/file = 0

## 컴포넌트 트리

```tsx
<section aria-labelledby="certification-intro-title" className="mx-auto flex w-full max-w-[1416px] flex-col gap-5 px-[240px] py-[64px]">
  <HatchedSectionHeading
    iconSrc={headingIcon}
    iconAlt=""
    title="자격검정의 필요성"
    titleId="certification-intro-title"
  />
  <div className="flex items-start gap-8 text-center">
    <p className="flex-1 text-[16px] font-medium leading-[1.5] tracking-[-0.16px] text-black">
      지속가능한 미래를 위해 산업체가 요구하는 ESG 기본원칙과 핵심역량을 발전시키고
      <br aria-hidden="true" />
      이를 알상과 직장생활에서 실천한다.
    </p>
    <p className="flex-1 ...">지역사회와 직장에서 ...</p>
    <p className="flex-1 ...">ESG 원칙을 실천하여 ...</p>
  </div>
</section>
```

## 신규 파일

- `src/components/sections/CertificationIntro/CertificationIntro.tsx`
- `src/components/sections/CertificationIntro/index.ts`
- `src/routes/CertificationIntroPreview.tsx`
- `src/assets/certification-intro/heading-icon.png` (contest-about의 파일 복사)

## 에셋 매핑

| 파일 | 출처 | 방식 |
|------|------|-----|
| heading-icon.png | imageRef `e0323828d272debafbaef51af08c8a79feec0462` + crop `273e38` | contest-about/heading-icon.png 복사 (imageRef+cropTransform 동일 검증) |

## 디자인 토큰 사용

- `var(--font-family-pretendard)` — heading + body font-family
- `max-w-[1416px]` — 섹션 컨테이너 (mx-auto)
- `gap-5` (20px) — outer column gap
- `gap-8` (32px) — body row gap
- `px-[240px] py-[64px]` — padding (Figma raw)
- `text-[16px] font-medium leading-[1.5] tracking-[-0.16px]` — body text
- `text-black` — body color (#000 Tailwind)
- 헤딩 토큰은 HatchedSectionHeading 내부에서 처리

## 라우트 등록

- `src/App.tsx` 혹은 `src/routes/` 인덱스에 `CertificationIntroPreview` 추가
- Preview path: `/preview/certification-intro`

## 트레이드오프

- contest-about과 동일한 "HatchedSectionHeading + 단순 본문" 패턴이지만 본문이 3-column flex (contest는 BulletCard 카드). 별도 section 유지
- flex-1 3-column으로 가변 너비 유지 (Figma의 flex-[1_0_0] min-w-px와 일치)
- `<br aria-hidden="true">` 유지 — Figma 줄바꿈 재현 (한글 특성상 pretty-break 필요). 스크린리더에서는 공백 1개로 읽힘 → 접근성 OK

## 새 npm 패키지

없음

## G5-G8 예상

- G5: section + h2(in heading) + p×3, eslint PASS
- G6: raster 1개 (40×40 아이콘), text-bearing raster 0
- G7: 참고 지표
- G8: JSX literal 4개 (제목 + 3 본문) — PASS

## v4 구조 지표 목표

- token_ratio ≥ 0.2 — `text-black`, `gap-5`, `gap-8`, `flex-1`, `text-[16px]` 등 Tailwind 토큰 클래스 다수
- absolute/file = 0 — 전부 flex
- semantic_score: section + h2(재사용 컴포넌트) + p×3 = 5+

## 측정 섹션 (v4)

### 단계 4.5 — 구조 게이트
- G5 eslint: PASS (jsx-a11y 0 error)
- G6 텍스트비율: **22.89** (threshold 3, raster 0) — PASS
- G8 i18n: PASS (JSX literal 4개: 제목 + 본문 3)
- G7 Lighthouse: 참고 지표, 측정 생략
- 구조 지표 (check-structure-quality.mjs):
  - magic_number_count: 6
  - token_ref_count: 2
  - **token_ratio: 0.25** (≥ 0.2 PASS)
  - **absolute_count: 0** (≤ 5/file PASS)
  - semantic_score: 1 (section; ul/li/p는 카운트 안됨 — 경고 수준, 차단 아님)
- Tailwind 안티패턴: 없음
- Baked-in PNG 중첩: 없음

### 단계 5 — 시각 게이트 (compare-section.sh --clip-x 252 --clip-y 0 --clip-w 1416 --clip-h 291)
- **G1 diff: 5.24%** (21609/412056px) — v4 목표 ≤ 15% PASS (참고 지표)
- G2 치수: 육안 PASS (padding 64/240, gap 20/21/32, font 32/16 확인)
- G3 에셋: heading-icon naturalWidth > 0 — PASS
- G4 색상: #0A0A0A heading, #000 body, #97A29E divider — 육안 일치
- **육안 semantic 검증**: baseline/capture/diff 3종 비교 완료
  - 레이아웃/배치 동일, 3-column 배분 동일, 줄바꿈 위치 동일
  - Hatched divider 좌/우 마커 + 중앙 라인 동일
  - 제목 폰트/색 동일
  - diff 이미지는 Pretendard 한글 subpixel 오프셋(알려진 엔진 차이, docs §2.5)에 기인
  - semantic 오류(flip/swap/색반전/줄바꿈 이상) 없음
- 차단 게이트 전체 PASS, 1회차에 완료

### 전체 판정: PASS (1회차)
