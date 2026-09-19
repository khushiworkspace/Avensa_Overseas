"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Lock } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PUBLIC_NAV_LINKS } from "@/lib/constants";
import { AvensaLogo } from "@/components/ui/AvensaLogo";

// Logo palette: Deep navy #0d1b4b · Gold #F5A623 · White background
// Navbar is WHITE so the logo (which has a white bg) is fully visible.
// Nav links use deep navy text; active state gets a gold accent.

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
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(13,27,75,0.10)] border-b border-[#e8eaf0]"
            : "bg-white"
        )}
      >
        <div className="page-container">
          <div className="flex h-[80px] items-center justify-between gap-6">

            {/* ── Logo ── */}
            <Link
              href="/"
              className="shrink-0 transition-opacity duration-200 hover:opacity-85"
            >
              <AvensaLogo variant="horizontal" theme="light" size="md" />
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
                      "relative px-4 py-2 text-[13.5px] font-medium rounded-xl transition-all duration-200 group",
                      active
                        ? "text-[#0d1b4b]"
                        : "text-[#0d1b4b]/55 hover:text-[#0d1b4b]"
                    )}
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {/* hover pill */}
                    <span
                      className={cn(
                        "absolute inset-0 rounded-xl transition-all duration-200",
                        active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      )}
                      style={{ background: "rgba(13,27,75,0.05)" }}
                    />

                    <span className="relative">{link.label}</span>

                    {/* active gold underline */}
                    <span
                      className={cn(
                        "absolute bottom-0 left-3 right-3 h-[2px] rounded-full transition-all duration-300 origin-left",
                        active
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0 group-hover:scale-x-75 group-hover:opacity-60"
                      )}
                      style={{ background: "#F5A623" }}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* ── Desktop right side — Admin Console + Mobile toggle ── */}
            <div className="flex items-center gap-3">

              {/* Admin Console button — desktop only */}
              <Link href="/admin/login" className="hidden lg:block">
                <button
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    background: "linear-gradient(135deg, #0d1b4b 0%, #1a2b6b 100%)",
                    border: "1px solid rgba(245,166,35,0.35)",
                    color: "#F5A623",
                    boxShadow: "0 2px 10px rgba(13,27,75,0.20)",
                  }}
                >
                  <Lock size={11} />
                  Admin Console
                </button>
              </Link>

              {/* ── Mobile toggle ── */}
              <button
                className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200"
                style={{ background: "rgba(13,27,75,0.06)", color: "#0d1b4b" }}
                onClick={() => setMobileOpen(v => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <span className={cn("absolute transition-all duration-300", mobileOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100")}>
                  <Menu size={17} />
                </span>
                <span className={cn("absolute transition-all duration-300", !mobileOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100")}>
                  <X size={17} />
                </span>
              </button>

            </div>

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
          <div
            className="px-4 pb-6 pt-3 border-t"
            style={{ borderColor: "#e8eaf0", background: "#ffffff" }}
          >
            <nav className="flex flex-col gap-1">
              {PUBLIC_NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-xl px-4 py-3 text-[13.5px] font-medium transition-all duration-200",
                      active
                        ? "text-[#0d1b4b] font-semibold"
                        : "text-[#0d1b4b]/55 hover:text-[#0d1b4b] hover:bg-[rgba(13,27,75,0.04)]"
                    )}
                    style={{
                      fontFamily: "var(--font-outfit)",
                      background: active ? "rgba(13,27,75,0.05)" : undefined,
                      borderLeft: active ? "3px solid #F5A623" : "3px solid transparent",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Admin Console — mobile */}
            <div className="mt-4 pt-4" style={{ borderTop: "1px solid #e8eaf0" }}>
              <Link href="/admin/login">
                <button
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    background: "linear-gradient(135deg, #0d1b4b 0%, #1a2b6b 100%)",
                    border: "1px solid rgba(245,166,35,0.35)",
                    color: "#F5A623",
                  }}
                >
                  <Lock size={11} />
                  Admin Console
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
