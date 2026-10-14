import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPageBySlug } from "@/lib/pages";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { constructMetadata, generateOrganizationSchema } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("home");

  if (!page) {
    return constructMetadata({
      title: "Arvishha Foundation — Development. Dignity. Social Change.",
      description:
        "Arvishha Foundation is a modern non-governmental organization working on education, women empowerment, child welfare, preventive healthcare, rights awareness, and sustainable development.",
      canonical: "/",
    });
  }

  const metaTitle = page.meta?.title || page.title;
  const metaDesc =
    page.meta?.description ||
    "Arvishha Foundation is a modern non-governmental organization working on education, women empowerment, child welfare, preventive healthcare, rights awareness, and sustainable development.";
  const metaImg =
    typeof page.meta?.image === "object" && page.meta?.image?.url
      ? page.meta.image.url
      : undefined;

  return constructMetadata({
    title: metaTitle,
    description: metaDesc,
    image: metaImg,
    canonical: "/",
  });
}

export default async function DynamicHomePage() {
  const page = await getPageBySlug("home");

  if (!page) {
    notFound();
  }

  const jsonLd = generateOrganizationSchema();

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
