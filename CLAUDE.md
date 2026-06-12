# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Next.js 15 (App Router) portfolio site: marketing home, `/resume` page, file-based MDX blog, Three.js neon hero. Deployed on Vercel.

## Required tooling

- **Serena MCP** — ALWAYS use Serena tools for code navigation and editing (find_symbol, replace_symbol_body, etc.) instead of built-in Glob/Grep/Read/Edit. Fall back to built-ins only when Serena is unavailable.
- **Caveman MCP** — ALWAYS keep caveman mode active for chat responses (compressed output). Code, commits, and PRs stay normal prose.

## Always keep docs & memory current

When you change the architecture, add a feature, or learn a non-obvious project fact:
1. **Update the docs** in `docs/*.md` (and add a new `docs/<topic>.md` for a new area). Keep this CLAUDE.md short — it is an index, detail lives in `docs/`.
2. **Update memory** at `~/.claude/projects/-Users-vale-Developer-personal-site/memory/` (write the fact + a pointer line in `MEMORY.md`).

Documentation and memory drifting out of sync with the code is a bug — fix it as part of the change.

## Commands

```bash
npm run dev     # dev server (Turbopack)
npm run build   # production build
npm run start   # serve production build
npm run lint    # ESLint
```

## Documentation

Detailed docs live in `docs/`:

- [docs/architecture.md](docs/architecture.md) — structure, page composition (home `landing/` vs resume `sections/`), motion primitives, 3D scene, data layer.
- [docs/blog.md](docs/blog.md) — file-based MDX blog: one `blog/<slug>/page.mdx` per post, list built by `getBlogPosts()`.
- [docs/styling.md](docs/styling.md) — design tokens, dark mode, typography, UI components.
- [docs/development.md](docs/development.md) — forms, env vars, dependencies, common tasks, deployment.
