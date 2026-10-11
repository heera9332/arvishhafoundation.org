import type { Block } from "payload";
import { createLinkField } from "@/fields/link";

export const FAQBlock: Block = {
  slug: "faq",
  interfaceName: "FAQBlock",
  labels: {
    singular: "FAQ Accordion",
    plural: "FAQ Sections",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Frequently Asked Questions",
    },
    {
      name: "heading",
      type: "text",
      label: "Section Heading",
      required: true,
      defaultValue:
        "Answers to Common Questions About Our Mission & Governance",
    },
    {
      name: "subheading",
      type: "textarea",
      label: "Section Subheading",
      defaultValue:
        "Everything you need to know about our legal structure, operations, donation transparency, and community impact.",
    },
    createLinkField({
      name: "contactLink",
      label: "Have More Questions Button",
      disableLabel: false,
      defaultValue: "/contact",
    }),
    {
      name: "items",
      type: "array",
      label: "Questions & Answers",
      minRows: 1,
      fields: [
        {
          name: "question",
          type: "text",
          label: "Question",
          required: true,
        },
        {
          name: "answer",
          type: "textarea",
          label: "Answer",
          required: true,
        },
        {
          name: "category",
          type: "text",
          label: "Category / Tag (Optional)",
        },
      ],
    },
  ],
};
