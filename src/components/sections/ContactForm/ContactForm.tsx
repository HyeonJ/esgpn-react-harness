import { HatchedDivider } from "@/components/ui/HatchedDivider";
import { FormInput } from "./FormInput";

/**
 * ContactForm — /contact 페이지 본문 섹션 (Figma 134:3697, 936×694).
 *
 * 구조:
 *   - 제목 2-column (좌: 48/Bold main title, 우: 15/Regular right-align sub)
 *   - HatchedDivider (공통 컴포넌트 재사용)
 *   - 2-column body (좌: 336×486 rounded-32 placeholder / 우: 4 필드 + 제출 버튼)
 *
 * 시맨틱: `<section>` + `<form onSubmit prevent>` + `<label htmlFor>` + `<button type="submit">`.
 * Figma 오타 "ESPGN" → "ESGPN" 교정 (브랜드 일관성, gallery-title 선례 답습).
 * 버튼 텍스트 "Button Sample" → "문의 남기기" 교정 (사용자 결정, plan §9).
 *
 * 정적 폼: onSubmit preventDefault만, 백엔드 연결 없음. 백엔드 과제 범위 밖.
 * 좌측 이미지는 CSS placeholder(#000 20%) — 에셋 파일 0개 (plan §1).
 */
export function ContactForm() {
  return (
    <section
      aria-labelledby="contact-form-heading"
      className="relative w-[936px] h-[694px] mx-auto flex flex-col gap-[56px] items-start bg-white"
    >
      {/* 제목 2-column (936×124, items-end justify-center gap-32) */}
      <div className="flex gap-[32px] items-end justify-center not-italic w-full text-black">
        <h1
          id="contact-form-heading"
          className="shrink-0 whitespace-nowrap font-bold text-[48px] leading-[1.3] tracking-[-1.92px] m-0"
          style={{ fontFamily: "var(--font-family-pretendard)" }}
        >
          함께 만드는 내일,
          <br aria-hidden="true" />
          ESGPN 고객센터입니다
        </h1>
        <p
          className="flex-1 font-normal text-[15px] leading-[1.5] tracking-[-0.1125px] text-right m-0"
          style={{ fontFamily: "var(--font-family-pretendard)" }}
        >
          도움이 필요하신 모든 순간, 저희가 함께하겠습니다.
          <br aria-hidden="true" />
          문의 사항을 남겨주시면 확인 후 빠른 시일 내에 연락드리겠습니다.
        </p>
      </div>

      {/* 본문 래퍼 (936×514, gap-20 items-center) */}
      <div className="flex flex-col gap-[20px] items-center justify-center w-full">
        <HatchedDivider className="mx-auto" />

        {/* 2-col body (936×486, gap-48 items-center) */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex gap-[48px] items-center w-full"
          aria-label="고객센터 문의 양식"
        >
          {/* 좌측 이미지 placeholder 336×486 rounded-32 */}
          <div
            aria-hidden="true"
            className="shrink-0 w-[336px] h-[486px] rounded-[32px] bg-[rgba(0,0,0,0.2)]"
          />

          {/* 우측 폼 필드 스택 (flex-1, gap-20) */}
          <fieldset className="flex-1 flex flex-col gap-[20px] items-start border-0 p-0 m-0 min-w-0">
            <legend className="sr-only">문의 정보 입력</legend>
            <FormInput
              label="이름"
              name="name"
              placeholder="이름을 입력해주세요."
              required
            />
            <FormInput
              label="전화번호"
              name="tel"
              placeholder="‘-’를 제외하고 숫자만 입력해주세요."
              type="tel"
              required
            />
            <FormInput
              label="제목"
              name="subject"
              placeholder="제목을 입력해주세요."
              required
            />
            <FormInput
              label="문의 내용"
              name="message"
              placeholder="문의할 내용을 입력해주세요."
              multiline
              rows={3}
              required
            />

            <button
              type="submit"
              className="w-full h-[60px] rounded-[16px] border border-solid border-white bg-[#1d2623] px-[24px] py-[12px] flex items-center justify-center font-semibold text-[16px] leading-[24px] tracking-[-0.4px] text-white hover:bg-[#2a3530] transition-colors"
              style={{ fontFamily: "var(--font-family-pretendard)" }}
            >
              문의 남기기
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  );
}
