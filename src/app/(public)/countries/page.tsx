import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Globe, CheckCircle, ChevronRight, ArrowUpRight, MapPin, Zap } from "lucide-react";
import { COUNTRIES } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Disclaimer } from "@/components/ui/Disclaimer";

export const metadata: Metadata = { title: "EU Countries – Supported Immigration Destinations" };

const activeCountries = COUNTRIES.filter((c) => c.status === "active");

export default function CountriesPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>

      {/* ── Hero ── */}
      <div className="gradient-hero py-20">
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
              Full application support for all major European immigration destinations.
              Select a country to explore its available routes.
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
                <Icon size={13} className="text-indigo-300" />
                <span
                  className="text-xs font-semibold text-white/75"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Disclaimer ── */}
      <div className="page-container pt-10">
        <Disclaimer />
      </div>

      {/* ── Country grid ── */}
      <div className="page-container py-12">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {activeCountries.map((country, i) => (
            <Link
              key={country.id}
              href={`/countries/${country.id}`}
              className="group block animate-fade-up"
              style={{ animationDelay: `${i * 0.04}s`, animationFillMode: "both" }}
            >
              <div className="relative flex flex-col h-full p-6 rounded-3xl bg-white border border-slate-200/70 shadow-card overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-card-hover group-hover:border-indigo-300/50">

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(90deg,transparent,rgba(79,70,229,0.6),transparent)" }} />

                {/* Inner glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                  style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(79,70,229,0.04),transparent 70%)" }} />

                {/* Flag + name */}
                <div className="relative flex items-center gap-4">
                  <Image
                    src={country.flagUrl}
                    alt={`${country.name} flag`}
                    width={60}
                    height={40}
                    className="rounded-xl shadow-sm object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className="font-bold text-ink group-hover:text-indigo-700 transition-colors truncate"
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
                        <span className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-600"
                          style={{ fontFamily: "var(--font-outfit)" }}>
                          EU Member
                        </span>
                      )}
                      {country.schengen && (
                        <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-600"
                          style={{ fontFamily: "var(--font-outfit)" }}>
                          Schengen
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p
                  className="relative mt-4 text-xs text-slate-500 leading-relaxed line-clamp-2"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {country.description.slice(0, 85)}…
                </p>

                {/* Route pills */}
                <div className="relative mt-3 flex flex-wrap gap-1.5">
                  {country.supportedRoutes.map(r => (
                    <span
                      key={r}
                      className="rounded-full bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-600 capitalize"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {r}
                    </span>
                  ))}
                </div>

                {/* Footer row */}
                <div className="relative mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={11} className="text-slate-400" />
                    <span className="text-[11px] text-slate-400" style={{ fontFamily: "var(--font-outfit)" }}>
                      {country.capital}
                    </span>
                  </div>
                  <span
                    className="flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:gap-2 transition-all duration-300"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    View routes <ArrowUpRight size={11} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
