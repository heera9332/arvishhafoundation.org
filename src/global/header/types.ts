export interface HeaderLinkConfig {
  type?: "custom" | "external" | null;
  url?: string | null;
  newTab?: boolean | null;
}

export interface HeaderNavChildItem {
  id?: string | null;
  label: string;
  href: string;
  description?: string | null;
  newTab?: boolean;
  enabled?: boolean;
}

export interface HeaderNavItem {
  id?: string | null;
  label: string;
  href: string;
  newTab?: boolean;
  enabled?: boolean;
  children?: HeaderNavChildItem[];
}

export interface HeaderCta {
  enabled: boolean;
  label: string;
  href: string;
  newTab?: boolean;
  showIcon?: boolean;
}

export interface HeaderBranding {
  logoUrl: string;
  logoAlt: string;
  logoLink: string;
  siteTitle: string;
  slogan: string;
  mobileLogoUrl?: string | null;
}

export interface HeaderSettings {
  isSticky: boolean;
  showTopBar: boolean;
  topBarText: string;
  phone: string;
  email: string;
}

export interface HeaderActions {
  primaryCta: HeaderCta;
  secondaryCta: HeaderCta;
}

export interface HeaderNavigation {
  items: HeaderNavItem[];
}

export interface HeaderData {
  branding: HeaderBranding;
  navigation: HeaderNavigation;
  actions: HeaderActions;
  settings: HeaderSettings;
}
