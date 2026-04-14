# 기술 부채 (Tech Debt) 트래커

> "완화"로 통과한 섹션 + 안티패턴으로 판정된 구현의 진실의 원천.
> 미해결 부채 **3건 이상 시 새 섹션 진행 차단** (`.claude/skills/figma-to-react` Phase 0 체크).

## 상태 정의

| 상태 | 의미 |
|---|---|
| `OPEN` | 미해결. 3건 이상 시 새 섹션 차단 |
| `ACCEPTED` | 엔진 차이 등 구조적 불가피 → 수용 확정, 부채 카운트에서 제외 |
| `RESOLVED` | 리팩터 완료 |

## 현재 부채 (초기 이관 — 2026-04-14)

### T-001 `main-hero` 카드 3개 텍스트 baked-in raster
- **상태**: `OPEN`
- **파일**: `src/components/sections/MainHero/HeroIntroCard.tsx` + `card{1,2,3}.png`
- **증상**: 카드 전체(그린 블러 + 제목 + 체크리스트 + 설명 + 아이콘)가 단일 composite PNG. `<img alt="한 줄 요약">` 하나로 모든 텍스트가 raster화됨
- **희생**: SEO·스크린리더·i18n·Ctrl+F·텍스트 선택 전부 불가
- **최초 유입**: main-hero 회차 5~6 (G1 수렴을 위해 raster 전환)
- **현 G1**: 2.24%
- **리팩터 방향**: HTML 카드 + 아이콘(정적 프레임)만 raster. G1 5~7% 수용 예상
- **수용 불가 이유**: 엔진 차이가 아니라 설계 선택. 안티패턴

### T-002 `contest-benefits` CTA 텍스트 baked-in raster
- **상태**: `OPEN`
- **파일**: `src/components/sections/ContestBenefits/CtaBanner.tsx` + `cta-composite.png`
- **증상**: CTA 전체(배경 blend + "지금 바로 신청하세요" 제목 + 서브텍스트 + "경진대회 참가하기" 버튼) 단일 composite PNG
- **희생**: CTA 텍스트 검색·번역·접근성 불가 (aria-label 한 줄만)
- **최초 유입**: contest-benefits 회차 3~4 (blend 섹션 G1 수렴)
- **현 G1**: 6.71% (이미 완화 상태)
- **리팩터 방향**: 배경 이미지만 raster + HTML 텍스트/버튼 오버레이. G1 6~8% 수용 예상
- **수용 불가 이유**: 엔진 차이(한글+blend)는 정당하나 텍스트 baked-in은 별개 안티패턴

### T-003 `contest-hero` G1 완화 (엔진 차이)
- **상태**: `ACCEPTED`
- **파일**: `src/components/sections/ContestHero/*`
- **증상**: `background-blend-mode: hard-light` 원 내부 픽셀 오차. Chromium vs Figma 합성 엔진 색공간 차이
- **현 G1**: 6.43% (⚠ 완화)
- **수용 근거**: `docs/section-implementation.md §2.5` "hard-light blend = G1 +1~2%p 구조적 불가피" 패턴. 구조상 "배경+원만 있는 wrapper" 부재로 raster 분리 export 불가 확인됨
- **재검토 조건**: 브라우저/Figma 렌더 엔진 변경 시

### T-004 `contest-benefits` G1 완화 (엔진 차이)
- **상태**: `ACCEPTED`
- **파일**: `src/components/sections/ContestBenefits/*`
- **증상**: 한글 텍스트 밀도 높은 + blend 섹션 G1 6~7% 수렴 패턴
- **현 G1**: 6.71%
- **수용 근거**: Chromium vs Figma Pretendard 폰트 AA 서브픽셀 차이. 4회차 시도(9.48 → 12.21 → 6.90 → 6.71%) 후 6.7% 수렴 확인. 에셋 교체로 해결 불가
- **주의**: T-002(텍스트 baked-in)과 분리. 이 완화는 엔진 차이 수용만 의미함. T-002 리팩터 후에도 G1은 6~8% 유지 예상

### T-007 `certification-hero` G1 완화 (TopNav 미장착 + Framelink Rectangle 한계)
- **상태**: `ACCEPTED`
- **파일**: `src/components/sections/CertificationHero/*`
- **증상**: G1 10.98%
- **수용 근거**:
  1. baseline은 full-page 0~633 crop이라 상단 88px에 TopNav 포함. Preview는 RootLayout 미장착 → 88px strip diff ~7%p
  2. Framelink Rectangle(299:3861) 단독 export는 페이지 composite의 좌우 leaf decoration overflow 미포함 → 추가 ~3-4%p
- **재검토 조건**: Preview에 RootLayout 마운트 옵션 제공 또는 Framelink composite export 기능 도입

### T-006 `gallery-agreements` G1 완화 (한글+사진 dense 수렴)
- **상태**: `ACCEPTED`
- **파일**: `src/components/sections/GalleryAgreements/*`
- **증상**: 한글 텍스트 + 4장 사진 dense composite. 수정 루프 5.72%에서 수렴
- **현 G1**: 5.72% (⚠ 0.72%p 초과)
- **수용 근거**: §2.5 "한글 text 다수 + 사진 dense 6~7% 수렴" 패턴. image fill % crop 우회 시도 시 16.78%로 악화 → 5.72% 이하 압축 구조적 불가 확정. baseline은 gallery-full.png에서 alpha=0 transparent 영역 white 베이크 후 비교
- **재검토 조건**: 폰트 렌더 엔진 변경 또는 이미지 정밀 fill crop 알고리즘 도입 시

### T-005 `gallery-title` G1 완화
- **상태**: `ACCEPTED`
- **파일**: `src/components/sections/GalleryTitle/*`
- **증상**: Pretendard Variable 48px Bold AA + "ESPGN → ESGPN" 교정으로 좌 2행 글리프 shift
- **현 G1**: 8.28% (⚠ 완화)
- **수용 근거**: 사용자 승인 [A] "ESPGN → ESGPN" 교정. 폰트 AA 서브픽셀 잔여. contest-hero/benefits 선례 연장

---

## 카운트 (Phase 0 차단 체크용)

- `OPEN` 부채: **2건** (T-001, T-002)
- `ACCEPTED`: 5건 (T-003, T-004, T-005, T-006, T-007 — 카운트 제외)
- 차단 임계: 3건 → 현재는 진행 가능

## 신규 부채 등록 규칙

1. 새로운 `[ACCEPTED_DEBT]` 태그 커밋이 발생하면 이 파일에 엔트리 추가
2. 엔트리는 위 포맷(상태·파일·증상·현수치·근거·재검토/리팩터 방향)을 모두 포함
3. `ACCEPTED`는 엔진 차이 등 **구조적 불가피만** — 안티패턴은 항상 `OPEN`
4. `OPEN` 카운트 3건 도달 시 오케스트레이터가 새 섹션 진행 거부

## 재검토 주기

- 페이지 완료 시마다 `OPEN` 전수 리뷰
- `ACCEPTED` 중 환경 변화 (브라우저 버전, Figma 엔진 변경 등) 시 재측정
- 리팩터 완료 시 `RESOLVED`로 이동, 측정 결과 기록
