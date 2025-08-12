"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const NeonScene = dynamic(() => import("@/components/hero/NeonScene").then(m => m.NeonScene), {
  ssr: false,
});

export function Hero() {
  return (
    <section id="home" className="relative isolate pt-28 sm:pt-32">
      <BackgroundGradient />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-widest text-zinc-500">
              AI Developer — Joinrs, Rome
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span className="block">Hi, I’m Valerio.</span>
            <span className="block">I love building AI‑driven products.</span>
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-prose">
              I craft delightful user experiences powered by modern LLMs, with a
              focus on performance, accessibility, and clean architecture.
            </p>
            <div className="flex items-center gap-3">
            <Button variant="secondary" asChild className="border neon-border">
              <a href="#projects">View my works</a>
              </Button>
              <Button variant="secondary" asChild className="border neon-border">
                <a href="#contact">Contact me</a>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
            className="h-64 sm:h-80 md:h-96 rounded-2xl border neon-border bg-[--gradient-hero] relative overflow-hidden"
          >
            <NeonScene />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BackgroundGradient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.25),rgba(236,72,153,0.10)_40%,transparent_70%)]"
    />
  );
}

import React from "react";



