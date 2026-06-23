import type { MetadataRoute } from "next";

const BASE_URL = "https://www.khemshield.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Thin/incomplete pages also carry a meta noindex; keeping them
      // crawlable lets engines see that directive and drop them cleanly.
      disallow: [],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
