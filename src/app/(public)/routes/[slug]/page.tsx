import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle, ExternalLink, ArrowRight, Clock, Calendar, DollarSign, FileText, Globe, Briefcase, GraduationCap, Users, Home as HomeIcon, Plane, Star } from "lucide-react";
import {
  IMMIGRATION_ROUTES, COUNTRIES, CATEGORY_LABELS, CATEGORY_DESCRIPTIONS,
} from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Button } from "@/components/ui/Button";
import type { ImmigrationCategory } from "@/types";

interface Props { params: { slug: string } }

const CATEGORIES: ImmigrationCategory[] = ["work", "study", "family", "residence", "visit", "special"];

const categoryConfig: Record<ImmigrationCategory, { icon: React.ElementType; gradient: string; glow: string; light: string }> = {
  work:      { icon: Briefcase,     gradient: "from-indigo-500 to-violet-600", glow: "rgba(79,70,229,0.35)",  light: "bg-indigo-50 text-indigo-600 border-indigo-100" },
  study:     { icon: GraduationCap, gradient: "from-violet-500 to-purple-600", glow: "rgba(124,58,237,0.30)", light: "bg-violet-50 text-violet-600 border-violet-100" },
  family:    { icon: Users,         gradient: "from-sky-500 to-indigo-500",    glow: "rgba(14,165,233,0.28)", light: "bg-sky-50 text-sky-600 border-sky-100"          },
  residence: { icon: HomeIcon,      gradient: "from-emerald-500 to-teal-600",  glow: "rgba(16,185,129,0.28)", light: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  visit:     { icon: Plane,         gradient: "from-amber-500 to-orange-500",  glow: "rgba(245,158,11,0.32)", light: "bg-amber-50 text-amber-600 border-amber-100"    },
  special:   { icon: Star,          gradient: "from-rose-500 to-pink-600",     glow: "rgba(244,63,94,0.28)",  light: "bg-rose-50 text-rose-600 border-rose-100"       },
};

export function generateStaticParams() {
  return [
    ...IMMIGRATION_ROUTES.map((r) => ({ slug: r.slug })),
    ...CATEGORIES.map((c) => ({ slug: c })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (CATEGORIES.includes(params.slug as ImmigrationCategory)) {
    const cat = params.slug as ImmigrationCategory;
    return { title: `${CATEGORY_LABELS[cat]} Routes – EU Immigration` };
  }
  const route = IMMIGRATION_ROUTES.find((r) => r.slug === params.slug);
  return { title: route ? `${route.name} – ${CATEGORY_LABELS[route.category]}` : "Route Not Found" };
}

/* ─────────────────────────────────────────────────────────────── */

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200/70 shadow-card overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="font-bold text-ink" style={{ fontFamily: "var(--font-syne)" }}>{title}</h2>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

export default function RouteOrCategoryPage({ params }: Props) {

  /* ── Category listing ── */
  if (CATEGORIES.includes(params.slug as ImmigrationCategory)) {
    const cat = params.slug as ImmigrationCategory;
    const routes = IMMIGRATION_ROUTES.filter((r) => r.category === cat && r.status === "active");
    const cfg = categoryConfig[cat];

    return (
      <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
        <div className="gradient-hero py-20">
          <div className="relative z-10 page-container">
            <Breadcrumb
              items={[{ label: "Routes", href: "/routes" }, { label: CATEGORY_LABELS[cat] }]}
              className="text-white/50 mb-6"
            />
            {/* Category badge */}
            <div className={`inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r ${cfg.gradient} px-4 py-2 text-sm font-semibold text-white mb-5`}
              style={{ boxShadow: `0 4px 20px ${cfg.glow}`, fontFamily: "var(--font-outfit)" }}>
              <cfg.icon size={15} />
              {CATEGORY_LABELS[cat]}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight max-w-3xl"
              style={{ fontFamily: "var(--font-syne)" }}>
              {CATEGORY_LABELS[cat]} in Europe
            </h1>
            <p className="mt-5 text-base text-white/50 max-w-xl leading-relaxed"
              style={{ fontFamily: "var(--font-outfit)" }}>
              {CATEGORY_DESCRIPTIONS[cat]}
            </p>
          </div>
        </div>

        <div className="page-container py-10">
          <Disclaimer className="mb-10" />
          {routes.length === 0 ? (
            <div className="text-center py-20 rounded-3xl border border-dashed border-slate-200">
              <p className="text-lg font-semibold text-slate-500" style={{ fontFamily: "var(--font-syne)" }}>No active routes yet.</p>
              <Link href="/routes" className="mt-4 inline-block">
                <Button variant="secondary">Browse All Routes</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {routes.map((route, i) => {
                const country = COUNTRIES.find((c) => c.id === route.countryId);
                return (
                  <Link key={route.id} href={`/routes/${route.slug}`}
                    className="group block animate-fade-up"
                    style={{ animationDelay: `${i * 0.06}s`, animationFillMode: "both" }}>
                    <div className="relative flex flex-col h-full p-5 rounded-3xl bg-white border border-slate-200/70 shadow-card overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-card-hover group-hover:border-indigo-300/50">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                        style={{ background: `radial-gradient(ellipse at 50% 0%,${cfg.glow.replace("0.30","0.04")},transparent 70%)` }} />
                      <div className="relative flex items-center gap-3 mb-3">
                        {country && <Image src={country.flagUrl} alt={country.name} width={40} height={28} className="rounded-lg shadow-sm object-cover" />}
                        <div>
                          <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-outfit)" }}>{country?.name}</p>
                          <span className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold ${cfg.light}`}
                            style={{ fontFamily: "var(--font-outfit)" }}>
                            {CATEGORY_LABELS[cat]}
                          </span>
                        </div>
                      </div>
                      <h3 className="relative font-bold text-ink group-hover:text-indigo-700 transition-colors flex-1"
                        style={{ fontFamily: "var(--font-syne)" }}>
                        {route.name}
                      </h3>
                      <p className="relative mt-1.5 text-sm text-slate-500 line-clamp-2" style={{ fontFamily: "var(--font-outfit)" }}>
                        {route.shortDescription}
                      </p>
                      <div className="relative mt-3 flex gap-4 text-xs text-slate-400" style={{ fontFamily: "var(--font-outfit)" }}>
                        <span className="flex items-center gap-1"><Clock size={11} />{route.processingTime}</span>
                        <span className="flex items-center gap-1"><FileText size={11} />{route.requiredDocuments.length} docs</span>
                      </div>
                      <div className="relative mt-3 flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:gap-2 transition-all"
                        style={{ fontFamily: "var(--font-outfit)" }}>
                        View requirements <ArrowRight size={11} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Other categories */}
          <div className="mt-16">
            <h2 className="text-lg font-bold text-ink mb-5" style={{ fontFamily: "var(--font-syne)" }}>Other Route Categories</h2>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.filter((c) => c !== cat).map((c) => {
                const c2 = categoryConfig[c];
                return (
                  <Link key={c} href={`/routes/${c}`}>
                    <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium cursor-pointer hover:opacity-90 transition-opacity ${c2.light}`}
                      style={{ fontFamily: "var(--font-outfit)" }}>
                      <c2.icon size={13} />
                      {CATEGORY_LABELS[c]}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Route detail ── */
  const route = IMMIGRATION_ROUTES.find((r) => r.slug === params.slug);
  if (!route) notFound();

  const country  = COUNTRIES.find((c) => c.id === route.countryId);
  const govFees  = route.fees.filter((f) => f.type === "government");
  const svcFees  = route.fees.filter((f) => f.type === "service");
  const cfg      = categoryConfig[route.category];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <div className="gradient-hero py-20">
        <div className="relative z-10 page-container">
          <Breadcrumb
            items={[
              { label: "Routes",                       href: "/routes"              },
              { label: CATEGORY_LABELS[route.category], href: `/routes/${route.category}` },
              { label: route.name },
            ]}
            className="text-white/50 mb-6"
          />
          <div className="flex items-start gap-5 flex-wrap">
            {country && (
              <Image src={country.flagUrl} alt={country.name} width={70} height={48}
                className="rounded-2xl shadow-md object-cover ring-2 ring-white/20 mt-1" />
            )}
            <div>
              <div className={`inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r ${cfg.gradient} px-3 py-1 text-xs font-semibold text-white mb-3`}
                style={{ boxShadow: `0 3px 14px ${cfg.glow}`, fontFamily: "var(--font-outfit)" }}>
                <cfg.icon size={13} />
                {CATEGORY_LABELS[route.category]}
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
                {route.name}
              </h1>
              {country && (
                <p className="mt-2 text-white/55" style={{ fontFamily: "var(--font-outfit)" }}>{country.name}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="page-container py-10">
        <Disclaimer className="mb-10" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <SectionCard title="Overview">
              <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-outfit)" }}>
                {route.description}
              </p>
            </SectionCard>

            <SectionCard title="Key Eligibility Criteria">
              <ul className="space-y-3">
                {route.eligibilityHighlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700"
                    style={{ fontFamily: "var(--font-outfit)" }}>
                    <CheckCircle size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link href={`/eligibility?route=${route.id}`}>
                  <Button size="sm">Check My Eligibility <ArrowRight size={13} /></Button>
                </Link>
              </div>
            </SectionCard>

            <SectionCard title="Required Documents">
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {route.requiredDocuments.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700"
                    style={{ fontFamily: "var(--font-outfit)" }}>
                    <FileText size={14} className="text-indigo-400 mt-0.5 shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="Fees">
              {govFees.length > 0 && (
                <div className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3"
                    style={{ fontFamily: "var(--font-outfit)" }}>Government Fees</p>
                  {govFees.map((fee, i) => (
                    <div key={i} className="flex justify-between py-2.5 border-b border-slate-100 last:border-0 text-sm"
                      style={{ fontFamily: "var(--font-outfit)" }}>
                      <span className="text-slate-600">{fee.label}</span>
                      <span className="font-bold text-ink">{formatCurrency(fee.amount, fee.currency)}</span>
                    </div>
                  ))}
                </div>
              )}
              {svcFees.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3"
                    style={{ fontFamily: "var(--font-outfit)" }}>Avensa Service Fee</p>
                  {svcFees.map((fee, i) => (
                    <div key={i} className="flex justify-between py-2.5 border-b border-slate-100 last:border-0 text-sm"
                      style={{ fontFamily: "var(--font-outfit)" }}>
                      <span className="text-slate-600">{fee.label}</span>
                      <span className="font-bold text-ink">{formatCurrency(fee.amount, fee.currency)}</span>
                    </div>
                  ))}
                </div>
              )}
              <p className="mt-4 text-xs text-slate-400" style={{ fontFamily: "var(--font-outfit)" }}>
                Government fees are set by national authorities and may change. Avensa service fees are separate.
              </p>
            </SectionCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Quick facts */}
            <div className="rounded-3xl bg-gradient-to-b from-indigo-50 to-white border border-indigo-100 shadow-card overflow-hidden">
              <div className="px-6 py-4 border-b border-indigo-100/60">
                <h3 className="font-bold text-ink" style={{ fontFamily: "var(--font-syne)" }}>Quick Facts</h3>
              </div>
              <div className="px-6 py-5 space-y-4">
                {[
                  { icon: Clock,      label: "Processing", value: route.processingTime   },
                  { icon: Calendar,   label: "Duration",   value: route.typicalDuration  },
                  { icon: DollarSign, label: "Gov. Fee",   value: govFees[0] ? formatCurrency(govFees[0].amount, govFees[0].currency) : "Varies" },
                  { icon: FileText,   label: "Documents",  value: `${route.requiredDocuments.length} required` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100 shrink-0">
                      <Icon size={14} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide"
                        style={{ fontFamily: "var(--font-outfit)" }}>
                        {label}
                      </p>
                      <p className="text-sm font-semibold text-ink mt-0.5" style={{ fontFamily: "var(--font-outfit)" }}>
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Version */}
            <div className="rounded-3xl bg-white border border-slate-200/70 shadow-card p-6">
              <h3 className="font-bold text-ink mb-3" style={{ fontFamily: "var(--font-syne)" }}>Version Info</h3>
              <div className="space-y-2 text-sm" style={{ fontFamily: "var(--font-outfit)" }}>
                <div className="flex justify-between">
                  <span className="text-slate-500">Version</span>
                  <span className="font-semibold text-ink">{route.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Effective from</span>
                  <span className="font-semibold text-ink">{formatDate(route.effectiveFrom)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Last updated</span>
                  <span className="font-semibold text-ink">{formatDate(route.updatedAt)}</span>
                </div>
              </div>
            </div>

            {/* Official source */}
            <div className="rounded-3xl bg-white border border-slate-200/70 shadow-card p-6">
              <h3 className="font-bold text-ink mb-3" style={{ fontFamily: "var(--font-syne)" }}>Official Source</h3>
              <a href={route.sourceUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors group"
                style={{ fontFamily: "var(--font-outfit)" }}>
                <Globe size={14} />
                Official Government Page
                <ExternalLink size={12} className="ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <Link href={`/eligibility?route=${route.id}`}>
                <Button className="w-full" size="lg">
                  Check My Eligibility <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="w-full" size="lg" variant="secondary">
                  Create Account to Apply
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
