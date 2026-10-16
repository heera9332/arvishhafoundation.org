import React from "react";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getPageBySlug, getAllPageSlugs } from "@/lib/pages";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import { getSiteSettings } from "@/global/site-settings";

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
  const [page, settings] = await Promise.all([
    getPageBySlug(slug),
    getSiteSettings(),
  ]);

  if (slug === "home") {
    return constructMetadata({
      canonical: "/",
      siteName: settings.siteName,
      tagline: settings.tagline,
      favicon: settings.faviconUrl,
    });
  }

  if (!page) {
    return constructMetadata({
      title: "Page Not Found",
      noIndex: true,
      siteName: settings.siteName,
      tagline: settings.tagline,
      favicon: settings.faviconUrl,
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
  });
}

export default async function DynamicSlugPage({ params }: PageProps) {
  const { slug } = await params;

  // The root path "/" handles the "home" slug
  if (slug === "home") {
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
