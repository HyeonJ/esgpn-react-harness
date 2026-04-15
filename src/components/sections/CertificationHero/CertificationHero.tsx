import bgImage from "@/assets/certification-hero/bg.png";

/**
 * CertificationHero — 자격검정 페이지 Hero (Figma 299:3861 + 299:4364 overlay).
 * 1920×633 (Hero 1920×827 중 Stats 194 제외 = 0~633).
 * Preview는 TopNav 미장착, 실제 /certification은 RootLayout이 TopNav 추가.
 * baseline은 full-page 0~633 crop (TopNav strip 포함) — preview와 0~88 영역 차이 ACCEPTED.
 *
 * Rectangle bg + HTML 오버레이 (텍스트/CTA). 텍스트는 G6 충족 위해 HTML 유지.
 */
export function CertificationHero() {
  return (
    <section
      aria-labelledby="certification-hero-heading"
      className="relative mx-auto h-[633px] max-w-[1920px] w-full overflow-hidden"
    >
      {/* Rectangle bg (1920×827, inset-0 → 0~633 visible) */}
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 block h-[827px] w-[1920px] max-w-none"
      />
      {/* 오버레이 원형 (956×956 at left=463, top=-300 in Hero coords) */}
      <div
        className="absolute flex flex-col items-center justify-end gap-[48px] rounded-full pb-[120px]"
        style={{
          left: 463,
          top: -300,
          width: 956,
          height: 956,
          backgroundColor: "rgba(0, 0, 0, 0.08)",
        }}
      >
        <div className="flex flex-col items-center gap-[32px] text-center">
          <h1
            id="certification-hero-heading"
            className="whitespace-nowrap font-bold text-white"
            style={{
              fontFamily: '"Gong Gothic", sans-serif',
              fontSize: 64,
              lineHeight: 1.3,
              letterSpacing: -2.56,
            }}
          >
            ESG 마인드 자격검정
          </h1>
          <div className="flex flex-col items-center gap-[8px]">
            <p
              style={{
                fontFamily: '"Gong Gothic", sans-serif',
                fontWeight: 500,
                fontSize: 24,
                lineHeight: 1.4,
                letterSpacing: -0.36,
                color: "#caeb69",
              }}
            >
              관행에서 실천의 자격검정(단급 과정) 안내
            </p>
            <p
              className="whitespace-nowrap font-medium text-white"
              style={{ fontSize: 18, lineHeight: 1.4, letterSpacing: -0.27 }}
            >
              ESG를 실천할 수 있는 역량을 갖춘 인재를 양성하는 자격검정 프로그램
            </p>
          </div>
        </div>
        <button
          type="button"
          className="rounded-full border border-white bg-transparent p-[4px]"
        >
          <span
            className="inline-flex items-center justify-center rounded-full bg-white px-[32px] py-[16px] font-semibold text-[#0c3b0e]"
            style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: -0.16 }}
          >
            ESG마인드 자격검정 신청하기
          </span>
        </button>
      </div>
    </section>
  );
}
