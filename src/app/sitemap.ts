import type { MetadataRoute } from "next";
import { cities } from "@/lib/cities";
import { services } from "@/lib/services";
import { blogPosts } from "@/lib/blog-posts";

const SITE_URL = "https://fixsepticnow.com";

// Real content creation dates — content doesn't change on every request,
// so we use static dates so Googlebot trusts our lastModified signals.
const CONTENT_LAUNCHED = "2025-11-15"; // site first went live
const CONTENT_UPDATED = "2026-04-30";  // Major CRO rework: hero rewrite, form simplification, trust signals, response times

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: CONTENT_LAUNCHED, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: CONTENT_LAUNCHED, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: CONTENT_LAUNCHED, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms-of-service`, lastModified: CONTENT_LAUNCHED, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/septic-pumping-wait-time`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.85 },
  ];

  // Service type pages (not city-specific)
  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: CONTENT_LAUNCHED,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // NEW: City hub pages with nested URL structure
  // /septic-services/[city]-tx/ -> Hub pages (high priority, crawl frequently)
  const cityHubPages: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${SITE_URL}/septic-services/${c.slug}-tx`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // NEW: Service detail pages (spokes) with nested URL structure
  // /septic-services/[city]-tx/[service] -> Individual service pages
  const serviceDetailPages: MetadataRoute.Sitemap = cities.flatMap((c) =>
    services.map((s) => ({
      url: `${SITE_URL}/septic-services/${c.slug}-tx/${s.slug}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }))
  );

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...servicePages, ...cityHubPages, ...serviceDetailPages];
}
