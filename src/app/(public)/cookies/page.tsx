import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = { title: "Cookie Policy" };

const cookieTypes = [
  {
    name: "Strictly Necessary",
    description: "Required for the platform to function. Cannot be disabled.",
    examples: "Session token, CSRF protection, load balancer cookies",
    canDisable: false,
  },
  {
    name: "Functional",
    description: "Remember your preferences such as language and display settings.",
    examples: "Language preference, theme preference",
    canDisable: true,
  },
  {
    name: "Analytics",
    description: "Help us understand how visitors use the platform so we can improve it. All data is anonymised and aggregated.",
    examples: "Page views, feature usage, error rates (no personal identifiers)",
    canDisable: true,
  },
  {
    name: "Marketing",
    description: "Used to show relevant content. We do not share data with third-party advertisers.",
    examples: "Personalised content suggestions within the platform",
    canDisable: true,
  },
];

export default function CookiesPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="gradient-hero py-12">
        <div className="page-container">
          <Breadcrumb items={[{ label: "Cookie Policy" }]} className="text-blue-200 mb-4" />
          <h1 className="text-3xl font-extrabold text-white font-heading">Cookie Policy</h1>
          <p className="text-blue-200 mt-2 text-sm">Last updated: 1 January 2024</p>
        </div>
      </div>

      <div className="page-container py-12 max-w-3xl">
        <div className="space-y-8 text-sm text-slate-600">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">What are cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help the site remember information about your visit and improve your experience.
              {COMPANY.name} uses cookies in accordance with this policy and applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Types of cookies we use</h2>
            <div className="space-y-4">
              {cookieTypes.map((ct) => (
                <div key={ct.name} className="rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-900">{ct.name}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${ct.canDisable ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                      {ct.canDisable ? "Optional" : "Required"}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{ct.description}</p>
                  <p className="text-xs text-slate-400 mt-2"><strong>Examples:</strong> {ct.examples}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Managing cookies</h2>
            <p>
              You can manage your cookie preferences at any time using the Cookie Settings panel (accessible from the footer). You can also configure your browser to refuse or delete cookies, but this may affect platform functionality.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Third-party cookies</h2>
            <p>
              We use Stripe for payment processing, which may set cookies on our payment pages. These are subject to Stripe&apos;s own cookie policy. We do not use third-party advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Contact</h2>
            <p>For questions about our use of cookies: <a href={`mailto:${COMPANY.email}`} className="text-brand-600 hover:underline">{COMPANY.email}</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
