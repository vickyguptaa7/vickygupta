import { cn } from "@/lib/utils";

export function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-edge",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--edge)_0,var(--edge)_1px,transparent_0,transparent_50%)] before:bg-[length:10px_10px]",
        className,
      )}
    />
  );
}
