import { Star } from "lucide-react";

type Review = {
  name: string;
  location: string;
  avatar: string;
  text: string;
};

const REVIEWS: Review[] = [
  {
    name: "Eleanor M.",
    location: "London",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80",
    text: "A truly restorative weekend. The space, the food, the silence — everything held with such care.",
  },
  {
    name: "James R.",
    location: "Brighton",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80",
    text: "I arrived exhausted and left lighter than I have in years. The garden alone is worth the trip.",
  },
  {
    name: "Sofia A.",
    location: "Norwich",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80",
    text: "Warm, unpretentious and quietly beautiful. A homestead in the truest sense of the word.",
  },
  {
    name: "Daniel K.",
    location: "Cambridge",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80",
    text: "Hosted our small retreat here. Thoughtful, generous and exactly what our group needed.",
  },
  {
    name: "Hannah L.",
    location: "Bristol",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&q=80",
    text: "Birdsong, open fields and the kindest welcome. We are already planning our next stay.",
  },
  {
    name: "Marcus T.",
    location: "Edinburgh",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80",
    text: "Slow mornings, long walks, and time to think. A rare and gentle kind of hospitality.",
  },
  {
    name: "Priya S.",
    location: "Manchester",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&q=80",
    text: "It felt like coming home to a place I had never been. Every detail considered.",
  },
  {
    name: "Oliver B.",
    location: "Bath",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&q=80",
    text: "The kind of stay you remember. Quiet, beautiful and deeply nourishing.",
  },
];

function ReviewCard({ r }: { r: Review }) {
  return (
    <figure className="w-[320px] md:w-[380px] shrink-0 rounded-sm bg-[var(--cream)]/95 text-[var(--deep)] p-7 shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={r.avatar}
          alt={r.name}
          loading="lazy"
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <figcaption className="font-serif text-lg leading-tight">{r.name}</figcaption>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--clay)]">{r.location}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-1 text-[var(--clay)]" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-current" />
        ))}
      </div>
      <blockquote className="mt-4 text-sm font-light leading-relaxed text-[var(--deep)]/80">
        &ldquo;{r.text}&rdquo;
      </blockquote>
    </figure>
  );
}

export function Testimonials() {
  // Duplicate the list so the marquee loops seamlessly
  const loop = [...REVIEWS, ...REVIEWS];

  return (
    <section className="bg-background text-foreground py-24 md:py-32 overflow-hidden">
      <div className="text-center max-w-3xl mx-auto px-6">
        <p className="text-xs uppercase tracking-[0.4em] text-accent mb-6 reveal">
          Kind words
        </p>
        <h2 className="font-serif text-4xl md:text-5xl leading-tight reveal text-foreground">
          From guests who&rsquo;ve stayed with us.
        </h2>
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
