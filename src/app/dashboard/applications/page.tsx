import type { Metadata } from "next";
import Link from "next/link";
import { Plus, FileText } from "lucide-react";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";
import { COUNTRIES, IMMIGRATION_ROUTES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AppStatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "My Applications" };

export default function ApplicationsPage() {
  const apps = MOCK_APPLICATIONS.filter((a) => a.applicantId === "u1");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">My Applications</h1>
          <p className="text-slate-500 text-sm mt-0.5">{apps.length} application{apps.length !== 1 ? "s" : ""} found</p>
        </div>
        <Link href="/dashboard/applications/new">
          <Button size="sm"><Plus size={15} /> New Application</Button>
        </Link>
      </div>

      {apps.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No applications yet"
          description="Start a new application to begin your EU immigration journey."
          action={{ label: "New Application", onClick: () => { window.location.href = "/dashboard/applications/new"; } }}
        />
      ) : (
        <Card>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Country</th>
                <th>Route</th>
                <th>Submitted</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {apps.map((app) => {
                const country = COUNTRIES.find((c) => c.id === app.countryId);
                const route = IMMIGRATION_ROUTES.find((r) => r.id === app.routeId);
                return (
                  <tr key={app.id}>
                    <td className="font-mono text-xs font-medium text-slate-700">{app.referenceNumber}</td>
                    <td>
                      <span className="font-medium text-slate-800">{country?.name ?? "—"}</span>
                    </td>
                    <td className="text-slate-600">{route?.name ?? "—"}</td>
                    <td className="text-slate-500 text-xs">
                      {app.submittedAt ? formatDate(app.submittedAt) : <span className="italic">Draft</span>}
                    </td>
                    <td><AppStatusBadge status={app.status} /></td>
                    <td>
                      <Link href={`/dashboard/applications/${app.id}`}>
                        <Button variant="ghost" size="sm">View</Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
