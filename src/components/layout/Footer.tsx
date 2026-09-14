import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ArrowUpRight } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { AvensaLogo } from "@/components/ui/AvensaLogo";

const footerLinks = {
  "Immigration": [
    { label: "Countries",             href: "/countries"      },
    { label: "Immigration Routes",    href: "/routes"         },
    { label: "Eligibility Checker",   href: "/eligibility"    },
    { label: "Short-Stay Calculator", href: "/calculator"     },
    { label: "News & Updates",        href: "/news"           },
  ],
  "Work in Europe": [
    { label: "Skilled Worker Visa",  href: "/routes/work"     },
    { label: "EU Blue Card",         href: "/routes/work"     },
    { label: "Job Seeker Visa",      href: "/routes/work"     },
    { label: "Digital Nomad Visa",   href: "/routes/special"  },
    { label: "EU Blue Card Guide",   href: "/knowledge-base"  },
  ],
  "Support": [
    { label: "Knowledge Base",   href: "/knowledge-base"      },
    { label: "FAQs",             href: "/knowledge-base#faq"  },
    { label: "Contact Us",       href: "/contact"             },
    { label: "Privacy Policy",   href: "/privacy"             },
    { label: "Terms of Service", href: "/terms"               },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-navy-950 text-white overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-teal-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-coral-600/6 blur-3xl" />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>

      {/* ── Main section ── */}
      <div className="relative page-container py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <AvensaLogo variant="horizontal" theme="dark" size="sm" showTagline />
            </Link>

            <p className="text-sm leading-relaxed text-white/50 max-w-sm">
              Helping applicants navigate EU immigration with clear guidance,
              structured tools, and transparent real-time tracking.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-2.5">
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2.5 text-sm text-white/40 hover:text-teal-300 transition-colors group"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 group-hover:bg-teal-900/60 transition-colors shrink-0">
                  <Mail size={12} />
                </span>
                {COMPANY.email}
              </a>
              <div className="flex items-center gap-2.5 text-sm text-white/40">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 shrink-0">
                  <Phone size={12} />
                </span>
                {COMPANY.phone}
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/40">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 shrink-0">
                  <MapPin size={12} />
                </span>
                {COMPANY.address}
              </div>
            </div>

            {/* Social icons */}
            <div className="mt-6 flex gap-2">
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
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/40 hover:bg-teal-600/30 hover:text-teal-300 transition-all duration-200"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-teal-400">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-white/40 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={11}
                        className="opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
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
      <div className="relative border-t border-white/5 bg-navy-950/80 py-5">
        <div className="page-container">
          <p className="text-xs text-white/25 leading-relaxed max-w-4xl">
            <strong className="text-white/40 font-semibold">Important Disclaimer: </strong>
            {COMPANY.disclaimer}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-white/20">
              © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
            </p>
            <div className="flex gap-5 text-xs text-white/25">
              {[
                { label: "Privacy",       href: "/privacy"       },
                { label: "Cookies",       href: "/cookies"       },
                { label: "Accessibility", href: "/accessibility" },
                { label: "Terms",         href: "/terms"         },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-white/60 transition-colors">
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
