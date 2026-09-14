import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon?: LucideIcon;
  iconColor?: string;
  accent?: "teal" | "coral" | "mint" | "amber";
  className?: string;
}

const accentMap = {
  teal:  { icon: "bg-teal-100 text-teal-600",  bar: "bg-teal-500",  glow: "shadow-teal-sm"  },
  coral: { icon: "bg-coral-100 text-coral-600", bar: "bg-coral-500", glow: "shadow-coral-sm" },
  mint:  { icon: "bg-mint-100 text-mint-600",   bar: "bg-mint-500",  glow: ""               },
  amber: { icon: "bg-amber-100 text-amber-600", bar: "bg-amber-500", glow: ""               },
};

export function StatCard({
  label,
  value,
  change,
  trend,
  icon: Icon,
  iconColor,
  accent = "teal",
  className,
}: StatCardProps) {
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  const trendColor =
    trend === "up"
      ? "text-mint-600 bg-mint-50"
      : trend === "down"
      ? "text-rose-500 bg-rose-50"
      : "text-navy-400 bg-sand-100";

  const colors = accentMap[accent];

  return (
    <div
      className={cn(
        "relative rounded-2xl bg-white border border-[rgba(14,20,72,0.08)] shadow-card p-5 overflow-hidden",
        "transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5",
        className
      )}
    >
      {/* top accent bar */}
      <div className={cn("absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl", colors.bar)} />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold text-navy-900 leading-none">{value}</p>
        </div>

        {Icon && (
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
              iconColor ?? colors.icon
            )}
          >
            <Icon size={20} />
          </div>
        )}
      </div>

      {change !== undefined && trend && (
        <div
          className={cn(
            "mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
            trendColor
          )}
        >
          <TrendIcon size={12} />
          <span>{Math.abs(change)}% vs last month</span>
        </div>
      )}
    </div>
  );
}
