# Roadmap

## Home House Homestead — Next.js Migration

- [x] Scaffold Next.js App Router project at repo root
- [x] Port theme + Tailwind v4 styling and public assets
- [x] Port components/hooks/lib and replace TanStack Router with Next routing primitives
- [x] Recreate routes: `/`, `/about`, `/stays`, `/events`, `/reviews`, `/gallery`, `/contact`
- [x] Add Playwright system tests for navigation and enquiry drawer
- [ ] Visual parity check against `LOVABLE_BUILD/`
- [ ] Delete `LOVABLE_BUILD/` after parity approval

## Content & Availability (Custom Studio + Neon)

- [x] Add blog content files and public routes: `/blog`, `/blog/[slug]`
- [x] Add availability blocks file + public API endpoint: `/api/availability`
- [x] Upgrade enquiry form to use a date-range picker with blocked dates disabled
- [x] Extend Playwright system tests for blog + blocked-date behavior
- [x] Create Neon schema for posts + availability + magic-link auth
- [x] Build calm `/admin` studio (magic-link login + rich-text posts + availability editor)
- [x] Make auth endpoints resilient (redirect GETs, graceful email/db failures)
- [ ] Migrate existing markdown posts/blocks into Neon
- [x] Remove TinaCMS + TinaCloud build tooling
