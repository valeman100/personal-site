# Personal Site - Gemini CLI Context

This document provides an overview of the "Personal Site" project, serving as an instructional context for the Gemini CLI.

## Project Overview

This project is a modern personal website built with Next.js 15, React 19, and Tailwind CSS 4. It focuses on a fluid user experience with Framer Motion animations, dark mode, accessible UI components, and a neon-style 3D hero section. It also includes a ready-to-use blog.

**Key Technologies:**
*   **Framework:** Next.js 15 (App Router), React 19
*   **Styling:** Tailwind CSS 4 with design tokens
*   **Animations:** Framer Motion
*   **3D Graphics:** Three.js, React Three Fiber, drei (`components/hero/NeonScene.tsx`)
*   **Theming:** `next-themes` for dark/light mode
*   **Forms:** `react-hook-form`, `zod`, `sonner` for toast notifications
*   **Content:** MDX via `@mdx-js/react` for blog posts

## Building and Running

### Requirements
*   Node.js 20+
*   npm (or pnpm/yarn)

### Quick Start

To set up and run the project locally:

1.  Clone the repository:
    ```bash
    git clone https://github.com/<your-username>/personal-site.git
    ```
2.  Navigate into the project directory:
    ```bash
    cd personal-site
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
    Open `http://localhost:3000` in your browser.

### Available Scripts

*   **Development (Turbopack):** `npm run dev`
*   **Production Build:** `npm run build`
*   **Start Production Server (after build):** `npm run start`
*   **Lint:** `npm run lint`

## Development Conventions

### Project Structure

The project follows a standard Next.js structure:

```
personal-site/
  public/            # Public assets (images, preview.gif)
  src/
    app/             # App Router (home, blog, layout, providers, API routes)
    components/      # Reusable UI components, motion wrappers, sections, 3D scenes
    lib/             # Utility functions
  eslint.config.mjs
  next.config.ts
  package.json
  postcss.config.mjs
  tsconfig.json
```

*   Home sections are located in `src/components/sections/` (e.g., `Hero`, `About`, `Skills`, `Projects`, `Experience`, `Contact`) and are composed in `src/app/page.tsx`.

### Blog

The blog implementation is simple and static:

*   **Post List:** Edit the `posts` array in `src/app/blog/page.tsx`.
*   **Post Content:** Add an entry to the `content` object in `src/app/blog/[slug]/page.tsx` with `title`, `date`, `tags`, and `body`.
*   **MDX Integration:** MDX is processed via `@mdx-js/react` and `src/mdx-components.tsx`.
*   **Enable/Disable:** The blog is **ON in development** and **OFF in production** by default. This can be overridden by setting `NEXT_PUBLIC_BLOG_ENABLED` or `BLOG_ENABLED` to `"true"`/`"false"` in an `.env.local` file.

### Customization

*   **Color & Theme:** Adjust CSS variables (tokens) in `src/app/globals.css` (e.g., `--accent`, surfaces, gradients, neon).
*   **Fonts:** Configure in `src/app/layout.tsx` (currently Geist + Bricolage Grotesque); adjust Google Fonts imports and variables as needed.
*   **SEO/Open Graph:** Update `export const metadata` in `src/app/layout.tsx` for `title`, `description`, `openGraph`, and `twitter` card.
*   **Navigation/Footer:** Modify `src/components/ui/navbar.tsx` and `src/components/layout/Footer.tsx`.

### Contributing

Ideas, bug reports, and suggestions are welcome via Issues/PRs. Feedback on design and UX is appreciated.

### License

The license is currently unspecified. If you intend to reuse parts of the code or design, it is recommended to open an issue for discussion.
