import { Link } from "react-router-dom";
import clsx from "clsx";

export interface NavItemProps {
  /** 메뉴 라벨 (Figma 1depth 텍스트) */
  label: string;
  /** react-router 라우트 경로 */
  to: string;
  /** 현재 활성 메뉴 여부 — Figma 스펙에 없어 합리적 기본 (font-bold) 적용 */
  active?: boolean;
  /** 보충 스타일 */
  className?: string;
}

/**
 * Header 1depth 메뉴 아이템.
 * Figma 노드: 52:1359 외 5개 (같은 구조 반복).
 * 스펙 (research/header.md §3.1):
 *  - Pretendard Medium 14 / line-height 20 / ls 0
 *  - color: --color-gray-900
 *  - mix-blend: luminosity
 *  - padding-y: 4px
 */
export function NavItem({ label, to, active, className }: NavItemProps) {
  return (
    <Link
      to={to}
      className={clsx(
        "flex items-center justify-center py-1",
        "text-[14px] leading-[20px] font-medium",
        "text-[var(--color-gray-900)]",
        "mix-blend-luminosity",
        "whitespace-nowrap text-center",
        "transition-opacity hover:opacity-70",
        active && "font-bold",
        className,
      )}
    >
      {label}
    </Link>
  );
}
