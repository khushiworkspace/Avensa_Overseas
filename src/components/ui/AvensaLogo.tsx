"use client";

/**
 * AvensaLogo — official Logo.png brand asset
 *
 * On dark backgrounds (theme="dark") we apply mix-blend-mode:screen
 * so the white PNG background becomes invisible and only the
 * blue/gold logo mark shows through — clean on any dark surface.
 *
 * On light backgrounds (theme="light") the image renders normally.
 */

import Image from "next/image";
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

/** Height in px — sized up so the logo is actually legible */
const heightPx: Record<Size, number> = {
  xs:  56,
  sm:  72,
  md:  96,
  lg: 120,
  xl: 160,
};

export function AvensaLogo({
  size      = "md",
  theme     = "dark",
  className,
  variant,
  showTagline,
  animated,
}: AvensaLogoProps) {
  const h = heightPx[size];
  const isDark = theme !== "light";

  return (
    <span
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label="Avensa Overseas"
    >
      <Image
        src="/Images/Logo.png"
        alt="Avensa Overseas"
        height={h}
        width={h}
        style={{
          height: h,
          width: "auto",
          objectFit: "contain",
          /**
           * mix-blend-mode: screen — white (#fff) blends to transparent,
           * coloured pixels (navy, gold) remain fully visible.
           * This makes the logo "pop" on any dark background without
           * needing a transparent-background PNG.
           */
          mixBlendMode: isDark ? "screen" : "normal",
        }}
        priority
      />
    </span>
  );
}
