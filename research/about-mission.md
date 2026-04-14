# research/about-mission.md — About 개요 Mission 섹션

> Phase 3 단계 1. 페이지 `/about` 두 번째 섹션. 사용자 결정 전략 **[A] 완전 HTML 재구성**.
> 상위 page research: `research/about.md`. 선행 섹션: `research/about-header.md`, `plan/about-header.md`.
> 공통 규칙: `CLAUDE.md` / `docs/section-implementation.md` §2.4~§2.6, §6.1, §6.4.

## 1. Figma 노드 재조사

`52:624`는 본문 전체가 flatten된 단일 이미지 프레임. Mission 섹션 전용 text 노드/하위 frame 없음 (about-header 리서치에서 확정). `get_design_context(52:624)` 호출은 의미 없음. **텍스트/폰트/색 스펙 전부 baseline PNG 육안 + 픽셀 측정으로 확보.**

## 2. 섹션 경계 실측 (행 스캔 결과)

`figma-screenshots/about-full.png` (1920×3499, 캔버스 1:1) 대상 행 스캔.

**`is_white_row`** 판정 (row에서 픽셀의 99.5% 이상이 near-white면 빈 행). y 540..2800 스캔.

| 이벤트 | y |
|-------|---|
| 상단 divider (from about-header 끝) | **y = 542~543** (두께 2px) |
| 공백 | y = 544~609 |
| 제목 line 1 "ESG실천네트워크(ESGPN)를" | **y = 610~631** (cap 22px) |
| 라인 gap | y = 632~642 (11px) |
| 제목 line 2 "방문해주신 여러분을..." | **y = 643~666** (cap 24px) |
| 공백 | y = 667~707 (41px) |
| 본문 para1 L1 | y = 708~723 (cap 15px) |
| 본문 para1 L2 | y = 732~747 |
| 본문 para1 L3 | y = 756~771 |
| 본문 para1 L4 | y = 780~795 |
| 단락 간 공백 | y = 796~827 (32px) |
| 본문 para2 L1 | y = 828~843 |
| 본문 para2 L2 | y = 852~867 |
| 공백 (photo만 존재) | y = 868~1235 (photo 영역 포함) |
| 하단 divider (Values 시작 직전) | **y = 1294~1295** (두께 2px) |

→ **about-mission 섹션 범위 확정: y = 542 ~ 1295, height = 754px.**
research/about.md 추정값 (400~1100, 700px) 보다 크다. 실측 754px로 수정.

### 2.1 baseline PNG 생성
- crop: `about-full.png` → `(0, 542, 1920, 1296)` → `about-mission.png` (1920×754 RGBA)
- 이미 생성 완료 (단계 1에서 probe와 함께). `file` 실측 확인.

## 3. 요소별 상세 스펙

### 3.1 상/하 divider (2개, 동일 스타일)

| 항목 | 값 |
|------|---|
| y (top divider) | 542~543 (섹션 내부 offset: 0~1) — 두께 2px |
| y (bottom divider) | 1294~1295 (섹션 내부 offset: 752~753) |
| x 범위 | 494~1426 (가운데 정렬, 폭 932px, canvas center 960 ✓) |
| 좌측 해치 `//////` | x=494~526 (폭 32px, 5~6개 slash) |
| 중앙 실선 | x=535~1383 (폭 848px) |
| 우측 해치 `//////` | x=1384~1426 (폭 42px, 5~6개 slash) |
| 색상 | 회색 (샘플 예정, 추정 `#9CA3A1` 또는 `--color-gray-400/500`) |

**구현 옵션:**
- (a) SVG inline: slash+line 조합 (재사용성 ↑, about-header에도 쓰일 수 있음 → `HatchedDivider` 공통 컴포넌트 후보)
- (b) baseline crop → `<img>` 삽입 (가장 빠르고 G1 확실, 접근성 영향 적음 — decorative)
- **권장 (a):** SVG. Values/Vision 섹션 경계에서도 동일 패턴 재사용 예상.

### 3.2 제목 블록 (섹션 내부 y=68..124, x=493..)

| 요소 | 값 |
|------|---|
| line 1 텍스트 | `ESG실천네트워크(ESGPN)를` |
| line 1 색상 | `ESG실천네트워크(ESGPN)` = 녹색 `#4FB654` (픽셀 샘플 `(79,182,84)`), `를` = 다크 `#1d2623` |
| line 1 font | Pretendard **Bold** 추정 (glyph 무게) |
| line 1 cap height | 22px → font-size ≈ **28px** 추정 |
| line 1 x 시작 | 493 (섹션 내부 x offset: 493) |
| line 1 y (캔버스) | 610 (섹션 내부 offset: 68) |
| line 2 텍스트 | `방문해주신 여러분을 진심으로 환영합니다.` |
| line 2 색상 | 전체 다크 `#1d2623` (`(29,38,35)`) |
| line 2 font | Pretendard **Bold** |
| line 2 cap height | 24px → font-size ≈ **28~30px** (line 1과 동일 추정) |
| line 2 y (캔버스) | 643 (섹션 내부 offset: 101) |
| line-height (line1→line2) | y=610~631, line2 시작 y=643 → gap 12px → line-height ≈ 44px |
| 정렬 | left-align, x=493 |

### 3.3 본문 단락 (섹션 내부 y=166..325)

| 요소 | 값 |
|------|---|
| para1 L1 y | 708 (offset 166) |
| para1 L2 y | 732 (offset 190) — line-height 24px |
| para1 L3 y | 756 (offset 214) |
| para1 L4 y | 780 (offset 238) |
| 단락 gap | 795 → 828, 33px |
| para2 L1 y | 828 (offset 286) |
| para2 L2 y | 852 (offset 310) |
| cap height | 15px → font-size **16px** 추정 |
| line-height | 24px (line-to-line pitch) |
| x 시작 | 493 |
| max text width | 약 **577px** (x=493..1069, para2 기준 — photo 좌측 edge와 맞닿음) 또는 **최대 약 627px** (para1 일부 line 2가 1120까지 확장, 그러나 photo 바로 위 영역이라 breathing room) |
| 색상 (기본) | `#1d2623` (Gray 900) |
| 색상 (강조) | `#4FB654` (para1 첫 단어 "ESG실천네트워크", para2 첫 단어 "ESG실천네트워크") |
| 정렬 | left-align |
| font-weight | 강조 부분 Semibold(600)/Bold(700) 추정, 나머지 Regular(400) |

### 3.4 텍스트 내용 (원문 정확 판독)

**제목:**
```
ESG실천네트워크(ESGPN)를
방문해주신 여러분을 진심으로 환영합니다.
```

**본문 para1 (4줄):**
```
ESG실천네트워크는 '행동으로 구현하는 지속가능성'이라는 가치를 중심에 두고,
ESG를 단순한 기업의 평가 기준을 넘어 사회 구성원 모두의 행동 기준으로 확산시키기 위해 설립되었습니다.
대학, 학회, 산업체, 그리고 지역사회가 서로 손을 잡고 실천의 목소리를 모을 때 더 큰 사회적 가치가 창출되듯,
우리는 교육과 참여를 바탕으로 건강한 ESG 실천 문화를 만들어가고자 합니다.
```

**본문 para2 (2줄):**
```
ESG실천네트워크는 지속가능성이 단순한 '선언'에 그치지 않고 '교육과 실천의 축적'으로
완성될 수 있도록 돕는 전문 연대 플랫폼으로서, 다음과 같은 가치를 목표로 하고 있습니다.
```

> ⚠️ 문장부호: ASCII single quote `'` 사용 (원본도 ASCII로 판독). 한글 인용부호 `'` `'` 여부는 G1 3회차 전에 재검증.

### 3.5 우측 이미지 (2개 콜라주)

| 요소 | 값 |
|------|---|
| large photo (cityscape) | x=1070~1427, y=800~1159 → 사이즈 **357×359** (거의 정사각), rounded corners (radius ~30px 추정) |
| large photo 섹션 내부 y | 258~617 (offset 258) |
| small photo (plants/forest) | x=887~1032, y=1073~1234 → 사이즈 **145×161**, rounded corners |
| small photo 섹션 내부 y | 531~692 |
| overlap | small photo가 large photo 좌하단에 겹침 (z: small > large? small이 위에 놓임. 확인) |
| 배치 | large 위, small은 large 좌하단에 살짝 overlap (cutout 느낌) |

**위치 관계:**
- Large: section 오른쪽, y offset 258부터
- Small: large 왼쪽으로 182px (1070-887+... 사실 양쪽 모두 겹침) 그리고 아래쪽
- Small photo center x ≈ 960 (887+72.5), 캔버스 중앙 부근
- Large photo center x ≈ 1248

### 3.6 Canvas-Asset 개수 일치 검증

- Canvas visible 요소:
  - divider x2 (top, bottom) — CSS/SVG로 재생성
  - 제목 line x2 — HTML
  - body line x6 (para1 4 + para2 2) — HTML
  - 사진 x2 — **에셋 2개 필요**
- **다운로드 대상 = 2 (photos)**
- Canvas에 이미지 = 2. **일치 (2 = 2). ✓**

## 4. baseline 실측 (§2.6 필수)

- `figma-screenshots/about-mission.png` = **1920×754 RGBA** (file 실측 완료)
- clip 파라미터 불필요 — 섹션이 풀폭 1920이므로 `compare-section.sh about-mission` 기본 호출 가능
- preview viewport: 1920×754

## 5. 에셋 crop 계획 (src/assets/about-mission/)

baseline의 photos를 **crop → 정적 PNG** 로 저장. 대안(Framelink) 불가 — 이 페이지는 52:624 flatten 이미지라 각 photo가 독립 노드로 존재하지 않음.

| 파일명 | 소스 crop (about-full.png) | 출력 크기 | 라운드 corner |
|--------|---------------------------|-----------|---------------|
| `photo-large.png` | (1070, 800, 1427, 1159) | 357×359 | CSS `border-radius` 적용 예정 |
| `photo-small.png` | (887, 1073, 1032, 1234) | 145×161 | CSS `border-radius` 적용 예정 |

- 목적지: `src/assets/about-mission/photo-large.png`, `src/assets/about-mission/photo-small.png`
- crop은 직각(사각) 영역으로 저장하고, CSS에서 `border-radius` + `overflow: hidden`으로 둥근 모서리 구현
- naturalWidth > 0 (G3) 보장

**대안 검토:** 
- Figma Framelink로 flatten 전 원본 이미지 fill 추출 시도? 이미 docs에서 불가 판단. 건너뜀.

## 6. 디자인 토큰 매핑 후보 (plan에서 확정)

`src/index.css` / `tailwind.config.ts` 기존 토큰:
- 본문 다크: `--color-gray-900` = `#1d2623` ✓ 정확 일치 (about-header G4와 동일)
- 강조 녹색: `#4FB654` — 기존 토큰 중 `--color-brand-green` / `--color-primary` 있는지 확인. 없으면 arbitrary `text-[#4FB654]` 또는 새 토큰 `--color-green-500` 추가
- 제목/본문 폰트: Pretendard (`font-sans`) 공통 ✓
- 폰트 weight: Semibold 600 / Bold 700 — Pretendard 전 weight 로드 확인
- divider 색상: 추정 `#C4CCC8` 또는 `--color-gray-300` — plan에서 픽셀 샘플 후 확정

## 7. 신규 공통 컴포넌트 후보

| 후보 | 재사용 가능성 | 결정 유보 근거 |
|------|-------------|---------------|
| `HatchedDivider` (좌우 `//` 해치 + 중앙 실선) | ○ 높음. about-values/about-vision 섹션 경계에 동일 divider 다시 나올 가능성 90% | Values/Vision 리서치에서 확인 후 판정. 이번 섹션은 일단 **로컬 구현**, Values에서 등장 시 승격 |
| `BodyParagraph` (첫 단어 녹색 강조 pattern) | △ | 이 섹션 전용 가능성. 승급 안 함 |

**권장:** 이번 섹션은 **로컬 컴포넌트로 시작**. Divider 승격은 Values/Vision 리서치 이후.

## 8. SectionTabs 필요 여부

- about-header에서 신설된 `SectionTabs` (src/components/ui/SectionTabs.tsx)
- **이 섹션에는 탭 UI 없음** (baseline 확인: y=542~609 영역에 탭 없음. 탭은 about-header에만 존재, y=169~189)
- AboutHeader가 `<SectionTabs>`를 렌더링. AboutMission은 **탭 아래** 순차 렌더링
- **결론: AboutMission 자체에는 SectionTabs 사용 안 함**

## 9. 리스크 (이 섹션 고유)

1. **텍스트 폰트-size 조정 필요 가능성 (G1 저감):** cap height 22/24/15 → font-size 추정 28/28/16px. 실제 렌더 차이로 G1 3~5% 발생 가능. about-header에서 152px 조정 선례. 3회 루프 내 맞춰야.

2. **강조 녹색 `#4FB654` 토큰 미존재 추정:** 기존 프로젝트 토큰 확인 필요. 없으면 arbitrary 사용 (G4는 hex 일치만 보므로 통과).

3. **divider 색상 근사치:** 픽셀 샘플 전 plan에서 확정. G4 정확 매칭.

4. **사진 위치·크기 오차:** `border-radius` 미세값 차이로 G1 diff 유발 가능. Figma에서 정확한 radius 알 수 없음 → visual 루프에서 24/28/32px 후보 테스트.

5. **본문 text container width:** para1 L2 가 1120까지 확장 vs para2 L1 1069에서 끊김 (photo edge). 둘 다 수용하려면 max-width를 **약 630~640px 정도**로 설정 + photo를 absolute로 배치, 줄바꿈은 자연스럽게 맞춤. 줄바꿈 위치가 baseline과 어긋나면 줄별 `<br>` 강제 필요.

6. **G1 예상:** 사진 renderer 차이 + 텍스트 antialias → **3.5~4.8%** 예상. <5% 목표 가능.

## 10. 단계 1 산출 파일

- `figma-screenshots/about-mission.png` (1920×754 RGBA, baseline)
- 진단용 임시 파일 (삭제 가능): `_tmp_mission_*.png`, `_tmp_m_*.png`, `_tmp_p1l*.png`, `_tmp_p2l*.png`, `_tmp_p1_wide.png`, `_tmp_p2_wide.png`, `_tmp_p2_text_only.png`, `_tmp_divider_*.png`, `_tmp_mission_end_probe.png`, `_tmp_mission_probe*.png`
- 본 파일 `research/about-mission.md`

## 11. 측정 요약 (단계 2 plan 입력)

| 구분 | 값 |
|------|---|
| 섹션 범위 (canvas y) | 542..1295 |
| 섹션 크기 | 1920×754 |
| 텍스트 시작 x | 493 |
| 제목 font-size 추정 | 28px (Bold) |
| 본문 font-size 추정 | 16px (Regular / 강조 Semibold) |
| line-height (본문) | 24px |
| 단락 간 gap | 33px |
| 제목→본문 gap | 41px (y=666→707) |
| 강조 녹색 hex | `#4FB654` |
| 본문 다크 hex | `#1d2623` (Gray 900) |
| divider 폭 | 932px (중앙정렬) |
| photo large 크기 | 357×359, y offset 258 |
| photo small 크기 | 145×161, y offset 531 |
| 에셋 개수 | 2 (photo-large.png, photo-small.png) |

---

## 멈춤 지점

단계 1 완료. 이어서 `plan/about-mission.md` 작성 후 단계 2 승인 게이트에서 멈춤.
