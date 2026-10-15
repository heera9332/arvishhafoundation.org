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
    {
      type: "group",
      name: "Ask a Question",
      fields: [
        {
          type: "text",
          name: "askQuestionHeading",
          label: "Ask a Question Heading",
          defaultValue: "Don't Worry — We've Got Answers!",
        },
        {
          type: "textarea",
          name: "description",
          defaultValue:
            "We are here to help. If you didn't find the answer you were looking for, reach out to our team directly. We are happy to clarify any details.",
          label: "Ask a Question Description",
        },
        {
          name: "cta",
          label: "CTA",
          type: "group",
          fields: [
            createLinkField({
              name: "link",
              label: "CTA Link",
              disableLabel: false,
              defaultValue: "/contact",
            }),
          ],
        },
      ],
    },
  ],
};
