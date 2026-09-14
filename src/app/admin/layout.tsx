import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-sand-50">
      <AdminSidebar adminName="System Admin" role="Super Admin" />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[rgba(14,20,72,0.08)] bg-white/90 backdrop-blur-sm px-6 shadow-card">
          <p className="text-sm font-semibold text-navy-500 tracking-wide">Admin Console</p>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-coral-600 flex items-center justify-center text-white text-sm font-bold shadow-coral-sm">
              A
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
