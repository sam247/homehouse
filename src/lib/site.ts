export const SITE = {
  name: "Home House Homestead",
  tagline: "A peaceful, warm and welcoming guest house and homestead.",
  email: "info@homehouse.org.uk",
  location: "Norfolk, United Kingdom",
  // Client-supplied hero video
  heroVideo: "/garden-video-2.mp4",
  heroPoster: "/photos/garden-magnolia.webp",
};

export const PHOTOS = {
  magnolia: "/photos/garden-magnolia.webp",
  table: "/photos/table-orchard.webp",
  shed: "/photos/shed-bench.webp",
  fields: "/photos/fields.webp",
  pond: "/photos/pond.webp",
};

/** Full explore list for the footer. */
export const NAV = [
  { to: "/about", label: "About" },
  { to: "/stays", label: "Accommodation" },
  { to: "/womens-retreats", label: "Women's Retreats" },
  { to: "/retreat-venues", label: "Retreat Venues" },
  { to: "/sufi-muslim-retreats", label: "Sufi Muslim Retreats" },
  { to: "/therapies", label: "Therapies" },
  { to: "/community", label: "Community" },
  { to: "/hearth-project", label: "Hearth Project" },
  { to: "/reviews", label: "Reviews" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

/** Primary header destinations (Book Now stays as a CTA, not a nav link). */
export const HEADER_NAV = [
  { to: "/about", label: "About" },
  { to: "/stays", label: "Accommodation" },
  { to: "/womens-retreats", label: "Women's Retreats" },
  { to: "/retreat-venues", label: "Retreat Venues" },
  { to: "/sufi-muslim-retreats", label: "Sufi Muslim Retreats" },
  { to: "/therapies", label: "Therapies" },
] as const;
