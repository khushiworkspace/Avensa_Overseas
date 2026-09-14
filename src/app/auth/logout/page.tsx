"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LogoutPage() {
  useEffect(() => {
    // In production: clear session token / call /api/auth/logout
    // then redirect to home after a short delay
    const t = setTimeout(() => {
      window.location.href = "/";
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/15">
          <CheckCircle size={32} className="text-gold-400" />
        </div>
        <h1 className="text-2xl font-bold text-white font-heading">You&apos;ve been signed out</h1>
        <p className="mt-2 text-blue-200 text-sm">
          Your session has ended securely. Redirecting to the home page in a moment…
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link href="/">
            <Button variant="gold">Go to Home</Button>
          </Link>
          <Link href="/auth/login">
            <Button className="bg-white/10 border border-white/30 text-white hover:bg-white/20">
              Sign In Again
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
