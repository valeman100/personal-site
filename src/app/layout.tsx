import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import { Geist, Geist_Mono } from "next/font/google";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Valerio Mannucci — AI Developer at Joinrs (Rome)",
  description:
    "AI/ML developer leading LLM fine‑tuning, embeddings, OCR, semantic search, data pipelines and payments at Joinrs.",
  openGraph: {
    title: "Valerio Mannucci — AI Developer at Joinrs (Rome)",
    description:
      "AI/ML developer leading LLM fine‑tuning, embeddings, OCR, semantic search, data pipelines and payments at Joinrs.",
    type: "website",
    images: [
      {
        url: "/opengraph-image", // Next will append .png
        width: 1200,
        height: 630,
        alt: "Valerio Mannucci — AI Developer at Joinrs (Rome)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Valerio Mannucci — AI Developer at Joinrs (Rome)",
    description:
      "AI/ML developer leading LLM fine‑tuning, embeddings, OCR, semantic search, data pipelines and payments at Joinrs.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${display.variable} antialiased`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
