import type { HeaderData } from "./types";

/**
 * Initial and fallback Header configuration matching the exact
 * hardcoded content, labels, URLs, and behaviors of the website.
 */
export const defaultHeaderData: HeaderData = {
  branding: {
    logoUrl: "/images/logo.png",
    logoAlt: "Arvishha Foundation Logo",
    logoLink: "/",
    siteTitle: "Arvishha Foundation",
    slogan: "विकास और सामाजिक कार्यों के लिए अग्रसर",
    mobileLogoUrl: null,
  },
  navigation: {
    items: [
      {
        label: "Home",
        href: "/",
        newTab: false,
        enabled: true,
      },
      {
        label: "Who We Are",
        href: "/about",
        newTab: false,
        enabled: true,
      },
      {
        label: "What We Do",
        href: "/what-we-do",
        newTab: false,
        enabled: true,
      },
      {
        label: "Projects",
        href: "/projects",
        newTab: false,
        enabled: true,
      },
      {
        label: "News & Stories",
        href: "/news",
        newTab: false,
        enabled: true,
      },
      {
        label: "Get Involved",
        href: "/get-involved",
        newTab: false,
        enabled: true,
      },
      {
        label: "Contact",
        href: "/contact",
        newTab: false,
        enabled: true,
      },
    ],
  },
  actions: {
    primaryCta: {
      enabled: true,
      label: "Donate",
      href: "/donate",
      newTab: false,
      showIcon: true,
    },
    secondaryCta: {
      enabled: true,
      label: "Become a Volunteer",
      href: "/get-involved",
      newTab: false,
    },
  },
  settings: {
    isSticky: true,
    showTopBar: true,
    topBarText: "Non-Profit Organization",
    phone: "+91 91100 87834",
    email: "info@arvishhafoundation.org",
  },
};
