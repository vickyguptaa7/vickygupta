import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  className?: string;
}

export function TechBadge({ name, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "border border-border border-dashed bg-surface px-2.5 py-0.5 font-mono text-[10px] text-text-secondary duration-200 transition-all hover:text-text-primary hover:border-accent/60 sm:text-[11px] ",
        className,
      )}
    >
      {name}
    </span>
  );
}
