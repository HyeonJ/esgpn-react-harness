# research/about-header.md — About 개요 헤더 섹션

> Phase 3 단계 1. 페이지 `/about` 첫 섹션. 사용자 결정 전략 **[A] 완전 HTML 재구성**.
> 상위 page research: `research/about.md`. 공통 규칙: `CLAUDE.md` / `docs/section-implementation.md`.

## 1. Figma 노드 재조사 (text 노드 살아있는지 확정)

`get_metadata(52:624, fileKey=qhrMiGVfoSQ1QMFhVN8z78)` 재호출 결과:

```
<frame id="52:624" name="배경 이미지" x="0" y="0" width="1920" height="2800" />
```

**자식 노드 없음 → 단일 flatten 이미지 확정.** `get_metadata(52:623)`, `get_metadata(52:622)`까지 depth 2~3 확인했으나 52:624 내부 구조는 존재하지 않음. 52:622의 형제 노드에 `52:1192 Educational Program` 텍스트가 한 개 있지만 `hidden=true`이며 이 섹션과 무관.

- `get_design_context(52:624)` 호출은 의미 없음 (어차피 그림 한 장, 반환은 PNG 레퍼런스뿐)
- 결론: **텍스트/폰트/색 스펙은 baseline PNG 육안 + 픽셀 측정으로 확보**. 디자이너 원본 스펙 없음.

## 2. 섹션 시각 요소 목록 (육안 + 픽셀 측정)

baseline은 `figma-screenshots/about-full.png` (1920×3499, 캔버스 1:1)에서 crop.

### 2.1 섹션 경계 (행 스캔 결과)

`file about-full.png` → 1920×3499 실측 확인. 행 스캔으로 경계 y값 추출:

| 요소 | y 범위 (about-full 기준) | 비고 |
|------|------------------------|------|
| Top Nav 끝 | y = 88 | `research/about.md` §1 기준 |
| 탭 텍스트 row | y = 169~179 | cap height ≈ 11px rendered |
| 탭 active underline | y = 188~189 | solid line |
| **공백** | y = 190~268 | |
| ESGPN 대형 타이포 | y = 269~388 | cap-to-descender height = 120 |
| **공백** | y = 389~434 | |
| subcopy line 1 | y = 435~449 | |
| subcopy line 2 | y = 462~476 | line-height gap 27px |
| **공백** | y = 477~541 | |
| 다음 섹션 divider solid line | y = 542~543 | Mission 섹션 소속 (경계 밖) |

**→ about-header 섹션 범위 확정: y = 88 ~ 541, height = 454px.**
research/about.md 추정값 312px은 오차. 실측 454px로 수정.

### 2.2 요소별 상세 스펙

| # | 요소 | 내용 | 위치/크기 (캔버스 px) | 색상 (hex) | 폰트/weight 추정 | 특이사항 |
|---|------|------|----------------------|-----------|------------------|---------|
| 1 | Tab "개요 & 철학" | 한글 7자 (space 포함) | x≈847~906, y≈169~179, w≈60, h≈11 | 진한 녹/회색 `#222` 추정 (near-black) | Pretendard Bold 14px | active state. 하단 underline x=829~924, y=188~189 (w=96, h=2) 색 `#222` |
| 2 | Tab "조직도" | 한글 3자 | x≈953~976, y≈169~179, w≈24, h≈11 | 회색 `#999` 추정 | Pretendard Medium 14px | inactive. underline 없음 |
| 3 | Tab "운영계획" | 한글 4자 | x≈1028~1072, y≈169~179, w≈45, h≈11 | 회색 `#999` 추정 | Pretendard Medium 14px | inactive |
| 4 | 대형 타이포 "ESGPN" | 영문 5자 | x≈703~1212, y≈269~388, w=510, h=120 | 아주 진한 다크그린 `#132A1E` 추정 (검정에 살짝 녹톤) | Serif Display, weight ≈ 700, font-size ≈ 140~144px, letter-spacing 거의 0 | 중앙 정렬 (canvas center x=960). font-family 후보: Pretendard의 serif 동반이 없어 **Noto Serif KR Bold** 또는 **Playfair Display Bold** 후보 — plan에서 폴백 순서 정의 |
| 5 | subcopy line 1 | "ESGPN은 대학, 학회, 산업체, 지역사회가 함께" | 중앙정렬, baseline y≈449 | `#555` 추정 | Pretendard Regular 15~16px, line-height 27px (gap 포함) | |
| 6 | subcopy line 2 | "지속가능한 미래를 행동으로 구현 하는 것을 목표로 합니다." | 중앙정렬, baseline y≈476 | `#555` | Pretendard Regular 15~16px | 원문대로 "구현 하는" 띄어쓰기 1칸 유지 |

> 폰트 weight·색상은 Figma 노드가 없어 **변수 추출 불가**. plan 단계에서 디자인 토큰 기존 스케일(`--color-text-primary`, `--color-text-secondary`, `--text-xl`, etc.)에 근사 매핑하고 측정에서 조정.

### 2.3 Canvas-Asset 개수 일치 검증

이 섹션은 **텍스트 전용**. 배경 흰색, 아이콘 없음, 이미지 없음.
Framelink 다운로드 대상 = 0. Canvas 에셋 = 0. **일치 (0 = 0).**

단, **baseline crop 에셋은 별개 개념**으로 아래 §4에서 다룸 (구현 에셋이 아닌 테스트용 baseline).

## 3. 추출 텍스트 (OCR 대신 육안 판독)

baseline PNG `_tmp_about_tab.png`, `_tmp_about_title.png`, `_tmp_about_subcopy.png`를 Read 도구로 열어 직접 판독함:

```
탭 (우측 정렬 영역): [개요 & 철학]  [조직도]  [운영계획]
                     (active, 밑줄)  (회색)   (회색)

대제목: ESGPN

서브카피 (중앙정렬, 2줄):
  ESGPN은 대학, 학회, 산업체, 지역사회가 함께
  지속가능한 미래를 행동으로 구현 하는 것을 목표로 합니다.
```

원본 이미지의 "구현 하는" 사이 공백(혹은 줄바꿈 유의어)을 그대로 유지. 콤마는 한글 문장부호 `,` (ASCII 가능).

## 4. baseline crop 계획 (G1 비교용)

- **source**: `figma-screenshots/about-full.png` (1920×3499, 캔버스 1:1)
- **target**: `figma-screenshots/about-header.png`
- **crop box**: `(0, 88, 1920, 542)` → 결과 1920×454 RGBA PNG
- 이미 생성 완료 (단계 1에서 probe와 함께 저장). 실측 크기 = 1920×454. `file` 명령 실측치와 동일.
- 구현 에셋은 **없음** (텍스트 전용). `src/assets/about-header/` 디렉토리 생성 불필요.

### 4.1 plan에서의 clip 파라미터

G1 측정 시 playwright capture를 brows로 1920×454 preview 페이지 렌더 → baseline과 직접 픽셀 비교. `scripts/compare-section.sh about-header` 호출로 처리 가능 (풀폭 1920, height는 preview viewport 맞춤).

floating 요소 없음 → `--clip-*` 인자 불필요. 섹션 전체가 카드형 풀폭.

## 5. 디자인 토큰 매핑 후보 (plan 단계에서 확정)

기존 `src/index.css` / `tailwind.config.ts` 토큰에서 사용 가능한 후보:
- 텍스트 색상: `text-[#132A1E]` / `text-neutral-900` / 기존 정의된 `--color-text-primary`
- 서브카피 색상: `text-[#555]` / `text-neutral-600`
- 탭 active: `text-neutral-900 underline underline-offset-[6px]`
- 탭 inactive: `text-neutral-500`
- 폰트: `font-sans` (Pretendard) + Serif display는 별도 커스텀 `font-serif` 로컬 class 필요 — **신규 추가 여부 plan에서 논의**

## 6. 리스크 (이 섹션 고유)

1. **Serif Display 폰트 부재**: "ESGPN" 대형 타이포는 serif 글꼴(cap serif 명확). Pretendard는 sans-only. `@fontsource/noto-serif-kr` 또는 `@fontsource/playfair-display` 신규 도입 필요 여부 결정 (plan gate).
2. **색상 근사치**: Figma node 없어 정확한 hex 추출 불가. 실측 픽셀값으로 근사 → G4 게이트에서 조정 루프 가능성.
3. **탭 컴포넌트 공통화**: 조직도(/about/organization), 운영계획 페이지에서도 동일 탭 사용 예상. 이번 섹션에서 `SectionTabs` 또는 `AboutTabs` 공통 컴포넌트로 분리할지 plan에서 결정. Breadcrumb 후보보다 **탭 컴포넌트가 더 재사용성 높음** (Breadcrumb은 이 페이지에 없음, 탭이 대체 역할).
4. **G1 risk**: 텍스트만이라도 serif 렌더링 차이(antialias, hinting)로 diff 2~4% 발생 가능. 3회 루프 내 목표치 < 5%.

## 7. 단계 1 산출 파일

- `figma-screenshots/about-header.png` (1920×454, baseline)
- `figma-screenshots/_tmp_about_tab.png` / `_tmp_about_title.png` / `_tmp_about_subcopy.png` (진단용, 선택적 삭제 가능)
- 본 파일 `research/about-header.md`

---

## 멈춤 지점

단계 1 완료. 단계 2(plan) 진행 전 사용자 검토 불필요 (plan 승인 게이트에서 함께 검토). 이어서 `plan/about-header.md` 작성.
