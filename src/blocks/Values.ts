import type { Block } from "payload";

export const ValuesBlock: Block = {
  slug: "values",
  interfaceName: "ValuesBlock",
  labels: {
    singular: "Core Values",
    plural: "Core Values Sections",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Our Principles",
    },
    {
      name: "heading",
      type: "text",
      label: "Section Heading",
      required: true,
      defaultValue: "Core Values That Anchor Everything We Do",
    },
    {
      name: "description",
      type: "textarea",
      label: "Section Description",
      defaultValue:
        "Our commitment to ethical governance, compassionate intervention, and radical transparency guides our every move.",
    },
    {
      name: "items",
      type: "array",
      label: "Values List",
      minRows: 1,
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "title",
              type: "text",
              label: "Value Title",
              required: true,
              admin: { width: "50%" },
            },
            {
              name: "icon",
              type: "select",
              label: "Icon",
              defaultValue: "HeartHandshake",
              admin: { width: "50%" },
              options: [
                { label: "Empathy (Heart Handshake)", value: "HeartHandshake" },
                { label: "Inclusivity (Users 2)", value: "Users2" },
                { label: "Integrity (Shield Check)", value: "ShieldCheck" },
                { label: "Empowerment (Sparkles)", value: "Sparkles" },
                { label: "Compassion (Heart)", value: "Heart" },
              ],
            },
          ],
        },
        {
          name: "description",
          type: "textarea",
          label: "Value Description",
          required: true,
        },
      ],
    },
  ],
};
