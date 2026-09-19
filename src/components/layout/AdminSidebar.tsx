"use client";

import Link from "next/link";
import Image from "next/image";
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
  role?:      string;
}

export function AdminSidebar({ adminName = "Admin", role = "Super Admin" }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="relative flex w-64 flex-col min-h-screen overflow-hidden shrink-0"
      style={{ background: "linear-gradient(160deg, #050714 0%, #0a0f2e 45%, #0d1b4b 100%)" }}
    >
      {/* ── Background texture ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gold glow — top right */}
        <div
          className="absolute -top-16 -right-16 h-56 w-56 rounded-full blur-3xl"
          style={{ background: "rgba(245,166,35,0.07)" }}
        />
        {/* Navy glow — bottom left */}
        <div
          className="absolute bottom-10 -left-10 h-40 w-40 rounded-full blur-3xl"
          style={{ background: "rgba(13,27,75,0.50)" }}
        />
        {/* Gold dot pattern */}
        <div className="absolute inset-0 dot-pattern opacity-10" />
        {/* Vertical gold right-border accent */}
        <div
          className="absolute right-0 top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(245,166,35,0.20) 30%, rgba(245,166,35,0.20) 70%, transparent)" }}
        />
      </div>

      {/* ── Logo ── */}
      <Link
        href="/admin"
        className="relative flex items-center px-5 py-4 transition-opacity hover:opacity-90"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* White pill background so logo is crisp on dark sidebar */}
        <div
          className="flex items-center justify-center rounded-2xl px-4 py-2"
          style={{
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
          }}
        >
          <Image
            src="/Images/Logo.png"
            alt="Avensa Overseas"
            height={36}
            width={140}
            style={{ height: 36, width: "auto", objectFit: "contain" }}
            priority
          />
        </div>
      </Link>

      {/* ── Console label removed — sidebar starts directly with nav ── */}

      {/* ── Admin info ── */}
      <div
        className="relative flex items-center gap-3 px-5 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        {/* Avatar — gold ring */}
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
          style={{
            background: "linear-gradient(135deg, #F5A623 0%, #E8971A 100%)",
            color: "#0d1b4b",
            boxShadow: "0 4px 12px rgba(245,166,35,0.40)",
          }}
        >
          {adminName.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p
            className="text-sm font-semibold text-white truncate"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {adminName}
          </p>
          <p
            className="text-[11px] font-medium truncate"
            style={{ color: "rgba(245,166,35,0.70)", fontFamily: "var(--font-outfit)" }}
          >
            {role}
          </p>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="relative flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {ADMIN_NAV_LINKS.map((link) => {
          const Icon = iconMap[link.icon] ?? FileText;
          const active =
            pathname === link.href ||
            (link.href !== "/admin" && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                active ? "text-white" : "text-white/40 hover:text-white"
              )}
              style={
                active
                  ? {
                      background: "linear-gradient(135deg, rgba(13,27,75,0.90) 0%, rgba(26,43,107,0.90) 100%)",
                      border: "1px solid rgba(245,166,35,0.30)",
                      boxShadow: "0 4px 16px rgba(13,27,75,0.50), inset 0 1px 0 rgba(245,166,35,0.15)",
                      fontFamily: "var(--font-outfit)",
                    }
                  : {
                      border: "1px solid transparent",
                      fontFamily: "var(--font-outfit)",
                    }
              }
              onMouseEnter={(e) => {
                if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <Icon
                size={15}
                className="shrink-0"
                style={{ color: active ? "#F5A623" : "inherit" }}
              />
              <span className="truncate">{link.label}</span>
              {active && (
                <span
                  className="ml-auto h-1.5 w-1.5 rounded-full"
                  style={{ background: "#F5A623", boxShadow: "0 0 6px rgba(245,166,35,0.80)" }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom — Sign Out ── */}
      <div
        className="relative px-3 py-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <button
          onClick={async () => {
            await fetch("/api/admin/auth/logout", { method: "POST" });
            if (typeof localStorage !== "undefined") localStorage.removeItem("admin_token");
            window.location.href = "/admin/login";
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200"
          style={{
            color: "rgba(255,255,255,0.35)",
            fontFamily: "var(--font-outfit)",
            border: "1px solid transparent",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(245,166,35,0.08)";
            (e.currentTarget as HTMLElement).style.color = "rgba(245,166,35,0.80)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,166,35,0.20)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)";
            (e.currentTarget as HTMLElement).style.borderColor = "transparent";
          }}
        >
          <LogOut size={15} className="shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
