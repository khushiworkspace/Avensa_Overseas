import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="gradient-hero py-12">
        <div className="page-container">
          <Breadcrumb items={[{ label: "Privacy Policy" }]} className="text-blue-200 mb-4" />
          <h1 className="text-3xl font-extrabold text-white font-heading">Privacy Policy</h1>
          <p className="text-blue-200 mt-2 text-sm">Last updated: 1 January 2024</p>
        </div>
      </div>
      <div className="page-container py-12 max-w-3xl">
        <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-6">
          <section>
            <h2 className="text-lg font-bold text-slate-900">1. Who We Are</h2>
            <p className="text-slate-600">
              {COMPANY.name} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the Avensa Overseas EU Immigration Portal. We are the controller of the personal data you provide to us. Contact: {COMPANY.email}.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900">2. Data We Collect</h2>
            <p className="text-slate-600">We collect:</p>
            <ul className="list-disc pl-5 text-slate-600 space-y-1">
              <li>Identity and contact details (name, email, phone, address)</li>
              <li>Passport and travel document information</li>
              <li>Employment, education and financial information provided for eligibility checks and applications</li>
              <li>Documents you upload</li>
              <li>Usage data (pages visited, actions taken) for platform improvement</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900">3. How We Use Your Data</h2>
            <p className="text-slate-600">We process your data to:</p>
            <ul className="list-disc pl-5 text-slate-600 space-y-1">
              <li>Provide eligibility guidance and application management services</li>
              <li>Communicate with you about your applications and appointments</li>
              <li>Comply with legal obligations</li>
              <li>Improve the platform (analytics, aggregated and anonymised)</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900">4. Legal Basis</h2>
            <p className="text-slate-600">
              We rely on contractual necessity for service delivery, consent for marketing communications, and legitimate interests for platform security and fraud prevention.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900">5. Data Retention</h2>
            <p className="text-slate-600">
              Application data is retained for up to 10 years post-completion or as required by law. Documents are retained for 7 years. Marketing preferences are retained until you withdraw consent.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900">6. Your Rights</h2>
            <p className="text-slate-600">
              Under GDPR and applicable law, you have the right to access, correct, port, restrict processing of, or request erasure of your data. To exercise your rights, email {COMPANY.email} or use your account settings.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900">7. Security</h2>
            <p className="text-slate-600">
              All data is encrypted in transit (TLS) and at rest. Documents are stored in private encrypted object storage with time-limited signed URLs. Access is controlled by role-based permissions.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900">8. Contact</h2>
            <p className="text-slate-600">
              For privacy enquiries: {COMPANY.email}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
