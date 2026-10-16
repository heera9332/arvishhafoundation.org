import type { Metadata } from "next";
import {
  CONTACT_DETAILS,
  CONTACT_PERSON,
  SOCIAL_HANDLES,
  SOCIAL_URLS,
} from "@/constants";

export const siteConfig = {
  name: "Arvishha Foundation",
  shortName: "Arvishha",
  slogan: "विकास और सामाजिक कार्यों के लिए अग्रसर",
  description:
    "Arvishha Foundation is a dedicated non-governmental organization working towards inclusive education, youth development, women empowerment, healthcare access, rights awareness, and community growth.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://arvishhafoundation.org",
  mediaUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://media.arvishhafoundation.org",
  ogImage: "/images/logo.png",
  contactPerson: CONTACT_PERSON,
  contact: {
    phone: CONTACT_DETAILS.phone,
    phoneRaw: CONTACT_DETAILS.phoneRaw,
    email: CONTACT_DETAILS.email,
    emailAlt: CONTACT_DETAILS.emailAlt,
  },
  socials: SOCIAL_URLS,
};

import type { SEOSettingsData } from "@/global/seo-settings/types";

export function constructMetadata({
  title,
  description,
  image,
  canonical,
  noIndex = false,
  siteName,
  tagline,
  favicon,
  keywords,
  seoSettings,
}: {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
  siteName?: string;
  tagline?: string;
  favicon?: string;
  keywords?: string;
  seoSettings?: Partial<SEOSettingsData>;
} = {}): Metadata {
  const currentSiteName = siteName || siteConfig.name;
  const currentTagline = tagline || siteConfig.slogan;
  const currentFavicon = favicon || "/images/logo.png";
  const siteUrl = seoSettings?.siteUrl || siteConfig.url;

  // Format page title using titleTemplate when available
  let fullTitle: string;
  if (title) {
    if (seoSettings?.titleTemplate && seoSettings.titleTemplate.includes("%s")) {
      fullTitle = seoSettings.titleTemplate.replace(/%s/g, title);
    } else {
      fullTitle = `${title} | ${currentSiteName}`;
    }
  } else {
    fullTitle =
      seoSettings?.defaultTitle || `${currentSiteName} — ${currentTagline}`;
  }

  const effectiveDescription =
    description || seoSettings?.defaultDescription || siteConfig.description;

  const effectiveKeywords =
    keywords || seoSettings?.defaultKeywords || undefined;

  const currentImage =
    image || seoSettings?.defaultImageUrl || siteConfig.ogImage;

  const canonicalUrl = canonical
    ? `${siteUrl}${canonical.startsWith("/") ? canonical : `/${canonical}`}`
    : undefined;

  const indexRobots = !noIndex && seoSettings?.robots?.index !== false;
  const followRobots = !noIndex && seoSettings?.robots?.follow !== false;
  const noarchiveRobots = Boolean(seoSettings?.robots?.noarchive);

  // Additional custom head tags or Bing verification
  const otherMeta: Record<string, string> = {};
  if (seoSettings?.verification?.bing) {
    otherMeta["msvalidate.01"] = seoSettings.verification.bing;
  }
  if (Array.isArray(seoSettings?.additionalHeadTags)) {
    for (const tag of seoSettings.additionalHeadTags) {
      if (tag.name && tag.content) {
        otherMeta[tag.name] = tag.content;
      }
    }
  }

  return {
    title: fullTitle,
    description: effectiveDescription,
    keywords: effectiveKeywords,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description: effectiveDescription,
      url: canonicalUrl || siteUrl,
      siteName: currentSiteName,
      images: [
        {
          url: currentImage,
          width: 1200,
          height: 630,
          alt: currentSiteName,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: effectiveDescription,
      images: [currentImage],
      creator: `@${SOCIAL_HANDLES.x}`,
    },
    robots: {
      index: indexRobots,
      follow: followRobots,
      ...(noarchiveRobots ? { noarchive: true } : {}),
      googleBot: {
        index: indexRobots,
        follow: followRobots,
        ...(noarchiveRobots ? { noarchive: true } : {}),
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      ...(seoSettings?.verification?.google
        ? { google: seoSettings.verification.google }
        : {}),
    },
    icons: {
      icon: currentFavicon,
      apple: currentFavicon,
    },
    ...(Object.keys(otherMeta).length > 0 ? { other: otherMeta } : {}),
  };
}

export function generateOrganizationSchema(settings?: {
  siteName?: string | null;
  tagline?: string | null;
  logoUrl?: string | null;
  phone?: string | null;
  contactEmail?: string | null;
  socialLinks?: Array<{ url: string }> | null;
}) {
  const name = settings?.siteName || siteConfig.name;
  const slogan = settings?.tagline || siteConfig.slogan;
  const logo = settings?.logoUrl || `${siteConfig.url}/images/logo.png`;
  const telephone = settings?.phone || siteConfig.contact.phone;
  const email = settings?.contactEmail || siteConfig.contact.email;
  const sameAs =
    settings?.socialLinks && settings.socialLinks.length > 0
      ? settings.socialLinks.map((s) => s.url)
      : Object.values(siteConfig.socials);

  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name,
    alternateName: "Arvishha Social Foundation",
    url: siteConfig.url,
    logo,
    description: siteConfig.description,
    slogan,
    telephone,
    email,
    sameAs,
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}
