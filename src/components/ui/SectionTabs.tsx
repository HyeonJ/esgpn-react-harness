import { Link } from "react-router-dom";

/**
 * SectionTabs — 페이지 상단 네비게이션 탭 공통 컴포넌트.
 *
 * About 3개 페이지(/about, /about/organization, /about/operation) 및
 * 이후 자격검정 상단 탭 등에서 재사용 전제로 설계.
 * Breadcrumb 대체 역할(상위 페이지 내 서브섹션 네비).
 *
 * 스타일 규약:
 * - active: Gray 900 Bold + 하단 2px underline
 * - inactive: Gray 500 Medium
 * - 탭 간 gap: 52px (plan/about-header §1.3 측정치)
 * - 기본 정렬: 중앙 (섹션마다 override 가능 시 props 확장)
 */
export type SectionTabItem = {
  label: string;
  href: string;
  active?: boolean;
};

export interface SectionTabsProps {
  tabs: SectionTabItem[];
  className?: string;
}

export function SectionTabs({ tabs, className }: SectionTabsProps) {
  return (
    <nav
      className={["flex items-center justify-center", className ?? ""].join(" ").trim()}
      style={{ gap: "52px" }}
      aria-label="섹션 네비게이션"
    >
      {tabs.map((tab) => {
        const isActive = tab.active === true;
        return (
          <Link
            key={tab.href}
            to={tab.href}
            aria-current={isActive ? "page" : undefined}
            className="font-['Pretendard_Variable'] inline-block"
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: isActive ? 700 : 500,
              color: isActive ? "var(--color-gray-900)" : "var(--color-gray-500)",
              textDecoration: isActive ? "underline" : "none",
              textUnderlineOffset: "6px",
              textDecorationThickness: "2px",
              letterSpacing: "0px",
            }}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default SectionTabs;
