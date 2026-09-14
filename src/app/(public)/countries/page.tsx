import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Search, Globe, ChevronRight, CheckCircle } from "lucide-react";
import { COUNTRIES, CATEGORY_LABELS } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = { title: "EU Countries – Immigration Destinations" };

export default function CountriesPage() {
  const active = COUNTRIES.filter((c) => c.status === "active");
  const schengen = active.filter((c) => c.schengen);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="gradient-hero py-14">
        <div className="page-container">
          <Breadcrumb items={[{ label: "Countries" }]} className="text-blue-200 mb-4" />
          <h1 className="text-4xl font-extrabold text-white font-heading">EU Immigration Countries</h1>
          <p className="mt-3 text-blue-200 max-w-xl">
            Explore immigration routes, requirements and processing information for {active.length} supported EU destinations.
          </p>
          <div className="mt-2 flex items-center gap-2 text-sm text-blue-200">
            <CheckCircle size={14} className="text-gold-400" />
            {schengen.length} Schengen Area countries covered
          </div>
        </div>
      </div>

      <div className="page-container py-10">
        <Disclaimer className="mb-8" />

        {/* Stats bar */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          {[
            { label: "Countries", value: active.length },
            { label: "Schengen", value: schengen.length },
            { label: "Routes", value: "30+" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-white border border-slate-100 p-4 text-center shadow-card">
              <p className="text-2xl font-bold text-brand-700">{s.value}</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((country) => (
            <Link key={country.id} href={`/countries/${country.id}`}>
              <Card hover className="h-full flex flex-col">
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <Image
                      src={country.flagUrl}
                      alt={`${country.name} flag`}
                      width={56}
                      height={38}
                      className="rounded-md shadow object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h2 className="font-bold text-slate-900 text-lg">{country.name}</h2>
                        <div className="flex gap-1">
                          {country.schengen && (
                            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
                              Schengen
                            </span>
                          )}
                          {country.eu && (
                            <span className="rounded-full bg-gold-50 px-2 py-0.5 text-xs font-medium text-gold-700">
                              EU
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">Capital: {country.capital} · Currency: {country.currency}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {country.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {country.supportedRoutes.map((r) => (
                      <span key={r} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 capitalize">
                        {CATEGORY_LABELS[r]}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-slate-400 flex items-center gap-1">
                    <Globe size={11} />
                    {country.processingInfo}
                  </p>
                </div>
                <div className="mt-auto px-5 py-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-brand-600">View routes</span>
                  <ChevronRight size={14} className="text-brand-400" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
