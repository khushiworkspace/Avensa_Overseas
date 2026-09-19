import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Users, Globe, TrendingUp, Briefcase } from "lucide-react";
import { MOCK_APPLICATIONS, MOCK_ANALYTICS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { AppStatusBadge } from "@/components/ui/StatusBadge";
import { COUNTRIES, IMMIGRATION_ROUTES } from "@/lib/constants";
import { LeadStatsWidget } from "@/components/admin/LeadStatsWidget";

export const metadata: Metadata = { title: "Admin Dashboard — Avensa" };

export default function AdminDashboardPage() {
  const recentApps = MOCK_APPLICATIONS.slice(0, 5);

  return (
    <div className="space-y-8">

      {/* ── Page header ── */}
      <div>
        <div className="section-eyebrow mb-3 w-fit">
          <TrendingUp size={10} /> Overview
        </div>
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-syne)", color: "#0d1b4b" }}
        >
          Admin Dashboard
        </h1>
        <p
          className="text-sm text-slate-500 mt-0.5"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Platform overview and key metrics.
        </p>
      </div>

      {/* ── Lead stats — live from MongoDB (Client Component) ── */}
      <LeadStatsWidget />

      {/* ── Divider ── */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px" style={{ background: "rgba(13,27,75,0.08)" }} />
        <span
          className="text-[11px] font-semibold uppercase tracking-wider text-slate-400"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Applications
        </span>
        <div className="flex-1 h-px" style={{ background: "rgba(13,27,75,0.08)" }} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* ── Recent applications ── */}
        <div className="lg:col-span-2">
          <div
            className="rounded-3xl bg-white overflow-hidden"
            style={{
              border: "1px solid rgba(13,27,75,0.10)",
              boxShadow: "0 1px 4px rgba(13,27,75,0.07)",
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{
                borderBottom: "1px solid rgba(13,27,75,0.08)",
                background: "rgba(13,27,75,0.02)",
              }}
            >
              <h2
                className="text-sm font-bold"
                style={{ fontFamily: "var(--font-syne)", color: "#0d1b4b" }}
              >
                Recent Applications
              </h2>
              <Link
                href="/admin/applications"
                className="text-xs font-semibold transition-colors hover:opacity-80"
                style={{ color: "#F5A623", fontFamily: "var(--font-outfit)" }}
              >
                View All →
              </Link>
            </div>

            {/* Table — pure CSS hover via Tailwind */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    {["Reference", "Applicant", "Route", "Submitted", "Status"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
                        style={{
                          fontFamily: "var(--font-outfit)",
                          borderBottom: "1px solid rgba(13,27,75,0.06)",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentApps.map((app) => {
                    const route   = IMMIGRATION_ROUTES.find((r) => r.id === app.routeId);
                    const country = COUNTRIES.find((c) => c.id === app.countryId);
                    return (
                      <tr
                        key={app.id}
                        className="transition-colors hover:bg-[rgba(13,27,75,0.025)]"
                        style={{ borderBottom: "1px solid rgba(13,27,75,0.05)" }}
                      >
                        <td
                          className="px-5 py-3.5 font-mono text-xs"
                          style={{ color: "#64748b" }}
                        >
                          {app.referenceNumber}
                        </td>
                        <td
                          className="px-5 py-3.5 font-semibold"
                          style={{ color: "#0d1b4b", fontFamily: "var(--font-syne)" }}
                        >
                          {app.personalDetails.firstName} {app.personalDetails.lastName}
                        </td>
                        <td
                          className="px-5 py-3.5 text-xs"
                          style={{ color: "#64748b", fontFamily: "var(--font-outfit)" }}
                        >
                          {route?.name} · {country?.name}
                        </td>
                        <td
                          className="px-5 py-3.5 text-xs"
                          style={{ color: "#94a3b8", fontFamily: "var(--font-outfit)" }}
                        >
                          {app.submittedAt ? formatDate(app.submittedAt) : "Draft"}
                        </td>
                        <td className="px-5 py-3.5">
                          <AppStatusBadge status={app.status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Right sidebar ── */}
        <div className="space-y-4">

          {/* Quick Actions */}
          <div
            className="rounded-3xl bg-white overflow-hidden"
            style={{
              border: "1px solid rgba(13,27,75,0.10)",
              boxShadow: "0 1px 4px rgba(13,27,75,0.07)",
            }}
          >
            <div
              className="px-5 py-4"
              style={{
                borderBottom: "1px solid rgba(13,27,75,0.08)",
                background: "rgba(13,27,75,0.02)",
              }}
            >
              <h3
                className="text-sm font-bold"
                style={{ fontFamily: "var(--font-syne)", color: "#0d1b4b" }}
              >
                Quick Actions
              </h3>
            </div>
            <div className="p-3 space-y-1">
              {[
                { label: "Manage Leads",    href: "/admin/leads",    icon: Briefcase  },
                { label: "Manage Users",    href: "/admin/users",    icon: Users      },
                { label: "Edit Countries",  href: "/admin/countries",icon: Globe      },
                { label: "Rules Engine",    href: "/admin/rules",    icon: TrendingUp },
                { label: "View Audit Logs", href: "/admin/audit",    icon: FileText   },
              ].map(({ label, href, icon: Icon }) => (
                <Link key={href} href={href}>
                  <div
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200
                               hover:bg-[rgba(13,27,75,0.04)] hover:border-[rgba(13,27,75,0.10)]
                               border border-transparent"
                  >
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-lg"
                      style={{
                        background: "rgba(245,166,35,0.10)",
                        border: "1px solid rgba(245,166,35,0.20)",
                      }}
                    >
                      <Icon size={13} style={{ color: "#E8971A" }} />
                    </div>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#0d1b4b", fontFamily: "var(--font-outfit)" }}
                    >
                      {label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Applications by country */}
          <div
            className="rounded-3xl bg-white overflow-hidden"
            style={{
              border: "1px solid rgba(13,27,75,0.10)",
              boxShadow: "0 1px 4px rgba(13,27,75,0.07)",
            }}
          >
            <div
              className="px-5 py-4"
              style={{
                borderBottom: "1px solid rgba(13,27,75,0.08)",
                background: "rgba(13,27,75,0.02)",
              }}
            >
              <h3
                className="text-sm font-bold"
                style={{ fontFamily: "var(--font-syne)", color: "#0d1b4b" }}
              >
                Applications by Country
              </h3>
            </div>
            <div className="p-5 space-y-3">
              {MOCK_ANALYTICS.applicationsByCountry.slice(0, 6).map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span
                    className="text-xs font-medium w-20 shrink-0 truncate text-slate-500"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {item.name}
                  </span>
                  <div
                    className="flex-1 h-1.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(13,27,75,0.08)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(item.value / 142) * 100}%`,
                        background: "linear-gradient(90deg, #0d1b4b, #F5A623)",
                      }}
                    />
                  </div>
                  <span
                    className="text-xs font-bold w-7 text-right"
                    style={{ color: "#0d1b4b", fontFamily: "var(--font-outfit)" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
