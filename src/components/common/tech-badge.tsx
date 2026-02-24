import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  className?: string;
}

export function TechBadge({ name, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-[11px] text-text-secondary",
        className,
      )}
    >
      {name}
    </span>
  );
}
