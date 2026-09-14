"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PUBLIC_NAV_LINKS } from "@/lib/constants";
import { AvensaLogo } from "@/components/ui/AvensaLogo";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* close mobile on route change */
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-navy-950/94 backdrop-blur-2xl shadow-aurora border-b border-white/5"
          : "bg-navy-950 border-b border-white/5"
      )}
    >
      <div className="page-container">
        <div className="flex h-[66px] items-center justify-between gap-6">

          {/* ── Logo ── */}
          <Link href="/" className="group transition-opacity duration-200 hover:opacity-90 shrink-0">
            <AvensaLogo variant="horizontal" theme="dark" size="sm" animated />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {PUBLIC_NAV_LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group",
                    active ? "text-white" : "text-white/55 hover:text-white"
                  )}
                >
                  {/* hover bg pill */}
                  <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/6 transition-colors duration-200" />

                  <span className="relative">{link.label}</span>

                  {/* active / hover underline */}
                  <span
                    className={cn(
                      "absolute bottom-0 left-3 right-3 h-[2px] rounded-full",
                      "bg-gradient-to-r from-teal-400 to-coral-400",
                      "transition-all duration-300 origin-left",
                      active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop Actions ── */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link href="/auth/login">
              <button className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white/55 transition-all duration-200 hover:bg-white/7 hover:text-white">
                <User size={14} />
                Sign In
              </button>
            </Link>

            {/* Shimmer CTA */}
            <Link href="/auth/register">
              <button className="btn-shine relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-coral-600 to-coral-500 px-5 py-2.5 text-sm font-bold text-white shadow-coral-md transition-all duration-300 hover:shadow-coral-lg hover:-translate-y-0.5 active:scale-[0.97]">
                Get Started
                <span className="ml-0.5 text-coral-200">→</span>
              </button>
            </Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl bg-white/7 text-white/75 hover:bg-white/12 hover:text-white transition-all duration-200"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span className={cn("transition-all duration-300", mobileOpen ? "rotate-90 opacity-0 absolute" : "rotate-0 opacity-100")}>
              <Menu size={18} />
            </span>
            <span className={cn("transition-all duration-300", !mobileOpen ? "rotate-90 opacity-0 absolute" : "rotate-0 opacity-100")}>
              <X size={18} />
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div className={cn(
        "lg:hidden overflow-hidden transition-all duration-500 ease-spring",
        mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="relative border-t border-white/6 px-4 pb-6 pt-3 bg-navy-950">
          {/* dot accent */}
          <div className="absolute inset-0 dot-pattern opacity-25 pointer-events-none" />

          <nav className="relative flex flex-col gap-0.5 stagger">
            {PUBLIC_NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-teal-600/20 text-teal-300 border border-teal-500/20"
                      : "text-white/60 hover:bg-white/6 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="relative mt-4 grid grid-cols-2 gap-2 border-t border-white/6 pt-4">
            <Link href="/auth/login">
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-all">
                <User size={13} /> Sign In
              </button>
            </Link>
            <Link href="/auth/register">
              <button className="btn-shine w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-coral-600 to-coral-500 px-4 py-2.5 text-sm font-bold text-white shadow-coral-sm hover:shadow-coral-md transition-all">
                Get Started →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
