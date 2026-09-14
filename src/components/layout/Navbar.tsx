"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Globe, ChevronDown, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY, PUBLIC_NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-800/95 backdrop-blur-sm shadow-lg">
      <div className="page-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500 shadow-sm">
              <Globe size={18} className="text-white" />
            </div>
            <div className="leading-tight">
              <span className="block text-sm font-bold text-white group-hover:text-gold-300 transition-colors">
                Avensa Overseas
              </span>
              <span className="block text-xs text-blue-200">EU Immigration Portal</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {PUBLIC_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-blue-100 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-blue-100 hover:text-white hover:bg-white/10">
                <User size={15} />
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="gold" size="sm">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden rounded-lg p-2 text-blue-100 hover:bg-white/10 hover:text-white transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-brand-900 px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            {PUBLIC_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
            <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
              <Button variant="secondary" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register" onClick={() => setMobileOpen(false)}>
              <Button variant="gold" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
