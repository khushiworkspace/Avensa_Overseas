"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Shield, Globe, Map, Settings2,
  FileText, Calendar, DollarSign, Edit, Bell, Activity,
  Settings, LogOut, List, Briefcase, FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ADMIN_NAV_LINKS } from "@/lib/constants";
import { AvensaLogo } from "@/components/ui/AvensaLogo";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Users, Shield, Globe, Map, Settings2,
  FileText, Calendar, DollarSign, Edit, Bell, Activity,
  Settings, List, Briefcase, FileCheck,
};

interface AdminSidebarProps {
  adminName?: string;
  role?:      string;
}

export function AdminSidebar({ adminName = "Admin", role = "Super Admin" }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="relative flex w-64 flex-col bg-navy-950 min-h-screen overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-12 h-48 w-48 rounded-full bg-coral-600/8 blur-3xl" />
        <div className="absolute bottom-12 -left-12 h-36 w-36 rounded-full bg-teal-600/8 blur-3xl" />
        <div className="absolute inset-0 dot-pattern opacity-15" />
      </div>

      {/* ── Logo ── */}
      <Link
        href="/admin"
        className="relative flex items-center px-5 py-4 border-b border-white/6 hover:opacity-90 transition-opacity"
      >
        <AvensaLogo variant="horizontal" theme="dark" size="xs" />
      </Link>

      {/* Admin console label */}
      <div className="relative px-5 py-2 border-b border-white/4">
        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-coral-400">
          ⬡ Admin Console
        </span>
      </div>

      {/* ── Admin info ── */}
      <div className="relative flex items-center gap-3 px-5 py-3.5 border-b border-white/4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-coral-600 text-white text-sm font-bold shadow-coral-sm">
          {adminName.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">{adminName}</p>
          <p className="text-xs font-medium text-coral-400 truncate">{role}</p>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="relative flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {ADMIN_NAV_LINKS.map((link) => {
          const Icon   = iconMap[link.icon] ?? FileText;
          const active =
            pathname === link.href ||
            (link.href !== "/admin" && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                active
                  ? "bg-coral-600 text-white shadow-coral-sm"
                  : "text-white/40 hover:bg-white/6 hover:text-white"
              )}
            >
              <Icon size={15} className="shrink-0" />
              <span className="truncate">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom ── */}
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
  );
}
