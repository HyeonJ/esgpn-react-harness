import bgImage from "@/assets/certification-stats/bg.png";

import { Fragment } from "react";

/**
 * CertificationStats — 자격검정 페이지 Stats (Figma 299:3862).
 * 1920×194. Hero bg 위 overlay 영역. py-48, 3 stat cards + 2 vertical dividers.
 *
 * Cards (240w each):
 *  1. "1,500+" 48B + "자격 취득자" 16M
 *  2. "이론부터 실행" 40B + "체계적 과정" 16M
 *  3. "100%" 48B + "온라인 응시" 16M
 *
 * Divider: w-0 h-64 with absolute inset[-0.5px] line (1px white)
 */

interface Stat {
  big: string;
  bigSize: 40 | 48;
  bigLs: number;
  small: string;
}

const stats: Stat[] = [
  { big: "1,500+", bigSize: 48, bigLs: -1.92, small: "자격 취득자" },
  { big: "이론부터 실행", bigSize: 40, bigLs: -1.6, small: "체계적 과정" },
  { big: "100%", bigSize: 48, bigLs: -1.92, small: "온라인 응시" },
];

export function CertificationStats() {
  return (
    <section
      aria-labelledby="certification-stats-heading"
      className="relative mx-auto h-[194px] max-w-[1920px] w-full overflow-hidden"
    >
      <h2 id="certification-stats-heading" className="sr-only">
        자격검정 통계
      </h2>
      {/* 배경 — Hero bg 하단 baked, 통계 영역 단독 export */}
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 block h-full w-full"
      />
      {/* 3 stat cards + 2 dividers, py-48 gap-16 */}
      <div className="relative flex h-full items-center justify-center gap-[16px] py-[48px]">
        {stats.map((s, i) => (
          <Fragment key={i}>
            {i > 0 && (
              <div
                aria-hidden="true"
                className="h-[64px] w-px"
                style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
              />
            )}
            <div
              className="flex w-[240px] flex-col items-center gap-[12px] text-center text-white"
            >
              <p
                className="font-bold w-full"
                style={{
                  fontSize: s.bigSize,
                  lineHeight: 1.3,
                  letterSpacing: s.bigLs,
                }}
              >
                {s.big}
              </p>
              <p
                className="font-medium w-full"
                style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: -0.16 }}
              >
                {s.small}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
