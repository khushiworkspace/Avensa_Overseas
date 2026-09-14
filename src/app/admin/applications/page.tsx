import type { Metadata } from "next";
import Link from "next/link";
import { Search, Filter, Download } from "lucide-react";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";
import { COUNTRIES, IMMIGRATION_ROUTES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Card, CardBody } from "@/components/ui/Card";
import { AppStatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Applications Management" };

export default function AdminApplicationsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Applications</h1>
          <p className="text-slate-500 text-sm mt-0.5">{MOCK_APPLICATIONS.length} total applications</p>
        </div>
        <Button variant="secondary" size="sm"><Download size={14} /> Export CSV</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="form-input pl-9" placeholder="Search by name, ref..." />
        </div>
        <select className="form-input w-44">
          <option value="">All Countries</option>
          {COUNTRIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select className="form-input w-44">
          <option value="">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="submitted">Submitted</option>
          <option value="document_review">Document Review</option>
          <option value="under_review">Under Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <Button variant="secondary" size="sm"><Filter size={14} /> Filter</Button>
      </div>

      <Card>
        <CardBody className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Applicant</th>
                <th>Country</th>
                <th>Route</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Assigned Officer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_APPLICATIONS.map((app) => {
                const country = COUNTRIES.find((c) => c.id === app.countryId);
                const route = IMMIGRATION_ROUTES.find((r) => r.id === app.routeId);
                return (
                  <tr key={app.id}>
                    <td className="font-mono text-xs">{app.referenceNumber}</td>
                    <td>
                      <p className="font-medium text-slate-800">
                        {app.personalDetails.firstName} {app.personalDetails.lastName}
                      </p>
                      <p className="text-xs text-slate-400">{app.personalDetails.nationality}</p>
                    </td>
                    <td className="text-sm">{country?.name ?? "—"}</td>
                    <td className="text-xs text-slate-600 max-w-[120px] truncate">{route?.name ?? "—"}</td>
                    <td className="text-xs text-slate-500">
                      {app.submittedAt ? formatDate(app.submittedAt) : <span className="italic text-slate-300">Draft</span>}
                    </td>
                    <td><AppStatusBadge status={app.status} /></td>
                    <td className="text-xs text-slate-500">
                      {app.assignedOfficerId ? "Anna Weber" : <span className="text-slate-300 italic">Unassigned</span>}
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <Link href={`/officer/cases/${app.id}`}>
                          <Button variant="ghost" size="sm">View</Button>
                        </Link>
                        <Button variant="ghost" size="sm">Assign</Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
