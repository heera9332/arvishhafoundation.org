import React from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { getInvolvedData } from "@/data/page-get-involved";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import { getPageBySlug } from "@/lib/pages";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { VolunteerComponent } from "@/blocks/volunteer/component";
import { CorporatePartnershipComponent } from "@/blocks/corporate-partnership/component";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("get-involved");

  if (page) {
    const metaTitle =
      page.meta?.title || page.title || "Get Involved — Volunteer & CSR Partnerships";
    const metaDesc =
      page.meta?.description ||
      "Join Arvishha Foundation as a volunteer, academic mentor, medical contributor, or corporate CSR partner.";
    const metaImg =
      typeof page.meta?.image === "object" && page.meta?.image?.url
        ? page.meta.image.url
        : undefined;

    return constructMetadata({
      title: metaTitle,
      description: metaDesc,
      image: metaImg,
      canonical: "/get-involved",
    });
  }

  return constructMetadata({
    title: "Get Involved — Volunteer & CSR Partnerships",
    description:
      "Join Arvishha Foundation as a volunteer, academic mentor, medical contributor, or corporate CSR partner.",
    canonical: "/get-involved",
  });
}

export default async function GetInvolvedPage() {
  const page = await getPageBySlug("get-involved");

  const breadcrumbLd = generateBreadcrumbSchema([
    { name: page?.title || "Get Involved", url: "/get-involved" },
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
        eyebrow={getInvolvedData.hero.eyebrow}
        heading={getInvolvedData.hero.heading}
        description={getInvolvedData.hero.description}
        breadcrumbs={[{ label: "Get Involved" }]}
      />

      <VolunteerComponent />
      <CorporatePartnershipComponent />
    </>
  );
}
