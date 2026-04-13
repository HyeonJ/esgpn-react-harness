# docs/figma-project-context.md — ESGPN 프로젝트 Figma 컨텍스트

이 문서는 ESGPN(ESG 실천네트워크) 프로젝트의 **Figma 노드 정보와 프로젝트 메타데이터**를 정의한다.
워크플로우는 `docs/figma-workflow.md`를, 섹션 구현 절차는 `docs/section-implementation.md`를 참조한다.

> **Figma 파일**: [ESG 실천네트워크](https://www.figma.com/design/qhrMiGVfoSQ1QMFhVN8z78/ESG-%EC%8B%A4%EC%B2%9C%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC)
> **레포**: https://github.com/HyeonJ/esgpn-react-claude

---

## 1. 프로젝트 개요

ESGPN(ESG Practice Network)은 ESG 교육, 자격, 참여, 사회공헌을 실천하는 연대 플랫폼이다.
대학, 학회, 산업체, 지역사회가 함께 지속가능한 미래를 행동으로 구현하는 것을 목표로 한다.

### ⚠️ 진실의 원천: Figma 캔버스의 정적 표현
**이 프로젝트는 Figma 캔버스에서 보이는 정적 표현을 진실의 원천으로 한다.**

Figma는 GIF/비디오 같은 동적 에셋도 캔버스에서는 정적인 한 프레임으로 표시한다. 디자이너가 의도한 것은 그 정적 프레임의 시각적 표현이지, 움직이는 효과가 아니다. 따라서:

- **MCP가 가져온 동적 에셋(GIF/MP4 등)을 그대로 사용하지 않는다.**
- 동적 에셋이 발견되면 해당 노드의 `get_screenshot`으로 정적 PNG를 export해서 사용한다.
- 처리 절차는 `docs/section-implementation.md` 단계 1 2.3과 단계 3 4.2 참조.
- **예외**: 사용자가 명시적으로 "이 부분은 움직이게 해줘"라고 지시한 경우에만 동적 에셋 그대로 사용.

이 원칙이 중요한 이유: Figma MCP는 원본 에셋을 정직하게 가져오지만, 그 원본은 디자이너가 캔버스에서 보고 승인한 것과 다를 수 있다(검정 배경, 의도되지 않은 움직임 등). 캔버스의 시각적 표현이 곧 디자이너의 의도다.

### 디자인 키워드
- **컬러**: 그린(#2D5A27 계열) + 블랙/다크 배경 + 화이트
- **톤앤매너**: 자연/환경 이미지 강조, 나뭇잎·도시 풍경 합성 비주얼
- **레이아웃**: 1920px 기준 데스크탑 퍼스트, 풀스크린 히어로 섹션
- **푸터**: 모든 페이지 공통 — 다크 배경 + 대형 "ESGPN" 타이포그래피 워터마크

### 기술 스택
- **프레임워크**: React (Vite) + TypeScript
- **스타일링**: Tailwind CSS v4 (`@theme` directive)
- **라우팅**: React Router v6
- **상태 관리**: 필요 시 Zustand 또는 Context API (사용자 승인 후 도입)
- **아이콘**: Lucide React
- **폰트**: Pretendard (한글) + 영문 산세리프

---

## 2. Figma 노드 ID 마스터 테이블

**모든 Figma MCP 호출은 이 표의 Node ID를 사용한다.** 페이지 단위가 아니라 섹션/컴포넌트 단위로 분할 호출.

### 2.1 공통 컴포넌트
| 컴포넌트 | Node ID | 사이즈 | Figma 링크 |
|---------|---------|--------|-----------|
| Top Nav (GNB) | `52:1379` | 1416x72 | [열기](https://www.figma.com/design/qhrMiGVfoSQ1QMFhVN8z78/ESG-%EC%8B%A4%EC%B2%9C%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC?node-id=52-1378&m=dev) |
| Footer | `299:2094` | 1920x708 | [열기](https://www.figma.com/design/qhrMiGVfoSQ1QMFhVN8z78/ESG-%EC%8B%A4%EC%B2%9C%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC?node-id=299-2093&m=dev) |

### 2.2 페이지
| # | 페이지 | Node ID | 사이즈 | 라우트 | Figma 링크 |
|---|--------|---------|--------|--------|-----------|
| 1 | 메인페이지 | `12:2324` | 1920x10077 | `/` | [열기](https://www.figma.com/design/qhrMiGVfoSQ1QMFhVN8z78/ESG-%EC%8B%A4%EC%B2%9C%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC?node-id=12-2324&m=dev) |
| 2 | About - 개요 | `52:622` | 1920x3499 | `/about` | [열기](https://www.figma.com/design/qhrMiGVfoSQ1QMFhVN8z78/ESG-%EC%8B%A4%EC%B2%9C%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC?node-id=52-622&m=dev) |
| 3 | About - 조직도 | `89:1293` | 1920x2019 | `/about/organization` | [열기](https://www.figma.com/design/qhrMiGVfoSQ1QMFhVN8z78/ESG-%EC%8B%A4%EC%B2%9C%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC?node-id=89-1293&m=dev) |
| 4 | 경진대회 | `126:606` | 1920x3098 | `/contest` | [열기](https://www.figma.com/design/qhrMiGVfoSQ1QMFhVN8z78/ESG-%EC%8B%A4%EC%B2%9C%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC?node-id=126-606&m=dev) |
| 5 | 자격검정 | `91:1903` | 1920x4910 | `/certification` | [열기](https://www.figma.com/design/qhrMiGVfoSQ1QMFhVN8z78/ESG-%EC%8B%A4%EC%B2%9C%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC?node-id=91-1903&m=dev) |
| 6 | 뉴스 목록 | `129:1756` | 1920x3257 | `/news` | [열기](https://www.figma.com/design/qhrMiGVfoSQ1QMFhVN8z78/ESG-%EC%8B%A4%EC%B2%9C%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC?node-id=129-1756&m=dev) |
| 7 | 뉴스 상세 | `134:2911` | 1920x3339 | `/news/:id` | [열기](https://www.figma.com/design/qhrMiGVfoSQ1QMFhVN8z78/ESG-%EC%8B%A4%EC%B2%9C%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC?node-id=134-2911&m=dev) |
| 8 | 갤러리 | `302:6622` | 1920x2816 | `/gallery` | [열기](https://www.figma.com/design/qhrMiGVfoSQ1QMFhVN8z78/ESG-%EC%8B%A4%EC%B2%9C%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC?node-id=302-6622&m=dev) |
| 9 | 고객센터 | `134:3691` | 1920x1782 | `/contact` | [열기](https://www.figma.com/design/qhrMiGVfoSQ1QMFhVN8z78/ESG-%EC%8B%A4%EC%B2%9C%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC?node-id=134-3691&m=dev) |

> ⚠️ **위의 페이지 Node ID로 `get_design_context`를 통째로 호출하지 않는다.** 페이지는 Phase 2에서 섹션으로 분할 후 섹션별로 호출한다.

---

## 3. 라우팅 구조

```
/                           → 메인페이지 (Home)
/about                      → ESGPN 소개 - 개요
/about/organization         → ESGPN 소개 - 조직도
/contest                    → ESG 실천 아이디어 경진대회
/certification              → ESG 마인드 자격검정
/news                       → 뉴스·자료실 - 목록
/news/:id                   → 뉴스·자료실 - 상세
/gallery                    → 갤러리 (활동 갤러리 + 언론/수상)
/contact                    → 고객센터 (문의)
```

---

## 4. 페이지별 섹션 구성 (예상)

각 페이지의 예상 섹션 목록. **실제 분할은 Phase 2에서 `get_metadata`로 확인 후 확정한다.** 이 표는 사전 추정치이며, Phase 2 결과로 갱신해야 한다.

### 4.1 메인페이지 (`/`)
| # | 섹션명 | 설명 | 비고 |
|---|--------|------|------|
| 1 | Hero | "Environmental" 대형 타이포 + 자연/도시 합성 이미지, 풀스크린 | 큰 배경 이미지 |
| 2 | Intro | ESGPN이란? 좌측 타임라인 UI + 우측 설명 | |
| 3 | Stats | 통계 카드 (참여자/프로그램 수치) | |
| 4 | Gallery | "우리가 만들고 싶은, 그런 세상" 이미지 콜라주 | 다수 이미지 |
| 5 | Programs | 자격검정/경진대회/사회공헌 카드 3열 | |
| 6 | Activities | "우리는 이렇게 활동합니다" 아이콘 + 설명 그리드 | |
| 7 | News | 최신 뉴스 카드 리스트 | |
| 8 | Partners | 협력기관 로고 나열 | |
| 9 | CTA | 문의/참여 유도 폼 또는 버튼 | |
| 10 | Footer | 공통 푸터 | 공통 컴포넌트 |

### 4.2 About - 개요 (`/about`)
| # | 섹션명 | 설명 |
|---|--------|------|
| 1 | Header | 브레드크럼 + "ESGPN" 대형 타이포 |
| 2 | Mission | 미션·비전 상세 설명, 배경 이미지 |
| 3 | Values | 핵심 가치 4개 — 2x2 그리드 |
| 4 | Vision | 자연+도시 합성 파노라마 이미지 |
| 5 | Footer | 공통 푸터 |

### 4.3 About - 조직도 (`/about/organization`)
| # | 섹션명 | 설명 |
|---|--------|------|
| 1 | Logos | ESGPN + CoLive + 한국경영학회 로고 |
| 2 | OrgChart | 운영위원회, 자문위원 등 조직도 |
| 3 | Footer | 공통 푸터 |

### 4.4 경진대회 (`/contest`)
| # | 섹션명 | 설명 |
|---|--------|------|
| 1 | Hero | "ESG 실천 아이디어 경진대회" 타이틀 + 자연 이미지 |
| 2 | Stats | 1,500+ / 이론부터 실행 / 100% |
| 3 | About | 개요, 참가 자격, 일정 테이블 |
| 4 | Benefits | 6개 혜택 카드 그리드 |
| 5 | CTA | "지금 바로 신청하세요" 신청 폼/버튼 |
| 6 | Footer | 공통 푸터 |

### 4.5 자격검정 (`/certification`)
| # | 섹션명 | 설명 |
|---|--------|------|
| 1 | Hero | "ESG 마인드 자격검정" + 나무/도시 합성 이미지 |
| 2 | Stats | 1,500+ / 이론부터 실행 / 600+ |
| 3 | Classification | 시험 등급별 안내 테이블 |
| 4 | Subjects | ESG 분야별 과목/범위 테이블 |
| 5 | Sample | 자격증 샘플 이미지 |
| 6 | Process | 접수 → 시험 → 발표 플로우 |
| 7 | Schedule | 2024년 회차별 일정 테이블 |
| 8 | CTA | "ESG 자격 신청하기" 버튼 |
| 9 | Footer | 공통 푸터 |

### 4.6 뉴스 목록 (`/news`)
| # | 섹션명 | 설명 |
|---|--------|------|
| 1 | Hero | "지식으로 여는 지속 가능한 내일" + 이미지 |
| 2 | Featured | 메인 뉴스 — 대형 썸네일 + 제목 + 요약 |
| 3 | List | 기사 목록 (카테고리 태그 + 제목 + 날짜) |
| 4 | Footer | 공통 푸터 |

### 4.7 뉴스 상세 (`/news/:id`)
| # | 섹션명 | 설명 |
|---|--------|------|
| 1 | Breadcrumb | 뉴스 > 상세 |
| 2 | Article | 기사 본문 (제목 + 대형 이미지 + 본문) |
| 3 | Related | 관련 기사 카드 3~4개 |
| 4 | Footer | 공통 푸터 |

### 4.8 갤러리 (`/gallery`)
| # | 섹션명 | 설명 |
|---|--------|------|
| 1 | Title | "실천이 만든 변화의 순간들, ESGPN 아카이브" |
| 2 | Activities | 활동 갤러리 — 썸네일 그리드 |
| 3 | Press | 언론 활동 & 수상 |
| 4 | Footer | 공통 푸터 |

### 4.9 고객센터 (`/contact`)
| # | 섹션명 | 설명 |
|---|--------|------|
| 1 | Title | "함께 만드는 내일, ESGPN 고객센터입니다" |
| 2 | Form | 문의 폼 (이름/전화/제목/내용 + 이미지 업로드) |
| 3 | Footer | 공통 푸터 |

---

## 5. 공통 컴포넌트 카탈로그

페이지 간에 재사용되는 컴포넌트. **새 페이지 작업 전에 이 목록을 확인하고, 이미 만들어진 것은 재사용한다.**

| 컴포넌트 | 위치 | 설명 |
|---------|------|------|
| `Header` (GNB) | `src/components/layout/Header.tsx` | 로고 + 메뉴 6개(About/경진대회/자격검정/뉴스/갤러리/사회공헌사업) + 고객센터 버튼 + 햄버거. floating pill 1416×72, x=252 y=16 @ 1920 vw |
| `Footer` | `src/components/layout/Footer.tsx` | 회사 정보 + 약관 링크 + 대형 ESGPN 워터마크 |
| `HeroBanner` | `src/components/sections/HeroBanner.tsx` | 풀스크린 히어로 (페이지별 재사용) |
| `StatCard` | `src/components/ui/StatCard.tsx` | 숫자 + 라벨 통계 카드 |
| `NewsCard` | `src/components/ui/NewsCard.tsx` | 썸네일 + 카테고리 + 제목 + 날짜 |
| `BenefitCard` | `src/components/ui/BenefitCard.tsx` | 아이콘 + 제목 + 설명 |
| `GalleryGrid` | `src/components/ui/GalleryGrid.tsx` | 이미지 썸네일 그리드 |
| `ContactForm` | `src/components/forms/ContactForm.tsx` | 이름/전화/제목/내용 입력 |
| `Breadcrumb` | `src/components/ui/Breadcrumb.tsx` | 페이지 경로 |
| `CTASection` | `src/components/sections/CTASection.tsx` | 행동 유도 (배경 이미지 + 버튼) |

> 위 경로는 권장 위치이며, 실제 구현 시 `docs/react.md`의 폴더 구조 규칙을 따른다. 컴포넌트가 한 feature에서만 쓰이면 `features/{name}/components/`로 이동.

---

## 6. 구현 우선순위

다음 순서로 진행한다. 각 항목은 별도 브랜치/PR.

1. **Phase 1: 프로젝트 셋업** (`docs/figma-workflow.md` 참조)
   - 디자인 토큰, 폰트, 에셋 파이프라인, 시각 회귀 인프라
2. **공통 레이아웃 컴포넌트**
   - Header (Node `52:1379`)
   - Footer (Node `299:2094`)
3. **메인페이지** (`/`)
   - 가장 복잡하지만 핵심 페이지
   - Hero → Intro → Stats → ... 순서로 섹션별 진행
4. **About 페이지** (개요 + 조직도)
5. **경진대회 / 자격검정** — 정보 중심 페이지
6. **뉴스·자료실** — 목록 + 상세
7. **갤러리** — 이미지 그리드
8. **고객센터** — 폼 페이지

---

## 7. 페이지별 리스크 메모

각 페이지에서 미리 알아두어야 할 위험 요소:

| 페이지 | 리스크 | 대응 |
|-------|------|------|
| 메인페이지 | 10077px의 거대한 페이지 — 섹션 분할이 가장 중요 | Phase 2에서 10개 섹션으로 강제 분할 |
| 메인페이지 | Hero에 큰 합성 이미지 — 검정 배경 이슈 가능 | 에셋 후처리 파이프라인 필수 |
| 메인페이지 | Gallery 섹션에 다수 이미지 콜라주 | 이미지 누락 빈발 가능 — G3 게이트 엄격 적용 |
| 자격검정 | 4910px + 다수 테이블 | 테이블 섹션은 더 작게 분할 검토 |
| 뉴스 상세 | 동적 라우트 (`/news/:id`) | 더미 데이터 우선, 실제 데이터는 별도 작업 |
| 고객센터 | 폼 + 이미지 업로드 | `docs/frontend.md`의 폼 4가지 상태 처리 |
| 갤러리 | 이미지 그리드 — 반응형 깨지기 쉬움 | 모바일/태블릿/데스크탑 검증 필수 |
| 모든 페이지 | 1920px 기준 디자인 → 1440/768/375px 적응 | Figma에 모바일 디자인이 없으면 사용자에게 문의 |

---

## 8. 작업 시작 시 Claude에게

이 문서를 읽었다면 ESGPN 작업 시작 시 다음을 수행한다:

1. `CLAUDE.md`의 5단계 워크플로우와 9번 모드 판별 가이드를 따른다 → Figma 모드 발동
2. `docs/figma-workflow.md`를 함께 읽고 Phase 1이 완료되었는지 확인
3. 작업할 페이지의 Node ID는 위 **2.2 페이지 표**에서 확인
4. **페이지 Node ID로 통째로 `get_design_context` 호출 금지** — 반드시 Phase 2에서 섹션으로 분할
5. 이 문서의 **4번 섹션(예상 섹션 구성)**은 사전 추정치다. Phase 2의 `get_metadata` 결과로 실제 섹션을 확정하고, 이 표를 갱신
6. 공통 컴포넌트는 5번 카탈로그를 먼저 확인 — 이미 있으면 재사용
7. 7번 리스크 메모를 참조해 해당 페이지의 위험 요소를 `research/{페이지명}.md`에 명시
