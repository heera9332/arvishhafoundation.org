import React from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { aboutData } from "@/data/page-about";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import { getPageBySlug } from "@/lib/pages";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { StoryComponent } from "@/blocks/story/component";
import { ValuesComponent } from "@/blocks/values/component";
import { TeamComponent } from "@/blocks/team/component";
import { TransparencyComponent } from "@/blocks/transparency/component";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("about");

  if (page) {
    const metaTitle =
      page.meta?.title || page.title || "Who We Are — About Arvishha Foundation";
    const metaDesc =
      page.meta?.description ||
      "Learn about Arvishha Foundation's journey, core values, leadership, and our commitment to human dignity and grassroots social change.";
    const metaImg =
      typeof page.meta?.image === "object" && page.meta?.image?.url
        ? page.meta.image.url
        : undefined;

    return constructMetadata({
      title: metaTitle,
      description: metaDesc,
      image: metaImg,
      canonical: "/about",
    });
  }

  return constructMetadata({
    title: "Who We Are — About Arvishha Foundation",
    description:
      "Learn about Arvishha Foundation's journey, core values, leadership, and our commitment to human dignity and grassroots social change.",
    canonical: "/about",
  });
}

export default async function AboutPage() {
  const page = await getPageBySlug("about");

  const breadcrumbLd = generateBreadcrumbSchema([
    { name: page?.title || "Who We Are", url: "/about" },
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
        eyebrow={aboutData.hero.eyebrow}
        heading={aboutData.hero.heading}
        description={aboutData.hero.description}
        breadcrumbs={[{ label: "Who We Are" }]}
      />

      <StoryComponent />
      <ValuesComponent />
      <TeamComponent />
      <TransparencyComponent />
    </>
  );
}
