import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { Page } from "@/payload-types";
import { draftMode } from "next/headers";

/**
 * Fetch a Page document by its slug from Payload CMS.
 * Automatically checks draft mode if request headers are available.
 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const payload = await getPayload({ config: configPromise });
    let isDraft = false;
    try {
      const draft = await draftMode();
      isDraft = draft.isEnabled;
    } catch {
      // In static generation or when request headers are not available
    }

    const result = await payload.find({
      collection: "pages",
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      depth: 2,
      draft: isDraft,
      overrideAccess: isDraft,
    });

    return (result.docs?.[0] as Page) || null;
  } catch (error) {
    console.error(`[getPageBySlug] Error fetching page for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetch all page slugs for static path generation.
 * Excludes "home" which is served at the root route "/".
 */
export async function getAllPageSlugs(): Promise<string[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "pages",
      limit: 1000,
      depth: 0,
      draft: false,
    });

    return result.docs
      .map((doc) => doc.slug)
      .filter((slug): slug is string => Boolean(slug) && slug !== "home");
  } catch (error) {
    console.error("[getAllPageSlugs] Error fetching slugs:", error);
    return [];
  }
}
