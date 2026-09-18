"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, Briefcase, FileCheck, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { AvensaLogo } from "@/components/ui/AvensaLogo";

const navLinks = [
  { label: "Queue",     href: "/officer",           icon: List      },
  { label: "Cases",     href: "/officer/cases",     icon: Briefcase },
  { label: "Documents", href: "/officer/documents", icon: FileCheck },
];

export default function OfficerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-sand-50">
      {/* ── Sidebar ── */}
      <aside className="relative flex w-64 flex-col bg-navy-950 min-h-screen overflow-hidden">
        {/* Background accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 left-0 h-40 w-40 rounded-full bg-teal-600/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-coral-600/6 blur-3xl" />
          <div className="absolute inset-0 dot-pattern opacity-15" />
        </div>

        {/* Logo */}
        <Link
          href="/officer"
          className="relative flex items-center px-5 py-4 border-b border-white/6 hover:opacity-90 transition-opacity"
        >
          <AvensaLogo variant="horizontal" theme="dark" size="sm" />
        </Link>

        {/* Officer label */}
        <div className="relative px-5 py-2 border-b border-white/4">
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-teal-400">
            ◈ Case Officer Portal
          </span>
        </div>

        {/* Officer info */}
        <div className="relative flex items-center gap-3 px-5 py-3.5 border-b border-white/4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white text-sm font-bold shadow-teal-sm">
            A
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">Anna Weber</p>
            <p className="text-xs text-white/35 truncate">Case Officer</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="relative flex-1 px-3 py-4 space-y-0.5">
          {navLinks.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || (href !== "/officer" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                  active
                    ? "bg-teal-600 text-white shadow-teal-sm"
                    : "text-white/40 hover:bg-white/6 hover:text-white"
                )}
              >
                <Icon size={15} className="shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="relative border-t border-white/6 px-3 py-3">
          <Link
            href="/auth/logout"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/40 hover:bg-rose-900/30 hover:text-rose-300 transition-all"
          >
            <LogOut size={15} />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[rgba(14,20,72,0.08)] bg-white/90 backdrop-blur-sm px-6 shadow-card">
          <p className="text-sm font-semibold text-navy-500 tracking-wide">Case Officer Portal</p>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-600 text-white text-sm font-bold shadow-teal-sm">
            A
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
