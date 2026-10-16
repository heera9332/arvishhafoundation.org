import { NextRequest, NextResponse } from "next/server";
import { getPosts, formatPostToGridItem } from "@/lib/posts";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const q = searchParams.get("q") || undefined;
    const postTypeParam = searchParams.get("postType");
    const categoryParam = searchParams.get("category");
    const limitParam = searchParams.get("limit");
    const pageParam = searchParams.get("page");

    const postType =
      postTypeParam === "news" || postTypeParam === "projects"
        ? postTypeParam
        : undefined;

    const categoryTitle =
      categoryParam && categoryParam !== "All" ? categoryParam : undefined;

    const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10) || 50, 1), 100) : 50;
    const page = pageParam ? Math.max(parseInt(pageParam, 10) || 1, 1) : 1;

    const { docs, totalDocs, totalPages } = await getPosts({
      postType,
      categoryTitle,
      search: q,
      limit,
      page,
    });

    const formattedDocs = docs.map(formatPostToGridItem);

    return NextResponse.json({
      success: true,
      docs: formattedDocs,
      totalDocs,
      totalPages,
      page,
      limit,
    });
  } catch (error) {
    console.error("[api/posts-search] Search error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to search posts",
        docs: [],
        totalDocs: 0,
        totalPages: 0,
      },
      { status: 500 }
    );
  }
}
