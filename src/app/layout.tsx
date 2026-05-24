import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteShell } from "@/components/common/site-shell";
import { AppProviders } from "@/providers/app-providers";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vickygupta.dev";

export const metadata: Metadata = {
  title: {
    default: "Vicky Gupta | Software Engineer",
    template: "%s — Vicky Gupta",
  },
  description:
    "Personal portfolio of Vicky Gupta — Software Engineer creating with code. Skilled in Next.js, React, TypeScript, and modern web technologies.",
  keywords: [
    "Vicky Gupta",
    "Software Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Full Stack",
    "Web Developer",
  ],
  authors: [{ name: "Vicky Gupta" }],
  creator: "Vicky Gupta",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Vicky Gupta | Software Engineer",
    description:
      "Personal portfolio of Vicky Gupta — Software Engineer creating with code.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Vicky Gupta",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vicky Gupta | Software Engineer",
    description:
      "Personal portfolio of Vicky Gupta — Software Engineer creating with code.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vicky Gupta",
  url: siteUrl,
  jobTitle: "Software Engineer",
  sameAs: [
    "https://github.com/vickyguptaa7",
    "https://linkedin.com/in/vickyguptaa7",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-clip`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <AppProviders>
          <SiteShell>{children}</SiteShell>
        </AppProviders>
      </body>
    </html>
  );
}
