# Home House Homestead — Modern Redesign Plan

A modern, editorial rebuild of homehouse.org.uk keeping the same calm, earthy palette (deep teal-green background, warm cream serif type, soft photography) but with a video-led hero, cleaner typography, generous whitespace, and a fast lead-capture form.

## Design direction

- **Palette (carried over)**: deep teal-green `#34504F` background, warm off-white `#F5F0E6` text, muted sage and clay accents, soft shadow.
- **Typography**: editorial serif headings (Cormorant / Instrument Serif feel) + clean humanist sans body (Inter/Work Sans). Larger scale than current site, looser line-height.
- **Motion**: subtle fade/slide-in on scroll, parallax on hero, gentle Ken Burns on imagery. Nothing flashy.
- **Layout**: full-bleed hero video, alternating image/text "zigzag" sections, soft-rounded image cards, sticky transparent nav that solidifies on scroll.

## Pages (matching current site)

Separate TanStack routes, each with its own SEO `head()`:

1. `/` Home — video hero, intro, "What We Offer", experience teaser, gallery strip, enquiry CTA
2. `/about` — story of Hawa Amanda, homestead philosophy, photos
3. `/stays` — rooms, what's included, pricing notes, booking enquiry
4. `/events` — retreats / workshops / event hire (the "hire the space" section)
5. `/reviews` — testimonials
6. `/gallery` — masonry photo grid
7. `/contact` — full enquiry form + location + email

Shared `Header` (logo + nav + "Enquire" button) and `Footer` (newsletter signup placeholder, social, address) rendered from `__root.tsx`.

## Hero (video-based)

- Full-viewport hero with looping muted video background (placeholder MP4 from a free CDN, e.g. Coverr/Pexels countryside loop).
- Dark overlay for legibility, serif headline "Home is in your heart.", subline, and a single primary CTA → opens the quick enquiry drawer.
- Easy swap: `<video src>` points to one constant the client can replace.

## Quick lead enquiry

- Floating "Enquire" button in nav + hero CTA both open a slide-in drawer (shadcn `Sheet`).
- Fields: name, email, dates (optional), party size, message.
- Submission: opens user's mail client via prefilled `mailto:hello@homehouse.org.uk?subject=...&body=...` (per your choice). Structured so we can later swap to Formspree/Resend with a one-line change.
- Also embed the same form on `/contact` as a full-page version.

## Content

Port copy verbatim from the current site (Welcome, What We Offer, The Experience, Perfect For, Connect to Nature, A Quieter Way of Being, Be Cared For). Use existing Squarespace CDN image URLs as placeholders so visuals match day one; client can replace later.

## Technical details

- TanStack Start file-based routes under `src/routes/`
- Design tokens defined in `src/styles.css` using `oklch` equivalents of the brand colors; semantic tokens only in components
- Components: `Header`, `Footer`, `HeroVideo`, `EnquiryDrawer`, `EnquiryForm`, `SectionZigzag`, `GalleryMasonry`, `TestimonialCard`
- shadcn primitives: Sheet, Button, Input, Textarea, Label, Card
- Motion via small CSS + IntersectionObserver fade-in helper (no heavy lib)
- Per-route `head()` with unique title/description/og tags; single H1 per page; semantic HTML; lazy-loaded images
- Responsive: mobile-first, hamburger nav under `md`

## Out of scope (call out)

- No CMS — copy lives in components
- No real booking system or payments
- No backend; form is mailto until you wire Formspree/Resend later
- Newsletter signup is visual placeholder only
