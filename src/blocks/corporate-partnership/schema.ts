import type { Block } from "payload";

export const CorporatePartnershipBlock: Block = {
  slug: "corporatePartnership",
  interfaceName: "CorporatePartnershipBlock",
  labels: {
    singular: "Corporate CSR Partnership Section",
    plural: "Corporate CSR Partnership Sections",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow",
      defaultValue: "Corporate Partnerships",
    },
    {
      name: "heading",
      type: "text",
      label: "Heading",
      required: true,
      defaultValue: "Institutional & Corporate CSR Partnerships",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      defaultValue:
        "We collaborate with organizations committed to sustainable development goals (SDGs). We offer end-to-end project implementation, transparent statutory compliance, baseline/endline assessments, and employee engagement volunteering opportunities.",
    },
    {
      name: "benefits",
      type: "array",
      label: "Partnership Benefits",
      defaultValue: [
        { benefit: "Customized CSR project design aligned with corporate priorities" },
        { benefit: "Full statutory compliance, regular field updates, and audited reporting" },
        { benefit: "Direct employee engagement through structured volunteering days" },
        { benefit: "High measurable impact with verified beneficiary tracking" },
      ],
      fields: [
        {
          name: "benefit",
          type: "text",
          label: "Benefit Point",
          required: true,
        },
      ],
    },
    {
      name: "ctaText",
      type: "text",
      label: "CTA Button Text",
      defaultValue: "Connect With Our CSR Desk",
    },
    {
      name: "ctaLink",
      type: "text",
      label: "CTA Button Link",
      defaultValue: "/contact?type=csr",
    },
    {
      name: "form",
      type: "relationship",
      relationTo: "forms",
      label: "CSR / Partnership Form (Optional)",
      admin: {
        description:
          "Optionally select a dedicated CSR or partnership inquiry form. If selected, the form will be rendered dynamically.",
      },
      required: false,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Visual Image (Media)",
    },
    {
      name: "imageUrl",
      type: "text",
      label: "Fallback Image URL",
      defaultValue: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    },
  ],
};

export default CorporatePartnershipBlock;
