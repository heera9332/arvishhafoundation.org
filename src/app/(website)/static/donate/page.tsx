import React from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { donateData } from "@/data/page-donate";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import { getPageBySlug } from "@/lib/pages";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { DonateTiersComponent } from "@/blocks/donate-tiers/component";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("donate");

  if (page) {
    const metaTitle =
      page.meta?.title || page.title || "Donate & Support — Arvishha Foundation";
    const metaDesc =
      page.meta?.description ||
      "Support Arvishha Foundation. Every donation directly powers community learning centers, women vocational training, and free health checkups.";
    const metaImg =
      typeof page.meta?.image === "object" && page.meta?.image?.url
        ? page.meta.image.url
        : undefined;

    return constructMetadata({
      title: metaTitle,
      description: metaDesc,
      image: metaImg,
      canonical: "/donate",
    });
  }

  return constructMetadata({
    title: "Donate & Support — Arvishha Foundation",
    description:
      "Support Arvishha Foundation. Every donation directly powers community learning centers, women vocational training, and free health checkups.",
    canonical: "/donate",
  });
}

export default async function DonatePage() {
  const page = await getPageBySlug("donate");

  const breadcrumbLd = generateBreadcrumbSchema([
    { name: page?.title || "Donate", url: "/donate" },
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        eyebrow={donateData.hero.eyebrow}
        heading={donateData.hero.heading}
        description={donateData.hero.description}
        breadcrumbs={[{ label: "Donate / Support" }]}
      />

      <DonateTiersComponent />
    </>
  );
}
