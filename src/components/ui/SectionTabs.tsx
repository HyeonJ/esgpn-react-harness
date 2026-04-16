import { Link } from "react-router-dom";

type TabItem = {
  label: string;
  href: string;
  active?: boolean;
};

type SectionTabsProps = {
  tabs: TabItem[];
  className?: string;
};

/**
 * Horizontal tab navigation for section pages (About, Certification, etc.).
 * Active tab: gray-900 bold + 2px underline. Inactive: gray-500 medium.
 */
export function SectionTabs({ tabs, className = "" }: SectionTabsProps) {
  return (
    <nav
      aria-label="섹션 탭 네비게이션"
      className={`flex items-center gap-[52px] ${className}`}
    >
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          to={tab.href}
          className={
            tab.active
              ? "text-[length:var(--text-sm-14sb-size)] font-[number:var(--text-sm-14sb-weight)] leading-[var(--text-sm-14sb-line-height)] tracking-[var(--text-sm-14sb-letter-spacing)] text-gray-900 underline underline-offset-[9px] decoration-2 decoration-gray-900"
              : "text-[length:var(--text-sm-14m-size)] font-[number:var(--text-sm-14m-weight)] leading-[var(--text-sm-14m-line-height)] tracking-[var(--text-sm-14m-letter-spacing)] text-gray-500 hover:text-gray-700 transition-colors"
          }
          aria-current={tab.active ? "page" : undefined}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
