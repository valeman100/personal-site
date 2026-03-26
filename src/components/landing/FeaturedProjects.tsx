"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/scroll";
import { Tilt } from "@/components/motion/tilt";
import { ArrowRight, ArrowUpRight, ExternalLink, BookOpen } from "lucide-react";
import { featuredProjects, type Project } from "@/lib/projects";

function StatusDot({ status }: { status?: Project["status"] }) {
  if (!status) return null;
  const config = {
    live: { color: "bg-emerald-400", shadow: "shadow-emerald-400/50", label: "Live" },
    "coming-soon": { color: "bg-amber-400", shadow: "shadow-amber-400/50", label: "Soon" },
    client: { color: "bg-violet-400", shadow: "shadow-violet-400/50", label: "Client" },
  }[status];

  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
      <span
        className={`h-2 w-2 rounded-full ${config.color} shadow-[0_0_6px] ${config.shadow}`}
      />
      {config.label}
    </span>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <Reveal delay={index * 0.08}>
      <Tilt maxTiltDeg={3} scale={1.01}>
        <motion.div
          className="group relative grid md:grid-cols-2 gap-0 rounded-2xl border border-[var(--border-color)] bg-[--surface] overflow-hidden"
          whileHover={{ boxShadow: `0 0 40px color-mix(in oklab, ${project.accent} 20%, transparent)` }}
          transition={{ duration: 0.3 }}
        >
          {/* Image side */}
          <div
            className={`relative md:aspect-auto overflow-hidden flex items-center justify-center p-6 sm:p-8 ${
              isEven ? "" : "md:order-2"
            }`}
            style={{
              background: `linear-gradient(135deg, color-mix(in oklab, ${project.accent} 12%, var(--background)), color-mix(in oklab, ${project.accent} 4%, var(--background)))`,
            }}
          >
            {/* Floating number */}
            <span
              className="absolute top-4 left-4 z-20 text-[10rem] font-black leading-none opacity-[0.07] select-none pointer-events-none font-[family-name:var(--font-display)]"
              style={{ color: project.accent }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Browser mockup */}
            <div className="relative w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 overflow-hidden shadow-lg transition-transform duration-700 group-hover:scale-[1.02]">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-200 dark:border-zinc-700">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-2">
                  <div className="h-5 rounded-md bg-zinc-200 dark:bg-zinc-700 max-w-[60%] mx-auto" />
                </div>
              </div>
              {/* Screenshot */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>

          {/* Content side */}
          <div
            className={`relative flex flex-col justify-between p-6 sm:p-8 ${
              isEven ? "" : "md:order-1"
            }`}
          >
            {/* Top: status + title */}
            <div>
              <div className="mb-4">
                <StatusDot status={project.status} />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 font-[family-name:var(--font-display)]">
                {project.title}
              </h3>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Bottom: tags + links */}
            <div className="mt-6 flex flex-col gap-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider rounded-full border border-[var(--border-color)] text-zinc-500 dark:text-zinc-400 bg-[--surface-muted]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3">
                {project.links?.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[--accent] hover:underline underline-offset-4 transition-colors"
                  >
                    Live demo <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-[--accent] transition-colors"
                  >
                    Source <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.blogLink && (
                  <Link
                    href={project.blogLink}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-[--accent] transition-colors"
                  >
                    Case study <BookOpen className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>

            {/* Corner accent line */}
            <div
              className="absolute top-0 right-0 h-24 w-[2px] opacity-40 transition-opacity group-hover:opacity-80"
              style={{ background: `linear-gradient(to bottom, ${project.accent}, transparent)` }}
            />
          </div>
        </motion.div>
      </Tilt>
    </Reveal>
  );
}

export function FeaturedProjects() {
  return (
    <section id="projects" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <Reveal>
            <div>
              <p className="text-sm uppercase tracking-widest text-[--accent] mb-2 font-medium">
                Selected work
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-[family-name:var(--font-display)]">
                Projects
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/resume"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-[--accent] transition-colors"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="flex flex-col gap-8">
          {featuredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 text-center sm:hidden">
            <Link
              href="/resume"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[--accent] hover:underline underline-offset-4"
            >
              View all projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
