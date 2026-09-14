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
        teal: {
          50: "#e6fafa", 100: "#b3f0f0", 200: "#80e5e5", 300: "#4ddada",
          400: "#26d0d0", 500: "#00b8b8", 600: "#009494", 700: "#007070",
          800: "#004c4c", 900: "#002828", 950: "#001414",
        },
        coral: {
          50: "#fff4f0", 100: "#ffe0d6", 200: "#ffbfaa", 300: "#ff9a7d",
          400: "#ff7757", 500: "#ff5530", 600: "#e63a15", 700: "#c0290d",
          800: "#9a1e09", 900: "#741305",
        },
        sand: {
          50: "#fdfaf6", 100: "#f8f1e7", 200: "#f0e3cf", 300: "#e5ceaf",
          400: "#d5b48a", 500: "#c49966", 600: "#aa7c45", 700: "#8a6035",
          800: "#6b4626", 900: "#4d2e16",
        },
        navy: {
          50: "#eef0f7", 100: "#ced2e8", 200: "#9da6d2", 300: "#6d7abb",
          400: "#4555a8", 500: "#2a3a8f", 600: "#1e2c78", 700: "#162060",
          800: "#0e1448", 900: "#060a30", 950: "#02040f",
        },
        mint: {
          50: "#edfdf6", 100: "#c8f9e5", 200: "#8ff2cb", 300: "#4fe4af",
          400: "#20d494", 500: "#05bf80", 600: "#009966", 700: "#007a52",
          800: "#005c3e", 900: "#003d2a",
        },
        amber: {
          50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d",
          400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309",
          800: "#92400e", 900: "#78350f",
        },
        rose: {
          50: "#fff1f2", 100: "#ffe4e6", 200: "#fecdd3", 300: "#fda4af",
          400: "#fb7185", 500: "#f43f5e", 600: "#e11d48", 700: "#be123c",
          800: "#9f1239", 900: "#881337",
        },
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem", "3xl": "1.5rem", "2xl": "1rem",
        xl: "0.75rem", lg: "0.625rem", md: "0.5rem", sm: "0.375rem",
      },
      boxShadow: {
        "teal-sm":   "0 2px 8px 0 rgba(0,184,184,0.18)",
        "teal-md":   "0 4px 20px 0 rgba(0,184,184,0.28)",
        "teal-lg":   "0 8px 40px 0 rgba(0,184,184,0.38)",
        "teal-xl":   "0 16px 64px 0 rgba(0,184,184,0.45)",
        "coral-sm":  "0 2px 8px 0 rgba(255,85,48,0.18)",
        "coral-md":  "0 4px 20px 0 rgba(255,85,48,0.28)",
        "coral-lg":  "0 8px 40px 0 rgba(255,85,48,0.38)",
        "card":      "0 1px 4px rgba(14,20,72,0.06), 0 1px 2px rgba(14,20,72,0.04)",
        "card-hover":"0 16px 48px -4px rgba(14,20,72,0.14), 0 6px 12px -2px rgba(14,20,72,0.08)",
        "card-glow": "0 0 0 1px rgba(0,184,184,0.15), 0 12px 40px -4px rgba(0,184,184,0.18)",
        "inner-sm":  "inset 0 1px 3px rgba(14,20,72,0.08)",
        "float":     "0 24px 80px -12px rgba(14,20,72,0.22)",
        "aurora":    "0 0 80px 20px rgba(0,148,148,0.12), 0 0 160px 40px rgba(255,85,48,0.06)",
      },
      backgroundImage: {
        "gradient-teal":  "linear-gradient(135deg,#004c4c 0%,#009494 50%,#26d0d0 100%)",
        "gradient-coral": "linear-gradient(135deg,#c0290d 0%,#ff5530 60%,#ff9a7d 100%)",
        "gradient-navy":  "linear-gradient(180deg,#060a30 0%,#0e1448 100%)",
        "gradient-hero":  "linear-gradient(135deg,#001414 0%,#002828 30%,#004c4c 60%,#009494 100%)",
        "mesh-dark": [
          "radial-gradient(ellipse 80% 50% at 20% 10%, rgba(0,148,148,0.22) 0%, transparent 60%)",
          "radial-gradient(ellipse 60% 40% at 80% 80%, rgba(255,85,48,0.12) 0%, transparent 55%)",
          "radial-gradient(ellipse 50% 60% at 60% 30%, rgba(42,58,143,0.30) 0%, transparent 55%)",
        ].join(", "),
        "aurora-bg": [
          "radial-gradient(ellipse 100% 60% at 50% -10%, rgba(0,148,148,0.35) 0%, transparent 55%)",
          "radial-gradient(ellipse 80% 40% at 0% 60%, rgba(42,58,143,0.4) 0%, transparent 50%)",
          "radial-gradient(ellipse 70% 50% at 100% 70%, rgba(255,85,48,0.15) 0%, transparent 50%)",
          "linear-gradient(170deg, #001414 0%, #002828 40%, #060a30 100%)",
        ].join(", "),
        "dot-pattern":   "radial-gradient(circle, rgba(0,148,148,0.14) 1px, transparent 1px)",
        "line-pattern":  "linear-gradient(rgba(0,148,148,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,148,148,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-24": "24px 24px",
        "line-40": "40px 40px",
      },
      animation: {
        /* entrance */
        "fade-up":     "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in":     "fadeIn 0.4s ease-out both",
        "slide-left":  "slideLeft 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "scale-in":    "scaleIn 0.35s cubic-bezier(0.16,1,0.3,1) both",
        /* continuous */
        "pulse-slow":  "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
        "float":       "floatY 5s ease-in-out infinite",
        "float-slow":  "floatY 8s ease-in-out infinite",
        "spin-slow":   "spin 18s linear infinite",
        "spin-reverse":"spinReverse 22s linear infinite",
        "orbit":       "orbit 12s linear infinite",
        "shimmer":     "shimmer 2.2s linear infinite",
        "aurora":      "aurora 14s ease-in-out infinite",
        "ping-slow":   "ping 2.5s cubic-bezier(0,0,0.2,1) infinite",
        /* logo ping */
        "av-ping":     "avPing 2s cubic-bezier(0,0,0.2,1) infinite",
        /* gradient text */
        "gradient-x":  "gradientX 5s ease infinite",
        /* draw SVG paths */
        "draw":        "draw 1.6s cubic-bezier(0.16,1,0.3,1) both",
        /* count up */
        "count-up":    "countUp 0.8s cubic-bezier(0.16,1,0.3,1) both",
        /* border beam */
        "border-beam": "borderBeam 4s linear infinite",
        /* glow pulse */
        "glow-pulse":  "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideLeft: {
          "0%":   { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%":   { opacity: "0", transform: "scale(0.88)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        floatY: {
          "0%,100%": { transform: "translateY(0px)"  },
          "50%":     { transform: "translateY(-10px)" },
        },
        spinReverse: {
          "0%":   { transform: "rotate(0deg)"   },
          "100%": { transform: "rotate(-360deg)" },
        },
        orbit: {
          "0%":   { transform: "rotate(0deg) translateX(38px) rotate(0deg)"    },
          "100%": { transform: "rotate(360deg) translateX(38px) rotate(-360deg)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-400% 0" },
          "100%": { backgroundPosition: "400% 0"  },
        },
        aurora: {
          "0%,100%": { backgroundPosition: "50% 0%"   },
          "25%":     { backgroundPosition: "0% 50%"   },
          "50%":     { backgroundPosition: "100% 100%" },
          "75%":     { backgroundPosition: "100% 0%"  },
        },
        avPing: {
          "0%":   { transform: "scale(1)",   opacity: "0.7" },
          "80%,100%": { transform: "scale(2.4)", opacity: "0"   },
        },
        gradientX: {
          "0%,100%": { backgroundPosition: "0% 50%"   },
          "50%":     { backgroundPosition: "100% 50%" },
        },
        draw: {
          "0%":   { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
        borderBeam: {
          "0%":   { offsetDistance: "0%"   },
          "100%": { offsetDistance: "100%" },
        },
        glowPulse: {
          "0%,100%": { boxShadow: "0 0 20px 4px rgba(0,148,148,0.2)"  },
          "50%":     { boxShadow: "0 0 48px 12px rgba(0,148,148,0.4)" },
        },
        countUp: {
          "0%":   { opacity: "0", transform: "translateY(12px) scale(0.9)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)"       },
        },
      },
      transitionTimingFunction: {
        "spring":  "cubic-bezier(0.16, 1, 0.3, 1)",
        "bounce-in":"cubic-bezier(0.6, -0.28, 0.735, 0.045)",
      },
    },
  },
  plugins: [],
};

export default config;
