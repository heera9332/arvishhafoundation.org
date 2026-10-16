import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

const revalidatePagePaths = (slug?: string | null) => {
  if (!slug) return;
  const path = slug === "home" ? "/" : `/${slug}`;

  try {
    revalidatePath(path);
    if (slug !== "home") {
      revalidatePath(`/static/${slug}`);
    }
    // Revalidate root layout so global navigation, header, and footer stay fresh
    revalidatePath("/", "layout");
    revalidatePath("/sitemap.xml");
  } catch (err) {
    console.warn(`[revalidatePage] Warning revalidating paths for "${slug}":`, err);
  }
};

export const revalidatePage: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  if (req?.context?.disableRevalidate) return doc;

  if (doc?._status === "published") {
    revalidatePagePaths(doc?.slug);
  }

  if (previousDoc?._status === "published" && doc?._status !== "published") {
    revalidatePagePaths(previousDoc?.slug);
  }

  // If slug changed, revalidate the old slug path as well
  if (
    previousDoc?.slug &&
    doc?.slug &&
    previousDoc.slug !== doc.slug &&
    previousDoc?._status === "published"
  ) {
    revalidatePagePaths(previousDoc.slug);
  }

  return doc;
};

export const revalidateDeletePage: CollectionAfterDeleteHook = ({ doc, req }) => {
  if (req?.context?.disableRevalidate) return doc;
  if (!doc) return doc;

  revalidatePagePaths(doc?.slug);
  return doc;
};

export default revalidatePage;
