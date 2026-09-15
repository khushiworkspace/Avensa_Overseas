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
    "btn-shine bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-indigo-md hover:shadow-indigo-lg hover:-translate-y-0.5 focus-visible:ring-indigo-400",
  accent:
    "btn-shine bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-indigo-md hover:shadow-indigo-lg hover:-translate-y-0.5 focus-visible:ring-indigo-400",
  gold:
    "btn-shine bg-gradient-to-r from-amber-500 to-gold-400 text-void font-bold shadow-gold-md hover:shadow-gold-lg hover:-translate-y-0.5 focus-visible:ring-gold-400",
  secondary:
    "border border-[--border-medium] bg-white text-slate-700 shadow-card hover:bg-indigo-50 hover:border-indigo-400/50 hover:text-indigo-700 hover:-translate-y-0.5 focus-visible:ring-indigo-400",
  danger:
    "bg-ember-600 text-white shadow-sm hover:bg-ember-700 hover:-translate-y-0.5 focus-visible:ring-ember-500",
  ghost:
    "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:ring-indigo-400",
  outline:
    "border border-indigo-400/50 text-indigo-700 bg-indigo-50/50 hover:bg-indigo-100 hover:-translate-y-0.5 focus-visible:ring-indigo-400",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm:  "px-3.5 py-1.5 text-xs gap-1.5 rounded-xl",
  md:  "px-5 py-2.5 text-sm gap-2 rounded-2xl",
  lg:  "px-6 py-3 text-sm gap-2 rounded-2xl",
  xl:  "px-8 py-3.5 text-base gap-2.5 rounded-2xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, children, className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        style={{ fontFamily: "var(--font-outfit)" }}
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
