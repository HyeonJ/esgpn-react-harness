import mou1Image from "@/assets/gallery-agreements/mou-1.png";
import mou2Image from "@/assets/gallery-agreements/mou-2.png";
import { HatchedInlineHeading } from "@/components/ui/HatchedInlineHeading";
import { MouCard } from "@/components/ui/MouCard";

/**
 * GalleryAgreements — 갤러리 페이지 "업무 협약" 섹션.
 * Figma 314:7056, 936×1024 (실측 baseline 937×1024).
 *
 * 구조:
 *   col gap=24 items-center pb-40 w=936
 *     HatchedInlineHeading "업무 협약"
 *     col gap=32 items-start w=936
 *       row gap=24: MouCard MouCard
 *       row gap=24: MouCard MouCard   (1·2의 반복; Figma 더미 데이터)
 */
const cards = [
  {
    image: mou1Image,
    imageAlt: "COLiVE, CSR Impacrt(주), ㈜소프트퍼즐 업무 협약 사진",
    title: (
      <>
        COLiVE, CSR Impacrt(주),
        <br />
        ㈜소프트퍼즐 (2025. 8. 5.)
      </>
    ),
    description: (
      <>
        ESG실천 프로젝트의 공동 기획 수행을 위한 인력,
        <br />
        {"    교육콘텐츠, IT 기술 협력"}
      </>
    ),
  },
  {
    image: mou2Image,
    imageAlt: "COLiVE, 한국공공ESG학회 업무 협약 사진",
    title: (
      <>
        COLiVE, 한국공공ESG학회
        <br />
        (2025. 9. 17.)
      </>
    ),
    description: (
      <>
        지역 ESG 인재양성의 체계적 지원을 위한 사업 협력,
        <br />
        {"   지역발전 및 ESG경영 도입에 필요한 상호 협력 사업 추진"}
      </>
    ),
  },
];

export function GalleryAgreements() {
  return (
    <section
      aria-labelledby="gallery-agreements-heading"
      className="mx-auto flex w-[936px] flex-col items-center gap-[24px] pb-[40px]"
    >
      <h2 id="gallery-agreements-heading" className="sr-only">
        업무 협약
      </h2>
      <HatchedInlineHeading title="업무 협약" />
      <div className="flex w-full flex-col items-start gap-[32px]">
        {[0, 1].map((rowIdx) => (
          <div key={rowIdx} className="flex w-full items-start gap-[24px]">
            {cards.map((card, colIdx) => (
              <MouCard key={`${rowIdx}-${colIdx}`} {...card} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
