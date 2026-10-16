import type { Block } from "payload";
import { createLinkField } from "@/fields/link";

export const PostsGridBlock: Block = {
  slug: "postsGrid",
  interfaceName: "PostsGridBlock",
  labels: {
    singular: "Posts Grid / Listing",
    plural: "Posts Grids / Listings",
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "postType",
          type: "select",
          label: "Post Type",
          defaultValue: "all",
          required: true,
          admin: {
            width: "50%",
            description: "Choose to display news articles, ground projects, or both.",
          },
          options: [
            { label: "All Posts (News & Projects)", value: "all" },
            { label: "News & Community Stories Only", value: "news" },
            { label: "Projects & Ground Initiatives Only", value: "projects" },
          ],
        },
        {
          name: "limit",
          type: "number",
          label: "Number of Posts (Per Page / Total)",
          defaultValue: 6,
          required: true,
          min: 1,
          max: 50,
          admin: {
            width: "50%",
            description: "Number of items per page (or max items when pagination is disabled).",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "enableSearch",
          type: "checkbox",
          label: "Enable Search Bar",
          defaultValue: true,
          admin: {
            width: "50%",
            description: "Allow visitors to search in real time by title, description, and keywords.",
          },
        },
        {
          name: "enablePagination",
          type: "checkbox",
          label: "Enable Pagination",
          defaultValue: true,
          admin: {
            width: "50%",
            description: "Enable page numbers and navigation when posts exceed the limit.",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "showCategoryFilter",
          type: "checkbox",
          label: "Show Category Filter Tabs",
          defaultValue: true,
          admin: {
            width: "50%",
            description: "Show interactive category tabs (e.g., Education, Healthcare, Empowerment).",
          },
        },
        {
          name: "variant",
          type: "select",
          label: "Card Style",
          defaultValue: "grid",
          admin: {
            width: "50%",
            description: "Visual card presentation style.",
          },
          options: [
            { label: "Standard Grid (3 Columns)", value: "grid" },
            { label: "Detailed Cards", value: "detailed" },
          ],
        },
      ],
    },
    {
      name: "eyebrow",
      type: "text",
      label: "Section Eyebrow",
      defaultValue: "Our Work & Dispatches",
    },
    {
      name: "heading",
      type: "text",
      label: "Section Heading",
      defaultValue: "Stories of Change & Field Initiatives",
    },
    {
      name: "description",
      type: "textarea",
      label: "Section Description / Subheading",
      defaultValue:
        "Explore ongoing field projects, grassroots achievements, and stories of community transformation across India.",
    },
    createLinkField({
      name: "viewAllLink",
      label: "View All Button / Link",
      disableLabel: false,
      defaultValue: "/news",
    }),
  ],
};
