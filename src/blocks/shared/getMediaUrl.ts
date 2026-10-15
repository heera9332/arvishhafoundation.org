import type { Media } from "@/payload-types";

/**
 * Safely extracts a displayable image URL from a Payload CMS Media field.
 */
export function getMediaUrl(
  media: string | Media | null | undefined
): string | null {
  if (!media) return null;
  if (typeof media === "string") {
    if (
      media.startsWith("http://") ||
      media.startsWith("https://") ||
      media.startsWith("/")
    ) {
      return media;
    }
    return null;
  }
  if (typeof media === "object" && media?.url) {
    return media.url;
  }
  return null;
}
