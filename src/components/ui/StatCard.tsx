import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon?: LucideIcon;
  iconColor?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  change,
  trend,
  icon: Icon,
  iconColor = "bg-brand-100 text-brand-600",
  className,
}: StatCardProps) {
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor =
    trend === "up"
      ? "text-green-600"
      : trend === "down"
      ? "text-red-500"
      : "text-slate-400";

  return (
    <div
      className={cn(
        "rounded-xl bg-white border border-slate-100 shadow-card p-5",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
        </div>
        {Icon && (
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              iconColor
            )}
          >
            <Icon size={20} />
          </div>
        )}
      </div>
      {change !== undefined && trend && (
        <div className={cn("mt-3 flex items-center gap-1 text-xs font-medium", trendColor)}>
          <TrendIcon size={13} />
          <span>{Math.abs(change)}% vs last month</span>
        </div>
      )}
    </div>
  );
}
