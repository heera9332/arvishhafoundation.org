import type { GlobalConfig } from "payload";
import { createLinkField } from "@/fields/link";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  access: {
    read: () => true,
    update: () => true,
  },
  admin: {
    group: "Navigation",
    description: "Manage global website footer branding, navigation columns, newsletter info, direct contact, and copyright.",
  },
  hooks: {
    afterChange: [revalidateGlobal],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "branding",
          label: "Branding & About",
          fields: [
            {
              name: "logo",
              type: "upload",
              relationTo: "media",
              label: "Footer Logo (Media)",
              admin: {
                description: "Select uploaded logo from Media library. If omitted, fallback static logo is used.",
              },
            },
            {
              name: "logoUrl",
              type: "text",
              label: "Fallback Logo Image URL",
              defaultValue: "/images/logo.png",
            },
            {
              name: "logoAlt",
              type: "text",
              label: "Logo Alt Text",
              defaultValue: "Arvishha Foundation Logo",
              required: true,
            },
            {
              name: "siteTitle",
              type: "text",
              label: "Brand / Organization Name",
              defaultValue: "Arvishha Foundation",
              required: true,
            },
            {
              name: "slogan",
              type: "text",
              label: "Hindi Tagline / Slogan",
              defaultValue: "विकास और सामाजिक कार्यों के लिए अग्रसर",
            },
            {
              name: "description",
              type: "textarea",
              label: "Short Organization Description",
              defaultValue:
                "A dedicated non-governmental organization advancing child education, women empowerment, health awareness, and community dignity through grassroots action.",
            },
            {
              name: "cta",
              type: "group",
              label: "Brand CTA Button",
              fields: [
                {
                  name: "enabled",
                  type: "checkbox",
                  label: "Show Button",
                  defaultValue: true,
                },
                {
                  name: "label",
                  type: "text",
                  label: "Button Label",
                  defaultValue: "Support Our Cause",
                  required: true,
                },
                {
                  name: "url",
                  type: "text",
                  label: "Destination URL",
                  defaultValue: "/donate",
                  required: true,
                },
                {
                  name: "newTab",
                  type: "checkbox",
                  label: "Open in new tab",
                  defaultValue: false,
                },
              ],
            },
          ],
        },
        {
          name: "newsletter",
          label: "Newsletter Block",
          fields: [
            {
              name: "enabled",
              type: "checkbox",
              label: "Show Newsletter Section",
              defaultValue: true,
            },
            {
              name: "badge",
              type: "text",
              label: "Section Subheading Badge",
              defaultValue: "Stay Connected With Our Work",
            },
            {
              name: "heading",
              type: "text",
              label: "Section Main Heading",
              defaultValue: "Be The First To Know — Subscribe Today",
            },
            {
              name: "description",
              type: "textarea",
              label: "Section Description",
              defaultValue:
                "Get quarterly grassroots field updates, volunteer impact stories, and community achievements delivered directly to your inbox.",
            },
            {
              name: "form",
              type: "relationship",
              relationTo: "forms",
              label: "Select Newsletter / Subscribe Form",
              admin: {
                description:
                  "Choose a form created in Form Builder to collect subscriber submissions.",
              },
            },
          ],
        },
        {
          name: "navigation",
          label: "Navigation Columns",
          fields: [
            {
              name: "quickLinksTitle",
              type: "text",
              label: "Column 1 Title",
              defaultValue: "Quick Links",
              required: true,
            },
            {
              name: "quickLinks",
              type: "array",
              label: "Quick Links (Column 1)",
              labels: {
                singular: "Quick Link",
                plural: "Quick Links",
              },
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  label: "Link Label",
                },
                createLinkField({
                  name: "link",
                  label: "Destination",
                  defaultValue: "/",
                }),
                {
                  name: "enabled",
                  type: "checkbox",
                  label: "Enabled",
                  defaultValue: true,
                },
              ],
            },
            {
              name: "supportLinksTitle",
              type: "text",
              label: "Column 2 Title",
              defaultValue: "Get Involved",
              required: true,
            },
            {
              name: "supportLinks",
              type: "array",
              label: "Get Involved Links (Column 2)",
              labels: {
                singular: "Support Link",
                plural: "Support Links",
              },
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  label: "Link Label",
                },
                createLinkField({
                  name: "link",
                  label: "Destination",
                  defaultValue: "/",
                }),
                {
                  name: "enabled",
                  type: "checkbox",
                  label: "Enabled",
                  defaultValue: true,
                },
              ],
            },
          ],
        },
        {
          name: "contact",
          label: "Contact & Banner",
          fields: [
            {
              name: "title",
              type: "text",
              label: "Column 3 Title",
              defaultValue: "Direct Contact",
              required: true,
            },
            {
              name: "phone",
              type: "text",
              label: "Contact Phone Number",
              defaultValue: "+91 95894 11413",
            },
            {
              name: "email",
              type: "text",
              label: "Contact Email Address",
              defaultValue: "arvishhafoundation@gmail.com",
            },
            {
              name: "showBanner",
              type: "checkbox",
              label: "Show Visual Contact Banner",
              defaultValue: true,
            },
            {
              name: "bannerHelpLabel",
              type: "text",
              label: "Banner Phone Callout Label",
              defaultValue: "Need Any Help?",
            },
            {
              name: "bannerEmailLabel",
              type: "text",
              label: "Banner Email Callout Label",
              defaultValue: "E-Mail Now",
            },
          ],
        },
        {
          name: "legal",
          label: "Legal & Social",
          fields: [
            {
              name: "copyrightText",
              type: "text",
              label: "Copyright Text",
              defaultValue: "© 2026 Arvishha Foundation. All Rights Reserved.",
              required: true,
            },
            {
              name: "legalLinks",
              type: "array",
              label: "Bottom Legal Links",
              labels: {
                singular: "Legal Link",
                plural: "Legal Links",
              },
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  label: "Link Label",
                },
                createLinkField({
                  name: "link",
                  label: "Destination",
                  defaultValue: "/",
                }),
                {
                  name: "enabled",
                  type: "checkbox",
                  label: "Enabled",
                  defaultValue: true,
                },
              ],
            },
            {
              name: "socialLinks",
              type: "array",
              label: "Social Media Links",
              labels: {
                singular: "Social Link",
                plural: "Social Links",
              },
              fields: [
                {
                  name: "platform",
                  type: "text",
                  label: "Platform Identifier (e.g. instagram, youtube, x, facebook)",
                  defaultValue: "instagram",
                  required: true,
                },
                {
                  name: "label",
                  type: "text",
                  label: "Display Label",
                  required: true,
                },
                {
                  name: "url",
                  type: "text",
                  label: "Profile / Channel URL",
                  required: true,
                },
                {
                  name: "enabled",
                  type: "checkbox",
                  label: "Enabled",
                  defaultValue: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
