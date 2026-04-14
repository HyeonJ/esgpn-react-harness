# research/about-values.md — About 개요 Values 섹션

> Phase 3 단계 1. 페이지 `/about` 세 번째 섹션. 전략 **[A] 완전 HTML 재구성**.
> 상위 page research: `research/about.md`. 선행: `research/about-header.md`, `research/about-mission.md`, `plan/about-mission.md`.
> 공통 규칙: `CLAUDE.md` / `docs/section-implementation.md` §2.4~§2.6, §6.1, §6.4.

## 1. Figma 노드 재조사

`52:624`는 본문 전체 flatten 단일 이미지. Values 섹션 전용 text/frame 노드 **없음**. `get_design_context` 호출 의미 없음. 텍스트/폰트/색 스펙은 전부 baseline PNG 육안 + 픽셀 측정으로 확보.

## 2. 섹션 경계 실측 (행 스캔)

`figma-screenshots/about-full.png` (1920×3499 RGBA, 캔버스 1:1) 행 스캔.

**near-white (RGB>240, ratio>0.995)** 기반 이벤트, **HatchedDivider 검출**(중앙 가로 회색 띠 비율 >0.5) 병행.

| 이벤트 | canvas y | 섹션 내부 offset |
|-------|----------|----|
| **상단 HatchedDivider (mission과 공유)** | 1294~1295 (두께 2px) | 0~1 |
| 공백 | 1296~1389 | 1~94 |
| 행1 아이콘 2개 | 1390~1511 (h=122) | 95~216 |
| 공백 | 1512~1544 (h=33) | 217~249 |
| 행1 카드 제목 2개 | 1545~1562 (cap 18) | 250~267 |
| 공백 | 1563~1584 (h=22) | 268~289 |
| 행1 카드 설명 L1 | 1585~1599 | 290~304 |
| 행 gap | 1600~1608 (9px, line gap) | 305~313 |
| 행1 카드 설명 L2 | 1609~1623 | 314~328 |
| 공백 (행간 gap) | 1624~1689 (h=66) | 329~394 |
| 행2 아이콘 2개 | 1690~1820 (h=131) | 395~525 |
| 공백 | 1821~1849 (h=29) | 526~554 |
| 행2 카드 제목 2개 | 1850~1867 (cap 18) | 555~572 |
| 공백 | 1868~1889 (h=22) | 573~594 |
| 행2 카드 설명 L1 | 1890~1904 | 595~609 |
| gap | 1905~1913 | 610~618 |
| 행2 카드 설명 L2 | 1914~1928 | 619~633 |
| 공백 | 1929~2015 (h=87) | 634~720 |
| **하단 HatchedDivider** | 2016~2017 (두께 2px) | 721~722 |

→ **about-values 섹션 범위 확정: y = 1295 ~ 2017, height = 722px.** 2x2 그리드 확정 (4 카드, 각 행 2개 카드).

research/about.md 추정 `1100..1900, 800px`와 차이. 실측 722px로 수정.

> 주의: 하단 divider 아래 (y=2022~2160) "ESG실천네트워크는 여러분의 든든한 파트너로서..." + "감사합니다." subcopy가 존재하지만, 이는 **divider 경계 밖**이므로 **vision 섹션에 포함** (다음 섹션 리서치에서 다룸).

### 2.1 baseline PNG 생성
- crop `about-full.png` → `(0, 1295, 1920, 2017)` → `figma-screenshots/about-values.png`
- **실측: 1920×722 RGBA** (file 명령 확인 완료)

## 3. 요소별 상세 스펙

### 3.1 상/하 HatchedDivider (mission과 동일 스타일, 동일 색)

| 항목 | 값 |
|------|---|
| top divider canvas y | 1294~1295 (섹션 내부 offset 0~1) — mission과 공유 |
| bottom divider canvas y | 2016~2017 (offset 721~722) |
| x 범위 | 494~1426 (폭 932, 중앙정렬, canvas center 960 ✓) |
| 색상 | 실선 `#B1B9B6`, 해치 `#97A29E` (mission 실측치 재사용) |

- **HatchedDivider 재등장 확정** → Rule of Three 충족 (mission 2개 + values 2개 = 동일 컴포넌트 4회 사용). `ui/HatchedDivider.tsx` **공통 승격 시점**. plan에서 계획 명시.

### 3.2 카드 좌표 (2x2 그리드)

|  | 좌 컬럼 | 우 컬럼 |
|--|--------|--------|
| 아이콘 x 범위 | 652..776 (w=124) | 1146..1264 (w=118) |
| 제목 x 범위 | 615..811 (w=196) | 1108..1305 (w=197) |
| 설명 x 범위 | 526..898 (w=372) | 1013..1398 (w=385) |
| 카드 centerX | ~714 | ~1205 |

- 좌/우 대칭 확인: 960 - 714 = 246, 1205 - 960 = 245 **✓ 대칭**
- 카드 간 gap (중앙 기준): 1205 - 714 = 491px
- 카드 총 폭 추정 (설명 기준): 약 **~400~440px**, 컨테이너 중앙정렬 레이아웃

### 3.3 카드 내부 수직 스펙 (행1 기준 — 행2도 동일)

| 요소 | 섹션 내부 y offset | 높이 / 캡 |
|------|-------------------|----------|
| 아이콘 영역 | 95..216 | h=122 |
| 아이콘→제목 gap | 217..249 | 33px |
| 제목 | 250..267 | cap 18 → font-size 추정 **22px** (Pretendard Bold) |
| 제목→설명 gap | 268..289 | 22px |
| 설명 L1 | 290..304 | cap 15 → font-size **16px** (Pretendard Regular) |
| 설명 line-height | 290→314 pitch | **24px** (mission과 동일) |
| 설명 L2 | 314..328 | cap 15 |
| 행간 gap (카드 바닥 → 다음 카드 아이콘 top) | 329..394 | **66px** |

행1 → 행2 동일 패턴 반복:
- 아이콘: 395..525 (h=131)
- 제목: 555..572
- 설명 L1: 595..609, L2: 619..633
- 행2 바닥 → 하단 divider: 634..721 (87px)

### 3.4 아이콘 4개 (녹색 3D 일러스트)

| 카드 | 아이콘 내용 | canvas bbox (x1,y1,x2,y2) | 크기 |
|------|-----------|--------------------------|------|
| 1 (좌상) | 톱니바퀴 2개 겹침 | (652, 1390, 776, 1511) | 124×122 |
| 2 (우상) | 둥근 모서리 사각형 + 원 | (1146, 1390, 1264, 1511) | 118×122 |
| 3 (좌하) | 적층된 잎/화살표 묶음 | (663, 1690, 774, 1820) | 112×131 |
| 4 (우하) | 지구본 격자 | (1140, 1690, 1271, 1820) | 132×131 |

**처리 전략 결정 — baseline crop (직접 PNG):**
- 4개 아이콘 모두 녹색 톤 3D 렌더링 일러스트. 복잡한 그라데이션·라이팅·알파 경계. SVG 재생성 불가능 수준의 그래픽 복잡도.
- Figma 원본 노드 없음 → Framelink로 개별 export 불가.
- 유일한 확실한 경로: **about-full.png에서 crop → `src/assets/about-values/icon-{1..4}.png`**.

crop 영역은 아이콘 bbox에 **좌우 상하 여유 10px** 추가하여 antialias edge 보존.

| 파일명 | crop (from about-full.png) | 출력 크기 |
|--------|---------------------------|-----------|
| `icon-1.png` (톱니바퀴) | (642, 1380, 786, 1521) | 144×141 |
| `icon-2.png` (캡슐) | (1136, 1380, 1274, 1521) | 138×141 |
| `icon-3.png` (화살표 묶음) | (653, 1680, 784, 1830) | 131×150 |
| `icon-4.png` (지구본) | (1130, 1680, 1281, 1830) | 151×150 |

> 렌더링 시 `<img>`의 w/h를 bbox 실측 그대로 사용 (여유 포함한 native 크기). 위치는 `absolute` 배치하여 각 카드 내 아이콘 중심이 canvas x=714 / x=1205에 맞도록.

### 3.5 텍스트 내용 (육안 판독 확정)

**카드 1 (좌상, 톱니바퀴):**
```
제목: 선언을 넘어선 실천의 축적
설명: 지속가능성은 구호가 아닌 교육과 실천의 반복으로 완성됩니다.
      실천 방안을 발굴하고 행동으로 옮기는 프로세스를 구축합니다.
```

**카드 2 (우상, 캡슐):**
```
제목: 차세대 ESG 전문인력 양성
설명: 청년을 ESG 실천의 출발점이자 확산 주체로 세우고,
      체계적인 교육 및 프로그램을 통해 전문성을 갖춘 인재를 양성합니다.
```

**카드 3 (좌하, 화살표 묶음):**
```
제목: 사회의 새로운 행동기준 정립
설명: ESG를 기업만의 평가 지표가 아닌, 우리 사회 전체가 지켜야 할
      행동 기준으로 정의하고 이를 위한 활동 프로그램을 지원합니다.
```

**카드 4 (우하, 지구본):**
```
제목: 실천적 연대 플랫폼 구축
설명: 대학, 산업체, 지역사회가 지속가능한 미래를 현실로 만들어가는
      네트워크 허브 역할을 수행하며, 사회공헌 모델을 제시합니다.
```

> 문장부호: 모두 한글 마침표 `.` 사용. 콤마는 ASCII `,`.

### 3.6 색상 측정 (픽셀 샘플)

| 요소 | 측정 결과 | hex |
|------|----------|-----|
| 제목 (어두운 부분 min) | rgb(29,38,35) | `#1d2623` (Gray 900) — mission과 동일 ✓ |
| 설명 (어두운 부분 min) | rgb(29,38,35) | `#1d2623` |
| HatchedDivider | 회색 톤 | `#B1B9B6` / `#97A29E` (mission 실측 재사용) |
| 배경 | 흰색 | `#FFFFFF` |

제목 weight: Bold 추정 (glyph 두께 + cap 18px), 설명: Regular.

### 3.7 Canvas-Asset 개수 일치 검증

- Canvas visible 요소:
  - HatchedDivider × 2 (SVG/CSS, 공통 컴포넌트)
  - 카드 제목 × 4 (HTML)
  - 카드 설명 × 4 (HTML)
  - **아이콘 × 4 (에셋 필요)**
- **다운로드(crop) 대상 = 4**
- Canvas 이미지 = 4. **일치 (4 = 4). ✓**

## 4. baseline 실측 (§2.6 필수)

- `figma-screenshots/about-values.png` = **1920×722 RGBA** (file 실측 완료)
- clip 파라미터 불필요 — 풀폭 1920. `compare-section.sh about-values` 기본 호출 가능.
- preview viewport: 1920×722

## 5. 에셋 crop 계획 (src/assets/about-values/)

| 파일명 | crop from `about-full.png` | 크기 | 설명 |
|--------|---------------------------|------|------|
| `icon-1.png` | (642, 1380, 786, 1521) | 144×141 | 톱니바퀴 2개 |
| `icon-2.png` | (1136, 1380, 1274, 1521) | 138×141 | 캡슐 도트 |
| `icon-3.png` | (653, 1680, 784, 1830) | 131×150 | 잎 적층 |
| `icon-4.png` | (1130, 1680, 1281, 1830) | 151×150 | 지구본 |

- Python PIL 단계 3에서 생성
- 소프트 edge 보존 위해 bbox에 10px 여유 포함
- RGBA 유지 (알파 채널 그라데이션 보존, §2.5 "RGBA PNG → JPG 금지")

## 6. 디자인 토큰 매핑 후보 (plan 확정)

- 본문 다크: `--color-gray-900 = #1d2623` ✓ (기존)
- 배경: `bg-white`
- HatchedDivider 색: `#B1B9B6` / `#97A29E` (arbitrary, mission 재사용)
- 폰트: `font-sans` (Pretendard) + Bold/Regular
- 녹색 강조: 이 섹션 **텍스트 강조 색 없음** (제목·설명 모두 다크). 녹색은 아이콘에만 존재 (crop PNG로 처리)

## 7. 신규 공통 컴포넌트 결정

| 후보 | 결정 | 근거 |
|------|------|------|
| **`HatchedDivider`** | **`src/components/ui/HatchedDivider.tsx`로 공통 승격** | mission 2개 + values 2개 = 4회 사용. Rule of Three 충족. plan에서 승격 계획 명시 |
| `ValueCard` (icon+title+desc 세로 카드) | **로컬 유지** (AboutValues 내부) | 첫 등장. 경진대회/자격검정 Benefits에서 재등장 가능성(§4 research) — 다음 페이지에서 등장 시 승격 평가. **Rule of Three 첫 카운트** |

### 7.1 HatchedDivider 공통 승격 계획

- 파일 이동: `src/components/sections/AboutMission/HatchedDivider.tsx` → `src/components/ui/HatchedDivider.tsx`
- AboutMission은 이동한 경로에서 import 변경
- AboutValues도 동일 컴포넌트 사용 (상/하 2개)
- 기존 구현 그대로 재사용 (color·viewBox·해치 수 변경 없음)

### 7.2 ValueCard (로컬) props 시그니처 초안

```ts
type ValueCardProps = {
  icon: string;           // crop PNG import
  iconWidth: number;
  iconHeight: number;
  title: string;
  description: string;    // line-break는 컴포넌트 내 <br> 수동 삽입
};
```

데이터는 컴포넌트 내 배열로 하드코딩. 4개 카드 순회 렌더.

## 8. SectionTabs 여부

- about-header에만 존재. about-values는 탭 없음.

## 9. 리스크 (섹션 고유)

1. **아이콘 crop 품질:** 3D 렌더 일러스트는 antialias/soft shadow가 확장되어 있어 10px 여유 포함. baseline과의 edge alignment 불일치 시 여유를 20px로 늘려 재시도. G1 영향 ~0.5~1%.

2. **font-size 22/16 근사:** Figma 노드 없어 cap 18/15 기반 추정. mission 선례(28/16) 참고 시 제목 22px 시작이 합리적. G1 조정 루프 가능성.

3. **아이콘 중심 x 정확도:** canvas x=714 / x=1205 대칭. 각 img를 absolute로 배치 + `left: centerX - width/2` 공식으로 렌더. ±1px 오차는 G2 허용 범위 내.

4. **HatchedDivider 공통 승격 작업의 단계 4 침범 범위:** AboutMission import 경로 1줄 변경 + 파일 이동. 별도 섹션 수정이지만 **공통 컴포넌트 승격은 허용된 작업 범위** (다른 섹션 기능/시각 변경 없음, import 경로만 변경). G1 미영향 확인을 위해 AboutMission preview 재캡처는 생략 가능하지만, 안전하게 build-lint + 시각 retest 권장.

5. **행간 gap 66px 일관성:** 행1 바닥 (y=1623) → 행2 아이콘 top (y=1690) = 67px. 행1 → 행2 카드 gap 값. CSS `row-gap: 66px` 또는 행2 top 절대값 이용.

6. **G1 예상:** 아이콘 4개 crop 경계 noise + 텍스트 antialias → **3.0~4.5%** 예상. <5% 목표.

## 10. 단계 1 산출 파일

- `figma-screenshots/about-values.png` (1920×722 RGBA, baseline crop)
- 본 파일 `research/about-values.md`
- (진단 tmp 파일 생성 후 즉시 삭제 완료 — `_tmp_values_probe.png`, `_tmp_val_c{1..4}.png`, `_tmp_val_sub.png`)

## 11. 측정 요약 (단계 2 plan 입력)

| 구분 | 값 |
|------|---|
| 섹션 범위 (canvas y) | 1295..2017 |
| 섹션 크기 | 1920×722 |
| 카드 레이아웃 | 2×2, 좌 centerX=714, 우 centerX=1205, canvas center=960 대칭 |
| 행 gap | 66~67px |
| 카드 내 아이콘→제목 | 33px |
| 카드 내 제목→설명 | 22px |
| 제목 font-size 추정 | 22px Bold |
| 설명 font-size 추정 | 16px Regular |
| 설명 line-height | 24px |
| 제목/설명 색상 | `#1d2623` |
| divider | mission과 동일 (공통 승격 후 재사용) |
| 아이콘 에셋 | 4개 (crop) |

---

## 멈춤 지점

단계 1 완료. 이어서 `plan/about-values.md` 작성 후 단계 2 승인 게이트에서 멈춤.
