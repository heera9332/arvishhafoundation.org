import type { Block } from "payload";

export const TransparencyBlock: Block = {
  slug: "transparency",
  interfaceName: "TransparencyBlock",
  labels: {
    singular: "Transparency & Governance Section",
    plural: "Transparency & Governance Sections",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Accountability & Trust",
    },
    {
      name: "heading",
      type: "text",
      label: "Heading",
      required: true,
      defaultValue: "Governed By Highest Standards of Non-Profit Ethics",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      defaultValue:
        "Every rupee entrusted to Arvishha Foundation is accounted for with complete transparency. We maintain public audit reports, adhere strictly to FCRA, 12A, and 80G frameworks, and undergo external evaluations.",
    },
    {
      name: "stats",
      type: "array",
      label: "Accountability Stats",
      fields: [
        {
          name: "value",
          type: "text",
          label: "Stat Value",
          required: true,
        },
        {
          name: "label",
          type: "text",
          label: "Stat Label",
          required: true,
        },
      ],
    },
    {
      name: "ctaText",
      type: "text",
      label: "CTA Button Text",
      defaultValue: "Connect With Our Governance Team",
    },
    {
      name: "ctaLink",
      type: "text",
      label: "CTA Button Link",
      defaultValue: "/contact",
    },
  ],
};

export default TransparencyBlock;
