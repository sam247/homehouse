import type { Metadata } from "next";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";
import { StarSprite, Stars } from "@/components/Stars";
import { GOOGLE_REVIEWS_URL, REVIEWS } from "@/lib/reviews";

export const metadata: Metadata = {
  title: {
    absolute: "Guest Reviews | Home House Homestead in Norfolk",
  },
  description:
    "Guest reviews of retreats and countryside stays at Home House Homestead in Norfolk — honest accounts of rest, hosting, food and the homestead itself.",
  openGraph: {
    title: "Guest Reviews | Home House Homestead in Norfolk",
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
      <Band variant="cream">
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
          <StarSprite />
          <div className="grid md:grid-cols-2 gap-8">
            {REVIEWS.map((r, i) => (
              <figure key={i} className="reveal border border-border p-8 md:p-10">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <figcaption className="font-serif text-2xl leading-snug text-foreground/95">
                      {r.name}
                    </figcaption>
                  </div>
                  <Stars rating={r.rating} size="md" className="mt-1 text-[var(--clay)] shrink-0" />
                </div>
                <blockquote className="mt-6 font-light leading-relaxed text-foreground/80">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
              </figure>
            ))}
          </div>
        </Section>
      </Band>
    </PageShell>
  );
}
