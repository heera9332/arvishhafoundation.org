import type { Block } from "payload";

export const VolunteerBlock: Block = {
  slug: "volunteer",
  interfaceName: "VolunteerBlock",
  labels: {
    singular: "Volunteer Section",
    plural: "Volunteer Sections",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Volunteer With Us",
    },
    {
      name: "heading",
      type: "text",
      label: "Heading",
      required: true,
      defaultValue: "Ways You Can Share Your Passion & Skills",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      defaultValue:
        "We match volunteers with initiatives where their unique background—whether teaching, healthcare, arts, or communication—creates the highest positive impact.",
    },
    {
      name: "roles",
      type: "array",
      label: "Volunteer Opportunities / Roles",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Role Title",
          required: true,
        },
        {
          name: "mode",
          type: "text",
          label: "Mode (e.g. On-ground, Hybrid, Remote)",
          defaultValue: "On-ground / Field",
        },
        {
          name: "commitment",
          type: "text",
          label: "Commitment (e.g. 4-6 hours / week)",
          defaultValue: "4–6 hours / week",
        },
        {
          name: "description",
          type: "textarea",
          label: "Role Description",
          required: true,
        },
      ],
    },
  ],
};

export default VolunteerBlock;
