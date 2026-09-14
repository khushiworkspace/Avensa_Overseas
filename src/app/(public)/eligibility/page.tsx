"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, ArrowLeft, CheckCircle, AlertTriangle, ExternalLink, RotateCcw } from "lucide-react";
import { COUNTRIES, IMMIGRATION_ROUTES, NATIONALITIES, EDUCATION_LEVELS, LANGUAGE_LEVELS, CATEGORY_LABELS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { Disclaimer } from "@/components/ui/Disclaimer";
import Link from "next/link";

const schema = z.object({
  nationality: z.string().min(1, "Required"),
  residenceCountry: z.string().min(1, "Required"),
  destinationCountry: z.string().min(1, "Required"),
  purpose: z.string().min(1, "Required"),
  dateOfBirth: z.string().min(1, "Required"),
  education: z.string().min(1, "Required"),
  occupation: z.string().min(1, "Required"),
  yearsExperience: z.string(),
  hasJobOffer: z.string(),
  annualSalary: z.string(),
  languageProficiency: z.string().min(1, "Required"),
  familyStatus: z.string().min(1, "Required"),
  currentStatus: z.string().min(1, "Required"),
  passportExpiry: z.string().min(1, "Required"),
});

type FormData = z.infer<typeof schema>;

const STEPS = [
  { label: "Background" },
  { label: "Destination" },
  { label: "Education" },
  { label: "Employment" },
  { label: "Personal" },
];

const countryOptions = COUNTRIES.map((c) => ({ value: c.id, label: c.name }));
const nationalityOptions = NATIONALITIES.map((n) => ({ value: n, label: n }));
const purposeOptions = (["work", "study", "family", "residence", "visit", "special"] as const).map((p) => ({
  value: p,
  label: CATEGORY_LABELS[p],
}));

function calcAge(dob: string): number {
  if (!dob) return 0;
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

export default function EligibilityPage() {
  const [step, setStep] = useState(1);
  const [result, setResult] = useState<null | { eligible: typeof IMMIGRATION_ROUTES; partial: typeof IMMIGRATION_ROUTES }>(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { hasJobOffer: "no", yearsExperience: "0", annualSalary: "0" },
  });

  const destCountry = watch("destinationCountry");
  const purpose = watch("purpose");
  const hasJobOffer = watch("hasJobOffer");

  function onSubmit(data: FormData) {
    const age = calcAge(data.dateOfBirth);
    const salary = Number(data.annualSalary) || 0;
    const exp = Number(data.yearsExperience) || 0;

    const candidateRoutes = IMMIGRATION_ROUTES.filter(
      (r) => r.countryId === data.destinationCountry && r.category === (data.purpose as string)
    );

    const eligible: typeof IMMIGRATION_ROUTES = [];
    const partial: typeof IMMIGRATION_ROUTES = [];

    for (const route of candidateRoutes) {
      const missing: string[] = [];
      if (route.id === "de-skilled-worker") {
        if (!["bachelor", "master", "phd", "postdoc", "vocational"].includes(data.education)) missing.push("Recognised degree or vocational qualification required");
        if (data.hasJobOffer !== "yes") missing.push("Job offer from a German employer required");
      }
      if (route.id === "de-eu-blue-card") {
        if (!["bachelor", "master", "phd", "postdoc"].includes(data.education)) missing.push("University degree (min. 3 years) required");
        if (data.hasJobOffer !== "yes") missing.push("Binding job offer required");
        if (salary > 0 && salary < 41041) missing.push(`Salary threshold not met (min. €41,041 p.a. for shortage occupations)`);
      }
      if (route.id === "de-job-seeker") {
        if (!["bachelor", "master", "phd", "postdoc", "vocational"].includes(data.education)) missing.push("Recognised qualification required");
      }
      if (route.id === "de-student") {
        if (age < 17) missing.push("Must be at least 17 years old");
      }
      if (route.id === "nl-highly-skilled") {
        if (data.hasJobOffer !== "yes") missing.push("Must be employed by a recognised IND sponsor");
        const threshold = age >= 30 ? 6764 : 5008;
        const monthlySalary = salary / 12;
        if (salary > 0 && monthlySalary < threshold) missing.push(`Monthly salary below threshold (€${threshold}/month)`);
      }
      if (route.id === "es-digital-nomad") {
        if (!["self_employed", "remote"].includes(data.currentStatus) && data.hasJobOffer !== "yes") missing.push("Must work remotely for non-Spanish employers");
        if (salary > 0 && salary < 31752) missing.push("Income below minimum threshold (~€2,646/month)");
      }

      if (missing.length === 0) eligible.push(route);
      else if (missing.length <= 2) partial.push(route);
    }

    setResult({ eligible, partial });
  }

  function reset() { setResult(null); setStep(1); }

  if (result) {
    return (
      <div className="bg-slate-50 min-h-screen py-12">
        <div className="page-container max-w-3xl">
          <Disclaimer className="mb-6" />
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Eligibility Assessment Result</h2>
                <Button variant="ghost" size="sm" onClick={reset}>
                  <RotateCcw size={14} /> Start Over
                </Button>
              </div>
              <p className="text-xs text-slate-400 mt-1">Preliminary guidance only — not a legal determination</p>
            </CardHeader>
            <CardBody className="space-y-6">
              {result.eligible.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle size={18} className="text-green-500" />
                    <h3 className="font-semibold text-green-800">Potentially Eligible Routes ({result.eligible.length})</h3>
                  </div>
                  <div className="space-y-3">
                    {result.eligible.map((r) => {
                      const country = COUNTRIES.find((c) => c.id === r.countryId);
                      return (
                        <div key={r.id} className="rounded-lg border border-green-200 bg-green-50 p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-green-900">{r.name}</p>
                              <p className="text-sm text-green-700 mt-0.5">{country?.name} · {r.processingTime}</p>
                              <p className="text-xs text-green-600 mt-1">{r.shortDescription}</p>
                            </div>
                            <Link href={`/routes/${r.slug}`}>
                              <Button size="sm" variant="outline" className="border-green-400 text-green-700 hover:bg-green-100">
                                View <ArrowRight size={12} />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {result.partial.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={18} className="text-amber-500" />
                    <h3 className="font-semibold text-amber-800">Partial Match — Missing Criteria ({result.partial.length})</h3>
                  </div>
                  <div className="space-y-3">
                    {result.partial.map((r) => (
                      <div key={r.id} className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                        <p className="font-semibold text-amber-900">{r.name}</p>
                        <p className="text-sm text-amber-700 mt-1">{r.shortDescription}</p>
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

              {result.eligible.length === 0 && result.partial.length === 0 && (
                <div className="text-center py-8">
                  <AlertTriangle size={32} className="mx-auto text-slate-400 mb-3" />
                  <p className="font-semibold text-slate-700">No matching routes found</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Based on the information provided, no routes in our current database closely match your profile. This does not mean you are ineligible — please consult official government sources or a qualified immigration adviser.
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
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="gradient-hero py-14">
        <div className="page-container text-center">
          <h1 className="text-4xl font-extrabold text-white font-heading">Eligibility Checker</h1>
          <p className="mt-3 text-blue-200 max-w-lg mx-auto">
            Answer a few guided questions to see which EU immigration routes may apply to you.
          </p>
        </div>
      </div>

      <div className="page-container py-10 max-w-2xl">
        <StepIndicator steps={STEPS} currentStep={step} className="mb-8" />
        <Disclaimer className="mb-6" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardBody className="space-y-5">
              {step === 1 && (
                <>
                  <h2 className="font-semibold text-slate-900 text-lg">Your Background</h2>
                  <Select label="Your Nationality" options={nationalityOptions} placeholder="Select nationality" required
                    {...register("nationality")} error={errors.nationality?.message} />
                  <Select label="Current Country of Residence" options={countryOptions} placeholder="Select country"
                    required {...register("residenceCountry")} error={errors.residenceCountry?.message} />
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="font-semibold text-slate-900 text-lg">Destination & Purpose</h2>
                  <Select label="Destination Country" options={countryOptions} placeholder="Select destination"
                    required {...register("destinationCountry")} error={errors.destinationCountry?.message} />
                  <Select label="Purpose of Travel / Stay" options={purposeOptions} placeholder="Select purpose"
                    required {...register("purpose")} error={errors.purpose?.message} />
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="font-semibold text-slate-900 text-lg">Education</h2>
                  <Select label="Highest Level of Education" options={EDUCATION_LEVELS} placeholder="Select level"
                    required {...register("education")} error={errors.education?.message} />
                  <Select label="Language Proficiency (Destination Language)" options={LANGUAGE_LEVELS}
                    placeholder="Select level" required {...register("languageProficiency")}
                    error={errors.languageProficiency?.message} />
                </>
              )}

              {step === 4 && (
                <>
                  <h2 className="font-semibold text-slate-900 text-lg">Employment</h2>
                  <Input label="Occupation / Job Title" placeholder="e.g. Software Engineer" required
                    {...register("occupation")} error={errors.occupation?.message} />
                  <Input label="Years of Work Experience" type="number" min={0} max={50}
                    {...register("yearsExperience")} />
                  <Select label="Do you have a job offer?" options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]}
                    {...register("hasJobOffer")} />
                  {hasJobOffer === "yes" && (
                    <Input label="Annual Salary (EUR)" type="number" placeholder="e.g. 55000"
                      {...register("annualSalary")} hint="Enter the offered annual gross salary in EUR" />
                  )}
                </>
              )}

              {step === 5 && (
                <>
                  <h2 className="font-semibold text-slate-900 text-lg">Personal Details</h2>
                  <Input label="Date of Birth" type="date" required {...register("dateOfBirth")}
                    error={errors.dateOfBirth?.message} />
                  <Select label="Family / Marital Status"
                    options={[
                      { value: "single", label: "Single" },
                      { value: "married", label: "Married" },
                      { value: "partner", label: "Registered Partner" },
                      { value: "divorced", label: "Divorced" },
                    ]}
                    required {...register("familyStatus")} error={errors.familyStatus?.message} />
                  <Select label="Current Immigration / Residence Status"
                    options={[
                      { value: "citizen", label: "Citizen of residence country" },
                      { value: "permanent_resident", label: "Permanent Resident" },
                      { value: "long_term", label: "Long-term Resident" },
                      { value: "temporary", label: "Temporary / Work Permit" },
                      { value: "student", label: "Student Visa" },
                      { value: "visitor", label: "Visitor / Tourist" },
                      { value: "self_employed", label: "Self-Employed" },
                      { value: "remote", label: "Remote Worker" },
                      { value: "other", label: "Other" },
                    ]}
                    required {...register("currentStatus")} error={errors.currentStatus?.message} />
                  <Input label="Passport Expiry Date" type="date" required {...register("passportExpiry")}
                    error={errors.passportExpiry?.message}
                    hint="Your passport must be valid for the duration of the visa / permit" />
                </>
              )}
            </CardBody>

            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-xl">
              <Button type="button" variant="secondary" onClick={() => setStep(s => Math.max(1, s - 1))}
                disabled={step === 1}>
                <ArrowLeft size={15} /> Back
              </Button>
              <span className="text-sm text-slate-400">Step {step} of {STEPS.length}</span>
              {step < STEPS.length ? (
                <Button type="button" onClick={() => setStep(s => Math.min(STEPS.length, s + 1))}>
                  Next <ArrowRight size={15} />
                </Button>
              ) : (
                <Button type="submit">
                  Check Eligibility <CheckCircle size={15} />
                </Button>
              )}
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
}
