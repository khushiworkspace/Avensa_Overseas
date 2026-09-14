import type { Metadata } from "next";
import { Bell, Plus, Edit, Send } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Notification Templates" };

const TEMPLATES = [
  { id: "tpl-001", name: "Application Submitted", channel: "email", trigger: "application.submitted", status: "active", lastSent: "2024-06-18" },
  { id: "tpl-002", name: "Document Requested", channel: "email", trigger: "document.requested", status: "active", lastSent: "2024-06-15" },
  { id: "tpl-003", name: "Document Accepted", channel: "email", trigger: "document.accepted", status: "active", lastSent: "2024-06-05" },
  { id: "tpl-004", name: "Document Rejected", channel: "email", trigger: "document.rejected", status: "active", lastSent: "2024-06-05" },
  { id: "tpl-005", name: "Appointment Confirmation", channel: "email", trigger: "appointment.booked", status: "active", lastSent: "2024-06-10" },
  { id: "tpl-006", name: "Appointment Reminder (48h)", channel: "sms", trigger: "appointment.reminder", status: "active", lastSent: "2024-06-13" },
  { id: "tpl-007", name: "Status Changed", channel: "push", trigger: "application.status.changed", status: "active", lastSent: "2024-06-18" },
  { id: "tpl-008", name: "Appointment Reminder (In-App)", channel: "in_app", trigger: "appointment.reminder", status: "active", lastSent: "2024-06-13" },
];

const channelColor: Record<string, "blue" | "green" | "purple" | "yellow"> = {
  email: "blue", sms: "green", push: "purple", in_app: "yellow",
};

export default function NotificationTemplatesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Notification Templates</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage email, SMS, push and in-app notification templates.</p>
        </div>
        <Button size="sm"><Plus size={15} /> New Template</Button>
      </div>

      {/* Channel summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {(["email", "sms", "push", "in_app"] as const).map((ch) => {
          const count = TEMPLATES.filter((t) => t.channel === ch).length;
          return (
            <Card key={ch} className="p-4 text-center">
              <p className="text-xl font-bold text-slate-900">{count}</p>
              <p className="text-xs text-slate-500 mt-0.5 uppercase tracking-wide">{ch.replace("_", " ")}</p>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-slate-900">All Templates</h2>
        </CardHeader>
        <CardBody className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Template Name</th>
                <th>Channel</th>
                <th>Trigger Event</th>
                <th>Last Sent</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {TEMPLATES.map((tpl) => (
                <tr key={tpl.id}>
                  <td className="font-medium text-slate-800">{tpl.name}</td>
                  <td>
                    <Badge variant={channelColor[tpl.channel]}>{tpl.channel.toUpperCase()}</Badge>
                  </td>
                  <td className="font-mono text-xs text-slate-500">{tpl.trigger}</td>
                  <td className="text-xs text-slate-500">{tpl.lastSent}</td>
                  <td>
                    <Badge variant={tpl.status === "active" ? "green" : "slate"}>{tpl.status}</Badge>
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm"><Edit size={13} /></Button>
                      <Button variant="ghost" size="sm" className="text-brand-600">
                        <Send size={13} /> Test
                      </Button>
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
