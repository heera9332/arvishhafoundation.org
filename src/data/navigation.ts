import type { NavLink, SocialLink } from "@/types/site";
import { SOCIAL_LINKS } from "@/constants";

export const mainNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Who We Are", href: "/about" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Projects", href: "/projects" },
  { label: "News & Stories", href: "/news" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
];

export const footerQuickLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Who We Are", href: "/about" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Projects", href: "/projects" },
  { label: "News & Stories", href: "/news" },
  { label: "Contact Us", href: "/contact" },
];

export const footerSupportLinks: NavLink[] = [
  { label: "Donate / Support", href: "/donate" },
  { label: "Become a Volunteer", href: "/get-involved#volunteer" },
  { label: "Partner With Us", href: "/get-involved#partner" },
  { label: "Community Chapters", href: "/what-we-do" },
  { label: "Annual Reports & Transparency", href: "/about#transparency" },
];

export const footerLegalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export const socialLinks: SocialLink[] = [...SOCIAL_LINKS];
