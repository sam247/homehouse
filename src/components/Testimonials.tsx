import { Star } from "lucide-react";
import { GOOGLE_REVIEWS_URL, REVIEWS, type Review } from "@/lib/reviews";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase();
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <figure className="w-[320px] md:w-[380px] shrink-0 rounded-sm bg-[var(--cream)]/95 text-[var(--deep)] p-7 shadow-sm">
      <div className="flex items-center gap-4">
        <div
          className="h-12 w-12 rounded-full bg-[var(--deep)]/10 flex items-center justify-center font-serif text-sm"
          aria-hidden
        >
          {getInitials(r.name)}
        </div>
        <div>
          <figcaption className="font-serif text-lg leading-tight">{r.name}</figcaption>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--clay)]">{r.meta}</p>
        </div>
      </div>
      <div
        className="mt-4 flex gap-1 text-[var(--clay)]"
        aria-label={`${r.rating} out of 5 stars`}
      >
        {Array.from({ length: r.rating }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-current" />
        ))}
      </div>
      <blockquote className="mt-4 text-sm font-light leading-relaxed text-[var(--deep)]/80">
        &ldquo;{r.text}&rdquo;
      </blockquote>
    </figure>
  );
}

export function Testimonials({ headingTag = "h2" }: { headingTag?: "h2" | "h3" }) {
  // Duplicate the list so the marquee loops seamlessly
  const loop = [...REVIEWS, ...REVIEWS];
  const Heading = headingTag;

  return (
    <section className="bg-background text-foreground py-24 md:py-32 overflow-hidden">
      <div className="text-center max-w-3xl mx-auto px-6">
        <p className="text-xs uppercase tracking-[0.4em] text-accent mb-6 reveal">
          Kind words
        </p>
        <Heading className="font-serif text-4xl md:text-5xl leading-tight reveal text-foreground">
          From guests who&rsquo;ve stayed with us.
        </Heading>
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block text-sm text-accent hover:underline font-light reveal"
        >
          View on Google
        </a>
      </div>

      <div
        className="relative mt-16 group"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused]">
          {loop.map((r, i) => (
            <ReviewCard key={`${r.name}-${i}`} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
