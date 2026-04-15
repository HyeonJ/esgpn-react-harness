import { HatchedDivider } from "@/components/ui/HatchedDivider";
import { FormInput } from "./FormInput";

/**
 * ContactForm — /contact 페이지 contact-form 섹션.
 * research/contact-form.md, plan/contact-form.md 기반.
 * baseline: figma-screenshots/contact-form.png (938×695).
 *
 * 사용자 결정 반영:
 *  - "ESPGN" → "ESGPN" 오타 수정
 *  - 정적 UI (onSubmit preventDefault, button type="button")
 *  - 버튼 텍스트 "문의 남기기" (baseline "Button Sample" placeholder 교체)
 */
/**
 * 섹션 자기 정렬 책임 (CLAUDE.md Figma 절대 규칙):
 *   Figma wrapper `134:3696` 1920×1074, form 영역 (492, 180, 936, 694).
 *   즉 상단 180px + 하단 200px 수직 padding 내장.
 *   Preview/라우트 모두에서 Header 아래로 적절히 띄어야 함.
 */
export function ContactForm() {
  return (
    <section className="relative w-[936px] mx-auto flex flex-col gap-[56px] items-start bg-white pt-[180px] pb-[200px]">
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
            <FormInput
              label="전화번호"
              placeholder="‘-’를 제외하고 숫자만 입력해주세요."
              type="tel"
            />
            <FormInput label="제목" placeholder="제목을 입력해주세요." />
            <FormInput
              label="문의 내용"
              placeholder="문의할 내용을 입력해주세요."
              multiline
              rows={3}
            />

            {/* Submit (정적) */}
            <button
              type="button"
              className="w-full h-[60px] rounded-[16px] border border-solid border-white bg-[#1d2623] px-[24px] py-[12px] flex items-center justify-center font-semibold text-[16px] leading-[24px] tracking-[-0.4px] text-white"
            >
              문의 남기기
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
