import type { Page } from "@/payload-types";

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "x";

export interface SocialLinkItem {
  id?: string | null;
  platform: SocialPlatform;
  url: string;
}

export interface MediaObject {
  id?: string | null;
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface SiteSettingsData {
  siteName: string;
  tagline?: string;
  homePage?: Page | string | null;
  homePageSlug?: string | null;
  logo?: MediaObject | string | null;
  logoUrl: string;
  favicon?: MediaObject | string | null;
  faviconUrl: string;
  contactEmail?: string;
  phone?: string;
  address?: string;
  socialLinks: SocialLinkItem[];
  footerCopyright?: string;
  maintenanceMode: boolean;
}
