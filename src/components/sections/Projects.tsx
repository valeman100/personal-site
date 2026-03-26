"use client";

import {useMemo, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {Button} from "@/components/ui/button";
import {Reveal} from "@/components/motion/scroll";
import {ProjectCard, type Project} from "./project-card";

const allProjects: Project[] = [
    {
        id: "insurance-automation",
        title: "Insurance Quote Engine",
        description: "Process automation for an insurance broker: given a client profile, the system generates and compares quotes from multiple providers — turning hours of manual work into seconds.",
        image: "/projects/insurance-automation.png",
        tags: ["AI", "Automation", "Playwrite", "Insurance"],
        links: {},
    },
    {
        id: "ikigai-force",
        title: "Ikigai Force",
        description: "Interactive app that walks you through the Japanese Ikigai framework — what you love, what you're good at, what the world needs, and what you can be paid for.",
        image: "/projects/ikigai-force.png",
        tags: ["AI", "React", "Frontend"],
        links: {},
    },
    {
        id: "p1",
        title: "Aesthetica AI",
        description: "Local AI solution for automating pre/post cosmetic surgery image management. Features automatic pose classification, intelligent matching, and adaptive image processing for consistent patient records.",
        image: "/projects/aesthetic-ai.jpeg",
        tags: ["AI", "Computer Vision", "Python"],
        links: {},
        blogLink: "/blog/aesthetica-ai"
    },
    {
        id: "p2",
        title: "Email Labeler",
        description: "AI-powered Gmail labeling SaaS that analyzes emails and applies your custom labels automatically. Connect Gmail, configure labels, and let AI organize your inbox on demand or on a daily schedule.",
        image: "/projects/email-labeler.png",
        tags: ["AI", "Flask", "Gmail API", "Stripe", "Backend", "Frontend"],
        links: {demo: "https://www.email-labeler.com/"}
    },
    {
        id: "p3",
        title: "SnapBook API",
        description: "Flask backend for AI-powered book recommendations from bookshelf images, using Google Vision, OpenAI, and Pinecone RAG; includes user auth and Stripe billing.",
        image: "/projects/snapbook.webp",
        tags: ["AI", "Flask", "RAG", "Stripe", "Google Cloud", "Backend"],
        links: {
            demo: "https://app-seven-steel-85.vercel.app/"
        }
    },
    {
        id: "p4",
        title: "Savr",
        description: "Gen Z fintech web app combining gamified learning, smart investing, and goal-based saving with a modern React/MUI UI.",
        image: "/projects/savr.webp",
        tags: ["React", "TypeScript", "Frontend", "Fintech"],
        links: {"github": "https://github.com/valeman100/savr"}
    },
    {
        "id": "p-insta-ai-automation",
        "title": "Instagram AI Automation",
        "description": "AI-powered Instagram automation that pulls tech news from email, scrapes articles, generates captions and images with AI, and auto-posts to Instagram with logging, Docker, and cron support.",
        "image": "/projects/insta-automation.jpeg",
        "tags": ["AI", "Python", "Instagram API", "Selenium", "Backend"],
        "links": {
            "demo": "https://www.instagram.com/valeemann/",
            "github": "https://github.com/valeman100/insta-AI-automation"
        }
    },
    {
        id: "p6",
        title: "Trading Bark",
        description: "Detects dog barks via audio template matching and triggers a random stock lookup with optional webhook alerts.",
        image: "/projects/trading-bark.jpeg",
        tags: ["Python", "Audio", "Flask", "YFinance", "Backend"],
        links: {
            demo: "https://www.youtube.com/watch?v=DpRPT5aoobE",
            github: "https://github.com/valeman100/trading-bark"
        },
    },
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
                            <ProjectCard key={project.id} project={project}/>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}


