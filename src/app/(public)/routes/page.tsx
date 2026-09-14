import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Clock, FileText } from "lucide-react";
import { IMMIGRATION_ROUTES, COUNTRIES, CATEGORY_LABELS, CATEGORY_COLORS, CATEGORY_DESCRIPTIONS } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { ImmigrationCategory } from "@/types";

export const metadata: Metadata = { title: "Immigration Routes – All EU Routes" };

const categories: ImmigrationCategory[] = ["work", "study", "family", "residence", "visit", "special"];

export default function RoutesPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="gradient-hero py-14">
        <div className="page-container">
          <Breadcrumb items={[{ label: "Routes" }]} className="text-blue-200 mb-4" />
          <h1 className="text-4xl font-extrabold text-white font-heading">Immigration Routes</h1>
          <p className="mt-3 text-blue-200 max-w-xl">
            Browse all available immigration routes across supported EU countries. Select a category to filter.
          </p>
        </div>
      </div>

      <div className="page-container py-10">
        <Disclaimer className="mb-8" />

        {categories.map((cat) => {
          const catRoutes = IMMIGRATION_ROUTES.filter((r) => r.category === cat);
          if (catRoutes.length === 0) return null;
          return (
            <section key={cat} className="mb-12">
              <div className="flex items-end justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 capitalize">{CATEGORY_LABELS[cat]}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">{CATEGORY_DESCRIPTIONS[cat]}</p>
                </div>
                <Link href={`/routes/${cat}`}>
                  <Button variant="secondary" size="sm">See all <ChevronRight size={14} /></Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {catRoutes.map((route) => {
                  const country = COUNTRIES.find((c) => c.id === route.countryId);
                  return (
                    <Link key={route.id} href={`/routes/${route.slug}`}>
                      <Card hover className="h-full flex flex-col p-5">
                        <div className="flex items-center gap-3 mb-3">
                          {country && (
                            <Image src={country.flagUrl} alt={country.name} width={32} height={22} className="rounded shadow-sm object-cover" />
                          )}
                          <div>
                            <p className="text-xs text-slate-500">{country?.name}</p>
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[cat]}`}>
                              {CATEGORY_LABELS[cat]}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-slate-900">{route.name}</h3>
                        <p className="mt-1 text-sm text-slate-500 line-clamp-2 flex-1">{route.shortDescription}</p>
                        <div className="mt-3 flex gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1"><Clock size={11} />{route.processingTime}</span>
                          <span className="flex items-center gap-1"><FileText size={11} />{route.requiredDocuments.length} docs</span>
                        </div>
                      </Card>
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
