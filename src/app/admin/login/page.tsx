"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Eye, EyeOff, ArrowRight, ArrowLeft,
  Shield, Mail, Lock, CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/* ── Full-screen loading overlay shown after successful login ── */
function LoadingOverlay() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(160deg, #050714 0%, #0a0f2e 45%, #0d1b4b 100%)" }}
    >
      <div className="absolute inset-0 dot-pattern opacity-10" />

      <div className="relative flex flex-col items-center gap-8">
        {/* Logo */}
        <div
          className="rounded-2xl px-6 py-3"
          style={{
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.40)",
          }}
        >
          <Image
            src="/Images/Logo.png"
            alt="Avensa Overseas"
            height={44}
            width={176}
            style={{ height: 44, width: "auto", objectFit: "contain" }}
            priority
          />
        </div>

        {/* Animated spinner ring */}
        <div className="relative flex items-center justify-center">
          {/* Outer ring */}
          <svg
            className="animate-spin"
            width="64" height="64" viewBox="0 0 64 64"
            fill="none"
            style={{ animationDuration: "1.2s" }}
          >
            <circle cx="32" cy="32" r="28"
              stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
            <path
              d="M32 4 a28 28 0 0 1 28 28"
              stroke="#F5A623" strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          {/* Inner gold dot */}
          <div
            className="absolute h-3 w-3 rounded-full"
            style={{ background: "#F5A623", boxShadow: "0 0 12px rgba(245,166,35,0.80)" }}
          />
        </div>

        {/* Text */}
        <div className="text-center space-y-2">
          <p
            className="text-lg font-bold text-white"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Signing you in…
          </p>
          <p
            className="text-sm"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-outfit)" }}
          >
            Setting up your admin session
          </p>
        </div>

        {/* Gold progress bar */}
        <div
          className="w-48 h-1 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #0d1b4b, #F5A623)",
              animation: "progressBar 1.8s ease-in-out infinite",
              width: "40%",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes progressBar {
          0%   { transform: translateX(-100%); width: 40%; }
          50%  { width: 60%; }
          100% { transform: translateX(350%); width: 40%; }
        }
      `}</style>
    </div>
  );
}

/* ── Feature pill ── */
function FeaturePill({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
      style={{
        background: "rgba(245,166,35,0.10)",
        border: "1px solid rgba(245,166,35,0.20)",
      }}
    >
      <Icon size={11} style={{ color: "#F5A623" }} />
      <span
        className="text-xs font-medium"
        style={{ color: "rgba(255,255,255,0.70)", fontFamily: "var(--font-outfit)" }}
      >
        {text}
      </span>
    </div>
  );
}

/* ── Main login form ── */
function LoginForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const redirectTo   = searchParams.get("from") ?? "/admin";

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [redirect, setRedirect] = useState(false); // full-screen overlay
  const [error,    setError]    = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res  = await fetch("/api/admin/auth/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, password }),
      });
      const json = await res.json();

      if (json.success) {
        localStorage.setItem("admin_token", json.token);
        // Show full-screen loading overlay, then redirect
        setRedirect(true);
        setTimeout(() => {
          router.push(redirectTo);
          router.refresh();
        }, 1800);
      } else {
        setError(json.message ?? "Invalid email or password.");
        setLoading(false);
      }
    } catch {
      setError("Network error — please check your connection.");
      setLoading(false);
    }
  }

  /* Show full-screen loading */
  if (redirect) return <LoadingOverlay />;

  return (
    <div className="min-h-screen flex" style={{ background: "#f8f9ff" }}>

      {/* ══ LEFT PANEL — dark brand side ══ */}
      <div
        className="hidden lg:flex lg:w-[52%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #050714 0%, #0a0f2e 50%, #0d1b4b 100%)" }}
      >
        {/* Background texture */}
        <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none" />
        <div
          className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: "rgba(245,166,35,0.07)" }}
        />
        <div
          className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full blur-[100px] pointer-events-none"
          style={{ background: "rgba(13,27,75,0.50)" }}
        />
        {/* Vertical gold line accent */}
        <div
          className="absolute right-0 top-0 bottom-0 w-px pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(245,166,35,0.15) 30%, rgba(245,166,35,0.15) 70%, transparent)" }}
        />

        {/* Top — Logo */}
        <div className="relative">
          <div
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3"
            style={{
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.30)",
            }}
          >
            <Image
              src="/Images/Logo.png"
              alt="Avensa Overseas"
              height={56}
              width={220}
              style={{ height: 56, width: "auto", objectFit: "contain" }}
              priority
            />
          </div>
        </div>

        {/* Middle — headline */}
        <div className="relative space-y-6">
          {/* Admin console badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: "rgba(245,166,35,0.10)",
              border: "1px solid rgba(245,166,35,0.25)",
            }}
          >
            <Shield size={11} style={{ color: "#F5A623" }} />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.16em]"
              style={{ color: "#F5A623", fontFamily: "var(--font-outfit)" }}
            >
              Admin Console
            </span>
          </div>

          <h1
            className="text-4xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Manage your
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #F5A623 0%, #fcd34d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              immigration
            </span>
            <br />
            platform.
          </h1>

          <p
            className="text-sm leading-relaxed max-w-sm"
            style={{ color: "rgba(255,255,255,0.50)", fontFamily: "var(--font-outfit)" }}
          >
            Access leads, applications, content and settings from one secure dashboard.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2">
            <FeaturePill icon={CheckCircle} text="Lead Management" />
            <FeaturePill icon={CheckCircle} text="Applications" />
            <FeaturePill icon={CheckCircle} text="Content CMS" />
            <FeaturePill icon={Shield}      text="Secure Access" />
          </div>
        </div>

        {/* Bottom — session info */}
        <div className="relative">
          <p
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-outfit)" }}
          >
            Sessions expire after 6 hours for your security.
          </p>
        </div>
      </div>

      {/* ══ RIGHT PANEL — login form ══ */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-16">

        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <div
            className="inline-flex items-center justify-center rounded-2xl px-5 py-2.5"
            style={{
              background: "linear-gradient(135deg, #0d1b4b, #1a2b6b)",
              boxShadow: "0 4px 16px rgba(13,27,75,0.30)",
            }}
          >
            <Image
              src="/Images/Logo.png"
              alt="Avensa Overseas"
              height={36}
              width={144}
              style={{ height: 36, width: "auto", objectFit: "contain",  mixBlendMode: "screen" }}
              priority
            />
          </div>
        </div>

        <div className="w-full max-w-[400px]">

          {/* Header */}
          <div className="mb-8">
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-syne)", color: "#0d1b4b" }}
            >
              Welcome back
            </h2>
            <p
              className="text-sm mt-1.5"
              style={{ color: "#94a3b8", fontFamily: "var(--font-outfit)" }}
            >
              Sign in to your admin account to continue.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="flex gap-3 items-start rounded-2xl px-4 py-3 mb-6"
              style={{
                background: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.18)",
              }}
            >
              <div
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5"
                style={{ background: "rgba(239,68,68,0.12)" }}
              >
                <span className="text-red-500 text-xs font-bold">!</span>
              </div>
              <p
                className="text-sm text-red-600"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: "#0d1b4b", fontFamily: "var(--font-outfit)" }}
              >
                Email Address
              </label>
              <div className="relative">
                <div
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg"
                  style={{ background: "rgba(13,27,75,0.07)" }}
                >
                  <Mail size={13} style={{ color: "#0d1b4b" }} />
                </div>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@avensaoverseas.com"
                  className="w-full rounded-2xl py-3.5 pl-14 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all"
                  style={{
                    background: "rgba(13,27,75,0.03)",
                    border: "1.5px solid rgba(13,27,75,0.12)",
                    fontFamily: "var(--font-outfit)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#F5A623";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,166,35,0.12)";
                    e.currentTarget.style.background = "#ffffff";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(13,27,75,0.12)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "rgba(13,27,75,0.03)";
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: "#0d1b4b", fontFamily: "var(--font-outfit)" }}
              >
                Password
              </label>
              <div className="relative">
                <div
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg"
                  style={{ background: "rgba(13,27,75,0.07)" }}
                >
                  <Lock size={13} style={{ color: "#0d1b4b" }} />
                </div>
                <input
                  type={showPass ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-2xl py-3.5 pl-14 pr-12 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all"
                  style={{
                    background: "rgba(13,27,75,0.03)",
                    border: "1.5px solid rgba(13,27,75,0.12)",
                    fontFamily: "var(--font-outfit)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#F5A623";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,166,35,0.12)";
                    e.currentTarget.style.background = "#ffffff";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(13,27,75,0.12)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "rgba(13,27,75,0.03)";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  tabIndex={-1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#94a3b8" }}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-2xl px-6 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-2"
              style={{
                fontFamily: "var(--font-outfit)",
                background: "linear-gradient(135deg, #0d1b4b 0%, #1a2b6b 100%)",
                border: "1px solid rgba(245,166,35,0.30)",
                boxShadow: "0 4px 20px rgba(13,27,75,0.35)",
              }}
            >
              {/* Shine sweep on hover */}
              <span
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                }}
              />
              <span className="relative flex items-center justify-center gap-2.5">
                {loading ? (
                  <>
                    <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Verifying credentials…
                  </>
                ) : (
                  <>
                    Sign In to Dashboard
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Back to website */}
          <div className="mt-8 pt-6 flex justify-center" style={{ borderTop: "1px solid rgba(13,27,75,0.08)" }}>
            <Link href="/">
              <button
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "rgba(13,27,75,0.04)",
                  border: "1px solid rgba(13,27,75,0.10)",
                  color: "#64748b",
                  fontFamily: "var(--font-outfit)",
                }}
              >
                <ArrowLeft size={11} />
                Back to Website
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
