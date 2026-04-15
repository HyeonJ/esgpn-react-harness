import iconImage from "@/assets/certification-intro/icon.png";
import { HatchedSectionHeading } from "@/components/ui/HatchedSectionHeading";

/**
 * CertificationSubjects — 자격검정 영역 (Figma 299:3900). 1416×411.
 * 3 카드 (#eff0f0 bg, rounded-20, p-24).
 *
 * 각 카드:
 *   col gap-20 items-start
 *     title 20 SB #0a0a0a leading 1.4 ls -0.4
 *     bullets col gap-12 w-246
 *       row gap-12 items-center
 *         dot 12×12 (CSS — Figma는 Ellipse6 이미지였으나 단색 원이라 CSS 충분)
 *         text 16 R #1e2939 leading 1.5 ls -0.16
 *
 * Icon은 intro와 동일 (Rectangle 23 globe) — 재사용
 */

interface Subject {
  title: string;
  bullets: string[];
}

const subjects: Subject[] = [
  { title: "ESG 기본개념", bullets: ["1-1. ESG 정의", "1-2. ESG 이슈와 필요성", "1-3. ESG 발전과정"] },
  { title: "ESG 기본 용어", bullets: ["2-1. ESG 용어", "2-2. ESG 약자"] },
  { title: "ESG 실행 및 실천", bullets: ["3-1. ESG 관련 법", "3-2. ESG 관련 기관과 프레임워크", "3-3. ESG 실천 방안"] },
];

export function CertificationSubjects() {
  return (
    <section
      aria-labelledby="certification-subjects-heading"
      className="mx-auto flex w-[1416px] flex-col items-end gap-[20px] px-[240px] py-[64px]"
    >
      <HatchedSectionHeading
        icon={iconImage}
        iconAlt=""
        title="자격검정 영역"
        titleId="certification-subjects-heading"
        className="w-full"
      />
      <div className="flex w-full items-start gap-[12px]">
        {subjects.map((s) => (
          <div
            key={s.title}
            className="flex flex-1 flex-col items-start gap-[20px] self-stretch rounded-[20px] bg-[#eff0f0] p-[24px]"
          >
            <p
              className="whitespace-nowrap font-semibold text-[#0a0a0a]"
              style={{ fontSize: 20, lineHeight: 1.4, letterSpacing: -0.4 }}
            >
              {s.title}
            </p>
            <ul className="flex w-[246px] flex-col items-start gap-[12px]">
              {s.bullets.map((b) => (
                <li key={b} className="flex items-center gap-[12px]">
                  <span
                    aria-hidden="true"
                    className="block size-[12px] shrink-0 rounded-full"
                    style={{ backgroundColor: "#4FB654" }}
                  />
                  <span
                    className="whitespace-nowrap font-normal text-[#1e2939]"
                    style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: -0.16 }}
                  >
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
