import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Map, ArrowRight, Clock, FileText, Briefcase, GraduationCap, Users, Home as HomeIcon, Plane, Star, ChevronRight, Globe } from "lucide-react";
import { IMMIGRATION_ROUTES, COUNTRIES, CATEGORY_LABELS, CATEGORY_DESCRIPTIONS } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Button } from "@/components/ui/Button";
import { EuropeanCitiesStrip } from "@/components/ui/EuropeanCitiesStrip";
import type { ImmigrationCategory } from "@/types";

/* ─── Lifestyle photos for the hero collage ──────────────────── */
const HERO_PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&auto=format&fit=crop",
    alt: "Professionals working in a European office",
    label: "Work",
  },
  {
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80&auto=format&fit=crop",
    alt: "Students on a European university campus",
    label: "Study",
  },
  {
    src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80&auto=format&fit=crop",
    alt: "Family in a European city square",
    label: "Family",
  },
  {
    src: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80&auto=format&fit=crop",
    alt: "European city street at golden hour",
    label: "Explore",
  },
];

export const metadata: Metadata = { title: "Immigration Routes – EU Visa & Permit Guide" };

const CATEGORIES: ImmigrationCategory[] = ["work", "study", "family", "residence", "visit", "special"];

const categoryConfig: Record<ImmigrationCategory, { icon: React.ElementType; gradient: string; glow: string; light: string }> = {
  work:      { icon: Briefcase,     gradient: "from-[#0d1b4b] to-[#1a2b6b]",  glow: "rgba(13,27,75,0.35)",   light: "bg-[rgba(13,27,75,0.07)] text-[#0d1b4b] border-[rgba(13,27,75,0.18)]"   },
  study:     { icon: GraduationCap, gradient: "from-[#F5A623] to-[#E8971A]",  glow: "rgba(245,166,35,0.35)", light: "bg-[rgba(245,166,35,0.08)] text-[#b06000] border-[rgba(245,166,35,0.25)]" },
  family:    { icon: Users,         gradient: "from-[#1a2b6b] to-[#0d1b4b]",  glow: "rgba(26,43,107,0.30)",  light: "bg-[rgba(13,27,75,0.07)] text-[#0d1b4b] border-[rgba(13,27,75,0.18)]"   },
  residence: { icon: HomeIcon,      gradient: "from-[#0d1b4b] to-[#F5A623]",  glow: "rgba(13,27,75,0.30)",   light: "bg-[rgba(245,166,35,0.08)] text-[#b06000] border-[rgba(245,166,35,0.25)]" },
  visit:     { icon: Plane,         gradient: "from-[#F5A623] to-[#fcd34d]",  glow: "rgba(245,166,35,0.32)", light: "bg-amber-50 text-amber-600 border-amber-100"                              },
  special:   { icon: Star,          gradient: "from-[#1a2b6b] to-[#F5A623]",  glow: "rgba(26,43,107,0.28)",  light: "bg-[rgba(13,27,75,0.07)] text-[#0d1b4b] border-[rgba(13,27,75,0.18)]"   },
};

export default function RoutesPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>

      {/* ════════════════════════════════════════════════════════
          HERO — European lifestyle photo collage + city strip
      ════════════════════════════════════════════════════════ */}
      <div className="gradient-hero py-20 relative overflow-hidden">

        {/* ── Background city photo ── */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1800&q=70&auto=format&fit=crop"
            alt="European street life"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            style={{ opacity: 0.12 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(5,7,20,0.80) 0%, rgba(10,15,46,0.68) 55%, rgba(5,7,20,0.84) 100%)",
            }}
          />
        </div>

        {/* ── Lifestyle photo collage — right side, desktop only ── */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 hidden xl:flex items-center gap-3 pr-6 opacity-0 xl:opacity-100">
          {/* Stacked 2×2 mosaic */}
          <div className="flex flex-col gap-3">
            {[HERO_PHOTOS[0], HERO_PHOTOS[2]].map((p, i) => (
              <div key={i} className="relative w-[148px] h-[112px] rounded-2xl overflow-hidden ring-1 ring-white/10"
                style={{ transform: i === 0 ? "translateY(8px)" : "translateY(-8px)" }}>
                <Image src={p.src} alt={p.alt} fill sizes="148px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-2 left-3 text-[10px] font-semibold text-white/80"
                  style={{ fontFamily: "var(--font-outfit)" }}>
                  {p.label}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {[HERO_PHOTOS[1], HERO_PHOTOS[3]].map((p, i) => (
              <div key={i} className="relative w-[148px] h-[112px] rounded-2xl overflow-hidden ring-1 ring-white/10"
                style={{ transform: i === 0 ? "translateY(-6px)" : "translateY(6px)" }}>
                <Image src={p.src} alt={p.alt} fill sizes="148px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-2 left-3 text-[10px] font-semibold text-white/80"
                  style={{ fontFamily: "var(--font-outfit)" }}>
                  {p.label}
                </span>
              </div>
            ))}
          </div>
          {/* Right-edge fade mask */}
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#050714] to-transparent" />
          {/* Left-edge fade mask so mosaic blends into content */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#050714] to-transparent" />
        </div>

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
            Browse all available visa and permit routes, grouped by purpose.
            From Berlin boardrooms to Amsterdam canal apartments — find your path in Europe.
          </p>

          {/* Quick-stat chips */}
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { icon: Globe,        label: "30 EU Contries" },
              { icon: Map,          label: "30+ Active Routes" },
              { icon: Briefcase,    label: "Work · Study · Family" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 backdrop-blur-sm"
              >
                <Icon size={12} className="shrink-0" style={{ color: "#F5A623" }} />
                <span className="text-xs font-semibold text-white/70" style={{ fontFamily: "var(--font-outfit)" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Category quick-jump pills */}
          <div className="mt-6 flex flex-wrap gap-2">
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

          {/* City strip at the bottom of the hero */}
          <div className="mt-10 -mx-4 sm:-mx-6 lg:-mx-8">
            <EuropeanCitiesStrip
              animated
              showLabels={false}
              cardWidth={180}
              className="[--fade-from:#050714]"
            />
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
                      <div className="relative flex flex-col h-full p-5 rounded-3xl bg-white border border-slate-200/70 shadow-card overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-card-hover group-hover:border-[rgba(245,166,35,0.35)]">
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
                          className="relative font-bold text-ink group-hover:text-[#0d1b4b] transition-colors flex-1 leading-snug"
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

                        <div className="relative mt-4 flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all duration-300"
                          style={{ fontFamily: "var(--font-outfit)", color: "#0d1b4b" }}>
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
