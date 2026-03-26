export type Product = {
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  url?: string;
  status: "launched" | "coming-soon";
  image: string;
  tags: string[];
  launchDate?: string;
};

export const products: Product[] = [
  {
    slug: "email-labeler",
    name: "Email Labeler",
    brand: "Salsa",
    tagline: "AI-powered email organization that just works.",
    description:
      "A smart Gmail extension that automatically categorizes and labels your emails using AI. No more manual sorting — let the machine handle it while you focus on what matters.",
    url: "https://emaillabeler.com",
    status: "launched",
    image: "/products/email-labeler.png",
    tags: ["AI", "Productivity", "Chrome Extension"],
    launchDate: "2026-01",
  },
  {
    slug: "ikigai-force",
    name: "Ikigai Force",
    brand: "Salsa",
    tagline: "Discover your purpose through guided self-reflection.",
    description:
      "An interactive app that walks you through the Japanese Ikigai framework — what you love, what you're good at, what the world needs, and what you can be paid for — to help you find meaningful direction.",
    status: "coming-soon",
    image: "/products/ikigai-force.png",
    tags: ["Self-discovery", "AI", "Wellness"],
    launchDate: "2026-02",
  },
];
