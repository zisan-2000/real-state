import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n-config";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname has a supported locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Get preferred language from Accept-Language header or use default
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferredLanguage = acceptLanguage.split(",")[0].split("-")[0];

  // Check if preferred language is supported, otherwise use default
  const matchedLocale = i18n.locales.includes(preferredLanguage as any)
    ? preferredLanguage
    : i18n.defaultLocale;

  // Redirect to the appropriate locale
  return NextResponse.redirect(
    new URL(
      `/${matchedLocale}${
        pathname.startsWith("/") ? pathname : `/${pathname}`
      }`,
      request.url
    )
  );
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
