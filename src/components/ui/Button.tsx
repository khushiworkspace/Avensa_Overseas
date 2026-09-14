import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "danger" | "ghost" | "outline" | "gold";
  size?:    "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-teal-600 text-white shadow-teal-sm hover:bg-teal-700 hover:shadow-teal-md hover:-translate-y-0.5 focus-visible:ring-teal-500",
  accent:
    "btn-shine bg-gradient-to-r from-coral-600 to-coral-500 text-white shadow-coral-sm hover:shadow-coral-md hover:-translate-y-0.5 focus-visible:ring-coral-400",
  gold:
    "btn-shine bg-gradient-to-r from-coral-600 to-coral-500 text-white shadow-coral-sm hover:shadow-coral-md hover:-translate-y-0.5 focus-visible:ring-coral-400",
  secondary:
    "border border-[rgba(14,20,72,0.13)] bg-white text-navy-800 shadow-card hover:bg-sand-50 hover:border-teal-400/60 hover:text-teal-700 hover:-translate-y-0.5 focus-visible:ring-teal-500",
  danger:
    "bg-rose-600 text-white shadow-sm hover:bg-rose-700 hover:-translate-y-0.5 focus-visible:ring-rose-500",
  ghost:
    "text-navy-600 hover:bg-teal-50 hover:text-teal-700 focus-visible:ring-teal-500",
  outline:
    "border border-teal-600 text-teal-700 hover:bg-teal-50 hover:-translate-y-0.5 focus-visible:ring-teal-500",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm:  "px-3.5 py-1.5 text-xs gap-1.5 rounded-lg",
  md:  "px-5 py-2.5 text-sm gap-2 rounded-xl",
  lg:  "px-6 py-3 text-sm gap-2 rounded-xl",
  xl:  "px-8 py-3.5 text-base gap-2.5 rounded-2xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, children, className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-semibold",
          "transition-all duration-300 ease-spring",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "active:translate-y-0 active:scale-[0.97]",
          "overflow-hidden relative",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="animate-spin shrink-0" size={14} />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
