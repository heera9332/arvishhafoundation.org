import { cache } from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { SiteSettingsData, MediaObject, SocialPlatform } from "./types";
import { defaultSiteSettingsData } from "./defaults";

let isSeededOrChecked = false;

interface RawSiteSettingsDoc {
  siteName?: string | null;
  tagline?: string | null;
  logo?: MediaObject | string | null;
  favicon?: MediaObject | string | null;
  contactEmail?: string | null;
  phone?: string | null;
  address?: string | null;
  socialLinks?: Array<{
    id?: string | null;
    platform: SocialPlatform;
    url: string;
  }> | null;
  footerCopyright?: string | null;
  maintenanceMode?: boolean | null;
}

function formatSiteSettings(raw?: RawSiteSettingsDoc | null): SiteSettingsData {
  if (!raw) return defaultSiteSettingsData;

  const logoUrl =
    typeof raw.logo === "object" && raw.logo && raw.logo.url
      ? raw.logo.url
      : defaultSiteSettingsData.logoUrl;

  const faviconUrl =
    typeof raw.favicon === "object" && raw.favicon && raw.favicon.url
      ? raw.favicon.url
      : defaultSiteSettingsData.faviconUrl;

  const socialLinks =
    Array.isArray(raw.socialLinks) && raw.socialLinks.length > 0
      ? raw.socialLinks.map((link) => ({
          id: link.id,
          platform: link.platform,
          url: link.url,
        }))
      : defaultSiteSettingsData.socialLinks;

  return {
    siteName: raw.siteName || defaultSiteSettingsData.siteName,
    tagline: raw.tagline || defaultSiteSettingsData.tagline,
    logo: typeof raw.logo === "object" ? raw.logo : null,
    logoUrl,
    favicon: typeof raw.favicon === "object" ? raw.favicon : null,
    faviconUrl,
    contactEmail: raw.contactEmail || defaultSiteSettingsData.contactEmail,
    phone: raw.phone || defaultSiteSettingsData.phone,
    address: raw.address || defaultSiteSettingsData.address,
    socialLinks,
    footerCopyright: raw.footerCopyright || defaultSiteSettingsData.footerCopyright,
    maintenanceMode: Boolean(raw.maintenanceMode),
  };
}

/**
 * Fetch Site Settings global from Payload CMS with safe auto-seeding,
 * resilient defaults, and React request-level caching.
 */
export const getSiteSettings = cache(async (): Promise<SiteSettingsData> => {
  try {
    const payload = await getPayload({ config: configPromise });

    const doc = (await (payload.findGlobal as any)({
      slug: "site-settings",
      depth: 1,
    })) as RawSiteSettingsDoc | null;

    const hasData = Boolean(
      doc &&
      doc.siteName &&
      doc.siteName !== "My Website" &&
      (doc.contactEmail || doc.phone || (doc.socialLinks && doc.socialLinks.length > 0))
    );

    if (!hasData && !isSeededOrChecked) {
      isSeededOrChecked = true;
      try {
        await (payload.updateGlobal as any)({
          slug: "site-settings",
          data: {
            siteName: defaultSiteSettingsData.siteName,
            tagline: defaultSiteSettingsData.tagline,
            contactEmail: defaultSiteSettingsData.contactEmail,
            phone: defaultSiteSettingsData.phone,
            address: defaultSiteSettingsData.address,
            socialLinks: defaultSiteSettingsData.socialLinks.map((s) => ({
              platform: s.platform,
              url: s.url,
            })),
            footerCopyright: defaultSiteSettingsData.footerCopyright,
            maintenanceMode: false,
          },
        });
      } catch (seedErr) {
        console.warn("[SiteSettings API] Auto-seeding skipped:", seedErr);
      }
      return defaultSiteSettingsData;
    }

    if (doc) {
      return formatSiteSettings(doc);
    }

    return defaultSiteSettingsData;
  } catch (error) {
    console.warn(
      "[SiteSettings API] CMS unavailable, using default site settings:",
      error
    );
    return defaultSiteSettingsData;
  }
});
