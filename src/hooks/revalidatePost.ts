import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

export const revalidatePost: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  if (req.context?.disableRevalidate) return doc;

  const revalidate = (item: Record<string, unknown> | null | undefined) => {
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
    } catch {}
  };

  if (doc?._status === "published") {
    revalidate(doc);
  }
  if (previousDoc?._status === "published" && doc?._status !== "published") {
    revalidate(previousDoc);
  }
  return doc;
};

export const revalidateDeletePost: CollectionAfterDeleteHook = ({ doc, req }) => {
  if (req.context?.disableRevalidate) return doc;
  if (!doc) return doc;
  const postType = doc.postType === "projects" ? "projects" : "news";
  const slug = (doc.slug as string) || "";
  try {
    revalidatePath(`/${postType}`);
    revalidatePath(`/static/${postType}`);
    if (slug) {
      revalidatePath(`/${postType}/${slug}`);
      revalidatePath(`/static/${postType}/${slug}`);
    }
    revalidatePath("/");
  } catch {}
  return doc;
};
