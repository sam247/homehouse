## Summary

Update the site copy on Home, About, and Stays pages to match the client’s latest wording, switch the About hero photo to `author.webp`, and fix the homepage blog section so it reflects blog post changes immediately (no stale caching).

## Current State Analysis (repo-grounded)

- Home page copy and sections live in [page.tsx](file:///Users/sampettiford/Documents/Cursor/React%20Sites/homehouse/src/app/page.tsx).
- About page copy and images live in [about/page.tsx](file:///Users/sampettiford/Documents/Cursor/React%20Sites/homehouse/src/app/about/page.tsx).
- Stays page copy, room cards, “What’s included” list, and room images live in [stays/page.tsx](file:///Users/sampettiford/Documents/Cursor/React%20Sites/homehouse/src/app/stays/page.tsx).
- Blog data is sourced by [blog.ts](file:///Users/sampettiford/Documents/Cursor/React%20Sites/homehouse/src/lib/blog.ts):
  - If `DATABASE_URL` is set, posts come from the `posts` DB table and markdown files are ignored.
  - If `DATABASE_URL` is not set, posts come from `content/blog/*.md(x)`.
- The homepage “Journal” section currently renders `getPostsPage(...)` results but the page has no caching overrides, which can lead to stale/never-updating blog cards in production when posts are managed via DB.
- `/blog` and `/blog/[slug]` currently use ISR (`revalidate = 3600`) and `/blog/[slug]` uses `generateStaticParams`, which is a poor fit for DB-driven posts that need to appear/disappear immediately.

## Proposed Changes

### 1) Home page copy refresh

**File:** [page.tsx](file:///Users/sampettiford/Documents/Cursor/React%20Sites/homehouse/src/app/page.tsx)

- Replace the top intro copy with the client-provided voice:
  - “Slow down, reconnect with nature…”
  - Add the “A home away from home.” and “A place to remember…” lines.
- Update “A Homestead, Not a Hotel” section to include the new paragraph plus revised bullet list:
  - Remove the optional meals bullet from the “offers” list (as per email).
  - Update the 1-to-1 sessions bullet to include “Sufi Healing and mentorship, breathwork, bodywork, sound bathing”.
- Replace the “Wellness Retreats & Countryside Stays” body copy with the new “gentle invitation” wording, keeping the existing internal links to `/events-and-workshops`, `/stays`, and the `#stay-enquiry` anchor.
- Replace “Why guests choose us” section intro paragraph and bullet list with the new “Why Guests Choose Home House Homestead” copy and bullets from the email.

### 2) Fix homepage blog cards not updating (and stale deletions)

**File:** [page.tsx](file:///Users/sampettiford/Documents/Cursor/React%20Sites/homehouse/src/app/page.tsx)

- Add `export const dynamic = "force-dynamic";` so the homepage always renders the latest blog posts from the current source (DB or markdown), avoiding build-time caching issues that cause deleted/created posts to not reflect on the homepage.

### 3) Make blog listing and post pages “always live” (match homepage expectation)

**Files:**
- [blog/page.tsx](file:///Users/sampettiford/Documents/Cursor/React%20Sites/homehouse/src/app/blog/page.tsx)
- [blog/[slug]/page.tsx](file:///Users/sampettiford/Documents/Cursor/React%20Sites/homehouse/src/app/blog/%5Bslug%5D/page.tsx)

- Switch both routes to “always live” rendering:
  - Add `export const dynamic = "force-dynamic";`
  - Remove `export const revalidate = 3600;` from both files
  - Remove `generateStaticParams()` from `[slug]/page.tsx` so new posts are available immediately and deletions don’t leave stale pages around for up to an hour.

### 4) About page updates (photo + copy additions)

**File:** [about/page.tsx](file:///Users/sampettiford/Documents/Cursor/React%20Sites/homehouse/src/app/about/page.tsx)

- Switch the About hero (and the “Early years” image if desired) to `"/author.webp"` (per your selection).
- In “When what was buried begins to rise.” section:
  - Insert the new paragraph beginning “From the outside, my life appeared full and blessed…”
  - Adjust the “Over the years…” paragraph to include “breath work” and to match the updated list: “Yoga, breath work, bodywork, ceremony, sound, meditation and transformational work…”
- In “An invitation” section at the bottom:
  - Expand the content to include:
    - “A journey of returning home to the heart, where the Divine has always been waiting.”
    - “Remembering that true home lives within the heart.”
    - Keep “Be the empty cup.” as the visual emphasis line.

### 5) Stays page updates (copy + includes list + photos wiring)

**File:** [stays/page.tsx](file:///Users/sampettiford/Documents/Cursor/React%20Sites/homehouse/src/app/stays/page.tsx)

- Update the hero intro copy to match:
  - “Rooms are simple, comfortable, and peaceful.”
  - “Stays are flexible - for a few nights of rest, a week of creative work or reflection, or longer.”
- Add the standalone line “Enjoy the slower rhythm of life at Home House Homestead.” in the most fitting location (immediately after the hero, before room cards).
- Replace the “includes” list content to match the client’s “WHAT’S INCLUDED” block:
  - “Breakfast prepared with care, often using produce from the garden”
  - “home-cooked meals with seasonal organic produce”
  - “Access to gardens, fields, surrounding countryside and Norfolk beaches”
  - “Optional 1-to-1 sessions and treatments by arrangement”
  - “Quiet spaces for rest, reading, writing, reflection, meditation and prayer”
  - “Tea, herbal infusions and homemade sourdough”
  - “A slower pace of life and a warm personal welcome”
- Photos:
  - After you upload the room/bathroom images, add them under `/public/photos/` (or another agreed `/public/...` subfolder) and update the `IMG.room1/2/3` fields and (if needed) the `rooms[]` objects to use those local paths.
  - If more than 3 images are provided, we’ll decide whether to expand the grid or keep 3 featured rooms plus a link to Gallery.

### 6) ROADMAP update

**File:** [ROADMAP.MD](file:///Users/sampettiford/Documents/Cursor/React%20Sites/homehouse/ROADMAP.MD)

- Add an entry noting:
  - Home/About/Stays copy updated to latest client voice
  - Blog pages + homepage blog cards now “always live” (no stale caching)
  - About hero switched to `author.webp`
  - Stays photos integrated (once assets are added)

## Assumptions & Decisions

- “Changes in bold” from the email are treated as the canonical copy to implement, and we will keep the existing page structure/sections unless explicitly requested to change layout.
- Blog visibility continues to respect `published = true` for DB posts (as implemented in [blog.ts](file:///Users/sampettiford/Documents/Cursor/React%20Sites/homehouse/src/lib/blog.ts#L15-L53)). If posts aren’t appearing, the first thing to verify is that “Published” is checked in the admin post editor.
- About photo change uses the existing `/public/author.webp` asset.
- You will upload the Stays photos before execution continues past the “wire images” step.

## Verification

- Run lint: `npm run lint`
- Run system tests: `npm run test:system`
- Manual smoke check in dev:
  - Home: copy sections updated; homepage shows latest blog cards; deleted posts disappear immediately.
  - Blog: list updates immediately; individual post loads for both markdown-sourced and DB-sourced posts.
  - About: hero image loads from `/author.webp`; copy reads as provided.
  - Stays: updated copy + includes list; room photos render after wiring.

## Execution Notes (process)

- Before editing code, skim the locally installed Next.js docs under `node_modules/next/dist/docs/` (per workspace rule) for any caching/dynamic rendering changes relevant to `dynamic` and route segment configuration.
- Commit + push after each logical change-set (e.g., copy updates, blog dynamic rendering, image integration), per repo workflow rules.
