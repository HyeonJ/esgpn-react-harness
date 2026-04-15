import iconImage from "@/assets/certification-intro/icon.png";
import { HatchedSectionHeading } from "@/components/ui/HatchedSectionHeading";

/**
 * CertificationIntro — 자격검정 페이지 "자격검정의 필요성" (Figma 299:3875).
 * 1416×291. px-240 py-64. HatchedSectionHeading + 3-column 본문.
 *
 * 본문 column 3개 (flex-1, gap-32, 16 Pretendard Medium black center, ls -0.16):
 *  1. "지속가능한 미래를 위해 산업체가 요구하는 ESG 기본원칙과 핵심역량을 발전시키고\n이를 알상과 직장생활에서 실천한다."
 *  2. "지역사회와 직장에서 긍정적인 변화를\n이끌어내는 실천가가 되어 큰 변화를\n만드는 데 기여한다."
 *  3. "ESG 원칙을 실천하여 지속가능한\n미래를 위한 일에 참여할 수 있는 기회를 만들고 다음세대에도 긍정적인 영향을 미친다."
 */
export function CertificationIntro() {
  return (
    <section
      aria-labelledby="certification-intro-heading"
      className="mx-auto flex max-w-[1416px] w-full flex-col items-end gap-[20px] px-[240px] py-[64px]"
    >
      <HatchedSectionHeading
        icon={iconImage}
        iconAlt=""
        title="자격검정의 필요성"
        titleId="certification-intro-heading"
        className="w-full"
      />
      <div className="flex w-full items-start gap-[32px] text-center text-black">
        <p
          className="flex-1 font-medium"
          style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: -0.16 }}
        >
          지속가능한 미래를 위해 산업체가 요구하는 ESG 기본원칙과 핵심역량을 발전시키고
          <br />
          이를 알상과 직장생활에서 실천한다.
        </p>
        <p
          className="flex-1 font-medium"
          style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: -0.16 }}
        >
          지역사회와 직장에서 긍정적인 변화를
          <br />
          이끌어내는 실천가가 되어 큰 변화를
          <br />
          만드는 데 기여한다.
        </p>
        <p
          className="flex-1 font-medium"
          style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: -0.16 }}
        >
          ESG 원칙을 실천하여 지속가능한
          <br />
          미래를 위한 일에 참여할 수 있는 기회를 만들고 다음세대에도 긍정적인 영향을 미친다.
        </p>
      </div>
    </section>
  );
}
