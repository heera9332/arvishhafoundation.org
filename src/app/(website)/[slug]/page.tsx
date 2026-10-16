import React from "react";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getPageBySlug, getAllPageSlugs, getHomePageSlug } from "@/lib/pages";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import { getSiteSettings } from "@/global/site-settings";
import { getSEOSettings } from "@/global/seo-settings";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [homeSlug, page, settings, seoSettings] = await Promise.all([
    getHomePageSlug(),
    getPageBySlug(slug),
    getSiteSettings(),
    getSEOSettings(),
  ]);

  if (slug === "home" || slug === homeSlug) {
    return constructMetadata({
      canonical: "/",
      siteName: settings.siteName,
      tagline: settings.tagline,
      favicon: settings.faviconUrl,
      seoSettings,
    });
  }

  if (!page) {
    return constructMetadata({
      title: "Page Not Found",
      noIndex: true,
      siteName: settings.siteName,
      tagline: settings.tagline,
      favicon: settings.faviconUrl,
      seoSettings,
    });
  }

  const metaTitle = page.meta?.title || page.title;
  const metaDesc = page.meta?.description || undefined;
  const metaImg =
    typeof page.meta?.image === "object" && page.meta?.image?.url
      ? page.meta.image.url
      : undefined;

  return constructMetadata({
    title: metaTitle,
    description: metaDesc,
    image: metaImg,
    canonical: `/${slug}`,
    siteName: settings.siteName,
    tagline: settings.tagline,
    favicon: settings.faviconUrl,
    seoSettings,
  });
}

export default async function DynamicSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const homeSlug = await getHomePageSlug();

  // The root path "/" handles the dynamic homepage
  if (slug === "home" || slug === homeSlug) {
    redirect("/");
  }

  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const breadcrumbLd = generateBreadcrumbSchema([
    { name: page.title, url: `/${slug}` },
  ]);

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
