import type { Metadata } from "next";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { EnquiryForm } from "@/components/EnquiryDrawer";
import { SITE } from "@/lib/site";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Home House Homestead",
  description: "Get in touch with Home House Homestead in Norfolk. Book a stay or ask about retreats and events.",
  openGraph: {
    title: "Contact — Home House Homestead",
    description: "Book a stay or ask about retreats and events.",
    url: "/contact",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Get in touch."
        intro="Tell us what you have in mind. We reply personally — usually within a day."
      />
      <Section>
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <div className="reveal space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Email</p>
              <a
                href={`mailto:${SITE.email}`}
                className="font-serif text-2xl flex items-center gap-3 hover:text-accent transition-colors"
              >
                <Mail size={20} />
                {SITE.email}
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Where to find us</p>
              <p className="font-serif text-2xl flex items-center gap-3">
                <MapPin size={20} />
                {SITE.location}
              </p>
              <p className="mt-3 text-foreground/70 font-light">
                Full address shared once your stay is confirmed.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Reply times</p>
              <p className="font-light text-foreground/80">
                We reply personally, usually within 24 hours. The homestead runs at a slower
                rhythm — thank you for your patience.
              </p>
            </div>
          </div>
          <div className="reveal border border-border p-8">
            <h2 className="font-serif text-3xl mb-2">Book now</h2>
            <p className="text-foreground/70 text-sm mb-4">Send a short note and we’ll reply personally.</p>
            <EnquiryForm compact />
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
