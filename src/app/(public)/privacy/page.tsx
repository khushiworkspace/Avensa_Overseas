import type { Metadata } from "next";
import { Shield } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = { title: "Privacy Policy" };

const sections = [
  {
    title: "1. Who We Are",
    body: `${COMPANY.name} ("we", "us", "our") operates the Avensa Overseas EU Immigration Portal. We are the controller of the personal data you provide to us. Contact: ${COMPANY.email}.`,
  },
  {
    title: "2. Data We Collect",
    body: "We collect identity and contact details (name, email, phone, address), passport and travel document information, employment, education and financial information provided for eligibility checks and applications, documents you upload, and usage data (pages visited, actions taken) for platform improvement.",
  },
  {
    title: "3. How We Use Your Data",
    body: "We process your data to provide eligibility guidance and application management services, communicate with you about your applications and appointments, comply with legal obligations, and improve the platform (analytics, aggregated and anonymised).",
  },
  {
    title: "4. Legal Basis",
    body: "We rely on contractual necessity for service delivery, consent for marketing communications, and legitimate interests for platform security and fraud prevention.",
  },
  {
    title: "5. Data Retention",
    body: "Application data is retained for up to 10 years post-completion or as required by law. Documents are retained for 7 years. Marketing preferences are retained until you withdraw consent.",
  },
  {
    title: "6. Your Rights",
    body: `Under GDPR and applicable law, you have the right to access, correct, port, restrict processing of, or request erasure of your data. To exercise your rights, email ${COMPANY.email} or use your account settings.`,
  },
  {
    title: "7. Security",
    body: "All data is encrypted in transit (TLS) and at rest. Documents are stored in private encrypted object storage with time-limited signed URLs. Access is controlled by role-based permissions.",
  },
  {
    title: "8. Contact",
    body: `For privacy queries or to exercise your rights: ${COMPANY.email}`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <div className="gradient-hero py-20">
        <div className="relative z-10 page-container">
          <Breadcrumb items={[{ label: "Privacy Policy" }]} className="text-white/50 mb-6" />
          <div className="section-eyebrow mb-5">
            <Shield size={11} />
            Legal
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
            Privacy Policy
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
                <h2
                  className="text-base font-bold text-ink mb-3"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
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
