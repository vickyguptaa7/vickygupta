import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  className?: string;
}

export function TechBadge({ name, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "border border-border border-dashed bg-surface px-2.5 py-0.5 font-mono text-[11px] text-text-secondary hover:scale-[1.04] duration-200 transition-all hover:text-black hover:border-accent/30 ",
        className,
      )}
    >
      {name}
    </span>
  );
}
