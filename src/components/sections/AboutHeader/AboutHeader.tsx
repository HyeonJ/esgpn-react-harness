import { SectionTabs } from "@/components/ui/SectionTabs";

/**
 * AboutHeader — About 페이지 개요/철학 헤더 섹션.
 *
 * Figma 노드: 52:624 (단일 flatten 이미지 — 텍스트 노드 없음).
 * 구현 전략: [A] 완전 HTML 재구성 (텍스트 전용, 이미지 삽입 금지).
 * baseline: figma-screenshots/about-header.png (1920×454, about-full crop).
 *
 * 수직 구성 (Figma 절대 page-y 기준):
 *   탭 row:        y=169~189  → pt-[169px] (Header fixed 0-88 clear)
 *   ESGPN 타이틀:  y=269~388  → 탭 밑줄(y=189)에서 80px gap
 *   서브카피:      y=435~476  → ESGPN 하단(y=388)에서 47px gap
 *   섹션 하단:     y=541 → height 542 (= 기존 454 + Header 88 여백 내장)
 *
 * v3 fix: Header가 fixed top-4라 섹션이 page y=0부터 시작. 이전 pt-[81px]은
 * "section y=0 = page y=88" 모델 기반이었으나 Header 통과로 탭이 가림.
 * 이제 Figma 절대 page-y 기준 (contact-form과 동일 패턴).
 */
export function AboutHeader() {
  return (
    <section
      className="max-w-[1920px] w-full h-[542px] bg-white mx-auto flex flex-col items-center"
      aria-label="About 개요 및 철학 헤더"
    >
      {/* Tabs row (Figma page-y 169) */}
      <div className="pt-[169px]">
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
