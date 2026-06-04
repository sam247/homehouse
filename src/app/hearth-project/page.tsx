import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Band, PageHero, PageShell, Section } from "@/components/PageShell";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { Button } from "@/components/ui/button";

const IMG = {
  hero: "/photos/hearth2.webp",
  hearth1: "/photos/hearth1.webp",
  hearth3: "/photos/hearth3.webp",
};

export const metadata: Metadata = {
  title: "The Hearth Project — Home House Homestead",
  description:
    "Nature-based ‘Just Be’ weekends at Home House Homestead for young adults aged 18–25 seeking grounding, connection, purpose and community.",
  openGraph: {
    title: "The Hearth Project — Home House Homestead",
    description:
      "Nature-based ‘Just Be’ weekends at Home House Homestead for young adults aged 18–25 seeking grounding, connection, purpose and community.",
    images: [IMG.hero],
    url: "/hearth-project",
  },
  alternates: {
    canonical: "/hearth-project",
  },
};

const rootedIn = [
  "Community",
  "Simplicity",
  "Creativity",
  "Shared meals",
  "Meaningful contribution",
  "Nature connection",
  "Rest and reflection",
];

const togetherWe = [
  "Help on the land and in the garden",
  "Cook and eat together",
  "Spend time in nature",
  "Create and make music",
  "Share stories organically",
  "Work on small practical projects",
  "Slow down and reconnect",
];

const weekendMayInclude = [
  "Shared meals around the table",
  "Gardening and nature connection",
  "Creative projects",
  "Music and singing",
  "Fire circles",
  "Time with animals",
  "Gentle conversation and reflection",
  "Quiet rest and spaciousness",
  "Practical hands-on projects around Home House",
  "Digital detox and slowing down",
];

const forYoungAdultsWho = [
  "Feel overwhelmed or disconnected",
  "Struggle with unhealthy habits or addictive patterns",
  "Spend too much time online or on screens",
  "Feel anxious, isolated or lost in modern life",
  "Are searching for meaning, direction or belonging",
  "Long for a slower and more grounded way of living",
];

export default function HearthProjectPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="The Hearth Project"
        title="A space to slow down, reconnect, and remember you belong."
        intro="Nature-based ‘Just Be’ weekends for young adults (18–25), held at Home House Homestead in the Norfolk countryside."
        image={IMG.hero}
      />

      <Band variant="cream">
        <Section>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="reveal space-y-5 font-light leading-relaxed text-foreground/80">
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Nature-based weekends (18–25)</p>
              <p>
                Nature-based weekends at Home House Homestead for young adults aged 18–25 seeking grounding,
                connection, purpose and community.
              </p>
              <p>
                Modern life is leaving many young people overwhelmed, disconnected and searching for meaning.
              </p>
              <p>
                The Hearth Project was created as a gentle and supportive space for young adults who may be
                struggling with anxiety, depression, unhealthy habits, isolation, screen dependency, overwhelm or a
                lack of belonging.
              </p>
              <p>
                A place to step away from constant stimulation and reconnect with a slower, more human way of living.
              </p>
              <div className="pt-2 space-y-1 text-foreground/80">
                <p>No pressure.</p>
                <p>No fixing.</p>
                <p>No pretending.</p>
              </div>
              <p>Just space to breathe, contribute, connect and be.</p>
              <p className="text-sm text-foreground/70">
                Looking for women’s retreats instead? Explore{" "}
                <Link href="/events-and-workshops" className="text-accent hover:underline">
                  Events & Workshops
                </Link>
                .
              </p>
            </div>

            <div className="reveal">
              <div className="aspect-[4/5] overflow-hidden rounded-sm relative">
                <Image
                  src={IMG.hearth1}
                  alt="Young adults gathered around the hearth"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Section>
      </Band>

      <Band className="border-t border-border">
        <Section>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="reveal space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">What is The Hearth Project?</p>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight">Small weekends, rooted in what’s real.</h2>
              </div>
              <p className="text-foreground/80 font-light leading-relaxed">
                The Hearth Project offers small, nature-based weekends rooted in:
              </p>
              <ul className="grid gap-3">
                {rootedIn.map((i) => (
                  <li key={i} className="border-b border-border pb-3 text-foreground/85 font-light">
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal space-y-6">
              <p className="text-foreground/80 font-light leading-relaxed">Together we:</p>
              <ul className="grid gap-3">
                {togetherWe.map((i) => (
                  <li key={i} className="border-b border-border pb-3 text-foreground/85 font-light">
                    {i}
                  </li>
                ))}
              </ul>
              <p className="text-foreground/75 font-light leading-relaxed">
                The weekends are intentionally small and personal, creating space for genuine connection and support.
              </p>
            </div>
          </div>
        </Section>
      </Band>

      <Band variant="cream" className="border-t border-border">
        <Section>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="reveal space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">What the weekend may include</p>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight">Everything is invitational.</h2>
              </div>
              <p className="text-foreground/80 font-light leading-relaxed">
                There is no pressure to share, perform or participate in anything that does not feel right for you.
              </p>
              <ul className="grid gap-3">
                {weekendMayInclude.map((i) => (
                  <li key={i} className="border-b border-border pb-3 text-foreground/85 font-light">
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal">
              <div className="aspect-[16/10] overflow-hidden rounded-sm relative">
                <Image
                  src={IMG.hearth3}
                  alt="Home House hearth and fireside space"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Section>
      </Band>

      <Band className="border-t border-border">
        <Section>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="reveal space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Who is this for?</p>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight">You don’t need to have it all together.</h2>
              </div>
              <ul className="grid gap-3">
                {forYoungAdultsWho.map((i) => (
                  <li key={i} className="border-b border-border pb-3 text-foreground/85 font-light">
                    {i}
                  </li>
                ))}
              </ul>
              <p className="text-foreground/80 font-light leading-relaxed">
                You do not need to “have it all together” to come.
              </p>
            </div>

            <div className="reveal space-y-8">
              <div className="border border-border p-8">
                <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">July pilot weekend</p>
                <div className="space-y-4 text-foreground/80 font-light leading-relaxed">
                  <p>We are currently preparing for our first pilot weekend in July 2026.</p>
                  <p>
                    This first weekend is being offered as a supported pilot programme while we begin developing the
                    project and exploring how these spaces can support young adults in meaningful and grounded ways.
                  </p>
                  <p>Places are limited to a small group.</p>
                  <p className="text-sm text-foreground/70">
                    A reduced contribution rate will help support meals, accommodation, materials and running costs. If
                    finances are a genuine barrier, please let us know in your application.
                  </p>
                  <p className="text-sm text-foreground/70">
                    All participants will complete a simple application process before being offered a place.
                  </p>
                </div>
              </div>

              <div className="border border-border p-8">
                <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Important information</p>
                <div className="space-y-4 text-foreground/80 font-light leading-relaxed">
                  <p>
                    The Hearth Project is a wellbeing and community-based initiative and is not a therapy or
                    rehabilitation programme.
                  </p>
                  <p className="text-sm text-foreground/70">
                    Unfortunately, the weekends are not suitable for individuals currently experiencing severe
                    addiction, active crisis, psychosis, violent behaviour, or conditions requiring clinical mental
                    health support.
                  </p>
                  <p className="text-sm text-foreground/70">Participants must be aged 18–25.</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </Band>

      <Band variant="cream" className="border-t border-border">
        <Section className="text-center">
          <h2 className="font-serif text-4xl md:text-5xl reveal">Register your interest</h2>
          <div className="mt-6 space-y-4 text-foreground/80 font-light reveal max-w-3xl mx-auto leading-relaxed">
            <p>Sometimes healing begins simply by being welcomed into a different way of living.</p>
            <p>A slower rhythm. A shared meal. Soil on your hands. Music around a fire. Being seen without judgement.</p>
            <p>Remembering you belong.</p>
          </div>
          <div className="mt-10 reveal flex justify-center">
            <Button
              asChild
              className="rounded-none bg-foreground text-background hover:bg-accent hover:text-accent-foreground h-12 px-8 font-light tracking-[0.18em] uppercase text-xs"
            >
              <TrackedAnchor
                href="https://docs.google.com/forms/d/e/1FAIpQLSetZLZY5xHbbdRFC4HgzwZqxMUTnjZ0m85UVvCzQkA520N0_Q/viewform"
                target="_blank"
                rel="noreferrer"
                event="outbound_click"
                params={{ destination: "hearth_interest_form" }}
              >
                Register interest
              </TrackedAnchor>
            </Button>
          </div>
        </Section>
      </Band>
    </PageShell>
  );
}

