import Link from "next/link";
import { Globe } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 w-fit">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500">
            <Globe size={16} className="text-white" />
          </div>
          <span className="text-sm font-bold text-slate-900">Avensa Overseas</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">{children}</main>
      <footer className="py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Avensa Overseas ·{" "}
        <Link href="/privacy" className="hover:text-slate-600">Privacy</Link>{" "}·{" "}
        <Link href="/terms" className="hover:text-slate-600">Terms</Link>
      </footer>
    </div>
  );
}
