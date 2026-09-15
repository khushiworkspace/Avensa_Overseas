"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight, ArrowLeft, CheckCircle, AlertTriangle,
  ExternalLink, RotateCcw, Sparkles, Search,
} from "lucide-react";
import {
  COUNTRIES, IMMIGRATION_ROUTES, NATIONALITIES,
  EDUCATION_LEVELS, LANGUAGE_LEVELS, CATEGORY_LABELS,
} from "@/lib/constants";
import { Button }         from "@/components/ui/Button";
import { Select }         from "@/components/ui/Select";
import { Input }          from "@/components/ui/Input";
import { StepIndicator }  from "@/components/ui/StepIndicator";
import { Disclaimer }     from "@/components/ui/Disclaimer";
import Link from "next/link";

/* ── Schema ─────────────────────────────────────────────────────── */
const schema = z.object({
  nationality:        z.string().min(1, "Required"),
  residenceCountry:   z.string().min(1, "Required"),
  destinationCountry: z.string().min(1, "Required"),
  purpose:            z.string().min(1, "Required"),
  dateOfBirth:        z.string().min(1, "Required"),
  education:          z.string().min(1, "Required"),
  occupation:         z.string().min(1, "Required"),
  yearsExperience:    z.string(),
  hasJobOffer:        z.string(),
  annualSalary:       z.string(),
  languageProficiency:z.string().min(1, "Required"),
  familyStatus:       z.string().min(1, "Required"),
  currentStatus:      z.string().min(1, "Required"),
  passportExpiry:     z.string().min(1, "Required"),
});
type FormData = z.infer<typeof schema>;

const STEPS = [
  { label: "Background" },
  { label: "Destination" },
  { label: "Education" },
  { label: "Employment" },
  { label: "Personal" },
];

const countryOptions     = COUNTRIES.map((c) => ({ value: c.id, label: c.name }));
const nationalityOptions = NATIONALITIES.map((n) => ({ value: n, label: n }));
const purposeOptions     = (["work","study","family","residence","visit","special"] as const).map((p) => ({
  value: p, label: CATEGORY_LABELS[p],
}));

function calcAge(dob: string) {
  if (!dob) return 0;
  return Math.floor((Date.now() - new Date(dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25));
}

/* ── Reusable section card ───────────────────────────────────────── */
function FormSection({ title, subtitle, children }: {
  title: string; subtitle?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-ink" style={{ fontFamily: "var(--font-syne)" }}>{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500" style={{ fontFamily: "var(--font-outfit)" }}>{subtitle}</p>}
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function EligibilityPage() {
  const [step, setStep]   = useState(1);
  const [result, setResult] = useState<null | {
    eligible: typeof IMMIGRATION_ROUTES;
    partial:  typeof IMMIGRATION_ROUTES;
  }>(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { hasJobOffer: "no", yearsExperience: "0", annualSalary: "0" },
  });

  const hasJobOffer = watch("hasJobOffer");

  function onSubmit(data: FormData) {
    const age    = calcAge(data.dateOfBirth);
    const salary = Number(data.annualSalary) || 0;

    const candidates = IMMIGRATION_ROUTES.filter(
      (r) => r.countryId === data.destinationCountry && r.category === data.purpose
    );

    const eligible: typeof IMMIGRATION_ROUTES = [];
    const partial:  typeof IMMIGRATION_ROUTES = [];

    for (const route of candidates) {
      const missing: string[] = [];
      if (route.id === "de-skilled-worker") {
        if (!["bachelor","master","phd","postdoc","vocational"].includes(data.education))
          missing.push("Recognised degree or vocational qualification required");
        if (data.hasJobOffer !== "yes") missing.push("Job offer from a German employer required");
      }
      if (route.id === "de-eu-blue-card") {
        if (!["bachelor","master","phd","postdoc"].includes(data.education))
          missing.push("University degree (min. 3 years) required");
        if (data.hasJobOffer !== "yes") missing.push("Binding job offer required");
        if (salary > 0 && salary < 41041) missing.push("Salary threshold not met (min. €41,041 p.a.)");
      }
      if (route.id === "de-job-seeker") {
        if (!["bachelor","master","phd","postdoc","vocational"].includes(data.education))
          missing.push("Recognised qualification required");
      }
      if (route.id === "de-student") {
        if (age < 17) missing.push("Must be at least 17 years old");
      }
      if (route.id === "nl-highly-skilled") {
        if (data.hasJobOffer !== "yes") missing.push("Must be employed by a recognised IND sponsor");
        const threshold = age >= 30 ? 6764 : 5008;
        if (salary > 0 && salary / 12 < threshold)
          missing.push(`Monthly salary below threshold (€${threshold}/month)`);
      }
      if (route.id === "es-digital-nomad") {
        if (salary > 0 && salary < 31752) missing.push("Income below minimum threshold (~€2,646/month)");
      }

      if (missing.length === 0)      eligible.push(route);
      else if (missing.length <= 2)  partial.push(route);
    }

    setResult({ eligible, partial });
  }

  function reset() { setResult(null); setStep(1); }

  /* ── Results view ── */
  if (result) {
    return (
      <div className="min-h-screen py-14" style={{ background: "var(--bg-page)" }}>
        <div className="page-container max-w-3xl space-y-6">
          <Disclaimer />

          <div className="rounded-3xl bg-white border border-slate-200/70 shadow-card overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-ink" style={{ fontFamily: "var(--font-syne)" }}>
                  Eligibility Assessment Result
                </h2>
                <p className="text-xs text-slate-400 mt-0.5" style={{ fontFamily: "var(--font-outfit)" }}>
                  Preliminary guidance only — not a legal determination
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={reset}>
                <RotateCcw size={14} /> Start Over
              </Button>
            </div>

            <div className="px-6 py-6 space-y-6">
              {/* Eligible */}
              {result.eligible.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-100">
                      <CheckCircle size={15} className="text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-emerald-800" style={{ fontFamily: "var(--font-syne)" }}>
                      Potentially Eligible Routes ({result.eligible.length})
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {result.eligible.map((r) => {
                      const country = COUNTRIES.find((c) => c.id === r.countryId);
                      return (
                        <div key={r.id} className="flex items-start justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                          <div>
                            <p className="font-bold text-emerald-900" style={{ fontFamily: "var(--font-syne)" }}>{r.name}</p>
                            <p className="text-sm text-emerald-700 mt-0.5" style={{ fontFamily: "var(--font-outfit)" }}>
                              {country?.name} · {r.processingTime}
                            </p>
                            <p className="text-xs text-emerald-600 mt-1" style={{ fontFamily: "var(--font-outfit)" }}>{r.shortDescription}</p>
                          </div>
                          <Link href={`/routes/${r.slug}`} className="shrink-0">
                            <Button size="sm" variant="outline" className="border-emerald-400 text-emerald-700 hover:bg-emerald-100">
                              View <ArrowRight size={12} />
                            </Button>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Partial */}
              {result.partial.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-100">
                      <AlertTriangle size={15} className="text-amber-600" />
                    </div>
                    <h3 className="font-bold text-amber-800" style={{ fontFamily: "var(--font-syne)" }}>
                      Partial Match — Missing Criteria ({result.partial.length})
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {result.partial.map((r) => (
                      <div key={r.id} className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                        <p className="font-bold text-amber-900" style={{ fontFamily: "var(--font-syne)" }}>{r.name}</p>
                        <p className="text-sm text-amber-700 mt-1" style={{ fontFamily: "var(--font-outfit)" }}>{r.shortDescription}</p>
                        <Link href={`/routes/${r.slug}`}>
                          <Button size="sm" variant="ghost" className="mt-2 text-amber-700 hover:bg-amber-100">
                            View Requirements <ExternalLink size={12} />
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No match */}
              {result.eligible.length === 0 && result.partial.length === 0 && (
                <div className="text-center py-10 rounded-2xl bg-slate-50">
                  <AlertTriangle size={32} className="mx-auto text-slate-300 mb-3" />
                  <p className="font-bold text-slate-700" style={{ fontFamily: "var(--font-syne)" }}>No matching routes found</p>
                  <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed" style={{ fontFamily: "var(--font-outfit)" }}>
                    No routes in our current database closely match your profile. This does not mean you are ineligible —
                    please consult official government sources or a qualified immigration adviser.
                  </p>
                </div>
              )}

              <Disclaimer />

              <div className="flex gap-3">
                <Link href="/auth/register" className="flex-1">
                  <Button className="w-full">Create Account to Apply</Button>
                </Link>
                <Link href="/contact" className="flex-1">
                  <Button variant="secondary" className="w-full">Speak to an Adviser</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Form view ── */
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>

      {/* Hero */}
      <div className="gradient-hero py-20">
        <div className="relative z-10 page-container text-center">
          <div className="section-eyebrow mb-5 mx-auto w-fit">
            <Search size={11} />
            Eligibility Check
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-syne)" }}>
            Find Your{" "}
            <span className="text-gradient-hero">Immigration Route</span>
          </h1>
          <p className="mt-5 text-base text-white/50 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-outfit)" }}>
            Answer a few guided questions to discover which EU immigration routes may apply to you.
            Takes about 3 minutes.
          </p>
        </div>
      </div>

      {/* Form container */}
      <div className="page-container py-12 max-w-2xl">
        <StepIndicator steps={STEPS} currentStep={step} className="mb-8" />
        <Disclaimer className="mb-6" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-3xl bg-white border border-slate-200/70 shadow-card overflow-hidden">
            <div className="px-6 py-6">
              {/* Step 1 */}
              {step === 1 && (
                <FormSection title="Your Background" subtitle="Tell us a little about where you are from and where you currently live.">
                  <Select label="Your Nationality" options={nationalityOptions} placeholder="Select nationality"
                    required {...register("nationality")} error={errors.nationality?.message} />
                  <Select label="Current Country of Residence" options={countryOptions} placeholder="Select country"
                    required {...register("residenceCountry")} error={errors.residenceCountry?.message} />
                </FormSection>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <FormSection title="Destination & Purpose" subtitle="Where do you want to go and why?">
                  <Select label="Destination Country" options={countryOptions} placeholder="Select destination"
                    required {...register("destinationCountry")} error={errors.destinationCountry?.message} />
                  <Select label="Purpose of Travel / Stay" options={purposeOptions} placeholder="Select purpose"
                    required {...register("purpose")} error={errors.purpose?.message} />
                </FormSection>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <FormSection title="Education & Language" subtitle="Your qualifications help determine which routes you may be eligible for.">
                  <Select label="Highest Level of Education" options={EDUCATION_LEVELS} placeholder="Select level"
                    required {...register("education")} error={errors.education?.message} />
                  <Select label="Language Proficiency (Destination Language)" options={LANGUAGE_LEVELS}
                    placeholder="Select level" required {...register("languageProficiency")}
                    error={errors.languageProficiency?.message} />
                </FormSection>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <FormSection title="Employment" subtitle="Your work situation affects visa eligibility and salary thresholds.">
                  <Input label="Occupation / Job Title" placeholder="e.g. Software Engineer"
                    required {...register("occupation")} error={errors.occupation?.message} />
                  <Input label="Years of Work Experience" type="number" min={0} max={50}
                    {...register("yearsExperience")} />
                  <Select label="Do you have a job offer?" options={[
                    { value: "yes", label: "Yes — I have a confirmed job offer" },
                    { value: "no",  label: "No — I am seeking employment" },
                  ]} {...register("hasJobOffer")} />
                  {hasJobOffer === "yes" && (
                    <Input label="Annual Salary (EUR)" type="number" placeholder="e.g. 55000"
                      {...register("annualSalary")}
                      hint="Enter the offered annual gross salary in EUR" />
                  )}
                </FormSection>
              )}

              {/* Step 5 */}
              {step === 5 && (
                <FormSection title="Personal Details" subtitle="A few final details to complete your profile.">
                  <Input label="Date of Birth" type="date" required
                    {...register("dateOfBirth")} error={errors.dateOfBirth?.message} />
                  <Select label="Family / Marital Status" options={[
                    { value: "single",   label: "Single"              },
                    { value: "married",  label: "Married / Partnered" },
                    { value: "divorced", label: "Divorced"            },
                    { value: "widowed",  label: "Widowed"             },
                  ]} required {...register("familyStatus")} error={errors.familyStatus?.message} />
                  <Select label="Current Immigration Status" options={[
                    { value: "citizen",       label: "Citizen of current country"  },
                    { value: "permanent_res", label: "Permanent Resident"          },
                    { value: "temp_res",      label: "Temporary Resident"          },
                    { value: "visitor",       label: "Visitor / Tourist"           },
                    { value: "student",       label: "Student"                     },
                    { value: "work_permit",   label: "Work Permit Holder"          },
                    { value: "self_employed", label: "Self-Employed / Freelancer"  },
                    { value: "remote",        label: "Remote Worker"               },
                  ]} required {...register("currentStatus")} error={errors.currentStatus?.message} />
                  <Input label="Passport Expiry Date" type="date" required
                    {...register("passportExpiry")} error={errors.passportExpiry?.message} />
                </FormSection>
              )}
            </div>

            {/* Footer actions */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3 rounded-b-3xl">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setStep(s => Math.max(1, s - 1))}
                disabled={step === 1}
              >
                <ArrowLeft size={14} /> Back
              </Button>

              <span className="text-xs text-slate-400" style={{ fontFamily: "var(--font-outfit)" }}>
                Step {step} of {STEPS.length}
              </span>

              {step < STEPS.length ? (
                <Button type="button" size="sm" onClick={() => setStep(s => Math.min(STEPS.length, s + 1))}>
                  Continue <ArrowRight size={14} />
                </Button>
              ) : (
                <Button type="submit" size="sm">
                  <Sparkles size={14} className="text-gold-300" />
                  Check Eligibility
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
