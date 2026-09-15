import type { Metadata } from "next";
import { CheckCircle, AlertTriangle, Eye } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = { title: "Accessibility Statement" };

const features = [
  "Semantic HTML with proper heading hierarchy",
  "ARIA labels on all interactive components",
  "Full keyboard navigation throughout the application",
  "Sufficient colour contrast ratios (WCAG 2.1 AA target)",
  "Screen reader compatible form inputs with descriptive labels",
  "Visible focus indicators on all interactive elements",
  "Descriptive alt text on all images",
  "Error messages associated with form fields via aria-describedby",
];

const known = [
  "Some complex data tables may benefit from additional navigation aids",
  "PDF documents uploaded by users are not guaranteed to be accessible",
  "Full manual testing with all major assistive technologies is ongoing",
];

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <div className="gradient-hero py-20">
        <div className="relative z-10 page-container">
          <Breadcrumb items={[{ label: "Accessibility" }]} className="text-white/50 mb-6" />
          <div className="section-eyebrow mb-5">
            <Eye size={11} />
            Legal
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
            Accessibility Statement
          </h1>
          <p className="mt-3 text-sm text-white/40" style={{ fontFamily: "var(--font-outfit)" }}>
            Last updated: 1 January 2024
          </p>
        </div>
      </div>

      <div className="page-container py-14 max-w-3xl">
        <div className="rounded-3xl bg-white border border-slate-200/70 shadow-card overflow-hidden">
          <div className="px-8 py-8 space-y-8">

            <section className="border-b border-slate-100 pb-8">
              <h2 className="text-base font-bold text-ink mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                Our Commitment
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-outfit)" }}>
                {COMPANY.name} is committed to making this portal accessible to the widest possible audience, including people with disabilities.
                We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
              </p>
            </section>

            <section className="border-b border-slate-100 pb-8">
              <h2 className="text-base font-bold text-ink mb-5" style={{ fontFamily: "var(--font-syne)" }}>
                What We&apos;ve Implemented
              </h2>
              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 mt-0.5">
                      <CheckCircle size={12} className="text-emerald-600" />
                    </div>
                    <span className="text-sm text-slate-600" style={{ fontFamily: "var(--font-outfit)" }}>{f}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-b border-slate-100 pb-8">
              <h2 className="text-base font-bold text-ink mb-5" style={{ fontFamily: "var(--font-syne)" }}>
                Known Limitations
              </h2>
              <ul className="space-y-3">
                {known.map((k) => (
                  <li key={k} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 mt-0.5">
                      <AlertTriangle size={11} className="text-amber-600" />
                    </div>
                    <span className="text-sm text-slate-600" style={{ fontFamily: "var(--font-outfit)" }}>{k}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-400" style={{ fontFamily: "var(--font-outfit)" }}>
                Full WCAG 2.1 compliance requires manual testing with assistive technologies and expert review, which is ongoing.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-ink mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                Feedback
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-outfit)" }}>
                If you experience any accessibility barriers, please contact us at{" "}
                <a href={`mailto:${COMPANY.email}`} className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors">
                  {COMPANY.email}
                </a>
                . We aim to respond within 5 business days.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
