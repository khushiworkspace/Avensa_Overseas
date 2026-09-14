import type { Metadata } from "next";
import { Shield, Check } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Roles & Permissions" };

const ROLES = [
  {
    name: "Applicant",
    key: "applicant",
    description: "End users submitting immigration applications",
    permissions: ["view_own_applications", "submit_application", "upload_documents", "book_appointment", "make_payment", "view_notifications"],
  },
  {
    name: "Case Officer",
    key: "case_officer",
    description: "Reviews and manages assigned cases",
    permissions: ["view_assigned_cases", "review_documents", "update_application_status", "add_case_notes", "request_documents", "escalate_cases"],
  },
  {
    name: "Document Verifier",
    key: "document_verifier",
    description: "Validates document completeness and quality",
    permissions: ["view_documents", "verify_documents", "request_document_resubmission"],
  },
  {
    name: "Appointment Manager",
    key: "appointment_manager",
    description: "Manages appointment slots and bookings",
    permissions: ["manage_slots", "view_appointments", "reschedule_appointments", "cancel_appointments"],
  },
  {
    name: "Finance",
    key: "finance",
    description: "Views payments, invoices and reconciliation",
    permissions: ["view_payments", "issue_refunds", "export_payment_reports"],
  },
  {
    name: "Content Admin",
    key: "content_admin",
    description: "Manages countries, routes, rules and CMS content",
    permissions: ["manage_countries", "manage_routes", "manage_rules", "publish_rules", "manage_cms", "manage_faqs"],
  },
  {
    name: "Super Admin",
    key: "super_admin",
    description: "Full platform access including user and system management",
    permissions: ["all_permissions", "manage_users", "manage_roles", "view_audit_logs", "system_settings", "data_export"],
  },
];

const roleColor: Record<string, "blue" | "purple" | "red" | "green" | "yellow" | "slate"> = {
  applicant: "blue", case_officer: "purple", document_verifier: "yellow",
  appointment_manager: "green", finance: "yellow", content_admin: "green", super_admin: "red",
};

export default function RolesPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 font-heading">Roles &amp; Permissions</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Platform roles are fixed to ensure least-privilege access. Contact engineering to modify role permissions.
        </p>
      </div>

      <div className="space-y-5">
        {ROLES.map((role) => (
          <Card key={role.key}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-brand-50 flex items-center justify-center">
                    <Shield size={16} className="text-brand-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{role.name}</h3>
                      <Badge variant={roleColor[role.key]}>{role.key}</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{role.description}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">Permissions</p>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((perm) => (
                  <span
                    key={perm}
                    className="flex items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700"
                  >
                    <Check size={11} className="text-green-500" />
                    {perm.replace(/_/g, " ")}
                  </span>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
