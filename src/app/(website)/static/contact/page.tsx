import React from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { contactData } from "@/data/page-contact";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import { getPageBySlug } from "@/lib/pages";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { ContactPageComponent } from "@/blocks/contact-page/component";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("contact");

  if (page) {
    const metaTitle = page.meta?.title || page.title || "Contact Us — Get In Touch With Arvishha Foundation";
    const metaDesc =
      page.meta?.description ||
      "Reach out to Arvishha Foundation for general inquiries, project collaborations, CSR partnerships, or volunteering details.";
    const metaImg =
      typeof page.meta?.image === "object" && page.meta?.image?.url
        ? page.meta.image.url
        : undefined;

    return constructMetadata({
      title: metaTitle,
      description: metaDesc,
      image: metaImg,
      canonical: "/contact",
    });
  }

  return constructMetadata({
    title: "Contact Us — Get In Touch With Arvishha Foundation",
    description:
      "Reach out to Arvishha Foundation for general inquiries, project collaborations, CSR partnerships, or volunteering details.",
    canonical: "/contact",
  });
}

export default async function ContactPage() {
  const page = await getPageBySlug("contact");

  const breadcrumbLd = generateBreadcrumbSchema([
    { name: page?.title || "Contact", url: "/contact" },
  ]);

  // If a dynamic page exists in Payload CMS with layout blocks, render them dynamically
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

  // Resilient fallback: render PageHero and ContactPageComponent with contactData fallbacks
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        eyebrow={contactData.hero.eyebrow}
        heading={contactData.hero.heading}
        description={contactData.hero.description}
        breadcrumbs={[{ label: "Contact Us" }]}
      />

      <ContactPageComponent />
    </>
  );
}
