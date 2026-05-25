import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section } from "@/components/PageShell";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Home House Homestead" },
      { name: "description", content: "What guests say about their stay at Home House Homestead in Norfolk." },
      { property: "og:title", content: "Reviews — Home House Homestead" },
      { property: "og:description", content: "What guests say about their stay." },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

const reviews = [
  {
    quote:
      "A truly nourishing stay. The food, the quiet, the warmth of the welcome — I left feeling like a different person.",
    name: "Anna, London",
  },
  {
    quote:
      "We hired the whole homestead for a small retreat and Hawa held the space beautifully. Our group is still talking about it.",
    name: "Marcus, retreat facilitator",
  },
  {
    quote:
      "I came to write for a week and barely wanted to leave. The mornings, the garden, the slow pace — everything I needed.",
    name: "Sophie, Edinburgh",
  },
  {
    quote:
      "Felt like coming home to a part of myself I'd forgotten. Thank you for the care in every detail.",
    name: "Jamie & Rae",
  },
  {
    quote:
      "Beautiful, peaceful, and so generous. The food alone was worth the trip.",
    name: "Priya, Norwich",
  },
  {
    quote:
      "A rare place. Held with intention, simplicity and real warmth.",
    name: "Tom, returning guest",
  },
];

function ReviewsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Reviews"
        title="Words from our guests."
        intro="A few of the kind notes left by people who have stayed."
      />
      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((r, i) => (
            <figure key={i} className="reveal border border-border p-8 md:p-10">
              <blockquote className="font-serif text-2xl md:text-3xl leading-snug text-foreground/95">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-xs uppercase tracking-[0.25em] text-accent">
                — {r.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
