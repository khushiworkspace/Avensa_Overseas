import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Globe, FileText, Search, Clock, Shield,
  Briefcase, GraduationCap, Home as HomeIcon, Plane, Star,
  ChevronRight, Sparkles, MapPin, Zap, ArrowUpRight, Lock,
  TrendingUp, CheckCircle, Users, BarChart3, Layers,
} from "lucide-react";
import { COUNTRIES, COMPANY } from "@/lib/constants";
import { MOCK_FAQS, MOCK_ARTICLES } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { EuropeanCitiesStrip, EuropeanCitiesStripDark, EUROPEAN_CITIES } from "@/components/ui/EuropeanCitiesStrip";

export const metadata: Metadata = {
  title: "Avensa Overseas – EU Immigration Portal",
};

/* ─── Data ───────────────────────────────────────────────────────── */
const purposeCards = [
  {
    icon: Briefcase,
    label: "Work",
    href: "/routes/work",
    desc: "EU Blue Card · Skilled Worker · Job Seeker",
    gradient: "from-indigo-500 to-violet-600",
    glow: "rgba(79,70,229,0.40)",
    tag: "Most Popular",
  },
  {
    icon: GraduationCap,
    label: "Study",
    href: "/routes/study",
    desc: "Bachelor · Master · PhD programmes",
    gradient: "from-violet-500 to-purple-600",
    glow: "rgba(124,58,237,0.35)",
    tag: null,
  },
  {
    icon: Users,
    label: "Family",
    href: "/routes/family",
    desc: "Spouse · Child · Reunification",
    gradient: "from-sky-500 to-indigo-500",
    glow: "rgba(14,165,233,0.30)",
    tag: null,
  },
  {
    icon: HomeIcon,
    label: "Residence",
    href: "/routes/residence",
    desc: "Long-term · Permanent · Digital Nomad",
    gradient: "from-emerald-500 to-teal-600",
    glow: "rgba(16,185,129,0.30)",
    tag: null,
  },
  {
    icon: Plane,
    label: "Visit",
    href: "/routes/visit",
    desc: "Tourism · Business · Short Stay",
    gradient: "from-gold-500 to-amber-500",
    glow: "rgba(245,158,11,0.35)",
    tag: null,
  },
  {
    icon: Star,
    label: "Special",
    href: "/routes/special",
    desc: "Researcher · Entrepreneur · Highly Qualified",
    gradient: "from-rose-500 to-ember-500",
    glow: "rgba(244,63,94,0.30)",
    tag: "New",
  },
];

const steps = [
  {
    num: "01",
    icon: MapPin,
    title: "Select Your Route",
    desc: "Choose your destination country and immigration purpose from our curated list.",
    color: "indigo",
  },
  {
    num: "02",
    icon: Search,
    title: "Check Eligibility",
    desc: "Answer a short guided questionnaire to discover which routes match your profile.",
    color: "violet",
  },
  {
    num: "03",
    icon: FileText,
    title: "Prepare Documents",
    desc: "Get a precise, route-specific checklist and upload everything securely in one place.",
    color: "gold",
  },
  {
    num: "04",
    icon: Zap,
    title: "Apply & Track",
    desc: "Submit your application and receive real-time status updates at every milestone.",
    color: "emerald",
  },
];

const stepStyles: Record<string, { badge: string; glow: string; num: string }> = {
  indigo:  { badge: "bg-indigo-600  shadow-[0_6px_28px_rgba(79,70,229,0.50)]",   glow: "rgba(79,70,229,0.25)",  num: "text-indigo-400"  },
  violet:  { badge: "bg-violet-600  shadow-[0_6px_28px_rgba(124,58,237,0.50)]",  glow: "rgba(124,58,237,0.22)", num: "text-violet-400"  },
  gold:    { badge: "bg-amber-500   shadow-[0_6px_28px_rgba(245,158,11,0.50)]",   glow: "rgba(245,158,11,0.22)", num: "text-gold-400"    },
  emerald: { badge: "bg-emerald-600 shadow-[0_6px_28px_rgba(16,185,129,0.50)]",  glow: "rgba(16,185,129,0.22)", num: "text-emerald-400" },
};

const trustCards = [
  {
    icon: Lock,
    title: "Bank-Grade Security",
    desc: "AES-256 encryption for every document and personal data point.",
    iconBg: "bg-indigo-500/15",
    iconCl: "text-indigo-300",
    glow: "rgba(79,70,229,0.22)",
  },
  {
    icon: Clock,
    title: "Live Tracking",
    desc: "Push notifications at every application milestone, instantly.",
    iconBg: "bg-gold-500/15",
    iconCl: "text-gold-300",
    glow: "rgba(245,158,11,0.18)",
  },
  {
    icon: Globe,
    title: "13 EU Countries",
    desc: "Complete coverage across all major European immigration destinations.",
    iconBg: "bg-violet-500/15",
    iconCl: "text-violet-300",
    glow: "rgba(124,58,237,0.20)",
  },
  {
    icon: TrendingUp,
    title: "Versioned Rules",
    desc: "All eligibility rules date-stamped with effective dates and official sources.",
    iconBg: "bg-emerald-500/15",
    iconCl: "text-emerald-300",
    glow: "rgba(16,185,129,0.18)",
  },
];

const stats = [
  { value: "13+", label: "EU Countries"       },
  { value: "30+", label: "Immigration Routes" },
  { value: "50k+",label: "Applications Guided"},
  { value: "98%", label: "Accuracy Rate"      },
];

/* ─── Scroll-reveal wrapper (pure CSS, no JS needed) ────────────── */
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`animate-fade-up ${className}`}
      style={{ animationDelay: `${delay}s`, animationFillMode: "both" }}
    >
      {children}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function HomePage() {
  const homeFaqs          = MOCK_FAQS.slice(0, 5);
  const featuredCountries = COUNTRIES.filter(c => c.status === "active").slice(0, 6);
  const latestArticles    = MOCK_ARTICLES.slice(0, 3);

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          § 1  HERO — Void dark, aurora glow, 3-D depth
      ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #050714 0%, #080c28 40%, #0d1038 70%, #050714 100%)",
        }}
      >
        {/* ── European city background photo ── */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1800&q=85&auto=format&fit=crop"
            alt="European city skyline"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            style={{ opacity: 0.38 }}
          />
          {/* Single dark vignette — no blue tint, just darkens so text stays readable */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(2,4,12,0.78) 0%, rgba(4,6,18,0.62) 45%, rgba(2,4,12,0.72) 100%)",
            }}
          />
        </div>

        {/* ── Multi-layer aurora background ── */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Primary aurora — reduced opacity so the photo shows through */}
          <div className="absolute inset-0" style={{
            background: [
              "radial-gradient(ellipse 120% 70% at 50% -10%, rgba(79,70,229,0.32) 0%, transparent 52%)",
              "radial-gradient(ellipse 80% 55% at -5%  65%, rgba(124,58,237,0.22) 0%, transparent 52%)",
              "radial-gradient(ellipse 70% 50% at 108% 78%, rgba(245,158,11,0.12) 0%, transparent 52%)",
            ].join(",")
          }} />

          {/* Hex / grid overlay */}
          <div className="absolute inset-0 grid-pattern opacity-[0.22]" />

          {/* Top beam shaft */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[500px]"
            style={{ background: "linear-gradient(to bottom, rgba(99,102,241,0.60), transparent)" }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[340px] w-[800px] rounded-full blur-[130px]"
            style={{ background: "rgba(79,70,229,0.10)" }}
          />

          {/* Floating orbs */}
          <div className="absolute top-[14%] right-[8%]  h-56 w-56 rounded-full blur-[90px]  animate-float-slow"
            style={{ background: "rgba(124,58,237,0.10)", animationDelay: "0s" }} />
          <div className="absolute bottom-[18%] left-[6%]  h-72 w-72 rounded-full blur-[110px] animate-float"
            style={{ background: "rgba(79,70,229,0.12)", animationDelay: "2.5s" }} />
          <div className="absolute bottom-[8%]  right-[22%] h-48 w-48 rounded-full blur-[80px]  animate-float-slow"
            style={{ background: "rgba(245,158,11,0.08)", animationDelay: "1.5s" }} />

          {/* Large faint globe wireframe (desktop) */}
          <div className="absolute right-[2%] top-1/2 -translate-y-1/2 opacity-[0.04] hidden xl:block pointer-events-none">
            <svg width="560" height="560" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="92" stroke="white" strokeWidth="0.7" />
              <ellipse cx="100" cy="100" rx="92" ry="37" stroke="white" strokeWidth="0.7" />
              <ellipse cx="100" cy="100" rx="92" ry="64" stroke="white" strokeWidth="0.7" />
              <line x1="8" y1="100" x2="192" y2="100" stroke="white" strokeWidth="0.7" />
              <line x1="100" y1="8" x2="100" y2="192" stroke="white" strokeWidth="0.7" />
              <path d="M100 8 Q50 100 100 192" stroke="white" strokeWidth="0.7" fill="none" />
              <path d="M100 8 Q150 100 100 192" stroke="white" strokeWidth="0.7" fill="none" />
              <circle cx="100" cy="8" r="3" fill="rgba(245,158,11,0.7)" />
            </svg>
          </div>

          {/* Scattered star dots */}
          {[
            { top:"12%", left:"15%", s:2 }, { top:"25%", left:"82%", s:1.5 },
            { top:"60%", left:"92%", s:2 }, { top:"75%", left:"5%",  s:1.5 },
            { top:"40%", left:"45%", s:1 }, { top:"88%", left:"55%", s:2 },
            { top:"18%", left:"60%", s:1 }, { top:"50%", left:"20%", s:1.5 },
          ].map((d, i) => (
            <div key={i} className="absolute rounded-full bg-white animate-pulse-slow"
              style={{
                top: d.top, left: d.left, width: d.s, height: d.s,
                animationDelay: `${i * 0.4}s`, opacity: 0.35,
              }}
            />
          ))}
        </div>

        {/* ── Hero content ── */}
        <div className="relative page-container w-full py-32 lg:py-40">
          <div className="mx-auto max-w-5xl text-center">

            {/* Eyebrow badge */}
            <Reveal delay={0}>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-5 py-2 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-300"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Trusted EU Immigration Guidance — Not Legal Advice
                </span>
              </div>
            </Reveal>

            {/* Main headline */}
            <Reveal delay={0.08}>
              <h1
                className="text-5xl font-bold leading-[1.04] text-white sm:text-6xl lg:text-[5.8rem] tracking-[-0.03em]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Navigate Europe
                <br className="hidden sm:block" />
                <span className="relative inline-block mt-2">
                  <span className="text-gradient-hero">with Precision</span>
                  {/* animated shimmer underline */}
                  <span
                    className="absolute -bottom-3 left-0 right-0 h-[3px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, transparent, #818cf8 30%, #a78bfa 60%, #fbbf24 80%, transparent)",
                      animation: "shimmer 3.5s linear infinite",
                      backgroundSize: "300% 100%",
                    }}
                  />
                </span>
              </h1>
            </Reveal>

            {/* Sub-headline */}
            <Reveal delay={0.16}>
              <p
                className="mt-9 text-lg leading-relaxed text-white/48 max-w-2xl mx-auto"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Check eligibility, build your document checklist, and track your
                application across{" "}
                <strong className="text-white/80 font-semibold">13 European countries</strong>
                {" "}and{" "}
                <strong className="text-white/80 font-semibold">30+ immigration routes</strong>.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link href="/eligibility">
                  <button
                    className="btn-shine group relative inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_6px_32px_rgba(79,70,229,0.50)] transition-all duration-300 hover:shadow-[0_10px_48px_rgba(79,70,229,0.68)] hover:-translate-y-1.5 active:translate-y-0 active:scale-[0.97]"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    Check My Eligibility
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </Link>
                <Link href="/countries">
                  <button
                    className="group inline-flex items-center gap-2.5 rounded-2xl border border-white/12 bg-white/[0.06] px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.10] hover:border-white/20 hover:-translate-y-1 active:translate-y-0"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    <Globe size={15} className="text-indigo-400" />
                    Explore Countries
                  </button>
                </Link>
              </div>
            </Reveal>

            {/* Trust micro-chips */}
            <Reveal delay={0.32}>
              <div className="mt-7 flex flex-wrap justify-center gap-5">
                {["Free eligibility check", "Secure document upload", "Live application tracking"].map(t => (
                  <span
                    key={t}
                    className="flex items-center gap-1.5 text-xs font-medium text-white/35"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    <CheckCircle size={12} className="text-indigo-400 shrink-0" />
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Stats row */}
            <Reveal delay={0.40}>
              <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-xl mx-auto">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm px-4 py-4 text-center transition-all duration-400 hover:-translate-y-1.5 hover:border-indigo-400/30 hover:bg-indigo-500/[0.08]"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                      style={{ background: "radial-gradient(circle at 50% 0%, rgba(79,70,229,0.16), transparent 70%)" }} />
                    <p
                      className="relative text-2xl font-bold text-white"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {s.value}
                    </p>
                    <p
                      className="relative mt-0.5 text-[11px] font-medium text-white/35 uppercase tracking-wide"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

          </div>
        </div>

        {/* Bottom curved transition */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 80V44C360 4 720 80 1080 40C1260 20 1380 58 1440 44V80H0Z" fill="#f8f7ff" />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          § 2  PURPOSE CARDS — light section with depth
      ════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-ice-50 relative overflow-hidden">
        {/* Subtle light dot pattern */}
        <div className="absolute inset-0 dot-pattern-light pointer-events-none opacity-70" />
        {/* Corner glow */}
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full blur-[120px] pointer-events-none"
          style={{ background: "rgba(79,70,229,0.07)" }} />

        <div className="relative page-container">
          <div className="text-center mb-16">
            <Reveal>
              <div className="section-eyebrow mb-4">
                <MapPin size={11} />
                Find Your Route
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="section-title text-ink">
                What Brings You to Europe?
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="section-subtitle mx-auto">
                Select your purpose to discover the immigration routes available
                for your destination country.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {purposeCards.map((card, i) => (
              <Reveal key={card.label} delay={i * 0.06}>
                <Link href={card.href} className="group block h-full">
                  <div className="relative flex flex-col items-center gap-3.5 p-5 rounded-3xl bg-white border border-slate-200/60 shadow-[0_1px_4px_rgba(15,22,64,0.06)] text-center transition-all duration-500 hover:-translate-y-2.5 hover:shadow-[0_20px_60px_-8px_rgba(79,70,229,0.18)] hover:border-indigo-300/50 cursor-pointer overflow-hidden h-full">

                    {/* hover bg tint */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                      style={{ background: `radial-gradient(circle at 50% 0%, ${card.glow.replace("0.40","0.05")}, transparent 70%)` }}
                    />

                    {/* Optional tag */}
                    {card.tag && (
                      <span
                        className="absolute top-2.5 right-2.5 rounded-full bg-indigo-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-600"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        {card.tag}
                      </span>
                    )}

                    {/* Icon */}
                    <div
                      className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} text-white transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}
                      style={{ boxShadow: `0 4px 20px ${card.glow}` }}
                    >
                      <card.icon size={22} />
                    </div>

                    <div className="relative">
                      <p
                        className="text-sm font-bold text-ink group-hover:text-indigo-700 transition-colors"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {card.label}
                      </p>
                      <p
                        className="mt-1 text-[11px] text-slate-400 leading-snug"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        {card.desc}
                      </p>
                    </div>

                    {/* Arrow on hover */}
                    <ArrowUpRight
                      size={11}
                      className="absolute top-3 right-3 text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          § 2.5  EUROPEAN DESTINATIONS VISUAL SHOWCASE
      ════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 overflow-hidden bg-white">
        {/* Section header */}
        <div className="relative page-container mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <Reveal>
                <div className="section-eyebrow mb-4">
                  <MapPin size={11} />
                  Destinations
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="section-title text-ink">
                  Live &amp; Work Across Europe
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="section-subtitle mt-3 max-w-xl">
                  From the cobblestones of Vilnius to the canals of Amsterdam — your next chapter starts here.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.08}>
              <Link href="/countries">
                <button
                  className="btn-secondary shrink-0 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  All 13 Countries <ChevronRight size={14} />
                </button>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Scrolling city strip — light bg variant */}
        <EuropeanCitiesStrip animated showLabels cardWidth={300} className="[--fade-from:#ffffff]" />

        {/* Bottom caption row */}
        <Reveal delay={0.18}>
          <div className="relative page-container mt-8 flex flex-wrap items-center justify-center gap-6">
            {[
              { flag: "🇱🇹", city: "Vilnius"    },
              { flag: "🇩🇪", city: "Berlin"     },
              { flag: "🇳🇱", city: "Amsterdam"  },
              { flag: "🇫🇷", city: "Paris"      },
              { flag: "🇸🇪", city: "Stockholm"  },
              { flag: "🇮🇹", city: "Rome"       },
              { flag: "🇵🇱", city: "Warsaw"     },
              { flag: "🇫🇮", city: "Helsinki"   },
              { flag: "🇦🇹", city: "Vienna"     },
            ].map(({ flag, city }) => (
              <span
                key={city}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                <span>{flag}</span>
                {city}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ════════════════════════════════════════════════════════════
          § 3  SUPPORTED COUNTRIES
      ════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full blur-[140px] pointer-events-none"
          style={{ background: "rgba(79,70,229,0.05)" }} />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full blur-[110px] pointer-events-none"
          style={{ background: "rgba(245,158,11,0.05)" }} />

        <div className="relative page-container">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
            <div>
              <Reveal>
                <div className="section-eyebrow mb-4">
                  <Globe size={11} />
                  Coverage
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="section-title text-ink">Supported Countries</h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="section-subtitle mt-3">Major EU destinations with complete application support.</p>
              </Reveal>
            </div>
            <Reveal delay={0.08}>
              <Link href="/countries">
                <button
                  className="btn-secondary shrink-0 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  View All Countries <ChevronRight size={14} />
                </button>
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCountries.map((country, i) => (
              <Reveal key={country.id} delay={i * 0.07}>
                <Link href={`/countries/${country.id}`} className="group block h-full">
                  <div className="relative flex flex-col h-full p-6 rounded-3xl bg-white border border-slate-200/70 shadow-[0_1px_4px_rgba(15,22,64,0.06)] overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_-8px_rgba(79,70,229,0.16)] group-hover:border-indigo-300/50">

                    {/* Top accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(79,70,229,0.6), transparent)" }}
                    />

                    {/* Inner glow on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(79,70,229,0.04), transparent 70%)" }}
                    />

                    <div className="relative flex items-center gap-4">
                      <div className="relative shrink-0">
                        <Image
                          src={country.flagUrl}
                          alt={`${country.name} flag`}
                          width={60}
                          height={40}
                          className="rounded-xl shadow-sm object-cover ring-1 ring-slate-200"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3
                            className="font-bold text-ink group-hover:text-indigo-700 transition-colors truncate"
                            style={{ fontFamily: "var(--font-syne)" }}
                          >
                            {country.name}
                          </h3>
                          <span
                            className="text-[10px] text-slate-400 font-mono shrink-0 bg-slate-50 px-1.5 py-0.5 rounded-md border border-slate-200"
                            style={{ fontFamily: "var(--font-outfit)" }}
                          >
                            {country.code}
                          </span>
                        </div>
                        <p
                          className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed"
                          style={{ fontFamily: "var(--font-outfit)" }}
                        >
                          {country.description.slice(0, 70)}…
                        </p>
                      </div>
                    </div>

                    <div className="relative mt-4 flex flex-wrap gap-1.5">
                      {country.supportedRoutes.map(r => (
                        <span
                          key={r}
                          className="rounded-full bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-600 capitalize"
                          style={{ fontFamily: "var(--font-outfit)" }}
                        >
                          {r}
                        </span>
                      ))}
                    </div>

                    <div className="relative mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
                      <span
                        className="text-[11px] text-slate-400"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        {country.processingInfo}
                      </span>
                      <ArrowUpRight
                        size={13}
                        className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          § 4  HOW IT WORKS — dramatic dark section
      ════════════════════════════════════════════════════════════ */}
      <section
        className="relative section-padding overflow-hidden"
        style={{
          background: "linear-gradient(165deg, #050714 0%, #0a0f2e 30%, #0f1640 65%, #050714 100%)",
        }}
      >
        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 grid-pattern opacity-[0.18]" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full blur-[160px]"
            style={{ background: "rgba(79,70,229,0.09)" }}
          />
          <div
            className="absolute bottom-0 right-0 h-72 w-72 rounded-full blur-[110px]"
            style={{ background: "rgba(245,158,11,0.07)" }}
          />
        </div>

        <div className="relative page-container">
          <div className="text-center mb-20">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-300 mb-5"
                style={{ fontFamily: "var(--font-outfit)" }}>
                <Zap size={11} />
                Process
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                className="text-3xl lg:text-5xl font-bold text-white"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Four Steps to Your EU Future
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p
                className="mt-4 text-white/42 text-base max-w-xl mx-auto leading-relaxed"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                From eligibility check to submitted application — structured, clear, and guided.
              </p>
            </Reveal>
          </div>

          {/* Steps */}
          <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Connecting line (desktop) */}
            <div
              className="hidden lg:block absolute top-[44px] left-[15%] right-[15%] h-px"
              style={{ background: "linear-gradient(90deg, rgba(79,70,229,0.6), rgba(124,58,237,0.5), rgba(245,158,11,0.5), rgba(16,185,129,0.6))" }}
            />

            {steps.map((step, i) => {
              const st = stepStyles[step.color];
              return (
                <Reveal key={step.num} delay={i * 0.10}>
                  <div className="group relative flex flex-col items-center text-center">
                    {/* Icon badge */}
                    <div className="relative z-10 mb-6">
                      <div
                        className={`flex h-[76px] w-[76px] items-center justify-center rounded-3xl ${st.badge} text-white transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105`}
                      >
                        <step.icon size={30} />
                      </div>
                      {/* Step number badge */}
                      <div
                        className="absolute -top-2.5 -right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-void border-2 border-indigo-900/80 text-[10px] font-bold text-white/60"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        {i + 1}
                      </div>
                    </div>

                    <h3
                      className="text-base font-bold text-white mb-2"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-sm text-white/38 leading-relaxed"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {step.desc}
                    </p>

                    {/* Colour accent dot on hover */}
                    <div
                      className={`mt-5 h-[3px] w-0 group-hover:w-10 rounded-full transition-all duration-500 ${st.num}`}
                      style={{ background: step.color === "indigo" ? "#6366f1" : step.color === "violet" ? "#7c3aed" : step.color === "gold" ? "#f59e0b" : "#10b981" }}
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.4}>
            <div className="mt-16 text-center">
              <Link href="/eligibility">
                <button
                  className="btn-shine group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-9 py-4 text-sm font-semibold text-white shadow-[0_6px_32px_rgba(79,70,229,0.50)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_48px_rgba(79,70,229,0.65)] active:translate-y-0 active:scale-[0.97]"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Start Your Eligibility Check
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          § 5  TRUST / WHY AVENSA — glass cards
      ════════════════════════════════════════════════════════════ */}
      <section
        className="relative section-padding overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #050714 0%, #080b22 50%, #050714 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div style={{
            position: "absolute", inset: 0,
            background: [
              "radial-gradient(ellipse 80% 50% at 20% 10%, rgba(79,70,229,0.20) 0%, transparent 58%)",
              "radial-gradient(ellipse 60% 40% at 80% 82%, rgba(245,158,11,0.10) 0%, transparent 52%)",
              "radial-gradient(ellipse 50% 60% at 55% 30%, rgba(124,58,237,0.18) 0%, transparent 52%)",
            ].join(",")
          }} />
          <div className="absolute inset-0 grid-pattern opacity-[0.15]" />
        </div>

        <div className="relative page-container">
          <div className="text-center mb-16">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-300 mb-5"
                style={{ fontFamily: "var(--font-outfit)" }}>
                <Sparkles size={11} />
                Why Avensa
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                className="text-3xl lg:text-5xl font-bold text-white"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Built on Transparency &amp; Accuracy
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p
                className="mt-4 text-white/42 max-w-lg mx-auto leading-relaxed"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Structured immigration information — no guesswork, no legal advice, just clarity.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trustCards.map((tc, i) => (
              <Reveal key={tc.title} delay={i * 0.08}>
                <div
                  className="group relative rounded-3xl p-7 text-center overflow-hidden cursor-default border border-white/[0.07] transition-all duration-500 hover:-translate-y-2.5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(20px) saturate(180%)",
                  }}
                >
                  {/* Card glow on hover */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${tc.glow}, transparent 72%)` }}
                  />

                  {/* Icon */}
                  <div
                    className={`relative mb-5 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${tc.iconBg} transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1`}
                  >
                    <tc.icon size={24} className={tc.iconCl} />
                  </div>

                  <h3
                    className="relative text-sm font-bold text-white"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {tc.title}
                  </h3>
                  <p
                    className="relative mt-2 text-xs text-white/38 leading-relaxed"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {tc.desc}
                  </p>

                  {/* Bottom shimmer on hover */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-2/3 rounded-full transition-all duration-500"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.7), transparent)" }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          § 6  SOCIAL PROOF TICKER
      ════════════════════════════════════════════════════════════ */}
      <section className="relative py-0 overflow-hidden border-y border-indigo-100/60 bg-ice-50">
        {/* Top row — route ticker */}
        <div className="flex whitespace-nowrap border-b border-indigo-100/40 py-3" style={{ animation: "ticker 28s linear infinite" }}>
          {[...Array(3)].map((_, gi) => (
            <div key={gi} className="flex items-center gap-10 px-5 shrink-0">
              {[
                { icon: "🇩🇪", text: "Germany Skilled Worker Visa" },
                { icon: "🇳🇱", text: "Netherlands Highly Skilled Migrant" },
                { icon: "🇪🇸", text: "Spain Digital Nomad Visa" },
                { icon: "🇵🇹", text: "Portugal D8 Visa" },
                { icon: "🇫🇷", text: "France Talent Passport" },
                { icon: "🇸🇪", text: "Sweden Work Permit" },
                { icon: "🇮🇹", text: "Italy Decreto Flussi" },
                { icon: "🇦🇹", text: "Austria Red-White-Red Card" },
                { icon: "🇵🇱", text: "Poland Work Permit" },
                { icon: "🇧🇪", text: "Belgium Single Permit" },
                { icon: "🇱🇹", text: "Lithuania National Visa D" },
                { icon: "🇫🇮", text: "Finland Residence Permit" },
              ].map((item, j) => (
                <span
                  key={j}
                  className="flex items-center gap-2.5 text-sm font-medium text-slate-500"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.text}</span>
                  <span className="text-slate-300 text-xs">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom row — European landmarks ticker (reverse direction) */}
        <div className="flex whitespace-nowrap py-3" style={{ animation: "ticker 36s linear infinite reverse" }}>
          {[...Array(3)].map((_, gi) => (
            <div key={gi} className="flex items-center gap-10 px-5 shrink-0">
              {[
                { icon: "🏛️", text: "Vilnius Old Town, Lithuania"     },
                { icon: "🌉", text: "Brandenburg Gate, Berlin"         },
                { icon: "⛵", text: "Amsterdam Canals, Netherlands"    },
                { icon: "🗼", text: "Eiffel Tower, Paris"              },
                { icon: "🏰", text: "Stockholm Royal Palace"           },
                { icon: "🏟️", text: "Colosseum, Rome"                 },
                { icon: "🌆", text: "Warsaw Skyline, Poland"           },
                { icon: "🎶", text: "Helsinki Cathedral, Finland"      },
                { icon: "🎡", text: "Schönbrunn Palace, Vienna"        },
                { icon: "🧭", text: "EU Blue Card · Fast Track"        },
              ].map((item, j) => (
                <span
                  key={j}
                  className="flex items-center gap-2.5 text-sm font-medium text-indigo-400/70"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.text}</span>
                  <span className="text-indigo-200 text-xs">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          § 7  LATEST NEWS
      ════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full blur-[120px] pointer-events-none"
          style={{ background: "rgba(79,70,229,0.05)" }} />

        <div className="relative page-container">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
            <div>
              <Reveal>
                <div className="section-eyebrow mb-4">
                  <FileText size={11} />
                  Updates
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="section-title text-ink">Immigration Updates</h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="section-subtitle mt-3">Recent changes that may affect your plans.</p>
              </Reveal>
            </div>
            <Reveal delay={0.08}>
              <Link href="/news">
                <button
                  className="btn-secondary shrink-0 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  View All <ChevronRight size={14} />
                </button>
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {latestArticles.map((article, i) => {
              const accents = [
                { bar: "#6366f1", tagCl: "bg-indigo-50 border-indigo-100 text-indigo-600" },
                { bar: "#7c3aed", tagCl: "bg-violet-50 border-violet-100 text-violet-600" },
                { bar: "#f59e0b", tagCl: "bg-amber-50 border-amber-100 text-amber-600"   },
              ][i];
              return (
                <Reveal key={article.id} delay={i * 0.09}>
                  <Link href={`/knowledge-base/${article.slug}`} className="group block h-full">
                    <div className="relative flex flex-col h-full rounded-3xl bg-white border border-slate-200/70 shadow-[0_1px_4px_rgba(15,22,64,0.06)] overflow-hidden transition-all duration-500 group-hover:-translate-y-2.5 group-hover:shadow-[0_20px_60px_-8px_rgba(79,70,229,0.16)] group-hover:border-indigo-300/50">

                      {/* Top colour bar */}
                      <div
                        className="h-[3px] w-full transition-all duration-500 group-hover:h-[4px]"
                        style={{ background: accents.bar }}
                      />

                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: "radial-gradient(ellipse at 50% -20%, rgba(79,70,229,0.04), transparent 60%)" }}
                      />

                      <div className="relative p-6 flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${accents.tagCl}`}
                            style={{ fontFamily: "var(--font-outfit)" }}
                          >
                            {article.category}
                          </span>
                          <span
                            className="text-[11px] text-slate-400"
                            style={{ fontFamily: "var(--font-outfit)" }}
                          >
                            {formatDate(article.publishedAt)}
                          </span>
                        </div>
                        <h3
                          className="font-bold text-ink leading-snug group-hover:text-indigo-700 transition-colors"
                          style={{ fontFamily: "var(--font-syne)" }}
                        >
                          {article.title}
                        </h3>
                        <p
                          className="mt-3 text-sm text-slate-500 leading-relaxed line-clamp-3"
                          style={{ fontFamily: "var(--font-outfit)" }}
                        >
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="relative px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                        <span
                          className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 group-hover:gap-2.5 transition-all duration-300"
                          style={{ fontFamily: "var(--font-outfit)" }}
                        >
                          Read article <ArrowRight size={12} />
                        </span>
                        <ArrowUpRight size={12} className="text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          § 8  FAQ — clean accordion
      ════════════════════════════════════════════════════════════ */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: "var(--bg-page)" }}
      >
        <div className="absolute inset-0 dot-pattern-light pointer-events-none opacity-60" />
        <div className="absolute top-0 right-0 h-72 w-72 rounded-full blur-[130px] pointer-events-none"
          style={{ background: "rgba(79,70,229,0.06)" }} />

        <div className="relative page-container">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-14">
              <Reveal>
                <div className="section-eyebrow mb-4">
                  <Search size={11} />
                  FAQ
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="section-title text-ink">Frequently Asked Questions</h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="section-subtitle mx-auto">Quick answers to common immigration questions.</p>
              </Reveal>
            </div>

            <div className="space-y-3">
              {homeFaqs.map((faq, i) => (
                <Reveal key={faq.id} delay={i * 0.06}>
                  <details className="group rounded-3xl border border-slate-200/80 bg-white shadow-[0_1px_4px_rgba(15,22,64,0.05)] overflow-hidden transition-all duration-300 hover:border-indigo-300/50 hover:shadow-[0_8px_30px_-4px_rgba(79,70,229,0.10)] open:border-indigo-300/60 open:shadow-[0_0_0_1px_rgba(79,70,229,0.10),0_8px_30px_-4px_rgba(79,70,229,0.12)]">
                    <summary className="flex cursor-pointer items-center justify-between px-6 py-4.5 list-none select-none">
                      <span className="flex items-center gap-3">
                        <span
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-600 group-open:bg-indigo-600 group-open:text-white group-open:border-indigo-600 transition-colors"
                          style={{ fontFamily: "var(--font-outfit)" }}
                        >
                          {i + 1}
                        </span>
                        <span
                          className="text-sm font-semibold text-ink group-open:text-indigo-700 transition-colors"
                          style={{ fontFamily: "var(--font-outfit)" }}
                        >
                          {faq.question}
                        </span>
                      </span>
                      <ChevronRight
                        size={15}
                        className="shrink-0 text-slate-300 transition-transform duration-300 group-open:rotate-90 group-open:text-indigo-400 ml-4"
                      />
                    </summary>
                    <div
                      className="border-t border-slate-100 bg-indigo-50/40 px-6 py-4 text-sm text-slate-500 leading-relaxed"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {faq.answer}
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.30}>
              <div className="mt-10 text-center">
                <Link href="/knowledge-base#faq">
                  <button
                    className="btn-secondary flex items-center gap-2 mx-auto"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    View All FAQs <ChevronRight size={14} />
                  </button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          § 9  FINAL CTA — immersive full-width
      ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28 lg:py-36">
        {/* European city photo mosaic — bottom strip behind the dark overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 3-photo horizontal mosaic at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[45%] flex overflow-hidden opacity-30">
            {[
              "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=60&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=60&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=60&auto=format&fit=crop",
            ].map((src, i) => (
              <div key={i} className="relative flex-1 min-w-0">
                <Image
                  src={src}
                  alt="European city"
                  fill
                  sizes="33vw"
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
          {/* Gradient mask over the mosaic so it fades into the dark bg */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[55%]"
            style={{ background: "linear-gradient(to bottom, #050714 0%, transparent 100%)" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[20%]"
            style={{ background: "linear-gradient(to top, rgba(5,7,20,0.9) 0%, transparent 100%)" }}
          />
        </div>

        {/* Deep aurora background */}
        <div className="absolute inset-0" style={{
          background: [
            "radial-gradient(ellipse 95% 85% at 50% -15%, rgba(79,70,229,0.55) 0%, transparent 55%)",
            "radial-gradient(ellipse 70% 55% at 0%   82%, rgba(124,58,237,0.42) 0%, transparent 55%)",
            "radial-gradient(ellipse 65% 48% at 102% 75%, rgba(245,158,11,0.20) 0%, transparent 52%)",
            "linear-gradient(160deg, #050714 0%, #080c28 35%, #050714 100%)",
          ].join(",")
        }} />
        <div className="absolute inset-0 grid-pattern opacity-[0.20] pointer-events-none" />

        {/* Animated orbs */}
        <div className="absolute top-12 left-1/3  h-52 w-52 rounded-full blur-[90px] animate-float-slow"
          style={{ background: "rgba(99,102,241,0.18)" }} />
        <div className="absolute bottom-12 right-1/3 h-44 w-44 rounded-full blur-[80px] animate-float"
          style={{ background: "rgba(245,158,11,0.14)", animationDelay: "2s" }} />

        {/* Starburst lines from center */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.07]">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
              <line
                key={i}
                x1="50%" y1="50%"
                x2={`${50 + 80 * Math.cos((deg * Math.PI) / 180)}%`}
                y2={`${50 + 80 * Math.sin((deg * Math.PI) / 180)}%`}
                stroke="white"
                strokeWidth="0.5"
              />
            ))}
          </svg>
        </div>

        <div className="relative page-container text-center">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/30 bg-gold-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-300 mb-8"
              style={{ fontFamily: "var(--font-outfit)" }}>
              <Sparkles size={11} />
              Start Today — It&apos;s Free
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              className="text-4xl font-bold text-white lg:text-6xl max-w-3xl mx-auto leading-tight"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Ready to Begin Your{" "}
              <br className="hidden sm:block" />
              <span className="text-gradient-hero">EU Journey?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p
              className="mt-6 text-base text-white/40 max-w-md mx-auto leading-relaxed"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Join thousands navigating EU immigration with clarity and confidence.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/auth/register">
                <button
                  className="btn-shine group relative inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-10 py-4.5 text-sm font-semibold text-white shadow-[0_8px_40px_rgba(79,70,229,0.55)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_60px_rgba(79,70,229,0.70)] active:translate-y-0 active:scale-[0.97]"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Create Free Account
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <Link href="/eligibility">
                <button
                  className="group inline-flex items-center gap-2.5 rounded-2xl border border-white/12 bg-white/[0.06] px-10 py-4.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.10] hover:border-white/22 hover:-translate-y-1"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Check Eligibility
                </button>
              </Link>
            </div>
          </Reveal>

          {/* Feature chips */}
          <Reveal delay={0.32}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                { icon: Shield,    text: "No hidden fees" },
                { icon: Lock,      text: "GDPR compliant" },
                { icon: BarChart3, text: "Real-time tracking" },
                { icon: Layers,    text: "30+ routes" },
              ].map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/45"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  <Icon size={11} className="text-indigo-400 shrink-0" />
                  {text}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          § 10  DISCLAIMER BAND
      ════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gold-50 border-y border-gold-200/50 py-5">
        <div className="page-container">
          <p
            className="text-xs text-amber-800/60 text-center max-w-4xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            <strong className="text-amber-800/80 font-semibold">⚠ Important: </strong>
            Avensa Overseas provides general immigration information only and does not constitute legal advice.
            Always consult a qualified immigration lawyer or official government sources before making decisions.
          </p>
        </div>
      </section>
    </>
  );
}
