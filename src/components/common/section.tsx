import { cn } from "@/lib/utils";

import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/components/common/panel";

interface SectionProps {
  id: string;
  title: string;
  count?: number;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function Section({
  id,
  title,
  count,
  children,
  className,
  contentClassName,
}: SectionProps) {
  return (
    <Panel id={id} className={className}>
      <PanelHeader className="flex items-baseline gap-1 py-2 sm:py-2.5">
        <PanelTitle>
          {title}
          {count !== undefined && <PanelTitleSup>({count})</PanelTitleSup>}
        </PanelTitle>
      </PanelHeader>
      <PanelContent className={cn(contentClassName)}>{children}</PanelContent>
    </Panel>
  );
}
