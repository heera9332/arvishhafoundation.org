import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

export const SEOSettings: GlobalConfig = {
  slug: "seo-settings",
  label: "SEO Settings",
  admin: {
    group: "Website",
    description: "Manage default SEO settings for the entire website.",
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateGlobal],
  },
  fields: [
    {
      name: "defaultTitle",
      type: "text",
      required: true,
      defaultValue: "My Website",
      admin: {
        description: "Default title used when a page has no SEO title.",
      },
    },
    {
      name: "titleTemplate",
      type: "text",
      defaultValue: "%s | My Website",
      admin: {
        description: "Use %s as the page title placeholder.",
      },
    },
    {
      name: "defaultDescription",
      type: "textarea",
      maxLength: 320,
    },
    {
      name: "defaultKeywords",
      type: "text",
      admin: {
        description: "Optional comma-separated keywords.",
      },
    },
    {
      name: "defaultImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Default Open Graph and social sharing image.",
      },
    },
    {
      name: "siteUrl",
      type: "text",
      required: true,
      admin: {
        description: "Canonical website origin, e.g. https://example.com",
      },
    },
    {
      name: "robots",
      type: "group",
      fields: [
        {
          name: "index",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "follow",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "noarchive",
          type: "checkbox",
          defaultValue: false,
        },
      ],
    },
    {
      name: "verification",
      type: "group",
      fields: [
        {
          name: "google",
          type: "text",
          admin: {
            description: "Google Search Console verification token.",
          },
        },
        {
          name: "bing",
          type: "text",
          admin: {
            description: "Bing Webmaster Tools verification token.",
          },
        },
      ],
    },
    {
      name: "additionalHeadTags",
      type: "array",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "content",
          type: "text",
          required: true,
        },
      ],
      admin: {
        description: "Optional custom metadata name/content pairs.",
      },
    },
  ],
};
