/**
 * MainProgramsCard3 -- "ESG 실천 네트워크(ESGPN) 사회공헌활동" program card section.
 *
 * v4 principles:
 * - Semantic HTML: <section> wrapper, <h3> for card title, <ul>/<li> for lists
 * - Design tokens from tokens.css (colors, spacing)
 * - Content layout via flex, absolute only for decorative images (3 total)
 * - All text is HTML, zero text-bearing raster
 * - token_ratio target >= 0.2, absolute/file <= 5
 *
 * Third card in the Programs series. Brown/orange theme.
 * Differs from card1/card2: title has 2-line accent span, description row instead of 2-line checklist.
 *
 * Figma node: 252:1119 (Group 15), 1416x805
 */

import cityLeftRotated from "@/assets/main-programs-card3/city-left-rotated.png";
import cityBottomLeft from "@/assets/main-programs-card3/city-bottom-left.png";
import cityRight from "@/assets/main-programs-card3/city-right.png";
import progressBar from "@/assets/main-programs-card3/progress-bar.svg";
import iconCheckFilled from "@/assets/main-programs-card3/icon-check-filled.svg";
import iconCheckStroke from "@/assets/main-programs-card3/icon-check-stroke.svg";
import dividerDashed from "@/assets/main-programs-card3/divider-dashed.svg";
import arrowChevron from "@/assets/main-programs-card3/arrow-chevron.svg";

interface MainProgramsCard3Props {
  className?: string;
}

/* -- Icon rows (middle block) -- */
const ICON_ROWS = [
  { icon: iconCheckFilled, text: "전문가 재능나눔 활동 전개" },
  { icon: iconCheckStroke, text: "평생직업교육 공로상 수상" },
  { icon: iconCheckStroke, text: "로컬크리에이터" },
] as const;

/* -- Bottom list items -- */
const FEATURE_ITEMS = [
  "대학의 교육 역량 활용",
  "지역 일자리 \u00B7 서비스 연계",
  "ESG 성과를 사회적 가치로 환원",
] as const;

export function MainProgramsCard3({ className }: MainProgramsCard3Props) {
  return (
    <section
      className={`relative mx-auto w-[1416px] h-[805px] ${className ?? ""}`}
      aria-label="ESG 실천 네트워크 사회공헌활동 프로그램"
      data-node-id="252:1119"
    >
      {/* -- Decorative: city-left-rotated (baked-in -16deg, AABB wrapper + native inner) -- */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: "0px",
          top: "18px",
          width: "360.228px",
          height: "392.718px",
        }}
        aria-hidden="true"
        data-node-id="252:1121"
      >
        <img
          src={cityLeftRotated}
          alt=""
          className="flex-none rounded-[43.2px]"
          style={{ width: "280.675px", height: "328.062px" }}
        />
      </div>

      {/* -- Decorative: city-bottom-left (upright) -- */}
      <img
        src={cityBottomLeft}
        alt=""
        aria-hidden="true"
        className="absolute block rounded-[24px] object-cover"
        style={{
          left: "256px",
          top: "594px",
          width: "195px",
          height: "211px",
        }}
        data-node-id="252:1120"
      />

      {/* -- Decorative: city-right (upright) -- */}
      <img
        src={cityRight}
        alt=""
        aria-hidden="true"
        className="absolute block rounded-[24px] object-cover"
        style={{
          left: "1058px",
          top: "100px",
          width: "358px",
          height: "390px",
        }}
        data-node-id="252:1122"
      />

      {/* -- Main card (outer brown) -- positioned via margin, not absolute -- */}
      <article
        className="relative z-10 flex flex-col rounded-[48px]"
        style={{
          marginLeft: "400px",
          width: "616px",
          backgroundColor: "#3b1a0c",
          padding: "var(--spacing-2) var(--spacing-2) var(--spacing-4)",
          gap: "var(--spacing-3)",
        }}
        data-node-id="252:1123"
      >
        {/* Inner white card */}
        <div
          className="flex flex-col rounded-[48px]"
          style={{
            width: "600px",
            backgroundColor: "var(--color-gray-000)",
            padding: "var(--spacing-10)",
            gap: "var(--spacing-12)",
          }}
          data-node-id="252:1124"
        >
          {/* -- Block 1: Title + description -- */}
          <div
            className="flex flex-col"
            style={{ width: "520px", gap: "var(--spacing-4)" }}
            data-node-id="252:1125"
          >
            {/* Progress bar */}
            <img
              src={progressBar}
              alt=""
              aria-hidden="true"
              className="h-[20px] w-full shrink-0"
              data-node-id="252:1126"
            />

            {/* Title (2-line with orange accent on second line) */}
            <h3
              className="font-bold text-[36px] leading-[1.3] tracking-[-1.08px]"
              style={{ color: "var(--color-gray-900)" }}
              data-node-id="252:1132"
            >
              ESG 실천 네트워크(ESGPN)
              <br />
              <span style={{ color: "#ff8521" }}>사회공헌활동</span>
            </h3>

            {/* Description row (single bullet + text, card3-specific) */}
            <div
              className="flex flex-col"
              style={{ gap: "var(--spacing-3)" }}
              data-node-id="252:1133"
            >
              <div
                className="flex items-start"
                style={{ gap: "var(--spacing-2)" }}
              >
                <span
                  className="w-[3px] shrink-0 self-stretch rounded-[24px]"
                  style={{
                    backgroundColor: "#ff842d",
                    marginTop: "var(--spacing-1)",
                    marginBottom: "var(--spacing-1)",
                  }}
                  aria-hidden="true"
                />
                <span
                  className="font-medium text-[16px] leading-[1.5] tracking-[-0.16px]"
                  style={{ color: "var(--color-gray-900)" }}
                >
                  ESG실천네트워크의 사회공헌활동은 일회성 봉사가 아닌 문제해결형 프로젝트
                </span>
              </div>
            </div>
          </div>

          {/* -- Block 2: Icon rows (3 rows) -- */}
          <div
            className="flex flex-col"
            style={{ gap: "var(--spacing-4)" }}
            data-node-id="258:1375"
          >
            {ICON_ROWS.map((item, i) => (
              <div
                key={i}
                className="flex items-center"
                style={{ gap: "var(--spacing-3)" }}
                data-node-id={
                  i === 0 ? "258:1376" : i === 1 ? "258:1381" : "258:1386"
                }
              >
                <img
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                  className="size-[20px] shrink-0"
                  data-node-id={
                    i === 0 ? "258:1377" : i === 1 ? "258:1382" : "258:1387"
                  }
                />
                <span
                  className="font-medium text-[16px] leading-[1.5] tracking-[-0.16px]"
                  style={{ color: "var(--color-gray-900)" }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* -- Block 3: Feature list -- */}
          <div
            className="flex flex-col"
            style={{ gap: "var(--spacing-3)" }}
            data-node-id="258:1392"
          >
            {/* Label row with bullet */}
            <div
              className="flex items-center"
              style={{ gap: "var(--spacing-2)" }}
              data-node-id="258:1393"
            >
              <span
                className="w-[3px] self-stretch rounded-[24px]"
                style={{
                  backgroundColor: "#ff8521",
                  marginTop: "var(--spacing-1)",
                  marginBottom: "var(--spacing-1)",
                }}
                aria-hidden="true"
              />
              <span
                className="font-semibold text-[18px] leading-[1.4] tracking-[-0.27px]"
                style={{ color: "var(--color-gray-900)" }}
                data-node-id="258:1395"
              >
                사회공헌활동 특징
              </span>
            </div>

            {/* Feature list */}
            <ul
              className="list-disc text-[16px] leading-[1.5] tracking-[-0.16px] font-normal"
              style={{
                color: "var(--color-gray-900)",
                paddingLeft: "var(--spacing-6)",
              }}
              data-node-id="258:1397"
            >
              {FEATURE_ITEMS.map((item, i) => (
                <li key={i} className="marker:text-[var(--color-gray-900)]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dashed divider */}
        <div
          className="relative h-0 w-full shrink-0"
          style={{ paddingLeft: "var(--spacing-3)", paddingRight: "var(--spacing-3)" }}
          data-node-id="252:1164"
        >
          <div className="absolute inset-x-[12px] inset-y-[-1px]">
            <img
              src={dividerDashed}
              alt=""
              aria-hidden="true"
              className="block h-[2px] w-full"
            />
          </div>
        </div>

        {/* CTA bar (orange bg, white text -- card3 specific) */}
        <div
          className="flex w-[600px] items-center justify-between rounded-[48px]"
          style={{
            backgroundColor: "#ff842d",
            padding: "var(--spacing-4) var(--spacing-6)",
          }}
          data-node-id="252:1166"
        >
          <span
            className="font-bold text-[20px] leading-[1.4] tracking-[-0.4px]"
            style={{ color: "#ffffff" }}
            data-node-id="252:1167"
          >
            자세히 보기
          </span>

          {/* Triple chevron arrows (overlapping) */}
          <div
            className="flex items-center"
            style={{ paddingRight: "var(--spacing-4)" }}
            data-node-id="252:1168"
          >
            {[0, 1, 2].map((i) => (
              <img
                key={i}
                src={arrowChevron}
                alt=""
                aria-hidden="true"
                className="size-[32px] shrink-0"
                style={{ marginRight: i < 2 ? "-16px" : "0" }}
                data-node-id={`252:${1169 + i}`}
              />
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
