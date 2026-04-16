import ctaCity from "@/assets/certification-flatten-bottom/cta-city.webp";
import ctaArrow from "@/assets/certification-flatten-bottom/cta-arrow.svg";

/**
 * CtaBlock — 자격검정 하단 CTA card (1416×320 rounded 20).
 *
 * v4 구조: aside + h2 + p + a 시맨틱. absolute 2개 (bg + city image).
 * 배경: #005c33 (status-badge-positive-700 토큰) + city 이미지 mix-blend-luminosity.
 *
 * NOTE: 버튼 텍스트 "경진대회 참가하기"는 Figma 디자인의 placeholder 가능성.
 * 자격검정 페이지 CTA인데 경진대회로 유도되는 이상한 조합이지만, 원본 카피 유지.
 */
export function CtaBlock() {
  return (
    <aside
      aria-labelledby="cfb-cta-title"
      className="relative flex h-[320px] w-full flex-col items-center justify-center gap-8 overflow-hidden rounded-[20px] py-16"
    >
      <div
        aria-hidden
        className="absolute inset-0 rounded-[20px] bg-[var(--color-status-badge-positive-700)]"
      />
      <div aria-hidden className="absolute inset-0 overflow-hidden rounded-[20px] mix-blend-luminosity">
        <img
          src={ctaCity}
          alt=""
          aria-hidden
          className="absolute left-[-25.66%] top-[-32.5%] block h-[294.15%] w-[132.39%] max-w-none"
        />
      </div>
      <div className="relative flex w-[454px] flex-col items-center gap-3 text-center">
        <h2
          id="cfb-cta-title"
          className="w-full text-[32px] font-bold leading-[1.3] tracking-[-0.96px] text-white"
          style={{ fontFamily: "var(--font-family-pretendard)" }}
        >
          지금 바로 신청하세요
        </h2>
        <p
          className="w-full text-[16px] font-normal leading-[1.5] tracking-[-0.16px] text-white/60"
          style={{ fontFamily: "var(--font-family-pretendard)" }}
        >
          ESG 실천의 첫 걸음, ESG마인드 자격검정에 도전하세요.
        </p>
      </div>
      <a
        href="/contest"
        className="relative flex items-center gap-2 rounded-full bg-white px-8 py-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
      >
        <span
          className="text-[18px] font-bold leading-[28px] tracking-[-0.44px] text-brand-700"
          style={{ fontFamily: "var(--font-family-pretendard)" }}
        >
          경진대회 참가하기
        </span>
        <img src={ctaArrow} alt="" aria-hidden className="block size-6" />
      </a>
    </aside>
  );
}
