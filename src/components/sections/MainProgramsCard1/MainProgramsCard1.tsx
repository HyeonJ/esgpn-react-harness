/**
 * MainProgramsCard1 -- "ESG마인드 자격검정" program card section.
 *
 * v4 principles:
 * - Semantic HTML: <section> wrapper, <h3> for card title, <ul>/<li> for lists
 * - Design tokens from tokens.css (colors, spacing)
 * - Content layout via flex, absolute only for decorative images (3 total)
 * - All text is HTML, zero text-bearing raster
 * - token_ratio target >= 0.2, absolute/file <= 5
 *
 * Figma node: 252:1013 (Group 13), 1416x805
 */

import cityRight from "@/assets/main-programs-card1/city-right.png";
import leafBottom from "@/assets/main-programs-card1/leaf-bottom.png";
import leafTop from "@/assets/main-programs-card1/leaf-top.png";
import progressBar from "@/assets/main-programs-card1/progress-bar.svg";
import iconCheckFilled from "@/assets/main-programs-card1/icon-check-filled.svg";
import iconCheckStroke from "@/assets/main-programs-card1/icon-check-stroke.svg";
import dividerDashed from "@/assets/main-programs-card1/divider-dashed.svg";
import arrowChevron from "@/assets/main-programs-card1/arrow-chevron.svg";

interface MainProgramsCard1Props {
  className?: string;
}

/* ── Inspection checklist rows ── */
const INSPECTION_ITEMS = [
  { icon: iconCheckFilled, text: "ESG 개념 / 용어 / 실천 전반" },
  { icon: iconCheckStroke, text: "온라인 시험 진행" },
  { icon: iconCheckStroke, text: "공식 자격증 발급" },
] as const;

/* ── Competency list items ── */
const COMPETENCY_ITEMS = [
  "지역사회와 상생하는 ESG 마인드 구축",
  "사회적 가치 창출을 위한 실천적 사고",
  "윤리적 의사결정과 책임 있는 실행 능력",
  "지역 사회 ESG 문제 해결",
  "취약계층·청년대상 ESG 교육",
  "대학·기업·지자체 협력 프로젝트",
] as const;

export function MainProgramsCard1({ className }: MainProgramsCard1Props) {
  return (
    <section
      className={`relative mx-auto w-[1416px] h-[805px] ${className ?? ""}`}
      aria-label="ESG마인드 자격검정 프로그램"
      data-node-id="252:1013"
    >
      {/* ── Decorative: city image (behind card, DOM first = z below) ── */}
      <img
        src={cityRight}
        alt=""
        aria-hidden="true"
        className="absolute rounded-[40px] object-cover"
        style={{
          left: "861px",
          top: "125px",
          width: "555px",
          height: "680px",
        }}
        data-node-id="252:1014"
      />

      {/* ── Main card (outer green) — positioned via margin, not absolute ── */}
      <article
        className="relative z-10 flex flex-col rounded-[48px]"
        style={{
          marginLeft: "400px",
          width: "616px",
          backgroundColor: "var(--color-brand-700)",
          padding: "var(--spacing-2) var(--spacing-2) var(--spacing-4)",
          gap: "var(--spacing-3)",
        }}
        data-node-id="252:1015"
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
          data-node-id="252:1016"
        >
          {/* ── Block 1: Title + checklist ── */}
          <div
            className="flex flex-col"
            style={{ width: "520px", gap: "var(--spacing-4)" }}
            data-node-id="252:1017"
          >
            {/* Progress bar */}
            <img
              src={progressBar}
              alt=""
              aria-hidden="true"
              className="h-[20px] w-full shrink-0"
              data-node-id="252:1018"
            />

            {/* Title */}
            <h3
              className="font-bold text-[36px] leading-[1.3] tracking-[-1.08px]"
              style={{ color: "var(--color-gray-900)" }}
              data-node-id="252:1024"
            >
              ESG마인드 자격검정
            </h3>

            {/* Bullet descriptions (2 rows) */}
            <div
              className="flex flex-col"
              style={{ gap: "var(--spacing-3)" }}
              data-node-id="252:1025"
            >
              <BulletRow
                nodeId="252:1026"
                text="ESG를 알고 있는 사람이 아니라 ESG를 실천할 수 있는 사람을 만들어가는 과정"
              />
              <BulletRow
                nodeId="252:1030"
                text="ESG 실천을 위한 기관의 역할과 ESG에 필요한 교육 및 실용적 프로젝트로 역량 인증"
              />
            </div>
          </div>

          {/* ── Block 2: Inspection points (3 rows) ── */}
          <div
            className="flex flex-col"
            style={{ gap: "var(--spacing-4)" }}
            data-node-id="252:1034"
          >
            {INSPECTION_ITEMS.map((item, i) => (
              <div
                key={i}
                className="flex items-center"
                style={{ gap: "var(--spacing-3)" }}
                data-node-id={
                  i === 0 ? "252:1035" : i === 1 ? "252:1040" : "252:1045"
                }
              >
                <img
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                  className="size-[20px] shrink-0"
                  data-node-id={
                    i === 0 ? "252:1036" : i === 1 ? "252:1041" : "252:1046"
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

          {/* ── Block 3: Required competencies ── */}
          <div
            className="flex flex-col"
            style={{ gap: "var(--spacing-3)" }}
            data-node-id="252:1050"
          >
            {/* Label row with bullet */}
            <div
              className="flex items-center"
              style={{ gap: "var(--spacing-2)" }}
              data-node-id="252:1051"
            >
              <span
                className="w-[3px] self-stretch rounded-[24px]"
                style={{
                  backgroundColor: "var(--color-brand-500)",
                  marginTop: "var(--spacing-1)",
                  marginBottom: "var(--spacing-1)",
                }}
                aria-hidden="true"
              />
              <span
                className="font-semibold text-[18px] leading-[1.4] tracking-[-0.27px]"
                style={{ color: "var(--color-gray-900)" }}
                data-node-id="252:1053"
              >
                필수 역량
              </span>
            </div>

            {/* Competency list */}
            <ul
              className="list-disc text-[16px] leading-[1.5] tracking-[-0.16px] font-normal"
              style={{
                color: "var(--color-gray-900)",
                paddingLeft: "var(--spacing-6)",
              }}
              data-node-id="252:1055"
            >
              {COMPETENCY_ITEMS.map((item, i) => (
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
          data-node-id="252:1056"
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
            backgroundColor: "#caeb69",
            padding: "var(--spacing-4) var(--spacing-6)",
          }}
          data-node-id="252:1058"
        >
          <span
            className="font-bold text-[20px] leading-[1.4] tracking-[-0.4px]"
            style={{ color: "var(--color-brand-700)" }}
            data-node-id="252:1059"
          >
            자세히 보기
          </span>

          {/* Triple chevron arrows (overlapping) */}
          <div
            className="flex items-center"
            style={{ paddingRight: "var(--spacing-4)" }}
            data-node-id="252:1060"
          >
            {[0, 1, 2].map((i) => (
              <img
                key={i}
                src={arrowChevron}
                alt=""
                aria-hidden="true"
                className="size-[32px] shrink-0"
                style={{ marginRight: i < 2 ? "-16px" : "0" }}
                data-node-id={`252:${1061 + i}`}
              />
            ))}
          </div>
        </div>
      </article>

      {/* ── Decorative: leaf bottom (baked-in rotation, no CSS rotate) ── */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: "0px",
          top: "234.39px",
          width: "227.494px",
          height: "241.508px",
        }}
        aria-hidden="true"
        data-node-id="252:1064"
        data-leaf="bottom"
      >
        <img
          src={leafBottom}
          alt=""
          className="flex-none rounded-[40px]"
          style={{ width: "202px", height: "216px" }}
        />
      </div>

      {/* ── Decorative: leaf top (baked-in rotation+blend+bg, no CSS effects) ── */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: "149.07px",
          top: "53.94px",
          width: "166.048px",
          height: "166.048px",
        }}
        aria-hidden="true"
        data-node-id="252:1065"
        data-leaf="top"
      >
        <img
          src={leafTop}
          alt=""
          className="flex-none rounded-[32px]"
          style={{ width: "154.5px", height: "154.5px" }}
        />
      </div>
    </section>
  );
}

/* ── Shared sub-component: bullet row ── */
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
          backgroundColor: "var(--color-brand-500)",
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
