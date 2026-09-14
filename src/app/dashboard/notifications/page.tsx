import type { Metadata } from "next";
import { Bell, CheckCheck, FileText, Calendar, AlertTriangle, Info } from "lucide-react";
import { MOCK_NOTIFICATIONS } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import Link from "next/link";
import type { NotificationType } from "@/types";

export const metadata: Metadata = { title: "Notifications" };

const typeIcon: Record<NotificationType, React.ElementType> = {
  application_submitted: FileText,
  document_requested: AlertTriangle,
  document_accepted: CheckCheck,
  document_rejected: AlertTriangle,
  appointment_booked: Calendar,
  appointment_reminder: Calendar,
  status_changed: Bell,
  message_received: Bell,
  payment_received: CheckCheck,
  general: Info,
};

const typeColor: Record<NotificationType, string> = {
  application_submitted: "bg-brand-100 text-brand-600",
  document_requested: "bg-amber-100 text-amber-600",
  document_accepted: "bg-green-100 text-green-600",
  document_rejected: "bg-red-100 text-red-600",
  appointment_booked: "bg-purple-100 text-purple-600",
  appointment_reminder: "bg-purple-100 text-purple-600",
  status_changed: "bg-brand-100 text-brand-600",
  message_received: "bg-slate-100 text-slate-600",
  payment_received: "bg-green-100 text-green-600",
  general: "bg-slate-100 text-slate-600",
};

export default function NotificationsPage() {
  const notifications = MOCK_NOTIFICATIONS.filter((n) => n.userId === "u1").sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const unread = notifications.filter((n) => !n.read);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Notifications</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {unread.length} unread · {notifications.length} total
          </p>
        </div>
        {unread.length > 0 && (
          <Button variant="secondary" size="sm">
            <CheckCheck size={14} /> Mark All Read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description="You'll receive notifications here about your applications, documents and appointments."
        />
      ) : (
        <Card>
          <CardHeader>
            <div className="flex gap-3">
              <button className="text-xs font-semibold text-brand-600 border-b-2 border-brand-600 pb-1">All</button>
              <button className="text-xs font-medium text-slate-400 hover:text-slate-700 pb-1">Unread ({unread.length})</button>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-slate-100">
              {notifications.map((notif) => {
                const Icon = typeIcon[notif.type];
                const iconCls = typeColor[notif.type];
                return (
                  <div
                    key={notif.id}
                    className={`flex items-start gap-4 px-5 py-4 transition-colors ${
                      !notif.read ? "bg-brand-50/40 hover:bg-brand-50/60" : "hover:bg-slate-50"
                    }`}
                  >
                    <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${iconCls}`}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm font-semibold ${!notif.read ? "text-slate-900" : "text-slate-700"}`}>
                          {notif.title}
                        </p>
                        <div className="flex items-center gap-2 shrink-0">
                          {!notif.read && (
                            <span className="h-2 w-2 rounded-full bg-brand-500" />
                          )}
                          <span className="text-xs text-slate-400 whitespace-nowrap">
                            {formatDateTime(notif.createdAt)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{notif.message}</p>
                      {notif.actionUrl && (
                        <Link
                          href={notif.actionUrl}
                          className="mt-2 inline-block text-xs font-medium text-brand-600 hover:text-brand-800"
                        >
                          View details →
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
