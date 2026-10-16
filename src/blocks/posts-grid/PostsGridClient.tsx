"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
  MapPin,
  Users,
  ArrowRight,
  Filter,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PostGridItem } from "@/lib/posts";

export interface PostsGridClientProps {
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

export function PostsGridClient({
  initialPosts = [],
  postType = "all",
  limit = 6,
  enableSearch = true,
  enablePagination = true,
  showCategoryFilter = true,
  eyebrow,
  heading,
  description,
  viewAllLink,
}: PostsGridClientProps) {
  const [posts, setPosts] = useState<PostGridItem[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  // If initialPosts was empty on mount, fetch from /api/posts as client fallback
  useEffect(() => {
    if (initialPosts.length > 0) {
      setPosts(initialPosts);
      return;
    }

    let isMounted = true;
    async function fetchPosts() {
      try {
        const query = postType !== "all" ? `?where[postType][equals]=${postType}&limit=100` : "?limit=100";
        const res = await fetch(`/api/posts${query}`);
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data?.docs) {
          const mapped: PostGridItem[] = data.docs.map((doc: any) => ({
            id: doc.id,
            slug: doc.slug || doc.id,
            title: doc.title,
            postType: doc.postType || "news",
            category:
              typeof doc.category === "object" && doc.category?.title
                ? doc.category.title
                : doc.categoryCustom || (doc.postType === "projects" ? "Initiative" : "Updates"),
            excerpt: doc.excerpt || doc.shortDescription || "",
            image:
              (typeof doc.image === "object" && doc.image?.url) ||
              doc.imageUrl ||
              "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
            href:
              doc.href ||
              (doc.postType === "projects"
                ? `/projects/${doc.slug || doc.id}`
                : `/news/${doc.slug || doc.id}`),
            publishedOn: doc.publishedOn || null,
            date: doc.publishedOn
              ? new Date(doc.publishedOn).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Recent",
            author: doc.author || "Arvishha Foundation",
            readTime: doc.readTime || null,
            location: doc.location || null,
            year: doc.year || null,
            status: doc.status || (doc.postType === "projects" ? "Active" : null),
            beneficiaries: doc.beneficiaries || null,
          }));
          setPosts(mapped);
        }
      } catch (err) {
        console.warn("[PostsGridClient] Client fetch warning:", err);
      }
    }

    fetchPosts();
    return () => {
      isMounted = false;
    };
  }, [initialPosts, postType]);

  // Extract unique categories from current posts
  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [posts]);

  // Filter posts based on postType, search query, and category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // 1. Post type filter
      if (postType !== "all" && post.postType !== postType) {
        return false;
      }

      // 2. Category filter
      if (selectedCategory !== "All" && post.category !== selectedCategory) {
        return false;
      }

      // 3. Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = post.title?.toLowerCase().includes(query);
        const matchesExcerpt = post.excerpt?.toLowerCase().includes(query);
        const matchesCategory = post.category?.toLowerCase().includes(query);
        const matchesLocation = post.location?.toLowerCase().includes(query);
        const matchesAuthor = post.author?.toLowerCase().includes(query);
        return Boolean(
          matchesTitle || matchesExcerpt || matchesCategory || matchesLocation || matchesAuthor
        );
      }

      return true;
    });
  }, [posts, postType, selectedCategory, searchQuery]);

  // Reset page when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Pagination calculations
  const itemsPerPage = Math.max(1, limit || 6);
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const displayedPosts = useMemo(() => {
    if (!enablePagination) {
      return filteredPosts.slice(0, itemsPerPage);
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPosts, enablePagination, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredPosts.length);

  const showViewAll = !enablePagination && viewAllLink?.url;

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-[#faf9f5] scroll-mt-24">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-3xl">
            {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
            {heading && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {heading}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {showViewAll && (
            <Button
              asChild
              className="bg-[#03452c] hover:bg-[#023320] text-white rounded-full px-7 py-3 h-auto shrink-0 shadow-sm self-start md:self-auto"
            >
              <Link
                href={viewAllLink.url || "#"}
                target={viewAllLink.openInNewTab ? "_blank" : undefined}
                rel={viewAllLink.openInNewTab ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 font-semibold"
              >
                <span>{viewAllLink.label || "View All Posts"}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>

        {/* Interactive Controls (Search & Category Filters) */}
        {(enableSearch || showCategoryFilter) && (
          <div className="mb-12 space-y-6">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Bar */}
              {enableSearch && (
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, topic, location, keyword..."
                    className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200/90 rounded-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#03452c] focus:border-transparent shadow-xs transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      title="Clear search"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              )}

              {/* Status counter */}
              <div className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 self-center">
                <span>Showing</span>
                <strong className="text-slate-800">
                  {filteredPosts.length === 0
                    ? 0
                    : enablePagination
                    ? `${startIndex}–${endIndex}`
                    : displayedPosts.length}
                </strong>
                <span>of</span>
                <strong className="text-slate-800">{filteredPosts.length}</strong>
                <span>{postType === "projects" ? "initiatives" : postType === "news" ? "articles" : "posts"}</span>
              </div>
            </div>

            {/* Category Filter Pills */}
            {showCategoryFilter && categories.length > 2 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1 shrink-0 mr-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filter:</span>
                </span>
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                        isActive
                          ? "bg-[#03452c] text-white shadow-xs"
                          : "bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Posts Grid */}
        {displayedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedPosts.map((post) => {
              const isProject = post.postType === "projects";

              return (
                <article
                  key={post.id || post.slug}
                  className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
                >
                  {/* Card Cover Media */}
                  <div className="relative w-full aspect-16/10 bg-slate-100 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badge Overlays */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <Badge className="bg-[#03452c] text-white border-0 text-xs font-semibold">
                        {post.category}
                      </Badge>
                      {isProject && post.status && (
                        <Badge className="bg-amber-400 text-slate-950 border-0 text-xs font-bold">
                          {post.status}
                        </Badge>
                      )}
                      {postType === "all" && (
                        <Badge variant="outline" className="bg-white/90 text-slate-800 border-0 text-xs backdrop-blur-xs font-medium">
                          {isProject ? "Project" : "Story"}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Meta Information Strip */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
                        {isProject ? (
                          <>
                            {post.location && (
                              <span className="flex items-center gap-1 font-medium">
                                <MapPin className="h-3.5 w-3.5 text-emerald-800" />
                                <span className="line-clamp-1">{post.location}</span>
                              </span>
                            )}
                            {post.year && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1 font-medium">
                                  <Calendar className="h-3.5 w-3.5 text-emerald-800" />
                                  <span>{post.year}</span>
                                </span>
                              </>
                            )}
                            {post.beneficiaries && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1 font-bold text-emerald-950">
                                  <Users className="h-3.5 w-3.5 text-amber-500" />
                                  <span>{post.beneficiaries}</span>
                                </span>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {post.date && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5 text-emerald-800" />
                                <span>{post.date}</span>
                              </span>
                            )}
                            {post.readTime && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5 text-emerald-800" />
                                  <span>{post.readTime}</span>
                                </span>
                              </>
                            )}
                            {post.author && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <User className="h-3.5 w-3.5 text-emerald-800" />
                                  <span className="line-clamp-1">{post.author}</span>
                                </span>
                              </>
                            )}
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#03452c] transition-colors leading-snug">
                        <Link href={post.href}>{post.title}</Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={post.href}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#03452c] transition-colors"
                      >
                        <span>{isProject ? "View Initiative" : "Read Full Story"}</span>
                        <ArrowRight className="h-3.5 w-3.5 -rotate-45 group-hover:rotate-0 transition-transform" />
                      </Link>

                      {isProject && (
                        <Link
                          href="/get-involved"
                          className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
                        >
                          Volunteer
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300 p-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 text-slate-400 mb-4">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              No {postType === "projects" ? "projects" : postType === "news" ? "articles" : "posts"} found
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
              {searchQuery
                ? `We couldn't find any items matching "${searchQuery}". Try a different keyword or reset filters.`
                : "There are currently no items available in this category."}
            </p>
            {(searchQuery || selectedCategory !== "All") && (
              <Button
                onClick={handleResetFilters}
                variant="outline"
                className="rounded-full text-xs font-semibold px-5"
              >
                Reset All Filters
              </Button>
            )}
          </div>
        )}

        {/* Pagination Navigation */}
        {enablePagination && totalPages > 1 && (
          <div className="mt-16 flex flex-wrap items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-full gap-1 px-4 text-xs font-semibold disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[#03452c] text-white shadow-xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-full gap-1 px-4 text-xs font-semibold disabled:opacity-40"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}

export default PostsGridClient;
