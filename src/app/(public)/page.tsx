import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, CheckCircle, Globe, FileText, Search,
  Clock, Shield, Users, Briefcase, GraduationCap,
  Home as HomeIcon, Plane, Star, ChevronRight, AlertTriangle,
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
  { icon: Briefcase, label: "Work", href: "/routes/work", color: "bg-blue-500", desc: "Skilled workers, EU Blue Card, Job Seeker" },
  { icon: GraduationCap, label: "Study", href: "/routes/study", color: "bg-purple-500", desc: "Bachelor's, Master's, PhD programs" },
  { icon: Users, label: "Family", href: "/routes/family", color: "bg-green-500", desc: "Spouse, child, family reunification" },
  { icon: HomeIcon, label: "Residence", href: "/routes/residence", color: "bg-orange-500", desc: "Long-term, permanent, digital nomad" },
  { icon: Plane, label: "Visit", href: "/routes/visit", color: "bg-sky-500", desc: "Tourism, business, short stay" },
  { icon: Star, label: "Special", href: "/routes/special", color: "bg-gold-500", desc: "Researcher, entrepreneur, highly qualified" },
];

const steps = [
  { step: "01", title: "Select Your Route", desc: "Choose your destination country and immigration purpose." },
  { step: "02", title: "Check Eligibility", desc: "Answer a guided questionnaire to see which routes may apply." },
  { step: "03", title: "Prepare Documents", desc: "Get a route-specific checklist and upload documents securely." },
  { step: "04", title: "Apply & Track", desc: "Submit your application and track every status change in real time." },
];

const trustPoints = [
  { icon: Shield, label: "Secure & Private", desc: "Bank-grade encryption for all documents and personal data." },
  { icon: Clock, label: "Real-Time Tracking", desc: "Live status updates and notifications at every stage." },
  { icon: Globe, label: "13 EU Countries", desc: "Comprehensive coverage of major EU immigration destinations." },
  { icon: FileText, label: "Versioned Rules", desc: "Every eligibility rule is versioned with effective dates and sources." },
];

export default function HomePage() {
  const homeFaqs = MOCK_FAQS.slice(0, 5);
  const featuredCountries = COUNTRIES.filter((c) => c.status === "active").slice(0, 6);
  const latestArticles = MOCK_ARTICLES.slice(0, 3);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="gradient-hero relative overflow-hidden py-20 lg:py-32">
        {/* decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
        </div>

        <div className="page-container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-blue-100">
              <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse-slow" />
              Trusted EU Immigration Guidance — Not Legal Advice
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-white lg:text-6xl font-heading">
              Your Gateway to{" "}
              <span className="text-gold-400">EU Immigration</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-blue-100">
              Check eligibility, build your document checklist and track your application — across{" "}
              <strong className="text-white">13 European countries</strong> and{" "}
              <strong className="text-white">30+ immigration routes</strong>.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/eligibility">
                <Button size="lg" variant="gold" className="shadow-lg">
                  Check My Eligibility
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/countries">
                <Button size="lg" variant="secondary" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Explore Countries
                  <Globe size={18} />
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-blue-200">
              {["Free eligibility check", "Secure document upload", "Live application tracking"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-gold-400" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Purpose Cards ─────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="section-title">Find Your Immigration Route</h2>
            <p className="section-subtitle mx-auto">
              Select your purpose to explore the routes available in your destination country.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {purposeCards.map((card) => (
              <Link key={card.label} href={card.href}>
                <Card hover className="flex flex-col items-center gap-3 p-5 text-center">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color} text-white`}>
                    <card.icon size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{card.label}</p>
                    <p className="mt-1 text-xs text-slate-500 leading-tight">{card.desc}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Countries ─────────────────────────────────────── */}
      <section className="section-padding bg-slate-50">
        <div className="page-container">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
            <div>
              <h2 className="section-title">Supported Countries</h2>
              <p className="section-subtitle">Major EU destinations with full application support.</p>
            </div>
            <Link href="/countries" className="mt-4 sm:mt-0">
              <Button variant="secondary" size="sm">
                View All Countries <ChevronRight size={15} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCountries.map((country) => (
              <Link key={country.id} href={`/countries/${country.id}`}>
                <Card hover className="p-5">
                  <div className="flex items-center gap-4">
                    <Image
                      src={country.flagUrl}
                      alt={`${country.name} flag`}
                      width={48}
                      height={32}
                      className="rounded shadow-sm object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900">{country.name}</h3>
                        <span className="text-xs text-slate-400">{country.code}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500 truncate">{country.description.slice(0, 70)}…</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {country.supportedRoutes.map((r) => (
                      <span key={r} className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700 capitalize">
                        {r}
                      </span>
                    ))}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="text-center mb-14">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle mx-auto">Four steps from eligibility check to application tracking.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-xl font-extrabold text-white shadow-brand">
                    {s.step}
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute right-0 top-7 hidden lg:block">
                    <ArrowRight size={20} className="text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/eligibility">
              <Button size="lg">
                Start Your Eligibility Check <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust Points ──────────────────────────────────────────── */}
      <section className="section-padding gradient-hero">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white font-heading">Why Avensa Overseas?</h2>
            <p className="mt-3 text-blue-200">Built on transparency, security and accurate immigration information.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((tp) => (
              <div key={tp.label} className="glass rounded-xl p-6 text-center">
                <div className="mb-3 mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                  <tp.icon size={20} className="text-gold-400" />
                </div>
                <h3 className="text-sm font-semibold text-white">{tp.label}</h3>
                <p className="mt-1.5 text-xs text-blue-200 leading-relaxed">{tp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest News ───────────────────────────────────────────── */}
      <section className="section-padding bg-slate-50">
        <div className="page-container">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
            <div>
              <h2 className="section-title">Immigration Updates</h2>
              <p className="section-subtitle">Recent changes that may affect your plans.</p>
            </div>
            <Link href="/news" className="mt-4 sm:mt-0">
              <Button variant="secondary" size="sm">View All <ChevronRight size={15} /></Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {latestArticles.map((article) => (
              <Link key={article.id} href={`/knowledge-base/${article.slug}`}>
                <Card hover className="h-full flex flex-col">
                  <div className="p-5 flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
                        {article.category}
                      </span>
                      <span className="text-xs text-slate-400">{formatDate(article.publishedAt)}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 leading-snug">{article.title}</h3>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="px-5 py-3 border-t border-slate-100">
                    <span className="flex items-center gap-1 text-xs font-medium text-brand-600">
                      Read article <ChevronRight size={13} />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle mx-auto">Quick answers to common immigration questions.</p>
            </div>
            <div className="space-y-4">
              {homeFaqs.map((faq) => (
                <details
                  key={faq.id}
                  className="group rounded-xl border border-slate-200 bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-slate-800 hover:text-brand-700 transition-colors">
                    {faq.question}
                    <ChevronRight size={16} className="text-slate-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="border-t border-slate-100 px-5 py-4 text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/knowledge-base#faq">
                <Button variant="secondary">View All FAQs <ChevronRight size={15} /></Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Disclaimer ────────────────────────────────────────────── */}
      <section className="bg-amber-50 border-y border-amber-200 py-6">
        <div className="page-container">
          <div className="flex gap-3 items-start">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-500" />
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>Important:</strong> {COMPANY.disclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────── */}
      <section className="bg-brand-700 py-16">
        <div className="page-container text-center">
          <h2 className="text-3xl font-bold text-white font-heading">
            Ready to Start Your EU Journey?
          </h2>
          <p className="mt-3 text-blue-200">
            Create a free account to check eligibility, manage documents and track your application.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg" variant="gold">
                Create Free Account <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/eligibility">
              <Button size="lg" className="bg-white/10 border border-white/30 text-white hover:bg-white/20">
                Check Eligibility First
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
