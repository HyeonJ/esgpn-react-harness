# 세션 핸드오프 — gallery-agreements G1 완화 판단 대기

작성: 2026-04-14
브랜치: main (origin 대비 23 commits ahead, 미푸시)
최종 커밋: `21a94ff feat: gallery-title 섹션 + /gallery 페이지 진입 (G1 8.28% ⚠ 완화, 1회차)`

---

## 현재 막힘 지점

**섹션**: `gallery-agreements` (업무 협약, 2×2 MoU 카드)
**단계**: 5(측정) 1회차 완료 → **단계 6/7 진입 전 사용자 판단 대기**
**지표**: G1 **15.65%** ⚠ (임계 5% 초과, 다른 완화 선례 대비 큼)

### 측정 결과
| 게이트 | 결과 |
|-------|------|
| G1 시각 | **15.65%** ⚠ (150,203 / 959,488 px) |
| G2 치수 | PASS (Figma spec 100% 일치) |
| G3 에셋 | PASS 5/5 (hatched-ticks svg + mou png 4장) |
| G4 색상 | PASS (#000, #1d2623) |
| 육안 semantic | PASS (swap·줄바꿈·더미중복·라운드 모두 정상) |

### 15.65% 원인 (워커 분석)
- 사진 4장(456×302, 섹션의 약 57% 면적)이 diff를 지배
- baseline = Figma full-page export에서 crop한 PNG / capture = imageRef PNG(pngScale 2)를 브라우저가 `object-cover` 리샘플링
- 동일 원본 사진이어도 픽셀 어긋남(raster 노이즈성)
- diff 분포가 특정 구조가 아닌 사진 전반 균일 → 코드 결함 아님

---

## 오케스트레이터가 제시한 선택지 (사용자 응답 대기)

- **[A]** 완화 수락 커밋 — contest-benefits 6.71% / gallery-title 8.28% 선례 연장. 단, 15.65%는 선례보다 큼
- **[B]** 단계 6 재진입 — 사진 렌더 조정 (`image-rendering`, baseline 재생성 등)
- **[C]** 섹션 노드 단독 Framelink export 재시도 — 흰 배경 보장 X, 이전 1회차 다크 배경 문제 재발 가능
- **[D]** diff hotspot 사용자 함께 디버깅
- **[B']** (오케스트레이터 추가 제안) 사진 영역 제외 clip으로 측정 → 텍스트·헤딩 영역 G1이 <5%면 "사진 raster 노이즈" 가설 확정 → [A] 완화 설득력 확보

### 오케스트레이터 권장
**[B'] 먼저 가설 검증 → 결과에 따라 [A] 완화 또는 [D] 디버깅 분기**

---

## 완료된 작업 (이번 세션)

1. ✅ `/contest` 페이지 섹션 정렬 버그 수정 + 페이지 통합 게이트 신설 (commit `8d70b63`)
   - ContestAbout/ContestBenefits 섹션 루트에 `mx-auto` 추가
   - Preview wrapper 제거
   - docs §6.5 "페이지 통합 육안 게이트" 신설
   - CLAUDE.md 절대 규칙 업데이트
2. ✅ `/gallery` 페이지 리서치 + baseline 확보 (research/gallery.md, figma-screenshots/gallery-{full,title,agreements,activities}.png)
3. ✅ gallery-title 구현·커밋 (G1 8.28% ⚠ 완화, commit `21a94ff`)
   - 좌 H3 "실천이 만든 변화의 순간들, ESGPN 아카이브" (Figma ESPGN 오타 교정)
   - 우 body Regular 15 2줄
   - 섹션 루트 `w-[936px] mx-auto`
4. 🔶 gallery-agreements — 구현 완료, 측정 후 완화 판단 대기
   - plan [B] 재개: 신규 공통 `HatchedTextHeading`(ui/) 도입, agreements·activities 공통 사용 예정
   - MouCard 로컬
   - 이미지 2장 imageRef 다운로드 완료 (중복 2+2 = 4 카드 배치)
   - baseline 환경 불일치 수정: 처음 Framelink 재-export가 다크 배경 → gallery-full.png에서 crop해서 흰 배경으로 교체

---

## 현재 변경사항 (미커밋)

```
modified:   figma-screenshots/gallery-agreements.png  (gallery-full에서 crop해 흰 배경 덮어씀)
modified:   src/App.tsx                                (GalleryAgreementsPreview 라우트 추가)

Untracked:
  plan/gallery-agreements.md
  research/gallery-agreements.md
  src/assets/gallery-agreements/mou-csr-impacrt.png
  src/assets/gallery-agreements/mou-esg-society.png
  src/assets/ui/hatched-ticks.svg
  src/components/sections/GalleryAgreements/
    ├─ GalleryAgreements.tsx
    ├─ MouCard.tsx
    └─ index.ts
  src/components/ui/HatchedTextHeading.tsx
  src/routes/GalleryAgreementsPreview.tsx
  tests/visual/measure-g234.mjs                        (워커가 G2~G4 측정용으로 만든 ad-hoc)
```

---

## 다음 세션 재개 지침

### 시작 시 컨텍스트 확인
1. `PROGRESS.md` 크기순 다음 섹션 = gallery-agreements (진행 중)
2. `plan/gallery-agreements.md` §8 측정 기록 확인 (1회차 G1 15.65%)
3. `figma-screenshots/gallery-agreements.png` 흰 배경 baseline 확인 (이미 교체됨)
4. `tests/visual/diffs/gallery-agreements.diff.png` diff 이미지 확인

### 판단 순서 권장
1. **[B'] 먼저**: 사진 제외 영역만 clip 측정
   - 예: 카드 이미지 y=0~302 구간 제외하고 텍스트 영역(y=302~452)만 측정
   - `npx tsx tests/visual/run.ts --section gallery-agreements-text --url http://127.0.0.1:5173/__preview/gallery-agreements --baseline figma-screenshots/gallery-agreements.png --clip-x 492 --clip-y 302 --clip-w 937 --clip-h 150` 등
2. **[B'] 결과에 따라**:
   - 텍스트 영역 G1 < 5% → 가설 확정 → [A] 완화 수락 + 커밋
   - 텍스트 영역도 G1 ≥ 5% → 사진 외 구조 문제 있음 → [D] 디버깅
3. **완화 커밋 메시지 초안**:
   ```
   feat: gallery-agreements 섹션 (G1 15.65% ⚠ raster-dominated 완화)

   - HatchedTextHeading 공통 컴포넌트 신설 (ui/)
   - MouCard 로컬 (2×2 그리드, 중복 2+2)
   - imageRef 2장 Framelink 다운로드
   - 완화: 사진 4장이 섹션 57% 면적 차지, Figma JPEG ↔ browser 리샘플링 raster 노이즈
   - 선례: contest-benefits 6.71%, gallery-title 8.28%

   Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
   ```
4. 커밋 후 PROGRESS.md `## 갤러리 (/gallery)` 섹션에 한 줄 추가
5. 다음 섹션 **gallery-activities** 진입 — HatchedTextHeading + MouCard 둘 다 재사용 (Rule of Three 카운트 2회차)

### 재개 시 주의
- Framelink MCP가 세션 중간 끊어지는 이슈 있음 — 단계 3 진입 전 `claude mcp list`로 상태 확인
- `measure-g234.mjs`는 임시 스크립트 — 정리 또는 별도 통합 여부 결정 필요
- 오케스트레이터는 직접 코드 수정 금지 (에셋 crop·측정 실행은 허용). 단계 재진입은 section-implementer 워커로만

---

## 참고 선례 (PROGRESS.md 발췌)

- **contest-hero 6.43% ⚠ 완화**: Chromium hard-light blend 엔진 차이
- **contest-benefits 6.71% ⚠ 완화**: Pretendard AA 서브픽셀 + blend multiply 엔진 차이
- **gallery-title 8.28% ⚠ 완화**: ESPGN→ESGPN 카피 교정 + Pretendard Variable 48px Bold AA

gallery-agreements 15.65%가 수락된다면 선례 중 최대. 수락 조건: **[B'] 가설 검증에서 텍스트 영역 PASS**.

---

## 관련 에이전트 ID (다음 세션에서 SendMessage 가능, 단 컨텍스트 일부 유실 가능)

- 마지막 section-implementer: `ac0e02fd826c9d178`
- 그 전 gallery-agreements 워커: `af0e80be914de1f3d`, `a457b5458b4cb17bd`, `aae1e6a46f32c51b4`
- 새 세션에서는 SendMessage 대신 **새 section-implementer 스폰** 권장 (현재 파일 상태 + 이 HANDOFF.md 기반으로 재시작)
