"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageSquare, AlertTriangle, CheckCircle } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

/* Inline WhatsApp icon */
function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [phone,     setPhone]     = useState("");
  const [subject,   setSubject]   = useState("");
  const [message,   setMessage]   = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/leads/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone: phone || undefined, subject, message }),
      });
      const json = await res.json();

      if (json.success) {
        setSubmitted(true);
        // Also open WhatsApp so they can get an instant reply
        const text = [
          `*New Enquiry – Avensa Overseas*`,
          ``,
          `*Name:* ${firstName} ${lastName}`,
          `*Email:* ${email}`,
          phone    ? `*Phone:* ${phone}`     : null,
          subject  ? `*Subject:* ${subject}` : null,
          ``,
          `*Message:*`,
          message,
        ]
          .filter((line) => line !== null)
          .join("\n");
        const waUrl = `https://wa.me/37065690429?text=${encodeURIComponent(text)}`;
        window.open(waUrl, "_blank", "noopener,noreferrer");
      } else {
        setError(json.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

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
          <h1
            className="text-4xl lg:text-6xl font-bold text-white leading-tight max-w-3xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Get in{" "}
            <span className="text-gradient-hero">Touch</span>
          </h1>
          <p
            className="mt-5 text-base text-white/50 max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Questions about our platform or your application? Our support team is here to help.
          </p>
        </div>
      </div>

      <div className="page-container py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* ── Contact info ── */}
          <div className="space-y-4">

            {/* Direct WhatsApp CTA */}
            <a
              href={COMPANY.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-3xl bg-gradient-to-r from-[#25d366]/10 to-[#128c7e]/10 border border-[#25d366]/30 shadow-card hover:border-[#25d366]/60 hover:shadow-[0_8px_32px_rgba(37,211,102,0.15)] transition-all duration-300"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#25d366]/20 border border-[#25d366]/30 text-[#25d366] group-hover:bg-[#25d366]/30 transition-colors">
                <WhatsAppIcon size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#128c7e] uppercase tracking-wide" style={{ fontFamily: "var(--font-outfit)" }}>
                  Chat on WhatsApp
                </p>
                <p className="text-sm font-bold text-slate-800 mt-0.5" style={{ fontFamily: "var(--font-outfit)" }}>
                  {COMPANY.phone}
                </p>
                <p className="text-xs text-slate-400 mt-0.5" style={{ fontFamily: "var(--font-outfit)" }}>
                  Tap to open WhatsApp directly →
                </p>
              </div>
            </a>

            {[
              {
                icon: Mail,
                label: "Email",
                value: COMPANY.email,
                href: `mailto:${COMPANY.email}`,
              },
              {
                icon: Clock,
                label: "Support Hours",
                value: "Mon–Fri, 09:00–18:00 CET",
                href: null,
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-5 rounded-3xl bg-white border border-slate-200/70 shadow-card"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border"
                  style={{ background: "rgba(13,27,75,0.06)", borderColor: "rgba(13,27,75,0.12)" }}>
                  <Icon size={16} style={{ color: "#0d1b4b" }} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide" style={{ fontFamily: "var(--font-outfit)" }}>
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-semibold hover:underline transition-colors mt-0.5 block"
                      style={{ fontFamily: "var(--font-outfit)", color: "#0d1b4b" }}
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

            {/* Two office locations */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200/70 shadow-card space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border"
                  style={{ background: "rgba(13,27,75,0.06)", borderColor: "rgba(13,27,75,0.12)" }}>
                  <MapPin size={16} style={{ color: "#0d1b4b" }} />
                </div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide" style={{ fontFamily: "var(--font-outfit)" }}>
                  Our Offices
                </p>
              </div>
              {COMPANY.locations.map((loc) => (
                <div key={loc.city} className="flex items-start gap-3 pl-1">
                  <span className="text-xl mt-0.5">{loc.region === "Europe" ? "🇱🇹" : "🇮🇳"}</span>
                  <div>
                    <p className="text-sm font-bold text-ink" style={{ fontFamily: "var(--font-syne)" }}>
                      {loc.city}
                    </p>
                    <p className="text-xs text-slate-400" style={{ fontFamily: "var(--font-outfit)" }}>
                      {loc.country} · {loc.region}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer note */}
            <div className="flex gap-3 rounded-3xl border border-amber-200 bg-amber-50 p-5">
              <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p
                  className="text-xs font-bold text-amber-800 mb-1"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Important Note
                </p>
                <p
                  className="text-xs text-amber-700 leading-relaxed"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Avensa Overseas provides platform support and informational guidance only. We do
                  not provide legal immigration advice. For legal advice, consult a qualified
                  immigration lawyer.
                </p>
              </div>
            </div>
          </div>

          {/* ── Contact form ── */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-white overflow-hidden"
              style={{ border: "1px solid rgba(13,27,75,0.12)", boxShadow: "0 1px 4px rgba(13,27,75,0.07)" }}>
              {/* Card header — navy gradient strip matching brand */}
              <div className="px-6 py-5 flex items-center gap-3"
                style={{
                  background: "linear-gradient(135deg, #0d1b4b 0%, #1a2b6b 100%)",
                  borderBottom: "1px solid rgba(245,166,35,0.20)",
                }}>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.30)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
                    style={{ color: "#F5A623" }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-base font-bold text-white"
                    style={{ fontFamily: "var(--font-syne)" }}>
                    Send Us a Message
                  </h2>
                  <p className="text-xs mt-0.5" style={{ fontFamily: "var(--font-outfit)", color: "rgba(255,255,255,0.50)" }}>
                    Fill in the form — your enquiry is saved and WhatsApp opens automatically.
                  </p>
                </div>
              </div>

              <div className="px-6 py-6">
                {/* Success state */}
                {submitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full mx-auto"
                      style={{ background: "rgba(13,27,75,0.08)" }}>
                      <CheckCircle size={32} style={{ color: "#0d1b4b" }} />
                    </div>
                    <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-syne)", color: "#0d1b4b" }}>
                      Enquiry Received
                    </h3>
                    <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed" style={{ fontFamily: "var(--font-outfit)" }}>
                      Your message has been saved and WhatsApp has opened so you can send it directly. We will follow up shortly.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setFirstName(""); setLastName(""); setEmail(""); setPhone(""); setSubject(""); setMessage(""); }}
                      className="text-xs font-semibold underline"
                      style={{ color: "#0d1b4b", fontFamily: "var(--font-outfit)" }}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  {/* Error banner */}
                  {error && (
                    <div className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
                      <AlertTriangle size={16} className="text-red-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-red-700" style={{ fontFamily: "var(--font-outfit)" }}>{error}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Input
                      label="First Name"
                      placeholder="Your first name"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Input
                      label="Last Name"
                      placeholder="Your last name"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    label="Phone Number (optional)"
                    placeholder="+91 XXXXX XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />

                  {/* Subject select */}
                  <div>
                    <label className="form-label">Subject</label>
                    <div className="relative">
                      <select
                        className="form-input appearance-none pr-10"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      >
                        <option value="">Select a subject</option>
                        <option>Account &amp; Registration</option>
                        <option>Application Support</option>
                        <option>Document Upload Issue</option>
                        <option>Eligibility Checker</option>
                        <option>Payment Query</option>
                        <option>Technical Issue</option>
                        <option>General Enquiry</option>
                      </select>
                      <svg
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2"
                      >
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
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-shine group relative w-full inline-flex items-center justify-center gap-2.5 rounded-2xl px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    style={{
                      fontFamily: "var(--font-outfit)",
                      background: "linear-gradient(135deg, #0d1b4b 0%, #1a2b6b 100%)",
                      border: "1px solid rgba(245,166,35,0.35)",
                      boxShadow: "0 4px 20px rgba(13,27,75,0.40)",
                    }}
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"
                          className="shrink-0" style={{ color: "#F5A623" }}>
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Send Message &amp; Open WhatsApp
                      </>
                    )}
                  </button>
                </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
