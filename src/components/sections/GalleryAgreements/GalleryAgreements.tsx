import { MouCard } from "@/components/ui/MouCard";
import { HatchedInlineDecor } from "./HatchedInlineDecor";
import mou1 from "@/assets/gallery-agreements/mou-1.png";
import mou2 from "@/assets/gallery-agreements/mou-2.png";

/**
 * GalleryAgreements — /gallery 페이지 "업무 협약" 섹션 (Figma 314:7056).
 *
 * 구조:
 *  - 섹션 자기정렬 `mx-auto w-[936px]` (페이지 컨텐츠 폭 936 ≠ 1416 표준)
 *  - 헤딩 바: h2 "업무 협약" (16/500/LH24/LS -0.16) + 실선 + 6 tick 데코
 *  - 2×2 MOU 카드 그리드 (col gap 24, row gap 32)
 *
 * v4 원칙:
 *  - 텍스트 전부 HTML literal (composite PNG 금지)
 *  - 이미지는 leaf nodeId(314:7063, 314:7068)로 개별 export된 456×302 static PNG
 *  - Figma 더미 구조 그대로 재현: 카드 1=3, 2=4 동일 데이터
 *
 * Baseline: `figma-screenshots/gallery-agreements.png` (937×1024).
 * clip (preview, 1920 viewport): --clip-x 492 --clip-y 0 --clip-w 936 --clip-h 1024
 */

/**
 * Figma에 U+2028 (Line Separator)로 강제 줄바꿈된 원본 텍스트를 그대로 재현.
 * - 카드 1/3 (동일): "COLiVE, CSR Impacrt(주)," | "㈜소프트퍼즐 (2025. 8. 5.)"
 * - 카드 2/4 (동일): "COLiVE, 한국공공ESG학회" | "(2025. 9. 17.)"
 * - 설명 1/3: "ESG실천 프로젝트의 공동 기획 수행을 위한 인력," | "교육콘텐츠, IT 기술 협력"
 * - 설명 2/4: "지역 ESG 인재양성의 체계적 지원을 위한 사업 협력," | "지역발전 및 ESG경영 도입에 필요한 상호 협력 사업 추진"
 */
type Agreement = {
  image: string;
  institutionLine1: string;
  institutionLine2Prefix: string;
  dateDisplay: string;
  dateIso: string;
  descriptionLine1: string;
  descriptionLine2: string;
  nodeId: string;
};

const AGREEMENT_A: Omit<Agreement, "nodeId"> = {
  image: mou1,
  institutionLine1: "COLiVE, CSR Impacrt(주),",
  institutionLine2Prefix: "㈜소프트퍼즐 ",
  dateDisplay: "(2025. 8. 5.)",
  dateIso: "2025-08-05",
  descriptionLine1: "ESG실천 프로젝트의 공동 기획 수행을 위한 인력,",
  descriptionLine2: "교육콘텐츠, IT 기술 협력",
};

const AGREEMENT_B: Omit<Agreement, "nodeId"> = {
  image: mou2,
  institutionLine1: "COLiVE, 한국공공ESG학회",
  institutionLine2Prefix: "",
  dateDisplay: "(2025. 9. 17.)",
  dateIso: "2025-09-17",
  descriptionLine1: "지역 ESG 인재양성의 체계적 지원을 위한 사업 협력,",
  descriptionLine2: "지역발전 및 ESG경영 도입에 필요한 상호 협력 사업 추진",
};

const AGREEMENTS: Agreement[] = [
  { ...AGREEMENT_A, nodeId: "314:7062" },
  { ...AGREEMENT_B, nodeId: "314:7067" },
  { ...AGREEMENT_A, nodeId: "314:7134" },
  { ...AGREEMENT_B, nodeId: "314:7139" },
];

export function GalleryAgreements() {
  return (
    <section
      aria-labelledby="gallery-agreements-heading"
      className="mx-auto flex w-full max-w-[1920px] justify-center bg-gray-000"
      data-node-id="314:7056"
    >
      <div className="flex w-[936px] flex-col gap-[24px] pb-[40px]">
        <div
          className="flex items-center gap-[8px]"
          data-node-id="314:7091"
        >
          <h2
            id="gallery-agreements-heading"
            className="shrink-0 whitespace-nowrap text-black"
            style={{
              fontFamily: "var(--font-family-pretendard)",
              fontSize: 16,
              fontWeight: 500,
              lineHeight: "24px",
              letterSpacing: "-0.16px",
            }}
            data-node-id="314:7092"
          >
            업무 협약
          </h2>
          <HatchedInlineDecor />
        </div>
        <ul
          className="grid grid-cols-2 gap-x-[24px] gap-y-[32px]"
          data-node-id="314:7144"
        >
          {AGREEMENTS.map((a, i) => (
            <li key={i} className="list-none">
              <MouCard
                image={a.image}
                alt=""
                institutionLine1={a.institutionLine1}
                institutionLine2Prefix={a.institutionLine2Prefix}
                dateDisplay={a.dateDisplay}
                dateIso={a.dateIso}
                descriptionLine1={a.descriptionLine1}
                descriptionLine2={a.descriptionLine2}
                nodeId={a.nodeId}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
