
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Parallax } from "@/components/motion/scroll";
import { Tilt } from "@/components/motion/tilt";
import Link from "next/link";
import { motion } from "framer-motion";

export type Project = {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    links?: { demo?: string; github?: string };
    blogLink?: string;
};

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
        >
            <Parallax>
                <Tilt>
                    <Card className="overflow-hidden group neon-shadow border neon-border bg-[--surface-muted] h-full flex flex-col">
                        <div className="bg-[--surface-muted] relative aspect-video overflow-hidden">
                            {project.image.toLowerCase().endsWith(".mp4") ? (
                                <video
                                    src={project.image}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="metadata"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            )}
                        </div>
                        <CardHeader>
                            <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-grow">
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-4 flex-grow">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tags.map((t) => (
                                    <Badge key={t} variant="secondary" className="text-xs">
                                        {t}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex gap-2 mt-auto pt-2 border-t border-[--border-color]">
                                {project.links?.demo && (
                                    <Button asChild className="flex-1">
                                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                                            Live demo
                                        </a>
                                    </Button>
                                )}
                                {project.links?.github && (
                                    <Button asChild variant="outline" className="flex-1">
                                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                                            GitHub
                                        </a>
                                    </Button>
                                )}
                                {project.blogLink && (
                                    <Button asChild variant="secondary" className="flex-1 border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-white">
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
    );
}
