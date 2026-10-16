export interface MediaObject {
  id?: string | null;
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface SEORobotsSettings {
  index: boolean;
  follow: boolean;
  noarchive: boolean;
}

export interface SEOVerificationSettings {
  google?: string;
  bing?: string;
}

export interface HeadTagItem {
  id?: string | null;
  name: string;
  content: string;
}

export interface SEOSettingsData {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string;
  defaultImage?: MediaObject | string | null;
  defaultImageUrl: string;
  siteUrl: string;
  robots: SEORobotsSettings;
  verification: SEOVerificationSettings;
  additionalHeadTags: HeadTagItem[];
}
