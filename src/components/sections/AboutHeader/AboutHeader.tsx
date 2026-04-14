import { SectionTabs } from "@/components/ui/SectionTabs";

/**
 * AboutHeader — About 페이지 개요/철학 헤더 섹션.
 *
 * Figma 노드: 52:624 (단일 flatten 이미지 — 텍스트 노드 없음).
 * 구현 전략: [A] 완전 HTML 재구성 (텍스트 전용, 이미지 삽입 금지).
 * baseline: figma-screenshots/about-header.png (1920×454, about-full crop).
 *
 * 수직 구성 (about-full.png y축 기준, 섹션 top=88 상대):
 *   탭 row:        y=169~189  → section 내부 top 81 (pt-[81px])
 *   ESGPN 타이틀:  y=269~388  → 탭 밑줄(y=189)에서 80px gap (mt-[80px])
 *   서브카피:      y=435~476  → ESGPN 하단(y=388)에서 47px gap (mt-[47px])
 *   섹션 하단:     y=541 (height=454)
 */
export function AboutHeader() {
  return (
    <section
      className="w-[1920px] h-[454px] bg-white mx-auto flex flex-col items-center"
      aria-label="About 개요 및 철학 헤더"
    >
      {/* Tabs row (상단에서 81px 오프셋 — y=169 - 88) */}
      <div className="pt-[81px]">
        <SectionTabs
          tabs={[
            { label: "개요 & 철학", href: "/about", active: true },
            { label: "조직도", href: "/about/organization" },
            { label: "운영계획", href: "/about/operation" },
          ]}
        />
      </div>

      {/* ESGPN 대형 타이포 — 탭 밑줄(y=189)에서 80px gap */}
      <h1
        style={{
          fontFamily: "var(--font-family-yeseva)",
          fontWeight: 400,
          fontSize: "152px",
          lineHeight: "120px",
          letterSpacing: "0px",
          color: "var(--color-gray-900)",
          margin: "80px 0 0 0",
        }}
      >
        ESGPN
      </h1>

      {/* 서브카피 2줄 — ESGPN 하단(y=388)에서 47px gap */}
      <p
        className="font-['Pretendard_Variable'] text-center"
        style={{
          fontSize: "15px",
          lineHeight: "27px",
          fontWeight: 400,
          letterSpacing: "-0.75px",
          color: "var(--color-gray-700)",
          margin: "47px 0 0 0",
        }}
      >
        ESGPN은 대학, 학회, 산업체, 지역사회가 함께
        <br />
        지속가능한 미래를 행동으로 구현 하는 것을 목표로 합니다.
      </p>
    </section>
  );
}

export default AboutHeader;
