import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getHomePage } from "@/lib/pages";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { constructMetadata, generateOrganizationSchema } from "@/lib/seo";
import { getSiteSettings } from "@/global/site-settings";
import { getSEOSettings } from "@/global/seo-settings";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings, seoSettings] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getSEOSettings(),
  ]);

  if (!page) {
    return constructMetadata({
      title: seoSettings.defaultTitle || `${settings.siteName} — ${settings.tagline || "Development. Dignity. Social Change."}`,
      description: seoSettings.defaultDescription,
      canonical: "/",
      siteName: settings.siteName,
      tagline: settings.tagline,
      favicon: settings.faviconUrl,
      image: settings.logoUrl || seoSettings.defaultImageUrl,
      seoSettings,
    });
  }

  const metaTitle = page.meta?.title || page.title;
  const metaDesc =
    page.meta?.description ||
    seoSettings.defaultDescription;
  const metaImg =
    typeof page.meta?.image === "object" && page.meta?.image?.url
      ? page.meta.image.url
      : settings.logoUrl || seoSettings.defaultImageUrl;

  return constructMetadata({
    title: metaTitle,
    description: metaDesc,
    image: metaImg,
    canonical: "/",
    siteName: settings.siteName,
    tagline: settings.tagline,
    favicon: settings.faviconUrl,
    seoSettings,
  });
}

export default async function DynamicHomePage() {
  const [page, settings] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
  ]);

  if (!page) {
    notFound();
  }

  const jsonLd = generateOrganizationSchema(settings);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RenderBlocks blocks={page.layout} />
    </>
  );
}
