import type { SiteSettingsData } from "./types";
import { siteConfig } from "@/lib/seo";

export const defaultSiteSettingsData: SiteSettingsData = {
  siteName: siteConfig.name || "Arvishha Foundation",
  tagline: siteConfig.slogan || "विकास और सामाजिक कार्यों के लिए अग्रसर",
  homePage: null,
  homePageSlug: "home",
  logo: null,
  logoUrl: "/images/logo.png",
  favicon: null,
  faviconUrl: "/images/logo.png",
  contactEmail: siteConfig.contact.email || "arvishhafoundation@gmail.com",
  phone: siteConfig.contact.phone || "+91 95894 11413",
  address: "Baloda Bazar, Chhattisgarh, India - 493332",
  socialLinks: [
    {
      platform: "facebook",
      url: "https://facebook.com/arvishhafoundation",
    },
    {
      platform: "instagram",
      url: "https://instagram.com/arvishhafoundation",
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com/company/arvishhafoundation",
    },
    {
      platform: "youtube",
      url: "https://youtube.com/@arvishhafoundation",
    },
    {
      platform: "x",
      url: "https://x.com/arvishha03",
    },
  ],
  footerCopyright: `© ${new Date().getFullYear()} Arvishha Foundation. All Rights Reserved.`,
  maintenanceMode: false,
};
