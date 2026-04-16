import espgnLogo from "@/assets/about-organization-logos/espgn.png";
import coliveLogo from "@/assets/about-organization-logos/colive.png";
import assocLogo from "@/assets/about-organization-logos/assoc.png";

/**
 * AboutOrganizationLogos — About 조직도 페이지 2번째 섹션 "운영주체 로고".
 *
 * v4 원칙:
 * - flex column 레이아웃 (absolute 0)
 * - 디자인 토큰 참조 (gray-300 pipe, gray-000 bg, font-family-pretendard)
 * - 시맨틱 HTML: section + h2 sr-only + img alt
 * - 텍스트 "운영주체"는 HTML (G8 — JSX literal text)
 *
 * Figma source: 89:1295 (flatten) — full.png y=190~490 영역 crop.
 * Baseline: figma-screenshots/about-organization-logos.png (1920×300).
 *
 * 로고 3종은 baked-in raster (ESPGN serif, Colive gradient, Assoc 복합) →
 * baseline crop PNG 채택. 텍스트 재구성 비용 대비 G1 효율.
 * 단, alt 텍스트는 의미 보존 (SEO/스크린리더).
 */
export function AboutOrganizationLogos() {
  return (
    <section
      aria-labelledby="about-org-logos-title"
      className="mx-auto flex w-full max-w-[1920px] flex-col items-center bg-gray-000"
      style={{ height: 300 }}
    >
      <h2 id="about-org-logos-title" className="sr-only">
        ESGPN 운영주체
      </h2>

      {/* 상단 padding 84px → divider row with "운영주체" label */}
      <div
        className="mt-[84px] flex items-center justify-center"
        role="presentation"
      >
        {/* 좌측 hatched + solid line */}
        <svg
          width="434"
          height="10"
          viewBox="0 0 434 10"
          fill="none"
          aria-hidden="true"
        >
          <g stroke="var(--color-gray-500)" strokeWidth="1">
            <line x1="0" y1="10" x2="7" y2="0" />
            <line x1="8" y1="10" x2="15" y2="0" />
            <line x1="16" y1="10" x2="23" y2="0" />
            <line x1="24" y1="10" x2="31" y2="0" />
          </g>
          <line
            x1="44"
            y1="5"
            x2="434"
            y2="5"
            stroke="var(--color-gray-400)"
            strokeWidth="1"
          />
        </svg>

        {/* 중앙 라벨 */}
        <span
          className="px-[8px] text-[12px] font-medium leading-none text-[var(--color-gray-500)]"
          style={{ fontFamily: "var(--font-family-pretendard)" }}
        >
          운영주체
        </span>

        {/* 우측 solid line + hatched */}
        <svg
          width="434"
          height="10"
          viewBox="0 0 434 10"
          fill="none"
          aria-hidden="true"
        >
          <line
            x1="0"
            y1="5"
            x2="390"
            y2="5"
            stroke="var(--color-gray-400)"
            strokeWidth="1"
          />
          <g stroke="var(--color-gray-500)" strokeWidth="1">
            <line x1="402" y1="10" x2="409" y2="0" />
            <line x1="410" y1="10" x2="417" y2="0" />
            <line x1="418" y1="10" x2="425" y2="0" />
            <line x1="426" y1="10" x2="433" y2="0" />
          </g>
        </svg>
      </div>

      {/* divider → logo row gap 40px */}
      <div
        role="group"
        aria-label="운영주체 로고"
        className="mt-[40px] flex items-center justify-center"
      >
        <img
          src={espgnLogo}
          alt="ESPGN"
          width={291}
          height={64}
          className="block"
        />
        <span
          aria-hidden="true"
          className="mx-[27px] block h-[46px] w-[2px] bg-[var(--color-gray-300)]"
        />
        <img
          src={coliveLogo}
          alt="Colive"
          width={218}
          height={64}
          className="block"
        />
        <figure className="ml-[16px] m-0 flex items-center">
          <img
            src={assocLogo}
            alt="전문대학평생직업교육협회"
            width={301}
            height={58}
            className="block self-center"
          />
          <figcaption className="sr-only">
            사단법인 전문대학평생직업교육협회 (Council for Lifelong Vocational
            Education of University College)
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
