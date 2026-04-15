import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { NavItem } from "./NavItem";
import esgpnLogo from "@/assets/header/esgpn-logo.svg";
import hamburgerIcon from "@/assets/header/hamburger.svg";

export interface HeaderProps {
  /** 현재 활성 메뉴의 라우트. 미지정 시 react-router useLocation.pathname 사용. */
  activePath?: string;
  /** 햄버거 토글 핸들러 (외부 제어가 필요할 때). 내부 state 대신 제어 모드로 동작. */
  onMenuToggle?: () => void;
  /** 햄버거 버튼의 aria-expanded 상태 (외부 제어 시) */
  isMenuOpen?: boolean;
  /** 보충 스타일 */
  className?: string;
}

/**
 * 공통 Header (GNB / Top Nav).
 * Figma 노드: 52:1379 (인스턴스) / 52:1378 (원본).
 * 레이아웃: 1416x72 floating pill, px=40, radius=40, bg=rgba(0,0,0,0.04), backdrop-blur=12px.
 *
 * 반응형 보강 (2026-04-15, responsive-polish 스킬):
 *  - < xl (1280 미만): nav + 고객센터 숨김, 햄버거 클릭 시 드롭다운 오픈.
 *  - xl 이상: 기존 Figma 원본 픽셀 단위 보존.
 *
 * tone sampling (hamburger-without-design.md 절차):
 *  - radius: rounded-[40px] (Header pill 재사용)
 *  - bg: var(--color-black-opacity-100) — Header pill 동일 (#0000000a)
 *  - backdrop-blur: 12px — Header 동일
 *  - NavItem 텍스트: text-[14px] font-medium text-[var(--color-gray-900)] mix-blend-luminosity
 *  - transition: transition-opacity hover:opacity-70 — 프로젝트 전역 기본
 *  - 고객센터 스타일은 CTA 아이템으로 재사용
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

  // 내부 state (비제어 모드). isMenuOpen prop이 주어지면 제어 모드.
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = isMenuOpen !== undefined;
  const open = isControlled ? isMenuOpen! : internalOpen;

  const handleToggle = () => {
    if (onMenuToggle) onMenuToggle();
    if (!isControlled) setInternalOpen((v) => !v);
  };
  const close = () => {
    if (!isControlled) setInternalOpen(false);
  };

  const headerRef = useRef<HTMLElement>(null);
  const menuId = "header-mobile-menu";

  // ESC 키로 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // 외부 클릭 감지
  useEffect(() => {
    if (!open) return;
    const onClick = (e: globalThis.MouseEvent) => {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(e.target as globalThis.Node)) close();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <header
      ref={headerRef}
      role="banner"
      className={clsx(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50",
        "w-[calc(100%-32px)] max-w-[1416px]",
        "rounded-[40px]",
        "bg-[var(--color-black-opacity-100)]",
        "backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]",
        className,
      )}
    >
      <div className="h-[72px] flex items-center justify-between px-10">
        {/* 로고 */}
        <Link
          to="/"
          className="flex items-center w-[180px] shrink-0"
          aria-label="ESGPN 홈으로"
        >
          <img
            src={esgpnLogo}
            alt="ESGPN"
            className="w-[98px] h-[22px] mix-blend-luminosity"
          />
        </Link>

        {/* 중앙 메뉴 (xl 이상만 표시 — Figma 1920 원본) */}
        <nav
          aria-label="주 메뉴"
          className="hidden xl:flex items-center gap-8"
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
        <div className="flex items-center justify-end gap-5 xl:w-[180px] shrink-0">
          {/* 고객센터 CTA — xl 이상만 표시 */}
          <Link
            to="/contact"
            className={clsx(
              "hidden xl:inline-block",
              "font-['Pretendard']",
              "text-[14px] leading-[21px] font-medium",
              "text-[var(--color-gray-900)]",
              "mix-blend-luminosity whitespace-nowrap",
              "transition-opacity hover:opacity-70",
            )}
          >
            고객센터
          </Link>
          <button
            type="button"
            onClick={handleToggle}
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            aria-controls={menuId}
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
      </div>

      {/* 드롭다운 메뉴 (xl 미만에서만 실제 작동. xl 이상에서는 버튼 자체가 숨겨져 있지 않으므로
          시각적으로만 xl:hidden 로 보장). */}
      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="모바일 메뉴"
          className={clsx(
            "xl:hidden",
            "w-full px-6 pb-6 pt-2",
            "flex flex-col gap-1",
          )}
        >
          <div className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                role="menuitem"
                onClick={close}
                className={clsx(
                  "font-['Pretendard']",
                  "text-[15px] leading-[22px]",
                  "text-[var(--color-gray-900)]",
                  "mix-blend-luminosity",
                  "py-3 px-2",
                  "rounded-[12px]",
                  "transition-opacity hover:opacity-70",
                  currentPath === item.to ? "font-bold" : "font-medium",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          {/* 구분선 — Footer divider 스타일과 톤 일치 (gray-a100 느낌의 은은한 선) */}
          <div
            aria-hidden="true"
            className="my-2 h-px w-full bg-[var(--color-black-opacity-100)]"
          />
          <Link
            to="/contact"
            role="menuitem"
            onClick={close}
            className={clsx(
              "font-['Pretendard']",
              "text-[15px] leading-[22px] font-medium",
              "text-[var(--color-gray-900)]",
              "mix-blend-luminosity",
              "py-3 px-2",
              "rounded-[12px]",
              "transition-opacity hover:opacity-70",
            )}
          >
            고객센터
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
