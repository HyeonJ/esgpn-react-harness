import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { NavItem } from "./NavItem";
import esgpnLogo from "@/assets/header/esgpn-logo.svg";
import hamburgerIcon from "@/assets/header/hamburger.svg";

export interface HeaderProps {
  /** 현재 활성 메뉴의 라우트. 미지정 시 react-router useLocation.pathname 사용. */
  activePath?: string;
  /** 햄버거 토글 핸들러 — 모바일 메뉴 드로어는 후속 PR에서 구현. */
  onMenuToggle?: () => void;
  /** 햄버거 버튼의 aria-expanded 상태 */
  isMenuOpen?: boolean;
  /** 보충 스타일 */
  className?: string;
}

/**
 * 공통 Header (GNB / Top Nav).
 * Figma 노드: 52:1379 (인스턴스) / 52:1378 (원본).
 * 레이아웃: 1416x72 floating pill, px=40, radius=40, bg=rgba(0,0,0,0.04), backdrop-blur=12px.
 *
 * 이번 PR 범위:
 *  - Header 컴포넌트 자체 + preview 라우트 장착.
 *  - 모바일 드로어, App.tsx 전역 장착은 후속 PR.
 *
 * 사용자 승인 반영 (2026-04-13):
 *  - A1: 고객센터 폰트 Pretendard 통일 (Figma 원본 Noto Sans KR 대신).
 *  - A2: hover:opacity-70 + active:font-bold 기본값 적용.
 *  - A3: 사회공헌사업 `/social` 임시 라우트.
 *  - A4: 햄버거 onClick만 노출, 드로어는 후속 PR.
 *  - A5: App.tsx 전역 장착 제외.
 *  - A6: clsx 설치.
 */
const NAV_ITEMS = [
  { label: "ESGPN 소개", to: "/about" },
  { label: "ESG 실천 아이디어 경진대회", to: "/contest" },
  { label: "ESG 마인드 자격검정", to: "/certification" },
  { label: "사회공헌사업", to: "/social" },
  { label: "뉴스 · 자료실", to: "/news" },
  { label: "갤러리", to: "/gallery" },
] as const;

export function Header({
  activePath,
  onMenuToggle,
  isMenuOpen,
  className,
}: HeaderProps) {
  const location = useLocation();
  const currentPath = activePath ?? location.pathname;

  return (
    <header
      role="banner"
      className={clsx(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50",
        "w-[calc(100%-16px)] sm:w-[calc(100%-32px)] max-w-[1416px] h-[72px]",
        "flex items-center justify-between",
        "px-4 sm:px-6 lg:px-10",
        "rounded-[40px]",
        "bg-[var(--color-black-opacity-100)]",
        "backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]",
        className,
      )}
    >
      {/* 로고 */}
      <Link
        to="/"
        className="flex items-center w-auto lg:w-[180px] shrink-0"
        aria-label="ESGPN 홈으로"
      >
        <img
          src={esgpnLogo}
          alt="ESGPN"
          className="w-[80px] h-[18px] lg:w-[98px] lg:h-[22px] mix-blend-luminosity"
        />
      </Link>

      {/* 중앙 메뉴 (≥ lg) */}
      <nav
        aria-label="주 메뉴"
        className="hidden lg:flex items-center gap-8"
      >
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.to}
            label={item.label}
            to={item.to}
            active={currentPath === item.to}
          />
        ))}
      </nav>

      {/* 우측 액션 블록 */}
      <div className="flex items-center justify-end gap-3 sm:gap-5 w-auto lg:w-[180px] shrink-0">
        <Link
          to="/contact"
          className={clsx(
            "font-['Pretendard']",
            "hidden sm:inline text-[13px] sm:text-[14px] leading-[21px] font-medium",
            "text-[var(--color-gray-900)]",
            "mix-blend-luminosity whitespace-nowrap",
            "transition-opacity hover:opacity-70",
          )}
        >
          고객센터
        </Link>
        <button
          type="button"
          onClick={onMenuToggle}
          aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isMenuOpen ?? false}
          className={clsx(
            "w-10 h-10 shrink-0",
            "flex items-center justify-center",
            "rounded-full",
            "bg-[var(--color-black-opacity-100)]",
            "transition-opacity hover:opacity-70",
          )}
        >
          <span className="w-7 h-7 flex items-center justify-center">
            <img
              src={hamburgerIcon}
              alt=""
              className="w-[21px] h-[8.75px] mix-blend-luminosity"
            />
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;
