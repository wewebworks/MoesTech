import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const paths = [
  "", "/managed-services", "/property-management", "/security-access-control", "/network-infrastructure",
  "/av-smart-buildings", "/projects", "/about", "/contact", "/portal-preview",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({
    url: `${SITE_URL}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : p === "/managed-services" ? 0.9 : 0.7,
  }));
}
