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

export function constructMetadata({
  title,
  description = siteConfig.description,
  image,
  canonical,
  noIndex = false,
  siteName,
  tagline,
  favicon,
}: {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
  siteName?: string;
  tagline?: string;
  favicon?: string;
} = {}): Metadata {
  const currentSiteName = siteName || siteConfig.name;
  const currentTagline = tagline || siteConfig.slogan;
  const currentImage = image || siteConfig.ogImage;
  const currentFavicon = favicon || "/images/logo.png";

  const fullTitle = title
    ? `${title} | ${currentSiteName}`
    : `${currentSiteName} — ${currentTagline}`;

  const canonicalUrl = canonical
    ? `${siteConfig.url}${canonical.startsWith("/") ? canonical : `/${canonical}`}`
    : undefined;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl || siteConfig.url,
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
      description,
      images: [currentImage],
      creator: `@${SOCIAL_HANDLES.x}`,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: currentFavicon,
      apple: currentFavicon,
    },
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
