import type { FooterData } from "./types";
import { siteConfig } from "@/lib/seo";

/**
 * Initial and fallback Footer configuration matching the exact
 * hardcoded content, labels, URLs, and behaviors of the website.
 */
export const defaultFooterData: FooterData = {
  branding: {
    logoUrl: "/images/logo.png",
    logoAlt: "Arvishha Foundation Logo",
    siteTitle: "Arvishha Foundation",
    slogan: siteConfig.slogan || "विकास और सामाजिक कार्यों के लिए अग्रसर",
    description:
      "A dedicated non-governmental organization advancing child education, women empowerment, health awareness, and community dignity through grassroots action.",
    cta: {
      enabled: true,
      label: "Support Our Cause",
      href: "/donate",
      newTab: false,
    },
  },
  newsletter: {
    enabled: true,
    badge: "Stay Connected With Our Work",
    heading: "Be The First To Know — Subscribe Today",
    description:
      "Get quarterly grassroots field updates, volunteer impact stories, and community achievements delivered directly to your inbox.",
    form: null,
  },
  navigation: {
    quickLinksTitle: "Quick Links",
    quickLinks: [
      { label: "Home", href: "/", newTab: false, enabled: true },
      { label: "Who We Are", href: "/about", newTab: false, enabled: true },
      { label: "What We Do", href: "/what-we-do", newTab: false, enabled: true },
      { label: "Projects", href: "/projects", newTab: false, enabled: true },
      { label: "News & Stories", href: "/news", newTab: false, enabled: true },
      { label: "Contact Us", href: "/contact", newTab: false, enabled: true },
    ],
    supportLinksTitle: "Get Involved",
    supportLinks: [
      { label: "Donate / Support", href: "/donate", newTab: false, enabled: true },
      { label: "Become a Volunteer", href: "/get-involved#volunteer", newTab: false, enabled: true },
      { label: "Partner With Us", href: "/get-involved#partner", newTab: false, enabled: true },
      { label: "Community Chapters", href: "/what-we-do", newTab: false, enabled: true },
      { label: "Annual Reports & Transparency", href: "/about#transparency", newTab: false, enabled: true },
    ],
  },
  contact: {
    title: "Direct Contact",
    phone: siteConfig.contact.phone || "+91 95894 11413",
    email: siteConfig.contact.email || "arvishhafoundation@gmail.com",
    showBanner: true,
    bannerHelpLabel: "Need Any Help?",
    bannerEmailLabel: "E-Mail Now",
  },
  legal: {
    copyrightText: "© 2026 Arvishha Foundation. All Rights Reserved.",
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy-policy", newTab: false, enabled: true },
      { label: "Terms & Conditions", href: "/terms", newTab: false, enabled: true },
      { label: "Cookie Policy", href: "/cookie-policy", newTab: false, enabled: true },
      { label: "Sitemap", href: "/sitemap", newTab: false, enabled: true },
    ],
    socialLinks: [
      {
        platform: "instagram",
        label: "Instagram",
        url: "https://instagram.com/arvishhafoundation",
        enabled: true,
      },
      {
        platform: "youtube",
        label: "YouTube",
        url: "https://youtube.com/@arvishhafoundation",
        enabled: true,
      },
      {
        platform: "x",
        label: "X",
        url: "https://x.com/arvishha03",
        enabled: true,
      },
    ],
  },
};
