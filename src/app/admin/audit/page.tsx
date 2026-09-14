import type { Metadata } from "next";
import { Shield, Search, Download } from "lucide-react";
import { MOCK_AUDIT_LOGS } from "@/lib/mock-data";
import { formatDateTime, titleCase } from "@/lib/utils";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Audit Logs" };

const actionColor = (action: string): "blue" | "green" | "red" | "yellow" | "slate" => {
  if (action.includes("submit") || action.includes("created")) return "blue";
  if (action.includes("approved") || action.includes("completed")) return "green";
  if (action.includes("rejected") || action.includes("deleted")) return "red";
  if (action.includes("changed") || action.includes("published")) return "yellow";
  return "slate";
};

export default function AuditLogsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Audit Logs</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Immutable record of all security-sensitive and business-critical events.
          </p>
        </div>
        <Button variant="secondary" size="sm"><Download size={14} /> Export</Button>
      </div>

      <div className="mb-4 flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="form-input pl-9" placeholder="Search by action, actor, resource..." />
        </div>
        <select className="form-input w-44">
          <option>All Actions</option>
          <option>application.submitted</option>
          <option>document.verification</option>
          <option>rule.published</option>
          <option>auth.login</option>
        </select>
        <input type="date" className="form-input w-40" />
        <input type="date" className="form-input w-40" />
      </div>

      <Card>
        <CardBody className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Actor</th>
                <th>Role</th>
                <th>Action</th>
                <th>Resource</th>
                <th>Resource ID</th>
                <th>IP Address</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_AUDIT_LOGS.map((log) => (
                <tr key={log.id}>
                  <td className="text-xs text-slate-500 whitespace-nowrap">{formatDateTime(log.timestamp)}</td>
                  <td>
                    <p className="font-medium text-slate-800 text-xs">{log.actorEmail}</p>
                  </td>
                  <td>
                    <Badge variant="slate">{titleCase(log.actorRole.replace(/_/g, " "))}</Badge>
                  </td>
                  <td>
                    <Badge variant={actionColor(log.action)}>
                      <span className="font-mono text-xs">{log.action}</span>
                    </Badge>
                  </td>
                  <td className="text-xs text-slate-600">{log.resource}</td>
                  <td className="font-mono text-xs text-slate-500 max-w-[120px] truncate">{log.resourceId}</td>
                  <td className="font-mono text-xs text-slate-400">{log.ipAddress}</td>
                  <td>
                    {log.metadata && (
                      <Button variant="ghost" size="sm" className="text-xs">View</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400">Showing {MOCK_AUDIT_LOGS.length} of {MOCK_AUDIT_LOGS.length} events</p>
            <div className="flex gap-1">
              <Button variant="secondary" size="sm" disabled>Previous</Button>
              <Button variant="secondary" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="mt-4 flex items-start gap-2 text-xs text-slate-400">
        <Shield size={13} className="mt-0.5 shrink-0" />
        Audit logs are append-only and tamper-evident. Retention policy applies per data retention schedule.
        Contact compliance for historical exports beyond the displayed window.
      </div>
    </div>
  );
}
