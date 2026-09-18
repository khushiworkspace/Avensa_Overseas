import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Globe, CheckCircle, ChevronRight, ArrowUpRight, MapPin, Zap, Camera } from "lucide-react";
import { COUNTRIES } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { EuropeanCitiesStrip } from "@/components/ui/EuropeanCitiesStrip";

export const metadata: Metadata = { title: "EU Countries – Supported Immigration Destinations" };

const activeCountries = COUNTRIES.filter((c) => c.status === "active");

/* ─── City photo per country (Unsplash) ─────────────────────────── */
const COUNTRY_PHOTOS: Record<string, { photo: string; caption: string }> = {
  de: {
    photo: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80&auto=format&fit=crop",
    caption: "Berlin, Germany",
  },
  fr: {
    photo: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80&auto=format&fit=crop",
    caption: "Paris, France",
  },
  nl: {
    photo: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80&auto=format&fit=crop",
    caption: "Amsterdam, Netherlands",
  },
  be: {
    photo: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80&auto=format&fit=crop",
    caption: "Bruges, Belgium",
  },
  se: {
    photo: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=600&q=80&auto=format&fit=crop",
    caption: "Stockholm, Sweden",
  },
  es: {
    photo: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80&auto=format&fit=crop",
    caption: "Barcelona, Spain",
  },
  it: {
    photo: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80&auto=format&fit=crop",
    caption: "Rome, Italy",
  },
  pt: {
    photo: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80&auto=format&fit=crop",
    caption: "Lisbon, Portugal",
  },
  pl: {
    photo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80&auto=format&fit=crop",
    caption: "Warsaw, Poland",
  },
  at: {
    photo: "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?w=600&q=80&auto=format&fit=crop",
    caption: "Vienna, Austria",
  },
  fi: {
    photo: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&q=80&auto=format&fit=crop",
    caption: "Helsinki, Finland",
  },
  lt: {
    photo: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600&q=80&auto=format&fit=crop",
    caption: "Vilnius, Lithuania",
  },
  ee: {
    photo: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=600&q=80&auto=format&fit=crop",
    caption: "Tallinn, Estonia",
  },
};

export default function CountriesPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>

      {/* ════════════════════════════════════════════════════════
          HERO — dark aurora with European cityscape photo
      ════════════════════════════════════════════════════════ */}
      <div className="gradient-hero py-24 relative overflow-hidden">

        {/* Background European city photo layered behind aurora */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&q=70&auto=format&fit=crop"
            alt="European cities"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            style={{ opacity: 0.10 }}
          />
          {/* Extra depth overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(5,7,20,0.75) 0%, rgba(10,15,46,0.65) 50%, rgba(5,7,20,0.80) 100%)",
            }}
          />
        </div>

        {/* Floating landmark silhouettes (desktop only) */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 hidden lg:flex items-center pr-10 opacity-[0.06]">
          <svg width="420" height="320" viewBox="0 0 420 320" fill="white">
            {/* Eiffel-style tower */}
            <polygon points="70,300 85,220 78,140 90,40 102,140 95,220 110,300" />
            <line x1="75" y1="180" x2="105" y2="180" strokeWidth="3" stroke="white"/>
            <line x1="80" y1="220" x2="100" y2="220" strokeWidth="3" stroke="white"/>
            {/* Classic arch */}
            <path d="M160 300 L160 200 Q190 150 220 200 L220 300" strokeWidth="2.5" stroke="white" fill="none"/>
            <line x1="155" y1="300" x2="225" y2="300" strokeWidth="3" stroke="white"/>
            {/* Cathedral spire */}
            <polygon points="300,300 300,180 310,80 320,180 320,300" />
            <polygon points="305,80 310,20 315,80" />
            <line x1="295" y1="200" x2="325" y2="200" strokeWidth="2.5" stroke="white"/>
            <line x1="297" y1="230" x2="323" y2="230" strokeWidth="2.5" stroke="white"/>
            {/* Windmill */}
            <rect x="370" y="220" width="12" height="80" fill="white"/>
            <line x1="376" y1="220" x2="376" y2="140" strokeWidth="2" stroke="white"/>
            <line x1="340" y1="180" x2="412" y2="180" strokeWidth="2" stroke="white"/>
            <line x1="345" y1="155" x2="407" y2="205" strokeWidth="2" stroke="white"/>
            <line x1="345" y1="205" x2="407" y2="155" strokeWidth="2" stroke="white"/>
          </svg>
        </div>

        <div className="relative z-10 page-container">
          <Breadcrumb items={[{ label: "Countries" }]} className="text-white/50 mb-6" />

          <div className="max-w-3xl">
            <div className="section-eyebrow mb-5">
              <Globe size={11} />
              Coverage
            </div>
            <h1
              className="text-4xl lg:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              13 EU Countries,{" "}
              <span className="text-gradient-hero">One Platform</span>
            </h1>
            <p
              className="mt-5 text-base text-white/50 max-w-xl leading-relaxed"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              From the Baltic coast of Lithuania to the Mediterranean shores of Italy — full
              application support for every major European immigration destination.
            </p>
          </div>

          {/* Quick stats */}
          <div className="mt-10 flex flex-wrap gap-4">
            {[
              { icon: Globe,        label: `${activeCountries.length} Countries` },
              { icon: CheckCircle,  label: `${COUNTRIES.filter(c => c.schengen).length} Schengen Area` },
              { icon: Zap,          label: "30+ Immigration Routes" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-4 py-2 backdrop-blur-sm"
              >
                <Icon size={13} className="shrink-0" style={{ color: "#F5A623" }} />
                <span
                  className="text-xs font-semibold text-white/75"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* City photo strip inside hero — dark fade variant */}
          <div className="mt-12 -mx-4 sm:-mx-6 lg:-mx-8">
            <EuropeanCitiesStrip
              animated
              showLabels
              cardWidth={220}
              className="[--fade-from:#050714]"
            />
          </div>
        </div>
      </div>

      {/* ── Disclaimer ── */}
      <div className="page-container pt-10">
        <Disclaimer />
      </div>

      {/* ════════════════════════════════════════════════════════
          COUNTRY GRID — cards with European city photo headers
      ════════════════════════════════════════════════════════ */}
      <div className="page-container py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeCountries.map((country, i) => {
            const cityData = COUNTRY_PHOTOS[country.id];
            return (
              <Link
                key={country.id}
                href={`/countries/${country.id}`}
                className="group block animate-fade-up"
                style={{ animationDelay: `${i * 0.04}s`, animationFillMode: "both" }}
              >
                <div className="relative flex flex-col h-full rounded-3xl bg-white border border-slate-200/70 shadow-card overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-card-hover group-hover:border-[rgba(245,166,35,0.35)]">

                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(90deg,transparent,rgba(245,166,35,0.70),transparent)" }}
                  />

                  {/* ── City photo header ── */}
                  {cityData ? (
                    <div className="relative h-44 w-full overflow-hidden shrink-0">
                      <Image
                        src={cityData.photo}
                        alt={cityData.caption}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient overlay fading to white card body */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to bottom, rgba(5,7,20,0.25) 0%, rgba(5,7,20,0.10) 55%, rgba(255,255,255,1) 100%)",
                        }}
                      />
                      {/* Photo credit chip */}
                      <div className="absolute bottom-2 right-3 flex items-center gap-1 rounded-full bg-black/30 backdrop-blur-sm px-2 py-0.5">
                        <Camera size={8} className="text-white/60" />
                        <span className="text-[9px] text-white/60" style={{ fontFamily: "var(--font-outfit)" }}>
                          {cityData.caption}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Fallback colour band if no photo mapped */
                    <div className="h-20 w-full shrink-0" style={{ background: "linear-gradient(135deg, rgba(13,27,75,0.08), rgba(245,166,35,0.05))" }} />
                  )}

                  {/* ── Card body ── */}
                  <div className="relative flex flex-col flex-1 p-5">

                    {/* Inner glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"
                      style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(13,27,75,0.04),transparent 70%)" }}
                    />

                    {/* Flag + name row */}
                    <div className="relative flex items-center gap-3">
                      <Image
                        src={country.flagUrl}
                        alt={`${country.name} flag`}
                        width={52}
                        height={35}
                        className="rounded-xl shadow-sm object-cover ring-1 ring-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3
                            className="font-bold text-ink group-hover:text-[#0d1b4b] transition-colors truncate"
                            style={{ fontFamily: "var(--font-syne)" }}
                          >
                            {country.name}
                          </h3>
                          <span
                            className="text-[10px] text-slate-400 font-mono shrink-0 bg-slate-50 px-1.5 py-0.5 rounded-lg border border-slate-200"
                            style={{ fontFamily: "var(--font-outfit)" }}
                          >
                            {country.code}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          {country.eu && (
                            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold"
                              style={{ background: "rgba(13,27,75,0.07)", border: "1px solid rgba(13,27,75,0.18)", color: "#0d1b4b", fontFamily: "var(--font-outfit)" }}>
                              EU Member
                            </span>
                          )}
                          {country.schengen && (
                            <span
                              className="inline-flex items-center rounded-full bg-amber-50 border border-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-600"
                              style={{ fontFamily: "var(--font-outfit)" }}
                            >
                              Schengen
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className="relative mt-3 text-xs text-slate-500 leading-relaxed line-clamp-2"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {country.description.slice(0, 85)}…
                    </p>

                    {/* Route pills */}
                    <div className="relative mt-3 flex flex-wrap gap-1.5">
                      {country.supportedRoutes.map((r) => (
                        <span key={r} className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize"
                          style={{ background: "rgba(13,27,75,0.07)", border: "1px solid rgba(13,27,75,0.15)", color: "#0d1b4b", fontFamily: "var(--font-outfit)" }}>
                          {r}
                        </span>
                      ))}
                    </div>

                    {/* Footer row */}
                    <div className="relative mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={11} className="text-slate-400" />
                        <span
                          className="text-[11px] text-slate-400"
                          style={{ fontFamily: "var(--font-outfit)" }}
                        >
                          {country.capital}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all duration-300"
                        style={{ fontFamily: "var(--font-outfit)", color: "#0d1b4b" }}>
                        View routes <ArrowUpRight size={11} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
