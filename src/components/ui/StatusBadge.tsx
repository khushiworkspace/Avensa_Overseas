import { Badge } from "./Badge";
import {
  APPLICATION_STATUS_LABELS,
  DOCUMENT_STATUS_COLORS,
} from "@/lib/constants";
import type { ApplicationStatus, DocumentStatus } from "@/types";

function colorFromClass(cls: string) {
  const map: Record<string, "blue" | "green" | "yellow" | "red" | "slate" | "purple"> = {
    "badge-blue": "blue",
    "badge-green": "green",
    "badge-yellow": "yellow",
    "badge-red": "red",
    "badge-slate": "slate",
    "badge-purple": "purple",
  };
  return map[cls] ?? "slate";
}

export function AppStatusBadge({ status }: { status: ApplicationStatus }) {
  const colorMap: Record<ApplicationStatus, "blue" | "green" | "yellow" | "red" | "slate" | "purple"> = {
    draft: "slate",
    submitted: "blue",
    document_review: "yellow",
    additional_documents: "yellow",
    appointment_scheduled: "blue",
    biometrics: "blue",
    under_review: "purple",
    decision_made: "purple",
    approved: "green",
    rejected: "red",
    withdrawn: "slate",
    completed: "green",
  };
  return (
    <Badge variant={colorMap[status]}>
      {APPLICATION_STATUS_LABELS[status]}
    </Badge>
  );
}

export function DocStatusBadge({ status }: { status: DocumentStatus }) {
  const labels: Record<DocumentStatus, string> = {
    required: "Required",
    uploaded: "Uploaded",
    under_review: "Under Review",
    accepted: "Accepted",
    rejected: "Rejected",
    replacement_required: "Replacement Required",
  };
  const cls = DOCUMENT_STATUS_COLORS[status];
  return <Badge variant={colorFromClass(cls)}>{labels[status]}</Badge>;
}
