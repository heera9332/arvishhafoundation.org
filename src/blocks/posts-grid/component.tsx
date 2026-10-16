import React from "react";
import { PostsGridClient } from "./PostsGridClient";
import type { PostGridItem } from "@/lib/posts";
import type { PostsGridBlock } from "@/payload-types";
import { staticProjectPosts, staticNewsPosts } from "@/lib/seed-posts";

export interface PostsGridComponentProps {
  data?: Record<string, unknown>;
  initialPosts?: PostGridItem[];
  postType?: "all" | "news" | "projects";
  limit?: number;
  enableSearch?: boolean;
  enablePagination?: boolean;
  showCategoryFilter?: boolean;
  variant?: "grid" | "detailed" | string | null;
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  viewAllLink?: {
    url?: string | null;
    label?: string | null;
    openInNewTab?: boolean | null;
  } | null;
}

// Convert static posts to PostGridItem for SSR fallback
const staticGridPosts: PostGridItem[] = [
  ...staticProjectPosts.map((p) => ({
    id: p.slug,
    slug: p.slug,
    title: p.title,
    postType: p.postType,
    category: p.categoryCustom || "Initiative",
    excerpt: p.excerpt,
    image: p.imageUrl,
    href: p.href,
    publishedOn: p.publishedOn,
    date: new Date(p.publishedOn).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    author: p.author,
    location: p.location,
    year: p.year,
    status: p.status,
    beneficiaries: p.beneficiaries,
  })),
  ...staticNewsPosts.map((n) => ({
    id: n.slug,
    slug: n.slug,
    title: n.title,
    postType: n.postType,
    category: n.categoryCustom || "Updates",
    excerpt: n.excerpt,
    image: n.imageUrl,
    href: n.href,
    publishedOn: n.publishedOn,
    date: new Date(n.publishedOn).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    author: n.author,
    readTime: n.readTime,
  })),
];

export function PostsGridComponent(
  props?: (PostsGridComponentProps & Record<string, unknown>) | Record<string, unknown>
) {
  const block = (("data" in (props || {}) && (props as PostsGridComponentProps)?.data
    ? (props as PostsGridComponentProps).data
    : props) || {}) as Record<string, unknown>;

  const postType =
    (block.postType as "all" | "news" | "projects") ||
    (props as PostsGridComponentProps)?.postType ||
    "all";

  const limit =
    typeof block.limit === "number"
      ? block.limit
      : (props as PostsGridComponentProps)?.limit || 6;

  const enableSearch =
    typeof block.enableSearch === "boolean"
      ? block.enableSearch
      : (props as PostsGridComponentProps)?.enableSearch ?? true;

  const enablePagination =
    typeof block.enablePagination === "boolean"
      ? block.enablePagination
      : (props as PostsGridComponentProps)?.enablePagination ?? true;

  const showCategoryFilter =
    typeof block.showCategoryFilter === "boolean"
      ? block.showCategoryFilter
      : (props as PostsGridComponentProps)?.showCategoryFilter ?? true;

  const eyebrow =
    typeof block.eyebrow === "string"
      ? block.eyebrow
      : (props as PostsGridComponentProps)?.eyebrow || "Our Work & Dispatches";

  const heading =
    typeof block.heading === "string"
      ? block.heading
      : (props as PostsGridComponentProps)?.heading || "Stories of Change & Field Initiatives";

  const description =
    typeof block.description === "string"
      ? block.description
      : (props as PostsGridComponentProps)?.description ||
        "Explore ongoing field projects, grassroots achievements, and stories of community transformation across India.";

  const viewAllLink =
    (block.viewAllLink as any) || (props as PostsGridComponentProps)?.viewAllLink || null;

  // Filter fallback posts based on configured postType
  const relevantStaticPosts =
    postType === "all"
      ? staticGridPosts
      : staticGridPosts.filter((p) => p.postType === postType);

  const initialPosts =
    (props as PostsGridComponentProps)?.initialPosts &&
    (props as PostsGridComponentProps).initialPosts!.length > 0
      ? (props as PostsGridComponentProps).initialPosts
      : relevantStaticPosts;

  return (
    <PostsGridClient
      initialPosts={initialPosts}
      postType={postType}
      limit={limit}
      enableSearch={enableSearch}
      enablePagination={enablePagination}
      showCategoryFilter={showCategoryFilter}
      eyebrow={eyebrow}
      heading={heading}
      description={description}
      viewAllLink={viewAllLink}
    />
  );
}

export default PostsGridComponent;
