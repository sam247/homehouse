import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const tinaConfigured =
    Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID) && Boolean(process.env.TINA_TOKEN);

  if (!tinaConfigured && req.nextUrl.pathname === "/admin/index.html") {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/index.html"],
};

