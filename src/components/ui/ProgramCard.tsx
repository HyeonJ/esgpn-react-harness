import type { ReactNode } from "react";

/**
 * ProgramCard — main-programs 카드 공통 컴포넌트 (Rule of Three 승격).
 *
 * card1(252:1015, green) / card2(252:1069, navy) / card3(252:1123, brown) 3종을 단일 props로 수용.
 * outer 616×732 / inner white 600×620 / divider / CTA bar 구조는 3 카드 모두 동일하고,
 * 테마 색 5종·텍스트·에셋만 props로 주입한다.
 *
 * 12 확정 핵심 props + 4 보조 props. plan/main-programs-card3.md §B 참조.
 *
 * **decoration(floating 요소)은 이 컴포넌트 외부(섹션 루트)가 sibling으로 관리한다** —
 * 배치·회전·에셋이 섹션마다 상이해 props 지옥이 되므로.
 */
export interface ProgramCardProps {
  /** 1. outer frame 배경색 */
  outerBg: string;
  /** 2. CTA bar 배경색 */
  ctaBg: string;
  /** 3. CTA bar 텍스트·화살표 색 */
  ctaTextColor: string;
  /** 4. 헤더 블록 bullet 색 (card1/2: 체크리스트 bullet / card3: description bullet) */
  checklistBulletColor: string;
  /** 5. 하단 라벨 bullet 색 */
  pointsBulletColor: string;
  /** 6. 타이틀 (단순 string 또는 ReactNode — card3는 <br>+accent span) */
  title: ReactNode;
  /** 7. 헤더 bullet+16M 리스트 (card1·2 길이=2, card3 길이=1) */
  checklist: string[];
  /** 8. 중간 아이콘 3행 — 각 행 아이콘+텍스트 */
  points: { icon: string; text: string }[];
  /** 9. 하단 라벨 텍스트 */
  pointsLabel: string;
  /** 10. 하단 ul 아이템 (card1=6, card2/3=3) */
  pointsItems: string[];
  /** 11. 헤더 progress-bar SVG src */
  progressBarSvg: string;
  /** 12. divider-dashed SVG src */
  dividerSvg: string;

  // ── 보조 ──
  /** CTA arrow chevron svg (32×32 단일 arrow). 3번 반복 렌더 */
  arrowChevronSvg: string;
  /** 중간 아이콘 블록 width (card1=236, card2=253, card3=236) */
  iconsBlockWidth?: number;
  /** 하단 블록 width (card1=456, card2=520, card3=520) */
  bottomBlockWidth?: number;
  /** 디버그용 outer frame data-node-id */
  dataNodeId?: string;
  /** 디버그용 CTA bar data-node-id */
  cardCtaNodeId?: string;
  /** 측정 스크립트용 내부 블록 node-id 매핑. 키: inner/header/title/icons/bottom/bottomLabel/ul/arrows/divider */
  nodeIds?: Partial<{
    inner: string;
    header: string;
    title: string;
    icons: string;
    bottom: string;
    bottomLabel: string;
    ul: string;
    arrows: string;
    divider: string;
    ctaSpan: string;
  }>;
}

export function ProgramCard({
  outerBg,
  ctaBg,
  ctaTextColor,
  checklistBulletColor,
  pointsBulletColor,
  title,
  checklist,
  points,
  pointsLabel,
  pointsItems,
  progressBarSvg,
  dividerSvg,
  arrowChevronSvg,
  iconsBlockWidth = 236,
  bottomBlockWidth = 520,
  dataNodeId,
  cardCtaNodeId,
  nodeIds,
}: ProgramCardProps) {
  const n = nodeIds ?? {};
  return (
    <div
      className="absolute xl:left-[400px] xl:top-0 xl:w-[616px] xl:h-[732px] flex flex-col rounded-[48px]"
      style={{
        backgroundColor: outerBg,
        paddingTop: 8,
        paddingBottom: 16,
        paddingLeft: 8,
        paddingRight: 8,
        gap: 12,
      }}
      data-node-id={dataNodeId}
      data-program-card="true"
    >
      {/* inner white card */}
      <div
        className="flex flex-col rounded-[48px] bg-white"
        style={{ width: 600, height: 620, padding: 40, gap: 48 }}
        data-node-id={n.inner}
      >
        {/* 1. header block */}
        <div className="flex flex-col w-[520px]" style={{ gap: 16 }} data-node-id={n.header}>
          {/* progress bar row */}
          <div
            className="flex items-center w-full"
            style={{ height: 20, gap: 4 }}
          >
            <img
              src={progressBarSvg}
              alt=""
              aria-hidden="true"
              className="block"
              style={{ width: 520, height: 20 }}
            />
          </div>

          {/* h1 */}
          <h2
            className="font-['Pretendard_Variable'] font-bold"
            style={{
              fontSize: 36,
              lineHeight: 1.3,
              letterSpacing: "-1.08px",
              color: "#1d2623",
            }}
            data-node-id={n.title}
          >
            {title}
          </h2>

          {/* checklist / description rows */}
          <div className="flex flex-col w-full" style={{ gap: 12 }}>
            {checklist.map((text, i) => (
              <div key={i} className="flex items-start" style={{ gap: 8 }}>
                <div
                  className="flex items-center justify-center"
                  style={{ paddingTop: 4, paddingBottom: 4 }}
                >
                  <div
                    className="shrink-0"
                    aria-hidden="true"
                    style={{
                      width: 3,
                      height: 16,
                      borderRadius: 24,
                      backgroundColor: checklistBulletColor,
                    }}
                  />
                </div>
                <p
                  className="font-['Pretendard_Variable'] font-medium flex-1"
                  style={{
                    fontSize: 16,
                    lineHeight: 1.5,
                    letterSpacing: "-0.16px",
                    color: "#1d2623",
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. icon-rows block */}
        <div
          className="flex flex-col"
          style={{ gap: 16, width: iconsBlockWidth }}
          data-node-id={n.icons}
        >
          {points.map((p, i) => (
            <div key={i} className="flex items-center" style={{ gap: 12 }}>
              <img
                src={p.icon}
                alt=""
                aria-hidden="true"
                className="block shrink-0"
                style={{ width: 20, height: 20 }}
              />
              <p
                className="font-['Pretendard_Variable'] font-medium"
                style={{
                  fontSize: 16,
                  lineHeight: 1.5,
                  letterSpacing: "-0.16px",
                  color: "#1d2623",
                }}
              >
                {p.text}
              </p>
            </div>
          ))}
        </div>

        {/* 3. bottom label + ul */}
        <div
          className="flex flex-col"
          style={{ gap: 12, width: bottomBlockWidth }}
          data-node-id={n.bottom}
        >
          <div className="flex items-center" style={{ gap: 8 }} data-node-id={n.bottomLabel}>
            <div
              className="flex items-center justify-center"
              style={{ paddingTop: 4, paddingBottom: 4 }}
            >
              <div
                className="shrink-0"
                aria-hidden="true"
                style={{
                  width: 3,
                  height: 17,
                  borderRadius: 24,
                  backgroundColor: pointsBulletColor,
                }}
              />
            </div>
            <p
              className="font-['Pretendard_Variable'] font-semibold"
              style={{
                fontSize: 18,
                lineHeight: 1.4,
                letterSpacing: "-0.27px",
                color: "#1d2623",
              }}
            >
              {pointsLabel}
            </p>
          </div>
          <ul
            className="font-['Pretendard_Variable'] font-normal list-disc marker:text-[#1d2623]"
            style={{
              fontSize: 16,
              lineHeight: 1.5,
              letterSpacing: "-0.16px",
              color: "#1d2623",
              paddingLeft: 24,
            }}
            data-node-id={n.ul}
          >
            {pointsItems.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* dashed divider */}
      <div
        className="relative shrink-0"
        style={{ width: 600, height: 0, paddingLeft: 12, paddingRight: 12 }}
        data-node-id={n.divider}
      >
        <div
          className="absolute"
          style={{ left: 12, right: 12, top: -1, bottom: -1 }}
        >
          <img
            src={dividerSvg}
            alt=""
            aria-hidden="true"
            className="block"
            style={{ width: "100%", height: 2 }}
          />
        </div>
      </div>

      {/* CTA bar */}
      <div
        className="flex items-center justify-between rounded-[48px]"
        style={{
          backgroundColor: ctaBg,
          height: 64,
          width: 600,
          paddingTop: 16,
          paddingBottom: 16,
          paddingLeft: 24,
          paddingRight: 24,
        }}
        data-node-id={cardCtaNodeId}
      >
        <span
          className="font-['Pretendard_Variable'] font-bold"
          style={{
            fontSize: 20,
            lineHeight: 1.4,
            letterSpacing: "-0.4px",
            color: ctaTextColor,
          }}
        >
          자세히 보기
        </span>
        <div className="flex items-center" style={{ paddingRight: 16 }} data-node-id={n.arrows}>
          {[0, 1, 2].map((i) => (
            <img
              key={i}
              src={arrowChevronSvg}
              alt=""
              aria-hidden="true"
              className="block shrink-0"
              style={{ width: 32, height: 32, marginRight: -16 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
