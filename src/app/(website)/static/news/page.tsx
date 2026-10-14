import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/common/PageHero";
import { Badge } from "@/components/ui/badge";
import { homeData } from "@/data/page-home";
import { wordpressApi } from "@/lib/wordpress";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const revalidate = 300; // ISR revalidation every 5 minutes

export const metadata = constructMetadata({
  title: "News & Community Stories — Arvishha Foundation",
  description:
    "Read the latest field updates, community milestones, educational initiatives, and stories from Arvishha Foundation.",
  canonical: "/news",
});

export default async function NewsPage() {
  const wpPosts = await wordpressApi.getPosts({ perPage: 12 });

  // Map WP posts if available, otherwise fallback to curated static articles
  const hasWpPosts = wpPosts && wpPosts.length > 0;

  const breadcrumbLd = generateBreadcrumbSchema([
    { name: "News & Stories", url: "/news" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        eyebrow="News & Dispatches"
        heading="Stories of Change, Field Updates & Perspectives"
        description="Follow our journey across communities as we share grassroots milestones, beneficiary experiences, and developmental insights."
        breadcrumbs={[{ label: "News & Stories" }]}
      />

      <section className="py-20 sm:py-28 bg-[#faf9f5]">
        <Container>
          {hasWpPosts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wpPosts.map((post) => {
                const featuredMedia =
                  post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80";
                const authorName =
                  post._embedded?.author?.[0]?.name || "Arvishha Foundation";
                const dateFormatted = new Date(post.date).toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric", year: "numeric" }
                );

                return (
                  <article
                    key={post.id}
                    className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                  >
                    <div className="relative w-full aspect-16/10 bg-slate-100 overflow-hidden">
                      <Image
                        src={featuredMedia}
                        alt={post.title.rendered}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-[#03452c] text-white border-0 text-xs">
                          Updates
                        </Badge>
                      </div>
                    </div>

                    <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-emerald-800" />
                            <span>{dateFormatted}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5 text-emerald-800" />
                            <span>{authorName}</span>
                          </span>
                        </div>

                        <h2
                          className="text-xl font-bold text-slate-900 group-hover:text-[#03452c] transition-colors leading-snug"
                          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />

                        <div
                          className="mt-3 text-sm text-slate-600 line-clamp-3 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: post.excerpt.rendered.replace(/<[^>]+>/g, ""),
                          }}
                        />
                      </div>

                      <div className="pt-4 border-t border-slate-100">
                        <Link
                          href={`/news/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#03452c] transition-colors"
                        >
                          <span>Read Full Story</span>
                          <ArrowRight className="h-3.5 w-3.5 -rotate-45 group-hover:rotate-0 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {homeData.news.staticArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="relative w-full aspect-16/10 bg-slate-100 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#03452c] text-white border-0 text-xs">
                        {article.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-emerald-800" />
                          <span>{article.date}</span>
                        </span>
                        {article.readTime && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-emerald-800" />
                              <span>{article.readTime}</span>
                            </span>
                          </>
                        )}
                      </div>

                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#03452c] transition-colors leading-snug">
                        {article.title}
                      </h2>

                      <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <Link
                        href={`/news/${article.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#03452c] transition-colors"
                      >
                        <span>Read Full Story</span>
                        <ArrowRight className="h-3.5 w-3.5 -rotate-45 group-hover:rotate-0 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
