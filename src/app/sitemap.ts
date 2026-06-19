import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getSiteUrl } from "@/lib/siteUrl";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/stays",
  "/norfolk-holidays",
  "/retreats",
  "/retreats/womens-retreats-norfolk",
  "/retreats/solo-retreats-norfolk",
  "/retreats/private-retreats-norfolk",
  "/retreats/rest-retreats-norfolk",
  "/events-and-workshops",
  "/community",
  "/hearth-project",
  "/gallery",
  "/reviews",
  "/contact",
  "/blog",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route}`,
  }));

  const posts = await getAllPosts();
  const postEntries = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : undefined,
  }));

  return [...staticEntries, ...postEntries];
}
