"use client";

import { usePathname } from "next/navigation";
import { BlogFooter } from "@/components/sections/BlogFooter";

export function BlogFooterWrapper() {
    const pathname = usePathname();
    // Show footer only on article pages (path starts with /blog/ and is not /blog)
    const isArticle = pathname.startsWith("/blog/") && pathname !== "/blog";

    if (!isArticle) return null;

    return <BlogFooter />;
}
