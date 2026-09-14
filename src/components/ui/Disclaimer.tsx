import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DisclaimerProps {
  text?: string;
  className?: string;
}

export function Disclaimer({ text, className }: DisclaimerProps) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800",
        className
      )}
      role="note"
    >
      <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-500" />
      <p>
        {text ??
          "The information on this page is for guidance purposes only and does not constitute legal advice. Immigration rules change regularly. Final decisions on all visa and residence applications are made by the competent national authority. Always verify requirements with official government sources before applying."}
      </p>
    </div>
  );
}
