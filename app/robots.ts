import type { MetadataRoute } from "next";

/** Everything is crawlable — the owner chose to build this branch
 *  launch-ready and indexable. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://pulitodigital.com.au/sitemap.xml",
  };
}
