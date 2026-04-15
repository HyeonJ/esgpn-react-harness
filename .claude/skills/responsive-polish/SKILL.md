---
name: responsive-polish
description: Figma baseline이 없거나 1개 뷰포트만 있는 디자인을 여러 뷰포트(375/768/1024/1440)에 대응시키는 스킬. 반응형 breakpoint 추가, container scaling, stacking, overflow 해결, Figma에 없는 UI(햄버거 메뉴 등)를 기존 디자인 톤앤매너에 맞춰 보완하는 작업에 사용. figma-to-react 스킬과 배타적 — Figma nodeId가 있는 신규 섹션 구현에는 사용 금지 (그건 figma-to-react)
---

# Responsive Polish

Figma 1920 단일 디자인만 있는 프로젝트에서 **여러 뷰포트 대응을 보수적으로** 추가한다. 디자이너 승인 없는 임의 레이아웃 재설계는 금지하되, 업계 표준 컨테이너 동작·스태킹·overflow 해소는 개발자 재량으로 적용.

## 언제 사용

| 상황 | 이 스킬 사용? |
|------|-------------|
| Figma nodeId 있는 신규 섹션 구현 | ❌ figma-to-react |
| Figma 있는 기존 섹션의 픽셀 diff 재조정 | ❌ section-implementer G1 루프 |
| 1920 디자인을 375/768/1440에 대응 | ✅ |
| Figma에 없는 햄버거 메뉴 / 반응형 UI 추가 | ✅ |
| overflow / 가로스크롤 해결 | ✅ |
| 카드·텍스트 뷰포트별 크기 조정 | ✅ |

## 4대 원칙

1. **보수적 변경만 허용.** 레이아웃 재설계는 디자이너 영역
2. **표준 breakpoint만.** Tailwind `md:768 xl:1280` 중심, 필요 시 `sm:640 lg:1024`
3. **Figma 1920 뷰포트는 픽셀 단위로 원본 유지.** 반응형 변경은 < xl 구간에만
4. **세션별 4뷰포트 스크린샷 의무.** Figma baseline 없으므로 육안 검증이 유일한 게이트

## 작업 절차

### Step 1 — 범위 선언
"어느 페이지의 어느 증상을 고친다" 한 줄. 예: "/main MainIntro 2컬럼이 375에서 overflow"

### Step 2 — 참조 문서 로드 (필요한 것만)
| 증상 | 읽을 파일 |
|---|---|
| 가로스크롤 / overflow | `references/patterns.md` §1 |
| 2컬럼 → 1컬럼 | `references/patterns.md` §2 stacking |
| Figma에 없는 UI 추가 | `references/hamburger-without-design.md` |
| 카드가 모바일에서 너무 큼 | `references/card-resize.md` |
| breakpoint 뭘 써야 할지 | `references/breakpoints.md` |
| 완료 후 검증 | `references/4-viewport-gate.md` |

### Step 3 — 섹션 파일 수정은 워커 위임
- `src/components/sections/**`, `src/components/ui/` — section-implementer 워커
- `src/components/layout/`, `src/styles/`, `src/App.tsx`, `tests/` — 직접 편집 OK

### Step 4 — 4뷰포트 캡처 + 육안 검증
`references/4-viewport-gate.md` 절차 따라 375/768/1440/1920 스크린샷 + 문제 있으면 revert 또는 재수정

### Step 5 — 패턴 발견 시 스킬에 피드백
새 패턴 / 새 안티패턴 / 새 예외 케이스 발견 → 해당 reference 파일에 한 줄 추가 후 커밋

## 제한 (scope creep 방지)

- 이 스킬은 **Figma baseline 픽셀 매칭을 요구하지 않는다.** G1/G2 게이트 대신 육안 + overflow 검사
- Figma 원본 1920 뷰포트에서는 **픽셀 단위로 변화가 없어야 한다** (< xl 구간만 반응형 스타일 추가)
- 새 컴포넌트를 처음부터 창작할 일이 있으면 (예: 햄버거 메뉴) `references/hamburger-without-design.md` 의 "톤앤매너 추출" 절차를 반드시 따른다 — 추측 금지

## 실패 모드

- **Bulk sed로 여러 섹션 한번에 수정하기** → 내부 절대위치 무음 파괴. 섹션당 워커 1개 강제
- **디자이너 승인 없이 요소 숨김 / 재배열** → 디자인 의도 왜곡
- **xl: prefix 빼고 반응형 추가** → 1920에서도 변화 발생 → Figma 원본 괴리
- **육안 검증 스킵** → overflow / 잘림 뒤늦게 발견

## 진화 원칙

Material-3 skill 처럼 iterative commit 으로 보강. 새로운 패턴은 references/ 에 누적. 표본이 쌓이면 안티패턴 목록도 늘어남.
