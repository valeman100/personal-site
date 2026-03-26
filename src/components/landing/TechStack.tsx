"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/scroll";

type Tech = {
  name: string;
  slug: string;
  color: string;
  darkColor?: string;
};

const stack: Tech[] = [
  { name: "Python", slug: "python", color: "#3776AB" },
  { name: "TypeScript", slug: "typescript", color: "#3178C6" },
  { name: "React", slug: "react", color: "#61DAFB", darkColor: "#61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "#000000", darkColor: "#ffffff" },
  { name: "Node.js", slug: "nodedotjs", color: "#5FA04E" },
  { name: "Flask", slug: "flask", color: "#000000", darkColor: "#ffffff" },
  { name: "Redis", slug: "redis", color: "#DC382D" },
  { name: "PostgreSQL", slug: "postgresql", color: "#4169E1" },
  { name: "Docker", slug: "docker", color: "#2496ED" },
  { name: "FastAPI", slug: "fastapi", color: "#009688" },
  { name: "Stripe", slug: "stripe", color: "#635BFF" },
  { name: "Tailwind", slug: "tailwindcss", color: "#06B6D4" },
];

function TechCard({ tech, index }: { tech: Tech; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
      whileHover={{
        y: -4,
        boxShadow: `0 0 24px ${tech.color}20`,
        borderColor: `${tech.color}40`,
      }}
      className="group relative flex flex-col items-center gap-3 rounded-xl border border-[var(--border-color)] bg-[--surface] p-5 transition-colors cursor-default"
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${tech.color}08, transparent 70%)`,
        }}
      />

      {/* Icon — light and dark variants */}
      <div className="relative h-8 w-8 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color.replace("#", "")}`}
          alt={tech.name}
          width={32}
          height={32}
          className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110 dark:hidden"
          loading="lazy"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://cdn.simpleicons.org/${tech.slug}/${(tech.darkColor ?? tech.color).replace("#", "")}`}
          alt={tech.name}
          width={32}
          height={32}
          className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110 hidden dark:block"
          loading="lazy"
        />
      </div>

      {/* Name */}
      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-[--foreground] transition-colors">
        {tech.name}
      </span>
    </motion.div>
  );
}

export function TechStack() {
  return (
    <section className="py-16 sm:py-24 relative">
      {/* Subtle gradient backdrop */}
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{ background: "var(--gradient-strip)" }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <Reveal>
            <p className="text-sm uppercase tracking-widest text-[--accent] mb-2 font-medium">
              Tech stack
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-[family-name:var(--font-display)]">
              Tools I work with
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
          {stack.map((tech, idx) => (
            <TechCard key={tech.name} tech={tech} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
