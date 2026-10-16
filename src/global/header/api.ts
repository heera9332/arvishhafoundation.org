import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { HeaderData, HeaderNavItem, HeaderNavChildItem } from "./types";
import { defaultHeaderData } from "./defaults";
import { getSiteSettings } from "@/global/site-settings";
import type { SiteSettingsData } from "@/global/site-settings";


interface RawMediaObject {
  url?: string | null;
  alt?: string | null;
}

interface RawLinkGroup {
  type?: "custom" | "external" | null;
  url?: string | null;
  newTab?: boolean | null;
}

interface RawChildItem {
  id?: string | null;
  label?: string | null;
  link?: RawLinkGroup | null;
  url?: string | null;
  description?: string | null;
  enabled?: boolean | null;
}

interface RawNavItem {
  id?: string | null;
  label?: string | null;
  link?: RawLinkGroup | null;
  url?: string | null;
  enabled?: boolean | null;
  children?: RawChildItem[] | null;
}

interface RawHeaderDoc {
  branding?: {
    logo?: RawMediaObject | string | null;
    logoUrl?: string | null;
    logoAlt?: string | null;
    logoLink?: string | null;
    siteTitle?: string | null;
    slogan?: string | null;
    mobileLogo?: RawMediaObject | string | null;
  } | null;
  navigation?: {
    items?: RawNavItem[] | null;
  } | null;
  actions?: {
    primaryCta?: {
      enabled?: boolean | null;
      label?: string | null;
      url?: string | null;
      newTab?: boolean | null;
      showIcon?: boolean | null;
    } | null;
    secondaryCta?: {
      enabled?: boolean | null;
      label?: string | null;
      url?: string | null;
      newTab?: boolean | null;
    } | null;
  } | null;
  settings?: {
    isSticky?: boolean | null;
    showTopBar?: boolean | null;
    topBarText?: string | null;
    phone?: string | null;
    email?: string | null;
  } | null;
}

/**
 * Format raw Payload Global document into typed HeaderData with complete fallback preservation.
 */
function formatHeaderData(raw: RawHeaderDoc, siteSettings?: SiteSettingsData): HeaderData {
  const branding = raw.branding;
  const navigation = raw.navigation;
  const actions = raw.actions;
  const settings = raw.settings;

  // Resolve logo URL
  let logoUrl = siteSettings?.logoUrl || defaultHeaderData.branding.logoUrl;
  if (branding?.logo && typeof branding.logo === "object" && branding.logo.url) {
    logoUrl = branding.logo.url;
  } else if (branding?.logoUrl) {
    logoUrl = branding.logoUrl;
  }

  // Resolve mobile logo URL
  let mobileLogoUrl: string | null = null;
  if (
    branding?.mobileLogo &&
    typeof branding.mobileLogo === "object" &&
    branding.mobileLogo.url
  ) {
    mobileLogoUrl = branding.mobileLogo.url;
  }

  // Format navigation items
  const rawItems = navigation?.items;
  let items: HeaderNavItem[] = defaultHeaderData.navigation.items;

  if (Array.isArray(rawItems) && rawItems.length > 0) {
    items = rawItems
      .filter((item) => item?.enabled !== false && Boolean(item?.label))
      .map((item) => {
        const href = item.link?.url || item.url || "/";
        const newTab = Boolean(item.link?.newTab);

        const children: HeaderNavChildItem[] = Array.isArray(item.children)
          ? item.children
              .filter(
                (child) => child?.enabled !== false && Boolean(child?.label)
              )
              .map((child) => ({
                id: child.id,
                label: child.label || "",
                href: child.link?.url || child.url || "/",
                description: child.description || null,
                newTab: Boolean(child.link?.newTab),
                enabled: child.enabled !== false,
              }))
          : [];

        return {
          id: item.id,
          label: item.label || "",
          href,
          newTab,
          enabled: item.enabled !== false,
          children: children.length > 0 ? children : undefined,
        };
      });
  }

  return {
    branding: {
      logoUrl,
      logoAlt: branding?.logoAlt || defaultHeaderData.branding.logoAlt,
      logoLink: branding?.logoLink || defaultHeaderData.branding.logoLink,
      siteTitle: branding?.siteTitle || siteSettings?.siteName || defaultHeaderData.branding.siteTitle,
      slogan: branding?.slogan || siteSettings?.tagline || defaultHeaderData.branding.slogan,
      mobileLogoUrl,
    },
    navigation: {
      items,
    },
    actions: {
      primaryCta: {
        enabled: actions?.primaryCta?.enabled !== false,
        label: actions?.primaryCta?.label || defaultHeaderData.actions.primaryCta.label,
        href: actions?.primaryCta?.url || defaultHeaderData.actions.primaryCta.href,
        newTab: Boolean(actions?.primaryCta?.newTab),
        showIcon: actions?.primaryCta?.showIcon !== false,
      },
      secondaryCta: {
        enabled: actions?.secondaryCta?.enabled !== false,
        label:
          actions?.secondaryCta?.label ||
          defaultHeaderData.actions.secondaryCta.label,
        href:
          actions?.secondaryCta?.url ||
          defaultHeaderData.actions.secondaryCta.href,
        newTab: Boolean(actions?.secondaryCta?.newTab),
      },
    },
    settings: {
      isSticky: settings?.isSticky !== false,
      showTopBar: settings?.showTopBar !== false,
      topBarText:
        settings?.topBarText || defaultHeaderData.settings.topBarText,
      phone: settings?.phone || siteSettings?.phone || defaultHeaderData.settings.phone,
      email: settings?.email || siteSettings?.contactEmail || defaultHeaderData.settings.email,
    },
  };
}

/**
 * Fetch Header global from Payload CMS with resilient defaults.
 */
export async function getHeaderData(): Promise<HeaderData> {
  const siteSettings = await getSiteSettings();

  try {
    const payload = await getPayload({ config: configPromise });

    // Fetch existing header global
    const headerDoc = (await payload.findGlobal({
      slug: "header",
      depth: 1,
    })) as RawHeaderDoc;

    if (headerDoc) {
      return formatHeaderData(headerDoc, siteSettings);
    }

    return formatHeaderData(defaultHeaderData as unknown as RawHeaderDoc, siteSettings);
  } catch (error) {
    console.warn(
      "[Header API] CMS unavailable, using default header configuration:",
      error
    );
    return formatHeaderData(defaultHeaderData as unknown as RawHeaderDoc, siteSettings);
  }
}
