import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal, Parallax } from "@/components/motion/scroll";
import { Tilt } from "@/components/motion/tilt";
import { getBlogPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog — Vale.dev",
  description: "Articles about AI, web, and developer experience.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Blog</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-prose">
            Notes and articles about building AI‑powered products.
          </p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <Parallax>
                <Tilt>
                  <Link href={`/blog/${post.slug}`} className="block">
                    <Card className="overflow-hidden group neon-shadow border neon-border bg-[--surface-muted] h-full transition-colors hover:bg-[--surface] hover:border-[--accent]">
                      <div className="h-44 bg-[--surface-muted] relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                        {post.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[--gradient-strip]" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[--surface-muted] to-transparent opacity-60" />
                      </div>
                      <CardHeader>
                        <CardTitle className="flex flex-col gap-1">
                          <span className="text-xl">{post.title}</span>
                          <span className="text-xs text-zinc-500 font-normal">
                            {new Date(post.date).toLocaleDateString("it-IT", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {post.tags.map((t) => (
                            <Badge key={t} variant="secondary">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </Tilt>
              </Parallax>
            </Reveal>
          ))}
          {posts.length === 0 && (
            <p className="text-zinc-500 italic col-span-2">
              Nessun articolo trovato. Torna presto!
            </p>
          )}
        </div>
      </div>
    </main>
  );
}


