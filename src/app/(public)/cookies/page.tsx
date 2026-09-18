import type { Metadata } from "next";
import { Cookie } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = { title: "Cookie Policy" };

const cookieTypes = [
  { name: "Strictly Necessary", desc: "Required for the platform to function. Cannot be disabled.", examples: "Session token, CSRF protection, load balancer cookies", required: true },
  { name: "Functional",         desc: "Remember your preferences such as language and display settings.",                                                             examples: "Language preference, theme preference",                            required: false },
  { name: "Analytics",          desc: "Help us understand how visitors use the platform so we can improve it. All data is anonymised and aggregated.",               examples: "Page views, feature usage, error rates (no personal identifiers)", required: false },
  { name: "Marketing",          desc: "Used to show relevant content. We do not share data with third-party advertisers.",                                           examples: "Personalised content suggestions within the platform",             required: false },
];

const sections = [
  { title: "What are cookies?", body: `Cookies are small text files stored on your device when you visit a website. They help the site remember information about your visit and improve your experience. ${COMPANY.name} uses cookies in accordance with this policy and applicable law.` },
  { title: "Managing cookies",  body: "You can manage your cookie preferences at any time using the Cookie Settings panel (accessible from the footer). You can also configure your browser to refuse or delete cookies, but this may affect platform functionality." },
  { title: "Third-party cookies", body: "We use limited third-party services (e.g. analytics) that may set their own cookies. These are governed by the respective third-party privacy policies. We do not use third-party advertising cookies." },
  { title: "Contact",           body: `For cookie-related queries: ${COMPANY.email}` },
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <div className="gradient-hero py-20">
        <div className="relative z-10 page-container">
          <Breadcrumb items={[{ label: "Cookie Policy" }]} className="text-white/50 mb-6" />
          <div className="section-eyebrow mb-5">
            <Cookie size={11} />
            Legal
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
            Cookie Policy
          </h1>
          <p className="mt-3 text-sm text-white/40" style={{ fontFamily: "var(--font-outfit)" }}>
            Last updated: 1 January 2024
          </p>
        </div>
      </div>
      <div className="page-container py-14 max-w-3xl space-y-6">

        {/* Intro section */}
        <div className="rounded-3xl bg-white border border-slate-200/70 shadow-card overflow-hidden">
          <div className="px-8 py-8">
            <h2 className="text-base font-bold text-ink mb-3" style={{ fontFamily: "var(--font-syne)" }}>
              What are cookies?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-outfit)" }}>
              {sections[0].body}
            </p>
          </div>
        </div>

        {/* Cookie types */}
        <div className="rounded-3xl bg-white border border-slate-200/70 shadow-card overflow-hidden">
          <div className="px-8 pt-8 pb-4 border-b border-slate-100">
            <h2 className="text-base font-bold text-ink" style={{ fontFamily: "var(--font-syne)" }}>
              Types of Cookies We Use
            </h2>
          </div>
          <div className="px-8 py-6 space-y-4">
            {cookieTypes.map((ct) => (
              <div
                key={ct.name}
                className="rounded-2xl border border-slate-200/80 p-5 transition-all duration-200 hover:border-[rgba(245,166,35,0.35)] hover:bg-[rgba(245,166,35,0.03)]"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-ink text-sm" style={{ fontFamily: "var(--font-syne)" }}>
                    {ct.name}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      ct.required
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-amber-100 text-amber-700 border border-amber-200"
                    }`}
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {ct.required ? "Required" : "Optional"}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-outfit)" }}>
                  {ct.desc}
                </p>
                <p className="text-xs text-slate-400 mt-2" style={{ fontFamily: "var(--font-outfit)" }}>
                  <span className="font-semibold">Examples:</span> {ct.examples}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Remaining sections */}
        <div className="rounded-3xl bg-white border border-slate-200/70 shadow-card overflow-hidden">
          <div className="px-8 py-8 space-y-8">
            {sections.slice(1).map(({ title, body }) => (
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
