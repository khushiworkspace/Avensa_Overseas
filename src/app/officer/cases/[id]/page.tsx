import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, User, FileText, MessageSquare, CheckCircle, XCircle, AlertTriangle, Send } from "lucide-react";
import { MOCK_APPLICATIONS, MOCK_DOCUMENTS, MOCK_CASE_NOTES, MOCK_STATUS_HISTORY } from "@/lib/mock-data";
import { COUNTRIES, IMMIGRATION_ROUTES, DOCUMENT_TYPE_LABELS } from "@/lib/constants";
import { formatDate, formatDateTime, formatFileSize } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { AppStatusBadge, DocStatusBadge } from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/Badge";

interface Props { params: { id: string } }
export const metadata: Metadata = { title: "Case Detail" };

export default function CaseDetailPage({ params }: Props) {
  const app = MOCK_APPLICATIONS.find((a) => a.id === params.id);
  if (!app) notFound();

  const country = COUNTRIES.find((c) => c.id === app.countryId);
  const route = IMMIGRATION_ROUTES.find((r) => r.id === app.routeId);
  const docs = MOCK_DOCUMENTS.filter((d) => d.applicationId === app.id);
  const notes = MOCK_CASE_NOTES.filter((n) => n.applicationId === app.id);
  const history = MOCK_STATUS_HISTORY.filter((h) => h.applicationId === app.id);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/officer">
          <Button variant="ghost" size="sm"><ArrowLeft size={14} /> Queue</Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900 font-heading">
            {app.personalDetails.firstName} {app.personalDetails.lastName}
          </h1>
          <p className="text-xs text-slate-400">{app.referenceNumber}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <AppStatusBadge status={app.status} />
          <Button size="sm" variant="secondary">Update Status</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">

          {/* Document Review */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-900">Documents</h2>
                <Button variant="secondary" size="sm">Request Document</Button>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th>Document</th>
                    <th>Type</th>
                    <th>Uploaded</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((doc) => (
                    <tr key={doc.id}>
                      <td>
                        <div>
                          <p className="font-medium text-slate-800 truncate max-w-[160px]">{doc.name}</p>
                          <p className="text-xs text-slate-400">{formatFileSize(doc.fileSize)}</p>
                        </div>
                      </td>
                      <td className="text-xs text-slate-500">{DOCUMENT_TYPE_LABELS[doc.type]}</td>
                      <td className="text-xs text-slate-500">{formatDate(doc.uploadedAt)}</td>
                      <td><DocStatusBadge status={doc.status} /></td>
                      <td>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="text-green-600 hover:bg-green-50 p-1.5">
                            <CheckCircle size={14} />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50 p-1.5">
                            <XCircle size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>

          {/* Case Notes */}
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-slate-900">Case Notes</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4 mb-5">
                {notes.map((note) => (
                  <div key={note.id} className={`rounded-lg p-4 border ${note.internal ? "bg-amber-50 border-amber-200" : "bg-slate-50 border-slate-200"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-700">{note.authorName}</span>
                        {note.internal && (
                          <Badge variant="yellow">Internal</Badge>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">{formatDateTime(note.createdAt)}</span>
                    </div>
                    <p className="text-sm text-slate-700">{note.content}</p>
                  </div>
                ))}
              </div>
              <div>
                <label className="form-label">Add Note</label>
                <textarea className="form-input resize-none mb-2" rows={3} placeholder="Add a case note..." />
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                    <input type="checkbox" className="h-3.5 w-3.5 rounded border-slate-300" />
                    Internal note (not visible to applicant)
                  </label>
                  <Button size="sm" className="ml-auto">
                    <Send size={13} /> Add Note
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Status History */}
          <Card>
            <CardHeader><h2 className="font-semibold text-slate-900">Status History</h2></CardHeader>
            <CardBody>
              <div className="space-y-3">
                {history.map((h) => (
                  <div key={h.id} className="flex items-start gap-3 text-sm">
                    <div className="h-2 w-2 rounded-full bg-brand-400 mt-2 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <AppStatusBadge status={h.status} />
                        <span className="text-xs text-slate-400">{formatDateTime(h.timestamp)}</span>
                      </div>
                      {h.note && <p className="text-xs text-slate-500 mt-0.5">{h.note}</p>}
                      <p className="text-xs text-slate-400">by {h.actor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <Card className="p-5">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <User size={15} className="text-brand-600" /> Applicant Details
            </h3>
            <div className="space-y-2 text-sm">
              {[
                ["Name", `${app.personalDetails.firstName} ${app.personalDetails.lastName}`],
                ["Nationality", app.personalDetails.nationality],
                ["Passport", app.personalDetails.passportNumber],
                ["Email", app.personalDetails.email],
                ["Phone", app.personalDetails.phone],
                ["City", `${app.personalDetails.city}, ${app.personalDetails.country}`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-2">
                  <span className="text-slate-400 shrink-0">{label}</span>
                  <span className="font-medium text-slate-800 text-right truncate">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold text-slate-900 mb-4">Application Info</h3>
            <div className="space-y-2 text-sm">
              {[
                ["Country", country?.name ?? "—"],
                ["Route", route?.name ?? "—"],
                ["Status", "—"],
                ["Submitted", app.submittedAt ? formatDate(app.submittedAt) : "Draft"],
                ["Reference", app.referenceNumber],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-2">
                  <span className="text-slate-400 shrink-0">{label}</span>
                  <span className="font-medium text-slate-800 text-right">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold text-slate-900 mb-3">Actions</h3>
            <div className="space-y-2">
              <Button className="w-full" size="sm">Approve Application</Button>
              <Button variant="danger" className="w-full" size="sm">Reject Application</Button>
              <Button variant="secondary" className="w-full" size="sm">
                <AlertTriangle size={13} /> Escalate Case
              </Button>
              <Button variant="secondary" className="w-full" size="sm">Reassign</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
