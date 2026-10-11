import type { Block } from "payload";

export const PartnersBlock: Block = {
  slug: "partners",
  interfaceName: "PartnersBlock",
  labels: {
    singular: "Partners & CSR Collaborations",
    plural: "Partner Sections",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Partnerships for Good",
    },
    {
      name: "heading",
      type: "text",
      label: "Section Heading",
      defaultValue:
        "Institutions & CSR Leaders Backing Our Grassroots Mission",
    },
    {
      name: "subheading",
      type: "textarea",
      label: "Section Subheading",
      defaultValue:
        "We collaborate with statutory bodies, visionary corporates, and philanthropic trusts to amplify our social impact.",
    },
    {
      name: "items",
      type: "array",
      label: "Partner Logos",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "name",
              type: "text",
              label: "Partner Name",
              required: true,
              admin: { width: "50%" },
            },
            {
              name: "website",
              type: "text",
              label: "Website URL",
              admin: { width: "50%" },
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "logo",
              type: "upload",
              relationTo: "media",
              label: "Logo Image",
              admin: { width: "50%" },
            },
            {
              name: "logoUrl",
              type: "text",
              label: "Fallback Logo URL",
              admin: { width: "50%" },
            },
          ],
        },
      ],
    },
  ],
};
