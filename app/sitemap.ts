import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://petabudaya-probolinggo.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    // Note: Section-based content (#peta, #cagar-budaya, #wbtb, #opk)
    // uses hash-based navigation on the single-page app and cannot be
    // indexed as separate sitemap entries by search engines.
    // Future: When detail pages are implemented, add each item's URL here.
  ];
}
