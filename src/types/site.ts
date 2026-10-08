export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface SocialLink {
  platform: "facebook" | "instagram" | "x" | "linkedin" | "youtube";
  url: string;
  label: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  sublabel?: string;
  icon?: string;
}

export interface FocusAreaItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  iconName: string;
  image: string;
  colorTheme?: string;
  href: string;
  keyOutcomes?: string[];
}

export interface TabContent {
  id: string;
  title: string;
  heading: string;
  description: string;
  points?: string[];
  image?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription?: string;
  image: string;
  location: string;
  year?: string;
  status: "Active" | "Completed" | "Ongoing";
  beneficiaries?: string;
  href: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  quote: string;
  initiative?: string;
}

export interface ApproachStepItem {
  step: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  date: string;
  category: string;
  author: string;
  readTime?: string;
}

export interface ContactInfo {
  name?: string;
  firstName?: string;
  lastName?: string;
  designation?: string;
  phone: string;
  phoneAlt?: string;
  email: string;
  emailAlt?: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode?: string;
    country: string;
  };
  socialLinks: SocialLink[];
  registrationNumber?: string;
  darpanId?: string;
  taxExemption?: string;
}

