import type { Metadata } from "next";
import Link from "next/link";
import { Clock, AlertTriangle, User, ChevronRight, Filter } from "lucide-react";
import { MOCK_APPLICATIONS, MOCK_CASE_ASSIGNMENTS } from "@/lib/mock-data";
import { COUNTRIES, IMMIGRATION_ROUTES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { AppStatusBadge } from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";

export const metadata: Metadata = { title: "Officer Queue" };

const priorityColor: Record<string, "red" | "yellow" | "blue" | "slate"> = {
  urgent: "red", high: "red", medium: "yellow", low: "slate",
};

export default function OfficerQueuePage() {
  const assignments = MOCK_CASE_ASSIGNMENTS.filter((ca) => ca.officerId === "o1" && ca.status === "active");
  const apps = MOCK_APPLICATIONS.filter((a) =>
    assignments.some((ca) => ca.applicationId === a.id)
  );

  const stats = [
    { label: "Assigned Cases", value: assignments.length, change: 2, trend: "up" as const },
    { label: "Due Today", value: 1, change: 0, trend: "neutral" as const },
    { label: "Overdue", value: 0, change: 0, trend: "neutral" as const },
    { label: "Completed (Month)", value: 8, change: 15, trend: "up" as const },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 font-heading">My Queue</h1>
        <p className="text-slate-500 text-sm mt-0.5">Cases assigned to you requiring action.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-8">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} change={s.change} trend={s.trend} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Active Cases</h2>
            <Button variant="secondary" size="sm"><Filter size={14} /> Filter</Button>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          {apps.length === 0 ? (
            <p className="px-5 py-8 text-center text-slate-400 text-sm">No cases in your queue.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {apps.map((app) => {
                const country = COUNTRIES.find((c) => c.id === app.countryId);
                const route = IMMIGRATION_ROUTES.find((r) => r.id === app.routeId);
                const assignment = assignments.find((ca) => ca.applicationId === app.id);

                return (
                  <Link key={app.id} href={`/officer/cases/${app.id}`}>
                    <div className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="h-10 w-10 rounded-lg bg-brand-100 flex items-center justify-center text-brand-700 font-bold shrink-0">
                        {country?.code}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-semibold text-slate-900 truncate">{route?.name}</p>
                          {assignment && (
                            <Badge variant={priorityColor[assignment.priority]}>
                              {assignment.priority}
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <User size={11} />
                            {app.personalDetails.firstName} {app.personalDetails.lastName}
                          </span>
                          <span className="font-mono">{app.referenceNumber}</span>
                          {assignment?.dueDate && (
                            <span className="flex items-center gap-1">
                              <Clock size={11} />
                              Due: {formatDate(assignment.dueDate)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <AppStatusBadge status={app.status} />
                        <ChevronRight size={15} className="text-slate-400" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
