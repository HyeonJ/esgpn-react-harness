type HeroIntroCardProps = {
  rotationDeg: number;
  iconSrc: string;
  iconAlt: string;
  blendMode: "lighten" | "screen" | "normal";
  title: string;
  body: string[];
};

/**
 * HeroIntroCard -- glassmorphism card with rotated wrapper,
 * icon with blend mode, and text content.
 *
 * v4: text is HTML (not raster). Icon only is raster with blend mode.
 */
export function HeroIntroCard({
  rotationDeg,
  iconSrc,
  iconAlt,
  blendMode,
  title,
  body,
}: HeroIntroCardProps) {
  const hasRotation = rotationDeg !== 0;

  // Blend mode utility class mapping
  const blendClass =
    blendMode === "lighten"
      ? "mix-blend-lighten"
      : blendMode === "screen"
        ? "mix-blend-screen"
        : "";

  const card = (
    <article
      className="flex flex-col items-center justify-end gap-6 w-[320px] h-[340px] rounded-[32px] bg-black/12 backdrop-blur-[8px] p-6 overflow-clip"
    >
      {/* Icon area with blend mode */}
      <div
        className={`shrink-0 w-[140px] h-[140px] ${blendClass}`}
      >
        <img
          src={iconSrc}
          alt={iconAlt}
          width={140}
          height={140}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-3 w-full text-center text-white">
        <h3
          className="text-[length:var(--text-heading-01-size)] font-bold leading-[var(--text-heading-01-line-height)]"
        >
          {title}
        </h3>
        <p className="text-[15px] font-normal leading-[24px]">
          {body.map((line, i) => (
            <span key={i}>
              {line}
              {i < body.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </article>
  );

  if (hasRotation) {
    return (
      <div className="flex items-center justify-center w-[342.938px] h-[361.494px]">
        <div
          className="flex-none"
          style={{ transform: `rotate(${rotationDeg}deg)` }}
        >
          {card}
        </div>
      </div>
    );
  }

  return card;
}
