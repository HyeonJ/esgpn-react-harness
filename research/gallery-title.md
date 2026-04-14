# Research — gallery-title (Node 314:6837)

## 개요
- 섹션명: `gallery-title`
- 페이지: `/gallery` (Node `302:6622`)
- Node ID: `314:6837`
- 프레임명: `Frame 2043686120`
- 캔버스 좌표: x=492, y=180 (페이지 내부 기준) / 섹션 내부 로컬: 0,0
- 사이즈: **936 × 124**
- baseline PNG: `figma-screenshots/gallery-title.png` (실측 **936×124**, RGBA, 13.4KB)
- 육안 확인(Read로 PNG 조회): 좌측 한글 H3 2줄 굵게 + 우측 한글 본문 2줄 우측정렬, 배경 투명(흰색).

## design_context 요약 (공식 Figma MCP)

```jsx
<div className="content-stretch flex gap-[32px] items-end justify-center ...">
  <p className="font-['Pretendard:Bold'] leading-[1.3] text-[48px] tracking-[-1.92px] whitespace-nowrap" data-node-id="314:6838">
    실천이 만든 변화의 순간들,<br/>ESPGN 아카이브
  </p>
  <p className="flex-[1_0_0] font-['Pretendard:Regular'] leading-[1.5] text-[15px] text-right tracking-[-0.1125px]" data-node-id="314:6839">
    이론에 머물지 않고 현장에서 발로 뛰며 만들어낸 실천의 기록입니다.<br/>
    우리가 함께 그려온 지속 가능한 미래의 조각들을 소개합니다.
  </p>
</div>
```

## 중요 발견 (사용자 지시와의 차이)

1. **Figma 원본 텍스트는 이미 한국어** — research/gallery.md 및 사용자 지시에 "영문 placeholder"로 언급됐지만, 실제 `get_design_context`·`get_screenshot` 모두 한국어 카피 확인:
   - 좌: "실천이 만든 변화의 순간들, / ESPGN 아카이브"
   - 우: "이론에 머물지 않고 현장에서 발로 뛰며 만들어낸 실천의 기록입니다. / 우리가 함께 그려온 지속 가능한 미래의 조각들을 소개합니다."
2. **"ESPGN" vs "ESGPN" 표기 차이**: 
   - Figma 원본: **ESPGN 아카이브** (P와 G 순서가 프로젝트명과 다름 — Figma 최상위 프레임 이름 `ESPGN_ESG 마인드 자격검정`과 일치, 즉 작업자 오타가 Figma 전역에 퍼진 상태)
   - 프로젝트 공식 표기: **ESGPN** (PROGRESS·CLAUDE·코드베이스 전반)
   - 사용자 지시(docs §4.8 추정치): **ESGPN 아카이브**
   - 🟡 **결정 필요**: Figma 그대로("ESPGN") 가면 Figma와 100% 일치하지만 오타 채택. 프로젝트 공식("ESGPN")으로 가면 baseline과 2글자 미세 차이 → G1 영향 미미(라스터 텍스트 글자 형상 차이 극소). **plan에서 "ESGPN"으로 권장 제안** (공식 브랜드 표기가 우선, baseline은 placeholder성 오타).
3. **우측 서브카피 존재**: research/gallery.md는 "Heading3 2줄 타이포"만 언급했으나 실제 우측은 Regular 15px 본문 2줄 (H3 아님). 사용자 입력 설명의 "Heading3 2줄"은 좌측만 해당.

## 치수/토큰 스펙

| 요소 | 속성 | 값 |
|------|------|-----|
| 컨테이너 | display | flex |
| | direction | row |
| | gap | 32px |
| | items | end (하단 정렬) |
| | justify | center |
| | size | 936×124 |
| 좌측 Heading3 (314:6838) | font-family | Pretendard Bold |
| | font-size | 48px |
| | line-height | 1.3 (62.4px) |
| | letter-spacing | -1.92px |
| | white-space | nowrap |
| | color | #000000 |
| | box | 477×124 (2줄, y=0) |
| 우측 본문 (314:6839) | font-family | Pretendard Regular |
| | font-size | 15px |
| | line-height | 1.5 (22.5px) |
| | letter-spacing | -0.1125px |
| | text-align | right |
| | flex | 1 0 0 |
| | color | #000000 |
| | box | 427×46 (2줄, y=78) |

## 에셋 목록
| # | 노드 | 타입 | 동적? | 처리 |
|---|------|------|------|------|
| — | — | — | — | **없음** (순수 타이포 섹션, 이미지/아이콘/SVG 0개) |

- 캔버스 에셋 수 = 0, 프로젝트 에셋 디렉토리 필요 없음. `src/assets/gallery-title/` 생성 불필요.

## 공통 컴포넌트 사용 여부
- Header/Footer 재사용(공통) — 섹션 본체와 무관
- 새 공통 컴포넌트 도입 불필요 (단일 섹션 로컬 컴포넌트로 충분)

## 리스크/주의

1. **"ESPGN" vs "ESGPN" 표기 결정** — plan에서 최종 카피 확정 후 사용자 승인 필요. 현재 기본 선택: **"ESGPN 아카이브"** (사용자 지시 + 프로젝트 공식 표기).
2. **letter-spacing 소수점**: `-1.92px`, `-0.1125px` 원본 그대로 arbitrary 클래스로 유지 (반올림 금지).
3. **`whitespace-nowrap` 좌측 필수**: 48px Bold 2줄이 각각 한 줄로 유지돼야 함. 부모 컨테이너 936px 안에서 좌 477 + gap 32 + 우 427 = 936 딱 맞음. 좌측이 476px 이하로 줄어들면 자동 줄바꿈 위험.
4. **G1 텍스트 diff 예상**: Figma baseline이 ESPGN/한국어 기준, 구현이 ESGPN(1글자 형상 차이)이면 G 글자 한 개 차이 → pixelmatch diff 극소(<0.5% 예상). 사용자가 "G1 완화 수락" 언급했으나 실제로는 거의 영향 없을 것으로 추정.
5. **mx-auto 내장**: 갤러리 콘텐츠 폭 936, viewport 1920 → 섹션 루트에 `w-[936px] mx-auto` 필수. Preview 라우트는 섹션을 그대로 렌더(wrapper 감싸지 말 것).
6. **transform/회전 없음**: 단순 flex 레이아웃, wrapper/inner 분리 패턴 불필요.

## 단계 1 통과 조건 점검
- [x] baseline PNG 저장 및 실측 (936×124 확인)
- [x] design_context + variable_defs + metadata 확보
- [x] 에셋 목록 동적 여부 포함 (해당 없음, 0개)
- [x] 캔버스-에셋 수 일치 (0=0)
- [x] 소수점 수치 원본 기록
- [x] floating/중앙정렬 좌표 기록 (페이지 내 492,180 / 섹션 내부 936×124)
