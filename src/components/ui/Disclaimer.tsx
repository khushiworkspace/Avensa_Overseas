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
      className={cn("flex gap-3 rounded-2xl p-4 text-sm", className)}
      style={{
        border: "1px solid rgba(13,27,75,0.14)",
        background: "rgba(13,27,75,0.04)",
      }}
    >
      <Info size={16} className="mt-0.5 shrink-0" style={{ color: "#1a2b6b" }} />
      <p style={{ fontFamily: "var(--font-outfit)", color: "rgba(13,27,75,0.75)" }} className="leading-relaxed">
        {text ??
          "The information on this page is for guidance purposes only and does not constitute legal advice. Immigration rules change regularly. Final decisions on all visa and residence applications are made by the competent national authority. Always verify requirements with official government sources before applying."}
      </p>
    </div>
  );
}
