import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover, glow, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-3xl bg-white border border-[--border-subtle] shadow-card",
        hover && [
          "transition-all duration-500 ease-spring cursor-pointer",
          "hover:shadow-card-hover hover:-translate-y-1.5",
          "hover:border-indigo-300/50",
        ],
        glow && "hover:shadow-card-glow hover:border-indigo-300",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-6 py-4 border-b border-[--border-subtle]", className)}>
      {children}
    </div>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("px-6 py-5", className)}>{children}</div>;
}

export function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-6 py-4 border-t border-[--border-subtle] bg-ice-50 rounded-b-3xl", className)}>
      {children}
    </div>
  );
}
