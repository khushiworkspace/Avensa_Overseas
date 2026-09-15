import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = { title: "Terms of Service" };

const sections = [
  { title: "1. Acceptance", body: `By using the ${COMPANY.name} platform, you agree to these Terms. If you do not agree, do not use the platform.` },
  { title: "2. Nature of Service", body: "Avensa Overseas provides immigration information, eligibility guidance, document management, and application tracking tools. We are NOT a government authority and do NOT make immigration decisions. All final decisions rest with the competent national immigration authority." },
  { title: "3. No Legal Advice", body: "Content on this platform is for informational guidance only and does not constitute legal or immigration advice. For legal advice, consult a qualified immigration lawyer or adviser." },
  { title: "4. User Responsibilities", body: "You are responsible for the accuracy and completeness of all information and documents you provide. You must not upload fraudulent, forged or misleading documents. Misuse may result in account suspension." },
  { title: "5. Account Security", body: "You are responsible for maintaining the confidentiality of your account credentials. Enable MFA where available. Notify us immediately of any unauthorised access." },
  { title: "6. Fees", body: "Avensa Overseas charges service fees separate from government application fees. Service fees are non-refundable once services are delivered except where required by law." },
  { title: "7. Intellectual Property", body: "All platform content, branding and software belong to Avensa Overseas or our licensors. You may not reproduce or distribute platform content without written permission." },
  { title: "8. Limitation of Liability", body: "To the maximum extent permitted by law, Avensa Overseas is not liable for visa refusals, delays, travel disruptions or losses arising from reliance on information provided on this platform." },
  { title: "9. Governing Law", body: "These Terms are governed by the laws of England and Wales. Disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales." },
  { title: "10. Changes", body: "We may update these Terms. Continued use after changes constitutes acceptance. We will notify you of material changes by email." },
  { title: "11. Contact", body: `For questions about these Terms: ${COMPANY.email}` },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <div className="gradient-hero py-20">
        <div className="relative z-10 page-container">
          <Breadcrumb items={[{ label: "Terms of Service" }]} className="text-white/50 mb-6" />
          <div className="section-eyebrow mb-5">
            <FileText size={11} />
            Legal
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-white/40" style={{ fontFamily: "var(--font-outfit)" }}>
            Last updated: 1 January 2024
          </p>
        </div>
      </div>
      <div className="page-container py-14 max-w-3xl">
        <div className="rounded-3xl bg-white border border-slate-200/70 shadow-card overflow-hidden">
          <div className="px-8 py-8 space-y-8">
            {sections.map(({ title, body }) => (
              <section key={title} className="border-b border-slate-100 last:border-0 pb-8 last:pb-0">
                <h2 className="text-base font-bold text-ink mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                  {title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-outfit)" }}>
                  {body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
