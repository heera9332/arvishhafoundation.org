import type { Block } from "payload";
import { createLinkField } from "@/fields/link";

export const HeroBlock: Block = {
  slug: "hero",
  interfaceName: "HeroBlock",
  labels: {
    singular: "Hero Section",
    plural: "Hero Sections",
  },
  fields: [
    {
      name: "variant",
      type: "select",
      label: "Hero Style",
      defaultValue: "page",
      options: [
        { label: "Home / Large Editorial Hero", value: "home" },
        { label: "Standard / Page Banner Hero", value: "page" },
      ],
      admin: {
        description:
          "Choose 'Home' for full landing page hero with badges/stats, or 'Standard' for inner page banners.",
      },
    },
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow / Category Tag",
      defaultValue: "DEVELOPMENT. DIGNITY. SOCIAL CHANGE.",
    },
    {
      name: "heading",
      type: "text",
      label: "Main Heading",
      required: true,
      defaultValue: "Building a future where everyone can thrive.",
    },
    {
      type: "row",
      admin: {
        condition: (_, siblingData) => siblingData?.variant === "home",
      },
      fields: [
        {
          name: "headingPrefix",
          type: "text",
          label: "Heading Prefix",
          admin: { width: "25%", placeholder: "Building a future" },
        },
        {
          name: "headingMiddle",
          type: "text",
          label: "Heading Middle",
          admin: { width: "25%", placeholder: "where everyone" },
        },
        {
          name: "headingAction",
          type: "text",
          label: "Heading Action",
          admin: { width: "25%", placeholder: "can" },
        },
        {
          name: "highlightWord",
          type: "text",
          label: "Highlighted Word",
          admin: { width: "25%", placeholder: "thrive." },
        },
      ],
    },
    {
      name: "subheading",
      type: "textarea",
      label: "Subheading / Lead Paragraph",
      admin: {
        placeholder:
          "At Arvishha Foundation, we work with communities to create opportunities for children, young people, women, and families...",
      },
    },
    {
      type: "row",
      fields: [
        createLinkField({
          name: "primaryCta",
          label: "Primary Call to Action",
          disableLabel: false,
          defaultValue: "/what-we-do",
        }),
        createLinkField({
          name: "secondaryCta",
          label: "Secondary Call to Action",
          disableLabel: false,
          defaultValue: "/get-involved",
        }),
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Hero Image (Media)",
          admin: { width: "50%" },
        },
        {
          name: "imageUrl",
          type: "text",
          label: "Fallback / External Image URL",
          admin: {
            width: "50%",
            placeholder: "/images/hero-women-photo.png or https://...",
          },
        },
      ],
    },
    {
      name: "imageAlt",
      type: "text",
      label: "Image Alt Text",
      defaultValue: "Community members collaborating at Arvishha Foundation initiative",
    },
    {
      name: "stats",
      type: "array",
      label: "Key Stats (Featured in Hero)",
      admin: {
        condition: (_, siblingData) => siblingData?.variant === "home",
        initCollapsed: true,
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "value",
              type: "text",
              label: "Value",
              required: true,
              admin: { width: "25%", placeholder: "500+" },
            },
            {
              name: "label",
              type: "text",
              label: "Label",
              required: true,
              admin: { width: "25%", placeholder: "community members" },
            },
            {
              name: "sublabel",
              type: "text",
              label: "Sublabel",
              admin: { width: "25%", placeholder: "reached & empowered" },
            },
            {
              name: "icon",
              type: "select",
              label: "Icon",
              defaultValue: "Users",
              admin: { width: "25%" },
              options: [
                { label: "Users", value: "Users" },
                { label: "Sprout / Plant", value: "Sprout" },
                { label: "Target / Goal", value: "Target" },
                { label: "Heart", value: "Heart" },
                { label: "Graduation Cap", value: "GraduationCap" },
                { label: "Book Open", value: "BookOpen" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "floatingBadges",
      type: "group",
      label: "Floating Graphic Badges",
      admin: {
        condition: (_, siblingData) => siblingData?.variant === "home",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "communityFirstTitle",
              type: "text",
              label: "Badge 1 Title",
              defaultValue: "Community First",
              admin: { width: "50%" },
            },
            {
              name: "communityFirstSubtitle",
              type: "text",
              label: "Badge 1 Subtitle",
              defaultValue: "Local action. Lasting change.",
              admin: { width: "50%" },
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "proofCount",
              type: "text",
              label: "Social Proof Metric",
              defaultValue: "500+",
              admin: { width: "30%" },
            },
            {
              name: "proofText",
              type: "text",
              label: "Social Proof Description",
              defaultValue:
                "community members reached & empowered across grassroots initiatives",
              admin: { width: "70%" },
            },
          ],
        },
      ],
    },
    {
      name: "breadcrumbs",
      type: "array",
      label: "Breadcrumbs",
      admin: {
        condition: (_, siblingData) => siblingData?.variant === "page",
        initCollapsed: true,
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "label",
              type: "text",
              label: "Crumb Label",
              required: true,
              admin: { width: "50%" },
            },
            {
              name: "href",
              type: "text",
              label: "Crumb URL (Optional)",
              admin: { width: "50%" },
            },
          ],
        },
      ],
    },
  ],
};
