# SEO Phase 2 Implementation Checklist

This checklist turns the current GSC-led priorities into concrete repo work.

## Goal

Improve performance on the existing canonical pages before expanding the site further. Focus on:

- stronger homepage CTR and intent matching
- stronger retreat cluster internal linking
- better query alignment on `/retreats` and `/stays`
- tighter measurement and regression coverage

## Pass 1: Refine Existing Money Pages

### Homepage

Status: `next`

Target files:

- `src/app/page.tsx`
- `src/components/HeroVideo.tsx`

Tasks:

- [ ] Rework homepage `metadata.title` and `metadata.description` to better reflect peaceful Norfolk retreats, countryside stays, and restorative breaks while staying on-brand.
- [ ] Tighten the hero and first two body sections so the page speaks more directly to retreat intent, quiet stay intent, and restorative-break language already appearing in GSC.
- [ ] Review whether the current phrase "wellness retreat" is too broad or too generic, and replace it if a more grounded phrase fits the brand better.
- [ ] Add one stronger contextual link near the top of the page to `/retreats`.
- [ ] Add one stronger contextual link near the top of the page to `/stays` or `/norfolk-holidays`, depending on which section best matches search intent.
- [ ] Expand FAQ copy only where it supports real query signals such as `norfolk retreats`, `homestead retreat`, and quiet countryside stay intent.

Definition of done:

- homepage metadata is more specific and commercially useful
- hero copy matches current search demand more closely
- above-the-fold internal links clearly route users into the retreat cluster

### Retreat hub

Status: `next`

Target files:

- `src/app/retreats/page.tsx`
- `src/lib/retreatPages.ts`

Tasks:

- [ ] Strengthen intro copy so `/retreats` more clearly targets `retreats in norfolk` without sounding templated.
- [ ] Add more explicit internal-link language between the hub and the four existing spokes.
- [ ] Review the "Best fit for" block and CTA labels so they better separate scheduled retreats, private retreats, solo stays, and retreat accommodation.
- [ ] Expand the FAQ set only if the new questions reinforce real search demand and help route people into the right spoke page.
- [ ] Check whether each spoke description in `RETREAT_PAGES` is distinct enough to avoid semantic overlap.

Definition of done:

- `/retreats` is clearly the main commercial hub
- the hub passes users and crawlers into the right spoke pages
- hub copy is more aligned with the strongest GSC queries

### Stays page

Status: `next`

Target files:

- `src/app/stays/page.tsx`

Tasks:

- [ ] Tighten metadata so it leans into guest house, countryside stay, retreat accommodation, and restful break language more clearly.
- [ ] Strengthen intro copy for users comparing a quiet break with a retreat-led stay.
- [ ] Add one clearer internal-link bridge back to `/retreats`.
- [ ] Add one clearer internal-link bridge to `/norfolk-holidays`.
- [ ] Review room and rates copy for places where accommodation intent can be made more explicit without becoming generic.

Definition of done:

- `/stays` supports both accommodation intent and the retreat cluster
- page copy reflects real user comparison behaviour

## Pass 2: Strengthen Cluster Linking

### Retreat spoke linkage

Status: `next`

Target files:

- `src/app/retreats/womens-retreats-norfolk/page.tsx`
- `src/app/retreats/solo-retreats-norfolk/page.tsx`
- `src/app/retreats/private-retreats-norfolk/page.tsx`
- `src/app/retreats/rest-retreats-norfolk/page.tsx`
- `src/lib/retreatPages.ts`

Tasks:

- [ ] Audit each spoke page for missing contextual links back to `/retreats`.
- [ ] Add selective cross-links where they help genuine user journeys, especially between women's and solo retreat intent.
- [ ] Make sure each spoke has a distinct role and does not duplicate the hub too closely.
- [ ] Keep anchor text descriptive and natural, not repetitive or exact-match stuffed.

Definition of done:

- all spoke pages link cleanly back into the hub
- cross-links support real navigation rather than forced SEO patterns

### Cross-cluster routes

Status: `next`

Target files:

- `src/app/page.tsx`
- `src/app/retreats/page.tsx`
- `src/app/stays/page.tsx`
- `src/app/norfolk-holidays/page.tsx`
- `src/app/blog/page.tsx`
- `src/components/Footer.tsx`
- `src/lib/site.ts`

Tasks:

- [ ] Audit links between home, retreats, stays, Norfolk holidays, blog, and footer navigation.
- [ ] Add or tighten links only where they support clear intent pathways.
- [ ] Keep `/norfolk-holidays` in a support role unless page-level GSC data strengthens materially.
- [ ] Confirm global navigation still reflects the current single-source-of-truth route structure.

Definition of done:

- the cluster is internally coherent
- support pages strengthen money pages instead of competing with them

## Pass 3: Metadata And Structured Data Review

Status: `next`

Target files:

- `src/app/page.tsx`
- `src/app/retreats/page.tsx`
- `src/app/stays/page.tsx`
- `src/app/norfolk-holidays/page.tsx`
- `src/app/layout.tsx`
- `src/components/SeoJsonLd.tsx`

Tasks:

- [ ] Review title and description patterns across home, retreats, stays, and Norfolk holidays for overlap and weak differentiation.
- [ ] Confirm canonicals remain correct and absolute on all priority pages.
- [ ] Review FAQ schema payloads to make sure they still match visible page copy after edits.
- [ ] Check whether any priority page needs a clearer breadcrumb or business-entity relationship in JSON-LD.

Definition of done:

- priority pages have differentiated metadata
- structured data stays aligned with visible content

## Pass 4: Guardrails For New Content

Status: `planned`

Target files:

- `content/blog/*.md`
- `src/lib/blog.ts`
- `src/app/blog/page.tsx`

Tasks:

- [ ] Do not add a new page unless it has a real query signal, a clear commercial or support role, and a defined internal-link target.
- [ ] Do not create off-brand pages for yoga, christian, spiritual, or generic wellness intent unless the real offer supports it.
- [ ] Map every new support article to a destination page before drafting.
- [ ] Keep blog growth focused on strengthening `/retreats`, `/stays`, or `/norfolk-holidays`, not on publishing disconnected traffic bait.

Definition of done:

- new content follows a default-deny model
- the blog remains a support system, not a separate SEO strategy

## Pass 5: Regression And Measurement

Status: `next`

Target files:

- `tests/system/navigation.spec.ts`
- `src/app/sitemap.ts`
- `src/app/robots.ts`

Tasks:

- [ ] Extend system coverage for any new internal-link modules or CTA copy changes on home, retreats, and stays.
- [ ] Keep canonical regression checks for all priority landing pages.
- [ ] Confirm sitemap coverage remains correct for the current money pages and retreat spokes.
- [ ] After implementation, run a 14-day and 30-day GSC review against the exact pages updated in this pass.

Definition of done:

- priority SEO pages keep their canonical and sitemap guarantees
- changes are measurable against a clear GSC review window

## Execution Order

- [ ] Pass 1: homepage, retreats, stays
- [ ] Pass 2: spoke-linking and cross-cluster routing
- [ ] Pass 3: metadata and JSON-LD review
- [ ] Pass 4: only create support content if the page targets are already defined
- [ ] Pass 5: extend tests and re-check sitemap/canonical coverage

## Not In Scope Yet

- [ ] launching multiple new adjacent landing pages
- [ ] spinning out broad holiday/location clusters
- [ ] targeting noisy owner-name or generic `home` queries
- [ ] creating niche spiritual or wellness pages without a stronger brand and GSC case
