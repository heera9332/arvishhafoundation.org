import type { Metadata } from "next";

export const siteConfig = {
  name: "Arvishha Foundation",
  shortName: "Arvishha",
  slogan: "Development. Dignity. Social Change.",
  description:
    "Arvishha Foundation is a dedicated non-governmental organization working towards inclusive education, youth development, women empowerment, healthcare access, rights awareness, and community growth.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://arvishhafoundation.org",
  mediaUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://media.arvishhafoundation.org",
  ogImage: "/images/logo.png",
  contactPerson: {
    name: "SHANI KUMAR BASOR",
    firstName: "SHANI KUMAR",
    lastName: "BASOR",
  },
  contact: {
    phone: "+91 91119 16239",
    phoneRaw: "9111916239",
    email: "shani79083@gmail.com",
    emailAlt: "shani79083@gmail.com",
    address: {
      street: "Vill Kothi Post Khaur, Dist Rewa",
      city: "Rewa",
      region: "Madhya Pradesh",
      postalCode: "MP",
      country: "India",
    },
  },
  socials: {
    facebook: "https://facebook.com/arvishhafoundation",
    instagram: "https://instagram.com/arvishhafoundation",
    x: "https://x.com/arvishha_ngo",
    linkedin: "https://linkedin.com/company/arvishhafoundation",
  },
};

export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  canonical,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.slogan}`;

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
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@arvishha_ngo",
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
      icon: "/images/logo.png",
      apple: "/images/logo.png",
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: siteConfig.name,
    alternateName: "Arvishha Social Foundation",
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    description: siteConfig.description,
    slogan: siteConfig.slogan,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.region,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: siteConfig.contact.address.country,
    },
    sameAs: [
      siteConfig.socials.facebook,
      siteConfig.socials.instagram,
      siteConfig.socials.x,
      siteConfig.socials.linkedin,
    ],
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
