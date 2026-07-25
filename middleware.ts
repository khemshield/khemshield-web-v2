import { NextResponse, type NextRequest } from "next/server";

import { STUDIO_COOKIE, isValidStudioSession } from "@/app/lib/studioAuth";

/**
 * Gate the temporary /studio admin pages behind the shared passphrase.
 *
 * The check also lives here, not only in the pages, so a new route added under
 * /studio is protected by default rather than by remembering to guard it.
 *
 * TEMPORARY: delete along with app/(studio).
 */
export const config = {
  matcher: ["/studio/:path*"],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // The login page has to stay reachable to anyone, or there is no way in.
  if (pathname === "/studio/login") return NextResponse.next();

  const authorised = await isValidStudioSession(
    request.cookies.get(STUDIO_COOKIE)?.value
  );

  if (authorised) return NextResponse.next();

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/studio/login";
  loginUrl.search = "";
  if (pathname !== "/studio") loginUrl.searchParams.set("next", pathname);

  return NextResponse.redirect(loginUrl);
};
