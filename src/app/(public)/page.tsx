import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, CheckCircle, Globe, FileText, Search,
  Clock, Shield, Users, Briefcase, GraduationCap,
  Home as HomeIcon, Plane, Star, ChevronRight, Compass,
  Sparkles, MapPin, Zap, ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { COUNTRIES, COMPANY } from "@/lib/constants";
import { MOCK_FAQS, MOCK_ARTICLES } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Avensa Overseas – EU Immigration Portal",
};

const purposeCards = [
  {
    icon: Briefcase,
    label: "Work",
    href: "/routes/work",
    gradient: "from-teal-500 to-teal-700",
    bg: "bg-teal-50",
    iconBg: "bg-teal-600",
    desc: "Skilled workers, EU Blue Card, Job Seeker",
  },
  {
    icon: GraduationCap,
    label: "Study",
    href: "/routes/study",
    gradient: "from-navy-500 to-navy-700",
    bg: "bg-navy-50",
    iconBg: "bg-navy-600",
    desc: "Bachelor's, Master's, PhD programs",
  },
  {
    icon: Users,
    label: "Family",
    href: "/routes/family",
    gradient: "from-mint-500 to-mint-700",
    bg: "bg-mint-50",
    iconBg: "bg-mint-600",
    desc: "Spouse, child, family reunification",
  },
  {
    icon: HomeIcon,
    label: "Residence",
    href: "/routes/residence",
    gradient: "from-amber-500 to-amber-700",
    bg: "bg-amber-50",
    iconBg: "bg-amber-600",
    desc: "Long-term, permanent, digital nomad",
  },
  {
    icon: Plane,
    label: "Visit",
    href: "/routes/visit",
    gradient: "from-coral-500 to-coral-700",
    bg: "bg-coral-50",
    iconBg: "bg-coral-600",
    desc: "Tourism, business, short stay",
  },
  {
    icon: Star,
    label: "Special",
    href: "/routes/special",
    gradient: "from-sand-500 to-sand-700",
    bg: "bg-sand-50",
    iconBg: "bg-sand-600",
    desc: "Researcher, entrepreneur, highly qualified",
  },
];

const steps = [
  {
    num: "01",
    title: "Select Your Route",
    desc: "Choose your destination country and immigration purpose.",
    icon: MapPin,
    color: "bg-teal-600 shadow-teal-md",
    line: "bg-gradient-to-r from-teal-200 to-teal-100",
  },
  {
    num: "02",
    title: "Check Eligibility",
    desc: "Answer a guided questionnaire to see which routes may apply to you.",
    icon: Search,
    color: "bg-navy-600 shadow-float-teal",
    line: "bg-gradient-to-r from-teal-100 to-coral-100",
  },
  {
    num: "03",
    title: "Prepare Documents",
    desc: "Get a route-specific checklist and upload your documents securely.",
    icon: FileText,
    color: "bg-coral-600 shadow-coral-md",
    line: "bg-gradient-to-r from-coral-100 to-mint-100",
  },
  {
    num: "04",
    title: "Apply & Track",
    desc: "Submit your application and track every status change in real time.",
    icon: Zap,
    color: "bg-mint-600",
    line: "",
  },
];

const trustPoints = [
  {
    icon: Shield,
    label: "Secure & Private",
    desc: "Bank-grade encryption for all documents and personal data.",
    color: "text-teal-400",
    bg: "bg-teal-500/15",
  },
  {
    icon: Clock,
    label: "Real-Time Tracking",
    desc: "Live status updates and notifications at every stage.",
    color: "text-coral-400",
    bg: "bg-coral-500/15",
  },
  {
    icon: Globe,
    label: "13 EU Countries",
    desc: "Comprehensive coverage of major EU immigration destinations.",
    color: "text-mint-400",
    bg: "bg-mint-500/15",
  },
  {
    icon: FileText,
    label: "Versioned Rules",
    desc: "Every eligibility rule is versioned with effective dates and sources.",
    color: "text-amber-400",
    bg: "bg-amber-500/15",
  },
];

const stats = [
  { value: "13+", label: "EU Countries" },
  { value: "30+", label: "Immigration Routes" },
  { value: "50k+", label: "Applications Guided" },
  { value: "98%", label: "Accuracy Rate" },
];

export default function HomePage() {
  const homeFaqs = MOCK_FAQS.slice(0, 5);
  const featuredCountries = COUNTRIES.filter((c) => c.status === "active").slice(0, 6);
  const latestArticles = MOCK_ARTICLES.slice(0, 3);

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center bg-navy-950 overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0">
          {/* mesh gradient */}
          <div className="absolute inset-0 bg-mesh-dark" />
          {/* dot grid */}
          <div className="absolute inset-0 dot-pattern opacity-25" />
          {/* radial spotlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-teal-600/12 blur-[120px]" />
          {/* coral accent bottom */}
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-coral-500/10 blur-[80px]" />
        </div>

        <div className="relative page-container py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">

            {/* pill badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-300">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse-slow" />
              Trusted EU Immigration Guidance — Not Legal Advice
            </div>

            {/* headline */}
            <h1 className="text-5xl font-extrabold leading-[1.08] text-white lg:text-7xl tracking-tight"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              Your Gateway to{" "}
              <span className="relative inline-block">
                <span className="text-gradient-hero">EU Immigration</span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400/0 via-teal-400/60 to-teal-400/0 rounded-full" />
              </span>
            </h1>

            <p className="mt-7 text-lg leading-relaxed text-white/55 max-w-2xl mx-auto">
              Check eligibility, build your document checklist and track your application — across{" "}
              <strong className="text-white/80 font-semibold">13 European countries</strong> and{" "}
              <strong className="text-white/80 font-semibold">30+ immigration routes</strong>.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/eligibility">
                <button className="inline-flex items-center gap-2 rounded-2xl bg-coral-500 px-7 py-3.5 text-sm font-bold text-white shadow-coral-md hover:bg-coral-600 hover:shadow-coral-lg transition-all duration-200 active:scale-[0.98]">
                  Check My Eligibility
                  <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="/countries">
                <button className="inline-flex items-center gap-2 rounded-2xl border border-white/14 bg-white/6 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/22 transition-all duration-200 backdrop-blur-sm">
                  Explore Countries
                  <Globe size={16} className="text-teal-300" />
                </button>
              </Link>
            </div>

            {/* trust chips */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {["Free eligibility check", "Secure document upload", "Live application tracking"].map(
                (t) => (
                  <span key={t} className="flex items-center gap-1.5 text-xs font-medium text-white/40">
                    <CheckCircle size={13} className="text-teal-400 shrink-0" />
                    {t}
                  </span>
                )
              )}
            </div>

            {/* stats row */}
            <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-2xl mx-auto">
              {stats.map((s) => (
                <div key={s.label} className="glass rounded-2xl px-4 py-3 text-center">
                  <p className="text-2xl font-extrabold text-white" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    {s.value}
                  </p>
                  <p className="mt-0.5 text-xs text-white/40 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* bottom wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0Z" fill="#fdfaf6" />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          PURPOSE CARDS
      ════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-sand-50">
        <div className="page-container">
          <div className="text-center mb-12">
            <span className="label-tag mb-4">
              <Compass size={12} />
              Find Your Route
            </span>
            <h2 className="section-title mt-3">What Brings You to Europe?</h2>
            <p className="section-subtitle mx-auto">
              Select your purpose to explore the immigration routes available in your destination country.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {purposeCards.map((card) => (
              <Link key={card.label} href={card.href} className="group">
                <div className="relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-[rgba(14,20,72,0.07)] shadow-card text-center transition-all duration-300 group-hover:shadow-card-hover group-hover:-translate-y-1 group-hover:border-teal-200 cursor-pointer">
                  {/* icon */}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg} text-white shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                    <card.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-800">{card.label}</p>
                    <p className="mt-1 text-xs text-navy-400 leading-tight">{card.desc}</p>
                  </div>
                  {/* hover arrow */}
                  <ArrowUpRight
                    size={12}
                    className="absolute top-3 right-3 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FEATURED COUNTRIES
      ════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
            <div>
              <span className="label-tag mb-3">
                <Globe size={12} />
                Coverage
              </span>
              <h2 className="section-title mt-2">Supported Countries</h2>
              <p className="section-subtitle">Major EU destinations with full application support.</p>
            </div>
            <Link href="/countries">
              <Button variant="secondary" size="sm">
                View All Countries <ChevronRight size={14} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCountries.map((country) => (
              <Link key={country.id} href={`/countries/${country.id}`} className="group">
                <div className="flex flex-col h-full p-5 rounded-2xl bg-white border border-[rgba(14,20,72,0.08)] shadow-card transition-all duration-300 group-hover:shadow-card-hover group-hover:-translate-y-1 group-hover:border-teal-200">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Image
                        src={country.flagUrl}
                        alt={`${country.name} flag`}
                        width={52}
                        height={36}
                        className="rounded-lg shadow-sm object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-navy-900 truncate">{country.name}</h3>
                        <span className="text-xs text-navy-300 font-mono shrink-0">{country.code}</span>
                      </div>
                      <p className="mt-1 text-xs text-navy-400 line-clamp-2 leading-relaxed">
                        {country.description.slice(0, 70)}…
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {country.supportedRoutes.map((r) => (
                      <span
                        key={r}
                        className="rounded-full bg-teal-50 border border-teal-100 px-2 py-0.5 text-xs font-semibold text-teal-700 capitalize"
                      >
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

      {/* ════════════════════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-sand-50 relative overflow-hidden">
        {/* subtle accent */}
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-teal-100/60 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-coral-100/40 blur-3xl pointer-events-none" />

        <div className="relative page-container">
          <div className="text-center mb-14">
            <span className="label-tag mb-3">
              <Zap size={12} />
              Process
            </span>
            <h2 className="section-title mt-2">How It Works</h2>
            <p className="section-subtitle mx-auto">
              Four steps from eligibility check to application tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">
            {/* connector line (desktop) */}
            <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-teal-200 via-coral-200 to-mint-200" />

            {steps.map((s, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                <div
                  className={`relative z-10 mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-2xl ${s.color} text-white transition-transform duration-300 group-hover:-translate-y-1`}
                >
                  <s.icon size={26} />
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white border-2 border-navy-100 text-[10px] font-black text-navy-800">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold text-navy-900 mb-2">{s.title}</h3>
                <p className="text-sm text-navy-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/eligibility">
              <Button size="lg" variant="primary">
                Start Your Eligibility Check <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          TRUST / WHY US
      ════════════════════════════════════════════════════════════ */}
      <section className="relative section-padding bg-navy-950 overflow-hidden">
        {/* background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-mesh-dark" />
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-teal-600/8 blur-[100px]" />
        </div>

        <div className="relative page-container">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/25 bg-teal-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-300 mb-4">
              <Sparkles size={11} />
              Why Avensa
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Built on Transparency &amp; Accuracy
            </h2>
            <p className="mt-3 text-white/45 text-base max-w-xl mx-auto">
              Accurate immigration information — no guesswork, no legal advice, just structured clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((tp) => (
              <div
                key={tp.label}
                className="glass rounded-2xl p-6 text-center group hover:border-teal-500/30 transition-all duration-300"
              >
                <div className={`mb-4 mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${tp.bg} transition-transform duration-300 group-hover:scale-110`}>
                  <tp.icon size={22} className={tp.color} />
                </div>
                <h3 className="text-sm font-bold text-white">{tp.label}</h3>
                <p className="mt-2 text-xs text-white/40 leading-relaxed">{tp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          LATEST NEWS
      ════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
            <div>
              <span className="label-tag mb-3">
                <FileText size={12} />
                Updates
              </span>
              <h2 className="section-title mt-2">Immigration Updates</h2>
              <p className="section-subtitle">Recent changes that may affect your plans.</p>
            </div>
            <Link href="/news">
              <Button variant="secondary" size="sm">
                View All <ChevronRight size={14} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {latestArticles.map((article, idx) => (
              <Link key={article.id} href={`/knowledge-base/${article.slug}`} className="group">
                <div className="flex flex-col h-full rounded-2xl bg-white border border-[rgba(14,20,72,0.08)] shadow-card overflow-hidden transition-all duration-300 group-hover:shadow-card-hover group-hover:-translate-y-1 group-hover:border-teal-200">
                  {/* coloured top stripe */}
                  <div
                    className={`h-1 w-full ${
                      idx === 0 ? "bg-teal-500" : idx === 1 ? "bg-coral-500" : "bg-mint-500"
                    }`}
                  />
                  <div className="p-5 flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="rounded-full bg-teal-50 border border-teal-100 px-2.5 py-0.5 text-xs font-semibold text-teal-700">
                        {article.category}
                      </span>
                      <span className="text-xs text-navy-300">{formatDate(article.publishedAt)}</span>
                    </div>
                    <h3 className="font-bold text-navy-900 leading-snug group-hover:text-teal-700 transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-navy-400 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="px-5 py-3 border-t border-[rgba(14,20,72,0.06)] flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs font-semibold text-teal-600">
                      Read article <ArrowRight size={12} />
                    </span>
                    <ArrowUpRight
                      size={12}
                      className="text-teal-300 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-sand-50">
        <div className="page-container">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-10">
              <span className="label-tag mb-3">
                <Search size={12} />
                FAQ
              </span>
              <h2 className="section-title mt-2">Frequently Asked Questions</h2>
              <p className="section-subtitle mx-auto">Quick answers to common immigration questions.</p>
            </div>

            <div className="space-y-3">
              {homeFaqs.map((faq, idx) => (
                <details
                  key={faq.id}
                  className="group rounded-2xl border border-[rgba(14,20,72,0.08)] bg-white shadow-card overflow-hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-semibold text-navy-800 hover:text-teal-700 transition-colors list-none">
                    <span className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-black text-teal-600">
                        {idx + 1}
                      </span>
                      {faq.question}
                    </span>
                    <ChevronRight
                      size={15}
                      className="shrink-0 text-navy-300 transition-transform duration-200 group-open:rotate-90"
                    />
                  </summary>
                  <div className="border-t border-[rgba(14,20,72,0.06)] bg-sand-50/50 px-6 py-4 text-sm text-navy-500 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/knowledge-base#faq">
                <Button variant="secondary">
                  View All FAQs <ChevronRight size={14} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-navy-950 py-20">
        {/* background blobs */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-teal-500/15 blur-[80px]" />
          <div className="absolute -bottom-20 right-1/4 h-64 w-64 rounded-full bg-coral-500/12 blur-[80px]" />
          <div className="absolute inset-0 dot-pattern opacity-20" />
        </div>

        <div className="relative page-container text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-coral-500/25 bg-coral-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-coral-300 mb-6">
            <Sparkles size={11} />
            Start Today — It&apos;s Free
          </div>
          <h2 className="text-3xl font-extrabold text-white lg:text-5xl max-w-2xl mx-auto leading-tight" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Ready to Begin Your{" "}
            <span className="text-gradient-teal">EU Journey?</span>
          </h2>
          <p className="mt-4 text-base text-white/45 max-w-lg mx-auto">
            Join thousands who have already navigated EU immigration with confidence using Avensa Overseas.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/auth/register">
              <button className="inline-flex items-center gap-2 rounded-2xl bg-coral-500 px-7 py-3.5 text-sm font-bold text-white shadow-coral-md hover:bg-coral-600 transition-all duration-200 active:scale-[0.98]">
                Create Free Account <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/eligibility">
              <button className="inline-flex items-center gap-2 rounded-2xl border border-white/14 bg-white/6 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
                Check Eligibility
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          DISCLAIMER
      ════════════════════════════════════════════════════════════ */}
      <section className="bg-amber-50 border-y border-amber-200/60 py-5">
        <div className="page-container">
          <p className="text-xs text-amber-800/70 leading-relaxed text-center max-w-4xl mx-auto">
            <strong className="text-amber-800 font-semibold">⚠ Important: </strong>
            Avensa Overseas provides general immigration information only and does not constitute legal advice.
            Always consult a qualified immigration lawyer or official government sources before making decisions.
          </p>
        </div>
      </section>
    </>
  );
}
