import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary — Deep Teal (unique, not the typical blue)
        teal: {
          50:  "#e6fafa",
          100: "#b3f0f0",
          200: "#80e5e5",
          300: "#4ddada",
          400: "#26d0d0",
          500: "#00b8b8",
          600: "#009494",
          700: "#007070",
          800: "#004c4c",
          900: "#002828",
          950: "#001414",
        },
        // Accent — Coral / Warm Sunset
        coral: {
          50:  "#fff4f0",
          100: "#ffe0d6",
          200: "#ffbfaa",
          300: "#ff9a7d",
          400: "#ff7757",
          500: "#ff5530",
          600: "#e63a15",
          700: "#c0290d",
          800: "#9a1e09",
          900: "#741305",
        },
        // Warm Neutral — Cream/Sand (replaces harsh slate)
        sand: {
          50:  "#fdfaf6",
          100: "#f8f1e7",
          200: "#f0e3cf",
          300: "#e5ceaf",
          400: "#d5b48a",
          500: "#c49966",
          600: "#aa7c45",
          700: "#8a6035",
          800: "#6b4626",
          900: "#4d2e16",
        },
        // Deep Navy — for sidebars / dark surfaces
        navy: {
          50:  "#eef0f7",
          100: "#ced2e8",
          200: "#9da6d2",
          300: "#6d7abb",
          400: "#4555a8",
          500: "#2a3a8f",
          600: "#1e2c78",
          700: "#162060",
          800: "#0e1448",
          900: "#060a30",
          950: "#02040f",
        },
        // Mint — success / positive states
        mint: {
          50:  "#edfdf6",
          100: "#c8f9e5",
          200: "#8ff2cb",
          300: "#4fe4af",
          400: "#20d494",
          500: "#05bf80",
          600: "#009966",
          700: "#007a52",
          800: "#005c3e",
          900: "#003d2a",
        },
        // Amber — warning (kept for semantic clarity)
        amber: {
          50:  "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        // Rose — danger
        rose: {
          50:  "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
        },
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono:    ["var(--font-jetbrains)", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
        "3xl": "1.5rem",
        "2xl": "1rem",
        xl:    "0.75rem",
        lg:    "0.625rem",
        md:    "0.5rem",
        sm:    "0.375rem",
      },
      boxShadow: {
        // Teal glow shadows
        "teal-sm":  "0 2px 8px 0 rgba(0, 184, 184, 0.15)",
        "teal-md":  "0 4px 20px 0 rgba(0, 184, 184, 0.25)",
        "teal-lg":  "0 8px 32px 0 rgba(0, 184, 184, 0.30)",
        // Coral glow
        "coral-sm": "0 2px 8px 0 rgba(255, 85, 48, 0.15)",
        "coral-md": "0 4px 20px 0 rgba(255, 85, 48, 0.25)",
        // Card shadows — warm, not cold
        "card":      "0 1px 4px 0 rgba(14, 20, 72, 0.06), 0 1px 2px -1px rgba(14, 20, 72, 0.04)",
        "card-hover":"0 12px 32px -4px rgba(14, 20, 72, 0.12), 0 4px 8px -2px rgba(14, 20, 72, 0.06)",
        "card-glow": "0 0 0 1px rgba(0, 184, 184, 0.12), 0 8px 24px -4px rgba(0, 184, 184, 0.15)",
        // Inner shadow for pressed states
        "inner-sm":  "inset 0 1px 3px 0 rgba(14, 20, 72, 0.08)",
        // Floating
        "float":     "0 20px 60px -10px rgba(14, 20, 72, 0.18)",
        "float-teal":"0 20px 60px -10px rgba(0, 148, 148, 0.22)",
      },
      backgroundImage: {
        // Hero gradients
        "gradient-hero":     "linear-gradient(135deg, #002828 0%, #004c4c 35%, #009494 75%, #00b8b8 100%)",
        "gradient-hero-warm":"linear-gradient(135deg, #060a30 0%, #0e1448 40%, #1e2c78 80%, #2a3a8f 100%)",
        "gradient-teal":     "linear-gradient(135deg, #004c4c 0%, #009494 50%, #26d0d0 100%)",
        "gradient-coral":    "linear-gradient(135deg, #c0290d 0%, #ff5530 60%, #ff9a7d 100%)",
        "gradient-navy":     "linear-gradient(180deg, #060a30 0%, #0e1448 100%)",
        "gradient-sand":     "linear-gradient(135deg, #fdfaf6 0%, #f0e3cf 100%)",
        // Mesh gradients
        "mesh-teal":         "radial-gradient(at 40% 20%, rgba(0,184,184,0.18) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(255,85,48,0.08) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(0,148,148,0.12) 0px, transparent 50%)",
        "mesh-dark":         "radial-gradient(at 40% 20%, rgba(42,58,143,0.6) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(0,148,148,0.3) 0px, transparent 50%), radial-gradient(at 0% 80%, rgba(255,85,48,0.2) 0px, transparent 50%)",
        // Noise texture overlay (subtle)
        "noise":             "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-in":     "fadeIn 0.35s ease-out",
        "fade-up":     "fadeUp 0.45s ease-out",
        "slide-right": "slideRight 0.35s ease-out",
        "scale-in":    "scaleIn 0.25s ease-out",
        "pulse-slow":  "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float":       "floatAnim 4s ease-in-out infinite",
        "shimmer":     "shimmer 2s linear infinite",
        "spin-slow":   "spin 8s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideRight: {
          "0%":   { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%":   { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        floatAnim: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "72": "18rem",
        "84": "21rem",
        "96": "24rem",
      },
      transitionDuration: {
        "400": "400ms",
      },
    },
  },
  plugins: [],
};

export default config;
