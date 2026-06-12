# Blog

**Posts are file-based MDX, one folder per post** — no static arrays, no `[slug]` dynamic route. `next.config.ts` enables `.mdx` as a `pageExtension`, so each MDX file *is* the route.

## Add a post

Create `src/app/blog/<slug>/page.mdx` with two parts:

1. A named `export const metadata = { title, description, date, tags, image?, openGraph? }` at the top (title + date required; this also sets the page's `<head>`).
2. The article body as MDX — Markdown plus imported JSX components (e.g. `<Badge>`, components from `src/components/mdx/`).

```tsx
// src/app/blog/my-post/page.mdx
export const metadata = {
  title: "My Title",
  description: "Preview shown in the blog list",
  date: "2025-02-01",
  tags: ["AI", "Next.js"],
  image: "/blog/my-cover.png",
  openGraph: { type: "article" },
};

import { Badge } from "@/components/ui/badge";

# My Title

Body content…
```

The post auto-appears in the list — no array to edit.

## How the list is built

`src/app/blog/page.tsx` calls `getBlogPosts()` in `src/lib/blog.ts`, which scans `src/app/blog/*/page.mdx` and **regex-parses the `metadata` export** (title, description→excerpt, date, tags, image).

Caveat: it does not actually evaluate the JS — fields must be simple `key: "value"` / `tags: [...]` string literals to be picked up. Keep metadata literal.

## Enable / disable

Controlled via `NEXT_PUBLIC_BLOG_ENABLED` env var.
- Default: `true` in dev, `false` in prod.
- Override with `.env.local` if needed.

## MDX setup

MDX components are mapped in `src/mdx-components.tsx`. Custom components (`<Callout>`, `<LoadingPlayground>`, `<DemoRAG>`, `<ScrollProgress>`) live in `src/components/mdx/`. The MDX loader is configured in `next.config.ts`.
