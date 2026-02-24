import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Navbar } from "@/components/common/navbar";

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

export const metadata: Metadata = {
  title: "Vicky Gupta | Software Engineer",
  description:
    "Personal portfolio of Vicky Gupta — Software Engineer creating with code. Skilled in Next.js, React, TypeScript, and modern web technologies.",
  keywords: [
    "Vicky Gupta",
    "Software Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Vicky Gupta" }],
  openGraph: {
    title: "Vicky Gupta | Software Engineer",
    description:
      "Personal portfolio of Vicky Gupta — Software Engineer creating with code.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-clip`}
      >
        <AppProviders>
          <Navbar />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
