import bgImage from "@/assets/certification-hero/bg.png";

/**
 * Certification Hero — /certification 페이지 최상단.
 * Figma nodes: 299:3861 (raster bg Rectangle, 1920×827) + 299:4364 (overlay group 956×956).
 *
 * 구조:
 *   - Root <section> 1920×827, relative + overflow-hidden (overlay가 top:-300으로 넘침)
 *   - Bg <img> absolute inset-0, object-cover
 *   - Overlay 원형 956×956 (bg rgba(0,0,0,0.08) = --color-black-opacity-200),
 *     absolute left:463 top:-300, rounded-full, flex col items-center justify-end pb:120
 *   - 내부 flex col gap-12 (= 48px)
 *     - 텍스트 col gap-8 (= 32px)
 *       - h1 "ESG 마인드 자격검정" GongGothic Bold 64 white
 *       - 서브 col gap-2 (= 8px):
 *         - p "관행에서 실천의 자격검정(단급 과정) 안내" GongGothic Medium 24 #caeb69
 *         - p "ESG를 실천할 수 있는 역량을…" Pretendard Medium 18 white
 *     - CTA pill: ring + white bg + Pretendard SemiBold 16 brand-700
 *
 * v4 원칙:
 *   - 시맨틱: <section>, <h1>, <button>
 *   - 텍스트는 HTML (raster 아님)
 *   - absolute 2건만 사용 (bg img + 원형 오버레이) — 의미 분리 필요
 *   - 색상/radius/spacing → CSS 변수
 */
export function CertificationHero() {
  return (
    <section
      aria-labelledby="certification-hero-title"
      className="relative mx-auto h-[633px] w-full max-w-[1920px] overflow-hidden"
    >
      {/* 배경 raster (Rectangle 299:3861) — 1920×827 원본, 섹션은 633으로 상단만 보여줌 */}
      <img
        src={bgImage}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[827px] w-full max-w-none object-cover"
      />

      {/* Overlay 원형 (299:4365) — 956×956, left:463 top:-300, black opacity 200 */}
      <div
        className="absolute flex flex-col items-center justify-end rounded-full"
        style={{
          left: 463,
          top: -300,
          width: 956,
          height: 956,
          backgroundColor: "var(--color-black-opacity-200)",
          borderRadius: "var(--radius-full)",
          paddingBottom: 120,
        }}
      >
        {/* 내부 콘텐츠 (299:4366) — col gap 48 */}
        <div className="flex flex-col items-center gap-12">
          {/* 텍스트 블록 (299:4367) — col gap 32 */}
          <div className="flex w-full flex-col items-stretch gap-8 text-center">
            <h1
              id="certification-hero-title"
              className="whitespace-nowrap font-bold text-gray-000"
              style={{
                fontFamily: "var(--font-family-gong-gothic)",
                fontSize: 64,
                lineHeight: 1.3,
                letterSpacing: "-2.56px",
              }}
            >
              ESG 마인드 자격검정
            </h1>

            {/* 서브 그룹 (299:4369) — col gap 8 */}
            <div className="flex w-full flex-col items-center gap-2">
              <p
                className="font-medium"
                style={{
                  fontFamily: "var(--font-family-gong-gothic)",
                  fontSize: 24,
                  lineHeight: 1.4,
                  letterSpacing: "-0.36px",
                  color: "#CAEB69",
                }}
              >
                관행에서 실천의 자격검정(단급 과정) 안내
              </p>
              <p
                className="whitespace-nowrap text-gray-000"
                style={{
                  fontFamily: "var(--font-family-pretendard)",
                  fontSize: "var(--text-lg-18m-size)",
                  fontWeight: 500,
                  lineHeight: "var(--text-lg-18m-line-height)",
                  letterSpacing: "-0.27px",
                }}
              >
                ESG를 실천할 수 있는 역량을 갖춘 인재를 양성하는 자격검정 프로그램
              </p>
            </div>
          </div>

          {/* CTA — 흰 pill + 1px 흰 ring (299:4372 → 299:4373) */}
          <div
            className="inline-flex border-solid"
            style={{
              borderWidth: 1,
              borderColor: "var(--color-gray-000)",
              borderRadius: "var(--radius-full)",
              padding: "var(--spacing-1)",
            }}
          >
            <button
              type="button"
              className="inline-flex items-center justify-center overflow-clip bg-gray-000"
              style={{
                paddingLeft: "var(--spacing-8)",
                paddingRight: "var(--spacing-8)",
                paddingTop: "var(--spacing-4)",
                paddingBottom: "var(--spacing-4)",
                borderRadius: "var(--radius-full)",
              }}
            >
              <span
                className="whitespace-nowrap font-semibold text-brand-700"
                style={{
                  fontFamily: "var(--font-family-pretendard)",
                  fontSize: "var(--text-base-16sb-size)",
                  lineHeight: "var(--text-base-16sb-line-height)",
                  letterSpacing: "-0.16px",
                }}
              >
                ESG마인드 자격검정 신청하기
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
