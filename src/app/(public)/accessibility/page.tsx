import type { Metadata } from "next";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = { title: "Accessibility Statement" };

const features = [
  "Semantic HTML with proper heading hierarchy",
  "ARIA labels on interactive components",
  "Keyboard navigation throughout the application",
  "Sufficient colour contrast ratios (WCAG 2.1 AA target)",
  "Screen reader compatible form inputs with descriptive labels",
  "Focus indicators on all interactive elements",
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
    <div className="bg-white min-h-screen">
      <div className="gradient-hero py-12">
        <div className="page-container">
          <Breadcrumb items={[{ label: "Accessibility" }]} className="text-blue-200 mb-4" />
          <h1 className="text-3xl font-extrabold text-white font-heading">Accessibility Statement</h1>
          <p className="text-blue-200 mt-2 text-sm">Last updated: 1 January 2024</p>
        </div>
      </div>

      <div className="page-container py-12 max-w-3xl">
        <div className="space-y-8 text-sm text-slate-600">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Our Commitment</h2>
            <p>
              {COMPANY.name} is committed to making this portal accessible to the widest possible audience, including people with disabilities. We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4">What We&apos;ve Implemented</h2>
            <ul className="space-y-2.5">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <CheckCircle size={15} className="text-green-500 mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Known Limitations</h2>
            <ul className="space-y-2.5">
              {known.map((k) => (
                <li key={k} className="flex items-start gap-2.5">
                  <AlertTriangle size={15} className="text-amber-500 mt-0.5 shrink-0" />
                  <span>{k}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-400">
              Full WCAG 2.1 compliance requires manual testing with assistive technologies and expert review, which is ongoing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Assistive Technology Support</h2>
            <p>
              We test the platform with common screen readers including NVDA (Windows), VoiceOver (macOS/iOS) and TalkBack (Android). We aim to support all major modern browsers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Feedback &amp; Contact</h2>
            <p>
              If you experience any accessibility barriers, please contact us at{" "}
              <a href={`mailto:${COMPANY.email}`} className="text-brand-600 hover:underline">
                {COMPANY.email}
              </a>
              . We aim to respond within 5 business days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
