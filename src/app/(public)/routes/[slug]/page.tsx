import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle, ExternalLink, ArrowRight, Clock, Calendar, DollarSign, FileText } from "lucide-react";
import {
  IMMIGRATION_ROUTES, COUNTRIES, CATEGORY_LABELS, CATEGORY_COLORS,
  CATEGORY_DESCRIPTIONS, CATEGORY_ICONS,
} from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import type { ImmigrationCategory } from "@/types";

interface Props { params: { slug: string } }

// All valid slugs = route slugs + category names
const CATEGORIES: ImmigrationCategory[] = ["work", "study", "family", "residence", "visit", "special"];

export function generateStaticParams() {
  const routeParams = IMMIGRATION_ROUTES.map((r) => ({ slug: r.slug }));
  const catParams = CATEGORIES.map((c) => ({ slug: c }));
  return [...routeParams, ...catParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Category page
  if (CATEGORIES.includes(params.slug as ImmigrationCategory)) {
    const cat = params.slug as ImmigrationCategory;
    return { title: `${CATEGORY_LABELS[cat]} Routes – EU Immigration` };
  }
  // Route detail page
  const route = IMMIGRATION_ROUTES.find((r) => r.slug === params.slug);
  return { title: route ? `${route.name} – ${CATEGORY_LABELS[route.category]}` : "Route Not Found" };
}

export default function RouteOrCategoryPage({ params }: Props) {
  // ── Category listing page ──────────────────────────────────────────────────
  if (CATEGORIES.includes(params.slug as ImmigrationCategory)) {
    const cat = params.slug as ImmigrationCategory;
    const routes = IMMIGRATION_ROUTES.filter((r) => r.category === cat && r.status === "active");

    return (
      <div className="bg-slate-50 min-h-screen">
        <div className="gradient-hero py-14">
          <div className="page-container">
            <Breadcrumb
              items={[{ label: "Routes", href: "/routes" }, { label: CATEGORY_LABELS[cat] }]}
              className="text-blue-200 mb-4"
            />
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-3 ${CATEGORY_COLORS[cat]}`}>
              {CATEGORY_LABELS[cat]}
            </span>
            <h1 className="text-4xl font-extrabold text-white font-heading">
              {CATEGORY_LABELS[cat]} in Europe
            </h1>
            <p className="mt-3 text-blue-200 max-w-xl">{CATEGORY_DESCRIPTIONS[cat]}</p>
          </div>
        </div>

        <div className="page-container py-10">
          <Disclaimer className="mb-8" />

          {routes.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <p className="text-lg font-semibold">No active routes in this category yet.</p>
              <p className="text-sm mt-1">Check back soon or explore other categories.</p>
              <Link href="/routes" className="mt-4 inline-block">
                <Button variant="secondary">Browse All Routes</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {routes.map((route) => {
                const country = COUNTRIES.find((c) => c.id === route.countryId);
                return (
                  <Link key={route.id} href={`/routes/${route.slug}`}>
                    <Card hover className="h-full flex flex-col p-5">
                      <div className="flex items-center gap-3 mb-3">
                        {country && (
                          <Image
                            src={country.flagUrl}
                            alt={country.name}
                            width={40}
                            height={28}
                            className="rounded-md shadow-sm object-cover"
                          />
                        )}
                        <div>
                          <p className="text-xs font-medium text-slate-500">{country?.name}</p>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[cat]}`}>
                            {CATEGORY_LABELS[cat]}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-slate-900 flex-1">{route.name}</h3>
                      <p className="mt-1 text-sm text-slate-500 line-clamp-2">{route.shortDescription}</p>
                      <div className="mt-3 flex gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Clock size={11} />{route.processingTime}</span>
                        <span className="flex items-center gap-1"><FileText size={11} />{route.requiredDocuments.length} docs</span>
                      </div>
                      <div className="mt-3 flex items-center gap-1 text-xs font-medium text-brand-600">
                        View requirements <ArrowRight size={11} />
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Related categories */}
          <div className="mt-14">
            <h2 className="text-lg font-bold text-slate-900 mb-5">Other Route Categories</h2>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.filter((c) => c !== cat).map((c) => (
                <Link key={c} href={`/routes/${c}`}>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium cursor-pointer hover:opacity-80 transition-opacity ${CATEGORY_COLORS[c]}`}>
                    {CATEGORY_LABELS[c]}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Individual route detail page ───────────────────────────────────────────
  const route = IMMIGRATION_ROUTES.find((r) => r.slug === params.slug);
  if (!route) notFound();

  const country = COUNTRIES.find((c) => c.id === route.countryId);
  const govFees = route.fees.filter((f) => f.type === "government");
  const svcFees = route.fees.filter((f) => f.type === "service");

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="gradient-hero py-14">
        <div className="page-container">
          <Breadcrumb
            items={[
              { label: "Routes", href: "/routes" },
              { label: CATEGORY_LABELS[route.category], href: `/routes/${route.category}` },
              { label: route.name },
            ]}
            className="text-blue-200 mb-5"
          />
          <div className="flex items-start gap-4">
            {country && (
              <Image
                src={country.flagUrl}
                alt={country.name}
                width={64}
                height={44}
                className="rounded-lg shadow object-cover mt-1"
              />
            )}
            <div>
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-2 ${CATEGORY_COLORS[route.category]}`}>
                {CATEGORY_LABELS[route.category]}
              </span>
              <h1 className="text-3xl font-extrabold text-white font-heading">{route.name}</h1>
              {country && <p className="text-blue-200 mt-1">{country.name}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="page-container py-10">
        <Disclaimer className="mb-8" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><h2 className="font-semibold text-slate-900">Overview</h2></CardHeader>
              <CardBody>
                <p className="text-sm text-slate-600 leading-relaxed">{route.description}</p>
              </CardBody>
            </Card>

            <Card>
              <CardHeader><h2 className="font-semibold text-slate-900">Key Eligibility Criteria</h2></CardHeader>
              <CardBody>
                <ul className="space-y-2.5">
                  {route.eligibilityHighlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle size={15} className="text-green-500 mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <Link href={`/eligibility?route=${route.id}`}>
                    <Button size="sm">Check My Eligibility <ArrowRight size={13} /></Button>
                  </Link>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader><h2 className="font-semibold text-slate-900">Required Documents</h2></CardHeader>
              <CardBody>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {route.requiredDocuments.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <FileText size={14} className="text-brand-500 mt-0.5 shrink-0" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardHeader><h2 className="font-semibold text-slate-900">Fees</h2></CardHeader>
              <CardBody>
                {govFees.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Government Fees</p>
                    {govFees.map((fee, i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-slate-100 last:border-0 text-sm">
                        <span className="text-slate-700">{fee.label}</span>
                        <span className="font-semibold text-slate-900">{formatCurrency(fee.amount, fee.currency)}</span>
                      </div>
                    ))}
                  </div>
                )}
                {svcFees.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Avensa Service Fee</p>
                    {svcFees.map((fee, i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-slate-100 last:border-0 text-sm">
                        <span className="text-slate-700">{fee.label}</span>
                        <span className="font-semibold text-slate-900">{formatCurrency(fee.amount, fee.currency)}</span>
                      </div>
                    ))}
                  </div>
                )}
                <p className="mt-3 text-xs text-slate-400">
                  Government fees are set by the national authority and subject to change. Avensa service fees are separate and non-refundable once services are delivered.
                </p>
              </CardBody>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <Card className="p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Facts</h3>
              <div className="space-y-3">
                {[
                  { icon: Clock, label: "Processing Time", value: route.processingTime },
                  { icon: Calendar, label: "Typical Duration", value: route.typicalDuration },
                  { icon: DollarSign, label: "Min. Gov. Fee", value: route.fees.length > 0 ? formatCurrency(route.fees[0].amount, route.fees[0].currency) : "—" },
                  { icon: FileText, label: "Documents Required", value: `${route.requiredDocuments.length} documents` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-brand-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">{label}</p>
                      <p className="text-sm font-semibold text-slate-900">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <p className="text-xs text-slate-400 mb-1">Rule Version</p>
              <p className="font-semibold text-slate-900">{route.version}</p>
              <p className="text-xs text-slate-400 mt-2 mb-1">Effective From</p>
              <p className="font-semibold text-slate-900">{formatDate(route.effectiveFrom)}</p>
              <p className="text-xs text-slate-400 mt-3">Last updated: {formatDate(route.updatedAt)}</p>
            </Card>

            <Card className="p-5">
              <h3 className="font-semibold text-slate-900 mb-2">Official Source</h3>
              <a
                href={route.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-800 font-medium"
              >
                Government Website <ExternalLink size={13} />
              </a>
              <p className="mt-2 text-xs text-slate-400">Always verify current requirements on the official government website before applying.</p>
            </Card>

            <Link href={`/eligibility?route=${route.id}`}>
              <Button className="w-full" size="lg">
                Check My Eligibility <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="secondary" className="w-full" size="lg">
                Start Application
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
