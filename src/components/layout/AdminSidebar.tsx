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

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Users, Shield, Globe, Map, Settings2,
  FileText, Calendar, DollarSign, Edit, Bell, Activity,
  Settings, List, Briefcase, FileCheck,
};

interface AdminSidebarProps {
  adminName?: string;
  role?: string;
}

export function AdminSidebar({ adminName = "Admin", role = "Super Admin" }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col bg-slate-900 min-h-screen">
      <Link href="/admin" className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500">
          <Globe size={16} className="text-white" />
        </div>
        <div>
          <span className="block text-xs font-bold text-white">Avensa Overseas</span>
          <span className="block text-xs text-slate-400">Admin Console</span>
        </div>
      </Link>

      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-600 text-white text-sm font-bold">
          {adminName.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{adminName}</p>
          <p className="text-xs text-gold-400">{role}</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {ADMIN_NAV_LINKS.map((link) => {
          const Icon = iconMap[link.icon] ?? FileText;
          const active = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                active
                  ? "bg-brand-600 text-white"
                  : "text-slate-400 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon size={16} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-3 py-3">
        <Link href="/auth/logout"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/10 hover:text-white transition-all">
          <LogOut size={16} />
          Sign Out
        </Link>
      </div>
    </aside>
  );
}
