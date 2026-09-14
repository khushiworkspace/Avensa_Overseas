import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Users, Globe, TrendingUp, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { MOCK_APPLICATIONS, MOCK_ANALYTICS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { StatCard } from "@/components/ui/StatCard";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { AppStatusBadge } from "@/components/ui/StatusBadge";
import { COUNTRIES, IMMIGRATION_ROUTES } from "@/lib/constants";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default function AdminDashboardPage() {
  const recentApps = MOCK_APPLICATIONS.slice(0, 5);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 font-heading">Admin Dashboard</h1>
        <p className="text-slate-500 text-sm mt-0.5">Platform overview and key metrics.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-8">
        {MOCK_ANALYTICS.metrics.map((m) => (
          <StatCard
            key={m.label}
            label={m.label}
            value={m.value}
            change={m.change}
            trend={m.trend}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent applications */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-900">Recent Applications</h2>
                <Link href="/admin/applications" className="text-xs text-brand-600 font-medium hover:text-brand-800">
                  View All
                </Link>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Applicant</th>
                    <th>Route</th>
                    <th>Submitted</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApps.map((app) => {
                    const route = IMMIGRATION_ROUTES.find((r) => r.id === app.routeId);
                    const country = COUNTRIES.find((c) => c.id === app.countryId);
                    return (
                      <tr key={app.id}>
                        <td className="font-mono text-xs">{app.referenceNumber}</td>
                        <td className="font-medium text-slate-800">
                          {app.personalDetails.firstName} {app.personalDetails.lastName}
                        </td>
                        <td className="text-slate-500 text-xs">{route?.name} · {country?.name}</td>
                        <td className="text-xs text-slate-400">
                          {app.submittedAt ? formatDate(app.submittedAt) : "Draft"}
                        </td>
                        <td><AppStatusBadge status={app.status} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: "Manage Users", href: "/admin/users", icon: Users },
                { label: "Edit Countries", href: "/admin/countries", icon: Globe },
                { label: "Rules Engine", href: "/admin/rules", icon: TrendingUp },
                { label: "View Audit Logs", href: "/admin/audit", icon: FileText },
              ].map(({ label, href, icon: Icon }) => (
                <Link key={href} href={href}>
                  <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-slate-50 transition-colors">
                    <Icon size={15} className="text-brand-600 shrink-0" />
                    <span className="text-sm font-medium text-slate-700">{label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* Applications by country */}
          <Card className="p-5">
            <h3 className="font-semibold text-slate-900 mb-4">Applications by Country</h3>
            <div className="space-y-2">
              {MOCK_ANALYTICS.applicationsByCountry.slice(0, 6).map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 w-24 shrink-0">{item.name}</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-500 rounded-full"
                      style={{ width: `${(item.value / 142) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 w-8 text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
