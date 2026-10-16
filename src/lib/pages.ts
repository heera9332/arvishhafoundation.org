import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { Page } from "@/payload-types";
import { draftMode } from "next/headers";
import { getSiteSettings } from "@/global/site-settings";

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
 * Fetch a Page document by its ID from Payload CMS.
 * Automatically checks draft mode if request headers are available.
 */
export async function getPageById(id: string): Promise<Page | null> {
  try {
    const payload = await getPayload({ config: configPromise });
    let isDraft = false;
    try {
      const draft = await draftMode();
      isDraft = draft.isEnabled;
    } catch {
      // In static generation or when request headers are not available
    }

    const doc = await payload.findByID({
      collection: "pages",
      id,
      depth: 2,
      draft: isDraft,
      overrideAccess: isDraft,
    });

    return (doc as Page) || null;
  } catch (error) {
    console.error(`[getPageById] Error fetching page for id "${id}":`, error);
    return null;
  }
}

/**
 * Returns the slug of the currently configured home page.
 * Defaults to "home" if unset or unresolvable.
 */
export async function getHomePageSlug(): Promise<string> {
  try {
    const settings = await getSiteSettings();
    if (settings.homePage) {
      if (
        typeof settings.homePage === "object" &&
        settings.homePage !== null &&
        "slug" in settings.homePage
      ) {
        const slug = (settings.homePage as { slug?: string }).slug;
        if (slug) return slug;
      }

      const id =
        typeof settings.homePage === "object" && settings.homePage !== null
          ? (settings.homePage as { id: string }).id
          : typeof settings.homePage === "string"
            ? settings.homePage
            : null;

      if (id) {
        const page = await getPageById(id);
        if (page?.slug) return page.slug;
      }
    }

    if (settings.homePageSlug) {
      return settings.homePageSlug;
    }
  } catch {
    // fallback
  }

  return "home";
}

/**
 * Fetch the active home page dynamically based on Site Settings.
 * If a custom page is selected in Site Settings, it fetches and returns that page.
 * Otherwise, falls back to the page with slug "home".
 */
export async function getHomePage(): Promise<Page | null> {
  try {
    const settings = await getSiteSettings();

    if (settings.homePage) {
      if (
        typeof settings.homePage === "object" &&
        settings.homePage !== null &&
        "layout" in settings.homePage &&
        Array.isArray((settings.homePage as Page).layout)
      ) {
        return settings.homePage as Page;
      }

      const id =
        typeof settings.homePage === "object" && settings.homePage !== null
          ? (settings.homePage as { id: string }).id
          : typeof settings.homePage === "string"
            ? settings.homePage
            : null;

      if (id) {
        const page = await getPageById(id);
        if (page) return page;
      }
    }
  } catch (err) {
    console.error("[getHomePage] Error resolving home page from site settings:", err);
  }

  return getPageBySlug("home");
}

/**
 * Fetch all page slugs for static path generation.
 * Excludes "home" and the dynamic home page slug which are served at the root route "/".
 */
export async function getAllPageSlugs(): Promise<string[]> {
  try {
    const [payload, homeSlug] = await Promise.all([
      getPayload({ config: configPromise }),
      getHomePageSlug(),
    ]);

    const result = await payload.find({
      collection: "pages",
      limit: 1000,
      depth: 0,
      draft: false,
    });

    return result.docs
      .map((doc) => doc.slug)
      .filter(
        (slug): slug is string =>
          Boolean(slug) && slug !== "home" && slug !== homeSlug
      );
  } catch (error) {
    console.error("[getAllPageSlugs] Error fetching slugs:", error);
    return [];
  }
}

