# research/about-organization.md — About 조직도 (`/about/organization`) 페이지 리서치

> Phase 2 페이지 분해 리서치. Figma Node `89:1293`, 페이지 사이즈 1920×2019, 라우트 `/about/organization`.
> 상위 흐름: `docs/figma-workflow.md` Phase 2. 공통 규칙: `CLAUDE.md` / `docs/section-implementation.md` / `docs/figma-project-context.md`.

## 1. Figma 노드 트리 구조 (⚠️ 중요 — flatten 패턴 확정)

`get_metadata(89:1293)` 결과:

```
89:1293  ESPGN_About us_조직도         1920x2019   (page frame)
├─ 89:1294  Frame 2043685961           1920x2028   (content wrapper)
│  ├─ 89:1295  Frame 2043685963        1920x1320   ← 본문 전체가 한 장의 flatten 프레임
│  └─ 299:2159  Footer (instance)      1920x708    y=1320
├─ 89:1436  CK_cb046025150_l 1         3024x1143   hidden=true  (참고 에셋, 무시)
├─ 89:1437  CK_td04970008100_l 1       1920x1689   hidden=true  (참고 에셋, 무시)
├─ 89:1438  Frame 2042061998           153x20      hidden=true  (Educational Program 라벨, 무시)
└─ 89:1440  Frame 2                    1920x88     (Top Nav 래퍼)
   └─ 89:1441  Top Nav (instance)      1416x72     x=252 y=16
```

`get_metadata(89:1295)` 재호출 결과:

```
<frame id="89:1295" name="Frame 2043685963" x="0" y="0" width="1920" height="1320" />
```

**자식 노드 전무 → About-개요(52:624)와 완전히 동일한 단일 flatten 패턴.** SectionTabs, 로고 배치, 조직도 트리 박스/연결선, 도시 파노라마 이미지 전부 `89:1295` 한 개 프레임에 베이크되어 있다.

- 섹션별 `get_design_context` 호출 불가 (텍스트/폰트/색/좌표 스펙 없음)
- Framelink 섹션별 `download_figma_images`도 의미 없음 (하위 노드가 없어 결국 같은 flat PNG)
- **구현 전략 [A] HTML 재구성 + baseline crop 강제 적용.** About 개요·미션·가치·비전 선례와 완전 동일 방법론.

## 2. 섹션 분할 결과

Y축 좌표 기반 분할. baseline은 `about-organization-full.png`를 섹션별로 **Phase 3 단계 1에서 Pillow crop**해서 생성. 아래 y값은 `about-organization-full.png`(1920×2019) 기준 시각 추정이며 Phase 3 단계 1에서 행 스캔으로 재측정 필수.

| # | 섹션명 | Node ID | 예상 토큰 | Figma 사이즈 (추정) | 캔버스 좌표 (x,y,w,h) | 비고 |
|---|--------|---------|-----------|---------------------|-----------------------|------|
| 1 | about-organization-tabs | 89:1295 (crop) | ~3K | 1920×~100 | (0, 88, 1920, 100) | **SectionTabs 재사용** (active="조직도"). 독립 React 섹션 대신 Phase 3에서 기존 `SectionTabs.tsx` 인스턴스로 처리. baseline crop은 검증용 |
| 2 | about-organization-logos | 89:1295 (crop) | ~6K | 1920×~260 | (0, 188, 1920, 260) | HatchedDivider "운영조직" + ESPGN 텍스트 + Colive 로고 + 전문대학평생직업교육협회 로고(한자+설명). 3 로고 horizontal row with divider pipe |
| 3 | about-organization-chart | 89:1295 (crop) | ~10K | 1920×~430 | (0, 448, 1920, 430) | HatchedDivider "설립 구조" + 조직도 트리 (3-tier: 1개→3개→6개 박스, 연결선). **본 페이지의 핵심 컨텐츠** |
| 4 | about-organization-panorama | 89:1295 (crop) | ~4K | 1920×~540 | (0, 878, 1920, 541) | 하단 도시/자연 파노라마 이미지 (About Vision 섹션 파노라마와 시각 유사, 재사용 가능성 있음) |
| 5 | Footer | 299:2159 | — | 1920×708 | (0, 1320, 1920, 708) | 이미 구현 완료 — 재사용 |

> ⚠️ 위 y좌표는 시각 추정. Phase 3에서 각 섹션 implementer가 `about-organization-full.png`를 Read로 열어 행 스캔으로 실제 경계 재측정해야 한다.

### 2.1 섹션 통합 가능성

- **tabs + logos 통합 후보:** About 개요의 `about-header`는 탭+ESGPN타이포+subcopy를 한 섹션으로 합쳤다. 본 페이지도 tabs+logos를 `about-organization-header` 한 섹션으로 합치는 게 자연스러울 수 있음. plan 승인 시 사용자 결정.
- **chart + panorama 분리 유지:** 트리 다이어그램은 박스 6+3+1 및 연결선을 Tailwind로 재구성하는 핵심 공수 구간. 파노라마는 PNG bg-image 처리로 단순. 분리하는 게 G1 게이트 유리.

## 3. 사전 추정과의 차이

docs/figma-project-context.md §4.3 예상과 비교:

| 항목 | 사전 추정 | 실측 |
|------|-----------|------|
| 섹션 개수 | 2 (SectionTabs 네비 + 조직도 트리) | **4** (tabs, logos, chart, panorama) + Footer |
| 운영조직 로고 구간 | 사전 추정 누락 | **존재** (ESPGN + Colive + 전문대학평생직업교육협회 3 로고 row). 별도 섹션으로 분리 |
| 하단 파노라마 | 사전 추정 누락 | **존재** — About Vision 파노라마와 유사한 도시/자연 풀블리드 이미지 |
| 섹션 Node ID | 섹션별 존재 가정 | **전부 없음** — `89:1295` 단일 flatten |
| 텍스트 노드 | 가정 | **없음** — 전체 baked-in |

**사전 추정 대비 증가:** logos 섹션과 panorama 섹션 두 개가 사전 §4.3 표에 빠져 있었음. figma-project-context.md §4.3 갱신 권장.

## 4. SectionTabs 재사용 계획 (Rule of Three 2/3)

- 컴포넌트: `src/components/ui/SectionTabs.tsx` (About Header에서 신설 완료)
- 호출부: `/about/organization` 라우트의 `about-organization-tabs` 섹션
- 탭 목록 (3개): `개요 & 철학` | `조직도` | `운영계획`
- **active prop = "조직도"**
- 링크 매핑 (plan에서 확정):
  - 개요 & 철학 → `/about`
  - 조직도 → `/about/organization` (current, visually active + no navigation)
  - 운영계획 → `/about/roadmap` (미구현 라우트, `#` 또는 404 폴백)
- 재사용 2번째. 3번째 사용(Rule of Three 완성)은 `/about/roadmap` 페이지 구현 시 달성 예정.

### 4.1 SectionTabs 확장 필요 여부

현재 `SectionTabs.tsx`가 링크 라우팅(React Router Link)을 이미 지원하는지 확인 필요. About Header에서는 active="개요 & 철학" 1개 상태만 사용했으므로 inactive 탭 클릭 동작이 실제 이동을 하지 않는 placeholder일 가능성. plan에서 props shape 재점검.

## 5. 신규 공통 컴포넌트 후보

§5 공통 카탈로그 및 본 페이지 요소와 대조:

| 후보 | 재사용 가능성 | 비고 |
|------|-------------|------|
| `OrgChartNode` (녹색/검정 pill 박스) | △ | 조직도 3-tier에서 10+개 사용. 다른 페이지 등장 여부 불명 — 로컬 `components/about/OrgChartBox.tsx`로 시작 권장. 타 페이지 재등장 시 공통화 |
| `OrgChartConnector` (수직/수평 연결선 SVG) | △ | `chart` 섹션 전용. 재사용 가능성 낮아 로컬 유지 |
| `PartnerLogoRow` (로고 + pipe divider) | △ | `logos` 섹션 전용. 자격검정 페이지 등에서 재등장 시 공통화 검토 |
| `SectionTabs` | ○ (이미 공통) | 재사용 2번째. 위 §4 참조 |
| `HatchedDivider` | ○ (이미 공통) | `logos`("운영조직")·`chart`("설립 구조") 2곳 사용. 기존 컴포넌트 재사용 |

**최종 권장:** 공통 컴포넌트 신설 없음. 조직도 관련 요소는 전부 About 로컬 컴포넌트로 시작. SectionTabs + HatchedDivider 재사용.

## 6. 리스크 메모

### 6.1 페이지 고유 리스크

1. **flatten 이미지 + 조직도 박스·연결선 재구성:** 조직도 트리가 10+개 박스와 10+개 연결선으로 구성되어 있어 Tailwind/SVG 재구성 공수가 크다. 박스 크기·색·연결선 경로를 픽셀 단위로 측정해야 G1 <5% 달성 가능. About Values 2x2 그리드보다 구조 복잡도 높음.
2. **텍스트 픽셀 판독:** 각 박스 안 라벨 ("ESG 대학생 부문", "COLIVE, ESG마인드 자격검정" 등)을 PNG에서 판독해야 함. OCR 실수 시 수정 반복. 디자이너 원본 텍스트 리스트 확보가 가능하면 요청.
3. **Colive 로고 + 전문대학평생직업교육협회 한자 로고:** 로고가 PNG에 baked-in. 별도 SVG/PNG 에셋으로 분리 다운로드 필요한지 Phase 3 logos 섹션 리서치에서 판단. Figma에 hidden=true 참고 에셋(`89:1436`, `89:1437`)이 있으나 무관해 보임.
4. **파노라마 이미지 재사용:** 하단 도시/자연 이미지가 About Vision 섹션(`figma-screenshots/about-vision.png`)과 동일/유사일 수 있음. Phase 3 panorama 섹션 단계 1에서 시각 비교 후 동일하면 `public/` 이미지 재사용, 다르면 신규 crop.
5. **Y좌표 추정 오차:** 섹션 경계 y값이 눈대중. Phase 3 단계 1에서 행 스캔으로 재측정 필수.
6. **SectionTabs 라우팅:** 현 `SectionTabs.tsx`가 React Router Link를 지원하는지 미확인. 지원 안 하면 경미한 확장 필요 (plan에서 확정).

### 6.2 §7 테이블 공통 리스크 (페이지 전역)

- `모든 페이지` — 1920 기준, 반응형 없음. flatten 이미지 특성상 모바일 적응 더 취약. 데스크탑 퍼스트 구현.

## 7. 베이스라인 스크린샷 확보 (Framelink `download_figma_images`)

- [x] `figma-screenshots/about-organization-full.png` — **1920×2019, 8-bit RGBA** (`file` 실측 확인, 1,428,422 bytes)
- [x] `figma-screenshots/about-organization-content.png` — **1920×1320, 8-bit RGBA** (`file` 실측 확인, 1,408,917 bytes) — 89:1295 본문 flatten. Phase 3 crop 소스 겸 검증 참조
- [ ] `figma-screenshots/about-organization-tabs.png` — Phase 3 단계 1 crop 생성 (from full.png, y≈88~188)
- [ ] `figma-screenshots/about-organization-logos.png` — Phase 3 단계 1 crop (y≈188~448)
- [ ] `figma-screenshots/about-organization-chart.png` — Phase 3 단계 1 crop (y≈448~878)
- [ ] `figma-screenshots/about-organization-panorama.png` — Phase 3 단계 1 crop (y≈878~1419)

> 섹션별 Framelink 호출로 baseline 확보는 본 페이지에 **적용 불가** (§1 참조). implementer는 단계 1에서 Pillow(Python)로 crop하고 crop된 PNG를 `file` 명령으로 실측 후 단계 2 plan 치수 기준으로 삼는다.

## 8. Phase 3 진입 전 체크리스트

- [ ] 사용자: §2 섹션 분할(4개 + Footer) 승인 또는 재분할 메모
- [ ] 사용자: tabs + logos 통합 여부 결정 (권장: 분리 유지)
- [ ] 사용자: §6.1(4) 파노라마 재사용 검증 위임 승인
- [ ] 사용자: SectionTabs 라우팅 확장 허용 여부 (필요 시)
- [ ] implementer: 단계 1에서 crop PNG 생성 + 행 스캔 y좌표 재측정
- [ ] implementer: 조직도 박스 라벨 텍스트 픽셀 판독 리스트 작성 (plan에 기록)
