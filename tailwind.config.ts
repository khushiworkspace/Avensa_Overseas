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
        /* ── Brand ── */
        void: "#050714",
        deep: "#0a0f2e",
        ink:  "#0f1640",

        /* ── Indigo (primary) ── */
        indigo: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },

        /* ── Violet (accent) ── */
        violet: {
          50:  "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },

        /* ── Gold (highlight) ── */
        gold: {
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

        /* ── Ember (danger/cta) ── */
        ember: {
          50:  "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },

        /* ── Ice (light surface) ── */
        ice: {
          50:  "#f8f7ff",
          100: "#f0eeff",
          200: "#e0dcff",
          300: "#c7c0ff",
          400: "#a59aff",
          500: "#8070ff",
          600: "#6554ff",
          700: "#5040e8",
          800: "#4030c0",
          900: "#30238a",
        },

        /* ── Slate (neutrals) ── */
        slate: {
          50:  "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },

        /* ── Emerald (success) ── */
        emerald: {
          50:  "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },

        /* ── Legacy aliases (kept for admin/dashboard pages) ── */
        teal:  {
          50:"#e6fafa", 100:"#b3f0f0", 200:"#80e5e5", 300:"#4ddada",
          400:"#26d0d0", 500:"#00b8b8", 600:"#009494", 700:"#007070",
          800:"#004c4c", 900:"#002828", 950:"#001414",
        },
        coral: {
          50:"#fff4f0", 100:"#ffe0d6", 200:"#ffbfaa", 300:"#ff9a7d",
          400:"#ff7757", 500:"#ff5530", 600:"#e63a15", 700:"#c0290d",
          800:"#9a1e09", 900:"#741305",
        },
        sand:  {
          50:"#fdfaf6", 100:"#f8f1e7", 200:"#f0e3cf", 300:"#e5ceaf",
          400:"#d5b48a", 500:"#c49966", 600:"#aa7c45", 700:"#8a6035",
          800:"#6b4626", 900:"#4d2e16",
        },
        navy:  {
          50:"#eef0f7", 100:"#ced2e8", 200:"#9da6d2", 300:"#6d7abb",
          400:"#4555a8", 500:"#2a3a8f", 600:"#1e2c78", 700:"#162060",
          800:"#0e1448", 900:"#060a30", 950:"#02040f",
        },
        mint:  {
          50:"#edfdf6", 100:"#c8f9e5", 200:"#8ff2cb", 300:"#4fe4af",
          400:"#20d494", 500:"#05bf80", 600:"#009966", 700:"#007a52",
          800:"#005c3e", 900:"#003d2a",
        },
        amber: {
          50:"#fffbeb", 100:"#fef3c7", 200:"#fde68a", 300:"#fcd34d",
          400:"#fbbf24", 500:"#f59e0b", 600:"#d97706", 700:"#b45309",
          800:"#92400e", 900:"#78350f",
        },
        rose: {
          50:"#fff1f2", 100:"#ffe4e6", 200:"#fecdd3", 300:"#fda4af",
          400:"#fb7185", 500:"#f43f5e", 600:"#e11d48", 700:"#be123c",
          800:"#9f1239", 900:"#881337",
        },
      },

      fontFamily: {
        sans:    ["var(--font-outfit)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)",   "system-ui", "sans-serif"],
        heading: ["var(--font-syne)",   "system-ui", "sans-serif"],
        /* legacy */
        inter:   ["var(--font-outfit)", "system-ui", "sans-serif"],
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
        /* Indigo */
        "indigo-sm":  "0 2px 8px 0 rgba(79,70,229,0.18)",
        "indigo-md":  "0 4px 20px 0 rgba(79,70,229,0.28)",
        "indigo-lg":  "0 8px 40px 0 rgba(79,70,229,0.38)",
        "indigo-xl":  "0 16px 64px 0 rgba(79,70,229,0.45)",
        /* Gold */
        "gold-sm":    "0 2px 8px 0 rgba(245,158,11,0.20)",
        "gold-md":    "0 4px 20px 0 rgba(245,158,11,0.30)",
        "gold-lg":    "0 8px 40px 0 rgba(245,158,11,0.40)",
        /* Violet */
        "violet-md":  "0 4px 20px 0 rgba(124,58,237,0.28)",
        "violet-lg":  "0 8px 40px 0 rgba(124,58,237,0.38)",
        /* Cards */
        "card":       "0 1px 4px rgba(15,22,64,0.06), 0 1px 2px rgba(15,22,64,0.04)",
        "card-hover": "0 20px 60px -8px rgba(79,70,229,0.18), 0 6px 16px -2px rgba(79,70,229,0.10)",
        "card-glow":  "0 0 0 1px rgba(79,70,229,0.15), 0 12px 40px -4px rgba(79,70,229,0.20)",
        "card-dark":  "0 20px 60px -8px rgba(0,0,0,0.50)",
        "inner-sm":   "inset 0 1px 3px rgba(15,22,64,0.08)",
        "float":      "0 24px 80px -12px rgba(15,22,64,0.22)",
        "glow-ring":  "0 0 0 4px rgba(79,70,229,0.15)",
        /* Legacy */
        "teal-sm":    "0 2px 8px 0 rgba(0,184,184,0.18)",
        "teal-md":    "0 4px 20px 0 rgba(0,184,184,0.28)",
        "teal-lg":    "0 8px 40px 0 rgba(0,184,184,0.38)",
        "coral-sm":   "0 2px 8px 0 rgba(255,85,48,0.18)",
        "coral-md":   "0 4px 20px 0 rgba(255,85,48,0.28)",
        "coral-lg":   "0 8px 40px 0 rgba(255,85,48,0.38)",
        "coral-xl":   "0 16px 64px 0 rgba(255,85,48,0.45)",
        "aurora":     "0 0 80px 20px rgba(79,70,229,0.12), 0 0 160px 40px rgba(245,158,11,0.06)",
        "shadow-coral-md": "0 4px 20px 0 rgba(255,85,48,0.28)",
      },

      backgroundImage: {
        "gradient-void":   "linear-gradient(160deg, #050714 0%, #0a0f2e 50%, #0f1640 100%)",
        "gradient-indigo": "linear-gradient(135deg, #312e81 0%, #4f46e5 50%, #818cf8 100%)",
        "gradient-gold":   "linear-gradient(135deg, #92400e 0%, #f59e0b 60%, #fcd34d 100%)",
        "gradient-aurora": [
          "radial-gradient(ellipse 100% 65% at 50% -5%, rgba(79,70,229,0.50) 0%, transparent 55%)",
          "radial-gradient(ellipse 80% 45% at -5% 65%, rgba(124,58,237,0.40) 0%, transparent 52%)",
          "radial-gradient(ellipse 70% 55% at 108% 75%, rgba(245,158,11,0.18) 0%, transparent 52%)",
          "linear-gradient(170deg, #050714 0%, #0a0f2e 40%, #0f1640 100%)",
        ].join(", "),
        "mesh-indigo": [
          "radial-gradient(ellipse 80% 50% at 20% 10%, rgba(79,70,229,0.28) 0%, transparent 60%)",
          "radial-gradient(ellipse 60% 40% at 80% 80%, rgba(245,158,11,0.14) 0%, transparent 55%)",
          "radial-gradient(ellipse 50% 60% at 60% 30%, rgba(124,58,237,0.30) 0%, transparent 55%)",
        ].join(", "),
        "dot-pattern":
          "radial-gradient(circle, rgba(79,70,229,0.16) 1px, transparent 1px)",
        "dot-pattern-light":
          "radial-gradient(circle, rgba(79,70,229,0.09) 1px, transparent 1px)",
      },

      backgroundSize: {
        "dot-28":    "28px 28px",
        "dot-32":    "32px 32px",
        "grid-48":   "48px 48px",
        "300%":      "300% 300%",
        /* legacy */
        "dot-24":    "24px 24px",
        "line-40":   "40px 40px",
      },

      animation: {
        /* Entrance */
        "fade-up":       "fadeUp 0.65s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in":       "fadeIn 0.45s ease-out both",
        "slide-left":    "slideLeft 0.55s cubic-bezier(0.16,1,0.3,1) both",
        "scale-in":      "scaleIn 0.40s cubic-bezier(0.16,1,0.3,1) both",
        /* Continuous */
        "pulse-slow":    "pulse 3.5s cubic-bezier(0.4,0,0.6,1) infinite",
        "float":         "floatY 5s ease-in-out infinite",
        "float-slow":    "floatYSlow 8s ease-in-out infinite",
        "spin-slow":     "spinSlow 20s linear infinite",
        "spin-reverse":  "spinReverse 26s linear infinite",
        "orbit":         "orbit 12s linear infinite",
        "shimmer":       "shimmer 2.2s linear infinite",
        "aurora":        "aurora 16s ease-in-out infinite",
        "ping-slow":     "pulse-ring 2.5s cubic-bezier(0,0,0.2,1) infinite",
        "av-ping":       "av-ping 2s cubic-bezier(0,0,0.2,1) infinite",
        "gradient-drift":"gradientDrift 6s ease infinite",
        "border-beam":   "borderBeam 4s linear infinite",
        "glow-pulse":    "glowPulse 3.5s ease-in-out infinite",
        "ticker":        "ticker 30s linear infinite",
        "draw":          "drawLine 1.6s cubic-bezier(0.16,1,0.3,1) both",
        "count-up":      "countUp 0.8s cubic-bezier(0.16,1,0.3,1) both",
        "text-reveal":   "textReveal 0.8s cubic-bezier(0.16,1,0.3,1) both",
        /* Legacy aliases */
        "spin-slow-18":  "spinSlow 18s linear infinite",
      },

      keyframes: {
        fadeUp:      { "0%":{"opacity":"0","transform":"translateY(28px)"},"100%":{"opacity":"1","transform":"translateY(0)"} },
        fadeIn:      { "0%":{"opacity":"0"},"100%":{"opacity":"1"} },
        scaleIn:     { "0%":{"opacity":"0","transform":"scale(0.88)"},"100%":{"opacity":"1","transform":"scale(1)"} },
        slideLeft:   { "0%":{"opacity":"0","transform":"translateX(28px)"},"100%":{"opacity":"1","transform":"translateX(0)"} },
        floatY:      { "0%,100%":{"transform":"translateY(0px)"},"50%":{"transform":"translateY(-12px)"} },
        floatYSlow:  { "0%,100%":{"transform":"translateY(0px)"},"50%":{"transform":"translateY(-18px)"} },
        shimmer:     { "0%":{"backgroundPosition":"-400% 0"},"100%":{"backgroundPosition":"400% 0"} },
        spinSlow:    { "0%":{"transform":"rotate(0deg)"},"100%":{"transform":"rotate(360deg)"} },
        spinReverse: { "0%":{"transform":"rotate(0deg)"},"100%":{"transform":"rotate(-360deg)"} },
        orbit: {
          "0%":   {"transform":"rotate(0deg) translateX(42px) rotate(0deg)"},
          "100%": {"transform":"rotate(360deg) translateX(42px) rotate(-360deg)"},
        },
        "pulse-ring": {
          "0%":       {"transform":"scale(1)","opacity":"0.65"},
          "80%,100%": {"transform":"scale(2.8)","opacity":"0"},
        },
        countUp: {
          "0%":   {"opacity":"0","transform":"translateY(14px) scale(0.88)"},
          "100%": {"opacity":"1","transform":"translateY(0) scale(1)"},
        },
        borderBeam: {
          "0%":   {"offsetDistance":"0%"},
          "100%": {"offsetDistance":"100%"},
        },
        glowPulse: {
          "0%,100%": {"boxShadow":"0 0 24px 4px rgba(79,70,229,0.20)"},
          "50%":     {"boxShadow":"0 0 64px 16px rgba(79,70,229,0.45)"},
        },
        gradientDrift: {
          "0%,100%": {"backgroundPosition":"0% 50%"},
          "50%":     {"backgroundPosition":"100% 50%"},
        },
        textReveal: {
          "0%":   {"clipPath":"inset(0 100% 0 0)"},
          "100%": {"clipPath":"inset(0 0% 0 0)"},
        },
        drawLine: {
          "0%":   {"strokeDashoffset":"1"},
          "100%": {"strokeDashoffset":"0"},
        },
        "av-ping": {
          "0%":       {"transform":"scale(1)","opacity":"0.7"},
          "80%,100%": {"transform":"scale(2.6)","opacity":"0"},
        },
        aurora: {
          "0%,100%": {"backgroundPosition":"50% 0%"},
          "25%":     {"backgroundPosition":"0% 50%"},
          "50%":     {"backgroundPosition":"100% 100%"},
          "75%":     {"backgroundPosition":"100% 0%"},
        },
        ticker: {
          "0%":   {"transform":"translateX(0)"},
          "100%": {"transform":"translateX(-50%)"},
        },
      },

      transitionTimingFunction: {
        "spring":    "cubic-bezier(0.16, 1, 0.3, 1)",
        "bounce-in": "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
        "smooth":    "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      spacing: {
        "13": "3.25rem",
        "18": "4.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
