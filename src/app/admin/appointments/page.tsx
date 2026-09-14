import type { Metadata } from "next";
import { Calendar, MapPin, Clock } from "lucide-react";
import { MOCK_APPOINTMENTS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Appointments Management" };

const statusColor: Record<string, "blue" | "green" | "slate" | "red" | "yellow"> = {
  scheduled: "blue", confirmed: "green", completed: "green",
  cancelled: "slate", rescheduled: "yellow", no_show: "red",
};

export default function AdminAppointmentsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Appointments</h1>
          <p className="text-slate-500 text-sm mt-0.5">{MOCK_APPOINTMENTS.length} appointments on record.</p>
        </div>
        <Button size="sm"><Calendar size={15} /> Add Slot</Button>
      </div>

      <Card>
        <CardBody className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Type</th>
                <th>Location</th>
                <th>Date &amp; Time</th>
                <th>Duration</th>
                <th>Code</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_APPOINTMENTS.map((apt) => (
                <tr key={apt.id}>
                  <td className="text-xs text-slate-600">{apt.applicantId}</td>
                  <td className="capitalize text-sm">{apt.type.replace(/_/g, " ")}</td>
                  <td>
                    <div className="flex items-start gap-1.5 max-w-[180px]">
                      <MapPin size={12} className="text-slate-400 mt-0.5 shrink-0" />
                      <span className="text-xs text-slate-700 truncate">{apt.location}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5 text-xs text-slate-700">
                      <Clock size={12} className="text-slate-400" />
                      {formatDate(apt.date)} {apt.time}
                    </div>
                  </td>
                  <td className="text-xs text-slate-500">{apt.duration} min</td>
                  <td className="font-mono text-xs text-slate-600">{apt.confirmationCode}</td>
                  <td>
                    <Badge variant={statusColor[apt.status] ?? "slate"}>
                      {apt.status.replace(/_/g, " ")}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-red-500">Cancel</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
