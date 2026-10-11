import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

export const revalidatePage: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  if (req.context?.disableRevalidate) return doc;
  if (doc?._status === "published") {
    const path = doc?.slug === "home" ? "/" : `/${doc?.slug || ""}`;
    try {
      revalidatePath(path);
    } catch {}
  }
  if (previousDoc?._status === "published" && doc?._status !== "published") {
    const oldPath = previousDoc?.slug === "home" ? "/" : `/${previousDoc?.slug || ""}`;
    try {
      revalidatePath(oldPath);
    } catch {}
  }
  return doc;
};

export const revalidateDeletePage: CollectionAfterDeleteHook = ({ doc, req }) => {
  if (req.context?.disableRevalidate) return doc;
  const path = doc?.slug === "home" ? "/" : `/${doc?.slug || ""}`;
  try {
    revalidatePath(path);
  } catch {}
  return doc;
};
