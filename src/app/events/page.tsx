import type { Metadata } from "next";
import { PageShell, PageHero, Zigzag, Section } from "@/components/PageShell";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { Button } from "@/components/ui/button";

const IMG = {
  hero: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1600&q=80",
  workshop: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=80",
  retreat: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&q=80",
  yurt: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=1200&q=80",
};

export const metadata: Metadata = {
  title: "Retreats & Events — Home House Homestead",
  description:
    "Hire the homestead for retreats, workshops, community gatherings and events in the Norfolk countryside.",
  openGraph: {
    title: "Retreats & Events — Home House Homestead",
    description: "Hire the homestead for retreats, workshops and gatherings.",
    images: [IMG.hero],
    url: "/events",
  },
  alternates: {
    canonical: "/events",
  },
};

const formats = [
  {
    name: "Retreats",
    body: "Whole-house or shared retreats for small groups, with optional catering, sessions and meditation spaces.",
  },
  {
    name: "Workshops",
    body: "A bright, quiet space for teaching, movement, sound, writing and creative work.",
  },
  {
    name: "Gatherings",
    body: "Family celebrations, milestone moments, ceremonies and community days.",
  },
];

export default function EventsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Retreats & Events"
        title="A held space for what matters."
        intro="Hire the homestead for workshops, retreats, community gatherings and other events. The land, the rooms, and the rhythm hold the day for you."
        image={IMG.hero}
      />
      <Section>
        <div className="grid md:grid-cols-3 gap-8">
          {formats.map((f) => (
            <article key={f.name} className="reveal border border-border p-8">
              <h3 className="font-serif text-2xl mb-3">{f.name}</h3>
              <p className="text-foreground/75 font-light">{f.body}</p>
            </article>
          ))}
        </div>
      </Section>
      <Zigzag
        eyebrow="Workshops"
        title="A bright room for teaching."
        image={IMG.workshop}
        body={
          <p>
            Movement, sound, breath, writing — the spaces here invite focus and stillness. We
            help you set up the room as you need it.
          </p>
        }
      />
      <Zigzag
        reverse
        eyebrow="Retreats"
        title="The whole homestead, just for your group."
        image={IMG.retreat}
        body={
          <p>
            Take over the house and land for a few days. We can cater simple, organic meals
            from the garden, or step back entirely while you self-host.
          </p>
        }
      />
      <Zigzag
        eyebrow="Outdoor space"
        title="Yurt, fields and quiet corners."
        image={IMG.yurt}
        body={<p>For circle-work, ceremony, and time outside. Open fields, the herb garden, and sheltered nooks for small groups.</p>}
      />
      <Section className="text-center">
        <h2 className="font-serif text-4xl md:text-5xl reveal">Tell us what you’re planning.</h2>
        <p className="mt-6 text-foreground/75 font-light reveal max-w-xl mx-auto">
          We tailor the use of the homestead to your group, your intentions and your needs.
        </p>
        <div className="mt-10 reveal">
          <EnquiryDrawer
            trigger={
              <Button className="rounded-none bg-foreground text-background hover:bg-accent hover:text-accent-foreground h-12 px-8 font-light tracking-[0.18em] uppercase text-xs">
                Book now
              </Button>
            }
          />
        </div>
      </Section>
    </PageShell>
  );
}
