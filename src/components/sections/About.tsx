"use client";

import { Card } from "@/components/ui/card";
import { Reveal, Parallax } from "@/components/motion/scroll";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";

function AnimatedNumber({ value, suffix = "+", duration = 1.2 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
    });
    const unsubscribe = motionValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [isInView, motionValue, value, duration]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      {displayValue}
      {suffix && <span aria-hidden className="ml-0.5">{suffix}</span>}
    </span>
  );
}

function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl border neon-border bg-[--surface-muted] neon-shadow px-6 py-6 text-center">
      <div className="text-4xl sm:text-5xl font-bold" style={{ color: "var(--accent)" }}>
        <AnimatedNumber value={value} />
      </div>
      <div className="mt-2 text-base text-zinc-600 dark:text-zinc-400">{label}</div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
          <Parallax>
            <Card className="overflow-hidden h-64 sm:h-80 md:h-96 neon-shadow border neon-border bg-[--surface-muted]">
              <div className="relative w-full h-full">
                <Image
                  src="/me.jpg"
                  alt="My photo"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  priority
                />
              </div>
            </Card>
          </Parallax>
          <div className="space-y-6">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight">About me</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-zinc-600 dark:text-zinc-400">
              I&apos;m Valerio, an AI Developer and project lead passionate about building technology 
              that connects people and ideas in new ways. My journey in AI has led me to 
              specialize in creating powerful systems driven by powerful models. 
              I love the challenge of taking a 
              raw concept and transforming it into a robust, product—whether 
              that involves large language models or architecting end-to-end 
              data pipelines. My goal is to build intelligent solutions that feel intuitive and 
              and genuinely enhance the user experience.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard value={3} label="Years of Experience" />
                <StatCard value={20} label="Projects Completed" />
                <StatCard value={15} label="Countries Visited" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}


