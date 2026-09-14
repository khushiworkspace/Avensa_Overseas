import Link from "next/link";
import { Globe, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10">
          <Globe size={36} className="text-gold-400" />
        </div>
        <h1 className="text-7xl font-extrabold text-white font-heading mb-2">404</h1>
        <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-blue-200 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gold-600 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <Link
            href="/countries"
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
          >
            <Search size={16} /> Browse Countries
          </Link>
        </div>
      </div>
    </div>
  );
}
