"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});
type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
  }

  if (sent) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 font-heading">Check Your Email</h2>
        <p className="mt-2 text-sm text-slate-500">
          If an account exists for <strong>{getValues("email")}</strong>, you will receive a password reset link shortly.
        </p>
        <p className="mt-2 text-xs text-slate-400">Didn&apos;t receive it? Check your spam folder or try again in a few minutes.</p>
        <Link href="/auth/login" className="mt-6 inline-block">
          <Button><ArrowLeft size={15} /> Back to Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-100">
          <Mail size={24} className="text-brand-600" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading">Forgot Password?</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Enter your email and we&apos;ll send you a reset link.
        </p>
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
          <Button type="submit" className="w-full" loading={isSubmitting}>
            Send Reset Link
          </Button>
        </form>
        <div className="mt-5 text-center">
          <Link href="/auth/login" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-700 transition-colors">
            <ArrowLeft size={14} /> Back to Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
}
