import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { homeData } from "@/data/page-home";
import { wordpressApi } from "@/lib/wordpress";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/what-we-do`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/get-involved`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/donate`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // News routes from static fallback and WordPress
  const staticArticleRoutes: MetadataRoute.Sitemap =
    homeData.news.staticArticles.map((article) => ({
      url: `${baseUrl}/news/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  try {
    const wpPosts = await wordpressApi.getPosts({ perPage: 20 });
    const wpArticleRoutes: MetadataRoute.Sitemap = wpPosts.map((post) => ({
      url: `${baseUrl}/news/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...staticArticleRoutes, ...wpArticleRoutes];
  } catch {
    return [...staticRoutes, ...staticArticleRoutes];
  }
}
