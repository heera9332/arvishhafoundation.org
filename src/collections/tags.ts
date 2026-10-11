import type { CollectionConfig } from "payload";
import { slugField } from "payload";
import { adminOnly, anyone } from "@/access";

export const Tags: CollectionConfig = {
  slug: "tags",
  labels: {
    singular: "Tag",
    plural: "Tags",
  },
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: anyone,
    update: adminOnly,
  },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Tag Name",
      required: true,
      unique: true,
      index: true,
      admin: {
        placeholder: "e.g., Education, Youth, Health, CSR",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      admin: {
        placeholder: "Brief description of topics covered under this tag",
      },
    },
    {
      name: "color",
      type: "select",
      label: "Badge Color",
      defaultValue: "emerald",
      options: [
        { label: "Emerald Green", value: "emerald" },
        { label: "Warm Amber", value: "amber" },
        { label: "Sky Blue", value: "blue" },
        { label: "Rose Red", value: "rose" },
        { label: "Violet Purple", value: "purple" },
        { label: "Slate Gray", value: "slate" },
      ],
      admin: {
        description: "Visual badge accent color for frontend rendering.",
      },
    },
    slugField(),
  ],
  timestamps: true,
};
