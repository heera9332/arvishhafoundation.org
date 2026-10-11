import type { Block } from "payload";

export const ContactBlock: Block = {
  slug: "contact",
  interfaceName: "ContactBlock",
  labels: {
    singular: "Contact Section",
    plural: "Contact Sections",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Get In Touch",
    },
    {
      name: "heading",
      type: "text",
      label: "Heading",
      defaultValue: "Start The Dialogue. We're Listening.",
    },
    {
      name: "subheading",
      type: "textarea",
      label: "Subheading",
      defaultValue:
        "Have questions, want to volunteer, explore CSR collaborations, or learn more about our work? Reach out today.",
    },
    {
      type: "row",
      fields: [
        {
          name: "showForm",
          type: "checkbox",
          label: "Show Contact Form",
          defaultValue: true,
          admin: { width: "50%" },
        },
        {
          name: "showInfoCards",
          type: "checkbox",
          label: "Show Contact Information Cards",
          defaultValue: true,
          admin: { width: "50%" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "phoneOverride",
          type: "text",
          label: "Custom Phone Number",
          admin: {
            width: "50%",
            placeholder: "Leave blank to use default site phone",
          },
        },
        {
          name: "emailOverride",
          type: "text",
          label: "Custom Email Address",
          admin: {
            width: "50%",
            placeholder: "Leave blank to use default site email",
          },
        },
      ],
    },
    {
      name: "addressOverride",
      type: "textarea",
      label: "Custom Physical Address",
      admin: { placeholder: "Leave blank to use default site address" },
    },
  ],
};
