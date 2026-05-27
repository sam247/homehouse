import type { Metadata } from "next";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { Star } from "lucide-react";
import { GOOGLE_REVIEWS_URL, REVIEWS } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Reviews — Home House Homestead",
  description: "What guests say about their stay at Home House Homestead in Norfolk.",
  openGraph: {
    title: "Reviews — Home House Homestead",
    description: "What guests say about their stay.",
    url: "/reviews",
  },
  alternates: {
    canonical: "/reviews",
  },
};

export default function ReviewsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Reviews"
        title="Words from our guests."
        intro="A few of the kind notes left by people who have stayed."
      />
      <Section>
        <div className="flex justify-center mb-10">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-accent hover:underline font-light"
          >
            View all reviews on Google
          </a>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {REVIEWS.map((r, i) => (
            <figure key={i} className="reveal border border-border p-8 md:p-10">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <figcaption className="font-serif text-2xl leading-snug text-foreground/95">
                    {r.name}
                  </figcaption>
                  <p className="mt-2 text-xs uppercase tracking-[0.25em] text-accent">{r.meta}</p>
                </div>
                <div
                  className="mt-1 flex gap-1 text-[var(--clay)] shrink-0"
                  aria-label={`${r.rating} out of 5 stars`}
                >
                  {Array.from({ length: r.rating }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="mt-6 font-light leading-relaxed text-foreground/80">
                &ldquo;{r.text}&rdquo;
              </blockquote>
            </figure>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
