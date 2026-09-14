import type { Metadata } from "next";
import { Calendar, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { MOCK_APPOINTMENTS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Appointments" };

const statusColors: Record<string, "blue" | "green" | "slate" | "red"> = {
  scheduled: "blue", confirmed: "green", completed: "green",
  cancelled: "slate", rescheduled: "yellow" as "blue", no_show: "red",
};

export default function AppointmentsPage() {
  const appointments = MOCK_APPOINTMENTS.filter((a) => a.applicantId === "u1");
  const upcoming = appointments.filter((a) => ["scheduled", "confirmed"].includes(a.status));
  const past = appointments.filter((a) => ["completed", "cancelled", "no_show"].includes(a.status));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Appointments</h1>
          <p className="text-slate-500 text-sm mt-0.5">{upcoming.length} upcoming · {past.length} past</p>
        </div>
        <Button size="sm"><Calendar size={15} /> Book Appointment</Button>
      </div>

      {upcoming.length === 0 && past.length === 0 ? (
        <EmptyState icon={Calendar} title="No appointments yet"
          description="Appointments will appear here once scheduled during your application process." />
      ) : (
        <div className="space-y-6">
          {upcoming.length > 0 && (
            <Card>
              <CardHeader><h2 className="font-semibold text-slate-900">Upcoming Appointments</h2></CardHeader>
              <CardBody className="space-y-4">
                {upcoming.map((apt) => (
                  <div key={apt.id} className="rounded-xl border border-brand-200 bg-brand-50 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={statusColors[apt.status] ?? "slate"}>{apt.status.replace("_", " ")}</Badge>
                          <span className="text-xs text-slate-500 capitalize">{apt.type.replace("_", " ")}</span>
                        </div>
                        <p className="font-semibold text-slate-900">{apt.location}</p>
                        <div className="mt-2 space-y-1.5">
                          <p className="flex items-center gap-1.5 text-sm text-slate-600">
                            <Calendar size={13} className="text-brand-500" />
                            {formatDate(apt.date, "EEEE, dd MMMM yyyy")}
                          </p>
                          <p className="flex items-center gap-1.5 text-sm text-slate-600">
                            <Clock size={13} className="text-brand-500" />
                            {apt.time} · {apt.duration} minutes
                          </p>
                          <p className="flex items-center gap-1.5 text-sm text-slate-600">
                            <MapPin size={13} className="text-brand-500" />
                            {apt.address}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-slate-400 mb-1">Confirmation Code</p>
                        <p className="font-mono text-sm font-bold text-slate-900">{apt.confirmationCode}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="secondary" size="sm">Reschedule</Button>
                      <Button variant="danger" size="sm">Cancel</Button>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          )}

          {past.length > 0 && (
            <Card>
              <CardHeader><h2 className="font-semibold text-slate-900">Past Appointments</h2></CardHeader>
              <CardBody className="space-y-3">
                {past.map((apt) => (
                  <div key={apt.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={statusColors[apt.status] ?? "slate"}>{apt.status}</Badge>
                        <span className="text-xs text-slate-500 capitalize">{apt.type.replace("_", " ")}</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-700">{apt.location}</p>
                      <p className="text-xs text-slate-400 mt-1">{formatDate(apt.date)} · {apt.time}</p>
                    </div>
                    <CheckCircle size={18} className={apt.status === "completed" ? "text-green-500" : "text-slate-300"} />
                  </div>
                ))}
              </CardBody>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
