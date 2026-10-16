import React from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { projectsData } from "@/data/page-projects";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import { getPageBySlug } from "@/lib/pages";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { PostsGridComponent } from "@/blocks/posts-grid";
import { getPosts, formatPostToGridItem } from "@/lib/posts";
import { getSiteSettings } from "@/global/site-settings";
import { getSEOSettings } from "@/global/seo-settings";

export const revalidate = 300; // 5 min ISR

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings, seoSettings] = await Promise.all([
    getPageBySlug("projects"),
    getSiteSettings(),
    getSEOSettings(),
  ]);

  if (page) {
    const metaTitle =
      page.meta?.title || page.title || `Projects & Ground Initiatives — ${settings.siteName}`;
    const metaDesc =
      page.meta?.description ||
      "Explore Arvishha Foundation's active field programs: Project Shiksha, Project Swavalamban, Arogya Chetna, and Project Prakriti.";
    const metaImg =
      typeof page.meta?.image === "object" && page.meta?.image?.url
        ? page.meta.image.url
        : undefined;

    return constructMetadata({
      title: metaTitle,
      description: metaDesc,
      image: metaImg,
      canonical: "/projects",
      siteName: settings.siteName,
      tagline: settings.tagline,
      favicon: settings.faviconUrl,
      seoSettings,
    });
  }

  return constructMetadata({
    title: `Projects & Ground Initiatives — ${settings.siteName}`,
    description:
      "Explore Arvishha Foundation's active field programs: Project Shiksha, Project Swavalamban, Arogya Chetna, and Project Prakriti.",
    canonical: "/projects",
    siteName: settings.siteName,
    tagline: settings.tagline,
    favicon: settings.faviconUrl,
    seoSettings,
  });
}

export default async function ProjectsPage() {
  const page = await getPageBySlug("projects");

  const breadcrumbLd = generateBreadcrumbSchema([
    { name: page?.title || "Projects", url: "/projects" },
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

  // Fetch dynamic project posts from Payload CMS
  const { docs } = await getPosts({ postType: "projects", limit: 50 });
  const dynamicProjects = docs.map(formatPostToGridItem);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        eyebrow={projectsData.hero.eyebrow}
        heading={projectsData.hero.heading}
        description={projectsData.hero.description}
        breadcrumbs={[{ label: "Projects" }]}
      />

      <PostsGridComponent
        postType="projects"
        limit={6}
        enableSearch={true}
        enablePagination={true}
        showCategoryFilter={true}
        eyebrow={projectsData.hero.eyebrow}
        heading={projectsData.hero.heading}
        description={projectsData.hero.description}
        initialPosts={dynamicProjects}
      />
    </>
  );
}
