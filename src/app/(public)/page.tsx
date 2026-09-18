import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Globe, FileText, Search, Clock, Shield,
  Briefcase, GraduationCap, Home as HomeIcon, Plane, Star,
  ChevronRight, Sparkles, MapPin, Zap, ArrowUpRight, Lock,
  TrendingUp, CheckCircle, Users,
} from "lucide-react";
import { COUNTRIES, COMPANY } from "@/lib/constants";
import { MOCK_FAQS, MOCK_ARTICLES } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { EuropeanCitiesStrip, EuropeanCitiesStripDark, EUROPEAN_CITIES } from "@/components/ui/EuropeanCitiesStrip";
import FAQItem from "@/components/ui/FAQItem";

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
    gradient: "from-[#0d1b4b] to-[#1a2b6b]",
    glow: "rgba(13,27,75,0.40)",
    tag: "Most Popular",
  },
  {
    icon: GraduationCap,
    label: "Study",
    href: "/routes/study",
    desc: "Bachelor · Master · PhD programmes",
    gradient: "from-[#F5A623] to-[#E8971A]",
    glow: "rgba(245,166,35,0.35)",
    tag: null,
  },
  {
    icon: Users,
    label: "Family",
    href: "/routes/family",
    desc: "Spouse · Child · Reunification",
    gradient: "from-[#1a2b6b] to-[#0d1b4b]",
    glow: "rgba(26,43,107,0.30)",
    tag: null,
  },
  {
    icon: HomeIcon,
    label: "Residence",
    href: "/routes/residence",
    desc: "Long-term · Permanent · Digital Nomad",
    gradient: "from-[#0d1b4b] to-[#F5A623]",
    glow: "rgba(13,27,75,0.30)",
    tag: null,
  },
  {
    icon: Plane,
    label: "Visit",
    href: "/routes/visit",
    desc: "Tourism · Business · Short Stay",
    gradient: "from-[#F5A623] to-[#fcd34d]",
    glow: "rgba(245,166,35,0.35)",
    tag: null,
  },
  {
    icon: Star,
    label: "Special",
    href: "/routes/special",
    desc: "Researcher · Entrepreneur · Highly Qualified",
    gradient: "from-[#1a2b6b] to-[#F5A623]",
    glow: "rgba(13,27,75,0.30)",
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
  indigo:  { badge: "bg-[#0d1b4b]  shadow-[0_6px_28px_rgba(13,27,75,0.50)]",    glow: "rgba(13,27,75,0.25)",   num: "text-[#5c80c0]"  },
  violet:  { badge: "bg-[#1a2b6b]  shadow-[0_6px_28px_rgba(26,43,107,0.50)]",   glow: "rgba(26,43,107,0.22)",  num: "text-[#7a9ad0]"  },
  gold:    { badge: "bg-[#F5A623]   shadow-[0_6px_28px_rgba(245,166,35,0.50)]",  glow: "rgba(245,166,35,0.22)", num: "text-gold-400"    },
  emerald: { badge: "bg-[#0d1b4b]   shadow-[0_6px_28px_rgba(13,27,75,0.50)]",   glow: "rgba(13,27,75,0.22)",   num: "text-[#5c80c0]"  },
};

const trustCards = [
  {
    icon: Lock,
    title: "Bank-Grade Security",
    desc: "AES-256 encryption for every document and personal data point.",
    iconBg: "bg-[rgba(13,27,75,0.15)]",
    iconCl: "text-[#8aa5d6]",
    glow: "rgba(13,27,75,0.25)",
  },
  {
    icon: Clock,
    title: "Live Tracking",
    desc: "Push notifications at every application milestone, instantly.",
    iconBg: "bg-[rgba(245,166,35,0.12)]",
    iconCl: "text-[#F5A623]",
    glow: "rgba(245,166,35,0.18)",
  },
  {
    icon: Globe,
    title: "13 EU Countries",
    desc: "Complete coverage across all major European immigration destinations.",
    iconBg: "bg-[rgba(26,43,107,0.15)]",
    iconCl: "text-[#8aa5d6]",
    glow: "rgba(26,43,107,0.22)",
  },
  {
    icon: TrendingUp,
    title: "Versioned Rules",
    desc: "All eligibility rules date-stamped with effective dates and official sources.",
    iconBg: "bg-[rgba(245,166,35,0.10)]",
    iconCl: "text-[#fcd34d]",
    glow: "rgba(245,166,35,0.15)",
  },
];

const stats = [
  { value: "30+", label: "EU Countries"       },
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
            src="https://picsum.photos/seed/amsterdam/1800/1000"
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
          {/* Primary aurora — navy + gold tones matching the logo */}
          <div className="absolute inset-0" style={{
            background: [
              "radial-gradient(ellipse 120% 70% at 50% -10%, rgba(13,27,75,0.55) 0%, transparent 52%)",
              "radial-gradient(ellipse 80% 55% at -5%  65%, rgba(26,43,107,0.30) 0%, transparent 52%)",
              "radial-gradient(ellipse 70% 50% at 108% 78%, rgba(245,166,35,0.10) 0%, transparent 52%)",
            ].join(",")
          }} />

          {/* Hex / grid overlay */}
          <div className="absolute inset-0 grid-pattern opacity-[0.22]" />

          {/* Top beam shaft — gold tint */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[500px]"
            style={{ background: "linear-gradient(to bottom, rgba(245,166,35,0.40), transparent)" }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[340px] w-[800px] rounded-full blur-[130px]"
            style={{ background: "rgba(13,27,75,0.18)" }}
          />

          {/* Floating orbs — navy + gold */}
          <div className="absolute top-[14%] right-[8%]  h-56 w-56 rounded-full blur-[90px]  animate-float-slow"
            style={{ background: "rgba(26,43,107,0.18)", animationDelay: "0s" }} />
          <div className="absolute bottom-[18%] left-[6%]  h-72 w-72 rounded-full blur-[110px] animate-float"
            style={{ background: "rgba(13,27,75,0.20)", animationDelay: "2.5s" }} />
          <div className="absolute bottom-[8%]  right-[22%] h-48 w-48 rounded-full blur-[80px]  animate-float-slow"
            style={{ background: "rgba(245,166,35,0.07)", animationDelay: "1.5s" }} />

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
              <div className="mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2 backdrop-blur-sm"
                style={{ border: "1px solid rgba(245,166,35,0.30)", background: "rgba(245,166,35,0.08)" }}>
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "#F5A623" }} />
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                  style={{ fontFamily: "var(--font-outfit)", color: "#F5A623" }}
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
                  {/* animated shimmer underline — gold matching logo */}
                  <span
                    className="absolute -bottom-3 left-0 right-0 h-[3px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, transparent, #1a2b6b 20%, #F5A623 60%, transparent)",
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
                className="mt-9 text-lg leading-relaxed text-white/80 max-w-2xl mx-auto"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Check eligibility, build your document checklist, and track your
                application across{" "}
                <strong className="text-white font-semibold">13 European countries</strong>
                {" "}and{" "}
                <strong className="text-white font-semibold">30+ immigration routes</strong>.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link href="/eligibility">
                  <button
                    className="group relative inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1.5 active:translate-y-0 active:scale-[0.97]"
                    style={{
                      fontFamily: "var(--font-outfit)",
                      background: "linear-gradient(135deg, #0d1b4b 0%, #1a2b6b 100%)",
                      border: "1px solid rgba(245,166,35,0.40)",
                      boxShadow: "0 6px 32px rgba(13,27,75,0.55), 0 0 0 1px rgba(245,166,35,0.10)",
                    }}
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
                    <Globe size={15} style={{ color: "#F5A623" }} />
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
                    className="flex items-center gap-1.5 text-xs font-medium text-white/70"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    <CheckCircle size={12} className="shrink-0" style={{ color: "#F5A623" }} />
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
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm px-4 py-4 text-center transition-all duration-400 hover:-translate-y-1.5"
                    style={{
                      animationDelay: `${i * 0.08}s`,
                      borderColor: "rgba(245,166,35,0.15)",
                    }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                      style={{ background: "radial-gradient(circle at 50% 0%, rgba(245,166,35,0.10), transparent 70%)" }} />
                    <p
                      className="relative text-2xl font-bold text-white"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {s.value}
                    </p>
                    <p
                      className="relative mt-0.5 text-[11px] font-medium text-white/60 uppercase tracking-wide"
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
          § 1.5  SPECIALISATION — Schengen-to-Schengen TRC
      ════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden bg-white">
        {/* subtle top glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[700px] rounded-full blur-[130px] pointer-events-none"
          style={{ background: "rgba(13,27,75,0.06)" }} />

        <div className="relative page-container">
          {/* Section header */}
          <div className="text-center mb-14">
            <Reveal>
              <div className="section-eyebrow mb-4">
                <Sparkles size={11} />
                Our Specialisation
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="section-title text-ink">
                We Specialise in{" "}
                <span className="text-gradient-hero">Schengen to Schengen</span>
                <br className="hidden sm:block" /> TRC Change
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="section-subtitle mx-auto max-w-2xl">
                Changing your Temporary Residence Permit between Schengen countries is
                complex — visa categories, timelines, and documentation differ by country.
                We guide you through every step with precision.
              </p>
            </Reveal>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Globe,
                title: "Cross-Country TRC Transfers",
                desc: "Already living in one Schengen country? We help you transfer or upgrade your residence permit to another EU member state without starting from zero.",
                accent: "from-[#0d1b4b] to-[#1a2b6b]",
                glow: "rgba(13,27,75,0.35)",
                tag: "Most Requested",
              },
              {
                icon: FileText,
                title: "Document Checklist & Prep",
                desc: "Every TRC change requires a tailored document set. We generate a precise, country-specific checklist so nothing is missed.",
                accent: "from-[#F5A623] to-[#E8971A]",
                glow: "rgba(245,166,35,0.30)",
                tag: null,
              },
              {
                icon: Clock,
                title: "Timeline & Deadline Tracking",
                desc: "We track your current permit validity and alert you when to begin the TRC change process so you never overstay or lose status.",
                accent: "from-[#1a2b6b] to-[#0d1b4b]",
                glow: "rgba(26,43,107,0.28)",
                tag: null,
              },
              {
                icon: Shield,
                title: "Compliance Verification",
                desc: "We cross-check your eligibility against each country's specific TRC transfer rules before you submit a single document.",
                accent: "from-[#0d1b4b] to-[#F5A623]",
                glow: "rgba(13,27,75,0.28)",
                tag: null,
              },
              {
                icon: Search,
                title: "Route Comparison Tool",
                desc: "Compare TRC change routes across multiple Schengen countries side-by-side — processing times, fees, and requirements at a glance.",
                accent: "from-[#F5A623] to-[#fcd34d]",
                glow: "rgba(245,166,35,0.30)",
                tag: null,
              },
              {
                icon: TrendingUp,
                title: "Real-Time Status Updates",
                desc: "Once your application is submitted, track its progress in real time. Every milestone, every update — straight to you.",
                accent: "from-[#1a2b6b] to-[#F5A623]",
                glow: "rgba(26,43,107,0.28)",
                tag: "Live",
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.07}>
                <div className="group relative flex flex-col gap-4 p-6 rounded-3xl bg-white border border-slate-200/70 shadow-[0_1px_4px_rgba(13,27,75,0.06)] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-8px_rgba(13,27,75,0.16)] hover:border-[rgba(245,166,35,0.35)] h-full">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(245,166,35,0.70), transparent)" }} />
                  {/* Inner glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                    style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(13,27,75,0.04), transparent 70%)" }} />

                  {card.tag && (
                    <span className="absolute top-4 right-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.30)", color: "#b06000", fontFamily: "var(--font-outfit)" }}>
                      {card.tag}
                    </span>
                  )}

                  <div className={`relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} text-white shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}
                    style={{ boxShadow: `0 4px 18px ${card.glow}` }}>
                    <card.icon size={20} />
                  </div>

                  <div className="relative">
                    <h3 className="font-bold text-ink group-hover:text-[#0d1b4b] transition-colors text-sm"
                      style={{ fontFamily: "var(--font-syne)" }}>
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed"
                      style={{ fontFamily: "var(--font-outfit)" }}>
                      {card.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <Reveal delay={0.44}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/eligibility">
                <button className="btn-shine group inline-flex items-center gap-2.5 rounded-2xl px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1"
                  style={{ fontFamily: "var(--font-outfit)", background: "linear-gradient(135deg,#0d1b4b,#1a2b6b)", border: "1px solid rgba(245,166,35,0.30)", boxShadow: "0 6px 28px rgba(13,27,75,0.45)" }}>
                  Check TRC Eligibility
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="group inline-flex items-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                  style={{ fontFamily: "var(--font-outfit)", border: "1px solid rgba(245,166,35,0.30)", background: "rgba(245,166,35,0.07)", color: "#b06000" }}>
                  Talk to an Expert
                  <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          § 1.6  STUDENT VISA COUNTRIES
      ════════════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden"
        style={{ background: "linear-gradient(160deg, #050714 0%, #080c28 45%, #0d1038 75%, #050714 100%)" }}>
        {/* Background */}
          <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 grid-pattern opacity-[0.18]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full blur-[160px]"
            style={{ background: "rgba(13,27,75,0.15)" }} />
        </div>

        <div className="relative page-container">
          <div className="text-center mb-14">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] mb-5"
                style={{ fontFamily: "var(--font-outfit)", border: "1px solid rgba(245,166,35,0.35)", background: "rgba(245,166,35,0.08)", color: "#F5A623" }}>
                <GraduationCap size={11} />
                Student Visa
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-3xl lg:text-5xl font-bold text-white"
                style={{ fontFamily: "var(--font-syne)" }}>
                Study in Europe
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 text-white/70 text-base max-w-xl mx-auto leading-relaxed"
                style={{ fontFamily: "var(--font-outfit)" }}>
                We support student visa applications for these countries — world-class education, affordable tuition.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
            {[
              {
                flag: "🇱🇹",
                code: "LT",
                name: "Lithuania",
                capital: "Vilnius",
                highlight: "Top Tech & Medical Universities",
                desc: "Lithuania offers affordable EU-standard education with a growing tech ecosystem. English-taught programmes widely available.",
                img: "https://picsum.photos/seed/vilnius/800/500",
                tags: ["Bachelor", "Master", "PhD"],
                color: "from-yellow-500/20 to-green-500/10",
                border: "border-yellow-400/20",
                badge: "from-yellow-500 to-green-500",
              },
              {
                flag: "🇱🇻",
                code: "LV",
                name: "Latvia",
                capital: "Riga",
                highlight: "Affordable EU Tuition",
                desc: "Latvia's universities rank among the most affordable in the EU, with strong medicine, engineering, and business programmes.",
                img: "https://picsum.photos/seed/riga/800/500",
                tags: ["Bachelor", "Master", "Language Courses"],
                color: "from-red-500/20 to-slate-500/10",
                border: "border-red-400/20",
                badge: "from-red-500 to-rose-600",
              },
              {
                flag: "🇧🇬",
                code: "BG",
                name: "Bulgaria",
                capital: "Sofia",
                highlight: "Lowest Cost EU Study",
                desc: "Bulgaria has some of the lowest tuition fees in the EU with recognised medical, law, and engineering degrees.",
                img: "https://picsum.photos/seed/sofia/800/500",
                tags: ["Bachelor", "Medical", "Engineering"],
                color: "from-emerald-500/20 to-sky-500/10",
                border: "border-emerald-400/20",
                badge: "from-emerald-500 to-teal-500",
              },
            ].map((c, i) => (
              <Reveal key={c.code} delay={i * 0.10}>
                <div className={`group relative rounded-3xl overflow-hidden border ${c.border} transition-all duration-500 hover:-translate-y-2.5 hover:shadow-[0_24px_60px_-8px_rgba(13,27,75,0.30)] bg-white/[0.03] backdrop-blur-sm h-full flex flex-col`}>
                  {/* Country photo */}
                  <div className="relative h-44 overflow-hidden shrink-0">
                    <Image
                      src={c.img}
                      alt={`${c.name} study`}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* dark overlay */}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,7,20,0.75) 0%, rgba(5,7,20,0.15) 60%)" }} />
                    {/* Flag + code */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="text-2xl">{c.flag}</span>
                      <span className="rounded-full bg-black/40 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white/80 font-mono border border-white/10">{c.code}</span>
                    </div>
                    {/* Highlight badge */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${c.badge} px-3 py-1 text-[10px] font-bold text-white shadow-lg`}
                        style={{ fontFamily: "var(--font-outfit)" }}>
                        ✦ {c.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#F5A623] transition-colors"
                        style={{ fontFamily: "var(--font-syne)" }}>
                        {c.name}
                      </h3>
                      <span className="text-xs text-white/45 flex items-center gap-1 shrink-0"
                        style={{ fontFamily: "var(--font-outfit)" }}>
                        <MapPin size={10} /> {c.capital}
                      </span>
                    </div>
                    <p className="text-sm text-white/65 leading-relaxed mb-4"
                      style={{ fontFamily: "var(--font-outfit)" }}>
                      {c.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {c.tags.map(t => (
                        <span key={t} className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                          style={{ background: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.28)", color: "#F5A623", fontFamily: "var(--font-outfit)" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.35}>
            <div className="mt-10 text-center">
              <Link href="/eligibility">
                <button className="btn-shine group inline-flex items-center gap-2.5 rounded-2xl px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1"
                  style={{ fontFamily: "var(--font-outfit)", background: "linear-gradient(135deg,#0d1b4b,#1a2b6b)", border: "1px solid rgba(245,166,35,0.30)", boxShadow: "0 6px 28px rgba(13,27,75,0.45)" }}>
                  Apply for Student Visa
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          § 1.7  TOURIST & WORK VISA COUNTRIES
      ════════════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden bg-ice-50">
        <div className="absolute inset-0 dot-pattern-light pointer-events-none opacity-60" />
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full blur-[130px] pointer-events-none"
          style={{ background: "rgba(13,27,75,0.06)" }} />

        <div className="relative page-container">
          <div className="text-center mb-14">
            <Reveal>
              <div className="section-eyebrow mb-4">
                <Briefcase size={11} />
                Tourist &amp; Work Visa
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="section-title text-ink">
                Work &amp; Travel Across Europe
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="section-subtitle mx-auto max-w-2xl">
                We process Tourist and Work Visa applications for 14 European destinations —
                from the Baltic coast to the Mediterranean.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[
              {
                flag: "🇱🇹", code: "LT", name: "Lithuania",
                img: "https://picsum.photos/seed/vilnius/600/400",
                types: ["Tourist", "Work"],
              },
              {
                flag: "🇱🇻", code: "LV", name: "Latvia",
                img: "https://picsum.photos/seed/riga/600/400",
                types: ["Tourist", "Work"],
              },
              {
                flag: "🇵🇱", code: "PL", name: "Poland",
                img: "https://picsum.photos/seed/warsaw/600/400",
                types: ["Tourist", "Work"],
              },
              {
                flag: "🇧🇬", code: "BG", name: "Bulgaria",
                img: "https://picsum.photos/seed/sofia/600/400",
                types: ["Tourist", "Work"],
              },
              {
                flag: "🇲🇩", code: "MD", name: "Moldova",
                img: "https://picsum.photos/seed/chisinau/600/400",
                types: ["Tourist", "Work"],
              },
              {
                flag: "🇮🇹", code: "IT", name: "Italy",
                img: "https://picsum.photos/seed/rome/600/400",
                types: ["Tourist", "Work"],
              },
              {
                flag: "🇫🇷", code: "FR", name: "France",
                img: "https://picsum.photos/seed/paris/600/400",
                types: ["Tourist", "Work"],
              },
              {
                flag: "🇬🇷", code: "GR", name: "Greece",
                img: "https://picsum.photos/seed/athens/600/400",
                types: ["Tourist", "Work"],
              },
              {
                flag: "🇷🇸", code: "RS", name: "Serbia",
                img: "https://picsum.photos/seed/belgrade/600/400",
                types: ["Tourist", "Work"],
              },
              {
                flag: "🇩🇰", code: "DK", name: "Denmark",
                img: "https://picsum.photos/seed/copenhagen/600/400",
                types: ["Tourist", "Work"],
              },
              {
                flag: "🇵🇹", code: "PT", name: "Portugal",
                img: "https://picsum.photos/seed/lisbon/600/400",
                types: ["Tourist", "Work"],
              },
              {
                flag: "🇳🇱", code: "NL", name: "Netherlands",
                img: "https://picsum.photos/seed/amsterdam/600/400",
                types: ["Tourist", "Work"],
              },
              {
                flag: "🇸🇰", code: "SK", name: "Slovakia",
                img: "https://picsum.photos/seed/bratislava/600/400",
                types: ["Tourist", "Work"],
              },
              {
                flag: "🇷🇴", code: "RO", name: "Romania",
                img: "https://picsum.photos/seed/bucharest/600/400",
                types: ["Tourist", "Work"],
              },
            ].map((c, i) => (
              <Reveal key={c.code} delay={i * 0.04}>
                <Link href="/countries" className="group block h-full">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200/60 shadow-[0_1px_4px_rgba(13,27,75,0.06)] bg-white transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_16px_40px_-8px_rgba(13,27,75,0.20)] hover:border-[rgba(245,166,35,0.35)] h-full flex flex-col">
                    {/* Photo */}
                    <div className="relative h-32 overflow-hidden shrink-0">
                      <Image
                        src={c.img}
                        alt={c.name}
                        fill
                        sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
                        className="object-cover object-center transition-transform duration-600 group-hover:scale-110"
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,22,64,0.65) 0%, transparent 55%)" }} />
                      <span className="absolute top-2 left-2 text-xl">{c.flag}</span>
                      <span className="absolute bottom-2 right-2 rounded-md bg-black/40 backdrop-blur-sm px-1.5 py-0.5 text-[9px] font-bold text-white/80 font-mono border border-white/10">{c.code}</span>
                    </div>
                    {/* Body */}
                    <div className="p-3 flex flex-col flex-1">
                      <p className="font-bold text-ink text-sm group-hover:text-[#0d1b4b] transition-colors"
                        style={{ fontFamily: "var(--font-syne)" }}>
                        {c.name}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {c.types.map(t => (
                          <span key={t} className={`rounded-full px-2 py-0.5 text-[10px] font-semibold border ${t === "Work" ? "bg-[rgba(13,27,75,0.07)] border-[rgba(13,27,75,0.15)] text-[#0d1b4b]" : "bg-amber-50 border-amber-100 text-amber-600"}`}
                            style={{ fontFamily: "var(--font-outfit)" }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.60}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/eligibility">
                <button className="btn-shine group inline-flex items-center gap-2.5 rounded-2xl px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1"
                  style={{ fontFamily: "var(--font-outfit)", background: "linear-gradient(135deg,#0d1b4b,#1a2b6b)", border: "1px solid rgba(245,166,35,0.30)", boxShadow: "0 6px 28px rgba(13,27,75,0.45)" }}>
                  Check My Eligibility
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <Link href="/countries">
                <button className="group inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-8 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:border-[rgba(245,166,35,0.40)] hover:bg-[rgba(245,166,35,0.05)] hover:text-[#0d1b4b] hover:-translate-y-0.5"
                  style={{ fontFamily: "var(--font-outfit)" }}>
                  <Globe size={14} style={{ color: "#F5A623" }} />
                  View All Countries
                </button>
              </Link>
            </div>
          </Reveal>
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
          style={{ background: "rgba(13,27,75,0.06)" }} />

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
                  <div className="relative flex flex-col items-center gap-3.5 p-5 rounded-3xl bg-white border border-slate-200/60 shadow-[0_1px_4px_rgba(13,27,75,0.06)] text-center transition-all duration-500 hover:-translate-y-2.5 hover:shadow-[0_20px_60px_-8px_rgba(13,27,75,0.18)] hover:border-[rgba(245,166,35,0.35)] cursor-pointer overflow-hidden h-full">

                    {/* hover bg tint */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                      style={{ background: `radial-gradient(circle at 50% 0%, rgba(245,166,35,0.06), transparent 70%)` }}
                    />

                    {/* Optional tag */}
                    {card.tag && (
                      <span
                        className="absolute top-2.5 right-2.5 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                        style={{ background: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.30)", color: "#b06000", fontFamily: "var(--font-outfit)" }}
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
                        className="text-sm font-bold text-ink group-hover:text-[#0d1b4b] transition-colors"
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
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"
                      style={{ color: "#F5A623" }}
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
          style={{ background: "rgba(13,27,75,0.05)" }} />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full blur-[110px] pointer-events-none"
          style={{ background: "rgba(245,166,35,0.05)" }} />

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
                  <div className="relative flex flex-col h-full p-6 rounded-3xl bg-white border border-slate-200/70 shadow-[0_1px_4px_rgba(13,27,75,0.06)] overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_-8px_rgba(13,27,75,0.16)] group-hover:border-[rgba(245,166,35,0.35)]">

                    {/* Top accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(245,166,35,0.70), transparent)" }}
                    />

                    {/* Inner glow on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(13,27,75,0.04), transparent 70%)" }}
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
                            className="font-bold text-ink group-hover:text-[#0d1b4b] transition-colors truncate"
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
                      className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize"
                          style={{ background: "rgba(13,27,75,0.07)", border: "1px solid rgba(13,27,75,0.15)", color: "#0d1b4b", fontFamily: "var(--font-outfit)" }}
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
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: "#F5A623" }}
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
          § 4  HOW IT WORKS — premium light section
      ════════════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden bg-white">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 dot-pattern-light opacity-50" />
          <div
            className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full blur-[140px]"
            style={{ background: "rgba(13,27,75,0.06)" }}
          />
          <div
            className="absolute bottom-0 right-0 h-80 w-80 rounded-full blur-[120px]"
            style={{ background: "rgba(245,166,35,0.07)" }}
          />
          <div
            className="absolute bottom-0 left-0 h-64 w-64 rounded-full blur-[100px]"
            style={{ background: "rgba(13,27,75,0.05)" }}
          />
        </div>

        <div className="relative page-container">
          {/* Section header */}
          <div className="text-center mb-16">
            <Reveal>
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] mb-5"
                style={{ fontFamily: "var(--font-outfit)", border: "1px solid rgba(245,166,35,0.35)", background: "rgba(245,166,35,0.08)", color: "#E8971A" }}
              >
                <Zap size={11} />
                How It Works
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                className="text-3xl lg:text-5xl font-bold text-ink"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Four Steps to Your{" "}
                <span className="text-gradient-hero">EU Future</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p
                className="mt-4 text-base text-slate-500 max-w-xl mx-auto leading-relaxed"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                From eligibility check to submitted application — structured, clear, and guided every step of the way.
              </p>
            </Reveal>
          </div>

          {/* Steps grid */}
          <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Desktop connector line — sits behind cards */}
            <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+38px)] right-[calc(12.5%+38px)] h-px pointer-events-none">
              <div
                className="w-full h-full"
                style={{
                  background: "linear-gradient(90deg, rgba(13,27,75,0.30) 0%, rgba(26,43,107,0.25) 33%, rgba(245,166,35,0.25) 66%, rgba(13,27,75,0.30) 100%)",
                }}
              />
              {/* Animated shimmer over connector */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 3s linear infinite",
                }}
              />
            </div>

            {steps.map((step, i) => {
              const st = stepStyles[step.color];
              const stepColorMap: Record<string, { border: string; glow: string; iconRing: string; numBg: string; numText: string }> = {
                indigo:  { border: "rgba(13,27,75,0.20)",   glow: "rgba(13,27,75,0.08)",   iconRing: "rgba(13,27,75,0.12)",   numBg: "#f0f4ff", numText: "#0d1b4b" },
                violet:  { border: "rgba(26,43,107,0.20)",  glow: "rgba(26,43,107,0.07)",  iconRing: "rgba(26,43,107,0.12)",  numBg: "#f0f4ff", numText: "#1a2b6b" },
                gold:    { border: "rgba(245,166,35,0.22)",  glow: "rgba(245,166,35,0.07)", iconRing: "rgba(245,166,35,0.20)", numBg: "#fffbeb", numText: "#d97706" },
                emerald: { border: "rgba(13,27,75,0.18)",   glow: "rgba(13,27,75,0.06)",   iconRing: "rgba(13,27,75,0.10)",   numBg: "#f0f4ff", numText: "#0d1b4b" },
              };
              const sc = stepColorMap[step.color];
              return (
                <Reveal key={step.num} delay={i * 0.10}>
                  <div
                    className="group relative flex flex-col items-center text-center rounded-3xl p-7 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-8px_rgba(13,27,75,0.16)]"
                    style={{
                      border: `1px solid ${sc.border}`,
                      boxShadow: `0 1px 4px rgba(15,22,64,0.05)`,
                    }}
                  >
                    {/* Top gradient accent bar */}
                    <div
                      className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-60"
                      style={{
                        background: step.color === "indigo"
                          ? "linear-gradient(90deg, transparent, #0d1b4b, transparent)"
                          : step.color === "violet"
                          ? "linear-gradient(90deg, transparent, #1a2b6b, transparent)"
                          : step.color === "gold"
                          ? "linear-gradient(90deg, transparent, #F5A623, transparent)"
                          : "linear-gradient(90deg, transparent, #0d1b4b, transparent)",
                      }}
                    />

                    {/* Step number */}
                    <div
                      className="absolute top-5 right-5 flex h-6 w-6 items-center justify-center rounded-lg text-[11px] font-bold"
                      style={{ background: sc.numBg, color: sc.numText, fontFamily: "var(--font-outfit)" }}
                    >
                      {i + 1}
                    </div>

                    {/* Icon */}
                    <div
                      className={`relative z-10 mb-5 flex h-[76px] w-[76px] items-center justify-center rounded-2xl ${st.badge} text-white transition-all duration-500 group-hover:-translate-y-1.5 group-hover:scale-105`}
                      style={{ boxShadow: `0 0 0 8px ${sc.iconRing}` }}
                    >
                      <step.icon size={30} />
                    </div>

                    <h3
                      className="text-[15px] font-bold text-ink mb-2.5 transition-colors duration-300"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-sm text-slate-500 leading-relaxed"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {step.desc}
                    </p>

                    {/* Hover glow overlay */}
                    <div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at 50% 100%, ${sc.glow}, transparent 70%)` }}
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* CTA */}
          <Reveal delay={0.45}>
            <div className="mt-14 text-center">
              <Link href="/eligibility">
                <button
                  className="group inline-flex items-center gap-2.5 rounded-2xl px-9 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-[0.97]"
                  style={{ fontFamily: "var(--font-outfit)", background: "linear-gradient(135deg,#0d1b4b,#1a2b6b)", border: "1px solid rgba(245,166,35,0.30)", boxShadow: "0 6px 32px rgba(13,27,75,0.38)" }}
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
              "radial-gradient(ellipse 80% 50% at 20% 10%, rgba(13,27,75,0.25) 0%, transparent 58%)",
              "radial-gradient(ellipse 60% 40% at 80% 82%, rgba(245,166,35,0.10) 0%, transparent 52%)",
              "radial-gradient(ellipse 50% 60% at 55% 30%, rgba(26,43,107,0.20) 0%, transparent 52%)",
            ].join(",")
          }} />
          <div className="absolute inset-0 grid-pattern opacity-[0.15]" />
        </div>

        <div className="relative page-container">
          <div className="text-center mb-16">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] mb-5"
                style={{ fontFamily: "var(--font-outfit)", border: "1px solid rgba(245,166,35,0.30)", background: "rgba(245,166,35,0.08)", color: "#F5A623" }}>
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
                    style={{ background: "linear-gradient(90deg, transparent, rgba(245,166,35,0.70), transparent)" }}
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
      <section className="relative py-0 overflow-hidden bg-[#f8f9ff]" style={{ borderTop: "1px solid rgba(13,27,75,0.08)", borderBottom: "1px solid rgba(13,27,75,0.08)" }}>
        {/* Top row — route ticker */}
        <div className="flex whitespace-nowrap py-3" style={{ borderBottom: "1px solid rgba(13,27,75,0.06)", animation: "ticker 28s linear infinite" }}>
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
                  className="flex items-center gap-2.5 text-sm font-medium"
                  style={{ fontFamily: "var(--font-outfit)", color: "rgba(245,166,35,0.80)" }}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.text}</span>
                  <span style={{ color: "rgba(245,166,35,0.35)" }} className="text-xs">·</span>
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
          style={{ background: "rgba(13,27,75,0.05)" }} />

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
                { bar: "#0d1b4b", tagCl: "bg-[rgba(13,27,75,0.07)] border-[rgba(13,27,75,0.15)] text-[#0d1b4b]" },
                { bar: "#F5A623", tagCl: "bg-amber-50 border-amber-100 text-amber-700" },
                { bar: "#1a2b6b", tagCl: "bg-[rgba(26,43,107,0.07)] border-[rgba(26,43,107,0.15)] text-[#1a2b6b]" },
              ][i];
              return (
                <Reveal key={article.id} delay={i * 0.09}>
                  <Link href={`/knowledge-base/${article.slug}`} className="group block h-full">
                    <div className="relative flex flex-col h-full rounded-3xl bg-white border border-slate-200/70 shadow-[0_1px_4px_rgba(13,27,75,0.06)] overflow-hidden transition-all duration-500 group-hover:-translate-y-2.5 group-hover:shadow-[0_20px_60px_-8px_rgba(13,27,75,0.16)] group-hover:border-[rgba(245,166,35,0.35)]">

                      {/* Top colour bar */}

                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: "radial-gradient(ellipse at 50% -20%, rgba(13,27,75,0.04), transparent 60%)" }}
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
                          className="font-bold text-ink leading-snug group-hover:text-[#0d1b4b] transition-colors"
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
                          className="flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all duration-300"
                          style={{ fontFamily: "var(--font-outfit)", color: "#0d1b4b" }}
                        >
                          Read article <ArrowRight size={12} />
                        </span>
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#F5A623" }} />
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
          § 7.5  TEAM — 7 members
      ════════════════════════════════════════════════════════════ */}
      <section id="team" className="relative section-padding overflow-hidden bg-slate-50">
        {/* Background decoration */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-[800px] rounded-full blur-[160px] pointer-events-none"
          style={{ background: "rgba(13,27,75,0.05)" }} />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full blur-[120px] pointer-events-none"
          style={{ background: "rgba(245,166,35,0.06)" }} />

        <div className="relative page-container">
          {/* Section header */}
          <div className="text-center mb-14">
            <Reveal>
              <div className="section-eyebrow mb-4">
                <Users size={11} />
                Our Team
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="section-title text-ink">
                The People Behind{" "}
                <span className="text-gradient-hero">Avensa</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="section-subtitle mx-auto max-w-2xl">
                A dedicated team of immigration specialists, legal experts, and consultants working together to simplify your European journey.
              </p>
            </Reveal>
          </div>

          {/* Team grid — 6 members, 3 cols sm / 6 cols lg */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Nishant Bhagat",  role: "Director & CEO",                    avatar: "/team/Nishant.jpeg",  gradient: "from-[#0d1b4b] to-[#1a2b6b]"   },
              { name: "Yashika Sharma",  role: "Legal Team & Consultant",           avatar: "/team/Yashika.jpeg",  gradient: "from-[#F5A623] to-[#E8971A]"   },
              { name: "Santosh Gawas",   role: "Tourist Visa Expert & Consultant",  avatar: "/team/Santosh.jpeg",  gradient: "from-[#1a2b6b] to-[#F5A623]"   },
              { name: "Rohit Chaudhary", role: "Schengen TRC Consultant",           avatar: "/team/Rohit.jpeg",    gradient: "from-[#0d1b4b] to-[#F5A623]"   },
              { name: "Tushar Sharma",   role: "Legal & Study Consultant",          avatar: "/team/Tushar.jpeg",   gradient: "from-[#F5A623] to-[#fcd34d]"   },
              { name: "Sanjiv Kumar",    role: "General Consultant",                avatar: "/team/Sanjiv.jpeg",   gradient: "from-[#1a2b6b] to-[#0d1b4b]"  },
            ].map((member, i) => (
              <Reveal key={member.name} delay={i * 0.07}>
                <div className="group relative rounded-xl overflow-hidden bg-white border border-slate-200/80 shadow-[0_2px_8px_rgba(13,27,75,0.07)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_-6px_rgba(13,27,75,0.18)] hover:border-[rgba(245,166,35,0.35)]">

                  {/* Accent line top */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] z-10 bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Photo — 80% ratio (less tall than before) */}
                  <div className="relative w-full" style={{ paddingBottom: "80%" }}>
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      sizes="(max-width:640px) 33vw, (max-width:1024px) 25vw, 16vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Name + role below photo */}
                  <div className="px-2.5 py-2 border-t border-slate-100">
                    <p
                      className="text-[11px] font-bold text-slate-900 leading-tight truncate"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {member.name}
                    </p>
                    <p
                      className={`mt-0.5 text-[10px] font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent leading-snug line-clamp-2`}
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {member.role}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Bottom CTA */}
          <Reveal delay={0.50}>
            <div className="mt-14 text-center">
              <p className="text-sm text-slate-500 mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
                Want to work with us? We&apos;re always looking for immigration experts and consultants.
              </p>
              <Link href="/contact">
                <button
                  className="group inline-flex items-center gap-2 rounded-2xl px-7 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                  style={{ fontFamily: "var(--font-outfit)", border: "1px solid rgba(245,166,35,0.30)", background: "rgba(245,166,35,0.07)", color: "#b06000" }}
                >
                  Get in Touch
                  <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          § 8  FAQ — split layout with smooth accordion
      ════════════════════════════════════════════════════════════ */}
      <section
        className="relative section-padding overflow-hidden"
        style={{
          background: "linear-gradient(165deg, #050714 0%, #0a0f2e 35%, #0f1640 70%, #050714 100%)",
        }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 grid-pattern opacity-[0.14]" />
          <div
            className="absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full blur-[150px]"
            style={{ background: "rgba(13,27,75,0.15)" }}
          />
          <div
            className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full blur-[120px]"
            style={{ background: "rgba(245,166,35,0.08)" }}
          />
          <div
            className="absolute top-1/2 right-0 h-64 w-64 rounded-full blur-[100px]"
            style={{ background: "rgba(26,43,107,0.12)" }}
          />
        </div>

        <div className="relative page-container">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.6fr] lg:gap-20 lg:items-start">

            {/* ── Left: sticky header panel ── */}
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] mb-6"
                  style={{ fontFamily: "var(--font-outfit)", border: "1px solid rgba(245,166,35,0.30)", background: "rgba(245,166,35,0.08)", color: "#F5A623" }}
                >
                  <Search size={11} />
                  FAQ
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <h2
                  className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-5"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Common Questions,{" "}
                  <span className="text-gradient-hero">Clear Answers</span>
                </h2>
              </Reveal>

              <Reveal delay={0.12}>
                <p
                  className="text-base text-white/65 leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Everything you need to know about EU immigration, eligibility, and the Avensa process.
                </p>
              </Reveal>

              {/* Stat pills */}
              <Reveal delay={0.18}>
                <div className="flex flex-wrap gap-3 mb-10">
                  {[
                    { label: "13 EU Countries", color: "rgba(13,27,75,0.15)",   border: "rgba(13,27,75,0.28)",   text: "#8aa5d6" },
                    { label: "Free to Use",     color: "rgba(245,166,35,0.12)", border: "rgba(245,166,35,0.28)", text: "#F5A623" },
                    { label: "Always Updated",  color: "rgba(245,166,35,0.08)", border: "rgba(245,166,35,0.20)", text: "#fcd34d" },
                  ].map(p => (
                    <span
                      key={p.label}
                      className="rounded-full px-3.5 py-1.5 text-[12px] font-semibold"
                      style={{ background: p.color, border: `1px solid ${p.border}`, color: p.text, fontFamily: "var(--font-outfit)" }}
                    >
                      {p.label}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.22}>
                <Link href="/knowledge-base#faq">
                  <button
                    className="inline-flex items-center gap-2.5 rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                    style={{ fontFamily: "var(--font-outfit)", border: "1px solid rgba(245,166,35,0.30)", background: "rgba(245,166,35,0.08)", color: "#F5A623" }}
                  >
                    View All FAQs <ChevronRight size={14} />
                  </button>
                </Link>
              </Reveal>
            </div>

            {/* ── Right: accordion list ── */}
            <div className="space-y-3">
              {homeFaqs.map((faq, i) => (
                <Reveal key={faq.id} delay={i * 0.07}>
                  <FAQItem index={i} question={faq.question} answer={faq.answer} />
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </section>



    </>
  );
}
