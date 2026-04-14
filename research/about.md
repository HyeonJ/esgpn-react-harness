# research/about.md — About 개요 (`/about`) 페이지 리서치

> Phase 2 페이지 분해 리서치. Figma Node `52:622`, 페이지 사이즈 1920×3499, 라우트 `/about`.

## 1. Figma 노드 트리 구조 (⚠️ 중요)

`get_metadata` 결과 — **이 페이지는 메인페이지와 구조가 완전히 다르다.**

```
52:622  ESPGN_About us_개요           1920x3499  (page frame)
├─ 52:623  Frame 2043685961           1920x3508  (content wrapper)
│  ├─ 52:624  배경 이미지              1920x2800  ← 전체 컨텐츠가 한 장의 이미지로 flatten됨
│  └─ 299:2126  Footer (instance)     1920x708   y=2800
├─ 52:1190  CK_cb046025150_l 1        3024x1143  hidden=true  (참고 에셋, 무시)
├─ 52:1191  CK_td04970008100_l 1      1920x1689  hidden=true  (참고 에셋, 무시)
├─ 52:1192  Frame 2042061998          153x20     hidden=true  (Educational Program 텍스트, 무시)
└─ 52:1408  Frame 2                   1920x88    (Top Nav 래퍼)
   └─ 52:1409  Top Nav (instance)     1416x72    x=252 y=16
```

**핵심 발견 — 섹션 분리 불가:**
- About 페이지 본문(브레드크럼, "ESGPN" 타이포, Mission, Values, Vision 파노라마)은 전부 `52:624 배경 이미지` 한 개 프레임에 **단일 이미지로 flatten**되어 있다.
- 즉 Figma MCP `nodeId` 단위로 섹션별 design_context를 호출해서 텍스트/레이아웃/색/폰트를 얻을 수 없다.
- Framelink `download_figma_images(52:624)`로 가져오는 것도 결국 하나의 2800px 합성 PNG.
- 이는 디자이너가 About 페이지를 "시안 이미지"로만 제공한 상태라는 뜻이다.

**비교:** 메인페이지(12:2324)는 섹션마다 별도 frame/group/text 노드가 살아있어서 per-section 호출 가능. About는 불가능.

## 2. 섹션 분할 결과 (시각 추정)

Node ID가 없으므로 Y축 좌표 기반으로 분할. 베이스라인은 페이지 전체 PNG(`about-full.png`)를 섹션별로 **Phase 3 단계 1에서 Pillow/sharp crop**해서 만들어야 한다.

| # | 섹션명 | Node ID | 예상 토큰 | Figma 사이즈 (추정) | 캔버스 좌표 (x,y,w,h) | 비고 |
|---|--------|---------|-----------|---------------------|-----------------------|------|
| 1 | about-header | 52:624 (crop) | ~4K | 1920×~312 | (0, 88, 1920, 312) | 브레드크럼(홈>About>개요) + "ESGPN" 대형 타이포 + 서브 카피. 텍스트는 이미지에 baked-in — OCR 또는 디자이너 협의 필요 |
| 2 | about-mission | 52:624 (crop) | ~6K | 1920×~700 | (0, 400, 1920, 700) | "ESGPN의 미션과 비전" 섹션 제목 + 본문 단락 2개 + 우측 이미지 콜라주 2장 (공원/손) |
| 3 | about-values | 52:624 (crop) | ~6K | 1920×~800 | (0, 1100, 1920, 800) | 4개 핵심가치 2x2 그리드 — 각 카드: 녹색 일러스트 + 제목 + 본문 (Figma에는 없음, 이미지에 baked) |
| 4 | about-vision | 52:624 (crop) | ~5K | 1920×~900 | (0, 1900, 1920, 900) | 센터 정렬 한 줄 카피 + 자연+도시 파노라마 이미지 (하단 풀블리드) |
| 5 | Footer | 299:2094 | — | 1920×708 | (0, 2800, 1920, 708) | 이미 구현 완료 — 재사용 |

> ⚠️ 위 y좌표는 full.png를 눈대중으로 분할한 값. Phase 3 단계 1에서 섹션별 implementer가 PNG를 Read로 열어 실제 픽셀 경계를 재측정해야 한다.

## 3. 사전 추정과의 차이

docs/figma-project-context.md §4.2 예상과 비교:

| 항목 | 사전 추정 | 실측 |
|------|-----------|------|
| 섹션 개수 | 3 (Header, Mission, Values) + Footer | **4** (Header, Mission, Values, **Vision**) + Footer |
| Vision 섹션 | §4.2 표에는 누락(실제로 4번 섹션에 있음) | 자연+도시 파노라마 존재 — 새 섹션으로 분리 |
| 섹션 노드 ID | 섹션별 존재 가정 | **전부 없음**. 하나의 flatten 이미지 |
| 텍스트 노드 | 가정 | **없음** — 전체 baked-in |
| 배경 이미지 | 섹션별 개별 이미지 가정 | 페이지 전체가 1920×2800 단일 이미지 |

**가장 큰 차이:** 섹션 Node ID가 존재하지 않아 `get_design_context`를 통해 텍스트/폰트/색을 확정할 수 없음. **이는 구현 방법론에 근본적 영향을 미친다** — 리스크 섹션 참조.

## 4. 신규 공통 컴포넌트 후보

§5 공통 카탈로그와 대조:

| 후보 | 재사용 가능성 | 비고 |
|------|-------------|------|
| `Breadcrumb` | ○ (§5에 이미 계획 있음) | About Header에서 첫 등장 — 여기서 최초 구현 가능 |
| `ValueCard` (2x2 아이콘+제목+설명) | △ | 다른 페이지(자격검정 Benefits 등)의 6개 혜택 카드와 유사 — `BenefitCard`와 통합 검토 |
| `LargeWatermarkTitle` ("ESGPN" 대형 타이포) | △ | Footer의 워터마크와 시각 유사, 그러나 헤더는 본문 배치 — 별개 컴포넌트로 판단 |

**최종 권장:** Breadcrumb만 이 페이지에서 공통 컴포넌트로 신설. Value 카드는 About 전용 로컬 컴포넌트로 시작하고, 추후 Benefits 구현 시 추상화 검토.

## 5. 리스크 메모

### 5.1 페이지 고유 리스크 (최상위 — 반드시 사용자 결정 필요)

1. **본문 전체가 flatten 이미지 — 구현 전략 선택 필요:**
   - **(A) 디자인 복제**: 이미지에서 텍스트를 OCR/수작업 추출 후 React+Tailwind로 재구축. 폰트/색/간격은 육안 측정. G1 diff가 크게 나올 가능성 높음 (텍스트 렌더링 차이, 아이콘 SVG 부재).
   - **(B) 이미지 직접 활용**: Framelink PNG를 그대로 `<img>`로 삽입하고 그 위에 clickable overlay(추후 링크용)만 배치. 가장 빠르고 G1 PASS 확실하나 텍스트 접근성·SEO 0.
   - **(C) 하이브리드**: 배경 파노라마/사진은 이미지, 텍스트/제목은 HTML로 재조립. 가장 품질 높지만 공수 최대.
   - **권장:** (C). 그러나 사용자가 우선순위(속도 vs 접근성)에 따라 선택해야 함. **Phase 3 진입 전 반드시 확정.**

2. **텍스트 내용 확정 불가 — 디자이너 원본 텍스트 필요:** PNG에서 한글 본문을 픽셀 단위로 판독해야 한다. 예: "ESGPN의 미션과 비전" 아래 본문 2단락의 한 글자 한 글자. OCR 오차 발생 시 수정 반복.

3. **아이콘 SVG 부재:** Values 2x2의 녹색 일러스트 4개가 노드로 분리돼 있지 않음. (C) 전략이면 각각을 crop PNG로 저장해 사용.

4. **Y좌표 추정 오차:** 섹션 경계 y값(400/1100/1900)이 눈대중. Phase 3에서 섹션별 경계 재측정 필수.

### 5.2 §7 테이블 공통 리스크

- `모든 페이지` — 1920 기준 → 1440/768/375 반응형 적응 디자인 없음. About는 flatten 이미지이므로 반응형 더 취약. 데스크탑 퍼스트로 구현하고 모바일은 이미지 scale-down 또는 별도 레이아웃 사용자 확인.

## 6. 베이스라인 스크린샷 확보 (Framelink `download_figma_images`)

- [x] `figma-screenshots/about-full.png` — 1920×3499, RGBA (페이지 전체, file 명령으로 실측 확인)
- [x] `figma-screenshots/about-content.png` — 1920×2800, RGBA (52:624 본문 이미지. Header+Footer 제외 순수 컨텐츠. Phase 3 crop 소스로 활용)
- [ ] `figma-screenshots/about-header.png` — **Phase 3 단계 1에서 crop 생성** (from about-full.png, y=88..400)
- [ ] `figma-screenshots/about-mission.png` — Phase 3 단계 1 crop (y=400..1100)
- [ ] `figma-screenshots/about-values.png` — Phase 3 단계 1 crop (y=1100..1900)
- [ ] `figma-screenshots/about-vision.png` — Phase 3 단계 1 crop (y=1900..2800)

> 기존 규약(섹션별 Framelink 호출로 baseline 확보)을 이 페이지는 **적용 불가**. 이유는 §1 참조. implementer는 단계 1에서 Pillow(Python) 또는 sharp(Node)로 crop하고, crop된 PNG를 `file` 명령으로 실측 후 단계 2 plan의 치수 기준으로 삼는다.

## 7. Phase 3 진입 전 체크리스트

- [ ] 사용자: §5.1의 구현 전략 (A/B/C) 결정
- [ ] 사용자: 섹션 Y 경계값 확정 또는 implementer에게 재측정 위임 승인
- [ ] 사용자: 본문 텍스트를 디자이너에게서 받을 수 있는지 (OCR 대체 여부)
- [ ] implementer: crop된 섹션 PNG 생성 스크립트 실행
- [ ] 공통 Breadcrumb 컴포넌트 먼저 생성 후 섹션 구현 진입
