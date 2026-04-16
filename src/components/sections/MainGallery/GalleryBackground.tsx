import bgCityscape from "@/assets/main-gallery/bg-cityscape.png";
import bgPaper from "@/assets/main-gallery/bg-paper.jpg";

/**
 * 3-layer decorative background for MainGallery section.
 *
 * Layer stack (bottom to top):
 * 1. Solid dark green (#0c3b0e / brand-700)
 * 2. Cityscape image with mix-blend-luminosity (RGBA, alpha preserved)
 * 3. Paper texture with mix-blend-multiply
 *
 * v3 lesson: bg-image1 (4c8ae3d9) = paper texture, bg-image2 (83ba43ed) = cityscape.
 * Naming was swapped in v1-v2. Confirmed by visual inspection.
 * Cityscape has transparency (RGBA) -- must stay PNG, not JPG.
 */
export function GalleryBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Layer 1: Solid dark green base */}
      <div className="absolute inset-0 bg-[var(--color-brand-700)]" />

      {/* Layer 2: Cityscape with luminosity blend (positioned at bottom) */}
      <img
        alt=""
        src={bgCityscape}
        className="absolute max-w-none object-cover mix-blend-luminosity size-full"
      />

      {/* Layer 3: Paper texture with multiply blend */}
      <img
        alt=""
        src={bgPaper}
        className="absolute inset-0 max-w-none object-cover mix-blend-multiply size-full"
      />
    </div>
  );
}
