import type { Metadata } from "next";
import Link from "next/link";
import { FileText, FolderOpen, Calendar, CreditCard, Bell, ArrowRight, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { MOCK_APPLICATIONS, MOCK_DOCUMENTS, MOCK_NOTIFICATIONS, MOCK_APPOINTMENTS } from "@/lib/mock-data";
import { COUNTRIES, IMMIGRATION_ROUTES, APPLICATION_STATUS_LABELS } from "@/lib/constants";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AppStatusBadge } from "@/components/ui/StatusBadge";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  const apps = MOCK_APPLICATIONS.filter((a) => a.applicantId === "u1");
  const pendingDocs = MOCK_DOCUMENTS.filter((d) => d.applicantId === "u1" && ["required", "rejected", "replacement_required"].includes(d.status));
  const unread = MOCK_NOTIFICATIONS.filter((n) => n.userId === "u1" && !n.read);
  const upcomingApt = MOCK_APPOINTMENTS.filter((a) => a.applicantId === "u1" && a.status === "scheduled")[0];

  const quickCards = [
    { label: "Applications", value: apps.length, icon: FileText, href: "/dashboard/applications", color: "bg-brand-50 text-brand-600" },
    { label: "Docs Pending", value: pendingDocs.length, icon: FolderOpen, href: "/dashboard/documents", color: "bg-amber-50 text-amber-600", alert: pendingDocs.length > 0 },
    { label: "Upcoming Appt.", value: upcomingApt ? formatDate(upcomingApt.date, "dd MMM") : "None", icon: Calendar, href: "/dashboard/appointments", color: "bg-purple-50 text-purple-600" },
    { label: "Notifications", value: unread.length, icon: Bell, href: "/dashboard/notifications", color: "bg-green-50 text-green-600", alert: unread.length > 0 },
  ];

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Welcome back, Priya</h1>
          <p className="text-slate-500 text-sm mt-0.5">Here's an overview of your immigration applications.</p>
        </div>
        <Link href="/dashboard/applications/new">
          <Button size="sm"><FileText size={15} /> New Application</Button>
        </Link>
      </div>

      {/* Quick stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-8">
        {quickCards.map((card) => (
          <Link key={card.label} href={card.href}>
            <Card hover className="p-5 relative">
              {card.alert && (
                <span className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
              )}
              <div className={`mb-3 h-10 w-10 rounded-xl flex items-center justify-center ${card.color}`}>
                <card.icon size={18} />
              </div>
              <p className="text-2xl font-bold text-slate-900">{card.value}</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{card.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Applications */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-900">My Applications</h2>
              <Link href="/dashboard/applications">
                <Button variant="ghost" size="sm">View All <ArrowRight size={13} /></Button>
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {apps.map((app) => {
                const country = COUNTRIES.find((c) => c.id === app.countryId);
                const route = IMMIGRATION_ROUTES.find((r) => r.id === app.routeId);
                return (
                  <Link key={app.id} href={`/dashboard/applications/${app.id}`}>
                    <div className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                      <div className="h-9 w-9 rounded-lg bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm shrink-0">
                        {country?.code}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">{route?.name ?? "Application"}</p>
                        <p className="text-xs text-slate-400">{app.referenceNumber}</p>
                      </div>
                      <AppStatusBadge status={app.status} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Action items */}
          {pendingDocs.length > 0 && (
            <Card className="border-amber-200 bg-amber-50">
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={16} className="text-amber-500" />
                  <h3 className="font-semibold text-amber-800 text-sm">Action Required</h3>
                </div>
                <p className="text-sm text-amber-700">
                  {pendingDocs.length} document{pendingDocs.length > 1 ? "s" : ""} require your attention.
                </p>
                <Link href="/dashboard/documents" className="mt-3 block">
                  <Button variant="gold" size="sm" className="w-full">
                    Review Documents <ArrowRight size={13} />
                  </Button>
                </Link>
              </div>
            </Card>
          )}

          {/* Upcoming appointment */}
          {upcomingApt && (
            <Card>
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-900 text-sm">Upcoming Appointment</h3>
              </div>
              <div className="p-5">
                <div className="flex items-start gap-2 mb-2">
                  <Calendar size={15} className="text-brand-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{formatDate(upcomingApt.date, "EEEE, dd MMMM yyyy")}</p>
                    <p className="text-xs text-slate-500">at {upcomingApt.time}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-2">{upcomingApt.location}</p>
                <p className="text-xs text-slate-400 mt-1">Code: {upcomingApt.confirmationCode}</p>
              </div>
            </Card>
          )}

          {/* Recent notifications */}
          <Card>
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900 text-sm">Notifications</h3>
              {unread.length > 0 && (
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">
                  {unread.length} new
                </span>
              )}
            </div>
            <div className="divide-y divide-slate-100">
              {MOCK_NOTIFICATIONS.filter((n) => n.userId === "u1").slice(0, 3).map((n) => (
                <div key={n.id} className={`flex items-start gap-3 px-5 py-3 ${!n.read ? "bg-brand-50/50" : ""}`}>
                  <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${!n.read ? "bg-brand-500" : "bg-slate-200"}`} />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">{n.title}</p>
                    <p className="text-xs text-slate-500 line-clamp-1">{n.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-slate-100">
              <Link href="/dashboard/notifications">
                <Button variant="ghost" size="sm" className="w-full text-xs">See All Notifications</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
