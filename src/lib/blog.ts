import fs from "fs";
import path from "path";

type PostHelpers = {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    tags: string[];
    image?: string | undefined;
};

export async function getBlogPosts(): Promise<PostHelpers[]> {
    const blogDir = path.join(process.cwd(), "src/app/blog");

    if (!fs.existsSync(blogDir)) {
        return [];
    }

    const items = fs.readdirSync(blogDir, { withFileTypes: true });

    const posts = items
        .filter((item) => item.isDirectory())
        .map((item) => {
            const slug = item.name;
            const pagePath = path.join(blogDir, slug, "page.mdx");

            if (!fs.existsSync(pagePath)) {
                return null;
            }

            const content = fs.readFileSync(pagePath, "utf-8");

            // Simple regex to extract metadata object
            // Looks for: export const metadata = { ... };
            const match = content.match(/export const metadata = ({[\s\S]*?});/);

            if (!match) {
                return null;
            }

            try {
                // Evaluate the object strictly
                // We use Function to parse the JS object string essentially
                // This is safe-ish because it's our own content, but regex parsing is better
                // Let's use a specialized parser or regex extraction for fields to be safer/simpler

                const metaStr = match[1];

                const titleMatch = metaStr.match(/title:\s*["']([^"']+)["']/);
                const descMatch = metaStr.match(/description:\s*["']([^"']+)["']/);
                const dateMatch = metaStr.match(/date:\s*["']([^"']+)["']/);
                const imageMatch = metaStr.match(/image:\s*["']([^"']+)["']/);

                // Tags extraction is trickier with regex as it's an array for strings
                // tags: ["AI", "RAG", "Next.js"]
                const tagsMatch = metaStr.match(/tags:\s*\[([\s\S]*?)\]/);
                let tags: string[] = [];
                if (tagsMatch) {
                    tags = tagsMatch[1]
                        .split(",")
                        .map(t => t.trim().replace(/['"]/g, ""))
                        .filter(Boolean);
                }

                if (!titleMatch || !dateMatch) return null;

                return {
                    slug,
                    title: titleMatch[1],
                    excerpt: descMatch ? descMatch[1] : "",
                    date: dateMatch[1],
                    tags,
                    ...(imageMatch ? { image: imageMatch[1] } : {})
                };

            } catch (e) {
                console.error(`Failed to parse metadata for ${slug}`, e);
                return null;
            }
        })
        .filter((post): post is PostHelpers => post !== null)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
}
