import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// All 48 city slugs from src/lib/cities.ts
const citySlugs = [
  "conroe", "katy", "spring", "tomball", "magnolia", "cypress", "the-woodlands",
  "humble", "willis", "waller", "richmond", "fulshear", "hempstead",
  "dripping-springs", "liberty-hill", "georgetown", "bastrop", "wimberley",
  "buda", "kyle", "leander", "hutto", "taylor", "elgin", "smithville",
  "new-braunfels", "boerne", "seguin", "san-marcos",
  "waxahachie", "weatherford", "azle", "granbury", "cleburne", "corsicana",
  "terrell", "canton", "kaufman", "forney",
  "huntsville", "livingston", "lufkin", "nacogdoches", "palestine", "athens",
  "navasota", "brenham", "la-grange"
];

// All 7 service slugs from src/lib/services.ts
const serviceSlugs = [
  "septic-pumping",
  "septic-cleaning",
  "septic-repair",
  "emergency-septic-service",
  "septic-inspection",
  "septic-installation",
  "septic-maintenance"
];

// Build a Set for O(1) lookups
const citySet = new Set(citySlugs);
const serviceSet = new Set(serviceSlugs);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip if already using new structure or non-page paths
  if (
    pathname.startsWith("/septic-services/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/services/") ||
    pathname.startsWith("/blog/") ||
    pathname.startsWith("/images/") ||
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/contact" ||
    pathname === "/privacy-policy" ||
    pathname === "/terms-of-service" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Remove leading slash for parsing
  const slug = pathname.slice(1);

  // Check for city hub pages: /[city]-septic-services -> /septic-services/[city]-tx
  if (slug.endsWith("-septic-services")) {
    const citySlug = slug.replace("-septic-services", "");
    if (citySet.has(citySlug)) {
      const newUrl = new URL(`/septic-services/${citySlug}-tx`, request.url);
      return NextResponse.redirect(newUrl, 301);
    }
  }

  // Check for combo pages: /[city]-[service] -> /septic-services/[city]-tx/[service]
  for (const serviceSlug of serviceSlugs) {
    if (slug.endsWith(`-${serviceSlug}`)) {
      const citySlug = slug.replace(`-${serviceSlug}`, "");
      if (citySet.has(citySlug)) {
        const newUrl = new URL(`/septic-services/${citySlug}-tx/${serviceSlug}`, request.url);
        return NextResponse.redirect(newUrl, 301);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/).*)",
  ],
};
