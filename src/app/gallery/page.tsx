import type { Metadata } from "next";
import { readdirSync } from "node:fs";
import path from "node:path";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";

const localPhotos = [
  { src: "/photos/garden-magnolia.webp", h: "tall" },
  { src: "/photos/table-orchard.webp", h: "short" },
  { src: "/photos/shed-bench.webp", h: "tall" },
  { src: "/photos/fields.webp", h: "short" },
  { src: "/photos/pond.webp", h: "tall" },
];

const galleryDirectory = path.join(process.cwd(), "public/photos/gallery_Images");
const galleryPhotos = readdirSync(galleryDirectory)
  .filter((file) => /\.(jpe?g|png|webp|gif)$/i.test(file))
  .sort()
  .map((file, index) => ({
    src: `/photos/gallery_Images/${encodeURIComponent(file)}`,
    h: index % 3 === 0 ? "tall" : "short",
  }));

const photos = [...localPhotos, ...galleryPhotos];

export const metadata: Metadata = {
  title: {
    absolute: "Gallery — Home House Homestead",
  },
  description: "Images of the Norfolk farmhouse, gardens, fields and life at Home House Homestead.",
  openGraph: {
    title: "Gallery — Home House Homestead",
    description: "A glimpse of life at the homestead.",
    images: [photos[0].src],
    url: "/gallery",
  },
  alternates: { canonical: "/gallery" },
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
            {photos.map((photo, index) => (
              <div
                key={photo.src}
                className={`mb-4 break-inside-avoid overflow-hidden rounded-sm reveal ${
                  photo.h === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"
                }`}
              >
                <img
                  src={photo.src}
                  alt={`Home House Homestead gallery image ${index + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </Section>
      </Band>
    </PageShell>
  );
}
