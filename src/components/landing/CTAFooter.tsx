"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/scroll";
import { Github, Linkedin, Twitter, Instagram, Music2 } from "lucide-react";

const socials = [
  { href: "https://github.com/valeman100", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/valerio-mannucci/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://x.com/Valeman100", icon: Twitter, label: "Twitter" },
  { href: "https://www.instagram.com/valeemann/", icon: Instagram, label: "Instagram" },
  { href: "https://www.tiktok.com/@valeemann", icon: Music2, label: "TikTok" },
];

export function CTAFooter() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Dot-grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--particle) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ready to build something great?
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl mx-auto">
            Whether you need AI-powered automation, custom software, or a
            technical partner — let&apos;s connect.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex items-center justify-center gap-4 mb-10">
            <Button asChild>
              <Link href="/resume#contact">Let&apos;s talk</Link>
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="flex justify-center gap-4">
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={item.label}
                className="h-10 w-10 rounded-full bg-[--surface] border border-[var(--border-color)] flex items-center justify-center hover:shadow-[0_0_24px_rgba(56,189,248,0.25)] hover:-translate-y-0.5 transition"
              >
                <item.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
