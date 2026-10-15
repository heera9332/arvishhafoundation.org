import type { Block } from "payload";

export const ContactPageBlock: Block = {
  slug: "contactPage",
  interfaceName: "ContactPageBlock",
  labels: {
    singular: "Contact Page Section",
    plural: "Contact Page Sections",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Direct Channels",
          fields: [
            {
              name: "eyebrow",
              type: "text",
              label: "Eyebrow",
              defaultValue: "Direct Channels",
            },
            {
              name: "heading",
              type: "text",
              label: "Heading",
              defaultValue: "Reach Our Team",
            },
            {
              name: "description",
              type: "textarea",
              label: "Description",
              defaultValue:
                "We look forward to hearing from you. Select the most convenient channel below or submit the inquiry form.",
            },
            {
              name: "phone",
              type: "text",
              label: "Phone Number",
              defaultValue: "+91 98765 43210",
            },
            {
              name: "email",
              type: "text",
              label: "Email Address",
              defaultValue: "contact@arvishhafoundation.org",
            },
            {
              name: "registrationNumber",
              type: "text",
              label: "Statutory Registration Number",
              defaultValue: "NGO-REG-2024-9842",
            },
          ],
        },
        {
          label: "Inquiry Form",
          fields: [
            {
              name: "formHeading",
              type: "text",
              label: "Form Card Heading",
              defaultValue: "Send A Message",
            },
            {
              name: "formDescription",
              type: "textarea",
              label: "Form Card Description",
              defaultValue:
                "Fill in your details below and our team will get back to you within 24–48 hours.",
            },
          ],
        },
        {
          label: "Common Inquiries (FAQ)",
          fields: [
            {
              name: "showFaq",
              type: "checkbox",
              label: "Show FAQ Accordion",
              defaultValue: true,
            },
            {
              name: "faqEyebrow",
              type: "text",
              label: "FAQ Eyebrow",
              defaultValue: "Common Inquiries",
            },
            {
              name: "faqHeading",
              type: "text",
              label: "FAQ Heading",
              defaultValue: "Questions Before Reaching Out?",
            },
            {
              name: "faqItems",
              type: "array",
              label: "FAQ Items",
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
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default ContactPageBlock;
