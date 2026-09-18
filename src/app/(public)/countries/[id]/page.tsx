import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalLink, ArrowRight, CheckCircle, ChevronRight, Globe, Clock, FileText, MapPin, Languages, Banknote } from "lucide-react";
import { COUNTRIES, IMMIGRATION_ROUTES, CATEGORY_LABELS } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Button } from "@/components/ui/Button";

interface Props { params: { id: string } }

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const country = COUNTRIES.find((c) => c.id === params.id);
  return { title: country ? `${country.name} – Immigration Routes` : "Country Not Found" };
}

const categoryGradients: Record<string, string> = {
  work:      "from-[#0d1b4b] to-[#1a2b6b]",
  study:     "from-[#F5A623] to-[#E8971A]",
  family:    "from-[#1a2b6b] to-[#0d1b4b]",
  residence: "from-[#0d1b4b] to-[#F5A623]",
  visit:     "from-[#F5A623] to-[#fcd34d]",
  special:   "from-[#1a2b6b] to-[#F5A623]",
};
const categoryGlows: Record<string, string> = {
  work:      "rgba(13,27,75,0.35)",
  study:     "rgba(245,166,35,0.35)",
  family:    "rgba(26,43,107,0.30)",
  residence: "rgba(13,27,75,0.30)",
  visit:     "rgba(245,166,35,0.32)",
  special:   "rgba(26,43,107,0.28)",
};

export default function CountryDetailPage({ params }: Props) {
  const country = COUNTRIES.find((c) => c.id === params.id);
  if (!country) notFound();

  const routes = IMMIGRATION_ROUTES.filter((r) => r.countryId === country.id);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>

      {/* ── Hero ── */}
      <div className="gradient-hero py-20">
        <div className="relative z-10 page-container">
          <Breadcrumb
            items={[{ label: "Countries", href: "/countries" }, { label: country.name }]}
            className="text-white/50 mb-6"
          />
          <div className="flex items-center gap-5 flex-wrap">
            <div className="relative">
              <Image
                src={country.flagUrl}
                alt={`${country.name} flag`}
                width={88}
                height={60}
                className="rounded-2xl shadow-lg object-cover ring-2 ring-white/20"
              />
            </div>
            <div>
              <h1
                className="text-4xl lg:text-5xl font-bold text-white"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {country.name}
              </h1>
              <div className="mt-3 flex flex-wrap gap-2">
                {country.eu && (
                  <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm"
                    style={{ fontFamily: "var(--font-outfit)" }}>
                    EU Member
                  </span>
                )}
                {country.schengen && (
                  <span className="inline-flex items-center rounded-full border border-gold-400/40 bg-gold-500/15 px-3 py-1 text-xs font-semibold text-gold-300 backdrop-blur-sm"
                    style={{ fontFamily: "var(--font-outfit)" }}>
                    Schengen Area
                  </span>
                )}
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/60 backdrop-blur-sm"
                  style={{ fontFamily: "var(--font-outfit)" }}>
                  Capital: {country.capital}
                </span>
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/60 backdrop-blur-sm"
                  style={{ fontFamily: "var(--font-outfit)" }}>
                  {country.currency}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-container py-10">
        <Disclaimer className="mb-10" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* ── Routes ── */}
          <div className="lg:col-span-2">
            <h2
              className="text-2xl font-bold text-ink mb-6"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Available Immigration Routes
            </h2>

            {routes.length === 0 ? (
              <div className="text-center py-16 rounded-3xl border border-dashed border-slate-200">
                <Globe size={32} className="mx-auto text-slate-300 mb-3" />
                <p className="font-semibold text-slate-500" style={{ fontFamily: "var(--font-syne)" }}>Route details coming soon</p>
              </div>
            ) : (
              <div className="space-y-4">
                {routes.map((route, i) => {
                  const grad = categoryGradients[route.category] ?? "from-[#0d1b4b] to-[#1a2b6b]";
                  const glow = categoryGlows[route.category]    ?? "rgba(13,27,75,0.30)";
                  return (
                    <div
                      key={route.id}
                      className="group relative flex flex-col gap-4 p-6 rounded-3xl bg-white border border-slate-200/70 shadow-card overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card-hover hover:border-indigo-300/50 animate-fade-up"
                      style={{ animationDelay: `${i * 0.06}s`, animationFillMode: "both" }}
                    >
                      {/* Hover glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                        style={{ background: `radial-gradient(ellipse at 50% 0%,${glow.replace("0.30","0.05")},transparent 70%)` }} />

                      <div className="relative flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                            {/* Category pill */}
                            <span
                              className={`inline-flex items-center rounded-full bg-gradient-to-r ${grad} px-3 py-0.5 text-[11px] font-semibold text-white capitalize`}
                              style={{ boxShadow: `0 2px 10px ${glow}`, fontFamily: "var(--font-outfit)" }}
                            >
                              {CATEGORY_LABELS[route.category]}
                            </span>
                            {route.status === "active" && (
                              <span className="flex items-center gap-1 text-[11px] font-semibold"
                                style={{ fontFamily: "var(--font-outfit)", color: "#F5A623" }}>
                                <CheckCircle size={11} /> Active
                              </span>
                            )}
                          </div>
                          <h3
                            className="text-base font-bold text-ink group-hover:text-[#0d1b4b] transition-colors"
                            style={{ fontFamily: "var(--font-syne)" }}
                          >
                            {route.name}
                          </h3>
                          <p className="mt-1.5 text-sm text-slate-500 line-clamp-2 leading-relaxed"
                            style={{ fontFamily: "var(--font-outfit)" }}>
                            {route.shortDescription}
                          </p>
                        </div>
                        <ChevronRight size={16} className="text-slate-300 shrink-0 mt-1 transition-colors" style={{}} />
                      </div>

                      <div className="relative flex flex-wrap gap-4 text-xs text-slate-400" style={{ fontFamily: "var(--font-outfit)" }}>
                        <span className="flex items-center gap-1.5"><Clock size={11} /> {route.processingTime}</span>
                        <span className="flex items-center gap-1.5"><FileText size={11} /> {route.requiredDocuments.length} documents</span>
                        <span className="flex items-center gap-1.5">v{route.version}</span>
                      </div>

                      <div className="relative flex items-center gap-3 pt-1">
                        <Link href={`/routes/${route.slug}`}>
                          <Button size="sm" variant="outline">View Requirements</Button>
                        </Link>
                        <Link href={`/eligibility?country=${country.id}&route=${route.id}`}>
                          <Button size="sm">Check Eligibility <ArrowRight size={13} /></Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-5">

            {/* Country overview */}
            <div className="rounded-3xl bg-white border border-slate-200/70 shadow-card overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="font-bold text-ink" style={{ fontFamily: "var(--font-syne)" }}>Country Overview</h3>
              </div>
              <div className="px-6 py-5 space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-outfit)" }}>
                  {country.description}
                </p>
                <div className="space-y-3 pt-2">
                  {[
                    { icon: MapPin,     label: "Capital",   value: country.capital },
                    { icon: Languages,  label: "Languages", value: country.languages.join(", ") },
                    { icon: Banknote,   label: "Currency",  value: country.currency },
                    { icon: Globe,      label: "Schengen",  value: country.schengen ? "Yes" : "No" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-sm text-slate-500" style={{ fontFamily: "var(--font-outfit)" }}>
                        <Icon size={13} className="shrink-0" style={{ color: "#F5A623" }} />
                        {label}
                      </span>
                      <span className="text-sm font-semibold text-ink" style={{ fontFamily: "var(--font-outfit)" }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Processing info */}
            <div className="rounded-3xl p-6" style={{ background: "rgba(245,166,35,0.06)", border: "1px solid rgba(245,166,35,0.20)" }}>
              <h3 className="font-bold text-ink mb-2" style={{ fontFamily: "var(--font-syne)" }}>Processing Information</h3>
              <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-outfit)" }}>
                {country.processingInfo}
              </p>
            </div>

            {/* Official source */}
            <div className="rounded-3xl bg-white border border-slate-200/70 shadow-card p-6">
              <h3 className="font-bold text-ink mb-3" style={{ fontFamily: "var(--font-syne)" }}>Official Source</h3>
              <a
                href={country.officialImmigrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold group transition-colors"
                style={{ fontFamily: "var(--font-outfit)", color: "#0d1b4b" }}
              >
                <Globe size={14} />
                Official Immigration Authority
                <ExternalLink size={12} className="ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" style={{ color: "#F5A623" }} />
              </a>
              <p className="mt-2 text-xs text-slate-400" style={{ fontFamily: "var(--font-outfit)" }}>
                Always verify current requirements on the official government website.
              </p>
            </div>

            {/* CTA */}
            <Link href={`/eligibility?country=${country.id}`}>
              <Button className="w-full" size="lg">
                Check Eligibility for {country.name} <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
