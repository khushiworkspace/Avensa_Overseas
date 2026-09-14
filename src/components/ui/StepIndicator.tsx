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
          const isActive    = stepNumber === currentStep;

          return (
            <li key={index} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-xl border-2 text-sm font-bold transition-all duration-200",
                    isCompleted && "border-mint-500 bg-mint-500 text-white shadow-sm",
                    isActive    && "border-teal-600 bg-teal-600 text-white shadow-teal-sm",
                    !isCompleted && !isActive && "border-navy-200 bg-white text-navy-300"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isCompleted ? <Check size={14} /> : stepNumber}
                </div>
                <span
                  className={cn(
                    "mt-1.5 hidden text-xs font-semibold sm:block",
                    isActive    ? "text-teal-600"  :
                    isCompleted ? "text-mint-600"  :
                                  "text-navy-300"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mx-2 rounded-full transition-colors duration-300",
                    isCompleted ? "bg-mint-300" : "bg-navy-100"
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
