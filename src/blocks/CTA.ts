import type { Block } from "payload";
import { createLinkField } from "@/fields/link";

export const CTABlock: Block = {
  slug: "cta",
  interfaceName: "CTABlock",
  labels: {
    singular: "Call to Action Banner",
    plural: "CTA Sections",
  },
  fields: [
    {
      name: "badge",
      type: "text",
      label: "Top Badge Text",
      defaultValue: "Join Hands With Arvishha",
    },
    {
      name: "heading",
      type: "text",
      label: "CTA Heading",
      required: true,
      defaultValue: "Together, We Can Create Lasting Change.",
    },
    {
      name: "subheading",
      type: "textarea",
      label: "CTA Subheading",
      defaultValue:
        "Every child in school, every empowered woman, and every healthy community starts with a conscious decision to get involved.",
    },
    {
      name: "theme",
      type: "select",
      label: "Color Theme",
      defaultValue: "darkGreen",
      options: [
        { label: "Deep Forest Green Gradient", value: "darkGreen" },
        { label: "Emerald Green", value: "emerald" },
        { label: "Warm Cream", value: "cream" },
      ],
    },
    {
      type: "row",
      fields: [
        createLinkField({
          name: "primaryCta",
          label: "Primary Button",
          disableLabel: false,
          defaultValue: "/donate",
        }),
        createLinkField({
          name: "secondaryCta",
          label: "Secondary Button",
          disableLabel: false,
          defaultValue: "/get-involved",
        }),
      ],
    },
  ],
};
