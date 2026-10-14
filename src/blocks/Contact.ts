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
      type: "relationship",
      name: "form",
      label: "Contact Form",
      relationTo: "forms",
      required: true,
    },
    {
      name: "sectionImage",
      type: "upload",
      label: "Section Image",
      relationTo: "media",
      required: true,
    },
  ],
};
