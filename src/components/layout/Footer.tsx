import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook, ArrowUpRight, Shield } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { AvensaLogo } from "@/components/ui/AvensaLogo";

/* WhatsApp SVG icon (inline, no extra dep) */
function WhatsAppIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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
    <div className="flex flex-col items-center gap-0.5 px-5 py-3 rounded-2xl"
      style={{ border: "1px solid rgba(245,166,35,0.22)", background: "rgba(245,166,35,0.07)" }}>
      <span
        className="text-xl font-bold text-white"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {value}
      </span>
      <span
        className="text-[11px] uppercase tracking-wider"
        style={{ fontFamily: "var(--font-outfit)", color: "rgba(245,166,35,0.80)" }}
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
        {/* top gradient glow — navy */}
        <div
          className="absolute -top-48 left-1/2 -translate-x-1/2 h-96 w-[900px] rounded-full blur-[140px]"
          style={{ background: "radial-gradient(ellipse, rgba(13,27,75,0.35) 0%, transparent 70%)" }}
        />
        {/* bottom right accent */}
        <div
          className="absolute bottom-0 right-0 h-64 w-64 rounded-full blur-[120px]"
          style={{ background: "rgba(245,158,11,0.08)" }}
        />
        {/* dot grid */}
        <div className="absolute inset-0 dot-pattern opacity-[0.14]" />
      </div>

      {/* ── Main footer body ── */}
      <div className="relative page-container py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo on white card so it's fully visible against dark footer */}
            <Link href="/" className="inline-block rounded-2xl bg-white px-5 py-3 shadow-[0_2px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-shadow duration-200">
              <AvensaLogo variant="horizontal" theme="light" size="sm" />
            </Link>

            <p
              className="text-sm leading-relaxed text-white/70 max-w-xs"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Helping applicants navigate EU immigration with clear guidance,
              structured tools, and transparent real-time tracking.
            </p>

            {/* Stats */}
            <div className="flex gap-3 flex-wrap">
              <StatPill value="30+" label="Countries" />
              <StatPill value="30+" label="Routes"    />
              <StatPill value="98%" label="Accuracy"  />
            </div>

            {/* Contact */}
            <div className="space-y-2.5">
              {[
                { icon: Mail,   label: COMPANY.email,   href: `mailto:${COMPANY.email}` },
                { icon: Phone,  label: COMPANY.phone,   href: COMPANY.whatsapp },
              ].map(({ icon: Icon, label, href }) => (
                <div key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-2.5 text-sm text-white/65 hover:text-[#F5A623] transition-colors"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] group-hover:bg-[rgba(245,166,35,0.15)] transition-colors">
                      <Icon size={12} />
                    </span>
                    {label}
                  </a>
                </div>
              ))}
              {/* Two office locations */}
              {COMPANY.locations.map((loc) => (
                <div
                  key={loc.city}
                  className="flex items-center gap-2.5 text-sm text-white/65"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white/[0.05]">
                    <MapPin size={12} />
                  </span>
                  <span>{loc.city}, {loc.country}</span>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex gap-2">
              {[
                { href: COMPANY.socials.instagram, Icon: Instagram,    label: "Instagram" },
                { href: COMPANY.socials.facebook,  Icon: Facebook,     label: "Facebook"  },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.07] text-white/65 hover:bg-[rgba(245,166,35,0.15)] hover:border-[rgba(245,166,35,0.35)] hover:text-[#F5A623] transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
              <a
                href={COMPANY.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="group flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.07] text-white/65 hover:bg-[#25d366]/20 hover:border-[#25d366]/40 hover:text-[#25d366] transition-all duration-200"
              >
                <WhatsAppIcon size={14} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3
                className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em]"
                style={{ fontFamily: "var(--font-outfit)", color: "#F5A623" }}
              >
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-white/65 hover:text-white transition-colors duration-200"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      <span className="relative">
                        {link.label}
                        {/* gold underline sweep */}
                        <span className="absolute -bottom-px left-0 h-px w-0 group-hover:w-full transition-all duration-300 rounded-full"
                          style={{ background: "rgba(245,166,35,0.60)" }} />
                      </span>
                      <ArrowUpRight
                        size={10}
                        className="opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shrink-0"
                        style={{ color: "#F5A623" }}
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
          style={{ background: "linear-gradient(90deg, transparent, rgba(13,27,75,0.60), rgba(245,166,35,0.35), transparent)" }}
        />

        <div className="page-container py-6">
          {/* Disclaimer */}
          <div className="flex items-start gap-2.5 mb-4">
            <Shield size={12} className="text-gold-400 shrink-0 mt-0.5" />
            <p
              className="text-[11px] text-white/55 leading-relaxed max-w-4xl"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              <strong className="text-white/70 font-semibold">Important Disclaimer: </strong>
              {COMPANY.disclaimer}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p
              className="text-[11px] text-white/55"
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
                  className="text-[11px] text-white/50 hover:text-white/80 transition-colors"
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
