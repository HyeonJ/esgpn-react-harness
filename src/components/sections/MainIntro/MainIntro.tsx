import { IntroLeftColumn } from "./IntroLeftColumn";
import { IntroGlobeGroup } from "./IntroGlobeGroup";

/**
 * MainIntro -- "ESGPN이란?" section on the landing page.
 *
 * v4 principles:
 * - Semantic HTML: <section>, <h2>, <header>, <article>, <nav>
 * - Text as HTML (not raster) for SEO/a11y/i18n
 * - Design tokens from tokens.css (brand-500, gray-900, etc.)
 * - Flex layout for left column, grid overlay for globe group
 * - Minimal positioned elements vs v1-v3's 22
 */
export function MainIntro() {
  return (
    <section className="flex gap-[63px] items-center justify-center px-[252px] py-[200px] w-full bg-[var(--color-gray-000)]">
      <IntroLeftColumn />
      <IntroGlobeGroup />
    </section>
  );
}
