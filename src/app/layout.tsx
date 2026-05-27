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
    default: "Vicky Gupta - Software Engineer",
    template: "%s — Vicky Gupta",
  },
  description:
    "Portfolio of Vicky Gupta, a Software Engineer building scalable web applications and developer tools using Next.js, React, Node.js, and TypeScript.",
  keywords: [
    "vickyguptaa7",
    "Vicky Gupta",
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "JavaScript",
    "Java",
    "AWS",
    "Azure",
    "GCP",
  ],
  authors: [
    { name: "Vicky Gupta Portfolio", url: siteUrl },
    { name: "Vicky Gupta Github", url: "https://github.com/vickyguptaa7" },
    {
      name: "Vicky Gupta LinkedIn",
      url: "https://linkedin.com/in/vickyguptaa7",
    },
  ],
  creator: "Vicky Gupta",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Vicky Gupta - Software Engineer",
    description:
      "Portfolio of Vicky Gupta, a Software Engineer building scalable web applications and developer tools using Next.js, React, Node.js, and TypeScript.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Vicky Gupta",
    images: [
      {
        url: "/images/author.jpeg", // Create a 1200x630 image with your name and title
        width: 1600,
        height: 1600,
        alt: "Vicky Gupta - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vicky Gupta - Software Engineer",
    description:
      "Personal portfolio of Vicky Gupta — Full Stack Software Engineer skilled in Next.js, React, TypeScript, Java, and Cloud Technologies.",
    creator: "@vickyguptaa7",
    images: ["/images/author.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vicky Gupta",
  url: siteUrl,
  jobTitle: "Software Engineer",
  description:
    "Full Stack Software Engineer skilled in Next.js, React, TypeScript, Java, and Cloud Technologies.",
  worksFor: {
    "@type": "Organization",
    name: "AlgoSec",
  },
  alumniOf: [
    {
      "@type": "Organization",
      name: "AlgoZenith",
      description:
        "Ed-tech platform that provides intensive training in data structures, algorithms, and competitive programming to help developers prepare for top software engineering interviews.",
    },
    {
      "@type": "EducationalOrganization",
      name: "Jamia Millia Islamia",
      description: "Prestigious university in Delhi, India.",
    },
  ],
  knowsAbout: [
    "Software Engineering",
    "Frontend Development",
    "Full Stack Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Java",
    "AWS",
    "Azure",
    "GCP",
  ],
  makesOffer: [
    {
      "@type": "SoftwareApplication",
      name: "Code-Verse",
      applicationCategory: "DeveloperApplication",
      description:
        "Feature-rich online code editor supporting multiple programming languages with integrated terminal functionality.",
    },
  ],
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
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
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
