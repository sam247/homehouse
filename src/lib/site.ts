export const SITE = {
  name: "Home House Homestead",
  tagline: "A peaceful, warm and welcoming guest house and homestead.",
  email: "info@homehouse.org.uk",
  location: "Norfolk, United Kingdom",
  // Client-supplied hero video
  heroVideo: "/garden-video-2.mp4",
  // First-frame still for the hero video, so something paints before the video
  // decodes. Deliberately separate from heroPoster, which is the social card image.
  heroVideoPoster: "/photos/hero-poster.webp",
  heroPoster: "/photos/garden-magnolia.webp",
};

export const PHOTOS = {
  magnolia: "/photos/garden-magnolia.webp",
  table: "/photos/table-orchard.webp",
  shed: "/photos/shed-bench.webp",
  fields: "/photos/fields.webp",
  pond: "/photos/pond.webp",
};

/** Footer "Explore" column links. Duplicate destinations that appear in the
 *  adjacent "Retreats" column (Accommodation, Women's Retreats, Muslim Retreat
 *  Venue, Sufi Retreats, Spiritual Healing, Contact) are omitted so the two columns
 *  stay at the same height — six links apiece. */
export const NAV = [
  { to: "/about", label: "About" },
  { to: "/community", label: "Community" },
  { to: "/hearth-project", label: "Hearth Project" },
  { to: "/reviews", label: "Reviews" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Blog" },
] as const;

/** Primary header destinations (Book Now stays as a CTA, not a nav link). */
export const HEADER_NAV = [
  { to: "/about", label: "About" },
  { to: "/stays", label: "Accommodation" },
  { to: "/womens-retreats", label: "Women's Retreats" },
  { to: "/muslim-retreat-venues", label: "Muslim Retreat Venue" },
  { to: "/sufi-muslim-retreats", label: "Sufi Retreats" },
  { to: "/spiritual-healing", label: "Spiritual Healing" },
] as const;
