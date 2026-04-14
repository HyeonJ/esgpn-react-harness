# research/contact.md — 고객센터 (`/contact`) 페이지 리서치

> Phase 2 페이지 분해 리서치. Figma Node `134:3691`, 페이지 사이즈 1920×1782, 라우트 `/contact`.

## 1. Figma 노드 트리 구조

`get_metadata` 결과 — **flatten PNG가 아니다. 실제 노드 구조가 살아있다.**

```
134:3691  ESPGN_ESG 마인드 자격검정       1920x1782  (page frame — 이름 오표기, 실제는 고객센터)
├─ 134:3692  CK_cb046025150_l 1          3024x1143  hidden=true   (참고 에셋, 무시)
├─ 134:3693  CK_td04970008100_l 1        1920x1689  hidden=true   (참고 에셋, 무시)
├─ 134:3694  Frame 2042061998            153x20     hidden=true   (Educational Program 텍스트, 무시)
├─ 299:2572  Frame 2043686155            1920x1782  (메인 컨테이너)
│  ├─ 134:3696  Frame 2043686119         1920x1074  y=0           (폼 영역 캔버스)
│  │  └─ 134:3697  Frame 2043686124      936x694   x=492 y=180   (floating centered 폼 컨테이너)
│  │     ├─ 134:3698  Frame 2043686120   936x124                  (타이틀 2-column)
│  │     │  ├─ 134:3699  Title 좌        437x124                  "함께 만드는 내일,\n ESPGN 고객센터입니다" (48px 700)
│  │     │  └─ 134:3700  Title 우 서브    467x46  x=469 y=78     "도움이 필요하신 모든 순간..." (15px 400, RIGHT align)
│  │     └─ 134:3701  Frame 2043686121   936x514  y=180           (본문 래퍼)
│  │        ├─ 134:3702  Frame 2043685981 936x8                   (HatchedDivider — 끝 hatch + 중앙 line + 끝 hatch)
│  │        └─ 134:3718  Frame 2043686126 936x486 y=28            (Image + Form 2-column)
│  │           ├─ 269:1601  Frame 16     336x486                  (좌측 이미지, rounded)
│  │           └─ 134:3720  Frame 2043686125 552x486 x=384        (폼 필드 스택)
│  │              ├─ 134:3721 Text Field_Label  552x76  y=0       (이름)
│  │              ├─ 134:3722 Text Field_Label  552x76  y=96      (전화)
│  │              ├─ 134:3723 Text Field_Label  552x76  y=192     (제목)
│  │              ├─ 134:3724 Text Field_Label  552x118 y=288     (내용, textarea)
│  │              └─ 269:1602 Black Default (Button) 552x60 y=426 (제출 버튼)
│  └─ 299:2447  Footer (instance)        1920x708  y=1074         (공통 컴포넌트)
└─ 134:3762  Frame 2                     1920x88    (Top Nav 래퍼)
   └─ 134:3763  Top Nav (instance)       1416x72  x=252 y=16
```

**핵심 발견:**
- About 페이지와 달리 **모든 주요 요소가 노드로 분리**되어 있다. `get_design_context(134:3697)`로 텍스트·폰트·색·간격 획득 가능.
- 페이지 본문은 사실상 **단일 "Contact Form" 섹션** 하나. 제목 블록·Divider·이미지·폼이 한 컨테이너(`134:3697`)에 묶여 있고, 이를 분리하면 오히려 컴포넌트 맥락이 깨진다.
- 폼 필드는 4개 `Text Field_Label` instance + 1개 `Black Default` Button instance. Figma 컴포넌트 라이브러리에서 재사용되는 디자인 시스템 토큰으로 보인다. Phase 3에서 `get_design_context(134:3721)` 등으로 스타일 추출 → 공통 `FormInput`/`PrimaryButton` 로 승격할지 사용자 판단 필요.
- HatchedDivider는 이미 공통 컴포넌트로 존재 (`HatchedDivider`). 좌우 끝 hatch 6개 + 중앙 라인 패턴과 정확히 일치하므로 **재사용**.

## 2. flatten PNG 여부

**flatten PNG 아님.** `134:3697` 자식 노드 트리가 완전히 살아있어 섹션별 `get_design_context` 가능. About 페이지 같은 [A] HTML 재구성 + baseline crop 전략은 불필요. 표준 Phase 3 섹션 7단계 절차를 그대로 적용한다.

## 3. 섹션 분할 결과

**단일 섹션으로 확정.** 페이지 본문이 936×694 floating 컨테이너 하나로 완결되며, 하위 요소들은 서로 레이아웃·간격 의존성이 강해 분리하면 G1 정렬 재현이 어려워진다. 예상 토큰도 12K 이하.

| # | 섹션명 | Node ID | 예상 토큰 | Figma 사이즈 | 캔버스 좌표 (x,y,w,h) | 비고 |
|---|--------|---------|-----------|--------------|-----------------------|------|
| 1 | contact-form | `134:3697` | ~7K | 936×694 | (492, 180, 936, 694) | **floating centered.** 제목 2-column + HatchedDivider + 이미지(좌 336×486) + 폼 필드 4개 + 버튼. 래퍼 영역 `134:3696` 1920×1074에 centering |
| — | Footer | `299:2447` | — | 1920×708 | (0, 1074, 1920, 708) | 이미 구현 완료 — 재사용 |
| — | TopNav | `134:3763` | — | 1416×72 | (252, 16, 1416, 72) | 이미 구현 완료 — 재사용 (RootLayout) |

> 폼 컨테이너는 부모 `134:3696`(1920×1074)의 중앙에 위치. 상단 여백 180px 포함. G1 측정 시 `contact-form.png`(936×694) 베이스라인을 직접 비교하거나, 페이지 전체 캡처 시 `--clip-x 492 --clip-y 180 --clip-width 936 --clip-height 694` 사용.

## 4. 사전 추정과의 차이

`docs/figma-project-context.md` §4.9 예상과 비교:

| 항목 | 사전 추정 | 실측 |
|------|-----------|------|
| 섹션 개수 | Title + Form + Footer = 2 본문 섹션 | **1 본문 섹션** (Title·Divider·Image·Form이 한 컨테이너에 묶임) |
| 이미지 업로드 필드 | 있음 (문맥상) | **없음** — 4필드(이름·전화·제목·내용) + 제출 버튼만. `docs/figma-project-context.md` §7 "폼 + 이미지 업로드" 주석은 재확인 필요 |
| 폼 좌측 이미지 | 추정 없음 | **336×486 rounded image 존재** (폼과 2-column 배치) |
| 제목 레이아웃 | 중앙 1줄 가정 | **좌우 2-column** (좌: 48px 볼드 메인 타이틀, 우: 15px 서브 카피, RIGHT align) |

**차이 요약:** 이미지 업로드는 없고 대신 좌측 장식 이미지가 있음. 제목이 2-column이라 레이아웃 난이도가 한 단계 올라감.

## 5. 신규 공통 컴포넌트 후보

§5 공통 카탈로그와 대조:

| 후보 | 재사용 가능성 | 비고 |
|------|-------------|------|
| `FormInput` (Text Field_Label) | ○ | 4개 인스턴스가 모두 같은 Figma 컴포넌트. 다른 페이지(회원가입/로그인/신청)에도 재등장 가능성 높음. 그러나 **현재 프로젝트에서 다른 폼 페이지가 없으므로 섹션 로컬 컴포넌트로 시작하고 추후 승격 검토 권장** |
| `PrimaryButton` (Black Default) | △ | 검정 배경 버튼. 메인페이지 CTA·자격검정 신청 버튼과 시각 유사할 수 있음 — 향후 페이지 구현 시 병합 검토 |
| `ContactCard` | ✗ | 사전 추정에 있었으나 **실측 결과 존재하지 않음** (연락처/전화/주소 카드 없음) |
| `HatchedDivider` | 기존 | label? 지원 확장판이 이미 있음. 그대로 재사용 |

**최종 권장:** 섹션 단계에서는 `FormInput`·`PrimaryButton`을 섹션 내부 파일로 구현하고, Phase 3 단계 2 plan에서 사용자가 "공통 컴포넌트로 승격 여부"를 결정하도록 승인 게이트에 명시. 성급한 추상화는 회귀 위험.

## 6. 리스크 메모

### 6.1 페이지 고유 리스크

1. **폼 검증·제출 로직 범위 확정 필요:** Figma는 시각 디자인만 제공. React Hook Form/Zod 연결, API endpoint, 유효성 에러 스타일, submit 후 상태(success/error toast)는 디자이너가 주지 않음. **섹션 단계 2 plan에서 "정적 폼만 구현 vs. 동작까지 구현"을 사용자 결정 필요.** 기본은 정적(시각 재현) 권장.
2. **이미지 업로드 필드 부재:** §7 리스크 테이블에 "폼 + 이미지 업로드"로 명시돼 있으나 실제 디자인에는 없음. 사용자가 추가를 원하는지 확인 필요 (Figma 누락인지, 스펙 축소인지).
3. **좌측 장식 이미지 에셋:** `269:1601 Frame 16 / 134:3719 image 17`. Framelink `download_figma_images`로 추출해야 하며 `imageRef`가 필요할 수 있음. 단계 1에서 `get_design_context`로 fill 확인 후 다운로드.
4. **타이틀 타이포 오표기:** Figma 원본 텍스트가 `"ESPGN 고객센터"` (ESGPN 아닌 ESPGN). 디자이너 오타로 추정되나 **임의 수정 금지** — 사용자에게 확정 필요. 단계 2 plan에서 질의.
5. **페이지 프레임 이름 오표기:** `134:3691 ESPGN_ESG 마인드 자격검정` — 실제는 고객센터 페이지. Figma 레이어 이름 오류, 기능상 무관하지만 기록.
6. **페이지 노드에 hidden 참고 이미지 3개 존재** (`134:3692/3693/3694`). `get_design_context` 잘못 호출 시 숨겨진 큰 배경이 렌더 결과에 끼어들 수 있음 — 섹션 노드 `134:3697` 단위로만 호출.

### 6.2 §7 테이블 공통 리스크

- `모든 페이지` — 1920 기준, 1440/768/375 반응형 적응 디자인 없음. 폼 2-column이 좁은 뷰포트에서 깨지기 쉬움. 기본은 데스크탑 구현, 반응형은 사용자 확인 후 별도 단계.
- `고객센터` (§7) — 기존 메모 "폼 + 이미지 업로드, `docs/frontend.md`의 폼 4가지 상태 처리" → 이미지 업로드는 실제 없음, 상태 처리는 단계 2 결정사항.

## 7. 베이스라인 스크린샷 확보 (Framelink `download_figma_images`)

모두 `pngScale: 1`로 저장. `file` 명령 실측 결과:

- [x] `figma-screenshots/contact-full.png` — 1920×1782, RGBA (페이지 전체. spec과 일치)
- [x] `figma-screenshots/contact-form.png` — **938×695**, RGBA (spec 936×694보다 1px씩 큼. Framelink 렌더러 여백 — §2.6 실측 우선)
- [x] `figma-screenshots/contact-heading.png` — 936×124, RGBA (타이틀 2-column 블록, 참고용)
- [x] `figma-screenshots/contact-form-body.png` — **937×487**, RGBA (spec 936×486보다 1px 큼)

**섹션 구현 시 G1 baseline:** `contact-form.png`(938×695)를 기준으로 삼고, capture 캔버스도 동일 ROI로 정렬. spec 936×694와의 1px 오차는 허용 범위 내이나 plan 치수표에는 spec 값(936×694)을 적고 실측 차이를 비고에 명시.

## 8. Phase 3 진입 전 체크리스트

- [ ] 사용자: 공통 컴포넌트 승격 여부 (`FormInput`/`PrimaryButton` — 섹션 로컬 vs. 공통)
- [ ] 사용자: 폼 동작 범위 (정적 시각 재현만 vs. React Hook Form + 제출 로직)
- [ ] 사용자: 이미지 업로드 필드 추가 여부 (Figma 누락인지 스펙 축소인지)
- [ ] 사용자: 타이틀 "ESPGN" 원문 유지 vs. "ESGPN"으로 수정
- [ ] 사용자: 반응형 범위 (데스크탑만 vs. 1440/768/375 포함)
- [ ] implementer: `134:3697`로 `get_design_context` 호출 (페이지 `134:3691`로 호출 금지)
- [ ] implementer: 좌측 이미지 `134:3719`의 `imageRef` 확인 후 Framelink 다운로드
