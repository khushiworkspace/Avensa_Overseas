"use client";

/**
 * AvensaLogo v2 — "Ascent" Brand Mark
 * ─────────────────────────────────────
 * Concept: A bold geometric "A" constructed from two rising diagonal
 * shards with a connecting crossbar — forming a subtle upward arrow /
 * mountain peak. This reads simultaneously as the letter A, a compass
 * needle, and an ascending trajectory. A gold accent dot crowns the apex.
 *
 * - Pure SVG, no external assets
 * - Works at any size, any background
 * - Optional pulse animation on the apex dot
 * - Wordmark uses Syne (display) for AVENSA + light Outfit for OVERSEAS
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

const markPx: Record<Size, number> = { xs: 24, sm: 32, md: 42, lg: 54, xl: 72 };

const nameSz: Record<Size, string> = {
  xs: "text-xs",  sm: "text-sm",  md: "text-[15px]",
  lg: "text-xl",  xl: "text-3xl",
};
const tagSz: Record<Size, string> = {
  xs: "text-[7px]", sm: "text-[8.5px]", md: "text-[10px]",
  lg: "text-xs",    xl: "text-sm",
};

/* ── Mark SVG ─────────────────────────────────────────────────────── */
function LogoMark({
  px,
  theme,
  animated = false,
}: {
  px: number;
  theme: Theme;
  animated?: boolean;
}) {
  const uid   = `av2-${theme}`;
  const isDark = theme !== "light";

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Badge background */}
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          {isDark ? (
            <>
              <stop offset="0%"   stopColor="#1e1b4b" />
              <stop offset="55%"  stopColor="#312e81" />
              <stop offset="100%" stopColor="#4f46e5" />
            </>
          ) : (
            <>
              <stop offset="0%"   stopColor="#eef2ff" />
              <stop offset="100%" stopColor="#c7d2fe" />
            </>
          )}
        </linearGradient>

        {/* Inner highlight */}
        <radialGradient id={`${uid}-hl`} cx="30%" cy="20%" r="65%">
          <stop offset="0%"   stopColor={isDark ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.70)"} />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* Shard gradient */}
        <linearGradient id={`${uid}-shard`} x1="26" y1="8" x2="26" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={isDark ? "rgba(255,255,255,0.95)" : "rgba(79,70,229,0.90)"} />
          <stop offset="100%" stopColor={isDark ? "rgba(255,255,255,0.55)" : "rgba(79,70,229,0.45)"} />
        </linearGradient>

        {/* Gold apex gradient */}
        <radialGradient id={`${uid}-gold`} cx="50%" cy="30%" r="65%">
          <stop offset="0%"   stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>

        {/* Subtle outer ring glow */}
        <filter id={`${uid}-glow`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Clip to badge shape */}
        <clipPath id={`${uid}-clip`}>
          <rect width="52" height="52" rx="13" />
        </clipPath>
      </defs>

      {/* Badge shell */}
      <rect width="52" height="52" rx="13" fill={`url(#${uid}-bg)`} />
      <rect width="52" height="52" rx="13" fill={`url(#${uid}-hl)`} />

      {/* Subtle border */}
      <rect
        width="51" height="51" x="0.5" y="0.5" rx="12.5"
        stroke={isDark ? "rgba(255,255,255,0.12)" : "rgba(79,70,229,0.25)"}
        strokeWidth="1"
        fill="none"
      />

      <g clipPath={`url(#${uid}-clip)`}>
        {/* ── Left shard of the A ── */}
        {/* Outer left edge → apex → inner left */}
        <path
          d="M10 43 L26 9 L26 17 L18 43 Z"
          fill={`url(#${uid}-shard)`}
          opacity="1"
        />

        {/* ── Right shard of the A ── */}
        <path
          d="M42 43 L26 9 L26 17 L34 43 Z"
          fill={`url(#${uid}-shard)`}
          opacity="0.75"
        />

        {/* ── Crossbar ── */}
        <rect
          x="17" y="30" width="18" height="3.5" rx="1.75"
          fill={isDark ? "rgba(255,255,255,0.85)" : "rgba(79,70,229,0.80)"}
        />

        {/* ── Background grid lines (subtle) ── */}
        <line x1="0"  y1="52" x2="52" y2="0"  stroke={isDark ? "rgba(255,255,255,0.04)" : "rgba(79,70,229,0.06)"} strokeWidth="1" />
        <line x1="0"  y1="26" x2="52" y2="26" stroke={isDark ? "rgba(255,255,255,0.04)" : "rgba(79,70,229,0.06)"} strokeWidth="1" />
      </g>

      {/* ── Gold apex dot (outside clip so it can overflow top) ── */}
      <circle cx="26" cy="9" r="4.5" fill={`url(#${uid}-gold)`} />
      <circle cx="26" cy="9" r="2"   fill="white" opacity="0.90" />

      {/* ── Pulse ring (animated variant only) ── */}
      {animated && (
        <circle
          cx="26" cy="9" r="4.5"
          stroke="#f59e0b"
          strokeWidth="1.5"
          fill="none"
          opacity="0.65"
          style={{ animation: "av-ping 2.2s cubic-bezier(0,0,0.2,1) infinite" }}
        />
      )}
    </svg>
  );
}

/* ── Wordmark ─────────────────────────────────────────────────────── */
function Wordmark({
  size,
  theme,
  showTagline,
}: {
  size: Size;
  theme: Theme;
  showTagline?: boolean;
}) {
  const isDark = theme !== "light";

  return (
    <div className="leading-none select-none">
      <div
        className={cn("flex items-baseline gap-0", nameSz[size])}
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {/* AVENSA — bold, tight */}
        <span
          className={cn(
            "font-bold tracking-[-0.03em]",
            isDark ? "text-white" : "text-indigo-950"
          )}
        >
          AVENSA
        </span>

        {/* Separator dot */}
        <span className={cn(
          "mx-1.5 text-[0.55em] mb-[0.08em] self-end",
          isDark ? "text-gold-400 opacity-80" : "text-gold-500 opacity-70"
        )}>
          ◆
        </span>

        {/* OVERSEAS — light weight */}
        <span
          className={cn(
            "font-light tracking-[0.06em]",
            isDark ? "text-indigo-300" : "text-indigo-500"
          )}
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          OVERSEAS
        </span>
      </div>

      {showTagline && (
        <div className={cn("flex items-center gap-2 mt-1.5", tagSz[size])}>
          <span className={cn(
            "h-px flex-1 max-w-[24px]",
            isDark ? "bg-indigo-500/35" : "bg-indigo-300/50"
          )} />
          <span className={cn(
            "font-semibold uppercase tracking-[0.22em]",
            isDark ? "text-indigo-400/65" : "text-indigo-500/70"
          )}
          style={{ fontFamily: "var(--font-outfit)" }}>
            EU Immigration Portal
          </span>
          <span className={cn(
            "h-px flex-1 max-w-[24px]",
            isDark ? "bg-indigo-500/35" : "bg-indigo-300/50"
          )} />
        </div>
      )}
    </div>
  );
}

/* ── Public export ────────────────────────────────────────────────── */
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
