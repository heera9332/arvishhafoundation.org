import type { Block } from "payload";
import { createLinkField } from "@/fields/link";

export const NewsBlock: Block = {
  slug: "news",
  interfaceName: "NewsBlock",
  labels: {
    singular: "News & Stories",
    plural: "News Sections",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "News & Field Dispatches",
    },
    {
      name: "heading",
      type: "text",
      label: "Section Heading",
      required: true,
      defaultValue: "Latest Updates From Our Grassroots Programs",
    },
    {
      name: "subheading",
      type: "textarea",
      label: "Section Subheading",
      defaultValue:
        "Read about our recent milestones, community workshops, and ground-level achievements.",
    },
    createLinkField({
      name: "viewAllLink",
      label: "View All News Link",
      disableLabel: false,
      defaultValue: "/news",
    }),
    {
      name: "items",
      type: "array",
      label: "News Articles",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Article Title",
          required: true,
        },
        {
          type: "row",
          fields: [
            {
              name: "category",
              type: "text",
              label: "Category",
              defaultValue: "Education",
              admin: { width: "33%" },
            },
            {
              name: "date",
              type: "text",
              label: "Published Date",
              admin: { width: "33%" },
            },
            {
              name: "readTime",
              type: "text",
              label: "Read Time (e.g. 4 min read)",
              admin: { width: "34%" },
            },
          ],
        },
        {
          name: "excerpt",
          type: "textarea",
          label: "Article Excerpt",
          required: true,
        },
        {
          type: "row",
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              label: "Cover Image",
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
          label: "Article URL",
          defaultValue: "/news",
        },
      ],
    },
  ],
};
