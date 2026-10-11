import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { FooterData, FooterLinkItem, FooterSocialItem } from "./types";
import { defaultFooterData } from "./defaults";

// In-memory flag so auto-seeding is only attempted once per server lifetime
let isSeededOrChecked = false;

interface RawMediaObject {
  url?: string | null;
  alt?: string | null;
}

interface RawLinkGroup {
  type?: "custom" | "external" | null;
  url?: string | null;
  newTab?: boolean | null;
}

interface RawFooterLinkItem {
  id?: string | null;
  label?: string | null;
  link?: RawLinkGroup | null;
  url?: string | null;
  enabled?: boolean | null;
}

interface RawFooterSocialItem {
  id?: string | null;
  platform?: string | null;
  label?: string | null;
  url?: string | null;
  enabled?: boolean | null;
}

interface RawFooterDoc {
  branding?: {
    logo?: RawMediaObject | string | null;
    logoUrl?: string | null;
    logoAlt?: string | null;
    siteTitle?: string | null;
    slogan?: string | null;
    description?: string | null;
    cta?: {
      enabled?: boolean | null;
      label?: string | null;
      url?: string | null;
      newTab?: boolean | null;
    } | null;
  } | null;
  newsletter?: {
    enabled?: boolean | null;
    badge?: string | null;
    heading?: string | null;
    description?: string | null;
  } | null;
  navigation?: {
    quickLinksTitle?: string | null;
    quickLinks?: RawFooterLinkItem[] | null;
    supportLinksTitle?: string | null;
    supportLinks?: RawFooterLinkItem[] | null;
  } | null;
  contact?: {
    title?: string | null;
    phone?: string | null;
    email?: string | null;
    showBanner?: boolean | null;
    bannerHelpLabel?: string | null;
    bannerEmailLabel?: string | null;
  } | null;
  legal?: {
    copyrightText?: string | null;
    legalLinks?: RawFooterLinkItem[] | null;
    socialLinks?: RawFooterSocialItem[] | null;
  } | null;
}

function mapLinks(raw?: RawFooterLinkItem[] | null, fallback: FooterLinkItem[] = []): FooterLinkItem[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    return fallback;
  }
  return raw
    .filter((item) => item?.enabled !== false && Boolean(item?.label))
    .map((item) => ({
      id: item.id,
      label: item.label || "",
      href: item.link?.url || item.url || "/",
      newTab: Boolean(item.link?.newTab),
      enabled: item.enabled !== false,
    }));
}

function mapSocials(
  raw?: RawFooterSocialItem[] | null,
  fallback: FooterSocialItem[] = []
): FooterSocialItem[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    return fallback;
  }
  return raw
    .filter((item) => item?.enabled !== false && Boolean(item?.label && item?.url))
    .map((item) => ({
      id: item.id,
      platform: item.platform || "x",
      label: item.label || "",
      url: item.url || "#",
      enabled: item.enabled !== false,
    }));
}

function formatFooterData(raw: RawFooterDoc): FooterData {
  const branding = raw.branding;
  const newsletter = raw.newsletter;
  const navigation = raw.navigation;
  const contact = raw.contact;
  const legal = raw.legal;

  // Resolve logo URL
  let logoUrl = defaultFooterData.branding.logoUrl;
  if (branding?.logo && typeof branding.logo === "object" && branding.logo.url) {
    logoUrl = branding.logo.url;
  } else if (branding?.logoUrl) {
    logoUrl = branding.logoUrl;
  }

  return {
    branding: {
      logoUrl,
      logoAlt: branding?.logoAlt || defaultFooterData.branding.logoAlt,
      siteTitle: branding?.siteTitle || defaultFooterData.branding.siteTitle,
      slogan: branding?.slogan || defaultFooterData.branding.slogan,
      description: branding?.description || defaultFooterData.branding.description,
      cta: {
        enabled: branding?.cta?.enabled !== false,
        label: branding?.cta?.label || defaultFooterData.branding.cta.label,
        href: branding?.cta?.url || defaultFooterData.branding.cta.href,
        newTab: Boolean(branding?.cta?.newTab),
      },
    },
    newsletter: {
      enabled: newsletter?.enabled !== false,
      badge: newsletter?.badge || defaultFooterData.newsletter.badge,
      heading: newsletter?.heading || defaultFooterData.newsletter.heading,
      description: newsletter?.description || defaultFooterData.newsletter.description,
    },
    navigation: {
      quickLinksTitle:
        navigation?.quickLinksTitle || defaultFooterData.navigation.quickLinksTitle,
      quickLinks: mapLinks(navigation?.quickLinks, defaultFooterData.navigation.quickLinks),
      supportLinksTitle:
        navigation?.supportLinksTitle || defaultFooterData.navigation.supportLinksTitle,
      supportLinks: mapLinks(
        navigation?.supportLinks,
        defaultFooterData.navigation.supportLinks
      ),
    },
    contact: {
      title: contact?.title || defaultFooterData.contact.title,
      phone: contact?.phone || defaultFooterData.contact.phone,
      email: contact?.email || defaultFooterData.contact.email,
      showBanner: contact?.showBanner !== false,
      bannerHelpLabel:
        contact?.bannerHelpLabel || defaultFooterData.contact.bannerHelpLabel,
      bannerEmailLabel:
        contact?.bannerEmailLabel || defaultFooterData.contact.bannerEmailLabel,
    },
    legal: {
      copyrightText: legal?.copyrightText || defaultFooterData.legal.copyrightText,
      legalLinks: mapLinks(legal?.legalLinks, defaultFooterData.legal.legalLinks),
      socialLinks: mapSocials(legal?.socialLinks, defaultFooterData.legal.socialLinks),
    },
  };
}

/**
 * Fetch Footer global from Payload CMS with safe auto-seeding and resilient defaults.
 */
export async function getFooterData(): Promise<FooterData> {
  try {
    const payload = await getPayload({ config: configPromise });

    // Fetch existing footer global
    const footerDoc = (await payload.findGlobal({
      slug: "footer",
      depth: 1,
    })) as RawFooterDoc;

    const hasContent =
      Array.isArray(footerDoc?.navigation?.quickLinks) &&
      footerDoc.navigation.quickLinks.length > 0;

    if (!hasContent && !isSeededOrChecked) {
      isSeededOrChecked = true;
      try {
        await payload.updateGlobal({
          slug: "footer",
          data: {
            branding: {
              logoUrl: defaultFooterData.branding.logoUrl,
              logoAlt: defaultFooterData.branding.logoAlt,
              siteTitle: defaultFooterData.branding.siteTitle,
              slogan: defaultFooterData.branding.slogan,
              description: defaultFooterData.branding.description,
              cta: {
                enabled: defaultFooterData.branding.cta.enabled,
                label: defaultFooterData.branding.cta.label,
                url: defaultFooterData.branding.cta.href,
                newTab: false,
              },
            },
            newsletter: {
              enabled: defaultFooterData.newsletter.enabled,
              badge: defaultFooterData.newsletter.badge,
              heading: defaultFooterData.newsletter.heading,
              description: defaultFooterData.newsletter.description,
            },
            navigation: {
              quickLinksTitle: defaultFooterData.navigation.quickLinksTitle,
              quickLinks: defaultFooterData.navigation.quickLinks.map((item) => ({
                label: item.label,
                link: { type: "custom" as const, url: item.href, newTab: false },
                enabled: true,
              })),
              supportLinksTitle: defaultFooterData.navigation.supportLinksTitle,
              supportLinks: defaultFooterData.navigation.supportLinks.map((item) => ({
                label: item.label,
                link: { type: "custom" as const, url: item.href, newTab: false },
                enabled: true,
              })),
            },
            contact: {
              title: defaultFooterData.contact.title,
              phone: defaultFooterData.contact.phone,
              email: defaultFooterData.contact.email,
              showBanner: defaultFooterData.contact.showBanner,
              bannerHelpLabel: defaultFooterData.contact.bannerHelpLabel,
              bannerEmailLabel: defaultFooterData.contact.bannerEmailLabel,
            },
            legal: {
              copyrightText: defaultFooterData.legal.copyrightText,
              legalLinks: defaultFooterData.legal.legalLinks.map((item) => ({
                label: item.label,
                link: { type: "custom" as const, url: item.href, newTab: false },
                enabled: true,
              })),
              socialLinks: defaultFooterData.legal.socialLinks.map((item) => ({
                platform: item.platform,
                label: item.label,
                url: item.url,
                enabled: true,
              })),
            },
          },
        });
      } catch (seedErr) {
        console.warn("[Footer API] Auto-seeding skipped:", seedErr);
      }
      return defaultFooterData;
    }

    if (hasContent) {
      return formatFooterData(footerDoc);
    }

    return defaultFooterData;
  } catch (error) {
    console.warn(
      "[Footer API] CMS unavailable, using default footer configuration:",
      error
    );
    return defaultFooterData;
  }
}
