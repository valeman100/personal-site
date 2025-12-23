import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { getBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();

  const blogRoutes = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const routes: Array<{
    url: string;
    lastModified?: string;
    changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
    priority: number;
  }> = [
      { url: `${siteUrl}/`, changeFrequency: "daily", priority: 1 },
      { url: `${siteUrl}/blog`, changeFrequency: "daily", priority: 0.8 },
      ...blogRoutes,
    ];

  return routes.map((r) => ({
    url: r.url,
    lastModified: r.lastModified ?? new Date().toISOString(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}


