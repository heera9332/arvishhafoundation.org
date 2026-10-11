import type { Block } from "payload";

export const ProcessBlock: Block = {
  slug: "process",
  interfaceName: "ProcessBlock",
  labels: {
    singular: "Process / How We Work",
    plural: "Process Sections",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "How We Work",
    },
    {
      name: "heading",
      type: "text",
      label: "Section Heading",
      required: true,
      defaultValue: "A Structured, Community-Led Path to Social Impact",
    },
    {
      name: "subheading",
      type: "textarea",
      label: "Section Subheading",
      defaultValue:
        "We believe lasting change requires clear strategy, deep community listening, disciplined execution, and transparent measurement.",
    },
    {
      name: "steps",
      type: "array",
      label: "Process Steps",
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "step",
              type: "text",
              label: "Step Number (e.g. 01)",
              required: true,
              admin: { width: "30%" },
            },
            {
              name: "title",
              type: "text",
              label: "Step Title",
              required: true,
              admin: { width: "70%" },
            },
          ],
        },
        {
          name: "description",
          type: "textarea",
          label: "Step Description",
          required: true,
        },
        {
          name: "phaseTag",
          type: "text",
          label: "Phase Label (Optional)",
        },
      ],
    },
  ],
};
