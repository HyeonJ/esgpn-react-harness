import type { ReactNode } from "react";

/**
 * Right-side ESG diagram: 3 overlapping circles, WHY? pill, 6 connectors,
 * and 3 explanation columns.
 *
 * Layout: CSS Grid with all children in the same cell (row-1/col-1),
 * offset via margin-left / margin-top to match Figma inline-grid overlay.
 * Connector SVG sits as an absolute overlay with pointer-events-none.
 *
 * v4: zero absolute/positioned elements except the connector SVG overlay.
 * All text is HTML. Design tokens used throughout.
 */

/* ------------------------------------------------------------------ */
/*  Connector SVG paths                                                */
/*  Coordinate system: Group 10 bbox (678x535), origin at top-left.    */
/*  WHY? pill center: (338.5, 302) -- top edge ~280, bottom edge ~324  */
/*  ESG circles bottom edge: y=200                                     */
/*  Explanation top edge: y=404                                        */
/*                                                                     */
/*  Top 3: circles(bottom) -> WHY?(top)                                */
/*  Bottom 3: WHY?(bottom) -> explanation(top)                         */
/*                                                                     */
/*  Elbow pattern: vertical from start, horizontal turn, vertical to   */
/*  end. Mid-y sits halfway between start and end y-values.            */
/*                                                                     */
/*  Stroke color: #0c3b0e (brand-700) from baseline visual match.      */
/*  Arrow markers: filled triangles pointing toward destination.       */
/* ------------------------------------------------------------------ */

const CONNECTOR_STROKE = "var(--color-brand-700)";
const STROKE_WIDTH = 1.5;

function ConnectorSvg() {
  return (
    <svg
      className="col-start-1 row-start-1 absolute inset-0 pointer-events-none"
      width="678"
      height="535"
      viewBox="0 0 678 535"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <marker
          id="arrow-down"
          markerWidth="8"
          markerHeight="6"
          refX="4"
          refY="6"
          orient="auto"
        >
          <path d="M0,0 L4,6 L8,0" fill={CONNECTOR_STROKE} />
        </marker>
        <marker
          id="arrow-up"
          markerWidth="8"
          markerHeight="6"
          refX="4"
          refY="0"
          orient="auto"
        >
          <path d="M0,6 L4,0 L8,6" fill={CONNECTOR_STROKE} />
        </marker>
      </defs>

      {/* --- Top 3: ESG circles -> WHY? --- */}
      {/* E circle bottom center (151, 200) -> WHY? top center (338.5, 280) */}
      <path
        d="M 151,200 V 240 H 338.5 V 280"
        stroke={CONNECTOR_STROKE}
        strokeWidth={STROKE_WIDTH}
        markerEnd="url(#arrow-down)"
      />
      {/* S circle bottom center (338.5, 200) -> WHY? top (338.5, 280) */}
      <line
        x1={338.5}
        y1={200}
        x2={338.5}
        y2={280}
        stroke={CONNECTOR_STROKE}
        strokeWidth={STROKE_WIDTH}
        markerEnd="url(#arrow-down)"
      />
      {/* G circle bottom center (527, 200) -> WHY? top center (338.5, 280) */}
      <path
        d="M 527,200 V 240 H 338.5 V 280"
        stroke={CONNECTOR_STROKE}
        strokeWidth={STROKE_WIDTH}
        markerEnd="url(#arrow-down)"
      />

      {/* --- Bottom 3: WHY? -> explanation columns --- */}
      {/* WHY? bottom (338.5, 324) -> Capital market center (107.5, 404) */}
      <path
        d="M 338.5,324 V 364 H 107.5 V 404"
        stroke={CONNECTOR_STROKE}
        strokeWidth={STROKE_WIDTH}
        markerEnd="url(#arrow-down)"
      />
      {/* WHY? bottom (338.5, 324) -> Consumer trend center (338.5, 404) */}
      <line
        x1={338.5}
        y1={324}
        x2={338.5}
        y2={404}
        stroke={CONNECTOR_STROKE}
        strokeWidth={STROKE_WIDTH}
        markerEnd="url(#arrow-down)"
      />
      {/* WHY? bottom (338.5, 324) -> Legal disclosure center (569.5, 404) */}
      <path
        d="M 338.5,324 V 364 H 569.5 V 404"
        stroke={CONNECTOR_STROKE}
        strokeWidth={STROKE_WIDTH}
        markerEnd="url(#arrow-down)"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  ESG Circle component                                               */
/* ------------------------------------------------------------------ */

type EsgCircleProps = {
  opacity: number;
  engLabel: string;
  korLabel: string;
};

function EsgCircle({ opacity, engLabel, korLabel }: EsgCircleProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-[var(--spacing-1)] mr-[-12px] rounded-full size-[200px] pt-[var(--spacing-2)]"
      style={{ backgroundColor: `rgba(79,182,84,${opacity})` }}
    >
      <span className="font-bold text-[length:var(--text-2xl-24b-size)] leading-[var(--text-2xl-24b-line-height)] tracking-[-0.6px] text-[var(--color-gray-900)]">
        {engLabel}
      </span>
      <span className="font-normal text-[18px] leading-[1.5] tracking-[-0.27px] text-[var(--color-gray-900)] text-center">
        {korLabel}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Explanation column                                                  */
/* ------------------------------------------------------------------ */

type ExplanationProps = {
  title: string;
  body: ReactNode;
};

function ExplanationColumn({ title, body }: ExplanationProps) {
  return (
    <div className="w-[215px] flex flex-col gap-[var(--spacing-1)] items-start pt-[var(--spacing-4)] pb-[var(--spacing-2)] text-center">
      <p className="font-bold text-[length:var(--text-xl-20b-size)] leading-[var(--text-xl-20b-line-height)] tracking-[-0.4px] text-[var(--color-gray-900)] w-full">
        {title}
      </p>
      <p className="font-normal text-[14px] leading-[1.5] tracking-[-0.07px] text-[var(--color-gray-900)] w-full">
        {body}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export function EsgDiagram() {
  return (
    <div
      className="grid relative shrink-0"
      style={{
        gridTemplateColumns: "max-content",
        gridTemplateRows: "max-content",
      }}
      data-node-id="29:351"
    >
      {/* Cell 1: ESG 3 circles (ml=51 mt=0) */}
      <div className="col-start-1 row-start-1 flex items-center ml-[51px] mt-0 pr-[12px]">
        <EsgCircle opacity={0.16} engLabel="Environmental" korLabel="환경" />
        <EsgCircle opacity={0.28} engLabel="Social" korLabel="사회" />
        <EsgCircle opacity={0.4} engLabel="Governance" korLabel="지배구조" />
      </div>

      {/* Cell 2: WHY? pill (ml=289.43 mt=280) */}
      <div className="col-start-1 row-start-1 flex items-center justify-center ml-[289.43px] mt-[280px] px-[var(--spacing-5)] py-[var(--spacing-2)] rounded-full bg-[var(--color-brand-500)] w-[98.145px] h-[44px]">
        <span className="font-bold text-[length:var(--text-xl-20b-size)] leading-[var(--text-xl-20b-line-height)] tracking-[-0.4px] text-white whitespace-nowrap">
          WHY?
        </span>
      </div>

      {/* Cell 3: 3 explanation columns (ml=0 mt=404) */}
      <div className="col-start-1 row-start-1 flex gap-[var(--spacing-4)] items-start ml-0 mt-[404px]">
        <ExplanationColumn
          title="자본시장의 필수 요건"
          body={
            <>
              이제 ESG는 투자자의 의사결정 시
              <br />
              기업 가치에 영향을 미치는
              <br />
              핵심 비재무적 요소입니다.
            </>
          }
        />
        <ExplanationColumn
          title="소비 트렌드의 변화"
          body={
            <>
              소비자들은 세상에 유익을 주는
              <br />
              기업을 응원하며, 가치 소비가
              <br />
              확산되고 있습니다.
            </>
          }
        />
        <ExplanationColumn
          title="법적 공시 의무화"
          body={
            <>
              2030년부터 모든 코스피 상장사는
              <br />
              ESG 정보를 의무적으로 공시해야
              <br />
              하는 규제 환경에 직면해 있습니다.
            </>
          }
        />
      </div>

      {/* Connector SVG overlay */}
      <ConnectorSvg />
    </div>
  );
}
