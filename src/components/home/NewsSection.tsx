"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { homeData } from "@/data/page-home";

export interface NewsSectionData {
  eyebrow?: string | null;
  heading?: string | null;
  subheading?: string | null;
  description?: string | null;
  viewAllCta?: { label: string; href: string } | null;
  viewAllLink?: { label?: string | null; url?: string | null } | null;
  staticArticles?: Array<any> | null;
  items?: Array<any> | null;
}

export interface NewsSectionProps {
  data?: NewsSectionData | typeof homeData.news | any;
}

function ArticleCard({ article }: { article: any }) {
  const [imgError, setImgError] = useState(false);
  const imgSrc =
    typeof article.image === "object" && article.image?.url
      ? article.image.url
      : article.imageUrl ||
        (typeof article.image === "string" ? article.image : "/images/news-1.png");
  const category = article.category || "Education";
  const date = article.date || "Recent Update";
  const readTime = article.readTime || null;

  return (
    <article className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      <div className="relative w-full aspect-16/10 bg-slate-100 overflow-hidden">
        {!imgError ? (
          <Image
            src={imgSrc}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-[#03452c] flex items-center justify-center text-white p-4 text-center">
            <span className="font-semibold text-sm">{category}</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <Badge className="bg-[#03452c] text-white border-0 font-medium text-xs">
            {category}
          </Badge>
        </div>
      </div>

      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-emerald-800" />
              <span>{date}</span>
            </span>
            {readTime && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-emerald-800" />
                  <span>{readTime}</span>
                </span>
              </>
            )}
          </div>

          <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#03452c] transition-colors leading-snug">
            {article.title}
          </h3>

          <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-[#03452c] transition-colors">
          <span>Read Full Article</span>
          <ArrowRight className="h-4 w-4 -rotate-45 group-hover:rotate-0 transition-transform" />
        </div>
      </div>
    </article>
  );
}

export function NewsSection({ data }: NewsSectionProps) {
  const eyebrow = data?.eyebrow || homeData.news.eyebrow;
  const heading = data?.heading || homeData.news.heading;
  const subheading =
    data?.subheading || data?.description || homeData.news.subheading;
  const viewAllHref =
    data?.viewAllCta?.href || data?.viewAllLink?.url || "/news";
  const viewAllLabel =
    data?.viewAllCta?.label || data?.viewAllLink?.label || "Read All Stories";
  const articles =
    data?.items && data.items.length > 0
      ? data.items
      : data?.staticArticles && data.staticArticles.length > 0
      ? data.staticArticles
      : homeData.news.staticArticles;

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-slate-100">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <SectionLabel>{eyebrow}</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {heading}
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              {subheading}
            </p>
          </div>

          <Button
            asChild
            className="bg-[#03452c] hover:bg-[#023320] text-white rounded-full px-7 py-3 h-auto shrink-0 shadow-sm"
          >
            <Link href={viewAllHref} className="inline-flex items-center gap-2">
              <span>{viewAllLabel}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article: any, idx: number) => {
            const articleSlug =
              article.slug ||
              (article.href ? article.href.replace(/^\/news\/?/, "") : `article-${idx}`);
            return (
              <Link key={article.id || idx} href={`/news/${articleSlug}`}>
                <ArticleCard article={article} />
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
