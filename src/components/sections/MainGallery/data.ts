import card1Thumb from "@/assets/main-gallery/card1-thumb.png";
import card2Thumb from "@/assets/main-gallery/card2-thumb.png";
import card3Thumb from "@/assets/main-gallery/card3-thumb.png";
import awardThumb from "@/assets/main-gallery/award-thumb.png";
import awardThumbOverlay from "@/assets/main-gallery/award-thumb-overlay.png";

export interface GalleryCardData {
  nodeId: string;
  thumbSrc: string;
  title: string;
  desc: string;
  awardBacking?: {
    src: string;
  };
}

export const partnershipCards: GalleryCardData[] = [
  {
    nodeId: "43:1837",
    thumbSrc: card1Thumb,
    title: "COLiVE, CSR Impacrt(주),\n㈜소프트퍼즐 (2025. 8. 5.)",
    desc: "ESG실천 프로젝트의 공동 기획 수행을 위한 인력, \n    교육콘텐츠, IT 기술 협력",
  },
  {
    nodeId: "43:1838",
    thumbSrc: card2Thumb,
    title: "COLiVE, 한국공공ESG학회\n(2025. 9. 17.)",
    desc: "지역 ESG 인재양성의 체계적 지원을 위한 사업 협력,\n   지역발전 및 ESG경영 도입에 필요한 상호 협력 사업 추진",
  },
  {
    nodeId: "43:1845",
    thumbSrc: card3Thumb,
    title: "COLiVE, 한국지속가능발전학회\n(2025. 9. 22.)",
    desc: "지역 인재양성의 체계적 지원을 위한 사업 협력, 지방소멸 대응에 필요한 상호협력,\n지역사회의 지속가능한 발전을 위한 공동 연구 및 정보 교류",
  },
];

export const awardCard: GalleryCardData = {
  nodeId: "43:1891",
  thumbSrc: awardThumb,
  title: "COLiVE_한국ESG대상 수상\n(2023.12.26.)",
  desc: "사회공헌부문 단체",
  awardBacking: {
    src: awardThumbOverlay,
  },
};
