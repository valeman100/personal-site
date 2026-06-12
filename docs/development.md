# Development

## Commands

```bash
npm run dev     # dev server with Turbopack
npm run build   # production build (next build)
npm run start   # serve the production build
npm run lint    # ESLint
```

## Forms & Validation

- **Library**: react-hook-form + zod (schema validation), resolved via `@hookform/resolvers`.
- **Contact form**: `src/components/sections/Contact.tsx` → POSTs to `/api/contact` (`src/app/api/contact/route.ts`, uses Resend for email).
- **Notifications**: sonner (toasts).

## Key Dependencies

- **Motion**: framer-motion, next-themes
- **3D**: three, @react-three/fiber, @react-three/drei
- **Forms**: react-hook-form, zod, @hookform/resolvers
- **UI/UX**: sonner, lucide-react (icons), class-variance-authority
- **Blog/Content**: @mdx-js/react, @next/mdx, rehype-pretty-code, remark-gfm
- **Email**: resend

## Environment Variables

Optional `.env.local` for local overrides.
- `NEXT_PUBLIC_BLOG_ENABLED`: enable/disable blog routes.
- No other env vars required for basic development.

## Common Tasks

### Add a home-page section
1. Create `src/components/landing/NewSection.tsx`.
2. Import and add `<NewSection />` to `src/app/page.tsx`.
   (For the resume page: `src/components/sections/` + `src/app/resume/page.tsx`.)

### Add a blog post
Create `src/app/blog/<slug>/page.mdx` — see [blog.md](./blog.md). Auto-listed.

### Add featured project / product data
Edit the typed arrays in `src/lib/projects.ts` (`featuredProjects`) or `src/lib/products.ts` (`products`).

### Update metadata / SEO
Edit `export const metadata` in `src/app/layout.tsx` (title, description, openGraph, twitter card). Sitemap/robots are routes: `src/app/sitemap.ts`, `src/app/robots.ts`.

### Add a UI component
Create in `src/components/ui/`, use Tailwind + CVA for variants — see [styling.md](./styling.md).

## Deployment

Target: **Vercel**. Next.js auto-detection works out of the box. Build command: `next build`. No special env setup unless you add services like Resend (contact form already configured).
