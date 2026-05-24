import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_~]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/["']/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function createHeadingIdFactory() {
  const seen = new Map<string, number>();

  return (raw: string) => {
    const base = slugify(raw) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);

    if (count === 0) {
      return base;
    }

    return `${base}-${count + 1}`;
  };
}

export function extractMarkdownHeadings(
  content: string,
  minLevel = 2,
  maxLevel = 3,
): TocHeading[] {
  const lines = content.split("\n");
  const getHeadingId = createHeadingIdFactory();
  const headings: TocHeading[] = [];
  let inFence = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      continue;
    }

    if (inFence) {
      continue;
    }

    const match = /^(#{1,6})\s+(.+)$/.exec(line);
    if (!match) {
      continue;
    }

    const level = match[1].length;
    if (level < minLevel || level > maxLevel) {
      continue;
    }

    const text = stripInlineMarkdown(match[2]);
    if (!text) {
      continue;
    }

    headings.push({
      id: getHeadingId(text),
      text,
      level,
    });
  }

  return headings;
}

function getNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join(" ");
  }

  if (node && typeof node === "object" && "props" in node) {
    return getNodeText(
      (node as { props?: { children?: ReactNode } }).props?.children,
    );
  }

  return "";
}

export function getArticleHeadingComponents() {
  const getHeadingId = createHeadingIdFactory();

  const createHeading = (Tag: "h1" | "h2" | "h3" | "h4") => {
    const HeadingComponent = ({
      children,
      className,
      ...props
    }: ComponentProps<typeof Tag>) => {
      const id = getHeadingId(stripInlineMarkdown(getNodeText(children)));

      return (
        <Tag id={id} className={cn("scroll-mt-28", className)} {...props}>
          {children}
        </Tag>
      );
    };

    HeadingComponent.displayName = `ArticleHeading(${Tag.toUpperCase()})`;
    return HeadingComponent;
  };

  const LinkComponent = ({ href, children, ...props }: ComponentProps<"a">) => {
    const isExternal = Boolean(href?.startsWith("http"));

    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  };

  return {
    h1: createHeading("h1"),
    h2: createHeading("h2"),
    h3: createHeading("h3"),
    h4: createHeading("h4"),
    a: LinkComponent,
  };
}
