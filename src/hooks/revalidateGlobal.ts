import { revalidatePath } from "next/cache";
import type { GlobalAfterChangeHook } from "payload";

/**
 * Revalidates root layout, global navigation, and sitemap when
 * global configurations like Header or Footer are updated in Payload CMS.
 */
export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, req }) => {
  if (req?.context?.disableRevalidate) return doc;
  try {
    // Revalidating "/" layout triggers re-rendering of root layout, header, and footer
    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
  } catch (err) {
    console.warn("[revalidateGlobal] Error revalidating root layout:", err);
  }
  return doc;
};

export default revalidateGlobal;
