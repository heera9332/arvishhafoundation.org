import type { Block } from "payload";

export const TestimonialsBlock: Block = {
  slug: "testimonials",
  interfaceName: "TestimonialsBlock",
  labels: {
    singular: "Stories & Testimonials",
    plural: "Testimonials Sections",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Voices From The Field",
    },
    {
      name: "heading",
      type: "text",
      label: "Section Heading",
      required: true,
      defaultValue: "Stories of Dignity, Courage and Real Transformation",
    },
    {
      name: "description",
      type: "textarea",
      label: "Section Description",
      defaultValue:
        "Hear directly from the community members, students, and women whose lives are being transformed through community action.",
    },
    {
      name: "theme",
      type: "select",
      label: "Visual Theme",
      defaultValue: "darkGreen",
      options: [
        { label: "Dark Green Background (High contrast)", value: "darkGreen" },
        { label: "Light Background", value: "light" },
      ],
    },
    {
      name: "items",
      type: "array",
      label: "Testimonial Items",
      minRows: 1,
      fields: [
        {
          name: "quote",
          type: "textarea",
          label: "Quote / Story",
          required: true,
        },
        {
          type: "row",
          fields: [
            {
              name: "name",
              type: "text",
              label: "Person Name",
              required: true,
              admin: { width: "50%" },
            },
            {
              name: "role",
              type: "text",
              label: "Role / Designation",
              required: true,
              admin: { width: "50%" },
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
              name: "initiative",
              type: "text",
              label: "Initiative / Project Tag",
              admin: { width: "50%" },
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "avatar",
              type: "upload",
              relationTo: "media",
              label: "Avatar Image",
              admin: { width: "50%" },
            },
            {
              name: "avatarUrl",
              type: "text",
              label: "Fallback Avatar URL",
              admin: { width: "50%" },
            },
          ],
        },
      ],
    },
  ],
};
