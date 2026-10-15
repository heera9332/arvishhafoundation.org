import type { Block } from "payload";

export const FormBlock: Block = {
  slug: "formBlock",
  interfaceName: "FormBlock",
  labels: {
    singular: "Form Builder Block",
    plural: "Form Blocks",
  },
  fields: [
    {
      name: "form",
      type: "relationship",
      relationTo: "forms",
      label: "Select Form",
      required: true,
      admin: {
        description:
          "Select an interactive form created in the Form Builder plugin.",
      },
    },
    {
      name: "enableIntro",
      type: "checkbox",
      label: "Enable Intro Content",
      defaultValue: false,
    },
    {
      name: "introContent",
      type: "richText",
      label: "Intro Content",
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.enableIntro),
      },
    },
  ],
};
