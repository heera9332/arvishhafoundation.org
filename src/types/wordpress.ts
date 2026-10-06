export interface WPPost {
  id: number;
  date: string;
  slug: string;
  status: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected?: boolean;
  };
  excerpt: {
    rendered: string;
    protected?: boolean;
  };
  featured_media?: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
      media_details?: {
        sizes?: Record<string, { source_url: string }>;
      };
    }>;
    author?: Array<{
      name: string;
      avatar_urls?: Record<string, string>;
    }>;
    "wp:term"?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
      }>
    >;
  };
}

export interface WPContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface WPApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  code?: string;
}
