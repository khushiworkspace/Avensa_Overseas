"use client";

/**
 * AvensaLogo — Unique geometric SVG mark for Avensa Overseas
 *
 * The mark concept: "Meridian Compass"
 * ─────────────────────────────────────
 * A stylised globe/compass formed by:
 *   • An outer ring (world boundary)
 *   • Two curved meridian arcs crossing at centre (longitude lines)
 *   • A horizontal equator line
 *   • A sharp upward-pointing navigation arrow piercing through the top
 *   • A coral accent dot at the arrow tip (destination)
 *   • Subtle inner glow rings that pulse on the animated variant
 *
 * This avoids any letter shapes — it's a pure mark that works at any size.
 */

import { cn } from "@/lib/utils";

type Variant   = "mark" | "horizontal" | "stacked" | "wordmark";
type Theme     = "dark" | "light" | "color";
type Size      = "xs" | "sm" | "md" | "lg" | "xl";

interface AvensaLogoProps {
  variant?:     Variant;
  theme?:       Theme;
  size?:        Size;
  showTagline?: boolean;
  animated?:    boolean;
  className?:   string;
}

const markPx: Record<Size, number> = { xs: 24, sm: 32, md: 40, lg: 52, xl: 72 };

const nameSz: Record<Size, string> = {
  xs: "text-xs",   sm: "text-sm",  md: "text-base",
  lg: "text-xl",   xl: "text-3xl",
};
const tagSz: Record<Size, string> = {
  xs: "text-[8px]", sm: "text-[9px]",  md: "text-[10px]",
  lg: "text-xs",    xl: "text-sm",
};

/* ─── Mark SVG ───────────────────────────────────────────────────── */
function LogoMark({
  px,
  theme,
  animated = false,
}: {
  px: number;
  theme: Theme;
  animated?: boolean;
}) {
  /* Unique IDs per theme to avoid SSR collisions */
  const uid = `av-${theme}`;

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Badge background gradient */}
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          {theme === "light" ? (
            <>
              <stop offset="0%"   stopColor="#060a30" />
              <stop offset="100%" stopColor="#1e2c78" />
            </>
          ) : (
            <>
              <stop offset="0%"   stopColor="#001414" />
              <stop offset="40%"  stopColor="#004c4c" />
              <stop offset="100%" stopColor="#009494" />
            </>
          )}
        </linearGradient>

        {/* Meridian stroke gradient */}
        <linearGradient id={`${uid}-mer`} x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.55)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.20)" />
        </linearGradient>

        {/* Arrow + ring gradient */}
        <linearGradient id={`${uid}-arr`} x1="28" y1="4" x2="28" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#ffffff" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.75)" />
        </linearGradient>

        {/* Coral dot gradient */}
        <radialGradient id={`${uid}-dot`} cx="50%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#ff9a7d" />
          <stop offset="100%" stopColor="#ff5530" />
        </radialGradient>

        {/* Inner highlight */}
        <radialGradient id={`${uid}-hl`} cx="35%" cy="22%" r="60%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* Outer glow filter */}
        <filter id={`${uid}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <clipPath id={`${uid}-clip`}>
          <rect width="56" height="56" rx="14" />
        </clipPath>
      </defs>

      {/* ── Badge background ── */}
      <rect width="56" height="56" rx="14" fill={`url(#${uid}-bg)`} />
      <rect width="56" height="56" rx="14" fill={`url(#${uid}-hl)`} />

      {/* ── Clipped content ── */}
      <g clipPath={`url(#${uid}-clip)`}>

        {/* Outer globe ring */}
        <circle
          cx="28" cy="30" r="17"
          stroke={`url(#${uid}-mer)`}
          strokeWidth="1.6"
          fill="none"
          className={animated ? "animate-[spin_18s_linear_infinite]" : ""}
          style={animated ? { transformOrigin: "28px 30px" } : {}}
        />

        {/* Second inner ring (slightly tilted = latitude ring) */}
        <ellipse
          cx="28" cy="30" rx="17" ry="7"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.4"
          fill="none"
        />

        {/* Left meridian arc */}
        <path
          d="M28 13 Q11 30 28 47"
          stroke={`url(#${uid}-mer)`}
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Right meridian arc */}
        <path
          d="M28 13 Q45 30 28 47"
          stroke={`url(#${uid}-mer)`}
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Equator horizontal line */}
        <line
          x1="11" y1="30" x2="45" y2="30"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.3"
        />

        {/* Navigation arrow shaft (piercing upward through globe) */}
        <line
          x1="28" y1="8" x2="28" y2="38"
          stroke={`url(#${uid}-arr)`}
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Arrow left wing */}
        <path
          d="M28 8 L22 18"
          stroke="rgba(255,255,255,0.90)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Arrow right wing */}
        <path
          d="M28 8 L34 18"
          stroke="rgba(255,255,255,0.90)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>

      {/* ── Coral destination dot (outside clip so it can overflow) ── */}
      <circle cx="28" cy="8" r="4.5" fill={`url(#${uid}-dot)`} />
      <circle cx="28" cy="8" r="2"   fill="white" opacity="0.9" />

      {/* pulse ring (animated only) */}
      {animated && (
        <circle
          cx="28" cy="8" r="4.5"
          stroke="#ff5530"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
          style={{ animation: "av-ping 2s cubic-bezier(0,0,0.2,1) infinite" }}
        />
      )}
    </svg>
  );
}

/* ─── Wordmark ───────────────────────────────────────────────────── */
function Wordmark({
  size,
  theme,
  showTagline,
}: {
  size: Size;
  theme: Theme;
  showTagline?: boolean;
}) {
  const dark = theme === "dark";

  return (
    <div className="leading-none select-none">
      {/* Brand name with split weight */}
      <div
        className={cn("flex items-baseline gap-0", nameSz[size])}
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        <span className={cn("font-black tracking-tight", dark ? "text-white" : "text-navy-950")}>
          AVENSA
        </span>
        <span
          className={cn(
            "font-extralight tracking-[0.12em] ml-1.5",
            dark ? "text-teal-300" : "text-teal-600"
          )}
        >
          OVERSEAS
        </span>
      </div>

      {showTagline && (
        <div
          className={cn(
            "flex items-center gap-1.5 mt-1",
            tagSz[size]
          )}
        >
          <span
            className={cn(
              "inline-block h-px flex-1",
              dark ? "bg-white/20" : "bg-navy-200"
            )}
          />
          <span
            className={cn(
              "font-semibold uppercase tracking-[0.20em]",
              dark ? "text-teal-400/70" : "text-teal-500"
            )}
          >
            EU Immigration Portal
          </span>
          <span
            className={cn(
              "inline-block h-px flex-1",
              dark ? "bg-white/20" : "bg-navy-200"
            )}
          />
        </div>
      )}
    </div>
  );
}

/* ─── Public export ──────────────────────────────────────────────── */
export function AvensaLogo({
  variant     = "horizontal",
  theme       = "dark",
  size        = "md",
  showTagline = false,
  animated    = false,
  className,
}: AvensaLogoProps) {
  const px = markPx[size];

  if (variant === "mark") {
    return (
      <span className={cn("inline-flex shrink-0", className)} aria-label="Avensa Overseas">
        <LogoMark px={px} theme={theme} animated={animated} />
      </span>
    );
  }

  if (variant === "wordmark") {
    return (
      <span className={cn("inline-flex", className)} aria-label="Avensa Overseas">
        <Wordmark size={size} theme={theme} showTagline={showTagline} />
      </span>
    );
  }

  if (variant === "stacked") {
    return (
      <div
        className={cn("inline-flex flex-col items-center gap-3", className)}
        aria-label="Avensa Overseas"
      >
        <LogoMark px={px} theme={theme} animated={animated} />
        <Wordmark size={size} theme={theme} showTagline={showTagline} />
      </div>
    );
  }

  /* horizontal (default) */
  return (
    <div
      className={cn("inline-flex items-center gap-3 shrink-0", className)}
      aria-label="Avensa Overseas"
    >
      <LogoMark px={px} theme={theme} animated={animated} />
      <Wordmark size={size} theme={theme} showTagline={showTagline} />
    </div>
  );
}
