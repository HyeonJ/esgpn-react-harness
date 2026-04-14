# plan/contact-form.md — `/contact` contact-form 섹션 구현 계획

> research/contact-form.md 기반. 사용자 사전 결정 3건 반영 완료.
> baseline `figma-screenshots/contact-form.png` (938×695). clip (492,180,936,694).

## 1. 산출 파일

```
src/components/sections/ContactForm/
  ├─ ContactForm.tsx           (섹션 루트 — 936×694 레이아웃 + 4 필드 배치)
  ├─ FormInput.tsx             (라벨 + input/textarea, 섹션 로컬)
  └─ index.ts                  (named export)
src/routes/
  └─ ContactFormPreview.tsx    (/__preview/contact-form 격리 라우트, 938×695)
src/App.tsx                    (Route 한 줄 추가)
```

- `PrimaryButton`은 **인라인 JSX** (1회 사용, Rule of Three 미충족)
- 에셋 파일 **0개** (이미지 CSS 재현, divider SVG 인라인 in 공통 컴포넌트)
- 새 npm 패키지 **없음**

## 2. 컴포넌트 시그니처

### ContactForm.tsx (props 없음)

```tsx
export function ContactForm() {
  return (
    <section className="relative w-[936px] h-[694px] mx-auto flex flex-col gap-[56px] items-start bg-white">
      {/* Title row 936×124 flex gap-32 items-end */}
      <div className="flex gap-[32px] items-end justify-center w-full">
        <h1 className="shrink-0 whitespace-nowrap font-bold text-[48px] leading-[1.3] tracking-[-1.92px] text-black m-0">
          함께 만드는 내일,
          <br aria-hidden />
          ESGPN 고객센터입니다
        </h1>
        <p className="flex-1 font-normal text-[15px] leading-[1.5] tracking-[-0.1125px] text-right text-black m-0">
          도움이 필요하신 모든 순간, 저희가 함께하겠습니다.
          <br aria-hidden />
          문의 사항을 남겨주시면 확인 후 빠른 시일 내에 연락드리겠습니다.
        </p>
      </div>

      {/* Body wrap 936×514 gap-20 items-center */}
      <div className="flex flex-col gap-[20px] items-center w-full">
        <HatchedDivider className="mx-auto" />

        {/* 2-col 936×486 gap-48 items-center */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex gap-[48px] items-center w-full"
        >
          {/* 좌측 이미지 placeholder 336×486 rounded-32 */}
          <div
            aria-hidden
            className="shrink-0 w-[336px] h-[486px] rounded-[32px] bg-[rgba(0,0,0,0.2)]"
          />

          {/* 폼 필드 스택 flex-1 gap-20 */}
          <div className="flex-1 flex flex-col gap-[20px] items-start">
            <FormInput label="이름" placeholder="이름을 입력해주세요." />
            <FormInput label="전화번호" placeholder="‘-’를 제외하고 숫자만 입력해주세요." type="tel" />
            <FormInput label="제목" placeholder="제목을 입력해주세요." />
            <FormInput label="문의 내용" placeholder="문의할 내용을 입력해주세요." multiline rows={3} />

            {/* Submit (정적) */}
            <button
              type="button"
              className="w-full h-[60px] rounded-[16px] border border-solid border-white bg-[#1d2623] px-[24px] py-[12px] flex items-center justify-center font-semibold text-[16px] leading-[24px] tracking-[-0.4px] text-white"
            >
              Button Sample
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
```

### FormInput.tsx

```tsx
type Props = {
  label: string;
  placeholder: string;
  type?: "text" | "tel" | "email";
  multiline?: boolean;
  rows?: number;
};

export function FormInput({ label, placeholder, type = "text", multiline, rows = 3 }: Props) {
  const inputId = `ci-${label}`;
  const wrapperCls =
    "bg-[#f3f4f5] border-[1.25px] border-solid border-[#f3f4f5] rounded-[12px] " +
    "px-[16px] py-[12px] w-full flex items-center gap-[8px] overflow-hidden";
  const fieldCls =
    "flex-1 bg-transparent border-0 outline-none font-normal text-[15px] leading-[22px] " +
    "tracking-[-0.375px] text-[#687685] placeholder:text-[#687685] resize-none";

  return (
    <div className="flex flex-col gap-[8px] items-start w-full">
      <label
        htmlFor={inputId}
        className="font-normal text-[14px] leading-[20px] tracking-[-0.35px] text-[#313c4c] whitespace-nowrap"
      >
        {label}
      </label>
      <div className={wrapperCls} style={multiline ? undefined : { height: 48 }}>
        {multiline ? (
          <textarea id={inputId} placeholder={placeholder} rows={rows} className={fieldCls} />
        ) : (
          <input id={inputId} type={type} placeholder={placeholder} className={fieldCls} />
        )}
      </div>
    </div>
  );
}
```

- `id`/`htmlFor` 연결로 접근성 확보
- placeholder 색과 본문 색이 동일(#687685) — 사용자가 입력해도 같은 색. design spec 그대로 (G4 요구 충족)
- `resize-none`으로 textarea 크기 고정 (G1 안정)

## 3. 레이아웃 결정

- **섹션 루트 크기**: `w-[936px] h-[694px]` (spec). baseline 938×695 대비 -2/-1 차. **preview 라우트**에서 wrapper `w-[938px] h-[695px]`로 렌더하여 G1 baseline과 동일 해상도 맞춤
- **clip 파라미터**: preview 라우트가 이미 938×695 isolated → page 전체 캡처 후 `--clip-x 0 --clip-y 0 --clip-w 938 --clip-h 695` (사실상 clip 불필요, `compare-section.sh` 그대로 사용 가능). **단, `compare-section.sh`가 풀폭 섹션용이면 `tests/visual/run.ts`에 `--clip-*` 인자로 호출**
- 최종 선택: **preview 938×695 + clip 없이 풀 캡처 비교** (AboutMission과 동일 패턴). `scripts/compare-section.sh contact-form`

## 4. 정적 UI 명시

- `<form onSubmit={(e) => e.preventDefault()}>` — 제출 시 페이지 리로드 방지. API 호출 없음
- 버튼 `type="button"` (form submit trigger 아님)
- 상태 관리 없음 (uncontrolled input)
- onChange 핸들러 없음

## 5. 4 게이트 예상 측정

| 게이트 | 예상값 | 근거 |
|--------|--------|------|
| G1 시각 diff | **1.5~3.0%** | 오타 수정(ESPGN→ESGPN) 1글자 48px 차이 = 섹션 면적의 ~0.35%. 폰트 렌더·anti-aliasing·letter-spacing 차이 약 1% 추가. HatchedDivider 위치 미세 차 <0.2%. 총 2% 내외 예상 |
| G2 치수 | PASS | 모든 값이 spec 일치 (48 font, 16/24 padding, 48 height, 60 height 등) |
| G3 에셋 | PASS (공백) | 에셋 파일 0개. 회색 placeholder는 CSS div → `naturalWidth` 체크 대상 없음 |
| G4 색상 | PASS | `#1d2623`, `#f3f4f5`, `#313c4c`, `#687685`, `rgba(0,0,0,0.2)` 모두 Figma 토큰 hex 정확 반영 |

**G1 <5% 통과 신뢰도 높음.** 1회차 PASS 예상.

## 6. 측정 스크립트

```bash
# Preview 기동 (vite dev 서버)
npm run dev

# G1 비교 (AboutMission 패턴)
bash scripts/compare-section.sh contact-form
# baseline: figma-screenshots/contact-form.png (938×695)
# capture: /__preview/contact-form 풀 캡처 (preview 컨테이너 938×695)
```

clip 필요 시 fallback:
```bash
npx tsx tests/visual/run.ts \
  --section contact-form \
  --url http://localhost:5173/__preview/contact-form \
  --baseline figma-screenshots/contact-form.png
```

## 7. 단계별 작업 체크리스트

- [ ] 단계 3 (에셋): 에셋 0개, 스킵 가능. `src/assets/contact-form/` 디렉터리 생성 불필요
- [ ] 단계 4 (구현):
  - [ ] `src/components/sections/ContactForm/FormInput.tsx` 작성
  - [ ] `src/components/sections/ContactForm/ContactForm.tsx` 작성
  - [ ] `src/components/sections/ContactForm/index.ts` 작성 (named export)
  - [ ] `src/routes/ContactFormPreview.tsx` 작성 (938×695 wrapper)
  - [ ] `src/App.tsx` — `/__preview/contact-form` Route 추가
  - [ ] 빌드/타입체크 통과
- [ ] 단계 5 (측정): `compare-section.sh contact-form` + 4 게이트 수치 기록
- [ ] 단계 5 육안 semantic 검증: baseline/capture/diff Read로 비교 (방향·swap·텍스트 줄바꿈 등)
- [ ] 단계 6 (필요 시): 3회 이내 수정
- [ ] 단계 7 (커밋): `feat(section): contact-contact-form 구현 (diff X.X%)`

## 8. 리스크 대응

| 리스크 | 대응 |
|--------|------|
| P→G 오타 교체로 G1 >5% 급등 | 예상 <3%. 만약 >5%면 baseline을 `ESGPN` 버전으로 재export (Figma에서 텍스트 수정 불가 시 사용자에게 보고) |
| HatchedDivider 폭 932 vs 936 | 육안 확인 결과 baseline도 끝까지 닿지 않음 → 현 932 유지. 문제 발생 시 936 확장 SVG 별도 변형 추가 |
| textarea 높이 차이 | rows=3 기본. capture 후 baseline과 diff 영역 확인. height=90 명시 대안 |
| Figma Button Sample 텍스트 의미 없음 | baseline 일치 위해 원문 유지. 사용자가 `문의하기` 등으로 변경 지시 시 G1 재측정 (+1~2% 예상) |

## 9. 단계 2 승인 게이트 질의

단계 3 진입 전 사용자 확정 필요:

1. **버튼 텍스트**: Figma 원문 `"Button Sample"` 유지 (baseline 일치)? 또는 `"문의 남기기"` / `"전송"` 등 실무 텍스트로 교체 (G1 +1~2%p 증가 감수)?
2. **측정 스크립트**: `compare-section.sh contact-form` 풀폭 패턴 사용 OK? 또는 `--clip-*` 인자 명시적 clip 비교 선호?

기본값(별도 지시 없을 시): **"Button Sample" 유지, compare-section.sh 풀폭**.

---

## 10. 측정 결과

### 회차 1 — 1차 캡처 (1920 viewport full-page)
- DIFF 57.08% — 원인: run.ts 기본 viewport 1920인데 preview wrapper는 938 mx-auto → 풀폭 캡처에서 배경 여백이 baseline 938과 불일치. **clip 파라미터 필요** (섹션 구현 오류 아님, 측정 스크립트 설정 문제)

### 회차 2 — clip 적용
- 명령: `bash scripts/compare-section.sh contact-form --clip-x 491 --clip-y 0 --clip-w 938 --clip-h 695`
- capture 파일: `tests/visual/captures/contact-form.png` (938×695)

| 게이트 | 결과 | 수치 |
|--------|------|------|
| **G1 시각 diff** | **PASS** | **4.01%** (26132/651910px, <5% 임계) |
| **G2 치수** | **PASS** | h1 font-size 48px, line-height 62.4px, letter-spacing -1.92px / p font 15px, lh 22.5px, letter -0.1125px / label 14/20/-0.35 / input 15/22/-0.375 / button 16/24/-0.4 / section 936×694 / image placeholder 336×486 rounded 32px / input wrapper h:48, textarea h:90(wrapper) / button w:552 h:60 rounded:16 padding 12px/24px — 모두 spec 정확 일치 (±0) |
| **G3 에셋** | **PASS (공백)** | `imgs: []` (에셋 파일 0개, CSS div placeholder, SVG 인라인 divider) |
| **G4 색상** | **PASS** | button bg `rgb(29,38,35)` = #1d2623 ✅ / label color `rgb(49,60,76)` = #313c4c ✅ / placeholder color `rgb(104,118,133)` = #687685 ✅ / image placeholder bg `rgba(0,0,0,0.2)` ✅ / section bg white ✅ |

### 육안 semantic 검증 (docs §6.4)
baseline/capture/diff 3종 Read로 육안 비교:
- 제목 2-column 구조 (좌 48px Bold / 우 15px right-align): PASS
- 오타 수정 "ESPGN" → "ESGPN" 적용 확인: PASS
- HatchedDivider 좌우 해치 + 중앙 실선: PASS (동일 위치)
- 좌측 회색 placeholder rounded: PASS (336×486, rounded-32)
- 4 폼 필드 라벨·placeholder·border·radius·padding: PASS
- 제출 버튼 위치·크기·텍스트 변경 "Button Sample" → "문의 남기기": PASS

semantic 오류 0건 (방향 반전 / swap / 색 반전 / 줄바꿈 오류 없음). **육안 PASS**.

### 회차 요약
| 회차 | G1 diff | G2 | G3 | G4 | 육안 | 메모 |
|------|---------|----|----|----|------|------|
| 1 | 57.08% | — | — | — | — | viewport 1920 fullPage로 측정 스크립트 호출 오류 (clip 인자 누락) |
| 2 | **4.01%** | PASS | PASS | PASS | PASS | clip 491/0/938/695 적용, 모든 게이트 + 육안 통과 |

### 버튼 텍스트 변경 영향
사용자 결정 "Button Sample" → "문의 남기기" 교체가 G1 diff에 기여한 부분은 약 +0.3%p 추정 (버튼 영역 552×60=33120px 중 텍스트 영역 약 200×30=6000px, 섹션 전체 651910px 기준 0.92% 이내에서 텍스트 픽셀 절반 가량이 달라짐). 오타 수정 "ESPGN"→"ESGPN" 1글자 교체도 유사 수준 +0.5%p. 나머지 ~3.2%p는 폰트 렌더링·서브픽셀 anti-aliasing 차이 (Figma export vs Chromium).
