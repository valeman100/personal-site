"use client";

import { usePathname } from "next/navigation";
import { ScrollProgress } from "../mdx/ScrollProgress";

export function BlogExtras() {
    const pathname = usePathname();
    const isArticle = pathname.startsWith("/blog/") && pathname !== "/blog";

    if (!isArticle) return null;

    return (
        <>
            <ScrollProgress />
        </>
    );
}
