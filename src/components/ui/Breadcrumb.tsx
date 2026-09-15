import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-1 text-sm", className)}
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <Link href="/" className="flex items-center opacity-60 hover:opacity-100 transition-opacity">
        <Home size={14} />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={13} className="opacity-40" />
          {item.href && i < items.length - 1 ? (
            <Link href={item.href} className="opacity-60 hover:opacity-100 transition-opacity font-medium">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
