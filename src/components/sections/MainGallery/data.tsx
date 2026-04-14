import card1Thumb from "@/assets/main-gallery/card1-thumb.png";
import card2Thumb from "@/assets/main-gallery/card2-thumb.png";
import card3Thumb from "@/assets/main-gallery/card3-thumb.png";
import awardThumb from "@/assets/main-gallery/award-thumb.png";
import type { ReactNode } from "react";

export interface GalleryThumbInner {
  /** e.g. "-2.62%" */
  top: string;
  /** e.g. "-1.45%" */
  left: string;
  /** e.g. "102.9%" */
  width: string;
  /** e.g. "107.29%" */
  height: string;
}

export interface GalleryPartnershipCardData {
  nodeId: string;
  cardNodeId: string;
  thumbNodeId: string;
  titleNodeId: string;
  descNodeId: string;
  thumbSrc: string;
  thumbInner: GalleryThumbInner;
  title: ReactNode;
  desc: ReactNode;
}

/** 업무 협약 3 카드 */
export const partnershipCards: GalleryPartnershipCardData[] = [
  {
    nodeId: "43:1837",
    cardNodeId: "43:1826",
    thumbNodeId: "43:1826",
    titleNodeId: "43:1834",
    descNodeId: "43:1835",
    thumbSrc: card1Thumb,
    thumbInner: { top: "-2.62%", left: "-1.45%", width: "102.9%", height: "107.29%" },
    title: (
      <>
        COLiVE, CSR Impacrt(주),
        <br aria-hidden="true" />
        ㈜소프트퍼즐 (2025. 8. 5.)
      </>
    ),
    desc: (
      <>
        {"ESG실천 프로젝트의 공동 기획 수행을 위한 인력, "}
        <br aria-hidden="true" />
        {"    교육콘텐츠, IT 기술 협력"}
      </>
    ),
  },
  {
    nodeId: "43:1838",
    cardNodeId: "43:1839",
    thumbNodeId: "43:1839",
    titleNodeId: "43:1842",
    descNodeId: "43:1843",
    thumbSrc: card2Thumb,
    thumbInner: { top: "-0.74%", left: "-2.48%", width: "104.96%", height: "105.81%" },
    title: (
      <>
        COLiVE, 한국공공ESG학회
        <br aria-hidden="true" />
        (2025. 9. 17.)
      </>
    ),
    desc: (
      <>
        {"지역 ESG 인재양성의 체계적 지원을 위한 사업 협력,"}
        <br aria-hidden="true" />
        {"   지역발전 및 ESG경영 도입에 필요한 상호 협력 사업 추진"}
      </>
    ),
  },
  {
    nodeId: "43:1845",
    cardNodeId: "43:1846",
    thumbNodeId: "43:1846",
    titleNodeId: "43:1849",
    descNodeId: "43:1850",
    thumbSrc: card3Thumb,
    thumbInner: { top: "-1.17%", left: "-2.1%", width: "104.19%", height: "105.04%" },
    title: (
      <>
        COLiVE, 한국지속가능발전학회
        <br aria-hidden="true" />
        (2025. 9. 22.)
      </>
    ),
    desc: (
      <>
        {"지역 인재양성의 체계적 지원을 위한 사업 협력, 지방소멸 대응에 필요한 상호협력,"}
        <br aria-hidden="true" />
        {"지역사회의 지속가능한 발전을 위한 공동 연구 및 정보 교류"}
      </>
    ),
  },
];

export interface GalleryAwardCardData {
  nodeId: string;
  cardNodeId: string;
  thumbNodeId: string;
  titleNodeId: string;
  descNodeId: string;
  /** 백플레이트 (card2 썸네일) — overflow-hidden 내부 */
  backingSrc: string;
  backingInner: GalleryThumbInner;
  /** 상단 덮는 메인 상장 이미지 */
  overlaySrc: string;
  title: ReactNode;
  desc: ReactNode;
}

export const awardCard: GalleryAwardCardData = {
  nodeId: "43:1891",
  cardNodeId: "43:1892",
  thumbNodeId: "43:1892",
  titleNodeId: "43:1894",
  descNodeId: "43:1895",
  backingSrc: card2Thumb,
  backingInner: { top: "-0.74%", left: "-2.48%", width: "104.96%", height: "105.81%" },
  overlaySrc: awardThumb,
  title: (
    <>
      COLiVE_한국ESG대상 수상
      <br aria-hidden="true" />
      (2023.12.26.)
    </>
  ),
  desc: <>사회공헌부문 단체</>,
};
