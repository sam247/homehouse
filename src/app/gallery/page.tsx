import type { Metadata } from "next";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";

const photos = [
  { src: "/photos/garden-magnolia.webp", h: "tall" },
  { src: "/photos/table-orchard.webp", h: "short" },
  { src: "/photos/shed-bench.webp", h: "tall" },
  { src: "/photos/fields.webp", h: "short" },
  { src: "/photos/pond.webp", h: "tall" },
  { src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80", h: "short" },
  { src: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200&q=80", h: "tall" },
  { src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80", h: "short" },
  { src: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&q=80", h: "tall" },
  { src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&q=80", h: "short" },
];

export const metadata: Metadata = {
  title: "Gallery — Home House Homestead",
  description: "Images of the Norfolk farmhouse, gardens, fields and life at Home House Homestead.",
  openGraph: {
    title: "Gallery — Home House Homestead",
    description: "A glimpse of life at the homestead.",
    images: [photos[0].src],
    url: "/gallery",
  },
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Gallery"
        title="A glimpse of the homestead."
        intro="The house, the land, the table, and quiet corners in between."
      />
      <Band variant="cream">
        <Section>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {photos.map((p, i) => (
              <div
                key={i}
                className={`mb-4 break-inside-avoid overflow-hidden rounded-sm reveal ${
                  p.h === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"
                }`}
              >
                <img src={p.src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </Section>
      </Band>
    </PageShell>
  );
}
