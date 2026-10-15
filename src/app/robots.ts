import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Demo deployments stay out of search indexes. Set NEXT_PUBLIC_ALLOW_INDEXING=true for production launch.
export default function robots(): MetadataRoute.Robots {
  const allow = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
  return {
    rules: allow ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
