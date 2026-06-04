export const SITE = {
  name: "Home House Homestead",
  tagline: "A peaceful, warm and welcoming guest house and homestead.",
  email: "info@homehouse.org.uk",
  location: "Norfolk, United Kingdom",
  // Client-supplied hero video
  heroVideo: "/hero.mp4",
  heroPoster: "/photos/garden-magnolia.webp",
};

export const PHOTOS = {
  magnolia: "/photos/garden-magnolia.webp",
  table: "/photos/table-orchard.webp",
  shed: "/photos/shed-bench.webp",
  fields: "/photos/fields.webp",
  pond: "/photos/pond.webp",
};

export const NAV = [
  { to: "/about", label: "About" },
  { to: "/stays", label: "Stays" },
  { to: "/events-and-workshops", label: "Events & Workshops" },
  { to: "/hearth-project", label: "Hearth Project" },
  { to: "/reviews", label: "Reviews" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export const HEADER_NAV = NAV.filter(
  (n) => n.to !== "/blog" && n.to !== "/gallery" && n.to !== "/contact",
);
