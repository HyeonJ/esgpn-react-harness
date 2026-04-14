# research/contact-form.md — `/contact` 고객센터 contact-form 섹션

> Phase 3 단계 1 리서치. Node `134:3697`, 사이즈 936×694 (spec), **baseline 실측 938×695**.
> 페이지 `/contact`, 캔버스 좌표 (492, 180, 936, 694). floating centered, 부모 캔버스 1920×1074.
> baseline PNG: `figma-screenshots/contact-form.png` (938×695, RGBA). Framelink 저장 완료(Phase 2).

## 1. 노드 트리 (flatten PNG 아님)

`get_design_context(134:3697)` + `get_metadata(269:1601)` 결과:

```
134:3697  Frame 2043686124                936×694  flex-col gap:56 items-start
├─ 134:3698  Frame 2043686120 (Title row) 936×124  flex gap:32 items-end w-full
│  ├─ 134:3699  Title L                    437×124  Pretendard Bold 48/62.4(1.3) -1.92px
│  │                                       "함께 만드는 내일,\nESPGN 고객센터입니다" (2줄, <br>)
│  └─ 134:3700  Title R (sub)              467×46   flex:1 Pretendard Regular 15/22.5(1.5) -0.1125px right
│                                          "도움이 필요하신 모든 순간, 저희가 함께하겠습니다.\n문의 사항을 남겨주시면 확인 후 빠른 시일 내에 연락드리겠습니다."
└─ 134:3701  Frame 2043686121 (Body wrap)  936×514  flex-col gap:20 items-center w-full
   ├─ 134:3702  Frame 2043685981           936×8   flex gap:8 h:8 items-center (HatchedDivider 합성)
   │  ├─ 134:3703  L hatch                 36×8    (inset-[-9.38%_-2.08%] img)
   │  ├─ 134:3710  Vector8 line            flex:1 h:0 (inset-[-0.75px_0] img)
   │  └─ 134:3711  R hatch                 36×8
   └─ 134:3718  Frame 2043686126 (2-col)   936×486  flex gap:48 items-center w-full
      ├─ 269:1601  Frame 16 (image slot)   336×486 rounded-[32px] overflow-clip
      │  └─ 134:3719 image 17              336×486 bg:rgba(0,0,0,0.2)  ← placeholder, imageRef 없음
      └─ 134:3720  Frame 2043686125 (form) flex:1 486h  flex-col gap:20 items-start
         ├─ 134:3721  TextField "이름"        552×76  y=0
         ├─ 134:3722  TextField "전화번호"    552×76  y=96
         ├─ 134:3723  TextField "제목"        552×76  y=192
         ├─ 134:3724  TextField "문의 내용"   552×118 y=288  (3-line placeholder — textarea)
         └─ 269:1602  Black Default button  552×60  y=426
```

## 2. 스타일 & 토큰 (get_variable_defs)

| 토큰 | 값 |
|------|-----|
| Gray Scale/Gray 100 (Light BG) | `#f3f4f5` (입력 배경) |
| Gray Scale/Gray 500 | `#97a29e` |
| Gray Scale/Gray 600 | `#687685` (placeholder 색) |
| Gray Scale/Gray 800 (Icon) | `#313c4c` (라벨 색) |
| Gray Scale/Gray 900 (Dark BG, Text) | `#1d2623` (버튼 배경) |
| Gray Scale/Gray 000 | `#ffffff` (버튼 텍스트) |
| spacing/2, /3, /4, /5, /6, /12 | 8, 12, 16, 20, 24, 48 |
| Gap (Spacing)/Gap 1 | 8 |
| border-radius/xl, /2xl | 12, 16 |

### 2.1 타이포그래피 (정확 수치 — 반올림 금지)

| 요소 | font | size | weight | line-height | letter-spacing | align |
|------|------|------|--------|-------------|----------------|-------|
| Title L `134:3699` | Pretendard Bold | 48 | 700 | 1.3 (62.4) | -1.92px (-0.04em) | left |
| Title R sub `134:3700` | Pretendard Regular | 15 | 400 | 1.5 (22.5) | -0.1125px (-0.0075em) | right |
| Label `I*;10:7717` (Text-md/15R 아님, B2_KR_Rg) | Pretendard Regular | 14 | 400 | 20 | -0.35px (-2.5%) | left |
| Placeholder `I*;10:7878` (B1_KR_Rg) | Pretendard Regular | 15 | 400 | 22 | -0.375px (-2.5%) | left |
| Button label `I269:1602;10:9286` (BUT1_Sb) | Pretendard SemiBold | 16 | 600 | 24 | -0.4px (-2.5%) | center |

### 2.2 Title row 세부 (`134:3698`)
- layout: `flex gap-32 items-end justify-center w-full` — 하지만 L은 `shrink-0 whitespace-nowrap` (437px 자연폭), R은 `flex-1`로 남는 공간을 채움
- L이 2줄(`함께 만드는 내일,<br>ESPGN 고객센터입니다`), R은 46px 높이(2줄). items-end라서 **두 텍스트 베이스라인이 아닌 하단 정렬**
- `<br aria-hidden>` 보존 필수

### 2.3 HatchedDivider (`134:3702`, 936×8)
- 공통 컴포넌트 `HatchedDivider` (label 미지정) — 932×10 SVG. Figma는 936×8이나, 기존 공통 컴포넌트 재사용 시 차이 0.5%미만, AboutMission/AboutValues 선례 존재 → **그대로 재사용**
- 배치: Body wrap이 `flex-col gap-20 items-center w-full`이므로 divider는 w-full 스트레치. HatchedDivider 내부 SVG는 932px 고정 폭 — 래퍼 div가 936 중앙정렬 + mx-auto
- 색상: L/R hatch `#97A29E`, center line `#B1B9B6` (기존 컴포넌트 내장)

### 2.4 Image slot (`269:1601`, 336×486)
- **실제 이미지 없음.** `134:3719 image 17` fill = `rgba(0,0,0,0.2)` placeholder 블록 only. Framelink로 다운로드해도 빈 회색 rounded rect.
- rounded: `32px` (border-radius)
- overflow-clip
- **처리 전략: CSS 단색 div** (`bg-[rgba(0,0,0,0.2)] w-[336px] h-[486px] rounded-[32px]`). baseline crop도 불필요 — Figma에도 실제 이미지가 들어있지 않음. baseline PNG 육안 확인으로 검증 완료.
- alt 텍스트 비움 (장식 placeholder)

### 2.5 Form fields (4개)

공통 패턴 (`Text Field_Label` instance, `134:3721~3724`):
```
<div> flex-col gap:8 items-start w-full   (래퍼)
  <label> text[14] text[#313c4c] tracking[-0.35px] leading[20] nowrap </label>
  <input-wrap> bg[#f3f4f5] border[1.25px solid #f3f4f5] rounded[12] px[16] py[12] h:48 flex items-center </input-wrap>
    placeholder text[15] text[#687685] tracking[-0.375px] leading[22]
```

| # | 노드 | Label | Placeholder | 필드 타입 | height |
|---|------|-------|-------------|-----------|--------|
| 1 | `134:3721` | 이름 | 이름을 입력해주세요. | input text | 48 |
| 2 | `134:3722` | 전화번호 | `‘-’를 제외하고 숫자만 입력해주세요.` | input tel (속성만, 동작 없음) | 48 |
| 3 | `134:3723` | 제목 | 제목을 입력해주세요. | input text | 48 |
| 4 | `134:3724` | 문의 내용 | 문의할 내용을 입력해주세요. | **textarea (3줄 공간)** | 전체 rows 3 → 높이 약 90px (총 wrapper 118, label 20 + gap 8 = 28 차감 → input-wrap 약 90) |

> placeholder #2의 따옴표는 Figma 원문 `‘`(U+2018), `’`(U+2019) 사용. 직선 아스키 `'` 아님 — 원문 유지.

### 2.6 Submit button (`269:1602`, 552×60)
- bg `#1d2623`, border `1px solid white`, rounded `16`, px `24`, py `12`
- label "Button Sample" (Figma 원문) — 사용자 결정: `"문의하기"` 변경? **원문 `Button Sample` 그대로 둘지, `"문의 남기기"` / `"전송"` 사용할지 plan 승인 게이트에서 질의 필요 (결정사항 3 — 사전 결정 없음)**
  - 잠정: Figma 원문 "Button Sample" 유지하면 baseline 일치성 100%. 실무상 의미 없는 문자라 추후 replaceable.

## 3. 에셋 목록 (Framelink download 필요성 검증)

| 요소 | 노드 | 처리 방식 | 동적 여부 | 비고 |
|------|------|-----------|----------|------|
| 좌측 이미지 placeholder | `134:3719` | **CSS 단색 div** (`bg-[rgba(0,0,0,0.2)]`) | 정적 | 실제 이미지 없음 — 다운로드 불요 |
| HatchedDivider | `134:3702` | **기존 공통 컴포넌트 재사용** (SVG 인라인) | 정적 | 다운로드 불요 |
| 나머지 | — | 텍스트/플렉스/박스만 | — | 에셋 0 |

**캔버스-에셋 일치 검증**: Figma 캔버스에서 이미지 슬롯이 회색 placeholder 그대로 보임(baseline PNG 육안 확인) → 코드상 `bg-[rgba(0,0,0,0.2)]` 재현과 일치. 다운로드 대상 에셋 0개.

## 4. 레이아웃 배치

- 섹션 루트(`134:3697`): `flex flex-col gap-[56px] items-start w-[936px] h-[694px]`
- Title row: `flex gap-[32px] items-end justify-center w-full` (높이 124, items-end)
  - L: `shrink-0 whitespace-nowrap` Bold 48px, 2줄
  - R: `flex-1` Regular 15px right-align
- Body wrap: `flex flex-col gap-[20px] items-center w-full`
  - HatchedDivider: `mx-auto` (932px, 936보다 4px 좁음 — 실질적으로 보이지 않음)
  - 2-col: `flex gap-[48px] items-center w-full`
    - Image: `w-[336px] h-[486px] rounded-[32px] bg-[rgba(0,0,0,0.2)] shrink-0`
    - Form: `flex-1 flex flex-col gap-[20px] items-start`
      - 4 FormInput
      - Submit button (w-full h-60)

## 5. transform / 특수 처리

- rotation 없음, skew 없음, translate/scale 없음 → **소수점 수치 관리 대상 무**
- letter-spacing 소수점(-1.92, -0.1125, -0.35, -0.375, -0.4)은 **그대로 Tailwind arbitrary로** (`tracking-[-1.92px]` 등). percent 대체 가능하나 원문 px 유지 권장

## 6. baseline 실측

- baseline PNG `contact-form.png` = **938×695** (file 명령). spec 936×694 대비 +1px씩. §2.6 실측 우선 규약에 따라 **capture ROI는 clip 936×694** (또는 baseline 정확히 맞추려면 938×695), preview 라우트는 spec 936×694로 렌더
- clip 파라미터 (페이지 전체 capture 기준, 캔버스 좌표): `--clip-x 492 --clip-y 180 --clip-w 936 --clip-h 694`
- **또는** preview 라우트(`/__preview/contact-form`) 자체 크기 936×694로 설정하고 page 전체 캡처 → clip 0,0,936,694. 이 경우 pixelmatch 측 baseline과 capture 둘 다 동일 해상도여야 함 → **baseline PNG가 938×695이므로 preview를 938×695로 렌더하면 G1 손실 최소.** plan 단계에서 선택 확정

## 7. 공통 컴포넌트 승격 판단 (Rule of Three)

| 후보 | 사용 횟수 | 판단 |
|------|----------|------|
| `FormInput` (라벨 + input/textarea) | 현 섹션 내 4회 | **로컬 유지** — 다른 폼 페이지 없음, 섹션 내부 `./FormInput.tsx`로 시작. 경진대회 CTA·자격검정 신청 등에서 재등장 시 `ui/FormInput.tsx`로 승격 |
| `PrimaryButton` | 현 섹션 내 1회 | **로컬 유지 (또는 인라인)** — 단일 사용. Rule of Three 미충족. 인라인 JSX 권장 |
| `HatchedDivider` | 기존 공통 (5회) | 그대로 재사용 |

## 8. 사전 결정 반영 (사용자 확정)

| 항목 | 결정 | 적용 |
|------|------|------|
| 타이틀 오타 | `ESPGN` → **`ESGPN`**으로 수정 | 코드에 `ESGPN 고객센터입니다` 렌더. baseline PNG는 `ESPGN`이라 G1에 한글 1글자 diff(P vs G) 발생 — 예상 diff <1% 추가 |
| 폼 동작 | 정적 UI만 | `<form onSubmit={(e) => e.preventDefault()}>` + `<button type="button">` (사용자는 한쪽 선택) |
| 이미지 업로드 필드 | 미추가 (디자인 그대로) | 4필드만 |

## 9. 리스크

1. **P→G 교체로 인한 G1 증가**: 한글 타이포 2번째 줄 3번째 글자만 차이. 48px 한 글자 면적 ≈ 48×48=2304px². 섹션 전체 938×695=651,910px 중 0.35%. **예상 G1 1~2% 이내 유지 가능**
2. **HatchedDivider 932 vs 부모 936**: 좌우 2px씩 빈 공간 발생 가능. baseline PNG 좌우 끝 해치 시작 위치 확인 필요 — 육안상 hatch가 완전히 endpoint까지 찍혀있지 않음 (약간 안쪽), 932 SVG로 충분. G1 영향 미미 (<0.2%)
3. **Title items-end 정렬**: L 124px, R 46px 모두 items-end이므로 R이 L 하단에 맞춰 내려옴. Figma의 y=78은 이 정렬의 계산 결과
4. **Textarea 높이**: wrapper 118 - label(20) - gap(8) = 90. input-wrap 내부 py-12 차감하면 content 66 → rows 3 적절
5. **button "Button Sample"**: 원문 유지 시 baseline 100% 일치. plan 승인 게이트에서 텍스트 변경 여부 질의

## 10. 단계 2 진입 체크리스트

- [x] 모든 텍스트·사이즈·색상 수치 확보
- [x] 에셋 0개 확인 (이미지 CSS 재현, divider SVG 인라인)
- [x] baseline 실측 938×695 기록
- [x] 공통 컴포넌트 재사용 결정 (HatchedDivider)
- [x] 로컬 컴포넌트 분리 결정 (FormInput)
- [x] 사전 결정(오타·정적·업로드) plan 반영 항목 정리
- [ ] plan 작성 후 사용자 승인 (단계 2 완료 게이트)
