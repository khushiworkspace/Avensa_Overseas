"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItemProps {
  index: number;
  question: string;
  answer: string;
}

export default function FAQItem({ index, question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="group overflow-hidden rounded-xl transition-all duration-300"
      style={{
        background: open ? "#ffffff" : "#ffffff",
        border: open
          ? "1px solid #0d1b4b"
          : "1px solid #e2e8f0",
        boxShadow: open
          ? "0 4px 24px -4px rgba(13,27,75,0.12)"
          : "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header / trigger */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3 min-w-0">
          {/* Number chip */}
          <span
            className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-bold"
            style={{
              background: open ? "#0d1b4b" : "#f1f5f9",
              color: open ? "#F5A623" : "#64748b",
              fontFamily: "var(--font-outfit)",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Question text */}
          <span
            className="text-sm font-semibold leading-snug transition-colors duration-200"
            style={{
              color: open ? "#0d1b4b" : "#1e293b",
              fontFamily: "var(--font-outfit)",
            }}
          >
            {question}
          </span>
        </span>

        {/* Plus / Minus icon */}
        <span
          className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-200"
          style={{
            background: open ? "#0d1b4b" : "#f1f5f9",
          }}
        >
          {open
            ? <Minus size={13} style={{ color: "#F5A623" }} />
            : <Plus size={13} style={{ color: "#94a3b8" }} />
          }
        </span>
      </button>

      {/* Answer panel */}
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className="px-5 pb-5 text-sm leading-relaxed"
            style={{
              color: "#475569",
              fontFamily: "var(--font-outfit)",
              borderTop: "1px solid #f1f5f9",
              paddingTop: "12px",
            }}
          >
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}
