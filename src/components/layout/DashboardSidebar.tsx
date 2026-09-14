"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, FolderOpen, Calendar, CreditCard,
  Bell, User, HelpCircle, Globe, LogOut, Settings, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { APPLICANT_NAV_LINKS } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, FileText, FolderOpen, Calendar, CreditCard,
  Bell, User, HelpCircle, Globe, Settings,
};

interface SidebarProps {
  userName?: string;
  userEmail?: string;
  role?: "applicant" | "admin" | "officer";
}

export function DashboardSidebar({ userName = "User", userEmail = "", role = "applicant" }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col bg-slate-900 min-h-screen">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10 group">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500">
          <Globe size={16} className="text-white" />
        </div>
        <div className="leading-tight">
          <span className="block text-xs font-bold text-white">Avensa Overseas</span>
          <span className="block text-xs text-slate-400">Portal</span>
        </div>
      </Link>

      {/* User info */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white text-sm font-bold">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">{userName}</p>
          <p className="text-xs text-slate-400 truncate">{userEmail}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {APPLICANT_NAV_LINKS.map((link) => {
          const Icon = iconMap[link.icon] ?? FileText;
          const active = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                active
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-slate-400 hover:bg-white/10 hover:text-white"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={16} />
              <span className="flex-1">{link.label}</span>
              {active && <ChevronRight size={13} className="opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10 px-3 py-3 space-y-1">
        <Link href="/dashboard/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/10 hover:text-white transition-all">
          <Settings size={16} />
          Settings
        </Link>
        <Link href="/auth/logout"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/10 hover:text-white transition-all">
          <LogOut size={16} />
          Sign Out
        </Link>
      </div>
    </aside>
  );
}
