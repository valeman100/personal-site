import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/scroll";

type Post = {
  title: string;
  body: string;
  date: string;
  tags: string[];
};

const content: Record<string, Post> = {
  "rag-on-nextjs": {
    title: "Getting Started with RAG on Next.js",
    date: "2025-02-01",
    tags: ["AI", "RAG", "Next.js"],
    body:
      "RAG combines retrieval and generation to ground LLMs with fresh, domain-specific knowledge. In this post, we wire a basic flow with embeddings, a vector DB, and streaming UI in Next.js.",
  },
  "loading-states-design": {
    title: "Designing delightful loading states",
    date: "2025-01-18",
    tags: ["UX", "Motion", "Design"],
    body:
      "Perceived performance matters. Skeletons, optimistic updates, motion and micro-interactions make the wait feel shorter and the product more responsive.",
  },
};

export async function generateStaticParams() {
  return Object.keys(content).map((slug) => ({ slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = content[slug];
  if (!post) return notFound();
  return (
    <main className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight mb-3">{post.title}</h1>
        </Reveal>
        <p className="text-xs text-zinc-500 mb-8">
          {new Date(post.date).toLocaleDateString()} — {post.tags.join(" · ")}
        </p>
        <article className="prose prose-zinc dark:prose-invert">
          <p>{post.body}</p>
        </article>
      </div>
    </main>
  );
}


