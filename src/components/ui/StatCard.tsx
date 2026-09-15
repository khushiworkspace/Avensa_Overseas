import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon?: LucideIcon;
  iconColor?: string;
  accent?: "indigo" | "violet" | "gold" | "emerald" | "teal" | "coral" | "mint" | "amber";
  className?: string;
}

const accentMap: Record<NonNullable<StatCardProps["accent"]>, { icon: string; bar: string; glow: string }> = {
  indigo:  { icon: "bg-indigo-100  text-indigo-600",  bar: "bg-indigo-500",  glow: "shadow-indigo-sm" },
  violet:  { icon: "bg-violet-100  text-violet-600",  bar: "bg-violet-500",  glow: "shadow-violet-md" },
  gold:    { icon: "bg-amber-100   text-amber-600",   bar: "bg-amber-500",   glow: "shadow-gold-sm"   },
  emerald: { icon: "bg-emerald-100 text-emerald-600", bar: "bg-emerald-500", glow: ""                 },
  /* legacy aliases */
  teal:    { icon: "bg-indigo-100  text-indigo-600",  bar: "bg-indigo-500",  glow: "shadow-indigo-sm" },
  coral:   { icon: "bg-red-100     text-red-600",     bar: "bg-red-500",     glow: ""                 },
  mint:    { icon: "bg-emerald-100 text-emerald-600", bar: "bg-emerald-500", glow: ""                 },
  amber:   { icon: "bg-amber-100   text-amber-600",   bar: "bg-amber-500",   glow: "shadow-gold-sm"   },
};

export function StatCard({ label, value, change, trend, icon: Icon, iconColor, accent = "indigo", className }: StatCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor =
    trend === "up"   ? "text-emerald-600 bg-emerald-50" :
    trend === "down" ? "text-red-500     bg-red-50"     :
                       "text-slate-400   bg-slate-100";
  const colors = accentMap[accent];

  return (
    <div className={cn(
      "relative rounded-3xl bg-white border border-[--border-subtle] shadow-card p-5 overflow-hidden",
      "transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5",
      className
    )}>
      {/* top accent bar */}
      <div className={cn("absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl", colors.bar)} />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className="text-xs font-semibold uppercase tracking-wider text-slate-400"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {label}
          </p>
          <p
            className="mt-2 text-3xl font-bold text-ink leading-none"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {value}
          </p>
        </div>
        {Icon && (
          <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl", iconColor ?? colors.icon)}>
            <Icon size={20} />
          </div>
        )}
      </div>

      {change !== undefined && trend && (
        <div className={cn("mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", trendColor)}>
          <TrendIcon size={12} />
          <span style={{ fontFamily: "var(--font-outfit)" }}>{Math.abs(change)}% vs last month</span>
        </div>
      )}
    </div>
  );
}
