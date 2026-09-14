import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, List, Briefcase, FileCheck, LogOut } from "lucide-react";

const navLinks = [
  { label: "Queue", href: "/officer", icon: List },
  { label: "Cases", href: "/officer/cases", icon: Briefcase },
  { label: "Documents", href: "/officer/documents", icon: FileCheck },
];

export default function OfficerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="flex w-60 flex-col bg-slate-900 min-h-screen">
        <Link href="/officer" className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500">
            <Globe size={16} className="text-white" />
          </div>
          <div>
            <span className="block text-xs font-bold text-white">Avensa Overseas</span>
            <span className="block text-xs text-slate-400">Case Officer</span>
          </div>
        </Link>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
          <div className="h-8 w-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-sm font-bold">A</div>
          <div>
            <p className="text-sm font-semibold text-white">Anna Weber</p>
            <p className="text-xs text-slate-400">Case Officer</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navLinks.map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/10 hover:text-white transition-all">
              <Icon size={16} />{label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-white/10 px-3 py-3">
          <Link href="/auth/logout"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/10 hover:text-white transition-all">
            <LogOut size={16} />Sign Out
          </Link>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-600">Case Officer Portal</p>
          <div className="h-8 w-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-sm font-bold">A</div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
