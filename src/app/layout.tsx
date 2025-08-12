import type { Metadata } from "next";
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
  title: "Vale — AI Developer at Joinrs (Milan)",
  description:
    "AI/ML developer leading LLM fine‑tuning, embeddings, OCR, semantic search, data pipelines and payments at Joinrs.",
  openGraph: {
    title: "Vale — AI Developer at Joinrs (Milan)",
    description:
      "AI/ML developer leading LLM fine‑tuning, embeddings, OCR, semantic search, data pipelines and payments at Joinrs.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vale — AI Developer at Joinrs (Milan)",
    description:
      "AI/ML developer leading LLM fine‑tuning, embeddings, OCR, semantic search, data pipelines and payments at Joinrs.",
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
