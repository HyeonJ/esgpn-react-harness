import { Fragment } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import dividerSvg from "@/assets/footer/divider.svg";
import esgpnWatermark from "@/assets/footer/esgpn-watermark.svg";

export interface FooterProps {
  /** 보충 스타일 (전역 장착 시 조정용). */
  className?: string;
}

/**
 * 공통 Footer.
 * Figma 노드: 299:2094 (인스턴스) / 299:2093 (원본).
 * 스펙 (research/footer.md, plan/footer.md):
 *  - 1920 × 708 풀폭, bg #0c0c0c (토큰 미바인딩 → arbitrary)
 *  - pt 48, gap 80 (top row ↔ watermark)
 *  - top row: px 252, gap 40 (좌/우)
 *  - left col: gap 48 (info ↔ copyright)
 *  - info block: gap 8 (라인간), 라인 내부 gap 8
 *  - right nav: gap 16, h 21
 *  - watermark: 1920 × 432
 *
 * 사용자 승인 (2026-04-13):
 *  - A1: 우측 네비 임시 경로(/contact, /terms, /privacy, /location-terms) — 후속 PR 확정
 *  - A2: 전역 장착(App.tsx RootLayout) 이번 PR 범위 밖
 *  - A3: 반응형 < 1920px 이번 PR 범위 밖
 *  - A4: 워터마크 SVG로 판명 → 2x 해상도 보관 불필요
 *  - A5: divider 2개 시각적 동일(stroke #7C8985), 1파일(divider.svg)로 통합
 *  - A6: 사업자번호/주소 등 placeholder 빈 값 유지
 */
const COMPANY_INFO = {
  name: "Colive",
  ceo: "구현우",
} as const;

const FOOTER_NAV = [
  { label: "1:1문의", to: "/contact" },
  { label: "이용약관", to: "/terms" },
  { label: "개인정보취급방침", to: "/privacy" },
  { label: "위치서비스이용약관", to: "/location-terms" },
] as const;

// Figma 원문 보존: "Aqu.ALL" 사이 점, 더블스페이스 2곳.
const COPYRIGHT_TEXT = "COPYRIGHTⓒ2026 Aqu.ALL  RIGHTS  RESERVED.";

const infoTextClass =
  "font-[var(--font-family-pretendard)] text-[14px] leading-[1.5] font-normal text-[var(--color-gray-000)] whitespace-nowrap";

function FooterDivider() {
  // SVG 원본 viewBox=10x1 (가로선). preserveAspectRatio="none" 이므로
  // 1×10 박스에 그려도 stroke가 가로 영역 가운데에 1px로 렌더되어 시각적으로 세로선.
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-[10px] w-[1px] shrink-0 items-center justify-center"
    >
      <img
        src={dividerSvg}
        alt=""
        className="block h-[10px] w-[1px]"
      />
    </span>
  );
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      role="contentinfo"
      className={clsx(
        "relative w-full bg-[#0c0c0c]",
        "flex flex-col items-start gap-[80px]",
        "pt-[var(--spacing-12)]",
        className,
      )}
    >
      {/* Top Row */}
      <div className="flex flex-col xl:flex-row w-full items-start gap-[var(--spacing-10)] px-6 md:px-12 xl:px-[252px]">
        {/* 좌측 컬럼 */}
        <div className="flex min-w-0 flex-1 flex-col gap-[var(--spacing-12)]">
          {/* Info Block */}
          <div className="flex w-full flex-col gap-[var(--spacing-2)]">
            {/* Line 1 */}
            <div className="flex h-[21px] w-full items-center gap-[var(--spacing-2)]">
              <p className={infoTextClass}>{`상호 : ${COMPANY_INFO.name}`}</p>
              <FooterDivider />
              <p className={infoTextClass}>{`대표이사 : ${COMPANY_INFO.ceo}`}</p>
              <FooterDivider />
              <p className={infoTextClass}>사업자등록번호 :{" "}</p>
            </div>
            {/* Line 2 */}
            <div className="flex h-[21px] w-full items-center">
              <p className={infoTextClass}>주소 :{" "}</p>
            </div>
            {/* Line 3 */}
            <div className="flex h-[21px] w-full items-center gap-[var(--spacing-2)]">
              <p className={infoTextClass}>고객센터 :{" "}</p>
              <FooterDivider />
              <p className={infoTextClass}>개인정보관리책임자 :{" "}</p>
            </div>
          </div>
          {/* Copyright */}
          <p
            className={clsx(
              "font-[var(--font-family-pretendard)]",
              "text-[14px] leading-[1.5] font-normal",
              "text-[var(--color-gray-600)]",
              "whitespace-pre",
            )}
          >
            {COPYRIGHT_TEXT}
          </p>
        </div>

        {/* 우측 네비 */}
        <nav
          aria-label="푸터 메뉴"
          className="flex flex-wrap xl:flex-nowrap xl:h-[21px] items-center gap-[var(--spacing-4)]"
        >
          {FOOTER_NAV.map((item, idx) => (
            <Fragment key={item.to}>
              {idx > 0 && <FooterDivider />}
              <Link
                to={item.to}
                className={clsx(
                  "font-[var(--font-family-pretendard)]",
                  "text-[14px] leading-[1.5] font-bold",
                  "text-[var(--color-gray-000)]",
                  "whitespace-nowrap",
                  "transition-opacity hover:opacity-70",
                )}
              >
                {item.label}
              </Link>
            </Fragment>
          ))}
        </nav>
      </div>

      {/* ESGPN 워터마크 */}
      <div
        aria-hidden="true"
        className="relative h-[432px] w-full shrink-0"
      >
        <img
          src={esgpnWatermark}
          alt=""
          className="block h-full w-full"
        />
      </div>
    </footer>
  );
}

export default Footer;
