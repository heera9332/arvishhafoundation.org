import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

const revalidatePostPaths = (item?: Record<string, unknown> | null) => {
  if (!item) return;
  const postType = item.postType === "projects" ? "projects" : "news";
  const slug = (item.slug as string) || "";

  try {
    revalidatePath(`/${postType}`);
    revalidatePath(`/static/${postType}`);
    if (slug) {
      revalidatePath(`/${postType}/${slug}`);
      revalidatePath(`/static/${postType}/${slug}`);
    }
    revalidatePath("/");
    revalidatePath("/", "layout");
    revalidatePath("/sitemap.xml");
  } catch (err) {
    console.warn(`[revalidatePost] Warning revalidating paths for ${postType}/${slug}:`, err);
  }
};

export const revalidatePost: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  if (req?.context?.disableRevalidate) return doc;

  if (doc?._status === "published") {
    revalidatePostPaths(doc);
  }

  if (previousDoc?._status === "published" && doc?._status !== "published") {
    revalidatePostPaths(previousDoc);
  }

  // If slug changed, revalidate previous slug as well
  if (
    previousDoc?.slug &&
    doc?.slug &&
    previousDoc.slug !== doc.slug &&
    previousDoc?._status === "published"
  ) {
    revalidatePostPaths(previousDoc);
  }

  return doc;
};

export const revalidateDeletePost: CollectionAfterDeleteHook = ({ doc, req }) => {
  if (req?.context?.disableRevalidate) return doc;
  if (!doc) return doc;

  revalidatePostPaths(doc);
  return doc;
};

export default revalidatePost;
