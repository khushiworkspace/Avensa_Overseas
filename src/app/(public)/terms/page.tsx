import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="gradient-hero py-12">
        <div className="page-container">
          <Breadcrumb items={[{ label: "Terms of Service" }]} className="text-blue-200 mb-4" />
          <h1 className="text-3xl font-extrabold text-white font-heading">Terms of Service</h1>
          <p className="text-blue-200 mt-2 text-sm">Last updated: 1 January 2024</p>
        </div>
      </div>
      <div className="page-container py-12 max-w-3xl">
        <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-6">
          {[
            {
              title: "1. Acceptance",
              body: `By using the ${COMPANY.name} platform, you agree to these Terms. If you do not agree, do not use the platform.`,
            },
            {
              title: "2. Nature of Service",
              body: "Avensa Overseas provides immigration information, eligibility guidance, document management, and application tracking tools. We are NOT a government authority and do NOT make immigration decisions. All final decisions rest with the competent national immigration authority of the destination country.",
            },
            {
              title: "3. No Legal Advice",
              body: "Content on this platform is for informational guidance only and does not constitute legal or immigration advice. For legal advice, consult a qualified immigration lawyer or adviser.",
            },
            {
              title: "4. User Responsibilities",
              body: "You are responsible for the accuracy and completeness of all information and documents you provide. You must not upload fraudulent, forged or misleading documents. Misuse of the platform may result in account suspension and may be reported to relevant authorities.",
            },
            {
              title: "5. Account Security",
              body: "You are responsible for maintaining the confidentiality of your account credentials. Enable MFA where available. Notify us immediately of any unauthorised access.",
            },
            {
              title: "6. Fees",
              body: "Avensa Overseas charges service fees separate from government application fees. Service fees are non-refundable once services are delivered except where required by law. Government fees are passed through without markup.",
            },
            {
              title: "7. Intellectual Property",
              body: "All platform content, branding and software belong to Avensa Overseas or our licensors. You may not reproduce or distribute platform content without written permission.",
            },
            {
              title: "8. Limitation of Liability",
              body: "To the maximum extent permitted by law, Avensa Overseas is not liable for visa refusals, delays, travel disruptions or losses arising from reliance on information provided on this platform.",
            },
            {
              title: "9. Governing Law",
              body: "These Terms are governed by the laws of England and Wales. Disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
            },
            {
              title: "10. Changes",
              body: "We may update these Terms. Continued use after changes constitutes acceptance. We will notify you of material changes by email.",
            },
            {
              title: "11. Contact",
              body: `For questions about these Terms: ${COMPANY.email}`,
            },
          ].map(({ title, body }) => (
            <section key={title}>
              <h2 className="text-lg font-bold text-slate-900">{title}</h2>
              <p className="text-slate-600 mt-2">{body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
