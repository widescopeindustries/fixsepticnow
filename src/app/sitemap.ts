import type { MetadataRoute } from "next";
import { cities } from "@/lib/cities";
import { services } from "@/lib/services";
import { blogPosts } from "@/lib/blog-posts";

const SITE_URL = "https://fixsepticnow.com";

// Real content creation dates — content doesn't change on every request,
// so we use static dates so Googlebot trusts our lastModified signals.
const CONTENT_LAUNCHED = "2025-11-15"; // site first went live
const CONTENT_UPDATED = "2026-02-21";  // last significant content update

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: CONTENT_UPDATED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: CONTENT_LAUNCHED, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: CONTENT_LAUNCHED, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: CONTENT_LAUNCHED, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms-of-service`, lastModified: CONTENT_LAUNCHED, changeFrequency: "yearly", priority: 0.2 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: CONTENT_LAUNCHED,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const cityPages: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${SITE_URL}/${c.slug}-septic-services`,
    lastModified: CONTENT_LAUNCHED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const comboPages: MetadataRoute.Sitemap = cities.flatMap((c) =>
    services.map((s) => ({
      url: `${SITE_URL}/${c.slug}-${s.slug}`,
      lastModified: CONTENT_LAUNCHED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...servicePages, ...cityPages, ...comboPages];
}
