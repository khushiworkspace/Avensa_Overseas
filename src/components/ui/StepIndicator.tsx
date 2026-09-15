import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  label: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number; // 1-based
  className?: string;
}

export function StepIndicator({ steps, currentStep, className }: StepIndicatorProps) {
  return (
    <nav aria-label="Progress" className={cn("w-full", className)}>
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const stepNumber  = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive    = stepNumber === currentStep;

          return (
            <li key={index} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-2xl border-2 text-sm font-bold transition-all duration-300",
                    isCompleted && "border-emerald-500 bg-emerald-500 text-white shadow-sm",
                    isActive    && "border-indigo-600 bg-indigo-600 text-white shadow-indigo-md scale-110",
                    !isCompleted && !isActive && "border-slate-200 bg-white text-slate-400"
                  )}
                  aria-current={isActive ? "step" : undefined}
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {isCompleted ? <Check size={14} /> : stepNumber}
                </div>
                <span
                  className={cn(
                    "mt-1.5 hidden text-xs font-semibold sm:block",
                    isActive    ? "text-indigo-600"  :
                    isCompleted ? "text-emerald-600" :
                                  "text-slate-400"
                  )}
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className={cn(
                  "h-0.5 flex-1 mx-2 rounded-full transition-colors duration-300",
                  isCompleted ? "bg-emerald-300" : "bg-slate-200"
                )} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
