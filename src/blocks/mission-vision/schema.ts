import type { Block } from "payload";

export const MissionVisionBlock: Block = {
  slug: "missionVision",
  interfaceName: "MissionVisionBlock",
  labels: {
    singular: "Mission, Vision & Approach",
    plural: "Mission & Vision Sections",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Our Approach",
    },
    {
      name: "heading",
      type: "text",
      label: "Section Heading",
      required: true,
      defaultValue: "Listen. Support. Empower. Create Lasting Change.",
    },
    {
      name: "subheading",
      type: "textarea",
      label: "Section Subheading",
      defaultValue:
        "Progress happens when communities lead and sustainable systems are built collectively.",
    },
    {
      name: "leftVisual",
      type: "group",
      label: "Left Feature Card & Visual",
      fields: [
        {
          name: "badge",
          type: "text",
          label: "Badge Text",
          defaultValue: "Our Operating Philosophy",
        },
        {
          name: "title",
          type: "text",
          label: "Feature Heading",
          defaultValue: "Creating Change Where It Matters Most",
        },
        {
          name: "subtext",
          type: "textarea",
          label: "Feature Description",
          defaultValue:
            "We believe sustainable social development cannot be delivered as charity from the outside.",
        },
        {
          name: "bulletPoints",
          type: "array",
          label: "Bullet Points",
          fields: [
            { name: "point", type: "text", label: "Point", required: true },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              label: "Visual Image",
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
          name: "imageAlt",
          type: "text",
          label: "Image Alt Text",
          defaultValue:
            "Community members collaborating at Arvishha Foundation workshop",
        },
      ],
    },
    {
      name: "tabs",
      type: "array",
      label: "Tabbed Pillars (Vision / Mission / Approach)",
      minRows: 1,
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "tabId",
              type: "text",
              label: "Tab ID (e.g. vision)",
              required: true,
              admin: { width: "50%" },
            },
            {
              name: "label",
              type: "text",
              label: "Tab Button Label",
              required: true,
              admin: { width: "50%" },
            },
          ],
        },
        {
          name: "heading",
          type: "text",
          label: "Tab Content Heading",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Tab Description",
          required: true,
        },
        {
          name: "points",
          type: "array",
          label: "Key Action Points",
          fields: [
            {
              name: "point",
              type: "text",
              label: "Action Point",
              required: true,
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              label: "Tab Image",
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
      ],
    },
  ],
};
