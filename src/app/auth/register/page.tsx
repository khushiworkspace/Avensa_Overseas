"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, UserPlus, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Enter a valid email"),
  password: z.string()
    .min(8, "Minimum 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number"),
  confirmPassword: z.string(),
  consent: z.boolean().refine(Boolean, "You must accept the terms"),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

const benefits = [
  "Free eligibility checker for 30 EU Contries",
  "Secure document upload and storage",
  "Real-time application tracking",
  "Email & in-app notifications",
];

export default function RegisterPage() {
  const [showPw, setShowPw] = useState(false);
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { consent: false },
  });

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 900));
    setDone(true);
  }

  if (done) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 font-heading">Check Your Email</h2>
        <p className="mt-2 text-sm text-slate-500">
          We sent a verification link to your email address. Click the link to activate your account, then sign in.
        </p>
        <Link href="/auth/login">
          <Button className="mt-6">Go to Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Benefits */}
      <div className="hidden lg:flex flex-col justify-center">
        <h2 className="text-2xl font-extrabold text-slate-900 font-heading mb-2">
          Start Your EU Immigration Journey
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          Create your free account and access all the tools you need to navigate EU immigration.
        </p>
        <ul className="space-y-3">
          {benefits.map((b) => (
            <li key={b} className="flex items-center gap-2.5 text-sm text-slate-700">
              <CheckCircle size={16} className="text-green-500 shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Form */}
      <div>
        <div className="text-center mb-6 lg:text-left">
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">Create Account</h1>
          <p className="text-slate-500 mt-1 text-sm">Free — no credit card required</p>
        </div>
        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input label="First Name" placeholder="First" required
                {...register("firstName")} error={errors.firstName?.message} />
              <Input label="Last Name" placeholder="Last" required
                {...register("lastName")} error={errors.lastName?.message} />
            </div>
            <Input label="Email Address" type="email" placeholder="you@email.com"
              required autoComplete="email"
              {...register("email")} error={errors.email?.message} />
            <div>
              <Input label="Password" type={showPw ? "text" : "password"}
                placeholder="••••••••" required
                {...register("password")} error={errors.password?.message} />
              <button type="button" onClick={() => setShowPw((v) => !v)}
                className="mt-1 flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600">
                {showPw ? <EyeOff size={12} /> : <Eye size={12} />}
                {showPw ? "Hide" : "Show"} password
              </button>
            </div>
            <Input label="Confirm Password" type={showPw ? "text" : "password"}
              placeholder="••••••••" required
              {...register("confirmPassword")} error={errors.confirmPassword?.message} />
            <div className="flex items-start gap-2">
              <input type="checkbox" id="consent" {...register("consent")}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
              <label htmlFor="consent" className="text-xs text-slate-600 leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-brand-600 underline hover:text-brand-800">Terms of Service</Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-brand-600 underline hover:text-brand-800">Privacy Policy</Link>,
                and consent to my data being processed to deliver the Avensa Overseas service.
              </label>
            </div>
            {errors.consent && <p className="text-xs text-red-600">{errors.consent.message}</p>}
            <Button type="submit" className="w-full" loading={isSubmitting}>
              <UserPlus size={16} /> Create Account
            </Button>
          </form>
          <div className="mt-5 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold text-brand-600 hover:text-brand-800">Sign in</Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
