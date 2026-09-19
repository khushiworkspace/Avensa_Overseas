"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-page)" }}>
      <AdminSidebar adminName="System Admin" role="Super Admin" />

      <div className="flex-1 flex flex-col min-w-0">
        {/* ── Top header ── */}
        <header
          className="sticky top-0 z-30 flex h-14 items-center justify-between px-6"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(13,27,75,0.08)",
            boxShadow: "0 1px 12px rgba(13,27,75,0.06)",
          }}
        >
          {/* Left — accent bar + Admin Console text */}
          <div className="flex items-center gap-2">
            <div
              className="h-5 w-1 rounded-full"
              style={{ background: "linear-gradient(to bottom, #0d1b4b, #F5A623)" }}
            />
            <p
              className="text-sm font-semibold"
              style={{ color: "#0d1b4b", fontFamily: "var(--font-syne)" }}
            >
              Admin Console
            </p>
          </div>

          {/* Right — actions */}
          <div className="flex items-center gap-3">

            {/* View Website */}
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "rgba(245,166,35,0.08)",
                border: "1px solid rgba(245,166,35,0.25)",
                color: "#b06000",
                fontFamily: "var(--font-outfit)",
              }}
            >
              <ExternalLink size={11} />
              View Website
            </Link>

            {/* Sign out */}
            <button
              onClick={async () => {
                await fetch("/api/admin/auth/logout", { method: "POST" });
                if (typeof localStorage !== "undefined") localStorage.removeItem("admin_token");
                window.location.href = "/admin/login";
              }}
              className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "rgba(13,27,75,0.05)",
                border: "1px solid rgba(13,27,75,0.12)",
                color: "#0d1b4b",
                fontFamily: "var(--font-outfit)",
              }}
            >
              Sign Out
            </button>

            {/* Avatar */}
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl text-sm font-bold"
              style={{
                background: "linear-gradient(135deg, #0d1b4b 0%, #1a2b6b 100%)",
                color: "#F5A623",
                boxShadow: "0 2px 8px rgba(13,27,75,0.30)",
                fontFamily: "var(--font-syne)",
              }}
            >
              A
            </div>
          </div>
        </header>

        {/* ── Page content ── */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
