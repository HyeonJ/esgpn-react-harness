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
- **상태**: `RESOLVED` (2026-04-15 v3)
- **파일**: `src/components/sections/MainHero/HeroIntroCard.tsx` + `icon-{1,2,3}.png` (card{1,2,3}.png 제거됨)
- **해결**: 리서치 `docs/research/dev/figma-transparent-icon-export` §3 Q1(자식 leaf nodeId로 투명 PNG export) 패턴 적용
  1. `get_design_context(17:200/17:203/17:206)` 카드 구조 파악 (bg blur + icon + title + desc)
  2. 아이콘 leaf nodeId 20:210/20:212/20:213만 Framelink `download_figma_images` (투명 PNG)
  3. HeroIntroCard를 HTML 본체로 재구성: backdrop-blur + bg rgba + icon img(mix-blend) + h3/p
- **G1 변화**: 2.24% → 8.07% → **5.47%** (rembg 배경 제거 + alpha matting 후)
  - 회차 1 (HTML 카드 + Framelink icon PNG): 8.07% — GIF source 검정 배경 잔존
  - 시도들 (실패):
    - chroma-key: 5.64% but 흰색 영역 검정 끼임
    - luma-to-alpha: 5.41% but 색상 경계 띠
    - u2net (rembg 기본): 6.11% but 내부 fill 잔존
    - isnet-anime: 5.42% but 아이콘 너무 흐림
  - **회차 12 (birefnet-general + alpha matting): 5.47% ✅**
    - `scripts/rembg-icon.py` — rembg Python API로 배경 제거 + trimap 기반 edge 정밀화
    - ONNX 모델 ~1GB 최초 다운로드, 이후 로컬 캐시
- **G6 변화**: ratio 1.17 FAIL → 4.33 PASS (안티패턴 해소)
- **잔여 diff 원인**: 새 ACCEPTED T-012 참조 (engine diff)

### T-012 `main-hero` G1 하이브리드 엔진 차이 (T-001 리팩터 후속)
- **상태**: `ACCEPTED` (T-001 해소와 함께 신규 등록)
- **파일**: `src/components/sections/MainHero/*`
- **증상**: HTML 카드 + 아이콘 raster 하이브리드의 G1 5.47% (rembg birefnet-general + alpha matting 후). 잔여는 Pretendard 한글 AA 서브픽셀 + 카드 bg blur 렌더 차이
- **수용 근거**: 리서치 §3 Q5 "아이콘 + HTML 텍스트 하이브리드 G1 5~7% 예상, 엔진 차이 구조적 한계". T-001 RESOLVED가 본체이고 이 엔진 차이는 T-001의 정당한 부산물
- **GIF source 배경 제거 경로**: `scripts/rembg-icon.py` (U-Net 기반 segmentation + trimap matting). 단순 픽셀 후처리(chroma-key/luma-to-alpha) 여러 시도 실패 후 정착. 동일 패턴 재등장 시 재사용
- **재검토 조건**: Chrome blend mode 업데이트 또는 Figma 렌더 엔진 변경 시

### T-002 `contest-benefits` CTA 텍스트 baked-in raster
- **상태**: `RESOLVED` (2026-04-15 v3)
- **파일**: `src/components/sections/ContestBenefits/CtaBanner.tsx` + `cta-bg.png` + `cta-arrow.png` (cta-composite.png는 보존하되 사용 중단)
- **해결**:
  1. `get_design_context(302:6592)` CTA 구조 파악 (bg #005c33 + city image mix-blend-luminosity + h3/p/button)
  2. bg 이미지와 arrow icon만 leaf nodeId로 export
  3. CtaBanner HTML 재구성: color div + blend image div + HTML h3 + p + button
- **G1 변화**: 6.71% → 8.17% (+1.46%p, object-cover로 도시 이미지 위치 보정)
  - 초기 리팩터 시 Figma의 정확 crop % 그대로 적용(10.82%) → 도시 이미지가 상단 검정 영역만 보여 green-out
  - `object-cover` + `objectPosition: center bottom`으로 이미지 fit → 10.82% → 8.17%
- **G6 변화**: ratio 이전 FAIL → 14.76 PASS (안티패턴 해소)
- **T-002 본체 해소 + T-004 엔진 차이 (이전부터 ACCEPTED)는 그대로 유지**. T-004는 이제 "blend + 한글 hybrid" 의미

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

### T-005 `gallery-title` G1 완화
- **상태**: `ACCEPTED`
- **파일**: `src/components/sections/GalleryTitle/*`
- **증상**: Pretendard Variable 48px Bold AA + "ESPGN → ESGPN" 교정으로 좌 2행 글리프 shift
- **현 G1**: 8.28% (⚠ 완화)
- **수용 근거**: 사용자 승인 [A] "ESPGN → ESGPN" 교정. 폰트 AA 서브픽셀 잔여. contest-hero/benefits 선례 연장

---

## 카운트 (Phase 0 차단 체크용)

- `OPEN` 부채: **0건** (T-001, T-002 RESOLVED 2026-04-15)
- `ACCEPTED`: 4건 (T-003, T-004, T-005, T-012)
- `RESOLVED`: 2건 (T-001, T-002)
- 차단 임계: 3건 → 충분히 여유

## 신규 부채 등록 규칙

1. 새로운 `[ACCEPTED_DEBT]` 태그 커밋이 발생하면 이 파일에 엔트리 추가
2. 엔트리는 위 포맷(상태·파일·증상·현수치·근거·재검토/리팩터 방향)을 모두 포함
3. `ACCEPTED`는 엔진 차이 등 **구조적 불가피만** — 안티패턴은 항상 `OPEN`
4. `OPEN` 카운트 3건 도달 시 오케스트레이터가 새 섹션 진행 거부

## 재검토 주기

- 페이지 완료 시마다 `OPEN` 전수 리뷰
- `ACCEPTED` 중 환경 변화 (브라우저 버전, Figma 엔진 변경 등) 시 재측정
- 리팩터 완료 시 `RESOLVED`로 이동, 측정 결과 기록
