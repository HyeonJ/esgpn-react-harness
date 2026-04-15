import { SectionTabs } from "@/components/ui/SectionTabs";

/**
 * AboutOrganizationTabs — About 조직도 페이지 상단 탭 섹션.
 *
 * Figma 노드: 89:1295 (flatten 단일 이미지 — 하위 노드 없음).
 * 구현 전략: [A] 완전 HTML 재구성 (텍스트 전용, SectionTabs 공통 컴포넌트 재사용).
 * baseline: figma-screenshots/about-organization-tabs.png (1920×102).
 *
 * 수직 구성 (Figma 절대 page-y):
 *   탭 텍스트 row: y=168~179 → pt-[168px] (Header fixed 0-88 clear)
 *   underline:     y=188~189 → SectionTabs 내장 (offset 6px + thickness 2px)
 *   섹션 하단:     y=190 → height 190 (기존 102 + Header 88 여백 내장)
 *
 * v3 fix: Header가 fixed라 섹션이 page y=0부터 시작. AboutHeader 동일 패턴.
 *
 * Rule of Three 2/3 — SectionTabs 2번째 소비자. 컴포넌트 파일 수정 0줄.
 */
export function AboutOrganizationTabs() {
  return (
    <section
      className="max-w-[1920px] w-full h-[190px] bg-white mx-auto flex flex-col items-center"
      aria-label="About 조직도 탭"
    >
      <div className="pt-[168px]">
        <SectionTabs
          tabs={[
            { label: "개요 & 철학", href: "/about" },
            { label: "조직도", href: "/about/organization", active: true },
            { label: "운영계획", href: "/about/operation" },
          ]}
        />
      </div>
    </section>
  );
}

export default AboutOrganizationTabs;
