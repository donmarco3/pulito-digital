import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const BASE = "https://pulitodigital.com.au";

/**
 * Service routes come from `site.services`, the same single source the
 * nav, the showcase and the pages themselves read — a service added there
 * enters the sitemap without a second edit. Priorities follow the site's
 * own conversion order: the landing page, then the money pages, then the
 * studio pages, then the notice.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, priority: 1 },
    ...site.services.map((service) => ({
      url: `${BASE}/services/${service.slug}`,
      priority: 0.9,
    })),
    { url: `${BASE}/process`, priority: 0.8 },
    { url: `${BASE}/contact`, priority: 0.8 },
    { url: `${BASE}/about`, priority: 0.6 },
    { url: `${BASE}/privacy`, priority: 0.2 },
  ];
}
