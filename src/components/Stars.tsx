/**
 * Rating stars rendered via a single SVG sprite definition.
 *
 * Rendering one full inline icon per star meant ~640 bytes of markup each, and
 * pages showing a dozen five-star reviews shipped tens of kilobytes of repeated
 * `<path>` data. A `<symbol>` defined once plus a `<use>` reference per star is
 * the same pixels for a fraction of the HTML.
 */

const STAR_PATH =
  "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z";

/** Render once per page, above any <Stars>. */
export function StarSprite() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute">
      <defs>
        <symbol id="hhh-star" viewBox="0 0 24 24">
          <path
            d={STAR_PATH}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
      </defs>
    </svg>
  );
}

export function Stars({
  rating,
  size = "sm",
  className = "",
}: {
  rating: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const dim = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <div className={`flex gap-1 ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true" className={`${dim} fill-current`}>
          <use href="#hhh-star" />
        </svg>
      ))}
    </div>
  );
}
