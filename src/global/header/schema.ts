import type { GlobalConfig } from "payload";
import { createLinkField } from "@/fields/link";

export const Header: GlobalConfig = {
  slug: "header",
  label: "Header",
  access: {
    read: () => true,
    update: () => true,
  },
  admin: {
    group: "Navigation",
    description: "Manage website header branding, navigation menus, actions, and announcement settings.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "branding",
          label: "Branding",
          fields: [
            {
              name: "logo",
              type: "upload",
              relationTo: "media",
              label: "Logo Image (Media)",
              admin: {
                description: "Select uploaded logo image from Media library. If omitted, fallback static logo path is used.",
              },
            },
            {
              name: "logoUrl",
              type: "text",
              label: "Fallback Logo Image URL",
              defaultValue: "/images/logo.png",
              admin: {
                description: "Static or external image path used when no Media upload is selected.",
              },
            },
            {
              name: "logoAlt",
              type: "text",
              label: "Logo Alt Text",
              defaultValue: "Arvishha Foundation Logo",
              required: true,
            },
            {
              name: "logoLink",
              type: "text",
              label: "Logo Link Destination",
              defaultValue: "/",
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
              name: "mobileLogo",
              type: "upload",
              relationTo: "media",
              label: "Mobile Logo (Optional)",
              admin: {
                description: "Optional distinct logo used inside mobile navigation drawer.",
              },
            },
          ],
        },
        {
          name: "navigation",
          label: "Navigation",
          fields: [
            {
              name: "items",
              type: "array",
              label: "Main Navigation Links",
              labels: {
                singular: "Navigation Link",
                plural: "Navigation Links",
              },
              admin: {
                initCollapsed: false,
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
                  label: "Link Destination",
                  defaultValue: "/",
                }),
                {
                  name: "enabled",
                  type: "checkbox",
                  label: "Enabled",
                  defaultValue: true,
                },
                {
                  name: "children",
                  type: "array",
                  label: "Dropdown Submenu Items (Optional)",
                  labels: {
                    singular: "Submenu Item",
                    plural: "Submenu Items",
                  },
                  admin: {
                    initCollapsed: true,
                  },
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      required: true,
                      label: "Submenu Label",
                    },
                    createLinkField({
                      name: "link",
                      label: "Submenu Link Destination",
                      defaultValue: "/",
                    }),
                    {
                      name: "description",
                      type: "text",
                      label: "Short Description (Optional)",
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
        {
          name: "actions",
          label: "Header Actions",
          fields: [
            {
              name: "primaryCta",
              type: "group",
              label: "Primary CTA Button (Header & Mobile)",
              fields: [
                {
                  name: "enabled",
                  type: "checkbox",
                  label: "Show Primary CTA",
                  defaultValue: true,
                },
                {
                  name: "label",
                  type: "text",
                  label: "Button Label",
                  defaultValue: "Donate",
                  required: true,
                },
                {
                  name: "url",
                  type: "text",
                  label: "Destination URL / Path",
                  defaultValue: "/donate",
                  required: true,
                },
                {
                  name: "newTab",
                  type: "checkbox",
                  label: "Open in new tab",
                  defaultValue: false,
                },
                {
                  name: "showIcon",
                  type: "checkbox",
                  label: "Show Heart Icon",
                  defaultValue: true,
                },
              ],
            },
            {
              name: "secondaryCta",
              type: "group",
              label: "Secondary CTA Button (Mobile Drawer)",
              fields: [
                {
                  name: "enabled",
                  type: "checkbox",
                  label: "Show Secondary CTA",
                  defaultValue: true,
                },
                {
                  name: "label",
                  type: "text",
                  label: "Button Label",
                  defaultValue: "Become a Volunteer",
                  required: true,
                },
                {
                  name: "url",
                  type: "text",
                  label: "Destination URL / Path",
                  defaultValue: "/get-involved",
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
          name: "settings",
          label: "Header Settings",
          fields: [
            {
              name: "isSticky",
              type: "checkbox",
              label: "Sticky / Fixed Header",
              defaultValue: true,
              admin: {
                description: "Keeps the header fixed at the top of the viewport with a blur backdrop when scrolled.",
              },
            },
            {
              name: "showTopBar",
              type: "checkbox",
              label: "Show Top Announcement / Info Bar",
              defaultValue: true,
            },
            {
              name: "topBarText",
              type: "text",
              label: "Top Bar Organization Badge Text",
              defaultValue: "Non-Profit Organization",
            },
            {
              name: "phone",
              type: "text",
              label: "Contact Phone Number",
              defaultValue: "+91 91100 87834",
              admin: {
                description: "Formatted phone number shown in top bar and mobile drawer.",
              },
            },
            {
              name: "email",
              type: "text",
              label: "Contact Email Address",
              defaultValue: "info@arvishhafoundation.org",
              admin: {
                description: "Contact email shown in top bar and mobile drawer.",
              },
            },
          ],
        },
      ],
    },
  ],
};
