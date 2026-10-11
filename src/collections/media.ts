import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },

  admin: {
    useAsTitle: "alt",
    defaultColumns: ["filename", "mimeType", "filesize", "updatedAt"],
  },

  upload: {
    staticDir: "media",
    // Allow fetching from localhost when resizing/updating images (dev only)
    skipSafeFetch: process.env.NODE_ENV === "development",
    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
        height: 300,
        position: "centre",
      },
      {
        name: "medium",
        width: 800,
      },
      {
        name: "large",
        width: 1600,
      },
    ],
    mimeTypes: [
      "image/*",
      "video/*",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },

  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description: "Accessible alt text (used for images and SEO)",
      },
      defaultValue: "Arvishha Foundation",
    },
  ],
  folders: true,
  timestamps: true,
};
