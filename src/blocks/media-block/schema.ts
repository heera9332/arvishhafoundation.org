import type { Block } from "payload";

export const MediaBlock: Block = {
  slug: "mediaBlock",
  interfaceName: "MediaBlock",
  labels: {
    singular: "Media / Image Banner",
    plural: "Media Blocks",
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "media",
          type: "upload",
          relationTo: "media",
          label: "Uploaded Media",
          admin: { width: "50%" },
        },
        {
          name: "mediaUrl",
          type: "text",
          label: "Fallback Media URL",
          admin: { width: "50%" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "alt",
          type: "text",
          label: "Alt Text",
          defaultValue: "Arvishha Foundation Initiative",
          admin: { width: "50%" },
        },
        {
          name: "caption",
          type: "text",
          label: "Caption (Optional)",
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "size",
      type: "select",
      label: "Display Size",
      defaultValue: "wide",
      options: [
        { label: "Standard (Container width)", value: "normal" },
        { label: "Wide (Extended container)", value: "wide" },
        { label: "Full Width (Screen width)", value: "fullscreen" },
      ],
    },
  ],
};
