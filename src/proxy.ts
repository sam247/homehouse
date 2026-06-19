import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function getCanonicalUrl() {
  const siteUrl = process.env.SITE_URL;
  if (!siteUrl || process.env.NODE_ENV !== "production") return null;

  try {
    return new URL(siteUrl);
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const canonicalUrl = getCanonicalUrl();
  if (!canonicalUrl) return NextResponse.next();

  const forwardedHost = request.headers.get("x-forwarded-host");
  const hostHeader = request.headers.get("host");
  const requestHost = (forwardedHost ?? hostHeader ?? "").split(":")[0];
  const requestProtocol =
    request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");
  const canonicalProtocol = canonicalUrl.protocol.replace(":", "");

  if (!requestHost) return NextResponse.next();

  const shouldRedirect =
    requestHost !== canonicalUrl.hostname || requestProtocol !== canonicalProtocol;

  if (!shouldRedirect) return NextResponse.next();

  const target = request.nextUrl.clone();
  target.protocol = canonicalUrl.protocol;
  target.host = canonicalUrl.host;

  return NextResponse.redirect(target, 308);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)",
  ],
};
