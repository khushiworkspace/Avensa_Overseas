"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { PUBLIC_NAV_LINKS } from "@/lib/constants";
import { AvensaLogo } from "@/components/ui/AvensaLogo";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-navy-950/96 backdrop-blur-xl shadow-float border-b border-white/5"
          : "bg-navy-950 border-b border-white/5"
      )}
    >
      <div className="page-container">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="group">
            <AvensaLogo variant="horizontal" theme="dark" size="sm" />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {PUBLIC_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative rounded-lg px-3.5 py-2 text-sm font-medium text-white/70 transition-all duration-200 hover:text-white"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/6 transition-colors duration-200" />
              </Link>
            ))}
          </nav>

          {/* ── Desktop Actions ── */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link href="/auth/login">
              <button className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white/70 transition-all duration-200 hover:bg-white/8 hover:text-white">
                <User size={14} />
                Sign In
              </button>
            </Link>
            <Link href="/auth/register">
              <button className="inline-flex items-center gap-2 rounded-xl bg-coral-500 px-4 py-2 text-sm font-semibold text-white shadow-coral-sm transition-all duration-200 hover:bg-coral-600 hover:shadow-coral-md active:scale-[0.98]">
                Get Started
                <span className="text-coral-200 text-base leading-none">→</span>
              </button>
            </Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg bg-white/6 text-white/80 hover:bg-white/10 hover:text-white transition-all"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="relative border-t border-white/6 bg-navy-950 px-4 pb-5 pt-3">
          <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

          <nav className="relative flex flex-col gap-0.5">
            {PUBLIC_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-white/70 hover:bg-white/6 hover:text-white transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="relative mt-4 flex flex-col gap-2 border-t border-white/6 pt-4">
            <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-all">
                <User size={14} />
                Sign In
              </button>
            </Link>
            <Link href="/auth/register" onClick={() => setMobileOpen(false)}>
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-coral-500 px-5 py-2.5 text-sm font-semibold text-white shadow-coral-sm hover:bg-coral-600 transition-all">
                Get Started →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
