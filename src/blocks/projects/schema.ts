import type { Block } from "payload";
import { createLinkField } from "@/fields/link";

export const ProjectsBlock: Block = {
  slug: "projects",
  interfaceName: "ProjectsBlock",
  labels: {
    singular: "Projects & Programs",
    plural: "Projects Sections",
  },
  fields: [
    {
      name: "variant",
      type: "select",
      label: "Display Layout",
      defaultValue: "grid",
      options: [
        { label: "Grid View (Home & Overview)", value: "grid" },
        { label: "Detailed List View (Projects Page)", value: "list" },
      ],
    },
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Our Work on the Ground",
    },
    {
      name: "heading",
      type: "text",
      label: "Section Heading",
      required: true,
      defaultValue: "Grassroots Initiatives Driving Community Transformation",
    },
    {
      name: "description",
      type: "textarea",
      label: "Section Description",
      defaultValue:
        "Every project undertaken by Arvishha Foundation is built on partnerships with communities, rigorous local planning, and measurable outcomes.",
    },
    createLinkField({
      name: "viewAllLink",
      label: "View All Projects Link",
      disableLabel: false,
      defaultValue: "/projects",
    }),
    {
      name: "items",
      type: "array",
      label: "Project Cards",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "title",
              type: "text",
              label: "Project Title",
              required: true,
              admin: { width: "50%" },
            },
            {
              name: "slug",
              type: "text",
              label: "Project Slug / ID",
              admin: { width: "50%" },
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "category",
              type: "select",
              label: "Category",
              defaultValue: "Education",
              admin: { width: "33%" },
              options: [
                { label: "Education", value: "Education" },
                { label: "Empowerment", value: "Empowerment" },
                { label: "Healthcare", value: "Healthcare" },
                { label: "Welfare", value: "Welfare" },
                {
                  label: "Sustainable Development",
                  value: "Sustainable Development",
                },
                { label: "Youth", value: "Youth" },
              ],
            },
            {
              name: "status",
              type: "select",
              label: "Status",
              defaultValue: "Active",
              admin: { width: "33%" },
              options: [
                { label: "Active", value: "Active" },
                { label: "Ongoing", value: "Ongoing" },
                { label: "Completed", value: "Completed" },
              ],
            },
            {
              name: "beneficiaries",
              type: "text",
              label: "Beneficiaries (e.g. 350+ Children)",
              admin: { width: "34%" },
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "location",
              type: "text",
              label: "Location",
              admin: { width: "50%" },
            },
            {
              name: "year",
              type: "text",
              label: "Timeline / Year",
              admin: { width: "50%" },
            },
          ],
        },
        {
          name: "shortDescription",
          type: "textarea",
          label: "Short Description",
          required: true,
        },
        {
          name: "fullDescription",
          type: "textarea",
          label: "Full Description (Optional)",
        },
        {
          type: "row",
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              label: "Project Image (Media)",
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
          label: "Project Page URL",
          defaultValue: "/projects",
        },
      ],
    },
  ],
};
