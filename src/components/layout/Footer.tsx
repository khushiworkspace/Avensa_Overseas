import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ArrowUpRight, Shield } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { AvensaLogo } from "@/components/ui/AvensaLogo";

const footerLinks = {
  Immigration: [
    { label: "Countries",             href: "/countries"      },
    { label: "Immigration Routes",    href: "/routes"         },
    { label: "Eligibility Checker",   href: "/eligibility"    },
    { label: "Short-Stay Calculator", href: "/calculator"     },
    { label: "News & Updates",        href: "/news"           },
  ],
  "Work in Europe": [
    { label: "Skilled Worker Visa",  href: "/routes/work"    },
    { label: "EU Blue Card",         href: "/routes/work"    },
    { label: "Job Seeker Visa",      href: "/routes/work"    },
    { label: "Digital Nomad Visa",   href: "/routes/special" },
    { label: "EU Blue Card Guide",   href: "/knowledge-base" },
  ],
  Support: [
    { label: "Knowledge Base",   href: "/knowledge-base"     },
    { label: "FAQs",             href: "/knowledge-base#faq" },
    { label: "Contact Us",       href: "/contact"            },
    { label: "Privacy Policy",   href: "/privacy"            },
    { label: "Terms of Service", href: "/terms"              },
  ],
};

/* ── Small glowing stat pill ── */
function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-5 py-3 rounded-2xl border border-indigo-500/20 bg-indigo-500/8">
      <span
        className="text-xl font-bold text-white"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {value}
      </span>
      <span
        className="text-[11px] text-white/40 uppercase tracking-wider"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {label}
      </span>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050714 0%, #08091f 100%)",
      }}
    >
      {/* ── Background decoration ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* top gradient glow */}
        <div
          className="absolute -top-48 left-1/2 -translate-x-1/2 h-96 w-[900px] rounded-full blur-[140px]"
          style={{ background: "radial-gradient(ellipse, rgba(79,70,229,0.22) 0%, transparent 70%)" }}
        />
        {/* bottom right accent */}
        <div
          className="absolute bottom-0 right-0 h-64 w-64 rounded-full blur-[120px]"
          style={{ background: "rgba(245,158,11,0.08)" }}
        />
        {/* dot grid */}
        <div className="absolute inset-0 dot-pattern opacity-[0.14]" />
      </div>

      {/* ── Top CTA strip ── */}
      <div
        className="relative border-b border-white/[0.06]"
        style={{
          background: "linear-gradient(90deg, rgba(79,70,229,0.12) 0%, rgba(124,58,237,0.08) 50%, rgba(245,158,11,0.06) 100%)",
        }}
      >
        <div className="page-container py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <p
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Ready to start your EU journey?
              </p>
              <p
                className="mt-1 text-sm text-white/45"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Create a free account in minutes. No legal advice — just clarity.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link href="/eligibility">
                <button
                  className="inline-flex items-center gap-2 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 px-5 py-2.5 text-sm font-medium text-indigo-300 transition-all duration-200 hover:bg-indigo-500/20 hover:text-white"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Check Eligibility
                </button>
              </Link>
              <Link href="/auth/register">
                <button
                  className="btn-shine inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(79,70,229,0.40)] transition-all duration-300 hover:shadow-[0_8px_36px_rgba(79,70,229,0.55)] hover:-translate-y-0.5"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Get Started Free →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div className="relative page-container py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <AvensaLogo variant="horizontal" theme="dark" size="sm" showTagline />
            </Link>

            <p
              className="text-sm leading-relaxed text-white/45 max-w-xs"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Helping applicants navigate EU immigration with clear guidance,
              structured tools, and transparent real-time tracking.
            </p>

            {/* Stats */}
            <div className="flex gap-3 flex-wrap">
              <StatPill value="13+" label="Countries" />
              <StatPill value="30+" label="Routes"    />
              <StatPill value="98%" label="Accuracy"  />
            </div>

            {/* Contact */}
            <div className="space-y-2.5">
              {[
                { icon: Mail,   label: COMPANY.email,   href: `mailto:${COMPANY.email}` },
                { icon: Phone,  label: COMPANY.phone,   href: null },
                { icon: MapPin, label: COMPANY.address, href: null },
              ].map(({ icon: Icon, label, href }) => (
                <div key={label}>
                  {href ? (
                    <a
                      href={href}
                      className="group flex items-center gap-2.5 text-sm text-white/38 hover:text-indigo-300 transition-colors"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] group-hover:bg-indigo-500/20 transition-colors">
                        <Icon size={12} />
                      </span>
                      {label}
                    </a>
                  ) : (
                    <div
                      className="flex items-center gap-2.5 text-sm text-white/38"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white/[0.05]">
                        <Icon size={12} />
                      </span>
                      {label}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex gap-2">
              {[
                { href: COMPANY.socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
                { href: COMPANY.socials.twitter,  Icon: Twitter,  label: "Twitter"  },
                { href: COMPANY.socials.facebook, Icon: Facebook, label: "Facebook" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.07] text-white/38 hover:bg-indigo-600/30 hover:border-indigo-500/40 hover:text-indigo-300 transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3
                className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-400"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-white/38 hover:text-white transition-colors duration-200"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      <span className="relative">
                        {link.label}
                        {/* underline sweep */}
                        <span className="absolute -bottom-px left-0 h-px w-0 group-hover:w-full bg-indigo-400/60 transition-all duration-300 rounded-full" />
                      </span>
                      <ArrowUpRight
                        size={10}
                        className="opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 text-indigo-400 shrink-0"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Disclaimer + copyright ── */}
      <div className="relative border-t border-white/[0.05]">
        {/* Subtle gradient line at the top of this section */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(79,70,229,0.35), rgba(245,158,11,0.20), transparent)" }}
        />

        <div className="page-container py-6">
          {/* Disclaimer */}
          <div className="flex items-start gap-2.5 mb-4">
            <Shield size={12} className="text-gold-400 shrink-0 mt-0.5" />
            <p
              className="text-[11px] text-white/22 leading-relaxed max-w-4xl"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              <strong className="text-white/35 font-semibold">Important Disclaimer: </strong>
              {COMPANY.disclaimer}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p
              className="text-[11px] text-white/18"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
            </p>
            <div className="flex gap-5">
              {[
                { label: "Privacy",       href: "/privacy"       },
                { label: "Cookies",       href: "/cookies"       },
                { label: "Accessibility", href: "/accessibility" },
                { label: "Terms",         href: "/terms"         },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[11px] text-white/22 hover:text-white/55 transition-colors"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
