# Next.js Rebuild Plan — Home House Homestead

## Summary
Rebuild the existing Lovable/Vite TanStack Start site located in `LOVABLE_BUILD/` as a Next.js app at the repository root, matching the current design and behavior as closely as possible. Keep `LOVABLE_BUILD/` until parity is confirmed, then delete it.

## Current State Analysis (Repo Facts)
- The current site lives at `LOVABLE_BUILD/` and is a Vite-based TanStack Start project using:
  - React + TypeScript
  - Tailwind CSS v4 via `@tailwindcss/vite` and a CSS-driven theme in `LOVABLE_BUILD/src/styles.css`
  - Radix UI + shadcn-style components in `LOVABLE_BUILD/src/components/ui/*`
  - Client-side routing via `@tanstack/react-router` with routes in `LOVABLE_BUILD/src/routes/*`
- Static assets used by the UI are in `LOVABLE_BUILD/public/` (notably `hero.mp4` and `public/photos/*`).
- No `README.md` or `ROADMAP.MD` currently exists at repo root.

## Assumptions & Decisions (Locked)
- **Next routing**: Use **Next.js App Router**.
- **Project location**: The **repository root** becomes the Next.js app root; `LOVABLE_BUILD/` remains temporarily for reference and is deleted at the end.
- **Git**: No git commands are run unless explicitly requested.
- **System tests**: Add **Playwright** smoke tests for critical paths.
- **Design fidelity**: Prefer keeping existing markup (`<img>`, `<video>`) and CSS variables to minimize visual drift; do not introduce Next `<Image>` optimization unless requested.

## Proposed Changes (Decision-Complete)

### 1) Create a Next.js app at repo root
- Add a root `package.json` + Next.js config files.
- Use a `src/` layout to keep code organization close to the existing project:
  - `src/app/` for routes (`/`, `/about`, `/stays`, `/events`, `/reviews`, `/gallery`, `/contact`)
  - `src/components/`, `src/hooks/`, `src/lib/` copied/ported from `LOVABLE_BUILD/src/*`
  - `public/` copied/ported from `LOVABLE_BUILD/public/*`

Files (new/updated at repo root):
- `package.json` (Next app deps + scripts)
- `next.config.*` (minimal; only add what is required)
- `tsconfig.json` (include `paths` alias `@/*` -> `src/*`)
- `src/app/layout.tsx` (global HTML shell + font links + global CSS)
- `src/app/globals.css` (ported from `LOVABLE_BUILD/src/styles.css`, with `@source` updated for Next’s `src/`)
- `src/app/page.tsx` and `src/app/<route>/page.tsx` (ported pages)
- `public/hero.mp4`, `public/photos/*` (copied)

### 2) Port styling 1:1 (Tailwind v4 + CSS variables)
- Keep the theme tokens and utility definitions from `LOVABLE_BUILD/src/styles.css`.
- Ensure Tailwind v4 works under Next by using the PostCSS integration for Tailwind v4 (instead of Vite’s `@tailwindcss/vite` plugin).

### 3) Port UI/components with minimal changes
Copy these directories into the new Next app:
- `LOVABLE_BUILD/src/components/**` -> `src/components/**`
- `LOVABLE_BUILD/src/hooks/**` -> `src/hooks/**`
- `LOVABLE_BUILD/src/lib/**` -> `src/lib/**`

Required edits during port:
- Replace `@tanstack/react-router` usage:
  - `Link` -> `next/link`
  - `useLocation()` -> `usePathname()` (from `next/navigation`) for menu-close-on-route-change logic
- Add `"use client"` to components that use hooks, browser APIs, or Radix/shadcn interactive primitives, including at minimum:
  - `src/components/Header.tsx`, `src/components/PageShell.tsx`, `src/components/HeroVideo.tsx`, `src/components/EnquiryDrawer.tsx`, `src/components/Testimonials.tsx`
  - `src/components/ui/*` (safe default: mark all as client to avoid Server/Client import issues)

### 4) Recreate the routes in Next App Router
For each file in `LOVABLE_BUILD/src/routes/*`, create the corresponding route:
- `index.tsx` -> `src/app/page.tsx`
- `about.tsx` -> `src/app/about/page.tsx`
- `stays.tsx` -> `src/app/stays/page.tsx`
- `events.tsx` -> `src/app/events/page.tsx`
- `reviews.tsx` -> `src/app/reviews/page.tsx`
- `gallery.tsx` -> `src/app/gallery/page.tsx`
- `contact.tsx` -> `src/app/contact/page.tsx`

SEO parity:
- Convert each route’s `head()` meta into Next’s `export const metadata = { ... }` (titles/descriptions/OpenGraph).
- Implement 404 as `src/app/not-found.tsx` mirroring the current 404 layout.
- Implement a global error boundary as `src/app/error.tsx` mirroring the current error UI.
- Put the Google Fonts `<link>` tags from `LOVABLE_BUILD/src/routes/__root.tsx` into `src/app/layout.tsx` `<head>`.

### 5) Add Playwright system tests (critical paths)
Add Playwright at repo root and create smoke tests covering:
- Home loads and key hero content renders (site name + hero heading)
- Navigation works for primary pages (header links)
- Mobile menu opens/closes and navigation closes the menu
- Enquiry drawer opens and form fields render

Files (new):
- `playwright.config.ts`
- `tests/system/navigation.spec.ts` (or similar)

### 6) Parity verification + cleanup
Verification steps include:
- Run the existing Vite app from `LOVABLE_BUILD/` and the new Next app in parallel to compare visually.
- Validate that all routes match content/layout and animations behave as expected.
- Once approved, delete `LOVABLE_BUILD/` and any now-unused Vite/TanStack Start files.

## Verification Steps (What I Will Run During Execution)
- Install deps at repo root and run `dev` for Next.
- Build + start Next in production mode to confirm it compiles cleanly.
- Run Playwright tests locally against the dev server.
- Manual spot-check of:
  - `/`, `/about`, `/stays`, `/events`, `/reviews`, `/gallery`, `/contact`
  - Hero video loads and plays
  - Enquiry drawer opens and mailto link behavior still works

## Out of Scope (Unless You Ask)
- Backend/API work (none exists in the current app)
- CMS integration
- Performance refactors (e.g., switching `<img>` to `<Image>`)
- Content/design changes

