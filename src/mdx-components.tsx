import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => (
      <article className="mx-auto max-w-3xl px-6 pb-24">
        {children}
      </article>
    ),
    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          "mt-2 mb-8 scroll-m-20 text-4xl font-bold tracking-tight text-neon-blue drop-shadow-neon lg:text-5xl",
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-neon-purple/90",
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-neon-green/90",
          className
        )}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p
        className={cn("leading-7 [&:not(:first-child)]:mt-6 text-[var(--prose-text)]", className)}
        {...props}
      />
    ),
    ul: ({ className, ...props }) => (
      <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props} />
    ),
    ol: ({ className, ...props }) => (
      <ol className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)} {...props} />
    ),
    li: ({ className, ...props }) => (
      <li className={cn("mt-2 text-[var(--prose-text)]", className)} {...props} />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "mt-6 border-l-4 pl-6 italic neon-border bg-zinc-100/10 py-2 text-[var(--prose-text)]",
          className
        )}
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn(
          "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-neon-blue",
          className
        )}
        {...props}
      />
    ),
    ...components,
  };
}
