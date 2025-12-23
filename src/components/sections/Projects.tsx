"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Parallax, Reveal } from "@/components/motion/scroll";
import { Tilt } from "@/components/motion/tilt";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links?: { demo?: string; github?: string };
  blogLink?: string;
};

const allProjects: Project[] = [
  {
    id: "p1",
    title: "Aesthetica AI",
    description: "Local AI solution for automating pre/post cosmetic surgery image management. Features automatic pose classification, intelligent matching, and adaptive image processing for consistent patient records.",
    image: "/projects/aesthetic-ai.jpeg",
    tags: ["AI", "Computer Vision", "Python", "Automation"],
    links: {},
    blogLink: "/blog/aesthetica-ai"
  },
  {
    id: "p2",
    title: "Email Labeler",
    description: "AI-powered Gmail labeling SaaS that analyzes emails and applies your custom labels automatically. Connect Gmail, configure labels, and let AI organize your inbox on demand or on a daily schedule.",
    image: "/projects/trimmed-email-labeler.mp4",
    tags: ["AI", "Flask", "Gmail API", "Stripe", "Backend", "Frontend"],
    links: { demo: "https://www.email-labeler.com/" }
  },
  {
    id: "p3",
    title: "SnapBook API",
    description: "Flask backend for AI-powered book recommendations from bookshelf images, using Google Vision, OpenAI, and Pinecone RAG; includes user auth and Stripe billing.",
    image: "/projects/snapbook.mp4",
    tags: ["AI", "Flask", "RAG", "Stripe", "Google Cloud", "Backend"],
    links: {
      demo: "https://www.snapbook.world"
    }
  },
  {
    id: "p4",
    title: "Savr",
    description: "Gen Z fintech web app combining gamified learning, smart investing, and goal-based saving with a modern React/MUI UI.",
    image: "/projects/savr.mp4",
    tags: ["React", "TypeScript", "Frontend", "Fintech"],
    links: { "github": "https://github.com/valeman100/savr" }
  },
  {
    "id": "p-insta-ai-automation",
    "title": "Instagram AI Automation",
    "description": "AI-powered Instagram automation that pulls tech news from email, scrapes articles, generates captions and images with AI, and auto-posts to Instagram with logging, Docker, and cron support.",
    "image": "/projects/insta-automation.jpeg",
    "tags": ["AI", "Python", "Instagram API", "Selenium", "Backend"],
    "links": { "demo": "https://www.instagram.com/valeemann/", "github": "https://github.com/valeman100/insta-AI-automation" }
  },
  {
    id: "p6",
    title: "Trading Bark",
    description: "Detects dog barks via audio template matching and triggers a random stock lookup with optional webhook alerts.",
    image: "/projects/trading-bark.jpeg",
    tags: ["Python", "Audio", "Flask", "YFinance", "Backend"],
    links: { demo: "https://www.youtube.com/watch?v=DpRPT5aoobE", github: "https://github.com/valeman100/trading-bark" },
  }
];

const filters = ["All", "AI", "Frontend", "Backend"] as const;

export function Projects() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const filtered = useMemo(() => {
    if (active === "All") return allProjects;
    return allProjects.filter((p) => p.tags.includes(active));
  }, [active]);

  return (
    <section id="projects" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6 mb-6">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          </Reveal>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <Button
                key={f}
                variant={active === f ? "default" : "outline"}
                onClick={() => setActive(f)}
              >
                {f}
              </Button>
            ))}
          </div>
        </div>
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.25 }}
              >
                <Parallax>
                  <Tilt>
                    <Card className="overflow-hidden group neon-shadow border neon-border bg-[--surface-muted]">
                      <div className="bg-[--surface-muted]">
                        {project.image.toLowerCase().endsWith(".mp4") ? (
                          <video
                            src={project.image}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            className="w-full h-auto object-contain"
                          />
                        ) : (
                          <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={project.image}
                              alt={project.title}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-auto object-contain"
                            />
                          </>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          {project.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.tags.map((t) => (
                            <Badge key={t} variant="secondary">
                              {t}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-4 flex gap-2">
                          {project.links?.demo && (
                            <Button asChild>
                              <a href={project.links.demo} target="_blank">
                                Live demo
                              </a>
                            </Button>
                          )}
                          {project.links?.github && (
                            <Button asChild variant="outline">
                              <a href={project.links.github} target="_blank">
                                GitHub
                              </a>
                            </Button>
                          )}
                          {project.blogLink && (
                            <Button asChild variant="secondary" className="border-zinc-700 bg-zinc-800 hover:bg-zinc-700">
                              <Link href={project.blogLink}>
                                Read Blog
                              </Link>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Tilt>
                </Parallax>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}


