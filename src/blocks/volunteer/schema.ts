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
      defaultValue: [
        {
          title: "Teaching & Academic Mentoring",
          commitment: "2–4 hours / week",
          mode: "In-Person / Hybrid",
          description:
            "Tutor children in basic mathematics, English reading, science experiments, or digital skills at our Community Learning Centers.",
        },
        {
          title: "Medical & Health Camp Specialist",
          commitment: "Monthly camps (Saturdays/Sundays)",
          mode: "Field Trips",
          description:
            "Doctors, nurses, optometrists, and medical students providing diagnostic checkups and health counseling in rural camps.",
        },
        {
          title: "Content, Media & Storytelling",
          commitment: "Flexible / Remote",
          mode: "Virtual",
          description:
            "Help us document community impact stories, capture field photography, write articles, or design visual awareness materials.",
        },
      ],
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
    {
      name: "formHeading",
      type: "text",
      label: "Form Card Heading",
      defaultValue: "Apply to Volunteer",
    },
    {
      name: "formDescription",
      type: "textarea",
      label: "Form Card Description",
      defaultValue:
        "Share your details and tell us how you'd like to contribute.",
    },
    {
      name: "form",
      type: "relationship",
      relationTo: "forms",
      label: "Dynamic Volunteer Form",
      admin: {
        description:
          "Select a volunteer application form created in the Form Builder plugin. If omitted, the default volunteer form will be loaded dynamically.",
      },
      required: false,
    },
  ],
};

export default VolunteerBlock;
