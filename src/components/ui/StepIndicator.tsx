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
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <li key={index} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200",
                    isCompleted && "border-green-500 bg-green-500 text-white",
                    isActive && "border-brand-600 bg-brand-600 text-white",
                    !isCompleted && !isActive && "border-slate-300 bg-white text-slate-400"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isCompleted ? <Check size={14} /> : stepNumber}
                </div>
                <span
                  className={cn(
                    "mt-1 hidden text-xs font-medium sm:block",
                    isActive ? "text-brand-600" : isCompleted ? "text-green-600" : "text-slate-400"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mx-1 transition-colors duration-200",
                    isCompleted ? "bg-green-400" : "bg-slate-200"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
