import type { Block } from "payload";

export const ImpactStatsBlock: Block = {
  slug: "impactStats",
  interfaceName: "ImpactStatsBlock",
  labels: {
    singular: "Impact & Trust Stats",
    plural: "Impact Stats Sections",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Our Collective Footprint",
    },
    {
      name: "heading",
      type: "text",
      label: "Section Heading",
      required: true,
      defaultValue: "Measurable Impact Where It Matters Most",
    },
    {
      name: "description",
      type: "textarea",
      label: "Supporting Description",
      defaultValue:
        "Every statistic represents a child returning to school, a woman securing financial independence, or a village gaining awareness on basic rights.",
    },
    {
      name: "theme",
      type: "select",
      label: "Section Theme",
      defaultValue: "light",
      options: [
        { label: "Light (Soft cream background)", value: "light" },
        { label: "Dark Green (High contrast green)", value: "darkGreen" },
      ],
    },
    {
      name: "stats",
      type: "array",
      label: "Statistics List",
      minRows: 1,
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "value",
              type: "text",
              label: "Stat Value",
              required: true,
              admin: { width: "25%", placeholder: "500+" },
            },
            {
              name: "label",
              type: "text",
              label: "Label",
              required: true,
              admin: { width: "25%", placeholder: "Community Members Reached" },
            },
            {
              name: "sublabel",
              type: "text",
              label: "Sublabel / Context",
              admin: { width: "25%", placeholder: "Across rural & peri-urban clusters" },
            },
            {
              name: "icon",
              type: "select",
              label: "Icon",
              defaultValue: "Users",
              admin: { width: "25%" },
              options: [
                { label: "Users", value: "Users" },
                { label: "Hand & Heart", value: "HandHeart" },
                { label: "Book Open", value: "BookOpen" },
                { label: "Target", value: "Target" },
                { label: "Sparkles", value: "Sparkles" },
                { label: "Sprout", value: "Sprout" },
                { label: "Heart", value: "Heart" },
                { label: "Shield Check", value: "ShieldCheck" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
