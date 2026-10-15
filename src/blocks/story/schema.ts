import type { Block } from "payload";

export const StoryBlock: Block = {
  slug: "story",
  interfaceName: "StoryBlock",
  labels: {
    singular: "Story Section",
    plural: "Story Sections",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Our Story & Purpose",
    },
    {
      name: "heading",
      type: "text",
      label: "Heading",
      required: true,
      defaultValue: "From Grassroots Commitment to Systemic Change",
    },
    {
      name: "paragraphs",
      type: "array",
      label: "Story Paragraphs",
      fields: [
        {
          name: "text",
          type: "textarea",
          label: "Paragraph Text",
          required: true,
        },
      ],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Featured Image (Media)",
    },
    {
      name: "imageUrl",
      type: "text",
      label: "Fallback Image URL",
      defaultValue: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "imageAlt",
      type: "text",
      label: "Image Alt Text",
      defaultValue: "Arvishha Foundation community gathering",
    },
  ],
};

export default StoryBlock;
