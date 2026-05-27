import type { Metadata } from "next";
import { PageShell, PageHero, Zigzag, Section } from "@/components/PageShell";

const IMG = {
  hero: "/about.webp",
  hawa: "/about.webp",
  land: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1600&q=80",
};

export const metadata: Metadata = {
  title: "About — Home House Homestead",
  description:
    "The story behind Home House Homestead — and the journey that led Hawa Amanda home to the Norfolk countryside, devotion, and a life of healing.",
  openGraph: {
    title: "About — Home House Homestead",
    description: "The journey behind Home House Homestead.",
    images: [IMG.hero],
    url: "/about",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About"
        title="A journey home."
        intro="A little about me, and the path that led to Home House — a place of simplicity, healing, and devotion in the Norfolk countryside."
        image={IMG.hero}
      />
      <div className="bg-[var(--cream)] text-[var(--deep)]">
        <Section className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--clay)] mb-6 reveal">
            My story
          </p>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight reveal">
            A life shaped by longing.
          </h2>
          <div className="mt-10 space-y-5 font-light leading-relaxed reveal text-[var(--deep)]/80">
            <p>Below is a little about me and my journey through life so far…</p>
            <p>My path has always been one of longing.</p>
            <p>A longing for love, for truth, and for something deeper than what the world could offer.</p>
          </div>
        </Section>
      </div>

      <div className="bg-background text-foreground">
        <Zigzag
          eyebrow="Early years"
          title="Breath, movement, and motherhood."
          image={IMG.hawa}
          body={
            <>
              <p>
                In my early twenties, whilst studying music at the University of East Anglia, I went to my first yoga class. Something in me recognised a different way of being. Through breath and movement, I began to feel a quiet connection within, something tender, something real.
              </p>
              <p>
                I became a mother at 23 to my beautiful daughter, and 6 years later to twin boys. Being a mother has been one of the greatest loves of my life, and for many years, my world was devoted solely to my family.
              </p>
              <p>Yet beneath it all, that deep longing remained.</p>
            </>
          }
        />
      </div>

      <div className="bg-[var(--cream)] text-[var(--deep)]">
        <Section className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--clay)] mb-6 reveal">
            Turning points
          </p>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight reveal">
            When what was buried begins to rise.
          </h2>
          <div className="mt-10 space-y-5 font-light leading-relaxed reveal text-[var(--deep)]/80">
            <p>
              In my search to fill it, I moved through years of seeking, at times in ways that were destructive. Addiction, disconnection, hedonism and a sense of inner emptiness became part of my experience, even whilst I continued to return, again and again, to my yoga practice.
            </p>
            <p>
              Everything began to change after a period of grief in my life when my step father died. What had been held beneath the surface for all my life til then began to rise, and I could no longer continue as I had been. This marked the beginning of a deeper journey into healing, awareness, and truth.
            </p>
            <p>
              Over the years that followed, I immersed myself in many forms of healing and practice. Yoga, bodywork, ceremony, sound, meditation and transformational work all became part of my path, not as a career, but as a sincere attempt to heal my own heart and life.
            </p>
          </div>
        </Section>
      </div>

      <div className="bg-background text-foreground">
        <Zigzag
          reverse
          eyebrow="Surrender"
          title="Brought to my knees, guided back to my voice."
          image={IMG.land}
          body={
            <>
              <p>
                A profound turning point came when my 17 year marriage ended. My world as I knew it fell apart, and I was brought to my knees and a place of deep surrender. Everything that I knew about myself broke, my identities shattered and survival strategies no longer effective. Through this, I was guided back to my voice, to song, and to a deeper and more intimate relationship with myself.
              </p>
              <p>
                It was during this time and an opening into the Shamanic medicine world that the spirit of Hummingbird came to me, symbolising the spirit of unconditional love, resilience, and the ability to find sweetness even in the most challenging moments. She has been a beautiful medicine for my heart and soul.
              </p>
            </>
          }
        />
      </div>

      <div className="bg-[var(--cream)] text-[var(--deep)]">
        <Section className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--clay)] mb-6 reveal">
            Home House
          </p>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight reveal">
            A new way of living begins to emerge.
          </h2>
          <div className="mt-10 space-y-5 font-light leading-relaxed reveal text-[var(--deep)]/80">
            <p>
              In 2020, as the pandemic hit the world, I was called into an even deeper surrender. A calling to leave my growing shamanic healing and coaching business, my life in the city, social media platform and to learn a new way of living and being in the world.
            </p>
            <p>
              I left behind the life I had been building, stepped away from the world as I knew it, and moved to Home House in the remote Norfolk countryside. It was here that a new way of living began to emerge, one rooted in simplicity, nature, and a deeper relationship with God.
            </p>
            <p>
              This period became one of profound healing, emptying and integration. Living close to the land, I began to experience a softening of the patterns and addictions that had once driven me, and a deepening connection to something far greater than myself.
            </p>
          </div>
        </Section>
      </div>

      <div className="bg-background text-foreground">
        <Section className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] text-accent mb-6 reveal">
            The path of the heart
          </p>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight reveal">
            Where longing found a home.
          </h2>
          <div className="mt-10 space-y-5 font-light leading-relaxed reveal text-foreground/80">
            <p>Over time, my path led me to Islam, and into Sufism, the path of the heart.</p>
            <p>Here, my longing found a home.</p>
            <p>
              Through devotion, prayer, and surrender, I began to experience a deepening relationship with the Divine, and a continued unfolding of healing, humility, and love.
            </p>
            <p>
              I was given the name Hawa, meaning Eve, the first woman, and mother of humanity.
            </p>
            <p>
              Walking the path of Sufism and studying Sufi Spiritual Healing at the Sufi University, me and my life has transformed beyond recognition. I am currently about to begin level 3 program to work towards my Masters of Divinity.
            </p>
            <p>
              Through Sufi healing, breath and bodywork, sacred sound, Holy Hijama Therapy and the spaces I hold at Home House Homestead, I offer what has been given to me…a space for others to heal, to soften, to release, and to return to themselves and to the Divine.
            </p>
          </div>
        </Section>
      </div>

      <div className="bg-[var(--cream)] text-[var(--deep)] border-t border-border">
        <Section className="text-center max-w-3xl">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--clay)] mb-6 reveal">
            An invitation
          </p>
          <div className="space-y-5 font-light leading-relaxed reveal text-[var(--deep)]/80">
            <p>From this place Divine Radiance begins to shine.</p>
            <p>This is an ongoing journey. One of surrender, of unlearning, and of remembering.</p>
            <p className="font-serif text-3xl text-[var(--deep)]">
              Be the empty cup.
            </p>
            <p>And it is an honour to walk alongside those who feel called.</p>
          </div>
        </Section>
      </div>
    </PageShell>
  );
}
