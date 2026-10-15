import type { Block } from "payload";

export const PillarsBlock: Block = {
  slug: "pillars",
  interfaceName: "PillarsBlock",
  labels: {
    singular: "Intervention Pillars Section",
    plural: "Intervention Pillars Sections",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Section Eyebrow",
      defaultValue: "Our Core Pillars",
    },
    {
      name: "heading",
      type: "text",
      label: "Section Heading",
      defaultValue: "Targeted Interventions Built for Sustainable Social Impact",
    },
    {
      name: "description",
      type: "textarea",
      label: "Section Description",
    },
    {
      name: "items",
      type: "array",
      label: "Pillars",
      fields: [
        {
          name: "id",
          type: "text",
          label: "Pillar Anchor ID (e.g. education, women, healthcare)",
        },
        {
          name: "title",
          type: "text",
          label: "Pillar Tag / Eyebrow (e.g. Education & Youth)",
          required: true,
        },
        {
          name: "heading",
          type: "text",
          label: "Pillar Heading",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Pillar Description",
          required: true,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Pillar Image (Media)",
        },
        {
          name: "imageUrl",
          type: "text",
          label: "Fallback Image URL",
        },
        {
          name: "initiatives",
          type: "array",
          label: "Key Initiatives",
          fields: [
            {
              name: "title",
              type: "text",
              label: "Initiative Title",
              required: true,
            },
            {
              name: "desc",
              type: "textarea",
              label: "Initiative Description",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "showCta",
      type: "checkbox",
      label: "Show Bottom CTA Banner",
      defaultValue: true,
    },
    {
      name: "ctaHeading",
      type: "text",
      label: "CTA Heading",
      defaultValue: "Help Us Expand These Programs To More Communities",
    },
    {
      name: "ctaDescription",
      type: "textarea",
      label: "CTA Description",
      defaultValue:
        "Every donation and volunteer hour directly strengthens our classrooms, medical checkup camps, and livelihood training programs.",
    },
    {
      name: "primaryCtaText",
      type: "text",
      label: "Primary CTA Button Text",
      defaultValue: "Donate Today",
    },
    {
      name: "primaryCtaLink",
      type: "text",
      label: "Primary CTA Link",
      defaultValue: "/donate",
    },
    {
      name: "secondaryCtaText",
      type: "text",
      label: "Secondary CTA Button Text",
      defaultValue: "Volunteer With Us",
    },
    {
      name: "secondaryCtaLink",
      type: "text",
      label: "Secondary CTA Link",
      defaultValue: "/get-involved",
    },
  ],
};

export default PillarsBlock;
