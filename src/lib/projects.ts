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
    id: "ikigai-force",
    title: "Ikigai Force",
    description:
      "Interactive app that walks you through the Japanese Ikigai framework — what you love, what you're good at, what the world needs, and what you can be paid for.",
    image: "/projects/ikigai-force.png",
    tags: ["Self-discovery", "AI", "React"],
    accent: "var(--deep-sky-blue)",
    links: { demo: "https://ikigaiforce.com/" },
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
      "The automation engine behind the service: given a client profile, it generates and compares quotes across multiple providers and handles the repetitive back-office work — turning hours of manual effort into seconds.",
    image: "/projects/insurance-automation.png",
    tags: ["Automation", "AI", "Playwrite", "Insurance"],
    accent: "var(--tyrian-purple)",
    status: "client",
  },
  {
    id: "broker-automations",
    title: "Broker Automations",
    description:
      "The public service site I designed and built end-to-end to onboard PMI insurance brokers: bespoke automations for deadlines & renewals, data extraction from carrier PDFs, IVASS paperwork, and multi-insurer quoting.",
    image: "/projects/broker-automations.png",
    tags: ["Next.js", "Frontend", "Design", "Insurance"],
    accent: "var(--polynesian-blue)",
    links: { demo: "https://broker-automations.valeriomannucci.com/" },
    status: "live",
  },
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
];
