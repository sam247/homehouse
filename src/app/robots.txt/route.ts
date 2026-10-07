import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = false;

export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://homehouse.org.uk";

  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    "User-agent: *",
    "Disallow: /admin",
    "Disallow: /admin/",
    "Disallow: /amanda",
    "Disallow: /amanda/",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
