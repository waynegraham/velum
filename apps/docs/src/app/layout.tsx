import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

import { Navbar } from "@/components/navigation/Navbar";

import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const sansFont = IBM_Plex_Sans({
  variable: "--font-sans-family",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Velum Docs",
  description:
    "Editorial documentation for IIIF-driven React components and storytelling primitives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
