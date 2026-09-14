import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "teal" | "coral" | "mint" | "amber" | "rose" | "navy" | "sand" | "purple" | "orange" | "blue" | "green" | "yellow" | "red" | "slate";
  className?: string;
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  // New palette
  teal:   "bg-teal-100 text-teal-700 border border-teal-200",
  coral:  "bg-coral-100 text-coral-700 border border-coral-200",
  mint:   "bg-mint-100 text-mint-700 border border-mint-200",
  amber:  "bg-amber-100 text-amber-700 border border-amber-200",
  rose:   "bg-rose-100 text-rose-700 border border-rose-200",
  navy:   "bg-navy-100 text-navy-700 border border-navy-200",
  sand:   "bg-sand-100 text-sand-700 border border-sand-200",
  purple: "bg-purple-100 text-purple-700 border border-purple-200",
  orange: "bg-amber-100 text-amber-700 border border-amber-200",
  // Legacy aliases so old code doesn't break
  blue:   "bg-teal-100 text-teal-700 border border-teal-200",
  green:  "bg-mint-100 text-mint-700 border border-mint-200",
  yellow: "bg-amber-100 text-amber-700 border border-amber-200",
  red:    "bg-rose-100 text-rose-700 border border-rose-200",
  slate:  "bg-navy-100 text-navy-600 border border-navy-200",
};

export function Badge({ children, variant = "navy", className }: BadgeProps) {
  return (
    <span
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
