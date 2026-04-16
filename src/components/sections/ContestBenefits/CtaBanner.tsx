import ctaBg from "@/assets/contest-benefits/cta-bg.png";

/**
 * CtaBanner — Benefits 섹션 하단 CTA (936×320, aside 시맨틱).
 *
 * v4 구조: aside + h3 + p + button 시맨틱. flex 전용.
 * 배경: #005C33 (status-badge-positive-700 토큰) + 도시 일러스트 이미지.
 *   Framelink export 시 이미지가 이미 녹색 톤 합성되어 있어 blend 불필요.
 * 버튼: Pretendard 700 18 / -2.44140625% letterSpacing, rounded-full pill, brand-700 텍스트.
 * Arrow: 인라인 SVG (lucide ArrowRight 스타일).
 */
export function CtaBanner() {
  return (
    <aside
      className="flex h-[320px] w-[936px] flex-col items-center justify-center gap-8 self-center overflow-hidden rounded-[20px] bg-[var(--color-status-badge-positive-700)] px-0 py-16"
      style={{
        backgroundImage: `url(${ctaBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
      }}
      aria-labelledby="contest-benefits-cta-title"
    >
      <div className="flex w-[454px] flex-col items-center gap-3">
        <h3
          id="contest-benefits-cta-title"
          className="text-center text-[32px] font-bold leading-[1.3] tracking-[-0.96px] text-white"
          style={{ fontFamily: "var(--font-family-pretendard)" }}
        >
          지금 바로 신청하세요
        </h3>
        <p
          className="text-center text-[16px] font-normal leading-[1.5] tracking-[-0.16px] text-white/60"
          style={{ fontFamily: "var(--font-family-pretendard)" }}
        >
          아이디어에서 실천으로, ESG 실천 아이디어 경진대회에 참여하세요.
        </p>
      </div>
      <button
        type="button"
        className="flex items-center gap-2 rounded-full bg-white px-8 py-5 text-[18px] font-bold leading-[1.5556] tracking-[-0.4395px] text-[var(--color-brand-700)]"
        style={{
          boxShadow: "0px 25px 50px -12px rgba(0,0,0,0.25)",
          fontFamily: "var(--font-family-pretendard)",
        }}
      >
        경진대회 참가하기
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      </button>
    </aside>
  );
}
