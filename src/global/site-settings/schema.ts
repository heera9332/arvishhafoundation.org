import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    group: "Website",
    description: "Manage global website branding, logos, contact info, social links, and maintenance mode.",
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateGlobal],
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      required: true,
      defaultValue: "My Website",
    },
    {
      name: "tagline",
      type: "text",
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "favicon",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "contactEmail",
      type: "email",
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "address",
      type: "textarea",
    },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        {
          name: "platform",
          type: "select",
          required: true,
          options: [
            { label: "Facebook", value: "facebook" },
            { label: "Instagram", value: "instagram" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "YouTube", value: "youtube" },
            { label: "X", value: "x" },
          ],
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "footerCopyright",
      type: "text",
    },
    {
      name: "maintenanceMode",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
