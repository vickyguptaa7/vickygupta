"use client";

import { usePathname } from "next/navigation";

import { CursorPet } from "@/components/common/cursor-pet";
import { Navbar } from "@/components/common/navbar";
import { PageContent } from "@/components/common/page-transition";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBlogRoute = pathname.startsWith("/blog");

  return (
    <>
      {!isBlogRoute && <Navbar />}
      {/* {!isBlogRoute && <CursorPet />} */}
      <PageContent>{children}</PageContent>
    </>
  );
}
