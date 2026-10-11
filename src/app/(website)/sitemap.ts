import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { homeData } from "@/data/page-home";
import { wordpressApi } from "@/lib/wordpress";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url.replace(/\/+$/, "");

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
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // News routes from static fallback
  const staticArticleRoutes: MetadataRoute.Sitemap =
    homeData.news.staticArticles.map((article) => ({
      url: `${baseUrl}/news/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  let wpArticleRoutes: MetadataRoute.Sitemap = [];
  try {
    const wpPosts = await wordpressApi.getPosts({ perPage: 50 });
    wpArticleRoutes = wpPosts.map((post) => ({
      url: `${baseUrl}/news/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    // Fall back gracefully to static articles when WordPress API is unreachable
    wpArticleRoutes = [];
  }

  // Deduplicate all routes by URL
  const allRoutes = [...staticRoutes, ...staticArticleRoutes, ...wpArticleRoutes];
  const uniqueRoutesMap = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const route of allRoutes) {
    uniqueRoutesMap.set(route.url, route);
  }

  return Array.from(uniqueRoutesMap.values());
}
