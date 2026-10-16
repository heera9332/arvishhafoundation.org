import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPageBySlug } from "@/lib/pages";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { constructMetadata, generateOrganizationSchema } from "@/lib/seo";
import { getSiteSettings } from "@/global/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getPageBySlug("home"),
    getSiteSettings(),
  ]);

  if (!page) {
    return constructMetadata({
      title: `${settings.siteName} — ${settings.tagline || "Development. Dignity. Social Change."}`,
      description:
        "Arvishha Foundation is a modern non-governmental organization working on education, women empowerment, child welfare, preventive healthcare, rights awareness, and sustainable development.",
      canonical: "/",
      siteName: settings.siteName,
      tagline: settings.tagline,
      favicon: settings.faviconUrl,
      image: settings.logoUrl,
    });
  }

  const metaTitle = page.meta?.title || page.title;
  const metaDesc =
    page.meta?.description ||
    "Arvishha Foundation is a modern non-governmental organization working on education, women empowerment, child welfare, preventive healthcare, rights awareness, and sustainable development.";
  const metaImg =
    typeof page.meta?.image === "object" && page.meta?.image?.url
      ? page.meta.image.url
      : settings.logoUrl;

  return constructMetadata({
    title: metaTitle,
    description: metaDesc,
    image: metaImg,
    canonical: "/",
    siteName: settings.siteName,
    tagline: settings.tagline,
    favicon: settings.faviconUrl,
  });
}

export default async function DynamicHomePage() {
  const [page, settings] = await Promise.all([
    getPageBySlug("home"),
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
