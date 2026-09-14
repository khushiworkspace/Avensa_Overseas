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
        "rounded-2xl bg-white border border-[rgba(14,20,72,0.08)] shadow-card",
        hover && [
          "transition-all duration-300 cursor-pointer",
          "hover:shadow-card-hover hover:-translate-y-1",
          "hover:border-teal-200",
        ],
        glow && "hover:shadow-card-glow hover:border-teal-300",
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
    <div
      className={cn(
        "px-6 py-4 border-b border-[rgba(14,20,72,0.07)]",
        className
      )}
    >
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
    <div
      className={cn(
        "px-6 py-4 border-t border-[rgba(14,20,72,0.07)] bg-sand-50 rounded-b-2xl",
        className
      )}
    >
      {children}
    </div>
  );
}
