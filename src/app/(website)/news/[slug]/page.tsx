import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/common/PageHero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { homeData } from "@/data/page-home";
import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";
import { wordpressApi } from "@/lib/wordpress";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const revalidate = 300; // 5 min ISR

export async function generateStaticParams() {
  const cmsSlugs = await getAllPostSlugs("news");
  const staticSlugs = homeData.news.staticArticles.map((a) => a.slug);
  const combined = Array.from(new Set([...cmsSlugs, ...staticSlugs]));

  return combined.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cmsPost = await getPostBySlug(slug, "news");
  const wpPost = !cmsPost ? await wordpressApi.getPostBySlug(slug) : null;
  const staticArticle =
    !cmsPost && !wpPost
      ? homeData.news.staticArticles.find((a) => a.slug === slug)
      : null;

  const title =
    cmsPost?.title ||
    wpPost?.title?.rendered ||
    staticArticle?.title ||
    "News Story";
  const desc =
    cmsPost?.excerpt ||
    wpPost?.excerpt?.rendered?.replace(/<[^>]+>/g, "") ||
    staticArticle?.excerpt ||
    "Arvishha Foundation Story";

  return constructMetadata({
    title,
    description: desc,
    canonical: `/news/${slug}`,
  });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cmsPost = await getPostBySlug(slug, "news");
  const wpPost = !cmsPost ? await wordpressApi.getPostBySlug(slug) : null;
  const staticArticle =
    !cmsPost && !wpPost
      ? homeData.news.staticArticles.find((a) => a.slug === slug)
      : null;

  if (!cmsPost && !wpPost && !staticArticle) {
    notFound();
  }

  const title =
    cmsPost?.title || wpPost?.title?.rendered || staticArticle?.title || "";

  const dateFormatted = cmsPost?.publishedOn
    ? new Date(cmsPost.publishedOn).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : wpPost
    ? new Date(wpPost.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : staticArticle?.date || "";

  const author =
    cmsPost?.author ||
    wpPost?._embedded?.author?.[0]?.name ||
    staticArticle?.author ||
    "Arvishha Foundation";

  const readTime = cmsPost?.readTime || staticArticle?.readTime;

  const image =
    (typeof cmsPost?.image === "object" && cmsPost.image && "url" in cmsPost.image
      ? (cmsPost.image.url as string)
      : cmsPost?.imageUrl) ||
    wpPost?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    staticArticle?.image ||
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80";

  const category =
    (typeof cmsPost?.category === "object" && cmsPost.category && "title" in cmsPost.category
      ? (cmsPost.category.title as string)
      : cmsPost?.categoryCustom) ||
    staticArticle?.category ||
    "Community";

  const breadcrumbLd = generateBreadcrumbSchema([
    { name: "News & Stories", url: "/news" },
    { name: title, url: `/news/${slug}` },
  ]);

  // Extract lexical text paragraphs if available
  const lexicalParagraphs: string[] = [];
  if (cmsPost?.content?.root?.children) {
    for (const child of cmsPost.content.root.children as any[]) {
      if (child?.children) {
        const text = child.children.map((c: any) => c.text || "").join("").trim();
        if (text) lexicalParagraphs.push(text);
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        eyebrow="News & Dispatches"
        heading={title}
        breadcrumbs={[
          { label: "News & Stories", href: "/news" },
          { label: title },
        ]}
      />

      <article className="py-16 sm:py-24 bg-white">
        <Container size="narrow">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <Button
              asChild
              variant="ghost"
              className="gap-2 text-slate-600 hover:text-slate-900"
            >
              <Link href="/news" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to All Articles</span>
              </Link>
            </Button>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-emerald-800" />
                <span>{dateFormatted}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-emerald-800" />
                <span>{author}</span>
              </span>
              {readTime && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-emerald-800" />
                    <span>{readTime}</span>
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="relative w-full aspect-16/9 rounded-3xl overflow-hidden shadow-xl mb-12 bg-slate-100">
            <Image
              src={image}
              alt={title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-[#03452c] text-white border-0 text-xs font-semibold">
                {category}
              </Badge>
            </div>
          </div>

          <div className="prose prose-lg prose-slate max-w-none space-y-6 leading-relaxed text-slate-700">
            {lexicalParagraphs.length > 0 ? (
              <div className="space-y-6">
                {lexicalParagraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? "text-xl font-medium text-slate-800 leading-relaxed"
                        : "leading-relaxed"
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>
            ) : wpPost ? (
              <div
                dangerouslySetInnerHTML={{ __html: wpPost.content?.rendered || "" }}
                className="space-y-4"
              />
            ) : (
              <div className="space-y-6">
                <p className="text-xl font-medium text-slate-800 leading-relaxed">
                  {cmsPost?.excerpt || staticArticle?.excerpt}
                </p>
                <p>
                  At Arvishha Foundation, our field programs are built on regular, on-the-ground engagement with rural and urban communities. Through dedicated dialogue sessions, local partnerships, and continuous monitoring, our teams strive to ensure every program delivers meaningful and sustainable outcomes.
                </p>
                <p>
                  Education, healthcare access, and women&apos;s economic empowerment remain at the core of our interventions. When community members are equipped with knowledge, skills, and equal opportunity, entire generations thrive.
                </p>
                <p>
                  We invite supporters, educators, and volunteers to partner with us as we expand these essential initiatives to more underserved areas across the region.
                </p>
              </div>
            )}
          </div>

          <div className="mt-16 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">Tags:</span>
              <Badge variant="secondary">Community</Badge>
              <Badge variant="secondary">{category}</Badge>
              <Badge variant="secondary">Empowerment</Badge>
            </div>

            <Button asChild className="bg-[#03452c] hover:bg-[#023320] text-white rounded-full">
              <Link href="/get-involved">Get Involved in this Cause</Link>
            </Button>
          </div>
        </Container>
      </article>
    </>
  );
}
