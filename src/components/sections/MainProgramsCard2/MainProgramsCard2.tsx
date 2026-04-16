/**
 * MainProgramsCard2 -- "ESG 실천 아이디어 경진대회" program card section.
 *
 * v4 principles:
 * - Semantic HTML: <section> wrapper, <h3> for card title, <ul>/<li> for lists
 * - Design tokens from tokens.css (colors, spacing)
 * - Content layout via flex, absolute only for decorative images (3 total)
 * - All text is HTML, zero text-bearing raster
 * - token_ratio target >= 0.2, absolute/file <= 5
 *
 * Mirror of Card1 (green) but with navy/blue theme.
 * Card body at x=400, floating decorations swapped: left city + right 2 city tiles.
 *
 * Figma node: 252:1066 (Group 14), 1416x805
 */

import cityLeft from "@/assets/main-programs-card2/city-left.png";
import cityMidRight from "@/assets/main-programs-card2/city-mid-right.png";
import cityTopRight from "@/assets/main-programs-card2/city-top-right.png";
import progressBar from "@/assets/main-programs-card2/progress-bar.svg";
import iconPoint from "@/assets/main-programs-card2/icon-point.svg";
import dividerDashed from "@/assets/main-programs-card2/divider-dashed.svg";
import arrowChevron from "@/assets/main-programs-card2/arrow-chevron.svg";

interface MainProgramsCard2Props {
  className?: string;
}

/* ── Point checklist rows ── */
const POINT_ITEMS = [
  "SDGs \u00B7 ESG \uAE30\uBC18 \uD604\uC7A5 \uBB38\uC81C\uD574\uACB0",
  "\uB300\uD559 \u00B7 \uCCAD\uB144 \u00B7 \uC9C0\uC5ED \uC5F0\uACC4 \uD300 \uD504\uB85C\uC81D\uD2B8",
  "\uB300\uD68C\uB85C \uB05D\uB098\uC9C0 \uC54A\uACE0 \uC2E4\uCC9C\uACFC\uC81C\uB85C \uC5F0\uACB0",
] as const;

/* ── Target audience list items ── */
const TARGET_ITEMS = [
  "\uB300\uD559\uC0DD \u00B7 \uCCAD\uB144",
  "\uB300\uD559 \u00B7 \uC9C0\uC5ED \uD601\uC2E0 \uC870\uC9C1",
  "ESG\uC5D0 \uAD00\uC2EC \uC788\uB294 \uAE30\uC5C5 \u00B7 \uAE30\uAD00",
] as const;

export function MainProgramsCard2({ className }: MainProgramsCard2Props) {
  return (
    <section
      className={`relative mx-auto w-[1416px] h-[805px] ${className ?? ""}`}
      aria-label="ESG \uC2E4\uCC9C \uC544\uC774\uB514\uC5B4 \uACBD\uC9C4\uB300\uD68C \uD504\uB85C\uADF8\uB7A8"
      data-node-id="252:1066"
    >
      {/* ── Decorative: city-left (baked-in -16deg rotation, no CSS rotate) ── */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: "0px",
          top: "168.81px",
          width: "530.209px",
          height: "578.029px",
        }}
        aria-hidden="true"
        data-node-id="252:1067"
        data-floating="city-left"
      >
        <img
          src={cityLeft}
          alt=""
          className="flex-none rounded-[48px]"
          style={{ width: "413px", height: "483px" }}
        />
      </div>

      {/* ── Decorative: city-mid-right (upright, no rotation) ── */}
      <img
        src={cityMidRight}
        alt=""
        aria-hidden="true"
        className="absolute block rounded-[24px] object-cover"
        style={{
          left: "948px",
          top: "454px",
          width: "315px",
          height: "351px",
        }}
        data-node-id="252:1068"
      />

      {/* ── Main card (outer navy) -- positioned via margin, not absolute ── */}
      <article
        className="relative z-10 flex flex-col rounded-[48px]"
        style={{
          marginLeft: "400px",
          width: "616px",
          backgroundColor: "#0C173B",
          padding: "var(--spacing-2) var(--spacing-2) var(--spacing-4)",
          gap: "var(--spacing-3)",
        }}
        data-node-id="252:1069"
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
          data-node-id="252:1070"
        >
          {/* ── Block 1: Title + checklist ── */}
          <div
            className="flex flex-col"
            style={{ width: "520px", gap: "var(--spacing-4)" }}
            data-node-id="252:1071"
          >
            {/* Progress bar */}
            <img
              src={progressBar}
              alt=""
              aria-hidden="true"
              className="h-[20px] w-full shrink-0"
              data-node-id="252:1072"
            />

            {/* Title */}
            <h3
              className="font-bold text-[36px] leading-[1.3] tracking-[-1.08px]"
              style={{ color: "var(--color-gray-900)" }}
              data-node-id="252:1078"
            >
              ESG 실천 아이디어 경진대회
            </h3>

            {/* Bullet descriptions (2 rows) */}
            <div
              className="flex flex-col"
              style={{ gap: "var(--spacing-3)" }}
              data-node-id="252:1079"
            >
              <BulletRow
                nodeId="252:1080"
                text="ESG를 아이디어 → 실행 → 사회적 가치로 연결하는 실천형 프로그램"
              />
              <BulletRow
                nodeId="252:1084"
                text="ESG 실천을 위한 기관의 역할과 ESG에 필요한 교육 생태계 구축을 목적으로 개발"
              />
            </div>
          </div>

          {/* ── Block 2: Point items (3 rows) ── */}
          <div
            className="flex flex-col"
            style={{ gap: "var(--spacing-4)" }}
            data-node-id="252:1088"
          >
            {POINT_ITEMS.map((text, i) => (
              <div
                key={i}
                className="flex items-center"
                style={{ gap: "var(--spacing-3)" }}
                data-node-id={
                  i === 0 ? "252:1089" : i === 1 ? "252:1094" : "252:1099"
                }
              >
                <img
                  src={iconPoint}
                  alt=""
                  aria-hidden="true"
                  className="size-[20px] shrink-0"
                  data-node-id={
                    i === 0 ? "252:1090" : i === 1 ? "252:1095" : "252:1100"
                  }
                />
                <span
                  className="font-medium text-[16px] leading-[1.5] tracking-[-0.16px] whitespace-nowrap"
                  style={{ color: "var(--color-gray-900)" }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* ── Block 3: Target audience ── */}
          <div
            className="flex flex-col"
            style={{ gap: "var(--spacing-3)" }}
            data-node-id="252:1104"
          >
            {/* Label row with bullet */}
            <div
              className="flex items-center"
              style={{ gap: "var(--spacing-2)" }}
              data-node-id="252:1105"
            >
              <span
                className="w-[3px] self-stretch rounded-[24px]"
                style={{
                  backgroundColor: "#2D7EFF",
                  marginTop: "var(--spacing-1)",
                  marginBottom: "var(--spacing-1)",
                }}
                aria-hidden="true"
              />
              <span
                className="font-semibold text-[18px] leading-[1.4] tracking-[-0.27px]"
                style={{ color: "var(--color-gray-900)" }}
                data-node-id="252:1108"
              >
                주요 대상
              </span>
            </div>

            {/* Target list */}
            <ul
              className="list-disc text-[16px] leading-[1.5] tracking-[-0.16px] font-normal whitespace-nowrap"
              style={{
                color: "var(--color-gray-900)",
                paddingLeft: "var(--spacing-6)",
              }}
              data-node-id="252:1109"
            >
              {TARGET_ITEMS.map((item, i) => (
                <li key={i} className="ms-[24px] marker:text-[var(--color-gray-900)]">
                  <span className="leading-[1.5]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dashed divider */}
        <div
          className="relative h-0 w-full shrink-0"
          style={{ paddingLeft: "var(--spacing-3)", paddingRight: "var(--spacing-3)" }}
          data-node-id="252:1110"
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

        {/* CTA bar */}
        <div
          className="flex w-[600px] items-center justify-between rounded-[48px]"
          style={{
            backgroundColor: "#A5D9FF",
            padding: "var(--spacing-4) var(--spacing-6)",
          }}
          data-node-id="252:1112"
        >
          <span
            className="font-bold text-[20px] leading-[1.4] tracking-[-0.4px]"
            style={{ color: "#0C173B" }}
            data-node-id="252:1113"
          >
            자세히 보기
          </span>

          {/* Triple chevron arrows (overlapping) */}
          <div
            className="flex items-center"
            style={{ paddingRight: "var(--spacing-4)" }}
            data-node-id="252:1114"
          >
            {[0, 1, 2].map((i) => (
              <img
                key={i}
                src={arrowChevron}
                alt=""
                aria-hidden="true"
                className="size-[32px] shrink-0"
                style={{ marginRight: i < 2 ? "-16px" : "0" }}
                data-node-id={`252:${1115 + i}`}
              />
            ))}
          </div>
        </div>
      </article>

      {/* ── Decorative: city-top-right (upright, no rotation) ── */}
      <img
        src={cityTopRight}
        alt=""
        aria-hidden="true"
        className="absolute block rounded-[24px] object-cover"
        style={{
          left: "1231px",
          top: "218px",
          width: "185px",
          height: "193px",
        }}
        data-node-id="252:1118"
      />
    </section>
  );
}

/* ── Shared sub-component: bullet row (blue variant) ── */
function BulletRow({ nodeId, text }: { nodeId: string; text: string }) {
  return (
    <div
      className="flex items-start"
      style={{ gap: "var(--spacing-2)" }}
      data-node-id={nodeId}
    >
      <span
        className="w-[3px] shrink-0 self-stretch rounded-[24px]"
        style={{
          backgroundColor: "var(--color-status-positive-default)",
          marginTop: "var(--spacing-1)",
          marginBottom: "var(--spacing-1)",
        }}
        aria-hidden="true"
      />
      <span
        className="font-medium text-[16px] leading-[1.5] tracking-[-0.16px]"
        style={{ color: "var(--color-gray-900)" }}
      >
        {text}
      </span>
    </div>
  );
}
