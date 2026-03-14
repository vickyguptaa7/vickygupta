import { cn } from "@/lib/utils";

interface PanelProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function Panel({ className, children, ...props }: PanelProps) {
  return (
    <section
      className={cn(
        "screen-line-before screen-line-after border-x border-edge border-dashed",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

interface PanelHeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function PanelHeader({
  className,
  children,
  ...props
}: PanelHeaderProps) {
  return (
    <header className={cn("screen-line-after px-4", className)} {...props}>
      {children}
    </header>
  );
}

interface PanelTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function PanelTitle({ className, children, ...props }: PanelTitleProps) {
  return (
    <h2
      className={cn("text-2xl font-semibold tracking-tight", className)}
      {...props}
    >
      {children}
    </h2>
  );
}

interface PanelTitleSupProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function PanelTitleSup({
  className,
  children,
  ...props
}: PanelTitleSupProps) {
  return (
    <sup
      className={cn(
        "-top-[0.75em] ml-1 text-sm font-medium text-text-muted tabular-nums select-none",
        className,
      )}
      {...props}
    >
      {children}
    </sup>
  );
}

interface PanelContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PanelContent({
  className,
  children,
  ...props
}: PanelContentProps) {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
}
