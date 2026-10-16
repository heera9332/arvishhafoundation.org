import type { MetadataRoute } from "next";
import { getSEOSettings } from "@/global/seo-settings";
import { siteConfig } from "@/lib/seo";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const seo = await getSEOSettings();
  const siteUrl = (seo.siteUrl || siteConfig.url).replace(/\/+$/, "");

  const allow = seo.robots.index ? "/" : undefined;
  const disallow = seo.robots.index
    ? ["/api/", "/maintenance", "/admin/"]
    : ["/"];

  return {
    rules: [
      {
        userAgent: "*",
        allow,
        disallow,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
