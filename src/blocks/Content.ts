import type { Block } from "payload";

export const ContentBlock: Block = {
  slug: "content",
  interfaceName: "ContentBlock",
  labels: {
    singular: "Rich Text / Content",
    plural: "Rich Text Sections",
  },
  fields: [
    {
      name: "content",
      type: "richText",
      label: "Content",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "containerWidth",
          type: "select",
          label: "Container Width",
          defaultValue: "standard",
          admin: { width: "50%" },
          options: [
            { label: "Standard (max-w-4xl)", value: "standard" },
            { label: "Narrow / Editorial (max-w-3xl)", value: "narrow" },
            { label: "Wide (max-w-6xl)", value: "wide" },
            { label: "Full Container", value: "full" },
          ],
        },
        {
          name: "backgroundColor",
          type: "select",
          label: "Background Color",
          defaultValue: "white",
          admin: { width: "50%" },
          options: [
            { label: "White", value: "white" },
            { label: "Soft Cream (#faf9f5)", value: "cream" },
            { label: "Muted Light Gray", value: "muted" },
            { label: "Deep Dark Green", value: "darkGreen" },
          ],
        },
      ],
    },
  ],
};
