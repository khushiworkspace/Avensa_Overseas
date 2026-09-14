import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { AvensaLogo } from "@/components/ui/AvensaLogo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-950 relative flex items-center justify-center px-4 overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-mesh-dark" />
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[600px] rounded-full bg-teal-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-coral-500/8 blur-[80px]" />
      </div>

      <div className="relative text-center max-w-lg">

        {/* Logo at top */}
        <div className="flex justify-center mb-10">
          <AvensaLogo variant="horizontal" theme="dark" size="md" />
        </div>

        {/* Big 404 */}
        <div className="relative mb-6">
          <p
            className="text-[9rem] font-extrabold leading-none select-none pointer-events-none"
            style={{
              fontFamily: "var(--font-dm-sans)",
              background: "linear-gradient(135deg, rgba(0,148,148,0.15) 0%, rgba(0,184,184,0.08) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </p>
          {/* Overlay text in front */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p
              className="text-[9rem] font-extrabold leading-none text-gradient-teal"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              404
            </p>
          </div>
        </div>

        <h1
          className="text-2xl font-extrabold text-white mb-3"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Page Not Found
        </h1>
        <p className="text-white/45 mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          <br />
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-teal-md hover:bg-teal-700 hover:shadow-teal-lg transition-all duration-200 active:scale-[0.98]"
          >
            <ArrowLeft size={15} />
            Back to Home
          </Link>
          <Link
            href="/countries"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/6 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 backdrop-blur-sm"
          >
            <Search size={15} />
            Browse Countries
          </Link>
        </div>

        {/* Subtle bottom link */}
        <p className="mt-8 text-xs text-white/25">
          Need help?{" "}
          <Link href="/contact" className="text-teal-400 hover:text-teal-300 transition-colors">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}
