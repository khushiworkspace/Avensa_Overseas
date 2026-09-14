"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, CheckCircle, Send } from "lucide-react";
import { COUNTRIES, IMMIGRATION_ROUTES, CATEGORY_LABELS, EDUCATION_LEVELS, LANGUAGE_LEVELS, NATIONALITIES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { Disclaimer } from "@/components/ui/Disclaimer";
import Link from "next/link";

const WIZARD_STEPS = [
  { label: "Country" },
  { label: "Route" },
  { label: "Personal" },
  { label: "Education" },
  { label: "Family" },
  { label: "Financial" },
  { label: "Travel" },
  { label: "Documents" },
  { label: "Review" },
  { label: "Submit" },
];

const stepSchemas = [
  z.object({ destinationCountry: z.string().min(1, "Select a country") }),
  z.object({ routeId: z.string().min(1, "Select a route") }),
  z.object({
    firstName: z.string().min(1), lastName: z.string().min(1),
    dateOfBirth: z.string().min(1), nationality: z.string().min(1),
    passportNumber: z.string().min(1), passportExpiry: z.string().min(1),
    email: z.string().email(), phone: z.string().min(1),
    address: z.string().min(1), city: z.string().min(1),
    country: z.string().min(1), postalCode: z.string().min(1),
  }),
  z.object({
    highestEducation: z.string().min(1), fieldOfStudy: z.string().min(1),
    institution: z.string().min(1), graduationYear: z.string().min(1),
    occupation: z.string().min(1), yearsExperience: z.string(),
    hasJobOffer: z.string(), jobOfferEmployer: z.string().optional(),
    jobOfferPosition: z.string().optional(), annualSalary: z.string().optional(),
    languageProficiency: z.string(),
  }),
  z.object({
    maritalStatus: z.string().min(1),
    spouseName: z.string().optional(), spouseNationality: z.string().optional(),
  }),
  z.object({
    monthlyIncome: z.string(), currency: z.string(), bankBalance: z.string(),
    sponsorshipAvailable: z.string(),
  }),
  z.object({
    previousVisaRejections: z.string(), rejectionDetails: z.string().optional(),
    currentResidenceStatus: z.string().min(1),
  }),
  z.object({}),
  z.object({ declarationAccepted: z.boolean().refine(Boolean, "You must accept the declaration") }),
  z.object({}),
];

type WizardData = {
  destinationCountry: string; routeId: string;
  firstName: string; lastName: string; dateOfBirth: string;
  nationality: string; passportNumber: string; passportExpiry: string;
  email: string; phone: string; address: string; city: string;
  country: string; postalCode: string;
  highestEducation: string; fieldOfStudy: string; institution: string;
  graduationYear: string; occupation: string; yearsExperience: string;
  hasJobOffer: string; jobOfferEmployer?: string; jobOfferPosition?: string;
  annualSalary?: string; languageProficiency: string;
  maritalStatus: string; spouseName?: string; spouseNationality?: string;
  monthlyIncome: string; currency: string; bankBalance: string;
  sponsorshipAvailable: string;
  previousVisaRejections: string; rejectionDetails?: string;
  currentResidenceStatus: string;
  declarationAccepted: boolean;
};

export default function NewApplicationPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, getValues } = useForm<WizardData>({
    defaultValues: {
      hasJobOffer: "no", yearsExperience: "0", annualSalary: "",
      currency: "EUR", previousVisaRejections: "no",
      sponsorshipAvailable: "no", languageProficiency: "b1",
      declarationAccepted: false,
    },
  });

  const destCountry = watch("destinationCountry");
  const hasJobOffer = watch("hasJobOffer");
  const prevRejections = watch("previousVisaRejections");

  const availableRoutes = IMMIGRATION_ROUTES.filter((r) => r.countryId === destCountry).map((r) => ({
    value: r.id, label: r.name,
  }));

  const nationalityOptions = NATIONALITIES.map((n) => ({ value: n, label: n }));
  const countryOptions = COUNTRIES.map((c) => ({ value: c.id, label: c.name }));

  function nextStep() { setStep((s) => Math.min(WIZARD_STEPS.length, s + 1)); }
  function prevStep() { setStep((s) => Math.max(1, s - 1)); }

  async function onFinalSubmit() {
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
        <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 font-heading">Application Submitted!</h2>
        <p className="text-slate-500 mt-2 text-sm">
          Your application has been submitted successfully. You'll receive a confirmation email and can track progress from your dashboard.
        </p>
        <Link href="/dashboard/applications" className="mt-6">
          <Button>View My Applications</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/applications">
          <Button variant="ghost" size="sm"><ArrowLeft size={14} /> Back</Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900 font-heading">New Application</h1>
          <p className="text-xs text-slate-400">Step {step} of {WIZARD_STEPS.length}</p>
        </div>
      </div>

      <StepIndicator steps={WIZARD_STEPS} currentStep={step} className="mb-8" />
      <Disclaimer className="mb-6" />

      <form onSubmit={handleSubmit(onFinalSubmit)}>
        <Card className="max-w-2xl">
          <CardBody className="space-y-5">

            {/* Step 1: Country */}
            {step === 1 && (
              <>
                <h2 className="font-semibold text-slate-900 text-lg">Select Destination Country</h2>
                <Select label="Destination Country" options={countryOptions} placeholder="Choose a country"
                  required {...register("destinationCountry")} error={errors.destinationCountry?.message} />
              </>
            )}

            {/* Step 2: Route */}
            {step === 2 && (
              <>
                <h2 className="font-semibold text-slate-900 text-lg">Select Immigration Route</h2>
                {availableRoutes.length > 0 ? (
                  <Select label="Immigration Route" options={availableRoutes} placeholder="Choose a route"
                    required {...register("routeId")} error={errors.routeId?.message} />
                ) : (
                  <p className="text-sm text-amber-700 bg-amber-50 rounded-lg p-4">
                    Please go back and select a destination country first.
                  </p>
                )}
              </>
            )}

            {/* Step 3: Personal Details */}
            {step === 3 && (
              <>
                <h2 className="font-semibold text-slate-900 text-lg">Personal Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="First Name" required {...register("firstName")} error={errors.firstName?.message} />
                  <Input label="Last Name" required {...register("lastName")} error={errors.lastName?.message} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Date of Birth" type="date" required {...register("dateOfBirth")} />
                  <Select label="Nationality" options={nationalityOptions} placeholder="Select" required
                    {...register("nationality")} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Passport Number" required {...register("passportNumber")} />
                  <Input label="Passport Expiry" type="date" required {...register("passportExpiry")} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Email Address" type="email" required {...register("email")} />
                  <Input label="Phone Number" required {...register("phone")} />
                </div>
                <Input label="Home Address" required {...register("address")} />
                <div className="grid grid-cols-3 gap-4">
                  <Input label="City" required {...register("city")} />
                  <Select label="Country" options={countryOptions} placeholder="Select" required {...register("country")} />
                  <Input label="Postal Code" required {...register("postalCode")} />
                </div>
              </>
            )}

            {/* Step 4: Education & Employment */}
            {step === 4 && (
              <>
                <h2 className="font-semibold text-slate-900 text-lg">Education & Employment</h2>
                <Select label="Highest Education" options={EDUCATION_LEVELS} placeholder="Select" required
                  {...register("highestEducation")} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Field of Study" required {...register("fieldOfStudy")} />
                  <Input label="Institution / University" required {...register("institution")} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Graduation Year" type="number" min={1970} max={2030} required {...register("graduationYear")} />
                  <Input label="Current Occupation" required {...register("occupation")} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Years of Experience" type="number" min={0} {...register("yearsExperience")} />
                  <Select label="Language Proficiency" options={LANGUAGE_LEVELS} placeholder="Select level"
                    {...register("languageProficiency")} />
                </div>
                <Select label="Do you have a job offer?" options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]}
                  {...register("hasJobOffer")} />
                {hasJobOffer === "yes" && (
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Employer Name" {...register("jobOfferEmployer")} />
                    <Input label="Job Position / Title" {...register("jobOfferPosition")} />
                    <Input label="Annual Salary (EUR)" type="number" {...register("annualSalary")} />
                  </div>
                )}
              </>
            )}

            {/* Step 5: Family */}
            {step === 5 && (
              <>
                <h2 className="font-semibold text-slate-900 text-lg">Family Information</h2>
                <Select label="Marital Status" options={[
                  { value: "single", label: "Single" },
                  { value: "married", label: "Married" },
                  { value: "partner", label: "Registered Partner" },
                  { value: "divorced", label: "Divorced" },
                  { value: "widowed", label: "Widowed" },
                ]} required {...register("maritalStatus")} />
                <Input label="Spouse / Partner Full Name (if applicable)" {...register("spouseName")} />
                <Select label="Spouse / Partner Nationality" options={nationalityOptions} placeholder="Select"
                  {...register("spouseNationality")} />
              </>
            )}

            {/* Step 6: Financial */}
            {step === 6 && (
              <>
                <h2 className="font-semibold text-slate-900 text-lg">Financial Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Monthly Income" type="number" {...register("monthlyIncome")} hint="Gross, in the selected currency" />
                  <Select label="Currency" options={[
                    { value: "EUR", label: "EUR – Euro" },
                    { value: "GBP", label: "GBP – British Pound" },
                    { value: "USD", label: "USD – US Dollar" },
                    { value: "INR", label: "INR – Indian Rupee" },
                  ]} {...register("currency")} />
                </div>
                <Input label="Bank Balance (in selected currency)" type="number" {...register("bankBalance")} />
                <Select label="Is sponsorship available?" options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]}
                  {...register("sponsorshipAvailable")} />
              </>
            )}

            {/* Step 7: Travel History */}
            {step === 7 && (
              <>
                <h2 className="font-semibold text-slate-900 text-lg">Travel & Residence History</h2>
                <Select label="Current immigration / residence status in your country" options={[
                  { value: "citizen", label: "Citizen" },
                  { value: "permanent_resident", label: "Permanent Resident" },
                  { value: "long_term", label: "Long-term Resident Permit" },
                  { value: "temporary", label: "Temporary Permit" },
                  { value: "student", label: "Student Visa / Permit" },
                  { value: "visitor", label: "Visitor" },
                  { value: "other", label: "Other" },
                ]} required {...register("currentResidenceStatus")} />
                <Select label="Have you ever had a visa application rejected?" options={[
                  { value: "no", label: "No" }, { value: "yes", label: "Yes" },
                ]} {...register("previousVisaRejections")} />
                {prevRejections === "yes" && (
                  <div>
                    <label className="form-label">Rejection Details</label>
                    <textarea className="form-input resize-none" rows={3}
                      placeholder="Please describe the rejection(s) briefly..."
                      {...register("rejectionDetails")} />
                  </div>
                )}
              </>
            )}

            {/* Step 8: Documents */}
            {step === 8 && (
              <>
                <h2 className="font-semibold text-slate-900 text-lg">Document Upload</h2>
                <p className="text-sm text-slate-500">
                  You can upload documents now or later from the Documents section of your dashboard.
                  Accepted formats: PDF, JPG, PNG, DOCX · Max 10 MB per file.
                </p>
                <div className="space-y-3">
                  {["Passport (all pages)", "Biometric Photo", "Degree / Qualification Certificate", "Employment Contract / Job Offer Letter", "Health Insurance Certificate"].map((docName) => (
                    <div key={docName} className="rounded-lg border-2 border-dashed border-slate-200 p-4 hover:border-brand-300 transition-colors">
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm font-medium text-slate-700">{docName}</span>
                        <span className="text-xs text-brand-600 font-medium">+ Upload</span>
                        <input type="file" accept=".pdf,.jpg,.jpeg,.png,.docx" className="hidden" />
                      </label>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400">All documents are stored encrypted. Access is role-controlled.</p>
              </>
            )}

            {/* Step 9: Review */}
            {step === 9 && (
              <>
                <h2 className="font-semibold text-slate-900 text-lg">Review Your Application</h2>
                <div className="space-y-3">
                  {[
                    { label: "Destination Country", value: COUNTRIES.find((c) => c.id === getValues("destinationCountry"))?.name ?? "—" },
                    { label: "Immigration Route", value: IMMIGRATION_ROUTES.find((r) => r.id === getValues("routeId"))?.name ?? "—" },
                    { label: "Full Name", value: `${getValues("firstName")} ${getValues("lastName")}` },
                    { label: "Nationality", value: getValues("nationality") || "—" },
                    { label: "Passport", value: getValues("passportNumber") || "—" },
                    { label: "Occupation", value: getValues("occupation") || "—" },
                    { label: "Education", value: EDUCATION_LEVELS.find((e) => e.value === getValues("highestEducation"))?.label ?? "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-sm border-b border-slate-100 pb-2">
                      <span className="text-slate-400">{label}</span>
                      <span className="font-medium text-slate-800">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2 mt-4">
                  <input type="checkbox" id="declaration" {...register("declarationAccepted")}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600" />
                  <label htmlFor="declaration" className="text-xs text-slate-600 leading-relaxed">
                    I confirm that all information provided is accurate and complete to the best of my knowledge.
                    I understand that providing false information may result in my application being rejected and may have legal consequences.
                  </label>
                </div>
                {errors.declarationAccepted && (
                  <p className="text-xs text-red-600">{errors.declarationAccepted.message}</p>
                )}
              </>
            )}

            {/* Step 10: Submit */}
            {step === 10 && (
              <>
                <h2 className="font-semibold text-slate-900 text-lg">Submit Application</h2>
                <div className="rounded-xl bg-brand-50 border border-brand-200 p-5 text-sm text-brand-800">
                  <p className="font-semibold mb-2">Before you submit:</p>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2"><CheckCircle size={14} className="text-brand-500 mt-0.5" /> All required information has been provided</li>
                    <li className="flex items-start gap-2"><CheckCircle size={14} className="text-brand-500 mt-0.5" /> Documents have been uploaded or will be uploaded from your dashboard</li>
                    <li className="flex items-start gap-2"><CheckCircle size={14} className="text-brand-500 mt-0.5" /> You have read and accepted the declaration</li>
                  </ul>
                </div>
                <Disclaimer />
              </>
            )}
          </CardBody>

          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-xl">
            <Button type="button" variant="secondary" onClick={prevStep} disabled={step === 1}>
              <ArrowLeft size={15} /> Back
            </Button>
            <span className="text-sm text-slate-400 font-medium">{step} / {WIZARD_STEPS.length}</span>
            {step < WIZARD_STEPS.length ? (
              <Button type="button" onClick={nextStep}>
                Next <ArrowRight size={15} />
              </Button>
            ) : (
              <Button type="submit" loading={isSubmitting} variant="gold">
                <Send size={15} /> Submit Application
              </Button>
            )}
          </div>
        </Card>
      </form>
    </div>
  );
}
