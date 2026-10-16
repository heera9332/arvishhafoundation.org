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
  categoryTitle?: string;
  search?: string;
  draft?: boolean;
} = {}): Promise<{ docs: Post[]; totalDocs: number; totalPages: number }> {
  const { postType, limit = 10, page = 1, categorySlug, categoryTitle, search, draft } = options;

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

    const andConditions: Where[] = [];

    if (postType) {
      andConditions.push({ postType: { equals: postType } });
    }

    if (categorySlug) {
      andConditions.push({ "category.slug": { equals: categorySlug } });
    }

    if (categoryTitle && categoryTitle !== "All") {
      andConditions.push({
        or: [
          { "category.title": { equals: categoryTitle } },
          { categoryCustom: { equals: categoryTitle } },
        ],
      });
    }

    if (search && search.trim()) {
      const q = search.trim();
      andConditions.push({
        or: [
          { title: { like: q } },
          { excerpt: { like: q } },
          { shortDescription: { like: q } },
          { categoryCustom: { like: q } },
          { location: { like: q } },
          { author: { like: q } },
        ],
      });
    }

    const where: Where =
      andConditions.length === 1
        ? andConditions[0]
        : andConditions.length > 1
        ? { and: andConditions }
        : {};

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

export interface PostGridItem {
  id: string;
  slug: string;
  title: string;
  postType: "news" | "projects";
  category: string;
  excerpt: string;
  image: string;
  href: string;
  publishedOn?: string | null;
  date?: string | null;
  author?: string | null;
  readTime?: string | null;
  location?: string | null;
  year?: string | null;
  status?: string | null;
  beneficiaries?: string | null;
}

/**
 * Helper to convert a Post document into a PostGridItem for PostsGrid listing component.
 */
export function formatPostToGridItem(post: Post): PostGridItem {
  const mediaUrl =
    typeof post.image === "object" && post.image && "url" in post.image
      ? (post.image.url as string)
      : post.imageUrl ||
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80";

  const categoryTitle =
    typeof post.category === "object" && post.category && "title" in post.category
      ? (post.category.title as string)
      : post.categoryCustom || (post.postType === "projects" ? "Initiative" : "Updates");

  const formattedDate = post.publishedOn
    ? new Date(post.publishedOn).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

  const href =
    post.href ||
    (post.postType === "projects"
      ? `/projects/${post.slug || post.id}`
      : `/news/${post.slug || post.id}`);

  return {
    id: post.id,
    slug: post.slug || post.id,
    title: post.title,
    postType: post.postType || "news",
    category: categoryTitle,
    excerpt: post.excerpt || post.shortDescription || "",
    image: mediaUrl,
    href,
    publishedOn: post.publishedOn || null,
    date: formattedDate,
    author: post.author || "Arvishha Foundation",
    readTime: post.readTime || null,
    location: post.location || null,
    year: post.year || null,
    status: post.status || (post.postType === "projects" ? "Active" : null),
    beneficiaries: post.beneficiaries || null,
  };
}
