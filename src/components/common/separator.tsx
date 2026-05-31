import { cn } from "@/lib/utils";

export function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full",
        "before:absolute before:left-1/2 before:-translate-x-1/2 before:-z-1 before:h-8 before:w-[100vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--edge)_0,var(--edge)_1px,transparent_0,transparent_50%)] before:bg-[length:10px_10px]",
        "before:[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    />
  );
}
