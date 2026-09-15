"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  index: number;
  question: string;
  answer: string;
}

export default function FAQItem({ index, question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="group overflow-hidden rounded-2xl transition-all duration-300"
      style={{
        background: open ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
        border: open
          ? "1px solid rgba(99,102,241,0.40)"
          : "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(16px) saturate(180%)",
        boxShadow: open
          ? "0 0 0 1px rgba(99,102,241,0.15), 0 12px 40px -8px rgba(79,70,229,0.30)"
          : "0 1px 4px rgba(0,0,0,0.20)",
      }}
    >
      {/* Header / trigger */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3.5 min-w-0">
          {/* Number chip */}
          <span
            className="shrink-0 flex h-6 w-6 items-center justify-center rounded-lg text-[11px] font-bold transition-all duration-300"
            style={{
              background: open ? "#4f46e5" : "rgba(99,102,241,0.15)",
              color:      open ? "#ffffff" : "#a5b4fc",
              fontFamily: "var(--font-outfit)",
            }}
          >
            {index + 1}
          </span>

          {/* Question text */}
          <span
            className="text-sm font-semibold leading-snug transition-colors duration-300"
            style={{
              color:      open ? "#e0e7ff" : "rgba(255,255,255,0.82)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            {question}
          </span>
        </span>

        {/* Chevron */}
        <span
          className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-300"
          style={{
            background: open ? "rgba(99,102,241,0.20)" : "rgba(255,255,255,0.06)",
            transform:  open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronDown
            size={14}
            style={{ color: open ? "#818cf8" : "rgba(255,255,255,0.35)" }}
          />
        </span>
      </button>

      {/* Answer panel — animated via max-height grid trick */}
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className="px-6 pb-5 pt-1 text-sm leading-relaxed"
            style={{
              color:      "rgba(255,255,255,0.60)",
              fontFamily: "var(--font-outfit)",
              borderTop:  "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="pt-4">{answer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
