"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, FolderOpen, Calendar, CreditCard,
  Bell, User, HelpCircle, Globe, LogOut, Settings, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { APPLICANT_NAV_LINKS } from "@/lib/constants";
import { AvensaLogo } from "@/components/ui/AvensaLogo";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, FileText, FolderOpen, Calendar, CreditCard,
  Bell, User, HelpCircle, Globe, Settings,
};

interface SidebarProps {
  userName?:  string;
  userEmail?: string;
  role?:      "applicant" | "admin" | "officer";
}

export function DashboardSidebar({
  userName  = "User",
  userEmail = "",
  role      = "applicant",
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="relative flex w-64 flex-col bg-navy-950 min-h-screen overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-teal-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-coral-600/6 blur-3xl" />
        <div className="absolute inset-0 dot-pattern opacity-15" />
      </div>

      {/* ── Logo ── */}
      <Link
        href="/"
        className="relative flex items-center px-5 py-4 border-b border-white/6 hover:opacity-90 transition-opacity"
      >
        <AvensaLogo variant="horizontal" theme="dark" size="sm" />
      </Link>

      {/* ── User info ── */}
      <div className="relative flex items-center gap-3 px-5 py-3.5 border-b border-white/4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white text-sm font-bold shadow-teal-sm">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">{userName}</p>
          <p className="text-xs text-white/35 truncate">{userEmail}</p>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="relative flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {APPLICANT_NAV_LINKS.map((link) => {
          const Icon   = iconMap[link.icon] ?? FileText;
          const active =
            pathname === link.href ||
            (link.href !== "/dashboard" && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                active
                  ? "bg-teal-600 text-white shadow-teal-sm"
                  : "text-white/40 hover:bg-white/6 hover:text-white"
              )}
            >
              <Icon size={15} className="shrink-0" />
              <span className="flex-1 truncate">{link.label}</span>
              {active && <ChevronRight size={12} className="opacity-50 shrink-0" />}
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom actions ── */}
      <div className="relative border-t border-white/6 px-3 py-3 space-y-0.5">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/40 hover:bg-white/6 hover:text-white transition-all"
        >
          <Settings size={15} />
          Settings
        </Link>
        <Link
          href="/auth/logout"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/40 hover:bg-rose-900/30 hover:text-rose-300 transition-all"
        >
          <LogOut size={15} />
          Sign Out
        </Link>
      </div>
    </aside>
  );
}
