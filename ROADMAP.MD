# Roadmap

## Home House Homestead — Next.js Migration

- [x] Scaffold Next.js App Router project at repo root
- [x] Port theme + Tailwind v4 styling and public assets
- [x] Port components/hooks/lib and replace TanStack Router with Next routing primitives
- [x] Recreate routes: `/`, `/about`, `/stays`, `/events-and-workshops`, `/reviews`, `/gallery`, `/contact`
- [x] Add Playwright system tests for navigation and enquiry drawer
- [x] Add footer social links (Google + Instagram)
- [x] Header CTAs (Call now + Book now) and simplified header nav
- [x] Add GA4 (gtag) to head
- [x] Add GA4 pageview + interaction events (SPA route changes, nav, contact, enquiry)
- [x] Remove hero video poster flash (no placeholder image before playback)
- [x] Rename `/events` to `/events-and-workshops` and add pricing blocks for events + bespoke retreats
- [x] Expand `/about` content and split into banded background sections (use local `about.webp` hero)
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
- [x] Remove ADMIN_SESSION_SECRET requirement (DB-backed sessions)
- [x] Refine blog studio UI (left-sidebar writing dashboard)
- [x] Zen writing editor layout (editor first, publishing tools below; no cover URL field)
- [x] Private admin entry path `/amanda` (noindex; remove public login link)
- [x] Add image uploads for blog (Vercel Blob)
- [x] Blog archive card layout (cover image, title, excerpt, read button)
- [x] Blog archive grid + pagination (3 columns, 15 posts/page)
- [x] Author strip (Hawa) on archive and post pages
- [x] Blog archive author strip positioned below the post grid
- [x] Home page “Notes from the homestead” section (shows latest 3 blog posts)
- [x] Replace homepage + /reviews testimonials with real Google reviews (link to Google)
- [x] Add booking_requests table (pending/confirmed/cancelled) for enquiries
- [x] Add `/api/enquiry` to store enquiries and send Resend notifications/receipts
- [x] Replace enquiry mailto flow with `/api/enquiry` submit + success/error UI (phone optional)
- [x] Treat pending/confirmed booking requests as blocked ranges in `/api/availability`
- [x] Add admin reservation desk (view enquiries, confirm/cancel, internal notes)
- [x] Use left-sidebar studio layout for bookings (continuity with blog)
- [x] Use left-sidebar studio layout for availability blocks (blocks sidebar + large calendar)
- [x] Availability studio: single-month responsive calendar view
- [x] Extend Playwright system tests for enquiry submit + booking admin protection
- [ ] Migrate existing markdown posts/blocks into Neon
- [x] Remove TinaCMS + TinaCloud build tooling
