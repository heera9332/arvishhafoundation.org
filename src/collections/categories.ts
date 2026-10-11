import type { CollectionConfig } from "payload";
import { slugField } from "payload";
import { adminOnly, anyone } from "@/access";
import {
  createParentField,
  createBreadcrumbsField,
} from "@payloadcms/plugin-nested-docs";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: {
    singular: "Category",
    plural: "Categories",
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
    defaultColumns: ["title", "slug", "parent", "updatedAt"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Category Title",
      required: true,
      index: true,
      admin: {
        placeholder: "e.g., Education & Youth Development",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      admin: {
        placeholder:
          "Overview of initiatives or content filed under this category.",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Category Image / Icon Banner",
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
    createParentField("categories"),
    createBreadcrumbsField("categories"),
    slugField(),
  ],
  timestamps: true,
};
