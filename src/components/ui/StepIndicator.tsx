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
                    "flex h-9 w-9 items-center justify-center rounded-2xl text-sm font-bold transition-all duration-300",
                    isActive && "scale-110"
                  )}
                  aria-current={isActive ? "step" : undefined}
                  style={{
                    fontFamily: "var(--font-outfit)",
                    ...(isCompleted ? {
                      background: "linear-gradient(135deg, #0d1b4b 0%, #1a2b6b 100%)",
                      border: "2px solid transparent",
                      color: "#F5A623",
                      boxShadow: "0 2px 12px rgba(13,27,75,0.30)",
                    } : isActive ? {
                      background: "linear-gradient(135deg, #0d1b4b 0%, #1a2b6b 100%)",
                      border: "2px solid rgba(245,166,35,0.60)",
                      color: "#fff",
                      boxShadow: "0 4px 20px rgba(13,27,75,0.45), 0 0 0 3px rgba(245,166,35,0.15)",
                    } : {
                      background: "#fff",
                      border: "2px solid rgba(13,27,75,0.15)",
                      color: "rgba(13,27,75,0.35)",
                    }),
                  }}
                >
                  {isCompleted ? <Check size={14} /> : stepNumber}
                </div>
                <span
                  className="mt-1.5 hidden text-xs font-semibold sm:block"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: isActive    ? "#0d1b4b" :
                           isCompleted ? "#1a2b6b" :
                                         "rgba(13,27,75,0.35)",
                  }}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className="h-0.5 flex-1 mx-2 rounded-full transition-all duration-500"
                  style={{
                    background: isCompleted
                      ? "linear-gradient(90deg, #0d1b4b, #F5A623)"
                      : "rgba(13,27,75,0.12)",
                  }}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
