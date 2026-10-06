import type { ContactInfo, FAQItem } from "@/types/site";

export const contactData = {
  hero: {
    eyebrow: "Contact Us",
    heading: "Start The Dialogue. We're Listening.",
    description:
      "Have inquiries about our programs, wish to explore partnership avenues, or want to visit a project site? Reach out to our team today.",
  },
  info: {
    phone: "(555) 123-456-789",
    phoneAlt: "+91 98765 43210",
    email: "info@arvishhafoundation.org",
    emailAlt: "arvishhafoundation@gmail.com",
    address: {
      line1: "123 Serenity Lane",
      line2: "Community Engagement Wing",
      city: "Blissfield",
      state: "CA",
      pincode: "90210",
      country: "United States",
    },
    socialLinks: [
      { platform: "facebook", url: "https://facebook.com/arvishhafoundation", label: "Facebook" },
      { platform: "instagram", url: "https://instagram.com/arvishhafoundation", label: "Instagram" },
      { platform: "x", url: "https://x.com/arvishha_ngo", label: "X" },
      { platform: "linkedin", url: "https://linkedin.com/company/arvishhafoundation", label: "LinkedIn" },
    ],
    registrationNumber: "NGO-REG-2024-9842",
    darpanId: "DL/2024/039821",
    taxExemption: "Eligible under applicable Non-Profit Tax Codes",
  } as ContactInfo,
  faq: [
    {
      id: "cf-1",
      question: "Where are Arvishha Foundation's active field programs located?",
      answer:
        "We operate field initiatives across peri-urban settlements and rural clusters, focusing on areas with significant gaps in educational and healthcare access.",
    },
    {
      id: "cf-2",
      question: "Can I visit a project site before deciding to donate or volunteer?",
      answer:
        "Yes, we organize planned community visits for prospective partners and volunteers. Please submit the contact form with your preferred dates.",
    },
    {
      id: "cf-3",
      question: "How quickly does the team respond to queries?",
      answer:
        "Our core coordination team responds within 24 to 48 business hours to all emails and website inquiries.",
    },
  ] as FAQItem[],
};
