import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, MessageSquare, AlertTriangle } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>

      {/* ── Hero ── */}
      <div className="gradient-hero py-20">
        <div className="relative z-10 page-container">
          <Breadcrumb items={[{ label: "Contact" }]} className="text-white/50 mb-6" />
          <div className="section-eyebrow mb-5">
            <MessageSquare size={11} />
            Support
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight max-w-3xl"
            style={{ fontFamily: "var(--font-syne)" }}>
            Get in{" "}
            <span className="text-gradient-hero">Touch</span>
          </h1>
          <p className="mt-5 text-base text-white/50 max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-outfit)" }}>
            Questions about our platform or your application? Our support team is here to help.
          </p>
        </div>
      </div>

      <div className="page-container py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* ── Contact info ── */}
          <div className="space-y-4">
            {[
              { icon: Mail,  label: "Email",         value: COMPANY.email,  href: `mailto:${COMPANY.email}` },
              { icon: Phone, label: "Phone",         value: COMPANY.phone,  href: `tel:${COMPANY.phone}`   },
              { icon: MapPin,label: "Address",       value: COMPANY.address, href: null                    },
              { icon: Clock, label: "Support Hours", value: "Mon–Fri, 09:00–18:00 GMT", href: null         },
            ].map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-5 rounded-3xl bg-white border border-slate-200/70 shadow-card"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100">
                  <Icon size={16} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-outfit)" }}>
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors mt-0.5 block"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-ink mt-0.5" style={{ fontFamily: "var(--font-outfit)" }}>
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Disclaimer note */}
            <div className="flex gap-3 rounded-3xl border border-amber-200 bg-amber-50 p-5">
              <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-800 mb-1" style={{ fontFamily: "var(--font-outfit)" }}>
                  Important Note
                </p>
                <p className="text-xs text-amber-700 leading-relaxed" style={{ fontFamily: "var(--font-outfit)" }}>
                  Avensa Overseas provides platform support and informational guidance only. We do not provide legal immigration advice. For legal advice, consult a qualified immigration lawyer.
                </p>
              </div>
            </div>
          </div>

          {/* ── Contact form ── */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-white border border-slate-200/70 shadow-card overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100">
                <h2 className="text-xl font-bold text-ink" style={{ fontFamily: "var(--font-syne)" }}>
                  Send Us a Message
                </h2>
                <p className="text-sm text-slate-400 mt-1" style={{ fontFamily: "var(--font-outfit)" }}>
                  We typically respond within 1–2 business days.
                </p>
              </div>
              <div className="px-6 py-6">
                <form className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Input label="First Name" placeholder="Your first name" required />
                    <Input label="Last Name"  placeholder="Your last name"  required />
                  </div>
                  <Input label="Email Address" type="email" placeholder="your@email.com" required />

                  {/* Subject select */}
                  <div>
                    <label className="form-label">Subject</label>
                    <div className="relative">
                      <select className="form-input appearance-none pr-10">
                        <option value="">Select a subject</option>
                        <option>Account &amp; Registration</option>
                        <option>Application Support</option>
                        <option>Document Upload Issue</option>
                        <option>Eligibility Checker</option>
                        <option>Payment Query</option>
                        <option>Technical Issue</option>
                        <option>General Enquiry</option>
                      </select>
                      <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="form-label">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Describe your question or issue in detail…"
                      className="form-input resize-none"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <MessageSquare size={16} /> Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
