import { cache } from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { SEOSettingsData, MediaObject, HeadTagItem } from "./types";
import { defaultSEOSettingsData } from "./defaults";

let isSeededOrChecked = false;

interface RawSEOSettingsDoc {
  defaultTitle?: string | null;
  titleTemplate?: string | null;
  defaultDescription?: string | null;
  defaultKeywords?: string | null;
  defaultImage?: MediaObject | string | null;
  siteUrl?: string | null;
  robots?: {
    index?: boolean | null;
    follow?: boolean | null;
    noarchive?: boolean | null;
  } | null;
  verification?: {
    google?: string | null;
    bing?: string | null;
  } | null;
  additionalHeadTags?: HeadTagItem[] | null;
}

function formatSEOSettings(raw?: RawSEOSettingsDoc | null): SEOSettingsData {
  if (!raw) return defaultSEOSettingsData;

  const defaultImageUrl =
    typeof raw.defaultImage === "object" && raw.defaultImage && raw.defaultImage.url
      ? raw.defaultImage.url
      : defaultSEOSettingsData.defaultImageUrl;

  const additionalHeadTags = Array.isArray(raw.additionalHeadTags)
    ? raw.additionalHeadTags
        .filter((tag) => Boolean(tag?.name && tag?.content))
        .map((tag) => ({
          id: tag.id,
          name: tag.name,
          content: tag.content,
        }))
    : defaultSEOSettingsData.additionalHeadTags;

  return {
    defaultTitle: raw.defaultTitle || defaultSEOSettingsData.defaultTitle,
    titleTemplate: raw.titleTemplate || defaultSEOSettingsData.titleTemplate,
    defaultDescription: raw.defaultDescription || defaultSEOSettingsData.defaultDescription,
    defaultKeywords: raw.defaultKeywords || defaultSEOSettingsData.defaultKeywords,
    defaultImage: typeof raw.defaultImage === "object" ? raw.defaultImage : null,
    defaultImageUrl,
    siteUrl: raw.siteUrl || defaultSEOSettingsData.siteUrl,
    robots: {
      index: raw.robots?.index !== false,
      follow: raw.robots?.follow !== false,
      noarchive: Boolean(raw.robots?.noarchive),
    },
    verification: {
      google: raw.verification?.google || "",
      bing: raw.verification?.bing || "",
    },
    additionalHeadTags,
  };
}

/**
 * Fetch SEO Settings global from Payload CMS with safe auto-seeding,
 * resilient defaults, and React request-level caching.
 */
export const getSEOSettings = cache(async (): Promise<SEOSettingsData> => {
  try {
    const payload = await getPayload({ config: configPromise });

    const doc = (await (payload.findGlobal as any)({
      slug: "seo-settings",
      depth: 1,
    })) as RawSEOSettingsDoc | null;

    const hasData = Boolean(
      doc &&
      doc.siteUrl &&
      doc.defaultTitle &&
      doc.defaultTitle !== "My Website"
    );

    if (!hasData && !isSeededOrChecked) {
      isSeededOrChecked = true;
      try {
        await (payload.updateGlobal as any)({
          slug: "seo-settings",
          data: {
            defaultTitle: defaultSEOSettingsData.defaultTitle,
            titleTemplate: defaultSEOSettingsData.titleTemplate,
            defaultDescription: defaultSEOSettingsData.defaultDescription,
            defaultKeywords: defaultSEOSettingsData.defaultKeywords,
            siteUrl: defaultSEOSettingsData.siteUrl,
            robots: defaultSEOSettingsData.robots,
            verification: defaultSEOSettingsData.verification,
            additionalHeadTags: defaultSEOSettingsData.additionalHeadTags,
          },
        });
      } catch (seedErr) {
        console.warn("[SEOSettings API] Auto-seeding skipped:", seedErr);
      }
      return defaultSEOSettingsData;
    }

    if (doc) {
      return formatSEOSettings(doc);
    }

    return defaultSEOSettingsData;
  } catch (error) {
    console.warn(
      "[SEOSettings API] CMS unavailable, using default SEO settings:",
      error
    );
    return defaultSEOSettingsData;
  }
});
