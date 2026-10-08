import type { SocialLink } from "@/types/site";

export const CONTACT_PHONE = "+91 95894 11413";
export const CONTACT_PHONE_RAW = "9589411413";
export const CONTACT_EMAIL = "arvishhafoundation@gmail.com";

export const CONTACT_PERSON = {
  name: "SHANI KUMAR BASOR",
  firstName: "SHANI KUMAR",
  lastName: "BASOR",
} as const;

export const SOCIAL_HANDLES = {
  instagram: "arvishhafoundation",
  youtube: "arvishhafoundation",
  x: "arvishha03",
} as const;

export const SOCIAL_URLS = {
  instagram: `https://instagram.com/${SOCIAL_HANDLES.instagram}`,
  youtube: `https://youtube.com/@${SOCIAL_HANDLES.youtube}`,
  x: `https://x.com/${SOCIAL_HANDLES.x}`,
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "instagram",
    url: SOCIAL_URLS.instagram,
    label: "Instagram",
  },
  {
    platform: "youtube",
    url: SOCIAL_URLS.youtube,
    label: "YouTube",
  },
  {
    platform: "x",
    url: SOCIAL_URLS.x,
    label: "X",
  },
];

export const CONTACT_DETAILS = {
  phone: CONTACT_PHONE,
  phoneRaw: CONTACT_PHONE_RAW,
  phoneAlt: CONTACT_PHONE_RAW,
  email: CONTACT_EMAIL,
  emailAlt: CONTACT_EMAIL,
  contactPerson: CONTACT_PERSON,
  socials: SOCIAL_URLS,
  socialLinks: SOCIAL_LINKS,
} as const;

export const CONTACT_INFO = CONTACT_DETAILS;
