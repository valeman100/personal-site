# Design System

All tokens live in `src/app/globals.css`.

## Colors & Tokens

- **Palette**: smoky-black, polynesian-blue, deep-sky-blue, tyrian-purple, celadon
- **Theme tokens**: `--background`, `--foreground`, `--accent`, `--accent-2`, `--accent-3`, `--surface`, `--border-color`
- **Gradients**: `--gradient-hero`, `--gradient-card`, `--gradient-strip`
- **Neon utilities**: `.neon-shadow`, `.neon-border`, `.text-neon-blue`, `.text-neon-purple`, `.text-neon-green`

## Dark Mode

Defined in the `.dark` class; `next-themes` handles toggling (theme toggle in navbar).

## Typography

- Sans: Geist (body, UI)
- Mono: Geist Mono (code blocks)
- Display: Bricolage Grotesque (headings)

## Customizing

Edit `src/app/globals.css`:
- Change CSS custom properties (e.g. `--accent`, `--background`).
- Update the `.dark` class for dark-mode overrides.
- Modify gradients and neon utilities as needed.

## UI components

Reusable UI lives in `src/components/ui/`. Build new ones with Tailwind + CVA (class-variance-authority) for variants, then import into sections/pages.
