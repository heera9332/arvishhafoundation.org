import { getPayload, type Where } from "payload";
import configPromise from "@payload-config";
import type { Post } from "@/payload-types";
import type { ProjectItem, ArticleItem } from "@/types/site";
import { draftMode } from "next/headers";

/**
 * Fetch posts from Payload CMS with filtering options.
 */
export async function getPosts(options: {
  postType?: "news" | "projects";
  limit?: number;
  page?: number;
  categorySlug?: string;
  draft?: boolean;
} = {}): Promise<{ docs: Post[]; totalDocs: number; totalPages: number }> {
  const { postType, limit = 10, page = 1, categorySlug, draft } = options;

  try {
    const payload = await getPayload({ config: configPromise });
    let isDraft = draft ?? false;

    if (draft === undefined) {
      try {
        const dm = await draftMode();
        isDraft = dm.isEnabled;
      } catch {
        // Fallback when headers are not accessible
      }
    }

    const where: Where = {};

    if (postType) {
      where.postType = { equals: postType };
    }

    if (categorySlug) {
      where["category.slug"] = { equals: categorySlug };
    }

    const result = await payload.find({
      collection: "posts",
      where,
      limit,
      page,
      depth: 2,
      draft: isDraft,
      overrideAccess: isDraft,
      sort: "-publishedOn",
    });

    return {
      docs: (result.docs as Post[]) || [],
      totalDocs: result.totalDocs || 0,
      totalPages: result.totalPages || 0,
    };
  } catch (error) {
    console.error("[getPosts] Error querying posts:", error);
    return { docs: [], totalDocs: 0, totalPages: 0 };
  }
}

/**
 * Fetch a single post by slug and optional postType.
 */
export async function getPostBySlug(
  slug: string,
  postType?: "news" | "projects"
): Promise<Post | null> {
  try {
    const payload = await getPayload({ config: configPromise });
    let isDraft = false;
    try {
      const dm = await draftMode();
      isDraft = dm.isEnabled;
    } catch {
      // Fallback
    }

    const where: Where = {
      slug: { equals: slug },
    };

    if (postType) {
      where.postType = { equals: postType };
    }

    const result = await payload.find({
      collection: "posts",
      where,
      limit: 1,
      depth: 2,
      draft: isDraft,
      overrideAccess: isDraft,
    });

    return (result.docs?.[0] as Post) || null;
  } catch (error) {
    console.error(`[getPostBySlug] Error fetching post "${slug}":`, error);
    return null;
  }
}

/**
 * Fetch all post slugs for static path generation.
 */
export async function getAllPostSlugs(postType?: "news" | "projects"): Promise<string[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    const where: Where = {};
    if (postType) {
      where.postType = { equals: postType };
    }

    const result = await payload.find({
      collection: "posts",
      where,
      limit: 1000,
      depth: 0,
      draft: false,
    });

    return result.docs
      .map((doc) => doc.slug)
      .filter((s): s is string => Boolean(s));
  } catch (error) {
    console.error("[getAllPostSlugs] Error fetching post slugs:", error);
    return [];
  }
}

/**
 * Helper to convert a Post document into a ProjectItem compatible with current static components.
 */
export function formatPostToProjectItem(post: Post): ProjectItem {
  const mediaUrl =
    typeof post.image === "object" && post.image && "url" in post.image
      ? (post.image.url as string)
      : post.imageUrl || "/images/placeholder.jpg";

  const categoryTitle =
    typeof post.category === "object" && post.category && "title" in post.category
      ? (post.category.title as string)
      : post.categoryCustom || "Initiative";

  return {
    id: post.id,
    title: post.title,
    slug: post.slug || post.id,
    category: categoryTitle,
    shortDescription: post.shortDescription || post.excerpt || "",
    fullDescription: post.fullDescription || undefined,
    image: mediaUrl,
    location: post.location || "Community Field Locations",
    year: post.year || undefined,
    status: post.status || "Active",
    beneficiaries: post.beneficiaries || undefined,
    href: post.href || `/projects/${post.slug || post.id}`,
  };
}

/**
 * Helper to convert a Post document into an ArticleItem compatible with current news components.
 */
export function formatPostToArticleItem(post: Post): ArticleItem {
  const mediaUrl =
    typeof post.image === "object" && post.image && "url" in post.image
      ? (post.image.url as string)
      : post.imageUrl || "/images/placeholder.jpg";

  const categoryTitle =
    typeof post.category === "object" && post.category && "title" in post.category
      ? (post.category.title as string)
      : post.categoryCustom || "Updates";

  const formattedDate = post.publishedOn
    ? new Date(post.publishedOn).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

  return {
    id: post.id,
    slug: post.slug || post.id,
    title: post.title,
    excerpt: post.excerpt,
    image: mediaUrl,
    date: formattedDate,
    category: categoryTitle,
    author: post.author || "Arvishha Foundation",
    readTime: post.readTime || undefined,
  };
}
