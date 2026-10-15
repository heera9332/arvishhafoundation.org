import type { Block } from "payload";

export const TeamBlock: Block = {
  slug: "team",
  interfaceName: "TeamBlock",
  labels: {
    singular: "Team & Leadership",
    plural: "Team Sections",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Our Leadership",
    },
    {
      name: "heading",
      type: "text",
      label: "Section Heading",
      required: true,
      defaultValue: "Guided by Experienced, Compassionate Change-Makers",
    },
    {
      name: "description",
      type: "textarea",
      label: "Section Description",
      defaultValue:
        "Our trustees, advisors, and field directors bring decades of grassroots activism, pedagogy, and governance experience.",
    },
    {
      name: "members",
      type: "array",
      label: "Team Members",
      minRows: 1,
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "name",
              type: "text",
              label: "Full Name",
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
          name: "bio",
          type: "textarea",
          label: "Short Biography",
        },
        {
          type: "row",
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              label: "Profile Photo",
              admin: { width: "50%" },
            },
            {
              name: "imageUrl",
              type: "text",
              label: "Fallback Photo URL",
              admin: { width: "50%" },
            },
          ],
        },
        {
          name: "linkedin",
          type: "text",
          label: "LinkedIn Profile URL (Optional)",
        },
      ],
    },
  ],
};
