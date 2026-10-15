import React from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { whatWeDoData } from "@/data/page-what-we-do";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import { getPageBySlug } from "@/lib/pages";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { PillarsComponent } from "@/blocks/pillars/component";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("what-we-do");

  if (page) {
    const metaTitle =
      page.meta?.title || page.title || "What We Do — Programs & Focus Areas";
    const metaDesc =
      page.meta?.description ||
      "Explore Arvishha Foundation's core intervention pillars: education, women empowerment, health awareness, and rural development.";
    const metaImg =
      typeof page.meta?.image === "object" && page.meta?.image?.url
        ? page.meta.image.url
        : undefined;

    return constructMetadata({
      title: metaTitle,
      description: metaDesc,
      image: metaImg,
      canonical: "/what-we-do",
    });
  }

  return constructMetadata({
    title: "What We Do — Programs & Focus Areas",
    description:
      "Explore Arvishha Foundation's core intervention pillars: education, women empowerment, health awareness, and rural development.",
    canonical: "/what-we-do",
  });
}

export default async function WhatWeDoPage() {
  const page = await getPageBySlug("what-we-do");

  const breadcrumbLd = generateBreadcrumbSchema([
    { name: page?.title || "What We Do", url: "/what-we-do" },
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
        eyebrow={whatWeDoData.hero.eyebrow}
        heading={whatWeDoData.hero.heading}
        description={whatWeDoData.hero.description}
        breadcrumbs={[{ label: "What We Do" }]}
      />

      <PillarsComponent />
    </>
  );
}
