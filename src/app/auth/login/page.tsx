"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Minimum 8 characters"),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    // In production: call /api/auth/login
    await new Promise((r) => setTimeout(r, 800));
    window.location.href = "/dashboard";
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading">Welcome Back</h1>
        <p className="text-slate-500 mt-1 text-sm">Sign in to your Avensa Overseas account</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@email.com"
            required
            autoComplete="email"
            {...register("email")}
            error={errors.email?.message}
          />
          <div>
            <Input
              label="Password"
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              {...register("password")}
              error={errors.password?.message}
            />
            <button type="button" onClick={() => setShowPw((v) => !v)}
              className="mt-1 flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600">
              {showPw ? <EyeOff size={12} /> : <Eye size={12} />}
              {showPw ? "Hide" : "Show"} password
            </button>
          </div>
          <div className="flex justify-end">
            <Link href="/auth/forgot-password" className="text-xs text-brand-600 hover:text-brand-800">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full" loading={isSubmitting}>
            <LogIn size={16} /> Sign In
          </Button>
        </form>

        <div className="mt-5 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="font-semibold text-brand-600 hover:text-brand-800">
            Create one free
          </Link>
        </div>
      </Card>

      <p className="mt-5 text-center text-xs text-slate-400">
        By signing in you agree to our{" "}
        <Link href="/terms" className="underline hover:text-slate-600">Terms</Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-slate-600">Privacy Policy</Link>.
      </p>
    </div>
  );
}
