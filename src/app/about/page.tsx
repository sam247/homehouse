import type { Metadata } from "next";
import { PageShell, PageHero, Zigzag, Section } from "@/components/PageShell";

const IMG = {
  hero: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80",
  hawa: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1200&q=80",
  land: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1600&q=80",
};

export const metadata: Metadata = {
  title: "About — Home House Homestead",
  description:
    "The story behind Home House Homestead: a Norfolk farmhouse dedicated to simple living, nourishment and quiet reconnection.",
  openGraph: {
    title: "About — Home House Homestead",
    description: "A Norfolk farmhouse dedicated to simple living, nourishment and reconnection.",
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
        title="A homestead rooted in care."
        intro="A character-filled 19th-century flint farmhouse in the Norfolk countryside, lovingly tended as a place of rest, nourishment and gentle living."
        image={IMG.hero}
      />
      <Zigzag
        eyebrow="Our hosts"
        title="Welcomed by Hawa Amanda."
        image={IMG.hawa}
        body={
          <>
            <p>
              Hawa Amanda welcomes guests with warmth, simplicity and care. Meals are cooked
              fresh from the homestead garden where possible, and the rhythm of the house
              follows the land.
            </p>
            <p>
              Whether you come to rest, to write, to walk, or to simply pause — you are held
              in a space that listens.
            </p>
          </>
        }
      />
      <Zigzag
        reverse
        eyebrow="The land"
        title="Living gently with the earth."
        image={IMG.land}
        body={
          <>
            <p>
              The homestead is moving slowly toward self-sufficiency: a small flock of
              chickens, vegetable beds, herb gardens, and open Norfolk fields beyond.
            </p>
            <p>Sustainability here is daily practice, not a slogan.</p>
          </>
        }
      />
      <Section className="text-center max-w-3xl">
        <p className="text-xs uppercase tracking-[0.4em] text-accent mb-6 reveal">
          Our intention
        </p>
        <h2 className="font-serif text-4xl md:text-5xl leading-tight reveal">
          To offer a quiet, nourishing space — for whoever needs it.
        </h2>
      </Section>
    </PageShell>
  );
}

