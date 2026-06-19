import type { Metadata } from "next";
import { PageShell, PageHero, Zigzag, Section } from "@/components/PageShell";

const IMG = {
  hero: "/author.webp",
  hawa: "/author.webp",
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
              From the outside, my life appeared full and blessed. Yet beneath the busyness, the friendships, and the experiences, my soul was quietly longing for something deeper—something that could not be found in the world alone.
            </p>
            <p>
              Everything began to change after a period of grief in my life when my step father died. What had been held beneath the surface for all my life til then began to rise, and I could no longer continue as I had been. This marked the beginning of a deeper journey into healing, awareness, and truth.
            </p>
            <p>
              Over the years that followed, I immersed myself in many forms of healing and practice. Yoga, breath work, bodywork, ceremony, sound, meditation and transformational work all became part of my path, not as a career, but as a sincere attempt to heal my own heart and life.
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
        <Section className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--clay)] mb-6 reveal">
            Home House Homestead vision and mission
          </p>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight reveal">
            What Home House is here to hold.
          </h2>
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--clay)] mb-4">Vision</p>
              <div className="space-y-5 font-light leading-relaxed text-[var(--deep)]/80">
                <p>
                  My vision is to cultivate Home House Homestead as a living sanctuary where people can slow down,
                  reconnect with themselves, one another, nature, and the Divine, and remember who they truly are
                  beneath the noise and demands of modern life.
                </p>
                <p>
                  I envision a place where healing, belonging, community, stewardship, learning, and devotion naturally
                  arise through meaningful relationships with the land, with each other, and with God. A place where
                  people gather around fires, share food and stories, work with the rhythms of nature, and experience
                  the sacred woven through everyday life.
                </p>
                <p>
                  Through retreats, healing experiences, community gatherings, and The Hearth Project, I seek to support
                  people of all ages in discovering deeper connection, purpose, wellbeing, and authentic expression. I
                  envision Home House becoming a thriving centre for healing, education, regeneration, sustainable
                  living and community, supported by a dedicated team and rooted in love, service, and stewardship.
                </p>
                <p>
                  My vision is to create a legacy that continues long after I am gone. A place where future generations
                  can come to learn, heal, grow, belong, and remember their connection to the Creator, to the natural
                  world, and to one another.
                </p>
                <p>
                  Above all, I envision Home House as a place of remembrance: a sanctuary where people come home to
                  themselves, and in doing so, come home to God.
                </p>
              </div>
            </div>

            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--clay)] mb-4">Mission</p>
              <div className="space-y-5 font-light leading-relaxed text-[var(--deep)]/80">
                <p>
                  My mission is to create spaces where people can slow down, reconnect with themselves, nature,
                  community, and the Divine, and remember who they truly are beneath the noise, expectations, and
                  busyness of modern life.
                </p>
                <p>
                  Through healing, retreats, workshops, programs, mentoring, community gatherings, and connection to the
                  land, I support people in returning to their hearts, trusting their inner guidance, and living in
                  greater alignment with their authentic nature and purpose.
                </p>
                <p>
                  I believe healing happens naturally when people feel safe, seen, connected, and supported. Rather than
                  fixing people, I create environments where remembrance, belonging, and transformation can emerge
                  organically through relationship with self, others, nature, and God.
                </p>
                <p>
                  I stand for community, stewardship, devotion, and sacred living. My intention is to leave a legacy of
                  places, experiences, and communities where future generations can reconnect with what truly matters
                  and remember their place within the greater web of life.
                </p>
                <p>
                  My mission is to create spaces of healing, belonging, and remembrance where people can reconnect with
                  themselves, nature, community, and the Divine, and return to the truth of who they are.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>

      <div className="bg-background text-foreground border-t border-border">
        <Section>
          <div className="max-w-3xl reveal">
            <p className="text-xs uppercase tracking-[0.4em] text-accent mb-6">My top three values</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Devotion, belonging, and stewardship.</h2>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-3 items-start">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.35em] text-foreground/60">01</p>
              <h3 className="mt-3 font-serif text-2xl leading-tight">Devotion</h3>
              <div className="mt-6 space-y-4 font-light leading-relaxed text-foreground/80">
                <p>
                  I value living in a conscious relationship with Allah and the sacredness of life. I desire for every
                  aspect of my life and work to be an expression of prayer, presence, gratitude, and service.
                </p>
                <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">How my vision aligns</p>
                <p>
                  Home House Homestead is rooted in creating spaces where people can reconnect with themselves, nature,
                  and the Divine. Through retreats, healing, community, and time on the land, I aim to support people
                  in remembering the sacredness of life and their connection to something greater than themselves.
                </p>
              </div>
            </div>

            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.35em] text-foreground/60">02</p>
              <h3 className="mt-3 font-serif text-2xl leading-tight">Belonging</h3>
              <div className="mt-6 space-y-4 font-light leading-relaxed text-foreground/80">
                <p>
                  I value authentic connection, community, love, and the experience of being truly seen, heard, and
                  accepted. I believe healing can naturally occur when people feel safe enough to be themselves and
                  connected enough to know they belong.
                </p>
                <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">How my vision aligns</p>
                <p>
                  Home House exists to bring people together around shared meals, stories, community gatherings,
                  retreats, and meaningful experiences. My vision is to create a place where people feel welcomed,
                  supported, connected, and part of something larger than themselves.
                </p>
              </div>
            </div>

            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.35em] text-foreground/60">03</p>
              <h3 className="mt-3 font-serif text-2xl leading-tight">Stewardship</h3>
              <div className="mt-6 space-y-4 font-light leading-relaxed text-foreground/80">
                <p>
                  I value caring for people, land, resources, and life with responsibility, respect, and love. I
                  believe we are all guardians of what has been entrusted to us by God and that our role is to nurture
                  and protect what supports future generations.
                </p>
                <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">How my vision aligns</p>
                <p>
                  Home House Homestead is not simply a business but a living sanctuary. Through caring for the land,
                  supporting healing, developing the Hearth Project, and building a sustainable legacy, I hope to create
                  something that serves people long after I am gone.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>

      <div className="bg-[var(--cream)] text-[var(--deep)] border-t border-border">
        <Section className="text-center max-w-3xl">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--clay)] mb-6 reveal">
            An invitation
          </p>
          <div className="space-y-5 font-light leading-relaxed reveal text-[var(--deep)]/80">
            <p>From this place, Divine Radiance begins to shine.</p>
            <p>This is an ongoing journey. one of surrender, unlearning, and remembering.</p>
            <p className="font-serif text-3xl text-[var(--deep)]">
              Be the empty cup.
            </p>
            <p>A journey of returning home to the heart, where the Divine has always been waiting.</p>
            <p>Remembering that true home lives within the heart.</p>
            <p>And it is an honour to walk alongside those who feel called.</p>
          </div>
        </Section>
      </div>
    </PageShell>
  );
}
