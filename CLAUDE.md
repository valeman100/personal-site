# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Create production build
npm run build

# Start production server (after build)
npm run start

# Run linter (ESLint)
npm run lint
```

## Architecture Overview

This is a Next.js 15 (App Router) portfolio website with sections, blog, and 3D hero scene.

### Key Structure

```
src/
  ├── app/                 # App Router pages and API routes
  │   ├── page.tsx        # Home composing all sections (Hero, About, Skills, Projects, Experience, Contact)
  │   ├── blog/           # Blog list and individual post routes
  │   ├── api/contact/    # Contact form endpoint (uses Resend)
  │   ├── layout.tsx      # Root layout with fonts (Geist, Bricolage Grotesque) and metadata
  │   ├── providers.tsx   # Theme provider, MDX provider, toast setup
  │   └── globals.css     # Design tokens, theme switches (light/dark), gradients, neon utilities
  ├── components/
  │   ├── sections/       # Page sections (Hero, About, etc.) and project-card component
  │   ├── ui/             # Reusable UI (navbar, button, input, theme-toggle, etc.)
  │   ├── layout/         # Layout wrappers (Footer, BlogFooterWrapper)
  │   └── mdx/            # MDX-specific components (Callout, LoadingPlayground, DemoRAG, etc.)
  ├── lib/                # Utilities
  │   ├── site.ts         # Configuration (siteUrl, etc.)
  │   ├── blog.ts         # Blog utilities
  │   └── utils.ts        # Shared utilities (cn, etc.)
  └── mdx-components.tsx  # MDX component mapping (for MDX elements like <a>, <img>, etc.)
```

### Section Composition Pattern

`src/app/page.tsx` is the single entry point composing all sections. Each section is an independent component in `src/components/sections/`. This makes reordering or adding sections straightforward—just modify `page.tsx`.

### Design System

**Colors & Tokens** (in `src/app/globals.css`):
- Palette: smoky-black, polynesian-blue, deep-sky-blue, tyrian-purple, celadon
- Theme tokens: `--background`, `--foreground`, `--accent`, `--accent-2`, `--accent-3`, `--surface`, `--border-color`
- Gradients: `--gradient-hero`, `--gradient-card`, `--gradient-strip` (used throughout sections)
- Neon utilities: `.neon-shadow`, `.neon-border`, `.text-neon-blue`, `.text-neon-purple`, `.text-neon-green`

**Dark Mode**: Defined in `.dark` class; next-themes handles toggling (theme toggle in navbar).

**Typography**:
- Sans: Geist (body, UI)
- Mono: Geist Mono (code blocks)
- Display: Bricolage Grotesque (headings)

### Animations & Motion

Framer Motion is used for scroll reveals and micro-interactions. Components typically import `motion` from `framer-motion` and use `motion.div`, `motion.section`, etc. with `variants` for scroll-trigger effects.

### 3D Hero Scene

`src/components/hero/NeonScene.tsx` uses Three.js + React Three Fiber + drei. It renders a neon-style 3D scene (e.g., rotating meshes, glow effects). Check that file for specific Three.js setup patterns.

## Blog Architecture

**Posts are static**—add new posts by editing arrays in two files:

1. **Post metadata** → `src/app/blog/page.tsx`: Edit the `posts` array.
2. **Post content** → `src/app/blog/[slug]/page.tsx`: Edit the `content` object with title, date, tags, body (plain text or JSX).

Example:
```tsx
// In blog/page.tsx
{ slug: "my-post", title: "My Title", excerpt: "Preview", date: "2025-02-01", tags: ["AI"] }

// In blog/[slug]/page.tsx
"my-post": {
  title: "My Title",
  date: "2025-02-01",
  tags: ["AI"],
  body: "Post content here..."
}
```

**Blog Enable/Disable**: Controlled via `NEXT_PUBLIC_BLOG_ENABLED` env var.
- Default: `true` in dev, `false` in prod.
- Override with `.env.local` if needed.

**Future scaling**: Consider Contentlayer + `.mdx` files when blog grows beyond static arrays.

## Form & Validation

- **Form library**: react-hook-form + zod (schema validation)
- **Contact form**: `src/components/sections/Contact.tsx` → posts to `/api/contact` (uses Resend for emails)
- **Notifications**: sonner (toast library)

## MDX Setup

MDX components are mapped in `src/mdx-components.tsx`. Custom components (e.g., `<Callout>`, `<LoadingPlayground>`) live in `src/components/mdx/`. The MDX loader is configured in `next.config.ts`.

## Key Dependencies

- **Motion**: framer-motion, next-themes
- **3D**: three, @react-three/fiber, @react-three/drei
- **Forms**: react-hook-form, zod, @hookform/resolvers
- **UI/UX**: sonner (toasts), lucide-react (icons), class-variance-authority (variant styles)
- **Blog/Content**: @mdx-js/react, @next/mdx, rehype-pretty-code, remark-gfm
- **Email**: resend (contact form endpoint)

## Common Tasks

### Add a new page section
1. Create `src/components/sections/NewSection.tsx`
2. Import and add `<NewSection />` to `src/app/page.tsx`

### Customize colors/theme
Edit `src/app/globals.css`:
- Change CSS custom properties (e.g., `--accent`, `--background`)
- Update `.dark` class for dark mode overrides
- Modify gradients and neon utilities as needed

### Update metadata/SEO
Edit `export const metadata` in `src/app/layout.tsx` (title, description, openGraph, twitter card).

### Add a new UI component
1. Create in `src/components/ui/ComponentName.tsx`
2. Use Tailwind + CVA for variants
3. Import and use in sections or pages

## Environment Variables

Optional: `.env.local` file for local overrides.
- `NEXT_PUBLIC_BLOG_ENABLED`: Enable/disable blog routes
- No other env vars required for basic development

## Deployment

Target: **Vercel**. Next.js auto-detection works out of the box. Build command: `next build`. No special environment setup needed unless you add services like Resend (contact form already configured).
