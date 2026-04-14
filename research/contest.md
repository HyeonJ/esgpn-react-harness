# research/contest.md — 경진대회 (`/contest`) 페이지 리서치

> Phase 2 페이지 분해 리서치. Figma Node `126:606`, 페이지 사이즈 1920×3098, 라우트 `/contest`.

## 1. Figma 노드 트리 구조

`get_metadata(126:606)` 결과 — **부분 flatten 하이브리드 페이지**. 본문(About/Benefits)은 노드 구조가 살아있고, Hero·CTA는 flatten.

```
126:606  ESPGN_ESG 실천 아이디어 경진대회   1920x3098  (page frame)
├─ 126:644  CK_cb046025150_l 1             3024x1143  hidden=true (참고 에셋, 무시)
├─ 302:5145 Frame 2043686160               1920x3098  (content wrapper)
│  ├─ 299:4807 Frame 2043686159            1920x818   y=0    ⚠ flatten (자식 0)
│  ├─ 299:4423 Frame 2043686037            1920x1572  y=818  (About + Benefits 공용 래퍼)
│  │  ├─ 302:4977 Frame 2043686024         1416x459   x=252 y=24    (About 섹션)
│  │  │  ├─ 302:4978 Heading + HatchedDivider 936x71  x=240 y=64   ("ESG 실천 아이디어 경진대회란?" + 40px 아이콘 원형)
│  │  │  └─ 302:4998 Body 2-column          936x240  x=240 y=155
│  │  │     ├─ 302:4999 Intro 문단          936x24              ("지속가능한 미래를 위해 산업체가...")
│  │  │     └─ 302:5158 2-column 카드        936x196  y=44
│  │  │        ├─ 302:5000 핵심 특징 카드    460x196             (제목 + 불릿 3개)
│  │  │        └─ 302:5146 주요 대상 카드    460x196  x=476     (제목 + 불릿 3개)
│  │  └─ 302:5067 Frame 2043686026          1416x969  y=483    (Benefits 섹션)
│  │     ├─ 302:5068 Heading + HatchedDivider 936x71 x=240 y=64  ("ESG 실천 아이디어 경진대회의 특별한 혜택")
│  │     └─ 302:6515 Benefits 본문 래퍼      936x750  x=240 y=155
│  │        ├─ 302:5088 BenefitCard 3x2 그리드 936x418 (6개 카드: 304×203, gap 12)
│  │        └─ 302:6592 Container            936x320  y=430    ⚠ flatten (자식 0) — CTA 예상 위치
│  └─ 299:4742 Footer (instance)            1920x708  y=2390
└─ 299:4808 Frame 2 (Top Nav 래퍼)          1920x88   y=0
   └─ 299:4809 Top Nav (instance)           1416x72   x=252 y=16
```

**핵심 발견:**
- **Hero(299:4807, 1920×818)는 flatten** — 자식 노드 0개. About 페이지와 같은 단일 이미지. 텍스트·버튼 모두 baked-in.
- **CTA(302:6592, 936×320)는 flatten** — "Container"라는 이름만 있고 자식 0. 사전 추정 "지금 바로 신청하세요" CTA가 여기에 해당. 배경 이미지 + 텍스트가 baked될 가능성 높음.
- **About·Benefits는 노드 살아있음** — `get_design_context(302:4977)`, `get_design_context(302:5067)`로 per-section 텍스트/색/폰트 획득 가능. 메인페이지 수준의 표준 구현 가능.
- **Benefits 카드 6개 구조 확인**: 304×203px, 3열×2행, gap 12px(316-304=12). 각 카드: 상단 80×80 원형 아이콘(Rectangle 24) + 하단 제목(25px) + 설명(42px 2줄).
- **HatchedDivider 재사용**: 좌우 6개 hatch + 중앙 라인 패턴. About/Benefits 둘 다 사용.
- **Stats 섹션 없음!** — 사전 추정 §4.4의 "Stats (1,500+ / 이론부터 실행 / 100%)"는 실제 노드 트리에 존재하지 않음. Hero flatten 이미지 안에 baked-in되어 있을 가능성이 가장 높다 (단계 1 육안 확인 필요).

## 2. flatten PNG 여부

**하이브리드.** 페이지 전체가 flatten은 아니나 Hero·CTA 두 섹션이 flatten. 처리 전략:
- Hero(`299:4807`): About 페이지의 [C] 하이브리드 전략처럼 텍스트/버튼은 HTML 재구성 + 배경 이미지는 PNG 삽입 권장. 단, 텍스트 노드가 없으므로 OCR 또는 디자이너 원본 필요.
- CTA(`302:6592`): 320px 높이로 비교적 작음. 배경 이미지 + 단순 오버레이 텍스트일 가능성 높아 `<img>` + `<button>` 조합이 현실적.
- About·Benefits: 표준 Phase 3 7단계 절차 그대로 적용.

## 3. 섹션 분할 결과

| # | 섹션명 | Node ID | 예상 토큰 | Figma 사이즈 | 캔버스 좌표 (x,y,w,h) | 비고 |
|---|--------|---------|-----------|--------------|-----------------------|------|
| 1 | contest-hero | `299:4807` | ~4K (baked) | 1920×818 | (0, 0, 1920, 818) | ⚠ **flatten**. baseline PNG는 **1920×1134**(실측)로 frame(818)보다 크게 렌더 — overflow 혹은 bottom 콘텐츠 포함. 단계 1에서 `file` 재실측 + Preview clip 영역 재확인 필수. Stats 숫자가 여기 baked되어 있을 가능성 |
| 2 | contest-about | `302:4977` | ~7K | 1416×459 | (252, 842, 1416, 459) | 아이콘+제목+HatchedDivider + intro문단 + 2-column 카드(핵심특징/주요대상). 내부 content 폭 936, padding 240. 일반 분할 |
| 3 | contest-benefits | `302:5067` | ~11K | 1416×969 | (252, 1301, 1416, 969) | 아이콘+제목+HatchedDivider + 6 BenefitCard(304×203, 3×2 grid, gap 12) + **내부 CTA Container(936×320)**. 토큰 12K 근접 — 필요시 benefits-header / benefits-grid / benefits-cta로 더 작게 분할 고려. 단계 1 진입 시 implementer가 재판단 |
| 3a | (선택) contest-benefits-cta | `302:6592` | ~2K (baked) | 936×320 | (492, 2060, 936, 320) | ⚠ **flatten**. Benefits 섹션 내부 하단 "Container". 배경 이미지+텍스트 baked. 분리 구현이 안전할 수 있음 — 단계 2 plan에서 결정 |
| — | Footer | `299:4742` / `299:2094` | — | 1920×708 | (0, 2390, 1920, 708) | 기존 구현 재사용 |
| — | TopNav | `299:4809` / `52:1379` | — | 1416×72 | (252, 16, 1416, 72) | RootLayout 재사용 |

**캔버스 y좌표 주의:** `299:4423`가 page 기준 y=818에서 시작하므로, 그 안의 `302:4977`(x=252, y=24)는 **페이지 기준 y=842**. `302:5067`(y=483)은 페이지 기준 **y=1301**. Benefits 내부 CTA `302:6592`(local x=240 y=430) → 페이지 기준 **(252+240=492, 1301+155+430=1886?)** 재계산 필요. 실제로는 Benefits 안에서 0,430인데 Benefits 자체가 y=483인 래퍼(299:4423 y=818)의 자식이므로: 818+483+155+430 = **1886**. 표의 2060은 오류, 실제는 **y=1886, h=320 → 끝 y=2206**. 단계 2 plan에서 재확인하라.

### 3-2. 좌표 재계산 (정정)
- About 섹션 페이지 기준 시작: `818 + 24 = 842` (표 값 OK)
- Benefits 섹션 페이지 기준 시작: `818 + 483 = 1301` (표 값 OK)
- Benefits 내부 CTA Container: `1301 + 155 + 430 = 1886` → (492, 1886, 936, 320)
- Footer 시작: `2390` (표 값 OK, 즉 Benefits 끝(1301+969=2270)과 Footer(2390) 사이 120px 여백)

## 4. 사전 추정과의 차이

`docs/figma-project-context.md` §4.4 예상과 비교:

| 항목 | 사전 추정 | 실측 |
|------|-----------|------|
| 섹션 개수 | 5 (Hero/Stats/About/Benefits/CTA) + Footer | **3 본문 섹션** (Hero / About / Benefits + 내부 CTA) + Footer |
| Stats 별도 섹션 | 존재 가정 | **별도 노드 없음** — Hero flatten 이미지에 baked 추정 (단계 1 육안 확인 필요) |
| CTA 별도 섹션 | "지금 바로 신청하세요" 별도 섹션 가정 | **Benefits 섹션 내부** Container(936×320, flatten)로 존재 |
| Benefits 카드 개수 | 6개 | **6개 확정** (3×2, 304×203, gap 12) |
| About 구조 | "개요, 참가 자격, 일정 테이블" | 실제는 **개요 + 핵심 특징/주요 대상 2-column 불릿 카드**. 일정 테이블 없음 |
| Hero flatten | 추정 없음 | **flatten 확정** (자식 0, baked PNG) |
| Hero 높이 | 추정 없음 | 메타 818px, baseline **1134px** — 35% 초과 렌더 (overflow 요소 가능성) |

**가장 큰 차이:** (1) 일정 테이블은 없고 About는 불릿 카드 구조 (2) Stats는 별도 섹션이 아니라 Hero에 baked (3) CTA는 Benefits 내부 flatten Container.

## 5. 신규 공통 컴포넌트 후보

§5 공통 카탈로그와 대조:

| 후보 | 재사용 가능성 | 비고 |
|------|-------------|------|
| `BenefitCard` | ○ (§5에 카탈로그 예약됨) | **여기서 최초 구현**. 304×203, 상단 80×80 원형 아이콘 + 하단 제목(25px)+설명(42px 2줄). 자격검정/메인에도 재등장 가능 → **공통 컴포넌트로 승격 권장** |
| `SectionHeading` (40px 원형 + 제목 + HatchedDivider) | ○ | About/Benefits 둘 다 완전히 같은 구조(`Frame 2043686019` 71px 높이: 42px 제목 블록 + 8px divider + 21px 여백 추정). 같은 노드 이름 `Frame 2043686018`가 반복됨 → **신규 공통 컴포넌트 승격 권장**. 이름 후보: `HatchedSectionHeading` |
| `BulletList` (12×12 ellipse + 텍스트) | △ | About 섹션의 핵심특징/주요대상 카드 내부 불릿 3개. 다른 페이지(자격검정)에도 재등장 가능성 — 섹션 로컬로 시작하고 2개 페이지 이상에서 확인되면 승격 |
| `StatCard` | ✗ | 사전 추정에 있었으나 Hero에 baked되어 노드 없음. Hero 구현 시 HTML 재구성하는 경우 새로 만들 수 있음 (메인 Stats와 재사용 검토) |
| `ScheduleTable` | ✗ | 사전 추정에 있었으나 **실제로 존재하지 않음** |
| `HatchedDivider` | 기존 | 이미 있음 (label? 지원). 그대로 재사용 |

**최종 권장:**
1. `BenefitCard` — 섹션 단계 2 plan에서 `ui/BenefitCard.tsx`로 공통 승격 승인
2. `HatchedSectionHeading` (가칭) — About/Benefits 둘 다 쓰므로 승격 강력 권장. 단, 첫 구현 섹션(About)에서는 섹션 로컬로 만들고 Benefits에서 복제 시 공통화하는 안전한 순서도 가능 — plan에서 결정

## 6. 리스크 메모

### 6.1 페이지 고유 리스크

1. **Hero가 flatten 이미지 — About 페이지와 동일한 전략 선택 필요:**
   - (A) 이미지 직접 `<img>` 사용 (가장 빠름, G1 PASS 확실, 접근성 0)
   - (B) HTML 재구성 (텍스트는 OCR 또는 디자이너 원본, 배경만 이미지)
   - (C) 하이브리드 권장
   - 단계 2 plan에서 결정. Stats 숫자(1,500+ / 이론부터 실행 / 100%)도 baked되어 있을 가능성이 높으므로 접근성 영향 큼.
2. **Hero baseline 1920×1134 vs 메타 1920×818 불일치:** baseline PNG(1134px)가 frame(818px)보다 훨씬 큼. 원인 후보:
   - frame 아래쪽으로 overflow되는 장식 요소(곡선 나뭇잎 등)
   - Framelink 렌더러 여백
   - 실제 디자이너가 818 이하로 잘라서 보여주는데 canvas에 더 큰 원본이 존재
   → 단계 1 육안 확인 + Figma Dev Mode 교차검증 필수. 구현 시 height는 818로 고정, overflow-hidden 처리 여부를 plan에서 결정.
3. **CTA Container(302:6592)가 flatten + 이름 "Container"** — 자식 없어 내용 불명. baseline PNG(936×320) 육안 확인 후 구현 전략 결정. 단순 "신청하기" 버튼+배경이면 `<img>` 위에 `<button>` 오버레이가 가장 단순.
4. **Benefits 아이콘 80×80 원형(Rectangle 24) — fill 타입 확인 필요:** 6개 카드 상단 아이콘이 둥근 사각형인지 원형 배경+아이콘 SVG인지 미확정. 단계 1에서 `get_design_context(302:5088)` 호출 시 fill/imageRef 확인. SVG 아이콘이면 6개 개별 다운로드 필요.
5. **Intro 문단 텍스트 자름 ("지속가능한 미래를 위해 산업체가 요구하는 ESG 기본원칙과 핵심역량을 발전시키고 이를 알상"):** 노드 이름이 잘려 있음. `get_design_context(302:4999)`에서 전체 원문 확보 필요 — "알상" 부분이 "일상"의 오타 가능성(디자인 이름 잘림일 수 있음).
6. **Stats 섹션 누락 — 사용자 확인 필요:** 사전 추정에는 있으나 실제 노드엔 없음. Hero baseline에 baked되어 있는지 아닌지 단계 1에서 확정. 만약 baked되어 있지 않다면 디자이너 누락인지 확인.
7. **hidden 참고 이미지(126:644)가 페이지 레벨에 존재** — `get_design_context(126:606)` 통째 호출 금지(규약대로).

### 6.2 §7 테이블 공통 리스크
- 1920 기준 → 반응형 없음. Benefits 3×2 그리드가 좁은 뷰포트에서 1×6 또는 2×3로 깨지기 쉬움. 데스크탑 우선 구현, 반응형은 사용자 확인 후 별도.
- Hero 큰 합성 이미지 — 검정 배경 이슈 가능 (dynamic-asset-handling 스킬 참조).

## 7. 베이스라인 스크린샷 확보 (Framelink `download_figma_images`, pngScale=1)

`file` 명령 실측 결과 (모두 RGBA non-interlaced):

- [x] `figma-screenshots/contest-full.png` — **1920×3098** (spec 일치)
- [x] `figma-screenshots/contest-hero.png` — **1920×1134** ⚠ (spec 1920×818과 불일치, §6.1 #2 참조)
- [x] `figma-screenshots/contest-about.png` — **1416×459** (spec 일치)
- [x] `figma-screenshots/contest-benefits.png` — **1416×969** (spec 일치)
- [x] `figma-screenshots/contest-cta.png` — **936×320** (spec 일치, Benefits 내부 Container)

> Hero baseline 해상도 불일치는 `file` 실측 우선 원칙(§2.6)에 따라 G1 baseline을 1134로 쓰되, React 구현 시 frame 높이는 818로 두고 overflow 처리를 선택한다. 단계 1 plan에서 명시.

## 8. Phase 3 진입 전 체크리스트

- [ ] 사용자: Hero 구현 전략 (A/B/C) 결정 — About 때와 동일 질문
- [ ] 사용자: Stats 숫자가 Hero에 baked-in인지 별도 구현 희망인지 확인
- [ ] 사용자: CTA Container(302:6592) 처리 방식 (Benefits 내부 통합 vs 별도 섹션 분리)
- [ ] 사용자: `BenefitCard` / `HatchedSectionHeading` 공통 컴포넌트 승격 승인
- [ ] 사용자: 반응형 범위 (데스크탑만 vs 1440/768/375)
- [ ] implementer: `get_design_context(302:4977)`, `get_design_context(302:5067)` 호출로 About/Benefits 상세 확보
- [ ] implementer: Hero baseline 1134 vs 818 불일치 단계 1에서 재확인 (Dev Mode 교차검증)
- [ ] implementer: Benefits 카드 6개의 80×80 원형 아이콘 fill/SVG 타입 확인
- [ ] implementer: `get_design_context(302:4999)`로 intro 문단 원문 전체 확보 (노드 이름 잘림)
