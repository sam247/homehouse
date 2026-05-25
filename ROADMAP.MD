# Roadmap

## Home House Homestead — Next.js Migration

- [x] Scaffold Next.js App Router project at repo root
- [x] Port theme + Tailwind v4 styling and public assets
- [x] Port components/hooks/lib and replace TanStack Router with Next routing primitives
- [x] Recreate routes: `/`, `/about`, `/stays`, `/events`, `/reviews`, `/gallery`, `/contact`
- [x] Add Playwright system tests for navigation and enquiry drawer
- [ ] Visual parity check against `LOVABLE_BUILD/`
- [ ] Delete `LOVABLE_BUILD/` after parity approval

## Content & Availability (No DB)

- [x] Add TinaCMS configuration and local admin UI (`/admin/index.html`)
- [x] Add blog content files and public routes: `/blog`, `/blog/[slug]`
- [x] Add availability blocks file + public API endpoint: `/api/availability`
- [x] Upgrade enquiry form to use a date-range picker with blocked dates disabled
- [x] Extend Playwright system tests for blog + blocked-date behavior
- [ ] Configure Tina Cloud credentials for production editing (requires clientId/token)
- [ ] Ensure Vercel build does not fail when TinaCloud branch indexing is delayed (skip cloud checks during `tinacms build`)
- [x] Add `/admin` entry route that shows a friendly “not configured” page unless Tina Cloud env vars are present
