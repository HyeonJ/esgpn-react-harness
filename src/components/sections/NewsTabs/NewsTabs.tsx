import { SectionTabs } from "@/components/ui/SectionTabs";

/**
 * NewsTabs — 뉴스 페이지 상단 탭 (Figma 129:2196).
 * 936×29. SectionTabs 재사용. "뉴스" / "자료실" 2탭, "뉴스" active.
 * gap 9px (tabs 간격) — 노드 트리상 401→466 = 65, 첫 탭 width 57 + gap 8.
 *
 * 단 SectionTabs 기본 gap=52라 다름 — 뉴스 페이지 전용 inline 사용.
 */
export function NewsTabs() {
  return (
    <section
      aria-label="뉴스 카테고리"
      className="mx-auto flex w-[936px] justify-center"
    >
      <SectionTabs
        tabs={[
          { label: "뉴스", href: "/news", active: true },
          { label: "자료실", href: "/news#archive" },
        ]}
      />
    </section>
  );
}
