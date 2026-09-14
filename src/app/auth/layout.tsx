import Link from "next/link";
import { AvensaLogo } from "@/components/ui/AvensaLogo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sand-50 flex flex-col">

      {/* Header */}
      <header className="border-b border-[rgba(14,20,72,0.08)] bg-white/80 backdrop-blur-sm px-6 py-4">
        <Link href="/" className="inline-block w-fit">
          <AvensaLogo variant="horizontal" theme="light" size="sm" />
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      <footer className="py-4 text-center text-xs text-navy-300">
        © {new Date().getFullYear()} Avensa Overseas ·{" "}
        <Link href="/privacy" className="hover:text-navy-600 transition-colors">Privacy</Link>{" "}·{" "}
        <Link href="/terms"   className="hover:text-navy-600 transition-colors">Terms</Link>
      </footer>
    </div>
  );
}
