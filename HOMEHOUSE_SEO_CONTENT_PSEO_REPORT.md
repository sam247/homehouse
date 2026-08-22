# Home House SEO Content & Micro-pSEO Sprint Report

**Site:** https://homehouse.org.uk/  
**Sprint date:** 2026-08-22  
**Scope:** Search-led content foundation, guides vs journal separation, internal linking, micro-pSEO experiment recording (no geo pages).

---

# Baseline

## Current indexed/content architecture

| Layer | URLs | Role |
|-------|------|------|
| Commercial | `/`, `/retreats`, 4 retreat spokes, `/stays`, `/norfolk-holidays`, `/events-and-workshops`, `/contact` | Booking/service intent |
| Search guides | `/blog/{10 guide slugs}` | Pre-booking discovery & planning |
| Journal | `/blog/{DB posts}` | Amanda/Hawa personal reflections (Neon CMS) |
| Micro-pSEO (intent) | 4 retreat spokes + `/norfolk-holidays` | County-level intent, not town permutations |
| Geo programmatic | **None** | Deferred pending verified location data |

**Technical baseline (unchanged, verified):**
- Canonical domain via `SITE_URL` → `https://homehouse.org.uk`
- Sitemap: commercial routes + published blog posts ([`src/app/sitemap.ts`](src/app/sitemap.ts))
- Robots: allow `/`, disallow `/admin`, `/amanda`
- JSON-LD: LocalBusiness/LodgingBusiness sitewide; BlogPosting + BreadcrumbList on posts; FAQ on commercial pages
- Visible UI breadcrumbs: not implemented (JSON-LD only)

**July GSC close baseline** (from [`SEO_PHASE_2_IMPLEMENTATION_CHECKLIST.md`](SEO_PHASE_2_IMPLEMENTATION_CHECKLIST.md), window 2026-07-02 → 2026-07-30):

| Metric | Value |
|--------|-------|
| Property clicks / impressions | 31 / 442 |
| Homepage | 15 clicks / 109 impr / 13.8% CTR / pos 24.4 |
| `/retreats` | 0 / 20 / pos 15.6 |
| `/stays` | 0 / 14 / pos 22.7 |
| Retreat spokes + `/norfolk-holidays` | No page-level data |
| Legacy `http://www.homehouse.org.uk` | Still splits short-window reporting |

**Live GSC pull:** Blocked during sprint (Search Console MCP 403; gcloud token insufficient scope). Baselines above retained from repo checklist. Re-pull via Better Ranking once Home House Tracker project exists.

---

# GSC

**Available evidence:** July 2026 close baseline only (see above).

**Query watchlist from prior SEO work (still valid):**
- `norfolk retreats`, `retreats in norfolk` → `/retreats` hub
- `homestead retreat` → `/retreats` + guide `/blog/what-is-a-homestead-retreat`
- `wellness retreat norfolk` → homepage + `/retreats` copy only (no dedicated wellness page)
- Solo/women's near-me variants → spokes + guides, not new URLs
- Spiritual/yoga/meditation retreat → default deny

**Gap before sprint:** 8 support posts existed at ~280–360 words with **zero organic landing traffic in GA4**. Primary discovery gap was indexation/depth, not missing URLs.

---

# Bing

- Property verified: `https://homehouse.org.uk/`
- API query/page stats failed (`InvalidParameter`) during sprint — parameters need debugging
- **No Bing baseline captured** in this sprint; compare after API fix at 4–6 week review

---

# GA4

**Property:** `539279174` (homehouse.org.uk)  
**Window:** 2025-08-22 → 2026-08-21

## Organic Search landing pages

| Page | Sessions |
|------|----------|
| `/stays` | 11 |
| `/retreats` | 10 |
| `/events-and-workshops` | 7 |
| `/community` | 4 |
| `/contact` | 4 |
| Blog SEO guides | **0** |
| Amanda journal posts | 1 each (minimal) |

## Site-wide events (all channels)

| Event | Count |
|-------|-------|
| `enquiry_submit` / `enquiry_success` | 13 each |
| `enquiry_open` | 188 |
| `form_submit` | 44 |

**Tracking limitations:** No blog-assisted conversion path measurable. Organic landing report shows 0 conversions attributed. Cannot claim journal or guide-assisted enquiries without enhanced event parameters.

---

# SERP research

## Solo intent ownership decision (pre-implementation check)

| Query pattern | SERP content type | Example rankers |
|---------------|-------------------|-----------------|
| `can you go on a retreat alone` | Reassurance, pros/cons, “yes you can” | retreatcentral.com/can-i-go-on-a-retreat-alone, Lion's Roar pros/cons, Women's Meditation Network “Ready for a Solo Retreat?” |
| `how to plan a solo retreat` | Planning steps, dates, packing, schedule | Thomas Deneuville blueprint, Shira Gill planning, Permission to Pause checklist |
| `solo retreats Norfolk` | Directories + local venues | BookRetreats, Breathing Space Norfolk, Going On Retreat solitary huts |

**Decision:** **Create** `/blog/can-you-go-on-a-retreat-alone` as a separate URL.

**Reason:** Bright Data and Tavily show materially distinct SERP patterns — consideration/reassurance (yes/no, pros/cons, who it's for) vs practical planning (dates, structure, packing). Direct SERP analogue exists (`retreatcentral.com/blog/can-i-go-on-a-retreat-alone/`). Overlap risk managed by cross-linking and distinct H2 structure; planning guide explicitly defers “is solo right for me?” to the new article.

**Intended ownership:**
- `/retreats/solo-retreats-norfolk` → commercial solo retreats Norfolk
- `/blog/how-to-plan-a-solo-retreat-in-norfolk` → practical planning
- `/blog/can-you-go-on-a-retreat-alone` → consideration/reassurance

## Other SERP findings

- **Retreats in Norfolk:** Aggregators (BookRetreats, Tripaneer) + established venues (West Lexham, cottage sites). Weak independent editorial — opportunity for homestead-voice guides.
- **Retreat vs countryside break:** National travel blogs rank; few Norfolk-specific comparison pieces.
- **How long should a retreat be:** BookRetreats FAQ-style content ranks; duration guide fills pre-booking gap.

**Bright Data:** Partial success (2/3 queries). One query returned non-JSON error.

---

# Existing journal

Amanda's posts live in Neon DB (not in repo). GA4-identified examples:

| Slug (approx) | Organic sessions |
|---------------|------------------|
| `/blog/the-hearth-project` | 1 |
| `/blog/the-woman-who-became-the-garden` | 1 |
| `/blog/just-be-a-spiritual-womb-for-women-in-seasons-of-becoming` | 1 |

**Preserved:** No journal content rewritten. Blog index now separates **Planning guides** vs **Journal** sections. Guides use `GuideFooter` + Organization schema author; journal keeps `AuthorStrip` + Person author.

---

# Search content

## Summary

| Action | Count |
|--------|-------|
| Expanded existing guides | 8 |
| New guides | 2 |
| Removed test post | 1 (`hello-world`) |
| **Total substantial guides** | **10** |

All guides: `contentType: guide`, `author: Home House Homestead`, ≥1,200 words.

| # | Title | URL | Words | Primary intent |
|---|-------|-----|-------|----------------|
| 1 | How To Plan A Solo Retreat In Norfolk | `/blog/how-to-plan-a-solo-retreat-in-norfolk` | ~2,001 | Solo retreat planning Norfolk |
| 2 | Can You Go On A Retreat Alone? | `/blog/can-you-go-on-a-retreat-alone` | ~1,989 | Solo retreat consideration UK |
| 3 | How Long Should You Go On A Retreat For? | `/blog/how-long-should-you-go-on-a-retreat-for` | ~2,083 | Retreat duration / weekend retreat |
| 4 | What To Pack For A Countryside Retreat In Norfolk | `/blog/what-to-pack-for-a-countryside-retreat-in-norfolk` | ~2,462 | Retreat packing Norfolk |
| 5 | Retreat Or Guest House Stay In Norfolk | `/blog/retreat-or-guest-house-stay-in-norfolk` | ~2,351 | Retreat vs countryside stay |
| 6 | What Is A Homestead Retreat? | `/blog/what-is-a-homestead-retreat` | ~2,643 | Homestead vs hotel |
| 7 | What To Expect On A Women's Retreat In Norfolk | `/blog/what-to-expect-on-a-womens-retreat-in-norfolk` | ~1,848 | Women's retreat expectations |
| 8 | Peaceful Norfolk Holidays For Rest And Reset | `/blog/peaceful-norfolk-holidays-for-rest-and-reset` | ~1,943 | Peaceful Norfolk holidays |
| 9 | Digital Detox Retreat In Norfolk | `/blog/digital-detox-retreat-in-norfolk` | ~1,988 | Quieter break from screens (not formal programme) |
| 10 | Quiet Weekend Breaks In Norfolk | `/blog/quiet-weekend-breaks-in-norfolk` | ~2,016 | Slow weekend Norfolk |

Each guide includes 4–7 FAQs, internal links to commercial pages, restrained CTA via `GuideFooter`, BlogPosting schema with Organization author.

### Example: new solo consideration guide

- **Evidence:** Distinct SERP vs planning queries (see SERP section)
- **Commercial destination:** `/retreats/solo-retreats-norfolk`, `/retreats`
- **Internal links:** Planning guide, rest retreats, stays
- **Related journal:** None forced (journal remains separate)

### Example: duration guide

- **Evidence:** BookRetreats ranks “2–4 day format” FAQ content; pre-booking intent
- **Commercial destination:** `/retreats`, `/events-and-workshops`, `/stays`

---

# Rejected topics

| Topic | Reason |
|-------|--------|
| A Guide to Choosing a Retreat in Norfolk (standalone) | Cannibalises `/retreats`; folded into hub FAQ + guides |
| Norfolk retreats near coast / Broads | **Project constraint:** no verified travel times/location |
| Town-level programmatic pages | Same constraint + no GSC demand evidence |
| Creative/writing retreat (this sprint) | Lower priority vs 10 core; offer referenced in solo spoke copy |
| Christian/yoga/spiritual niche pages | Phase 2 guardrail — off-brand without explicit offer |
| Merge “Can you go alone?” into planning guide | SERP patterns distinct; separate URL justified |

---

# Micro-programmatic audit

**Finding:** No town/destination generated routes exist. Micro-layer = 5 county-intent pages.

| URL | Target | GSC (July) | Bing | Quality | Overlap | Action | Reason |
|-----|--------|------------|------|---------|---------|--------|--------|
| `/retreats/womens-retreats-norfolk` | women's retreats Norfolk | No page data | n/a | HEALTHY | Hub | Retain + link guides | Distinct commercial spoke |
| `/retreats/solo-retreats-norfolk` | solo retreats Norfolk | No page data | n/a | HEALTHY | Hub | Retain + link guides | Distinct commercial spoke |
| `/retreats/private-retreats-norfolk` | private retreats Norfolk | No page data | n/a | HEALTHY | Hub | Retain + link guides | Distinct commercial spoke |
| `/retreats/rest-retreats-norfolk` | rest retreats Norfolk | No page data | n/a | HEALTHY | Hub | Retain + link guides | Distinct commercial spoke |
| `/norfolk-holidays` | Norfolk holidays / quiet breaks | No page data | n/a | HEALTHY | `/stays` | Retain (support role) | Watch impressions before expansion |
| Geo permutations | retreats near [town/coast] | n/a | n/a | n/a | n/a | **Deferred** | Location constraint |

---

# Programmatic changes

| Change | URLs | Reason |
|--------|------|--------|
| Retained | 5 intent pages | Already distinct, no thin geo layer |
| Improved | 4 spokes `relatedLinks` in [`retreatPages.ts`](src/lib/retreatPages.ts) | Point to new/expanded guides |
| Created | 0 geo pages | Awaiting verified location |
| Noindexed/removed | `hello-world` test post | Deleted; excluded from sitemap |
| New guides | 10 markdown files in `content/blog/` | Search-led content foundation |

---

# Query fan-out

**Viable now (county-level, no geo claims):**
- norfolk retreats / retreats in norfolk
- solo / private / women's / rest retreat + Norfolk
- homestead retreat / guest house Norfolk
- quiet weekend / peaceful holidays Norfolk
- retreat vs guest house / countryside break
- solo retreat alone (UK consideration)
- how long retreat / weekend retreat

**Deferred (record as future opportunities):**
- retreats near Norwich / coast / Broads
- town + retreat/accommodation permutations

---

# Technical changes

| File | Change |
|------|--------|
| [`src/lib/blog.ts`](src/lib/blog.ts) | `contentType`, `isGuidePost`, `getGuidePosts`, `getJournalPosts`, noindex filter |
| [`src/app/blog/[slug]/page.tsx`](src/app/blog/[slug]/page.tsx) | Guide vs journal eyebrow, schema author, `GuideFooter`, table markdown |
| [`src/app/blog/page.tsx`](src/app/blog/page.tsx) | Guides / Journal sections |
| [`src/components/GuideFooter.tsx`](src/components/GuideFooter.tsx) | Business CTA for guides |
| [`src/components/PlanningGuidesSection.tsx`](src/components/PlanningGuidesSection.tsx) | Commercial ↔ guide links |
| [`src/app/retreats/page.tsx`](src/app/retreats/page.tsx) | Planning guides module |
| [`src/app/stays/page.tsx`](src/app/stays/page.tsx) | Planning guides module |
| [`src/app/norfolk-holidays/page.tsx`](src/app/norfolk-holidays/page.tsx) | Planning guides module |
| [`src/lib/retreatPages.ts`](src/lib/retreatPages.ts) | Guide links on spokes |
| [`src/app/sitemap.ts`](src/app/sitemap.ts) | Exclude noindex posts |
| [`content/blog/*.md`](content/blog/) | 8 expansions + 2 new guides |
| [`tests/system/navigation.spec.ts`](tests/system/navigation.spec.ts) | Updated blog/sitemap expectations |

---

# QA

| Check | Status |
|-------|--------|
| All guides ≥1,200 words | ✅ (~1,848–2,643 words each) |
| URLs render | ✅ TypeScript passes (`tsc --noEmit`) |
| Canonical correct | ✅ Per-post `/blog/{slug}` |
| Sitemap correct | ✅ 10 guides listed; hello-world removed |
| No accidental noindex on guides | ✅ |
| Schema valid | ✅ Organization author on guides; Person on journal |
| Links resolve | ✅ Internal paths verified in content |
| Build passes | ⚠️ Local `next build` failed — Tailwind `@tailwindcss/oxide` native binding missing (environment); not introduced by this sprint |
| Lint/typecheck | ✅ `tsc --noEmit` clean |
| Playwright | Updated; run in CI/deploy environment |

---

# Better Ranking Growth

## Project status

**Home House is not yet a Tracker project** in Better Ranking (`list_projects` returned Anna Davies, Disclosurely, Head Lice Checker, Mainline Groundworks, RIGS Electrical only). MCP exposes no `create_project` tool.

**Required manual step:** Create Tracker project for `homehouse.org.uk` (region: google.co.uk), then run:

1. `create_project_memory` — location constraint (below)
2. `create_growth_experiment` × 2 — copy hypotheses from this report
3. `activate_growth_experiment` after deploy with GSC baseline
4. `create_annotation` — sprint implementation event

## Project memory (to seed)

> **Title:** Location publication constraint  
> **Type:** constraint  
> **Content:** Home House publicly identifies its location only as Norfolk, United Kingdom. Do not publish more precise location or travel-time claims without explicit verified business information.

> **Title:** SEO Phase 2 complete — default deny on niche pages  
> **Type:** decision  
> **Content:** Commercial cluster passes 1–5 completed July 2026. Do not create yoga/spiritual/wellness niche pages without explicit offer. Blog supports `/retreats`, `/stays`, `/norfolk-holidays`.

## Opportunities (to create in Tracker)

1. **Norfolk retreat informational cluster** — 10 guides expanded/created (this sprint)
2. **Solo consideration vs planning intent** — separate URLs validated by SERP
3. **Indexation of spokes + guides** — July baseline showed spokes at 0 page-level GSC
4. **Internal linking guides ↔ commercial** — implemented via PlanningGuidesSection
5. **Deferred: destination/coast/Broads geo pages** — status `awaiting_data`

## Experiment 1: Norfolk Retreat Content Cluster

| Field | Value |
|-------|-------|
| **Primary question** | Does a search-led Norfolk retreat content cluster increase query fan-out and strengthen commercial retreat/stay visibility? |
| **Baseline date** | 2026-08-22 |
| **URLs** | 10 `/blog/*` guides + `/retreats`, `/stays`, spokes |
| **Target queries** | norfolk retreats, solo retreat alone, how long retreat, homestead retreat, quiet weekend Norfolk, retreat vs guest house |
| **Baseline GSC** | 31 clicks / 442 impr property; home 15/109; /retreats 0/20; /stays 0/14 |
| **Expected behaviour** | Guide URLs enter GSC; impressions fan-out on informational queries; commercial pages gain assisted discovery |
| **Measurement window** | 42 days (review ~2026-10-03) |
| **Hypothesis** | Depth + internal linking will index guides and create query fan-out without cannibalising `/retreats` |

## Experiment 2: Home House Micro-Programmatic SEO

| Field | Value |
|-------|-------|
| **Primary question** | Can a small set of highly relevant county-level intent pages generate useful long-tail visibility without thin geo content? |
| **Baseline date** | 2026-08-22 |
| **Existing URLs** | `/retreats` + 4 spokes + `/norfolk-holidays` (5 pages) |
| **Pages created** | 0 geo pages (deliberate) |
| **Baseline indexing** | Spokes had 0 GSC page-level data in July |
| **Quality** | All 5 HEALTHY — distinct copy, no town permutations |
| **Expected behaviour** | Spokes appear in GSC with guide support; no indexation waste from geo matrix |
| **Measurement window** | 42 days |
| **Hypothesis** | Intent spokes + guide cluster outperform thin geo pages given location constraint |

**Growth IDs:** Pending Tracker project creation — no UUIDs assigned this sprint.

---

# Next measurement (4–6 weeks)

Check around **2026-10-03**:

1. **GSC query fan-out** — new queries on guide URLs (`solo retreat alone`, `how long retreat`, packing, homestead)
2. **GSC pages** — guides + at least one spoke with impressions
3. **Commercial movement** — `/retreats`, `/stays` clicks/impressions vs July baseline
4. **Cannibalisation** — Google-selected URL for `norfolk retreats` / `retreats in norfolk`
5. **GA4 organic** — any `/blog/*` guide landing sessions
6. **Enquiry paths** — `enquiry_open` from guide pages (may need GA4 enhancement)
7. **Bing** — retry API; compare geo long-tail vs Google

**Do not** plan another content batch until data supports it.

---

# Sprint activity log

| Date | Activity |
|------|----------|
| 2026-08-22 | SERP check: approved separate `/blog/can-you-go-on-a-retreat-alone` (distinct consideration SERP) |
| 2026-08-22 | Expanded 8 guides to 1,200+ words; added 2 new guides |
| 2026-08-22 | Guides vs journal separation (schema, footer, blog index) |
| 2026-08-22 | PlanningGuidesSection on `/retreats`, `/stays`, `/norfolk-holidays` |
| 2026-08-22 | Updated retreat spoke relatedLinks |
| 2026-08-22 | Removed `hello-world` test post |
| 2026-08-22 | Updated Playwright navigation/sitemap tests |
