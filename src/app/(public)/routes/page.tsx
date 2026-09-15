import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Map, ArrowRight, Clock, FileText, Briefcase, GraduationCap, Users, Home as HomeIcon, Plane, Star, ChevronRight } from "lucide-react";
import { IMMIGRATION_ROUTES, COUNTRIES, CATEGORY_LABELS, CATEGORY_DESCRIPTIONS } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Button } from "@/components/ui/Button";
import type { ImmigrationCategory } from "@/types";

export const metadata: Metadata = { title: "Immigration Routes – EU Visa & Permit Guide" };

const CATEGORIES: ImmigrationCategory[] = ["work", "study", "family", "residence", "visit", "special"];

const categoryConfig: Record<ImmigrationCategory, { icon: React.ElementType; gradient: string; glow: string; light: string }> = {
  work:      { icon: Briefcase,     gradient: "from-indigo-500 to-violet-600", glow: "rgba(79,70,229,0.35)",  light: "bg-indigo-50 text-indigo-600 border-indigo-100"  },
  study:     { icon: GraduationCap, gradient: "from-violet-500 to-purple-600", glow: "rgba(124,58,237,0.30)", light: "bg-violet-50 text-violet-600 border-violet-100"  },
  family:    { icon: Users,         gradient: "from-sky-500 to-indigo-500",    glow: "rgba(14,165,233,0.28)", light: "bg-sky-50 text-sky-600 border-sky-100"           },
  residence: { icon: HomeIcon,      gradient: "from-emerald-500 to-teal-600",  glow: "rgba(16,185,129,0.28)", light: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  visit:     { icon: Plane,         gradient: "from-amber-500 to-orange-500",  glow: "rgba(245,158,11,0.32)", light: "bg-amber-50 text-amber-600 border-amber-100"     },
  special:   { icon: Star,          gradient: "from-rose-500 to-pink-600",     glow: "rgba(244,63,94,0.28)", light: "bg-rose-50 text-rose-600 border-rose-100"        },
};

export default function RoutesPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>

      {/* ── Hero ── */}
      <div className="gradient-hero py-20">
        <div className="relative z-10 page-container">
          <Breadcrumb items={[{ label: "Routes" }]} className="text-white/50 mb-6" />
          <div className="section-eyebrow mb-5">
            <Map size={11} />
            Routes
          </div>
          <h1
            className="text-4xl lg:text-6xl font-bold text-white leading-tight max-w-3xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Every Route to{" "}
            <span className="text-gradient-hero">Living in Europe</span>
          </h1>
          <p
            className="mt-5 text-base text-white/50 max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Browse all available visa and permit routes, grouped by purpose. Filter by country or start your eligibility check.
          </p>

          {/* Category quick-jump pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const cfg = categoryConfig[cat];
              return (
                <Link key={cat} href={`#cat-${cat}`}>
                  <span
                    className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-semibold text-white/70 hover:bg-white/[0.12] hover:text-white transition-all cursor-pointer backdrop-blur-sm"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    <cfg.icon size={12} />
                    {CATEGORY_LABELS[cat]}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="page-container py-10">
        <Disclaimer className="mb-12" />

        {/* ── Per-category sections ── */}
        {CATEGORIES.map((cat) => {
          const routes = IMMIGRATION_ROUTES.filter((r) => r.category === cat && r.status === "active");
          const cfg = categoryConfig[cat];
          if (routes.length === 0) return null;
          return (
            <section key={cat} id={`cat-${cat}`} className="mb-16 scroll-mt-24">
              {/* Section header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${cfg.gradient} text-white shadow-md`}
                    style={{ boxShadow: `0 4px 20px ${cfg.glow}` }}
                  >
                    <cfg.icon size={22} />
                  </div>
                  <div>
                    <h2
                      className="text-2xl font-bold text-ink"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {CATEGORY_LABELS[cat]}
                    </h2>
                    <p className="text-sm text-slate-500 mt-0.5" style={{ fontFamily: "var(--font-outfit)" }}>
                      {CATEGORY_DESCRIPTIONS[cat]}
                    </p>
                  </div>
                </div>
                <Link href={`/routes/${cat}`} className="shrink-0">
                  <Button variant="secondary" size="sm">
                    See all {CATEGORY_LABELS[cat]} routes <ChevronRight size={14} />
                  </Button>
                </Link>
              </div>

              {/* Route cards */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {routes.map((route, i) => {
                  const country = COUNTRIES.find((c) => c.id === route.countryId);
                  return (
                    <Link
                      key={route.id}
                      href={`/routes/${route.slug}`}
                      className="group block animate-fade-up"
                      style={{ animationDelay: `${i * 0.05}s`, animationFillMode: "both" }}
                    >
                      <div className="relative flex flex-col h-full p-5 rounded-3xl bg-white border border-slate-200/70 shadow-card overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-card-hover group-hover:border-indigo-300/50">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                          style={{ background: `radial-gradient(ellipse at 50% 0%,${cfg.glow.replace("0.30","0.05").replace("0.35","0.05").replace("0.32","0.05").replace("0.28","0.04")},transparent 70%)` }} />

                        {/* Flag + country */}
                        <div className="relative flex items-center gap-3 mb-3">
                          {country && (
                            <Image
                              src={country.flagUrl}
                              alt={country.name}
                              width={40}
                              height={28}
                              className="rounded-lg shadow-sm object-cover"
                            />
                          )}
                          <div>
                            <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-outfit)" }}>
                              {country?.name}
                            </p>
                            <span
                              className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${cfg.light}`}
                              style={{ fontFamily: "var(--font-outfit)" }}
                            >
                              {CATEGORY_LABELS[cat]}
                            </span>
                          </div>
                        </div>

                        <h3
                          className="relative font-bold text-ink group-hover:text-indigo-700 transition-colors flex-1 leading-snug"
                          style={{ fontFamily: "var(--font-syne)" }}
                        >
                          {route.name}
                        </h3>
                        <p className="relative mt-1.5 text-sm text-slate-500 line-clamp-2 leading-relaxed"
                          style={{ fontFamily: "var(--font-outfit)" }}>
                          {route.shortDescription}
                        </p>

                        <div className="relative mt-3 flex gap-4 text-xs text-slate-400" style={{ fontFamily: "var(--font-outfit)" }}>
                          <span className="flex items-center gap-1"><Clock size={11} />{route.processingTime}</span>
                          <span className="flex items-center gap-1"><FileText size={11} />{route.requiredDocuments.length} docs</span>
                        </div>

                        <div className="relative mt-4 flex items-center gap-1.5 text-xs font-semibold text-indigo-600 group-hover:gap-2.5 transition-all duration-300"
                          style={{ fontFamily: "var(--font-outfit)" }}>
                          View requirements <ArrowRight size={12} />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
