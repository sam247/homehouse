# SEO Plan — homehouse.org.uk (Next.js App Router)

## Summary

Implement a production-grade SEO foundation for the Home House Homestead Next.js site: consistent canonical URLs, crawl/index controls, sitemap + robots, LodgingBusiness structured data, improved share metadata, and a more crawl-efficient rendering strategy for the public blog (Static/ISR). Measurement is standardised on GA4 + Google Search Console.

## Current State Analysis (Repo-Verified)

### Routing / Pages

- App Router pages exist under `src/app/` including `/`, `/about`, `/stays`, `/gallery`, `/reviews`, `/contact`, `/blog`, `/blog/[slug]`, and `/events-and-workshops`.
- `/events` is a redirect to `/events-and-workshops` (`src/app/events/page.tsx`).
- Admin is accessible at `/admin` with a private entry path `/amanda` (rewrite).

### Metadata

- Global metadata exists in `src/app/layout.tsx` but does not set `metadataBase`, so relative canonical URLs and Open Graph `url` fields cannot be resolved to absolute URLs.
- Most public pages define per-route metadata (title/description/alternates.canonical). Blog uses per-route metadata with canonical set to a path.

### Crawl Controls

- `next.config.ts` sets `X-Robots-Tag: noindex, nofollow` headers for `/admin` and `/amanda` paths (good).
- No `robots.txt` or `sitemap.xml` MetadataRoute implementation exists yet.

### Blog Rendering

- `/blog` and `/blog/[slug]` are currently `force-dynamic`, even though their content is suitable for Static/ISR.
- Blog content is sourced from Neon when configured, otherwise from `content/blog/*.md(x)` (`src/lib/blog.ts`).

### Analytics

- GA4 is already included via `next/script` in `src/app/layout.tsx` and an internal helper exists at `src/lib/analytics/ga4.ts`.
- GA4 config uses `{ send_page_view: false }`, implying SPA navigation pageviews should be tracked explicitly (currently not verified in code).

## Assumptions & Decisions (Locked)

- Canonical domain: `https://homehouse.org.uk` (set via `SITE_URL` env).
- Language: English only (`<html lang="en">`).
- Analytics: GA4 + Google Search Console.
- Structured data: `LodgingBusiness`.
- Blog pagination canonical: self-canonical (`/blog?page=N` canonicals include the query string).
- Blog rendering: Static/ISR for SEO/performance.
- Default Open Graph image: reuse existing homepage hero photo.

## Proposed Changes (Decision-Complete)

### 1) Canonical Base URL + Global Metadata Defaults

**Files**

- Update `src/app/layout.tsx`
- Use existing helper `src/lib/siteUrl.ts`

**Changes**

- Set `metadataBase` to `new URL(getSiteUrl())` so all relative URLs in metadata (canonicals, OG URLs) resolve correctly.
- Add a `title` template to reduce duplicated strings across pages and ensure consistent SERP branding.
- Add default Open Graph fields (`siteName`, default `images`, `type`, and optional `locale`) and Twitter defaults.
- Ensure the default OG image uses the existing homepage “house” hero image URL and is absolute (or resolvable via `metadataBase`).

**Why**

- Google and social platforms prefer absolute canonical and OG URLs; `metadataBase` is the Next.js-supported mechanism for this.

### 2) robots.txt and sitemap.xml (MetadataRoute)

**Files**

- Add `src/app/robots.ts`
- Add `src/app/sitemap.ts`

**robots.ts**

- Allow crawling of public site.
- Disallow `/admin` and `/amanda` (crawl-budget and accidental discovery protection).
- Reference the sitemap URL.

**sitemap.ts**

- Include static routes:
  - `/`
  - `/about`
  - `/stays`
  - `/events-and-workshops` (not `/events`, since it redirects)
  - `/gallery`
  - `/reviews`
  - `/contact`
  - `/blog`
- Include dynamic blog post routes:
  - `/blog/[slug]` (from `getAllPosts()` or DB-backed equivalent)
- Add `lastModified` where available:
  - Use `publishedAt` for posts; otherwise omit.

**Why**

- Establishes crawl discovery, indexation reporting in GSC, and enables automated site health checks.

### 3) Blog: Move Public Routes to Static/ISR

**Files**

- Update `src/app/blog/page.tsx`
- Update `src/app/blog/[slug]/page.tsx`
- Possibly update `src/lib/blog.ts` (only if required to support static generation reliably)

**Changes**

- Remove `export const dynamic = "force-dynamic"` from blog pages.
- Implement ISR with a conservative revalidate window (e.g. minutes-hours) appropriate for editorial publishing frequency.
- Add `generateStaticParams` for blog post slugs (DB + filesystem compatible):
  - Uses `getAllPosts()` to enumerate published posts.
- Keep `generateMetadata` (already exists for `[slug]`) but ensure it returns:
  - Canonical URL
  - OG URL and images
  - Meaningful description (excerpt)
- Blog pagination canonical:
  - Ensure `/blog?page=N` generates a canonical that includes the query string (self-canonical) and avoids accidentally canonicalising all pages to `/blog`.

**Why**

- Static/ISR improves TTFB and crawl efficiency and is generally better for indexation and CWV.

### 4) Structured Data (JSON-LD): LodgingBusiness + BlogPosting + Breadcrumbs

**Files**

- Add `src/components/SeoJsonLd.tsx` (server component)
- Update:
  - `src/app/layout.tsx` (sitewide JSON-LD for LodgingBusiness entity)
  - `src/app/blog/[slug]/page.tsx` (BlogPosting JSON-LD)
  - Optionally key public pages (breadcrumbs)

**Changes**

- Emit one sitewide JSON-LD script for the entity:
  - `@type: "LodgingBusiness"`
  - name, url, image, telephone (if present), address (if you want to publish it), sameAs (Instagram/Google Maps if available).
- For blog post pages emit `BlogPosting` JSON-LD:
  - headline, description, image, author, datePublished, mainEntityOfPage
- Add `BreadcrumbList` JSON-LD:
  - For blog posts at minimum: Home → Blog → Post title.

**Why**

- Increases eligibility for rich results and improves entity understanding.

### 5) Core Web Vitals: Fonts and LCP Image Optimisation

**Files**

- Update `src/app/layout.tsx` to use `next/font/google` for Inter + Cormorant Garamond.
- Update `src/app/head.tsx` (remove Google Fonts stylesheet links once fonts are migrated, or delete file if no longer needed).
- Update key pages that render above-the-fold images:
  - `src/app/page.tsx`
  - `src/app/events-and-workshops/page.tsx`

**Changes**

- Replace Google Fonts `<link rel="stylesheet">` with `next/font` to reduce render-blocking CSS.
- Convert the most important above-the-fold images (hero images) to `next/image`:
  - Ensure width/height or `fill` is used to prevent CLS.
  - Ensure meaningful `alt` text where content-relevant (leave decorative images empty alt only when truly decorative).

**Why**

- Improves LCP/CLS and reduces render-blocking resources, directly supporting SEO through CWV.

### 6) Measurement: GA4 Pageview Tracking + GSC Setup Notes

**Files**

- Add `src/components/GaPageViews.tsx` (client component) or equivalent App Router hook-based tracker.
- Update `src/app/layout.tsx` to include the pageview tracker component.

**Changes**

- Keep the existing GA script but implement pageview events on route changes using `gaPageView()` from `src/lib/analytics/ga4.ts`.
- Document in `README.md` or a short internal note (optional) how to:
  - Verify GA in production
  - Add site in GSC
  - Submit sitemap

**Why**

- Ensures App Router navigation produces correct GA4 pageviews when `send_page_view` is disabled.

### 7) System Tests: Prevent SEO Regressions

**Files**

- Update `tests/system/navigation.spec.ts`

**Add tests**

- `GET /robots.txt`:
  - contains `Sitemap:` line
  - contains disallow for `/admin` and `/amanda`
- `GET /sitemap.xml`:
  - contains core routes and `/blog`
  - contains at least one `/blog/hello-world` URL (from repo content)
- Metadata smoke checks (lightweight):
  - A public page exposes a canonical link tag or otherwise validates the metadata output (implementation detail depends on Next 16 behaviour; verify using Playwright DOM assertions).

**Why**

- Locks in the SEO foundation and prevents accidental removal of key indexing primitives.

### 8) ROADMAP Update

**Files**

- Update `ROADMAP.MD`

**Changes**

- Add a new checklist section “SEO foundation” and mark items as completed as they land (metadataBase, sitemap/robots, JSON-LD, blog ISR, CWV improvements, tests).

## Execution Notes / Constraints

- Before implementing, review the Next.js v16 docs under `node_modules/next/dist/docs/` for:
  - Metadata API
  - Metadata routes (`sitemap.ts`, `robots.ts`)
  - Any breaking changes relevant to App Router SEO.
- Do not commit/push automatically unless explicitly requested (workspace safety constraint).

## Verification Steps (Executor Checklist)

- Run lint and system tests:
  - `npm run lint`
  - `npm run test:system`
- Manual spot checks (local dev):
  - `/robots.txt` renders correctly
  - `/sitemap.xml` renders correctly and contains expected URLs
  - Canonical URLs resolve to `https://homehouse.org.uk/...` when `SITE_URL` is set
  - Blog pages are served as static/ISR (no forced dynamic) and render correctly
  - GA4 shows pageview events on navigation (real-time in GA debug view)
