"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm uppercase tracking-widest text-zinc-500 mb-6"
        >
          AI & Software Engineer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight font-[family-name:var(--font-display)]"
        >
          I build{" "}
          <span className="text-gradient-neon">AI solutions</span>
          <br />
          that deliver results.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
        >
          Freelance AI & software engineer helping businesses automate
          processes and build intelligent products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Button asChild>
            <Link href="/resume#contact">Work with me</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="#projects">See my work</Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="h-6 w-6 text-zinc-400 animate-bounce" />
      </motion.div>
    </section>
  );
}
