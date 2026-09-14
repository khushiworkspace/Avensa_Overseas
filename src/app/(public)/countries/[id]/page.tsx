import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalLink, ArrowRight, CheckCircle, ChevronRight, Globe } from "lucide-react";
import { COUNTRIES, IMMIGRATION_ROUTES, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface Props { params: { id: string } }

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const country = COUNTRIES.find((c) => c.id === params.id);
  return { title: country ? `${country.name} Immigration Routes` : "Country Not Found" };
}

export default function CountryDetailPage({ params }: Props) {
  const country = COUNTRIES.find((c) => c.id === params.id);
  if (!country) notFound();

  const routes = IMMIGRATION_ROUTES.filter((r) => r.countryId === country.id);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <div className="gradient-hero py-14">
        <div className="page-container">
          <Breadcrumb
            items={[{ label: "Countries", href: "/countries" }, { label: country.name }]}
            className="text-blue-200 mb-5"
          />
          <div className="flex items-center gap-5">
            <Image
              src={country.flagUrl}
              alt={`${country.name} flag`}
              width={80}
              height={54}
              className="rounded-lg shadow-lg object-cover"
            />
            <div>
              <h1 className="text-4xl font-extrabold text-white font-heading">{country.name}</h1>
              <div className="mt-2 flex flex-wrap gap-2">
                {country.eu && <Badge variant="yellow">EU Member</Badge>}
                {country.schengen && <Badge variant="blue">Schengen Area</Badge>}
                <Badge variant="slate">Capital: {country.capital}</Badge>
                <Badge variant="slate">Currency: {country.currency}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-container py-10">
        <Disclaimer className="mb-8" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Routes */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900 mb-5">Available Immigration Routes</h2>
            {routes.length === 0 ? (
              <p className="text-slate-500">Route details coming soon for this country.</p>
            ) : (
              <div className="space-y-4">
                {routes.map((route) => (
                  <Card key={route.id} hover className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${CATEGORY_COLORS[route.category]}`}>
                            {CATEGORY_LABELS[route.category]}
                          </span>
                          {route.status === "active" && (
                            <span className="flex items-center gap-1 text-xs text-green-600">
                              <CheckCircle size={11} /> Active
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-semibold text-slate-900">{route.name}</h3>
                        <p className="mt-1 text-sm text-slate-500 line-clamp-2">{route.shortDescription}</p>
                        <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                          <span>⏱ Processing: {route.processingTime}</span>
                          <span>📅 Duration: {route.typicalDuration}</span>
                          <span>📋 Version: {route.version}</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-400 shrink-0 mt-1" />
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <Link href={`/routes/${route.slug}`}>
                        <Button size="sm" variant="outline">View Requirements</Button>
                      </Link>
                      <Link href={`/eligibility?country=${country.id}&route=${route.id}`}>
                        <Button size="sm">Check Eligibility <ArrowRight size={13} /></Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <Card className="p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Country Overview</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{country.description}</p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Capital</span>
                  <span className="font-medium text-slate-800">{country.capital}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Languages</span>
                  <span className="font-medium text-slate-800">{country.languages.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Currency</span>
                  <span className="font-medium text-slate-800">{country.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Schengen</span>
                  <span className="font-medium text-slate-800">{country.schengen ? "Yes" : "No"}</span>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="font-semibold text-slate-900 mb-3">Processing Information</h3>
              <p className="text-sm text-slate-600">{country.processingInfo}</p>
            </Card>

            <Card className="p-5">
              <h3 className="font-semibold text-slate-900 mb-3">Official Source</h3>
              <a
                href={country.officialImmigrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-800 transition-colors font-medium"
              >
                <Globe size={14} />
                Official Immigration Authority
                <ExternalLink size={13} />
              </a>
              <p className="mt-2 text-xs text-slate-400">
                Always verify current requirements on the official government website.
              </p>
            </Card>

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
