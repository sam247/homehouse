import type { Metadata } from "next";
import Link from "next/link";
import { Band, PageHero, PageShell, Section } from "@/components/PageShell";
import { Button } from "@/components/ui/button";

const IMG = {
  hero: "/photos/hearth1.webp",
};

export const metadata: Metadata = {
  title: "Community — Home House Homestead",
  description:
    "Community-based gatherings offered on a donation basis — to reconnect with nature, community and the heart.",
  openGraph: {
    title: "Community — Home House Homestead",
    description:
      "Simple gatherings to reconnect with nature, community and the heart. Sharing food, stories, hearts and souls.",
    images: [IMG.hero],
    url: "/community",
  },
  alternates: {
    canonical: "/community",
  },
};

export default function CommunityPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Community"
        title="The Home House Community Gatherings"
        intro="Simple gatherings to reconnect with nature, community and the heart. Sharing Food, Stories, Hearts and Souls."
        image={IMG.hero}
      />

      <Band variant="cream">
        <Section className="max-w-4xl">
          <div className="space-y-10 font-light leading-relaxed text-foreground/80">
            <div className="reveal space-y-4">
              <p>All gatherings are community-based and offered on a donation basis.</p>
              <p>
                Donations are never expected, but are gratefully received and contribute towards the ongoing
                maintenance, development and vision of Home House Homestead.
              </p>
            </div>

            <div className="reveal border border-border p-8 space-y-4">
              <h2 className="font-serif text-3xl text-foreground">Summer Solstice Gathering</h2>
              <p className="text-sm text-foreground/70">Sunday 21st June · 3pm onwards</p>
              <p>Families and children are welcome.</p>
              <p>Bring a dish to share and gather together at Home House Homestead on this day of light.</p>
              <p>Share food, stories, hearts and souls.</p>
              <p>
                Walk on the land and experience the beauty of this place. Connect with nature, yourself and one
                another.
              </p>
            </div>

            <div className="reveal border border-border p-8 space-y-4">
              <h2 className="font-serif text-3xl text-foreground">Fire Listening Circles</h2>
              <p className="text-sm text-foreground/70">Fourth Saturday of each month</p>
              <p className="text-sm text-foreground/70">Saturday 27th June · 6pm until late</p>
              <p>Gather around the fire and offer one another the gift of deep listening.</p>
              <p>
                Share what needs to be spoken aloud and witnessed into the fire and the heart of the circle. Speak
                from the heart, listen from the heart, and be held in community.
              </p>
              <p>Bring a dish to share.</p>
              <p>Discounted overnight stays are available.</p>
            </div>

            <div className="reveal border border-border p-8 space-y-5">
              <div className="space-y-2">
                <h2 className="font-serif text-3xl text-foreground">Women&apos;s Gatherings</h2>
                <p className="text-sm text-foreground/70">Last Sunday of each month · 11am – 4pm</p>
              </div>

              <div className="space-y-1 text-foreground/80">
                <p className="text-sm text-foreground/70">Dates</p>
                <p>Sunday 28th June — Home</p>
                <p>Sunday 26th July — Love</p>
                <p>No gathering in August</p>
                <p>Sunday 27th September — Peace</p>
                <p>Sunday 25th October — Seasons, cycles and rhythms</p>
              </div>

              <div className="space-y-4">
                <p>Bring a dish to share.</p>
                <p>A space for women to gather, connect and simply be.</p>
                <p>
                  Each gathering will explore a different theme and include a guided meditation and gentle practices
                  to help us arrive, settle and open the space together.
                </p>
              </div>
            </div>

            <div className="reveal border border-border p-8 space-y-5">
              <div className="space-y-2">
                <h2 className="font-serif text-3xl text-foreground">Volunteering Days at Home House Homestead</h2>
                <p>
                  For those who would like to spend time at Home House, contribute to the land and become part of the
                  growing community.
                </p>
              </div>

              <div className="space-y-1 text-foreground/80">
                <p className="text-sm text-foreground/70">Time</p>
                <p>10am – 5pm</p>
                <p>Lunch included (1pm – 2pm)</p>
              </div>

              <div className="space-y-1 text-foreground/80">
                <p className="text-sm text-foreground/70">Dates</p>
                <p>Wednesday 24th June</p>
                <p>Wednesday 8th July</p>
                <p>Wednesday 15th July</p>
                <p>Wednesday 29th July</p>
                <p>Wednesday 5th August</p>
                <p>Wednesday 19th August</p>
                <p>Wednesday 9th September</p>
                <p>Wednesday 23rd September</p>
                <p>Wednesday 7th October</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-foreground/70">Projects may include</p>
                <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                  <li>Gardening and growing food</li>
                  <li>Caring for the land</li>
                  <li>House and grounds maintenance</li>
                  <li>Seasonal homestead projects</li>
                </ul>
              </div>

              <div className="space-y-4">
                <p>Please contact Hawa Amanda to book your place.</p>
                <p>Discounted overnight stays are available.</p>
              </div>
            </div>

            <div className="reveal pt-2">
              <Button asChild variant="outline" className="rounded-none border-foreground/30 bg-transparent">
                <Link href="/contact">Contact to book</Link>
              </Button>
            </div>
          </div>
        </Section>
      </Band>
    </PageShell>
  );
}
