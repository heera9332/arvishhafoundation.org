export interface FooterLinkItem {
  id?: string | null;
  label: string;
  href: string;
  newTab?: boolean;
  enabled?: boolean;
}

export interface FooterSocialItem {
  id?: string | null;
  platform: string;
  label: string;
  url: string;
  enabled?: boolean;
}

export interface FooterBranding {
  logoUrl: string;
  logoAlt: string;
  siteTitle: string;
  slogan: string;
  description: string;
  cta: {
    enabled: boolean;
    label: string;
    href: string;
    newTab?: boolean;
  };
}

export interface FooterNewsletter {
  enabled: boolean;
  badge: string;
  heading: string;
  description: string;
}

export interface FooterNavigation {
  quickLinksTitle: string;
  quickLinks: FooterLinkItem[];
  supportLinksTitle: string;
  supportLinks: FooterLinkItem[];
}

export interface FooterContact {
  title: string;
  phone: string;
  email: string;
  showBanner: boolean;
  bannerHelpLabel: string;
  bannerEmailLabel: string;
}

export interface FooterLegal {
  copyrightText: string;
  legalLinks: FooterLinkItem[];
  socialLinks: FooterSocialItem[];
}

export interface FooterData {
  branding: FooterBranding;
  newsletter: FooterNewsletter;
  navigation: FooterNavigation;
  contact: FooterContact;
  legal: FooterLegal;
}
