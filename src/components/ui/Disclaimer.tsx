import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface DisclaimerProps {
  text?: string;
  className?: string;
}

export function Disclaimer({ text, className }: DisclaimerProps) {
  return (
    <div
      role="note"
      className={cn(
        "flex gap-3 rounded-2xl border border-indigo-200/60 bg-indigo-50/60 p-4 text-sm",
        className
      )}
    >
      <Info size={16} className="mt-0.5 shrink-0 text-indigo-400" />
      <p style={{ fontFamily: "var(--font-outfit)" }} className="text-indigo-800/80 leading-relaxed">
        {text ??
          "The information on this page is for guidance purposes only and does not constitute legal advice. Immigration rules change regularly. Final decisions on all visa and residence applications are made by the competent national authority. Always verify requirements with official government sources before applying."}
      </p>
    </div>
  );
}
