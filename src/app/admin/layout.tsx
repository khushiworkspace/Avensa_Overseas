import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar adminName="System Admin" role="Super Admin" />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-600">Admin Console</p>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gold-500 flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
