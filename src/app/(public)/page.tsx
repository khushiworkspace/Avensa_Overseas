import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, CheckCircle, Globe, FileText, Search,
  Clock, Shield, Users, Briefcase, GraduationCap,
  Home as HomeIcon, Plane, Star, ChevronRight,
  Sparkles, MapPin, Zap, ArrowUpRight, Lock, TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AvensaLogo } from "@/components/ui/AvensaLogo";
import { COUNTRIES, COMPANY } from "@/lib/constants";
import { MOCK_FAQS, MOCK_ARTICLES } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Avensa Overseas – EU Immigration Portal",
};

/* ─── Data ───────────────────────────────────────────────────────── */
const purposeCards = [
  { icon: Briefcase,    label: "Work",      href: "/routes/work",      color: "from-teal-500 to-teal-700",   ring: "ring-teal-400/30",   desc: "EU Blue Card · Skilled Worker · Job Seeker"    },
  { icon: GraduationCap,label: "Study",     href: "/routes/study",     color: "from-navy-500 to-navy-700",   ring: "ring-navy-400/30",   desc: "Bachelor · Master · PhD programs"              },
  { icon: Users,        label: "Family",    href: "/routes/family",    color: "from-mint-500 to-mint-600",   ring: "ring-mint-400/30",   desc: "Spouse · Child · Reunification"                },
  { icon: HomeIcon,     label: "Residence", href: "/routes/residence", color: "from-amber-500 to-amber-600", ring: "ring-amber-400/30",  desc: "Long-term · Permanent · Digital Nomad"         },
  { icon: Plane,        label: "Visit",     href: "/routes/visit",     color: "from-coral-500 to-coral-600", ring: "ring-coral-400/30",  desc: "Tourism · Business · Short Stay"               },
  { icon: Star,         label: "Special",   href: "/routes/special",   color: "from-sand-500 to-sand-600",   ring: "ring-sand-400/30",   desc: "Researcher · Entrepreneur · Highly Qualified"  },
];

const steps = [
  { icon: MapPin,    num: "01", title: "Select Route",     desc: "Choose destination country and immigration purpose.", accent: "teal"  },
  { icon: Search,    num: "02", title: "Check Eligibility", desc: "Answer a short questionnaire to find your best route.",  accent: "navy"  },
  { icon: FileText,  num: "03", title: "Upload Documents", desc: "Route-specific checklist with secure encrypted upload.", accent: "coral" },
  { icon: Zap,       num: "04", title: "Apply & Track",    desc: "Submit and monitor every status update in real time.",   accent: "mint"  },
];

const accentMap: Record<string, string> = {
  teal:  "bg-teal-600 shadow-teal-md",
  navy:  "bg-navy-700 shadow-[0_4px_20px_rgba(42,58,143,0.4)]",
  coral: "bg-coral-600 shadow-coral-md",
  mint:  "bg-mint-600 shadow-[0_4px_20px_rgba(0,153,102,0.35)]",
};
const accentText: Record<string, string> = {
  teal: "text-teal-400", navy: "text-navy-300", coral: "text-coral-400", mint: "text-mint-400",
};

const trustPoints = [
  { icon: Lock,       label: "Bank-Grade Security",  desc: "AES-256 encryption for every document and data point.", glow: "rgba(0,184,184,0.2)",   icon_bg: "bg-teal-500/15",  icon_cl: "text-teal-300"  },
  { icon: Clock,      label: "Live Tracking",         desc: "Push notifications at every application milestone.",     glow: "rgba(255,85,48,0.15)",  icon_bg: "bg-coral-500/15", icon_cl: "text-coral-300" },
  { icon: Globe,      label: "13 EU Countries",       desc: "Full support for major EU immigration destinations.",    glow: "rgba(5,191,128,0.15)",  icon_bg: "bg-mint-500/15",  icon_cl: "text-mint-300"  },
  { icon: TrendingUp, label: "Versioned Rules",        desc: "All eligibility rules stamped with effective dates.",    glow: "rgba(245,158,11,0.15)", icon_bg: "bg-amber-500/15", icon_cl: "text-amber-300" },
];

const stats = [
  { value: "13+",  suffix: "", label: "EU Countries",         delay: "0s"    },
  { value: "30+",  suffix: "", label: "Immigration Routes",   delay: "0.1s"  },
  { value: "50k+", suffix: "", label: "Applications Guided",  delay: "0.2s"  },
  { value: "98%",  suffix: "", label: "Accuracy Rate",        delay: "0.3s"  },
];

/* ─── Page ───────────────────────────────────────────────────────── */
export default function HomePage() {
  const homeFaqs          = MOCK_FAQS.slice(0, 5);
  const featuredCountries = COUNTRIES.filter(c => c.status === "active").slice(0, 6);
  const latestArticles    = MOCK_ARTICLES.slice(0, 3);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          § 1  HERO — Aurora dark full-screen
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-950">

        {/* ── Multi-layer background ── */}
        <div className="absolute inset-0 pointer-events-none">
          {/* aurora */}
          <div className="absolute inset-0" style={{
            background: [
              "radial-gradient(ellipse 110% 65% at 50% -8%, rgba(0,148,148,0.38) 0%, transparent 55%)",
              "radial-gradient(ellipse 80% 45% at -5% 60%, rgba(42,58,143,0.45) 0%, transparent 52%)",
              "radial-gradient(ellipse 75% 55% at 105% 75%, rgba(255,85,48,0.16) 0%, transparent 52%)",
              "linear-gradient(170deg, #001414 0%, #002828 38%, #060a30 100%)",
            ].join(",")
          }} />

          {/* dot grid */}
          <div className="absolute inset-0 dot-pattern opacity-[0.18]" />

          {/* top spotlight beam */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[420px]"
            style={{ background: "linear-gradient(to bottom, rgba(0,184,184,0.7), transparent)" }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[320px] w-[700px] rounded-full blur-[120px]"
            style={{ background: "rgba(0,148,148,0.18)" }}
          />

          {/* animated floating orbs */}
          <div className="absolute top-[12%] right-[10%] h-48 w-48 rounded-full blur-[80px] animate-float-slow"
            style={{ background: "rgba(0,184,184,0.14)", animationDelay: "0s" }}
          />
          <div className="absolute bottom-[15%] left-[8%] h-64 w-64 rounded-full blur-[100px] animate-float"
            style={{ background: "rgba(42,58,143,0.28)", animationDelay: "2.5s" }}
          />
          <div className="absolute bottom-[10%] right-[20%] h-40 w-40 rounded-full blur-[70px] animate-float-slow"
            style={{ background: "rgba(255,85,48,0.10)", animationDelay: "1.5s" }}
          />

          {/* Rotating globe wireframe decoration */}
          <div className="absolute right-[5%] top-1/2 -translate-y-1/2 opacity-[0.055] hidden xl:block">
            <svg width="480" height="480" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="90" stroke="white" strokeWidth="0.8" />
              <ellipse cx="100" cy="100" rx="90" ry="36" stroke="white" strokeWidth="0.8" />
              <ellipse cx="100" cy="100" rx="90" ry="62" stroke="white" strokeWidth="0.8" />
              <line x1="10" y1="100" x2="190" y2="100" stroke="white" strokeWidth="0.8" />
              <line x1="100" y1="10" x2="100" y2="190" stroke="white" strokeWidth="0.8" />
              <path d="M100 10 Q50 100 100 190" stroke="white" strokeWidth="0.8" fill="none" />
              <path d="M100 10 Q150 100 100 190" stroke="white" strokeWidth="0.8" fill="none" />
            </svg>
          </div>
        </div>

        {/* ── Hero content ── */}
        <div className="relative page-container py-28 lg:py-36 w-full">
          <div className="mx-auto max-w-4xl text-center">

            {/* Badge pill */}
            <div className="animate-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-teal-500/22 bg-teal-500/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-teal-300"
              style={{ animationDelay: "0s" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse-slow" />
              Trusted EU Immigration Guidance — Not Legal Advice
            </div>

            {/* Headline */}
            <h1
              className="animate-fade-up text-5xl font-black leading-[1.05] text-white lg:text-[5.5rem] tracking-tight"
              style={{ fontFamily: "var(--font-dm-sans)", animationDelay: "0.08s" }}
            >
              Your Gateway to{" "}
              <br className="hidden sm:block" />
              <span className="relative inline-block mt-1">
                <span className="text-gradient-hero">EU Immigration</span>
                {/* animated underline */}
                <span className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full"
                  style={{
                    background: "linear-gradient(90deg, transparent, #26d0d0 30%, #ff9a7d 70%, transparent)",
                    animation: "shimmer 4s linear infinite",
                    backgroundSize: "200% 100%",
                  }}
                />
              </span>
            </h1>

            {/* Sub */}
            <p className="animate-fade-up mt-8 text-lg leading-relaxed text-white/50 max-w-2xl mx-auto"
              style={{ animationDelay: "0.16s" }}>
              Check eligibility, build your document checklist and track your application
              across{" "}
              <strong className="text-white/80 font-semibold">13 European countries</strong>
              {" "}and{" "}
              <strong className="text-white/80 font-semibold">30+ immigration routes</strong>.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up mt-10 flex flex-wrap justify-center gap-3"
              style={{ animationDelay: "0.24s" }}>
              <Link href="/eligibility">
                <button className="btn-shine group relative inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-coral-600 to-coral-500 px-8 py-4 text-sm font-bold text-white shadow-coral-lg transition-all duration-300 hover:shadow-coral-xl hover:-translate-y-1 active:translate-y-0 active:scale-[0.97]">
                  <span>Check My Eligibility</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
              <Link href="/countries">
                <button className="group inline-flex items-center gap-2.5 rounded-2xl border border-white/12 bg-white/6 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 active:translate-y-0">
                  <Globe size={16} className="text-teal-400 group-hover:animate-spin-slow" />
                  Explore Countries
                </button>
              </Link>
            </div>

            {/* Trust chips */}
            <div className="animate-fade-up mt-8 flex flex-wrap justify-center gap-5"
              style={{ animationDelay: "0.32s" }}>
              {["Free eligibility check", "Secure document upload", "Live application tracking"].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-xs font-medium text-white/38">
                  <CheckCircle size={12} className="text-teal-400 shrink-0" />
                  {t}
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div className="animate-fade-up mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-2xl mx-auto"
              style={{ animationDelay: "0.40s" }}>
              {stats.map((s) => (
                <div key={s.label}
                  className="group relative glass rounded-2xl px-4 py-4 text-center overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/25"
                >
                  {/* glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{ background: "radial-gradient(circle at 50% 0%, rgba(0,184,184,0.12), transparent 70%)" }}
                  />
                  <p className="relative text-2xl font-black text-white stat-num"
                    style={{ fontFamily: "var(--font-dm-sans)", animationDelay: s.delay }}>
                    {s.value}
                  </p>
                  <p className="relative mt-0.5 text-[11px] font-medium text-white/38 uppercase tracking-wide">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 72V40C360 0 720 72 1080 36C1260 18 1380 54 1440 40V72H0Z" fill="#fdfaf6" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          § 2  PURPOSE CARDS — light section
      ═══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-sand-50 relative overflow-hidden">
        {/* light dot pattern */}
        <div className="absolute inset-0 dot-pattern-light pointer-events-none" />

        <div className="relative page-container">
          <div className="text-center mb-14">
            <span className="label-tag mb-4">
              <MapPin size={11} />
              Find Your Route
            </span>
            <h2 className="section-title mt-3">What Brings You to Europe?</h2>
            <p className="section-subtitle mx-auto">
              Select your purpose to explore immigration routes in your destination country.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 stagger">
            {purposeCards.map((card) => (
              <Link key={card.label} href={card.href} className="group animate-fade-up">
                <div className="relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-[rgba(14,20,72,0.07)] shadow-card text-center
                  transition-all duration-500 ease-spring
                  group-hover:shadow-card-glow group-hover:-translate-y-2 group-hover:border-teal-200/60 cursor-pointer overflow-hidden">

                  {/* hover shimmer overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(135deg, rgba(0,148,148,0.04), transparent 60%)" }}
                  />

                  {/* Icon with gradient badge */}
                  <div className={`relative flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} text-white shadow-md
                    transition-all duration-500 ease-spring group-hover:scale-110 group-hover:shadow-lg group-hover:ring-4 ${card.ring}`}>
                    <card.icon size={20} />
                  </div>

                  <div className="relative">
                    <p className="text-sm font-black text-navy-800 group-hover:text-teal-700 transition-colors">{card.label}</p>
                    <p className="mt-1 text-[11px] text-navy-400 leading-snug">{card.desc}</p>
                  </div>

                  {/* corner arrow */}
                  <ArrowUpRight size={11} className="absolute top-3 right-3 text-teal-400 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          § 3  SUPPORTED COUNTRIES
      ═══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white relative">
        {/* gradient blob accent */}
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,148,148,0.06), transparent)" }} />

        <div className="relative page-container">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
            <div>
              <span className="label-tag mb-3"><Globe size={11} />Coverage</span>
              <h2 className="section-title mt-2">Supported Countries</h2>
              <p className="section-subtitle">Major EU destinations with complete application support.</p>
            </div>
            <Link href="/countries">
              <Button variant="secondary" size="sm">View All Countries <ChevronRight size={14} /></Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 stagger">
            {featuredCountries.map((country) => (
              <Link key={country.id} href={`/countries/${country.id}`} className="group animate-fade-up">
                <div className="relative flex flex-col h-full p-5 rounded-2xl bg-white border border-[rgba(14,20,72,0.07)] shadow-card
                  transition-all duration-500 ease-spring overflow-hidden
                  group-hover:shadow-card-hover group-hover:-translate-y-1.5 group-hover:border-teal-200/50">

                  {/* gradient top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(0,148,148,0.5), transparent)", opacity: 0 }}
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,148,148,0.04), transparent 70%)" }} />

                  <div className="relative flex items-center gap-4">
                    <div className="relative shrink-0">
                      <Image
                        src={country.flagUrl}
                        alt={`${country.name} flag`}
                        width={56}
                        height={38}
                        className="rounded-xl shadow-sm object-cover ring-1 ring-[rgba(14,20,72,0.08)]"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-black text-navy-900 group-hover:text-teal-700 transition-colors truncate">
                          {country.name}
                        </h3>
                        <span className="text-[10px] text-navy-300 font-mono shrink-0 bg-navy-50 px-1.5 py-0.5 rounded-md">
                          {country.code}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-navy-400 line-clamp-2 leading-relaxed">
                        {country.description.slice(0, 68)}…
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-3 flex flex-wrap gap-1.5">
                    {country.supportedRoutes.map((r) => (
                      <span key={r} className="rounded-full bg-teal-50 border border-teal-100 px-2 py-0.5 text-[11px] font-semibold text-teal-700 capitalize">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          § 4  HOW IT WORKS — dark gradient section
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden" style={{
        background: "linear-gradient(165deg, #001414 0%, #002828 30%, #004c4c 65%, #060a30 100%)"
      }}>
        {/* background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 dot-pattern opacity-[0.16]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full blur-[140px]"
            style={{ background: "rgba(0,148,148,0.08)" }} />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full blur-[100px]"
            style={{ background: "rgba(255,85,48,0.06)" }} />
        </div>

        <div className="relative page-container">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/22 bg-teal-500/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-teal-300 mb-4">
              <Zap size={11} />Process
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-white mt-2"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              Four Steps to Your EU Future
            </h2>
            <p className="mt-4 text-white/45 text-base max-w-xl mx-auto leading-relaxed">
              From eligibility check to submitted application — structured and clear.
            </p>
          </div>

          {/* Steps grid */}
          <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Connector line desktop */}
            <div className="hidden lg:block absolute top-[52px] left-[15%] right-[15%] h-px"
              style={{ background: "linear-gradient(90deg, rgba(0,148,148,0.5), rgba(255,85,48,0.4), rgba(5,191,128,0.5))" }} />

            {steps.map((s, i) => (
              <div key={i} className="group relative flex flex-col items-center text-center animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}>

                {/* Number badge */}
                <div className="relative z-10 mb-6">
                  <div className={`flex h-[72px] w-[72px] items-center justify-center rounded-2xl ${accentMap[s.accent]} text-white
                    transition-all duration-500 ease-spring group-hover:-translate-y-2 group-hover:scale-105`}>
                    <s.icon size={28} />
                  </div>
                  {/* step number badge */}
                  <div className="absolute -top-2.5 -right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-navy-950 border-2 border-navy-800 text-[10px] font-black text-white/70">
                    {i + 1}
                  </div>
                </div>

                <h3 className="text-base font-black text-white mb-2">{s.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>

                {/* accent line below */}
                <div className={`mt-4 h-[3px] w-8 rounded-full ${accentText[s.accent]} opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-12`}
                  style={{ background: s.accent === "teal" ? "#009494" : s.accent === "coral" ? "#ff5530" : s.accent === "mint" ? "#05bf80" : "#2a3a8f" }} />
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link href="/eligibility">
              <button className="btn-shine group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-coral-600 to-coral-500 px-8 py-4 text-sm font-bold text-white shadow-coral-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-coral-xl active:translate-y-0 active:scale-[0.97]">
                Start Your Eligibility Check
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          § 5  TRUST / WHY US — glass cards on dark
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative section-padding bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div style={{
            position: "absolute", inset: 0,
            background: [
              "radial-gradient(ellipse 80% 50% at 20% 10%, rgba(0,148,148,0.16) 0%, transparent 55%)",
              "radial-gradient(ellipse 60% 40% at 80% 80%, rgba(255,85,48,0.09) 0%, transparent 50%)",
              "radial-gradient(ellipse 50% 60% at 60% 30%, rgba(42,58,143,0.22) 0%, transparent 50%)",
            ].join(",")
          }} />
          <div className="absolute inset-0 dot-pattern opacity-[0.18]" />
        </div>

        <div className="relative page-container">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/22 bg-teal-500/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-teal-300 mb-4">
              <Sparkles size={11} />Why Avensa
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-white mt-2"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              Built on Transparency &amp; Accuracy
            </h2>
            <p className="mt-4 text-white/42 max-w-lg mx-auto leading-relaxed">
              Structured immigration information — no guesswork, no legal advice, just clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((tp, i) => (
              <div key={tp.label}
                className="group relative glass rounded-2xl p-6 text-center overflow-hidden cursor-default
                  transition-all duration-500 ease-spring hover:-translate-y-2"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* card inner glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${tp.glow}, transparent 70%)` }} />

                <div className={`relative mb-5 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${tp.icon_bg}
                  transition-all duration-500 ease-spring group-hover:scale-110 group-hover:-translate-y-1`}>
                  <tp.icon size={24} className={tp.icon_cl} />
                </div>
                <h3 className="relative text-sm font-black text-white">{tp.label}</h3>
                <p className="relative mt-2 text-xs text-white/38 leading-relaxed">{tp.desc}</p>

                {/* bottom accent bar */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 rounded-full group-hover:w-16 transition-all duration-500"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(0,184,184,0.7), transparent)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          § 6  LATEST NEWS
      ═══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full blur-[100px] pointer-events-none"
          style={{ background: "rgba(0,148,148,0.05)" }} />

        <div className="relative page-container">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
            <div>
              <span className="label-tag mb-3"><FileText size={11} />Updates</span>
              <h2 className="section-title mt-2">Immigration Updates</h2>
              <p className="section-subtitle">Recent changes that may affect your plans.</p>
            </div>
            <Link href="/news">
              <Button variant="secondary" size="sm">View All <ChevronRight size={14} /></Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {latestArticles.map((article, idx) => {
              const colors = [
                { bar: "#009494", tag: "bg-teal-50 border-teal-100 text-teal-700" },
                { bar: "#ff5530", tag: "bg-coral-50 border-coral-100 text-coral-700" },
                { bar: "#05bf80", tag: "bg-mint-50 border-mint-100 text-mint-700" },
              ][idx];
              return (
                <Link key={article.id} href={`/knowledge-base/${article.slug}`} className="group">
                  <div className="relative flex flex-col h-full rounded-2xl bg-white border border-[rgba(14,20,72,0.07)] shadow-card overflow-hidden
                    transition-all duration-500 ease-spring group-hover:shadow-card-hover group-hover:-translate-y-2 group-hover:border-teal-200/50">

                    {/* coloured top bar */}
                    <div className="h-[3px] w-full transition-all duration-500 group-hover:h-[4px]"
                      style={{ background: colors.bar }} />

                    {/* card glow on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(ellipse at 50% -20%, rgba(0,148,148,0.04), transparent 60%)" }} />

                    <div className="relative p-6 flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${colors.tag}`}>
                          {article.category}
                        </span>
                        <span className="text-[11px] text-navy-300">{formatDate(article.publishedAt)}</span>
                      </div>
                      <h3 className="font-black text-navy-900 leading-snug group-hover:text-teal-700 transition-colors">
                        {article.title}
                      </h3>
                      <p className="mt-2.5 text-sm text-navy-400 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="relative px-6 py-4 border-t border-[rgba(14,20,72,0.06)] flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-teal-600 group-hover:gap-2.5 transition-all duration-300">
                        Read article <ArrowRight size={12} />
                      </span>
                      <ArrowUpRight size={12} className="text-teal-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          § 7  FAQ — sand bg with animated accordion
      ═══════════════════════════════════════════════════════════ */}
      <section className="section-padding relative overflow-hidden" style={{ background: "var(--bg-page)" }}>
        <div className="absolute inset-0 dot-pattern-light pointer-events-none opacity-60" />
        <div className="absolute top-0 right-0 h-72 w-72 rounded-full blur-[120px] pointer-events-none"
          style={{ background: "rgba(0,148,148,0.07)" }} />

        <div className="relative page-container">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <span className="label-tag mb-3"><Search size={11} />FAQ</span>
              <h2 className="section-title mt-2">Frequently Asked Questions</h2>
              <p className="section-subtitle mx-auto">Quick answers to common immigration questions.</p>
            </div>

            <div className="space-y-3">
              {homeFaqs.map((faq, idx) => (
                <details key={faq.id}
                  className="group rounded-2xl border border-[rgba(14,20,72,0.07)] bg-white shadow-card overflow-hidden
                    transition-all duration-300 hover:border-teal-200/50 hover:shadow-card-hover open:border-teal-300/40 open:shadow-card-glow">
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-bold text-navy-800 hover:text-teal-700 transition-colors list-none select-none">
                    <span className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-teal-50 border border-teal-100 text-[11px] font-black text-teal-600 group-open:bg-teal-600 group-open:text-white group-open:border-teal-600 transition-colors">
                        {idx + 1}
                      </span>
                      {faq.question}
                    </span>
                    <ChevronRight size={15} className="shrink-0 text-navy-300 transition-transform duration-300 group-open:rotate-90 group-open:text-teal-500" />
                  </summary>
                  <div className="border-t border-[rgba(14,20,72,0.06)] bg-teal-50/30 px-6 py-4 text-sm text-navy-500 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/knowledge-base#faq">
                <Button variant="secondary">View All FAQs <ChevronRight size={14} /></Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          § 8  CTA BANNER — dramatic full-width
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* aurora bg */}
        <div className="absolute inset-0" style={{
          background: [
            "radial-gradient(ellipse 90% 80% at 50% -20%, rgba(0,148,148,0.42) 0%, transparent 55%)",
            "radial-gradient(ellipse 70% 50% at 0% 80%, rgba(42,58,143,0.45) 0%, transparent 55%)",
            "radial-gradient(ellipse 60% 45% at 100% 70%, rgba(255,85,48,0.18) 0%, transparent 50%)",
            "linear-gradient(160deg, #001414 0%, #002828 35%, #060a30 100%)",
          ].join(",")
        }} />
        <div className="absolute inset-0 dot-pattern opacity-[0.18] pointer-events-none" />

        {/* animated orbs */}
        <div className="absolute top-8 left-1/4 h-48 w-48 rounded-full blur-[80px] animate-float-slow"
          style={{ background: "rgba(0,184,184,0.15)" }} />
        <div className="absolute bottom-8 right-1/4 h-40 w-40 rounded-full blur-[70px] animate-float"
          style={{ background: "rgba(255,85,48,0.12)", animationDelay: "2s" }} />

        <div className="relative page-container text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-coral-500/22 bg-coral-500/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-coral-300 mb-7">
            <Sparkles size={11} />
            Start Today — It&apos;s Free
          </div>

          <h2 className="text-4xl font-black text-white lg:text-6xl max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: "var(--font-dm-sans)" }}>
            Ready to Begin Your
            <br />
            <span className="text-gradient-hero">EU Journey?</span>
          </h2>

          <p className="mt-5 text-base text-white/42 max-w-md mx-auto leading-relaxed">
            Join thousands navigating EU immigration with clarity and confidence.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/auth/register">
              <button className="btn-shine group relative inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-coral-600 to-coral-500 px-9 py-4 text-sm font-bold text-white shadow-coral-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-coral-xl active:translate-y-0 active:scale-[0.97]">
                Create Free Account
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <Link href="/eligibility">
              <button className="group inline-flex items-center gap-2.5 rounded-2xl border border-white/12 bg-white/6 px-9 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1">
                Check Eligibility
              </button>
            </Link>
          </div>

          {/* Logo watermark */}
          <div className="mt-14 flex justify-center opacity-[0.18] pointer-events-none">
            <AvensaLogo variant="stacked" theme="dark" size="lg" showTagline />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          § 9  DISCLAIMER
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-amber-50 border-y border-amber-200/50 py-5">
        <div className="page-container">
          <p className="text-xs text-amber-800/65 text-center max-w-4xl mx-auto leading-relaxed">
            <strong className="text-amber-800 font-bold">⚠ Important: </strong>
            Avensa Overseas provides general immigration information only and does not constitute legal advice.
            Always consult a qualified immigration lawyer or official government sources before making decisions.
          </p>
        </div>
      </section>
    </>
  );
}
