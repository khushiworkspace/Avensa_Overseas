import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, Calendar, CheckCircle, Clock, User, MessageSquare } from "lucide-react";
import { MOCK_APPLICATIONS, MOCK_STATUS_HISTORY, MOCK_DOCUMENTS, MOCK_CASE_NOTES } from "@/lib/mock-data";
import { COUNTRIES, IMMIGRATION_ROUTES, APPLICATION_STATUS_LABELS } from "@/lib/constants";
import { formatDate, formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { AppStatusBadge, DocStatusBadge } from "@/components/ui/StatusBadge";
import { Disclaimer } from "@/components/ui/Disclaimer";

interface Props { params: { id: string } }

export const metadata: Metadata = { title: "Application Details" };

const ALL_STATUSES = [
  "draft", "submitted", "document_review", "additional_documents",
  "appointment_scheduled", "biometrics", "under_review", "decision_made", "completed",
] as const;

export default function ApplicationDetailPage({ params }: Props) {
  const app = MOCK_APPLICATIONS.find((a) => a.id === params.id);
  if (!app) notFound();

  const country = COUNTRIES.find((c) => c.id === app.countryId);
  const route = IMMIGRATION_ROUTES.find((r) => r.id === app.routeId);
  const history = MOCK_STATUS_HISTORY.filter((h) => h.applicationId === app.id);
  const docs = MOCK_DOCUMENTS.filter((d) => d.applicationId === app.id);
  const notes = MOCK_CASE_NOTES.filter((n) => n.applicationId === app.id && !n.internal);

  const currentIdx = ALL_STATUSES.indexOf(app.status as typeof ALL_STATUSES[number]);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/applications">
          <Button variant="ghost" size="sm"><ArrowLeft size={14} /> Back</Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900 font-heading">Application {app.referenceNumber}</h1>
          <p className="text-xs text-slate-400">Created {formatDate(app.createdAt)}</p>
        </div>
        <div className="ml-auto"><AppStatusBadge status={app.status} /></div>
      </div>

      <Disclaimer className="mb-6" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Progress timeline visual */}
          <Card>
            <CardHeader><h2 className="font-semibold text-slate-900">Application Progress</h2></CardHeader>
            <CardBody>
              <div className="flex items-center gap-1 overflow-x-auto pb-2">
                {ALL_STATUSES.map((s, i) => {
                  const done = i < currentIdx;
                  const active = i === currentIdx;
                  return (
                    <div key={s} className="flex items-center gap-1 shrink-0">
                      <div className={`flex flex-col items-center`}>
                        <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${done ? "bg-green-500 text-white" : active ? "bg-brand-600 text-white ring-2 ring-brand-300" : "bg-slate-200 text-slate-400"}`}>
                          {done ? <CheckCircle size={13} /> : i + 1}
                        </div>
                        <span className={`mt-1 text-[10px] text-center max-w-[60px] leading-tight font-medium ${active ? "text-brand-700" : done ? "text-green-700" : "text-slate-400"}`}>
                          {APPLICATION_STATUS_LABELS[s]}
                        </span>
                      </div>
                      {i < ALL_STATUSES.length - 1 && (
                        <div className={`h-0.5 w-4 ${i < currentIdx ? "bg-green-400" : "bg-slate-200"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>

          {/* Status history */}
          <Card>
            <CardHeader><h2 className="font-semibold text-slate-900">Status History</h2></CardHeader>
            <CardBody>
              <div className="space-y-4">
                {history.map((h, i) => (
                  <div key={h.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs ${i === 0 ? "bg-brand-100 text-brand-600" : "bg-slate-100 text-slate-500"}`}>
                        <Clock size={14} />
                      </div>
                      {i < history.length - 1 && <div className="w-0.5 flex-1 bg-slate-100 mt-1 min-h-[16px]" />}
                    </div>
                    <div className="pb-4 flex-1">
                      <div className="flex items-center justify-between">
                        <AppStatusBadge status={h.status} />
                        <span className="text-xs text-slate-400">{formatDateTime(h.timestamp)}</span>
                      </div>
                      {h.note && <p className="text-sm text-slate-600 mt-1">{h.note}</p>}
                      <p className="text-xs text-slate-400 mt-1">by {h.actor} ({h.actorRole.replace("_", " ")})</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Documents summary */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-900">Documents</h2>
                <Link href="/dashboard/documents">
                  <Button variant="ghost" size="sm">Manage Documents</Button>
                </Link>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              {docs.length === 0 ? (
                <p className="px-5 py-4 text-sm text-slate-400">No documents uploaded yet.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th>Document</th>
                      <th>Uploaded</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {docs.map((doc) => (
                      <tr key={doc.id}>
                        <td>
                          <div className="flex items-center gap-2">
                            <FileText size={13} className="text-slate-400 shrink-0" />
                            <span className="font-medium text-slate-700">{doc.name}</span>
                          </div>
                        </td>
                        <td className="text-xs text-slate-500">{formatDate(doc.uploadedAt)}</td>
                        <td>
                          <DocStatusBadge status={doc.status} />
                          {doc.rejectionReason && (
                            <p className="text-xs text-red-600 mt-0.5">{doc.rejectionReason}</p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardBody>
          </Card>

          {/* Officer messages */}
          {notes.length > 0 && (
            <Card>
              <CardHeader><h2 className="font-semibold text-slate-900">Messages from Case Officer</h2></CardHeader>
              <CardBody>
                {notes.map((note) => (
                  <div key={note.id} className="rounded-lg bg-slate-50 border border-slate-200 p-4 mb-3 last:mb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare size={13} className="text-brand-500" />
                      <span className="text-xs font-semibold text-slate-700">{note.authorName}</span>
                      <span className="text-xs text-slate-400">{formatDateTime(note.createdAt)}</span>
                    </div>
                    <p className="text-sm text-slate-700">{note.content}</p>
                  </div>
                ))}
              </CardBody>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <Card className="p-5">
            <h3 className="font-semibold text-slate-900 mb-4">Application Details</h3>
            <div className="space-y-3 text-sm">
              {[
                { label: "Reference", value: app.referenceNumber },
                { label: "Destination", value: country?.name ?? "—" },
                { label: "Route", value: route?.name ?? "—" },
                { label: "Created", value: formatDate(app.createdAt) },
                { label: "Submitted", value: app.submittedAt ? formatDate(app.submittedAt) : "Not yet" },
                { label: "Step", value: `${app.currentStep} / 10` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-2">
                  <span className="text-slate-400">{label}</span>
                  <span className="font-medium text-slate-800 text-right">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold text-slate-900 mb-3 text-sm">Applicant</h3>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold">
                {app.personalDetails.firstName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {app.personalDetails.firstName} {app.personalDetails.lastName}
                </p>
                <p className="text-xs text-slate-400">{app.personalDetails.nationality}</p>
              </div>
            </div>
          </Card>

          {app.status === "draft" && (
            <Link href={`/dashboard/applications/new?resume=${app.id}`}>
              <Button className="w-full">Continue Application</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
