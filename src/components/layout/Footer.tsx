import Link from "next/link";
import { Globe, Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import { COMPANY } from "@/lib/constants";

const footerLinks = {
  "Immigration": [
    { label: "Countries", href: "/countries" },
    { label: "Immigration Routes", href: "/routes" },
    { label: "Eligibility Checker", href: "/eligibility" },
    { label: "Short-Stay Calculator", href: "/calculator" },
    { label: "News & Updates", href: "/news" },
  ],
  "Work in Europe": [
    { label: "Skilled Worker Visa", href: "/routes/work" },
    { label: "EU Blue Card", href: "/routes/work" },
    { label: "Job Seeker Visa", href: "/routes/work" },
    { label: "Digital Nomad Visa", href: "/routes/special" },
    { label: "EU Blue Card Guide", href: "/knowledge-base" },
  ],
  "Support": [
    { label: "Knowledge Base", href: "/knowledge-base" },
    { label: "FAQs", href: "/knowledge-base#faq" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main */}
      <div className="page-container py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 group mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500">
                <Globe size={18} className="text-white" />
              </div>
              <div className="leading-tight">
                <span className="block text-sm font-bold text-white">{COMPANY.name}</span>
                <span className="block text-xs text-slate-400">EU Immigration Portal</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Helping applicants navigate EU immigration with clear guidance, structured tools and transparent tracking.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <Mail size={14} />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">
                  {COMPANY.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Phone size={14} />
                <span>{COMPANY.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin size={14} />
                <span>{COMPANY.address}</span>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <a href={COMPANY.socials.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Linkedin size={14} />
              </a>
              <a href={COMPANY.socials.twitter} target="_blank" rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Twitter size={14} />
              </a>
              <a href={COMPANY.socials.facebook} target="_blank" rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Facebook size={14} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/5 bg-slate-950 py-5">
        <div className="page-container">
          <p className="text-xs text-slate-500 leading-relaxed max-w-4xl">
            <strong className="text-slate-400">Important Disclaimer:</strong>{" "}
            {COMPANY.disclaimer}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-600">
              © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-slate-500">
              <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
              <Link href="/cookies" className="hover:text-slate-300 transition-colors">Cookies</Link>
              <Link href="/accessibility" className="hover:text-slate-300 transition-colors">Accessibility</Link>
              <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
