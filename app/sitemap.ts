import type { MetadataRoute } from "next";
import { blogPosts } from "./(main)/blog/posts";
import { courses } from "./(main)/training/courseData";
import { eventSlug } from "./(main)/event/eventSlug";

const BASE_URL = "https://www.khemshield.com";

/**
 * Sitemap for search engines. Lists every indexable route.
 * Placeholder/noindex pages (/project, /consultation, /request/new) are
 * intentionally excluded so they are not advertised for crawling.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: now, priority: 0.8 },
    { url: `${BASE_URL}/service`, lastModified: now, priority: 0.8 },
    { url: `${BASE_URL}/training`, lastModified: now, priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: now, priority: 0.7 },
    { url: `${BASE_URL}/event`, lastModified: now, priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: now, priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: now, priority: 0.6 },
    { url: `${BASE_URL}/request`, lastModified: now, priority: 0.6 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}${post.href}`,
    lastModified: new Date(post.date),
    priority: 0.6,
  }));

  const trainingRoutes: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${BASE_URL}/training/${course.slug}`,
    lastModified: now,
    priority: 0.7,
  }));

  const eventRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/event/${eventSlug}`, lastModified: now, priority: 0.6 },
    {
      url: `${BASE_URL}/event/${eventSlug}/register`,
      lastModified: now,
      priority: 0.5,
    },
  ];

  return [...staticRoutes, ...blogRoutes, ...trainingRoutes, ...eventRoutes];
}
