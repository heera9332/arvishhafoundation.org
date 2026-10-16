import type { SEOSettingsData } from "./types";
import { siteConfig } from "@/lib/seo";

export const defaultSEOSettingsData: SEOSettingsData = {
  defaultTitle: `${siteConfig.name} — ${siteConfig.slogan}`,
  titleTemplate: `%s | ${siteConfig.name}`,
  defaultDescription:
    siteConfig.description ||
    "Arvishha Foundation is a dedicated non-governmental organization working towards inclusive education, youth development, women empowerment, healthcare access, rights awareness, and community growth.",
  defaultKeywords:
    "Arvishha Foundation, NGO India, child education, women empowerment, rural healthcare, community welfare, Baloda Bazar NGO, Chhattisgarh social organization",
  defaultImage: null,
  defaultImageUrl: "/images/logo.png",
  siteUrl: siteConfig.url || "https://arvishhafoundation.org",
  robots: {
    index: true,
    follow: true,
    noarchive: false,
  },
  verification: {
    google: "",
    bing: "",
  },
  additionalHeadTags: [],
};
