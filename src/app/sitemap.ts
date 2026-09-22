import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/legal/politica-de-privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/legal/tratamiento-de-datos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/legal/terminos-y-condiciones`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
