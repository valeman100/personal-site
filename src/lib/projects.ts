export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  accent: string;
  links?: { demo?: string; github?: string };
  blogLink?: string;
  status?: "live" | "coming-soon" | "client";
};

export const featuredProjects: Project[] = [
  {
    id: "aesthetica-ai",
    title: "Aesthetica AI",
    description:
      "Local AI solution for automating pre/post cosmetic surgery image management. Automatic pose classification, intelligent matching, and adaptive image processing for consistent patient records.",
    image: "/projects/aesthetic-ai.jpeg",
    tags: ["AI", "Computer Vision", "Python", "Automation"],
    accent: "var(--deep-sky-blue)",
    blogLink: "/blog/aesthetica-ai",
    status: "live",
  },
  {
    id: "email-labeler",
    title: "Email Labeler",
    description:
      "AI-powered Gmail labeling SaaS that analyzes incoming emails and applies custom labels automatically. Connect Gmail, configure your labels, and let AI organize your inbox.",
    image: "/projects/email-labeler.png",
    tags: ["AI", "SaaS", "Gmail API", "Stripe"],
    accent: "var(--celadon)",
    links: { demo: "https://www.email-labeler.com/" },
    status: "live",
  },
  {
    id: "insurance-automation",
    title: "Insurance Quote Engine",
    description:
      "Process automation for an insurance broker: given a client profile, the system generates and compares quotes from multiple providers — turning hours of manual work into seconds.",
    image: "/projects/insurance-automation.png",
    tags: ["Automation", "AI", "Playwrite", "Insurance"],
    accent: "var(--tyrian-purple)",
    status: "client",
  },
  {
    id: "ikigai-force",
    title: "Ikigai Force",
    description:
      "Interactive app that walks you through the Japanese Ikigai framework — what you love, what you're good at, what the world needs, and what you can be paid for.",
    image: "/projects/ikigai-force.png",
    tags: ["Self-discovery", "AI", "React"],
    accent: "var(--deep-sky-blue)",
    status: "coming-soon",
  },
];
