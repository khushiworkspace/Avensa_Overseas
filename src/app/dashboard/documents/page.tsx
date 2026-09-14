import type { Metadata } from "next";
import { Upload, FileText, AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";
import { MOCK_DOCUMENTS } from "@/lib/mock-data";
import { formatDate, formatFileSize } from "@/lib/utils";
import { DOCUMENT_TYPE_LABELS } from "@/lib/constants";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DocStatusBadge } from "@/components/ui/StatusBadge";
import { Disclaimer } from "@/components/ui/Disclaimer";

export const metadata: Metadata = { title: "Documents" };

const statusIconMap = {
  required: AlertTriangle,
  uploaded: Clock,
  under_review: Clock,
  accepted: CheckCircle,
  rejected: XCircle,
  replacement_required: XCircle,
};

const statusColorMap = {
  required: "text-amber-500",
  uploaded: "text-blue-500",
  under_review: "text-purple-500",
  accepted: "text-green-500",
  rejected: "text-red-500",
  replacement_required: "text-red-500",
};

export default function DocumentsPage() {
  const docs = MOCK_DOCUMENTS.filter((d) => d.applicantId === "u1");
  const pending = docs.filter((d) => ["required", "rejected", "replacement_required"].includes(d.status)).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Documents</h1>
          <p className="text-slate-500 text-sm mt-0.5">{docs.length} documents · {pending} require attention</p>
        </div>
        <Button size="sm"><Upload size={15} /> Upload Document</Button>
      </div>

      {pending > 0 && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">
              {pending} document{pending > 1 ? "s" : ""} require your attention
            </p>
            <p className="text-xs text-amber-600 mt-0.5">
              Please upload or resubmit the flagged documents to progress your application.
            </p>
          </div>
        </div>
      )}

      <Disclaimer className="mb-6" />

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-slate-900">All Documents</h2>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-slate-100">
            {docs.map((doc) => {
              const StatusIcon = statusIconMap[doc.status];
              const iconColor = statusColorMap[doc.status];
              return (
                <div key={doc.id} className="flex items-start gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <FileText size={18} className="text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{doc.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {DOCUMENT_TYPE_LABELS[doc.type]} · {formatFileSize(doc.fileSize)} · {doc.fileName}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <StatusIcon size={14} className={iconColor} />
                        <DocStatusBadge status={doc.status} />
                      </div>
                    </div>
                    {doc.rejectionReason && (
                      <div className="mt-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">
                        <strong>Rejection reason:</strong> {doc.rejectionReason}
                      </div>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span>Uploaded: {formatDate(doc.uploadedAt)}</span>
                      {doc.expiryDate && <span>Expires: {formatDate(doc.expiryDate)}</span>}
                      {doc.reviewedAt && <span>Reviewed: {formatDate(doc.reviewedAt)}</span>}
                    </div>
                    {(doc.status === "rejected" || doc.status === "replacement_required") && (
                      <Button size="sm" variant="outline" className="mt-2 border-red-300 text-red-600 hover:bg-red-50">
                        <Upload size={12} /> Resubmit Document
                      </Button>
                    )}
                    {doc.status === "required" && (
                      <Button size="sm" className="mt-2">
                        <Upload size={12} /> Upload Now
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-800 text-sm mb-2">Document Upload Guidelines</h3>
        <ul className="space-y-1.5 text-xs text-slate-500">
          <li>• Accepted formats: PDF, JPG, PNG, DOCX</li>
          <li>• Maximum file size: 10 MB per file</li>
          <li>• Scans must be clear, legible and show all four corners</li>
          <li>• Certified translations may be required for documents not in English or the destination country language</li>
          <li>• All files are scanned for malware on upload</li>
          <li>• Documents are stored encrypted and accessed via time-limited signed URLs</li>
        </ul>
      </div>
    </div>
  );
}
