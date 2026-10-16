import React from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { getPageBySlug } from "@/lib/pages";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { PostsGridComponent } from "@/blocks/posts-grid";
import { getPosts, formatPostToGridItem } from "@/lib/posts";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import { getSiteSettings } from "@/global/site-settings";

export const revalidate = 300; // ISR revalidation every 5 minutes

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getPageBySlug("news"),
    getSiteSettings(),
  ]);

  if (page) {
    const metaTitle =
      page.meta?.title || page.title || `News & Community Stories — ${settings.siteName}`;
    const metaDesc =
      page.meta?.description ||
      "Read the latest field updates, community milestones, educational initiatives, and stories from Arvishha Foundation.";
    const metaImg =
      typeof page.meta?.image === "object" && page.meta?.image?.url
        ? page.meta.image.url
        : undefined;

    return constructMetadata({
      title: metaTitle,
      description: metaDesc,
      image: metaImg,
      canonical: "/news",
      siteName: settings.siteName,
      tagline: settings.tagline,
      favicon: settings.faviconUrl,
    });
  }

  return constructMetadata({
    title: `News & Community Stories — ${settings.siteName}`,
    description:
      "Read the latest field updates, community milestones, educational initiatives, and stories from Arvishha Foundation.",
    canonical: "/news",
    siteName: settings.siteName,
    tagline: settings.tagline,
    favicon: settings.faviconUrl,
  });
}

export default async function NewsPage() {
  const page = await getPageBySlug("news");

  const breadcrumbLd = generateBreadcrumbSchema([
    { name: page?.title || "News & Stories", url: "/news" },
  ]);

  if (page?.layout && page.layout.length > 0) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
        <RenderBlocks blocks={page.layout} />
      </>
    );
  }

  // Fetch dynamic news posts from Payload CMS
  const { docs: payloadPosts } = await getPosts({ postType: "news", limit: 50 });
  const dynamicArticles = payloadPosts.map(formatPostToGridItem);

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

      <PostsGridComponent
        postType="news"
        limit={6}
        enableSearch={true}
        enablePagination={true}
        showCategoryFilter={true}
        eyebrow="News & Field Dispatches"
        heading="Latest Updates From Our Grassroots Programs"
        description="Follow our journey across communities as we share grassroots milestones, beneficiary experiences, and developmental insights."
        initialPosts={dynamicArticles}
      />
    </>
  );
}
