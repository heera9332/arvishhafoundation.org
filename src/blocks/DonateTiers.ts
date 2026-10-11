import type { Block } from "payload";

export const DonateTiersBlock: Block = {
  slug: "donateTiers",
  interfaceName: "DonateTiersBlock",
  labels: {
    singular: "Donation Tiers & Bank Details",
    plural: "Donation Sections",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Support Our Mission",
    },
    {
      name: "heading",
      type: "text",
      label: "Section Heading",
      required: true,
      defaultValue: "Invest in Human Dignity & Empowered Communities",
    },
    {
      name: "description",
      type: "textarea",
      label: "Section Description",
      defaultValue:
        "Your contribution fuels grassroots educational centers, vocational materials for women, life-saving preventive health screenings, and sustainable community solutions.",
    },
    {
      name: "tiers",
      type: "array",
      label: "Impact Donation Tiers",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "amount",
              type: "text",
              label: "Amount (e.g. ₹2,000 / $25)",
              required: true,
              admin: { width: "40%" },
            },
            {
              name: "title",
              type: "text",
              label: "Tier Title",
              required: true,
              admin: { width: "60%" },
            },
          ],
        },
        {
          name: "description",
          type: "textarea",
          label: "What this donation achieves",
          required: true,
        },
      ],
    },
    {
      name: "transparencyPoints",
      type: "array",
      label: "Transparency & Assurance Points",
      fields: [
        { name: "point", type: "text", label: "Point", required: true },
      ],
    },
    {
      name: "bankDetails",
      type: "group",
      label: "Direct Bank Transfer & UPI Details",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "accountName",
              type: "text",
              label: "Account Name",
              defaultValue: "Arvishha Foundation",
              admin: { width: "50%" },
            },
            {
              name: "accountNumber",
              type: "text",
              label: "Account Number",
              defaultValue: "98765432101234",
              admin: { width: "50%" },
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "bankName",
              type: "text",
              label: "Bank Name",
              defaultValue: "State Bank of India",
              admin: { width: "50%" },
            },
            {
              name: "branch",
              type: "text",
              label: "Branch",
              defaultValue: "Main Civic Center Branch",
              admin: { width: "50%" },
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "ifscCode",
              type: "text",
              label: "IFSC Code",
              defaultValue: "SBIN0001234",
              admin: { width: "33%" },
            },
            {
              name: "swiftCode",
              type: "text",
              label: "SWIFT Code",
              defaultValue: "SBININBB123",
              admin: { width: "33%" },
            },
            {
              name: "upiId",
              type: "text",
              label: "UPI ID",
              defaultValue: "arvishhafoundation@sbi",
              admin: { width: "34%" },
            },
          ],
        },
      ],
    },
  ],
};
