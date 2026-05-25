# Plan — Admin Panel (TinaCMS) + Blog + Availability Calendar (No DB)

## Summary
Introduce an admin panel where the client can manage:
- Blog posts with `/blog` + `/blog/[slug]` on the public site
- A booking availability calendar by maintaining **blocked / unavailable date ranges** (no booking/customer details stored)

Implementation uses **TinaCMS (Git-based CMS)**, meaning content is stored as files in the repository and edited via an admin UI. This satisfies the “no database at all” requirement.

## Current State Analysis (Repo Facts)
- Next.js App Router site lives in `src/app/*` with static marketing pages (`/`, `/about`, `/stays`, `/events`, `/reviews`, `/gallery`, `/contact`).
- Enquiries are currently handled via `mailto:` in [EnquiryDrawer.tsx](file:///Users/sampettiford/Documents/Cursor/React%20Sites/homehouse/src/components/EnquiryDrawer.tsx) and the “dates” field is free text.
- A DayPicker-based calendar component already exists: [calendar.tsx](file:///Users/sampettiford/Documents/Cursor/React%20Sites/homehouse/src/components/ui/calendar.tsx).
- No database, no CMS present.
- Playwright is set up with a small smoke suite in `tests/system/`.

## Assumptions & Decisions (Locked)
- **No DB at all**: no Postgres / SQLite / Turso required.
- **CMS**: TinaCMS (recommended by you) as the blog + “availability blocks” management UI.
- **Calendar data**: blocks only (no PII). The client uses the admin panel to block out already-booked dates.
- **Admin access**: TinaCMS uses Git-based editing; production editing requires either Tina Cloud + GitHub auth or an equivalent Git backend.
- **Public UX**: keep enquiry as an email-based flow, but upgrade the “dates” input to a date-range picker that disables blocked days.

## Proposed Changes (Files + What/Why/How)

### 1) Install and initialize TinaCMS
Goal: add an `/admin` UI that edits repo content.

Changes:
- Add Tina dependencies to root `package.json` (installed via Tina’s recommended init flow).
- Run Tina initialization for **Next.js App Router** so it generates:
  - `tina/config.ts` (schema)
  - `tina/__generated__/*` (generated client + types)
  - `src/app/admin/[[...tina]]/page.tsx` (admin route)

Environment variables (document in `.env.example`):
- `NEXT_PUBLIC_TINA_CLIENT_ID=...`
- `TINA_TOKEN=...`
- `NEXT_PUBLIC_TINA_BRANCH=main`

### 2) Content storage (no DB schema)
All editable data lives in git-tracked files.

#### 2.1 Blog content (MDX)
Directory:
- `content/blog/*.mdx`

Frontmatter fields (Tina schema):
- `title` (string, required)
- `slug` (string, required, unique) OR derive from filename (decision: derive from filename to avoid drift)
- `publishedAt` (datetime)
- `excerpt` (string)
- `coverImage` (string path under `/public` or remote URL)
- `body` (MDX)

#### 2.2 Availability blocks (JSON)
File:
- `content/availability/blocks.json`

Schema:
```json
{
  "blocks": [
    { "start": "2026-06-01", "end": "2026-06-05", "label": "Booked" }
  ]
}
```
Rules:
- `start <= end`
- Blocks are treated as inclusive date ranges

### 3) Public blog pages
Add blog listing and post detail pages.

Files:
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`

Data fetching:
- Use Tina’s generated client to query posts (server component or server-side data loader per Tina’s Next/App Router guidance).

SEO:
- `generateMetadata` per post (title/description/og image) based on frontmatter.

### 4) Availability-aware date picking in enquiry flow
Replace the free-text dates field with a date range picker that disables blocked dates.

Files:
- Update `src/components/EnquiryDrawer.tsx`:
  - Replace `dates` input with a range picker UI using existing `Calendar` component
  - Read blocked ranges from `content/availability/blocks.json`
  - Disable blocked days and prevent selecting a range that intersects blocked days
  - Preserve the existing `mailto:` submission behavior, but format the selected range into the email body

Optional (nice-to-have) API route:
- `src/app/api/availability/route.ts` returning the same blocks JSON for client-only fetching if needed.

### 5) Testing + verification
Extend Playwright system tests for new critical paths.

Files:
- Add tests under `tests/system/`:
  - `/blog` renders
  - `/blog/[slug]` renders for a fixture post (commit a sample post in `content/blog/`)
  - Enquiry date picker disables a known blocked date (use a fixture block in `content/availability/blocks.json`)
  - `/admin` route responds (smoke). In production it may redirect to auth; test should accept redirect.

### 6) ROADMAP.MD update
Add a new section for:
- TinaCMS admin setup
- Blog pages
- Availability blocks + enquiry date picker
- Follow-ups (if any) like migrating availability blocks to Google Calendar later

## Verification Steps (What the executor will run)
- Start dev server and confirm:
  - `/admin` loads Tina UI
  - Create/edit a blog post and see it update `/blog`
  - Edit availability blocks and confirm disabled dates update
- Run `npm run build`
- Run `npm run test:system`
