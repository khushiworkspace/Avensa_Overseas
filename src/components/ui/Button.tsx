import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "danger" | "ghost" | "outline" | "gold";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-teal-600 text-white shadow-teal-sm hover:bg-teal-700 hover:shadow-teal-md focus:ring-teal-500",
  accent:
    "bg-coral-500 text-white shadow-coral-sm hover:bg-coral-600 hover:shadow-coral-md focus:ring-coral-400",
  // keep "gold" as alias for accent so old code doesn't break
  gold:
    "bg-coral-500 text-white shadow-coral-sm hover:bg-coral-600 hover:shadow-coral-md focus:ring-coral-400",
  secondary:
    "border border-navy-200 bg-white text-navy-800 shadow-card hover:bg-sand-50 hover:border-teal-400 hover:text-teal-700 focus:ring-teal-500",
  danger:
    "bg-rose-600 text-white shadow-sm hover:bg-rose-700 focus:ring-rose-500",
  ghost:
    "text-navy-600 hover:bg-teal-50 hover:text-teal-700 focus:ring-teal-500",
  outline:
    "border border-teal-600 text-teal-700 hover:bg-teal-50 focus:ring-teal-500",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm:  "px-3 py-1.5 text-xs gap-1.5 rounded-lg",
  md:  "px-5 py-2.5 text-sm gap-2 rounded-xl",
  lg:  "px-6 py-3 text-sm gap-2 rounded-xl",
  xl:  "px-8 py-3.5 text-base gap-2.5 rounded-2xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "active:scale-[0.98]",
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
