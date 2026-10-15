import type { Block } from "payload";

export const FocusAreasBlock: Block = {
  slug: "focusAreas",
  interfaceName: "FocusAreasBlock",
  labels: {
    singular: "Focus Areas",
    plural: "Focus Areas Sections",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "What We Do",
    },
    {
      name: "heading",
      type: "text",
      label: "Section Heading",
      required: true,
      defaultValue: "Building Stronger Communities Through Meaningful Social Action",
    },
    {
      name: "description",
      type: "textarea",
      label: "Section Description",
      defaultValue:
        "Our targeted programs address root causes of inequality and poverty through sustainable community partnerships.",
    },
    {
      name: "items",
      type: "array",
      label: "Focus Area Cards",
      minRows: 1,
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "title",
              type: "text",
              label: "Area Title",
              required: true,
              admin: { width: "50%" },
            },
            {
              name: "iconName",
              type: "select",
              label: "Icon",
              defaultValue: "GraduationCap",
              admin: { width: "50%" },
              options: [
                { label: "Education (Graduation Cap)", value: "GraduationCap" },
                { label: "Women Empowerment (Sparkles)", value: "Sparkles" },
                { label: "Child Welfare (Shield Check)", value: "ShieldCheck" },
                { label: "Healthcare (Heart Pulse)", value: "HeartPulse" },
                { label: "Rural Development (Building)", value: "Building2" },
                { label: "Environment (Leaf)", value: "Leaf" },
                { label: "Community (Users)", value: "Users" },
                { label: "Compassion (Heart)", value: "Heart" },
              ],
            },
          ],
        },
        {
          name: "description",
          type: "textarea",
          label: "Card Description",
          required: true,
        },
        {
          type: "row",
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              label: "Card Image (Media)",
              admin: { width: "50%" },
            },
            {
              name: "imageUrl",
              type: "text",
              label: "Fallback Image URL",
              admin: { width: "50%" },
            },
          ],
        },
        {
          name: "href",
          type: "text",
          label: "Link Destination",
          defaultValue: "/what-we-do",
        },
        {
          name: "keyOutcomes",
          type: "array",
          label: "Key Outcomes / Highlights",
          admin: { initCollapsed: true },
          fields: [
            {
              name: "outcome",
              type: "text",
              label: "Outcome Point",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
