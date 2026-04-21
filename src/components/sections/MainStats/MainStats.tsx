import { StatItem } from "./StatItem";
import { EsgDiagram } from "./EsgDiagram";

/**
 * MainStats -- "ESG가 왜 중요할까?" section on the landing page.
 *
 * v4 principles:
 * - Semantic HTML: <section>, <h2>, <dl>/<dt>/<dd> for stats
 * - All text is HTML (zero raster text)
 * - Design tokens from tokens.css
 * - Flex layout, zero absolute-positioned elements (except connector SVG overlay)
 * - ESG circles are CSS divs with rgba backgrounds, not images
 * - Connectors are inline SVG paths, not external assets
 */
export function MainStats() {
  return (
    <section
      className="flex gap-[63px] items-center bg-[var(--color-gray-000)] px-[252px] py-[200px] w-full max-w-[1920px] mx-auto"
      data-node-id="26:273"
    >
      {/* Left column: indicator dots + heading + stats */}
      <div className="flex gap-[72px] items-start shrink-0">
        {/* Page progress indicator */}
        <div
          className="flex flex-col gap-[var(--spacing-4)] items-center self-stretch shrink-0 w-[24px]"
          aria-hidden="true"
        >
          <div className="w-[6px] h-[6px] rounded-full bg-[var(--color-gray-900)]" />
          <div className="w-[16px] h-[16px] rounded-full border border-[var(--color-gray-300)]" />
        </div>

        {/* Text content */}
        <div className="flex flex-col gap-[112px] items-start">
          {/* Heading block */}
          <header className="flex flex-col gap-[var(--spacing-6)] items-start">
            <div className="flex flex-col gap-[var(--spacing-2)] items-start">
              <p className="font-normal text-[14px] leading-[1.5] tracking-[-0.07px] text-[var(--color-gray-500)] whitespace-nowrap">
                ESG가 왜 중요할까?
              </p>
              <h2 className="font-bold text-[length:var(--text-display-01-size)] leading-[var(--text-display-01-line-height)] text-[var(--color-gray-900)]">
                단순한 트렌드를 넘어,
                <br />
                모두의 새로운 생존 문법
              </h2>
            </div>
            <p className="font-normal text-[16px] leading-[1.5] tracking-[-0.16px] text-[var(--color-gray-900)]">
              이제 ESG는 기업의 성적표가 아닙니다. 우리가 살아가는
              <br />
              사회와 지구를 지키기 위한 가장 현실적인 행동 지침이자
              약속입니다.
            </p>
          </header>

          {/* Stats row */}
          <div className="flex gap-[var(--spacing-8)] items-center">
            <StatItem
              value="97"
              unit="%"
              caption={
                <>
                  ESG를 고려하는
                  <br />
                  글로벌 투자자
                </>
              }
            />
            <StatItem
              value="85"
              unit="%"
              caption={
                <>
                  ESG를 중시하는
                  <br />
                  소비자
                </>
              }
            />
            <StatItem
              value="70"
              unit="%"
              caption={
                <>
                  구직자
                  <br />
                  기업 ESG 확인
                </>
              }
            />
            <StatItem
              value="2028"
              caption={
                <>
                  ESG 공시
                  <br />
                  의무화 시작
                </>
              }
            />
          </div>
        </div>
      </div>

      {/* Right column: ESG diagram */}
      <EsgDiagram />
    </section>
  );
}
