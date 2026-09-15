import { LucideIcon } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 border border-indigo-100">
        <Icon size={28} className="text-indigo-400" />
      </div>
      <h3
        className="text-lg font-bold text-ink"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {title}
      </h3>
      {description && (
        <p
          className="mt-2 max-w-sm text-sm text-slate-500"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {description}
        </p>
      )}
      {action && (
        <Button className="mt-6" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
