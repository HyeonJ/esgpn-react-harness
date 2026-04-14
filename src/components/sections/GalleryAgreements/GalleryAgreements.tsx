import { HatchedTextHeading } from "@/components/ui/HatchedTextHeading";
import { MouCard } from "./MouCard";
import mouCsrImpacrt from "@/assets/gallery-agreements/mou-csr-impacrt.png";
import mouEsgSociety from "@/assets/gallery-agreements/mou-esg-society.png";

/**
 * gallery-agreements — /gallery 페이지의 "업무 협약" 섹션.
 * Figma node 314:7056, 936×1024.
 *
 * - 섹션 루트 w-[936px] mx-auto 내장 (페이지 통합 시 정렬 책임)
 * - 4 카드는 Figma 원본 더미 중복 (CSR/ESG 각 2회) — 디자인 의도 그대로
 */
const CARD_CSR = {
  imageUrl: mouCsrImpacrt,
  imageAlt: "COLiVE, CSR Impacrt(주), 소프트퍼즐 업무 협약 단체 사진",
  title: "COLiVE, CSR Impacrt(주),\n㈜소프트퍼즐 (2025. 8. 5.)",
  description:
    "ESG실천 프로젝트의 공동 기획 수행을 위한 인력, \n    교육콘텐츠, IT 기술 협력",
} as const;

const CARD_ESG = {
  imageUrl: mouEsgSociety,
  imageAlt: "COLiVE, 한국공공ESG학회 업무 협약 체결식",
  title: "COLiVE, 한국공공ESG학회\n(2025. 9. 17.)",
  description:
    "지역 ESG 인재양성의 체계적 지원을 위한 사업 협력,\n   지역발전 및 ESG경영 도입에 필요한 상호 협력 사업 추진",
} as const;

export function GalleryAgreements() {
  return (
    <section className="mx-auto flex w-[936px] flex-col items-center gap-[24px] pb-[40px]">
      <HatchedTextHeading text="업무 협약" />
      <div className="flex w-full flex-col gap-[32px]">
        <div className="flex w-full gap-[24px]">
          <MouCard {...CARD_CSR} />
          <MouCard {...CARD_ESG} />
        </div>
        {/* Figma 원본 더미 중복 — 추후 콘텐츠 채워질 때 props 배열로 리팩토링 */}
        <div className="flex w-full gap-[24px]">
          <MouCard {...CARD_CSR} />
          <MouCard {...CARD_ESG} />
        </div>
      </div>
    </section>
  );
}
