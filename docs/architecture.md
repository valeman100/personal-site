# Architecture

Next.js 15 (App Router) portfolio site: marketing home, `/resume` page, file-based MDX blog, and a Three.js neon hero scene.

## Key Structure

```
src/
  ├── app/                 # App Router pages and API routes
  │   ├── page.tsx        # Home — composes landing/ components (LandingHero, SocialProof, FeaturedProjects, ...)
  │   ├── resume/         # /resume — composes the classic sections/ (Hero, About, Skills, Projects, Experience, Contact)
  │   ├── blog/           # Blog list (page.tsx) + one folder per post (<slug>/page.mdx)
  │   ├── api/contact/    # Contact form endpoint (uses Resend)
  │   ├── robots.ts       # robots.txt route
  │   ├── sitemap.ts      # sitemap.xml route
  │   ├── opengraph-image.png  # default OG image (file-convention)
  │   ├── layout.tsx      # Root layout with fonts (Geist, Bricolage Grotesque) and metadata
  │   ├── providers.tsx   # Theme provider, MDX provider, toast setup
  │   └── globals.css     # Design tokens, theme switches (light/dark), gradients, neon utilities
  ├── components/
  │   ├── landing/        # Home-page sections (LandingHero, FeaturedProjects, TechStack, ParticleField, CursorFollower, ...)
  │   ├── sections/       # Resume-page sections (Hero, About, Skills, Projects, Experience, Contact, BlogFooter)
  │   ├── motion/         # Reusable animation primitives — scroll.tsx (Reveal, Parallax), tilt.tsx (Tilt)
  │   ├── hero/           # NeonScene.tsx (Three.js neon scene)
  │   ├── seo/            # ArticleJsonLd.tsx (structured data)
  │   ├── ui/             # Reusable UI (navbar, button, input, card, badge, theme-toggle, etc.)
  │   ├── layout/         # Layout wrappers (Footer, BlogFooterWrapper)
  │   └── mdx/            # MDX-specific components (Callout, LoadingPlayground, DemoRAG, ScrollProgress)
  ├── lib/                # Data + utilities
  │   ├── projects.ts     # featuredProjects[] (typed Project data) consumed by landing
  │   ├── products.ts     # products[] (typed Product data)
  │   ├── site.ts         # Configuration (siteUrl, etc.)
  │   ├── blog.ts         # getBlogPosts() — reads blog/*/page.mdx and parses metadata
  │   └── utils.ts        # Shared utilities (cn, etc.)
  └── mdx-components.tsx  # MDX component mapping (for MDX elements like <a>, <img>, etc.)
```

## Page Composition Pattern

Pages are assembled by composing independent section components — to reorder/add/remove, edit the page file:

- **Home** (`src/app/page.tsx`) composes `src/components/landing/*` and renders a fixed full-page `<ParticleField />` background.
- **Resume** (`src/app/resume/page.tsx`) composes the classic `src/components/sections/*` (Hero, About, Skills, Projects, Experience, Contact).

The two sets are distinct: `landing/` is the marketing home, `sections/` is the long resume page. Don't confuse them.

## Animations & Motion

Framer Motion drives scroll reveals and micro-interactions. Prefer the shared primitives in `src/components/motion/` over hand-rolled `motion.*` + `variants`:
- `scroll.tsx` → `<Reveal>` (scroll-trigger fade/slide), `<Parallax>`
- `tilt.tsx` → `<Tilt>` (pointer-tracking 3D tilt)

These wrap children and are used across landing and blog list. Reach for raw `motion` from `framer-motion` only when a primitive doesn't fit.

## 3D Hero Scene

`src/components/hero/NeonScene.tsx` uses Three.js + React Three Fiber + drei. It renders a neon-style 3D scene (rotating meshes, glow effects). Check that file for the Three.js setup patterns.

## Data Layer

Typed content lives in `src/lib/`:
- `projects.ts` → `featuredProjects: Project[]` (consumed by landing `FeaturedProjects`).
- `products.ts` → `products: Product[]`.

Edit these arrays to change displayed projects/products; components render from them.

**Careful:** the resume page does *not* read `src/lib/projects.ts`. `src/components/sections/Projects.tsx` holds its own hardcoded `allProjects` array (longer list, filterable by the `All / AI / Frontend / Backend` tags). Adding or editing a project usually means touching **both** lists.

Bio copy that mentions roles/companies lives in three more places and must stay in sync: `src/components/landing/BriefAbout.tsx`, `src/components/sections/About.tsx`, and `src/components/sections/Experience.tsx` (`items` array).
