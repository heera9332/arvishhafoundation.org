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
      defaultValue: "Strategic CSR Partnerships for Lasting Social Returns",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      defaultValue:
        "We align with forward-thinking enterprises, statutory bodies, and family offices to execute compliant, high-governance CSR projects designed for long-term community autonomy.",
    },
    {
      name: "benefits",
      type: "array",
      label: "Partnership Benefits",
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
