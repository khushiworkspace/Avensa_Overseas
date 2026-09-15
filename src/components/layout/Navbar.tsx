"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, User, ChevronDown, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PUBLIC_NAV_LINKS } from "@/lib/constants";
import { AvensaLogo } from "@/components/ui/AvensaLogo";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      {/* ── Announcement bar ── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 py-2">
        <div className="animate-ticker flex whitespace-nowrap" style={{ animation: "ticker 28s linear infinite" }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-4" style={{ fontFamily: "var(--font-outfit)" }}>
              {["🚀 EU Blue Card applications open for 2026", "✨ New: Digital Nomad Visa guide for Portugal & Spain", "🌍 13 EU countries now fully supported", "🔒 Bank-grade security for all your documents"].map((item, j) => (
                <span key={j} className="text-xs font-medium text-white/90 flex items-center gap-2">
                  <span>{item}</span>
                  <span className="text-white/30">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-void/95 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.40)]"
            : "bg-void border-b border-white/[0.05]"
        )}
      >
        <div className="page-container">
          <div className="flex h-[68px] items-center justify-between gap-6">

            {/* ── Logo ── */}
            <Link
              href="/"
              className="group relative shrink-0 transition-all duration-300 hover:opacity-90"
            >
              <AvensaLogo variant="horizontal" theme="dark" size="sm" animated />
              {/* subtle glow behind logo on hover */}
              <span className="absolute -inset-3 rounded-2xl bg-indigo-500/0 group-hover:bg-indigo-500/8 transition-all duration-500 pointer-events-none" />
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              {PUBLIC_NAV_LINKS.map((link) => {
                const active = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-[13px] font-medium rounded-xl transition-all duration-200 group",
                      active
                        ? "text-white"
                        : "text-white/50 hover:text-white"
                    )}
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {/* hover background pill */}
                    <span className={cn(
                      "absolute inset-0 rounded-xl transition-all duration-200",
                      active
                        ? "bg-white/[0.07]"
                        : "bg-white/0 group-hover:bg-white/[0.05]"
                    )} />

                    <span className="relative">{link.label}</span>

                    {/* active dot indicator */}
                    {active && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[3px] w-[3px] rounded-full bg-indigo-400" />
                    )}

                    {/* hover underline sweep */}
                    <span className={cn(
                      "absolute bottom-0 left-3 right-3 h-px rounded-full",
                      "bg-gradient-to-r from-indigo-400/0 via-indigo-400 to-violet-400/0",
                      "transition-all duration-300 origin-left",
                      active
                        ? "scale-x-100 opacity-70"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-50"
                    )} />
                  </Link>
                );
              })}
            </nav>

            {/* ── Desktop Actions ── */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <Link href="/auth/login">
                <button
                  className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[13px] font-medium text-white/50 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  <User size={13} className="shrink-0" />
                  Sign In
                </button>
              </Link>

              <Link href="/auth/register">
                <button
                  className={cn(
                    "btn-shine relative inline-flex items-center gap-2 rounded-xl",
                    "bg-gradient-to-r from-indigo-600 to-violet-600",
                    "px-5 py-2.5 text-[13px] font-semibold text-white",
                    "shadow-[0_4px_20px_rgba(79,70,229,0.40)]",
                    "transition-all duration-300",
                    "hover:shadow-[0_6px_30px_rgba(79,70,229,0.60)] hover:-translate-y-0.5",
                    "active:scale-[0.97]"
                  )}
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  <Sparkles size={13} className="text-gold-300" />
                  Get Started
                </button>
              </Link>
            </div>

            {/* ── Mobile toggle ── */}
            <button
              className="lg:hidden relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] text-white/70 hover:bg-white/[0.10] hover:text-white transition-all duration-200"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span
                className={cn(
                  "absolute transition-all duration-300",
                  mobileOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                )}
              >
                <Menu size={17} />
              </span>
              <span
                className={cn(
                  "absolute transition-all duration-300",
                  !mobileOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                )}
              >
                <X size={17} />
              </span>
            </button>

          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-500",
            mobileOpen ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0"
          )}
          style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
        >
          <div className="relative border-t border-white/[0.06] px-4 pb-6 pt-4"
            style={{
              background: "linear-gradient(180deg, rgba(10,15,46,0.98) 0%, rgba(5,7,20,0.99) 100%)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Dot grid accent */}
            <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

            {/* Nav links */}
            <nav className="relative flex flex-col gap-1">
              {PUBLIC_NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-[13px] font-medium transition-all duration-200",
                      active
                        ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/25"
                        : "text-white/55 hover:bg-white/[0.05] hover:text-white"
                    )}
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Action buttons */}
            <div className="relative mt-4 grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-4">
              <Link href="/auth/login">
                <button
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-white hover:bg-white/[0.09] transition-all"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  <User size={13} /> Sign In
                </button>
              </Link>
              <Link href="/auth/register">
                <button
                  className="btn-shine w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-indigo-md transition-all"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  <Sparkles size={13} className="text-gold-300" />
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
