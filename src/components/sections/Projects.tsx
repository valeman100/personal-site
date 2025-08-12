"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Parallax, Reveal } from "@/components/motion/scroll";
import { Tilt } from "@/components/motion/tilt";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links?: { demo?: string; github?: string };
};

const allProjects: Project[] = [
  {
    id: "p1",
    title: "AI Content Studio",
    description:
      "Generate, review and publish content with AI assistance and human-in-the-loop.",
    image: "/proj1.jpg",
    tags: ["AI", "Next.js", "RAG"],
    links: { demo: "#", github: "#" },
  },
  {
    id: "p2",
    title: "Realtime Chatbot",
    description: "Streaming responses, tool calls, multimodal inputs.",
    image: "/proj2.jpg",
    tags: ["AI", "WebSocket", "OpenAI"],
    links: { demo: "#", github: "#" },
  },
  {
    id: "p3",
    title: "Analytics Dashboard",
    description: "Beautiful charts and insights with server components.",
    image: "/proj3.jpg",
    tags: ["Web Apps", "Next.js"],
    links: { demo: "#", github: "#" },
  },
  {
    id: "p4",
    title: "Open Source UI Kit",
    description: "Accessible, headless components for React.",
    image: "/proj4.jpg",
    tags: ["Open Source", "React"],
    links: { demo: "#", github: "#" },
  },
];

const filters = ["All", "AI", "Web Apps", "Open Source"] as const;

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
                    <div className="relative h-44 bg-[--gradient-strip]" />
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


