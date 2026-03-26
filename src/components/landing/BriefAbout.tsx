"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal, Parallax } from "@/components/motion/scroll";
import { ArrowRight } from "lucide-react";

export function BriefAbout() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid md:grid-cols-[3fr_2fr] gap-12 items-center">
          <div>
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                A bit about me
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                I&apos;m Valerio — a freelance AI & Software Engineer building a
                remote-first practice. After three years leading AI projects at a
                Milan startup, I left to build my own path: working with businesses
                that want to leverage AI to automate processes and ship intelligent
                products.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                I specialize in turning complex workflows into streamlined, AI-powered
                solutions — from insurance process automation to SaaS products and
                computer-vision pipelines.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <Link
                href="/resume"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[--accent] hover:underline underline-offset-4"
              >
                See my full resume <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <Parallax>
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border neon-border neon-shadow">
                <Image
                  src="/me.jpeg"
                  alt="Valerio Mannucci"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
            </Reveal>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
