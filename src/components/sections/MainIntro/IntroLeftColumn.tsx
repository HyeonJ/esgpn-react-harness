import { IntroBusinessRow } from "./IntroBusinessRow";
import dottedShort from "@/assets/main-intro/dotted-line-short.svg";
import dottedLong from "@/assets/main-intro/dotted-line-long.svg";

/**
 * 좌측 컬럼: 진행 점 인디케이터 + 헤딩 + 본문 + 사업 3행 + pill 컬럼.
 * 캔버스 좌측 컬럼 bbox: x=250.5 y=247.5 w=716 h=545.
 *
 * 구조:
 *   - 인디케이터 24×545 (큰 원 16 + 작은 원 6, CSS div 2개 — Q2 권장)
 *   - 텍스트 묶음 620 — heading group + 사업 3행 (gap 112)
 *   - pill 컬럼은 사업 본문 좌측에 absolute (inline-grid 겹침 재현)
 */
const ROWS = [
  {
    pill: "주요사업 01",
    title: "ESG 실천방안 발굴",
    lineSrc: dottedShort,
    bodyLine1: "지속가능한 미래를 위해 대학과 지역사회, 산업체가",
    bodyLine2: "즉시 적용할 수 있는 행동 모델을 연구하고 개발합니다.",
  },
  {
    pill: "주요사업 02",
    title: "ESG 창업 프로그램",
    lineSrc: dottedShort,
    bodyLine1: "ESG 가치를 혁신적인 비즈니스 모델로 전환하여 새로운",
    bodyLine2: "사회적 가치를 창출하는 창업 지원 체계를 구축합니다.",
  },
  {
    pill: "주요사업 03",
    title: "ESG 자격 및 교육",
    lineSrc: dottedLong,
    bodyLine1: "‘ESG마인드’ 자격검정과 체계적인 교육 과정을 운영하여",
    bodyLine2: "실무 역량을 갖춘 차세대 ESG 전문 인력을 양성합니다.",
  },
] as const;

export function IntroLeftColumn() {
  return (
    <div className="relative flex-none" style={{ width: 716, height: 545 }}>
      {/* 진행 점 인디케이터: 큰 원 16×16 (y=6) + 작은 원 6×6 (y=38) — 캔버스 y 253.5/285.5는 좌측 컬럼 top 247.5 기준 +6/+38 */}
      <div className="absolute" style={{ left: 4, top: 6 }}>
        <div
          className="rounded-full"
          style={{
            width: 16,
            height: 16,
            border: "1px solid var(--color-gray-300)",
            backgroundColor: "transparent",
          }}
          aria-hidden="true"
        />
      </div>
      <div className="absolute" style={{ left: 9, top: 38 }}>
        <div
          className="rounded-full"
          style={{ width: 6, height: 6, backgroundColor: "var(--color-gray-300)" }}
          aria-hidden="true"
        />
      </div>

      {/* 텍스트 묶음: 좌측 인디케이터(24) 우측 + gap 72 → left 96, w 620 */}
      <div
        className="absolute flex flex-col"
        style={{ left: 96, top: 0, width: 620, gap: 112 }}
      >
        {/* heading group (gap 24) */}
        <div className="flex flex-col" style={{ gap: 24 }}>
          {/* heading row (gap 8): 라벨 + display */}
          <div className="flex flex-col" style={{ gap: 8 }}>
            <p
              className="font-['Pretendard_Variable'] font-normal"
              style={{
                fontSize: 14,
                lineHeight: 1.5,
                letterSpacing: "-0.07px",
                color: "var(--color-gray-500)",
              }}
            >
              ESGPN이란?
            </p>
            <h2
              className="font-['Pretendard_Variable'] font-bold"
              style={{
                fontSize: 48,
                lineHeight: "56px",
                letterSpacing: "0px",
                color: "var(--color-gray-900)",
              }}
            >
              ESG 실천을 위한 연대 플랫폼
            </h2>
          </div>
          {/* 본문 — 2줄 강제 (Figma <br>) */}
          <p
            className="font-['Pretendard_Variable'] font-normal"
            style={{
              fontSize: 16,
              lineHeight: 1.5,
              letterSpacing: "-0.16px",
              color: "var(--color-gray-900)",
            }}
          >
            ESG실천네트워크(ESGPN : ESG Practice Network)는 ESG{" "}
            <span
              className="font-['Pretendard_Variable'] font-bold"
              style={{ color: "var(--color-brand-500)" }}
            >
              교육, 자격, 참여, 사회공헌
            </span>
            을
            <br aria-hidden="true" />
            실천하는 연대 플랫폼입니다. 대학, 학회, 산업체, 지역사회가 함께
            <br aria-hidden="true" />
            지속가능한 미래를 행동으로 구현 하는 것을 목표로 합니다.
          </p>
        </div>

        {/* 사업 3행 그리드 영역 — 높이 252, 내부 본문 컬럼은 ml=20 mt=26, gap 32 */}
        <div className="relative" style={{ width: 620, height: 252 }}>
          {/* pill 컬럼: 본문 컬럼보다 26px 위, 20px 좌측 → ml=0 mt=0 */}
          <div className="absolute flex flex-col" style={{ left: 0, top: 0, gap: 56 }}>
            {ROWS.map((row) => (
              <div
                key={row.pill}
                className="flex items-center justify-center font-['Pretendard_Variable'] font-semibold"
                style={{
                  width: 94,
                  height: 29,
                  borderRadius: 24,
                  backgroundColor: "var(--color-brand-500)",
                  color: "var(--color-gray-000)",
                  fontSize: 14,
                  lineHeight: 1.5,
                  letterSpacing: "-0.07px",
                  paddingLeft: 12,
                  paddingRight: 12,
                  paddingTop: 4,
                  paddingBottom: 4,
                  whiteSpace: "nowrap",
                }}
              >
                {row.pill}
              </div>
            ))}
          </div>

          {/* 사업 본문 컬럼: ml=20, mt=26 → left 20 top 26, gap 32 */}
          <div className="absolute flex flex-col" style={{ left: 20, top: 26, gap: 32 }}>
            {ROWS.map((row) => (
              <IntroBusinessRow
                key={row.title}
                title={row.title}
                lineSrc={row.lineSrc}
                bodyLine1={row.bodyLine1}
                bodyLine2={row.bodyLine2}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
