/**
 * AvensaLogo — Custom SVG logo for Avensa Overseas.
 *
 * The mark is an abstract "A" formed by two overlapping path arcs
 * (a compass needle + a globe meridian) that together suggest:
 *   • a compass pointing toward Europe
 *   • an upward arrow (progress / journey)
 *   • a stylised "A" (Avensa)
 *
 * Props
 * ─────
 * variant  "mark"      — icon only (square badge)
 *          "horizontal" — icon + wordmark side-by-side  (default)
 *          "stacked"   — icon above wordmark
 *          "wordmark"  — text only (no icon)
 *
 * theme    "dark"      — white text, for dark backgrounds   (default)
 *          "light"     — dark text, for light backgrounds
 *          "color"     — full-colour on transparent bg
 *
 * size     "xs" | "sm" | "md" | "lg" | "xl"
 *
 * showTagline  show "EU Immigration Portal" sub-label
 */

import { cn } from "@/lib/utils";

type Variant = "mark" | "horizontal" | "stacked" | "wordmark";
type Theme   = "dark" | "light" | "color";
type Size    = "xs" | "sm" | "md" | "lg" | "xl";

interface AvensaLogoProps {
  variant?:     Variant;
  theme?:       Theme;
  size?:        Size;
  showTagline?: boolean;
  className?:   string;
}

/* ── Size scales ─────────────────────────────────────────── */
const markSize: Record<Size, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 52,
  xl: 72,
};

const nameSizeClass: Record<Size, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
  xl: "text-3xl",
};

const taglineSizeClass: Record<Size, string> = {
  xs: "text-[8px]",
  sm: "text-[9px]",
  md: "text-[10px]",
  lg: "text-xs",
  xl: "text-sm",
};

/* ── Theme colour tokens ─────────────────────────────────── */
const textColor: Record<Theme, string> = {
  dark:  "text-white",
  light: "text-navy-900",
  color: "text-navy-900",
};

const subColor: Record<Theme, string> = {
  dark:  "text-teal-400/80",
  light: "text-teal-600",
  color: "text-teal-600",
};

/* ──────────────────────────────────────────────────────────
   MARK — the actual SVG icon
   ────────────────────────────────────────────────────────── */
function LogoMark({ px, theme }: { px: number; theme: Theme }) {
  const id = `avensa-grad-${theme}`;

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Primary teal → teal-light gradient (used for mark on dark / color) */}
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#004c4c" />
          <stop offset="50%"  stopColor="#009494" />
          <stop offset="100%" stopColor="#26d0d0" />
        </linearGradient>

        {/* Coral accent gradient */}
        <linearGradient id={`${id}-b`} x1="0" y1="48" x2="48" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#ff5530" />
          <stop offset="100%" stopColor="#ff9a7d" />
        </linearGradient>

        {/* Light-theme: navy gradient */}
        <linearGradient id={`${id}-c`} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#060a30" />
          <stop offset="100%" stopColor="#2a3a8f" />
        </linearGradient>

        {/* Badge background (rounded rect behind the paths) */}
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#002828" />
          <stop offset="100%" stopColor="#009494" />
        </linearGradient>

        <clipPath id={`${id}-clip`}>
          <rect width="48" height="48" rx="12" />
        </clipPath>
      </defs>

      {/* ── Background badge ── */}
      <rect
        width="48"
        height="48"
        rx="12"
        fill={theme === "light" ? `url(#${id}-c)` : `url(#${id}-bg)`}
      />

      {/* subtle inner highlight */}
      <rect
        width="48"
        height="48"
        rx="12"
        fill="url(#hl)"
        opacity="0.12"
      />
      <defs>
        <radialGradient id="hl" cx="30%" cy="20%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ══════════════════════════════════════
          THE MARK — stylised "A" / compass
          ══════════════════════════════════════

          Concept:
          • Two thick diagonal strokes form an "A" shape
          • A small arc at the crossbar suggests a globe meridian
          • A coral accent dot at the apex = destination pin
      */}

      {/* Left leg of the A */}
      <path
        d="M10 38 L24 10 L24 10"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />

      {/* Right leg of the A */}
      <path
        d="M24 10 L38 38"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />

      {/* Crossbar — arc (globe meridian) */}
      <path
        d="M15.5 29 Q24 22 32.5 29"
        stroke={`url(#${id}-b)`}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Apex dot — destination pin (coral) */}
      <circle cx="24" cy="10" r="3.2" fill={`url(#${id}-b)`} />

      {/* Small inner dot (white) */}
      <circle cx="24" cy="10" r="1.2" fill="white" opacity="0.9" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────
   WORDMARK — text portion
   ────────────────────────────────────────────────────────── */
function Wordmark({
  size,
  theme,
  showTagline,
}: {
  size: Size;
  theme: Theme;
  showTagline?: boolean;
}) {
  return (
    <div className="leading-tight select-none">
      <span
        className={cn(
          "block font-extrabold tracking-tight",
          nameSizeClass[size],
          textColor[theme]
        )}
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        Avensa
        <span
          className={cn(
            "font-light ml-1",
            theme === "dark" ? "text-teal-300" : "text-teal-600"
          )}
        >
          Overseas
        </span>
      </span>

      {showTagline && (
        <span
          className={cn(
            "block font-semibold uppercase tracking-widest mt-0.5",
            taglineSizeClass[size],
            subColor[theme]
          )}
        >
          EU Immigration Portal
        </span>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   PUBLIC COMPONENT
   ────────────────────────────────────────────────────────── */
export function AvensaLogo({
  variant     = "horizontal",
  theme       = "dark",
  size        = "md",
  showTagline = false,
  className,
}: AvensaLogoProps) {
  const px = markSize[size];

  if (variant === "mark") {
    return (
      <span className={cn("inline-flex shrink-0", className)} aria-label="Avensa Overseas">
        <LogoMark px={px} theme={theme} />
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
      <span
        className={cn("inline-flex flex-col items-center gap-2", className)}
        aria-label="Avensa Overseas"
      >
        <LogoMark px={px} theme={theme} />
        <Wordmark size={size} theme={theme} showTagline={showTagline} />
      </span>
    );
  }

  /* horizontal (default) */
  return (
    <span
      className={cn("inline-flex items-center gap-3 shrink-0", className)}
      aria-label="Avensa Overseas"
    >
      <LogoMark px={px} theme={theme} />
      <Wordmark size={size} theme={theme} showTagline={showTagline} />
    </span>
  );
}
