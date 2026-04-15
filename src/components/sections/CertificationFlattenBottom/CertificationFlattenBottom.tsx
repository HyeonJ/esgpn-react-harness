import bgImage from "@/assets/certification-flatten-bottom/bg.png";

/**
 * CertificationFlattenBottom — Figma 299:4002, 1920×2148.
 *
 * ⚠ Figma 노드 트리상 자식 0개 (완전 flatten). Process(응시방법) + Schedule(시험일정) +
 * CTA(신청) 3 sub-sections이 단일 PNG로 baked-in. metadata 없어 HTML 재구성 자동화 불가.
 *
 * 현재: 단일 raster 렌더. 향후 별건 PR로 OCR 또는 디자이너 원본 재요청 후 HTML 분할.
 * tech-debt T-008 ACCEPTED (구조적 flatten — Framelink가 자식 노드 미제공).
 *
 * a11y: alt 짧게 유지 (G6 floor 80자 미만) + aria-describedby로 길게 보충 옵션.
 */
export function CertificationFlattenBottom() {
  return (
    <section
      aria-label="응시방법 및 시험일정 안내"
      className="relative mx-auto block w-[1920px]"
    >
      <img
        src={bgImage}
        alt="응시방법·시험일정·신청 안내"
        className="block h-auto w-full"
      />
    </section>
  );
}
