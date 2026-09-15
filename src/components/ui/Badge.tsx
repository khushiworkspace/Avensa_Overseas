import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "indigo" | "violet" | "gold" | "emerald" | "rose" | "slate" | "amber" |
            /* legacy aliases kept for existing code */
            "teal" | "coral" | "mint" | "navy" | "sand" | "purple" | "orange" |
            "blue" | "green" | "yellow" | "red";
  className?: string;
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  /* New palette */
  indigo:  "bg-indigo-100  text-indigo-700  border border-indigo-200/80",
  violet:  "bg-violet-100  text-violet-700  border border-violet-200/80",
  gold:    "bg-amber-100   text-amber-700   border border-amber-200/80",
  emerald: "bg-emerald-100 text-emerald-700 border border-emerald-200/80",
  rose:    "bg-red-100     text-red-700     border border-red-200/80",
  slate:   "bg-slate-100   text-slate-600   border border-slate-200/80",
  amber:   "bg-amber-100   text-amber-700   border border-amber-200/80",
  /* Legacy aliases — keep existing pages working */
  teal:    "bg-indigo-100  text-indigo-700  border border-indigo-200/80",
  coral:   "bg-red-100     text-red-700     border border-red-200/80",
  mint:    "bg-emerald-100 text-emerald-700 border border-emerald-200/80",
  navy:    "bg-slate-100   text-slate-600   border border-slate-200/80",
  sand:    "bg-amber-50    text-amber-600   border border-amber-200/60",
  purple:  "bg-violet-100  text-violet-700  border border-violet-200/80",
  orange:  "bg-amber-100   text-amber-700   border border-amber-200/80",
  blue:    "bg-indigo-100  text-indigo-700  border border-indigo-200/80",
  green:   "bg-emerald-100 text-emerald-700 border border-emerald-200/80",
  yellow:  "bg-amber-100   text-amber-700   border border-amber-200/80",
  red:     "bg-red-100     text-red-700     border border-red-200/80",
};

export function Badge({ children, variant = "slate", className }: BadgeProps) {
  return (
    <span
      style={{ fontFamily: "var(--font-outfit)" }}
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
